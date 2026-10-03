import { computeEstimate, baseRate, milesFromIndy, fmtMoney, FENCE_TYPES, INDY, RATES } from '/js/pricing.js';
import { mapConfig, geocoder } from '/estimate/map-providers.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const M_TO_FT = 3.28084;
const DRAFT_KEY = 'fw-estimate-draft-v1';
const MAX_POINTS = 200;

/* =========================================================
   STATE
   ========================================================= */
let plan = { runs: [], gates: [] };   // runs: [{ points: [[lat,lng]...], closed, overrides: {segIdx: ft} }]
let tool = null;                      // null | 'draw' | 'gate-single' | 'gate-double'
let activeRun = null;                 // index of the run currently being drawn
let site = null;                      // { lat, lng, label } from address search
const history = [];

const snapshot = () => JSON.stringify(plan);
function pushHistory() { history.push(snapshot()); if (history.length > 100) history.shift(); }

/* =========================================================
   MAP
   ========================================================= */
const map = L.map('map', { zoomControl: false, maxZoom: mapConfig.maxZoom, doubleClickZoom: false })
  .setView([INDY.lat, INDY.lng], 10);
L.control.zoom({ position: 'topright' }).addTo(map);
L.control.scale({ imperial: true, metric: false, position: 'bottomright' }).addTo(map);

const baseLayers = {
  satellite: L.layerGroup(mapConfig.satellite.map(l => L.tileLayer(l.url, l.options))),
  streets: L.layerGroup(mapConfig.streets.map(l => L.tileLayer(l.url, l.options))),
};
baseLayers.satellite.addTo(map);

// Faint 80-mile service radius when zoomed out
const serviceRing = L.circle([INDY.lat, INDY.lng], {
  radius: 80 * 1609.34, color: '#ED1C24', weight: 2, dashArray: '6 8', fillColor: '#ED1C24', fillOpacity: 0.06, interactive: false,
}).addTo(map);
map.on('zoomend', () => {
  const show = map.getZoom() < 12;
  if (show && !map.hasLayer(serviceRing)) serviceRing.addTo(map);
  if (!show && map.hasLayer(serviceRing)) serviceRing.remove();
});

const drawLayer = L.layerGroup().addTo(map);
map.createPane('gates').style.zIndex = 660; // above the length labels (tooltip pane is 650)
const ghost = L.polyline([], { color: '#fff', weight: 2, dashArray: '6 6', interactive: false }).addTo(map);
let siteMarker = null;

/* ---------- geometry ---------- */
const segFeet = (a, b) => map.distance(a, b) * M_TO_FT;
function segmentsOf(run) {
  const pts = run.points;
  const segs = [];
  for (let i = 0; i < pts.length - 1; i++) segs.push([pts[i], pts[i + 1]]);
  if (run.closed && pts.length > 2) segs.push([pts[pts.length - 1], pts[0]]);
  return segs;
}
// Each side is rounded to 0.1 ft before summing — must match server/quote.js so both totals agree
const round1 = n => Math.round(n * 10) / 10;
function runFeet(run) {
  return segmentsOf(run).reduce((sum, [a, b], i) => sum + (run.overrides?.[i] ?? round1(segFeet(a, b))), 0);
}
const totalFeet = () => Math.round(plan.runs.reduce((s, r) => s + runFeet(r), 0) * 10) / 10;
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

function gateLatLng(g) {
  const run = plan.runs[g.run];
  const seg = run && segmentsOf(run)[g.seg];
  return seg ? lerp(seg[0], seg[1], g.t) : null;
}

// Closest point on any fence segment to a clicked latlng (in screen space)
function nearestOnFence(latlng, maxPx = 24) {
  const p = map.latLngToLayerPoint(latlng);
  let best = null;
  plan.runs.forEach((run, ri) => segmentsOf(run).forEach(([a, b], si) => {
    const A = map.latLngToLayerPoint(a), B = map.latLngToLayerPoint(b);
    const dx = B.x - A.x, dy = B.y - A.y, len2 = dx * dx + dy * dy || 1;
    const t = Math.max(0, Math.min(1, ((p.x - A.x) * dx + (p.y - A.y) * dy) / len2));
    const d = Math.hypot(A.x + t * dx - p.x, A.y + t * dy - p.y);
    if (d <= maxPx && (!best || d < best.d)) best = { run: ri, seg: si, t, d };
  }));
  return best;
}

