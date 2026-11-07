import { useState } from 'react';
import { Building2, Loader2, ShieldCheck, MapPin } from 'lucide-react';
import { housingTypeLabel } from '@/lib/morganHousing';

export default function HallPicker({ halls = [], initialHallId = '', initialFloor = '', saving, error, onSubmit }) {
  const [hallId, setHallId] = useState(initialHallId);
  const [floor, setFloor] = useState(initialFloor);
  const selected = halls.find(h => h.id === hallId);
  const floorCount = Number(selected?.floor_count || 0);
  const floors = Array.from({length: Math.max(0,floorCount)}, (_,i) => String(i+1));
  const onCampus = halls.filter(h => h.housing_type === 'on_campus');
  const offCampus = halls.filter(h => h.housing_type === 'off_campus');
  const uncategorized = halls.filter(h => !['on_campus','off_campus'].includes(h.housing_type));
  return (
    <form className="card-surface space-y-4 p-5" onSubmit={e => {e.preventDefault(); onSubmit({hall_id:hallId,floor: floorCount>0?floor:''});}}>
      <div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-brand-orange"/><p className="font-heading text-[15px] font-extrabold text-brand-navy">Find your Morgan residence</p></div>
      <p className="text-[11.5px] leading-relaxed text-muted-foreground">Choose your assigned university-managed housing location. HallOS keeps each residence's updates and reports separate.</p>
      <label className="block text-[12px] font-bold text-brand-navy" htmlFor="hall-picker">Residence</label>
      <select id="hall-picker" required value={hallId} onChange={e=>{setHallId(e.target.value);setFloor('');}} className="w-full rounded-xl border border-border bg-white p-3 text-[13px] text-brand-navy">
        <option value="">Select your residence</option>
        {onCampus.length>0 && <optgroup label="On campus">{onCampus.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</optgroup>}
        {offCampus.length>0 && <optgroup label="University-managed off campus">{offCampus.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</optgroup>}
        {uncategorized.length>0 && <optgroup label="Other locations — staff verification required">{uncategorized.map(h=><option key={h.id} value={h.id}>{h.name}</option>)}</optgroup>}
      </select>
      {selected && <div className="flex items-start gap-2 rounded-xl bg-secondary/70 px-3 py-2.5 text-[11.5px] leading-relaxed text-brand-navy/70"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange"/><span>{housingTypeLabel(selected)}. Official resources are selected for this residence. Exact staff contacts and room/floor layouts should be confirmed locally.</span></div>}
      {floorCount > 0 ? <>
        <label className="block text-[12px] font-bold text-brand-navy" htmlFor="hall-floor">Floor</label>
        <select id="hall-floor" required value={floor} onChange={e=>setFloor(e.target.value)} className="w-full rounded-xl border border-border bg-white p-3 text-[13px] text-brand-navy">
          <option value="">Select floor</option>{floors.map(n=><option key={n} value={n}>Floor {n}</option>)}
        </select>
      </> : <p className="rounded-xl border border-border bg-white px-3 py-2.5 text-[11.5px] text-muted-foreground">No staff-confirmed floor directory yet. You can request residence membership without selecting a floor; floor-only alerts remain unavailable until staff configure your building.</p>}
      <p className="flex items-start gap-2 rounded-xl bg-brand-orangeSoft p-3 text-[11px] leading-relaxed text-brand-navy/75"><ShieldCheck className="h-4 w-4 shrink-0 text-brand-orange"/>{selected?.is_demo ? 'Local demo mode: fictional records and immediate simulated access. This is not Morgan student data.' : 'An approved residence staff member must verify membership before private information unlocks. Choosing a residence does not verify RA or staff status.'}</p>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-[12px] text-red-700">{error}</p>}
      <button type="submit" disabled={!hallId || (floorCount>0 && !floor) || saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-[13px] font-bold text-white disabled:opacity-50">{saving && <Loader2 className="h-4 w-4 animate-spin"/>} Request access</button>
    </form>
  );
}
