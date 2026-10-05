// Shared business facts and navigation. Change things here once, every page updates.

export const SITE = {
  name: 'Fence Wizards',
  url: 'https://www.fencewizards.com',
  phone: '(317) 296-4015',
  tel: '+13172964015',
  email: 'richard@fencewizards.com',
  street: '1176 Newark Ct',
  city: 'Greenwood',
  region: 'IN',
  zip: '46143',
  hours: '7:30am–9pm, seven days',
  geo: { lat: 39.5962, lng: -86.1368 },
  rating: { value: '4.6', count: 39 }, // TODO.md: confirm current Google rating before launch
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Fence+Wizards+Rent+A+Fence+Greenwood+IN',
};

// Third-party services wired into the pages. Public IDs only (secrets live in Cloudflare, never here).
export const INTEGRATIONS = {
  // Cloudflare Turnstile (spam check on every form). This is Cloudflare's public TEST key: always passes, invisible.
  // TODO.md: replace with the real site key from Fence Wizards' Cloudflare account at launch (and set TURNSTILE_SECRET).
  turnstileSiteKey: '1x00000000000000000000BB',
};

export const USES = [
  { slug: 'construction', href: '/construction-fencing/', name: 'Construction', long: 'Construction site fencing', blurb: 'Panels, chain link, gates and windscreen for sites that keep changing.' },
  { slug: 'events', href: '/event-fencing/', name: 'Events', long: 'Event fencing', blurb: 'Barricades and panel runs set on your run of show.' },
  { slug: 'emergency', href: '/emergency-fencing/', name: 'Emergency & Restoration', long: 'Emergency and restoration fencing', blurb: 'Storm, fire and break-in response across central Indiana.' },
];

export const TYPES = [
  { slug: 'panels', href: '/fence/panels-and-stands/', name: 'Panels & Stands', long: 'Panels and stands', blurb: 'Portable and sandbagged, quick to set, easy for your own crew to shift.', image: 'school-building-panels' },
  { slug: 'driven', href: '/fence/post-driven-chain-link/', name: 'Post-Driven Chain Link', long: 'Post-driven chain link', blurb: 'Driven into the ground so it cannot be lifted or walked through.', image: 'open-field-run' },
  { slug: 'windscreen', href: '/fence/windscreen/', name: 'Windscreen', long: 'Windscreen', blurb: 'Plain or custom printed, fitted across the run and sold rather than rented.', image: 'windscreen-building-run' },
  { slug: 'barricades', href: '/fence/barricades/', name: 'Crowd-Control Barricades', long: 'Crowd-control barricades', blurb: 'Interlocking steel for queue lines, stage fronts and vehicle separation.', image: 'barricades-indoor-line' },
];

// Order roughly by distance from Indianapolis; `drive` from the original location pages
export const CITIES = [
  { slug: 'indianapolis', name: 'Indianapolis', county: 'Marion County', lat: 39.7684, lng: -86.1581 },
  { slug: 'greenwood', name: 'Greenwood', county: 'Johnson County', lat: 39.6137, lng: -86.1067 },
  { slug: 'speedway', name: 'Speedway', county: 'Marion County', lat: 39.8020, lng: -86.2672 },
  { slug: 'carmel', name: 'Carmel', county: 'Hamilton County', lat: 39.9784, lng: -86.1180 },
  { slug: 'fishers', name: 'Fishers', county: 'Hamilton County', lat: 39.9568, lng: -86.0134 },
  { slug: 'westfield', name: 'Westfield', county: 'Hamilton County', lat: 40.0428, lng: -86.1275 },
  { slug: 'noblesville', name: 'Noblesville', county: 'Hamilton County', lat: 40.0456, lng: -86.0086 },
  { slug: 'zionsville', name: 'Zionsville', county: 'Boone County', lat: 39.9509, lng: -86.2614 },
  { slug: 'avon', name: 'Avon', county: 'Hendricks County', lat: 39.7628, lng: -86.3997 },
  { slug: 'brownsburg', name: 'Brownsburg', county: 'Hendricks County', lat: 39.8434, lng: -86.3978 },
  { slug: 'plainfield', name: 'Plainfield', county: 'Hendricks County', lat: 39.7042, lng: -86.3994 },
  { slug: 'franklin', name: 'Franklin', county: 'Johnson County', lat: 39.4806, lng: -86.0550 },
  { slug: 'anderson', name: 'Anderson', county: 'Madison County', lat: 40.1053, lng: -85.6803 },
  { slug: 'muncie', name: 'Muncie', county: 'Delaware County', lat: 40.1934, lng: -85.3864 },
  { slug: 'columbus', name: 'Columbus', county: 'Bartholomew County', lat: 39.2014, lng: -85.9214 },
  { slug: 'bloomington', name: 'Bloomington', county: 'Monroe County', lat: 39.1653, lng: -86.5264 },
  { slug: 'lafayette', name: 'Lafayette', county: 'Tippecanoe County', lat: 40.4167, lng: -86.8753 },
  { slug: 'terre-haute', name: 'Terre Haute', county: 'Vigo County', lat: 39.4667, lng: -87.4139 },
  { slug: 'richmond', name: 'Richmond', county: 'Wayne County', lat: 39.8289, lng: -84.8902 },
];
export const cityHref = slug => `/service-area/${slug}/`;
export const city = slug => {
  const c = CITIES.find(x => x.slug === slug);
  if (!c) throw new Error(`Unknown city slug: ${slug}`);
  return c;
};

export const COMPANY = [
  { href: '/about/', name: 'About', blurb: 'Three generations of fencing, out of Greenwood.' },
  { href: '/faq/', name: 'Questions', blurb: 'Straight answers on rentals, timing and terms.' },
  { href: '/blog/', name: 'Field Notes', blurb: 'Guides and stories from the fence line.' },
  { href: '/contact/', name: 'Contact', blurb: 'Talk to Richard directly.' },
];

// "Before you call" links that close out most pages on the original site
export const BEFORE_YOU_CALL = [
  { href: '/#pricing', name: 'How the flat fee works' }, // TODO.md: point to /pricing/ once that page is built
  { href: '/faq/', name: 'Questions we get every week' },
  { href: '/about/', name: 'Who you are dealing with' },
  { href: '/contact/', name: 'Talk to Richard' },
];
