// Page shell: <head>, header/nav, footer, structured data.
import { esc, plain } from './html.mjs';
import { SITE, USES, TYPES, COMPANY, CITIES, cityHref } from './site.mjs';

const chevron = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
const phoneIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1z" fill="currentColor"/></svg>';

const isActive = (path, hrefs) => hrefs.some(h => path === h || (h !== '/' && path.startsWith(h)));
const cur = (path, href) => (path === href ? ' aria-current="page"' : '');

function menu(label, items, path, align) {
  const active = isActive(path, items.map(i => i.href));
  return `<li class="has-menu${active ? ' active' : ''}">
          <button class="nav-trigger" aria-expanded="false">${label} ${chevron}</button>
          <div class="mega${align === 'right' ? ' mega-right' : ''}${items.length < 4 ? '' : ''}">
            ${items.map(i => `<a href="${i.href}"${cur(path, i.href)}><strong>${esc(i.name)}</strong><span>${esc(i.blurb)}</span></a>`).join('\n            ')}
          </div>
        </li>`;
}

export function header({ path, solid }) {
  return `<header class="site-header${solid ? ' scrolled' : ''}"${solid ? ' data-solid' : ''} id="top">
  <div class="utility-bar">
    <div class="container utility-inner">
      <p class="utility-note"><span class="dot" aria-hidden="true"></span>Serving Indianapolis + 80 miles<span class="hours"> &middot; Open 7 days, 7:30am&ndash;9pm</span></p>
      <div class="utility-links">
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.tel}" class="utility-phone">${SITE.phone}</a>
      </div>
    </div>
  </div>

  <nav class="main-nav" aria-label="Primary">
    <div class="container nav-inner">
      <a href="/" class="brand" aria-label="Fence Wizards home">
        <img class="brand-light" src="/assets/brand/logo-horizontal-reversed-800.png" alt="Fence Wizards — Rental Fence Solutions" width="800" height="277">
        <img class="brand-dark" src="/assets/brand/logo-horizontal-800.png" alt="" width="800" height="277" aria-hidden="true">
      </a>

      <ul class="nav-links" id="nav-links">
        ${menu('What We Fence', USES, path)}
        ${menu('Fence Types', TYPES, path)}
        <li><a href="/#pricing">Pricing</a></li>
        <li${isActive(path, ['/service-area/']) ? ' class="active"' : ''}><a href="/service-area/"${cur(path, '/service-area/')}>Service Area</a></li>
        ${menu('Company', COMPANY, path, 'right')}
        <li class="nav-mobile-cta"><a href="tel:${SITE.tel}" class="btn btn-outline">Call ${SITE.phone}</a><a href="/estimate/" class="btn btn-red">Get a Free Quote</a></li>
      </ul>

      <div class="nav-actions">
        <a href="tel:${SITE.tel}" class="nav-phone">
          ${phoneIcon}
          <span><small>Talk to Richard</small>${SITE.phone}</span>
        </a>
        <a href="/estimate/" class="btn btn-red btn-sm">Get a Quote</a>
        <button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links"><span></span><span></span><span></span></button>
      </div>
    </div>
  </nav>
</header>`;
}

export function footer() {
  const links = list => list.map(i => `<li><a href="${i.href}">${esc(i.name)}</a></li>`).join('');
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <img src="/assets/brand/logo-horizontal-reversed-800.png" alt="Fence Wizards — Rental Fence Solutions" width="260" height="90" loading="lazy">
      <p>Family-run temporary fence rental out of Greenwood, Indiana. Flat price, removal included.</p>
      <a class="footer-rating" href="${SITE.mapsUrl}" target="_blank" rel="noopener"><span aria-hidden="true">★★★★★</span> ${SITE.rating.value} from ${SITE.rating.count} Google reviews</a>
    </div>
    <div>
      <h4>What we fence</h4>
      <ul>${links(USES)}</ul>
      <h4 class="footer-sub">Fence types</h4>
      <ul>${links(TYPES)}</ul>
    </div>
    <div>
      <h4>Where we work</h4>
      <ul class="footer-cities">${CITIES.map(c => `<li><a href="${cityHref(c.slug)}">${esc(c.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul><li><a href="/estimate/">Plan &amp; price your fence</a></li><li><a href="/#pricing">Pricing</a></li><li><a href="/service-area/">Service area</a></li>${links(COMPANY)}</ul>
    </div>
    <div class="footer-contact">
      <h4>Talk to Richard</h4>
      <a href="tel:${SITE.tel}" class="footer-phone">${SITE.phone}</a>
      <a href="mailto:${SITE.email}">${SITE.email}</a>
      <p>${SITE.street}<br>${SITE.city}, ${SITE.region} ${SITE.zip}</p>
      <p>7 days &middot; 7:30am&ndash;9pm</p>
    </div>
  </div>
  <div class="container footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Fence Wizards. All rights reserved.</p>
    <p>Umbrella, general liability, commercial auto &amp; workers&rsquo; comp insured. &middot; <a href="/privacy/">Privacy policy</a></p>
  </div>
</footer>`;
}

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/assets/brand/logo-horizontal-800.png`,
  address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: SITE.region, postalCode: SITE.zip, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '07:30', closes: '21:00' }],
  areaServed: CITIES.map(c => ({ '@type': 'City', name: `${c.name}, IN` })),
  priceRange: '$$',
};

/**
 * page: { path, title, description, main, solidHeader, bodyClass, head, scripts, jsonld: [], noindex }
 */
export function layout(page) {
  const canonical = SITE.url + page.path;
  const jsonld = [localBusiness, ...(page.jsonld || [])];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(plain(page.title))}</title>
  <meta name="description" content="${esc(plain(page.description))}">
  <link rel="canonical" href="${canonical}">
  ${page.noindex ? '<meta name="robots" content="noindex">' : ''}
  <meta property="og:type" content="${page.ogType || 'website'}">
  <meta property="og:title" content="${esc(plain(page.title))}">
  <meta property="og:description" content="${esc(plain(page.description))}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${SITE.url}${page.ogImageUrl || `/assets/img/${page.ogImage || 'skyline-panels-indianapolis'}-1600.jpg`}">
  <link rel="icon" href="/assets/brand/mark-fw-800.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <!-- Barlow Condensed stands in for Shuttleblock Narrow Bold Italic until the brand font is licensed -->
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;1,700;1,800;1,900&family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${page.head || ''}
  <link rel="stylesheet" href="/styles.css">
  ${(page.styles || []).map(s => `<link rel="stylesheet" href="${s}">`).join('\n  ')}
  ${jsonld.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n  ')}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>

<a class="skip-link" href="#main">Skip to content</a>

${header({ path: page.path, solid: page.solidHeader })}

<main id="main"${page.mainClass ? ` class="${page.mainClass}"` : ''}>
${page.main}
</main>

${page.hideFooter ? '' : footer()}

<script src="/js/main.js"></script>
${(page.scripts || []).join('\n')}
</body>
</html>
`;
}