/* ---------- rendering ---------- */
const vtxIcon = cls => L.divIcon({ className: `vtx ${cls}`, iconSize: [14, 14] });
const gateIcon = type => L.divIcon({
  className: `gate-mark ${type}`,
  iconSize: type === 'double' ? [38, 30] : [30, 30],
  html: type === 'double'
    ? '<svg viewBox="0 0 24 24" width="22" height="22"><rect x="2" y="6" width="20" height="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 6v12M2 18l10-12M22 18L12 6" stroke="currentColor" stroke-width="1.4"/></svg>'
    : '<svg viewBox="0 0 24 24" width="18" height="18"><rect x="5" y="6" width="14" height="12" fill="none" stroke="currentColor" stroke-width="2"/><path d="M5 18L19 6" stroke="currentColor" stroke-width="1.6"/></svg>',
});

const runLatLngs = run => run.closed ? [...run.points, run.points[0]] : run.points;
const labelText = (run, si, a, b) => `${Math.round(run.overrides?.[si] ?? segFeet(a, b))} ft${run.overrides?.[si] != null ? '*' : ''}`;
let refs = { runs: [], gates: [] };
// Length label sits mid-side unless a gate is there; then it slides away from the gate
function labelPos(ri, si, a, b) {
  const g = plan.gates.find(x => x.run === ri && x.seg === si && Math.abs(x.t - 0.5) < 0.22);
  return lerp(a, b, g ? (g.t >= 0.5 ? 0.2 : 0.8) : 0.5);
}

function render() {
  drawLayer.clearLayers();
  refs = { runs: [], gates: [] };

  plan.runs.forEach((run, ri) => {
    const r = refs.runs[ri] = { casing: null, line: null, labels: [] };
    const latlngs = runLatLngs(run);
    if (latlngs.length > 1) {
      r.casing = L.polyline(latlngs, { color: '#161314', weight: 8, opacity: 0.55, interactive: false }).addTo(drawLayer);
      r.line = L.polyline(latlngs, { color: '#ED1C24', weight: 4, opacity: 1 }).addTo(drawLayer);
      r.line.on('click', e => { L.DomEvent.stop(e); onFenceClick(e.latlng); });
    }
    segmentsOf(run).forEach(([a, b], si) => {
      const ft = run.overrides?.[si] ?? segFeet(a, b);
      if (map.getZoom() < 15 && ft < 40) return; // keep labels readable when zoomed out
      r.labels[si] = L.tooltip({ permanent: true, direction: 'center', className: 'seg-label', interactive: false })
        .setLatLng(labelPos(ri, si, a, b))
        .setContent(labelText(run, si, a, b))
        .addTo(drawLayer);
    });
    run.points.forEach((pt, pi) => {
      const isActive = ri === activeRun;
      const cls = [pi === 0 ? 'first' : '', isActive ? 'open' : ''].join(' ');
      const m = L.marker(pt, { icon: vtxIcon(cls), draggable: true, keyboard: false, zIndexOffset: 1000 }).addTo(drawLayer);
      m.on('dragstart', () => pushHistory());
      m.on('drag', e => {
        const ll = e.target.getLatLng();
        run.points[pi] = [ll.lat, ll.lng];
        clearAdjacentOverrides(run, pi);
        dragUpdate(ri);
      });
      m.on('dragend', () => { render(); changed(); });
      m.on('click', e => { L.DomEvent.stop(e); onVertexClick(ri, pi, m); });
    });
  });

  plan.gates.forEach((g, gi) => {
    const ll = gateLatLng(g);
    if (!ll) return;
    const m = L.marker(ll, { icon: gateIcon(g.type), keyboard: false, pane: 'gates' }).addTo(drawLayer);
    refs.gates.push({ m, g });
    m.bindPopup(() => {
      const div = L.DomUtil.create('div');
      div.innerHTML = `<strong>${g.type === 'double' ? 'Double' : 'Single'} gate</strong>`;
      const btn = L.DomUtil.create('button', 'popup-btn', div);
      btn.type = 'button'; btn.textContent = 'Remove gate';
      btn.onclick = () => { pushHistory(); plan.gates.splice(gi, 1); map.closePopup(); render(); changed(); };
      return div;
    });
  });

  updateGhost();
}

