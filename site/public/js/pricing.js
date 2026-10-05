// Fence Wizards pricing engine — shared by the estimator (browser) and the quote API (server).
// Source: "Fence Wizards Price Sheet 8-12-26.pdf" (dated August 10, 2026).
// Open questions for Richard are tracked in TODO.md; temporary assumptions are marked TEMP below.

export const PRICE_SHEET_VERSION = '2026-08-10';

export const RATES = {
  driven: [ // post-driven chain link, per linear foot (install, removal, rent)
    { maxMonths: 18, rate: 4.20 },
    { maxMonths: 23, rate: 5.10 },
    { maxMonths: Infinity, rate: 6.00 },      // "24 months and on"
  ],
  panels: [ // panels & stands, per linear foot (includes one sand bag per stand)
    { maxMonths: 12, rate: 5.65 },
    { maxMonths: 18, rate: 6.85 },
    { maxMonths: Infinity, rate: 8.20 },      // TEMP: sheet has no 19–23 month rate; using the 24+ rate
  ],
  drivenSingleGate: 140,
  drivenDoubleGate: 280,
  topRail: 1.60,            // per ft, post-driven only
  windscreen: 1.80,         // per ft, plain windscreen (sold, not rented)
  asphaltPost: 30,          // each, post-driven, includes cold patch on removal
  postsEveryOtherPanel: 1.25, // per ft, panels only
  extraSandbag: 8,          // each, panels only
  ballastPlus2: 16,         // per stand, windscreen on panels (3 bags total)
  ballastPlus3: 24,         // per stand, windscreen on panels (4 bags total)
  chainLock: 50,
  gateWheel: 50,
  brandedScreen: 800,       // each, minimum order of 6
  xlGate: 2000,             // XL double swing gate (30–40 ft opening)
  farSurchargePerFoot: 1,   // new installs 50+ miles outside Indianapolis
  farMiles: 50,
  damageWaiverPct: 0.05,
};

export const ASSUMED_PANEL_WIDTH_FT = 10; // TEMP: used only to estimate stand counts for windscreen ballast

export const FENCE_TYPES = {
  panels: 'Panels & stands',
  driven: 'Post-driven chain link',
  barricades: 'Crowd-control barricades',
  unsure: 'Not sure yet',
};

// Downtown Indianapolis (Monument Circle) — origin for the 50-mile surcharge
export const INDY = { lat: 39.7684, lng: -86.1581 };

