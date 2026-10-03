// Field Notes stored as data: one Markdown file per note in site/content/field-notes/<slug>.md,
// photos in site/public/assets/field-notes/<slug>/ (made by tools/add-field-note-photos.py).
// See FIELD-NOTES.md at the project root for the workflow.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';
import { esc, md } from './html.mjs';
import { CITIES, TYPES, USES } from './site.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = join(here, '..', '..', 'content', 'field-notes');
const PHOTOS_DIR = join(here, '..', '..', 'public', 'assets', 'field-notes');
const SHOW_DRAFTS = process.env.FW_DRAFTS === '1' || process.argv.includes('--drafts');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const formatDate = iso => { const [y, m, d] = String(iso).split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };

/* ---------- photos ---------- */
export const notePhotoSrc = (slug, file, w = 1600) => `/assets/field-notes/${slug}/${file}-${w}.jpg`;
export function notePhoto(slug, photo, { sizes = '(max-width: 900px) 100vw, 60vw', eager = false, cls = '' } = {}) {
  return `<img${cls ? ` class="${cls}"` : ''} src="${notePhotoSrc(slug, photo.file)}" srcset="${notePhotoSrc(slug, photo.file, 800)} 800w, ${notePhotoSrc(slug, photo.file)} 1600w" sizes="${sizes}" alt="${esc(photo.alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

/* ---------- a deliberately small Markdown subset ---------- */
// ## / ### headings, paragraphs, - or 1. lists, > quotes, ![photo](file "caption"), plus inline md() markup.
export function renderMarkdown(src, { slug, photos }) {
  const blocks = src.replace(/\r\n/g, '\n').trim().split(/\n{2,}/);
  return blocks.map(b => {
    const lines = b.split('\n');
    let m;
    if ((m = b.match(/^(#{2,3})\s+(.+)$/))) return `<h${m[1].length}>${md(m[2])}</h${m[1].length}>`;
    if ((m = b.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/))) {
      const photo = photos.find(p => p.file === m[2]) || { file: m[2], alt: m[1] };
      return `<figure class="note-figure">${notePhoto(slug, { ...photo, alt: m[1] || photo.alt })}${(m[3] || photo.caption) ? `<figcaption>${md(m[3] || photo.caption)}</figcaption>` : ''}</figure>`;
    }
    if (lines.every(l => /^\s*[-*]\s+/.test(l))) return `<ul>${lines.map(l => `<li>${md(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`;
    if (lines.every(l => /^\s*\d+\.\s+/.test(l))) return `<ol>${lines.map(l => `<li>${md(l.replace(/^\s*\d+\.\s+/, ''))}</li>`).join('')}</ol>`;
    if (lines.every(l => /^>\s?/.test(l))) return `<blockquote>${md(lines.map(l => l.replace(/^>\s?/, '')).join(' '))}</blockquote>`;
    return `<p>${md(lines.join(' '))}</p>`;
  }).join('\n');
}

/* ---------- loading + validation ---------- */
const KINDS = ['job', 'guide'];
function fail(file, msg) { throw new Error(`content/field-notes/${file}: ${msg}`); }

function loadNote(file) {
  const raw = readFileSync(join(NOTES_DIR, file), 'utf8').replace(/^﻿/, '');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) fail(file, 'missing the --- front matter block at the top');
  const fm = parseYaml(m[1]) || {};
  const slug = file.replace(/\.md$/, '');
  if (!/^[a-z0-9-]+$/.test(slug)) fail(file, 'file name must be lowercase letters, numbers and hyphens');

  for (const key of ['title', 'date', 'summary', 'hero']) if (!fm[key]) fail(file, `"${key}" is required`);
  const date = fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : String(fm.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, 'date must look like 2026-10-14');
  const kind = fm.kind || 'job';
  if (!KINDS.includes(kind)) fail(file, `kind must be one of ${KINDS.join(', ')}`);
  if (fm.town && !CITIES.some(c => c.slug === fm.town)) fail(file, `unknown town "${fm.town}" (use a slug from lib/site.mjs, e.g. bloomington, terre-haute)`);
  const fenceTypes = [].concat(fm.fence_types || []);
  fenceTypes.forEach(t => { if (!TYPES.some(x => x.slug === t)) fail(file, `unknown fence type "${t}" (panels, driven, windscreen, barricades)`); });
  if (fm.use && !USES.some(u => u.slug === fm.use)) fail(file, `unknown use "${fm.use}" (construction, events, emergency)`);
  if (String(fm.summary).length > 170) fail(file, 'summary should be 170 characters or fewer (it becomes the Google description)');

  const photos = [].concat(fm.photos || []).map(p => (typeof p === 'string' ? { file: p } : p));
  for (const p of [{ file: fm.hero }, ...photos]) {
    if (!existsSync(join(PHOTOS_DIR, slug, `${p.file}-1600.jpg`))) fail(file, `photo "${p.file}" not found. Run tools/add-field-note-photos.py first`);
  }
  photos.forEach(p => { if (!p.alt) fail(file, `photo "${p.file}" needs alt text (a plain description of what's visible)`); });

  return {
    slug, kind, date, draft: !!fm.draft,
    path: `/blog/${slug}/`,
    title: String(fm.title),
    seoTitle: fm.seo_title ? String(fm.seo_title) : null,
    summary: String(fm.summary),
    town: fm.town || null,
    fenceTypes,
    use: fm.use || null,
    customer: fm.customer || null,
    hero: { file: String(fm.hero), alt: String(fm.hero_alt || '') },
    facts: fm.facts || {},
    photos,
    body: m[2],
  };
}

let cache;
export function loadNotes() {
  if (cache) return cache;
  const files = existsSync(NOTES_DIR) ? readdirSync(NOTES_DIR).filter(f => f.endsWith('.md') && !f.startsWith('_')) : [];
  cache = files.map(loadNote).filter(n => SHOW_DRAFTS || !n.draft).sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

// Jobs matching a town / fence type / use, newest first
export function notesFor({ town, fenceType, use, limit = 3 } = {}) {
  return loadNotes()
    .filter(n => n.kind === 'job')
    .filter(n => (!town || n.town === town) && (!fenceType || n.fenceTypes.includes(fenceType)) && (!use || n.use === use))
    .slice(0, limit);
}
