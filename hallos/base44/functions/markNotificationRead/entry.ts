import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me().catch(() => null);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    const svc = base44.asServiceRole;
    const { notification_ids } = await req.json().catch(() => ({}));
    if (!Array.isArray(notification_ids) || notification_ids.length > 60) {
      return Response.json({ error: 'Provide up to 60 notification IDs' }, { status: 400 });
    }
    let updated = 0;
    for (const id of new Set(notification_ids)) {
      if (typeof id !== 'string' || !id) continue;
      const item = await svc.entities.Notification.get(id).catch(() => null);
      if (!item || item.user_id !== user.id) continue;
      await svc.entities.Notification.update(id, { is_read: true });
      updated++;
    }
    return Response.json({ updated });
  } catch (error) {
    console.error('markNotificationRead', error);
    return Response.json({ error: 'Could not update inbox' }, { status: 500 });
  }
}
