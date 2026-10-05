// The map estimator (/estimate/) and its confirmation page. Markup lives in build/partials/.
import { readFileSync } from 'node:fs';
import { turnstileWidget } from '../lib/components.mjs';

const partial = name => readFileSync(new URL(`../partials/${name}`, import.meta.url), 'utf8');

export default [
  {
    path: '/estimate/',
    title: 'Plan & Price Your Fence | Fence Wizards',
    description: 'Draw your temporary fence on a satellite map, choose your rental options, and get a preliminary estimate from Fence Wizards in minutes.',
    ogImage: 'truck-trailer-load',
    solidHeader: true,
    hideFooter: true,
    bodyClass: 'app-page',
    mainClass: 'planner',
    head: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css">',
    styles: ['/estimate/estimate.css'],
    scripts: [
      '<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>',
      '<script type="module" src="/estimate/estimate.js"></script>',
    ],
    main: partial('estimate.html').replace('<!--TURNSTILE-->', turnstileWidget()),
  },
  {
    path: '/quote-confirmation/',
    title: 'Plan Received | Fence Wizards',
    description: 'Your fence plan is on its way to Richard. He will reach out within 24 hours.',
    noindex: true,
    solidHeader: true,
    mainClass: 'confirm',
    styles: ['/quote-confirmation/confirmation.css'],
    scripts: [partial('confirmation-script.html')],
    main: partial('confirmation.html'),
  },
];
