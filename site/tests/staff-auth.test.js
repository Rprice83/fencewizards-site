import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { verifyAccessJwt, staffUser, _resetKeyCache } from '../server/staff-auth.js';

const env = {
  ACCESS_TEAM_DOMAIN: 'fencewizards.cloudflareaccess.com',
  ACCESS_AUD: 'aud-123',
  STAFF_EMAILS: 'richard@example.com, helper@example.com',
  OWNER_EMAILS: 'richard@example.com',
  STAFF_NAMES: 'richard@example.com=Richard',
};

const b64url = bytes => Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const enc = obj => b64url(new TextEncoder().encode(JSON.stringify(obj)));

async function keypair(kid) {
  const kp = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['sign', 'verify']);
  const jwk = { ...(await crypto.subtle.exportKey('jwk', kp.publicKey)), kid, alg: 'RS256', use: 'sig' };
  return { kp, jwk };
}
async function sign(kp, kid, payload) {
  const head = enc({ alg: 'RS256', kid, typ: 'JWT' });
  const body = enc(payload);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', kp.privateKey, new TextEncoder().encode(`${head}.${body}`));
  return `${head}.${body}.${b64url(new Uint8Array(sig))}`;
}
const now = Math.floor(Date.now() / 1000);
const good = (over = {}) => ({ aud: ['aud-123'], iss: 'https://fencewizards.cloudflareaccess.com', email: 'Richard@Example.com', exp: now + 3600, iat: now, ...over });

let real, attacker, fetchImpl;
beforeEach(async () => {
  _resetKeyCache();
  real = await keypair('k1');
  attacker = await keypair('k1'); // same kid, different key
  fetchImpl = async url => {
    assert.equal(url, 'https://fencewizards.cloudflareaccess.com/cdn-cgi/access/certs');
    return new Response(JSON.stringify({ keys: [real.jwk] }));
  };
});

test('accepts a valid Access token and normalizes the email', async () => {
  assert.equal(await verifyAccessJwt(await sign(real.kp, 'k1', good()), env, { fetchImpl }), 'richard@example.com');
});

test('rejects a token signed by someone else', async () => {
  assert.equal(await verifyAccessJwt(await sign(attacker.kp, 'k1', good()), env, { fetchImpl }), null);
});

test('rejects expired tokens, wrong audience, wrong issuer, tampering and junk', async () => {
  assert.equal(await verifyAccessJwt(await sign(real.kp, 'k1', good({ exp: now - 10 })), env, { fetchImpl }), null);
  assert.equal(await verifyAccessJwt(await sign(real.kp, 'k1', good({ aud: ['other-app'] })), env, { fetchImpl }), null);
  assert.equal(await verifyAccessJwt(await sign(real.kp, 'k1', good({ iss: 'https://evil.cloudflareaccess.com' })), env, { fetchImpl }), null);
  const t = await sign(real.kp, 'k1', good());
  const [h, , s] = t.split('.');
  assert.equal(await verifyAccessJwt(`${h}.${enc(good({ email: 'attacker@example.com' }))}.${s}`, env, { fetchImpl }), null);
  assert.equal(await verifyAccessJwt('not.a.jwt', env, { fetchImpl }), null);
  assert.equal(await verifyAccessJwt('', env, { fetchImpl }), null);
});

test('fails closed when Access is not configured', async () => {
  const t = await sign(real.kp, 'k1', good());
  assert.equal(await verifyAccessJwt(t, { ...env, ACCESS_AUD: '' }, { fetchImpl }), null);
  assert.equal(await verifyAccessJwt(t, { ...env, ACCESS_TEAM_DOMAIN: '' }, { fetchImpl }), null);
});

test('staffUser: valid token but not on the staff list is refused', async () => {
  const req = async email => new Request('https://www.fencewizards.com/api/staff/me', { headers: { 'Cf-Access-Jwt-Assertion': await sign(real.kp, 'k1', good({ email })) } });
  assert.deepEqual(await staffUser(await req('richard@example.com'), env, { fetchImpl }), { email: 'richard@example.com', name: 'Richard', role: 'owner' });
  assert.deepEqual(await staffUser(await req('helper@example.com'), env, { fetchImpl }), { email: 'helper@example.com', name: 'helper', role: 'staff' });
  assert.equal(await staffUser(await req('stranger@example.com'), env, { fetchImpl }), null);
});

test('staffUser: reads the CF_Authorization cookie too', async () => {
  const t = await sign(real.kp, 'k1', good());
  const r = new Request('https://www.fencewizards.com/staff/', { headers: { Cookie: `foo=1; CF_Authorization=${t}` } });
  assert.equal((await staffUser(r, env, { fetchImpl }))?.email, 'richard@example.com');
});

test('dev sign-in only works on localhost and only when DEV_STAFF_EMAIL is set', async () => {
  const devEnv = { ...env, DEV_STAFF_EMAIL: 'richard@example.com' };
  assert.equal((await staffUser(new Request('http://localhost:8788/staff/'), devEnv, { fetchImpl }))?.email, 'richard@example.com');
  assert.equal(await staffUser(new Request('https://www.fencewizards.com/staff/'), devEnv, { fetchImpl }), null);
  assert.equal(await staffUser(new Request('http://localhost:8788/staff/'), env, { fetchImpl }), null);
});
