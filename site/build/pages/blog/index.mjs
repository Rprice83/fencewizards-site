import { pageHero, intro, features, ctaBand, recentJobs } from '../../lib/components.mjs';
import { post as rentalWorks } from './how-a-temporary-fence-rental-works.mjs';
import { post as emergency } from './emergency-fence-rental-indiana-same-week-perimeter-fencing-after-storms-fires-and-break-ins.mjs';
import { post as costGuide } from './how-much-does-temporary-fence-rental-cost.mjs';
import { post as postDriven } from './post-driven-chain-link-fence-rental-flood-repair-public-works-hamilton-marion-county.mjs';
import { post as windscreen } from './printed-windscreen-for-construction-fence-indianapolis-branding-privacy-dust-control.mjs';
import { post as panels } from './temporary-fence-panels-for-rent-in-indianapolis-fast-setup-flexible-configuratio-1788192322725.mjs';
import { post as eventPerimeter } from './event-fence-rental-indianapolis-how-festivals-races-and-venues-plan-a-temporary-perimeter.mjs';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const formatDate = iso => { const [y, m, d] = iso.split('-').map(Number); return `${MONTHS[m - 1]} ${d}, ${y}`; };

// Newest first; posts sharing a date keep the order of the original index.
const POSTS = [emergency, windscreen, postDriven, costGuide, panels, eventPerimeter, rentalWorks]
  .map((p, i) => ({ p, i }))
  .sort((a, b) => b.p.date.localeCompare(a.p.date) || a.i - b.i)
  .map(({ p }) => p);

export default {
  path: '/blog/',
  title: 'Field notes | Temporary fence rental, Indianapolis | Fence Wizards',
  description: 'Practical notes on temporary fence rental in Indianapolis: how a rental runs, what to have ready, and what we see on real job sites.',
  ogImage: 'truck-and-panels',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Field notes' }],
      eyebrow: 'Field notes',
      title: 'Field notes from *the fence line.*',
      image: 'truck-and-panels',
      imageAlt: 'Fence Wizards pickup truck with a trailer loaded with fence panels',
      actions: false,
    }),

    intro({
      lead: 'What we learn on Indianapolis job sites, written down: how rentals actually run, what holds a project up, and the questions superintendents and event planners ask us every week.',
      paras: ['New notes land here as we write them, along with job stories from sites we\'ve fenced.'],
    }),

    // Job stories from content/field-notes/ (appears once the first one is published)
    recentJobs({ eyebrow: 'Job stories', heading: 'Latest from *the job sites.*', intro: 'What we put on the ground lately, where, and what it took. Photos are from the actual jobs.', limit: 12, tone: 'white' }),

    features({
      eyebrow: 'Guides',
      heading: 'Before you *rent a fence.*',
      cols: 3,
      tone: 'paper',
      items: POSTS.map(post => ({
        title: post.headline,
        text: post.summary,
        image: post.image,
        imageAlt: post.imageAlt,
        href: post.path,
        label: formatDate(post.date),
      })),
    }),

    ctaBand(),
  ].join('\n'),
};
