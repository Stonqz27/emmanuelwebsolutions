import { ExternalLink, Phone, ShieldAlert } from 'lucide-react';
import { getResidenceResources, normalizePhoneLink } from '@/lib/morganHousing';
export default function EmergencyContactCard({ hall }) {
  const resources = getResidenceResources(hall);
  const phone = resources.front_desk_phone || resources.after_hours_ra_phone;
  return (
    <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-4">
      <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-orangeSoft text-brand-orange"><ShieldAlert className="h-5 w-5" /></span><div><p className="font-heading text-[13.5px] font-bold text-brand-navy">Need hall help?</p><p className="text-[11px] text-muted-foreground">For urgent problems, contact staff directly.</p></div></div>
      <div className="flex flex-wrap gap-2">{phone && <a href={`tel:${normalizePhoneLink(phone)}`} className="flex items-center gap-1 rounded-lg bg-brand-navy px-3 py-2 text-[11px] font-bold text-white"><Phone className="h-3.5 w-3.5" /> {resources.front_desk_phone ? 'Call front desk' : 'Call RA on-call'}</a>}<a target="_blank" rel="noopener noreferrer" href={resources.maintenance_guidance_url} className="flex items-center gap-1 rounded-lg border px-3 py-2 text-[11px] font-bold text-brand-navy">Official maintenance <ExternalLink className="h-3 w-3" /></a></div>
    </div>
  );
}
