import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { clockOffset, formatClock, toMinutes, nyNow, nyTodayISO, scheduleInEffect, visitationState } from '../src/lib/time.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

test('visitation formats times and handles day wrap', () => {
  assert.equal(formatClock('22:30'), '10:30 PM');
  assert.equal(clockOffset('00:15', -30), '23:45');
  assert.equal(toMinutes('99:00'), null);
  assert.equal(toMinutes('10:15'), 615);
});
test('unconfirmed schedules never claim visitation is open', () => {
  assert.equal(visitationState({ status: 'unconfirmed', open_time:'00:00',close_time:'23:59' }).state, 'unset');
  assert.equal(visitationState({ status:'confirmed',is_cancelled:true }).state, 'cancelled');
});
test('date windows are checked without timezone guessing', () => {
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(nyTodayISO()));
  assert.ok(nyNow().weekday >= 0 && nyNow().weekday <= 6);
  assert.equal(scheduleInEffect({effective_from:'2026-11-03',effective_to:'2026-11-05'},'2026-11-02'),false);
  assert.equal(scheduleInEffect({effective_from:'2026-11-03',effective_to:'2026-11-05'},'2026-11-04'),true);
});
test('broken client stubs have been removed', () => {
  assert.ok(read('src/api/base44Client.js').includes("createClient({"));
  assert.ok(!read('src/api/base44Client.js').includes('__B44_DB__'));
  assert.ok(!read('index.html').startsWith('const db'));
});
test('critical endpoints require authenticated callers', () => {
  for (const name of ['createIssueReport','acknowledgeAnnouncement','reviewMembership','markNotificationRead','bootstrapHallOS']) {
    const code = read(`base44/functions/${name}/entry.ts`);
    assert.match(code, /createClientFromRequest\(req\)/, name);
    assert.match(code, /\.auth\.me\(\)/, name);
  }
  assert.match(read('base44/functions/reviewMembership/entry.ts'), /requireMembershipReviewer/);
  assert.match(read('base44/functions/createIssueReport/entry.ts'), /space\.hall_id !== profile\.hall_id/);
});
test('database schemas have valid JSON and expected security rules', () => {
  const dir = path.join(root,'base44/entities');
  for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.jsonc'))) {
    const entity = JSON.parse(fs.readFileSync(path.join(dir,file),'utf8'));
    assert.equal(entity.type,'object',file);
    assert.ok(entity.properties,file);
  }
  const notification = JSON.parse(read('base44/entities/Notification.jsonc'));
  assert.equal(notification.rls.update.user_condition.role,'admin');
});
