// Download a job story (answers + original photos) sent from the staff area, for drafting a Field Note.
//   node tools/pull-field-note.mjs FN-261005-ABCD [--local]
// Saves to ../organized-assets/working/field-notes/<id>/ (not in git): story.md, answers.json and the photos.
// Next: python tools/add-field-note-photos.py <slug> <that folder>  (resizes, strips GPS, finds the town); see FIELD-NOTES.md.
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storySummary, validStoryId } from '../server/stories.js';

const [id, flag] = process.argv.slice(2);
if (!validStoryId(id || '')) { console.error('Usage: node tools/pull-field-note.mjs FN-YYMMDD-XXXX [--local]'); process.exit(1); }
const where = flag === '--local' ? '--local' : '--remote';
const SITE = join(dirname(fileURLToPath(import.meta.url)), '..');

const wrangler = args => {
  // Run wrangler with this same Node (no shell, so arguments with spaces survive on Windows)
  const r = spawnSync(process.execPath, [join(SITE, 'node_modules', 'wrangler', 'bin', 'wrangler.js'), ...args],
    { cwd: SITE, encoding: 'utf8', env: { ...process.env, CI: 'true' }, maxBuffer: 50 * 1024 * 1024 });
  if (r.status !== 0) { console.error(r.stderr || r.stdout); process.exit(1); }
  return r.stdout;
};

const out = JSON.parse(wrangler(['d1', 'execute', 'fencewizards-quotes', where, '--json', '--command', `SELECT * FROM stories WHERE id = '${id}'`]));
const row = out[0]?.results?.[0];
if (!row) { console.error(`No story ${id} (${where}).`); process.exit(1); }
const story = { ...row, answers: JSON.parse(row.answers_json), photos: JSON.parse(row.photos_json) };

const dir = join(SITE, '..', 'organized-assets', 'working', 'field-notes', id);
mkdirSync(dir, { recursive: true });
for (const p of story.photos) {
  wrangler(['r2', 'object', 'get', `fencewizards-field-notes/${p.key}`, where, '--file', join(dir, p.key.split('/').pop())]);
  console.log(`  photo ${p.n}: ${p.key.split('/').pop()}`);
}
writeFileSync(join(dir, 'answers.json'), JSON.stringify(story.answers, null, 2));
writeFileSync(join(dir, 'story.md'), `# Job story ${id}\nFrom ${story.author}, ${story.created_at.slice(0, 10)}${story.quote_id ? `, linked to ${story.quote_id}` : ''}\n\n${storySummary(story)}\n`);
console.log(`\nSaved ${story.photos.length} photos and the answers to ${dir}`);
