import { useState } from 'react';
import { db } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { MapPinned, Plus, QrCode, Loader2 } from 'lucide-react';
import { useSession } from '@/lib/session';

const types = [ ['bathroom','Bathroom'], ['shower','Shower'], ['laundry','Laundry'], ['trash','Trash'], ['kitchen','Kitchen'], ['hallway','Hallway'], ['lounge','Lounge'], ['other','Other'] ];

export default function SharedSpaceSetup({ onCreated }) {
  const { hall } = useSession();
  const [name,setName] = useState('');
  const [floor,setFloor] = useState('');
  const [type,setType] = useState('other');
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  async function submit(e) {
    e.preventDefault();setSaving(true);setError('');setMessage('');
    try {
      await db.functions.invoke('createSharedSpace',{name, floor, space_type:type, hall_id:hall.id});
      setName('');setFloor('');setMessage('Shared space created. Generate its QR sign from Hall Radar.');
      await onCreated?.();
    } catch(e) {setError(e?.response?.data?.error||e?.message||'Unable to create shared space');}
    finally {setSaving(false);}
  }
  return <details className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
    <summary className="cursor-pointer px-4 py-4 font-heading text-[13px] font-extrabold text-brand-navy"><MapPinned className="mr-2 inline h-4 w-4 text-brand-orange"/> Set up a shared space and QR sign</summary>
    <div className="border-t border-border px-4 pb-4 pt-3">
      <p className="text-[11px] leading-relaxed text-muted-foreground">Add only locations your residence staff have confirmed. For apartments, the floor may be blank. This is a resident reporting QR code, not an official Morgan facility label.</p>
      <form className="mt-3 grid gap-2 sm:grid-cols-[2fr_1fr_1fr]" onSubmit={submit}>
        <label className="text-[11px] font-bold text-brand-navy">Space name<input required minLength={3} maxLength={85} value={name} onChange={e=>setName(e.target.value)} placeholder="Laundry room A" className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-[12px]"/></label>
        <label className="text-[11px] font-bold text-brand-navy">Floor (if known)<input value={floor} onChange={e=>setFloor(e.target.value)} inputMode="numeric" placeholder="Optional" className="mt-1 w-full rounded-xl border border-border px-3 py-2.5 text-[12px]"/></label>
        <label className="text-[11px] font-bold text-brand-navy">Space type<select value={type} onChange={e=>setType(e.target.value)} className="mt-1 w-full rounded-xl border border-border bg-white px-3 py-2.5 text-[12px]">{types.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
        <button disabled={saving||!name.trim()} className="flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-[12px] font-bold text-white disabled:opacity-50 sm:col-span-3">{saving?<Loader2 className="h-4 w-4 animate-spin"/>:<Plus className="h-4 w-4"/>}Add confirmed space</button>
      </form>
      {message&&<p role="status" className="mt-2 rounded-xl bg-emerald-50 p-2.5 text-[11px] text-emerald-800">{message} <Link className="font-bold underline" to="/radar"><QrCode className="inline h-3.5 w-3.5"/> Hall Radar</Link></p>}
      {error&&<p role="alert" className="mt-2 rounded-xl bg-rose-50 p-2.5 text-[11px] text-rose-800">{error}</p>}
    </div>
  </details>;
}
