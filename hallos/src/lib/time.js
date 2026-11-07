export const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ZONE = 'America/New_York';

/** Reading calendar clock time in the residence hall's Eastern time zone. */
export function nyNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date);
  const get = type => parts.find(p => p.type === type)?.value;
  return { weekday: WEEKDAYS_SHORT.indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
export function nyTodayISO(date = new Date()) {
  const p = new Intl.DateTimeFormat('en-US', { timeZone: ZONE, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const val = t => p.find(x => x.type === t)?.value;
  return `${val('year')}-${val('month')}-${val('day')}`;
}
export function greetingForNow(date = new Date()) {
  const hour = Math.floor(nyNow(date).minutes / 60);
  return hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
}
export function toMinutes(hhmm) {
  if (typeof hhmm !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d$/.test(hhmm)) return null;
  const [hour, minute] = hhmm.split(':').map(Number);
  return hour * 60 + minute;
}
export function minutesToLabel(minutes) {
  if (minutes === null || !Number.isFinite(minutes)) return '';
  const rounded = Math.max(0, Math.ceil(minutes));
  const hours = Math.floor(rounded / 60);
  const remain = rounded % 60;
  return hours ? `${hours}h${remain ? ` ${remain}m` : ''}` : `${remain}m`;
}
export function clockOffset(clock, offsetMinutes) {
  const m = toMinutes(clock);
  if (m === null) return null;
  const next = (m + offsetMinutes % 1440 + 1440) % 1440;
  return `${String(Math.floor(next/60)).padStart(2,'0')}:${String(next%60).padStart(2,'0')}`;
}
export function formatClock(hhmm) {
  const mins = toMinutes(hhmm);
  if (mins === null) return 'Not set';
  const hour = Math.floor(mins / 60);
  return `${hour % 12 || 12}:${String(mins % 60).padStart(2,'0')} ${hour >= 12 ? 'PM' : 'AM'}`;
}
export function formatDateShort(iso) {
  if (!/^\d{4}-\d\d-\d\d$/.test(iso || '')) return '—';
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', {month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(Date.UTC(year,month-1,day)));
}
export function scheduleInEffect(schedule, todayISO) {
  return (!schedule.effective_from || schedule.effective_from <= todayISO) && (!schedule.effective_to || schedule.effective_to >= todayISO);
}
export function visitationState(schedule, now = new Date()) {
  if (!schedule) return {state:'unset', label:'Not posted', detail:'Ask your RA or front desk for today’s visitation hours.'};
  if (schedule.status !== 'confirmed') return {state:'unset',label:'Unconfirmed', detail:'Hours are not confirmed by authorized hall staff.'};
  if (schedule.is_cancelled) return {state:'cancelled',label:'Cancelled',detail:'Visitation is cancelled for this schedule.'};
  const start = toMinutes(schedule.open_time), end = toMinutes(schedule.close_time);
  if (start === null || end === null) return {state:'unset',label:'Not posted',detail:'No confirmed hours have been set.'};
  const current = nyNow(now).minutes;
  const overnight = end < start;
  // An overnight schedule belongs to its *start* weekday. Early morning
  // hours count only if useVisitation selected the previous day's schedule.
  const opened = schedule.overnight_tail
    ? overnight && current < end
    : overnight ? current >= start : current >= start && current < end;
  const untilClose = (end - current + 1440) % 1440;
  if (opened) return {state:'open', label:'Open', detail:`Visitation ends in ${minutesToLabel(untilClose)}.`};
  return {state:'closed', label:'Closed', detail:`Today's scheduled visitation: ${formatClock(schedule.open_time)}–${formatClock(schedule.close_time)}.`};
}
export function timeAgo(dateStr) {
  const date = new Date(dateStr);
  const difference = Date.now() - date.getTime();
  if (!Number.isFinite(difference)) return 'recently';
  if (difference < 60000) return 'just now';
  const minutes = Math.floor(difference / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes/60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours/24);
  if (days < 7) return `${days}d ago`;
  return new Intl.DateTimeFormat('en-US', {month:'short',day:'numeric'}).format(date);
}
export function initials(name) {
  return String(name || 'Resident').trim().split(/\s+/).slice(0,2).map(x=>x[0]?.toUpperCase() || '').join('');
}
