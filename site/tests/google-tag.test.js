import { test } from 'node:test';
import assert from 'node:assert/strict';
import { googleTag } from '../build/lib/layout.mjs';

test('no IDs → no Google code on the page at all', () => {
  assert.equal(googleTag({}), '');
  assert.equal(googleTag({ adsLeadLabel: 'abc' }), '');
});

test('Google Ads + GA4: loads the tag, configures both, and lists the conversions main.js sends', () => {
  const html = googleTag({ googleAdsId: 'AW-123', ga4Id: 'G-ABC9', adsLeadLabel: 'lead1', adsPhoneTapLabel: 'tap1', adsWebsiteCallLabel: 'call1' });
  assert.match(html, /gtag\/js\?id=AW-123/);
  assert.match(html, /gtag\('config',"AW-123"\)/);
  assert.match(html, /gtag\('config',"G-ABC9"\)/);
  assert.match(html, /gtag\('config',"AW-123\/call1",\{phone_conversion_number:"\(317\) 296-4015"\}\)/);
  assert.match(html, /window\.FW_GTAG=\{"lead":"AW-123\/lead1","phone":"AW-123\/tap1","ga4":true\}/);
});

test('GA4 only: no Ads conversions', () => {
  const html = googleTag({ ga4Id: 'G-ABC9', adsLeadLabel: 'lead1' });
  assert.match(html, /gtag\/js\?id=G-ABC9/);
  assert.match(html, /window\.FW_GTAG=\{"lead":"","phone":"","ga4":true\}/);
});

test('a mistyped ID stops the build instead of shipping a broken tag', () => {
  assert.throws(() => googleTag({ googleAdsId: '123456' }));
  assert.throws(() => googleTag({ ga4Id: 'UA-1234-1' }));
});
