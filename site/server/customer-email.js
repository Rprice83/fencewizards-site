// Confirmation email to the customer ("Richard has your request"), built from the saved database row so the
// sent email and the dev preview are identical. Table layout + inline styles: renders in Outlook, Gmail, Apple Mail.
// Sent from CONFIRM_FROM with Reply-To = Richard (QUOTE_TO). No marketing content (privacy policy).
// Nothing the visitor typed goes in (no name, address, message or file names), only fixed facts we control: otherwise
// anyone could put a stranger's address in the form and use this email to send them their own text from Richard's domain.
import { fmtMoney, FENCE_TYPES } from '../public/js/pricing.js';
import { SITE as SITE_FACTS } from '../build/lib/site.mjs'; // phone, email, address: the site's single source

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const parse = s => { try { return JSON.parse(s); } catch { return null; } };
const PREF = { call: 'phone call', text: 'text message', email: 'email' };

const INK = '#231F20', RED = '#ED1C24', MUTED = '#6A6667', LINE = '#E4E3E1', PAPER = '#F4F4F3';
const FONT = 'Arial, Helvetica, sans-serif';
const DISPLAY = `'Barlow Condensed', 'Arial Narrow', Arial, sans-serif`;

// What the customer asked for, as [label, value] rows (values plain text; escaped on output). Fixed choices only.
function quoteFacts(r, o) {
  const gates = o?.gates ? [o.gates.single && `${o.gates.single} single`, o.gates.double && `${o.gates.double} double`].filter(Boolean).join(', ') : '';
  return [
    ['Fence', `${FENCE_TYPES[r.fence_type] || 'Not sure yet'}${o?.height === 8 ? ' · 8 ft (special order)' : ''}`],
    ['Length', `${Math.round(r.feet).toLocaleString()} linear ft`],
    ['Rental', `${r.months} month${r.months > 1 ? 's' : ''}`],
    ['Gates', gates || 'None'],
    ['Ideal install date', r.start_date ? new Date(`${r.start_date}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : ''],
  ].filter(([, v]) => v);
}
function inquiryFacts(r) {
  const files = (parse(r.file_names) || []).length;
  return [
    ['Linear feet', r.feet ? `${Math.round(r.feet).toLocaleString()} ft` : ''],
    ['Attached files', files ? `${files} file${files > 1 ? 's' : ''}` : ''],
  ].filter(([, v]) => v);
}

/**
 * row: a `quotes` row (id FW-…) or `inquiries` row (id FW-M-…). origin: the site's base URL for the logo/links.
 * → { to, subject, html, text } or null when there's no customer email address.
 */
export function customerEmail(row, { origin, phone = SITE_FACTS.phone, tel = SITE_FACTS.tel, email = SITE_FACTS.email } = {}) {
  if (!row?.email) return null;
  const isQuote = !row.id.startsWith('FW-M-');
  const est = isQuote ? parse(row.estimate_json) : null;
  const o = isQuote ? parse(row.options_json) : null;
  const facts = isQuote ? quoteFacts(row, o) : inquiryFacts(row);
  const how = isQuote && PREF[row.contact_pref] ? ` by ${PREF[row.contact_pref]}` : '';
  const what = isQuote ? 'fence plan' : row.kind === 'contact' ? 'message' : 'request';
  const subject = `We have your ${what}. Reference ${row.id}`;
  const preheader = `Richard has your ${what} and will reach out within 24 hours.`;

  const factRows = facts.map(([k, v]) => `<tr>
      <td style="padding:9px 0;border-top:1px solid ${LINE};color:${MUTED};font:14px/1.4 ${FONT};width:40%;vertical-align:top">${esc(k)}</td>
      <td style="padding:9px 0;border-top:1px solid ${LINE};color:${INK};font:600 14px/1.4 ${FONT};vertical-align:top">${esc(v)}</td></tr>`).join('');

  let estimateBlock = '';
  if (isQuote && est) {
    const lines = (est.lines || []).map(l => `<tr>
        <td style="padding:7px 0;border-top:1px solid ${LINE};color:${INK};font:14px/1.4 ${FONT}">${esc(l.label)}</td>
        <td style="padding:7px 0;border-top:1px solid ${LINE};color:${INK};font:14px/1.4 ${FONT};text-align:right;white-space:nowrap">${l.amount ? fmtMoney(l.amount) : 'Included'}</td></tr>`).join('');
    estimateBlock = row.priced ? `
      <h2 style="margin:28px 0 6px;font:800 italic 20px/1.2 ${DISPLAY};text-transform:uppercase;letter-spacing:.02em;color:${INK}">Your preliminary estimate</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${lines}
        <tr><td style="padding:12px 0 0;border-top:2px solid ${INK};color:${INK};font:800 16px ${FONT}">Preliminary total</td>
            <td style="padding:12px 0 0;border-top:2px solid ${INK};color:${INK};font:800 16px ${FONT};text-align:right;white-space:nowrap">${fmtMoney(row.estimate_total)}</td></tr>
      </table>
      <p style="margin:10px 0 0;color:${MUTED};font:13px/1.5 ${FONT}">Before tax. This is a preliminary price from your plan; Richard confirms the final price after he reviews your site. One flat price, removal included.</p>`
      : `<p style="margin:24px 0 0;padding:14px 16px;background:${PAPER};border-radius:8px;color:${INK};font:14px/1.5 ${FONT}">Richard will price this plan for you directly.</p>`;
  }

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:${PAPER}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}"><tr><td align="center" style="padding:24px 12px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr><td style="background:${INK};padding:22px 28px;border-bottom:5px solid ${RED}">
      <a href="${esc(origin)}/" style="text-decoration:none"><img src="${esc(origin)}/assets/brand/logo-horizontal-reversed-800.png" width="190" height="66" alt="Fence Wizards" style="display:block;border:0;width:190px;height:auto"></a>
    </td></tr>
    <tr><td style="padding:30px 28px 8px">
      <h1 style="margin:0;font:800 italic 30px/1.1 ${DISPLAY};text-transform:uppercase;letter-spacing:.01em;color:${INK}">Thanks! Your ${what} is <span style="color:${RED}">on its way to Richard.</span></h1>
      <p style="margin:14px 0 0;color:${INK};font:16px/1.55 ${FONT}">Richard will reach out within 24 hours${esc(how)}, usually the same day. He takes every request himself.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0 0"><tr><td style="padding:10px 14px;border:1.5px dashed ${LINE};border-radius:8px;font:13px ${FONT};color:${MUTED}">Your reference: <strong style="color:${INK};font:700 15px ${FONT};letter-spacing:.04em">${esc(row.id)}</strong></td></tr></table>
    </td></tr>
    <tr><td style="padding:8px 28px 4px">
      <h2 style="margin:20px 0 6px;font:800 italic 20px/1.2 ${DISPLAY};text-transform:uppercase;letter-spacing:.02em;color:${INK}">What you asked for</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${factRows}</table>
      ${estimateBlock}
    </td></tr>
    <tr><td style="padding:24px 28px 30px">
      <h2 style="margin:4px 0 12px;font:800 italic 20px/1.2 ${DISPLAY};text-transform:uppercase;letter-spacing:.02em;color:${INK}">What happens next</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${[`Richard reviews your ${what}${isQuote ? ' and the site on the map' : ''}.`, `He reaches out within 24 hours${how} to go over the details.`, 'He confirms the price and books your install.']
          .map((t, i) => `<tr><td style="width:34px;padding:0 0 10px;vertical-align:top"><span style="display:inline-block;width:24px;height:24px;border-radius:12px;background:${RED};color:#fff;font:700 13px/24px ${FONT};text-align:center">${i + 1}</span></td><td style="padding:2px 0 10px;color:${INK};font:15px/1.5 ${FONT}">${esc(t)}</td></tr>`).join('')}
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 0;background:${PAPER};border-radius:10px"><tr><td style="padding:18px 20px">
        <p style="margin:0 0 4px;color:${MUTED};font:13px ${FONT}">Questions or a change? Call or text Richard directly:</p>
        <a href="tel:${esc(tel)}" style="color:${RED};font:800 italic 28px/1.2 ${DISPLAY};text-decoration:none;letter-spacing:.02em">${esc(phone)}</a>
        <p style="margin:6px 0 0;color:${MUTED};font:13px/1.5 ${FONT}">Or just reply to this email.</p>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding:18px 28px;background:${INK};color:#BDBBBC;font:12px/1.6 ${FONT}">
      <strong style="color:#ffffff">Fence Wizards</strong> · Temporary fence rental · ${esc(SITE_FACTS.street)}, ${esc(SITE_FACTS.city)}, ${esc(SITE_FACTS.region)} ${esc(SITE_FACTS.zip)}<br>
      <a href="${esc(origin)}/" style="color:#ffffff">fencewizards.com</a> · <a href="mailto:${esc(email)}" style="color:#ffffff">${esc(email)}</a><br>
      You're receiving this because you sent a request on our website. We don't send marketing email. <a href="${esc(origin)}/privacy/" style="color:#BDBBBC">Privacy policy</a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;

  const text = [
    `Thanks! Your ${what} is on its way to Richard.`,
    `Richard will reach out within 24 hours${how}, usually the same day.`,
    `Your reference: ${row.id}`,
    '',
    'WHAT YOU ASKED FOR',
    ...facts.map(([k, v]) => `${k}: ${v}`),
    isQuote && est && row.priced ? ['', 'YOUR PRELIMINARY ESTIMATE', ...(est.lines || []).map(l => `- ${l.label}: ${l.amount ? fmtMoney(l.amount) : 'Included'}`),
      `Preliminary total: ${fmtMoney(row.estimate_total)} (before tax; Richard confirms the final price)`].join('\n') : '',
    isQuote && est && !row.priced ? '\nRichard will price this plan for you directly.' : '',
    '',
    `Questions or a change? Call or text Richard: ${phone}, or reply to this email.`,
    '',
    `Fence Wizards · ${SITE_FACTS.street}, ${SITE_FACTS.city}, ${SITE_FACTS.region} ${SITE_FACTS.zip} · ${origin}`,
  ].filter(s => s !== '').join('\n');

  return { to: row.email, subject, html, text };
}
