import { pageHero, intro, placeCard, prose, gallery, typeCards, faq, cityList, related, quoteCta, recentJobs } from '../../lib/components.mjs';

export default {
  path: '/service-area/greenwood/',
  title: 'Temporary Fence Rental in Greenwood, IN | Fence Wizards',
  description: 'Temporary fence for US-31 and SR 135 build-outs in Greenwood, IN. Panels that move with the site, flat fee, removal included.',
  ogImage: 'truck-trailer-load',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Service area', href: '/service-area/' }, { name: 'Greenwood' }],
      eyebrow: 'Service area · Johnson County',
      title: 'Temporary fence rental *in Greenwood.*',
      lede: 'Home ground. The yard is here, so this is the fastest response we have.',
      image: 'truck-trailer-load',
      imageAlt: 'Fence Wizards truck and gooseneck trailer loaded with fence panels',
    }),

    intro({
      lead: 'Greenwood is home.',
      paras: [
        'Richard lives here and the trucks are here, which means Greenwood and the south side of the metro get response times nothing else in the radius can match, and an emergency call here is the easiest one in Indiana for us to say yes to. Richard grew up in this town, which is a different thing from serving it.',
      ],
      aside: placeCard({ slug: 'greenwood', drive: 'This is home. We\'re based here.', cityLink: { href: 'https://www.greenwood.in.gov/', label: 'greenwood.in.gov' } }),
    }),

    prose({
      eyebrow: 'Local know-how',
      heading: 'What\'s different *about Greenwood.*',
      paras: [
        'The work here is commercial build-out along the US-31 and SR 135 retail corridors, and residential development pushing further south into Johnson County. Both mean sites that change week to week, which calls for panels and stands rather than driven fence: a superintendent can open an access point in the morning and close it in the afternoon.',
        'Because we\'re minutes away, the service side is easy here. Fencing moved, a gate relocated, a run extended because the site plan changed. Those are normal on a live job, and in Greenwood we can usually be back out the same morning you call.',
      ],
      image: 'dirt-lot-excavator',
      imageAlt: 'Panels around a dirt lot with an excavator working',
      tone: 'paper',
    }),

    gallery({
      eyebrow: 'On the ground',
      images: [
        { name: 'street-frontage-panels', alt: 'Panel fence on sandbagged stands along a parking lot beside a two-story apartment building' },
        { name: 'gate-across-lot', alt: 'Panel fence on stands across a paved lot' },
        { name: 'truck-side-wrap', alt: 'Fence Wizards pickup with its wizard wrap' },
      ],
    }),

    typeCards({
      eyebrow: 'What we bring',
      heading: 'What we bring *to Greenwood.*',
      intro: 'Everything below leaves from a yard a few minutes from your site.',
      tone: 'paper',
    }),

    faq({
      heading: 'Questions we get *about Greenwood.*',
      intro: 'Speed, houses, and sites that change every week.',
      items: [
        { q: 'How fast can you get to a Greenwood job?', a: 'Faster than anywhere else we work, because we\'re based in Greenwood. A straightforward run goes in within 24 to 48 hours, and emergency calls in Johnson County are the easiest ones for us to take on short notice.' },
        { q: 'Do you do residential fencing in Greenwood?', a: 'No. We don\'t do residential fencing anywhere, including here. This is temporary fence rental for construction sites, events and emergency response, and it\'s ninety-nine percent business to business. If you need a permanent fence at a house, we\'ll point you somewhere useful.' },
        { q: 'Can you handle a site that changes every week?', a: 'That\'s what panels and stands are for, and it\'s most of what goes out of this yard. They\'re sandbagged rather than driven, so a section can be shifted by two people, and we\'ll come out and move a run properly whenever it stops working.' },
      ],
    }),

    recentJobs({ town: 'greenwood' }),


    cityList({
      heading: 'Other towns *we cover.*',
      intro: 'Where else the trucks go, out of this yard.',
      cities: ['carmel', 'fishers', 'noblesville', 'westfield', 'zionsville', 'speedway', 'plainfield', 'avon'],
    }),

    related({ current: '/service-area/greenwood/', showCities: false }),

    quoteCta({ eyebrow: 'Greenwood projects', heading: 'Job *in Greenwood?*', text: 'We\'re minutes away. Tell Richard what you need closed and when.' }),
  ].join('\n'),
};
