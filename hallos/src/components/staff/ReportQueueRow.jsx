import { useState } from 'react';
import { ClipboardList, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ACTIONS = [
  { value: 'acknowledged', label: 'Acknowledge' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Mark fixed' },
];

export default function ReportQueueRow({ report, onUpdate }) {
  const [busy, setBusy] = useState(null);
  const [note, setNote] = useState('');
  const [showNote, setShowNote] = useState(false);
  const [editingReference, setEditingReference] = useState(false);
  const [ticketRef, setTicketRef] = useState(report.official_ticket_ref || '');
  const [saveError, setSaveError] = useState('');
  const [statusError, setStatusError] = useState('');

  const update = async (status) => {
    setBusy(status); setStatusError('');
    try {
      await onUpdate(report, status, note);
      setShowNote(false);
      setNote('');
    } catch (error) {
      setStatusError(error?.response?.data?.error || error?.message || 'Could not update report status.');
    } finally {
      setBusy(null);
    }
  };

  async function saveReference(event) {
    event.preventDefault();
    setBusy('reference'); setSaveError('');
    try {
      await onUpdate(report, report.status, undefined, ticketRef.trim());
      setEditingReference(false);
    } catch (error) {
      setSaveError(error?.message || 'Could not save this reference.');
    } finally { setBusy(null); }
  }

  return (
    <div className="card-surface p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-heading text-[13.5px] font-bold text-brand-navy">{report.space_name}</p>
          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
            {report.category}
            {report.floor ? ` · Floor ${report.floor}` : ''}
            {report.confirmation_count
              ? ` · ${report.confirmation_count} ${report.confirmation_count === 1 ? 'resident confirmation' : 'resident confirmations'}`
              : ''}
          </p>
        </div>
        {report.urgency === 'urgent' && (
          <span className="shrink-0 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rose-600">Urgent</span>
        )}
      </div>
      <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{report.description}</p>

      {report.staff_note && (
        <p className="mt-2 rounded-xl bg-secondary/70 px-2.5 py-1.5 text-[11.5px] text-brand-navy/70">Note: {report.staff_note}</p>
      )}

      {report.official_ticket_ref && !editingReference && <div className="mt-2 rounded-lg border border-brand-orange/20 bg-brand-orangeSoft/60 px-3 py-2 text-[11px] text-brand-navy"><span className="font-bold">Staff-entered official reference:</span> {report.official_ticket_ref}<span className="mt-0.5 block text-[10px] text-muted-foreground">Not automatically verified or synced with MorganReady.</span></div>}
      {editingReference && <form onSubmit={saveReference} className="mt-2 rounded-xl border border-brand-orange/25 bg-brand-orangeSoft/40 p-3">
        <label htmlFor={`work-order-${report.id}`} className="text-[11px] font-bold text-brand-navy">Optional MorganReady work-order reference</label>
        <div className="mt-1.5 flex gap-2">
          <input id={`work-order-${report.id}`} value={ticketRef} onChange={e => setTicketRef(e.target.value)} maxLength={80} placeholder="Enter reference manually" className="min-w-0 flex-1 rounded-lg border border-border bg-white px-3 py-2 text-xs text-brand-navy"/>
          <button type="submit" disabled={!!busy} className="rounded-lg bg-brand-navy px-3 py-2 text-xs font-bold text-white disabled:opacity-50">Save</button>
        </div>
        <p className="mt-1.5 text-[10px] text-muted-foreground">Only record a real reference you have received. HallOS cannot verify its status.</p>
        {saveError && <p role="alert" className="mt-1 text-xs text-rose-700">{saveError}</p>}
      </form>}
      {showNote && (
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note for the report"
          className="mt-2 w-full rounded-xl border border-border bg-white px-3 py-2 text-[12.5px] text-brand-navy outline-none focus:border-brand-orange"
        />
      )}

      {statusError && <p role="alert" className="mt-2 text-[11px] font-semibold text-rose-700">{statusError}</p>}
      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {ACTIONS.filter((a) => a.value !== report.status).map((action) => (
          <button
            key={action.value}
            onClick={() => update(action.value)}
            disabled={!!busy}
            className={cn(
              'flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11.5px] font-bold transition disabled:opacity-50',
              action.value === 'resolved'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-border bg-white text-brand-navy hover:border-brand-navy/25',
            )}
          >
            {busy === action.value && <Loader2 className="h-3 w-3 animate-spin" />}
            {action.label}
          </button>
        ))}
        <button type="button" onClick={() => setEditingReference(v => !v)} className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-brand-navy/70"><ClipboardList className="h-3.5 w-3.5"/> Official reference</button>
        <button
          onClick={() => setShowNote((v) => !v)}
          className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-brand-navy/60"
        >
          {showNote ? 'Hide note' : 'Add note'}
        </button>
      </div>
    </div>
  );
}