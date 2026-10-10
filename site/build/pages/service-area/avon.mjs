import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/avon/',
  title: 'Temporary Fence Rental in Avon, IN | Fence Wizards',
  description: 'Temporary fence for US-36 commercial work in Avon, IN. Panels that move with each phase while stores stay open. Flat fee, removal included.',
  ogImage: 'street-frontage-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Avon' }],
      eyebrow: 'Service area · Hendricks County',
      title: 'Temporary fence rental *in Avon.*',
      lede: 'The US-36 corridor, phased commercial work, and customers walking past all of it.',
      image: 'street-frontage-panels',
      imageAlt: 'Panel fence on sandbagged stands along a parking lot beside a two-story apartment building',
    }),

    intro({
      lead: 'Almost everything in Avon happens along US-36, and that corridor is the job.',
      paras: [
        'Commercial and retail construction on a highway frontage usually has to happen while the businesses on either side of it stay open, which means the fence carves a working area out of a place the public is still using.',
      ],
      aside: placeCard({ slug: 'avon', drive: 'About 40 minutes west, around I-465 to US-36', cityLink: { href: 'https://www.avonindiana.gov/', label: 'avonindiana.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Avon.*',
      paras: [
        'That makes phasing the whole conversation. A perimeter that has to move three times as the work walks along a frontage is a job for panels and stands, because two people can shift a section by hand when the phase changes. A driven fence is the wrong tool there, and we\'ll tell you so.',
        'Hendricks County also puts institutional work in the mix: schools, municipal sites and campus buildings where the perimeter has to keep the public and the work apart. Those are the jobs where post-driven chain link earns its cost, and where the gate positions get planned rather than guessed.',
      ],
      image: 'loading-area-panels',
      imageAlt: 'Panel fence across a loading area',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'dirt-lot-excavator', alt: 'Panels around a dirt lot with an excavator working' },
        { name: 'windscreen-lot-run', alt: 'Long run of black windscreen on fence beside a paved drive' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Avon.*',
      intro: 'Highway frontage work while the stores beside it stay open.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Avon.*',
      intro: 'Phased frontage work, open storefronts and schools.',
      items: [
        { q: 'Can the fence move as the work moves along a frontage?', a: 'Yes. Panels and stands move by hand as the work walks forward. If a whole run has to relocate, call and we\'ll come out.' },
        { q: 'Can you keep a store or a school open while you fence around it?', a: 'Yes, and it\'s worth planning properly. The run has to leave a clean route for the public and put the gates where your crew and deliveries go. Tell us who still has to get in and out when you call, and the line gets set around that.' },
        { q: 'Which fence is right for a school or municipal site?', a: 'Usually post-driven chain link, because it doesn\'t lift or slide. Where the ground won\'t take a post or the site changes weekly, panels are the better fit, and we\'ll tell you which one your site is.' },
      ],
    }),

    recentJobs({ town: 'avon' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'Everywhere else the trucks reach, from the Greenwood yard.',
      cities: ['brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie', 'anderson', 'terre-haute'],
    }),

    related({ current: '/service-area/avon/', showCities: false }),

    quoteCta({ eyebrow: 'Avon projects', heading: 'Building *in Avon?*', text: 'Tell Richard the frontage, the phases and who still has to get in and out.' }),
  ].join('\n'),
};
