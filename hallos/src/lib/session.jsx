import { db } from '@/api/base44Client';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const EMPTY = {
  loading: true,
  user: null,
  profile: null,
  hall: null,
  halls: [],
  isStaff: false,
  isAdmin: false,
  isDemo: false,
  membershipStatus: 'none',
  hasAccess: false,
  needsProfile: true,
};

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [state, setState] = useState(EMPTY);

  const load = useCallback(async () => {
    const res = await db.functions.invoke('getSession', {});
    const data = res.data ?? {};
    setState({
      loading: false,
      user: data.user ?? null,
      profile: data.profile ?? null,
      hall: data.hall ?? null,
      halls: data.halls ?? [],
      isStaff: !!data.isStaff,
      isAdmin: data.user?.role === 'admin',
      isDemo: !!data.hall?.is_demo,
      membershipStatus: data.membershipStatus ?? 'none',
      hasAccess: !!data.hasAccess,
      needsProfile: !!data.needsProfile,
    });
  }, []);

  useEffect(() => {
    load().catch(() => setState((prev) => ({ ...prev, loading: false, needsProfile: true })));
  }, [load]);

  return (
    <SessionContext.Provider value={{ ...state, refresh: load }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}