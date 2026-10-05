import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyTurnstile } from '../server/turnstile.js';

const reply = (data, ok = true) => async () => ({ ok, json: async () => data });

test('without a secret the check is skipped (local dev, before launch)', async () => {
  assert.deepEqual(await verifyTurnstile('', {}), { ok: true, skipped: true });
});

test('with a secret, a missing or oversized token is refused without calling Cloudflare', async () => {
  const fetchImpl = async () => { throw new Error('should not be called'); };
  assert.equal((await verifyTurnstile('', { TURNSTILE_SECRET: 's' }, null, { fetchImpl })).ok, false);
  assert.equal((await verifyTurnstile(undefined, { TURNSTILE_SECRET: 's' }, null, { fetchImpl })).ok, false);
  assert.equal((await verifyTurnstile('x'.repeat(3000), { TURNSTILE_SECRET: 's' }, null, { fetchImpl })).ok, false);
});

test('Cloudflare says yes → allowed; says no → refused', async () => {
  const env = { TURNSTILE_SECRET: 's' };
  assert.equal((await verifyTurnstile('tok', env, '1.2.3.4', { fetchImpl: reply({ success: true }) })).ok, true);
  assert.equal((await verifyTurnstile('tok', env, '1.2.3.4', { fetchImpl: reply({ success: false, 'error-codes': ['invalid-input-response'] }) })).ok, false);
});

test('sends the secret, token and visitor IP to Cloudflare', async () => {
  let sent;
  const fetchImpl = async (url, init) => { sent = { url, body: init.body }; return { ok: true, json: async () => ({ success: true }) }; };
  await verifyTurnstile('tok', { TURNSTILE_SECRET: 'sec' }, '1.2.3.4', { fetchImpl });
  assert.match(sent.url, /siteverify$/);
  assert.equal(sent.body.get('secret'), 'sec');
  assert.equal(sent.body.get('response'), 'tok');
  assert.equal(sent.body.get('remoteip'), '1.2.3.4');
});

test('if Cloudflare is unreachable, the lead still goes through', async () => {
  const env = { TURNSTILE_SECRET: 's' };
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: async () => { throw new Error('down'); } })).ok, true);
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: reply({}, false) })).ok, true);
});
