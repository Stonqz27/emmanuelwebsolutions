import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, QrCode, Wrench } from 'lucide-react';
import { useSession } from '@/lib/session';
import { useHallfix } from '@/hooks/useHallfix';
import ReportRow from '@/components/ReportRow';
import ReportDialog from '@/components/hallfix/ReportDialog';
import SpaceQrDialog from '@/components/spaces/SpaceQrDialog';
import LoadingCards from '@/components/LoadingCards';
import { getResidenceResources, normalizePhoneLink } from '@/lib/morganHousing';
import OfficialRequestHandoff from '@/components/hallfix/OfficialRequestHandoff';

export default function SpaceScan() {
  const { spaceId } = useParams();
  const { hall, profile, isStaff } = useSession();
  const { reports, spaces, loading, error, confirm, createReport, submitFixFeedback } = useHallfix();
  const [reportOpen, setReportOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [handoffReport, setHandoffReport] = useState(null);
  const [feedback, setFeedback] = useState('');
  const space = spaces.find(s => s.id === spaceId);
  const inSpace = reports.filter(r => r.shared_space_id === spaceId && r.status !== 'resolved');
  const recentlyFixed = reports.filter(r => r.shared_space_id === spaceId && r.status === 'resolved').slice(0, 3);
  const floors = Array.from({length: Number(hall?.floor_count || 0)},(_,i)=> String(i + 1));
  const resources = getResidenceResources(hall);
  const urgentNumber = resources.front_desk_phone || resources.after_hours_ra_phone;

  async function confirmReport(report) {
    try { await confirm(report); setFeedback('Thanks — your confirmation was recorded.'); }
    catch(e) { setFeedback(e?.response?.data?.error || e?.message || 'Could not confirm this issue.'); throw e; }
  }
  return (
    <div className="space-y-4">
      <Link to="/radar" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy/70"><ArrowLeft className="h-4 w-4" /> Hall Radar</Link>
      {loading ? <LoadingCards rows={3} /> : !space ? (
        <div className="card-surface p-5">
          <AlertTriangle className="h-7 w-7 text-brand-orange" />
          <h1 className="mt-3 font-heading text-xl font-extrabold text-brand-navy">Shared space unavailable</h1>
          <p className="mt-1 text-sm text-muted-foreground">This QR link doesn't belong to your approved hall, or this space no longer exists. Ask your RA for an updated code.</p>
          <Link to="/radar" className="mt-4 inline-flex rounded-xl bg-brand-navy px-4 py-2.5 text-xs font-bold text-white">Back to Hall Radar</Link>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-3xl bg-brand-navy px-5 py-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-orange-200"><QrCode className="h-3.5 w-3.5" /> Scan-to-Solve</div>
            <h1 className="mt-3 font-heading text-2xl font-extrabold">{space.name}</h1>
            <p className="mt-1 text-sm text-white/65">{hall?.name} · Floor {space.floor} · {space.space_type}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-bold">{inSpace.length} active {inSpace.length === 1 ? 'report' : 'reports'}</span>
              {inSpace.length === 0 && <span className="inline-flex items-center gap-1 text-xs text-emerald-300"><CheckCircle2 className="h-4 w-4" /> No known reports</span>}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button onClick={() => setReportOpen(true)} className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-sm font-bold text-white"><Wrench className="h-4 w-4" /> Report a problem</button>
            {isStaff && <button onClick={() => setShowQR(true)} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm font-bold text-brand-navy"><QrCode className="h-4 w-4" /> Generate QR sign</button>}
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            Active leak, flooding, or another urgent issue? Contact your front desk or resident director now. HallOS is not monitored in real time and isn't an official work-order system.
            {urgentNumber && <a className="ml-1 font-bold underline" href={`tel:${normalizePhoneLink(urgentNumber)}`}>Call {urgentNumber}</a>}.
            {' '}<a href={resources.maintenance_guidance_url} target="_blank" rel="noreferrer" className="font-bold underline">Official reporting guidance</a>.
          </div>
          {feedback && <p role="status" className="rounded-xl bg-secondary px-3 py-2.5 text-xs text-brand-navy">{feedback}</p>}
          <div>
            <h2 className="mb-2.5 font-heading text-base font-extrabold text-brand-navy">Existing issues in this space</h2>
            {error && <p className="text-xs text-rose-700">{error}</p>}
            {inSpace.length ? <div className="space-y-2.5">{inSpace.map(report => <ReportRow key={report.id} report={report} onConfirm={confirmReport} onOfficialReport={setHandoffReport} />)}</div> : (
              <div className="card-surface p-5 text-center text-sm text-muted-foreground">No active reports yet. You can be the first to flag a problem here.</div>
            )}
          </div>
          {recentlyFixed.length > 0 && (
            <details className="rounded-2xl border border-border bg-white p-3.5">
              <summary className="cursor-pointer font-heading text-sm font-bold text-brand-navy">FixLoop · Check recent fixes ({recentlyFixed.length})</summary>
              <div className="mt-3 space-y-2.5">{recentlyFixed.map(report => <ReportRow key={report.id} report={report} onFixFeedback={submitFixFeedback} />)}</div>
            </details>
          )}
          <ReportDialog open={reportOpen} onOpenChange={setReportOpen} spaces={spaces} reports={reports} floors={floors} defaultFloor={profile?.floor || ''} initialSpaceId={space.id} onCreate={createReport} onConfirm={confirmReport} onCreated={setHandoffReport} />
          {isStaff && <SpaceQrDialog space={showQR ? space : null} hallName={hall?.name || ''} onClose={() => setShowQR(false)} />}
          <OfficialRequestHandoff report={handoffReport} hall={hall} onClose={() => setHandoffReport(null)} />
        </>
      )}
    </div>
  );
}