// Live update while a corner is dragged (without rebuilding the marker being dragged)
function dragUpdate(ri) {
  const run = plan.runs[ri], r = refs.runs[ri];
  if (!run || !r) return;
  const latlngs = runLatLngs(run);
  r.casing?.setLatLngs(latlngs);
  r.line?.setLatLngs(latlngs);
  segmentsOf(run).forEach(([a, b], si) => r.labels[si]?.setLatLng(labelPos(ri, si, a, b)).setContent(labelText(run, si, a, b)));
  refs.gates.forEach(({ m, g }) => { if (g.run === ri) { const ll = gateLatLng(g); if (ll) m.setLatLng(ll); } });
  updateFootage();
}

function clearAdjacentOverrides(run, pi) {
  if (!run.overrides) return;
  const n = segmentsOf(run).length;
  delete run.overrides[pi];
  delete run.overrides[(pi - 1 + n) % n];
}

/* ---------- interactions ---------- */
function onMapClick(e) {
  if (tool === 'draw') {
    if (totalPoints() >= MAX_POINTS) return hint(`Plans are limited to ${MAX_POINTS} corners. Use the notes for anything larger.`);
    pushHistory();
    const pt = [e.latlng.lat, e.latlng.lng];
    if (activeRun === null) {
      plan.runs.push({ points: [pt], closed: false, overrides: {} });
      activeRun = plan.runs.length - 1;
    } else {
      plan.runs[activeRun].points.push(pt);
    }
    render(); changed();
    const n = plan.runs[activeRun].points.length;
    hint(n === 1 ? 'Now click the next corner.' : n < 3 ? 'Keep clicking corners. Click the last point (or press Enter) to finish.' : 'Click the first corner to close the loop, or the last point to finish.');
  } else if (tool && tool.startsWith('gate')) {
    onFenceClick(e.latlng);
  }
}

function onFenceClick(latlng) {
  if (!tool || !tool.startsWith('gate')) return;
  const hit = nearestOnFence(latlng);
  if (!hit) return hint('Click directly on a fence line to place the gate.');
  pushHistory();
  plan.gates.push({ type: tool === 'gate-double' ? 'double' : 'single', run: hit.run, seg: hit.seg, t: Math.round(hit.t * 1000) / 1000 });
  render(); changed();
}

function onVertexClick(ri, pi, marker) {
  const run = plan.runs[ri];
  if (tool === 'draw' && ri === activeRun) {
    if (pi === run.points.length - 1) return finishRun();
    if (pi === 0 && run.points.length > 2) { pushHistory(); run.closed = true; return finishRun(); }
  }
  marker.bindPopup(() => {
    const div = L.DomUtil.create('div');
    div.innerHTML = '<strong>Fence corner</strong>';
    const btn = L.DomUtil.create('button', 'popup-btn', div);
    btn.type = 'button'; btn.textContent = 'Delete corner';
    btn.onclick = () => { map.closePopup(); deleteVertex(ri, pi); };
    return div;
  }).openPopup();
}

function deleteVertex(ri, pi) {
  pushHistory();
  const run = plan.runs[ri];
  run.points.splice(pi, 1);
  run.overrides = {};
  if (run.points.length < 3) run.closed = false;
  if (run.points.length === 0) {
    plan.runs.splice(ri, 1);
    if (activeRun === ri) activeRun = null; else if (activeRun > ri) activeRun--;
  }
  fixGates();
  render(); changed();
}

