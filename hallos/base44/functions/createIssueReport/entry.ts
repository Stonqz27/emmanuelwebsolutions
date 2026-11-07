import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedMember } from '../../shared/access.ts';

const CATEGORIES = ['Shower', 'Toilet', 'Leak', 'Laundry', 'Trash', 'Heating', 'Other'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const profile = await requireApprovedMember(svc, user.id);
    if (!profile) return Response.json({ error: 'Approved membership required' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    if (body.hall_id && body.hall_id !== profile.hall_id) {
      return Response.json({ error: 'Not your hall' }, { status: 403 });
    }
    if (!CATEGORIES.includes(body.category)) return Response.json({ error: 'Invalid category' }, { status: 400 });
    const description = String(body.description || '').trim();
    if (description.length < 8 || description.length > 600) {
      return Response.json({ error: 'Description must be 8–600 characters' }, { status: 400 });
    }
    if (!body.shared_space_id) return Response.json({ error: 'Select a shared space' }, { status: 400 });
    const space = await svc.entities.SharedSpace.get(body.shared_space_id).catch(() => null);
    if (!space || space.hall_id !== profile.hall_id) {
      return Response.json({ error: 'Invalid shared space for this hall' }, { status: 403 });
    }
    if (body.floor && String(body.floor) !== String(space.floor || '')) {
      return Response.json({ error: 'Selected floor does not match the shared space' }, { status: 400 });
    }
    const compatible = {
      Shower: ['bathroom', 'shower'], Toilet: ['bathroom', 'shower'],
      Leak: ['bathroom', 'shower', 'laundry', 'kitchen', 'other'], Laundry: ['laundry'],
      Trash: ['trash'], Heating: ['other', 'hallway', 'lounge'],
      Other: ['bathroom', 'shower', 'laundry', 'trash', 'kitchen', 'hallway', 'lounge', 'other'],
    };
    if (!compatible[body.category]?.includes(space.space_type)) {
      return Response.json({ error: 'Issue category does not match the shared space' }, { status: 400 });
    }
    const report = await svc.entities.IssueReport.create({
      hall_id: profile.hall_id,
      shared_space_id: space.id,
      space_name: space.name,
      floor: String(space.floor || ''),
      category: body.category,
      description,
      urgency: body.urgency === 'urgent' ? 'urgent' : 'standard',
      status: 'open',
      confirmation_count: 1,
      staff_note: '',
      is_demo: !!profile.is_demo,
    });
    await svc.entities.IssueConfirmation.create({
      report_id: report.id, user_id: user.id, hall_id: profile.hall_id,
    });
    return Response.json({ report }, { status: 201 });
  } catch (error) {
    console.error('createIssueReport', error);
    return Response.json({ error: 'Could not save report' }, { status: 500 });
  }
}
