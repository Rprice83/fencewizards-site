import { pageHero, intro, placeCard, prose, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/plainfield/',
  title: 'Temporary Fence Rental in Plainfield, IN | Fence Wizards',
  description: 'Temporary fence rental in Plainfield, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours.',
  ogImage: 'distribution-warehouse-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Plainfield' }],
      eyebrow: 'Service area · Hendricks County',
      title: 'Temporary fence rental *in Plainfield.*',
      lede: 'The distribution corridor. Long runs, big gates, and trucks moving through all of it.',
      image: 'distribution-warehouse-panels',
      imageAlt: 'Panel fence across a paved lot in front of a warehouse lined with loading docks',
    }),

    intro({
      lead: 'Plainfield is warehouse country, and it changes the shape of the job.',
      paras: [
        'Distribution and logistics building along I-70, the National Road and the Ronald Reagan Parkway means perimeters measured in thousands of feet rather than hundreds, around buildings with a footprint you can see from the air. Long straight runs are the easy part of that.',
      ],
      aside: placeCard({ slug: 'plainfield', drive: 'About 35 minutes west, around I-465 to I-70', cityLink: { href: 'https://www.townofplainfield.com/', label: 'townofplainfield.com' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Plainfield.*',
      paras: [
        'The hard part is the gates. A site next to the airport with tractor-trailers moving through it needs drive gates wide enough and placed where the turning circle actually works, not where the panel count happened to run out. Getting that right on the first attempt is the difference between a perimeter that helps and one your yard jockeys fight every morning.',
        'Material storage is the third case here, and it is the one people call about late. A delivery of steel, pipe or equipment sitting on an open pad next to a public road is worth closing properly, and a panel run with windscreen around a laydown area goes in the same day on most jobs.',
      ],
      image: 'shipping-container-lot',
      imageAlt: 'Panel fence around a shipping container and a trailer on a gravel lot',
      tone: 'paper',
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Plainfield.*',
      intro: 'Long perimeters around big boxes, and truck traffic on every side.',
    }),

    faq({
      heading: 'Questions we get *about Plainfield.*',
      intro: 'Three that come up on nearly every call from this part of the radius.',
      items: [
        { q: 'Can you fence a perimeter measured in thousands of feet?', a: 'Yes. Long runs around distribution and logistics buildings are ordinary work here. Give us the linear feet, the number of gates and where they need to be, and the length itself is not the hard part of the job.' },
        { q: 'Can you set drive gates wide enough for tractor-trailers?', a: 'Yes, and where they go matters more than how wide they are. Tell us the turning path your trucks actually take through the site when you call, because a drive gate placed to suit the panel run rather than the vehicle causes a problem every single day of the rental.' },
        { q: 'Can you close off a laydown area for stored material?', a: 'Yes, and it is a common call here. A panel run around a laydown yard goes in fast, and windscreen fitted across it stops the contents being inventoried from the road. Windscreen is sold rather than rented, so it stays yours afterwards.' },
      ],
    }),

    recentJobs({ town: 'plainfield' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'A few more of the towns we name, all out of the Greenwood yard. If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no.',
      cities: ['avon', 'brownsburg', 'franklin', 'columbus', 'bloomington', 'lafayette', 'muncie', 'anderson'],
    }),

    related({ current: '/service-area/plainfield/', showCities: false }),

    quoteCta({ eyebrow: 'Plainfield projects', heading: 'Fencing a *Plainfield site?*', text: 'Give Richard the footage, the gates and the dates, and he will price it on the call.' }),
  ].join('\n'),
};
