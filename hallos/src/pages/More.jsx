import { Link } from 'react-router-dom';
import { CalendarClock, Radar, Bell, UserRound, ShieldCheck, ChevronRight, LifeBuoy, ExternalLink, Phone } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { useSession } from '@/lib/session';
import { OFFICIAL_NOTICE } from '@/lib/constants';
import ResidenceResources from '@/components/ResidenceResources';
import { getResidenceResources, normalizePhoneLink } from '@/lib/morganHousing';

const tools = [
  { to: '/visitation', icon: CalendarClock, title: 'Visitation hours', caption: 'Confirmed schedules and changes' },
  { to: '/radar', icon: Radar, title: 'Shared-space map', caption: 'Find a space or scan its QR code' },
  { to: '/inbox', icon: Bell, title: 'Notifications', caption: 'Your updates and acknowledgments' },
  { to: '/welcome', icon: UserRound, title: 'My hall & membership', caption: 'Manage your residence hall profile' },
];

export default function More() {
  const { hall, isStaff, isAdmin } = useSession();
  const resources = getResidenceResources(hall);
  const phone = resources.front_desk_phone || resources.after_hours_ra_phone;
  return <div className="space-y-5">
    <PageHeader eyebrow="Essentials" title="Your hall, made simple" subtitle="Everything else you need, without the noise." />
    <section aria-label="Hall tools" className="card-surface overflow-hidden divide-y divide-border/70">
      {tools.map(({ to, icon: Icon, title, caption }) => <Link key={to} to={to} className="tap flex items-center gap-3 p-4 transition hover:bg-secondary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-brand-navy"><Icon className="h-5 w-5"/></span>
        <span className="min-w-0 flex-1"><span className="block font-heading text-[13.5px] font-bold text-brand-navy">{title}</span><span className="block text-[11.5px] text-muted-foreground">{caption}</span></span>
        <ChevronRight aria-hidden="true" className="h-4 w-4 text-brand-navy/30"/>
      </Link>)}
      {(isStaff || isAdmin) && <Link to="/staff" className="tap flex items-center gap-3 p-4 transition hover:bg-secondary/50"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange"><ShieldCheck className="h-5 w-5"/></span><span className="min-w-0 flex-1"><span className="block font-heading text-[13.5px] font-bold">Staff desk</span><span className="block text-[11.5px] text-muted-foreground">Reports, announcements and approvals</span></span><ChevronRight className="h-4 w-4 text-brand-navy/30"/></Link>}
    </section>

    <ResidenceResources hall={hall}/>
    <section aria-label="Help and safety" className="card-surface p-4 sm:p-5">
      <div className="flex items-center gap-2"><LifeBuoy className="h-[18px] w-[18px] text-brand-orange"/><h2 className="font-heading text-[15px] font-extrabold text-brand-navy">Need help?</h2></div>
      <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">For an urgent facility issue, contact your hall front desk or director immediately. HallOS is not monitored for emergencies.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {phone ? <a href={`tel:${normalizePhoneLink(phone)}`} className="tap inline-flex items-center gap-2 rounded-xl bg-brand-navy px-3.5 py-2.5 text-xs font-bold text-white"><Phone className="h-4 w-4"/> {resources.front_desk_phone ? 'Call front desk' : 'Call RA on-call'}</a> : <p className="text-xs text-muted-foreground">Ask your hall staff for the current front desk number.</p>}
        <a href={resources.maintenance_guidance_url} target="_blank" rel="noopener noreferrer" className="tap inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-xs font-bold text-brand-navy">Official maintenance <ExternalLink className="h-3.5 w-3.5"/></a>
      </div>
      {hall?.resident_director && <p className="mt-3 text-[11px] text-muted-foreground">Listed resident director: {hall.resident_director}</p>}
    </section>
    <p className="px-2 text-center text-[10.5px] leading-relaxed text-muted-foreground">{OFFICIAL_NOTICE}</p>
  </div>;
}
