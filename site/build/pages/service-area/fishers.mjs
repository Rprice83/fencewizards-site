import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/fishers/',
  title: 'Temporary Fence Rental in Fishers, IN | Fence Wizards',
  description: 'Temporary fence rental in Fishers, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'apartment-build-wrapped',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Fishers' }],
      eyebrow: 'Service area · Hamilton County',
      title: 'Temporary fence rental *in Fishers.*',
      lede: 'Dense mixed-use building, public trail frontage, and a real event calendar in the same square mile.',
      image: 'apartment-build-wrapped',
      imageAlt: 'Panel fence around a two-story apartment building under repair',
    }),

    intro({
      lead: 'Fishers builds vertically and it builds next to people.',
      paras: [
        'The Nickel Plate District puts apartments, offices and restaurants directly against a public trail and a walkable street grid, which means a site perimeter here is not just a security line, it\'s the thing residents walk past every day for the length of the job. Windscreen fitted across the run is a normal order in this part of Hamilton County for exactly that reason.',
      ],
      aside: placeCard({ slug: 'fishers', drive: 'About 40 minutes northeast, up I-65 and around I-465', cityLink: { href: 'https://fishersin.gov/', label: 'fishersin.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Fishers.*',
      paras: [
        'The trail is the practical constraint. Where a site meets the Nickel Plate Trail or a sidewalk that has to stay open, the fence has to hold a clean pedestrian route as well as close the site, and the gate positions matter more than the footage. Tell us which side the public passes on when you call and we\'ll set the line around that rather than discover it on install day.',
        'The other half of the work here is the event side. The Fishers Event Center and the district around it run on load-in and load-out windows rather than office hours, and crowd-control barricades for a queue line or a stage front are their own order rather than an add-on to a fence run. We set to the production schedule, including overnight.',
      ],
      image: 'barricades-outside-building',
      imageAlt: 'Steel crowd-control barricades lining the outside of a venue',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'windscreen-lot-run', alt: 'Long run of black windscreen on fence beside a paved drive' },
        { name: 'gate-across-lot', alt: 'Panel fence on stands across a paved lot' },
        { name: 'street-frontage-panels', alt: 'Panel fence on sandbagged stands along a parking lot beside a two-story apartment building' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Fishers.*',
      intro: 'Mixed-use construction against live public streets, and a venue calendar beside it.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Fishers.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Can you fence a site that runs along the Nickel Plate Trail?', a: 'Yes, and it\'s worth planning rather than improvising. The trail and the sidewalks have to stay usable, so the run needs a clean pedestrian route on one side and the gates placed where your deliveries actually come in. Tell us which side the public passes on when you call.' },
        { q: 'Do you supply barricades for events in the Fishers District?', a: 'Yes. Crowd-control barricades are their own line, and plenty of events take them without any panel fencing at all. Give us the linear footage of the queue line or the stage front and roughly what times you need them set and struck, and we can price it quickly.' },
        { q: 'How long does it take you to reach Fishers from Greenwood?', a: 'We\'re based in Greenwood, so Fishers is about forty minutes northeast around I-465. That\'s inside our normal 24 to 48 hour window with room to spare, and emergency work in Hamilton County moves faster than that.' },
      ],
    }),

    recentJobs({ town: 'fishers' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'More of the radius, reached from a yard on the south side. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['noblesville', 'westfield', 'zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin'],
    }),

    related({ current: '/service-area/fishers/', showCities: false }),

    quoteCta({ eyebrow: 'Fishers projects', heading: 'Building *in Fishers?*', text: 'Tell Richard the block, the run and where the trail or sidewalk goes, and he\'ll price it on the call.' }),
  ].join('\n'),
};
