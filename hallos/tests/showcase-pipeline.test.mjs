import test from 'node:test';
import assert from 'node:assert/strict';
import { localDemoClient as db, setLocalPersona, resetLocalDemo } from '../src/api/localDemoClient.js';
import { buildOfficialRequestSummary, categoryHint, officialDestination, MORGAN_READY_URL } from '../src/lib/morganReady.js';
import { spacePath, spaceUrl } from '../src/lib/space-links.js';

const state = new Map();
globalThis.localStorage = {
  getItem: (key) => state.get(key) ?? null,
  setItem: (key, value) => state.set(key, String(value)),
  removeItem: (key) => state.delete(key),
};
const invoke = async (action, payload = {}) => (await db.functions.invoke(action, payload)).data;
const as = setLocalPersona;

/** Exercises the coherent demo story through the real local fake-backend function interface. */
test('showcase pipeline: Scan → Report → Handoff → Confirm → Staff → FixLoop → Updates', async (t) => {
  state.clear(); resetLocalDemo(); as('resident');
  const hall = (await invoke('getSession')).hall;
  assert.equal(hall.is_demo, true);
  const sharedSpace = 'demo-hall-bath-2';

  await t.test('QR links lead only to the shared-space route', () => {
    assert.equal(spacePath(sharedSpace), '/space/demo-hall-bath-2');
    assert.equal(spaceUrl(sharedSpace, 'http://localhost:5173'), 'http://localhost:5173/space/demo-hall-bath-2');
  });

  const { report } = await invoke('createIssueReport', {
    shared_space_id: sharedSpace,
    category: 'Leak',
    description: 'Demo only: water dripping slowly from the Floor 2 shower pipe.',
    urgency: 'standard',
  });
  await t.test('resident report saved but is not an official university work order', async () => {
    assert.equal(report.status, 'open');
    assert.equal(report.confirmation_count, 1);
    assert.equal(report.is_demo, true);
    assert.equal('official_ticket_ref' in report, false);
    assert.equal(categoryHint(report.category).label, 'Leak');
    const summary = buildOfficialRequestSummary(report, hall);
    assert.match(summary, /Shared space: Floor 2 Shared Bathroom/);
    assert.match(summary, /water dripping/i);
    assert.doesNotMatch(summary, /Student ID|Resident name|Email/);
    assert.notEqual(officialDestination(hall), MORGAN_READY_URL, 'fictional hall must not lead to live form as if it were real');
  });

  await t.test('a second hall resident confirms only once', async () => {
    as('resident2');
    assert.equal((await invoke('confirmIssueReport', {report_id: report.id})).confirmation_count, 2);
    assert.equal((await invoke('confirmIssueReport', {report_id: report.id})).duplicate, true);
    assert.equal((await invoke('listHallReports')).reports.find(r => r.id === report.id).confirmation_count, 2);
  });

  await t.test('a different residence cannot access or modify this report', async () => {
    as('otherHall');
    assert.equal((await invoke('listHallReports')).reports.some(r => r.id === report.id), false);
    await assert.rejects(() => invoke('confirmIssueReport', {report_id: report.id}), /unavailable/i);
    await assert.rejects(() => invoke('updateReportStatus', {report_id: report.id, status: 'resolved'}), /staff/i);
  });

  await t.test('staff acknowledges, records manual reference, and marks fixed', async () => {
    as('ra');
    await invoke('updateReportStatus', {report_id: report.id, status: 'acknowledged'});
    await invoke('updateReportStatus', {report_id: report.id, status: 'in_progress', official_ticket_ref: 'DEMO-123'});
    const inProgress = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
    assert.equal(inProgress.official_ticket_ref, 'DEMO-123');
    await invoke('updateReportStatus', {report_id: report.id, status: 'resolved'});
    assert.equal((await invoke('listHallReports')).reports.find(r => r.id === report.id).status, 'resolved');
  });

  await t.test('resident still-broken vote triggers follow-up, re-open resets next round', async () => {
    as('resident');
    await invoke('submitFixFeedback', {report_id: report.id, vote: 'still_broken'});
    as('ra');
    let current = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
    assert.equal(current.still_broken_count, 1);
    await invoke('updateReportStatus', {report_id: report.id, status: 'open'});
    await invoke('updateReportStatus', {report_id: report.id, status: 'resolved'});
    current = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
    assert.equal(current.still_broken_count, 0);
    as('resident');
    await invoke('submitFixFeedback', {report_id: report.id, vote: 'fixed'});
    current = (await invoke('listHallReports')).reports.find(r => r.id === report.id);
    assert.equal(current.fixed_count, 1);
  });

  await t.test('announcements reach only the intended hall and floor', async () => {
    as('ra');
    const {announcement} = await invoke('publishAnnouncement', {
      category:'Maintenance', title:'Demo Floor 2 update', body:'This is a fictional maintenance notice.', floor:'2', requires_ack:true,
    });
    as('resident');
    assert.ok((await invoke('listHallAnnouncements')).announcements.some(a => a.id === announcement.id));
    assert.ok((await db.entities.Notification.filter({user_id:'u-resident'})).some(n => n.related_id === announcement.id));
    as('resident2');
    assert.equal((await invoke('listHallAnnouncements')).announcements.some(a => a.id === announcement.id), false);
    assert.equal((await db.entities.Notification.filter({user_id:'u-resident2'})).some(n => n.related_id === announcement.id), false);
    as('otherHall');
    assert.equal((await invoke('listHallAnnouncements')).announcements.some(a => a.id === announcement.id), false);
  });

  await t.test('pending resident and ordinary residents cannot impersonate staff', async () => {
    as('pending');
    await assert.rejects(() => invoke('listHallReports'), /membership required/i);
    as('resident');
    await assert.rejects(() => invoke('publishAnnouncement', { title:'Fake RA',body:'Impersonation'}), /staff/i);
  });
});
