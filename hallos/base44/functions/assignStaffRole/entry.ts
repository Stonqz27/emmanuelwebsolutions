import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { mirrorUserAccess } from '../../shared/access.ts';

const ROLES = ['resident', 'ra', 'hall_admin'];

// Platform admins only. In-app staff privileges are never self-selected.
// Assigning a staff role also approves the hall membership it depends on.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const svc = db.asServiceRole;
    const body = await req.json().catch(() => ({}));
    const { email, staff_role, hall_id, floor } = body;
    if (!email) return Response.json({ error: 'email is required' }, { status: 400 });
    if (!ROLES.includes(staff_role)) return Response.json({ error: 'Unknown staff role' }, { status: 400 });

    const users = await svc.entities.User.filter({ email: String(email).trim().toLowerCase() });
    const target = Array.isArray(users) ? users[0] : null;
    if (!target) return Response.json({ error: 'No account with that email yet' }, { status: 404 });

    let hall = null;
    if (hall_id) {
      hall = await svc.entities.ResidenceHall.get(hall_id).catch((e) => (e.status === 404 ? null : Promise.reject(e)));
      if (!hall) return Response.json({ error: 'Hall not found' }, { status: 404 });
    }

    const profiles = await svc.entities.ResidentProfile.filter({ user_id: target.id });
    const existing = Array.isArray(profiles) && profiles.length ? profiles[0] : null;
    const resolvedHallId = hall?.id || existing?.hall_id || '';
    if (!resolvedHallId) {
      return Response.json({ error: 'Choose a hall for that account first' }, { status: 400 });
    }

    const payload = {
      user_id: target.id,
      full_name: target.full_name || '',
      email: target.email || '',
      hall_id: resolvedHallId,
      floor: floor ? String(floor) : existing?.floor || '',
      membership_status: 'approved',
      reviewed_by_name: user.full_name || 'Platform admin',
      reviewed_at: new Date().toISOString(),
      staff_role,
      staff_status: staff_role === 'resident' ? 'none' : 'approved',
      is_demo: hall ? !!hall.is_demo : !!existing?.is_demo,
    };

    const profile = existing
      ? await svc.entities.ResidentProfile.update(existing.id, payload)
      : await svc.entities.ResidentProfile.create(payload);

    await mirrorUserAccess(svc, target.id, profile);
    return Response.json({ profile });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}