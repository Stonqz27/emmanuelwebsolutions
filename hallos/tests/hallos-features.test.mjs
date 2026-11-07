import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spacePath, spaceUrl, reportUrl } from '../src/lib/space-links.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');

test('scan links target only opaque shared-space IDs',()=>{
  assert.equal(spacePath('sp_123ABC'),'\/space\/sp_123ABC');
  assert.equal(spaceUrl('sp_123ABC','https://hallos.example/'), 'https://hallos.example/space/sp_123ABC');
  assert.equal(reportUrl('sp_123ABC'),'/hallfix?space=sp_123ABC');
  assert.throws(()=>spacePath('../staff'));
  assert.throws(()=>spaceUrl('good','javascript:alert(1)'));
});
test('scan route and printable QR source are wired up',()=>{
  assert.match(read('src/App.jsx'),/path="\/space\/:spaceId"/);
  assert.match(read('src/pages/SpaceScan.jsx'),/const space = spaces\.find\(s => s\.id === spaceId\)/);
  assert.match(read('src/components/spaces/SpaceQrDialog.jsx'),/QrPlacardPreview/);
  assert.match(read('src/components/spaces/QrPlacardPreview.jsx'),/QRCodeSVG/);
  assert.match(read('src/pages/Radar.jsx'),/SpaceQrDialog/);
});
test('floor-specific announcement access is filtered on backend',()=>{
  const source=read('base44/functions/listHallAnnouncements/entry.ts');
  assert.match(source,/requireApprovedMember/);
  assert.match(source,/profile\.hall_id/);
  assert.match(source,/String\(profile\.floor/);
  assert.match(read('src/hooks/useHallcast.js'),/functions\.invoke\('listHallAnnouncements'/);
  const data=JSON.parse(read('base44/entities/Announcement.jsonc'));
  assert.equal(data.rls.read.user_condition.role,'admin');
});
test('resident report responses do not expose staff notes',()=>{
  const source=read('base44/functions/listHallReports/entry.ts');
  assert.match(source,/\.\.\.\(staff \? \{staff_note/);
  assert.match(read('src/hooks/useHallfix.js'),/functions\.invoke\('listHallReports'/);
  const data=JSON.parse(read('base44/entities/IssueReport.jsonc'));
  assert.equal(data.rls.read.user_condition.role,'admin');
});
test('approved residents cannot self-change floors to receive other floor alerts',()=>{
  const source=read('base44/functions/saveResidentProfile/entry.ts');
  assert.match(source,/keepApproved \? String\(existing\.floor\) : selectedFloor/);
  assert.match(source,/Select a valid floor/);
});
test('temporary visitation overrides are retained separately from weekly hours',()=>{
  const source=read('base44/functions/updateVisitationSchedule/entry.ts');
  assert.match(source,/entry_id/);
  assert.match(source,/Temporary changes require both/);
  assert.match(source,/rows\.find\(x => x\.is_temporary/);
  assert.match(read('src/hooks/useVisitation.js'),/temporary dated exception/);
});
test('live notification banner is app-open polling, not falsely advertised push',()=>{
  const source=read('src/components/HallLiveAlerts.jsx');
  assert.match(source,/document\.visibilityState/);
  assert.match(source,/setInterval\(poll, 20000\)/);
  assert.match(read('src/components/AppShell.jsx'),/<HallLiveAlerts \/>/);
});

test('overnight visitation requires the previous weekday, not tonight\'s future schedule', async()=>{
  const {visitationState}=await import('../src/lib/time.js');
  const morning=new Date('2026-11-02T05:30:00Z'); // Monday 00:30 EST
  const monday={status:'confirmed',open_time:'18:00',close_time:'01:00'};
  assert.equal(visitationState(monday,morning).state,'closed');
  assert.equal(visitationState({...monday,overnight_tail:true},morning).state,'open');
});
