import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/muncie/',
  title: 'Temporary Fence Rental in Muncie, IN | Fence Wizards',
  description: 'Temporary fence rental in Muncie, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'event-lawn-tent',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Muncie' }],
      eyebrow: 'Service area · Delaware County',
      title: 'Temporary fence rental *in Muncie.*',
      lede: 'Institutional work that runs on an academic calendar, plus the events beside it.',
      image: 'event-lawn-tent',
      imageAlt: 'Panel fence along a lawn beside a modern glass building, with a white tent in the distance',
    }),

    intro({
      lead: 'Muncie is about an hour and a quarter northeast of the yard, out I-69 and across on State Road 32.',
      paras: [
        'Our temporary fencing has been on sites at Ball State University, where the venue was the end user rather than our direct client, and we would rather say that plainly than leave you to assume otherwise.',
      ],
      aside: placeCard({ slug: 'muncie', drive: 'About an hour and a quarter northeast via I-69 and State Road 32', cityLink: { href: 'https://www.muncie.in.gov/', label: 'muncie.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Muncie.*',
      paras: [
        'The older industrial building stock is what makes Muncie different from the other campus towns in the radius. Delaware County carries a lot of twentieth-century factory and warehouse property, and a good share of the work out here is demolition, redevelopment and securing a structure that is no longer safe to walk into. That is perimeter work where the fence genuinely has to hold rather than mark, which usually means post-driven chain link, with windscreen to keep the site out of view from the road.',
        'Muncie also has a real event side, and the two overlap more than people expect: the same grounds that host a build in July host something with a crowd in September. Panel runs, windscreen and crowd-control barricades all come off the same truck, so one call covers it.',
      ],
      image: 'barricades-building-run',
      imageAlt: 'Crowd-control barricades lined up along the side of a large metal building',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Muncie.*',
      intro: 'Four options, and on institutional work you often need more than one of them.',
    }),

    faq({
      heading: 'Questions we get *about Muncie.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Have you worked at Ball State?', a: 'Our temporary fencing has been on sites there. To be exact about it, the venue was the end user rather than our direct client in that case, which is a distinction plenty of companies in this trade blur and we would rather not.' },
        { q: 'Can you supply barricades as well as fencing for an event?', a: 'Yes, and on event work that is the normal order. Interlocking steel barricades for queue lines and stage fronts, panel runs for the perimeter, windscreen where you need privacy or a printed surface, all on one quote and one delivery.' },
        { q: 'Can you secure a derelict or partly demolished building?', a: 'Yes, and it is a normal call in Delaware County. A structure that is unsafe to enter needs a perimeter that holds rather than one that marks, so that is post-driven chain link where the ground takes it, with windscreen where the site should not be on view from the street. Panels close the line on day one if the demolition has already started.' },
      ],
    }),

    recentJobs({ town: 'muncie' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The other towns we name, west and south of here. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville'],
    }),

    related({ current: '/service-area/muncie/', showCities: false }),

    quoteCta({ eyebrow: 'Muncie projects', heading: 'Fencing something *in Muncie?*', text: 'Tell us the install window and the clear-by date, and we will hold both.' }),
  ].join('\n'),
};
