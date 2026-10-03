// Generates one page per Markdown note in content/field-notes/ (see FIELD-NOTES.md).
import { pageHero, related, ctaBand, recentJobs, esc, md } from '../../lib/components.mjs';
import { loadNotes, renderMarkdown, notePhoto, notePhotoSrc, formatDate } from '../../lib/field-notes.mjs';
import { SITE, TYPES, USES, CITIES, city, cityHref } from '../../lib/site.mjs';

const words = s => s.split(/\s+/).filter(Boolean).length;

// Nearest towns to this one (for the "Where we work" links)
function nearby(slug, n = 6) {
  const c = city(slug);
  return CITIES.filter(x => x.slug !== slug)
    .sort((a, b) => Math.hypot(a.lat - c.lat, a.lng - c.lng) - Math.hypot(b.lat - c.lat, b.lng - c.lng))
    .slice(0, n - 1).map(x => x.slug).concat(slug);
}

function glance(n) {
  const rows = [];
  if (n.town) rows.push(['Where', `<a href="${cityHref(n.town)}">${esc(city(n.town).name)}, IN</a>`]);
  if (n.use) { const u = USES.find(x => x.slug === n.use); rows.push(['Work', `<a href="${u.href}">${esc(u.name)}</a>`]); }
  if (n.fenceTypes.length) rows.push(['Fence', n.fenceTypes.map(t => { const x = TYPES.find(y => y.slug === t); return `<a href="${x.href}">${esc(x.name)}</a>`; }).join('<br>')]);
  Object.entries(n.facts).forEach(([k, v]) => rows.push([esc(k), md(String(v))]));
  if (n.customer) rows.push(['For', md(String(n.customer))]);
  return `<div class="glance-card">
    <p class="eyebrow dark"><span class="slash" aria-hidden="true"></span>${n.kind === 'job' ? 'The job at a glance' : 'In short'}</p>
    ${rows.length ? `<dl>${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
    <a href="/estimate/" class="btn btn-red btn-block">Price a job like this</a>
    <a href="tel:${SITE.tel}" class="aside-phone">${SITE.phone}</a>
  </div>`;
}

export default loadNotes().map(n => {
  const inBody = new Set([...n.body.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)].map(m => m[1]));
  const extra = n.photos.filter(p => !inBody.has(p.file) && p.file !== n.hero.file);
  const minutes = Math.max(1, Math.ceil(words(n.body) / 230));
  const where = n.town ? city(n.town).name : null;

  return {
    path: n.path,
    title: n.seoTitle || `${n.title}${where && !n.title.includes(where) ? ` | ${where}, IN` : ''} | Fence Wizards`,
    description: n.summary,
    noindex: n.draft,
    ogImageUrl: notePhotoSrc(n.slug, n.hero.file),
    article: { headline: n.title, date: n.date, image: SITE.url + notePhotoSrc(n.slug, n.hero.file) },
    main: () => [
      n.draft ? '<div class="draft-banner">DRAFT: only visible in a local preview built with --drafts. Not published.</div>' : '',
      pageHero({
        crumbs: [{ name: 'Field notes', href: '/blog/' }, { name: where ? `${where} job` : n.title }],
        eyebrow: n.kind === 'job' ? `Job story${where ? ` · ${where}` : ''}` : 'Field notes',
        title: n.title,
        meta: `${formatDate(n.date)} · ${minutes} min read`,
        imageHtml: notePhoto(n.slug, n.hero, { cls: 'page-hero-img', sizes: '100vw', eager: true }),
        actions: false,
      }),
      `<section class="section tone-white article">
  <div class="container">
    <div class="article-grid">
      <div class="article-body">
        <p class="note-summary">${md(n.summary)}</p>
        ${renderMarkdown(n.body, n)}
      </div>
      <aside class="article-aside">${glance(n)}</aside>
    </div>
    ${extra.length ? `<div class="gallery note-gallery g-${Math.min(extra.length, 3)}">${extra.map(p => `<figure>${notePhoto(n.slug, p, { sizes: '(max-width: 900px) 50vw, 33vw' })}${p.caption ? `<figcaption>${md(p.caption)}</figcaption>` : ''}</figure>`).join('')}</div>` : ''}
  </div>
</section>`,
      n.town ? recentJobs({ town: n.town, heading: `More jobs *in ${where}.*`, tone: 'paper', exclude: n.path }) : '',
      related({ current: n.path, cities: n.town ? nearby(n.town) : undefined }),
      ctaBand(),
    ].join('\n'),
  };
});
