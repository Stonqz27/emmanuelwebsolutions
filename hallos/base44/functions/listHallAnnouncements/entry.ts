import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember, isApprovedStaff } from '../../shared/access.ts';

/** Only return announcements intended for the authenticated resident's hall/floor. */
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Approved membership required' }, { status: 403 });
    const rows = await svc.entities.Announcement.filter({ hall_id: profile.hall_id }, '-published_at', 100);
    const items = Array.isArray(rows) ? rows : rows?.items ?? [];
    const staff = isApprovedStaff(profile);
    return Response.json({ announcements: items
      .filter(a => staff || !a.floor || String(a.floor) === String(profile.floor || ''))
      .slice(0, 60)
      .map(a => ({ id:a.id, hall_id:a.hall_id, floor:a.floor || '', category:a.category,
        title:a.title, body:a.body, priority:a.priority, publisher_name:a.publisher_name,
        publisher_role:a.publisher_role, requires_ack:!!a.requires_ack,
        published_at:a.published_at, is_demo:!!a.is_demo })) });
  } catch (e) {
    console.error('listHallAnnouncements', e);
    return Response.json({ error: 'Could not load announcements' }, { status: 500 });
  }
}
