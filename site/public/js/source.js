// Where a lead came from. Shared by the server (cleaning what forms send) and the Quote Inbox (showing it).
// The browser side that records the visit lives in main.js (window.fwSource).

// "How did you hear about us?" choices (optional on every form)
export const HEARD_ABOUT = [
  'Google search',
  'Google Maps',
  'Saw your fence on a job site',
  'Word of mouth / referral',
  'Worked with you before',
  'Social media',
  'Other',
];

const KEYS = ['gclid', 'gbraid', 'wbraid', 'msclkid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'referrer', 'landing'];
const GOOGLE_IDS = ['gclid', 'gbraid', 'wbraid'];
const CLICK_IDS = [...GOOGLE_IDS, 'msclkid']; // msclkid = Microsoft Advertising's click id

// Keep only the fields we expect, in the shapes we expect. Returns null when there's nothing useful.
export function cleanSource(raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const out = {};
  for (const k of KEYS) if (typeof raw[k] === 'string' && raw[k].trim()) out[k] = raw[k].trim().slice(0, 200);
  for (const k of CLICK_IDS) if (out[k] && !/^[\w-]+$/.test(out[k])) delete out[k];
  if (out.landing && !/^\/[\w\-/.]*$/.test(out.landing)) delete out.landing;
  if (out.referrer && !/^[a-z0-9.-]+(:\d+)?$/i.test(out.referrer)) delete out.referrer;
  const t = Number(raw.t);
  if (Number.isFinite(t) && t > Date.UTC(2026, 0, 1) && t < Date.now() + 864e5) out.first_seen = new Date(t).toISOString();
  return Object.keys(out).length ? out : null;
}

export const cleanHeard = v => (HEARD_ABOUT.includes(v) ? v : null);

export const isAdClick = s => !!s && (CLICK_IDS.some(k => s[k]) || /^(cpc|ppc|paid)/i.test(s.utm_medium || ''));

// Plain-English label for the Inbox and emails: { kind, label, detail }
export function sourceLabel(s) {
  if (!s) return { kind: 'unknown', label: 'Not recorded', detail: '' };
  const campaign = [s.utm_campaign, s.utm_term].filter(Boolean).join(' · ');
  if (isAdClick(s)) {
    const label = GOOGLE_IDS.some(k => s[k]) ? 'Google Ads'
      : s.msclkid || /bing|microsoft/i.test(s.utm_source || '') ? 'Microsoft Ads'
      : /google/i.test(s.utm_source || '') ? 'Google Ads'
      : `${s.utm_source || 'Paid'} ads`;
    return { kind: 'ads', label, detail: campaign };
  }
  if (s.utm_source) return { kind: 'campaign', label: s.utm_source, detail: campaign };
  const r = (s.referrer || '').toLowerCase().replace(/^www\./, '');
  if (/(^|\.)google\./.test(r)) return { kind: 'search', label: 'Google search or Maps', detail: '' };
  if (/(^|\.)(bing|duckduckgo|yahoo|ecosia)\./.test(r)) return { kind: 'search', label: 'Other search engine', detail: r };
  if (/(^|\.)(facebook|instagram|linkedin|nextdoor|youtube|x)\.com$|^t\.co$|^lnkd\.in$/.test(r)) return { kind: 'social', label: 'Social media', detail: r };
  if (r) return { kind: 'referral', label: 'Another website', detail: r };
  return { kind: 'direct', label: 'Direct visit', detail: 'Typed the address, a bookmark, or an app that hides where it came from' };
}
