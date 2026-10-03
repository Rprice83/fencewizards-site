import { pageHero, cityList } from '../lib/components.mjs';
import { SITE } from '../lib/site.mjs';

export default {
  path: '/404/',
  title: 'Page Not Found | Fence Wizards',
  description: 'That page has moved or never existed.',
  noindex: true,
  main: () => [
    pageHero({
      crumbs: [{ name: 'Page not found' }],
      eyebrow: '404',
      title: 'This fence line *doesn\'t go anywhere.*',
      lede: `That page has moved or never existed. Try one of these, or call Richard at ${SITE.phone}.`,
      image: 'gate-across-lot',
      imageAlt: 'A temporary fence gate across an empty lot',
    }),
    cityList({ eyebrow: 'Looking for a town?', heading: 'Where *we work.*' }),
  ].join('\n'),
};
