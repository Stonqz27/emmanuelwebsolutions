import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { getProfile, isApprovedMember, isApprovedStaff, mirrorUserAccess } from '../../shared/access.ts';

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const svc = db.asServiceRole;
    const profile = await getProfile(svc, user.id);
    if (profile) await mirrorUserAccess(svc, user.id, profile);

    const hallRecords = await svc.entities.ResidenceHall.list();
    const allHalls = Array.isArray(hallRecords) ? hallRecords : hallRecords?.items ?? [];

    const approved = isApprovedMember(profile);
    const hall = approved ? allHalls.find((h) => h.id === profile.hall_id) ?? null : null;

    return Response.json({
      user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role },
      profile: profile
        ? {
            id: profile.id,
            hall_id: profile.hall_id || '',
            floor: profile.floor || '',
            membership_status: profile.membership_status || 'pending',
            membership_note: profile.membership_note || '',
            membership_requested_at: profile.membership_requested_at || '',
            reviewed_by_name: profile.reviewed_by_name || '',
            staff_role: profile.staff_role || 'resident',
            staff_status: profile.staff_status || 'none',
          }
        : null,
      hall: hall
        ? {
            id: hall.id,
            name: hall.name,
            short_name: hall.short_name || hall.name,
            description: hall.description || '',
            front_desk_phone: hall.front_desk_phone || '',
            resident_director: hall.resident_director || '',
            director_office_phone: hall.director_office_phone || '',
            info_source_url: hall.info_source_url || '',
            floor_count: hall.floor_count || 0,
            is_demo: !!hall.is_demo,
            housing_key: hall.housing_key || '',
            housing_type: hall.housing_type || '',
            maintenance_portal_url: hall.maintenance_portal_url || '',
            maintenance_portal_label: hall.maintenance_portal_label || '',
            after_hours_ra_phone: hall.after_hours_ra_phone || '',
            shuttle_info_url: hall.shuttle_info_url || '',
          }
        : null,
      halls: allHalls
        .filter((h) => h.is_active !== false)
        .map((h) => ({
          id: h.id,
          name: h.name,
          short_name: h.short_name || h.name,
          description: h.description || '',
          floor_count: h.floor_count || 0,
          is_demo: !!h.is_demo,
          housing_key: h.housing_key || '',
          housing_type: h.housing_type || '',
        })),
      isStaff: approved && isApprovedStaff(profile),
      membershipStatus: profile ? profile.membership_status || 'pending' : 'none',
      hasAccess: approved && !!hall,
      needsProfile: !profile || !profile.hall_id,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}