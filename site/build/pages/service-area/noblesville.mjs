import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/noblesville/',
  title: 'Temporary Fence Rental in Noblesville, IN | Fence Wizards',
  description: 'Temporary fence rental in Noblesville, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'open-field-run',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Noblesville' }],
      eyebrow: 'Service area · Hamilton County',
      title: 'Temporary fence rental *in Noblesville.*',
      lede: 'Corridor construction, a historic courthouse square, and the biggest outdoor concert season in the county.',
      image: 'open-field-run',
      imageAlt: 'Long chain link run across open ground beside a tree line',
    }),

    intro({
      lead: 'Noblesville runs two kinds of temporary fence work at once.',
      paras: [
        'Through the week it is corridor and infrastructure construction: the Pleasant Street work, the SR 32 corridor and the development pushing out around the Innovation Mile. Long linear runs beside live traffic, where the fence separates the public from the work for months rather than days.',
      ],
      aside: placeCard({ slug: 'noblesville', drive: 'About 50 minutes north, around I-465 and up SR 37', cityLink: { href: 'https://www.noblesville.in.gov/', label: 'noblesville.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Noblesville.*',
      paras: [
        'Then there is the concert season. Ruoff Music Center brings a summer calendar of large outdoor events to this town, and event work is a scheduling problem before it is a fencing problem. Queue lines, vehicle separation and back-of-house perimeters all get set to a run of show, and they come out when the event is over rather than the following week.',
        'The Historic Courthouse Square and Federal Hill Commons are the third case, and they are the fussy one. Work in a downtown that people are actively using has to leave the sidewalks open and look like somebody thought about it. That is usually a panel run with windscreen fitted, rather than open chain link across a public square.',
      ],
      image: 'barricades-venue',
      imageAlt: 'Crowd-control barricades set in a line across the floor of an open hangar',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Noblesville.*',
      intro: 'Road corridor work through the week, and an outdoor concert season on top of it.',
    }),

    faq({
      heading: 'Questions we get *about Noblesville.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you handle long runs beside live traffic?', a: 'Yes, and corridor work is a normal order here. What matters on a run like that is where the gates sit for your equipment and how the line is weighted, because a fence beside moving traffic has a harder job than one in the middle of a lot. Tell us the linear feet and roughly where the access points need to be.' },
        { q: 'Can you set fencing and barricades for an outdoor concert?', a: 'Yes. Give us the run-of-show times for load-in, doors and load-out, and we work to those rather than to a standard install window. Barricades for queue lines and stage fronts can come with or without any panel fencing, and we strike when the event ends.' },
        { q: 'Can you screen a site on the courthouse square?', a: 'Yes. Windscreen fits across a panel run and is the usual answer downtown, because the site sits against a public sidewalk and the perimeter is what people look at for the length of the job. It comes plain or custom printed, and it is sold rather than rented.' },
      ],
    }),

    recentJobs({ town: 'noblesville' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'Where else the trucks run, out of a Greenwood yard. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['westfield', 'zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin', 'columbus'],
    }),

    related({ current: '/service-area/noblesville/', showCities: false }),

    quoteCta({ eyebrow: 'Noblesville projects', heading: 'Job *in Noblesville?*', text: 'Give Richard the location, the run and the dates, and he will price it on the call.' }),
  ].join('\n'),
};
