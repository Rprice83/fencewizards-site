// Google Ads landing pages (/go/…): hero with one clear next step and a trust strip.
// Pages set `landing: true` (no menu, short footer) and `noindex: true` (kept out of search results and the sitemap;
// Google's ad crawler still reads them). Copy comes from the site's own pages: never invent facts or prices.
import { esc, md } from './html.mjs';
import { img } from './components.mjs';
import { SITE } from './site.mjs';

const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const check = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';

/**
 * primary: 'quote' (Get my price → the form on this page, Call second) or 'call' (Call first, for emergencies)
 * trust: short proof points shown under the buttons
 */
export function landingHero({ eyebrow, title, lede, image, imageAlt = '', primary = 'quote', trust = [] }) {
  const call = cls => `<a href="tel:${SITE.tel}" class="btn ${cls} btn-lg">Call Richard &middot; ${SITE.phone}</a>`;
  const quote = cls => `<a href="#quote" class="btn ${cls} btn-lg">Get my price ${arrow}</a>`;
  const rating = `<li><span class="lp-stars" aria-hidden="true">★★★★★</span> ${esc(SITE.rating.value)} from ${SITE.rating.count} Google reviews</li>`;
  return `<section class="page-hero lp-hero">
  ${img(image, imageAlt, { cls: 'page-hero-img', sizes: '100vw', eager: true })}
  <div class="page-hero-shade" aria-hidden="true"></div>
  <div class="container page-hero-inner">
    ${eyebrow ? `<p class="eyebrow"><span class="slash" aria-hidden="true"></span>${md(eyebrow)}</p>` : ''}
    <h1>${md(title)}</h1>
    ${lede ? `<p class="page-hero-lede">${md(lede)}</p>` : ''}
    <div class="hero-ctas">${primary === 'call' ? call('btn-red') + quote('btn-glass') : quote('btn-red') + call('btn-glass')}</div>
    <ul class="lp-trust">${rating}${trust.map(t => `<li>${check}${md(t)}</li>`).join('')}</ul>
  </div>
</section>`;
}
