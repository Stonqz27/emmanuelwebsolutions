import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { MORGAN_READY_URL, officialDestination, isTraditionalResidenceHall, categoryHint, buildOfficialRequestSummary } from '../src/lib/morganReady.js';
import { localDemoClient as db, setLocalPersona, resetLocalDemo } from '../src/api/localDemoClient.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = new Map();
globalThis.localStorage = {
  getItem: key => data.get(key) || null,
  setItem: (key, value) => data.set(key, String(value)),
  removeItem: key => data.delete(key),
};
const invoke = async (name, payload={}) => (await db.functions.invoke(name, payload)).data;
beforeEach(() => { data.clear(); resetLocalDemo(); setLocalPersona('resident'); });

test('Rawlings routes to real MorganReady and demo halls do not', () => {
  assert.equal(isTraditionalResidenceHall({ name: 'Rawlings Hall' }), true);
  assert.equal(officialDestination({ name: 'Rawlings Hall' }), MORGAN_READY_URL);
  assert.equal(isTraditionalResidenceHall({ name: 'Rawlings Hall', is_demo: true }), false);
  assert.notEqual(officialDestination({ name: 'Legacy Hall' }), MORGAN_READY_URL);
});

test('category suggestions match visible official portal tiles without guessing unsupported types', () => {
  assert.equal(categoryHint('Shower').label, 'Plumbing');
  assert.equal(categoryHint('Leak').label, 'Leak');
  assert.equal(categoryHint('Trash').label, 'Housekeeping');
  assert.equal(categoryHint('Heating').label, 'Room Comfort');
  assert.equal(categoryHint('Laundry').label, 'Check available tiles');
});

test('report handoff summary contains the shared-space issue but no separate personal fields', () => {
  const report = { space_name: 'Floor 2 Shared Bathroom', floor: '2', category: 'Shower', description: 'Water pressure is low', urgency: 'standard' };
  const copy = buildOfficialRequestSummary(report, { name: 'Rawlings Hall' });
  assert.match(copy, /Location: Rawlings Hall/);
  assert.match(copy, /Floor: 2/);
  assert.match(copy, /Water pressure is low/);
  assert.doesNotMatch(copy, /Student ID|Email|Phone|Resident name/);
});

test('ReportDialog opens handoff only after user successfully creates resident report', () => {
  const dialog = read('src/components/hallfix/ReportDialog.jsx');
  assert.match(dialog, /const created = await onCreate\(draft\)/);
  assert.match(dialog, /onCreated\?\.\(created \|\| draft\)/);
  const handoff = read('src/components/hallfix/OfficialRequestHandoff.jsx');
  assert.match(handoff, /Do not submit a sample request/);
  assert.match(handoff, /You must complete the form there/);
  assert.doesNotMatch(handoff, /functions\.invoke\(/);
});

test('staff can save manually verified reference; normal residents cannot', async () => {
  setLocalPersona('ra');
  const report = (await invoke('listHallReports')).reports.find(r => r.id === 'r-shower');
  await invoke('updateReportStatus', {report_id: report.id, status: report.status, official_ticket_ref: 'RW-2026-123'});
  const after = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
  assert.equal(after.official_ticket_ref, 'RW-2026-123');
  setLocalPersona('resident');
  await assert.rejects(() => invoke('updateReportStatus', {report_id: report.id, status: report.status, official_ticket_ref: 'FRAUD'}), /Staff only/i);
  const residentView = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
  assert.equal('official_ticket_ref' in residentView, false);
});

test('staff work order reference is hall scoped', async () => {
  setLocalPersona('ra');
  await assert.rejects(() => invoke('updateReportStatus',{report_id:'r-other',status:'open',official_ticket_ref:'RW-12'}), /not found in your hall/i);
});
