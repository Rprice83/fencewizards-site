import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/carmel/',
  title: 'Temporary Fence Rental in Carmel, IN | Fence Wizards',
  description: 'Screened temporary fence for Carmel job sites on Range Line Road and in the Arts and Design District. Panels, driven chain link, windscreen. Flat fee.',
  ogImage: 'green-windscreen-lot',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Carmel' }],
      eyebrow: 'Service area · Hamilton County',
      title: 'Temporary fence rental *in Carmel.*',
      lede: 'Where the standard for how a site looks from the street is higher than average.',
      image: 'green-windscreen-lot',
      imageAlt: 'Green windscreen on fence lining both sides of a paved lot',
    }),

    intro({
      lead: 'Carmel is mostly commercial and multi-family construction, and people here expect a job site to look tidy from the street.',
      paras: [
        'Around the Arts and Design District, along Range Line Road and through the roundabout corridors, a job site is looked at by a lot of people who aren\'t working on it.',
      ],
      aside: placeCard({ slug: 'carmel', drive: 'About 35 minutes north on US-31 or I-465', cityLink: { href: 'https://www.carmel.in.gov/', label: 'carmel.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Carmel.*',
      paras: [
        'In practice that means windscreen across a panel run far more often than bare chain link, so the site reads as a project in progress. It also means the line itself has to be straight and the panels upright, because a leaning run in Carmel gets a phone call that a leaning run somewhere else doesn\'t.',
        'Multi-family builds here run months rather than weeks, which usually pushes the answer toward post-driven chain link for the main perimeter, with panels used where access has to flex.',
      ],
      image: 'apartment-build-finished',
      imageAlt: 'Panel fence along a finished two-story apartment building',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'apartment-build-wrapped', alt: 'Panel fence around a two-story apartment building under repair' },
        { name: 'windscreen-lot-run', alt: 'Long run of black windscreen on fence beside a paved drive' },
        { name: 'stacked-panels-site', alt: 'Temporary fence panels on stands around a construction staging area' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Carmel.*',
      intro: 'Four options, and on a Carmel site the screened ones come up most.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Carmel.*',
      intro: 'Screening, long multi-family builds and the drive north.',
      items: [
        { q: 'Do you fit windscreen on Carmel job sites?', a: 'Frequently, and it\'s worth asking for here. A screened run controls dust and gives the site a finished-looking edge. It\'s sold rather than rented, plain or printed with your own mark.' },
        { q: 'Which fence suits a long multi-family build?', a: 'Post-driven chain link for the main perimeter, because it can\'t be lifted at a joint or shoved aside and it holds from mobilization through handover. Panels and stands where access has to change, which on most builds is the delivery side.' },
        { q: 'How long does it take you to reach Carmel?', a: 'Roughly thirty-five minutes from the yard in Greenwood, north on US-31 or around I-465. That\'s comfortably inside our normal 24 to 48 hour window, and more notice always makes for a cleaner install.' },
      ],
    }),

    recentJobs({ town: 'carmel' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, north and south of here.',
      cities: ['fishers', 'noblesville', 'westfield', 'zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg'],
    }),

    related({ current: '/service-area/carmel/', showCities: false }),

    quoteCta({ eyebrow: 'Carmel projects', heading: 'Building *in Carmel?*', text: 'Send the linear feet and the run duration, and Richard will come back with a number.' }),
  ].join('\n'),
};