export function milesFromIndy(lat, lng) {
  const R = 3958.8, rad = d => d * Math.PI / 180;
  const dLat = rad(lat - INDY.lat), dLng = rad(lng - INDY.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(INDY.lat)) * Math.cos(rad(lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function baseRate(type, months) {
  const tiers = RATES[type];
  if (!tiers) return null;
  return tiers.find(t => months <= t.maxMonths).rate;
}

export function estimateStands(feet, runs = 1) {
  if (!feet) return 0;
  return Math.ceil(feet / ASSUMED_PANEL_WIDTH_FT) + Math.max(1, runs);
}

const int = (v, max = 10000) => {
  const n = Math.floor(Number(v) || 0);
  return Math.min(Math.max(n, 0), max);
};
const money = n => Math.round(n * 100) / 100;

/**
 * input: {
 *   fenceType, height (6|8), months, feet, runs,
 *   gates: { single, double }, xlGates,
 *   topRail, windscreen ('none'|'plain'), ballast ('standard'|'plus2'|'plus3'),
 *   postsEveryOther, extraSandbags, asphaltPosts,
 *   chainLocks, gateWheels, brandedScreens,
 *   damageWaiver, distanceMiles (number|null), distanceMethod ('driving'|'straight', for the label),
 *   farZone ('yes'|'no'|'unsure', used when distance unknown)
 * }
 * returns { lines, subtotal, waiver, total, reviews, assumptions, priced }
 */
export function computeEstimate(raw = {}) {
  const fenceType = FENCE_TYPES[raw.fenceType] ? raw.fenceType : 'unsure';
  const feet = Math.min(Math.max(Math.round((Number(raw.feet) || 0) * 10) / 10, 0), 100000);
  const months = Math.min(Math.max(int(raw.months), 1), 60);
  const height = Number(raw.height) === 8 ? 8 : 6;
  const runs = int(raw.runs, 200) || 1;
  const gates = { single: int(raw.gates?.single, 200), double: int(raw.gates?.double, 200) };

  const lines = [];
  const reviews = [];      // things Richard has to price or confirm
  const assumptions = [];  // how the number was built
  const add = (key, label, qty, unit, rate, note) => {
    if (qty > 0) lines.push({ key, label, qty, unit, rate, amount: money(qty * rate), note: note || '' });
  };

  if (!feet) {
    return { lines, subtotal: 0, waiver: 0, total: 0, reviews: ['Add your fence length to see an estimate.'], assumptions, priced: false, fenceType, months, feet };
  }

  let priced = true;

  if (fenceType === 'barricades') {
    priced = false;
    reviews.push('Crowd-control barricades are priced per event. Richard will quote them directly.');
  } else if (fenceType === 'unsure') {
    priced = false;
    reviews.push('Richard will recommend a fence type and price it on the call.');
  } else if (height === 8) {
    priced = false;
    reviews.push('8 ft fencing is a special order. Richard will price it directly.');
  } else {
    const rate = baseRate(fenceType, months);
    const termLabel = `${FENCE_TYPES[fenceType]} · ${months}-month rental`;
    add('base', termLabel, feet, 'ft', rate, 'Installation, rent and final removal');
    if (fenceType === 'panels' && months > 18 && months < 24) {
      assumptions.push('19–23 month panel rentals are shown at the 24+ month rate until Richard confirms.');
    }
  }

  if (fenceType === 'driven') {
    add('gate-single', 'Single gates', gates.single, 'ea', RATES.drivenSingleGate);
    add('gate-double', 'Double gates', gates.double, 'ea', RATES.drivenDoubleGate);
    if (raw.topRail) add('top-rail', 'Top rail', feet, 'ft', RATES.topRail);
    add('asphalt', 'Posts through asphalt (cold patch on removal)', int(raw.asphaltPosts), 'ea', RATES.asphaltPost);
  }

  if (fenceType === 'panels') {
    if (gates.single + gates.double > 0) {
      lines.push({ key: 'gates', label: `Gates (${gates.single + gates.double})`, qty: gates.single + gates.double, unit: 'ea', rate: 0, amount: 0, note: 'Included with panels' });
    }
    if (raw.postsEveryOther) add('posts', 'Posts every other panel', feet, 'ft', RATES.postsEveryOtherPanel);
    add('sandbags', 'Additional sand bags', int(raw.extraSandbags), 'ea', RATES.extraSandbag);
  }

  if ((fenceType === 'panels' || fenceType === 'driven') && raw.windscreen === 'plain') {
    add('windscreen', 'Windscreen (purchased)', feet, 'ft', RATES.windscreen);
    if (fenceType === 'panels' && (raw.ballast === 'plus2' || raw.ballast === 'plus3')) {
      const stands = estimateStands(feet, runs);
      const plus3 = raw.ballast === 'plus3';
      add('ballast', `Windscreen ballast · ${plus3 ? '4' : '3'} bags per stand (≈${stands} stands)`, stands, 'stand', plus3 ? RATES.ballastPlus3 : RATES.ballastPlus2);
      assumptions.push(`Stand count is estimated from ${ASSUMED_PANEL_WIDTH_FT} ft panels; Richard confirms the final count.`);
    }
  }

  const xl = int(raw.xlGates, 50);
  if (fenceType === 'panels' || fenceType === 'driven') {
    add('xl-gate', 'XL double swing gate (30–40 ft opening)', xl, 'ea', RATES.xlGate);
    add('chain-lock', 'Chain & lock', int(raw.chainLocks), 'ea', RATES.chainLock);
    add('wheels', 'Gate wheels (installed)', int(raw.gateWheels), 'ea', RATES.gateWheel);
    const branded = int(raw.brandedScreens, 500);
    add('branded', 'Branded windscreen (multicolor, large)', branded, 'ea', RATES.brandedScreen);
    if (branded > 0 && branded < 6) reviews.push('Branded windscreen orders under 6 are priced slightly higher per screen. Richard will confirm.');
  }

  // 50+ mile surcharge
  const dist = Number.isFinite(raw.distanceMiles) ? raw.distanceMiles : null;
  if (priced) {
    if (dist !== null) {
      if (dist >= RATES.farMiles) add('travel', `Distance surcharge · site ≈${Math.round(dist)} ${raw.distanceMethod === 'driving' ? 'driving miles' : 'mi'} from downtown Indianapolis`, feet, 'ft', RATES.farSurchargePerFoot);
    } else if (raw.farZone === 'yes') {
      add('travel', 'Distance surcharge · 50+ mi from Indianapolis', feet, 'ft', RATES.farSurchargePerFoot);
    } else if (raw.farZone !== 'no') {
      reviews.push('Sites 50+ miles from downtown Indianapolis add $1/ft. Locate the site on the map so we can check.');
    }
  }

  const subtotal = money(lines.reduce((s, l) => s + l.amount, 0));
  const waiver = priced && raw.damageWaiver ? money(subtotal * RATES.damageWaiverPct) : 0;
  if (waiver) lines.push({ key: 'waiver', label: 'Damage waiver (5%)', qty: 1, unit: '', rate: waiver, amount: waiver, note: 'Optional' });
  const total = money(subtotal + waiver);

  return { lines, subtotal, waiver, total, reviews, assumptions, priced, fenceType, months, feet };
}

export const fmtMoney = n => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
