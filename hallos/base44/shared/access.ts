// Shared access helpers for HallOS backend functions.
// Private hall data requires an APPROVED membership. Staff privileges require
// an approved membership plus an approved staff role. Nothing here trusts the client.

export async function getProfile(svc, userId) {
  const profiles = await svc.entities.ResidentProfile.filter({ user_id: userId });
  return Array.isArray(profiles) && profiles.length ? profiles[0] : null;
}

export function isApprovedMember(profile) {
  return !!profile && profile.membership_status === 'approved' && !!profile.hall_id;
}

export function isApprovedStaff(profile) {
  return isApprovedMember(profile)
    && profile.staff_status === 'approved'
    && (profile.staff_role === 'ra' || profile.staff_role === 'hall_admin');
}

export async function requireApprovedMember(svc, userId) {
  const profile = await getProfile(svc, userId);
  return isApprovedMember(profile) ? profile : null;
}

export async function requireApprovedStaff(svc, userId) {
  const profile = await getProfile(svc, userId);
  return isApprovedStaff(profile) ? profile : null;
}

export async function requireMembershipReviewer(svc, user) {
  if (user.role === 'admin') return { isAdmin: true, staff: null };
  const staff = await requireApprovedStaff(svc, user.id);
  if (!staff || staff.staff_role !== 'hall_admin') return null;
  return { isAdmin: false, staff };
}

export function staffTitle(profile) {
  return profile?.staff_role === 'hall_admin' ? 'Hall Administration' : 'Resident Assistant';
}

/**
 * Keep the locked User mirror in sync. The hall is mirrored ONLY for approved
 * memberships, so row-level security cannot match a pending, rejected or
 * suspended request against any hall record.
 */
export async function mirrorUserAccess(svc, userId, profile) {
  const approved = isApprovedMember(profile);
  try {
    await svc.entities.User.update(userId, {
      hall_id: approved ? profile.hall_id : '',
      staff_role: isApprovedStaff(profile) ? profile.staff_role : 'resident',
      membership_status: profile?.membership_status || 'none',
    });
  } catch (error) {
    console.error('mirrorUserAccess failed', error?.message);
  }
}