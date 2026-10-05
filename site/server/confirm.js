// Sends the customer's confirmation email for a saved quote or inquiry and records the outcome in confirm_status:
// sent | failed: … | skipped (no Resend key yet) | no-email (the form had no email address, e.g. the quick-quote form).
import { customerEmail } from './customer-email.js';
import { sendWithResend } from './email.js';

export async function sendConfirmation(env, table, id, origin) {
  if (table !== 'quotes' && table !== 'inquiries') throw new Error('bad table');
  const row = await env.DB.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
  const mail = customerEmail(row, { origin });
  let status = 'skipped';
  if (!mail) status = 'no-email';
  else if (env.RESEND_API_KEY) {
    try {
      await sendWithResend(env, { to: mail.to, from: env.CONFIRM_FROM || env.QUOTE_FROM, replyTo: env.QUOTE_TO, subject: mail.subject, html: mail.html, text: mail.text });
      status = 'sent';
    } catch (err) { status = `failed: ${String(err.message).slice(0, 200)}`; }
  }
  await env.DB.prepare(`UPDATE ${table} SET confirm_status = ? WHERE id = ?`).bind(status, id).run();
  return status;
}
