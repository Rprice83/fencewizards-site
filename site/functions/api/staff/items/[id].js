// GET   /api/staff/items/:id   — full record with notes and history
// PATCH /api/staff/items/:id   — { status } and/or { wonValue } (job amount in dollars, null to clear)
import { getItem, setStatus, setWonValue, parseWonValue, json } from '../../../../server/inbox.js';

const validId = id => /^FW-(M-)?\d{6}-[A-Z2-9]{4}$/.test(id);

export async function onRequestGet({ params, env }) {
  if (!validId(params.id)) return json({ error: 'Not found' }, 404);
  const item = await getItem(env.DB, params.id);
  return item ? json(item) : json({ error: 'Not found' }, 404);
}

export async function onRequestPatch({ params, env, request, data }) {
  if (!validId(params.id)) return json({ error: 'Not found' }, 404);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request' }, 400); }
  try {
    let r = { changed: false };
    if ('wonValue' in body) {
      const value = parseWonValue(body.wonValue); // validate before changing anything
      if (body.status) r = await setStatus(env.DB, params.id, body.status, data.user.name);
      const v = r && await setWonValue(env.DB, params.id, value, data.user.name);
      r = r && v && { changed: r.changed || v.changed };
    } else {
      r = await setStatus(env.DB, params.id, body.status, data.user.name);
    }
    return r ? json({ ok: true, ...r }) : json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: err.message }, 400);
  }
}
