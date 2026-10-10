import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/columbus/',
  title: 'Temporary Fence Rental in Columbus, IN | Fence Wizards',
  description: 'Temporary fence in Columbus, IN for plant work, downtown sites and flood or fire damage. Driven chain link, panels and windscreen on one flat fee.',
  ogImage: 'shipping-container-lot',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Columbus' }],
      eyebrow: 'Service area · Bartholomew County',
      title: 'Temporary fence rental *in Columbus.*',
      lede: 'Plant work, a downtown known for its architecture, and flood exposure that makes emergency calls real.',
      image: 'shipping-container-lot',
      imageAlt: 'Panel fence around a shipping container and trailer on a gravel lot',
    }),

    intro({
      lead: 'Columbus is an industrial town with an unusually designed downtown, and both of those show up in the fencing.',
      paras: [
        'Plant and manufacturing work around the city means secure perimeters around live industrial sites, contractor laydown areas and equipment that nobody wants inventoried from the road. That\'s driven fence and screened panel work rather than a line of open mesh.',
      ],
      aside: placeCard({ slug: 'columbus', drive: 'About 40 minutes south on I-65', cityLink: { href: 'https://www.columbus.in.gov/', label: 'columbus.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Columbus.*',
      paras: [
        'Downtown is the opposite problem. Columbus is known nationally for its modern architecture, and the public pays attention to what happens on those streets. A perimeter on a downtown site here is on view, and screened runs rather than bare chain link are worth it here.',
        'Then there\'s the river. Bartholomew County has real flood exposure, and the fencing side of that is emergency work: securing a damaged property quickly, keeping people out of a structure that\'s no longer safe, and screening a loss site from the street while restoration crews work. Columbus is about forty minutes down I-65 and inside our radius for exactly this kind of call.',
      ],
      image: 'demolition-site',
      imageAlt: 'Panel fence around a building with a collapsed roof',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'winter-site-generator', alt: 'Chain link panels around a snowy construction site with a framed building' },
        { name: 'muddy-site-edge', alt: 'Panel fence on sandbags along a muddy site edge with equipment beyond' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Columbus.*',
      intro: 'Industrial plants, a designed downtown, and a river that floods.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Columbus.*',
      intro: 'Emergency calls, damaged buildings and plant perimeters.',
      items: [
        { q: 'Do you take emergency calls this far south?', a: 'Yes. Columbus is about forty minutes down I-65 from the yard and comfortably inside the radius. Emergency work moves faster than the standard 24 to 48 hour window, and the exact timing depends on the site and what\'s already on the truck that day.' },
        { q: 'Can you secure a flood- or fire-damaged property?', a: 'Yes. Panels get a perimeter closed on day one when nobody has measured anything, and windscreen screens the property from the street while restoration crews work. We firm the line up with driven fence where it has to hold for weeks.' },
        { q: 'What do you use around a live industrial site?', a: 'Post-driven chain link where the ground takes a post, because it doesn\'t lift or slide and a plant perimeter has to hold. Windscreen goes on where a laydown area or stored equipment shouldn\'t be visible from a public road.' },
      ],
    }),

    recentJobs({ town: 'columbus' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'More of the towns we name, north of here.',
      cities: ['bloomington', 'lafayette', 'muncie', 'anderson', 'terre-haute', 'richmond', 'indianapolis', 'greenwood'],
    }),

    related({ current: '/service-area/columbus/', showCities: false }),

    quoteCta({ eyebrow: 'Columbus projects', heading: 'Working *in Columbus?*', text: 'Tell Richard the site, the run and how fast it has to be closed.' }),
  ].join('\n'),
};
