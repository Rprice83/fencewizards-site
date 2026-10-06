// Google Ads landing page: event + barricade searches ("outdoor event fencing", "event fencing rental near me",
// "temporary fencing for events", "crowd control barricades rental"…), the ad group Google scored 1/10.
// Copy from /event-fencing/, /fence/barricades/ and the FAQ page. Not in search results or the sitemap (noindex).
import { features, prose, faq, gallery, quoteCta, ctaBand } from '../../lib/components.mjs';
import { landingHero } from '../../lib/landing.mjs';

export default {
  path: '/go/event-fencing-barricades/',
  title: 'Event Fencing and Barricade Rental in Indianapolis | Fence Wizards',
  description: 'Event fencing and crowd-control barricade rental in Indianapolis. Set on your run of show, struck when the event ends. Flat fee, removal included.',
  ogImage: 'event-lawn-tent',
  noindex: true,
  landing: true,
  main: () => [
    landingHero({
      eyebrow: 'Event fencing & barricades',
      title: 'Event fencing and barricade rental *in Indianapolis.*',
      lede: 'Panel fence, crowd-control barricades and windscreen, set on your run of show rather than ours, and pulled the hour the last guest leaves.',
      image: 'event-lawn-tent',
      imageAlt: 'Panel fence on stands across a lawn with event tents in the background',
      trust: ['Overnight and early-morning installs', 'One flat price, removal included', 'Fully insured, certificates on request'],
    }),

    quoteCta({
      eyebrow: 'Get a price',
      heading: 'Tell us about *the event.*',
      text: 'Load-in, doors and load-out, the footprint, and roughly how much line you need. Richard prices it himself.',
    }),

    features({
      eyebrow: 'Built for event schedules',
      heading: 'Event work is a scheduling problem *before it is a fencing problem.*',
      cols: 2,
      tone: 'white',
      items: [
        { title: 'Set on your window', text: 'We set panel runs, windscreen and barricades to the times on your production schedule, including overnight and early morning.' },
        { title: 'Barricades on their own', text: 'Interlocking steel for queue lines, stage fronts, bar areas and vehicle control. Plenty of events take barricades without any panel fencing at all.' },
        { title: 'Windscreen that works as signage', text: 'Privacy and dust control across a panel run. Custom printed, it turns the perimeter into a banner the length of the site, and it\'s yours to keep.' },
        { title: 'Struck when it ends', text: 'Not the following Monday. The removal was already inside the price, agreed before the first panel goes up.' },
      ],
    }),

    prose({
      eyebrow: 'Where our fence has stood',
      heading: 'Large events *in Indianapolis.*',
      paras: [
        'We have put temporary fencing on sites for the NBA All-Star Game Google Pixel Event, the Final Four, Ball State University, Veterans Affairs, the Social Security Administration and White River State Park. We are naming sites our fence has stood on rather than claiming the venues as customers, because at that scale the venue is the end user and whoever hired us is somebody else.',
      ],
      image: 'printed-windscreen-banners',
      imageAlt: 'Custom printed windscreen banners along a fence beside a street',
      tone: 'paper',
    }),

    gallery({
      images: [
        { name: 'barricades-venue', alt: 'Steel barricades lined up inside an open hangar door' },
        { name: 'event-windscreen-tent', alt: 'Black windscreen fitted across a panel run in front of a large white tent' },
        { name: 'barricades-outside-building', alt: 'Steel crowd-control barricades lining the outside of a venue' },
      ],
    }),

    faq({
      heading: 'Event fencing *questions.*',
      tone: 'steel',
      items: [
        { q: 'Can you set fencing overnight or early in the morning?', a: 'Yes. Event schedules are the reason this business is built the way it is. Tell us the load-in window and we work to it, including overnight and before dawn.' },
        { q: 'Can I rent barricades without any fence?', a: 'Yes, and plenty of events do. Barricades are their own line. Tell us the linear footage of the queue line or the stage front and we can price it quickly.' },
        { q: 'Can you print our sponsors on the windscreen?', a: 'Yes. Custom printed windscreen fits across a panel run and turns the perimeter into a banner the length of the site. Windscreen is sold rather than rented, so it\'s yours afterwards.' },
        { q: 'What do you need to quote an event?', a: 'The run of show times for load-in, doors and load-out, the footprint, and roughly how much line you need. Where the crowd flows and where vehicles cross the line matter more than the exact footage.' },
      ],
    }),

    ctaBand({ heading: 'Set on your *run of show.*' }),
  ].join('\n'),
};
