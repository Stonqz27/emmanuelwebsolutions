import { db } from '@/api/base44Client';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useSession } from '@/lib/session';
import PageHeader from '@/components/PageHeader';
import HallPicker from '@/components/membership/HallPicker';
import MembershipStatusCard from '@/components/membership/MembershipStatusCard';
import { OFFICIAL_NOTICE } from '@/lib/constants';

export default function Welcome() {
  const { halls, profile, hall, isAdmin, refresh } = useSession();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const requested = query.get('returnTo') || '/';
  // Only internal relative destinations are allowed, even if the query was altered.
  const returnTo = /^\/space\/[A-Za-z0-9_-]{1,128}$/.test(requested) ? requested : '/';
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [picking, setPicking] = useState(false);

  const status = profile?.membership_status || 'none';
  const showPicker = picking || !profile?.hall_id || status === 'rejected';
  const hallName = hall?.name || halls.find((h) => h.id === profile?.hall_id)?.name || '';

  const submit = async ({ hall_id, floor }) => {
    setSaving(true);
    setError('');
    try {
      const res = await db.functions.invoke('saveResidentProfile', { hall_id, floor });
      await refresh();
      setPicking(false);
      if (res.data?.membership_status === 'approved') navigate(returnTo);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Could not send your request right now.');
    } finally {
      setSaving(false);
    }
  };

  const title = showPicker
    ? profile?.hall_id ? 'Choose a hall' : 'Welcome to HallOS'
    : status === 'approved' ? 'Your hall' : 'Your membership';

  const subtitle = showPicker
    ? 'Pick the residence hall you live in. Staff roles are never self-selected, and private hall records unlock only after staff approve your membership.'
    : 'Only approved memberships unlock hall announcements, shared-space reports and visitation hours.';

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Set up" title={title} subtitle={subtitle} />

      {!showPicker && (
        <div className="mb-3">
          <MembershipStatusCard
            profile={profile}
            hallName={hallName}
            onChangeHall={() => {
              setError('');
              setPicking(true);
            }}
          />
        </div>
      )}

      {showPicker && (
        <HallPicker
          halls={halls}
          initialHallId={profile?.hall_id || ''}
          initialFloor={profile?.floor || ''}
          saving={saving}
          error={error}
          onSubmit={submit}
        />
      )}

      {isAdmin && <Link to="/staff" className="mt-3 block rounded-xl bg-brand-navy px-4 py-3 text-center text-[12px] font-bold text-white">Open platform admin setup</Link>}
      <p className="mt-4 px-2 text-center text-[10.5px] leading-relaxed text-muted-foreground/80">{OFFICIAL_NOTICE}</p>
    </div>
  );
}