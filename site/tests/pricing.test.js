import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeEstimate, baseRate, milesFromIndy, estimateStands } from '../public/js/pricing.js';
import { buildQuote, InputError, newQuoteId } from '../server/quote.js';

const total = input => computeEstimate({ distanceMiles: 10, ...input }).total;

test('base rate tiers follow the Aug 2026 price sheet', () => {
  assert.equal(baseRate('panels', 1), 5.65);
  assert.equal(baseRate('panels', 12), 5.65);
  assert.equal(baseRate('panels', 13), 6.85);
  assert.equal(baseRate('panels', 18), 6.85);
  assert.equal(baseRate('panels', 19), 8.20); // TEMP until Richard confirms 19–23
  assert.equal(baseRate('panels', 24), 8.20);
  assert.equal(baseRate('driven', 18), 4.20);
  assert.equal(baseRate('driven', 19), 5.10);
  assert.equal(baseRate('driven', 23), 5.10);
  assert.equal(baseRate('driven', 24), 6.00);
});

test('panels: 40 ft for 1 month = $226', () => {
  assert.equal(total({ fenceType: 'panels', months: 1, feet: 40 }), 226);
});

test('panel gates are included at $0; driven gates are charged', () => {
  const p = computeEstimate({ fenceType: 'panels', months: 3, feet: 100, gates: { single: 2, double: 1 }, distanceMiles: 5 });
  assert.equal(p.total, 565);
  assert.ok(p.lines.some(l => l.key === 'gates' && l.amount === 0));
  const d = computeEstimate({ fenceType: 'driven', months: 3, feet: 100, gates: { single: 2, double: 1 }, distanceMiles: 5 });
  assert.equal(d.total, 420 + 280 + 280);
});

test('driven add-ons: top rail, windscreen, asphalt posts', () => {
  assert.equal(total({ fenceType: 'driven', months: 6, feet: 200, topRail: true, windscreen: 'plain', asphaltPosts: 4 }),
    200 * 4.2 + 200 * 1.6 + 200 * 1.8 + 4 * 30);
});

test('panel windscreen ballast uses the estimated stand count', () => {
  const stands = estimateStands(100, 1); // 10 panels + 1
  assert.equal(stands, 11);
  assert.equal(total({ fenceType: 'panels', months: 2, feet: 100, windscreen: 'plain', ballast: 'plus2', runs: 1 }),
    565 + 180 + 11 * 16);
});

test('50+ miles adds $1/ft; unknown distance is flagged, not charged', () => {
  assert.equal(computeEstimate({ fenceType: 'panels', months: 1, feet: 100, distanceMiles: 62 }).total, 665);
  assert.equal(computeEstimate({ fenceType: 'panels', months: 1, feet: 100, distanceMiles: 49.9 }).total, 565);
  const unknown = computeEstimate({ fenceType: 'panels', months: 1, feet: 100, distanceMiles: null, farZone: 'unsure' });
  assert.equal(unknown.total, 565);
  assert.ok(unknown.reviews.some(r => r.includes('50+')));
  assert.equal(computeEstimate({ fenceType: 'panels', months: 1, feet: 100, distanceMiles: null, farZone: 'yes' }).total, 665);
});

test('damage waiver adds 5% of the contract', () => {
  assert.equal(total({ fenceType: 'panels', months: 1, feet: 100, damageWaiver: true }), 593.25);
});

test('barricades, 8 ft and "not sure" go to Richard without a total', () => {
  for (const input of [{ fenceType: 'barricades' }, { fenceType: 'unsure' }, { fenceType: 'panels', height: 8 }]) {
    const e = computeEstimate({ months: 2, feet: 300, ...input });
    assert.equal(e.priced, false);
    assert.ok(e.reviews.length);
  }
});

test('small branded windscreen orders are flagged', () => {
  const e = computeEstimate({ fenceType: 'panels', months: 1, feet: 100, brandedScreens: 3, distanceMiles: 5 });
  assert.equal(e.total, 565 + 2400);
  assert.ok(e.reviews.some(r => r.includes('under 6')));
});

test('distance from downtown Indianapolis', () => {
  assert.ok(milesFromIndy(39.7684, -86.1581) < 0.01);
  const muncie = milesFromIndy(40.1934, -85.3864);
  assert.ok(muncie > 50 && muncie < 56, `Muncie ≈ 52 mi, got ${muncie}`);
});

/* ---------- server-side rebuild ---------- */
const contact = { name: 'Pat Builder', phone: '317-555-0100', email: 'pat@example.com', address: '100 Main St, Greenwood, IN' };
// ~100 ft due east near Greenwood: 100 ft ≈ 30.48 m; 1° lng at 39.6° ≈ 85,800 m
const p0 = [39.6137, -86.1067], p1 = [39.6137, -86.1067 + 30.48 / 85800];

test('server recomputes footage from geometry and ignores browser prices', () => {
  const q = buildQuote({
    contact, clientTotal: 1,
    plan: { manual: false, runs: [{ points: [p0, p1], closed: false, overrides: {} }], gates: [{ type: 'single', run: 0, seg: 0, t: 0.5 }] },
    options: { fenceType: 'driven', months: 3, feet: 99999 },
  });
  assert.ok(Math.abs(q.feet - 100) < 1, `expected ~100 ft, got ${q.feet}`);
  assert.equal(q.gates.single, 1);
  assert.ok(q.distanceMiles < 15);
  assert.ok(Math.abs(q.estimate.total - (q.feet * 4.2 + 140)) < 0.02);
});

test('typed segment overrides are respected', () => {
  const q = buildQuote({ contact, plan: { runs: [{ points: [p0, p1], overrides: { 0: 125 } }], gates: [] }, options: { fenceType: 'panels', months: 1 } });
  assert.equal(q.feet, 125);
});

test('manual footage mode', () => {
  const q = buildQuote({ contact, plan: { manual: true }, options: { fenceType: 'panels', months: 1, feet: 40, gates: { single: 1, double: 0 }, farZone: 'no' } });
  assert.equal(q.feet, 40);
  assert.equal(q.estimate.total, 226);
});

test('bad input is rejected', () => {
  assert.throws(() => buildQuote({ contact: { ...contact, email: 'nope' }, plan: { manual: true }, options: { feet: 10 } }), InputError);
  assert.throws(() => buildQuote({ contact: { ...contact, name: '' }, plan: { manual: true }, options: { feet: 10 } }), InputError);
  assert.throws(() => buildQuote({ contact, plan: { manual: true }, options: { feet: 0 } }), InputError);
  assert.throws(() => buildQuote({ contact, plan: { runs: [{ points: [[999, 0], p1] }] }, options: {} }), InputError);
});

test('quote ids look like FW-YYMMDD-XXXX', () => {
  assert.match(newQuoteId(new Date('2026-10-02T12:00:00Z')), /^FW-261002-[A-Z2-9]{4}$/);
});
