// Distance from downtown Indianapolis for the 50+ mile surcharge: driving miles (Google Routes API),
// straight-line miles as the fallback.
//
// Env: GOOGLE_MAPS_SERVER_KEY (secret; a key with only the Routes API enabled). Without it, or if Google is slow
// or has no route, the straight-line distance is used and marked as such.
// Driving results are cached in D1 (distance_cache) per site rounded to ~100 m, so the live estimate and the
// submitted quote always agree and a repeat lookup costs nothing.
import { INDY, milesFromIndy } from '../public/js/pricing.js';

const ROUTES_URL = 'https://routes.googleapis.com/directions/v2:computeRoutes';
const METERS_PER_MILE = 1609.344;
export const MAX_STRAIGHT_MILES = 300; // farther than this isn't a job site we'd price; don't spend lookups on it

const round1 = n => Math.round(n * 10) / 10;
export const siteKey = (lat, lng) => `${lat.toFixed(3)},${lng.toFixed(3)}`;

// → { miles, method: 'driving' | 'straight' }
export async function distanceFromIndy(lat, lng, env, { fetchImpl = fetch, timeoutMs = 2500 } = {}) {
  const straight = { miles: round1(milesFromIndy(lat, lng)), method: 'straight' };
  if (!env.GOOGLE_MAPS_SERVER_KEY || straight.miles > MAX_STRAIGHT_MILES) return straight;

  const key = siteKey(lat, lng);
  const db = env.DB;
  try {
    const hit = db && await db.prepare('SELECT miles FROM distance_cache WHERE key = ?').bind(key).first();
    if (hit) return { miles: hit.miles, method: 'driving' };
  } catch { /* cache unavailable: just ask Google */ }

  const [rlat, rlng] = key.split(',').map(Number); // route to the rounded point so the cache key matches what was measured
  let meters;
  try {
    const res = await fetchImpl(ROUTES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': env.GOOGLE_MAPS_SERVER_KEY, 'X-Goog-FieldMask': 'routes.distanceMeters' },
      body: JSON.stringify({
        origin: { location: { latLng: { latitude: INDY.lat, longitude: INDY.lng } } },
        destination: { location: { latLng: { latitude: rlat, longitude: rlng } } },
        travelMode: 'DRIVE',
        routingPreference: 'TRAFFIC_UNAWARE', // plain road distance; the cheapest Routes option
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) return straight;
    meters = (await res.json())?.routes?.[0]?.distanceMeters;
  } catch { return straight; } // timeout or network error
  if (!Number.isFinite(meters) || meters <= 0) return straight; // no drivable route (e.g. a point in a lake)

  const miles = round1(meters / METERS_PER_MILE);
  try { if (db) await db.prepare('INSERT OR REPLACE INTO distance_cache (key, miles, created_at) VALUES (?,?,?)').bind(key, miles, new Date().toISOString()).run(); } catch { /* fine */ }
  return { miles, method: 'driving' };
}
