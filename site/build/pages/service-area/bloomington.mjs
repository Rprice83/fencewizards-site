import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/bloomington/',
  title: 'Temporary Fence Rental in Bloomington, IN | Fence Wizards',
  description: 'Temporary fence rental in Bloomington, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'field-run-two',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Bloomington' }],
      eyebrow: 'Service area · Monroe County',
      title: 'Temporary fence rental *in Bloomington.*',
      lede: 'Campus-adjacent work, where the pedestrian traffic decides the fence.',
      image: 'field-run-two',
      imageAlt: 'Chain link run across an open grass field',
    }),

    intro({
      lead: 'Bloomington sits about an hour south of the yard on State Road 37 and I-69, well inside the radius.',
      paras: [
        'What makes the work here specific is Indiana University: a large share of construction in this city happens next to a campus, and campus means real pedestrian traffic at all hours rather than a quiet perimeter after five.',
      ],
      aside: placeCard({ slug: 'bloomington', drive: 'About an hour south on State Road 37 and I-69', cityLink: { href: 'https://bloomington.in.gov/', label: 'bloomington.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Bloomington.*',
      paras: [
        'That changes the fence. A panel run that would be fine on an industrial lot gets leaned on, sat on and pushed aside where students walk, so a lot of Bloomington work wants post-driven chain link on the pedestrian faces even when panels are enough everywhere else. The honest answer on a walk is usually a mix of the two.',
        'The ground is the thing that actually catches people out here. Monroe County is limestone country, the terrain rolls rather than sits flat, and a post that goes in easily on a level lot in Marion County can hit rock a foot down south of town. Where that happens the answer is panels in sandbagged stands, which need no ground penetration at all. It\'s worth telling us what the site is before install day rather than after the crew arrives with a post driver.',
      ],
      image: 'orange-safety-grass',
      imageAlt: 'Chain link with orange safety mesh around a graded dirt lot',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Bloomington.*',
      intro: 'Four options. Next to a walking route, the driven line is usually the answer.',
    }),

    faq({
      heading: 'Questions we get *about Bloomington.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Do you work on campus-adjacent sites in Bloomington?', a: 'Yes, and it\'s most of what we do there. The thing to plan for is pedestrian traffic: a perimeter next to a walking route needs a driven line where people pass and can take panels everywhere else. Getting that split right is the difference between a fence that holds and one you keep calling about.' },
        { q: 'Can you hold install and strike dates set by a term calendar?', a: 'Yes. On campus-adjacent work those dates are usually fixed long before the rest of the job, so tell us both on the first call. We plan the crew and the trucks around them rather than around our own convenience.' },
        { q: 'What happens if the ground will not take a driven post?', a: 'Panels in sandbagged stands go in instead, and they do the same job above grade with no ground penetration at all. Limestone and rock are a real consideration in Monroe County, so tell us what the site is when you call and we\'ll quote the fence that will actually go in rather than the one that looks cheaper on paper.' },
      ],
    }),

    recentJobs({ town: 'bloomington' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The other towns we name, north of here. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood', 'carmel'],
    }),

    related({ current: '/service-area/bloomington/', showCities: false }),

    quoteCta({ eyebrow: 'Bloomington projects', heading: 'Job *in Bloomington?*', text: 'Give us the dates your term calendar has already fixed and we\'ll build around them.' }),
  ].join('\n'),
};
