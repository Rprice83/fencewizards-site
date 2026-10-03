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
      lede: 'Set on your run of show rather than ours, and pulled the hour the last guest leaves.',
      image: 'event-lawn-tent',
      imageAlt: 'Panel fence on stands across a lawn with event tents in the background',
    }),

    intro({
      lead: 'Event work is a scheduling problem before it is a fencing problem.',
      paras: [
        'We set panel runs, windscreen and crowd-control barricades to the times on your production schedule, including overnight and early morning, and we pull them when the event is over rather than the next business day. The quote is flat and covers both ends.',
      ],
      image: 'event-windscreen-tent',
      imageAlt: 'Black windscreen fitted across a panel run in front of a large white tent',
    }),

    prose({
      eyebrow: 'More than a perimeter',
      heading: 'Windscreen turns the perimeter *into signage.*',
      paras: [
        'Most event fencing is treated as a cost. It doesn\'t have to be. Windscreen fitted across a panel run gives you privacy and dust control, and printed windscreen turns the same run into a banner the length of the site.',
        'Barricades are the other half of it. Interlocking steel for queue lines, stage fronts, bar areas and vehicle control, delivered and set where your plan says rather than dropped in a pile for your crew to sort out.',
        'We have put temporary fencing on sites for the NBA All-Star Game Google Pixel Event, the Final Four, Ball State University, Veterans Affairs, the Social Security Administration and White River State Park. We are naming sites our fence has stood on rather than claiming the venues as customers, because at that scale the venue is the end user and whoever hired us is somebody else.',
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
        { title: 'Read the run of show', text: 'Load-in, doors and load-out. The fence plan follows those three times, not a generic install window.' },
        { title: 'Walk the footprint', text: 'Where the crowd flows, where vehicles cross the line, and where the fence has to hold rather than just mark.' },
        { title: 'Set on your window', text: 'Including nights and early mornings. Event work doesn\'t happen at a convenient hour and we don\'t pretend it does.' },
        { title: 'Stay on call through the event', text: 'Layouts shift. A gate in the wrong place at doors is a real problem, and we would rather move it than hear about it after.' },
        { title: 'Strike when it ends', text: 'Not the following Monday. The removal was already priced.' },
      ],
    }),

    typeCards({
      heading: 'The fence types *this job uses.*',
      intro: 'Barricades to shape the crowd, windscreen to screen and brand the run.',
      pick: ['barricades', 'windscreen'],
      notes: {
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
        { q: 'Can you set fencing overnight or early in the morning?', a: 'Yes. Event schedules are the reason this business is built the way it is. Tell us the load-in window and we work to it, including overnight and before dawn, and we plan the crew and the truck around that rather than around a standard day.' },
        { q: 'Do you supply barricades separately from fencing?', a: 'Yes. Crowd-control barricades are their own line, and plenty of events take barricades without any panel fencing at all. They are a smaller ticket than a fence run, so tell us the linear footage of the queue or the stage front and we can price it quickly.' },
        { q: 'Can you print our sponsors on the windscreen?', a: 'Yes. Custom printed windscreen fits across a panel run and turns the perimeter into a banner the length of the site. On an event it\'s usually the cheapest large-format signage on the job. Windscreen is sold rather than rented, so it\'s yours afterwards.' },
        { q: 'Do you strike the fence the night the event ends?', a: 'Yes, rather than the following Monday. The removal was already inside the price, and an event fence that is still standing the next morning is a problem for the venue rather than for us, which is exactly why we don\'t leave it there.' },
        { q: 'What do you need to quote an event?', a: 'The run of show times for load-in, doors and load-out, the footprint, and roughly how much line you need. Where the crowd flows and where vehicles cross the line matter more than the exact footage, because they decide where the fence has to hold rather than just mark.' },
        { q: 'Have you fenced large venues in Indianapolis?', a: 'Our temporary fencing has been on sites including the NBA All-Star Game Google Pixel Event, the Final Four and White River State Park. We are naming sites our fence has stood on, not claiming the venues as customers, because at that scale the venue is the end user and whoever hired us is somebody else.' },
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
