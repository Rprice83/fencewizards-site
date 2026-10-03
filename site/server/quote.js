// Server-side validation and recalculation for quote requests.
// Never trust prices or footage from the browser: everything is rebuilt here from the plan geometry.
import { computeEstimate, milesFromIndy, FENCE_TYPES } from '../public/js/pricing.js';

export class InputError extends Error {}

const EARTH_R = 6371000; // meters, same as Leaflet's map.distance()
const M_TO_FT = 3.28084;

function haversine([lat1, lng1], [lat2, lng2]) {
  const rad = d => d * Math.PI / 180;
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_R * Math.asin(Math.min(1, Math.sqrt(a)));
}

const str = (v, max, { required = false, label = 'field' } = {}) => {
  const s = typeof v === 'string' ? v.trim() : '';
  if (required && !s) throw new InputError(`Missing ${label}.`);
  if (s.length > max) throw new InputError(`${label} is too long.`);
  return s;
};
const intIn = (v, min, max) => {
  const n = Math.floor(Number(v));
  return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : min;
};
const isLat = v => typeof v === 'number' && v >= -90 && v <= 90;
const isLng = v => typeof v === 'number' && v >= -180 && v <= 180;

export function validatePlan(raw) {
  if (!raw || typeof raw !== 'object') throw new InputError('Missing plan.');
  if (raw.manual) return { manual: true, runs: [], gates: [] };

  const runsIn = Array.isArray(raw.runs) ? raw.runs : [];
  if (runsIn.length > 50) throw new InputError('Too many fence lines.');
  let points = 0;
  const runs = runsIn.map(r => {
    const pts = Array.isArray(r?.points) ? r.points : [];
    points += pts.length;
    if (points > 200) throw new InputError('Too many fence corners.');
    const clean = pts.map(p => {
      if (!Array.isArray(p) || !isLat(p[0]) || !isLng(p[1])) throw new InputError('Invalid fence point.');
      return [p[0], p[1]];
    });
    const closed = !!r.closed && clean.length > 2;
    const segCount = Math.max(clean.length - 1, 0) + (closed ? 1 : 0);
    const overrides = {};
    Object.entries(r.overrides || {}).forEach(([k, v]) => {
      const i = Number(k), ft = Number(v);
      if (Number.isInteger(i) && i >= 0 && i < segCount && ft >= 1 && ft <= 100000) overrides[i] = Math.round(ft * 10) / 10;
    });
    return { points: clean, closed, overrides };
  }); // keep single-point runs so gate run indexes still line up (they measure 0 ft)

  const gatesIn = Array.isArray(raw.gates) ? raw.gates.slice(0, 200) : [];
  const gates = gatesIn.filter(g => {
    const run = runs[g?.run];
    if (!run || !['single', 'double'].includes(g.type)) return false;
    const segCount = run.points.length - 1 + (run.closed ? 1 : 0);
    return Number.isInteger(g.seg) && g.seg >= 0 && g.seg < segCount && g.t >= 0 && g.t <= 1;
  }).map(g => ({ type: g.type, run: g.run, seg: g.seg, t: g.t }));

  return { manual: false, runs, gates };
}

export function planSegments(run) {
  const segs = [];
  for (let i = 0; i < run.points.length - 1; i++) segs.push([run.points[i], run.points[i + 1]]);
  if (run.closed) segs.push([run.points[run.points.length - 1], run.points[0]]);
  return segs.map(([a, b], i) => {
    const measured = haversine(a, b) * M_TO_FT;
    return { a, b, measured: Math.round(measured * 10) / 10, feet: run.overrides[i] ?? Math.round(measured * 10) / 10, edited: run.overrides[i] != null };
  });
}

