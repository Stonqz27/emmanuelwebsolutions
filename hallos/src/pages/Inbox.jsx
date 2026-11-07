import { Link } from 'react-router-dom';
import { Inbox as InboxIcon, MailOpen, Megaphone, Wrench, Bell } from 'lucide-react';
import { useInbox } from '@/hooks/useInbox';
import PageHeader from '@/components/PageHeader';
import LoadingCards from '@/components/LoadingCards';
import EmptyState from '@/components/EmptyState';
import { timeAgo } from '@/lib/time';
import { cn } from '@/lib/utils';

const TYPE_ICON = { announcement: Megaphone, report: Wrench, system: Bell };

export default function Inbox() {
  const { items, unread, loading, error, markRead, markAllRead } = useInbox();

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        subtitle="Everything your hall staff posts, plus updates on the reports you filed or confirmed."
        action={unread > 0 ? (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-[11.5px] font-bold text-brand-navy transition hover:border-brand-navy/25"
          >
            <MailOpen className="h-3.5 w-3.5" />
            Mark all read
          </button>
        ) : null}
      />

      {loading && <LoadingCards rows={3} />}
      {!loading && error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-[12.5px] font-medium text-rose-700">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <EmptyState
          icon={InboxIcon}
          title="Your inbox is empty"
          description="Announcements from approved staff and updates on your shared-space reports will land here."
        />
      )}

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = TYPE_ICON[item.type] ?? Bell;
          return (
            <div
              key={item.id}
              className={cn(
                'card-surface flex items-start gap-3 p-3.5 transition',
                !item.is_read && 'border-brand-orange/25 bg-brand-orangeSoft/25',
              )}
            >
              <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', item.is_read ? 'bg-brand-navy/[0.05] text-brand-navy/45' : 'bg-brand-orange/12 text-brand-orange')}>
                <Icon className="h-[16px] w-[16px]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-heading text-[13px] font-bold leading-snug text-brand-navy">{item.title}</p>
                  {!item.is_read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />}
                </div>
                {item.body && <p className="mt-0.5 line-clamp-2 text-[12px] leading-relaxed text-muted-foreground">{item.body}</p>}
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[10.5px] text-muted-foreground">{timeAgo(item.created_date)}</span>
                  {item.acknowledged_at && <span className="text-[10.5px] font-semibold text-emerald-600">Acknowledged</span>}
                  {item.link && (
                    <Link
                      to={item.link}
                      onClick={() => markRead(item)}
                      className="text-[10.5px] font-bold text-brand-orange"
                    >
                      Open
                    </Link>
                  )}
                  {!item.is_read && (
                    <button onClick={() => markRead(item)} className="text-[10.5px] font-semibold text-brand-navy/50">
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}