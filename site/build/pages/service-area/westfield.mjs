import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/westfield/',
  title: 'Temporary Fence Rental in Westfield, IN | Fence Wizards',
  description: 'Temporary fence rental in Westfield, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'barricades-outside-building',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Westfield' }],
      eyebrow: 'Service area · Hamilton County',
      title: 'Temporary fence rental *in Westfield.*',
      lede: 'Grand Park weekends, the US 31 corridor, and a build rate to match both.',
      image: 'barricades-outside-building',
      imageAlt: 'Crowd-control barricades and traffic cones lined up along a metal building',
    }),

    intro({
      lead: 'Westfield is a crowd-management town before it is a construction town, and Grand Park is the reason.',
      paras: [
        'A large sports campus running tournament weekends puts thousands of people, their cars and their vendors onto open ground on a schedule, and open ground is where temporary fence and barricades do their most useful work: parking separation, vendor rows, controlled entry points and keeping vehicles away from people on foot.',
      ],
      aside: placeCard({ slug: 'westfield', drive: 'About 50 minutes north, up US 31', cityLink: { href: 'https://www.westfieldin.gov/', label: 'westfieldin.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Westfield.*',
      paras: [
        'The scale is the part people underestimate. A tournament footprint needs long panel runs set fast and pulled fast, and the install and strike times matter as much as the fence does. We plan the crew and the truck around the schedule on the sheet, including early mornings, rather than around a standard working day.',
        'Through the rest of the week it is growth. The US 31 and SR 32 corridors carry commercial and residential development, and those are sites that change week to week. That is panel-and-stand territory rather than driven fence, because a superintendent can open an access point in the morning and close it again in the afternoon without calling anybody.',
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
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Can you fence a large open site for a tournament weekend?', a: 'Yes, and that is a normal order in Westfield. Long panel runs on open ground go in fast and come out fast. What we need from you is the footprint, where vehicles cross the line, where the public enters, and the times for set and strike.' },
        { q: 'Do you set up and take down on the same weekend?', a: 'Yes. Event work gets pulled when the event is over rather than the following business day, and the removal was already inside the price you agreed. We would rather come back Sunday night than leave a perimeter standing across somebody\'s field.' },
        { q: 'What do you use to separate parking from foot traffic?', a: 'Usually a mix. Panel runs mark and hold the long edges, and interlocking steel barricades do the entry points and any line where a crowd is going to lean on it. Tell us where people and vehicles have to cross and we will tell you which one belongs there.' },
      ],
    }),

    recentJobs({ town: 'westfield' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the 80 miles, from the yard in Greenwood. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['zionsville', 'speedway', 'plainfield', 'avon', 'brownsburg', 'franklin', 'columbus', 'bloomington'],
    }),

    related({ current: '/service-area/westfield/', showCities: false }),

    quoteCta({ eyebrow: 'Westfield projects', heading: 'Fencing something *in Westfield?*', text: 'Tell Richard the footprint and the dates, and he will price it on the call.' }),
  ].join('\n'),
};
