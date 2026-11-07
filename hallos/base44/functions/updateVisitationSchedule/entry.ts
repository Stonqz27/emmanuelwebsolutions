import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedStaff } from '../../shared/access.ts';

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

// Staff-controlled visitation. HallOS never publishes hours on its own, and a saved
// entry stays unconfirmed unless approved hall staff explicitly confirm it.
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const db = base44;
    const user = await db.auth.me().catch((e) => (e.status === 401 ? null : Promise.reject(e)));
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const svc = db.asServiceRole;
    const staff = await requireApprovedStaff(svc, user.id);
    if (!staff && user.role !== 'admin') {
      return Response.json({ error: 'Only approved hall staff can update visitation hours' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const {
      hall_id, weekday, open_time, close_time, status, notes, entry_id,
      effective_from, effective_to, is_cancelled, is_temporary, reminder_minutes,
    } = body;
    if (!hall_id) return Response.json({ error: 'hall_id is required' }, { status: 400 });
    if (staff && staff.hall_id !== hall_id) {
      return Response.json({ error: 'You can only update your own hall' }, { status: 403 });
    }
    const day = Number(weekday);
    if (!Number.isInteger(day) || day < 0 || day > 6) {
      return Response.json({ error: 'weekday must be 0–6' }, { status: 400 });
    }
    if (open_time && !TIME.test(open_time)) return Response.json({ error: 'open_time must be HH:MM' }, { status: 400 });
    if (close_time && !TIME.test(close_time)) return Response.json({ error: 'close_time must be HH:MM' }, { status: 400 });

    const cancelled = !!is_cancelled;
    if (!cancelled) {
      if (open_time && !close_time) return Response.json({ error: 'Add a closing time' }, { status: 400 });
      if (close_time && !open_time) return Response.json({ error: 'Add an opening time' }, { status: 400 });
    }

    if (effective_from && !DATE.test(effective_from)) {
      return Response.json({ error: 'effective_from must be YYYY-MM-DD' }, { status: 400 });
    }
    if (effective_to && !DATE.test(effective_to)) {
      return Response.json({ error: 'effective_to must be YYYY-MM-DD' }, { status: 400 });
    }
    if (effective_from && effective_to && effective_to < effective_from) {
      return Response.json({ error: 'The end date cannot come before the start date' }, { status: 400 });
    }

    if (is_temporary && (!effective_from || !effective_to)) {
      return Response.json({ error: 'Temporary changes require both a start and end date' }, { status: 400 });
    }
    const reminderValue = Number(reminder_minutes);
    const reminder = Number.isFinite(reminderValue)
      ? Math.min(240, Math.max(0, Math.round(reminderValue)))
      : 60;

    const payload = {
      hall_id,
      weekday: day,
      open_time: open_time || '',
      close_time: close_time || '',
      status: status === 'confirmed' ? 'confirmed' : 'unconfirmed',
      notes: notes ? String(notes).slice(0, 300) : '',
      effective_from: effective_from || '',
      effective_to: effective_to || '',
      is_cancelled: cancelled,
      is_temporary: !!is_temporary,
      reminder_minutes: reminder,
      updated_by_name: staff?.full_name || user.full_name || 'Hall staff',
      is_demo: staff ? !!staff.is_demo : false,
    };

    // Editing a specific entry never updates a different hall's record.
    let match = null;
    if (entry_id) {
      match = await svc.entities.VisitationSchedule.get(entry_id).catch(() => null);
      if (!match || match.hall_id !== hall_id) return Response.json({ error:'Schedule not found in this hall' }, { status:404 });
    } else {
      const found = await svc.entities.VisitationSchedule.filter({ hall_id, weekday: day });
      const rows = Array.isArray(found) ? found : found?.items ?? [];
      match = is_temporary
        ? rows.find(x => x.is_temporary && x.effective_from === effective_from && x.effective_to === effective_to)
        : rows.find(x => !x.is_temporary && !x.effective_from && !x.effective_to);
    }
    const entry = match
      ? await svc.entities.VisitationSchedule.update(match.id, payload)
      : await svc.entities.VisitationSchedule.create(payload);

    return Response.json({ entry });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}