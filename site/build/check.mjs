// Checks the built site: every internal link and asset resolves, one H1 per page, titles/descriptions present.
// Run: npm run check   (after npm run build)
import { readdir, readFile, access } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PUB = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const exists = p => access(p).then(() => true, () => false);

async function htmlFiles(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory() && e.name !== 'assets' && e.name !== 'staff') out.push(...await htmlFiles(p));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

const problems = [];
const files = await htmlFiles(PUB);
const titles = new Map();
for (const f of files) {
  const rel = f.slice(PUB.length).replace(/\\/g, '/');
  const html = await readFile(f, 'utf8');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) problems.push(`${rel}: ${h1} <h1> elements`);
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) problems.push(`${rel}: missing <title>`);
  else if (titles.has(title)) problems.push(`${rel}: duplicate title with ${titles.get(title)}`); else titles.set(title, rel);
  if (!/<meta name="description" content="[^"]{30,}"/.test(html)) problems.push(`${rel}: missing/short meta description`);
  if (/\{\{|\bundefined\b|\[object Object\]/.test(html.replace(/<script[\s\S]*?<\/script>/g, ''))) problems.push(`${rel}: template leftovers ({{, undefined or [object Object])`);

  const refs = [...html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)].map(m => m[1])
    .concat([...html.matchAll(/srcset="([^"]+)"/g)].flatMap(m => m[1].split(',').map(s => s.trim().split(' ')[0])));
  for (const r of new Set(refs)) {
    if (r.startsWith('/api/')) continue;
    const target = r.endsWith('/') ? join(PUB, r, 'index.html') : join(PUB, r);
    if (!await exists(target)) problems.push(`${rel}: broken link/asset ${r}`);
  }
}
// Browser scripts aren't loaded by the tests, so at least make sure each one parses
const scripts = [];
const walkJs = async dir => {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walkJs(p); else if (/\.m?js$/.test(e.name)) scripts.push(p);
  }
};
await walkJs(PUB);
for (const p of scripts) {
  const r = spawnSync(process.execPath, ['--check', p], { encoding: 'utf8' });
  if (r.status !== 0) problems.push(`${relative(PUB, p)}: JavaScript syntax error\n${(r.stderr || '').split('\n').slice(0, 5).join('\n')}`);
}

console.log(`Checked ${files.length} HTML files and ${scripts.length} scripts.`);
if (problems.length) { console.log(`${problems.length} problem(s):\n` + problems.join('\n')); process.exit(1); }
console.log('No problems found.');
