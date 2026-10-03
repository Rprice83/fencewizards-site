import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/anderson/',
  title: 'Temporary Fence Rental in Anderson, IN | Fence Wizards',
  description: 'Temporary fence rental in Anderson, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'demolition-site',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Anderson' }],
      eyebrow: 'Service area · Madison County',
      title: 'Temporary fence rental *in Anderson.*',
      lede: 'Demolition and redevelopment, where the perimeter is also a dust problem.',
      image: 'demolition-site',
      imageAlt: 'Temporary fence around a demolition site',
    }),

    intro({
      lead: 'Anderson is about fifty minutes northeast on I-69, a straightforward run from Greenwood.',
      paras: [
        'Madison County has a lot of older industrial and commercial buildings coming down and being replaced, and demolition is a different fencing problem from new construction.',
      ],
      aside: placeCard({ slug: 'anderson', drive: 'About 50 minutes northeast on I-69', cityLink: { href: 'https://www.cityofanderson.com/', label: 'cityofanderson.com' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Anderson.*',
      paras: [
        'A demolition perimeter has to do three things at once. It has to keep people out of a site that is genuinely dangerous, it has to hold while heavy equipment works next to it, and it has to control what blows off the site and what the street can see. That last part is why so much Anderson work gets windscreen fitted across the run.',
        'The other Anderson pattern is the long hold. A cleared lot often sits fenced for months between demolition and whatever replaces it, and that is post-driven chain link territory. A driven line will still be standing and still be tight after a winter; a panel run that nobody is watching will not.',
      ],
      image: 'cleared-lot-neighborhood',
      imageAlt: 'Chain link around a cleared lot in a neighborhood',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Anderson.*',
      intro: 'Four options, and a demolition perimeter usually takes two of them at once.',
    }),

    faq({
      heading: 'Questions we get *about Anderson.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you fence demolition sites?', a: 'Yes, and it\'s a regular part of what we do in Madison County. A demolition perimeter needs to hold against heavy equipment working beside it, and usually wants windscreen across the run for dust and for what the street sees.' },
        { q: 'What if the lot sits empty for months after the demolition?', a: 'Then it wants post-driven chain link rather than panels. A driven line stays tight through a winter with nobody watching it, on the same flat fee with removal already included.' },
        { q: 'How far is Anderson from your yard?', a: 'About fifty minutes up I-69 from Greenwood, well inside the 80-mile radius. Normal lead time is the same 24 to 48 hours, and we take emergency calls there faster than that.' },
      ],
    }),

    recentJobs({ town: 'anderson' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, out from Madison County. If your project sits between two of them, or past the edge, call and ask rather than assuming the answer is no.',
      cities: ['terre-haute', 'richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield'],
    }),

    related({ current: '/service-area/anderson/', showCities: false }),

    quoteCta({ eyebrow: 'Anderson projects', heading: 'Demolition or redevelopment *in Anderson?*', text: 'Tell Richard what\'s coming down and how long the lot sits after.' }),
  ].join('\n'),
};
