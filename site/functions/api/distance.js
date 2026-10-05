// GET /api/distance?lat=39.9&lng=-86.1 — miles from downtown Indianapolis for the estimator's live price.
// → { miles, method: 'driving' | 'straight' }. The quote API recomputes it the same way (same cache) on submit.
import { distanceFromIndy } from '../../server/distance.js';

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=86400' },
});

export async function onRequestGet({ request, env }) {
  const p = new URL(request.url).searchParams;
  const lat = Number(p.get('lat')), lng = Number(p.get('lng'));
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return json({ error: 'Invalid location.' }, 400);
  return json(await distanceFromIndy(lat, lng, env));
}
