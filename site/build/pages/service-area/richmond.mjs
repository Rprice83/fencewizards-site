import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/richmond/',
  title: 'Temporary Fence Rental in Richmond, IN | Fence Wizards',
  description: 'Temporary fence rental in Richmond, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'loading-area-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Richmond' }],
      eyebrow: 'Service area · Wayne County',
      title: 'Temporary fence rental *in Richmond.*',
      lede: 'The eastern edge, near the Ohio line, and mostly industrial.',
      image: 'loading-area-panels',
      imageAlt: 'Panel fence enclosing a paved loading area beneath a large industrial building',
    }),

    intro({
      lead: 'Richmond sits at the eastern edge of the radius, about an hour and a quarter out I-70 and close enough to the Ohio line that the state border is part of the local economy.',
      paras: [
        'The work we see there is industrial and commercial rather than residential infill, which is the same reason it suits us: this is a business-to-business company.',
      ],
      aside: placeCard({ slug: 'richmond', drive: 'About an hour and a quarter east on I-70', cityLink: { href: 'https://www.richmondindiana.gov/', label: 'richmondindiana.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Richmond.*',
      paras: [
        'Perimeters on those sites tend to be long-lived. A plant expansion or a commercial build in Wayne County is measured in months, and once the line is set nobody wants it moving. That is a straightforward case for post-driven chain link, with panels used where deliveries have to come through.',
        'Being near a state line has one practical effect worth knowing. Contractors working Richmond frequently have crews and material moving in from Ohio, so the delivery gate is doing more work than it would on a comparable site further west. Tell us which side the trucks arrive from and we will put the gate there.',
      ],
      image: 'green-windscreen-lot',
      imageAlt: 'Panel fence with green windscreen lining both sides of a paved lot',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Richmond.*',
      intro: 'Four options, and a long industrial line up here usually wants the driven one.',
    }),

    faq({
      heading: 'Questions we get *about Richmond.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Is Richmond inside your service area?', a: 'Yes, at the eastern edge of it, about an hour and a quarter from Greenwood on I-70. The drive is part of the number and we say so on the call, but the rest of the quote works exactly as it does in the metro.' },
        { q: 'Do you cross into Ohio?', a: 'The radius we publish is 80 miles around downtown Indianapolis, which puts Richmond near the edge and most of Ohio outside it. If your site sits just over the line, call and ask rather than assuming. The answer is sometimes yes, and it costs nothing to find out.' },
        { q: 'What suits a long industrial perimeter?', a: 'Post-driven chain link for the run that stays put, and panels and stands at the delivery side where access has to change. That combination is most of what goes out to Wayne County.' },
      ],
    }),

    recentJobs({ town: 'richmond' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'The rest of the radius, west toward Indianapolis. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['indianapolis', 'greenwood', 'carmel', 'fishers', 'noblesville', 'westfield', 'zionsville', 'speedway'],
    }),

    related({ current: '/service-area/richmond/', showCities: false }),

    quoteCta({ eyebrow: 'Richmond projects', heading: 'Building *in Wayne County?*', text: 'Tell us which side the trucks arrive from and we will put the gate there.' }),
  ].join('\n'),
};
