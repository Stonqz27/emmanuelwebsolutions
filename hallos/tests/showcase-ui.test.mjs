import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(resolve(root, name), 'utf8');

test('Morgan-inspired design tokens match official blue and orange without impersonating Morgan', () => {
  const config = read('tailwind.config.cjs');
  assert.match(config, /morganBlue: '#1B4383'/);
  assert.match(config, /morganOrange: '#F47937'/);
  assert.match(config, /morganGold: '#FEBF50'/);
  assert.match(read('src/components/dashboard/HeroGreeting.jsx'), /Less chat noise/);
  assert.match(read('src/components/AppShell.jsx'), /not an official Morgan State University system/i);
});

test('four tabs remain untouched; local demo guide is not available as a live route', () => {
  const app = read('src/App.jsx');
  assert.match(app, /import\.meta\.env\.VITE_HALLOS_LOCAL_DEMO === 'true' && <Route path="\/demo-guide"/);
  const shell = read('src/components/AppShell.jsx');
  assert.match(shell, /import\.meta\.env\.VITE_HALLOS_LOCAL_DEMO === 'true' && <LocalTester/);
  const nav = read('src/lib/navigation.js');
  assert.match(nav, /Home.*Updates/s);
  assert.match(nav, /Report.*More/s);
});

test('the QR reporting flow includes the separate official handoff', () => {
  const space = read('src/pages/SpaceScan.jsx');
  assert.match(space, /OfficialRequestHandoff/);
  assert.match(space, /onCreated=\{setHandoffReport\}/);
  assert.match(read('src/components/spaces/SpaceQrDialog.jsx'), /Local QR preview/);
  assert.doesNotMatch(read('src/components/spaces/QrPlacardPreview.jsx'), /Judge demo/);
});

test('report form suggests duplicates within the selected space rather than unrelated rooms', () => {
  const reportForm = read('src/components/hallfix/ReportDialog.jsx');
  assert.match(reportForm, /space \? r\.shared_space_id === space\.id/);
  assert.doesNotMatch(reportForm, /r\.category === category \|\| \(space && r\.space_name === space\.name\)/);
});

test('visible errors prevent silently failing resident and RA actions', () => {
  for (const path of ['src/components/ReportRow.jsx','src/components/AnnouncementCard.jsx','src/components/staff/ReportQueueRow.jsx']) {
    assert.match(read(path), /role="alert"/, path);
  }
});