// Drop gates whose segment no longer exists; re-index gates on later runs
function fixGates() {
  plan.gates = plan.gates.filter(g => {
    const run = plan.runs[g.run];
    return run && g.seg < segmentsOf(run).length;
  });
}

function finishRun() {
  if (activeRun !== null) {
    const run = plan.runs[activeRun];
    if (run && run.points.length < 2) { plan.runs.splice(activeRun, 1); fixGates(); }
  }
  activeRun = null;
  render(); changed();
  if (tool === 'draw') hint('Line finished. Add gates with the gate tools, or click the map to start another line.');
}

const totalPoints = () => plan.runs.reduce((s, r) => s + r.points.length, 0);

map.on('click', onMapClick);
map.on('mousemove', e => { lastMouse = e.latlng; updateGhost(); });
map.on('mouseout', () => { lastMouse = null; updateGhost(); });
let lastMouse = null;
function updateGhost() {
  const run = activeRun !== null && plan.runs[activeRun];
  if (tool === 'draw' && run && lastMouse) {
    const last = run.points[run.points.length - 1];
    ghost.setLatLngs([last, lastMouse]);
  } else ghost.setLatLngs([]);
}
map.on('zoomend', render);

document.addEventListener('keydown', e => {
  if (e.target.closest('input, textarea, select')) return;
  if (e.key === 'Enter' && activeRun !== null) { e.preventDefault(); finishRun(); }
  if (e.key === 'Escape') { if (activeRun !== null) finishRun(); else setTool(null); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); undo(); }
});

/* ---------- toolbar ---------- */
function setTool(next) {
  if (tool === 'draw' && next !== 'draw' && activeRun !== null) finishRun();
  tool = tool === next ? null : next;
  $$('.tool[data-tool]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool === tool)));
  $('#map').classList.toggle('drawing', !!tool);
  if (tool === 'draw') hint(activeRun === null ? 'Click the map to place the first corner of your fence.' : 'Keep clicking corners. Click the last point or press Enter to finish.');
  else if (tool?.startsWith('gate')) hint(plan.runs.length ? 'Click on a fence line to place the gate.' : 'Draw your fence first, then add gates to it.');
  else hint(defaultHint());
  updateGhost();
}
$$('.tool[data-tool]').forEach(b => b.addEventListener('click', () => setTool(b.dataset.tool)));
$('#new-run-btn').addEventListener('click', () => {
  if (activeRun !== null) finishRun();
  if (tool !== 'draw') setTool('draw');
  hint('Click the map to start a separate fence line.');
});
$('#undo-btn').addEventListener('click', undo);
$('#clear-btn').addEventListener('click', () => {
  if (!plan.runs.length) return;
  if (!confirm('Clear the whole fence plan?')) return;
  pushHistory();
  plan = { runs: [], gates: [] };
  activeRun = null;
  render(); changed();
});
function undo() {
  if (!history.length) return;
  plan = JSON.parse(history.pop());
  if (activeRun !== null && !plan.runs[activeRun]) activeRun = null;
  render(); changed();
}

let hintTimer;
function hint(msg) {
  const el = $('#map-hint');
  el.textContent = msg || '';
  clearTimeout(hintTimer);
}
function defaultHint() {
  if (!plan.runs.length) return site ? 'Choose “Draw fence” and click the map to trace your fence line.' : 'Search for your project address to get started.';
  return '';
}

/* ---------- map style toggle ---------- */
$$('.map-layer-toggle button').forEach(b => b.addEventListener('click', () => {
  Object.entries(baseLayers).forEach(([k, layer]) => {
    if (k === b.dataset.layer) layer.addTo(map); else layer.remove();
  });
  $$('.map-layer-toggle button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
}));

/* =========================================================
   ADDRESS SEARCH
   ========================================================= */
const searchForm = $('#search-form');
const resultsEl = $('#search-results');
searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  const q = $('#search-input').value.trim();
  if (q.length < 3) return;
  resultsEl.hidden = false;
  resultsEl.innerHTML = '<li class="muted">Searching&hellip;</li>';
  try {
    const results = await geocoder.search(q);
    if (!results.length) { resultsEl.innerHTML = '<li class="muted">No matches. Try adding the city, or zoom the map there yourself.</li>'; return; }
    resultsEl.innerHTML = '';
    results.forEach(r => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button'; btn.textContent = r.label;
      btn.addEventListener('click', () => chooseSite(r));
      li.append(btn); resultsEl.append(li);
    });
    if (results.length === 1) chooseSite(results[0]);
  } catch {
    resultsEl.innerHTML = '<li class="muted">Address search is unavailable right now. Pan and zoom the map to your site instead.</li>';
  }
});
document.addEventListener('click', e => { if (!e.target.closest('#search-form')) resultsEl.hidden = true; });

