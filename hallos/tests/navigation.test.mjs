import test from 'node:test';
import assert from 'node:assert/strict';
import { PRIMARY_TABS, activePrimaryTab } from '../src/lib/navigation.js';

test('HallOS has exactly four distinct primary tabs', () => {
  assert.deepEqual(PRIMARY_TABS.map(tab => tab.label), ['Home', 'Updates', 'Report', 'More']);
  assert.equal(new Set(PRIMARY_TABS.map(tab => tab.to)).size, 4);
});
test('visitation, profile, staff, and help belong under More', () => {
  for (const path of ['/more', '/visitation', '/welcome', '/staff']) {
    assert.equal(activePrimaryTab(path), '/more', path);
  }
});
test('notification inbox highlights Updates, scan and map highlight Report', () => {
  for (const path of ['/hallcast', '/inbox']) assert.equal(activePrimaryTab(path), '/hallcast');
  for (const path of ['/hallfix', '/radar', '/space/demo-hall-bath-2']) assert.equal(activePrimaryTab(path), '/hallfix');
  assert.equal(activePrimaryTab('/'), '/');
});
