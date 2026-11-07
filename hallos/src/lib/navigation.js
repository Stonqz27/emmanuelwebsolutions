/** HallOS has four primary destinations; detailed tools live inside their parent section. */
export const PRIMARY_TABS = Object.freeze([
  { to: '/', label: 'Home', iconName: 'Home' },
  { to: '/hallcast', label: 'Updates', iconName: 'Megaphone' },
  { to: '/hallfix', label: 'Report', iconName: 'Wrench' },
  { to: '/more', label: 'More', iconName: 'Menu' },
]);

export function activePrimaryTab(pathname = '/') {
  if (pathname === '/' || pathname === '/dashboard') return '/';
  if (pathname === '/hallcast' || pathname === '/inbox') return '/hallcast';
  if (pathname === '/hallfix' || pathname === '/radar' || pathname.startsWith('/space/')) return '/hallfix';
  return '/more';
}
