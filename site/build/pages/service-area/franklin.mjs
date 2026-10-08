import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/franklin/',
  title: 'Temporary Fence Rental in Franklin, IN | Fence Wizards',
  description: 'Temporary fence rental in Franklin, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'cleared-lot-neighborhood',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Franklin' }],
      eyebrow: 'Service area · Johnson County',
      title: 'Temporary fence rental *in Franklin.*',
      lede: 'Same county as the yard. Campus work, a working downtown, and the shortest drive we make south.',
      image: 'cleared-lot-neighborhood',
      imageAlt: 'Panel fence along a cleared lot next to houses',
    }),

    intro({
      lead: 'Franklin is in the same county as our yard and about fifteen minutes down I-65, which changes what we can actually promise rather than just what we can quote.',
      paras: [
        'Same-day response on a straightforward run is realistic here, and a service call to move a gate or extend a run doesn\'t need to become a scheduling conversation.',
      ],
      aside: placeCard({ slug: 'franklin', drive: 'About 15 minutes south, straight down I-65', cityLink: { href: 'https://www.franklin.in.gov/', label: 'franklin.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Franklin.*',
      paras: [
        'The work splits between the college and the downtown. Campus construction has the same requirement every institutional site has: the perimeter has to genuinely separate the public from the work, because the people walking past are students rather than trades. That usually means a driven fence where the ground allows it, and proper gate planning rather than a line dropped where the panels ran out.',
        'The historic downtown and the Main Street district are the other half, and they\'re the appearance job. A site on a working commercial street needs the sidewalk left open and the perimeter screened, because it\'s in front of businesses trying to trade for the whole length of the work.',
      ],
      image: 'gate-across-lot',
      imageAlt: 'Panel fence on stands across a paved lot',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Franklin.*',
      intro: 'Fifteen minutes from the yard, which changes what we can promise.',
    }),

    faq({
      heading: 'Questions we get *about Franklin.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'How quickly can you get to a Franklin site?', a: 'Faster than almost anywhere else we work. We\'re based in Greenwood, about fifteen minutes north up I-65, so a straightforward run goes in within the usual 24 to 48 hours and service calls here are easy for us to take.' },
        { q: 'What do you use on a campus or institutional site?', a: 'Usually post-driven chain link where the ground takes a post, because the perimeter has to hold rather than mark and the people walking past are not trades. Where the site changes week to week or the surface is paved, panels in sandbagged stands are the better call and we\'ll say so.' },
        { q: 'Can you screen a site on a downtown street?', a: 'Yes. Windscreen fits across a panel run and is the normal answer on a working commercial street, because the perimeter sits in front of businesses trying to trade. It comes plain or custom printed, and it\'s sold rather than rented, so it stays yours.' },
      ],
    }),

    recentJobs({ town: 'franklin' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'Where else the trucks go, from the same yard. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['columbus', 'bloomington', 'lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis'],
    }),

    related({ current: '/service-area/franklin/', showCities: false }),

    quoteCta({ eyebrow: 'Franklin projects', heading: 'Fencing something *in Franklin?*', text: 'We\'re close. Tell Richard what needs closing and when.' }),
  ].join('\n'),
};
