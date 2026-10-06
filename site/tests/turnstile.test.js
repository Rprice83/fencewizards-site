import { test } from 'node:test';
import assert from 'node:assert/strict';
import { verifyTurnstile } from '../server/turnstile.js';

const reply = (data, ok = true) => async () => ({ ok, json: async () => data });
const env = { TURNSTILE_SECRET: 's' };

test('without a secret the check is skipped (local dev, before launch)', async () => {
  assert.equal((await verifyTurnstile('', {})).status, 'skipped');
});

test('with a secret, a missing or oversized token is caught without calling Cloudflare', async () => {
  const fetchImpl = async () => { throw new Error('should not be called'); };
  assert.equal((await verifyTurnstile('', env, null, { fetchImpl })).status, 'no-token');
  assert.equal((await verifyTurnstile(undefined, env, null, { fetchImpl })).status, 'no-token');
  assert.equal((await verifyTurnstile('x'.repeat(3000), env, null, { fetchImpl })).status, 'failed');
});

test('Cloudflare says yes → passed; says no → failed', async () => {
  assert.equal((await verifyTurnstile('tok', env, '1.2.3.4', { fetchImpl: reply({ success: true }) })).status, 'passed');
  assert.equal((await verifyTurnstile('tok', env, '1.2.3.4', { fetchImpl: reply({ success: false, 'error-codes': ['invalid-input-response'] }) })).status, 'failed');
});

test('Cloudflare refusing our own secret is a setup error, not a robot', async () => {
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: reply({ success: false, 'error-codes': ['invalid-input-secret'] }) })).status, 'setup-error');
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: reply({ success: false, 'error-codes': ['missing-input-secret'] }) })).status, 'setup-error');
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

test('if Cloudflare is unreachable, that is reported as unreachable', async () => {
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: async () => { throw new Error('down'); } })).status, 'unreachable');
  assert.equal((await verifyTurnstile('tok', env, null, { fetchImpl: reply({}, false) })).status, 'unreachable');
});
