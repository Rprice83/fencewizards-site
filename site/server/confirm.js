// Sends the customer's confirmation email for a saved quote or inquiry and records the outcome in confirm_status:
// sent | failed: … | skipped (no Resend key yet) | no-email (the form had no email address, e.g. the quick-quote form)
// | limited (see the limits below).
// Only requests that passed the spam check get here (server/spam-check.js), and the email carries nothing the visitor
// typed except their email address (server/customer-email.js), so it's useless for sending spam from Richard's domain.
import { customerEmail } from './customer-email.js';
import { sendWithResend } from './email.js';

export const PER_ADDRESS_PER_DAY = 1; // a second request the same day still reaches Richard, just no second "we have it" email
export const SITE_PER_DAY = 50;       // far above real volume; stops a flood from hurting the domain's email reputation

async function overLimit(db, email) {
  const since = new Date(Date.now() - 864e5).toISOString();
  const sql = `SELECT
      (SELECT COUNT(*) FROM quotes WHERE confirm_status = 'sent' AND created_at >= ?1 AND lower(email) = ?2)
    + (SELECT COUNT(*) FROM inquiries WHERE confirm_status = 'sent' AND created_at >= ?1 AND lower(email) = ?2) AS mine,
      (SELECT COUNT(*) FROM quotes WHERE confirm_status = 'sent' AND created_at >= ?1)
    + (SELECT COUNT(*) FROM inquiries WHERE confirm_status = 'sent' AND created_at >= ?1) AS everyone`;
  const r = await db.prepare(sql).bind(since, String(email).toLowerCase()).first();
  return (r?.mine || 0) >= PER_ADDRESS_PER_DAY || (r?.everyone || 0) >= SITE_PER_DAY;
}

export async function sendConfirmation(env, table, id, origin) {
  if (table !== 'quotes' && table !== 'inquiries') throw new Error('bad table');
  const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
  const mail = customerEmail(row, { origin });
  let status = 'skipped';
  if (!mail) status = 'no-email';
  else if (env.RESEND_API_KEY) {
    if (await overLimit(env.DB, mail.to)) status = 'limited';
    else {
      try {
        await sendWithResend(env, { to: mail.to, from: env.CONFIRM_FROM || env.QUOTE_FROM, replyTo: env.QUOTE_TO, subject: mail.subject, html: mail.html, text: mail.text });
        status = 'sent';
      } catch (err) { status = `failed: ${String(err.message).slice(0, 200)}`; }
    }
  }
  await env.DB.prepare(`UPDATE ${table} SET confirm_status = ? WHERE id = ?`).bind(status, id).run();
  return status;
}
