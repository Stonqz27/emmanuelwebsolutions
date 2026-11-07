import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function harness({user={id:'resident-1'}, profile={hall_id:'A',membership_status:'approved'}, report={id:'r1',hall_id:'A',status:'resolved',resolution_version:1}, existing=[]}={}) {
 const stored = existing.map(f=>({...f}));
 const svc={entities:{
  IssueReport:{get:async id=>id===report.id?report:null},
  FixFeedback:{
   filter:async query=>stored.filter(f=>Object.entries(query).every(([k,v])=>f[k]===v)),
   create:async data=>{const r={...data,id:`feedback-${stored.length+1}`};stored.push(r);return r},
   update:async(id,patch)=>{const r=stored.find(f=>f.id===id);Object.assign(r,patch);return r}
  }
 }};
 let source=fs.readFileSync(new URL('../base44/functions/submitFixFeedback/entry.ts',import.meta.url),'utf8');
 source=source.replace(/^import .*?;\s*$/gm,'').replace('export default async function (req)','globalThis.handler = async function (req)');
 const context={createClientFromRequest:()=>({auth:{me:async()=>user},asServiceRole:svc}),requireApprovedMember:async()=>profile,Response,console};
 vm.runInNewContext(source,context,{filename:'submitFixFeedback'});
 return { stored, run:async (vote='fixed',report_id='r1')=>{const response=await context.handler({json:async()=>({vote,report_id})});return {status:response.status,body:await response.json()}} };
}

test('backend: can submit resident fix feedback after staff resolution',async()=>{
 const h=harness(); const r=await h.run();assert.equal(r.status,200);assert.equal(r.body.fixed_count,1);assert.equal(h.stored.length,1);
});
test('backend: repeated vote does not create duplicate feedback',async()=>{
 const h=harness();await h.run();await h.run();assert.equal(h.stored.length,1);
});
test('backend: changing vote updates the existing record',async()=>{
 const h=harness();await h.run();const r=await h.run('still_broken');assert.equal(h.stored.length,1);assert.equal(r.body.still_broken_count,1);assert.equal(r.body.fixed_count,0);
});
test('backend: no approved membership blocks feedback',async()=>{
 const h=harness({profile:null});assert.equal((await h.run()).status,403);
});
test('backend: another hall cannot access report',async()=>{
 const h=harness({profile:{hall_id:'B',membership_status:'approved'}});assert.equal((await h.run()).status,404);
});
test('backend: unresolved report does not permit fix voting',async()=>{
 const h=harness({report:{id:'r1',hall_id:'A',status:'in_progress',resolution_version:0}});assert.equal((await h.run()).status,409);
});
test('backend: invalid vote blocked',async()=>{
 const h=harness();assert.equal((await h.run('anything')).status,400);
});