function chooseSite(r) {
  site = { lat: r.lat, lng: r.lng, label: r.label };
  resultsEl.hidden = true;
  $('#search-input').value = r.label;
  map.flyTo([r.lat, r.lng], 19, { duration: 1.2 });
  if (siteMarker) siteMarker.remove();
  siteMarker = L.circleMarker([r.lat, r.lng], { radius: 7, color: '#fff', weight: 2, fillColor: '#ED1C24', fillOpacity: 1, interactive: false }).addTo(map);
  const addr = $('#c-address');
  if (!addr.value || addr.dataset.auto === '1') { addr.value = r.label; addr.dataset.auto = '1'; }
  if (!plan.runs.length) setTool('draw');
  changed();
}
$('#c-address').addEventListener('input', e => { e.target.dataset.auto = '0'; });

$('#locate-btn').addEventListener('click', () => {
  if (!navigator.geolocation) return hint('Location isn’t available in this browser.');
  hint('Finding your location…');
  navigator.geolocation.getCurrentPosition(
    pos => chooseSite({ lat: pos.coords.latitude, lng: pos.coords.longitude, label: 'My current location' }),
    () => hint('Couldn’t get your location. Search the address instead.'),
    { enableHighAccuracy: true, timeout: 10000 },
  );
});

/* =========================================================
   FORM + ESTIMATE
   ========================================================= */
const form = $('#quote-form');
const val = id => $(id).value;
const num = id => Number($(id).value) || 0;
const radio = name => form.querySelector(`input[name="${name}"]:checked`)?.value;
const isManual = () => $('#manual-mode').checked;

function sitePoint() {
  const pts = plan.runs.flatMap(r => r.points);
  if (pts.length) return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
  return site ? [site.lat, site.lng] : null;
}

function gateCounts() {
  if (isManual()) return { single: num('#manual-single'), double: num('#manual-double') };
  return {
    single: plan.gates.filter(g => g.type === 'single').length,
    double: plan.gates.filter(g => g.type === 'double').length,
  };
}

function currentFeet() { return isManual() ? num('#manual-feet') : totalFeet(); }

function estimateInput() {
  const sp = sitePoint();
  return {
    fenceType: radio('fenceType'),
    height: Number(radio('height')),
    months: num('#months'),
    feet: currentFeet(),
    runs: isManual() ? 1 : Math.max(plan.runs.length, 1),
    gates: gateCounts(),
    xlGates: num('#xl-gates'),
    topRail: $('#top-rail').checked,
    windscreen: radio('windscreen'),
    ballast: radio('ballast'),
    postsEveryOther: $('#posts-every-other').checked,
    extraSandbags: num('#extra-sandbags'),
    asphaltPosts: num('#asphalt-posts'),
    chainLocks: num('#chain-locks'),
    gateWheels: num('#gate-wheels'),
    brandedScreens: num('#branded-screens'),
    damageWaiver: $('#damage-waiver').checked,
    distanceMiles: sp ? Math.round(milesFromIndy(sp[0], sp[1]) * 10) / 10 : null,
    farZone: radio('farZone'),
  };
}

