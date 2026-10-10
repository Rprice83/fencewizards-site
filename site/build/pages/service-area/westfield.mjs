import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/westfield/',
  title: 'Temporary Fence Rental in Westfield, IN | Fence Wizards',
  description: 'Panels and barricades for Grand Park tournament weekends, plus construction fence on Westfield\'s US-31 and SR 32 corridors. Flat fee.',
  ogImage: 'barricades-outside-building',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Westfield' }],
      eyebrow: 'Service area · Hamilton County',
      title: 'Temporary fence rental *in Westfield.*',
      lede: 'Grand Park weekends, the US-31 corridor, and a build rate to match both.',
      image: 'barricades-outside-building',
      imageAlt: 'Crowd-control barricades and traffic cones lined up along a metal building',
    }),

    intro({
      lead: 'Grand Park\'s tournament weekends put crowd management ahead of construction in Westfield.',
      paras: [
        'A large sports campus running tournament weekends puts thousands of people, their cars and their vendors onto open ground on a schedule, and open ground is where temporary fence and barricades do their most useful work: parking separation, vendor rows and controlled entry points.',
      ],
      aside: placeCard({ slug: 'westfield', drive: 'About 50 minutes north, up US-31', cityLink: { href: 'https://www.westfieldin.gov/', label: 'westfieldin.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Westfield.*',
      paras: [
        'The scale is the part people underestimate. A tournament footprint needs long panel runs set fast and pulled fast, and the install and strike times matter as much as the fence does. We set to the tournament schedule, early mornings included.',
        'Through the rest of the week it\'s growth. The US-31 and SR 32 corridors carry commercial and residential development, and those are sites that change week to week, so they take panels and stands rather than driven fence.',
      ],
      image: 'orange-safety-run',
      imageAlt: 'Chain link lined with orange safety fence around a graded site with an excavator',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Westfield.*',
      intro: 'Tournament weekends at scale, and a town growing fast around them.',
    }),

    faq({
      heading: 'Questions we get *about Westfield.*',
      intro: 'Tournament weekends, fast strikes and keeping cars and people apart.',
      items: [
        { q: 'Can you fence a large open site for a tournament weekend?', a: 'Yes, and that\'s a normal order in Westfield. Long panel runs on open ground go in fast and come out fast. What we need from you is the footprint, where vehicles cross the line, where the public enters, and the times for set and strike.' },
        { q: 'Do you set up and take down on the same weekend?', a: 'Yes. Event work gets pulled when the event ends, and the removal was already inside the price you agreed. We\'d rather come back Sunday night than leave a perimeter standing across somebody\'s field.' },
        { q: 'What do you use to separate parking from foot traffic?', a: 'Usually a mix. Panel runs mark and hold the long edges, and interlocking steel barricades do the entry points and any line where a crowd is going to lean on it. Tell us where people and vehicles have to cross and we\'ll tell you which one belongs there.' },
      ],
    }),

    recentJobs({ town: 'westfield' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the 80 miles, from the yard in Greenwood.',
      cities: ['zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin', 'columbus', 'bloomington'],
    }),

    related({ current: '/service-area/westfield/', showCities: false }),

    quoteCta({ eyebrow: 'Westfield projects', heading: 'Fencing something *in Westfield?*', text: 'Tell Richard the footprint, where the public enters and the tournament dates.' }),
  ].join('\n'),
};
