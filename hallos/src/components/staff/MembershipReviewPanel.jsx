import { useEffect, useState } from 'react';
import { Loader2, UserCheck, Users } from 'lucide-react';
import { db } from '@/api/base44Client';
import { useSession } from '@/lib/session';
export default function MembershipReviewPanel({ canReview }) {
  const { halls } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workingId, setWorkingId] = useState(null);
  const [error, setError] = useState('');
  const load = async () => { if (!canReview) return; setLoading(true); setError(''); try { const r = await db.functions.invoke('reviewMembership',{action:'list'}); setRequests(r.data?.requests || []); } catch(e) {setError(e?.response?.data?.error || e?.message || 'Unable to load requests');} finally { setLoading(false); } };
  useEffect(() => { load(); }, [canReview]);
  const decide = async (id, decision) => { setWorkingId(id); setError(''); try { await db.functions.invoke('reviewMembership', { action:'decide', profile_id:id, decision }); await load(); } catch(e) { setError(e?.response?.data?.error || e?.message || 'Review failed'); } finally { setWorkingId(null); } };
  if (!canReview) return <div className="card-surface p-4 text-[12px] text-muted-foreground">Only approved hall admins and platform admins can review resident membership.</div>;
  return <div className="card-surface p-4"><div className="mb-3 flex items-center gap-2"><Users className="h-4 w-4 text-brand-orange" /><p className="text-[13px] font-bold text-brand-navy">Pending resident requests</p></div>
    {error && <p role="alert" className="mb-2 rounded-lg bg-red-50 p-2 text-[12px] text-red-700">{error}</p>}
    {loading && <p className="flex items-center gap-2 text-[12px] text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading requests</p>}
    {!loading && requests.length===0 && <p className="text-[12px] text-muted-foreground">No requests to review right now.</p>}
    <div className="divide-y">{requests.map(r=><div key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="text-[12px] font-bold text-brand-navy">{r.full_name || 'Resident'}</p><p className="text-[11px] text-muted-foreground">{r.email} · {halls.find(h=>h.id===r.hall_id)?.name || 'Hall'} · Floor {r.floor || '—'}</p></div><div className="flex gap-2"><button disabled={workingId===r.id} onClick={()=>decide(r.id,'approved')} className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white"><UserCheck className="h-3.5 w-3.5" /> Approve</button><button disabled={workingId===r.id} onClick={()=>decide(r.id,'rejected')} className="rounded-lg border px-3 py-2 text-[11px] font-bold text-brand-navy">Reject</button></div></div>)}</div>
  </div>;
}
