import { useState } from 'react';
import { BellRing, Loader2 } from 'lucide-react';
import { db } from '@/api/base44Client';
import { formatClock } from '@/lib/time';

/** Staff-triggered in-app hall-wide announcement, not an automatic push service. */
export default function BroadcastClosingButton({ hall, today }) {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  if (!hall || !today || today.status !== 'confirmed' || today.is_cancelled || !today.close_time) return null;

  const closingTime = formatClock(today.close_time);
  async function send() {
    if (!window.confirm(`Publish today's visitation closing time (${closingTime}) to all approved ${hall.name} residents in HallOS? This sends an in-app notice, NOT an SMS or phone push.`)) return;
    setError(''); setResult(''); setSending(true);
    try {
      const res = await db.functions.invoke('publishAnnouncement', {
        hall_id:hall.id, floor:'', category:'Visitation', priority:'high',
        title:`Visitation closing time: ${closingTime}`,
        body:`Hall staff confirmed today's visitation closing time as ${closingTime} Eastern. Guests should follow the residence hall's checkout procedures. Please contact the front desk if the schedule has changed or you need assistance.`,
        requires_ack:false,
      });
      setResult(`Published to HallCast · ${res.data?.notified ?? 0} in-app inbox notifications created.`);
    } catch (e) { setError(e?.response?.data?.error || e?.message || 'Could not publish visitation reminder.'); }
    finally { setSending(false); }
  }
  return <div className="mb-4 rounded-2xl border border-brand-orange/25 bg-brand-orangeSoft/35 p-4">
    <h3 className="font-heading text-[13px] font-bold text-brand-navy">HallCast visitation broadcast</h3>
    <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">Staff can announce today's confirmed closing time to approved residents of this hall. This is a manual in-app message, not a background phone alert.</p>
    <button type="button" disabled={sending} onClick={send} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-[12px] font-bold text-white disabled:opacity-50">
      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />} Broadcast to this hall
    </button>
    {result && <p role="status" className="mt-2 text-[11px] font-semibold text-emerald-700">{result}</p>}
    {error && <p role="alert" className="mt-2 text-[11px] font-semibold text-rose-700">{error}</p>}
  </div>;
}
