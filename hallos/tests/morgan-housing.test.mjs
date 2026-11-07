import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { MORGAN_HOUSING_CATALOG, getResidenceResources, housingTypeLabel, MORGAN_READY_URL, MORGAN_TRANSIT_URL, MORGAN_FACILITIES_URL } from '../src/lib/morganHousing.js';
import { officialDestination } from '../src/lib/morganReady.js';
import { localDemoClient as db, setLocalPersona, resetLocalDemo } from '../src/api/localDemoClient.js';
const state = new Map();
globalThis.localStorage={getItem:k=>state.get(k)??null,setItem:(k,v)=>state.set(k,String(v)),removeItem:k=>state.delete(k)};
const invoke=async(name,args={})=>(await db.functions.invoke(name,args)).data;

test('Morgan-managed residence catalog contains published campus and off-campus options',()=>{
  assert.equal(MORGAN_HOUSING_CATALOG.length,12);
  assert.equal(MORGAN_HOUSING_CATALOG.filter(h=>h.housing_type==='on_campus').length,6);
  assert.equal(MORGAN_HOUSING_CATALOG.filter(h=>h.housing_type==='off_campus').length,6);
  assert.equal(new Set(MORGAN_HOUSING_CATALOG.map(h=>h.key)).size,12);
  assert.ok(MORGAN_HOUSING_CATALOG.every(h=>h.name&&!/Beacon/i.test(h.name)));
});

test('Official portal routing distinguishes traditional halls and apartment-specific systems',()=>{
  const by=key=>MORGAN_HOUSING_CATALOG.find(h=>h.key===key);
  assert.equal(officialDestination(by('rawlings')),MORGAN_READY_URL);
  assert.equal(officialDestination(by('baldwin')),MORGAN_READY_URL);
  assert.match(officialDestination(by('legacy')),/legacyhall\.residentportal\.com/);
  assert.match(officialDestination(by('thurgood')),/thurgoodmarshall\.residentportal\.com/);
  assert.match(officialDestination(by('altus')),/altusapts\.residentportal\.com/);
  assert.match(officialDestination(by('enolia')),/homebody\.com/);
  assert.equal(officialDestination(by('marble')),MORGAN_FACILITIES_URL);
  assert.equal(officialDestination({...by('rawlings'),is_demo:true}),MORGAN_FACILITIES_URL);
});

test('Published off-campus on-call numbers and transit guidance are hall specific',()=>{
  const mid=getResidenceResources(MORGAN_HOUSING_CATALOG.find(h=>h.key==='midtown'));
  const alt=getResidenceResources(MORGAN_HOUSING_CATALOG.find(h=>h.key==='altus'));
  assert.equal(mid.after_hours_ra_phone,'667-298-1360');
  assert.equal(alt.after_hours_ra_phone,'240-849-9805');
  assert.equal(mid.transit_url,MORGAN_TRANSIT_URL);
  assert.equal(housingTypeLabel(MORGAN_HOUSING_CATALOG.find(h=>h.key==='marble')),'University-managed off-campus residence');
});

test('Unknown building does not inherit MorganReady or invented floors',()=>{
  assert.equal(getResidenceResources({name:'Unlisted housing'}).maintenance_url,MORGAN_FACILITIES_URL);
  assert.ok(MORGAN_HOUSING_CATALOG.filter(h=>h.key!=='rawlings').every(h=>h.floor_count===0));
});

test('Local demo uses official residence names while keeping all records fictional',async()=>{
  state.clear();resetLocalDemo();setLocalPersona('resident');
  const session=await invoke('getSession');
  assert.equal(session.hall.name,'Rawlings Hall');
  assert.equal(session.hall.is_demo,true);
  assert.ok(session.halls.some(h=>h.name.startsWith('HH Midtown')));
  assert.ok(session.halls.every(h=>h.is_demo===true));
});

test('Shared space creation requires approved RA role and blocks duplicates/cross-hall',async()=>{
  state.clear();resetLocalDemo();setLocalPersona('resident');
  await assert.rejects(()=>invoke('createSharedSpace',{name:'Lounge 4',space_type:'lounge'}),/staff/i);
  setLocalPersona('ra');
  const created=await invoke('createSharedSpace',{name:'Demo Lounge 4',space_type:'lounge',floor:'4'});
  assert.equal(created.space.hall_id,'demo-hall');
  await assert.rejects(()=>invoke('createSharedSpace',{name:'Demo Lounge 4',space_type:'lounge',floor:'4'}),/already/i);
  await assert.rejects(()=>invoke('createSharedSpace',{name:'Another Hall',space_type:'lounge',hall_id:'rawlings-demo'}),/Other residence/i);
  assert.ok((await db.entities.SharedSpace.filter({hall_id:'demo-hall'})).some(s=>s.id===created.space.id));
});

test('Production bootstrap never seeds fake bathrooms or fictitious issues in actual Morgan housing',()=>{
  const file=fs.readFileSync(new URL('../base44/functions/bootstrapHallOS/entry.ts',import.meta.url),'utf8');
  assert.match(file,/MORGAN_HOUSING_CATALOG/);
  assert.doesNotMatch(file,/SharedSpace\.create/);
  assert.doesNotMatch(file,/IssueReport\.create/);
  assert.match(file,/Beacon House/);
});

test('Published off-campus residence can have an approved RA with scoped tools', async()=>{
  state.clear();resetLocalDemo();setLocalPersona('admin');
  await invoke('assignStaffRole',{email:'other@demo.invalid',staff_role:'ra',hall_id:'rawlings-demo'});
  setLocalPersona('otherHall');
  const session=await invoke('getSession');
  assert.equal(session.isStaff,true);
  assert.match(session.hall.name,/HH Midtown/);
  const {space}=await invoke('createSharedSpace',{name:'Verified demo lounge',floor:'',space_type:'lounge',hall_id:'rawlings-demo'});
  assert.equal(space.floor,'');
  assert.equal(space.hall_id,session.hall.id);
  const {announcement}=await invoke('publishAnnouncement',{title:'Off-campus update (demo)',body:'Fictional test of a hall-specific RA post.'});
  assert.equal(announcement.hall_id,'rawlings-demo');
  setLocalPersona('resident');
  assert.ok(!(await invoke('listHallAnnouncements')).announcements.some(a=>a.id===announcement.id));
});
