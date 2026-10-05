// Page building blocks. Each returns an HTML string.
// Text fields accept inline markup (see html.mjs `md`): [link](/url/), **bold**, *accent*.
// `tone` sets the section background: 'paper' (default), 'white', 'steel', 'dark'.
import { esc, md, paras, plain } from './html.mjs';
import { SITE, USES, TYPES, CITIES, BEFORE_YOU_CALL, INTEGRATIONS, city, cityHref } from './site.mjs';
import { notesFor, notePhoto, formatDate } from './field-notes.mjs';

/* ---------- per-page structured-data collector (FAQ etc.) ---------- */
let faqItems = [];
let crumbTrail = null;
export function startPage() { faqItems = []; crumbTrail = null; }
export function takeFaq() { const f = faqItems; faqItems = []; return f; }
export function takeCrumbs() { const c = crumbTrail; crumbTrail = null; return c; }

/* ---------- primitives ---------- */
export function img(name, alt, { cls = '', sizes = '(max-width: 900px) 100vw, 50vw', eager = false } = {}) {
  if (!name) return '';
  return `<img${cls ? ` class="${cls}"` : ''} src="/assets/img/${name}-1600.jpg" srcset="/assets/img/${name}-800.jpg 800w, /assets/img/${name}-1600.jpg 1600w" sizes="${sizes}" alt="${esc(alt || '')}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const eyebrowHtml = (text, dark = true) => text ? `<p class="eyebrow${dark ? ' dark' : ''}"><span class="slash" aria-hidden="true"></span>${md(text)}</p>` : '';
const section = (tone, inner, { id, cls = '' } = {}) => `<section class="section tone-${tone || 'paper'}${cls ? ` ${cls}` : ''}"${id ? ` id="${id}"` : ''}>
  <div class="container">
${inner}
  </div>
</section>`;
const head = ({ eyebrow, heading, intro, tone, split }) => {
  if (!heading && !eyebrow) return '';
  const dark = tone !== 'dark';
  if (split && intro) return `<div class="section-head split"><div>${eyebrowHtml(eyebrow, dark)}<h2>${md(heading)}</h2></div><p class="head-note">${md(intro)}</p></div>`;
  return `<div class="section-head">${eyebrowHtml(eyebrow, dark)}${heading ? `<h2>${md(heading)}</h2>` : ''}${intro ? `<p class="head-note">${md(intro)}</p>` : ''}</div>`;
};

/* ---------- hero ---------- */
/**
 * crumbs: [{ name, href }] (Home is added automatically; last crumb = current page, no href needed)
 * title: H1 text, use *accent* for the red part
 */
// imageHtml: a ready-made <img class="page-hero-img"> (used by Field Notes photos) instead of a library image name
export function pageHero({ crumbs = [], eyebrow, title, lede, image, imageAlt = '', imageHtml, actions = true, meta }) {
  const trail = [{ name: 'Home', href: '/' }, ...crumbs];
  crumbTrail = trail;
  return `<section class="page-hero${image || imageHtml ? '' : ' no-image'}">
  ${imageHtml || (image ? img(image, imageAlt, { cls: 'page-hero-img', sizes: '100vw', eager: true }) : '')}
  <div class="page-hero-shade" aria-hidden="true"></div>
  <div class="container page-hero-inner">
    <nav class="crumbs" aria-label="Breadcrumb"><ol>${trail.map((c, i) => i < trail.length - 1 ? `<li><a href="${c.href}">${esc(c.name)}</a></li>` : `<li aria-current="page">${esc(c.name)}</li>`).join('')}</ol></nav>
    ${eyebrowHtml(eyebrow, false)}
    <h1>${md(title)}</h1>
    ${lede ? `<p class="page-hero-lede">${md(lede)}</p>` : ''}
    ${meta ? `<p class="page-hero-meta">${md(meta)}</p>` : ''}
    ${actions ? `<div class="hero-ctas">
      <a href="/estimate/" class="btn btn-red">Plan &amp; price your fence ${arrow}</a>
      <a href="tel:${SITE.tel}" class="btn btn-glass">Call Richard &middot; ${SITE.phone}</a>
    </div>` : ''}
  </div>
</section>`;
}

/* ---------- text blocks ---------- */
// Opening statement under the hero: big lead paragraph + optional supporting paragraphs and a side photo
export function intro({ lead, paras: body = [], image, imageAlt, tone = 'white', aside }) {
  return section(tone, `    <div class="intro-grid${image || aside ? '' : ' single'}">
      <div class="intro-copy">
        ${lead ? `<p class="intro-lead">${md(lead)}</p>` : ''}
        ${paras(body)}
      </div>
      ${image ? `<figure class="intro-figure">${img(image, imageAlt)}</figure>` : ''}
      ${aside || ''}
    </div>`, { cls: 'intro' });
}

// Heading + paragraphs, optional photo beside it (flip puts the photo on the left)
export function prose({ eyebrow, heading, intro: lede, paras: body = [], image, imageAlt, flip, tone, id, list }) {
  const text = `<div class="prose-copy">${head({ eyebrow, heading, intro: lede, tone })}${paras(body)}${list ? `<ul class="ticks">${list.map(li => `<li>${md(li)}</li>`).join('')}</ul>` : ''}</div>`;
  if (!image) return section(tone, `    <div class="prose-single">${text}</div>`, { id });
  return section(tone, `    <div class="prose-grid${flip ? ' flip' : ''}">
      ${text}
      <figure class="prose-figure">${img(image, imageAlt)}</figure>
    </div>`, { id });
}

// Numbered process. items: [{ title, text }]
export function steps({ eyebrow, heading, intro: lede, items, tone = 'white', id }) {
  return section(tone, `    ${head({ eyebrow, heading, intro: lede, tone })}
    <ol class="steps steps-${Math.min(items.length, 5)}">
      ${items.map((s, i) => `<li><span class="step-num">${i + 1}</span><h3>${md(s.title)}</h3><p>${md(s.text)}</p></li>`).join('\n      ')}
    </ol>`, { id, cls: 'process' });
}

// Cards in a grid. items: [{ title, text, image?, imageAlt?, href?, label? }]
export function features({ eyebrow, heading, intro: lede, items, tone, cols = 3, id }) {
  return section(tone, `    ${head({ eyebrow, heading, intro: lede, tone, split: !!lede })}
    <div class="feature-grid cols-${cols}">
      ${items.map(f => {
        const tag = f.href ? 'a' : 'article';
        return `<${tag} class="feature${f.image ? ' has-img' : ''}"${f.href ? ` href="${f.href}"` : ''}>
        ${f.image ? `<div class="feature-img">${img(f.image, f.imageAlt || '', { sizes: '(max-width: 900px) 100vw, 33vw' })}</div>` : ''}
        <div class="feature-body">${f.label ? `<span class="feature-label">${md(f.label)}</span>` : ''}<h3>${md(f.title)}</h3>${paras(f.text)}${f.href ? '<span class="link-arrow">Learn more</span>' : ''}</div>
      </${tag}>`;
      }).join('\n      ')}
    </div>`, { id });
}

// Specification table. rows: [[label, value], ...]
export function specs({ eyebrow, heading, intro: lede, rows, image, imageAlt, tone = 'white', id }) {
  return section(tone, `    <div class="specs-grid${image ? '' : ' single'}">
      <div>
        ${head({ eyebrow, heading, intro: lede, tone })}
        <dl class="spec-table">
          ${rows.map(([k, v]) => `<div><dt>${md(k)}</dt><dd>${md(v)}</dd></div>`).join('\n          ')}
        </dl>
      </div>
      ${image ? `<figure class="specs-figure">${img(image, imageAlt)}</figure>` : ''}
    </div>`, { id });
}

// FAQ accordion (also emitted as FAQPage structured data). items: [{ q, a }] — `a` may be a string or array of paragraphs
export function faq({ eyebrow = 'Questions', heading, intro: lede, items, tone = 'steel', id, open = 0 }) {
  faqItems.push(...items);
  return section(tone, `    <div class="faq-grid">
      ${head({ eyebrow, heading, intro: lede, tone })}
      <div class="faq-list">
        ${items.map((f, i) => `<details class="faq-item"${i < open ? ' open' : ''}>
          <summary><h3>${md(f.q)}</h3><span class="faq-icon" aria-hidden="true"></span></summary>
          <div class="faq-a">${paras(f.a)}</div>
        </details>`).join('\n        ')}
      </div>
    </div>`, { id });
}

// Checkable facts / trust points. items: [string | { title, text }]
export function facts({ eyebrow, heading, intro: lede, items, tone = 'dark', image, imageAlt, id }) {
  const list = `<ul class="fact-list">${items.map(f => typeof f === 'string'
    ? `<li><span class="fact-tick" aria-hidden="true"></span><p>${md(f)}</p></li>`
    : `<li><span class="fact-tick" aria-hidden="true"></span><div><strong>${md(f.title)}</strong><p>${md(f.text)}</p></div></li>`).join('')}</ul>`;
  return section(tone, `    <div class="facts-grid${image ? '' : ' single'}">
      <div>${head({ eyebrow, heading, intro: lede, tone })}${list}</div>
      ${image ? `<figure class="facts-figure">${img(image, imageAlt)}</figure>` : ''}
    </div>`, { id });
}

// The four fence types as photo cards. pick: subset of type slugs; notes: { slug: 'custom blurb' }
export function typeCards({ eyebrow = 'Fence types', heading, intro: lede, pick, notes = {}, tone = 'white', id }) {
  const list = (pick || TYPES.map(t => t.slug)).map(s => TYPES.find(t => t.slug === s));
  return features({
    eyebrow, heading, intro: lede, tone, id, cols: Math.min(list.length, 4),
    items: list.map(t => ({ title: t.name, text: notes[t.slug] || t.blurb, image: t.image, imageAlt: t.long, href: t.href })),
  });
}

// Photo strip. images: [{ name, alt }]
export function gallery({ eyebrow, heading, intro: lede, images, tone = 'white', id }) {
  return section(tone, `    ${head({ eyebrow, heading, intro: lede, tone })}
    <div class="gallery g-${Math.min(images.length, 4)}">
      ${images.map(i => `<figure>${img(i.name, i.alt, { sizes: '(max-width: 900px) 50vw, 25vw' })}${i.caption ? `<figcaption>${md(i.caption)}</figcaption>` : ''}</figure>`).join('\n      ')}
    </div>`, { id, cls: 'gallery-section' });
}

// Town chips with links. cities: slugs (defaults to all); exclude: slug
export function cityList({ eyebrow = 'Service area', heading, intro: lede, cities, exclude, tone = 'dark', id }) {
  const list = (cities || CITIES.map(c => c.slug)).filter(s => s !== exclude).map(city);
  return section(tone, `    ${head({ eyebrow, heading, intro: lede, tone })}
    <ul class="city-chips">${list.map(c => `<li><a href="${cityHref(c.slug)}">${esc(c.name)}</a></li>`).join('')}</ul>`, { id, cls: 'cities' });
}

/* ---------- location pages ---------- */
// Side card for intro(): quick facts about the town. drive: e.g. 'About 50 minutes northeast on I-69'
export function placeCard({ slug, drive, cityLink }) {
  const c = city(slug);
  return `<aside class="place-card">
    <p class="eyebrow dark"><span class="slash" aria-hidden="true"></span>${esc(c.name)} at a glance</p>
    <dl>
      <div><dt>County</dt><dd>${esc(c.county)}</dd></div>
      <div><dt>From our Greenwood yard</dt><dd>${md(drive)}</dd></div>
      <div><dt>Normal lead time</dt><dd>24&ndash;48 hours, emergencies faster</dd></div>
      <div><dt>Pricing</dt><dd>One flat price, removal included</dd></div>
    </dl>
    ${cityLink ? `<p class="place-link">City information: <a href="${cityLink.href}" target="_blank" rel="noopener">${esc(cityLink.label)}</a></p>` : ''}
    <a href="/estimate/" class="btn btn-red btn-block">Price a ${esc(c.name)} job</a>
  </aside>`;
}

/* ---------- Field Notes job stories ---------- */
// Card for a job story (Field Notes index and "Recent jobs")
export function noteCard(n) {
  const where = n.town ? city(n.town).name : '';
  return `<a class="feature has-img note-card" href="${n.path}">
        <div class="feature-img">${notePhoto(n.slug, n.hero, { sizes: '(max-width: 900px) 100vw, 33vw' })}</div>
        <div class="feature-body"><span class="feature-label">${n.kind === 'job' ? 'Job story' : 'Field note'}${where ? ` · ${esc(where)}` : ''} · ${formatDate(n.date)}</span><h3>${md(n.title)}</h3><p>${md(n.summary)}</p><span class="link-arrow">Read the story</span></div>
      </a>`;
}

// "Recent jobs" strip for town / fence-type / use pages. Renders nothing until a matching job story exists.
export function recentJobs({ town, fenceType, use, eyebrow = 'Recent jobs', heading, intro: lede, tone = 'white', limit = 3, exclude }) {
  const notes = notesFor({ town, fenceType, use, limit: limit + 1 }).filter(n => n.path !== exclude).slice(0, limit);
  if (!notes.length) return '';
  const place = town ? city(town).name : null;
  const h = heading || (place ? `Recent jobs *in ${place}.*` : 'Recent jobs *on the ground.*');
  return section(tone, `    ${head({ eyebrow, heading: h, intro: lede || 'Real projects from the Field Notes, with photos from the job.', tone })}
    <div class="feature-grid cols-3">
      ${notes.map(noteCard).join('\n      ')}
    </div>
    <p class="recent-more"><a href="/blog/">All field notes &rarr;</a></p>`, { cls: 'recent-jobs' });
}

/* ---------- long-form article (blog) ---------- */
// blocks: [{ heading?, paras?: [], list?: [], quote? }]
export function article({ blocks, aside }) {
  return section('white', `    <div class="article-grid">
      <div class="article-body">
        ${blocks.map(b => `${b.heading ? `<h2>${md(b.heading)}</h2>` : ''}${paras(b.paras || [])}${b.list ? `<ul>${b.list.map(li => `<li>${md(li)}</li>`).join('')}</ul>` : ''}${b.quote ? `<blockquote>${md(b.quote)}</blockquote>` : ''}`).join('\n        ')}
      </div>
      <aside class="article-aside">${aside || articleAside()}</aside>
    </div>`, { cls: 'article' });
}
export function articleAside() {
  return `<div class="aside-card">
    <p class="eyebrow dark"><span class="slash" aria-hidden="true"></span>Fence on site in 24&ndash;48 hours</p>
    <p>Five answers and Richard can price it: where, which fence, linear feet, gates, and how long.</p>
    <a href="/estimate/" class="btn btn-red btn-block">Plan &amp; price it</a>
    <a href="tel:${SITE.tel}" class="aside-phone">${SITE.phone}</a>
  </div>`;
}

/* ---------- link groups that close most pages ---------- */
// cities: 6 slugs for "Where we work"; current: this page's href (left out of the lists)
export function related({ cities = ['indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield'], current, heading = 'Keep exploring', tone = 'white', showCities = true }) {
  const group = (title, items) => `<div class="rel-group"><h3>${title}</h3><ul>${items.filter(i => i.href !== current).map(i => `<li><a href="${i.href}">${esc(i.long || i.name)}</a></li>`).join('')}</ul></div>`;
  return section(tone, `    <h2 class="rel-heading">${md(heading)}</h2>
    <div class="rel-grid">
      ${group('What we fence', USES)}
      ${group('Fence types', TYPES)}
      ${showCities ? group('Where we work', cities.map(city).map(c => ({ href: cityHref(c.slug), name: c.name })).concat([{ href: '/service-area/', name: 'All 19 towns' }])) : ''}
      ${group('Before you call', BEFORE_YOU_CALL)}
    </div>`, { cls: 'related' });
}

/* ---------- conversion ---------- */
const STYLES = ['Panels & stands', 'Post-driven chain link', 'Windscreen', 'Crowd-control barricades', 'Not sure yet'];
const DURATIONS = ['Under 1 month', '1–3 months', '3–6 months', '6–12 months', 'Over 12 months', 'Not sure yet'];

// Cloudflare Turnstile spam check. Invisible unless Cloudflare wants a click; main.js loads the script.
export const turnstileWidget = () => `<div class="cf-turnstile" data-sitekey="${esc(INTEGRATIONS.turnstileSiteKey)}" data-appearance="interaction-only" data-size="flexible"></div>`;

// Quick quote form (posts to /api/contact). heading/text customize the pitch.
export function quoteCta({ eyebrow = 'Get a quote', heading = 'Tell us about *the job.*', text = 'Five answers and Richard can price it. He takes every inquiry himself.', id = 'quote', tone = 'steel' }) {
  return section(tone, `    <div class="quote-grid">
      <div class="quote-copy">
        ${eyebrowHtml(eyebrow)}
        <h2>${md(heading)}</h2>
        <p>${md(text)}</p>
        <a class="call-card" href="tel:${SITE.tel}">
          <img src="/assets/brand/mark-wizard-800.png" alt="" width="64" height="56" loading="lazy">
          <span><small>Rather talk it through?</small><strong>${SITE.phone}</strong><em>Richard answers his own phone, 7 days</em></span>
        </a>
        <p class="map-tool">Prefer to price it yourself? <a href="/estimate/">Draw your fence on a map &rarr;</a></p>
      </div>
      <form class="quote-form js-inquiry" data-kind="quick" novalidate>
        <div class="form-row">
          <label>Name<input type="text" name="name" autocomplete="name" required maxlength="120"></label>
          <label>Phone<input type="tel" name="phone" autocomplete="tel" required maxlength="40"></label>
        </div>
        <label>Where is the project?<input type="text" name="location" placeholder="City or address" required maxlength="300"></label>
        <div class="form-row">
          <label>Fence style
            <select name="fenceStyle">${STYLES.map(s => `<option>${esc(s)}</option>`).join('')}</select>
          </label>
          <label>Linear feet<input type="number" name="feet" min="0" max="100000" inputmode="numeric" placeholder="e.g. 400"></label>
        </div>
        <label>How long do you need it?
          <select name="duration">${DURATIONS.map(s => `<option>${esc(s)}</option>`).join('')}</select>
        </label>
        <label class="hp" aria-hidden="true">Leave empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label>
        ${turnstileWidget()}
        <button type="submit" class="btn btn-red btn-lg btn-block">Send it to Richard</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-note">Richard reaches out within 24 hours, usually much sooner. <a href="/privacy/">How we use your details</a></p>
      </form>
    </div>`, { id, cls: 'quote' });
}

// Simple closing band with the two main actions
export function ctaBand({ heading = 'Fence on site in *24–48 hours.*', text = `Call ${SITE.phone} with your five answers, or draw the fence on a map and get a preliminary price now.` } = {}) {
  return `<section class="cta-band">
  <div class="container cta-band-inner">
    <div><h2>${md(heading)}</h2><p>${md(text)}</p></div>
    <div class="cta-band-actions">
      <a href="/estimate/" class="btn btn-red btn-lg">Plan &amp; price it ${arrow}</a>
      <a href="tel:${SITE.tel}" class="btn btn-glass btn-lg">Call ${SITE.phone}</a>
    </div>
  </div>
</section>`;
}

export { md, paras, plain, esc };
