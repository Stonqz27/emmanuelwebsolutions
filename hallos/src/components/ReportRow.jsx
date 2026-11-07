import { Bath, Droplets, Flame, ShowerHead, Trash2, WashingMachine, Wrench, ThumbsUp, Check, CircleCheck, RotateCcw, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { timeAgo } from '@/lib/time';
import { cn } from '@/lib/utils';

export const ISSUE_ICONS = {
  Shower: ShowerHead,
  Toilet: Bath,
  Leak: Droplets,
  Laundry: WashingMachine,
  Trash: Trash2,
  Heating: Flame,
  Other: Wrench,
};

const STATUS = {
  open: { label: 'Reported', className: 'bg-brand-navy/[0.06] text-brand-navy/70' },
  acknowledged: { label: 'Staff aware', className: 'bg-amber-50 text-amber-700' },
  in_progress: { label: 'In progress', className: 'bg-sky-50 text-sky-700' },
  resolved: { label: 'Staff marked fixed', className: 'bg-emerald-50 text-emerald-700' },
};

export default function ReportRow({ report, onConfirm, onFixFeedback, onOfficialReport, busy }) {
  const [savingVote, setSavingVote] = useState('');
  const [voteError, setVoteError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [confirming, setConfirming] = useState(false);
  async function voteFor(value) {
    setSavingVote(value); setVoteError('');
    try { await onFixFeedback(report, value); }
    catch (error) { setVoteError(error?.message || 'Could not save your feedback.'); }
    finally { setSavingVote(''); }
  }
  async function confirmThisReport() {
    if (!onConfirm) return;
    setConfirming(true); setConfirmError('');
    try { await onConfirm(report); }
    catch (error) { setConfirmError(error?.response?.data?.error || error?.message || 'Could not confirm this issue right now.'); }
    finally { setConfirming(false); }
  }
  const Icon = ISSUE_ICONS[report.category] ?? Wrench;
  const status = STATUS[report.status] ?? STATUS.open;
  const resolved = report.status === 'resolved';

  return (
    <div className="card-surface p-3.5 sm:p-4">
      <div className="flex gap-3">
        <div className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', resolved ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-orangeSoft text-brand-orange')}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate font-heading text-[13.5px] font-bold text-brand-navy">{report.space_name}</p>
            <span className={cn('shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', status.className)}>
              {status.label}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{report.description}</p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-semibold text-brand-navy/70">{report.category}</span>
              {report.floor && (
                <>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>Floor {report.floor}</span>
                </>
              )}
              <span className="h-1 w-1 rounded-full bg-border" />
              <span>{timeAgo(report.created_date)}</span>
            </div>
            {onConfirm && !resolved && (
              report.confirmed_by_me ? (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                  <Check className="h-3 w-3" />
                  Confirmed · {report.confirmation_count}
                </span>
              ) : (
                <button
                  onClick={confirmThisReport}
                  disabled={busy || confirming}
                  className="tap flex shrink-0 items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-navy transition hover:border-brand-orange/40 hover:text-brand-orange disabled:opacity-50"
                >
                  <ThumbsUp className="h-3 w-3" />
                  Me too · {report.confirmation_count}
                </button>
              )
            )}
            {!onConfirm && (
              <span className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-brand-navy/50">
                <ThumbsUp className="h-3 w-3" />
                {report.confirmation_count ?? 0}
              </span>
            )}
          </div>
          {confirmError && <p role="alert" className="mt-2 text-[11px] font-semibold text-rose-700">{confirmError}</p>}
        </div>
      </div>
      {onOfficialReport && !resolved && (
        <div className="mt-3 border-t border-border/70 pt-2.5">
          <button type="button" onClick={() => onOfficialReport(report)} className="tap inline-flex items-center gap-1.5 rounded-lg px-1 py-1 text-[11px] font-bold text-brand-orange hover:text-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
            Prepare official request <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {resolved && onFixFeedback && (
        <div className="mt-3 border-t border-border/70 pt-3">
          <p className="text-[11.5px] font-semibold text-brand-navy">Staff marked this fixed. Is it working now?</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button disabled={!!savingVote} onClick={() => voteFor('fixed')}
              aria-pressed={report.fix_vote_by_me === 'fixed'}
              className={`tap inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition disabled:opacity-50 ${report.fix_vote_by_me === 'fixed' ? 'border-emerald-600 bg-emerald-50 text-emerald-800' : 'border-border bg-white text-brand-navy'}`}>
              <CircleCheck className="h-3.5 w-3.5" /> Looks fixed · {report.fixed_count ?? 0}
            </button>
            <button disabled={!!savingVote} onClick={() => voteFor('still_broken')}
              aria-pressed={report.fix_vote_by_me === 'still_broken'}
              className={`tap inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition disabled:opacity-50 ${report.fix_vote_by_me === 'still_broken' ? 'border-rose-500 bg-rose-50 text-rose-800' : 'border-border bg-white text-brand-navy'}`}>
              <RotateCcw className="h-3.5 w-3.5" /> Still broken · {report.still_broken_count ?? 0}
            </button>
          </div>
          {report.fix_vote_by_me && <p role="status" className="mt-1.5 text-[10.5px] text-muted-foreground">Thanks. Your response is saved and visible to hall staff as an anonymous count.</p>}
          {voteError && <p role="alert" className="mt-1.5 text-[11px] text-rose-700">{voteError}</p>}
        </div>
      )}
    </div>
  );
}