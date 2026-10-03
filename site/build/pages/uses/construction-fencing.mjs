import { pageHero, intro, prose, steps, faq, typeCards, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/construction-fencing/',
  title: 'Construction Site Fence Rental in Indianapolis | Fence Wizards',
  description: 'Construction site fence rental across Indianapolis and central Indiana. Panels, chain link, gates and windscreen, moved the same day the plan changes. Flat fee.',
  ogImage: 'stacked-panels-site',
  main: () => [
    pageHero({
      crumbs: [{ name: 'What we fence', href: '/#uses' }, { name: 'Construction' }],
      eyebrow: 'Construction site fencing',
      title: 'Construction site fence rental *in Indianapolis.*',
      lede: 'A perimeter that moves as fast as your schedule does, on a flat fee that already includes taking it back down.',
      image: 'stacked-panels-site',
      imageAlt: 'Temporary fence panels on stands around a construction staging area',
    }),

    intro({
      lead: 'A construction site needs a fence that can change.',
      paras: [
        'We set panels and stands, post-driven chain link, gates and windscreen across the Indianapolis metro, usually within 24 to 48 hours of the call. When a gate has to move or a run has to be added, we come back out the same day. The price is agreed before the first panel goes in, and it covers removal at the end.',
      ],
      image: 'school-building-panels',
      imageAlt: 'Panel fence with gates around a school building project',
    }),

    prose({
      eyebrow: 'Who we build for',
      heading: 'Built around the project manager *who makes the call.*',
      paras: [
        'Ninety-nine percent of what we do is business to business. The person on the other end of the phone is a project manager, a superintendent, a demolition contractor or a procurement agent, and what they need is a number they can put in a bid and a date they can hold a sub to.',
        'So we quote verbally first, on the call, and send the written proposal after. Net 30 terms are normal for clients we have worked with. Smaller or new accounts pay up front, and we say so plainly at the start rather than at the invoice.',
        'What matters most on a live site is what happens after the install. Fencing gets in somebody\'s way at least once on every project. When it does, you call, and we come out.',
      ],
      image: 'distribution-warehouse-panels',
      imageAlt: 'Temporary fence run along a distribution warehouse loading area',
      tone: 'paper',
    }),

    steps({
      eyebrow: 'How it runs',
      heading: 'How a construction fence job runs, *in five steps.*',
      intro: 'The one that matters most is the fourth. Fencing is in somebody\'s way at least once on every project.',
      items: [
        { title: 'Scope the perimeter', text: 'Linear feet, gate positions, and whether the ground takes a driven post or needs sandbagged stands. A rough number is enough to price it.' },
        { title: 'Set the line', text: 'Panels and stands go in fast and can be shifted by hand. Post-driven chain link takes longer to install and is much harder to move, which is the point.' },
        { title: 'Gate it properly', text: 'Pedestrian and drive gates in the right places save your crew an hour a day. Tell us where the deliveries come in.' },
        { title: 'Change it when the site changes', text: 'Fence moved, gates relocated, sections added to an existing run. Same-day service for general contractors.' },
        { title: 'Pull it when you\'re done', text: 'On your schedule. No removal charge, because it was in the original number.' },
      ],
    }),

    typeCards({
      heading: 'The fence types *this job uses.*',
      intro: 'Most sites start with panels. Sites that have to stay shut for months get driven chain link. Many use both.',
      pick: ['panels', 'driven', 'windscreen'],
      notes: {
        panels: 'Fast to set on pavement, decks and lots, and easy to shift as the site plan changes.',
        driven: 'For a perimeter that has to hold overnight and for months without anyone watching it.',
        windscreen: 'Privacy and dust control across the run. Printed, it turns the fence into a sign.',
      },
      tone: 'steel',
    }),

    faq({
      heading: 'Construction fencing *questions.*',
      intro: 'The ones that come up on the phone every week, answered the way Richard answers them.',
      tone: 'white',
      items: [
        { q: 'How much lead time do you need on a construction site?', a: '24 to 48 hours is the normal window, and it covers most jobs. We do take emergency work faster than that. The more notice we have, the more of the install we can plan rather than improvise, which usually means a cleaner line and fewer changes later.' },
        { q: 'Do you charge per month once the fence is up?', a: 'No. The rental is a flat fee agreed before the install, and it doesn\'t keep running if your project runs long. There is no charge to come and collect the fence at the end.' },
        { q: 'What happens when the site plan changes and the fence is in the way?', a: 'You call and we come out. Fencing is in somebody\'s way at least once on every project, so we built the business around answering that call rather than avoiding it. General contractors get same-day service on moves, gate relocations and sections added to an existing run.' },
        { q: 'Can you fence a site where posts can\'t be driven?', a: 'Yes. Panels sit in stands weighted with sandbags and need no ground penetration at all, which is the usual answer on a paved lot, a deck, or a site with utilities close to the surface. Where the ground does take a post and the perimeter has to stay shut, post-driven chain link is the stronger call.' },
        { q: 'Do you offer Net 30 terms to contractors?', a: 'Net 30 is normal for clients we have worked with before. Smaller or new accounts pay up front, and we say that on the first call rather than at the invoice. Certificates of insurance for your vendor file are no problem: umbrella, general liability, commercial auto and workers\' compensation.' },
        { q: 'Will you add gates after the fence is already up?', a: 'Yes. Pedestrian and drive gates can be set into an existing run. It\'s worth telling us where deliveries come in before the install, because well-placed gates save your crew time every day, but adding one later is a normal call for us.' },
      ],
    }),

    gallery({
      images: [
        { name: 'loading-area-panels', alt: 'Panel fence across a loading area' },
        { name: 'open-field-run', alt: 'Post-driven chain link across an open field' },
        { name: 'dirt-lot-excavator', alt: 'Panels around a dirt lot with an excavator working' },
        { name: 'gate-across-lot', alt: 'Panel gate across a paved lot' },
      ],
    }),

    recentJobs({ use: 'construction' }),


    related({ current: '/construction-fencing/', cities: ['indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield'] }),

    quoteCta({}),
  ].join('\n'),
};
