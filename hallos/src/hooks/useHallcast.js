import { asRows } from '@/lib/records';
import { db } from '@/api/base44Client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSession } from '@/lib/session';

export function useHallcast() {
  const { hall, profile, user, isStaff } = useSession();
  const [announcements, setAnnouncements] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!hall?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [page, notes] = await Promise.all([
        db.functions.invoke('listHallAnnouncements', {}),
        db.entities.Notification.filter({ user_id: user.id, type: 'announcement' }, '-created_date', 200),
      ]);
      setAnnouncements(page.data?.announcements ?? []);
      setNotifications(Array.isArray(notes) ? notes : asRows(notes));
    } catch (e) {
      setError(e?.message || 'Could not load announcements');
    } finally {
      setLoading(false);
    }
  }, [hall?.id, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = useMemo(() => {
    const byAnnouncement = new Map();
    notifications.forEach((n) => {
      if (n.related_id) byAnnouncement.set(n.related_id, n);
    });
    return announcements
      .filter((a) => isStaff || !a.floor || String(a.floor) === String(profile?.floor || ''))
      .map((a) => ({ ...a, acknowledged: !!byAnnouncement.get(a.id)?.acknowledged_at }));
  }, [announcements, notifications, isStaff, profile?.floor]);

  const acknowledge = useCallback(async (announcement) => {
    await db.functions.invoke('acknowledgeAnnouncement', { announcement_id: announcement.id });
    setAnnouncements((prev) => prev.map((a) => (a.id === announcement.id ? { ...a, acknowledged: true } : a)));
    await load();
  }, [load]);

  return { announcements: visible, notifications, loading, error, reload: load, acknowledge };
}