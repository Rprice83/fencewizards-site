import { pageHero, intro, prose, features, facts, gallery, related, quoteCta } from '../lib/components.mjs';

export default {
  path: '/about/',
  title: 'About Fence Wizards | Family Run Temporary Fence Rental, Greenwood IN',
  description: 'Family run temporary fence rental in Greenwood, Indiana. Third generation fencers, fully insured, covering the Indianapolis metro and 80 miles out.',
  ogImage: 'crew-at-fence',
  main: () => [
    pageHero({
      crumbs: [{ name: 'About' }],
      eyebrow: 'About Fence Wizards',
      title: 'A family that has been fencing *for three generations.*',
      lede: 'Owner-run out of Greenwood, Indiana, and built for the people who order fence for a living.',
      image: 'wizard-truck-wrap',
      imageAlt: 'A wrapped Fence Wizards truck with the wizard artwork',
    }),

    intro({
      lead: 'Fence Wizards is a family business.',
      paras: [
        'Richard Warren owns it, his father and his brother work in it every day, and he is a third-generation fencer. The company has ten-plus years of permanent fence work behind it, and the family\'s goes back a lot further.',
      ],
      image: 'crew-at-fence',
      imageAlt: 'Three members of the Fence Wizards crew standing in front of a chain link fence',
    }),

    prose({
      eyebrow: 'Equipment & buying',
      heading: 'Why the equipment *matters.*',
      paras: [
        'We buy the most current fence installation equipment we can, because the crew gets more done in a day and finishes it less beaten up. Injury and fatigue are what turn a two-day install into a four-day one.',
        'We also do our own procurement, straight from the manufacturer rather than through a distributor. That takes a layer of cost out, and the saving goes into the quote rather than into the margin.',
        'Richard is working on his OSHA 30. When it\'s finished it will be on this page, and not before.',
      ],
      image: 'truck-side-wrap',
      imageAlt: 'A Fence Wizards crew member beside a wrapped truck',
      flip: true,
      tone: 'paper',
    }),

    features({
      eyebrow: 'How we do business',
      heading: 'Be the number they *call the next ten times.*',
      intro: 'On every job, the goal is to be the number a project manager calls the next ten times, and the ten after that.',
      cols: 2,
      tone: 'white',
      items: [
        { label: '01', title: 'Price it once and hold it', text: 'Flat fee, no rent that keeps running, no removal charge, no excessive damage fees. Every one of those is a profit center at a national company, and we decided not to build one.' },
        { label: '02', title: 'Move when the site moves', text: 'Fence relocated, gates shifted, a run added to an existing job. Same-day service for general contractors, because a fence in the wrong place stops other trades.' },
        { label: '03', title: 'Answer the phone', text: 'Richard takes the calls himself, for sales and for service. A live person, or a call straight back, is most of what separates us from a dispatch queue.' },
        { label: '04', title: 'Say no plainly', text: 'We don\'t do permanent fence installation, gate automation, residential fencing, fence repairs, stanchions, orange fencing or fence material sales. If you need one of those, we\'ll say so on the call and point you somewhere useful.' },
      ],
    }),

    features({
      eyebrow: 'Where our fence has stood',
      heading: 'Sites our fencing *has been on.*',
      intro: 'These are sites our fence has stood on. At this scale the venue is the end user and another company hired us, so we list the sites rather than claim the venues as customers.',
      cols: 3,
      tone: 'steel',
      items: [
        { label: 'Indianapolis', title: 'NBA All-Star Game Google Pixel event', text: '' },
        { label: 'Indianapolis', title: 'Final Four', text: '' },
        { label: 'Muncie', title: 'Ball State University', text: '' },
        { label: 'Indiana', title: 'Veterans Affairs', text: '' },
        { label: 'Indiana', title: 'Social Security Administration', text: '' },
        { label: 'Indianapolis', title: 'White River State Park', text: '' },
      ],
    }),

    facts({
      eyebrow: 'What stands behind the work',
      heading: 'Facts you can *check.*',
      image: 'crew-and-van',
      imageAlt: 'Fence Wizards crew member next to a wrapped work truck',
      items: [
        { title: 'Insurance: full commercial package', text: 'Umbrella, general liability, commercial auto and workers\' compensation.' },
        { title: 'Recognized: Indianapolis Monthly', text: 'Named in *Where To Get Stuff Fixed*, 2023.' },
        { title: 'Owner run, single location', text: 'Greenwood, Indiana, covering the Indianapolis metro and about 80 miles around downtown.' },
        { title: 'Temporary fence only', text: 'Construction, events and emergency response. Nothing else, on purpose.' },
      ],
    }),

    gallery({
      images: [
        { name: 'downtown-lot-barriers', alt: 'Panels and barricades on a downtown lot', caption: 'Downtown, panels and barricades' },
        { name: 'orange-safety-grass', alt: 'Chain link with orange safety mesh along a grassy site' },
        { name: 'truck-and-panels', alt: 'Wrapped truck with a trailer of fence panels' },
        { name: 'street-frontage-panels', alt: 'Panel fence along a street frontage' },
      ],
    }),

    related({ current: '/about/', cities: ['franklin', 'columbus', 'bloomington', 'lafayette', 'muncie', 'anderson'] }),

    quoteCta({ eyebrow: 'Get a quote', heading: 'Work with *the owner.*', text: 'Richard handles every inquiry himself. Tell him about the job and he\'ll call you back with a number and a date.' }),
  ].join('\n'),
};
