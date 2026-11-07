import { useState } from 'react';
import { Loader2, ThumbsUp, Wrench, AlertTriangle } from 'lucide-react';
import { ISSUE_CATEGORIES } from '@/lib/constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export default function ReportDialog({ open, onOpenChange, spaces, reports, floors, defaultFloor, initialSpaceId = '', onCreate, onConfirm, onCreated }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-[17px]">Report a shared-space issue</DialogTitle>
          <DialogDescription className="text-[12.5px]">
            This creates a resident report for hall staff. It is not an official facilities work order.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <ReportForm
            spaces={spaces}
            reports={reports}
            floors={floors}
            defaultFloor={defaultFloor}
            initialSpaceId={initialSpaceId}
            onCreate={onCreate}
            onCreated={onCreated}
            onConfirm={onConfirm}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ReportForm({ spaces, reports, floors, defaultFloor, initialSpaceId, onCreate, onCreated, onConfirm, onClose }) {
  const compatibleSpaceTypes = {
    Shower: ['bathroom', 'shower'], Toilet: ['bathroom', 'shower'],
    Leak: ['bathroom', 'shower', 'laundry', 'kitchen', 'other'], Laundry: ['laundry'],
    Trash: ['trash'], Heating: ['other', 'hallway', 'lounge'],
    Other: ['bathroom', 'shower', 'laundry', 'trash', 'kitchen', 'hallway', 'lounge', 'other'],
  };
  const isCompatible = (candidate, selectedCategory) => compatibleSpaceTypes[selectedCategory]?.includes(candidate?.space_type) ?? true;
  const [category, setCategory] = useState('Shower');
  const [spaceId, setSpaceId] = useState(initialSpaceId || '');
  const [floor, setFloor] = useState(spaces.find(s=>s.id === initialSpaceId)?.floor || defaultFloor || floors[0] || '');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('standard');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const space = spaces.find((s) => s.id === spaceId);
  const visibleSpaces = spaces.filter((candidate) => (!floor || !candidate.floor || String(candidate.floor) === String(floor)) && isCompatible(candidate, category));
  const nearby = reports.filter((r) => r.status !== 'resolved' && (
    space ? r.shared_space_id === space.id : r.category === category
  )).slice(0, 3);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!spaceId || !space || (floor && space.floor && String(space.floor) !== String(floor)) || !isCompatible(space, category)) {
      setError('Choose a shared space that matches the selected floor and issue category.');
      return;
    }
    if (!description.trim() || description.trim().length < 8) {
      setError('Add a short description so staff can find the problem.');
      return;
    }
    setSaving(true);
    try {
      const draft = {
        shared_space_id: spaceId,
        space_name: space?.name || 'Shared space',
        floor: space?.floor || floor,
        category,
        description,
        urgency,
      };
      const created = await onCreate(draft);
      onClose();
      onCreated?.(created || draft);
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Could not submit your report.');
    } finally {
      setSaving(false);
    }
  };

  const confirmExisting = async (report) => {
    setBusyId(report.id);
    try {
      await onConfirm(report);
      onClose();
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || 'Could not confirm this issue.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3.5">
      {spaces.length === 0 && <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-[12px] leading-relaxed text-amber-900">No shared spaces have been verified for this residence yet. Ask your RA to register the area in Staff Desk, or use the official maintenance portal from More. HallOS cannot create official work orders.</div>}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Issue category</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {ISSUE_CATEGORIES.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => { setCategory(c); if (spaceId && !isCompatible(space, c)) setSpaceId(''); }}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[12px] font-semibold transition',
                category === c
                  ? 'border-brand-orange bg-brand-orangeSoft text-[#C2410C]'
                  : 'border-border bg-white text-brand-navy/70 hover:border-brand-navy/25',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Shared space</p>
          <Select value={spaceId} onValueChange={(id) => { setSpaceId(id); const next = spaces.find(s=>s.id === id); if(next) setFloor(String(next.floor)); }}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Choose space" /></SelectTrigger>
            <SelectContent>
              {visibleSpaces.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {visibleSpaces.length === 0 && <p className="mt-1 text-[10.5px] text-muted-foreground">No registered space matches this floor and issue type.</p>}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Floor</p>
          {floors.length ? <Select value={floor} onValueChange={(nextFloor) => { setFloor(nextFloor); if (space?.floor && String(space.floor) !== String(nextFloor)) setSpaceId(''); }}>
            <SelectTrigger className="mt-1.5 rounded-xl"><SelectValue placeholder="Choose floor"/></SelectTrigger>
            <SelectContent>{floors.map((f) => <SelectItem key={f} value={f}>Floor {f}</SelectItem>)}</SelectContent>
          </Select> : <p className="mt-1.5 rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-[11px] text-muted-foreground">Not listed for this residence</p>}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">What is wrong?</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          maxLength={600}
          placeholder="Describe the shared space only — never private room details."
          className="mt-1.5 w-full resize-none rounded-xl border border-border bg-white px-3 py-2.5 text-[13.5px] leading-relaxed text-brand-navy outline-none transition focus:border-brand-orange focus:ring-4 focus:ring-brand-orange/10"
        />
      </div>

      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">How urgent is it?</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { value: 'standard', label: 'Standard' },
            { value: 'urgent', label: 'Urgent today' },
          ].map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => setUrgency(option.value)}
              className={cn(
                'rounded-xl border px-3 py-2 text-[12.5px] font-semibold transition',
                urgency === option.value
                  ? 'border-brand-navy bg-brand-navy text-white'
                  : 'border-border bg-white text-brand-navy/70',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {urgency === 'urgent' && (
          <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-[11.5px] leading-relaxed text-rose-700">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Urgent means water everywhere, no heat, a power outage, or an unsafe space. Call the front desk or your resident director now — HallOS does not alert them in real time and is not an official work order.
          </p>
        )}
      </div>

      {nearby.length > 0 && (
        <div className="rounded-2xl border border-brand-orange/25 bg-brand-orangeSoft/50 p-3">
          <p className="text-[11.5px] font-bold text-[#9A3412]">Someone may have already flagged this</p>
          <div className="mt-2 space-y-1.5">
            {nearby.map((report) => (
              <div key={report.id} className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-2">
                <Wrench className="h-3.5 w-3.5 shrink-0 text-brand-orange" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-brand-navy">{report.space_name}</p>
                  <p className="truncate text-[10.5px] text-muted-foreground">{report.description}</p>
                </div>
                {report.confirmed_by_me ? (
                  <span className="shrink-0 text-[10.5px] font-semibold text-emerald-600">Confirmed</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => confirmExisting(report)}
                    disabled={busyId === report.id}
                    className="flex shrink-0 items-center gap-1 rounded-full border border-border px-2 py-1 text-[10.5px] font-bold text-brand-navy"
                  >
                    {busyId === report.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <ThumbsUp className="h-3 w-3" />}
                    Me too
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10.5px] text-[#9A3412]/80">Confirming an existing report is better than adding a duplicate.</p>
        </div>
      )}

      {error && <p className="rounded-xl bg-rose-50 px-3 py-2 text-[12.5px] font-medium text-rose-700">{error}</p>}

      <button
        type="submit"
        disabled={saving || spaces.length === 0}
        className="tap flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-[13.5px] font-bold text-white transition hover:bg-[#EA580C] disabled:opacity-50"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Submit report to hall staff
      </button>
    </form>
  );
}
