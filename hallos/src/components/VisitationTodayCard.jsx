import { Link } from 'react-router-dom';
import { ArrowUpRight, DoorOpen, Info } from 'lucide-react';
import { formatClock, WEEKDAYS } from '@/lib/time';
import { cn } from '@/lib/utils';

export default function VisitationTodayCard({ visitation }) {
  const state = visitation?.state ?? 'unset';
  const isOpen = state === 'open';
  const unconfirmed = visitation?.status !== 'confirmed';

  return (
    <div className="card-surface overflow-hidden">
      <div className="flex items-start justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {WEEKDAYS[visitation?.weekday ?? new Date().getDay()]} · Eastern
          </p>
          {visitation?.overnight_tail && <p className="mt-1 text-[11px] font-bold text-brand-orange">Overnight hours from {WEEKDAYS[visitation.weekday]}</p>}
          <p className="mt-1.5 font-heading text-[19px] font-extrabold text-brand-navy">
            {visitation?.open_time ? `${formatClock(visitation.open_time)} – ${formatClock(visitation.close_time)}` : 'Not posted'}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[12.5px] font-medium text-muted-foreground">
            <span className={cn('h-1.5 w-1.5 rounded-full', isOpen ? 'bg-emerald-500' : 'bg-brand-navy/30')} />
            {visitation?.detail || 'No hours posted yet'}
          </p>
        </div>
        <div
          className={cn(
            'grid h-10 w-10 shrink-0 place-items-center rounded-2xl',
            isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-brand-navy/[0.055] text-brand-navy/60',
          )}
        >
          <DoorOpen className="h-[18px] w-[18px]" strokeWidth={2} />
        </div>
      </div>

      {unconfirmed && (
        <div className="flex items-start gap-2 border-t border-amber-100 bg-amber-50/70 px-4 py-2.5 text-[11.5px] leading-relaxed text-amber-800 sm:px-5">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Hours are unconfirmed. Always verify with the front desk before signing in guests.
        </div>
      )}

      <Link
        to="/visitation"
        className="flex items-center justify-between border-t border-border/60 px-4 py-3 text-[12.5px] font-semibold text-brand-navy transition hover:bg-secondary/60 sm:px-5"
      >
        Full weekly schedule
        <ArrowUpRight className="h-3.5 w-3.5 text-brand-orange" />
      </Link>
    </div>
  );
}