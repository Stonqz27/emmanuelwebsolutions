import { Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Home, Megaphone, Wrench, Menu, Bell, ShieldCheck, ChevronRight } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import LocalTester from '@/components/LocalTester';
import HallLiveAlerts from '@/components/HallLiveAlerts';
import { useSession } from '@/lib/session';
import { initials } from '@/lib/time';
import { cn } from '@/lib/utils';
import { PRIMARY_TABS, activePrimaryTab } from '@/lib/navigation';

const icons = { Home, Megaphone, Wrench, Menu };

export default function AppShell() {
  const { user, profile, hall, isStaff, isAdmin, isDemo, loading, needsProfile, hasAccess } = useSession();
  const { pathname, search } = useLocation();
  const active = activePrimaryTab(pathname);

  if (loading) {
    return <div className="grid min-h-dvh place-items-center bg-background" role="status">
      <div className="space-y-3 text-center">
        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-[3px] border-brand-navy/10 border-t-brand-orange" />
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Loading your hall</p>
      </div>
    </div>;
  }

  if ((needsProfile || !hasAccess) && pathname !== '/welcome' && !(isAdmin && pathname === '/staff')) {
    return <Navigate to={`/welcome?returnTo=${encodeURIComponent(pathname + search)}`} replace />;
  }

  const roleLabel = profile?.staff_role === 'hall_admin' ? 'Hall Admin'
    : profile?.staff_role === 'ra' ? 'Resident Assistant' : 'Resident';

  return (
    <div className="min-h-dvh bg-background">
      <a href="#hallos-main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand-navy focus:shadow-lg">Skip to content</a>
      {import.meta.env.VITE_HALLOS_LOCAL_DEMO === 'true' && <LocalTester />}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[254px] flex-col hallos-sidebar px-4 py-6 lg:flex">
        <div className="px-2"><BrandMark variant="light" /></div>
        <p className="mt-10 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">Your hall</p>
        <nav aria-label="Main navigation" className="mt-3 space-y-1">
          {PRIMARY_TABS.map(({ to, label, iconName }) => {
            const Icon = icons[iconName];
            const selected = active === to;
            return <Link key={to} to={to} aria-current={selected ? 'page' : undefined} className={cn('tap flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange', selected ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/5 hover:text-white')}>
              <Icon className={cn('h-[18px] w-[18px]', selected ? 'text-brand-orange' : 'text-white/50')} strokeWidth={2}/>
              <span>{label}</span>
              {selected && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-orange"/>}
            </Link>;
          })}
        </nav>
        {(isStaff || isAdmin) && <Link to="/staff" className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/10 px-3.5 py-3 text-[12px] font-semibold text-white/70 transition hover:text-white"><ShieldCheck className="h-4 w-4 text-brand-orange"/> Staff desk <ChevronRight className="ml-auto h-3.5 w-3.5"/></Link>}
        <div className="mt-auto space-y-4">
          <Link to="/welcome" className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition hover:bg-white/10">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-orange/20 text-[12px] font-bold text-brand-orange">{initials(user?.full_name)}</span>
            <span className="min-w-0"><span className="block truncate text-[12px] font-bold text-white">{user?.full_name || 'Resident'}</span><span className="block truncate text-[10.5px] text-white/45">{roleLabel} · {hall?.name || 'No hall'}</span></span>
          </Link>
          <p className="px-2 text-[10px] leading-relaxed text-white/30">Student-built prototype. Not an official Morgan State University system.</p>
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-border/70 bg-white/95 px-4 py-3 shadow-[0_6px_20px_-17px_rgba(27,67,131,.4)] backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="HallOS home"><BrandMark compact={false}/></Link>
          <div className="flex items-center gap-1.5">
            <Link to="/inbox" aria-label="Notifications" className="tap grid h-10 w-10 place-items-center rounded-full text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange hover:bg-secondary"><Bell className="h-[19px] w-[19px]" strokeWidth={2}/></Link>
            <Link to="/welcome" aria-label="My hall and account" className="grid h-9 w-9 place-items-center rounded-full bg-brand-navy text-[12px] font-bold text-white">{initials(user?.full_name)}</Link>
          </div>
        </div>
      </header>

      <HallLiveAlerts />

      <main id="hallos-main" className="lg:pl-[254px]">
        <div className="mx-auto w-full max-w-4xl px-4 pb-28 pt-5 md:px-8 lg:pb-16 lg:pt-9">
          {isDemo && <div className="mb-4 flex items-center gap-2 rounded-xl border border-brand-orange/25 bg-brand-orangeSoft px-3 py-2 text-[11px] font-semibold text-[#9a3412]"><span className="rounded bg-brand-orange px-1.5 py-0.5 text-[10px] font-extrabold uppercase text-white">Demo</span>Fictional people and reports for testing only.</div>}
          <Outlet />
        </div>
      </main>

      <nav aria-label="Primary mobile navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E3EAF4] bg-white/95 shadow-[0_-6px_30px_-24px_rgba(27,67,131,.4)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 px-2 pb-safe pt-2">
          {PRIMARY_TABS.map(({ to, label, iconName }) => {
            const Icon = icons[iconName];
            const selected = active === to;
            return <Link key={to} to={to} aria-current={selected ? 'page' : undefined} className="tap flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-orange">
              <span className={cn('grid h-8 w-12 place-items-center rounded-full transition-colors', selected && 'bg-brand-orange/10')}><Icon className={cn('h-5 w-5', selected ? 'text-brand-orange' : 'text-brand-navy/45')} strokeWidth={selected ? 2.5 : 1.9}/></span>
              <span className={cn('text-[11px] font-semibold', selected ? 'text-brand-navy' : 'text-brand-navy/50')}>{label}</span>
            </Link>;
          })}
        </div>
      </nav>
    </div>
  );
}
