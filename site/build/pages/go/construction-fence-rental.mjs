// Google Ads landing page: construction searches ("construction fence rental", "temporary fencing for construction sites"…)
// Copy from /construction-fencing/ and the FAQ page. Not in search results or the sitemap (noindex).
import { features, faq, gallery, quoteCta } from '../../lib/components.mjs';
import { landingHero, landingCtaBand } from '../../lib/landing.mjs';

export default {
  path: '/go/construction-fence-rental/',
  title: 'Construction Fence Rental in Indianapolis | Fence Wizards',
  description: 'Construction site fence rental across Indianapolis: panels, post-driven chain link, gates and windscreen. One flat price, removal included.',
  ogImage: 'stacked-panels-site',
  noindex: true,
  landing: true,
  main: () => [
    landingHero({
      eyebrow: 'Construction & job site fencing',
      title: 'Construction fence rental *in Indianapolis.*',
      lede: 'Temporary fencing for construction sites, usually set within 24 to 48 hours of the call. When a gate has to move or a run has to be added, general contractors get us back out the same day. The price is agreed before the first panel goes in, and it covers removal at the end.',
      image: 'stacked-panels-site',
      imageAlt: 'Temporary fence panels on stands around a construction staging area',
      trust: ['One flat price, removal included', 'Same-day moves for general contractors', 'Fully insured, certificates on request'],
    }),

    quoteCta({
      eyebrow: 'Get a price',
      heading: 'A number you can put *in a bid.*',
      text: 'Five answers and Richard can price it. He takes every inquiry himself.',
    }),

    features({
      eyebrow: 'Why contractors call Richard',
      heading: 'A perimeter that moves *as fast as your schedule.*',
      cols: 2,
      tone: 'white',
      items: [
        { title: 'Verbal number first, proposal after', text: 'One call gets you a verbal number, and the written proposal follows. Both come from Richard, the person who prices the job.' },
        { title: 'Job site fencing that moves with the site', text: 'When a gate has to move or a run has to be added, we come back out the same day. Fencing is in somebody\'s way at least once on every project.' },
        { title: 'No rent clock', text: 'The rental is a flat fee agreed before the install, and it doesn\'t keep running if your project runs long. There is no charge to collect the fence at the end.' },
        { title: 'Paperwork in order', text: 'Net 30 is normal for clients we have worked with. Smaller or new accounts pay up front, and we say so on the first call. Certificates of insurance for your vendor file: umbrella, general liability, commercial auto and workers\' compensation.' },
      ],
    }),

    gallery({
      eyebrow: 'On the job',
      heading: 'Panels, chain link *and gates.*',
      images: [
        { name: 'school-building-panels', alt: 'Panel fence with gates around a school building project' },
        { name: 'distribution-warehouse-panels', alt: 'Temporary fence run along a distribution warehouse loading area' },
        { name: 'street-frontage-panels', alt: 'Panel fence on sandbagged stands along a parking lot beside a two-story apartment building' },
      ],
    }),

    faq({
      heading: 'Construction fencing *questions.*',
      tone: 'steel',
      items: [
        { q: 'How much lead time do you need on a construction site?', a: '24 to 48 hours is the normal window, and it covers most jobs. We do take emergency work faster than that. The more notice we have, the more of the install we can plan rather than improvise, which usually means a cleaner line and fewer changes later.' },
        { q: 'Do you charge per month once the fence is up?', a: 'No. The rental is a flat fee agreed before the install, and it doesn\'t keep running if your project runs long. There is no charge to come and collect the fence at the end.' },
        { q: 'What happens when the site plan changes and the fence is in the way?', a: 'You call and we come out. General contractors get same-day service on moves, gate relocations and sections added to an existing run.' },
        { q: 'Can you fence a site where posts can\'t be driven?', a: 'Yes. Temp fence panels sit in stands weighted with sandbags and need no ground penetration at all, which is the usual answer on a paved lot, a deck, or a site with utilities close to the surface. Where the ground does take a post and the perimeter has to stay shut, post-driven chain link is the stronger call.' },
      ],
    }),

    landingCtaBand(),
  ].join('\n'),
};
