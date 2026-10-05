// Field Notes intake (stage 1): Richard sends a job story from the staff area (questionnaire + original photos).
// Photos go to the R2 bucket bound as PHOTOS; drafting and publishing follow FIELD-NOTES.md.
import { newQuoteId } from './quote.js';

export const STORY_STATUSES = ['uploading', 'submitted', 'drafted', 'published', 'archived'];
export const JOB_TYPES = { construction: 'Construction', event: 'Event', emergency: 'Emergency or restoration', other: 'Other' };
export const PRODUCTS = { panels: 'Panels & stands', driven: 'Post-driven chain link', windscreen: 'Windscreen', barricades: 'Crowd-control barricades' };
export const MAX_PHOTOS = 12;
export const MAX_PHOTO_BYTES = 30 * 1024 * 1024; // phone originals, HEIC or JPEG
const PHOTO_TYPES = /^image\/(jpeg|png|heic|heif|webp)$/;

export const newStoryId = () => newQuoteId().replace('FW-', 'FN-');
export const validStoryId = id => /^FN-\d{6}-[A-Z2-9]{4}$/.test(id);

export class StoryError extends Error {}
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// The questionnaire, cleaned. Only town, job type and "what made it interesting" are required.
export function cleanAnswers(a) {
  if (!a || typeof a !== 'object') throw new StoryError('Invalid request.');
  const out = {
    town: str(a.town, 80),
    jobType: JOB_TYPES[a.jobType] ? a.jobType : '',
    site: str(a.site, 300),
    products: Array.isArray(a.products) ? [...new Set(a.products.filter(p => PRODUCTS[p]))] : [],
    feet: Math.min(Math.max(Math.round(Number(a.feet) || 0), 0), 100000) || null,
    gates: str(a.gates, 200),
    duration: str(a.duration, 100),
    interesting: str(a.interesting, 5000),
    canName: a.canName === 'yes' ? 'yes' : 'no',
    customerName: a.canName === 'yes' ? str(a.customerName, 200) : '',
    doNotShow: str(a.doNotShow, 2000),
    jobDate: /^\d{4}-\d{2}$/.test(a.jobDate || '') ? a.jobDate : '',
  };
  if (!out.town) throw new StoryError('Please add the town (or the nearest one).');
  if (!out.jobType) throw new StoryError('Please pick what kind of job it was.');
  if (!out.interesting) throw new StoryError('Please add a few words about what made the job interesting.');
  return out;
}

export function checkPhoto({ type, size, name }) {
  const t = String(type || '').toLowerCase();
  const byName = /\.(jpe?g|png|heic|heif|webp)$/i.test(name || '');
  if (!PHOTO_TYPES.test(t) && !byName) throw new StoryError(`"${name}" isn't a photo the site can use (JPEG, PNG, HEIC or WebP).`);
  if (!(size > 0)) throw new StoryError(`"${name}" is empty.`);
  if (size > MAX_PHOTO_BYTES) throw new StoryError(`"${name}" is too large (30 MB max).`);
}
export const safeFileName = name => (String(name || 'photo').normalize('NFKD').replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '').slice(-80) || 'photo');

const parse = s => { try { return JSON.parse(s); } catch { return null; } };
const shape = row => row && ({ ...row, answers: parse(row.answers_json) || {}, photos: parse(row.photos_json) || [], answers_json: undefined, photos_json: undefined });

export async function createStory(db, { answers, author, quoteId }) {
  const id = newStoryId();
  const now = new Date().toISOString();
  const qid = /^FW-(M-)?\d{6}-[A-Z2-9]{4}$/.test(quoteId || '') ? quoteId : null;
  await db.prepare('INSERT INTO stories (id, created_at, updated_at, author, quote_id, answers_json) VALUES (?,?,?,?,?,?)')
    .bind(id, now, now, author, qid, JSON.stringify(answers)).run();
  return id;
}

export async function getStory(db, id) {
  return shape(await db.prepare('SELECT * FROM stories WHERE id = ?').bind(id).first());
}

export async function listStories(db) {
  const { results } = await db.prepare(`SELECT id, created_at, author, status, quote_id, answers_json, photos_json FROM stories
    WHERE status != 'archived' ORDER BY created_at DESC LIMIT 100`).all();
  return results.map(shape);
}

// Store one photo in R2 and record it on the story. Returns the photo record.
export async function addPhoto(db, bucket, id, { body, name, type, size }) {
  const story = await getStory(db, id);
  if (!story) return null;
  if (story.status !== 'uploading') throw new StoryError('This story was already sent.');
  if (story.photos.length >= MAX_PHOTOS) throw new StoryError(`Up to ${MAX_PHOTOS} photos per story.`);
  checkPhoto({ type, size, name });
  const n = story.photos.reduce((m, p) => Math.max(m, p.n), 0) + 1;
  const key = `stories/${id}/${String(n).padStart(2, '0')}-${safeFileName(name)}`;
  await bucket.put(key, body, { httpMetadata: { contentType: type || 'application/octet-stream' } });
  const photo = { n, key, name: String(name).slice(0, 120), type: type || '', size };
  // Re-read and append so two uploads finishing together can't drop each other
  const fresh = await getStory(db, id);
  const photos = [...fresh.photos.filter(p => p.n !== n), photo].sort((a, b) => a.n - b.n);
  await db.prepare('UPDATE stories SET photos_json = ?, updated_at = ? WHERE id = ?').bind(JSON.stringify(photos), new Date().toISOString(), id).run();
  return photo;
}

export async function setStoryStatus(db, id, status) {
  if (!STORY_STATUSES.includes(status)) throw new StoryError('Unknown status');
  const r = await db.prepare('UPDATE stories SET status = ?, updated_at = ? WHERE id = ?').bind(status, new Date().toISOString(), id).run();
  return r.meta?.changes !== 0;
}

// Plain-English summary used in the notification email and the pull tool
export function storySummary(s) {
  const a = s.answers;
  return [
    `${JOB_TYPES[a.jobType] || 'Job'} in ${a.town}${a.jobDate ? ` (${a.jobDate})` : ''}`,
    a.site && `Site: ${a.site}`,
    a.products?.length && `What went in: ${a.products.map(p => PRODUCTS[p]).join(', ')}`,
    a.feet && `About ${a.feet.toLocaleString()} ft`,
    a.gates && `Gates: ${a.gates}`,
    a.duration && `Staying up: ${a.duration}`,
    `What made it interesting: ${a.interesting}`,
    `Name the customer/site: ${a.canName === 'yes' ? `yes (${a.customerName || 'name not given'})` : 'no'}`,
    a.doNotShow && `Do NOT show: ${a.doNotShow}`,
    `Photos: ${s.photos.length}`,
  ].filter(Boolean).join('\n');
}
