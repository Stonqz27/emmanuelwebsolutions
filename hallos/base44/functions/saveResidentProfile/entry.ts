import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { getProfile, mirrorUserAccess } from '../../shared/access.ts';

// Residents request membership in a hall here. A request never grants access on its
// own: membership stays pending until approved staff or a platform admin approve it.
// The demonstration hall is the single exception so judges can experience the app.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { hall_id, floor } = await req.json().catch(() => ({}));
    if (!hall_id) return Response.json({ error: 'Choose a residence hall' }, { status: 400 });

    const svc = db.asServiceRole;
    const hall = await svc.entities.ResidenceHall.get(hall_id).catch((e) => (e.status === 404 ? null : Promise.reject(e)));
    if (!hall || hall.is_active === false) {
      return Response.json({ error: 'That hall is not available' }, { status: 400 });
    }

    const existing = await getProfile(svc, user.id);
    const now = new Date().toISOString();
    const selectedFloor = String(floor || '').trim();
    // For apartment/hotel residences where official floor counts are unknown, don't invent them.
    // Such residents may omit floor; only staff-confirmed floors can enable floor-targeted notices.
    const floorCount = Number(hall.floor_count || 0);
    if (floorCount > 0 && (!/^\d+$/.test(selectedFloor) || Number(selectedFloor) < 1 || Number(selectedFloor) > floorCount)) {
      return Response.json({ error: 'Select a valid floor for this hall' }, { status: 400 });
    }
    if (floorCount <= 0 && selectedFloor) {
      return Response.json({ error: 'This residence has no verified floor list yet. Leave floor blank and ask staff to configure it.' }, { status: 400 });
    }
    const sameHall = !!existing && existing.hall_id === hall.id;
    const keepApproved = sameHall && existing.membership_status === 'approved';
    const approved = !!hall.is_demo || keepApproved;
    const membership_status = approved ? 'approved' : 'pending';

    const payload = {
      user_id: user.id,
      full_name: user.full_name || '',
      email: user.email || '',
      hall_id: hall.id,
      floor: keepApproved ? String(existing.floor) : selectedFloor,
      membership_status,
      membership_requested_at: keepApproved ? existing.membership_requested_at || now : now,
      membership_note: approved && !keepApproved ? 'Demo hall — instant access for judges' : '',
      is_demo: !!hall.is_demo,
    };

    // Staff role and staff approval are never writable from here. Losing approved
    // membership on a hall change also drops any staff privileges.
    if (existing) {
      if (!keepApproved) {
        payload.staff_role = 'resident';
        payload.staff_status = 'none';
      }
    }

    const profile = existing
      ? await svc.entities.ResidentProfile.update(existing.id, payload)
      : await svc.entities.ResidentProfile.create({ ...payload, staff_role: 'resident', staff_status: 'none' });

    await mirrorUserAccess(svc, user.id, profile);
    return Response.json({ profile, membership_status });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}