function updateFootage() {
  const ft = currentFeet();
  $('#feet-total').textContent = Math.round(ft).toLocaleString();
  const g = gateCounts();
  const runs = isManual() ? 0 : plan.runs.length;
  $('#run-count').textContent = isManual() ? 'Entered manually' : runs ? `${runs} fence line${runs > 1 ? 's' : ''}` : 'No fence drawn yet';
  const gates = g.single + g.double;
  $('#gate-count').textContent = gates ? `${gates} gate${gates > 1 ? 's' : ''} (${g.single} single, ${g.double} double)` : '';
  $('#howto').hidden = runs > 0;
}

function renderSegments() {
  const list = $('#segment-list');
  list.innerHTML = '';
  if (isManual()) return;
  plan.runs.forEach((run, ri) => {
    const segs = segmentsOf(run);
    if (!segs.length) return;
    const card = document.createElement('li');
    card.className = 'run-card';
    card.innerHTML = `<header><span>Line ${ri + 1} · ${Math.round(runFeet(run)).toLocaleString()} ft${run.closed ? ' · closed' : ''}</span><button type="button">Delete line</button></header><ol></ol>`;
    card.querySelector('header button').addEventListener('click', () => {
      pushHistory();
      plan.runs.splice(ri, 1);
      plan.gates = plan.gates.filter(g => g.run !== ri).map(g => ({ ...g, run: g.run > ri ? g.run - 1 : g.run }));
      if (activeRun === ri) activeRun = null; else if (activeRun > ri) activeRun--;
      render(); changed();
    });
    const ol = card.querySelector('ol');
    segs.forEach(([a, b], si) => {
      const measured = Math.round(segFeet(a, b) * 10) / 10;
      const override = run.overrides?.[si];
      const li = document.createElement('li');
      li.innerHTML = `<span>Side ${si + 1} ${override != null ? '<span class="edited">edited</span>' : ''}</span>
        <label><input type="number" min="1" max="100000" step="0.1" inputmode="decimal" value="${override ?? Math.round(measured)}" aria-label="Side ${si + 1} length in feet"> ft</label>`;
      li.querySelector('input').addEventListener('change', e => {
        const v = Number(e.target.value);
        pushHistory();
        if (!v || Math.abs(v - measured) < 0.5) delete run.overrides[si];
        else run.overrides[si] = Math.min(Math.max(v, 1), 100000);
        render(); changed();
      });
      ol.append(li);
    });
    list.append(card);
  });
}

function syncVisibility() {
  const type = radio('fenceType');
  $$('[data-for]').forEach(el => { el.hidden = !el.dataset.for.split(' ').includes(type); });
  $('#ballast-group').hidden = !(type === 'panels' && radio('windscreen') === 'plain');
  $('#manual-fields').hidden = !isManual();
  $('#far-zone-field').hidden = !!sitePoint();

  const months = num('#months');
  const hintEl = $('#term-hint');
  if ((type === 'panels' || type === 'driven') && months >= 1) {
    const rate = baseRate(type, months);
    const tiers = type === 'panels' ? 'Up to 12 mo $5.65 · 13–18 mo $6.85 · 19+ mo $8.20' : 'Up to 18 mo $4.20 · 19–23 mo $5.10 · 24+ mo $6.00';
    hintEl.innerHTML = `<strong>$${rate.toFixed(2)}/ft</strong> for ${months} month${months > 1 ? 's' : ''}. One price covers installation, rent and removal. <br>${tiers}`;
  } else hintEl.textContent = '';
}

