import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedStaff, staffTitle } from '../../shared/access.ts';

const CATEGORIES = ['General', 'Visitation', 'Maintenance', 'Events', 'Important'];
const PRIORITIES = ['normal', 'high', 'urgent'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const svc = db.asServiceRole;
    const staff = await requireApprovedStaff(svc, user.id);
    const isPlatformAdmin = user.role === 'admin';
    if (!staff && !isPlatformAdmin) {
      return Response.json({ error: 'Only approved hall staff can publish announcements' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const { hall_id, title, body: text, category, priority, floor, requires_ack } = body;
    if (!hall_id) return Response.json({ error: 'hall_id is required' }, { status: 400 });
    if (!title || !String(title).trim()) return Response.json({ error: 'A title is required' }, { status: 400 });
    if (!text || !String(text).trim()) return Response.json({ error: 'A message is required' }, { status: 400 });
    if (staff && staff.hall_id !== hall_id) {
      return Response.json({ error: 'You can only post to your own hall' }, { status: 403 });
    }

    const targetHall = await svc.entities.ResidenceHall.get(hall_id).catch(() => null);
    if (!targetHall || targetHall.is_active === false) return Response.json({ error: 'Hall not found' }, { status: 404 });
    if (floor && (!/^\d+$/.test(String(floor)) || Number(floor) < 1 || Number(floor) > Number(targetHall.floor_count || 0))) {
      return Response.json({ error: 'Invalid floor for this hall' }, { status: 400 });
    }

    const announcement = await svc.entities.Announcement.create({
      hall_id,
      floor: floor ? String(floor) : '',
      category: CATEGORIES.includes(category) ? category : 'General',
      title: String(title).trim().slice(0, 140),
      body: String(text).trim().slice(0, 2000),
      priority: PRIORITIES.includes(priority) ? priority : 'normal',
      publisher_id: user.id,
      publisher_name: staff?.full_name || user.full_name || 'Hall staff',
      publisher_role: staff ? `${staffTitle(staff)}${staff.floor ? `, Floor ${staff.floor}` : ''}` : 'Hall staff',
      requires_ack: !!requires_ack,
      published_at: new Date().toISOString(),
      is_demo: !!staff?.is_demo,
    });

    // Only approved members receive hall notifications.
    const residents = await svc.entities.ResidentProfile.filter(
      { hall_id, membership_status: 'approved' },
      '-created_date', 500,
    );
    const targets = (Array.isArray(residents) ? residents : residents?.items ?? []).filter((p) => p.user_id && (!floor || String(p.floor) === String(floor)));
    if (targets.length) {
      await svc.entities.Notification.bulkCreate(
        targets.map((p) => ({
          user_id: p.user_id,
          hall_id,
          type: 'announcement',
          title: announcement.title,
          body: announcement.body.slice(0, 180),
          link: '/hallcast',
          related_id: announcement.id,
          priority: announcement.priority,
          is_read: false,
          is_demo: !!p.is_demo,
        })),
      );
    }

    return Response.json({ announcement, notified: targets.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}