// Google Ads landing page: broad rental searches ("fence rental near me", "rent a fence", "temporary fence rental"…).
// Copy from the homepage and FAQ page. Not in search results or the sitemap (noindex).
import { features, typeCards, faq, gallery, quoteCta, ctaBand } from '../../lib/components.mjs';
import { landingHero } from '../../lib/landing.mjs';

export default {
  path: '/go/temporary-fence-rental/',
  title: 'Temporary Fence Rental in Indianapolis | Fence Wizards',
  description: 'Temporary fence rental across Indianapolis and 80 miles around: panels, post-driven chain link, windscreen and barricades. One flat price, removal included.',
  ogImage: 'truck-trailer-load',
  noindex: true,
  landing: true,
  main: () => [
    landingHero({
      eyebrow: 'Temporary fence rental',
      title: 'Temporary fence rental *in Indianapolis.*',
      lede: 'Rent a fence for a construction site, an event or an emergency: portable fence panels, post-driven chain link, windscreen and barricades. One flat price, agreed before the first panel goes up, and it covers taking it back down.',
      image: 'truck-trailer-load',
      imageAlt: 'Fence Wizards pickup truck and trailer loaded with fence panels in a gravel lot',
      trust: ['Fence on site in 24 to 48 hours', 'One flat price, removal included', 'Serving Indianapolis + 80 miles'],
    }),

    quoteCta({
      eyebrow: 'Get a price',
      heading: 'Tell us about *the job.*',
    }),

    features({
      eyebrow: 'How renting from us works',
      heading: 'One price, *no rent clock.*',
      tone: 'white',
      items: [
        { title: 'Priced before we install', text: 'The rental is a flat fee agreed before the install. It doesn\'t keep running if your project runs long, and there is no charge to collect the fence at the end.' },
        { title: 'Richard answers the phone', text: 'The owner, seven days a week. There is no dispatch queue between you and the person who prices the job.' },
        { title: 'Our own crew', text: 'Richard owns the company, his father and his brother work in it, and the trucks and the material are ours rather than allocated out of a regional pool.' },
      ],
    }),

    typeCards({
      heading: 'Four kinds of temporary fencing *for the job.*',
      intro: 'Not sure which one? Describe the site and Richard will tell you which is the right call. Temp fence panels on stands are the most portable.',
      tone: 'steel',
    }),

    gallery({
      images: [
        { name: 'stacked-panels-site', alt: 'Temporary fence panels on stands around a construction staging area' },
        { name: 'event-lawn-tent', alt: 'Panel fence on stands across a lawn with event tents in the background' },
        { name: 'windscreen-curve-downtown', alt: 'Fence with black windscreen curving along a city street' },
      ],
    }),

    faq({
      heading: 'Rental *questions.*',
      tone: 'white',
      items: [
        { q: 'How much notice do you need?', a: '24 to 48 hours is the normal window and it covers most jobs. More notice always makes the install cleaner, because we can plan the run rather than improvise it.' },
        { q: 'Is taking the fence back down included?', a: 'Yes. The removal is already inside the number you agreed at the start, and we pull it on your schedule rather than ours. There is no collection charge at the end.' },
        { q: 'Will panels work on asphalt or concrete?', a: 'Yes. Panels sit in stands weighted with sandbags, so they don\'t need ground that takes a driven post. That is usually the deciding factor on a paved lot or a downtown site.' },
        { q: 'Do you do residential fencing?', a: 'No. Ninety-nine percent of what we do is business to business, and we would rather say that on the call than after you have waited for a quote.' },
      ],
    }),

    ctaBand(),
  ].join('\n'),
};
