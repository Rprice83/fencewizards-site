// GET /api/dev/email-preview?id=FW-...  — LOCAL DEVELOPMENT ONLY.
// Shows the email Richard would receive for a saved quote (FW-…) or form inquiry (FW-M-…).
// Without ?id it shows the most recent one. Disabled unless DEV_PREVIEW=true (set in .dev.vars, never in production).
export async function onRequestGet({ request, env }) {
  if (env.DEV_PREVIEW !== 'true') return new Response('Not found', { status: 404 });
  const id = new URL(request.url).searchParams.get('id');
  let row;
  if (id) {
    const table = id.startsWith('FW-M-') ? 'inquiries' : 'quotes';
    row = await env.DB.prepare(`SELECT email_html FROM ${table} WHERE id = ?`).bind(id).first();
  } else {
    row = await env.DB.prepare(`SELECT email_html FROM (
        SELECT email_html, created_at FROM quotes UNION ALL SELECT email_html, created_at FROM inquiries
      ) WHERE email_html IS NOT NULL ORDER BY created_at DESC LIMIT 1`).first();
  }
  if (!row?.email_html) return new Response('No email saved for that id.', { status: 404 });
  return new Response(row.email_html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
