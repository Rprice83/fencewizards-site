import { test } from 'node:test';
import assert from 'node:assert/strict';
import { offlineConversionsCsv, googleTime, CONVERSION_NAME } from '../server/google-ads.js';
import { parseWonValue } from '../server/inbox.js';

test('the upload file uses Google Ads column names and one row per won ad job', () => {
  const csv = offlineConversionsCsv([
    { won_at: '2026-10-05T14:30:12.345Z', won_value: 2500, source: { gclid: 'Cj0KCQ-abc_1' } },
    { won_at: '2026-10-06T09:00:00.000Z', won_value: null, source: { gclid: 'Cj0KCQ-abc_2' } },
    { won_at: '2026-10-06T09:00:00.000Z', won_value: 900, source: { referrer: 'google.com' } }, // no click id → skipped
  ]);
  assert.equal(csv, [
    'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency',
    `Cj0KCQ-abc_1,${CONVERSION_NAME},2026-10-05 14:30:12+00:00,2500,USD`,
    `Cj0KCQ-abc_2,${CONVERSION_NAME},2026-10-06 09:00:00+00:00,,USD`,
    '',
  ].join('\r\n'));
});

test('an empty export still has the header row', () => {
  assert.equal(offlineConversionsCsv([]), 'Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency\r\n');
});

test('conversion time is in a format Google accepts, with the time zone', () => {
  assert.equal(googleTime('2026-01-02T03:04:05.678Z'), '2026-01-02 03:04:05+00:00');
});

test('job amounts accept dollars typed the way people type them', () => {
  assert.equal(parseWonValue('2500'), 2500);
  assert.equal(parseWonValue('$2,500.50'), 2500.5);
  assert.equal(parseWonValue(' 1800 '), 1800);
  assert.equal(parseWonValue(''), null);
  assert.equal(parseWonValue(null), null);
  assert.throws(() => parseWonValue('two thousand'));
  assert.throws(() => parseWonValue('-5'));
  assert.throws(() => parseWonValue('99999999999'));
});
