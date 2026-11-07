import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { localDemoClient as db, setLocalPersona, resetLocalDemo } from '../src/api/localDemoClient.js';
const data = new Map();
globalThis.localStorage = {
  getItem: k => data.get(k) ?? null,
  setItem: (k, v) => data.set(k, String(v)),
  removeItem: k => data.delete(k),
};
const call = async (name, args={}) => (await db.functions.invoke(name,args)).data;
const as = id => setLocalPersona(id);
beforeEach(() => { data.clear(); resetLocalDemo(); as('resident'); });
const report = async id => (await call('listHallReports')).reports.find(r => r.id === id);

test('FixLoop: a resolved sample accepts a resident vote', async () => {
  const item = await report('r-fixed');
  assert.equal(item.status,'resolved');
  assert.equal(item.fixed_count,0);
  const vote = await call('submitFixFeedback',{report_id:item.id,vote:'fixed'});
  assert.equal(vote.fixed_count,1);
  const next = await report(item.id);
  assert.equal(next.fix_vote_by_me,'fixed');
  assert.equal(next.still_broken_count,0);
});

test('FixLoop: a resident can change a vote but cannot vote twice', async () => {
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'fixed'});
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'fixed'});
  assert.equal((await report('r-fixed')).fixed_count,1);
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'still_broken'});
  assert.equal((await report('r-fixed')).fixed_count,0);
  assert.equal((await report('r-fixed')).still_broken_count,1);
});

test('FixLoop: votes are shared only as aggregate counts, not voter identities', async () => {
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'still_broken'});
  as('resident2');
  const item = await report('r-fixed');
  assert.equal(item.still_broken_count,1);
  assert.equal(item.fix_vote_by_me,'');
  assert.equal('user_id' in item,false);
  assert.equal('fixFeedback' in item,false);
  as('ra');
  assert.equal((await report('r-fixed')).still_broken_count,1);
});

test('FixLoop: other-hall members cannot vote on a report outside their hall', async () => {
  as('otherHall');
  await assert.rejects(() => call('submitFixFeedback',{report_id:'r-fixed',vote:'still_broken'}), /unavailable/i);
});

test('FixLoop: pending membership is not allowed to vote', async () => {
  as('pending');
  await assert.rejects(() => call('submitFixFeedback',{report_id:'r-fixed',vote:'fixed'}),/membership required/i);
});

test('FixLoop: cannot vote on active unresolved reports', async () => {
  await assert.rejects(() => call('submitFixFeedback',{report_id:'r-shower',vote:'still_broken'}),/after staff/i);
});

test('FixLoop: invalid votes are rejected', async () => {
  await assert.rejects(() => call('submitFixFeedback',{report_id:'r-fixed',vote:'spam'}),/Invalid vote/);
});

test('FixLoop: admin flow can reopen then re-resolve without carrying forward old feedback', async () => {
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'still_broken'});
  as('ra');
  await call('updateReportStatus',{report_id:'r-fixed',status:'open',staff_note:'Please inspect again'});
  const reopened = await report('r-fixed');
  assert.equal(reopened.still_broken_count,0);
  assert.equal(reopened.resolution_version,1);
  await call('updateReportStatus',{report_id:'r-fixed',status:'resolved',staff_note:'Follow-up done'});
  const resolved = await report('r-fixed');
  assert.equal(resolved.resolution_version,2);
  assert.equal(resolved.still_broken_count,0);
  as('resident');
  assert.equal((await report('r-fixed')).fix_vote_by_me,'');
  await call('submitFixFeedback',{report_id:'r-fixed',vote:'fixed'});
  assert.equal((await report('r-fixed')).fixed_count,1);
});

test('FixLoop: repeated resolve does not create a new voting round', async () => {
  as('ra');
  await call('updateReportStatus',{report_id:'r-fixed',status:'resolved'});
  assert.equal((await report('r-fixed')).resolution_version,1);
});

test('FixLoop does not grant residents RA permissions', async () => {
  await assert.rejects(() => call('updateReportStatus',{report_id:'r-fixed',status:'open'}),/staff/i);
});
