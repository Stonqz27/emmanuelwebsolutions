import { asRows } from '@/lib/records';
import { db } from '@/api/base44Client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSession } from '@/lib/session';

export function useHallfix() {
  const { hall, user } = useSession();
  const [reports, setReports] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!hall?.id || !user?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [reportPage, spacePage, confirmations] = await Promise.all([
        db.functions.invoke('listHallReports', {}),
        db.entities.SharedSpace.filter({ hall_id: hall.id }, 'name', 60),
        db.entities.IssueConfirmation.filter({ user_id: user.id }),
      ]);
      setReports(reportPage.data?.reports ?? []);
      setSpaces(asRows(spacePage));
      setConfirmedIds((asRows(confirmations)).map((c) => c.report_id));
    } catch (e) {
      setError(e?.message || 'Could not load hall reports');
    } finally {
      setLoading(false);
    }
  }, [hall?.id, user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const withMine = useMemo(
    () => reports.map((r) => ({ ...r, confirmed_by_me: confirmedIds.includes(r.id) })),
    [reports, confirmedIds],
  );

  const confirm = useCallback(async (report) => {
    const res = await db.functions.invoke('confirmIssueReport', { report_id: report.id });
    setConfirmedIds((prev) => (prev.includes(report.id) ? prev : [...prev, report.id]));
    setReports((prev) => prev.map((r) => (
      r.id === report.id ? { ...r, confirmation_count: res.data?.confirmation_count ?? r.confirmation_count } : r
    )));
  }, []);

  const submitFixFeedback = useCallback(async (report, vote) => {
    const res = await db.functions.invoke('submitFixFeedback', { report_id: report.id, vote });
    setReports((previous) => previous.map((r) => r.id === report.id
      ? { ...r, ...res.data } : r));
    return res.data;
  }, []);

  const createReport = useCallback(async (payload) => {
    const res = await db.functions.invoke('createIssueReport', payload);
    await load();
    return res.data?.report ?? null;
  }, [load]);

  return { reports: withMine, spaces, loading, error, reload: load, confirm, createReport, submitFixFeedback };
}