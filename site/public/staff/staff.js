// Quote Inbox front end. All customer-entered text goes through esc() before it touches the page.
import { mapConfig } from '/estimate/map-providers.js';
import { fmtMoney, FENCE_TYPES } from '/js/pricing.js';
import { sourceLabel } from '/js/source.js';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'];
const PROJECT = { construction: 'Construction', event: 'Event', emergency: 'Emergency', other: 'Other' };
const PREF = { call: 'Call', text: 'Text', email: 'Email' };
const BALLAST = { standard: 'Standard (1 bag)', plus2: '3 bags/stand', plus3: '4 bags/stand' };

const state = { status: 'open', type: '', q: '', items: [], more: false, current: null, me: null };

/* ---------- helpers ---------- */
async function api(path, opts = {}) {
  const res = await fetch(`/api/staff/${path}`, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', ...opts });
  const data = await res.json().catch(() => ({}));
  if (res.status === 403) { toast('Your sign-in expired. Reload the page to sign in again.', true); throw new Error('forbidden'); }
  if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
  return data;
}
function toast(msg, err) {
  const t = document.createElement('div');
  t.className = `ib-toast${err ? ' err' : ''}`; t.textContent = msg; document.body.append(t);
  setTimeout(() => t.remove(), 3200);
}
const ago = iso => {
  const s = (Date.now() - new Date(iso)) / 1000;
  if (s < 60) return 'just now';
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
const when = iso => new Date(iso).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
const digits = p => String(p || '').replace(/[^\d+]/g, '');
const fenceName = f => FENCE_TYPES[f] || f || '';
const icon = {
  call: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor"/></svg>',
  text: '<svg viewBox="0 0 24 24"><path d="M4 4h16v12H8l-4 4z" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M12 22s7-7.2 7-12a7 7 0 10-14 0c0 4.8 7 12 7 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" fill="currentColor"/></svg>',
};

/* ---------- list ---------- */
async function loadList({ append = false } = {}) {
  const p = new URLSearchParams({ status: state.status, type: state.type, q: state.q });
  if (append && state.items.length) p.set('before', state.items[state.items.length - 1].created_at);
  try {
    const data = await api(`items?${p}`);
    state.items = append ? state.items.concat(data.items) : data.items;
    state.more = data.more;
    const c = data.counts;
    document.querySelectorAll('[data-count]').forEach(b => {
      const k = b.dataset.count;
      const n = k === 'open' ? c.new + c.contacted + c.quoted : c[k];
      b.textContent = n ? n : '';
    });
    document.title = c.new ? `(${c.new}) Quote Inbox | Fence Wizards` : 'Quote Inbox | Fence Wizards';
    renderList();
  } catch (e) { if (e.message !== 'forbidden') toast(e.message, true); }
}

function renderList() {
  const ul = $('#ib-list');
  if (!state.items.length) {
    ul.innerHTML = `<li class="ib-none">${state.q ? 'Nothing matches that search.' : 'Nothing here right now.'}</li>`;
  } else {
    ul.innerHTML = state.items.map(it => {
      const quote = it.type === 'quote';
      const sub = [it.company, it.location].filter(Boolean).join(' · ') || it.message || '';
      const total = it.status === 'won' && it.won_value != null ? `<span class="ib-total">Won ${fmtMoney(it.won_value)}</span>`
        : quote ? (it.priced ? `<span class="ib-total">${fmtMoney(it.total)}</span>` : '<span class="ib-total pending">Needs pricing</span>') : '';
      const what = [fenceName(it.fence), it.feet ? `${Math.round(it.feet).toLocaleString()} ft` : '', it.months ? `${it.months} mo` : ''].filter(Boolean).join(' · ');
      return `<li><a href="#${esc(it.id)}" class="st-${esc(it.status)}"${state.current === it.id ? ' aria-current="true"' : ''}>
        <span class="ib-name">${esc(it.name)}</span><span class="ib-when">${ago(it.created_at)}</span>
        <span class="ib-sub">${esc(sub)}</span>
        <span class="ib-meta"><span class="pill type-${it.type}">${quote ? 'Estimate' : 'Message'}</span><span class="st st-c-${esc(it.status)}">${esc(it.status)}</span>${what ? `<span>${esc(what)}</span>` : ''}${sourceLabel(it.source).kind === 'ads' ? '<span class="pill src-ads">Google Ads</span>' : ''}${it.note_count ? `<span>💬 ${it.note_count}</span>` : ''}${total}</span>
      </a></li>`;
    }).join('');
  }
  $('#ib-more').hidden = !state.more;
}

/* ---------- detail ---------- */
let map;
async function openItem(id) {
  state.current = id;
  $('#ib-shell').classList.add('show-detail');
  document.querySelectorAll('.ib-list a').forEach(a => a.setAttribute('aria-current', String(a.getAttribute('href') === `#${id}`)));
  $('#ib-detail').innerHTML = '<div class="ib-empty"><p>Loading…</p></div>';
  try {
    const it = await api(`items/${encodeURIComponent(id)}`);
    renderDetail(it);
  } catch (e) {
    if (e.message !== 'forbidden') $('#ib-detail').innerHTML = `<div class="ib-empty"><p>${esc(e.message)}</p></div>`;
  }
}

function renderDetail(it) {
  const quote = it.type === 'quote';
  const tel = digits(it.phone);
  const address = quote ? it.address : it.location;
  const mapsHref = quote && it.site_lat != null
    ? `https://www.google.com/maps/search/?api=1&query=${it.site_lat},${it.site_lng}`
    : address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}` : '';
  const subject = encodeURIComponent(`Your Fence Wizards ${quote ? 'quote' : 'request'} ${it.id}`);

  const head = `<div class="ib-head">
    <button class="ib-back" type="button" id="ib-back">‹ All requests</button>
    <div>
      <h1>${esc(it.name)}</h1>
      ${it.company ? `<div class="ib-company">${esc(it.company)}</div>` : ''}
    </div>
    <div class="ib-idline"><code>${esc(it.id)}</code><span class="pill type-${it.type}">${quote ? 'Map estimate' : it.kind === 'contact' ? 'Contact form' : 'Quick quote form'}</span><span>Received ${when(it.created_at)}</span>${it.contact_pref ? `<span>Prefers: <strong>${esc(PREF[it.contact_pref] || it.contact_pref)}</strong></span>` : ''}</div>
    <div class="ib-status" role="group" aria-label="Status">${STATUSES.map(s => `<button type="button" data-set-status="${s}" class="st-c-${s}" aria-pressed="${it.status === s}">${s}</button>`).join('')}</div>
    <div class="ib-actions">
      <a href="${tel ? `tel:${esc(tel)}` : '#'}"${tel ? '' : ' aria-disabled="true"'}>${icon.call}Call</a>
      <a href="${tel ? `sms:${esc(tel)}` : '#'}"${tel ? '' : ' aria-disabled="true"'}>${icon.text}Text</a>
      <a href="${it.email ? `mailto:${esc(it.email)}?subject=${subject}` : '#'}"${it.email ? '' : ' aria-disabled="true"'}>${icon.email}Email</a>
      <a href="${esc(mapsHref) || '#'}"${mapsHref ? ' target="_blank" rel="noopener"' : ' aria-disabled="true"'}>${icon.map}Map</a>
    </div>
  </div>`;

  const contact = `<div class="ib-card"><h2>Contact</h2><dl class="ib-dl">
    ${it.phone ? `<div><dt>Phone</dt><dd><a href="tel:${esc(tel)}">${esc(it.phone)}</a></dd></div>` : ''}
    ${it.email ? `<div><dt>Email</dt><dd><a href="mailto:${esc(it.email)}">${esc(it.email)}</a></dd></div>` : ''}
    ${address ? `<div><dt>${quote ? 'Project address' : 'Location'}</dt><dd>${esc(address)}</dd></div>` : ''}
  </dl></div>`;

  const src = sourceLabel(it.source);
  const s = it.source || {};
  const found = `<div class="ib-card"><h2>How they found us</h2><dl class="ib-dl">
    <div><dt>Source</dt><dd>${src.kind === 'ads' ? '<span class="pill src-ads">Google Ads</span>' : esc(src.label)}${src.detail && src.kind !== 'ads' ? `<small class="ib-src-detail">${esc(src.detail)}</small>` : ''}</dd></div>
    ${src.kind === 'ads' && src.detail ? `<div><dt>Campaign / keyword</dt><dd>${esc(src.detail)}</dd></div>` : ''}
    <div><dt>They said</dt><dd>${it.heard_about ? esc(it.heard_about) : '<span class="ib-muted">Didn’t answer</span>'}</dd></div>
    ${s.landing ? `<div><dt>First page they saw</dt><dd><a href="${esc(s.landing)}" target="_blank" rel="noopener">${esc(s.landing)}</a>${s.first_seen ? ` · ${esc(new Date(s.first_seen).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))}` : ''}</dd></div>` : ''}
  </dl></div>`;

  const won = it.status === 'won' ? `<div class="ib-card ib-won"><h2>Won job</h2>
    <p class="ib-won-amount"><strong>${it.won_value != null ? fmtMoney(it.won_value) : 'No amount yet'}</strong> <button type="button" id="ib-won-edit">${it.won_value != null ? 'Change' : 'Add amount'}</button></p>
    <p class="ib-muted">${src.kind === 'ads' && s.gclid ? 'From a Google ad: this job and its amount go in the next “Download for Google Ads” file, so Google learns which searches bring paying work.' : 'Not from a Google ad click, so it won’t be in the Google Ads file.'}</p>
  </div>` : '';

  const emailWarn = it.email_status === 'failed'
    ? `<div class="ib-warn"><strong>The notification email for this request failed to send</strong>, so it may only be here. (${esc(it.email_error || '')})</div>` : '';

  let body = '';
  if (quote) {
    const o = it.options || {};
    const est = it.estimate || { lines: [], reviews: [], assumptions: [] };
    const extras = [
      o.topRail && 'Top rail', o.postsEveryOther && 'Posts every other panel',
      o.windscreen === 'plain' && `Windscreen${o.fenceType === 'panels' ? ` (${BALLAST[o.ballast] || o.ballast})` : ''}`,
      o.extraSandbags && `${o.extraSandbags} extra sand bags`, o.asphaltPosts && `${o.asphaltPosts} posts through asphalt`,
      o.chainLocks && `${o.chainLocks} chain & lock`, o.gateWheels && `${o.gateWheels} gate wheels`, o.xlGates && `${o.xlGates} XL double gate`,
      o.brandedScreens && `${o.brandedScreens} branded windscreens`, o.damageWaiver && 'Damage waiver requested',
    ].filter(Boolean);
    const gates = o.gates ? `${o.gates.single || 0} single, ${o.gates.double || 0} double` : '';
    body = `
    <div class="ib-card"><div class="ib-stats">
      <div class="ib-stat big"><span>Preliminary estimate (customer saw this)</span><strong>${it.priced ? fmtMoney(it.estimate_total) : 'Needs pricing'}</strong></div>
      <div class="ib-stat"><span>Footage</span><strong>${Math.round(it.feet).toLocaleString()} ft</strong></div>
      <div class="ib-stat"><span>Fence</span><strong>${esc(fenceName(it.fence_type))}${o.height === 8 ? ' · 8 ft' : ''}</strong></div>
      <div class="ib-stat"><span>Rental</span><strong>${it.months} mo</strong></div>
      <div class="ib-stat"><span>Install by</span><strong>${it.start_date ? esc(new Date(`${it.start_date}T12:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })) : '—'}</strong></div>
      <div class="ib-stat"><span>From Indy</span><strong>${it.distance_miles != null ? `${Math.round(it.distance_miles)} mi` : '—'}</strong></div>
      <div class="ib-stat"><span>Project</span><strong>${esc(PROJECT[it.project_type] || '—')}</strong></div>
    </div></div>
    ${it.plan && !it.plan.manual && it.plan.runs?.length ? `<div class="ib-card"><h2>Their fence plan</h2><div class="ib-map" id="ib-map"></div>
      <div class="ib-map-links">${mapsHref ? `<a href="${esc(mapsHref)}" target="_blank" rel="noopener">Open in Google Maps</a>` : ''}<a href="#" id="ib-geojson">Download plan (GeoJSON)</a></div></div>`
      : `<div class="ib-card"><h2>Fence plan</h2><p>Footage entered by hand: <strong>${Math.round(it.feet).toLocaleString()} ft</strong>${gates ? `, gates: ${esc(gates)}` : ''}.</p></div>`}
    ${it.customer_notes ? `<div class="ib-card"><h2>Customer notes</h2><p class="ib-quote">${esc(it.customer_notes)}</p></div>` : ''}
    <div class="ib-grid2">
      <div class="ib-card"><h2>Estimate breakdown</h2><table class="ib-lines"><tbody>
        ${(est.lines || []).map(l => `<tr><td>${esc(l.label)}<small>${l.unit === 'ft' ? `${Number(l.qty).toLocaleString()} ft × $${Number(l.rate).toFixed(2)}` : l.unit ? `${l.qty} × ${fmtMoney(l.rate)}` : ''}</small></td><td>${l.amount ? fmtMoney(l.amount) : 'Included'}</td></tr>`).join('')}
        ${it.priced ? `<tr class="total"><td>Total (pre-tax)</td><td>${fmtMoney(it.estimate_total)}</td></tr>` : ''}
      </tbody></table>
      ${[...(est.reviews || []), ...(est.assumptions || [])].length ? `<ul class="ib-flags">${[...(est.reviews || []), ...(est.assumptions || [])].map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
      <p style="font-size:.76rem;color:var(--muted);margin:10px 0 0">Price sheet ${esc(it.price_sheet_version)}</p></div>
      <div class="ib-card"><h2>Options</h2><dl class="ib-dl">
        <div><dt>Gates</dt><dd>${esc(gates || 'None')}</dd></div>
        <div><dt>Add-ons</dt><dd>${extras.length ? extras.map(esc).join('<br>') : 'None'}</dd></div>
        <div><dt>Far-zone answer</dt><dd>${it.distance_miles != null ? 'Located on map' : esc(o.farZone || '—')}</dd></div>
      </dl></div>
    </div>`;
  } else {
    body = `
    <div class="ib-card"><h2>${it.kind === 'contact' ? 'Message' : 'Quick quote request'}</h2>
      <dl class="ib-dl">
        ${it.fence_style ? `<div><dt>Fence style</dt><dd>${esc(it.fence_style)}</dd></div>` : ''}
        ${it.feet ? `<div><dt>Linear feet</dt><dd>${Math.round(it.feet).toLocaleString()} ft</dd></div>` : ''}
        ${it.duration ? `<div><dt>How long</dt><dd>${esc(it.duration)}</dd></div>` : ''}
        ${it.page ? `<div><dt>Sent from</dt><dd>${/^\/[\w\-/]*$/.test(it.page) ? `<a href="${esc(it.page)}" target="_blank" rel="noopener">${esc(it.page)}</a>` : esc(it.page)}</dd></div>` : ''}
      </dl>
      ${it.message ? `<p class="ib-quote" style="margin-top:12px">${esc(it.message)}</p>` : ''}
      ${it.files?.length ? `<p style="margin:12px 0 0"><strong>Attached files:</strong> ${it.files.map(esc).join(', ')}<br><small style="color:var(--muted)">Files are attached to the notification email, not stored here.</small></p>` : ''}
    </div>`;
  }

  const notes = `<div class="ib-card"><h2>Notes</h2>
    <ul class="ib-notes">${(it.notes || []).map(n => `<li><div class="who"><strong>${esc(n.author)}</strong> · ${when(n.created_at)}</div><p>${esc(n.body)}</p></li>`).join('') || '<li style="background:none;padding:0;color:var(--muted)">No notes yet. Log calls, quotes given and next steps here.</li>'}</ul>
    <form class="ib-note-form" id="ib-note-form"><textarea name="body" placeholder="Called, left voicemail… / Quoted $X verbally… / Install Tue 7am…" maxlength="5000" required></textarea><button type="submit">Add note</button></form>
  </div>`;

  const history = `<div class="ib-card"><h2>History</h2><ul class="ib-history">
    <li><strong>Received</strong> · ${when(it.created_at)}${it.email_status ? ` · notification email ${esc(it.email_status)}` : ''}</li>
    ${(it.events || []).map(e => `<li><strong>${esc(e.actor)}</strong> ${e.action === 'value' ? `set ${esc(e.detail || '')}` : `changed status ${esc(e.detail || '')}`} · ${when(e.created_at)}</li>`).join('')}
  </ul></div>`;

  $('#ib-detail').innerHTML = `<div class="ib-card-wrap">${head}${emailWarn}${won}${contact}${body}${found}${notes}${history}</div>`;
  $('#ib-detail').scrollTop = 0;

  $('#ib-back').addEventListener('click', () => { history_back(); });
  document.querySelectorAll('[data-set-status]').forEach(b => b.addEventListener('click', () => changeStatus(it, b.dataset.setStatus)));
  $('#ib-note-form').addEventListener('submit', e => addNote(e, it));
  $('#ib-won-edit')?.addEventListener('click', () => editWonValue(it));
  if (quote && it.plan && !it.plan.manual && it.plan.runs?.length) drawPlan(it);
}

function history_back() {
  state.current = null;
  $('#ib-shell').classList.remove('show-detail');
  if (location.hash) history.pushState('', '', location.pathname + location.search);
}

function drawPlan(it) {
  if (map) { map.remove(); map = null; }
  map = L.map('ib-map', { maxZoom: mapConfig.maxZoom, scrollWheelZoom: false });
  L.layerGroup(mapConfig.satellite.map(l => L.tileLayer(l.url, l.options))).addTo(map);
  const bounds = [];
  it.plan.runs.forEach(run => {
    if (run.points.length < 2) return;
    const ll = run.closed ? [...run.points, run.points[0]] : run.points;
    L.polyline(ll, { color: '#161314', weight: 8, opacity: .55 }).addTo(map);
    L.polyline(ll, { color: '#ED1C24', weight: 4 }).addTo(map);
    bounds.push(...run.points);
  });
  (it.plan.gates || []).forEach(g => {
    const run = it.plan.runs[g.run];
    if (!run) return;
    const pts = run.closed ? [...run.points, run.points[0]] : run.points;
    const a = pts[g.seg], b = pts[g.seg + 1];
    if (!a || !b) return;
    const p = [a[0] + (b[0] - a[0]) * g.t, a[1] + (b[1] - a[1]) * g.t];
    L.circleMarker(p, { radius: g.type === 'double' ? 8 : 6, color: '#fff', weight: 2, fillColor: '#231F20', fillOpacity: 1 }).bindTooltip(`${g.type === 'double' ? 'Double' : 'Single'} gate`).addTo(map);
  });
  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 19 });
  $('#ib-geojson').addEventListener('click', e => {
    e.preventDefault();
    const fc = { type: 'FeatureCollection', features: it.plan.runs.filter(r => r.points.length > 1).map((r, i) => ({ type: 'Feature', properties: { name: `Line ${i + 1}` }, geometry: { type: 'LineString', coordinates: (r.closed ? [...r.points, r.points[0]] : r.points).map(([la, ln]) => [ln, la]) } })) };
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(fc)], { type: 'application/geo+json' }));
    a.download = `fence-plan-${it.id}.geojson`; a.click();
  });
}

// Ask for the job amount (Google Ads learns from it). null = cancelled.
function askWonValue(it) {
  const suggestion = it.won_value ?? (it.type === 'quote' && it.priced ? Math.round(it.estimate_total) : '');
  return window.prompt('What is the job worth? Enter the amount in dollars, like 2500.\nThis tells Google Ads which ads bring paying work. You can change it later, or leave it blank.', suggestion);
}

async function editWonValue(it) {
  const v = askWonValue(it);
  if (v === null) return;
  try {
    await api(`items/${encodeURIComponent(it.id)}`, { method: 'PATCH', body: JSON.stringify({ wonValue: v.trim() }) });
    toast(v.trim() ? 'Job amount saved' : 'Job amount cleared');
    await Promise.all([openItem(it.id), loadList()]);
  } catch (e) { if (e.message !== 'forbidden') toast(e.message, true); }
}

async function changeStatus(it, status) {
  if (it.status === status) return;
  const body = { status };
  if (status === 'won') {
    const v = askWonValue(it);
    if (v === null) return; // cancelled: leave the status alone
    body.wonValue = v.trim();
  }
  try {
    await api(`items/${encodeURIComponent(it.id)}`, { method: 'PATCH', body: JSON.stringify(body) });
    toast(`Marked ${status}`);
    await Promise.all([openItem(it.id), loadList()]);
  } catch (e) { if (e.message !== 'forbidden') toast(e.message, true); }
}

async function addNote(e, it) {
  e.preventDefault();
  const form = e.currentTarget;
  const body = form.body.value.trim();
  if (!body) return;
  form.querySelector('button').disabled = true;
  try {
    await api(`items/${encodeURIComponent(it.id)}/notes`, { method: 'POST', body: JSON.stringify({ body }) });
    toast('Note added');
    await Promise.all([openItem(it.id), loadList()]);
  } catch (err) {
    if (err.message !== 'forbidden') toast(err.message, true);
    form.querySelector('button').disabled = false;
  }
}

/* ---------- wiring ---------- */
document.querySelectorAll('#ib-tabs button').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('#ib-tabs button').forEach(x => x.setAttribute('aria-selected', String(x === b)));
  state.status = b.dataset.status;
  $('#ib-export').hidden = state.status !== 'won';
  loadList();
}));
let qTimer;
$('#ib-q').addEventListener('input', e => { clearTimeout(qTimer); qTimer = setTimeout(() => { state.q = e.target.value.trim(); loadList(); }, 250); });
$('#ib-type').addEventListener('change', e => { state.type = e.target.value; loadList(); });
$('#ib-more').addEventListener('click', () => loadList({ append: true }));

// Won jobs from Google ad clicks (last 90 days) as Google Ads' upload file
$('#ib-export').addEventListener('click', async () => {
  try {
    const res = await fetch('/api/staff/export/google-ads?days=90', { credentials: 'same-origin' });
    if (res.status === 403) { toast('Your sign-in expired. Reload the page to sign in again.', true); return; }
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const n = Number(res.headers.get('X-Jobs')), missing = Number(res.headers.get('X-Missing-Value'));
    if (!n) { toast('No won jobs from Google ads in the last 90 days yet.'); return; }
    const a = document.createElement('a');
    a.href = URL.createObjectURL(await res.blob());
    a.download = (res.headers.get('Content-Disposition') || '').match(/filename="([^"]+)"/)?.[1] || 'won-jobs-for-google-ads.csv';
    a.click();
    toast(`${n} won job${n > 1 ? 's' : ''} from Google ads in the file${missing ? ` (${missing} without an amount)` : ''}.`);
  } catch (e) { toast(e.message, true); }
});
window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id) openItem(id); else history_back(); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) loadList(); }); // fresh list when Richard comes back to the tab
setInterval(() => { if (!document.hidden) loadList(); }, 60000);

(async () => {
  try {
    state.me = await api('me');
    $('#ib-user').textContent = `${state.me.name}${state.me.role === 'owner' ? ' · owner' : ''}`;
  } catch { /* handled in api() */ }
  await loadList();
  if (location.hash.length > 1) openItem(location.hash.slice(1));
})();