export function buildQuote(body) {
  if (!body || typeof body !== 'object') throw new InputError('Invalid request.');
  const c = body.contact || {};
  const contact = {
    name: str(c.name, 120, { required: true, label: 'name' }),
    company: str(c.company, 160, { label: 'company' }),
    phone: str(c.phone, 40, { required: true, label: 'phone' }),
    email: str(c.email, 200, { required: true, label: 'email' }).toLowerCase(),
    address: str(c.address, 300, { required: true, label: 'project address' }),
    notes: str(c.notes, 3000, { label: 'notes' }),
    contactPref: ['call', 'text', 'email'].includes(c.contactPref) ? c.contactPref : 'call',
  };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) throw new InputError('Please enter a valid email address.');
  if ((contact.phone.match(/\d/g) || []).length < 7) throw new InputError('Please enter a valid phone number.');

  const plan = validatePlan(body.plan);
  const o = body.options || {};

  let feet, runCount, gates;
  if (plan.manual) {
    feet = Math.round(Math.min(Math.max(Number(o.feet) || 0, 0), 100000) * 10) / 10;
    runCount = 1;
    gates = { single: intIn(o.gates?.single, 0, 200), double: intIn(o.gates?.double, 0, 200) };
  } else {
    feet = Math.round(plan.runs.reduce((s, r) => s + planSegments(r).reduce((t, seg) => t + seg.feet, 0), 0) * 10) / 10;
    runCount = Math.max(plan.runs.length, 1);
    gates = {
      single: plan.gates.filter(g => g.type === 'single').length,
      double: plan.gates.filter(g => g.type === 'double').length,
    };
  }
  if (!(feet > 0)) throw new InputError('Add your fence length before sending.');

  // Site location: centroid of the drawing, else the searched address
  const pts = plan.runs.flatMap(r => r.points);
  let site = null;
  if (pts.length) site = { lat: pts.reduce((s, p) => s + p[0], 0) / pts.length, lng: pts.reduce((s, p) => s + p[1], 0) / pts.length };
  else if (body.site && isLat(body.site.lat) && isLng(body.site.lng)) site = { lat: body.site.lat, lng: body.site.lng };
  const distanceMiles = site ? Math.round(milesFromIndy(site.lat, site.lng) * 10) / 10 : null;

  const startDate = /^\d{4}-\d{2}-\d{2}$/.test(o.startDate || '') ? o.startDate : null;
  const options = {
    projectType: ['construction', 'event', 'emergency', 'other'].includes(o.projectType) ? o.projectType : 'other',
    fenceType: FENCE_TYPES[o.fenceType] ? o.fenceType : 'unsure',
    height: Number(o.height) === 8 ? 8 : 6,
    months: intIn(o.months, 1, 60),
    startDate,
    windscreen: o.windscreen === 'plain' ? 'plain' : 'none',
    ballast: ['standard', 'plus2', 'plus3'].includes(o.ballast) ? o.ballast : 'standard',
    topRail: !!o.topRail,
    postsEveryOther: !!o.postsEveryOther,
    damageWaiver: !!o.damageWaiver,
    xlGates: intIn(o.xlGates, 0, 50),
    extraSandbags: intIn(o.extraSandbags, 0, 10000),
    asphaltPosts: intIn(o.asphaltPosts, 0, 10000),
    chainLocks: intIn(o.chainLocks, 0, 500),
    gateWheels: intIn(o.gateWheels, 0, 500),
    brandedScreens: intIn(o.brandedScreens, 0, 500),
    farZone: ['yes', 'no', 'unsure'].includes(o.farZone) ? o.farZone : 'unsure',
  };

  const estimate = computeEstimate({ ...options, feet, runs: runCount, gates, distanceMiles });
  return { contact, plan, options, feet, gates, site, distanceMiles, estimate };
}

// FW-YYMMDD-XXXX, no ambiguous characters
export function newQuoteId(now = new Date()) {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const suffix = [...bytes].map(b => alphabet[b % alphabet.length]).join('');
  const d = now.toISOString().slice(2, 10).replace(/-/g, '');
  return `FW-${d}-${suffix}`;
}

// GeoJSON of the drawn plan (opens at geojson.io or in Google Earth)
export function planGeoJSON(q) {
  const features = q.plan.runs.map((run, i) => ({
    type: 'Feature',
    properties: { name: `Fence line ${i + 1}`, feet: planSegments(run).reduce((s, x) => s + x.feet, 0), stroke: '#ED1C24', 'stroke-width': 4 },
    geometry: { type: 'LineString', coordinates: (run.closed ? [...run.points, run.points[0]] : run.points).map(([lat, lng]) => [lng, lat]) },
  }));
  q.plan.gates.forEach(g => {
    const seg = planSegments(q.plan.runs[g.run])[g.seg];
    const lat = seg.a[0] + (seg.b[0] - seg.a[0]) * g.t, lng = seg.a[1] + (seg.b[1] - seg.a[1]) * g.t;
    features.push({ type: 'Feature', properties: { name: `${g.type === 'double' ? 'Double' : 'Single'} gate`, 'marker-color': '#231F20' }, geometry: { type: 'Point', coordinates: [lng, lat] } });
  });
  return { type: 'FeatureCollection', features };
}
