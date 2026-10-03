// Staff authentication for the Quote Inbox.
//
// Cloudflare Access sits in front of /staff/* and /api/staff/* and only lets in people on its allowlist
// (Sign in with Google / email code). This file is the second lock: every request must also carry a valid,
// signed Access token (verified here against Cloudflare's public keys) for an email on STAFF_EMAILS.
// If anything is missing or misconfigured, access is refused (fails closed).
//
// Env:
//   ACCESS_TEAM_DOMAIN  e.g. fencewizards.cloudflareaccess.com
//   ACCESS_AUD          the Access application's "Application Audience (AUD) tag"
//   STAFF_EMAILS        comma-separated emails allowed in (should match the Access policy)
//   OWNER_EMAILS        comma-separated subset who can do owner-only things (e.g. future Stripe payments)
//   DEV_STAFF_EMAIL     LOCAL DEVELOPMENT ONLY: signs you in as this email on localhost. Never set in production.

const list = v => String(v || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

const b64urlToBytes = s => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  return Uint8Array.from(atob(b64), c => c.charCodeAt(0));
};
const b64urlJson = s => JSON.parse(new TextDecoder().decode(b64urlToBytes(s)));

let keyCache = { domain: null, at: 0, keys: [] };
async function accessKeys(domain, fetchImpl) {
  if (keyCache.domain === domain && Date.now() - keyCache.at < 60 * 60 * 1000 && keyCache.keys.length) return keyCache.keys;
  const res = await fetchImpl(`https://${domain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`Access certs ${res.status}`);
  const { keys = [] } = await res.json();
  keyCache = { domain, at: Date.now(), keys };
  return keys;
}
export function _resetKeyCache() { keyCache = { domain: null, at: 0, keys: [] }; }

// Returns the verified email, or null
export async function verifyAccessJwt(token, env, { fetchImpl = fetch, now = Date.now() } = {}) {
  if (!token || !env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  let header, payload;
  try { header = b64urlJson(parts[0]); payload = b64urlJson(parts[1]); } catch { return null; }
  if (header.alg !== 'RS256' || !header.kid) return null;

  const jwk = (await accessKeys(env.ACCESS_TEAM_DOMAIN, fetchImpl)).find(k => k.kid === header.kid);
  if (!jwk) return null;
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlToBytes(parts[2]), new TextEncoder().encode(`${parts[0]}.${parts[1]}`));
  if (!ok) return null;

  const aud = [].concat(payload.aud || []);
  if (!aud.includes(env.ACCESS_AUD)) return null;
  if (payload.iss !== `https://${env.ACCESS_TEAM_DOMAIN}`) return null;
  const t = Math.floor(now / 1000);
  if (!payload.exp || payload.exp < t) return null;
  if (payload.nbf && payload.nbf > t + 60) return null;
  return typeof payload.email === 'string' ? payload.email.toLowerCase() : null;
}

const cookie = (request, name) => {
  const m = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
};

/** Resolves the signed-in staff member: { email, name, role } or null. */
export async function staffUser(request, env, opts) {
  const url = new URL(request.url);
  const local = ['localhost', '127.0.0.1'].includes(url.hostname);
  let email = null;
  if (local && env.DEV_STAFF_EMAIL) email = env.DEV_STAFF_EMAIL.toLowerCase();
  else email = await verifyAccessJwt(request.headers.get('Cf-Access-Jwt-Assertion') || cookie(request, 'CF_Authorization'), env, opts);
  if (!email) return null;

  const staff = list(env.STAFF_EMAILS);
  const owners = list(env.OWNER_EMAILS);
  if (!staff.includes(email) && !owners.includes(email)) return null;
  return { email, name: displayName(email, env), role: owners.includes(email) ? 'owner' : 'staff' };
}

// STAFF_NAMES: optional "email=Name,email=Name" so notes read "Richard" instead of an address
function displayName(email, env) {
  for (const pair of String(env.STAFF_NAMES || '').split(',')) {
    const [e, n] = pair.split('=').map(s => s && s.trim());
    if (e && n && e.toLowerCase() === email) return n;
  }
  return email.split('@')[0];
}

export const forbidden = (asJson, msg = 'You don\'t have access to the Quote Inbox.') => asJson
  ? new Response(JSON.stringify({ error: msg }), { status: 403, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })
  : new Response(`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>No access</title><body style="font:16px system-ui;padding:40px;max-width:520px;margin:auto"><h1>No access</h1><p>${msg}</p><p>If you should have access, ask Richard to add your email.</p><p><a href="/">Back to the website</a></p></body>`, { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
