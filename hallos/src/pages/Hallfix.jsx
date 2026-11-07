import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertTriangle, ExternalLink, Phone, Plus, Wrench, QrCode, ChevronRight } from 'lucide-react';
import { useSession } from '@/lib/session';
import { useHallfix } from '@/hooks/useHallfix';
import PageHeader from '@/components/PageHeader';
import ReportRow from '@/components/ReportRow';
import ReportDialog from '@/components/hallfix/ReportDialog';
import LoadingCards from '@/components/LoadingCards';
import EmptyState from '@/components/EmptyState';
import { getResidenceResources, normalizePhoneLink } from '@/lib/morganHousing';
import OfficialRequestHandoff from '@/components/hallfix/OfficialRequestHandoff';

export default function Hallfix() {
  const { hall, profile } = useSession();
  const { reports, spaces, loading, error, confirm, createReport, submitFixFeedback } = useHallfix();
  const [open, setOpen] = useState(false);
  const [handoffReport, setHandoffReport] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSpace = searchParams.get('space') || '';
  useEffect(() => { if (requestedSpace && !loading) setOpen(true); }, [requestedSpace, loading]);
  const changeOpen = (value) => {
    setOpen(value);
    if (!value && requestedSpace) {
      const updated = new URLSearchParams(searchParams);
      updated.delete('space');
      setSearchParams(updated, { replace: true });
    }
  };

  const floors = Array.from({ length: Number(hall?.floor_count || 0) }, (_, i) => String(i + 1));
  const resources = getResidenceResources(hall);
  const urgentNumber = resources.front_desk_phone || resources.after_hours_ra_phone;
  const openReports = reports.filter((r) => r.status !== 'resolved');
  const recentlyFixed = reports.filter((r) => r.status === 'resolved').slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="HallFix"
        title="Shared-space reports"
        subtitle="Report what is broken in shared spaces and confirm what neighbors already reported. No private rooms, and no reporter names on shared reports."
        action={(
          <button
            onClick={() => setOpen(true)}
            className="tap flex items-center gap-1.5 rounded-xl bg-brand-orange px-3.5 py-2.5 text-[12.5px] font-bold text-white shadow-[0_14px_30px_-18px_rgba(249,115,22,0.9)] transition hover:bg-[#EA580C]"
          >
            <Plus className="h-3.5 w-3.5" />
            Report
          </button>
        )}
      />

      <section aria-label="Emergency guidance" className="mb-3 rounded-2xl border border-rose-200/80 bg-rose-50/70 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="h-[18px] w-[18px] shrink-0 text-rose-700" aria-hidden="true" />
          <div className="min-w-0 flex-1"><p className="text-[12.5px] font-extrabold text-rose-950">Urgent issue? Contact hall staff now.</p><p className="text-[11px] leading-relaxed text-rose-800">HallOS is not monitored for emergencies.</p></div>
          {urgentNumber && <a href={`tel:${normalizePhoneLink(urgentNumber)}`} className="tap inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-2.5 py-2 text-[11px] font-extrabold text-rose-900 shadow-sm"><Phone className="h-3.5 w-3.5"/> Call</a>}
        </div>
        <details className="mt-2 border-t border-rose-200/70 pt-2 text-[11px] leading-relaxed text-rose-900">
          <summary className="cursor-pointer font-bold">When should I contact staff directly?</summary>
          <p className="mt-2">Active leaks, power outages, unsafe conditions, flooding, and loss of heat should be reported directly to the hall front desk or resident director. HallOS reports are not official university work orders.</p>
        </details>
      </section>

      <div className="mb-5 grid gap-2 sm:grid-cols-2">
        <Link to="/radar" className="tap flex items-center gap-3 rounded-2xl border border-border/75 bg-white px-4 py-3 transition hover:border-brand-orange/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
          <QrCode className="h-[19px] w-[19px] shrink-0 text-brand-orange"/>
          <span className="min-w-0 flex-1"><span className="block font-heading text-[12.5px] font-extrabold text-brand-navy">Scan or find a space</span><span className="block text-[11px] text-muted-foreground">QR reporting & existing issues</span></span>
          <ChevronRight className="h-4 w-4 text-brand-navy/30"/>
        </Link>
        {hall?.is_demo ? <a href={resources.maintenance_url} target="_blank" rel="noopener noreferrer" className="tap flex items-center gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orangeSoft/50 px-4 py-3" aria-label="Open official portal in demonstration mode">
          <ExternalLink className="h-[18px] w-[18px] shrink-0 text-brand-orange"/>
          <span className="min-w-0 flex-1"><span className="block font-heading text-[12.5px] font-extrabold text-brand-navy">Open {resources.maintenance_label}</span><span className="block text-[11px] text-muted-foreground">Demo only · HallOS never submits automatically</span></span>
          <ChevronRight className="h-4 w-4 text-brand-navy/30"/>
        </a> : <a href={resources.maintenance_url} target="_blank" rel="noopener noreferrer" className="tap flex items-center gap-3 rounded-2xl border border-brand-orange/25 bg-brand-orangeSoft/50 px-4 py-3 transition hover:border-brand-orange/40">
          <ExternalLink className="h-[18px] w-[18px] shrink-0 text-brand-orange"/>
          <span className="min-w-0 flex-1"><span className="block font-heading text-[12.5px] font-extrabold text-brand-navy">{resources.maintenance_label}</span><span className="block text-[11px] text-muted-foreground">Separate official work order ↗</span></span>
          <ChevronRight className="h-4 w-4 text-brand-navy/30"/>
        </a>}
      </div>

      <div className="mb-3 flex items-center justify-between px-0.5">
        <h2 className="font-heading text-[15px] font-bold text-brand-navy">Open reports in your hall</h2>
        <span className="text-[11.5px] font-semibold text-muted-foreground">{openReports.length} active</span>
      </div>

      {loading && <LoadingCards rows={3} />}

      {!loading && error && (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-[12.5px] font-medium text-rose-700">{error}</p>
      )}

      {!loading && !error && openReports.length === 0 && (
        <EmptyState
          icon={Wrench}
          title="Nothing open right now"
          description="Shared spaces in your hall are clear. If something breaks, report it and neighbors can confirm it."
          action={(
            <button onClick={() => setOpen(true)} className="rounded-xl bg-brand-navy px-3.5 py-2 text-[12.5px] font-bold text-white">
              Report a problem
            </button>
          )}
        />
      )}

      <div className="space-y-2.5">
        {openReports.map((report) => (
          <ReportRow key={report.id} report={report} onConfirm={confirm} onOfficialReport={setHandoffReport} />
        ))}
      </div>

      {recentlyFixed.length > 0 && (
        <details className="mt-5 rounded-2xl border border-border bg-white p-3.5">
          <summary className="cursor-pointer font-heading text-[12.5px] font-extrabold text-brand-navy">
            FixLoop · Check recent fixes ({recentlyFixed.length})
          </summary>
          <p className="mb-3 mt-2 text-[11.5px] text-muted-foreground">Help staff verify that problems are actually gone. These are resident reports, not official maintenance tickets.</p>
          <div className="space-y-2.5">{recentlyFixed.map(r => <ReportRow key={r.id} report={r} onFixFeedback={submitFixFeedback} />)}</div>
        </details>
      )}

      <ReportDialog
        open={open}
        onOpenChange={changeOpen}
        initialSpaceId={spaces.some(s=>s.id===requestedSpace) ? requestedSpace : ''}
        spaces={spaces}
        reports={reports}
        floors={floors}
        defaultFloor={profile?.floor || ''}
        onCreate={createReport}
        onConfirm={confirm}
        onCreated={setHandoffReport}
      />
      <OfficialRequestHandoff report={handoffReport} hall={hall} onClose={() => setHandoffReport(null)} />
    </div>
  );
}
