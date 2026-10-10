// Google Ads landing pages (/go/…): hero with one clear next step and a trust strip.
// Pages set `landing: true` (no menu, short footer) and `noindex: true` (kept out of search results and the sitemap;
// Google's ad crawler still reads them). Copy comes from the site's own pages: never invent facts or prices.
import { esc, md } from './html.mjs';
import { img } from './components.mjs';
import { SITE } from './site.mjs';

const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11m-4-4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const check = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>';

/**
 * primary: 'quote' (Get my quote → the form on this page, Call second) or 'call' (Call first, for emergencies)
 * trust: short proof points shown under the buttons
 */
export function landingHero({ eyebrow, title, lede, image, imageAlt = '', primary = 'quote', trust = [] }) {
  const call = cls => `<a href="tel:${SITE.tel}" class="btn ${cls} btn-lg">Call Richard &middot; ${SITE.phone}</a>`;
  const quote = cls => `<a href="#quote" class="btn ${cls} btn-lg">Get my quote ${arrow}</a>`;
  // One star, not five: five full stars next to a 4.6 average overstates it. Links to Richard's Google profile.
  const rating = `<li><a href="${SITE.mapsUrl}" target="_blank" rel="noopener" style="color:inherit"><span class="lp-stars" aria-hidden="true">★</span> ${esc(SITE.rating.value)} on Google &middot; ${SITE.rating.count} reviews</a></li>`;
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

/**
 * Closing band for landing pages (same markup/classes as ctaBand() in components.mjs), but with one action:
 * the quote form on this page (#quote) + Call. No estimator button here; the estimator stays reachable
 * through the text link in quoteCta.
 * callFirst: true makes Call the red button and drops the quote button (emergency page).
 */
export function landingCtaBand({ heading = 'Fence on site in *24 to 48 hours.*', text = 'Five answers and Richard prices it himself. He replies within 24 hours, usually the same day.', callFirst = false } = {}) {
  const actions = callFirst
    ? `<a href="tel:${SITE.tel}" class="btn btn-red btn-lg">Call Richard &middot; ${SITE.phone}</a>`
    : `<a href="#quote" class="btn btn-red btn-lg">Get my quote ${arrow}</a>
      <a href="tel:${SITE.tel}" class="btn btn-glass btn-lg">Call ${SITE.phone}</a>`;
  return `<section class="cta-band">
  <div class="container cta-band-inner">
    <div><h2>${md(heading)}</h2><p>${md(text)}</p></div>
    <div class="cta-band-actions">
      ${actions}
    </div>
  </div>
</section>`;
}
