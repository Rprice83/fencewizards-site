import { pageHero, intro, specs, features, faq, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/fence/barricades/',
  title: 'Crowd Control Barricade Rental Indianapolis | Fence Wizards',
  description: 'Interlocking steel crowd control barricade rental across Indianapolis. Queue lines, stage fronts, bars and corporate events, set to your run of show.',
  ogImage: 'barricades-outside-building',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Fence types', href: '/#types' }, { name: 'Crowd-control barricades' }],
      eyebrow: 'Fence types',
      title: 'Crowd-control *barricade rental.*',
      lede: 'Interlocking steel for a line that has to hold, set to your run of show.',
      image: 'barricades-outside-building',
      imageAlt: 'Steel crowd-control barricades lining the outside of a venue',
    }),

    intro({
      lead: 'Barricades are a different job from fencing.',
      paras: [
        'They shape where people stand, queue and cross, and they have to be set where the production plan says rather than dropped in a pile for somebody else to sort out. We deliver interlocking steel barricades across the Indianapolis metro for events, corporate functions, bars, nightclubs and venues.',
      ],
      image: 'barricades-indoor-line',
      imageAlt: 'A line of interlocking steel barricades set up indoors',
    }),

    specs({
      eyebrow: 'The specification',
      heading: 'Crowd-control barricades, *at a glance.*',
      intro: 'What it is, what it\'s for, and the job it\'s the wrong answer to.',
      tone: 'paper',
      image: 'barricades-venue',
      imageAlt: 'Barricades shaping a queue outside a venue',
      rows: [
        ['Type', 'Interlocking steel crowd-control barricade'],
        ['Set', 'Positioned to your plan, not dropped as a pallet'],
        ['Typical uses', 'Queue lines, stage fronts, bar areas, vehicle control'],
        ['Ticket size', 'Smaller than a fence run, priced the same honest way'],
        ['Pairs with', 'Panel runs and windscreen on the same site'],
        ['Schedule', 'Set and struck on your run of show, including overnight'],
        ['Best for', 'Events, venues, corporate functions, nightlife'],
        ['Worth knowing', 'Give us linear feet of line rather than a barricade count and we can price it faster'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where barricades are *the right call.*',
      tone: 'white',
      items: [
        { title: 'Queue and entry lines', text: 'The line into a venue is where crowd problems start. Barricade it properly and the door team can actually work.', image: 'barricades-building-run', imageAlt: 'Barricades forming an entry line along a building' },
        { title: 'Stage and bar fronts', text: 'Interlocking steel takes a crowd leaning on it. Plastic and stanchions don\'t, which is why we don\'t carry them.', image: 'barricades-venue', imageAlt: 'Steel barricades in front of a venue' },
        { title: 'Vehicle and pedestrian separation', text: 'Barricades combined with a panel run keep vehicles and people apart on a site where both are moving at once.', image: 'downtown-lot-barriers', imageAlt: 'Barricades separating a downtown parking lot' },
      ],
    }),

    faq({
      heading: 'Questions on *barricade rental.*',
      intro: 'What buyers ask before they order, including the jobs barricades are the wrong answer to.',
      items: [
        { q: 'What are these actually for?', a: 'Queue lines, stage fronts, bar and beverage areas, and keeping vehicles away from people. They interlock into a line that holds a crowd rather than just marking where the crowd should be.' },
        { q: 'Can I rent barricades without any fence?', a: 'Yes, and plenty of events do. Barricades are their own line and a smaller ticket than a fence run. Tell us the linear footage of the queue or the stage front and we can price it quickly.' },
        { q: 'Do you set them where the plan says, or just drop them off?', a: 'We set them to your plan. Dropping a stack of steel in a parking lot for somebody else\'s crew to sort out isn\'t a delivery, and on event day it\'s the difference between a line that works at doors and one that doesn\'t.' },
        { q: 'Can you work to a production schedule?', a: 'Yes, including overnight and before dawn. Load-in, doors and load-out are the three times the plan follows, rather than a generic install window.' },
        { q: 'Do you supply them indoors as well as outside?', a: 'Yes. Corporate functions, bars, nightclubs and venue interiors are normal work for these, and they go in and out without touching the floor structure.' },
        { q: 'How quickly can you turn an order around?', a: '24 to 48 hours is the normal window, the same as fence. Event work often moves faster than that, so call and tell us the date rather than assuming it\'s too late.' },
      ],
    }),

    gallery({
      images: [
        { name: 'barricades-outside-building', alt: 'Barricades outside a building' },
        { name: 'city-sidewalk-panels', alt: 'Panels along a city sidewalk' },
        { name: 'orange-safety-run', alt: 'Fence run with orange safety mesh' },
        { name: 'winter-site-generator', alt: 'Fenced site with a generator in winter' },
      ],
    }),

    recentJobs({ fenceType: 'barricades' }),


    related({ current: '/fence/barricades/', cities: ['indianapolis', 'lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond'] }),

    quoteCta({ heading: 'Planning an *event?*', text: 'Tell Richard the date, the venue and roughly how many feet of line you need. He takes every inquiry himself.' }),
  ].join('\n'),
};
