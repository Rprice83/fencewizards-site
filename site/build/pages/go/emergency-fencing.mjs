// Google Ads landing page: emergency searches ("emergency temporary fencing", "emergency fence rental"…), call first.
// Also the target for an after-hours emergency call campaign. Copy from /emergency-fencing/ and the FAQ page.
// Not in search results or the sitemap (noindex). No "24/7" claims: hours are 7:30am–9pm, seven days.
import { features, faq, gallery, quoteCta, ctaBand } from '../../lib/components.mjs';
import { landingHero } from '../../lib/landing.mjs';

export default {
  path: '/go/emergency-fencing/',
  title: 'Emergency Fence Rental in Indianapolis | Fence Wizards',
  description: 'Emergency fence rental after a storm, fire or break-in, across Indianapolis and central Indiana. Call Richard and get a real time, not a comfortable one.',
  ogImage: 'demolition-site',
  noindex: true,
  landing: true,
  main: () => [
    landingHero({
      eyebrow: 'Emergency & restoration fencing',
      title: 'Emergency fence rental *across central Indiana.*',
      lede: 'After a storm, a fire or a break-in, call and tell us where it is and how much of it needs closing. Richard answers the phone himself.',
      image: 'demolition-site',
      imageAlt: 'Temporary fence across a parking lot in front of a building with a damaged roof',
      primary: 'call',
      trust: ['No dispatch queue: the owner answers', 'Open 7 days, 7:30am–9pm', 'Fully insured, certificates on request'],
    }),

    features({
      eyebrow: 'Why the small company answers faster',
      heading: 'Built for the call *that came in this morning.*',
      cols: 2,
      tone: 'white',
      items: [
        { title: 'No dispatch queue', text: 'A national branch routes an emergency through a dispatch queue. We don\'t have one. Richard takes the call, and the crew and the material are ours.' },
        { title: 'No measured plan needed', text: 'On day one nobody has a measured plan and we don\'t expect one. Rough linear feet and whether the ground is clear enough to drive posts is enough to price it and get a crew moving.' },
        { title: 'A line today, a firm one after', text: 'Panels and stands go in fastest and can be adjusted once the site is assessed. Post-driven chain link holds the perimeter for the weeks after.' },
        { title: 'Ready for your vendor file', text: 'Umbrella, general liability, commercial auto and workers\' compensation. Restoration companies and property managers ask for certificates before they let anyone on a loss site, and ours are in order.' },
      ],
    }),

    quoteCta({
      eyebrow: 'Not urgent tonight?',
      heading: 'Send the details *instead.*',
      text: 'For anything urgent, call (317) 296-4015. Otherwise, five answers and Richard will get back to you.',
    }),

    gallery({
      images: [
        { name: 'cleared-lot-neighborhood', alt: 'Temporary chain link fence around a cleared lot beside houses' },
        { name: 'winter-site-generator', alt: 'Temporary fence around a snowy building site with work trucks parked inside' },
        { name: 'stacked-panels-site', alt: 'Temporary fence around stacked material wrapped in white beside a building' },
      ],
    }),

    faq({
      heading: 'Emergency fencing *questions.*',
      tone: 'steel',
      items: [
        { q: 'How fast can you get a fence on an emergency site?', a: 'Faster than the standard 24 to 48 hour window, and the honest answer depends on where the site is and what else is on the truck that day. Call and we will tell you a real time rather than a comfortable one, and if we can\'t make it work we will say so on that call.' },
        { q: 'Do you work directly with restoration companies and adjusters?', a: 'Yes, and they are among our most frequent clients. Net 30 terms are normal for accounts we have worked with before.' },
        { q: 'Nobody has measured anything yet. Can you still quote it?', a: 'Yes. Rough linear feet and whether the ground is clear enough to drive posts is enough to price it and get a crew moving.' },
        { q: 'Can you screen a loss site from the street?', a: 'Yes. Windscreen fitted across the run blocks the view into a fire- or storm-damaged property, which matters when the owner is dealing with neighbors and photographs as well as with the damage itself.' },
      ],
    }),

    ctaBand({ heading: 'Site open? *Call Richard.*', text: 'Tell us where it is and how much of it needs closing. We\'ll give you a real time on that call.' }),
  ].join('\n'),
};
