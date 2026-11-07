/**
 * Publicly listed Morgan State University-managed residence options (Fall 2026).
 * Source of names: https://www.morgan.edu/residence-life-and-housing/our-housing-options
 * Work-order routing: https://www.morgan.edu/orlhfacilities
 * Contacts are published after-hours numbers; do not assume availability beyond staff guidance.
 * Unknown fields (especially floors, visits, and desk phones) are left blank deliberately.
 * HallOS is NOT an official Morgan State product.
 */
export const MORGAN_HOUSING_OPTIONS_URL = 'https://www.morgan.edu/residence-life-and-housing/our-housing-options';
export const MORGAN_FACILITIES_URL = 'https://www.morgan.edu/orlhfacilities';
export const MORGAN_READY_URL = 'https://morganready.assetworks.cloud/ready/';
export const MORGAN_TRANSIT_URL = 'https://www.morgan.edu/business-and-auxiliary-services/beartransit/off-campus-residential-schedules';
export const MORGAN_HOUSING_EMAIL = 'reslife@morgan.edu';
export const MORGAN_HOUSING_PHONE = '443-885-3218';
export const MORGAN_HOUSING_PORTAL_URL = 'https://morgan.rms-inc.com/';

const item = (slug, name, housing_type, portal_url, portal_label, extra = {}) => ({
  key: slug,
  name,
  short_name: extra.short_name || name,
  housing_type,
  management_type: 'university-managed',
  maintenance_portal_url: portal_url,
  maintenance_portal_label: portal_label,
  maintenance_guidance_url: MORGAN_FACILITIES_URL,
  info_source_url: MORGAN_HOUSING_OPTIONS_URL,
  shuttle_info_url: housing_type === 'off_campus' ? MORGAN_TRANSIT_URL : '',
  front_desk_phone: '',
  after_hours_ra_phone: '',
  floor_count: 0, // Not public/verified for most facilities. Staff configure after checking.
  is_active: true,
  is_demo: false,
  ...extra,
});

export const MORGAN_HOUSING_CATALOG = Object.freeze([
  item('baldwin','Baldwin Hall','on_campus',MORGAN_READY_URL,'MorganReady'),
  item('blount','Blount Towers','on_campus',MORGAN_READY_URL,'MorganReady'),
  item('cummings','Cummings House','on_campus',MORGAN_READY_URL,'MorganReady', {short_name:'Cummings'}),
  item('legacy','Legacy Hall','on_campus','https://legacyhall.residentportal.com/auth','Legacy Hall Resident Portal'),
  item('rawlings','Rawlings Hall','on_campus',MORGAN_READY_URL,'MorganReady', {
    short_name:'Rawlings',
    floor_count:5,
    front_desk_phone:'443-885-6000',
    info_source_url:'https://www.morgan.edu/residence-life-and-housing/our-housing-options/rawlings-hall',
  }),
  item('thurgood','Thurgood Marshall Hall','on_campus','https://thurgoodmarshall.residentportal.com/auth','Thurgood Marshall Resident Portal', {short_name:'Thurgood Marshall'}),
  item('altus','Altus Apartments','off_campus','https://altusapts.residentportal.com/auth','Altus Resident Portal', {after_hours_ra_phone:'240-849-9805'}),
  item('enolia','The Enolia','off_campus','https://app.homebody.com/login','The Enolia Resident Portal', {after_hours_ra_phone:'443-769-8474'}),
  item('midtown','HH Midtown (The Varsity)','off_campus','https://tinyurl.com/HHMidtownmaintenance','HH Midtown Maintenance Request', {short_name:'HH Midtown', after_hours_ra_phone:'667-298-1360'}),
  item('marble','Marble Hall Gardens','off_campus',MORGAN_FACILITIES_URL,'Find Marble Hall maintenance portal', {after_hours_ra_phone:'443-473-1185'}),
  item('calvert','One Calvert Plaza','off_campus','https://airtable.com/apppdwjjN84qlVTMo/pagUpQKtVw5GVxcQe/form','One Calvert Resident Request', {after_hours_ra_phone:'667-379-0353'}),
  item('lord','Lord Baltimore Hotel (Harper-Tubman placement)','off_campus',MORGAN_FACILITIES_URL,'Find Lord Baltimore maintenance portal', {short_name:'Lord Baltimore',after_hours_ra_phone:'410-300-6458',info_source_url:'https://www.morgan.edu/residence-life-and-housing/our-housing-options/harper-tubman'}),
]);

export const housingByKey = key => MORGAN_HOUSING_CATALOG.find(h => h.key === key) || null;
export function housingFromRecord(hall = {}) {
  const sourceKey = hall.housing_key || hall.key || '';
  if (sourceKey) return housingByKey(sourceKey);
  return MORGAN_HOUSING_CATALOG.find(h => h.name === hall.name) || null;
}
export function housingTypeLabel(hall = {}) {
  return (hall.housing_type || housingFromRecord(hall)?.housing_type) === 'off_campus'
    ? 'University-managed off-campus residence' : 'On-campus residence hall';
}
export function getResidenceResources(hall = {}) {
  const known = housingFromRecord(hall) || {};
  const pick = field => hall[field] || known[field] || '';
  // No implicit MorganReady default for unknown buildings.
  return {
    name: hall.name || known.name || 'Your residence',
    housing_type: pick('housing_type'),
    maintenance_url: pick('maintenance_portal_url') || MORGAN_FACILITIES_URL,
    maintenance_label: pick('maintenance_portal_label') || 'Official maintenance guidance',
    maintenance_guidance_url: MORGAN_FACILITIES_URL,
    after_hours_ra_phone: pick('after_hours_ra_phone'),
    front_desk_phone: pick('front_desk_phone'),
    transit_url: pick('shuttle_info_url'),
    info_url: pick('info_source_url') || MORGAN_HOUSING_OPTIONS_URL,
    has_dedicated_portal: Boolean(pick('maintenance_portal_url') && pick('maintenance_portal_url') !== MORGAN_FACILITIES_URL),
    is_morgan_ready: pick('maintenance_portal_url') === MORGAN_READY_URL,
  };
}
export function normalizePhoneLink(phone = '') { return String(phone).replace(/[^0-9+]/g, ''); }
