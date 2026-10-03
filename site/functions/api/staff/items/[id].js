// GET   /api/staff/items/:id   — full record with notes and history
// PATCH /api/staff/items/:id   — { status }
import { getItem, setStatus, json } from '../../../../server/inbox.js';

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
    const r = await setStatus(env.DB, params.id, body.status, data.user.name);
    return r ? json({ ok: true, ...r }) : json({ error: 'Not found' }, 404);
  } catch (err) {
    return json({ error: err.message }, 400);
  }
}
