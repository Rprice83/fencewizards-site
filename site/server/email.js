// Notification email to Richard for a new quote request (sent with Resend).
import { fmtMoney, FENCE_TYPES, PRICE_SHEET_VERSION } from '../public/js/pricing.js';
import { planSegments, planGeoJSON } from './quote.js';
import { sourceLabel } from '../public/js/source.js';

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const PROJECT = { construction: 'Construction', event: 'Event', emergency: 'Emergency', other: 'Other' };
const PREF = { call: 'Call', text: 'Text', email: 'Email' };
const BALLAST = { standard: 'Standard (1 bag/stand)', plus2: '3 bags per stand', plus3: '4 bags per stand' };

// "Google Ads · fence rental near me" plus what they picked in "How did you hear about us?"
export function foundVia(d) {
  const s = sourceLabel(d.source);
  const parts = [s.kind === 'unknown' ? '' : `${s.label}${s.detail && s.kind !== 'direct' ? ` (${s.detail})` : ''}`, d.heardAbout ? `They said: ${d.heardAbout}` : ''].filter(Boolean);
  return parts.map(esc).join('<br>');
}

export function quoteEmail(id, q, env) {
  const { contact: c, options: o, estimate: est } = q;
  const fence = FENCE_TYPES[o.fenceType];
  const totalText = est.priced ? fmtMoney(est.total) : 'Needs pricing';
  const subject = `New fence plan ${id}: ${c.name}${c.company ? ` (${c.company})` : ''} · ${Math.round(q.feet).toLocaleString()} ft ${fence} · ${totalText}`;
  const tel = c.phone.replace(/[^\d+]/g, '');
  const mapsUrl = q.site ? `https://www.google.com/maps/search/?api=1&query=${q.site.lat.toFixed(6)},${q.site.lng.toFixed(6)}` : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.address)}`;
  const satUrl = q.site ? `https://www.google.com/maps/@${q.site.lat.toFixed(6)},${q.site.lng.toFixed(6)},90m/data=!3m1!1e3` : null;

  const row = (k, v) => `<tr><td style="padding:7px 0;border-top:1px solid #eee;color:#666;width:42%">${esc(k)}</td><td style="padding:7px 0;border-top:1px solid #eee;font-weight:600">${v}</td></tr>`;
  const section = (title, inner) => `<h2 style="margin:28px 0 8px;font:800 italic 18px Arial,sans-serif;text-transform:uppercase;color:#231F20">${title}</h2>${inner}`;

  const extras = [
    o.topRail && 'Top rail',
    o.postsEveryOther && 'Posts every other panel',
    o.windscreen === 'plain' && `Windscreen${o.fenceType === 'panels' ? ` · ballast: ${BALLAST[o.ballast]}` : ''}`,
    o.extraSandbags && `${o.extraSandbags} extra sand bags`,
    o.asphaltPosts && `${o.asphaltPosts} posts through asphalt`,
    o.chainLocks && `${o.chainLocks} chain & lock`,
    o.gateWheels && `${o.gateWheels} gate wheels`,
    o.xlGates && `${o.xlGates} XL double swing gate`,
    o.brandedScreens && `${o.brandedScreens} branded windscreens`,
    o.damageWaiver && 'Damage waiver requested',
  ].filter(Boolean);

  const lineRows = est.lines.map(l => `<tr>
      <td style="padding:7px 0;border-top:1px solid #eee">${esc(l.label)}<br><span style="color:#888;font-size:12px">${l.unit === 'ft' ? `${l.qty.toLocaleString()} ft × $${l.rate.toFixed(2)}` : l.unit ? `${l.qty} × ${fmtMoney(l.rate)}` : ''}</span></td>
      <td style="padding:7px 0;border-top:1px solid #eee;text-align:right;font-weight:700;white-space:nowrap">${l.amount ? fmtMoney(l.amount) : 'Included'}</td></tr>`).join('');

  const flags = [...est.reviews, ...est.assumptions];
  const flagHtml = flags.length ? `<div style="margin-top:12px;padding:12px 14px;background:#fff7e6;border-left:4px solid #E3A008;font-size:13px;color:#6b4a00"><strong>Needs your call:</strong><ul style="margin:6px 0 0;padding-left:18px">${flags.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : '';

  let planHtml;
  if (q.plan.manual) {
    planHtml = `<p style="margin:0">Footage entered manually: <strong>${q.feet.toLocaleString()} ft</strong>, ${q.gates.single} single / ${q.gates.double} double gates.${q.distanceMiles == null ? ` Customer says 50+ mi from Indy: <strong>${esc(o.farZone)}</strong>.` : ''}</p>`;
  } else {
    planHtml = q.plan.runs.map((run, i) => {
      const segs = planSegments(run);
      if (!segs.length) return '';
      const total = segs.reduce((s, x) => s + x.feet, 0);
      return `<p style="margin:10px 0 4px;font-weight:700">Line ${i + 1}: ${Math.round(total).toLocaleString()} ft${run.closed ? ' (closed loop)' : ''}</p>
        <p style="margin:0;color:#555;font-size:13px">${segs.map((s, j) => `Side ${j + 1}: ${Math.round(s.feet)} ft${s.edited ? ` (typed by customer; map measured ${Math.round(s.measured)} ft)` : ''}`).join(' · ')}</p>`;
    }).join('') + `<p style="margin:10px 0 0;font-size:13px;color:#555">Gates on the map: ${q.gates.single} single, ${q.gates.double} double. The drawn plan is attached as a GeoJSON file (drag it onto geojson.io to view it on a map).</p>`;
  }

  const html = `<!doctype html><html><body style="margin:0;background:#f1f1f2;padding:24px 12px;font:15px/1.5 Arial,Helvetica,sans-serif;color:#231F20">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden">
