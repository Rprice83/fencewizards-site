import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/lafayette/',
  title: 'Temporary Fence Rental in Lafayette, IN | Fence Wizards',
  description: 'Temporary fence in Lafayette and West Lafayette for long industrial and Purdue-area runs. Post-driven chain link, one flat fee, removal included.',
  ogImage: 'yard-tractor-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Lafayette' }],
      eyebrow: 'Service area · Tippecanoe County',
      title: 'Temporary fence rental *in Lafayette.*',
      lede: 'Industrial ground, long runs, and fewer gates than a city job.',
      image: 'yard-tractor-panels',
      imageAlt: 'Panel fence across a paved truck yard with a yard tractor parked behind it',
    }),

    intro({
      lead: 'Lafayette and West Lafayette sit at the northwest edge of what we cover, about an hour and a quarter up I-65.',
      paras: [
        'The work there is industrial and institutional rather than urban infill: plants and distribution along the I-65 corridor, and the institutional building that comes with Purdue on the other side of the Wabash.',
      ],
      aside: placeCard({ slug: 'lafayette', drive: 'About an hour and a quarter northwest on I-65', cityLink: { href: 'https://www.lafayette.in.gov/', label: 'lafayette.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Lafayette.*',
      paras: [
        'That changes the shape of the job. A Lafayette perimeter is usually a long run on open ground rather than a tight line squeezed against a sidewalk, which means fewer gates, more linear feet, and a stronger case for post-driven chain link, because nothing needs to move once it\'s set.',
        'A job that far out is better planned than improvised, so the more of the site plan we see before the truck loads, the better the day goes.',
      ],
      image: 'distribution-warehouse-panels',
      imageAlt: 'Panel fence on sandbagged stands across a paved lot in front of warehouse loading docks',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Lafayette.*',
      intro: 'Four options, and long open runs up here usually want the driven one.',
    }),

    faq({
      heading: 'Questions we get *about Lafayette.*',
      intro: 'West Lafayette, driven fence and the distance.',
      items: [
        { q: 'Do you cover West Lafayette as well as Lafayette?', a: 'Yes. Both sides of the Wabash are inside the radius. Institutional work around the university and industrial work along the I-65 corridor are the two things we see most up there.' },
        { q: 'Why do you recommend post-driven fence for these sites?', a: 'Because Lafayette jobs tend to be long runs on open ground that stay put for months. A driven line can\'t be lifted at a joint or shoved aside, and when nothing needs to move, the extra install time buys a perimeter that holds.' },
        { q: 'Does the distance change what I pay?', a: 'Yes. Jobs more than 50 driving miles from downtown Indianapolis carry a distance charge, and we say so on the call. Everything else is the same as in the metro: one flat fee, removal included.' },
      ],
    }),

    recentJobs({ town: 'lafayette' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, mostly south and east of here.',
      cities: ['muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers'],
    }),

    related({ current: '/service-area/lafayette/', showCities: false }),

    quoteCta({ eyebrow: 'Lafayette projects', heading: 'Site *in Lafayette?*', text: 'Send the site plan if you have one, and the truck leaves loaded for the whole job.' }),
  ].join('\n'),
};
