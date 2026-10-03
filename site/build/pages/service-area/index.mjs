import { pageHero, intro, features, faq, related, quoteCta, md, paras, esc } from '../../lib/components.mjs';
import { SITE, CITIES, cityHref } from '../../lib/site.mjs';
import { areaMap } from '../../lib/area-map.mjs';
import { milesFromIndy } from '../../../public/js/pricing.js';

const towns = CITIES.map(c => ({ ...c, miles: Math.round(milesFromIndy(c.lat, c.lng)) }));

const townsSection = `<section class="section tone-dark area towns" id="towns">
  <div class="container area-grid">
    <div class="area-copy">
      <p class="eyebrow"><span class="slash" aria-hidden="true"></span>Towns we cover</p>
      <h2>Nineteen towns, *and everywhere between.*</h2>
      ${paras(['These are the places we say out loud that we work. They aren\'t the only ones, and a job between two of them is a normal call for us to take.'])}
      <ul class="town-grid">
        ${towns.map(c => `<li><a href="${cityHref(c.slug)}"><strong>${esc(c.name)}</strong><span>${esc(c.county)} · ${c.miles < 3 ? 'downtown' : `~${c.miles} mi`}</span></a></li>`).join('\n        ')}
      </ul>
    </div>
    ${areaMap()}
  </div>
</section>`.replace('*and everywhere between.*', '<em>and everywhere between.</em>');

const findUs = `<section class="section tone-white find-us light">
  <div class="container find-grid">
    <div>
      <p class="eyebrow dark"><span class="slash" aria-hidden="true"></span>Home base</p>
      <h2>Eighty miles *from here.*</h2>
      ${paras(['We\'re based in Greenwood. The radius reaches Bloomington, Lafayette, Muncie, Anderson, Terre Haute and Richmond.'])}
      <dl class="find-facts">
        <div><dt>Address</dt><dd>${SITE.street}<br>${SITE.city}, ${SITE.region} ${SITE.zip}</dd></div>
        <div><dt>Hours</dt><dd>Open 7:30am to 9pm, seven days</dd></div>
        <div><dt>Phone</dt><dd><a href="tel:${SITE.tel}">${SITE.phone}</a></dd></div>
        <div><dt>On Google</dt><dd><a href="${SITE.mapsUrl}" target="_blank" rel="noopener">${SITE.rating.value} from ${SITE.rating.count} reviews</a></dd></div>
      </dl>
    </div>
    <div class="map-embed">
      <iframe title="Map to Fence Wizards in Greenwood, Indiana" src="https://www.google.com/maps?q=Fence+Wizards+Rent+A+Fence,+1176+Newark+Ct,+Greenwood,+IN+46143&amp;output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </div>
  </div>
</section>`.replace('*from here.*', '<em>from here.</em>');

export default {
  path: '/service-area/',
  title: 'Temporary Fence Rental Service Area | Indianapolis and Central Indiana',
  description: 'Fence Wizards covers the Indianapolis metro and 80 miles around downtown from a yard in Greenwood, Indiana. Nineteen towns named.',
  ogImage: 'skyline-panels-indianapolis',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area' }],
      eyebrow: 'Service area',
      title: 'Temporary fence rental *across the Indianapolis metro.*',
      lede: 'Out of Greenwood, covering central Indiana in every direction from downtown.',
      image: 'skyline-panels-indianapolis',
      imageAlt: 'Temporary fence panels with the Indianapolis skyline behind',
    }),

    intro({
      lead: 'Indianapolis, plus roughly 80 miles in every direction.',
      paras: ['We\'re based in Greenwood, just south of Indianapolis, and we cover the metro plus roughly an 80-mile radius of downtown. That reaches Bloomington to the south, Lafayette to the northwest, Muncie and Anderson to the northeast, Terre Haute to the west and Richmond to the east.'],
      image: 'city-sidewalk-panels',
      imageAlt: 'Temporary panels along a city sidewalk',
    }),

    townsSection,

    features({
      eyebrow: 'Same service everywhere',
      heading: 'The same service *everywhere in the radius.*',
      intro: 'What changes across the radius is the drive. Not the fence, and not the way it\'s priced.',
      cols: 2,
      tone: 'paper',
      items: [
        { label: 'Who calls', title: 'Business to business', text: 'Ninety-nine percent of this work is business to business: project managers, superintendents, demolition contractors, event planners, and procurement agents buying for a municipality, a university, a corporate campus or a commercial property. Emergency restoration companies make up a large share of it, and those calls arrive with no notice at all.' },
        { label: 'What goes on the ground', title: 'Four products', text: 'Panels and stands for sites that change and for events on a tight window. Post-driven chain link where a perimeter has to hold overnight and for months. Windscreen for privacy, dust control and, printed, signage the length of the site. Barricades for queue lines, stage fronts and vehicle separation.' },
        { label: 'What the distance changes', title: 'Only the drive', text: 'On a job at the outer edge of the radius, that shows up in the number, and we say so on the call rather than folding it into a vague figure.' },
        { label: 'What never changes', title: 'Lead time and a flat fee', text: '24 to 48 hours is the normal lead time everywhere, and emergency work moves faster. One flat fee, with the removal already included, wherever the site is.' },
      ],
    }),

    findUs,

    faq({
      heading: 'Questions about *the radius.*',
      intro: 'What the distance does and doesn\'t change, answered plainly.',
      items: [
        { q: 'How far do you actually travel?', a: 'The Indianapolis metro plus roughly 80 miles around downtown, run out of Greenwood. That radius reaches Bloomington, Lafayette, Muncie, Anderson, Terre Haute and Richmond.' },
        { q: 'Is the lead time longer further out?', a: 'Not usually. 24 to 48 hours is the normal window across the radius, and emergency work moves faster wherever it is. What the distance changes is the drive, and that shows up in the number rather than in the schedule.' },
        { q: 'My project is between two of the towns you name. Is that a problem?', a: 'No, that\'s a normal call for us. The named towns are the places we say out loud that we work, not a list of the only addresses we\'ll drive to.' },
        { q: 'What if I\'m just outside the 80 miles?', a: 'Call and ask. The answer is usually yes, and it costs nothing to find out.' },
        { q: 'Do you keep material at more than one yard?', a: 'No. One operation, based in Greenwood, and the trucks and the material are ours rather than allocated out of a regional pool that has other markets to serve first. That\'s why an emergency call gets answered by the person who can send the truck.' },
      ],
    }),

    related({ current: '/service-area/', cities: ['avon', 'brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette'] }),

    quoteCta({ eyebrow: 'Anywhere in the radius', heading: 'Where is *the project?*', text: 'Give us the address and the run, and Richard will price it on the call.' }),
  ].join('\n'),
};