<tr><td style="background:#231F20;padding:18px 24px;border-bottom:5px solid #ED1C24">
  <div style="color:#fff;font:900 italic 22px Arial,sans-serif;text-transform:uppercase">New fence plan</div>
  <div style="color:#bbb;font-size:13px">${esc(id)} · ${new Date().toLocaleString('en-US', { timeZone: 'America/Indiana/Indianapolis', dateStyle: 'medium', timeStyle: 'short' })}</div>
</td></tr>
<tr><td style="padding:22px 24px">

  <table role="presentation" width="100%" style="background:#f7f7f7;border-radius:8px"><tr><td style="padding:16px 18px">
    <div style="font-size:12px;color:#666;text-transform:uppercase;letter-spacing:1px">Preliminary estimate</div>
    <div style="font:900 italic 32px Arial,sans-serif;color:${est.priced ? '#231F20' : '#ED1C24'}">${esc(totalText)}</div>
    <div style="font-size:13px;color:#555">${Math.round(q.feet).toLocaleString()} ft · ${esc(fence)} · ${o.months} month${o.months > 1 ? 's' : ''}</div>
  </td></tr></table>

  ${section('Customer', `<table role="presentation" width="100%" style="font-size:14px">
    ${row('Name', esc(c.name))}
    ${c.company ? row('Company', esc(c.company)) : ''}
    ${row('Phone', `<a href="tel:${esc(tel)}" style="color:#ED1C24">${esc(c.phone)}</a>`)}
    ${row('Email', `<a href="mailto:${esc(c.email)}" style="color:#ED1C24">${esc(c.email)}</a>`)}
    ${row('Prefers', esc(PREF[c.contactPref]))}
    ${foundVia(q) ? row('Found us via', foundVia(q)) : ''}
  </table>`)}

  ${section('Project', `<table role="presentation" width="100%" style="font-size:14px">
    ${row('Site', `${esc(c.address)}<br><a href="${mapsUrl}" style="color:#ED1C24;font-weight:400">Open in Google Maps</a>${satUrl ? ` · <a href="${satUrl}" style="color:#ED1C24;font-weight:400">Satellite view</a>` : ''}`)}
    ${row('Distance from downtown Indy', q.distanceMiles != null ? `≈${Math.round(q.distanceMiles)} mi (${q.distanceMethod === 'driving' ? 'driving' : 'straight line'})` : 'Unknown (not located on map)')}
    ${row('Project type', esc(PROJECT[o.projectType]))}
    ${row('Fence', `${esc(fence)}${o.height === 8 ? ' · 8 ft (special order)' : ' · 6 ft'}`)}
    ${row('Rental length', `${o.months} month${o.months > 1 ? 's' : ''}`)}
    ${row('Ideal install date', o.startDate ? esc(new Date(`${o.startDate}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })) : 'Not given')}
    ${extras.length ? row('Options', extras.map(esc).join('<br>')) : ''}
  </table>`)}

  ${c.notes ? section('Customer notes', `<p style="margin:0;padding:12px 14px;background:#f7f7f7;border-radius:6px;white-space:pre-wrap">${esc(c.notes)}</p>`) : ''}

  ${section('Fence layout', planHtml)}

  ${section('Estimate breakdown', `<table role="presentation" width="100%" style="font-size:14px">${lineRows}
    ${est.priced ? `<tr><td style="padding:10px 0;border-top:2px solid #231F20;font-weight:800">Preliminary total (pre-tax)</td><td style="padding:10px 0;border-top:2px solid #231F20;text-align:right;font-weight:800">${fmtMoney(est.total)}</td></tr>` : ''}
  </table>${flagHtml}
  <p style="font-size:12px;color:#888;margin:10px 0 0">Calculated on the server from price sheet ${PRICE_SHEET_VERSION}. The customer was told you'll reach out within 24 hours.</p>`)}

  <p style="margin:26px 0 0"><a href="tel:${esc(tel)}" style="display:inline-block;background:#ED1C24;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:4px">Call ${esc(c.name.split(' ')[0])}</a>
  &nbsp;<a href="mailto:${esc(c.email)}?subject=${encodeURIComponent(`Your Fence Wizards quote ${id}`)}" style="display:inline-block;background:#231F20;color:#fff;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:4px">Reply by email</a></p>
  <p style="margin:12px 0 0"><a href="${esc(env.SITE_URL || '')}/staff/#${esc(id)}" style="color:#ED1C24;font-weight:700">Open in Quote Inbox →</a> <span style="color:#888;font-size:12px">(see the drawn plan on the map, add notes, track status)</span></p>
