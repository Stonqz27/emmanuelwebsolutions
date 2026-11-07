import { asRows } from '@/lib/records';
import { db } from '@/api/base44Client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSession } from '@/lib/session';
import { nyNow, nyTodayISO, scheduleInEffect, visitationState } from '@/lib/time';

export function useVisitation() {
  const { hall } = useSession();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [now, setNow] = useState(() => new Date());

  // Keeps the countdown honest without a page reload.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  const load = useCallback(async () => {
    if (!hall?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const page = await db.entities.VisitationSchedule.filter({ hall_id: hall.id }, '-weekday', 40);
      const items = (asRows(page)).slice().sort((a, b) => a.weekday - b.weekday);
      setEntries(items);
    } catch (e) {
      setError(e?.message || 'Could not load visitation hours');
    } finally {
      setLoading(false);
    }
  }, [hall?.id]);

  useEffect(() => {
    load();
  }, [load]);

  // Only entries whose effective window covers today can describe today.
  const today = useMemo(() => {
    const iso = nyTodayISO(now);
    const weekday = nyNow(now).weekday;
    const applicable = entries.filter((entry) => scheduleInEffect(entry, iso));
    function select(entriesForDay) {
      // A temporary dated exception takes precedence over recurring hours.
      return entriesForDay.sort((a,b) => Number(!!b.is_temporary) - Number(!!a.is_temporary))[0] ?? null;
    }
    const priorDate = new Date(`${iso}T12:00:00Z`);
    priorDate.setUTCDate(priorDate.getUTCDate() - 1);
    const previousISO = priorDate.toISOString().slice(0, 10);
    const previousDay = (weekday + 6) % 7;
    const previous = select(entries.filter(entry => entry.weekday === previousDay && scheduleInEffect(entry, previousISO)));
    const previousOpen = previous?.open_time ? Number(previous.open_time.slice(0,2))*60+Number(previous.open_time.slice(3)) : null;
    const previousClose = previous?.close_time ? Number(previous.close_time.slice(0,2))*60+Number(previous.close_time.slice(3)) : null;
    if (previous?.status === 'confirmed' && !previous.is_cancelled && previousOpen !== null
        && previousClose !== null && previousClose < previousOpen && nyNow(now).minutes < previousClose) {
      return {...previous, overnight_tail:true};
    }
    return select(applicable.filter(entry => entry.weekday === weekday));
  }, [entries, now]);

  const todayState = useMemo(() => visitationState(today, now), [today, now]);
  const weekConfirmed = entries.length > 0 && entries.every((entry) => entry.status === 'confirmed');

  const save = useCallback(async (payload) => {
    const res = await db.functions.invoke('updateVisitationSchedule', { hall_id: hall?.id, ...payload });
    await load();
    return res.data?.entry ?? null;
  }, [hall?.id, load]);

  return { entries, today, todayState, weekConfirmed, loading, error, reload: load, save };
}