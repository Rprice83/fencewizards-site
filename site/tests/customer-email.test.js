import { test } from 'node:test';
import assert from 'node:assert/strict';
import { customerEmail } from '../server/customer-email.js';

const quote = {
  id: 'FW-261005-ABCD', name: 'Dana Smith', email: 'dana@example.com', phone: '317-555-0100', contact_pref: 'text',
  address: '1 Test St, Carmel, IN', fence_type: 'panels', months: 3, feet: 412.6, start_date: '2026-10-20',
  priced: 1, estimate_total: 2614.82,
  options_json: JSON.stringify({ height: 6, gates: { single: 1, double: 0 } }),
  estimate_json: JSON.stringify({ lines: [{ label: 'Panels & stands · 3-month rental', amount: 2614.82 }] }),
};
const origin = 'https://www.fencewizards.com';

test('quote confirmation: subject, greeting, reference, plan, estimate and Richard\'s phone', () => {
  const m = customerEmail(quote, { origin });
  assert.equal(m.to, 'dana@example.com');
  assert.match(m.subject, /^We have your fence plan, Dana\. Reference FW-261005-ABCD$/);
  assert.match(m.html, /Thanks, Dana!/);
  assert.match(m.html, /by text message/);
  assert.match(m.html, /413 linear ft/);
  assert.match(m.html, /\$2,614\.82/);
  assert.match(m.html, /Richard confirms the final price/);
  assert.match(m.html, /tel:\+13172964015/);
  assert.match(m.html, /https:\/\/www\.fencewizards\.com\/assets\/brand\/logo-horizontal-reversed-800\.png/);
  assert.match(m.text, /Preliminary total: \$2,614\.82/);
});

test('an unpriced plan says Richard will price it, with no total', () => {
  const m = customerEmail({ ...quote, priced: 0, estimate_total: null }, { origin });
  assert.match(m.html, /Richard will price this plan for you directly/);
  assert.doesNotMatch(m.html, /Preliminary total/);
});

test('contact message confirmation shows what they wrote', () => {
  const m = customerEmail({ id: 'FW-M-261005-WXYZ', kind: 'contact', name: 'Pat', email: 'pat@example.com', location: 'Fishers', message: 'Need fence for a festival in May.' }, { origin });
  assert.match(m.subject, /We have your message, Pat/);
  assert.match(m.html, /Need fence for a festival in May\./);
});

test('no email address → no confirmation (the quick-quote form asks only for a phone)', () => {
  assert.equal(customerEmail({ ...quote, email: null }, { origin }), null);
  assert.equal(customerEmail(null, { origin }), null);
});

test('anything the customer typed is escaped', () => {
  const m = customerEmail({ ...quote, name: '<script>alert(1)</script>', address: '"><img src=x onerror=alert(1)>' }, { origin });
  assert.doesNotMatch(m.html, /<script>alert|<img src=x/);
  assert.match(m.html, /&lt;img src=x/);
});