function renderSummary() {
  const est = computeEstimate(estimateInput());
  const totalEl = $('#summary-total');
  if (!est.feet) { totalEl.textContent = 'Add your fence'; totalEl.className = 'summary-total pending'; }
  else if (!est.priced) { totalEl.textContent = 'Richard will price it'; totalEl.className = 'summary-total pending'; }
  else { totalEl.textContent = fmtMoney(est.total); totalEl.className = 'summary-total'; }

  const tbody = $('#summary-lines tbody');
  tbody.innerHTML = est.lines.map(l => `
    <tr><td>${l.label}<small>${l.unit === 'ft' ? `${l.qty.toLocaleString()} ft × $${l.rate.toFixed(2)}` : l.unit === 'ea' || l.unit === 'stand' ? `${l.qty} × ${fmtMoney(l.rate)}` : ''}${l.note ? ` · ${l.note}` : ''}</small></td>
    <td>${l.amount ? fmtMoney(l.amount) : 'Included'}</td></tr>`).join('')
    + (est.priced && est.lines.length ? `<tr class="total"><td>Preliminary total</td><td>${fmtMoney(est.total)}</td></tr>` : '');
  $('#summary-reviews').innerHTML = [
    ...est.reviews.map(r => `<li>${r}</li>`),
    ...est.assumptions.map(a => `<li class="note">${a}</li>`),
  ].join('');
  return est;
}

function changed() {
  updateFootage();
  renderSegments();
  syncVisibility();
  renderSummary();
  if (!tool) hint(defaultHint());
  saveDraft();
}

// Segment length inputs commit on 'change' (their own handler); skip them here so typing doesn't rebuild the list
const fromSegments = e => e.target.closest('#segment-list');
form.addEventListener('input', e => { if (!fromSegments(e)) changed(); });
form.addEventListener('change', e => { if (!fromSegments(e)) changed(); });

$('#summary-toggle').addEventListener('click', () => {
  const open = $('#summary').classList.toggle('open');
  $('#summary-toggle').setAttribute('aria-expanded', String(open));
});

/* =========================================================
   STEPS
   ========================================================= */
let step = 1;
function goTo(n) {
  if (n > 1 && currentFeet() <= 0) {
    goToStep(1);
    hint(isManual() ? 'Enter your total footage to continue.' : 'Draw your fence on the map (or type in the footage) to continue.');
    (isManual() ? $('#manual-feet') : $('.tool[data-tool="draw"]')).focus();
    return;
  }
  goToStep(n);
}
function goToStep(n) {
  step = n;
  $$('.step').forEach(s => { s.hidden = Number(s.dataset.step) !== n; });
  $$('.stepper button').forEach(b => {
    const k = Number(b.dataset.goto);
    b.classList.toggle('active', k === n);
    b.classList.toggle('done', k < n);
    if (k === n) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
  });
  const scroller = window.matchMedia('(max-width: 980px)').matches ? null : $('.side-scroll');
  if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
  else $('.side-pane').scrollIntoView({ behavior: 'smooth' });
}
$$('[data-next]').forEach(b => b.addEventListener('click', () => goTo(Number(b.dataset.next))));
$$('.stepper button').forEach(b => b.addEventListener('click', () => goTo(Number(b.dataset.goto))));

/* =========================================================
   DRAFT (survives a refresh)
   ========================================================= */
const FIELD_IDS = ['#months', '#start-date', '#manual-feet', '#manual-single', '#manual-double', '#asphalt-posts', '#extra-sandbags', '#chain-locks', '#gate-wheels', '#xl-gates', '#branded-screens', '#c-name', '#c-company', '#c-phone', '#c-email', '#c-address', '#c-notes'];
const CHECK_IDS = ['#manual-mode', '#top-rail', '#posts-every-other', '#damage-waiver'];
const RADIOS = ['projectType', 'fenceType', 'height', 'windscreen', 'ballast', 'farZone', 'contactPref'];

