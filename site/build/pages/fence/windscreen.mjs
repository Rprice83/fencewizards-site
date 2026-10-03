import { pageHero, intro, specs, features, faq, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/fence/windscreen/',
  title: 'Construction Windscreen and Printed Fence Screen Indianapolis | Fence Wizards',
  description: 'Windscreen for temporary fence across Indianapolis. Privacy and dust control, plain or printed with your own graphics. Sold rather than rented.',
  ogImage: 'windscreen-curve-downtown',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Fence types', href: '/#types' }, { name: 'Windscreen' }],
      eyebrow: 'Fence types',
      title: 'Construction windscreen and *printed fence screen.*',
      lede: 'Privacy and dust across the whole run, plain or printed with your own mark.',
      image: 'windscreen-curve-downtown',
      imageAlt: 'Black windscreen on a fence run curving along a downtown plaza',
    }),

    intro({
      lead: 'Windscreen is fabric fitted across a fence run.',
      paras: [
        'It holds dust in, keeps eyes out, and on a street-facing site it changes what the public sees from a job site into a finished edge. We treat it as a sale rather than a rental, plain or custom printed, and it fits both panel runs and post-driven chain link.',
      ],
      image: 'sidewalk-windscreen',
      imageAlt: 'Black windscreen on a fence run along a concrete lot beside a building',
    }),

    specs({
      eyebrow: 'The specification',
      heading: 'Windscreen and printed screen, *at a glance.*',
      intro: 'What it is, what it\'s for, and the job it\'s the wrong answer to.',
      tone: 'paper',
      image: 'green-windscreen-lot',
      imageAlt: 'Green windscreen on fence runs along both sides of a parking lot',
      rows: [
        ['Terms', 'Sold rather than rented'],
        ['Fits', 'Panels and stands, and post-driven chain link'],
        ['Plain', 'Standard fabric, fitted and tensioned across the run'],
        ['Printed', 'Custom graphics printed to your artwork'],
        ['Does', 'Dust control, privacy, a clean street edge'],
        ['Also does', 'Turns a long perimeter into signage'],
        ['Best for', 'Street-facing sites, demolition, events, anything with sponsors'],
        ['Worth knowing', 'Wind load goes up with screen fitted, so the fence under it has to be right'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where windscreen is *the right call.*',
      tone: 'white',
      items: [
        { title: 'Street-facing construction', text: 'Downtown work sits against a sidewalk. Screen turns an open site into a finished-looking edge for the length of the job.', image: 'windscreen-building-run', imageAlt: 'Black windscreen on a fence run beside a brick building at a street corner' },
        { title: 'Demolition and dust', text: 'Dust is the complaint that reaches the client. A screened perimeter holds a lot of it inside the line.', image: 'windscreen-black-run', imageAlt: 'A long run of black windscreen along the edge of a paved lot' },
        { title: 'Sponsored events', text: 'Printed screen puts your logo, or a sponsor\'s, along the whole run. It\'s the cheapest large-format signage on most event sites.', image: 'printed-windscreen-banners', imageAlt: 'Custom printed windscreen banners along a fence beside a street' },
      ],
    }),

    faq({
      heading: 'Questions on *windscreen.*',
      intro: 'What buyers ask before they order this one, including the jobs it\'s the wrong answer to.',
      items: [
        { q: 'Is windscreen rented or sold?', a: 'Sold, not rented. It\'s fitted to the fence run for the life of the job and it stays yours afterwards, which is different from how the fence itself is priced.' },
        { q: 'Can you print our logo on it?', a: 'Yes. Custom printed windscreen carries your own mark, a sponsor, or a development rendering, the length of the run. On a large site it\'s usually the cheapest large-format signage on the job by a wide margin.' },
        { q: 'What does it actually do?', a: 'Two things. It blocks the view into the site, which matters on a loss site, a demolition or a development that doesn\'t want an audience. And it holds dust, which is often the reason a neighbor or a municipality asked for it in the first place.' },
        { q: 'Does it affect the fence itself?', a: 'Yes, and anyone who says otherwise hasn\'t stood next to one in March. Screen turns a fence into a sail, so a screened run needs more weight on the stands or a [driven fence](/fence/post-driven-chain-link/) behind it. We account for that when we price it.' },
        { q: 'Can it go on a fence you didn\'t install?', a: 'Ask us. Windscreen is sold rather than rented, so there is no rental tie, but the fit depends on what is already standing, and we would rather look at it than guess on the phone.' },
        { q: 'Do you sell plain screen as well as printed?', a: 'Yes. Plain screen is the common order and it does the privacy and dust job on its own. Printing is the upgrade, and it only makes sense when somebody is going to be looking at the run.' },
      ],
    }),

    gallery({
      images: [
        { name: 'windscreen-lot-run', alt: 'Black windscreen along a curving paved drive' },
        { name: 'event-windscreen-tent', alt: 'Black windscreen fitted across a panel run in front of a large white tent' },
      ],
    }),

    recentJobs({ fenceType: 'windscreen' }),


    related({ current: '/fence/windscreen/', cities: ['brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie'] }),

    quoteCta({}),
  ].join('\n'),
};
