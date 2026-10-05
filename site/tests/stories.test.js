import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanAnswers, checkPhoto, safeFileName, newStoryId, validStoryId, storySummary, StoryError } from '../server/stories.js';

const base = { town: 'Carmel', jobType: 'construction', interesting: 'Rock under the whole north run.' };

test('answers: required fields, defaults and cleanup', () => {
  const a = cleanAnswers({ ...base, products: ['panels', 'bogus', 'panels'], feet: '420.6', canName: 'maybe', customerName: 'Acme', jobDate: '2026-10' });
  assert.deepEqual(a.products, ['panels']);
  assert.equal(a.feet, 421);
  assert.equal(a.canName, 'no');
  assert.equal(a.customerName, ''); // a name is only kept when naming is allowed
  assert.equal(a.jobDate, '2026-10');
  assert.equal(cleanAnswers({ ...base, canName: 'yes', customerName: 'Acme Builders' }).customerName, 'Acme Builders');
});

test('answers: missing town, job type or story is refused', () => {
  assert.throws(() => cleanAnswers({ ...base, town: ' ' }), StoryError);
  assert.throws(() => cleanAnswers({ ...base, jobType: 'party' }), StoryError);
  assert.throws(() => cleanAnswers({ ...base, interesting: '' }), StoryError);
  assert.throws(() => cleanAnswers(null), StoryError);
});

test('photos: phone formats accepted, others and oversized refused', () => {
  assert.doesNotThrow(() => checkPhoto({ type: 'image/jpeg', size: 4e6, name: 'IMG_1.JPG' }));
  assert.doesNotThrow(() => checkPhoto({ type: '', size: 3e6, name: 'IMG_2.HEIC' })); // some phones send no type
  assert.throws(() => checkPhoto({ type: 'application/pdf', size: 1e5, name: 'plan.pdf' }), StoryError);
  assert.throws(() => checkPhoto({ type: 'image/jpeg', size: 40e6, name: 'huge.jpg' }), StoryError);
  assert.throws(() => checkPhoto({ type: 'image/jpeg', size: 0, name: 'empty.jpg' }), StoryError);
});

test('file names are made safe for storage keys', () => {
  assert.equal(safeFileName('../../etc/passwd'), '..-..-etc-passwd');
  assert.equal(safeFileName('Job site #3 (wide).jpg'), 'Job-site-3-wide-.jpg');
  assert.equal(safeFileName(''), 'photo');
});

test('story ids and the plain-English summary', () => {
  assert.ok(validStoryId(newStoryId()));
  assert.equal(validStoryId('FW-261005-ABCD'), false);
  const text = storySummary({ answers: cleanAnswers({ ...base, products: ['driven'], feet: 600, doNotShow: 'Faces' }), photos: [{}, {}] });
  assert.match(text, /Construction in Carmel/);
  assert.match(text, /Post-driven chain link/);
  assert.match(text, /Do NOT show: Faces/);
  assert.match(text, /Photos: 2/);
});
