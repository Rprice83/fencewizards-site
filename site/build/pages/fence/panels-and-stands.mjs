import { pageHero, intro, specs, features, faq, gallery, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/fence/panels-and-stands/',
  title: 'Temporary Fence Panels and Stands Rental Indianapolis | Fence Wizards',
  description: 'Six-foot temporary fence panels on sandbagged stands, rented across Indianapolis. Fast to set, easy to move as the site changes. Flat fee.',
  ogImage: 'loading-area-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Fence types', href: '/#types' }, { name: 'Panels & stands' }],
      eyebrow: 'Fence types',
      title: 'Temporary fence *panels and stands.*',
      lede: 'The portable run. Fast to set, easy for your own crew to shift, and the fence most jobs start with.',
      image: 'loading-area-panels',
      imageAlt: 'Temporary fence panels on stands across a paved loading area',
    }),

    intro({
      lead: 'Temporary fence panels sit in sandbagged stands rather than in the ground.',
      paras: [
        'That means a run can be installed in a fraction of the time a driven fence takes, and moved by two people when the site plan changes. It\'s our bread and butter, and it\'s the right answer for most construction sites, most events and almost every emergency call.',
      ],
      image: 'yard-tractor-panels',
      imageAlt: 'Panel fence on sandbagged stands around a yard tractor in a paved lot',
    }),

    specs({
      eyebrow: 'The specification',
      heading: 'Temporary fence panels and stands, *at a glance.*',
      intro: 'What it is, what it\'s for, and the job it\'s the wrong answer to.',
      tone: 'paper',
      image: 'dirt-lot-excavator',
      imageAlt: 'Panel fence around a dirt lot with an excavator working behind it',
      rows: [
        ['Height', '6 ft standard; 8 ft by special order'],
        ['How it is set', 'Panels seated in stands, weighted with sandbags'],
        ['Install speed', 'The fastest option we carry, usually same or next day'],
        ['Moves', 'By hand, section by section, without tools'],
        ['Gates', 'Pedestrian and drive gates set into the run'],
        ['Add-ons', 'Windscreen, plain or custom printed'],
        ['Best for', 'Sites that change, events, first response'],
        ['Not the right call when', 'The perimeter has to resist someone deliberately moving it'],
      ],
    }),

    features({
      eyebrow: 'Where it fits',
      heading: 'Where panels are *the right call.*',
      tone: 'white',
      items: [
        { title: 'Construction sites that keep changing', text: 'Groundwork moves faster than a site plan does. Panels let a superintendent open a new access point in the morning and close it again in the afternoon.', image: 'gate-across-lot', imageAlt: 'Panel fence with a gate section across a paved lot' },
        { title: 'Events on a tight window', text: 'A panel run goes in during a load-in window and comes out during load-out, which is the only schedule an event fence can actually keep.', image: 'event-lawn-tent', imageAlt: 'Panel fence across a lawn with event tents in the background' },
        { title: 'First response after a loss', text: 'On day one nobody has a measured plan. Panels get a perimeter closed now and can be adjusted once the site has been assessed properly.', image: 'cleared-lot-neighborhood', imageAlt: 'Temporary fence around a cleared lot beside houses' },
      ],
    }),

    faq({
      heading: 'Questions on *panels and stands.*',
      intro: 'What buyers ask before they order this one, including the jobs it\'s the wrong answer to.',
      items: [
        { q: 'Do you offer eight-foot panels?', a: 'Eight-foot panels and stands are a special order, as is eight-foot post-driven chain link. Six-foot is the standard. If the job needs the extra height, tell us early and we will confirm availability when we quote.' },
        { q: 'Can my own crew move a section?', a: 'Yes, and most of them do. That portability is the reason to choose panels over a driven fence. If a whole run needs relocating rather than a section, call us and we will come out, same day for general contractors.' },
        { q: 'Will panels stand up on asphalt or concrete?', a: 'Yes, and this is usually the deciding factor. The panels sit in stands weighted with sandbags rather than in the ground, so a paved lot, a plaza or a downtown sidewalk is no obstacle at all.' },
        { q: 'How much wind will a panel run take?', a: 'Sandbagged stands are what hold the line, so the honest answer is that it depends on how many bags are on it and whether windscreen is fitted. Windscreen turns a fence into a sail and changes the answer, which is why we ask about it when we price the run rather than after.' },
        { q: 'Can windscreen be added to a panel run later?', a: 'Yes. [Windscreen](/fence/windscreen/) fits across an existing run for privacy and dust control, plain or custom printed. It\'s sold rather than rented, so it stays yours when the fence goes back.' },
        { q: 'Is this the right choice for a site that has to stay shut overnight?', a: 'Often it isn\'t. Panels are portable by design, which means someone determined can move them too. Where the perimeter has to resist being walked through, [post-driven chain link](/fence/post-driven-chain-link/) is the honest recommendation, and we will say so on the call.' },
      ],
    }),

    gallery({
      images: [
        { name: 'school-building-panels', alt: 'Panel fence on stands across a lawn beside a brick building' },
        { name: 'street-frontage-panels', alt: 'Panel fence along the edge of an apartment parking lot' },
        { name: 'city-sidewalk-panels', alt: 'Panel fence along a city sidewalk' },
        { name: 'truck-and-panels', alt: 'Fence Wizards pickup truck towing a trailer of fence panels' },
      ],
    }),

    recentJobs({ fenceType: 'panels' }),


    related({ current: '/fence/panels-and-stands/', cities: ['carmel', 'fishers', 'noblesville', 'westfield', 'zionsville', 'speedway'] }),

    quoteCta({}),
  ].join('\n'),
};
