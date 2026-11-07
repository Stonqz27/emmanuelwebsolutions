import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BellRing, X } from 'lucide-react';
import { db } from '@/api/base44Client';
import { useSession } from '@/lib/session';
import { asRows } from '@/lib/records';

/** Polls while the app tab is open. This is NOT background/mobile push. */
export default function HallLiveAlerts() {
  const { user, hasAccess } = useSession();
  const seen = useRef(new Set());
  const initialized = useRef(false);
  const [latest, setLatest] = useState(null);
  useEffect(() => {
    seen.current = new Set(); initialized.current = false; setLatest(null);
    if (!user?.id || !hasAccess) return undefined;
    let alive = true;
    let busy = false;
    async function poll() {
      if (!alive || busy || document.visibilityState === 'hidden') return;
      busy = true;
      try {
        const page = await db.entities.Notification.filter({user_id:user.id}, '-created_date', 30);
        if (!alive) return;
        const items = asRows(page);
        const fresh = items.filter(n => !seen.current.has(n.id) && !n.is_read);
        items.forEach(n => seen.current.add(n.id));
        if (initialized.current && fresh.length) setLatest(fresh[0]);
        initialized.current = true;
      } catch { /* connectivity trouble shouldn't break navigation */ }
      finally { busy = false; }
    }
    poll();
    const id = window.setInterval(poll, 20000);
    document.addEventListener('visibilitychange', poll);
    return () => { alive = false; window.clearInterval(id); document.removeEventListener('visibilitychange', poll); };
  }, [user?.id, hasAccess]);
  if (!hasAccess) return null;
  return (
    <>
      {latest && <div role="status" className="fixed left-4 right-4 top-16 z-[65] mx-auto flex max-w-md items-start gap-3 rounded-2xl border border-brand-orange/25 bg-white p-3.5 shadow-xl lg:left-auto lg:right-5 lg:top-5">
        <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
        <div className="min-w-0 flex-1"><p className="font-heading text-[13px] font-bold text-brand-navy">{latest.title}</p><p className="mt-1 line-clamp-2 text-[12px] text-muted-foreground">{latest.body}</p><Link onClick={()=>setLatest(null)} to="/inbox" className="mt-1.5 inline-block text-[11px] font-bold text-brand-orange">View in Inbox</Link></div>
        <button type="button" aria-label="Dismiss notification" onClick={()=>setLatest(null)} className="rounded-lg p-1 text-brand-navy/60"><X className="h-4 w-4" /></button>
      </div>}
    </>
  );
}
