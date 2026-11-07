import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Radar as RadarIcon, ChevronRight, QrCode, Wrench, Info } from 'lucide-react';
import { useSession } from '@/lib/session';
import { useHallfix } from '@/hooks/useHallfix';
import PageHeader from '@/components/PageHeader';
import LoadingCards from '@/components/LoadingCards';
import SpaceQrDialog from '@/components/spaces/SpaceQrDialog';
import { spacePath } from '@/lib/space-links';
import { cn } from '@/lib/utils';

/** Resident-facing shared-space directory; no duplicate announcements or hours. */
export default function Radar() {
  const { hall, profile, isStaff } = useSession();
  const { reports, spaces, loading, error } = useHallfix();
  const [selectedFloor, setSelectedFloor] = useState(profile?.floor ? 'mine' : 'all');
  const [qrSpace, setQrSpace] = useState(null);

  const openReports = useMemo(() => reports.filter(report => report.status !== 'resolved'), [reports]);
  const floors = useMemo(() => [...new Set(spaces.map(s => String(s.floor)))].filter(Boolean).sort((a,b) => Number(a) - Number(b)), [spaces]);
  const visibleSpaces = useMemo(() => spaces.filter(s => selectedFloor === 'all' || String(s.floor) === (selectedFloor === 'mine' ? String(profile?.floor) : selectedFloor)), [spaces, selectedFloor, profile?.floor]);
  const counts = useMemo(() => openReports.reduce((acc, report) => {
    acc[report.shared_space_id] = (acc[report.shared_space_id] || 0) + 1;
    return acc;
  }, {}), [openReports]);

  return <div className="space-y-4">
    <PageHeader eyebrow="Scan-to-Solve" title="Find a shared space" subtitle={`Check a bathroom, laundry room or other shared space in ${hall?.short_name || 'your hall'}. Scan its QR code or select it below.`}/>
    <div className="flex items-center gap-3 rounded-2xl border border-brand-orange/20 bg-brand-orangeSoft/60 px-4 py-3">
      <RadarIcon className="h-5 w-5 shrink-0 text-brand-orange"/>
      <p className="min-w-0 flex-1 text-[12px] font-semibold leading-relaxed text-brand-navy">{openReports.length} active community {openReports.length === 1 ? 'report' : 'reports'} across shared spaces.</p>
      <Link to="/hallfix" className="shrink-0 text-[11.5px] font-bold text-brand-orange hover:underline">All reports</Link>
    </div>

    <section aria-label="Shared space directory" className="card-surface p-4 sm:p-5">
      <div className="flex items-center justify-between gap-2"><h2 className="font-heading text-[15px] font-extrabold text-brand-navy">Spaces by floor</h2><QrCode className="h-[18px] w-[18px] text-brand-orange" aria-hidden="true"/></div>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter spaces by floor">
        {[...(profile?.floor ? [{ id: 'mine', label: 'My floor' }] : []), { id: 'all', label: 'All spaces' }, ...floors.map(f => ({ id: f, label: `Floor ${f}` }))].map(option =>
          <button type="button" key={option.id} aria-pressed={selectedFloor === option.id} onClick={() => setSelectedFloor(option.id)} className={cn('tap shrink-0 rounded-full border px-3 py-2 text-[11.5px] font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange', selectedFloor === option.id ? 'border-brand-navy bg-brand-navy text-white' : 'border-border bg-white text-brand-navy/70 hover:border-brand-navy/30')}>{option.label}</button>,
        )}
      </div>

      {loading && <LoadingCards rows={2}/>}
      {!loading && error && <p className="mt-2 rounded-xl bg-rose-50 p-3 text-[12px] text-rose-700">{error}</p>}
      {!loading && !error && <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {visibleSpaces.map(space => {
          const count = counts[space.id] || 0;
          return <div key={space.id} className="flex items-center gap-2 rounded-2xl border border-border/75 bg-white p-3.5 transition hover:border-brand-orange/30">
            <Link to={spacePath(space.id)} className="min-w-0 flex-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
              <p className="truncate font-heading text-[13px] font-extrabold text-brand-navy">{space.name}</p>
              <p className={cn('mt-1 text-[11.5px] font-semibold', count ? 'text-amber-700' : 'text-emerald-700')}>{count ? `${count} resident ${count === 1 ? 'report' : 'reports'}` : 'No known reports'}</p>
            </Link>
            {isStaff && <button type="button" aria-label={`Generate QR sign for ${space.name}`} title={`Generate QR sign for ${space.name}`} onClick={() => setQrSpace(space)} className="tap grid h-9 w-9 place-items-center rounded-xl border border-border text-brand-orange hover:bg-brand-orangeSoft"><QrCode className="h-[17px] w-[17px]"/></button>}
            <Link to={spacePath(space.id)} aria-label={`View ${space.name}`} className="tap grid h-9 w-9 place-items-center rounded-xl bg-secondary text-brand-navy/60"><ChevronRight className="h-[17px] w-[17px]"/></Link>
          </div>;
        })}
        {visibleSpaces.length === 0 && <p className="col-span-full rounded-xl bg-secondary/60 p-4 text-[12px] text-muted-foreground">No verified shared spaces have been added here yet. Ask an RA to set up QR reporting for your building.</p>}
      </div>}
      <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground"><Info className="mt-0.5 h-3.5 w-3.5 shrink-0"/>These are resident reports, not official facility inspections or university repair statuses.</p>
    </section>
    <Link to="/hallfix" className="tap flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-3 text-[12.5px] font-bold text-brand-navy"><Wrench className="h-4 w-4 text-brand-orange"/> Report a new issue</Link>
    {isStaff && <SpaceQrDialog space={qrSpace} hallName={hall?.name || ''} onClose={() => setQrSpace(null)}/>}
  </div>;
}
