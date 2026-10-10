import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/terre-haute/',
  title: 'Temporary Fence Rental in Terre Haute, IN | Fence Wizards',
  description: 'Temporary fence in Terre Haute, the western edge of our radius. Planned installs, the drive priced up front, flat fee with removal included.',
  ogImage: 'dirt-lot-excavator',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Terre Haute' }],
      eyebrow: 'Service area · Vigo County',
      title: 'Temporary fence rental *in Terre Haute.*',
      lede: 'The western edge of the radius. We go, and the drive is priced up front.',
      image: 'dirt-lot-excavator',
      imageAlt: 'Panel fence around a dirt lot with spoil piles and an excavator',
    }),

    intro({
      lead: 'Terre Haute is the western edge of what we cover, about an hour and a half out I-70 toward the Illinois line.',
      paras: [
        'We do go. Jobs more than 50 driving miles from downtown Indianapolis carry a distance charge, and we say so on the call.',
      ],
      aside: placeCard({ slug: 'terre-haute', drive: 'About an hour and a half west on I-70', cityLink: { href: 'https://www.terrehaute.in.gov/', label: 'terrehaute.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Terre Haute.*',
      paras: [
        'Work this far out is planned rather than improvised. A single well-organized install beats three trips, so the more we know before the truck loads, the better the job goes: linear feet, gate positions, and whether the ground takes a driven post or needs sandbagged stands.',
        'The Wabash Valley ground is worth mentioning on its own. River-bottom soil, old fill and hard slab all behave differently under a post driver, and that\'s the variable that decides whether a driven line goes in quickly or slowly. We\'d rather find that out when we quote than on install day.',
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
      intro: 'Distance, notice and Wabash Valley ground.',
      items: [
        { q: 'Do you come out to Terre Haute?', a: 'Yes. It\'s the western edge of the radius rather than outside it, and the distance charge is part of the quote you get on the first call.' },
        { q: 'Should I give you more notice for a job that far out?', a: 'It helps a great deal. Emergency work out there is possible, but a planned install is much better value. Send the site plan if you have one.' },
        { q: 'Does the ground affect whether you can drive posts?', a: 'Yes. Around the Wabash Valley the soil varies a lot, so tell us what the site is when you call and we\'ll check it when we quote.' },
      ],
    }),

    recentJobs({ town: 'terre-haute' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, back east toward Indianapolis.',
      cities: ['richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield', 'zionsville'],
    }),

    related({ current: '/service-area/terre-haute/', showCities: false }),

    quoteCta({ eyebrow: 'Terre Haute projects', heading: 'Job out *in Terre Haute?*', text: 'Send the linear feet, the gates and what the ground is like, and Richard will price it.' }),
  ].join('\n'),
};
