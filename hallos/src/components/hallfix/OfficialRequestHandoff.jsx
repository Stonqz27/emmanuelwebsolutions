import { useMemo, useState } from 'react';
import { ArrowUpRight, Check, CheckCheck, ClipboardCopy, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { buildOfficialRequestSummary, categoryHint, officialDestination, officialDestinationLabel, MORGAN_HOUSING_FACILITIES_URL } from '@/lib/morganReady';
import { getResidenceResources } from '@/lib/morganHousing';

/**
 * User-initiated handoff to the official Morgan form. It never creates an official ticket.
 * Reports stay in HallOS; copying/opening the portal does not mark university submission complete.
 */
export default function OfficialRequestHandoff({ report, hall, onClose }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState('');
  const category = categoryHint(report?.category);
  const resources = getResidenceResources(hall);
  const targetLabel = officialDestinationLabel(hall);
  const isDemo = Boolean(hall?.is_demo || report?.is_demo);
  const destination = isDemo ? resources.maintenance_url : officialDestination(hall);
  const rawSummary = useMemo(() => report ? buildOfficialRequestSummary(report, hall) : '', [report, hall]);
  const direct = destination !== MORGAN_HOUSING_FACILITIES_URL;

  function confirmSubmitted() {
    setSubmitted(true);
    setError('');
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(rawSummary);
      setCopied(true);
      setError('');
    } catch {
      setError('Your browser blocked copying. Select the summary below and copy it manually.');
    }
  }

  return <Dialog open={!!report} onOpenChange={value => { if (!value) onClose?.(); }}>
    <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-[520px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-heading text-[19px] font-black text-brand-navy"><span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange"><Wrench className="h-[18px] w-[18px]"/></span> Make it official</DialogTitle>
        <DialogDescription>Use your HallOS report to prepare a separate university maintenance request.</DialogDescription>
      </DialogHeader>
      {report && <div className="space-y-4">
        <div className="relative overflow-hidden rounded-[22px] bg-brand-navy p-4 text-white">
          <div className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-brand-orange/20 blur-3xl" />
          <div className="relative">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-orange-200">HallOS × Morgan services</p>
            <p className="mt-1.5 font-heading text-[18px] font-extrabold">One report. The right portal for your residence.</p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/65">HallOS keeps the community informed. The university handles official work orders through its own portal.</p>
          </div>
        </div>

        {isDemo && <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11.5px] font-semibold text-amber-900">Demo preview only — this is fictional HallOS data. Do not submit a sample request to Morgan.</div>}

        <div className="grid grid-cols-[28px_1fr] gap-x-3 gap-y-3 text-[12px]">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-4 w-4"/></div>
          <div><p className="font-bold text-brand-navy">Community report saved</p><p className="text-muted-foreground">Your HallOS report is separate from an official work order.</p></div>
          <div className="grid h-7 w-7 place-items-center rounded-full bg-brand-orangeSoft text-brand-orange">2</div>
          <div><p className="font-bold text-brand-navy">Copy the details</p><p className="text-muted-foreground">Paste the prepared description into the official form.</p></div>
          <div className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-brand-navy/70">3</div>
          <div><p className="font-bold text-brand-navy">Complete the official submission</p><p className="text-muted-foreground">You must complete the form there: open MorganReady, sign in, and submit the prepared request. MorganReady creates the official ticket.</p></div>
        </div>

        <div className="rounded-2xl border border-brand-orange/20 bg-brand-orangeSoft/50 px-4 py-3">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-orange"><MapPin className="h-3.5 w-3.5"/> {resources.is_morgan_ready ? 'Suggested MorganReady category' : 'Your residence reporting portal'}</div>
          <p className="mt-1 font-heading text-[17px] font-black text-brand-navy">{resources.is_morgan_ready ? category.label : targetLabel}</p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-brand-navy/65">{resources.is_morgan_ready ? category.explanation : 'Category selection varies by property. Choose the matching issue type inside your residence portal.'} Confirm details on Morgan's official facilities guidance.</p>
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between"><label htmlFor="official-summary" className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-navy/60">Ready-to-paste report</label><span className="text-[10.5px] text-muted-foreground">No personal contact info added</span></div>
          <textarea id="official-summary" readOnly value={rawSummary} rows={6} onFocus={e=>e.target.select()} className="w-full resize-y rounded-2xl border border-border bg-secondary/60 px-3.5 py-3 font-mono text-[11.5px] leading-relaxed text-brand-navy"/>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={copySummary} className="tap flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-[12.5px] font-extrabold text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
            {copied ? <CheckCheck className="h-4 w-4 text-emerald-600"/> : <ClipboardCopy className="h-4 w-4 text-brand-orange"/>}{copied ? 'Copied details' : 'Copy report details'}
          </button>
          <a href={destination} target="_blank" rel="noopener noreferrer" onClick={() => setOpened(true)} className="tap flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-[12.5px] font-extrabold text-white hover:bg-[#EA580C]">
            {isDemo ? `Open ${targetLabel} (demo)` : (direct ? `Open ${targetLabel}` : 'Find residence portal')} <ArrowUpRight className="h-4 w-4"/>
          </a>
        </div>
        {opened && <div className="rounded-2xl border border-brand-navy/10 bg-secondary/60 p-3.5">
          <div className="flex items-start gap-2.5">
            <div className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${submitted ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-orangeSoft text-brand-orange'}`}>
              {submitted ? <CheckCheck className="h-3.5 w-3.5"/> : <span className="text-[11px] font-black">4</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-brand-navy">{submitted ? 'Submission recorded in HallOS' : 'Did you submit it in MorganReady?'}</p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{submitted ? 'HallOS is tracking your confirmation. The official ticket remains in MorganReady.' : 'Confirm only after MorganReady accepts the request. HallOS cannot verify the university portal from here.'}</p>
              {!submitted && <div className="mt-2.5 space-y-2">
                <input aria-label="Optional MorganReady ticket reference" value={ticketRef} onChange={e=>setTicketRef(e.target.value)} placeholder="Optional ticket number (e.g. MR-12345)" maxLength={80} className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-[12px] text-brand-navy outline-none focus:border-brand-orange"/>
                <button type="button" onClick={confirmSubmitted} className="tap w-full rounded-xl bg-brand-navy px-3 py-2.5 text-[12px] font-extrabold text-white hover:bg-[#12305f]">I submitted it in MorganReady</button>
              </div>}
              {submitted && ticketRef.trim() && <p className="mt-2 rounded-lg bg-white px-2.5 py-2 text-[11px] text-brand-navy"><span className="font-bold">Reference:</span> {ticketRef.trim()} <span className="text-muted-foreground">(resident-entered, not verified)</span></p>}
            </div>
          </div>
        </div>}
        {error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-800">{error}</p>}
        <p className="flex items-start gap-2 text-[10.5px] leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0"/> HallOS never signs in to MorganReady or reads its database. Official submission and ticket status remain in Morgan's system. For an active leak, contact hall staff immediately.</p>
      </div>}
    </DialogContent>
  </Dialog>;
}
