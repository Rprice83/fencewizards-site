import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spamVerdict, flagMail } from '../server/spam-check.js';
import { sendConfirmation } from '../server/confirm.js';

test('a normal request: saved, Richard emailed, customer confirmed, conversion counted', () => {
  assert.deepEqual(spamVerdict({ check: 'passed' }), { save: true, flag: null, notify: true, confirm: true, track: true });
});

test('spam check blocked on their network: accepted and flagged, but no customer email', () => {
  const v = spamVerdict({ check: 'no-token', blocked: true });
  assert.equal(v.save, true); assert.equal(v.flag, 'blocked'); assert.equal(v.notify, true); assert.equal(v.confirm, false);
});

test('no token without the blocked signal, or a token Cloudflare rejects → robot message', () => {
  assert.equal(spamVerdict({ check: 'no-token' }).reject, true);
  assert.equal(spamVerdict({ check: 'failed' }).reject, true);
});

test('a wrong secret or Cloudflare down never loses a lead', () => {
  for (const check of ['setup-error', 'unreachable']) {
    const v = spamVerdict({ check });
    assert.equal(v.save, true); assert.equal(v.flag, check); assert.equal(v.notify, true); assert.equal(v.confirm, false);
  }
  assert.equal(spamVerdict({ check: 'skipped' }).flag, 'not-checked');
});

test('hidden field filled by a person (Turnstile passed): kept and flagged, no conversion, no customer email', () => {
  assert.deepEqual(spamVerdict({ honeypot: 'x', check: 'passed' }), { save: true, flag: 'honeypot', notify: true, confirm: false, track: false });
});

test('hidden field filled and Turnstile not passed: a bot, dropped quietly and not counted', () => {
  for (const check of ['failed', 'no-token', 'skipped']) {
    const v = spamVerdict({ honeypot: 'x', check });
    assert.equal(v.save, false); assert.equal(v.track, false); assert.ok(!v.reject);
  }
});

test('flagged emails to Richard say so in the subject and at the top', () => {
  const m = flagMail({ subject: 'New fence plan FW-1', html: '<!doctype html><html><body style="x"><p>Hi</p></body></html>', text: 'NEW' }, 'blocked');
  assert.match(m.subject, /^\[Not verified\] New fence plan FW-1$/);
  assert.match(m.html, /<body style="x"><div[^>]*><strong>Not verified:<\/strong>/);
  assert.match(m.text, /^NOT VERIFIED: /);
  const plain = { subject: 's', html: 'h', text: 't' };
  assert.equal(flagMail(plain, null), plain);
});

// A tiny stand-in for D1: answers the limit query with the given counts and records the final status.
function fakeDb({ mine = 0, everyone = 0 } = {}) {
  const row = { id: 'FW-1', email: 'Dana@Example.com', fence_type: 'panels', months: 3, feet: 100, options_json: '{}', estimate_json: '{"lines":[]}' };
  const db = { status: null, prepare(sql) {
    return { bind: (...args) => ({
      first: async () => (/AS mine/.test(sql) ? { mine, everyone } : row),
      run: async () => { if (/SET confirm_status/.test(sql)) db.status = args[0]; },
    }) };
  } };
  return db;
}
const resendOk = () => { globalThis.fetch = async () => ({ ok: true, json: async () => ({ id: 'x' }) }); };

test('confirmation email: at most one per address per day, and a daily ceiling for the whole site', async () => {
  const realFetch = globalThis.fetch;
  try {
    resendOk();
    for (const [counts, expected] of [[{}, 'sent'], [{ mine: 1 }, 'limited'], [{ everyone: 50 }, 'limited']]) {
      const db = fakeDb(counts);
      await sendConfirmation({ DB: db, RESEND_API_KEY: 'k', QUOTE_FROM: 'a@b.c', QUOTE_TO: 'r@b.c' }, 'quotes', 'FW-1', 'https://x');
      assert.equal(db.status, expected);
    }
  } finally { globalThis.fetch = realFetch; }
});
