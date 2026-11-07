/**
 * HallOS LOCAL TEST ONLY: a deterministic browser-local fake Base44 backend.
 * This module is not a production authentication, authorization, or persistence service.
 * Every person, report, post and hall interaction in local mode is fictional.
 */
import { MORGAN_HOUSING_CATALOG } from '../lib/morganHousing.js';
const KEY = 'hallos-local-test-v11';
const ROLE_KEY = 'hallos-local-persona-v1';
const DEMO_USERS = Object.freeze({
  resident: { id: 'u-resident', email: 'resident@demo.invalid', full_name: 'Alex Morgan', role: 'user' },
  resident2: { id: 'u-resident2', email: 'neighbor@demo.invalid', full_name: 'Jordan Lee', role: 'user' },
  otherHall: { id: 'u-other', email: 'other@demo.invalid', full_name: 'Taylor Brooks', role: 'user' },
  ra: { id: 'u-ra', email: 'ra@demo.invalid', full_name: 'Sam Rivera', role: 'user' },
  admin: { id: 'u-admin', email: 'admin@demo.invalid', full_name: 'Demo Platform Admin', role: 'admin' },
  pending: { id: 'u-pending', email: 'pending@demo.invalid', full_name: 'Casey Patel', role: 'user' },
});
export const LOCAL_PERSONAS = Object.entries(DEMO_USERS).map(([id,u]) => ({id, name:u.full_name, role:id}));
const copy = obj => JSON.parse(JSON.stringify(obj));
const iso = () => new Date().toISOString();
const id = prefix => `${prefix}-${Math.random().toString(36).slice(2,9)}`;
// Names/portal routing correspond to the Morgan housing catalog. Every local report,
// fictional persona, announcement and shared space below is demo-only, not a Morgan record.
const halls = MORGAN_HOUSING_CATALOG.map((item) => ({
  ...item,
  id: item.key === 'rawlings' ? 'demo-hall' : item.key === 'midtown' ? 'rawlings-demo' : `msu-${item.key}`,
  is_demo: true,
  description: 'LOCAL SIMULATION — fictional student data using a real Morgan residence name.',
}));
const users = Object.values(DEMO_USERS);
const profiles = [
  {id:'p-resident', user_id:'u-resident',hall_id:'demo-hall',floor:'2',membership_status:'approved',staff_role:'resident',staff_status:'none'},
  {id:'p-resident2',user_id:'u-resident2',hall_id:'demo-hall',floor:'1',membership_status:'approved',staff_role:'resident',staff_status:'none'},
  {id:'p-other',user_id:'u-other',hall_id:'rawlings-demo',floor:'',membership_status:'approved',staff_role:'resident',staff_status:'none'},
  {id:'p-ra',user_id:'u-ra',hall_id:'demo-hall',floor:'2',membership_status:'approved',staff_role:'ra',staff_status:'approved'},
  {id:'p-admin',user_id:'u-admin',hall_id:'demo-hall',floor:'2',membership_status:'approved',staff_role:'hall_admin',staff_status:'approved'},
  {id:'p-pending',user_id:'u-pending',hall_id:'demo-hall',floor:'3',membership_status:'pending',staff_role:'resident',staff_status:'none'},
].map(p => ({ ...p, ...(({full_name,email}) => ({full_name,email}))(users.find(u=>u.id===p.user_id)), is_demo:true }));
function makeInitial(){
 const now=iso();
 const spaces = halls.filter(h=>h.id==='demo-hall'||h.id==='rawlings-demo').flatMap(h=> Array.from({length:h.id==='demo-hall'?5:1},(_,i)=>[
   {id:`${h.id}-bath-${i+1}`,hall_id:h.id,name:h.id==='demo-hall'?`Floor ${i+1} Shared Bathroom`:'Sample Common Area (Demo)',floor:String(i+1),space_type:h.id==='demo-hall'?'bathroom':'lounge',is_demo:true},
   {id:`${h.id}-trash-${i+1}`,hall_id:h.id,name:h.id==='demo-hall'?`Floor ${i+1} Trash Area`:'Sample Building Area (Demo)',floor:String(i+1),space_type:h.id==='demo-hall'?'trash':'other',is_demo:true},
 ]).flat()).concat(halls.filter(h=>h.id==='demo-hall').map(h=>({id:`${h.id}-laundry`,hall_id:h.id,name:'Demo Laundry Area',floor:'1',space_type:'laundry',is_demo:true}))); 
 const announcements = [
   {id:'a-welcome',hall_id:'demo-hall',floor:'',category:'General',priority:'normal',title:'Welcome to the HallOS demo!',body:'All data here is fictional. Try reporting a problem, changing to RA, and sending a hall update.',publisher_name:'Demo RA',publisher_role:'Resident Assistant',published_at:now,requires_ack:true,is_demo:true},
   {id:'a-floor2',hall_id:'demo-hall',floor:'2',category:'Maintenance',priority:'high',title:'Floor 2 maintenance notice',body:'Fictional demo notice for Floor 2 residents only.',publisher_name:'Demo RA',publisher_role:'Resident Assistant',published_at:now,requires_ack:false,is_demo:true},
   {id:'a-other',hall_id:'rawlings-demo',floor:'',category:'General',priority:'normal',title:'Separate hall news',body:'This notice should be visible only when testing the other hall.',publisher_name:'Demo RA',publisher_role:'Resident Assistant',published_at:now,requires_ack:false,is_demo:true}
 ];
 const reports = [
   {id:'r-shower',hall_id:'demo-hall',shared_space_id:'demo-hall-bath-2',space_name:'Floor 2 Shared Bathroom',floor:'2',category:'Shower',description:'Fictional demo: Shower water pressure is inconsistent.',urgency:'standard',status:'open',confirmation_count:1,created_date:now,is_demo:true,staff_note:'INTERNAL DEMO STAFF NOTE — residents must not see this'},
   {id:'r-fixed',hall_id:'demo-hall',shared_space_id:'demo-hall-bath-1',space_name:'Floor 1 Shared Bathroom',floor:'1',category:'Toilet',description:'Fictional demo: Toilet flush valve was sticking.',urgency:'standard',status:'resolved',resolution_version:1,resolved_at:now,confirmation_count:2,created_date:now,is_demo:true,staff_note:'Demo: Staff marked fixed, awaiting resident feedback'},
   {id:'r-trash',hall_id:'demo-hall',shared_space_id:'demo-hall-trash-1',space_name:'Floor 1 Trash Area',floor:'1',category:'Trash',description:'Fictional demo: Trash bins need servicing.',urgency:'standard',status:'acknowledged',confirmation_count:1,created_date:now,is_demo:true,staff_note:''},
   {id:'r-other',hall_id:'rawlings-demo',shared_space_id:'rawlings-demo-bath-1',space_name:'Sample Common Area (Demo)',floor:'1',category:'Heating',description:'Fictional off-campus sample report for cross-hall testing.',urgency:'standard',status:'open',confirmation_count:1,created_date:now,is_demo:true,staff_note:''},
 ];
 // Local demo baseline mirrors the published Morgan visitation guidance.
 // Rows remain unconfirmed because this browser demo cannot impersonate hall staff.
 const publishedHours = [
   ['12:00','22:30'], // Sunday
   ['12:00','22:30'], // Monday
   ['12:00','22:30'], // Tuesday
   ['12:00','22:30'], // Wednesday
   ['12:00','22:30'], // Thursday
   ['12:00','00:00'], // Friday
   ['12:00','00:00'], // Saturday
 ];
 const schedules = Array.from({length:7},(_,weekday)=>({id:`vis-${weekday}`,hall_id:'demo-hall',weekday,open_time:publishedHours[weekday][0],close_time:publishedHours[weekday][1],status:'unconfirmed',notes:'Local demo baseline from Morgan published visitation guidance; hall staff confirmation still required.',effective_from:'',effective_to:'',is_temporary:false,is_cancelled:false,reminder_minutes:60}));
 const notifications = profiles.filter(p=>p.membership_status==='approved'&&p.hall_id==='demo-hall').flatMap(p=> announcements.filter(a=>a.hall_id===p.hall_id&&(!a.floor||a.floor===p.floor)).map(a=>({id:id('n'),user_id:p.user_id,hall_id:p.hall_id,type:'announcement',related_id:a.id,title:a.title,body:a.body,is_read:false,created_date:now,acknowledged_at:''})));
 return {halls:copy(halls),users:copy(users),profiles:copy(profiles),spaces,reports,announcements,notifications,schedules,fixFeedback:[],confirmations:[{id:'c-initial',report_id:'r-shower',user_id:'u-resident',hall_id:'demo-hall'}]};
}
let memory;
function store(){
 if(memory)return memory;
 try { const saved=JSON.parse(localStorage.getItem(KEY)); if(saved?.profiles&&saved?.spaces&&saved?.halls){memory=saved;memory.fixFeedback ??= [];return memory;} }catch{}
 memory=makeInitial();save();return memory;
}
function save(){if(typeof localStorage!=='undefined')localStorage.setItem(KEY,JSON.stringify(memory));}
export function resetLocalDemo(){memory=makeInitial();save();}
export function getLocalPersona(){try{return localStorage.getItem(ROLE_KEY)||'resident';}catch{return 'resident';}}
export function setLocalPersona(persona){if(!DEMO_USERS[persona])throw Error('Unknown demo persona');localStorage.setItem(ROLE_KEY,persona);}
function currentUser(){return DEMO_USERS[getLocalPersona()]||DEMO_USERS.resident;}
function currentProfile(){return store().profiles.find(p=>p.user_id===currentUser().id)||null;}
const isAdmin=()=>currentUser().role==='admin';
const isStaff=()=>isAdmin()||(currentProfile()?.staff_status==='approved'&&['ra','hall_admin'].includes(currentProfile()?.staff_role));
const assertAccess=()=>{const p=currentProfile();if(!p||p.membership_status!=='approved')throw Error('Approved hall membership required');return p;};
const assertStaff=()=>{const p=assertAccess();if(!isStaff())throw Error('Approved staff only');return p;};
const assertAdmin=()=>{if(!isAdmin())throw Error('Platform admin only');};
const owned=(table,p)=>store()[table].filter(row=>row.hall_id===p.hall_id);
const cleanReport=(r,staff)=>{const out=copy(r);if(!staff){delete out.staff_note;delete out.official_ticket_ref;}return out;};
function notifyForAnnouncement(post){
 const dest=store().profiles.filter(p=>p.membership_status==='approved'&&p.hall_id===post.hall_id&&(!post.floor||p.floor===String(post.floor)));
 dest.forEach(p=>store().notifications.unshift({id:id('n'),user_id:p.user_id,hall_id:post.hall_id,type:'announcement',related_id:post.id,title:post.title,body:post.body,created_date:iso(),is_read:false,acknowledged_at:''}));
 return dest.length;
}
function filter(table,query={},sort='',limit=100){
 const p=currentProfile(), u=currentUser();
 if(table==='IssueReport'||table==='Announcement')throw Error(`Direct access to ${table} is disabled: use scoped functions`);
 if(table==='Notification'||table==='IssueConfirmation')assertAccess();
 let rows=store()[table==='SharedSpace'?'spaces':table==='Notification'?'notifications':table==='IssueConfirmation'?'confirmations':table==='VisitationSchedule'?'schedules':table==='ResidentProfile'?'profiles':table==='User'?'users':table==='ResidenceHall'?'halls':table]||[];
 if(table==='SharedSpace'||table==='VisitationSchedule')rows=rows.filter(r=>r.hall_id===assertAccess().hall_id);
 if(table==='Notification')rows=rows.filter(r=>r.user_id===u.id);
 if(table==='IssueConfirmation')rows=rows.filter(r=>r.user_id===u.id);
 rows=rows.filter(r=>Object.entries(query).every(([key,v])=>String(r[key])===String(v)));
 if(sort){const reverse=sort.startsWith('-'); const prop=sort.replace(/^-/,'');rows=[...rows].sort((a,b)=>(String(a[prop]??'').localeCompare(String(b[prop]??'')))*(reverse?-1:1));}
 return Promise.resolve(copy(rows.slice(0,limit)));
}
function createSharedSpace({name, floor='', space_type='other', hall_id}={}) {
 const p=assertStaff();
 if(hall_id && hall_id!==p.hall_id)throw Error('Other residence not permitted');
 const label=String(name||'').trim().replace(/\s+/g,' ');
 if(label.length<3||label.length>85||/[<>]/.test(label))throw Error('Enter a valid shared-space name');
 if(!['bathroom','shower','laundry','trash','kitchen','hallway','lounge','other'].includes(space_type))throw Error('Invalid space type');
 const f=String(floor||'').trim();
 const h=store().halls.find(x=>x.id===p.hall_id);
 if(f && (!/^\d{1,2}$/.test(f)||(h.floor_count>0&&Number(f)>h.floor_count)))throw Error('Invalid floor');
 const existing=owned('spaces',p);
 if(existing.some(s=>s.name.toLowerCase()===label.toLowerCase()&&String(s.floor||'')===f))throw Error('This shared space is already registered');
 const space={id:id('space'),hall_id:p.hall_id,name:label,floor:f,space_type,is_demo:true};
 store().spaces.push(space);save();return {space};
}
const handlers={
 createSharedSpace,
 getSession(){const u=currentUser(),p=currentProfile(),hall=p?.membership_status==='approved'?halls.find(h=>h.id===p.hall_id):null;return {user:u,profile:p,hall,halls:store().halls,isStaff:isStaff()&&p?.membership_status==='approved',membershipStatus:p?.membership_status||'none',hasAccess:!!hall,needsProfile:!p||!p.hall_id};},
 listHallAnnouncements(){const p=assertAccess();return {announcements:copy(owned('announcements',p).filter(a=>isStaff()||!a.floor||String(a.floor)===String(p.floor)).sort((a,b)=>b.published_at.localeCompare(a.published_at)).slice(0,60))};},
 listHallReports(){const p=assertAccess();return {reports:owned('reports',p).map(r=>{const x=cleanReport(r,isStaff());const version=Number(r.resolution_version||(r.status==='resolved'?1:0));const votes=r.status==='resolved'?store().fixFeedback.filter(v=>v.report_id===r.id&&v.resolution_version===version):[];return {...x,resolution_version:version,fixed_count:votes.filter(v=>v.vote==='fixed').length,still_broken_count:votes.filter(v=>v.vote==='still_broken').length,fix_vote_by_me:votes.find(v=>v.user_id===currentUser().id)?.vote||''};}).sort((a,b)=>b.created_date.localeCompare(a.created_date))};},
 createIssueReport(data){const p=assertAccess(); const space=store().spaces.find(s=>s.id===data.shared_space_id&&s.hall_id===p.hall_id);if(!space)throw Error('Invalid shared space');if(data.hall_id&&data.hall_id!==p.hall_id)throw Error('Not your hall');if(data.floor&&String(data.floor)!==String(space.floor||''))throw Error('Selected floor does not match the shared space');const compatible={Shower:['bathroom','shower'],Toilet:['bathroom','shower'],Leak:['bathroom','shower','laundry','kitchen','other'],Laundry:['laundry'],Trash:['trash'],Heating:['other','hallway','lounge'],Other:['bathroom','shower','laundry','trash','kitchen','hallway','lounge','other']};if(!compatible[data.category]?.includes(space.space_type))throw Error('Issue category does not match the shared space');if(!['Shower','Toilet','Leak','Laundry','Trash','Heating','Other'].includes(data.category))throw Error('Invalid category');const description=String(data.description||'').trim();if(description.length<8||description.length>600)throw Error('Description must be 8–600 characters');const row={id:id('r'),hall_id:p.hall_id,shared_space_id:space.id,space_name:space.name,floor:space.floor,category:data.category,description,urgency:data.urgency==='urgent'?'urgent':'standard',status:'open',confirmation_count:1,created_date:iso(),staff_note:'',is_demo:true};store().reports.unshift(row);store().confirmations.push({id:id('c'),report_id:row.id,user_id:currentUser().id,hall_id:p.hall_id});save();return {report:cleanReport(row,false)};},
 confirmIssueReport({report_id}){const p=assertAccess();const r=store().reports.find(r=>r.id===report_id);if(!r||r.hall_id!==p.hall_id)throw Error('Report unavailable');if(r.status==='resolved')throw Error('Report already resolved');if(store().confirmations.some(c=>c.report_id===report_id&&c.user_id===currentUser().id))return {duplicate:true,confirmation_count:r.confirmation_count};store().confirmations.push({id:id('c'),report_id,user_id:currentUser().id,hall_id:p.hall_id});r.confirmation_count=store().confirmations.filter(c=>c.report_id===r.id).length;save();return {confirmation_count:r.confirmation_count};},
 updateReportStatus({report_id,status,staff_note,official_ticket_ref}){const p=assertStaff();const r=store().reports.find(r=>r.id===report_id&&r.hall_id===p.hall_id);if(!r)throw Error('Report not found in your hall');if(!['open','acknowledged','in_progress','resolved'].includes(status))throw Error('Invalid status');if(status==='resolved'&&r.status!=='resolved'){r.resolution_version=Number(r.resolution_version||0)+1;r.resolved_at=iso();}if(status!=='resolved'&&r.status==='resolved')r.resolved_at='';r.status=status;if(typeof staff_note==='string')r.staff_note=String(staff_note).slice(0,500);if(typeof official_ticket_ref==='string'){const ref=official_ticket_ref.trim();if(ref.length>80||!/^[A-Za-z0-9#./_\- ]*$/.test(ref))throw Error('Invalid work-order reference');r.official_ticket_ref=ref;}save();return {report:r};},
 submitFixFeedback({report_id,vote}){const p=assertAccess();if(!['fixed','still_broken'].includes(vote))throw Error('Invalid vote');const r=store().reports.find(r=>r.id===report_id&&r.hall_id===p.hall_id);if(!r)throw Error('Report unavailable');if(r.status!=='resolved')throw Error('Feedback only after staff mark a report fixed');const version=Number(r.resolution_version||1);const arr=store().fixFeedback;const prior=arr.find(f=>f.report_id===report_id&&f.user_id===currentUser().id&&f.resolution_version===version);if(prior)prior.vote=vote;else arr.push({id:id('f'),report_id,user_id:currentUser().id,hall_id:p.hall_id,resolution_version:version,vote});save();const votes=arr.filter(f=>f.report_id===report_id&&f.resolution_version===version);return {report_id,fix_vote_by_me:vote,fixed_count:votes.filter(f=>f.vote==='fixed').length,still_broken_count:votes.filter(f=>f.vote==='still_broken').length};},
 publishAnnouncement(input){const p=assertStaff();if(input.hall_id&&input.hall_id!==p.hall_id)throw Error('Not your hall');if(!input.title?.trim()||!input.body?.trim())throw Error('Title and body required');const post={id:id('a'),hall_id:p.hall_id,floor:String(input.floor||''),category:input.category||'General',priority:input.priority||'normal',title:input.title.trim(),body:input.body.trim(),publisher_name:currentUser().full_name,publisher_role:p.staff_role||'Staff',requires_ack:!!input.requires_ack,published_at:iso(),is_demo:true};store().announcements.unshift(post);const notified=notifyForAnnouncement(post);save();return {announcement:post,notified};},
 acknowledgeAnnouncement({announcement_id}){const p=assertAccess();const a=owned('announcements',p).find(a=>a.id===announcement_id&&(isStaff()||!a.floor||a.floor===p.floor));if(!a)throw Error('Announcement unavailable');let n=store().notifications.find(n=>n.user_id===currentUser().id&&n.related_id===a.id);if(!n){n={id:id('n'),user_id:currentUser().id,hall_id:p.hall_id,related_id:a.id,type:'announcement',title:a.title,body:a.body,created_date:iso(),is_read:true};store().notifications.push(n);}n.acknowledged_at=iso();n.is_read=true;save();return {acknowledged:true};},
 markNotificationRead({notification_ids=[]}){assertAccess();let updated=0;store().notifications.forEach(n=>{if(n.user_id===currentUser().id&&notification_ids.includes(n.id)){n.is_read=true;updated++;}});save();return {updated};},
 updateVisitationSchedule(input){const p=assertStaff();if(input.hall_id&&input.hall_id!==p.hall_id)throw Error('Not your hall');const wanted=store().schedules.find(s=>s.id===input.entry_id&&s.hall_id===p.hall_id);const entry={...input,hall_id:p.hall_id,id:wanted?.id||id('vis'),weekday:Number(input.weekday),updated_by_name:currentUser().full_name,reminder_minutes:Number(input.reminder_minutes)||60};if(wanted)Object.assign(wanted,entry);else store().schedules.push(entry);save();return {entry};},
 saveResidentProfile({hall_id,floor}){const h=store().halls.find(h=>h.id===hall_id);if(!h)throw Error('Hall not found');const u=currentUser();const p=currentProfile();const same=p?.hall_id===h.id&&p.membership_status==='approved';const status=same||h.is_demo?'approved':'pending';const next={...(p||{}),id:p?.id||id('p'),user_id:u.id,full_name:u.full_name,email:u.email,hall_id:h.id,floor:same?p.floor:String(floor),membership_status:status,staff_role:same?p.staff_role:'resident',staff_status:same?p.staff_status:'none',is_demo:h.is_demo};if(p)Object.assign(p,next);else store().profiles.push(next);save();return {profile:next,membership_status:status};},
 reviewMembership(input){if(!isAdmin()&&currentProfile()?.staff_role!=='hall_admin')throw Error('Staff only');const p=currentProfile();if(input.action==='list')return {requests:copy(store().profiles.filter(q=>q.membership_status==='pending'&&(isAdmin()||q.hall_id===p.hall_id)))};const target=store().profiles.find(q=>q.id===input.profile_id);if(!target||(!isAdmin()&&target.hall_id!==p.hall_id))throw Error('Request not found');if(!['approved','rejected'].includes(input.decision))throw Error('Invalid decision');target.membership_status=input.decision;save();return {profile:target};},
 assignStaffRole({email,staff_role,hall_id}){assertAdmin();const u=store().users.find(u=>u.email===email);if(!u)throw Error('No account with that email');const p=store().profiles.find(p=>p.user_id===u.id);if(!p)throw Error('User has no profile');if(hall_id&&!store().halls.some(h=>h.id===hall_id))throw Error('Hall not found');p.hall_id=hall_id||p.hall_id;p.membership_status='approved';p.staff_role=staff_role;p.staff_status=staff_role==='resident'?'none':'approved';save();return {profile:p};},
 bootstrapHallOS(){assertAdmin();return {ok:true,new_shared_spaces:0,catalog_count:halls.length,created:0,updated:halls.length,deprecated:0};},
};
export const localDemoClient={
 app:{getPublicSettings:async()=>({id:'LOCAL-DEMO',public_settings:{}})},
 auth:{me:async()=>copy(currentUser()),redirectToLogin:()=>{},logout:()=>{},isAuthenticated:()=>true},
 entities:new Proxy({}, {get:(_,name)=>({filter:(query,sort,limit)=>filter(name,query,sort,limit),list:()=>filter(name,{},'',100)})}),
 functions:{invoke:async(name,input={})=>{const fn=handlers[name];if(!fn)throw Error(`Local demo: function ${name} not implemented`);return {data:copy(fn(input))};}},
};
