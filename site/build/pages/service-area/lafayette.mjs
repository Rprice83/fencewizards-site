import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/lafayette/',
  title: 'Temporary Fence Rental in Lafayette, IN | Fence Wizards',
  description: 'Temporary fence rental in Lafayette, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'field-run-two',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Lafayette' }],
      eyebrow: 'Service area · Tippecanoe County',
      title: 'Temporary fence rental *in Lafayette.*',
      lede: 'Industrial ground, long runs, and fewer gates than a city job.',
      image: 'field-run-two',
      imageAlt: 'Chain link fence running across an open grass field',
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
        'That changes the shape of the job. A Lafayette perimeter is usually a long run on open ground rather than a tight line squeezed against a sidewalk, which means fewer gates, more linear feet, and a stronger case for post-driven chain link, because nothing needs to move once it is set.',
        'Distance is real, and we price it openly rather than folding it into a vague number. A job that far out is also better planned than improvised: one well-organized install beats three trips, so the more of the site plan we see before the truck loads, the better the day goes.',
      ],
      image: 'yard-tractor-panels',
      imageAlt: 'Panel fence across a paved truck yard with a yard tractor parked behind it',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Lafayette.*',
      intro: 'Four options, and long open runs up here usually want the driven one.',
    }),

    faq({
      heading: 'Questions we get *about Lafayette.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you cover West Lafayette as well as Lafayette?', a: 'Yes. Both sides of the Wabash are inside the radius. Institutional work around the university and industrial work along the I-65 corridor are the two things we see most up there.' },
        { q: 'Why do you recommend post-driven fence for these sites?', a: 'Because Lafayette jobs tend to be long runs on open ground that stay put for months. A driven line cannot be lifted at a joint or shoved aside, and when nothing needs to move, the extra install time buys a perimeter that actually holds.' },
        { q: 'Does the distance change what I pay?', a: 'It is part of the number, and we say so on the call rather than hiding it. Everything else about the quote is the same as it is in the metro: one flat fee, with the removal already included.' },
      ],
    }),

    recentJobs({ town: 'lafayette' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, mostly south and east of here. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers'],
    }),

    related({ current: '/service-area/lafayette/', showCities: false }),

    quoteCta({ eyebrow: 'Lafayette projects', heading: 'Site *in Lafayette?*', text: 'Send the site plan if you have one. A planned install beats three trips.' }),
  ].join('\n'),
};
