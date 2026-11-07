import { useState } from 'react';
import { Check, Clock3, Loader2 } from 'lucide-react';
import { initials, timeAgo } from '@/lib/time';
import { cn } from '@/lib/utils';

export const CATEGORY_STYLES = {
  General: 'bg-slate-100 text-slate-600',
  Visitation: 'bg-orange-50 text-[#C2410C]',
  Maintenance: 'bg-amber-50 text-amber-700',
  Events: 'bg-violet-50 text-violet-700',
  Important: 'bg-rose-50 text-rose-700',
};

const PRIORITY = {
  urgent: { label: 'Urgent', dot: 'bg-rose-500', text: 'text-rose-600' },
  high: { label: 'High priority', dot: 'bg-amber-500', text: 'text-amber-600' },
  normal: { label: 'Standard', dot: 'bg-emerald-500', text: 'text-emerald-600' },
};

export default function AnnouncementCard({ announcement, onAcknowledge, compact = false }) {
  const [saving, setSaving] = useState(false);
  const [ackError, setAckError] = useState('');
  const priority = PRIORITY[announcement.priority] ?? PRIORITY.normal;

  const acknowledge = async () => {
    if (!onAcknowledge) return;
    setSaving(true); setAckError('');
    try {
      await onAcknowledge(announcement);
    } catch (error) {
      setAckError(error?.message || 'Could not acknowledge this announcement.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="card-surface p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.06em]', CATEGORY_STYLES[announcement.category] ?? CATEGORY_STYLES.General)}>
          {announcement.category}
        </span>
        <span className={cn('flex items-center gap-1.5 text-[11px] font-semibold', priority.text)}>
          <span className={cn('h-1.5 w-1.5 rounded-full', priority.dot)} />
          {priority.label}
        </span>
      </div>

      <h3 className={cn('mt-3 font-heading font-bold leading-snug text-brand-navy', compact ? 'text-[15px]' : 'text-[16.5px]')}>
        {announcement.title}
      </h3>
      <p className={cn('mt-1.5 text-[13px] leading-relaxed text-muted-foreground', compact ? 'line-clamp-2' : 'line-clamp-3')}>
        {announcement.body}
      </p>

      {announcement.floor && (
        <p className="mt-2 text-[11.5px] font-medium text-brand-navy/60">Posted to floor {announcement.floor}</p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-navy/5 text-[10.5px] font-bold text-brand-navy">
            {initials(announcement.publisher_name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[12px] font-semibold text-brand-navy">{announcement.publisher_name}</p>
            <p className="truncate text-[10.5px] text-muted-foreground">{announcement.publisher_role}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[11px] text-muted-foreground">
          <Clock3 className="h-3 w-3" />
          {timeAgo(announcement.published_at)}
        </span>
      </div>

      {announcement.requires_ack && (
        <div className="mt-3">
          {announcement.acknowledged ? (
            <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] font-semibold text-emerald-700">
              <Check className="h-3.5 w-3.5" />
              Acknowledged by you
            </div>
          ) : (
            <button
              onClick={acknowledge}
              disabled={saving}
              className="tap flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-navy px-3 py-2.5 text-[12.5px] font-semibold text-white transition hover:bg-brand-ink disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              Acknowledge
            </button>
          )}
        </div>
      )}
      {ackError && <p role="alert" className="mt-2 text-[11px] font-semibold text-rose-700">{ackError}</p>}
    </article>
  );
}