// POST /api/quotes — save a quote request and email it to Richard.
import { buildQuote, newQuoteId, InputError } from '../../server/quote.js';
import { quoteEmail, sendWithResend } from '../../server/email.js';
import { PRICE_SHEET_VERSION } from '../../public/js/pricing.js';
import { verifyTurnstile, ROBOT_MESSAGE } from '../../server/turnstile.js';
import { cleanSource, cleanHeard } from '../../public/js/source.js';

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

export async function onRequestPost(context) {
  const { request, env } = context;
  if (Number(request.headers.get('Content-Length') || 0) > 200_000) return json({ error: 'Request too large.' }, 413);

  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }

  // Honeypot: bots fill the hidden "website" field. Pretend success, store nothing.
  if (body?.contact?.website) return json({ ok: true, id: newQuoteId() });

  const human = await verifyTurnstile(body?.turnstile, env, request.headers.get('CF-Connecting-IP'));
  if (!human.ok) return json({ error: ROBOT_MESSAGE, robot: true }, 400);

  let q;
  try { q = buildQuote(body); } catch (err) {
    if (err instanceof InputError) return json({ error: err.message }, 400);
    throw err;
  }

  if (!env.DB) return json({ error: 'Quote storage is not configured.' }, 500);

  const id = newQuoteId();
  const now = new Date().toISOString();
  const { contact: c, options: o, estimate: est } = q;
  q.source = cleanSource(body.source);
  q.heardAbout = cleanHeard(body?.contact?.heardAbout);

  await env.DB.prepare(`INSERT INTO quotes (
      id, created_at, name, company, email, phone, contact_pref, address, customer_notes,
      project_type, fence_type, months, start_date, feet, site_lat, site_lng, distance_miles,
      priced, estimate_total, price_sheet_version, plan_json, options_json, estimate_json, user_agent,
      source_json, heard_about
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`)
    .bind(
      id, now, c.name, c.company || null, c.email, c.phone, c.contactPref, c.address, c.notes || null,
      o.projectType, o.fenceType, o.months, o.startDate, q.feet, q.site?.lat ?? null, q.site?.lng ?? null, q.distanceMiles,
      est.priced ? 1 : 0, est.priced ? est.total : null, PRICE_SHEET_VERSION,
      JSON.stringify(q.plan), JSON.stringify({ ...o, gates: q.gates }), JSON.stringify(est),
      (request.headers.get('User-Agent') || '').slice(0, 300),
      q.source ? JSON.stringify(q.source) : null, q.heardAbout,
    ).run();

  // Email Richard without making the customer wait on it
  const mail = quoteEmail(id, q, env);
  const notify = async () => {
    if (!env.RESEND_API_KEY) {
      await env.DB.prepare(`UPDATE quotes SET email_status='skipped', email_error=?, email_html=? WHERE id=?`)
        .bind('RESEND_API_KEY not configured', mail.html, id).run();
      return;
    }
    try {
      await sendWithResend(env, { to: env.QUOTE_TO, from: env.QUOTE_FROM, replyTo: c.email, ...mail });
      await env.DB.prepare(`UPDATE quotes SET email_status='sent' WHERE id=?`).bind(id).run();
    } catch (err) {
      await env.DB.prepare(`UPDATE quotes SET email_status='failed', email_error=?, email_html=? WHERE id=?`)
        .bind(String(err.message).slice(0, 500), mail.html, id).run();
    }
  };
  context.waitUntil(notify());

  return json({
    ok: true, id,
    estimate: { priced: est.priced, total: est.priced ? est.total : null, lines: est.lines.map(({ label, amount }) => ({ label, amount })) },
  });
}

export const onRequest = () => json({ error: 'Method not allowed.' }, 405);
