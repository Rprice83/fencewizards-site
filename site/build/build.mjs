// Builds every page in build/pages/ into public/<path>/index.html, plus sitemap.xml and robots.txt.
// Run: npm run build
import { readdir, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './lib/layout.mjs';
import { startPage, takeFaq, takeCrumbs } from './lib/components.mjs';
import { plain } from './lib/html.mjs';
import { SITE } from './lib/site.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const PAGES = join(here, 'pages');
const OUT = join(here, '..', 'public');

async function findPages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await findPages(p));
    else if (e.name.endsWith('.mjs') && !e.name.startsWith('_')) out.push(p);
  }
  return out;
}

const files = await findPages(PAGES);
const built = [];
const errors = [];

for (const file of files) {
  try {
    const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
    const pages = [].concat(mod.default);
    for (const page of pages) {
      if (!page?.path?.startsWith('/')) throw new Error('page.path must start with /');
      startPage();
      const main = typeof page.main === 'function' ? page.main() : page.main;
      const jsonld = [...(page.jsonld || [])];

      const crumbs = takeCrumbs();
      if (crumbs && crumbs.length > 1) jsonld.push({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE.url + (c.href || page.path) })),
      });
      const faq = takeFaq();
      if (faq.length) jsonld.push({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: faq.map(f => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: [].concat(f.a).map(plain).join(' ') } })),
      });
      if (page.article) jsonld.push({
        '@context': 'https://schema.org', '@type': 'Article',
        headline: plain(page.article.headline || page.title), datePublished: page.article.date, dateModified: page.article.updated || page.article.date,
        author: { '@type': 'Organization', name: SITE.name }, publisher: { '@id': `${SITE.url}/#business` },
        image: page.article.image || `${SITE.url}/assets/img/${page.ogImage || 'skyline-panels-indianapolis'}-1600.jpg`, mainEntityOfPage: SITE.url + page.path,
      });

      const html = layout({ ...page, main, jsonld, ogType: page.article ? 'article' : 'website' });
      const outFile = page.path === '/404/' ? join(OUT, '404.html') : join(OUT, page.path, 'index.html');
      await mkdir(dirname(outFile), { recursive: true });
      await writeFile(outFile, html, 'utf8');
      built.push(page);
    }
  } catch (err) {
    errors.push(`${relative(here, file)}: ${err.stack || err.message}`);
  }
}

// Remove pages generated last time that no longer exist (e.g. a deleted Field Note)
const MANIFEST = join(OUT, '.generated-pages.json');
const nowPaths = built.map(p => p.path);
try {
  const before = JSON.parse(await readFile(MANIFEST, 'utf8'));
  for (const old of before.filter(p => !nowPaths.includes(p) && p !== '/' && p !== '/404/')) {
    await rm(join(OUT, old, 'index.html'), { force: true });
    console.log(`Removed stale page ${old}`);
  }
} catch { /* first run */ }
if (!errors.length) await writeFile(MANIFEST, JSON.stringify(nowPaths, null, 1), 'utf8');

// Sitemap + robots (noindex pages and 404 left out)
const indexable = built.filter(p => !p.noindex && p.path !== '/404/').sort((a, b) => a.path.localeCompare(b.path));
await writeFile(join(OUT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map(p => `  <url><loc>${SITE.url}${p.path}</loc>${p.article?.date ? `<lastmod>${p.article.updated || p.article.date}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`, 'utf8');
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nDisallow: /api/\nDisallow: /quote-confirmation/\nDisallow: /staff/\n\nSitemap: ${SITE.url}/sitemap.xml\n`, 'utf8');

console.log(`Built ${built.length} pages (${indexable.length} in sitemap).`);
if (errors.length) {
  console.error(`\n${errors.length} page file(s) failed:\n` + errors.join('\n\n'));
  process.exit(1);
}
