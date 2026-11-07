import { ArrowUpRight, Clock3, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { greetingForNow } from '@/lib/time';
import { cn } from '@/lib/utils';

/** Showcase hero: Morgan-inspired colors, intentionally independent of official university branding. */
export default function HeroGreeting({ user, hall, profile, visitation }) {
  const firstName = (user?.full_name || 'neighbor').split(' ')[0];
  const open = visitation?.state === 'open' && visitation?.status === 'confirmed';
  const isConfirmed = visitation?.status === 'confirmed';

  return (
    <section className="hallos-hero relative isolate overflow-hidden rounded-[30px] px-5 py-6 text-white shadow-lift sm:px-8 sm:py-8">
      <div aria-hidden="true" className="hallos-hero-grain absolute inset-0 opacity-[0.055]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[45px] border-white/[0.07]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-8 top-12 h-44 w-44 rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-[-98px] h-64 w-64 rounded-full bg-[#F47937]/20 blur-3xl" />

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.09] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#FFE3CA]">
            <Sparkles className="h-3.5 w-3.5 text-[#FEBF50]" /> Your hall, one place
          </p>
          <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold text-white/70">
            <MapPin className="h-3.5 w-3.5 text-[#FEBF50]" /> {hall?.short_name || hall?.name || 'Residence hall'} {profile?.floor ? `· Floor ${profile.floor}` : ''}
          </span>
        </div>

        <h1 className="mt-7 max-w-[660px] font-heading text-[31px] font-black leading-[1.08] tracking-[-0.06em] sm:text-[42px]">
          {greetingForNow()}, <span className="text-[#FEBF50]">{firstName}.</span>
        </h1>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/75 sm:text-[14px]">
          Less chat noise. More life in your hall.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2.5">
          <Link to="/hallfix" className="tap inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-[12px] font-extrabold text-[#173A70] shadow-lg shadow-[#0B1E38]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEBF50]">
            Report an issue <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/hallcast" className="tap inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/25 bg-white/[0.08] px-4 py-2.5 text-[12px] font-bold text-white transition hover:bg-white/[0.17] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FEBF50]">
            See updates <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/15 pt-4">
          <span className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold', open ? 'bg-emerald-300/15 text-emerald-100' : 'bg-white/10 text-white/85')}>
            <Clock3 className="h-3.5 w-3.5" />
            {!isConfirmed ? 'Visitation schedule awaiting staff confirmation' : (visitation?.detail || 'Check visitation hours')}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/55"><ShieldCheck className="h-3 w-3" /> Staff-verified updates</span>
        </div>
      </div>
    </section>
  );
}
