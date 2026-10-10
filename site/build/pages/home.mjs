// Homepage: the hand-built design lives in build/partials/home.html; shared pieces are injected here.
import { readFileSync } from 'node:fs';
import { quoteCta } from '../lib/components.mjs';
import { areaMap } from '../lib/area-map.mjs';
import { CITIES, cityHref } from '../lib/site.mjs';
import { esc } from '../lib/html.mjs';

const partial = readFileSync(new URL('../partials/home.html', import.meta.url), 'utf8');

// Single-size homepage images → responsive 800/1600 versions
const responsive = html => html.replace(/<img src="\/assets\/img\/([a-z0-9-]+)\.jpg"/g,
  (_, n) => `<img src="/assets/img/${n}-1600.jpg" srcset="/assets/img/${n}-800.jpg 800w, /assets/img/${n}-1600.jpg 1600w" sizes="(max-width: 900px) 100vw, 40vw" decoding="async"`);

export default {
  path: '/',
  title: 'Temporary Fence Rental Indianapolis | Fence Wizards Rent A Fence',
  description: 'Temporary fence rental across Indianapolis and 80 miles around downtown. Panels, chain link, windscreen and barricades. Flat fee, on site in 24 to 48 hours.',
  ogImage: 'skyline-panels-indianapolis',
  main: () => responsive(partial)
    .replace('{{cityLinks}}', `<ul class="city-list">${CITIES.map(c => `<li><a href="${cityHref(c.slug)}">${esc(c.name)}</a></li>`).join('')}</ul>`)
    .replace('{{areaMap}}', areaMap())
    .replace('{{quoteCta}}', quoteCta({ heading: 'A few answers and *Richard can price it.*', text: 'He handles every inquiry himself and treats nearly all of them as urgent, because in this trade most of them are.' })),
};
