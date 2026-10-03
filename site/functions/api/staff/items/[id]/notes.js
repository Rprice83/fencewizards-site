// POST /api/staff/items/:id/notes — { body }
import { addNote, json } from '../../../../../server/inbox.js';

export async function onRequestPost({ params, env, request, data }) {
  if (!/^FW-(M-)?\d{6}-[A-Z2-9]{4}$/.test(params.id)) return json({ error: 'Not found' }, 404);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request' }, 400); }
  const text = typeof body.body === 'string' ? body.body.trim().slice(0, 5000) : '';
  if (!text) return json({ error: 'Write a note first.' }, 400);
  const r = await addNote(env.DB, params.id, text, data.user.name);
  return r ? json({ ok: true, ...r }) : json({ error: 'Not found' }, 404);
}
