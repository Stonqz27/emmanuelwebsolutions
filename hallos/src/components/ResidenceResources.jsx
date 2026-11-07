import { ArrowUpRight, Bus, Building2, ExternalLink, PhoneCall, ShieldCheck } from 'lucide-react';
import {
  getResidenceResources,
  housingTypeLabel,
  MORGAN_HOUSING_PORTAL_URL,
  MORGAN_HOUSING_EMAIL,
  MORGAN_HOUSING_PHONE,
  normalizePhoneLink,
} from '@/lib/morganHousing';

const resourceClass = 'tap inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-border bg-white px-3.5 py-2.5 text-[11.5px] font-bold text-brand-navy transition hover:border-brand-orange/35 hover:bg-brand-orangeSoft/40';

export default function ResidenceResources({ hall, compact = false }) {
  const r = getResidenceResources(hall);
  if (!hall) return null;
  return <section aria-label="Morgan residence services" className="card-surface overflow-hidden">
    <div className="border-b border-border/70 bg-secondary/50 px-4 py-4 sm:px-5">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-navy text-white"><Building2 className="h-5 w-5"/></span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-orange">Your Morgan residence</p>
          <p className="mt-0.5 font-heading text-[16px] font-extrabold leading-tight text-brand-navy">{r.name}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{housingTypeLabel(hall)} · Resources sourced from Morgan State</p>
        </div>
      </div>
    </div>
    <div className="space-y-3 px-4 py-4 sm:px-5">
      <div>
        <p className="text-[12px] font-bold text-brand-navy">Maintenance</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{r.maintenance_label}. HallOS reports are separate from official work orders.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a className={resourceClass} href={r.maintenance_url} target="_blank" rel="noopener noreferrer">Open {r.maintenance_label}{hall.is_demo ? ' (demo)' : ''}<ArrowUpRight className="h-3.5 w-3.5"/></a>
          <a className={resourceClass} href={r.maintenance_guidance_url} target="_blank" rel="noopener noreferrer">Morgan facilities guidance<ExternalLink className="h-3.5 w-3.5"/></a>
        </div>
      </div>
      {(r.front_desk_phone || r.after_hours_ra_phone) && <div className="border-t border-border/70 pt-3">
        <p className="text-[12px] font-bold text-brand-navy">Contact your residence staff</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">For urgent leaks, outages, or unsafe conditions, contact hall staff immediately. RA availability and numbers can change.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {r.front_desk_phone && <a className={resourceClass} href={`tel:${normalizePhoneLink(r.front_desk_phone)}`}><PhoneCall className="h-3.5 w-3.5 text-brand-orange"/> Front desk · {r.front_desk_phone}</a>}
          {r.after_hours_ra_phone && <a className={resourceClass} href={`tel:${normalizePhoneLink(r.after_hours_ra_phone)}`}><PhoneCall className="h-3.5 w-3.5 text-brand-orange"/> Published RA on-call · {r.after_hours_ra_phone}</a>}
        </div>
      </div>}
      {r.transit_url && <div className="border-t border-border/70 pt-3">
        <p className="text-[12px] font-bold text-brand-navy">Getting to campus</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Check the official BEARtransit off-campus residential shuttle schedule. Actual service may change.</p>
        <a className={`${resourceClass} mt-2`} href={r.transit_url} target="_blank" rel="noopener noreferrer"><Bus className="h-4 w-4 text-brand-orange"/> BEARtransit schedules <ArrowUpRight className="h-3.5 w-3.5"/></a>
      </div>}
      {!compact && <div className="border-t border-border/70 pt-3">
        <p className="text-[12px] font-bold text-brand-navy">Housing help</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a className={resourceClass} href={MORGAN_HOUSING_PORTAL_URL} target="_blank" rel="noopener noreferrer">Student housing portal <ArrowUpRight className="h-3.5 w-3.5"/></a>
          <a className={resourceClass} href={`mailto:${MORGAN_HOUSING_EMAIL}`}>Email Residence Life</a>
          <a className={resourceClass} href={`tel:${normalizePhoneLink(MORGAN_HOUSING_PHONE)}`}>Call Housing Office</a>
        </div>
      </div>}
      <p className="flex items-start gap-2 text-[10.5px] leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0"/>These links are listed by Morgan State. HallOS is an independent student prototype, not an official university service.</p>
    </div>
  </section>;
}
