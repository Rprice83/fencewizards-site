// The 80-mile service-radius map, drawn from CITIES. Dots link to each town page.
import { CITIES, cityHref } from './site.mjs';
import { esc } from './html.mjs';

const INDY = { lat: 39.7684, lng: -86.1581 };
// 400×400 viewBox, Indy at the center, 80 miles = 170px (≈53 mi per degree of longitude, 69 per degree of latitude)
const pos = c => ({ x: +(200 + (c.lng - INDY.lng) * 112.6).toFixed(1), y: +(200 - (c.lat - INDY.lat) * 146.6).toFixed(1) });
const OUTER = new Set(['lafayette', 'anderson', 'muncie', 'richmond', 'columbus', 'bloomington', 'terre-haute', 'franklin']);

export function areaMap({ linked = true, label = true } = {}) {
  const dots = CITIES.map(c => {
    const p = pos(c);
    const cls = c.slug === 'indianapolis' ? 'indy' : c.slug === 'greenwood' ? 'hq' : '';
    const r = c.slug === 'indianapolis' ? 6 : c.slug === 'greenwood' ? 5 : OUTER.has(c.slug) ? 3.4 : 2.6;
    const dot = `<circle cx="${p.x}" cy="${p.y}" r="${r}"${cls ? ` class="${cls}"` : ''}><title>${esc(c.name)}</title></circle>`;
    return linked ? `<a href="${cityHref(c.slug)}" aria-label="${esc(c.name)}">${dot}</a>` : dot;
  }).join('');
  const labels = label ? CITIES.filter(c => OUTER.has(c.slug)).map(c => {
    const p = pos(c);
    return `<text x="${p.x}" y="${(p.y + (c.slug === 'columbus' || c.slug === 'bloomington' || c.slug === 'terre-haute' || c.slug === 'franklin' ? 15 : -9)).toFixed(1)}">${esc(c.name)}</text>`;
  }).join('') : '';
  const gw = pos(CITIES.find(c => c.slug === 'greenwood'));
  return `<div class="area-map">
      <svg viewBox="0 0 400 400" role="img" aria-label="Map of the 80-mile service radius around downtown Indianapolis">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ED1C24" stop-opacity=".28"/><stop offset="1" stop-color="#ED1C24" stop-opacity="0"/></radialGradient>
          <pattern id="mesh" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0H14M0 0V14" stroke="#fff" stroke-opacity=".06" stroke-width="1"/></pattern>
        </defs>
        <circle cx="200" cy="200" r="190" fill="url(#mesh)"/>
        <circle cx="200" cy="200" r="170" fill="url(#glow)" stroke="#ED1C24" stroke-width="1.5" stroke-dasharray="4 6"/>
        <circle cx="200" cy="200" r="85" fill="none" stroke="#fff" stroke-opacity=".18" stroke-dasharray="2 5"/>
        <text x="200" y="24" class="ring-label">80 MI</text>
        <text x="200" y="110" class="ring-label">40 MI</text>
        <g class="dots">${dots}</g>
        <g class="labels">
          <text x="200" y="188" class="major">INDIANAPOLIS</text>
          <text x="${gw.x + 10}" y="${gw.y + 10}" class="hq-label" style="text-anchor:start">GREENWOOD HQ</text>
          ${labels}
        </g>
      </svg>
    </div>`;
}
