import { test } from 'node:test';
import assert from 'node:assert/strict';
import { microsoftOfflineCsv, microsoftTime, MS_CONVERSION_NAME } from '../server/microsoft-ads.js';
import { microsoftTag } from '../build/lib/layout.mjs';

test('Microsoft upload file matches Microsoft\'s template: parameters row, exact columns, one row per won Microsoft-ad job', () => {
  const csv = microsoftOfflineCsv([
    { won_at: '2026-10-05T14:30:12.345Z', won_value: 2500, source: { msclkid: 'f894f652ea334e739002f7167ab8f8e3' } },
    { won_at: '2026-10-06T09:00:00.000Z', won_value: null, source: { msclkid: 'a1b2c3' } },
    { won_at: '2026-10-06T09:00:00.000Z', won_value: 900, source: { gclid: 'google-only' } }, // Google click → not in this file
  ]);
  assert.equal(csv, [
    'Parameters:TimeZone=+0000,,,,,,,',
    'Conversion Name,Conversion Time,Conversion Value,Conversion Currency,Microsoft Click ID,Hashed Email Address,Hashed Phone Number,',
    `${MS_CONVERSION_NAME},2026-10-05 14:30:12,2500,USD,f894f652ea334e739002f7167ab8f8e3,,,`,
    `${MS_CONVERSION_NAME},2026-10-06 09:00:00,,,a1b2c3,,,`,
    '',
  ].join('\r\n'));
});

test('conversion time uses Microsoft\'s yyyy-MM-dd HH:mm:ss format', () => {
  assert.equal(microsoftTime('2026-01-02T03:04:05.678Z'), '2026-01-02 03:04:05');
});

test('Microsoft UET tag: off without an ID, loads bat.js with the ID, refuses a mistyped ID', () => {
  assert.equal(microsoftTag({}), '');
  const html = microsoftTag({ microsoftUetId: '343012345' });
  assert.match(html, /bat\.bing\.com\/bat\.js/);
  assert.match(html, /ti:"343012345"/);
  assert.match(html, /window\.FW_UET=true/);
  assert.throws(() => microsoftTag({ microsoftUetId: 'UET-123' }));
});
