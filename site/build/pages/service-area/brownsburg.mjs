import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/brownsburg/',
  title: 'Temporary Fence Rental in Brownsburg, IN | Fence Wizards',
  description: 'Barricades and panels for Brownsburg race weekends, plus construction fence along I-74. Flat fee, removal included, on site in 24 to 48 hours.',
  ogImage: 'barricades-building-run',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Brownsburg' }],
      eyebrow: 'Service area · Hendricks County',
      title: 'Temporary fence rental *in Brownsburg.*',
      lede: 'Motorsport weekends on the west side, and steady commercial growth around them.',
      image: 'barricades-building-run',
      imageAlt: 'Steel crowd-control barricades along the side of a large metal building',
    }),

    intro({
      lead: 'Brownsburg has a motorsport calendar next door and a construction calendar of its own.',
      paras: [
        'Event weekends at the raceway park bring crowds, vendor rows and parking that all need separating, and that work is barricades and panel runs set to a schedule rather than to a normal install window. It comes out when the weekend is over.',
      ],
      aside: placeCard({ slug: 'brownsburg', drive: 'About 40 minutes northwest, around I-465 to I-74', cityLink: { href: 'https://www.brownsburg.org/', label: 'brownsburg.org' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Brownsburg.*',
      paras: [
        'The rest of the year it\'s Hendricks County growth. Commercial building along the I-74 corridor and residential development around the town both produce ordinary construction perimeters, and Brownsburg sits close enough to the interstate that getting a truck there inside the standard 24 to 48 hour window is straightforward.',
        'The town itself is the third case. Work around Green Street and the older center has the same problem every established downtown has: the sidewalk has to stay usable and the perimeter is on public view until the work is done. Screened panel runs handle both.',
      ],
      image: 'truck-and-panels',
      imageAlt: 'Fence Wizards pickup with a trailer stacked with fence panels',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'apartment-build-wrapped', alt: 'Panel fence around a two-story apartment building under repair' },
        { name: 'orange-safety-grass', alt: 'Chain link with orange safety mesh around a graded dirt lot' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Brownsburg.*',
      intro: 'Race weekends, and a town building hard the rest of the year.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Brownsburg.*',
      intro: 'Race weekends, drive time, and the houses going up.',
      items: [
        { q: 'Can you handle crowd control for a race weekend?', a: 'Yes. Interlocking steel barricades do queue lines, vendor rows and vehicle separation, and panel runs handle the long edges and the parking. Give us the times for set and strike and the footprint, and we work to that schedule.' },
        { q: 'How fast can you reach Brownsburg?', a: '24 to 48 hours is the normal window and Brownsburg is comfortably inside it, about forty minutes from the yard around I-465 and out I-74. Emergency work moves faster than that, and the exact timing depends on what else is on the truck that day.' },
        { q: 'Do you work on residential developments here?', a: 'Yes, on the construction side. We fence the site while the houses go up. We don\'t fence finished yards, and we don\'t install permanent fence, repair fences or automate gates.' },
      ],
    }),

    recentJobs({ town: 'brownsburg' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'More of the towns we cover, out of the Greenwood yard.',
      cities: ['franklin', 'columbus', 'bloomington', 'lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond'],
    }),

    related({ current: '/service-area/brownsburg/', showCities: false }),

    quoteCta({ eyebrow: 'Brownsburg projects', heading: 'Job *in Brownsburg?*', text: 'Give Richard the footprint, the gates and the set and strike times.' }),
  ].join('\n'),
};
