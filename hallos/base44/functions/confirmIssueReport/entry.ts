import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember } from '../../shared/access.ts';

// One confirmation per resident per report — duplicates are refused here, not just hidden in the UI.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const svc = db.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Your hall membership must be approved first' }, { status: 403 });

    const { report_id } = await req.json().catch(() => ({}));
    if (!report_id) return Response.json({ error: 'report_id is required' }, { status: 400 });

    const report = await svc.entities.IssueReport.get(report_id).catch((e) => (e.status === 404 ? null : Promise.reject(e)));
    if (!report) return Response.json({ error: 'Report not found' }, { status: 404 });
    if (report.status === 'resolved') return Response.json({ error: 'This issue has been marked resolved' }, { status: 409 });
    if (report.hall_id !== profile.hall_id) {
      return Response.json({ error: 'This report belongs to another hall' }, { status: 403 });
    }

    const existing = await svc.entities.IssueConfirmation.filter({ report_id, user_id: user.id });
    if (Array.isArray(existing) && existing.length) {
      return Response.json({ duplicate: true, confirmation_count: report.confirmation_count || 1 });
    }

    await svc.entities.IssueConfirmation.create({
      report_id,
      user_id: user.id,
      hall_id: profile.hall_id,
    });

    // Increment so tallies stay correct without re-reading every confirmation row.
    const nextCount = (report.confirmation_count || 0) + 1;
    const updated = await svc.entities.IssueReport.update(report_id, { confirmation_count: nextCount });
    return Response.json({ duplicate: false, confirmation_count: updated.confirmation_count ?? nextCount });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}