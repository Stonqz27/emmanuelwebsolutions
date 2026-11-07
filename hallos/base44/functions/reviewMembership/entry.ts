import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireMembershipReviewer, mirrorUserAccess } from '../../shared/access.ts';

// Restricted endpoint for reviewing pending membership. Uses service role only
// AFTER verifying the calling account is a platform admin or approved hall admin.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const reviewer = await requireMembershipReviewer(svc, user);
    if (!reviewer) return Response.json({ error: 'Forbidden' }, { status: 403 });
    const { action = 'list', profile_id, decision, note } = await req.json().catch(() => ({}));
    if (action === 'list') {
      const result = await svc.entities.ResidentProfile.filter({ membership_status: 'pending' });
      const rows = Array.isArray(result) ? result : result?.items ?? [];
      const visible = rows.filter(p => reviewer.isAdmin || p.hall_id === reviewer.staff.hall_id);
      // Never expose private user data beyond what reviewers need.
      return Response.json({ requests: visible.map(p => ({
        id: p.id, user_id: p.user_id, full_name: p.full_name,
        email: p.email, hall_id: p.hall_id, floor: p.floor,
        membership_requested_at: p.membership_requested_at,
      })) });
    }
    if (action !== 'decide' || !profile_id || !['approved', 'rejected'].includes(decision)) {
      return Response.json({ error: 'Invalid review request' }, { status: 400 });
    }
    const profile = await svc.entities.ResidentProfile.get(profile_id).catch(() => null);
    if (!profile || profile.membership_status !== 'pending') {
      return Response.json({ error: 'Pending request not found' }, { status: 404 });
    }
    if (!reviewer.isAdmin && profile.hall_id !== reviewer.staff.hall_id) {
      return Response.json({ error: 'Cannot review another hall' }, { status: 403 });
    }
    const updated = await svc.entities.ResidentProfile.update(profile_id, {
      membership_status: decision,
      membership_note: String(note || '').slice(0, 240),
      reviewed_at: new Date().toISOString(),
      reviewed_by_name: user.full_name || 'Hall staff',
      staff_role: 'resident', staff_status: 'none',
    });
    await mirrorUserAccess(svc, profile.user_id, updated);
    return Response.json({ membership_status: decision, profile_id });
  } catch (error) {
    console.error('reviewMembership', error);
    return Response.json({ error: 'Could not review membership' }, { status: 500 });
  }
}
