import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/speedway/',
  title: 'Temporary Fence Rental in Speedway, IN | Fence Wizards',
  description: 'Barricades, panels and printed windscreen for Speedway race month and Main Street events, set and struck to your schedule. Flat fee.',
  ogImage: 'event-windscreen-tent',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Speedway' }],
      eyebrow: 'Service area · Marion County',
      title: 'Temporary fence rental *in Speedway.*',
      lede: 'Race month, the Main Street district, and crowd control as the main event.',
      image: 'event-windscreen-tent',
      imageAlt: 'Black windscreen on a panel fence around a white event tent in a parking lot',
    }),

    intro({
      lead: 'Speedway is a crowd-control town, and May is the reason.',
      paras: [
        'The Indianapolis Motor Speedway and everything that happens around it turn a small town into one of the largest gatherings in the country, and the fencing that goes with it is barricades and panel runs rather than construction perimeters: queue lines, vendor rows, hospitality footprints and parking separation.',
      ],
      aside: placeCard({ slug: 'speedway', drive: 'About 30 minutes northwest, around I-465', cityLink: { href: 'https://www.speedwayin.gov/', label: 'speedwayin.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Speedway.*',
      paras: [
        'The Main Street district works the same way on a smaller scale through the rest of the year. Street events, hospitality build-outs and temporary footprints on a public street all need a line that holds a crowd and comes out clean afterwards, set to the times on the plan.',
        'Printed windscreen is worth mentioning here more than anywhere else in the radius. A perimeter around a hospitality area or a vendor row is a surface people are going to look at for a whole weekend, and printing it with a sponsor or a brand costs a fraction of what the same square footage of signage would cost any other way.',
      ],
      image: 'city-sidewalk-panels', // printed-windscreen-banners reads "Hello Crawfordsville", wrong town for this page
      imageAlt: 'Temporary panels along a city sidewalk',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Speedway.*',
      intro: 'The biggest event month in the state, and a town that plans around it.',
    }),

    faq({
      heading: 'Questions we get *about Speedway.*',
      intro: 'Race month, street events and sponsor graphics.',
      items: [
        { q: 'Can you handle event work during race month?', a: 'Yes. Give us the footprint, where the crowd flows, where vehicles cross the line and the times for set and strike, and we plan the crew and the truck around your schedule rather than around office hours.' },
        { q: 'Do you set barricades on a public street?', a: 'Yes. Interlocking steel barricades hold a queue or a crowd edge without touching the surface, indoors or out, and they come out clean when the event is over. Tell us the linear footage of the line and what it\'s holding back and we can price it quickly.' },
        { q: 'Can we put sponsor graphics on the fence?', a: 'Yes, and this is the town to do it in. Custom printed windscreen fits across a panel run and turns the perimeter into a banner the length of the footprint. It\'s sold rather than rented, so it\'s yours afterwards and it goes back up next year.' },
      ],
    }),

    recentJobs({ town: 'speedway' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'More of the radius, all run from the same yard south of the city.',
      cities: ['plainfield', 'avon', 'brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie'],
    }),

    related({ current: '/service-area/speedway/', showCities: false }),

    quoteCta({ eyebrow: 'Speedway projects', heading: 'Fencing something *in Speedway?*', text: 'Give Richard the footprint, where the crowd flows and where vehicles cross.' }),
  ].join('\n'),
};
