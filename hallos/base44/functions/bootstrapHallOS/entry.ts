import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { MORGAN_HOUSING_CATALOG } from '../../shared/morgan-housing.ts';

/** Admin-triggered, idempotent catalog refresh. NO fictional issues, schedules or spaces in actual halls. */
export default async function(req) {
  try {
    const b = createClientFromRequest(req);
    const user = await b.auth.me().catch(() => null);
    if (!user) return Response.json({error:'Unauthorized'},{status:401});
    if (user.role !== 'admin') return Response.json({error:'Platform admin only'},{status:403});
    const svc = b.asServiceRole;
    const rows = await svc.entities.ResidenceHall.list();
    const existing = Array.isArray(rows) ? rows : rows?.items ?? [];
    let created = 0, updated = 0, deprecated = 0;
    for (const catalog of MORGAN_HOUSING_CATALOG) {
      const found = existing.find(h => h.housing_key === catalog.key || h.name === catalog.name);
      const { key, ...details } = catalog;
      const data = { ...details, housing_key:key };
      if (!found) { await svc.entities.ResidenceHall.create(data); created++; }
      else {
        // Keep staff-maintained floor counts and front-desk numbers when the catalog leaves them unconfirmed.
        const merged = {
          ...data,
          floor_count: catalog.floor_count || Number(found.floor_count || 0),
          front_desk_phone: catalog.front_desk_phone || found.front_desk_phone || '',
          resident_director: found.resident_director || '',
          director_office_phone: found.director_office_phone || '',
        };
        if (found.is_demo) merged.is_demo = false;
        await svc.entities.ResidenceHall.update(found.id, merged);
        updated++;
      }
    }
    // Retire (without destroying existing records) any fictional hall from earlier prototypes.
    for (const old of existing.filter(h => /Beacon House/i.test(h.name || ''))) {
      await svc.entities.ResidenceHall.update(old.id, {is_active:false, description:'Retired fictional HallOS prototype. Not a Morgan State residence.'});
      deprecated++;
    }
    return Response.json({ok:true,created,updated,deprecated,catalog_count:MORGAN_HOUSING_CATALOG.length, new_shared_spaces:0});
  } catch(e) {
    console.error('bootstrapHallOS',e);
    return Response.json({error:'Could not update the Morgan residence catalog'},{status:500});
  }
}
