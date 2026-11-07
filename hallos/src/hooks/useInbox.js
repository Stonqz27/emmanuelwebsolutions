import { asRows } from '@/lib/records';
import { db } from '@/api/base44Client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSession } from '@/lib/session';

export function useInbox() {
  const { user } = useSession();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const page = await db.entities.Notification.filter(
        { user_id: user.id },
        '-created_date', 60,
      );
      setItems(asRows(page));
    } catch (e) {
      setError(e?.message || 'Could not load your inbox');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const unread = useMemo(() => items.filter((n) => !n.is_read).length, [items]);

  const markRead = useCallback(async (item) => {
    if (item.is_read) return;
    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, is_read: true } : n)));
    await db.functions.invoke('markNotificationRead', { notification_ids: [item.id] });
  }, []);

  const markAllRead = useCallback(async () => {
    const unreadItems = items.filter((n) => !n.is_read);
    if (!unreadItems.length) return;
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await db.functions.invoke('markNotificationRead', { notification_ids: unreadItems.map(n => n.id) });
  }, [items]);

  return { items, unread, loading, error, reload: load, markRead, markAllRead };
}