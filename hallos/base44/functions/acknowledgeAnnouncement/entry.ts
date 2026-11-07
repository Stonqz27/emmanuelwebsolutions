import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember } from '../../shared/access.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Approved membership required' }, { status: 403 });
    const { announcement_id } = await req.json().catch(() => ({}));
    if (!announcement_id) return Response.json({ error: 'announcement_id required' }, { status: 400 });
    const announcement = await svc.entities.Announcement.get(announcement_id).catch(() => null);
    if (!announcement || announcement.hall_id !== profile.hall_id ||
        (announcement.floor && String(announcement.floor) !== String(profile.floor))) {
      return Response.json({ error: 'Announcement unavailable' }, { status: 404 });
    }
    const rows = await svc.entities.Notification.filter({
      user_id: user.id, type: 'announcement', related_id: announcement_id,
    });
    const items = Array.isArray(rows) ? rows : rows?.items ?? [];
    const when = new Date().toISOString();
    for (const item of items) {
      await svc.entities.Notification.update(item.id, { acknowledged_at: item.acknowledged_at || when, is_read: true });
    }
    return Response.json({ acknowledged: true });
  } catch (error) {
    console.error('acknowledgeAnnouncement', error);
    return Response.json({ error: 'Could not acknowledge announcement' }, { status: 500 });
  }
}
