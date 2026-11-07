import { Link } from 'react-router-dom';
import { Megaphone, Wrench, ArrowUpRight } from 'lucide-react';

/** Two quiet, high-clarity action cards; the hero provides the primary CTA. */
const actions = [
  { to: '/radar', label: 'Find a shared space', hint: 'Scan a QR · See known issues', icon: Wrench, tone: 'blue' },
  { to: '/hallcast', label: 'Verified hall updates', hint: 'Notices · Visitation · Reminders', icon: Megaphone, tone: 'orange' },
];
export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3" aria-label="Quick actions">
      {actions.map(({ to, label, hint, icon: Icon, tone }) => (
        <Link key={to} to={to} className="tap group relative flex min-h-[128px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#E7EBF2] bg-white p-4 shadow-[0_8px_22px_-18px_rgba(27,67,131,0.4)] transition hover:-translate-y-0.5 hover:border-[#BFD1E9] hover:shadow-lift focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B4383] sm:min-h-[136px] sm:p-5">
          <span className="flex items-start justify-between gap-2">
            <span className={`grid h-10 w-10 place-items-center rounded-2xl ${tone === 'blue' ? 'bg-[#EAF1FC] text-[#1B4383]' : 'bg-[#FFF0E6] text-[#B5461C]'}`}>
              <Icon className="h-[19px] w-[19px]" aria-hidden="true" />
            </span>
            <ArrowUpRight className="h-4 w-4 text-[#1B4383]/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-heading text-[13px] font-extrabold leading-tight text-[#15315E] sm:text-[15px]">{label}</span>
            <span className="mt-1 block text-[10.5px] leading-snug text-muted-foreground sm:text-[11.5px]">{hint}</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
