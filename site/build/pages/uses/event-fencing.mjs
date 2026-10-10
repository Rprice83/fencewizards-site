import { pageHero, intro, prose, steps, faq, typeCards, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/event-fencing/',
  title: 'Event Fence and Barricade Rental Indianapolis | Fence Wizards',
  description: 'Event fencing and crowd-control barricades across Indianapolis. Set to your run of show, struck when the event ends. Flat fee, removal included.',
  ogImage: 'event-lawn-tent',
  main: () => [
    pageHero({
      crumbs: [{ name: 'What we fence', href: '/#uses' }, { name: 'Events' }],
      eyebrow: 'Event fencing',
      title: 'Event fencing and crowd-control barricades *in Indianapolis.*',
      lede: 'Set to your load-in times, including overnight, and struck the night the event ends.',
      image: 'event-lawn-tent',
      imageAlt: 'Panel fence on stands across a lawn with event tents in the background',
    }),

    intro({
      lead: 'Event work is a scheduling problem before it is a fencing problem.',
      paras: [
        'We set panel runs, windscreen and crowd-control barricades to the times on your production schedule, including overnight and early morning, and we pull them when the event is over. The quote is flat and covers both ends.',
      ],
      image: 'event-windscreen-tent',
      imageAlt: 'Black windscreen fitted across a panel run in front of a large white tent',
    }),

    prose({
      eyebrow: 'More than a perimeter',
      heading: 'Windscreen turns the perimeter *into signage.*',
      paras: [
        'Windscreen fitted across a panel run gives you privacy and dust control. Printed, the same run becomes a banner the length of the site.',
        'Barricades are the other half of it. Interlocking steel for queue lines, stage fronts, bar areas and vehicle control, delivered and set where your plan says.',
        'We have put temporary fencing on sites for the NBA All-Star Game Google Pixel event, the Final Four, Ball State University, Veterans Affairs, the Social Security Administration and White River State Park. On jobs that size the venue is the end user, and whoever hired us was somebody else working the job.',
      ],
      image: 'printed-windscreen-banners',
      imageAlt: 'Custom printed windscreen banners along a fence beside a street',
      tone: 'paper',
    }),

    steps({
      eyebrow: 'How it runs',
      heading: 'How an event fence job runs, *in five steps.*',
      intro: 'Event fencing runs on a production schedule, so the install and the strike times matter as much as the fence.',
      items: [
        { title: 'Read the run of show', text: 'Load-in, doors and load-out. The fence plan is built around those three times.' },
        { title: 'Walk the footprint', text: 'Where the crowd flows, where vehicles cross the line, and where the fence has to hold rather than just mark.' },
        { title: 'Set on your window', text: 'Including nights and early mornings. Event work happens at inconvenient hours, so we schedule crews for them.' },
        { title: 'Stay on call through the event', text: 'Layouts shift. A gate in the wrong place at doors is a real problem, and we would rather move it than hear about it after.' },
        { title: 'Strike when it ends', text: 'The same night, with the removal already in the price.' },
      ],
    }),

    typeCards({
      heading: 'The fence types *this job uses.*',
      intro: 'Barricades to shape the crowd, panels for the perimeter, windscreen to screen and brand the run.',
      pick: ['barricades', 'panels', 'windscreen'],
      notes: {
        panels: 'Set during load-in and pulled during load-out. Your crew can shift a section by hand.',
        barricades: 'Interlocking steel for queue lines, stage fronts, bar areas and vehicle control, set where your plan says.',
        windscreen: 'Privacy and dust control across a panel run. Printed, it becomes a banner the length of the site.',
      },
      tone: 'steel',
    }),

    faq({
      heading: 'Event fencing *questions.*',
      intro: 'The ones that come up on the phone every week, answered the way Richard answers them.',
      tone: 'white',
      items: [
        { q: 'Can you set fencing overnight or early in the morning?', a: 'Yes. Tell us the load-in window and we work to it, including overnight and before dawn, and plan the crew and the truck around it.' },
        { q: 'Do you supply barricades separately from fencing?', a: 'Yes. Crowd-control barricades are their own line, and plenty of events take barricades without any panel fencing at all. They are a smaller ticket than a fence run, so tell us the linear footage of the queue or the stage front and we can price it quickly.' },
        { q: 'Can you print our sponsors on the windscreen?', a: 'Yes. Custom printed windscreen fits across a panel run and turns the perimeter into a banner the length of the site. On an event it often costs less than separate banners covering the same length. Windscreen is sold, not rented, so it\'s yours afterwards.' },
        { q: 'Do you strike the fence the night the event ends?', a: 'Yes. The removal is already in the price, and a fence still standing the next morning is the venue\'s problem, so we don\'t leave it there.' },
        { q: 'What do you need to quote an event?', a: 'The run of show times for load-in, doors and load-out, the footprint, and roughly how much line you need. Where the crowd flows and where vehicles cross the line matter more than the exact footage, because they decide where the fence has to hold.' },
        { q: 'Have you fenced large venues in Indianapolis?', a: 'Our temporary fencing has been on sites including the NBA All-Star Game Google Pixel event, the Final Four and White River State Park.' },
      ],
    }),

    gallery({
      images: [
        { name: 'barricades-venue', alt: 'Steel barricades lined up inside an open hangar door' },
        { name: 'sidewalk-windscreen', alt: 'Black windscreen on a fence run along a concrete lot beside a building' },
        { name: 'city-sidewalk-panels', alt: 'Panel fence along a city sidewalk with a tent on the lawn behind it' },
      ],
    }),

    recentJobs({ use: 'events' }),


    related({ current: '/event-fencing/', cities: ['westfield', 'zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg'] }),

    quoteCta({}),
  ].join('\n'),
};
