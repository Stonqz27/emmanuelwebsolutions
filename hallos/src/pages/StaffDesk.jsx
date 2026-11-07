import { db } from '@/api/base44Client';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Wrench, CalendarClock, Megaphone } from 'lucide-react';

import { useSession } from '@/lib/session';
import { useHallfix } from '@/hooks/useHallfix';
import { useHallcast } from '@/hooks/useHallcast';
import PageHeader from '@/components/PageHeader';
import SharedSpaceSetup from '@/components/staff/SharedSpaceSetup';
import EmptyState from '@/components/EmptyState';
import LoadingCards from '@/components/LoadingCards';
import ReportQueueRow from '@/components/staff/ReportQueueRow';
import AdminStaffPanel from '@/components/staff/AdminStaffPanel';
import MembershipReviewPanel from '@/components/staff/MembershipReviewPanel';
import PublishAnnouncementButton from '@/components/announcements/PublishAnnouncementButton';
import { timeAgo } from '@/lib/time';

const EMPTY_STATS = { open: 0, acknowledged: 0, in_progress: 0, resolved: 0 };

export default function StaffDesk() {
  const { hall, isStaff, isAdmin, profile } = useSession();
  const { reports, loading, reload } = useHallfix();
  const { announcements, reload: reloadAnnouncements } = useHallcast();
  const [stats, setStats] = useState(EMPTY_STATS);
  const [tick, setTick] = useState(0);

  const canSee = isStaff || isAdmin;

  useEffect(() => {
    const next = { ...EMPTY_STATS };
    reports.forEach(r => { if (Object.hasOwn(next, r.status)) next[r.status]++; });
    setStats(next);
  }, [reports]);

  const updateStatus = useCallback(async (report, status, staff_note, official_ticket_ref) => {
    const payload = { report_id: report.id, status };
    if (typeof staff_note === 'string' && staff_note.trim()) payload.staff_note = staff_note.trim();
    if (typeof official_ticket_ref === 'string') payload.official_ticket_ref = official_ticket_ref;
    await db.functions.invoke('updateReportStatus', payload);
    await reload();
    setTick((n) => n + 1);
  }, [reload]);

  if (!canSee) {
    return (
      <div>
        <PageHeader eyebrow="Staff" title="Staff desk" subtitle="Reserved for approved RAs and hall administrators." />
        <EmptyState
          icon={ShieldCheck}
          title="Staff access only"
          description="Staff privileges are approved by hall administration or a platform admin. Residents cannot grant themselves a staff role."
          action={<Link to="/" className="rounded-xl bg-brand-navy px-3.5 py-2 text-[12.5px] font-bold text-white">Back to dashboard</Link>}
        />
      </div>
    );
  }

  const activeReports = reports.filter((r) => r.status !== 'resolved');
  const needsRecheck = reports.filter((r) => r.status === 'resolved' && (r.still_broken_count || 0) > 0);

  return (
    <div>
      <PageHeader
        eyebrow={profile?.staff_role === 'hall_admin' ? 'Hall admin' : 'Resident Assistant'}
        title="Staff desk"
        subtitle={`${hall?.name} · approved staff tools. Announcements are published under your name and role.`}
        action={<PublishAnnouncementButton onPublished={reloadAnnouncements} />}
      />

      <div className="mb-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: 'New reports', value: stats.open, tone: 'text-brand-navy' },
          { label: 'Acknowledged', value: stats.acknowledged, tone: 'text-amber-600' },
          { label: 'In progress', value: stats.in_progress, tone: 'text-sky-600' },
          { label: 'Marked fixed', value: stats.resolved, tone: 'text-emerald-600' },
        ].map((stat) => (
          <div key={stat.label} className="card-surface p-3.5">
            <p className={`font-heading text-[22px] font-extrabold leading-none ${stat.tone}`}>{stat.value}</p>
            <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mb-4 grid gap-2.5 sm:grid-cols-2">
        <Link to="/visitation" className="tap card-surface flex items-center gap-3 p-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange">
            <CalendarClock className="h-[17px] w-[17px]" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-brand-navy">Update visitation hours</p>
            <p className="text-[11px] text-muted-foreground">Residents see a confirmation badge</p>
          </div>
        </Link>
        <div className="card-surface flex items-center gap-3 p-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-navy/[0.05] text-brand-navy">
            <Megaphone className="h-[17px] w-[17px]" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-brand-navy">{announcements.length} published posts</p>
            <p className="text-[11px] text-muted-foreground">
              {announcements[0] ? `Latest ${timeAgo(announcements[0].published_at)}` : 'Nothing posted yet'}
            </p>
            <p className="mt-1 text-[10.5px] text-brand-navy/55">Generate bougie QR signs from Hall Radar or each shared-space page.</p>
          </div>
        </div>
      </div>

      {needsRecheck.length > 0 && (
        <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50/70 p-3.5">
          <p className="text-[12.5px] font-extrabold text-rose-950">FixLoop · Residents still reporting problems</p>
          <p className="mt-0.5 text-[11px] text-rose-800">A report marked fixed has new resident feedback. Check the area before changing its status.</p>
          <div className="mt-2.5 space-y-2">
            {needsRecheck.map(r => (
              <div key={r.id} className="flex items-center justify-between gap-2 rounded-xl bg-white p-2.5">
                <div className="min-w-0"><p className="truncate text-xs font-bold text-brand-navy">{r.space_name}</p><p className="text-[11px] text-rose-700">{r.still_broken_count} still broken · {r.fixed_count || 0} looks fixed</p></div>
                <button onClick={() => updateStatus(r, 'open', 'Follow-up requested through FixLoop')} className="shrink-0 rounded-lg bg-brand-navy px-2.5 py-2 text-[11px] font-bold text-white">Reopen</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="mb-3 flex items-center justify-between px-0.5">
        <h2 className="font-heading text-[15px] font-bold text-brand-navy">Report queue</h2>
        <span className="text-[11.5px] font-semibold text-muted-foreground">{activeReports.length} active</span>
      </div>

      {loading && <LoadingCards rows={2} />}
      {!loading && activeReports.length === 0 && (
        <EmptyState icon={Wrench} title="Nothing waiting on you" description="Resident reports from your hall will appear here as soon as they are filed." />
      )}
      <div className="space-y-2.5">
        {activeReports.map((report) => (
          <ReportQueueRow key={report.id} report={report} onUpdate={updateStatus} />
        ))}
      </div>

      {reports.some((r) => r.status === 'resolved') && (
        <div className="mt-5">
          <h2 className="mb-2.5 px-0.5 font-heading text-[15px] font-bold text-brand-navy">Recently marked fixed</h2>
          <div className="card-surface divide-y divide-border/60">
            {reports.filter((r) => r.status === 'resolved').slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <p className="truncate text-[12.5px] font-medium text-brand-navy">{report.space_name}</p>
                <span className="shrink-0 text-[10.5px] font-semibold text-emerald-600">Marked fixed · {report.fixed_count || 0} verified</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <SharedSpaceSetup onCreated={reload}/>

      <div className="mt-5">
        <div className="mb-2.5 flex items-center justify-between px-0.5">
          <h2 className="font-heading text-[15px] font-bold text-brand-navy">Membership requests</h2>
          <span className="text-[11px] font-semibold text-muted-foreground">Approval unlocks hall records</span>
        </div>
        <MembershipReviewPanel canReview={isAdmin || profile?.staff_role === 'hall_admin'} />
      </div>

      {isAdmin && (
        <div className="mt-5">
          <h2 className="mb-2.5 px-0.5 font-heading text-[15px] font-bold text-brand-navy">Platform admin</h2>
          <AdminStaffPanel />
        </div>
      )}

      <p className="mt-5 rounded-2xl bg-secondary/70 px-4 py-3 text-[11px] leading-relaxed text-brand-navy/60">
        Reports you acknowledge here are resident reports, not official facilities work orders. Demo hall staff are fictional and are not Morgan State employees.
      </p>
    </div>
  );
}