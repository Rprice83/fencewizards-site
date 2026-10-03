import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/avon/',
  title: 'Temporary Fence Rental in Avon, IN | Fence Wizards',
  description: 'Temporary fence rental in Avon, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
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
        'Commercial and retail construction on a highway frontage usually has to happen while the businesses on either side of it stay open, which means the fence is not closing a site so much as carving a working area out of a place the public is still using.',
      ],
      aside: placeCard({ slug: 'avon', drive: 'About 40 minutes west, around I-465 to US-36', cityLink: { href: 'https://www.avonindiana.gov/', label: 'avonindiana.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Avon.*',
      paras: [
        'That makes phasing the whole conversation. A perimeter that has to move three times as the work walks along a frontage is panel and stand territory, because two people can shift a section by hand when the phase changes. A driven fence in that situation is the wrong tool, and we\'ll say so rather than sell you the more expensive one.',
        'Hendricks County also puts institutional work in the mix: schools, municipal sites and campus buildings where the perimeter has to keep the public and the work genuinely apart rather than just mark a line. Those are the jobs where post-driven chain link earns its cost, and where the gate positions get planned rather than guessed.',
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
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Can the fence move as the work moves along a frontage?', a: 'Yes, and that\'s exactly what panels and stands are for. Two people can shift a section by hand, so a phased job along a retail frontage doesn\'t need a new install every time the work walks forward. If a whole run has to relocate rather than a section, call us and we\'ll come out.' },
        { q: 'Can you keep a store or a school open while you fence around it?', a: 'Yes, and it\'s worth planning properly. The run has to leave a clean route for the public and put the gates where your crew and deliveries actually go. Tell us who still has to get in and out when you call, and the line gets set around that.' },
        { q: 'Which fence is right for a school or municipal site?', a: 'Usually post-driven chain link, because it doesn\'t lift or slide and the perimeter has to genuinely hold rather than mark. Where the ground won\'t take a post or the site changes weekly, panels are the honest answer instead, and we\'ll tell you which one your site is.' },
      ],
    }),

    recentJobs({ town: 'avon' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'Everywhere else the trucks reach, from the Greenwood yard. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie', 'anderson', 'terre-haute'],
    }),

    related({ current: '/service-area/avon/', showCities: false }),

    quoteCta({ eyebrow: 'Avon projects', heading: 'Building *in Avon?*', text: 'Tell Richard the frontage, the phases and the dates, and he\'ll price it on the call.' }),
  ].join('\n'),
};
