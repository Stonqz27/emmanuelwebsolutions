import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { WEEKDAYS } from '@/lib/time';
const empty = { weekday: 0, open_time: '', close_time: '', status: 'unconfirmed', notes: '', effective_from: '', effective_to: '', is_cancelled: false, is_temporary: false, reminder_minutes: 60 };
export default function EditHoursDialog({ entry, onClose, onSave }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => { if (entry) { setForm({ ...empty, ...entry }); setError(''); } }, [entry]);
  if (!entry) return null;
  const edit = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const submit = async e => { e.preventDefault(); setSaving(true); setError(''); try { await onSave({ ...form, entry_id:form.id || undefined, weekday: Number(form.weekday), reminder_minutes: Number(form.reminder_minutes) }); } catch (err) { setError(err?.response?.data?.error || err?.message || 'Could not save schedule'); } finally { setSaving(false); } };
  return (
    <div role="presentation" className="fixed inset-0 z-[90] flex items-center justify-center bg-brand-navy/65 p-4">
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="visitation-edit-title" className="max-h-[90vh] w-full max-w-md space-y-3 overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl">
        <div className="flex items-center justify-between"><h2 id="visitation-edit-title" className="font-heading text-[18px] font-bold text-brand-navy">Edit visitation hours</h2><button type="button" onClick={onClose} aria-label="Close"><X className="h-5 w-5" /></button></div>
        <label className="block text-[12px] font-bold">Day<select className="mt-1 block w-full rounded-xl border p-2.5" value={form.weekday} onChange={e => edit('weekday', Number(e.target.value))}>{WEEKDAYS.map((d,i) => <option key={i} value={i}>{d}</option>)}</select></label>
        <div className="grid grid-cols-2 gap-3">{[['open_time','Opens'],['close_time','Closes']].map(([key,label]) => <label key={key} className="text-[12px] font-bold">{label}<input type="time" disabled={form.is_cancelled} value={form[key] || ''} onChange={e => edit(key,e.target.value)} className="mt-1 w-full rounded-xl border p-2.5" /></label>)}</div>
        <div className="grid grid-cols-2 gap-3">{[['effective_from','Effective from'],['effective_to','Until']].map(([key,label]) => <label key={key} className="text-[12px] font-bold">{label}<input type="date" value={form[key] || ''} onChange={e => edit(key,e.target.value)} className="mt-1 w-full rounded-xl border p-2.5" /></label>)}</div>
        <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" checked={!!form.is_cancelled} onChange={e=>edit('is_cancelled',e.target.checked)} /> Visitation cancelled for this schedule</label>
        <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" checked={!!form.is_temporary} onChange={e=>edit('is_temporary',e.target.checked)} /> Temporary schedule</label>
        <label className="block text-[12px] font-bold">Reminder preview (minutes before close)<input type="number" min="0" max="240" value={form.reminder_minutes} onChange={e=>edit('reminder_minutes',e.target.value)} className="mt-1 w-full rounded-xl border p-2.5" /></label>
        <label className="block text-[12px] font-bold">Notes<textarea maxLength={300} value={form.notes || ''} onChange={e=>edit('notes',e.target.value)} className="mt-1 min-h-16 w-full rounded-xl border p-2.5" /></label>
        <label className="flex items-center gap-2 text-[12px] font-semibold"><input type="checkbox" checked={form.status === 'confirmed'} onChange={e=>edit('status',e.target.checked?'confirmed':'unconfirmed')} /> I am authorized to confirm these hours</label>
        <p className="text-[11px] text-muted-foreground">Only confirmed hours should be treated as reliable. This saves schedules; it does not send external notifications.</p>
        {error && <p role="alert" className="text-[12px] text-red-700">{error}</p>}
        <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-[13px] font-bold text-white disabled:opacity-50">{saving && <Loader2 className="h-4 w-4 animate-spin" />} Save visitation hours</button>
      </form>
    </div>
  );
}
