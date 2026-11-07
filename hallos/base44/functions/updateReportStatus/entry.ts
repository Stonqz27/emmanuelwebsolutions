import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedStaff } from '../../shared/access.ts';

const STATUSES = ['open', 'acknowledged', 'in_progress', 'resolved'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const svc = db.asServiceRole;
    const staff = await requireApprovedStaff(svc, user.id);
    if (!staff && user.role !== 'admin') {
      return Response.json({ error: 'Only approved hall staff can manage reports' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const { report_id, status, staff_note, official_ticket_ref } = body;
    if (!report_id) return Response.json({ error: 'report_id is required' }, { status: 400 });
    if (!STATUSES.includes(status)) return Response.json({ error: 'Unknown status' }, { status: 400 });

    const report = await svc.entities.IssueReport.get(report_id)
      .catch((e) => (e.status === 404 ? null : Promise.reject(e)));
    if (!report) return Response.json({ error: 'Report not found' }, { status: 404 });
    if (staff && report.hall_id !== staff.hall_id) {
      return Response.json({ error: 'This report belongs to another hall' }, { status: 403 });
    }

    const patch = { status };
    // A new resolution cycle starts only on transition into 'resolved'.
    // Old resident votes must never count toward a second attempted fix.
    if (status === 'resolved' && report.status !== 'resolved') {
      patch.resolution_version = Number(report.resolution_version || 0) + 1;
      patch.resolved_at = new Date().toISOString();
    }
    if (status !== 'resolved' && report.status === 'resolved') patch.resolved_at = '';
    if (typeof staff_note === 'string') patch.staff_note = staff_note.slice(0, 500);
    if (typeof official_ticket_ref === 'string') {
      const ref = official_ticket_ref.trim();
      if (ref.length > 80 || !/^[A-Za-z0-9#./_\- ]*$/.test(ref)) {
        return Response.json({ error: 'Invalid work-order reference' }, { status: 400 });
      }
      patch.official_ticket_ref = ref;
    }
    const updated = await svc.entities.IssueReport.update(report_id, patch);

    // Only broadcast when the resident-facing report STATUS changes.
    // Saving a staff-entered reference must not flood residents with duplicate alerts.
    if (status !== report.status) {
      const audience = { hall_id: report.hall_id, membership_status: 'approved' };
      if (report.floor) audience.floor = String(report.floor);
      const residents = await svc.entities.ResidentProfile.filter(audience, '-created_date', 200);
      const targets = (Array.isArray(residents) ? residents : residents?.items ?? []).filter((p) => p.user_id);
      if (targets.length) {
        const label = status === 'resolved'
          ? 'Staff marked the report fixed'
          : status === 'acknowledged'
            ? 'Staff is aware of your report'
            : 'Report update';
        await svc.entities.Notification.bulkCreate(
          targets.map((p) => ({
            user_id: p.user_id,
            hall_id: report.hall_id,
            type: 'report',
            title: `${label} · ${report.space_name}`,
            body: report.category,
            link: '/hallfix',
            related_id: report.id,
            priority: 'normal',
            is_read: false,
            is_demo: !!report.is_demo,
          })),
        );
      }
    }

    return Response.json({ report: updated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}