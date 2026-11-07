import { useState } from 'react';
import { BellOff, CalendarClock, ExternalLink, Pencil, Plus, ShieldCheck } from 'lucide-react';
import { useSession } from '@/lib/session';
import { useVisitation } from '@/hooks/useVisitation';
import PageHeader from '@/components/PageHeader';
import LoadingCards from '@/components/LoadingCards';
import EditHoursDialog from '@/components/visitation/EditHoursDialog';
import BroadcastClosingButton from '@/components/visitation/BroadcastClosingButton';
import { clockOffset, formatClock, formatDateShort, nyNow, WEEKDAYS, WEEKDAYS_SHORT } from '@/lib/time';
import { cn } from '@/lib/utils';
import { MORGAN_VISITATION_POLICY, MORGAN_VISITATION_FAQ_URL } from '@/lib/visitationPolicy';

const STATE_TONE = {
  open: 'text-emerald-300',
  cancelled: 'text-rose-300',
  closed: 'text-white/55',
  unset: 'text-white/55',
};

export default function Visitation() {
  const { isStaff, hall } = useSession();
  const { entries, today, todayState, loading, error, save } = useVisitation();
  const [editing, setEditing] = useState(null);
  const todayIndex = nyNow().weekday;
  const missingDays = [0, 1, 2, 3, 4, 5, 6].filter((day) => !entries.some((entry) => entry.weekday === day && !entry.is_temporary));

  const reminderMinutes = typeof today?.reminder_minutes === 'number' ? today.reminder_minutes : 60;
  const reminderClock = today?.close_time && !today?.is_cancelled
    ? clockOffset(today.close_time, -reminderMinutes)
    : null;

  return (
    <div>
      <PageHeader
        eyebrow="Visitation"
        title="Hours for your hall"
        subtitle="Visitation runs on Eastern Time. Hours stay marked unconfirmed until approved hall staff publish and confirm them."
        action={isStaff ? (
          <button
            onClick={() => setEditing({ weekday: todayIndex })}
            className="tap flex items-center gap-1.5 rounded-xl bg-brand-orange px-3.5 py-2.5 text-[12.5px] font-bold text-white shadow-[0_14px_30px_-18px_rgba(249,115,22,0.9)] transition hover:bg-[#EA580C]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add hours
          </button>
        ) : null}
      />

      {loading && <LoadingCards rows={2} />}

      {!loading && (
        <>
          <div className="mb-4 overflow-hidden rounded-[24px] bg-brand-navy p-5 text-white shadow-lift">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/45">
              Today · {WEEKDAYS[todayIndex]} · Eastern
            </p>
            {today?.overnight_tail && <p className="mt-1 text-[11px] font-semibold text-orange-200">Overnight hours from {WEEKDAYS[today.weekday]}</p>}
            <p className="mt-2 font-heading text-[26px] font-extrabold leading-none">
              {today?.is_cancelled
                ? 'Cancelled'
                : today?.open_time
                  ? `${formatClock(today.open_time)} – ${formatClock(today.close_time)}`
                  : 'Not posted'}
            </p>
            <p className={cn('mt-2 flex items-center gap-2 text-[12.5px] font-semibold', STATE_TONE[todayState.state] || 'text-white/55')}>
              <span className={cn('h-1.5 w-1.5 rounded-full', todayState.state === 'open' ? 'bg-emerald-400' : todayState.state === 'cancelled' ? 'bg-rose-400' : 'bg-white/40')} />
              {todayState.detail}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {today?.is_temporary && (
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white/70">Temporary</span>
              )}
              {(today?.effective_from || today?.effective_to) && (
                <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold text-white/70">
                  {today.effective_from ? formatDateShort(today.effective_from) : 'Now'}
                  {' – '}
                  {today.effective_to ? formatDateShort(today.effective_to) : 'ongoing'}
                </span>
              )}
            </div>

            {today && today.status !== 'confirmed' && !today.is_cancelled && (
              <p className="mt-3 rounded-xl bg-amber-400/15 px-3 py-2 text-[11.5px] leading-relaxed text-amber-200">
                Unconfirmed by hall staff. Check with the front desk before signing in a guest.
              </p>
            )}
            {today?.notes && (
              <p className="mt-3 rounded-xl bg-white/[0.06] px-3 py-2 text-[11.5px] leading-relaxed text-white/70">{today.notes}</p>
            )}
          </div>

          <section className="card-surface mb-4 overflow-hidden" aria-labelledby="morgan-policy-title">
            <div className="border-b border-border/60 bg-brand-orangeSoft/45 px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-brand-orange">Published baseline</p>
                  <h2 id="morgan-policy-title" className="mt-0.5 font-heading text-[15px] font-extrabold text-brand-navy">Morgan visitation guidance</h2>
                </div>
                <a href={MORGAN_VISITATION_FAQ_URL} target="_blank" rel="noopener noreferrer" className="tap inline-flex shrink-0 items-center gap-1 rounded-lg border border-brand-orange/25 bg-white px-2.5 py-2 text-[10.5px] font-extrabold text-brand-navy" aria-label="Open Morgan visitation policy source">Source <ExternalLink className="h-3.5 w-3.5" /></a>
              </div>
              <p className="mt-1.5 text-[11px] leading-relaxed text-brand-navy/70">For Morgan university-owned and leased facilities. Guests must show ID and be registered by the host student.</p>
            </div>
            <div className="divide-y divide-border/60">
              {MORGAN_VISITATION_POLICY.map((rule) => (
                <div key={rule.day} className="grid gap-1 px-4 py-3 sm:grid-cols-[130px_1fr] sm:gap-3">
                  <p className="font-heading text-[12px] font-extrabold text-brand-navy">{rule.day}</p>
                  <div className="space-y-1.5">
                    {rule.windows.map(([time, access]) => <p key={time} className="text-[11px] leading-relaxed text-muted-foreground"><span className="font-bold text-brand-navy">{time}:</span> {access}</p>)}
                  </div>
                </div>
              ))}
            </div>
            <p className="border-t border-border/60 px-4 py-3 text-[10.5px] leading-relaxed text-muted-foreground">Overnight visitation is prohibited unless procedural approval is granted. Hall-specific staff confirmations, cancellations, and approved temporary exceptions take priority over this reference.</p>
          </section>

          {isStaff && <BroadcastClosingButton hall={hall} today={today} />}

          {reminderClock && today?.status === 'confirmed' && (
            <div className="card-surface mb-4 flex items-start gap-3 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-navy/[0.055] text-brand-navy">
                <BellOff className="h-[16px] w-[16px]" />
              </span>
              <div className="min-w-0">
                <p className="font-heading text-[13px] font-bold text-brand-navy">Closing reminder preview</p>
                <p className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">
                  Scheduled reminder preview: {formatClock(reminderClock)}, {reminderMinutes} minutes before close.
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-brand-navy/60">
                  Automated delivery is not enabled. HallCast posts appear in-app; background phone push and SMS are not connected. The countdown works while the app is open.
                </p>
              </div>
            </div>
          )}

          {error && <p className="mb-3 rounded-2xl bg-rose-50 px-4 py-3 text-[12.5px] font-medium text-rose-700">{error}</p>}

          <div className="card-surface divide-y divide-border/60 overflow-hidden">
            {entries.map((entry) => {
              const isToday = entry.weekday === todayIndex;
              const range = entry.effective_from || entry.effective_to;
              return (
                <div key={entry.id} className={cn('flex items-center gap-3 px-4 py-3', isToday && 'bg-brand-orangeSoft/45')}>
                  <span className={cn('w-10 shrink-0 font-heading text-[11.5px] font-bold uppercase tracking-wide', isToday ? 'text-brand-orange' : 'text-brand-navy/45')}>
                    {WEEKDAYS_SHORT[entry.weekday]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-brand-navy">
                      {entry.is_cancelled
                        ? 'Cancelled'
                        : entry.open_time
                          ? `${formatClock(entry.open_time)} – ${formatClock(entry.close_time)}`
                          : 'Not posted'}
                      {entry.is_temporary && (
                        <span className="rounded-full bg-brand-navy/[0.06] px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide text-brand-navy/60">Temp</span>
                      )}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {entry.status === 'confirmed' ? 'Confirmed by hall staff' : 'Unconfirmed'}
                      {entry.updated_by_name ? ` · ${entry.updated_by_name}` : ''}
                      {range
                        ? ` · ${entry.effective_from ? formatDateShort(entry.effective_from) : 'now'}–${entry.effective_to ? formatDateShort(entry.effective_to) : 'ongoing'}`
                        : ''}
                    </p>
                  </div>
                  {isStaff && (
                    <button
                      onClick={() => setEditing(entry)}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-brand-navy transition hover:border-brand-orange/40 hover:text-brand-orange"
                    >
                      <Pencil className="h-3 w-3" />
                      Edit
                    </button>
                  )}
                </div>
              );
            })}
            {entries.length === 0 && (
              <p className="px-4 py-6 text-center text-[12.5px] text-muted-foreground">
                No visitation schedule has been created for {hall?.name} yet.
              </p>
            )}
          </div>

          {isStaff && missingDays.length > 0 && (
            <div className="card-surface mt-3 p-4">
              <p className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                <CalendarClock className="h-3.5 w-3.5" />
                Add another day
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {missingDays.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setEditing({ weekday: day })}
                    className="rounded-full border border-border bg-white px-3 py-1.5 text-[12px] font-semibold text-brand-navy/70 transition hover:border-brand-orange/40 hover:text-brand-orange"
                  >
                    {WEEKDAYS_SHORT[day]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2">
            <p className="flex items-start gap-2 rounded-2xl bg-secondary/70 px-4 py-3 text-[11.5px] leading-relaxed text-brand-navy/70">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-navy/50" />
              HallOS never guesses visitation hours and never activates a schedule on its own. Only approved RAs and hall administrators can post or confirm these hours.
            </p>
            {!isStaff && (
              <p className="px-1 text-[11px] text-muted-foreground">
                Need a change? Ask your RA or the front desk — residents cannot edit this schedule.
              </p>
            )}
          </div>
        </>
      )}

      <EditHoursDialog
        entry={editing}
        onClose={() => setEditing(null)}
        onSave={async (payload) => {
          await save(payload);
          setEditing(null);
        }}
      />
    </div>
  );
}
