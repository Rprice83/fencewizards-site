// GET /api/dev/customer-email?id=FW-...  — LOCAL DEVELOPMENT ONLY (DEV_PREVIEW=true).
// Shows the confirmation email the customer would receive for a saved quote (FW-…) or inquiry (FW-M-…).
// Without ?id: the most recent request that has an email address. Add &text=1 for the plain-text version.
import { customerEmail } from '../../../server/customer-email.js';

export async function onRequestGet({ request, env }) {
  if (env.DEV_PREVIEW !== 'true') return new Response('Not found', { status: 404 });
  const url = new URL(request.url);
  let id = url.searchParams.get('id');
  if (!id) {
    const latest = await env.DB.prepare(`SELECT id FROM (SELECT id, created_at, email FROM quotes UNION ALL SELECT id, created_at, email FROM inquiries)
      WHERE email IS NOT NULL ORDER BY created_at DESC LIMIT 1`).first();
    id = latest?.id;
  }
  const table = String(id || '').startsWith('FW-M-') ? 'inquiries' : 'quotes';
  const row = id && await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
  const mail = customerEmail(row, { origin: url.origin });
  if (!mail) return new Response('No request with an email address found.', { status: 404 });
  return url.searchParams.get('text')
    ? new Response(`Subject: ${mail.subject}\nTo: ${mail.to}\n\n${mail.text}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
    : new Response(mail.html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
