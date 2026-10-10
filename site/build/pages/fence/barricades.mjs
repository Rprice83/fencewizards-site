import { pageHero, intro, specs, features, faq, related, quoteCta, recentJobs } from '../../lib/components.mjs';

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
      imageAlt: 'Steel crowd-control barricades along the outside of a metal building',
    }),

    intro({
      lead: 'Barricades are a different job from fencing.',
      paras: [
        'They shape where people stand, queue and cross, and they have to be set where the production plan says. We deliver interlocking steel barricades across the Indianapolis metro for events, corporate functions, bars, nightclubs and venues.',
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
      imageAlt: 'Steel barricades lined up inside an open hangar door',
      rows: [
        ['Type', 'Interlocking steel crowd-control barricade'],
        ['Set', 'Positioned to your plan, not dropped as a pallet'],
        ['Typical uses', 'Queue lines, stage fronts, bar areas, vehicle control'],
        ['Ticket size', 'Smaller than a fence run, priced the same way'],
        ['Pairs with', 'Panel runs and windscreen on the same site'],
        ['Schedule', 'Set and struck on your run of show, including overnight'],
        ['Best for', 'Events, venues, corporate functions, nightlife'],
        ['Worth knowing', 'Give us the linear feet of line and we can price it faster than from a barricade count'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where barricades are *the right call.*',
      tone: 'white',
      items: [
        { title: 'Queue and entry lines', text: 'The line into a venue is where crowd problems start. Barricade it properly and the door team can do its job.' },
        { title: 'Stage and bar fronts', text: 'Interlocking steel takes a crowd leaning on it. Plastic and stanchions don\'t, which is why we don\'t carry them.' },
        { title: 'Vehicle and pedestrian separation', text: 'Barricades combined with a panel run keep vehicles and people apart on a site where both are moving at once.' },
      ],
    }),

    faq({
      heading: 'Questions on *barricade rental.*',
      intro: 'What buyers ask before they order, including the jobs barricades are the wrong answer to.',
      items: [
        { q: 'What are these for?', a: 'Queue lines, stage fronts, bar and beverage areas, and keeping vehicles away from people. They interlock into a line that holds a crowd in place.' },
        { q: 'Can I rent barricades without any fence?', a: 'Yes, and plenty of events do. Barricades are their own line and a smaller ticket than a fence run. Tell us the linear footage of the queue or the stage front and we can price it quickly.' },
        { q: 'Do you set them where the plan says, or just drop them off?', a: 'We set them to your plan. On event day, barricades placed where the plan says are what make the line work at doors.' },
        { q: 'Can you work to a production schedule?', a: 'Yes, including overnight and before dawn. Load-in, doors and load-out are the three times the plan follows.' },
        { q: 'Do you supply them indoors as well as outside?', a: 'Yes. Corporate functions, bars, nightclubs and venue interiors are normal work for these, and they go in and out without touching the floor structure.' },
        { q: 'How quickly can you turn an order around?', a: '24 to 48 hours is the normal window, the same as fence. If your event is sooner than that, call and tell us the date before assuming it\'s too late.' },
      ],
    }),

    recentJobs({ fenceType: 'barricades' }),


    related({ current: '/fence/barricades/', cities: ['indianapolis', 'lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond'] }),

    quoteCta({ heading: 'Planning an *event?*', text: 'Tell Richard the date, the venue and roughly how many feet of line you need. He takes every inquiry himself.' }),
  ].join('\n'),
};