function saveDraft() {
  try {
    const fields = Object.fromEntries(FIELD_IDS.map(id => [id, val(id)]));
    const checks = Object.fromEntries(CHECK_IDS.map(id => [id, $(id).checked]));
    const radios = Object.fromEntries(RADIOS.map(n => [n, radio(n)]));
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ plan, site, fields, checks, radios, view: [map.getCenter().lat, map.getCenter().lng, map.getZoom()] }));
  } catch { /* storage unavailable */ }
}
function loadDraft() {
  let d;
  try { d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); } catch { d = null; }
  if (!d) return;
  if (d.plan?.runs) plan = d.plan;
  site = d.site || null;
  Object.entries(d.fields || {}).forEach(([id, v]) => { if ($(id) && v != null) $(id).value = v; });
  Object.entries(d.checks || {}).forEach(([id, v]) => { if ($(id)) $(id).checked = !!v; });
  Object.entries(d.radios || {}).forEach(([n, v]) => { const r = form.querySelector(`input[name="${n}"][value="${v}"]`); if (r) r.checked = true; });
  if (site) {
    $('#search-input').value = site.label;
    siteMarker = L.circleMarker([site.lat, site.lng], { radius: 7, color: '#fff', weight: 2, fillColor: '#ED1C24', fillOpacity: 1, interactive: false }).addTo(map);
  }
  if (d.view) map.setView([d.view[0], d.view[1]], d.view[2]);
}
const clearDraft = () => { try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ } };
map.on('moveend', saveDraft);

/* =========================================================
   SUBMIT
   ========================================================= */
form.addEventListener('submit', async e => {
  e.preventDefault();
  const errEl = $('#form-error');
  errEl.hidden = true;

  if (currentFeet() <= 0) { goTo(1); return; }

  const required = ['#c-name', '#c-phone', '#c-email', '#c-address'];
  let firstBad = null;
  required.forEach(id => {
    const el = $(id);
    const bad = !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()));
    el.classList.toggle('invalid', bad);
    if (bad && !firstBad) firstBad = el;
  });
  if (firstBad) {
    errEl.textContent = 'Please fill in your name, phone, a valid email and the project address.';
    errEl.hidden = false; firstBad.focus();
    return;
  }

  const input = estimateInput();
  const est = computeEstimate(input);
  const payload = {
    plan: isManual() ? { manual: true, runs: [], gates: [] } : { manual: false, runs: plan.runs, gates: plan.gates },
    site: site ? { lat: site.lat, lng: site.lng, label: site.label } : null,
    options: { ...input, projectType: radio('projectType'), startDate: val('#start-date') || null },
    contact: {
      name: val('#c-name').trim(), company: val('#c-company').trim(), phone: val('#c-phone').trim(),
      email: val('#c-email').trim(), address: val('#c-address').trim(), notes: val('#c-notes').trim(),
      contactPref: radio('contactPref'), website: val('#c-website'),
    },
    clientTotal: est.priced ? est.total : null,
  };

  const btn = $('#submit-btn');
  btn.disabled = true;
  btn.firstChild.textContent = 'Sending… ';
  try {
    const res = await fetch('/api/quotes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.id) throw new Error(data.error || 'Something went wrong.');
    try {
      sessionStorage.setItem('fw-last-quote', JSON.stringify({
        id: data.id, name: payload.contact.name, phone: payload.contact.phone, email: payload.contact.email, contactPref: payload.contact.contactPref,
        address: payload.contact.address, fenceType: FENCE_TYPES[input.fenceType], months: input.months, feet: Math.round(input.feet),
        total: data.estimate?.priced ? data.estimate.total : null, lines: data.estimate?.lines || est.lines,
      }));
    } catch { /* ignore */ }
    clearDraft();
    location.href = `/quote-confirmation/?id=${encodeURIComponent(data.id)}`;
  } catch (err) {
    errEl.innerHTML = `We couldn’t send your plan (${err.message}). Please try again, or call Richard at <a href="tel:+13172964015">(317) 296-4015</a>.`;
    errEl.hidden = false;
    btn.disabled = false;
    btn.firstChild.textContent = 'Send my plan ';
  }
});

/* =========================================================
   INIT
   ========================================================= */
if (!$('#start-date').value) {
  const d = new Date(Date.now() + 2 * 864e5);
  $('#start-date').min = new Date().toISOString().slice(0, 10);
  $('#start-date').value = d.toISOString().slice(0, 10);
}
loadDraft();
render();
changed();
window.__fwPlanner = { map, get plan() { return plan; }, RATES }; // handy for debugging in the console
