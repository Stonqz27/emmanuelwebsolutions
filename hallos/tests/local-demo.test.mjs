import test, { beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { localDemoClient as db, setLocalPersona, resetLocalDemo } from '../src/api/localDemoClient.js';
const data = new Map();
globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
const call=async (fn,input={})=>(await db.functions.invoke(fn,input)).data;
const as=who=>setLocalPersona(who);
beforeEach(()=>{data.clear();resetLocalDemo();as('resident');});

test('local demo loads fictional halls and a resident profile',async()=>{
 const s=await call('getSession');
 assert.equal(s.user.id,'u-resident');assert.equal(s.hall.id,'demo-hall');assert.equal(s.hasAccess,true);assert.equal(s.isStaff,false);
});
test('floor announcements are absent from another floor and other hall',async()=>{
 assert.equal((await call('listHallAnnouncements')).announcements.some(a=>a.id==='a-floor2'),true);
 as('resident2');assert.equal((await call('listHallAnnouncements')).announcements.some(a=>a.id==='a-floor2'),false);
 as('otherHall');assert.deepEqual((await call('listHallAnnouncements')).announcements.map(a=>a.id),['a-other']);
});
test('resident report list never leaks internal staff notes',async()=>{
 const r=(await call('listHallReports')).reports.find(r=>r.id==='r-shower');
 assert.equal('staff_note' in r,false);
 as('ra');const st=(await call('listHallReports')).reports.find(r=>r.id==='r-shower');
 assert.match(st.staff_note,/INTERNAL DEMO STAFF NOTE/);
});
test('report to confirmation to RA resolution with duplicate protection',async()=>{
 const report=(await call('createIssueReport',{shared_space_id:'demo-hall-bath-2',category:'Shower',description:'Demo: very cold water all day',urgency:'standard'})).report;
 assert.equal(report.confirmation_count,1);
 as('resident2');assert.equal((await call('confirmIssueReport',{report_id:report.id})).confirmation_count,2);
 assert.equal((await call('confirmIssueReport',{report_id:report.id})).duplicate,true);
 as('ra');await call('updateReportStatus',{report_id:report.id,status:'resolved',staff_note:'Demo staff closed'});
 assert.equal((await call('listHallReports')).reports.find(r=>r.id===report.id).status,'resolved');
});
test('unauthorized resident cannot publish or update reports',async()=>{
 await assert.rejects(()=>call('publishAnnouncement',{title:'Fake',body:'Fake staff'}),/staff/i);
 await assert.rejects(()=>call('updateReportStatus',{report_id:'r-shower',status:'resolved'}),/staff/i);
 await assert.rejects(()=>call('createIssueReport',{shared_space_id:'rawlings-demo-bath-1',category:'Shower',description:'Different hall',urgency:'standard'}),/Invalid shared space/);
});
test('staff post creates scoped inbox notice for right-floor residents',async()=>{
 as('ra');const post=(await call('publishAnnouncement',{category:'General',title:'Only floor two',body:'Fictional message to floor two',floor:'2'})).announcement;
 as('resident');assert.equal((await db.entities.Notification.filter({user_id:'u-resident'})).some(n=>n.related_id===post.id),true);
 as('resident2');assert.equal((await db.entities.Notification.filter({user_id:'u-resident2'})).some(n=>n.related_id===post.id),false);
});
test('pending account cannot access private hall data',async()=>{
 as('pending');const session=await call('getSession');assert.equal(session.hasAccess,false);
 await assert.rejects(()=>call('listHallReports'),/membership required/);
 assert.throws(()=>db.entities.SharedSpace.filter({hall_id:'demo-hall'}),/membership required/);
});
test('visitation changes by RA persist in local data',async()=>{
 as('ra'); const e=(await call('updateVisitationSchedule',{hall_id:'demo-hall',weekday:1,open_time:'13:00',close_time:'22:00',status:'confirmed'})).entry;
 assert.equal(e.status,'confirmed');
 const rows=await db.entities.VisitationSchedule.filter({hall_id:'demo-hall'});
 assert.equal(rows.some(r=>r.id===e.id),true);
});
