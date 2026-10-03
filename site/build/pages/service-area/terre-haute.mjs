import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/terre-haute/',
  title: 'Temporary Fence Rental in Terre Haute, IN | Fence Wizards',
  description: 'Temporary fence rental in Terre Haute, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'dirt-lot-excavator',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Terre Haute' }],
      eyebrow: 'Service area · Vigo County',
      title: 'Temporary fence rental *in Terre Haute.*',
      lede: 'The western edge of the radius. We go, and the distance is priced honestly.',
      image: 'dirt-lot-excavator',
      imageAlt: 'Panel fence around a dirt lot with spoil piles and an excavator',
    }),

    intro({
      lead: 'Terre Haute is the western edge of what we cover, about an hour and a half out I-70 toward the Illinois line.',
      paras: [
        'We do go, and the first thing we will tell you is that the distance is part of the number. Saying that on the call is better than burying it in a quote you find out about later.',
      ],
      aside: placeCard({ slug: 'terre-haute', drive: 'About an hour and a half west on I-70', cityLink: { href: 'https://www.terrehaute.in.gov/', label: 'terrehaute.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Terre Haute.*',
      paras: [
        'Work this far out is planned rather than improvised, and that is the honest trade. A single well-organized install beats three trips, so the more we know before the truck loads, the better the job goes: linear feet, gate positions, and whether the ground takes a driven post or needs sandbagged stands.',
        'The Wabash Valley ground is worth mentioning on its own. River-bottom soil, old fill and hard slab all behave differently under a post driver, and that is the variable that decides whether a driven line goes in quickly or slowly. We would rather find that out when we quote than on install day.',
      ],
      image: 'muddy-site-edge',
      imageAlt: 'Panel fence along the muddy edge of a grass site, with equipment and a trailer inside',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Terre Haute.*',
      intro: 'Four options. Out here the ground decides which one goes in fastest.',
    }),

    faq({
      heading: 'Questions we get *about Terre Haute.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you actually come out to Terre Haute?', a: 'Yes. It is the western edge of the radius rather than outside it. What we will not do is pretend the drive is free, so the distance shows up in the number and we say so on the first call.' },
        { q: 'Should I give you more notice for a job that far out?', a: 'It helps a great deal. Emergency work out there is possible, but a planned install is much better value, because one organized trip does what three improvised ones would. Send the site plan if you have one.' },
        { q: 'Does the ground affect whether you can drive posts?', a: 'Yes, and around the Wabash Valley it is the main variable. River-bottom soil, old fill and hard slab each behave differently under a post driver, so we would rather assess it when we quote than discover it on install day.' },
      ],
    }),

    recentJobs({ town: 'terre-haute' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, back east toward Indianapolis. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield', 'zionsville'],
    }),

    related({ current: '/service-area/terre-haute/', showCities: false }),

    quoteCta({ eyebrow: 'Terre Haute projects', heading: 'Job out *in Terre Haute?*', text: 'The drive is in the number and we say so up front. Send the details and Richard will price it.' }),
  ].join('\n'),
};
