import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck } from 'lucide-react';
import { getLocalPersona, setLocalPersona, resetLocalDemo, LOCAL_PERSONAS } from '@/api/localDemoClient';
/** A conspicuous LOCAL ONLY role selector. It does not exist in live Base44 mode. */
export default function LocalTester() {
  const [persona, setPersona] = useState(getLocalPersona);
  return <div className="relative z-[80] border-b border-amber-300 bg-amber-100 px-4 py-2 text-amber-950 lg:pl-[280px]">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-3 gap-y-2 text-[12px]">
      <strong className="font-extrabold">LOCAL TEST Â· FICTIONAL DATA</strong>
      <label htmlFor="local-test-role" className="font-medium">View as</label>
      <select id="local-test-role" value={persona} onChange={e=>{setPersona(e.target.value);setLocalPersona(e.target.value);window.location.assign('/rawlings/app/');}} className="rounded-lg border border-amber-300 bg-white px-2 py-1.5 text-[12px] font-semibold">
        {LOCAL_PERSONAS.map(p=><option key={p.id} value={p.id}>{p.name} ({p.role})</option>)}
      </select>
      <Link to="/demo-guide" className="inline-flex items-center gap-1.5 rounded-lg bg-[#1B4383] px-3 py-2 font-bold text-white"><ClipboardCheck className="h-3.5 w-3.5" /> Test walkthrough</Link>
      <button type="button" className="rounded-lg border border-amber-400 px-2.5 py-1.5 font-bold hover:bg-amber-200" onClick={()=>{if(window.confirm('Erase all local demonstration reports and reset the fictional data?')){resetLocalDemo();window.location.assign('/rawlings/app/');}}}>Reset demo data</button>
      <span className="text-[11px]">Saves only in this browser. Never use this mode with real student records.</span>
    </div>
  </div>;
}