</td></tr>
</table>
<p style="text-align:center;font-size:12px;color:#999;margin:14px 0 0">Sent by the estimator on ${esc(env.SITE_URL || 'fencewizards.com')}</p>
</body></html>`;

  const text = [
    `NEW FENCE PLAN ${id}`,
    `Preliminary estimate: ${totalText} (${Math.round(q.feet)} ft ${fence}, ${o.months} months)`,
    '',
    `Name: ${c.name}${c.company ? ` (${c.company})` : ''}`,
    `Phone: ${c.phone} (prefers ${PREF[c.contactPref]})`,
    `Email: ${c.email}`,
    `Site: ${c.address}`,
    `Map: ${mapsUrl}`,
    c.notes ? `\nNotes:\n${c.notes}` : '',
    '',
    ...est.lines.map(l => `- ${l.label}: ${l.amount ? fmtMoney(l.amount) : 'Included'}`),
    est.priced ? `TOTAL (pre-tax): ${fmtMoney(est.total)}` : '',
    ...flags.map(f => `! ${f}`),
  ].filter(s => s !== '').join('\n');

  const attachments = q.plan.manual || !q.plan.runs.length ? [] : [{
    filename: `fence-plan-${id}.geojson`,
    content: btoa(unescape(encodeURIComponent(JSON.stringify(planGeoJSON(q), null, 1)))),
  }];

  return { subject, html, text, attachments };
}

export async function sendWithResend(env, { to, from, replyTo, subject, html, text, attachments }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: Array.isArray(to) ? to : [to], reply_to: replyTo, subject, html, text, attachments }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}
