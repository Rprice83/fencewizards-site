// POST /api/contact — quick-quote form (JSON) and contact form (multipart, with optional files).
// Saves the inquiry and emails Richard (files go along as email attachments).
import { newQuoteId } from '../../server/quote.js';
import { sendWithResend, foundVia } from '../../server/email.js';
import { verifyTurnstile, ROBOT_MESSAGE } from '../../server/turnstile.js';
import { cleanSource, cleanHeard } from '../../public/js/source.js';
import { sendConfirmation } from '../../server/confirm.js';

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const MAX_FILES = 5;
const MAX_TOTAL_BYTES = 15 * 1024 * 1024; // Resend allows 40 MB per email; keep well under
const ALLOWED = /\.(pdf|png|jpe?g|heic|webp|gif|dwg|dxf|kmz|kml|docx?|xlsx?|csv|txt|zip)$/i;

export async function onRequestPost(context) {
  const { request, env } = context;
  if (Number(request.headers.get('Content-Length') || 0) > MAX_TOTAL_BYTES + 200_000) return json({ error: 'Files are too large. Please email them instead.' }, 413);

  let fields = {}, files = [];
  const type = request.headers.get('Content-Type') || '';
  try {
    if (type.includes('multipart/form-data')) {
      const fd = await request.formData();
      for (const [k, v] of fd.entries()) {
        if (typeof v === 'string') fields[k] = v;
        else if (v && v.size) files.push(v);
      }
    } else {
      fields = await request.json();
    }
  } catch { return json({ error: 'Invalid request.' }, 400); }

  if (fields.website) return json({ ok: true }); // honeypot

  const human = await verifyTurnstile(fields['cf-turnstile-response'], env, request.headers.get('CF-Connecting-IP'));
  if (!human.ok) return json({ error: ROBOT_MESSAGE, robot: true }, 400);

  const kind = fields.kind === 'contact' ? 'contact' : 'quick';
  const d = {
    name: str(fields.name, 120), phone: str(fields.phone, 40), email: str(fields.email, 200).toLowerCase(),
    location: str(fields.location, 300), fenceStyle: str(fields.fenceStyle, 60), feet: Math.min(Math.max(Number(fields.feet) || 0, 0), 100000) || null,
    duration: str(fields.duration, 40), message: str(fields.message, 5000), page: str(fields.page, 300),
    heardAbout: cleanHeard(fields.heardAbout),
  };
  let source = null;
  try { source = cleanSource(JSON.parse(fields.source || 'null')); } catch { /* ignore */ }
  d.source = source;
  if (!/^\/[\w\-/]*$/.test(d.page)) d.page = ''; // only a site path; it's shown as a link in the Quote Inbox
  if (!d.name) return json({ error: 'Please add your name.' }, 400);
  if (!d.phone && !d.email) return json({ error: 'Please add a phone number or email so Richard can reach you.' }, 400);
  if (d.phone && (d.phone.match(/\d/g) || []).length < 7) return json({ error: 'Please check the phone number.' }, 400);
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return json({ error: 'Please check the email address.' }, 400);
  if (kind === 'quick' && !d.location) return json({ error: 'Please add where the project is.' }, 400);
  if (kind === 'contact' && !d.message && !files.length) return json({ error: 'Please add a message.' }, 400);

  if (files.length > MAX_FILES) return json({ error: `Please attach up to ${MAX_FILES} files.` }, 400);
  if (files.reduce((s, f) => s + f.size, 0) > MAX_TOTAL_BYTES) return json({ error: 'Files are too large (15 MB total). Please email them instead.' }, 413);
  const bad = files.find(f => !ALLOWED.test(f.name || ''));
  if (bad) return json({ error: `"${bad.name}" isn't a supported file type. PDFs, images, drawings and office files work.` }, 400);

  if (!env.DB) return json({ error: 'Storage is not configured.' }, 500);
  const id = newQuoteId().replace('FW-', 'FW-M-');
  const fileNames = files.map(f => f.name);

  await env.DB.prepare(`INSERT INTO inquiries (id, created_at, kind, page, name, phone, email, location, fence_style, feet, duration, message, file_names, user_agent, source_json, heard_about)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(
    id, new Date().toISOString(), kind, d.page || null, d.name, d.phone || null, d.email || null, d.location || null,
    d.fenceStyle || null, d.feet, d.duration || null, d.message || null, fileNames.length ? JSON.stringify(fileNames) : null,
    (request.headers.get('User-Agent') || '').slice(0, 300), source ? JSON.stringify(source) : null, d.heardAbout,
  ).run();

  const mail = inquiryEmail(id, kind, d, fileNames, env.SITE_URL);
  const attachments = await Promise.all(files.map(async f => ({ filename: f.name, content: toBase64(await f.arrayBuffer()) })));

  const notify = async () => {
    if (!env.RESEND_API_KEY) {
      await env.DB.prepare(`UPDATE inquiries SET email_status='skipped', email_error=?, email_html=? WHERE id=?`).bind('RESEND_API_KEY not configured', mail.html, id).run();
      return;
    }
    try {
      await sendWithResend(env, { to: env.QUOTE_TO, from: env.QUOTE_FROM, replyTo: d.email || undefined, ...mail, attachments });
      await env.DB.prepare(`UPDATE inquiries SET email_status='sent' WHERE id=?`).bind(id).run();
    } catch (err) {
      await env.DB.prepare(`UPDATE inquiries SET email_status='failed', email_error=?, email_html=? WHERE id=?`).bind(String(err.message).slice(0, 500), mail.html, id).run();
    }
  };
  context.waitUntil(notify());
  context.waitUntil(sendConfirmation(env, 'inquiries', id, new URL(request.url).origin)); // customer's "we have it" email
  return json({ ok: true, id });
}

export const onRequest = () => json({ error: 'Method not allowed.' }, 405);

function toBase64(buf) {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}

function inquiryEmail(id, kind, d, fileNames, siteUrl = '') {
  const title = kind === 'contact' ? 'New message' : 'New quote request';
  const subject = `${title} ${id}: ${d.name}${d.location ? ` · ${d.location}` : ''}`;
  const tel = d.phone.replace(/[^\d+]/g, '');
  const row = (k, v) => v ? `<tr><td style="padding:7px 0;border-top:1px solid #eee;color:#666;width:38%">${esc(k)}</td><td style="padding:7px 0;border-top:1px solid #eee;font-weight:600">${v}</td></tr>` : '';
  const html = `<!doctype html><html><body style="margin:0;background:#f1f1f2;padding:24px 12px;font:15px/1.5 Arial,Helvetica,sans-serif;color:#231F20">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden">
<tr><td style="background:#231F20;padding:18px 24px;border-bottom:5px solid #ED1C24">
  <div style="color:#fff;font:900 italic 22px Arial,sans-serif;text-transform:uppercase">${title}</div>
  <div style="color:#bbb;font-size:13px">${esc(id)} · from ${esc(d.page || 'the website')}</div>
</td></tr>
<tr><td style="padding:20px 24px">
  <table role="presentation" width="100%" style="font-size:14px">
    ${row('Name', esc(d.name))}
    ${row('Phone', d.phone ? `<a href="tel:${esc(tel)}" style="color:#ED1C24">${esc(d.phone)}</a>` : '')}
    ${row('Email', d.email ? `<a href="mailto:${esc(d.email)}" style="color:#ED1C24">${esc(d.email)}</a>` : '')}
    ${row('Project location', esc(d.location))}
    ${row('Fence style', esc(d.fenceStyle))}
    ${row('Linear feet', d.feet ? esc(d.feet.toLocaleString()) : '')}
    ${row('How long', esc(d.duration))}
    ${row('Attached files', fileNames.map(esc).join('<br>'))}
    ${row('Found us via', foundVia(d))}
  </table>
  ${d.message ? `<p style="margin:18px 0 0;padding:12px 14px;background:#f7f7f7;border-radius:6px;white-space:pre-wrap">${esc(d.message)}</p>` : ''}
  <p style="margin:22px 0 0">${d.phone ? `<a href="tel:${esc(tel)}" style="display:inline-block;background:#ED1C24;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:4px">Call ${esc(d.name.split(' ')[0])}</a>` : ''}
  ${d.email ? `&nbsp;<a href="mailto:${esc(d.email)}" style="display:inline-block;background:#231F20;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:4px">Reply by email</a>` : ''}</p>
  <p style="margin:14px 0 0"><a href="${esc(siteUrl)}/staff/#${esc(id)}" style="color:#ED1C24;font-weight:700">Open in Quote Inbox →</a></p>
  <p style="font-size:12px;color:#888;margin:16px 0 0">The sender was told you'll reach out within 24 hours.</p>
</td></tr></table></body></html>`;
  const text = [`${title.toUpperCase()} ${id}`, `Name: ${d.name}`, d.phone && `Phone: ${d.phone}`, d.email && `Email: ${d.email}`, d.location && `Location: ${d.location}`,
    d.fenceStyle && `Fence: ${d.fenceStyle}`, d.feet && `Feet: ${d.feet}`, d.duration && `How long: ${d.duration}`, fileNames.length && `Files: ${fileNames.join(', ')}`, d.message && `\n${d.message}`].filter(Boolean).join('\n');
  return { subject, html, text };
}
