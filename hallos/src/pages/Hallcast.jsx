import { useMemo, useState } from 'react';
import { Filter, Megaphone, CalendarClock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSession } from '@/lib/session';
import { useHallcast } from '@/hooks/useHallcast';
import PageHeader from '@/components/PageHeader';
import AnnouncementCard from '@/components/AnnouncementCard';
import LoadingCards from '@/components/LoadingCards';
import EmptyState from '@/components/EmptyState';
import PublishAnnouncementButton from '@/components/announcements/PublishAnnouncementButton';
import { ANNOUNCEMENT_CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Hallcast() {
  const { hall, isStaff } = useSession();
  const { announcements, loading, error, acknowledge, reload } = useHallcast();
  const [category, setCategory] = useState('All');

  const filtered = useMemo(
    () => (category === 'All' ? announcements : announcements.filter((a) => a.category === category)),
    [announcements, category],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Hallcast"
        title="Announcements"
        subtitle={`Verified posts from approved ${hall?.short_name || 'hall'} staff. Each one is published by a named person, not an anonymous group chat.`}
        action={isStaff ? <PublishAnnouncementButton onPublished={reload} /> : null}
      />

      <Link to="/visitation" className="tap mb-5 flex items-center gap-3 rounded-2xl border border-border/75 bg-white px-4 py-3 transition hover:border-brand-orange/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange"><CalendarClock className="h-4 w-4" /></span>
        <span className="min-w-0 flex-1"><span className="block font-heading text-[12.5px] font-bold text-brand-navy">Visitation hours & changes</span><span className="block text-[11px] text-muted-foreground">See today's schedule and updates from staff</span></span>
        <ChevronRight className="h-4 w-4 text-brand-navy/30" />
      </Link>

      <div className="no-scrollbar -mx-4 mb-4 flex gap-1.5 overflow-x-auto px-4 pb-1" role="group" aria-label="Filter announcements by category">
        {['All', ...ANNOUNCEMENT_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition',
              category === c
                ? 'border-brand-navy bg-brand-navy text-white'
                : 'border-border bg-white text-brand-navy/70 hover:border-brand-navy/25',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <LoadingCards rows={3} />}

      {!loading && error && (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-[12.5px] font-medium text-rose-700">{error}</p>
      )}

      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          icon={Megaphone}
          title="No announcements here yet"
          description={isStaff
            ? 'Publish the first post for your hall so residents know where to look.'
            : 'When approved staff post for your hall, it will appear here and in your inbox.'}
          action={isStaff ? <PublishAnnouncementButton onPublished={reload} /> : null}
        />
      )}

      <div className="space-y-2.5">
        {filtered.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} onAcknowledge={acknowledge} />
        ))}
      </div>

      {!isStaff && filtered.length > 0 && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <Filter className="h-3 w-3" />
          Only approved hall staff can publish here.
        </p>
      )}
    </div>
  );
}