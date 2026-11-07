import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function functionHarness(name, profile, collection, user = {id:'resident-1',role:'user'}) {
  let src=fs.readFileSync(new URL(`../base44/functions/${name}/entry.ts`,import.meta.url),'utf8');
  src=src.replace(/^import .*?;\s*$/gm,'').replace('export default async function (req)', 'globalThis.handler = async function (req)');
  const svc={entities:{
    Announcement:{filter:async query=>collection.filter(x=>x.hall_id===query.hall_id)},
    IssueReport:{filter:async query=>collection.filter(x=>x.hall_id===query.hall_id)},
    FixFeedback:{filter:async()=>[]},
  }};
  const context={
    createClientFromRequest:()=>({auth:{me:async()=>user},asServiceRole:svc}),
    requireApprovedMember:async()=> profile,
    isApprovedStaff:(p)=>p?.staff_role==='ra'&&p?.staff_status==='approved',
    Response, console,
  };
  vm.runInNewContext(src,context,{filename:name});
  return async()=> {
    const response=await context.handler({});
    return {status:response.status, body:await response.json()};
  };
}

test('a Floor 2 resident cannot receive Floor 3 private announcements',async()=>{
  const rows=[
    {id:'all',hall_id:'A',title:'Hall wide',floor:''},
    {id:'f2',hall_id:'A',title:'Your floor',floor:'2'},
    {id:'f3',hall_id:'A',title:'Another floor',floor:'3'},
    {id:'other',hall_id:'B',title:'Another hall',floor:''}
  ];
  const run=functionHarness('listHallAnnouncements',{hall_id:'A',floor:'2',staff_role:'resident'},rows);
  const {status,body}=await run();
  assert.equal(status,200);
  assert.deepEqual(body.announcements.map(x=>x.id).sort(),['all','f2']);
});

test('approved RA receives their whole hall feed, but not other halls',async()=>{
  const rows=[{id:'a2',hall_id:'A',floor:'2'},{id:'a3',hall_id:'A',floor:'3'},{id:'b3',hall_id:'B',floor:'3'}];
  const run=functionHarness('listHallAnnouncements',{hall_id:'A',floor:'2',staff_role:'ra',staff_status:'approved'},rows);
  const result=await run();
  assert.deepEqual(result.body.announcements.map(x=>x.id).sort(),['a2','a3']);
});

test('resident report listing strips internal staff notes',async()=>{
  const rows=[{id:'r1',hall_id:'A',description:'Bathroom faucet issue',status:'open',staff_note:'Internal note',official_ticket_ref:'private-ref'}];
  const run=functionHarness('listHallReports',{hall_id:'A',floor:'2',staff_role:'resident'},rows);
  const result=await run();
  assert.equal(result.status,200);
  assert.equal(result.body.reports.length,1);
  assert.equal(result.body.reports[0].description,'Bathroom faucet issue');
  assert.equal(result.body.reports[0].staff_note,undefined);
  assert.equal(result.body.reports[0].official_ticket_ref,undefined);
});

test('approved RA sees internal notes only inside their hall',async()=>{
  const rows=[{id:'r1',hall_id:'A',staff_note:'Handled',official_ticket_ref:'REF1'},{id:'r2',hall_id:'B',staff_note:'Private'}];
  const run=functionHarness('listHallReports',{hall_id:'A',floor:'2',staff_role:'ra',staff_status:'approved'},rows);
  const result=await run();
  assert.equal(result.status,200);
  assert.equal(result.body.reports.length,1);
  assert.equal(result.body.reports[0].staff_note,'Handled');
});

test('no membership receives no announcement data',async()=>{
  const run=functionHarness('listHallAnnouncements',null,[{id:'r1',hall_id:'A'}]);
  const result=await run();
  assert.equal(result.status,403);
});
