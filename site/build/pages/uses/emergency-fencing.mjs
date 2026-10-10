import { pageHero, intro, prose, steps, faq, typeCards, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/emergency-fencing/',
  title: 'Emergency and Restoration Fence Rental Indiana | Fence Wizards',
  description: 'Emergency fence rental after a storm, fire, break-in or structural loss, across central Indiana. Call Richard for a real arrival time.',
  ogImage: 'demolition-site',
  main: () => [
    pageHero({
      crumbs: [{ name: 'What we fence', href: '/#uses' }, { name: 'Emergency & restoration' }],
      eyebrow: 'Emergency and restoration fencing',
      title: 'Emergency and restoration fence rental *across central Indiana.*',
      lede: 'For the call that came in this morning, from a site that was fine yesterday.',
      image: 'demolition-site',
      imageAlt: 'Temporary fence across a parking lot in front of a building with a collapsed roof',
    }),

    intro({
      lead: 'After a storm, a fire, a break-in or a structural loss, the perimeter is the first thing an adjuster and a restoration contractor both need.',
      paras: [
        'We take emergency fencing calls across the Indianapolis metro and within roughly 80 miles of downtown. Call and tell us where it is and how much of it needs closing.',
      ],
      image: 'cleared-lot-neighborhood',
      imageAlt: 'Panel fence on stands along a lot beside houses',
    }),

    prose({
      eyebrow: 'Why it matters who answers',
      heading: 'Why the small company *answers faster.*',
      paras: [
        'A national branch routes an emergency through a dispatch queue. We don\'t have one. Richard takes the call and sends our own crew and our own material.',
        'That matters most in the first day. Securing a loss site quickly limits further damage and keeps people out, and every hour the site sits open is an hour of exposure for whoever owns it.',
        'We carry umbrella, general liability, commercial auto and workers\' compensation insurance. Restoration companies and property managers ask for certificates before they let anyone on a loss site, and ours are in order.',
      ],
      image: 'winter-site-generator',
      imageAlt: 'Temporary fence around a snowy building site with work trucks parked inside',
      tone: 'paper',
    }),

    steps({
      eyebrow: 'How it runs',
      heading: 'How an emergency fence call runs, *in five steps.*',
      intro: 'On day one nobody has a measured plan, so the order below starts with what you can tell us on the phone.',
      items: [
        { title: 'Call, don\'t email', text: 'On emergency work the phone is faster, and Richard answers it himself.' },
        { title: 'Tell us what is open', text: 'Rough linear feet and whether the ground is clear enough to drive posts.' },
        { title: 'We set what we can first', text: 'Panels and stands go in fastest and can be adjusted once the site is assessed properly.' },
        { title: 'We firm the line up after', text: 'Post-driven chain link where the perimeter has to hold for weeks, and windscreen where a loss site needs to be screened from the street.' },
        { title: 'We adjust as the work moves', text: 'Restoration sites change constantly. Change orders on site are normal. Call and we come out, so your crew isn\'t working around the fence.' },
      ],
    }),

    typeCards({
      heading: 'The fence types *this job uses.*',
      intro: 'Panels close the line on day one. Post-driven chain link holds it for the weeks after.',
      pick: ['driven', 'panels', 'windscreen'],
      notes: {
        driven: 'For a loss site that has to stay shut for weeks while the restoration work runs.',
        panels: 'The fastest line we can set, and easy to adjust once the site has been assessed.',
        windscreen: 'Screens a loss site from the street. Sold, not rented, so it stays with the property.',
      },
      tone: 'steel',
    }),

    faq({
      heading: 'Emergency fencing *questions.*',
      intro: 'The ones that come up on the phone every week, answered the way Richard answers them.',
      tone: 'white',
      items: [
        { q: 'How fast can you get a fence on an emergency site?', a: 'Faster than the standard 24 to 48 hour window. Exactly how fast depends on where the site is and what else is on the truck that day. Call and we will give you a real time, and if we can\'t make it work we will say so on that call.' },
        { q: 'Do you work directly with restoration companies?', a: 'Yes, and they are among our most frequent clients. Emergency restoration companies, their project managers and procurement agents make up a large share of this work, and Net 30 terms are normal for accounts we have worked with before.' },
        { q: 'Can you send a certificate of insurance before we let you on the site?', a: 'Yes, and we expect to be asked. The commercial package is umbrella, general liability, commercial auto and workers\' compensation. Tell us the limits your vendor file requires and we will confirm them before the job.' },
        { q: 'Nobody has measured anything yet. Can you still quote it?', a: 'Yes, and we don\'t expect a measured plan on day one. Rough linear feet and whether the ground is clear enough to drive posts is enough to price it and get a crew moving.' },
        { q: 'Can you screen a loss site from the street?', a: 'Yes. Windscreen fitted across the run blocks the view into a fire- or storm-damaged property, which matters when the owner is dealing with neighbors and photographs as well as with the damage itself. Windscreen is sold, not rented, so it stays with the property.' },
        { q: 'What if the perimeter has to change as the work moves?', a: 'That is normal on restoration sites. Call and we come out to move it. Panels get a line closed on day one, and post-driven chain link firms it up where the perimeter has to hold for weeks.' },
      ],
    }),

    gallery({
      images: [
        { name: 'stacked-panels-site', alt: 'Temporary fence around stacked material wrapped in white beside a building' },
        { name: 'street-frontage-panels', alt: 'Panel fence along the edge of an apartment parking lot' },
        { name: 'truck-trailer-load', alt: 'Fence Wizards pickup truck and trailer loaded with fence panels in a gravel lot' },
      ],
    }),

    recentJobs({ use: 'emergency' }),


    related({ current: '/emergency-fencing/', cities: ['brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie'] }),

    quoteCta({}),
  ].join('\n'),
};
