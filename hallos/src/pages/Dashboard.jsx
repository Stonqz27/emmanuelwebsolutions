import { useMemo } from 'react';
import { ArrowRight, ShieldCheck, Megaphone, Radar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSession } from '@/lib/session';
import { useHallcast } from '@/hooks/useHallcast';
import { useHallfix } from '@/hooks/useHallfix';
import { useVisitation } from '@/hooks/useVisitation';
import HeroGreeting from '@/components/dashboard/HeroGreeting';
import QuickActions from '@/components/dashboard/QuickActions';
import AnnouncementCard from '@/components/AnnouncementCard';
import VisitationTodayCard from '@/components/VisitationTodayCard';
import ReportRow from '@/components/ReportRow';
import LoadingCards from '@/components/LoadingCards';

export default function Dashboard() {
  const { user, hall, profile, isStaff } = useSession();
  const { announcements, loading: announcementsLoading, acknowledge } = useHallcast();
  const { reports, loading: reportsLoading, confirm } = useHallfix();
  const { today, todayState } = useVisitation();
  const visitation = useMemo(() => ({ ...(today || {}), ...todayState }), [today, todayState]);
  const openReports = useMemo(() => reports.filter(r => r.status !== 'resolved').slice(0, 2), [reports]);

  return <div className="space-y-6">
    <HeroGreeting user={user} hall={hall} profile={profile} visitation={visitation}/>
    <QuickActions/>

    <section aria-labelledby="hallos-hours-heading">
      <div className="mb-2.5 flex items-center justify-between"><h2 id="hallos-hours-heading" className="font-heading text-[15px] font-extrabold text-brand-navy">Visitation today</h2><Link to="/visitation" className="text-[12px] font-bold text-brand-orange hover:underline">View week <ArrowRight className="inline h-3.5 w-3.5"/></Link></div>
      <VisitationTodayCard visitation={visitation}/>
    </section>

    <section aria-labelledby="hallos-updates-heading">
      <div className="mb-2.5 flex items-center justify-between"><h2 id="hallos-updates-heading" className="font-heading text-[15px] font-extrabold text-brand-navy">Latest from your hall</h2><Link to="/hallcast" className="text-[12px] font-bold text-brand-orange hover:underline">All updates <ArrowRight className="inline h-3.5 w-3.5"/></Link></div>
      {announcementsLoading ? <LoadingCards rows={1}/> : announcements.length ? <AnnouncementCard announcement={announcements[0]} compact onAcknowledge={acknowledge}/> : <div className="card-surface flex items-center gap-3 p-4"><Megaphone className="h-5 w-5 shrink-0 text-brand-navy/40"/><p className="text-[12.5px] text-muted-foreground">No announcements yet. Verified staff updates will show here.</p></div>}
    </section>

    <section aria-labelledby="hallos-issues-heading">
      <div className="mb-2.5 flex items-center justify-between"><h2 id="hallos-issues-heading" className="font-heading text-[15px] font-extrabold text-brand-navy">Shared-space issues</h2><Link to="/radar" className="text-[12px] font-bold text-brand-orange hover:underline">Explore spaces <ArrowRight className="inline h-3.5 w-3.5"/></Link></div>
      {reportsLoading ? <LoadingCards rows={1}/> : openReports.length ? <div className="space-y-2.5">{openReports.map(report => <ReportRow key={report.id} report={report} onConfirm={confirm}/>)}</div> : <Link to="/radar" className="card-surface flex items-center gap-3 p-4 transition hover:border-brand-orange/30"><Radar className="h-5 w-5 shrink-0 text-brand-orange"/><p className="min-w-0 flex-1 text-[12.5px] text-muted-foreground">No shared-space issues reported. Check a space or scan its QR code.</p><ArrowRight className="h-4 w-4 text-brand-navy/45"/></Link>}
    </section>

    {isStaff && <Link to="/staff" className="tap flex items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 text-[12px] font-bold text-brand-navy"><ShieldCheck className="h-4 w-4 text-brand-orange"/> Open staff desk <ArrowRight className="ml-auto h-4 w-4 text-brand-navy/35"/></Link>}
    <p className="pb-2 text-center text-[10.5px] leading-relaxed text-muted-foreground">HallOS is a student-built resource, not an official university system. For urgent problems, contact hall staff directly.</p>
  </div>;
}
