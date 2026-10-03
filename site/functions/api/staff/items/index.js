// GET /api/staff/items?status=open|new|contacted|quoted|won|lost&type=quote|inquiry&q=search&before=ISO
import { listItems, json } from '../../../../server/inbox.js';

export async function onRequestGet({ request, env }) {
  const p = new URL(request.url).searchParams;
  const result = await listItems(env.DB, {
    status: p.get('status') || '', type: p.get('type') || '', q: (p.get('q') || '').trim().slice(0, 100), before: p.get('before') || '',
  });
  return json(result);
}
