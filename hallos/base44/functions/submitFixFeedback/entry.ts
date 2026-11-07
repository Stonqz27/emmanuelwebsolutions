import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember } from '../../shared/access.ts';

const VOTES = ['fixed', 'still_broken'];
const rows = (result) => Array.isArray(result) ? result : result?.items ?? [];

/** A member may change ONE assessment per resolution cycle. Never auto-reopen reports. */
export default async function (req) {
  try {
    const db = createClientFromRequest(req);
    const user = await db.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = db.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Approved hall membership required' }, { status: 403 });
    const { report_id, vote } = await req.json().catch(() => ({}));
    if (!report_id || !VOTES.includes(vote)) return Response.json({ error: 'Valid report and vote are required' }, { status: 400 });
    const report = await svc.entities.IssueReport.get(report_id).catch(() => null);
    if (!report || report.hall_id !== profile.hall_id) return Response.json({ error: 'Report unavailable' }, { status: 404 });
    if (report.status !== 'resolved') return Response.json({ error: 'Feedback opens only after staff mark a report fixed' }, { status: 409 });
    const version = Number(report.resolution_version || 1);
    const matches = rows(await svc.entities.FixFeedback.filter({ report_id, user_id: user.id, resolution_version: version }));
    if (matches.length) {
      if (matches[0].vote !== vote) await svc.entities.FixFeedback.update(matches[0].id, { vote });
    } else {
      await svc.entities.FixFeedback.create({ report_id, hall_id: profile.hall_id, user_id: user.id, resolution_version: version, vote });
    }
    const votes = rows(await svc.entities.FixFeedback.filter({ report_id, resolution_version: version }));
    return Response.json({
      report_id, fix_vote_by_me: vote,
      fixed_count: votes.filter(v => v.vote === 'fixed').length,
      still_broken_count: votes.filter(v => v.vote === 'still_broken').length,
    });
  } catch (error) {
    console.error('submitFixFeedback', error);
    return Response.json({ error: 'Could not save feedback' }, { status: 500 });
  }
}
