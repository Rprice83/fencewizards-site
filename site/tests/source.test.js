import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanSource, cleanHeard, sourceLabel, isAdClick, HEARD_ABOUT } from '../public/js/source.js';

test('cleanSource keeps expected fields and drops everything else', () => {
  const s = cleanSource({ gclid: 'Cj0KCQ-abc_123', utm_campaign: 'Temp fence', referrer: 'www.google.com', landing: '/construction-fencing/', evil: '<script>', t: Date.UTC(2026, 9, 1) });
  assert.deepEqual(s, { gclid: 'Cj0KCQ-abc_123', utm_campaign: 'Temp fence', referrer: 'www.google.com', landing: '/construction-fencing/', first_seen: '2026-10-01T00:00:00.000Z' });
});

test('cleanSource rejects malformed click ids, paths and referrers', () => {
  assert.equal(cleanSource({ gclid: 'abc"><img>', landing: 'javascript:alert(1)', referrer: 'not a host!' }), null);
  assert.equal(cleanSource(null), null);
  assert.equal(cleanSource('gclid=abc'), null);
  assert.equal(cleanSource([]), null);
  assert.equal(cleanSource({ utm_term: 'x'.repeat(500) }).utm_term.length, 200);
});

test('cleanHeard only accepts the listed answers', () => {
  assert.equal(cleanHeard(HEARD_ABOUT[0]), HEARD_ABOUT[0]);
  assert.equal(cleanHeard('Something else'), null);
  assert.equal(cleanHeard(undefined), null);
});

test('sourceLabel: ads, search, social, other sites, direct', () => {
  assert.deepEqual(sourceLabel({ gclid: 'abc', utm_campaign: 'Temp fence', utm_term: 'fence rental' }), { kind: 'ads', label: 'Google Ads', detail: 'Temp fence · fence rental' });
  assert.equal(sourceLabel({ utm_source: 'google', utm_medium: 'cpc' }).label, 'Google Ads');
  assert.equal(sourceLabel({ utm_source: 'facebook', utm_medium: 'paid' }).label, 'facebook ads');
  assert.equal(sourceLabel({ referrer: 'www.google.com' }).kind, 'search');
  assert.equal(sourceLabel({ referrer: 'm.facebook.com' }).kind, 'social');
  assert.deepEqual(sourceLabel({ referrer: 'indybuilders.org' }), { kind: 'referral', label: 'Another website', detail: 'indybuilders.org' });
  assert.equal(sourceLabel({ landing: '/' }).kind, 'direct');
  assert.equal(sourceLabel(null).kind, 'unknown');
});

test('Microsoft Ads clicks (msclkid) are kept and labelled', () => {
  assert.equal(cleanSource({ msclkid: 'abc123DEF' }).msclkid, 'abc123DEF');
  assert.equal(cleanSource({ msclkid: 'bad id!' }), null);
  assert.deepEqual(sourceLabel({ msclkid: 'abc', utm_campaign: 'Temp fence' }), { kind: 'ads', label: 'Microsoft Ads', detail: 'Temp fence' });
  assert.equal(sourceLabel({ utm_source: 'bing', utm_medium: 'cpc' }).label, 'Microsoft Ads');
  assert.equal(sourceLabel({ gclid: 'g', msclkid: 'm' }).label, 'Google Ads'); // both present: the Google click id wins
  assert.equal(isAdClick({ msclkid: 'x' }), true);
});

test('isAdClick recognizes Google click ids and paid utm mediums only', () => {
  assert.equal(isAdClick({ gbraid: 'x' }), true);
  assert.equal(isAdClick({ utm_medium: 'ppc' }), true);
  assert.equal(isAdClick({ utm_source: 'newsletter', utm_medium: 'email' }), false);
  assert.equal(isAdClick(null), false);
});
