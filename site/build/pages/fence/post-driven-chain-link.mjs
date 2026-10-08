import { pageHero, intro, specs, features, faq, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/fence/post-driven-chain-link/',
  title: 'Post Driven Temporary Chain Link Fence Rental Indianapolis | Fence Wizards',
  description: 'Post-driven temporary chain link fence rental across Indianapolis. Driven in, so it doesn\'t lift, slide or get walked through. Six-foot standard, flat fee.',
  ogImage: 'open-field-run',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Fence types', href: '/#types' }, { name: 'Post-driven chain link' }],
      eyebrow: 'Fence types',
      title: 'Post-driven temporary *chain link fence.*',
      lede: 'Driven into the ground. It doesn\'t lift, it doesn\'t slide, and it doesn\'t get walked through.',
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
      image: 'apartment-build-wrapped',
      imageAlt: 'Chain link fence around an apartment building wrapped for renovation',
      rows: [
        ['Height', '6 ft standard; 8 ft by special order'],
        ['How it is set', 'Posts driven into the ground, fabric hung and tensioned'],
        ['Install speed', 'Longer than panels, planned rather than improvised'],
        ['Moves', 'Not by hand. Changes are a crew visit'],
        ['Gates', 'Pedestrian and drive gates built into the line'],
        ['Add-ons', 'Windscreen, plain or custom printed'],
        ['Best for', 'Long jobs, sites that stay shut, real security'],
        ['Not the right call when', 'The perimeter is going to move every week'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where a driven fence is *the right call.*',
      tone: 'white',
      items: [
        { title: 'Multi-family and commercial builds', text: 'A build that runs months doesn\'t want a fence that can be shifted by a passerby. A driven line holds from mobilization through handover.', image: 'winter-site-generator', imageAlt: 'Fence around a snowy building site with a multi-story building going up' },
        { title: 'Sites with real theft exposure', text: 'Material stacked on site is the thing that walks. A driven fence with the fabric tensioned properly is a serious deterrent rather than a marker.', image: 'stacked-panels-site', imageAlt: 'Chain link fence around stacked material wrapped in white' },
        { title: 'Long-term lot control', text: 'Lots that need closing for a season take a driven line with windscreen, which handles both access and what the neighbors can see.', image: 'green-windscreen-lot', imageAlt: 'Green windscreen on fence runs along both sides of a parking lot' },
      ],
    }),

    faq({
      heading: 'Questions on *post-driven chain link.*',
      intro: 'What buyers ask before they order this one, including the jobs it\'s the wrong answer to.',
      items: [
        { q: 'How is this different from panels and stands?', a: 'The posts are driven into the ground and the chain link is hung on them. It doesn\'t lift, slide or get walked through. The trade is install time and the fact that it\'s much harder to move once it\'s in, which is exactly why it holds.' },
        { q: 'What kind of ground do you need?', a: 'Ground that will take a driven post. Rock, heavy fill and shallow utilities all change the answer, so tell us what the site is when we quote rather than after the crew arrives. Where the ground won\'t take a post, [panels in sandbagged stands](/fence/panels-and-stands/) do the same job above grade.' },
        { q: 'How long does the install take compared to panels?', a: 'Longer, and that is the honest trade. A panel run usually goes in within 24 to 48 hours of the call. A driven fence is a crew on site working the line, and we schedule it accordingly.' },
        { q: 'Does it come in eight-foot?', a: 'Eight-foot post-driven chain link is a special order; six-foot is the standard. If the job needs the extra height, say so early and we will confirm availability with the quote.' },
        { q: 'Can gates be set into a driven run?', a: 'Yes, pedestrian gates and drive gates both. Gate positions matter more on a driven fence than on panels, because moving one afterwards is real work rather than a two-person lift.' },
        { q: 'Does the ground get repaired when you pull it?', a: 'The posts come out with the fence at the end, and the removal is already inside the price you agreed. We aren\'t a landscaping company and we won\'t pretend a driven post leaves no mark, so if the surface matters, say so and we will talk about panels instead.' },
      ],
    }),

    gallery({
      images: [
        { name: 'school-building-panels', alt: 'Fence run across a lawn beside a brick building' },
        { name: 'muddy-site-edge', alt: 'Chain link fence along the muddy edge of a grass site' },
        { name: 'orange-safety-grass', alt: 'Chain link fence with orange mesh along a graded field' },
      ],
    }),

    recentJobs({ fenceType: 'driven' }),


    related({ current: '/fence/post-driven-chain-link/', cities: ['zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin'] }),

    quoteCta({}),
  ].join('\n'),
};
