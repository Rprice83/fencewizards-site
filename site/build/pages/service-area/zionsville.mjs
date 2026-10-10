import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/zionsville/',
  title: 'Temporary Fence Rental in Zionsville, IN | Fence Wizards',
  description: 'Screened temporary fence for Zionsville\'s brick Main Street village. Panels in weighted stands, nothing driven into brick. Flat fee, removal included.',
  ogImage: 'windscreen-curve-downtown',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Zionsville' }],
      eyebrow: 'Service area · Boone County',
      title: 'Temporary fence rental *in Zionsville.*',
      lede: 'The brick Main Street village, narrow access, and work that has to look considered.',
      image: 'windscreen-curve-downtown',
      imageAlt: 'Black windscreen along a paved plaza lined with planters',
    }),

    intro({
      lead: 'In Zionsville, how the site looks matters as much as how it holds.',
      paras: [
        'The brick Main Street village is the heart of the town, and a construction perimeter dropped across it without thought gets noticed by the merchants, the town and everybody walking through. Screened panel runs rather than bare chain link are the normal answer in the village for that reason.',
      ],
      aside: placeCard({ slug: 'zionsville', drive: 'About 45 minutes northwest, around I-465', cityLink: { href: 'https://www.zionsville-in.gov/', label: 'zionsville-in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Zionsville.*',
      paras: [
        'Access is the other half. Narrow streets, brick surfaces and tight frontages mean the truck can\'t always park where the fence goes, and a run has to be carried in more often than elsewhere. That changes the install rather than the price, but it\'s worth telling us when you call.',
        'Away from the village it\'s Boone County growth: the Zionsville Road corridor, and commercial and residential development along the I-65 side of town. Those are ordinary sites with ordinary access, and they take the same 24 to 48 hour window as anything else in the radius.',
      ],
      image: 'street-frontage-panels',
      imageAlt: 'Panel fence along a street frontage in front of a two-story building',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Zionsville.*',
      intro: 'A brick village where the perimeter is part of the streetscape.',
    }),

    faq({
      heading: 'Questions we get *about Zionsville.*',
      intro: 'Brick streets, screening and tight access.',
      items: [
        { q: 'Will a fence damage a brick street or a historic frontage?', a: 'Panels sit in stands weighted with sandbags rather than in the ground, so nothing gets driven into a brick surface at all. That\'s the usual recommendation in the village. Where the ground would take a driven post and the perimeter has to hold for months, we\'ll say so, but on brick the answer is panels.' },
        { q: 'Can you make the perimeter look better than bare chain link?', a: 'Yes. Windscreen fitted across the run blocks the view into the site and gives you a clean flat surface instead of open mesh. It comes plain or custom printed, so a development can put its own rendering on the run rather than showing the public a building site.' },
        { q: 'What if the truck can\'t get to where the fence goes?', a: 'Tell us when you call. Narrow access and tight frontages are normal in the village, and they change how we plan the install rather than whether we take the job. What we don\'t want is to find out on install day with a loaded trailer on a brick street.' },
      ],
    }),

    recentJobs({ town: 'zionsville' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'More towns we name, run from the same Greenwood yard.',
      cities: ['speedway', 'plainfield', 'avon', 'brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette'],
    }),

    related({ current: '/service-area/zionsville/', showCities: false }),

    quoteCta({ eyebrow: 'Zionsville projects', heading: 'Working *in Zionsville?*', text: 'Tell Richard the block and where the truck can and can\'t park.' }),
  ].join('\n'),
};
