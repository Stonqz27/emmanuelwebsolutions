import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { requireApprovedStaff } from '../../shared/access.ts';
const TYPES = ['bathroom','shower','laundry','trash','kitchen','hallway','lounge','other'];

/** Staff can configure real, confirmed shared spaces. No invented building layout. */
export default async function(req) {
  try {
    const db = createClientFromRequest(req);
    const user = await db.auth.me().catch(() => null);
    if (!user) return Response.json({error:'Unauthorized'},{status:401});
    const svc = db.asServiceRole;
    const staff = await requireApprovedStaff(svc,user.id);
    if (!staff) return Response.json({error:'Approved residence staff only'},{status:403});
    const {name, floor, space_type, hall_id} = await req.json().catch(() => ({}));
    const label = String(name||'').trim().replace(/\s+/g,' ');
    const floorValue = String(floor||'').trim();
    if (hall_id && hall_id !== staff.hall_id) return Response.json({error:'Other residence not permitted'},{status:403});
    if (label.length < 3 || label.length > 85 || /[<>]/.test(label)) return Response.json({error:'Enter a shared-space name (3–85 characters)'},{status:400});
    if (!TYPES.includes(space_type)) return Response.json({error:'Choose a valid shared-space category'},{status:400});
    const hall = await svc.entities.ResidenceHall.get(staff.hall_id);
    const count = Number(hall?.floor_count || 0);
    if (floorValue && (!/^\d{1,2}$/.test(floorValue) || (count > 0 && Number(floorValue) > count))) {
      return Response.json({error:'Invalid floor for this residence'},{status:400});
    }
    const existingRows = await svc.entities.SharedSpace.filter({hall_id:staff.hall_id});
    const existing = Array.isArray(existingRows) ? existingRows : existingRows?.items ?? [];
    if (existing.length >= 150) return Response.json({error:'Space limit reached — contact app administrator'},{status:400});
    const duplicate = existing.find(s => String(s.name||'').toLowerCase() === label.toLowerCase() && String(s.floor||'') === floorValue);
    if (duplicate) return Response.json({error:'This shared space is already registered in your residence'},{status:409});
    const space = await svc.entities.SharedSpace.create({hall_id:staff.hall_id,name:label,floor:floorValue,space_type,is_demo:!!hall?.is_demo});
    return Response.json({space});
  } catch(err) {
    console.error('createSharedSpace',err);
    return Response.json({error:'Unable to create shared space'},{status:500});
  }
}
