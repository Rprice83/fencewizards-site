import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/indianapolis/',
  title: 'Temporary Fence Rental in Indianapolis, IN | Fence Wizards',
  description: 'Temporary fence rental in Indianapolis, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'skyline-panels-indianapolis',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Indianapolis' }],
      eyebrow: 'Service area · Marion County',
      title: 'Temporary fence rental *in Indianapolis.*',
      lede: 'Downtown work, Mile Square sidewalks, and the event calendar that runs beside them.',
      image: 'skyline-panels-indianapolis',
      imageAlt: 'Panel fence across a park lawn with city towers behind',
    }),

    intro({
      lead: 'Indianapolis is where most of this business happens, and the city changes what a temporary fence has to do.',
      paras: [
        'Inside the Mile Square and along the canal, a site sits directly against a public sidewalk, so the perimeter is not just security, it\'s what the public looks at for the length of the job. That\'s why so much downtown work takes windscreen fitted across the run rather than open chain link.',
      ],
      aside: placeCard({ slug: 'indianapolis', drive: 'About 20 minutes up US-31 or I-65', cityLink: { href: 'https://www.indy.gov/', label: 'indy.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Indianapolis.*',
      paras: [
        'The other half of Indianapolis is the event calendar. Downtown venues, White River State Park and the convention corridor run on load-in and load-out windows rather than business hours, and a fence crew that can only work nine to five is no use to a production manager. We set to the schedule on the sheet, including overnight, and we strike when the event is over rather than the following week.',
        'Access is the practical problem. A downtown perimeter has to leave a pedestrian route, a delivery gate and usually a fire lane, and getting those three in the right places on the first attempt saves your crew an argument every morning. Tell us where the trucks come in when you call and we\'ll place the gates around that.',
      ],
      image: 'city-sidewalk-panels',
      imageAlt: 'Panel fence along a city sidewalk beside a lawn with a tent',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'downtown-lot-barriers', alt: 'Panel fence and plastic barriers across a downtown parking deck' },
        { name: 'sidewalk-windscreen', alt: 'Black windscreen on fence along a parking lot beside a brick building' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Indianapolis.*',
      intro: 'Four things go on the ground here, and downtown usually needs three of them.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Indianapolis.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you work inside the Mile Square?', a: 'Yes, and it\'s a large share of what we do. Downtown perimeters usually want windscreen across the run because the site sits against a public sidewalk, and they always want the gates planned around deliveries and the fire lane rather than dropped wherever the panels ran out.' },
        { q: 'Can you set a fence downtown overnight?', a: 'Yes. Event load-in and load-out windows downtown are frequently overnight or before dawn, and we plan the crew and the truck around the schedule on the production sheet rather than around a standard working day.' },
        { q: 'How quickly can you reach an Indianapolis site from Greenwood?', a: 'We\'re based in Greenwood, roughly twenty minutes from downtown up US-31 or I-65. Indianapolis is the shortest run we make, and emergency work here moves faster than the usual 24 to 48 hour window.' },
      ],
    }),

    recentJobs({ town: 'indianapolis' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, from a yard twenty minutes south of the Mile Square. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['greenwood', 'carmel', 'fishers', 'noblesville', 'westfield', 'zionsville', 'speedway', 'plainfield'],
    }),

    related({ current: '/service-area/indianapolis/', showCities: false }),

    quoteCta({ eyebrow: 'Indianapolis projects', heading: 'Fencing a *downtown job?*', text: 'Give us the block, the run and the delivery side, and Richard will price it on the call.' }),
  ].join('\n'),
};
