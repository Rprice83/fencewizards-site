import { pageHero, intro, specs, features, faq, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/fence/post-driven-chain-link/',
  title: 'Post-Driven Chain Link Fence Rental Indianapolis | Fence Wizards',
  description: 'Post-driven temporary chain link fence rental across Indianapolis. Posts driven into the ground for a perimeter that has to stay shut. Six-foot standard, flat fee.',
  ogImage: 'open-field-run',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Fence types', href: '/#types' }, { name: 'Post-driven chain link' }],
      eyebrow: 'Fence types',
      title: 'Post-driven temporary *chain link fence.*',
      lede: 'Posts driven into the ground and fabric tensioned between them, for a site that has to stay shut after your crew leaves.',
      image: 'open-field-run',
      imageAlt: 'Chain link fence on posts running across an open grass field',
    }),

    intro({
      lead: 'Post-driven chain link is the temporary fence that behaves like a permanent one.',
      paras: [
        'Posts go into the ground and the fabric is hung on them, so the run can\'t be lifted at a joint or shoved aside. It takes longer to install than panels and it\'s much harder to move, and that is exactly the point on a site that has to stay closed after the crew leaves.',
      ],
      image: 'field-run-two',
      imageAlt: 'A long straight run of chain link fence across a grass field',
    }),

    specs({
      eyebrow: 'The specification',
      heading: 'Post-driven chain link, *at a glance.*',
      intro: 'What it is, what it\'s for, and the job it\'s the wrong answer to.',
      tone: 'paper',
      image: 'crew-at-fence',
      imageAlt: 'Three crew members standing in front of a chain link fence on a lawn beside a brick building',
      rows: [
        ['Height', '6 ft standard; 8 ft by special order'],
        ['How it is set', 'Posts driven into the ground, fabric hung and tensioned'],
        ['Install speed', 'Longer than panels, scheduled ahead with a crew on site'],
        ['Moves', 'Not by hand. Changes are a crew visit'],
        ['Gates', 'Pedestrian and drive gates built into the line'],
        ['Add-ons', 'Windscreen, plain or custom printed'],
        ['Best for', 'Long jobs and sites that have to stay shut'],
        ['Not the right call when', 'The perimeter is going to move every week'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where a driven fence is *the right call.*',
      tone: 'white',
      items: [
        { title: 'Multi-family and commercial builds', text: 'A build that runs months doesn\'t want a fence that can be shifted by a passerby. A driven line holds from mobilization through handover.', image: 'winter-site-generator', imageAlt: 'Chain link fence around a snowy building site with a multi-story building going up' },
        { title: 'Sites with real theft exposure', text: 'Material stacked on site is the thing that walks. A driven fence with the fabric tensioned properly is a serious deterrent.', image: 'windscreen-lot-run', imageAlt: 'A long fence run covered in black windscreen along a paved drive' },
        { title: 'Long-term lot control', text: 'Lots that need closing for a season take a driven line with windscreen, which handles both access and what the neighbors can see.', image: 'windscreen-black-run', imageAlt: 'Black windscreen on fence runs along the edge of a paved lot' },
      ],
    }),

    faq({
      heading: 'Questions on *post-driven chain link.*',
      intro: 'What buyers ask before they order this one, including the jobs it\'s the wrong answer to.',
      items: [
        { q: 'How is this different from panels and stands?', a: 'The posts are driven into the ground and the chain link is hung on them, so the line can\'t be lifted at a joint or pushed aside. The trade is install time and the fact that it\'s much harder to move once it\'s in, which is exactly why it holds.' },
        { q: 'What kind of ground do you need?', a: 'Ground that will take a driven post. Rock, heavy fill and shallow utilities all change the answer, so tell us what the site is when we quote, before the crew arrives. Where the ground won\'t take a post, [panels in sandbagged stands](/fence/panels-and-stands/) are the above-grade option.' },
        { q: 'How long does the install take compared to panels?', a: 'Longer, and that is the trade. A panel run usually goes in within 24 to 48 hours of the call. A driven fence is a crew on site working the line, and we schedule it accordingly.' },
        { q: 'Does it come in eight-foot?', a: 'Eight-foot post-driven chain link is a special order; six-foot is the standard. If the job needs the extra height, say so early and we will confirm availability with the quote.' },
        { q: 'Can gates be set into a driven run?', a: 'Yes, pedestrian gates and drive gates both. Gate positions matter more on a driven fence than on panels, because moving one afterwards takes a crew visit. On panels it\'s a two-person lift.' },
        { q: 'Does the ground get repaired when you pull it?', a: 'The posts come out with the fence at the end, and the removal is already inside the price you agreed. A driven post does leave a mark in the ground, so if the surface matters, say so and we will talk about panels instead.' },
      ],
    }),

    recentJobs({ fenceType: 'driven' }),


    related({ current: '/fence/post-driven-chain-link/', cities: ['zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin'] }),

    quoteCta({}),
  ].join('\n'),
};
