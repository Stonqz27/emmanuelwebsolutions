/** Guidance only; HallOS never submits or reads official Morgan work orders. */
import { getResidenceResources, MORGAN_READY_URL, MORGAN_FACILITIES_URL } from './morganHousing.js';
export { MORGAN_READY_URL } from './morganHousing.js';
export const MORGAN_HOUSING_FACILITIES_URL = MORGAN_FACILITIES_URL;
export const OFFICIAL_CATEGORY_HINTS = Object.freeze({
  Shower: { label: 'Plumbing', explanation: 'Showers, drains, water pressure, and related fixtures.' },
  Toilet: { label: 'Plumbing', explanation: 'Toilets, flushing problems, and clogged fixtures.' },
  Leak: { label: 'Leak', explanation: 'Water leaks. For active leaks, contact hall staff before submitting a work order.' },
  Trash: { label: 'Housekeeping', explanation: 'Shared-space cleaning and waste concerns.' },
  Heating: { label: 'Room Comfort', explanation: 'Heating and cooling problems.' },
  Laundry: { label: 'Check available tiles', explanation: 'Find the relevant category in your portal.' },
  Other: { label: 'Choose the closest category', explanation: 'Select the best match in the official portal.' },
});
export function categoryHint(category) { return OFFICIAL_CATEGORY_HINTS[category] ?? OFFICIAL_CATEGORY_HINTS.Other; }
export function isTraditionalResidenceHall(hall) { return !hall?.is_demo && getResidenceResources(hall).is_morgan_ready; }
export function officialDestination(hall) {
  // A demo is simulated and must not imply a live official work-order was created.
  if (hall?.is_demo) return MORGAN_HOUSING_FACILITIES_URL;
  return getResidenceResources(hall).maintenance_url;
}
export function officialDestinationLabel(hall) {
  return getResidenceResources(hall).maintenance_label;
}
/** No name, room number, personal email, or student ID added to summary. */
export function buildOfficialRequestSummary(report = {}, hall = {}) {
  const norm = value => String(value ?? '').replace(/\s+/g, ' ').trim();
  const fields = [
    `Location: ${norm(hall.name || 'Residence hall')}`,
    norm(report.floor) ? `Floor: ${norm(report.floor)}` : null,
    `Shared space: ${norm(report.space_name || 'Shared facility')}`,
    `Issue type: ${norm(report.category || 'Other')}`,
    `Details: ${norm(report.description).slice(0, 600) || 'Describe the issue in the official form.'}`,
    `Priority: ${report.urgency === 'urgent' ? 'Urgent — call hall staff directly' : 'Routine'}`,
  ];
  return fields.filter(Boolean).join('\n');
}
