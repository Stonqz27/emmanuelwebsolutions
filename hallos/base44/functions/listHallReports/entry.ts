import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember, isApprovedStaff } from '../../shared/access.ts';

/** Public report fields only; internal staff notes are available only to approved staff. */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Approved membership required' }, { status: 403 });
    const rows = await svc.entities.IssueReport.filter({ hall_id: profile.hall_id }, '-created_date', 100);
    const items = Array.isArray(rows) ? rows : rows?.items ?? [];
    const staff = isApprovedStaff(profile);
    const visible = items.slice(0, 60);
    // Aggregates only: no resident identity is exposed through a report.
    const feedbackRows = await svc.entities.FixFeedback.filter({ hall_id: profile.hall_id }, '-created_date', 500);
    const feedback = Array.isArray(feedbackRows) ? feedbackRows : feedbackRows?.items ?? [];
    return Response.json({ reports: visible.map(r => {
      const cycle = Number(r.resolution_version || (r.status === 'resolved' ? 1 : 0));
      const votes = r.status === 'resolved' ? feedback.filter(f => f.report_id === r.id && Number(f.resolution_version) === cycle) : [];
      return ({
      id:r.id, hall_id:r.hall_id, shared_space_id:r.shared_space_id,
      space_name:r.space_name, floor:r.floor, category:r.category,
      description:r.description, urgency:r.urgency, status:r.status,
      confirmation_count:r.confirmation_count ?? 0, created_date:r.created_date,
      is_demo:!!r.is_demo,
      resolution_version:cycle, resolved_at:r.resolved_at || '',
      fixed_count:votes.filter(v => v.vote === 'fixed').length,
      still_broken_count:votes.filter(v => v.vote === 'still_broken').length,
      fix_vote_by_me:votes.find(v => v.user_id === user.id)?.vote || '',
      ...(staff ? {staff_note:r.staff_note || '',official_ticket_ref:r.official_ticket_ref || ''} : {})
    }); }) });
  } catch (e) {
    console.error('listHallReports',e);
    return Response.json({ error: 'Could not load reports' }, { status: 500 });
  }
}
