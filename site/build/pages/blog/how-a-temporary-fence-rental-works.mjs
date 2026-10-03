import { pageHero, article, ctaBand } from '../../lib/components.mjs';

export const post = {
  path: '/blog/how-a-temporary-fence-rental-works/',
  headline: 'How a temporary fence rental works in Indianapolis, from first call to pickup',
  summary: 'What actually happens between your call and the fence coming down: the five things we need to quote, how install day runs, and what a flat fee covers.',
  date: '2026-08-31',
  image: 'truck-trailer-load',
  imageAlt: 'Fence Wizards truck and trailer loaded with fence panels',
};

export default {
  path: post.path,
  title: 'How a temporary fence rental works in Indianapolis, from first call to pickup | Fence Wizards',
  description: post.summary,
  ogImage: post.image,
  article: { headline: post.headline, date: post.date },
  main: () => [
    pageHero({
      crumbs: [{ name: 'Field notes', href: '/blog/' }, { name: 'How a rental works' }],
      eyebrow: 'Field notes',
      title: post.headline,
      meta: 'August 31, 2026 · 3 min read',
      image: post.image,
      imageAlt: post.imageAlt,
      actions: false,
    }),

    article({
      blocks: [
        { paras: ['Most people who call us have never rented a fence before. The project manager has done it fifty times, but the event planner, the church facilities director and the homeowner-turned-GC on a teardown usually haven\'t. This is the whole process, in the order it actually happens.'] },
        { heading: 'The five things we need to quote you', paras: [
          'Every quote comes down to the same five inputs: where the project is, which fence style you want, how many linear feet, how many gates, and how long the fence stays up. If you have those five, a phone call gets you a verbal number on the spot.',
          'If you\'d rather not talk yet, the [self-serve estimator](/estimate/) takes the same five inputs and lets you draw the run on a map.',
        ] },
        { heading: 'Panels or post-driven, decided by your ground and your timeline', paras: [
          'Freestanding [panels](/fence/panels-and-stands/) sit in stands with sandbags, go up fast, and can be shifted by your own crew as the job changes. [Post-driven chain link](/fence/post-driven-chain-link/) goes into the ground, doesn\'t move, and is the right call when the fence has to keep pedestrians and intruders out for months. We walk through this on the first call.',
        ] },
        { heading: 'From yes to standing fence', paras: [
          'After the verbal number comes a written proposal. Established commercial accounts run on Net 30; smaller or first-time rentals pay up front. Then the install gets scheduled. We\'re built for a 24 to 48 hour turnaround, and same-day changes on a live site are normal for us, because a construction schedule doesn\'t wait for a fence vendor.',
        ] },
        { heading: 'While the fence is up', paras: [
          'The rental includes service during the term. Gates move, runs get extended, a storm knocks a panel line over, an inspector wants an opening somewhere new: you call, we come.',
        ] },
        { heading: 'When the job wraps', paras: [
          'You call, we pick the fence up. There\'s no removal charge and no rent that keeps running while you wait on a final inspection. The flat fee you agreed to is the number you pay.',
        ] },
        { heading: 'What to have ready before you call', paras: [
          'You don\'t need drawings. A site address, a rough sense of the perimeter, and your dates cover most of it. If you can walk the line with your phone and read us the long sides, that\'s enough for a real number.',
          'For events, tell us whether the fence is holding a crowd back or holding a perimeter, because [crowd-control barricades](/fence/barricades/) and fence panels are different products, and we rent both.',
        ] },
        { heading: 'The add-ons people ask about mid-rental', paras: [
          '[Windscreen](/fence/windscreen/) is the common one. It adds privacy, holds down dust, and turns a chain link run into signage if you print on it. It\'s sold rather than rented, so it\'s yours to keep for the next project. Eight-foot fencing is available as a special order for sites that need more height. All of it can be added to a rental that\'s already standing.',
        ] },
        { heading: 'Where we do this', paras: [
          'We\'re based in Greenwood and cover the Indianapolis metro and roughly eighty miles around downtown: construction sites, special events, and emergency response after a fire or a storm. The [service area page](/service-area/) names the towns we work most.',
        ] },
      ],
    }),

    ctaBand(),
  ].join('\n'),
};
