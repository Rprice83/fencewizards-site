import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distanceFromIndy, siteKey } from '../server/distance.js';
import { buildQuote } from '../server/quote.js';
import { computeEstimate } from '../public/js/pricing.js';

const LAFAYETTE = [40.4167, -86.8753]; // ≈ 55 straight-line miles from downtown Indy

// Minimal stand-in for the D1 cache table
function fakeDb() {
  const rows = new Map();
  return {
    rows,
    prepare(sql) {
      return {
        bind: (...a) => ({
          first: async () => (/SELECT/.test(sql) && rows.has(a[0]) ? { miles: rows.get(a[0]) } : null),
          run: async () => { if (/INSERT/.test(sql)) rows.set(a[0], a[1]); },
        }),
      };
    },
  };
}
const google = (meters, calls = []) => async (url, init) => {
  calls.push(JSON.parse(init.body));
  return { ok: true, json: async () => (meters ? { routes: [{ distanceMeters: meters }] } : {}) };
};

test('no Google key → straight-line miles', async () => {
  const d = await distanceFromIndy(...LAFAYETTE, { DB: fakeDb() });
  assert.equal(d.method, 'straight');
  assert.ok(d.miles > 50 && d.miles < 60);
});

test('with a key → driving miles from Google, then cached (no second lookup)', async () => {
  const env = { GOOGLE_MAPS_SERVER_KEY: 'k', DB: fakeDb() };
  const calls = [];
  const first = await distanceFromIndy(...LAFAYETTE, env, { fetchImpl: google(103_000, calls) });
  assert.deepEqual(first, { miles: 64, method: 'driving' }); // 103 km ≈ 64.0 mi
  assert.equal(calls[0].travelMode, 'DRIVE');
  assert.equal(calls[0].origin.location.latLng.latitude, 39.7684); // downtown Indianapolis
  const again = await distanceFromIndy(...LAFAYETTE, env, { fetchImpl: async () => { throw new Error('should use the cache'); } });
  assert.deepEqual(again, { miles: 64, method: 'driving' });
  assert.ok(env.DB.rows.has(siteKey(...LAFAYETTE)));
});

test('Google slow, failing or without a route → straight-line fallback', async () => {
  const env = { GOOGLE_MAPS_SERVER_KEY: 'k', DB: fakeDb() };
  const slow = (url, init) => new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(new Error('timeout'))));
  assert.equal((await distanceFromIndy(...LAFAYETTE, env, { fetchImpl: slow, timeoutMs: 50 })).method, 'straight');
  assert.equal((await distanceFromIndy(...LAFAYETTE, env, { fetchImpl: async () => ({ ok: false }) })).method, 'straight');
  assert.equal((await distanceFromIndy(...LAFAYETTE, env, { fetchImpl: google(0) })).method, 'straight');
  assert.equal(env.DB.rows.size, 0); // fallbacks are never cached
});

test('sites absurdly far away never spend a Google lookup', async () => {
  const d = await distanceFromIndy(34.05, -118.24, { GOOGLE_MAPS_SERVER_KEY: 'k' }, { fetchImpl: async () => { throw new Error('no'); } });
  assert.equal(d.method, 'straight');
});

test('the surcharge follows driving miles and says so', () => {
  const e = computeEstimate({ fenceType: 'panels', months: 1, feet: 100, distanceMiles: 64, distanceMethod: 'driving' });
  assert.match(e.lines.find(l => l.label.startsWith('Distance surcharge')).label, /64 driving miles from downtown Indianapolis/);
  const body = { plan: { manual: false, runs: [{ points: [LAFAYETTE, [LAFAYETTE[0] + 0.001, LAFAYETTE[1]]], closed: false }], gates: [] },
    options: { fenceType: 'panels', months: 1 }, contact: { name: 'A', phone: '317-555-0100', email: 'a@b.co', address: 'x', contactPref: 'call' } };
  const q = buildQuote(body, { distance: { miles: 64, method: 'driving' } });
  assert.equal(q.distanceMiles, 64);
  assert.equal(q.distanceMethod, 'driving');
  assert.equal(buildQuote(body).distanceMethod, 'straight');
});
