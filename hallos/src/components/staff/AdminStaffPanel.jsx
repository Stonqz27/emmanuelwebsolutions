import { db } from '@/api/base44Client';
import { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

import { useSession } from '@/lib/session';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminStaffPanel() {
  const { halls, refresh } = useSession();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('ra');
  const [hallId, setHallId] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await db.functions.invoke('assignStaffRole', {
        email: email.trim().toLowerCase(),
        staff_role: role,
        hall_id: hallId || undefined,
      });
      setMessage(role === 'resident'
        ? 'Staff privileges removed for that account.'
        : 'Staff privileges approved. They can now publish and manage reports.');
      setEmail('');
      await refresh();
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Could not update that account.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card-surface p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-navy text-white">
          <ShieldCheck className="h-4 w-4" />
        </span>
        <div>
          <p className="font-heading text-[13.5px] font-bold text-brand-navy">Approve staff privileges</p>
          <p className="text-[11px] text-muted-foreground">Platform admin only. Staff status cannot be self-selected.</p>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-brand-orange/20 bg-brand-orangeSoft p-3">
        <p className="text-[12px] font-bold text-brand-navy">First-time setup</p>
        <p className="mt-1 text-[11px] text-muted-foreground">Load Morgan’s 12 published university-managed housing options (on and off campus) with their separate maintenance routes. Existing reports are preserved, and no real-space layouts or maintenance incidents are invented.</p>
        <button type="button" disabled={initializing} onClick={async () => {
          setInitializing(true); setError(''); setMessage('');
          try { const result = await db.functions.invoke('bootstrapHallOS', {}); setMessage(`Morgan residence catalog checked: ${result.data?.catalog_count ?? 0} locations · ${result.data?.created ?? 0} added · ${result.data?.updated ?? 0} refreshed.`); await refresh(); }
          catch(e) { setError(e?.response?.data?.error || e?.message || 'Setup failed'); }
          finally { setInitializing(false); }
        }} className="mt-2 rounded-lg bg-brand-orange px-3 py-2 text-[11px] font-bold text-white">{initializing ? 'Initializing…' : 'Load / refresh Morgan residences'}</button>
      </div>
      <form onSubmit={submit} className="mt-3.5 space-y-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@morgan.edu"
          className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-[13px] text-brand-navy outline-none focus:border-brand-orange"
        />
        <div className="grid grid-cols-2 gap-2.5">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ra">Resident Assistant</SelectItem>
              <SelectItem value="hall_admin">Hall Admin</SelectItem>
              <SelectItem value="resident">Remove staff role</SelectItem>
            </SelectContent>
          </Select>
          <Select value={hallId} onValueChange={setHallId}>
            <SelectTrigger className="rounded-xl"><SelectValue placeholder="Their hall" /></SelectTrigger>
            <SelectContent>
              {halls.map((hall) => (
                <SelectItem key={hall.id} value={hall.id}>{hall.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {message && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-medium text-emerald-700">{message}</p>}
        {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-[12px] font-medium text-rose-700">{error}</p>}

        <button
          type="submit"
          disabled={saving || !email.trim()}
          className="tap flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:bg-brand-ink disabled:opacity-50"
        >
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          Save staff status
        </button>
      </form>
    </div>
  );
}