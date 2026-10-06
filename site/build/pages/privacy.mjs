// Privacy policy. DRAFT: items marked in TODO.md (legal entity name, retention periods, effective date)
// must be confirmed by Richard before launch, and the provider list must match what is actually live.
import { pageHero, article } from '../lib/components.mjs';
import { SITE, INTEGRATIONS } from '../lib/site.mjs';

// The cookie and provider wording follows whether the Google tag is actually switched on
const GOOGLE_TAG = !!(INTEGRATIONS.googleAdsId || INTEGRATIONS.ga4Id);
const MS_TAG = !!INTEGRATIONS.microsoftUetId;

const UPDATED = 'October 2, 2026'; // TODO.md: set to the launch date

const aside = `<div class="aside-card">
    <p class="eyebrow dark"><span class="slash" aria-hidden="true"></span>Privacy questions</p>
    <p>Ask Richard directly. He'll tell you what we have and remove it if you ask.</p>
    <a href="mailto:${SITE.email}?subject=Privacy%20request" class="btn btn-red btn-block">Email Richard</a>
    <a href="tel:${SITE.tel}" class="aside-phone">${SITE.phone}</a>
  </div>`;

export default {
  path: '/privacy/',
  title: 'Privacy Policy | Fence Wizards',
  description: 'How Fence Wizards collects, uses and protects the information you send through our website, estimator and forms.',
  main: () => [
    pageHero({
      crumbs: [{ name: 'Privacy policy' }],
      eyebrow: 'Privacy policy',
      title: 'Your details, *used for your job.*',
      lede: 'What we collect when you use this website, why, who helps us handle it, and how to have it removed.',
      meta: `Last updated ${UPDATED}`,
      actions: false,
    }),

    article({
      aside,
      blocks: [
        { paras: [
          `This policy covers ${SITE.url.replace('https://', '')} and the forms, fence estimator and email we use to answer you. Fence Wizards ("we", "us") is a temporary fence rental company based at ${SITE.street}, ${SITE.city}, Indiana ${SITE.zip}. The short version: we collect what you send us so we can quote and run your job, we don't sell it, and we'll delete it if you ask.`,
        ] },

        { heading: 'What we collect', paras: ['**What you give us.** When you use the quote form, the contact form or the fence estimator, we receive what you enter:'], list: [
          'Your name, phone number, email address and company name',
          'The project address or location, and anything you write in the notes or comments',
          'Files you attach, such as site plans, drawings and photos',
          'Your fence plan from the estimator: the lines and gates you draw on the map (as map coordinates), the measured lengths, the options you choose, and the preliminary estimate',
        ] },
        { paras: [
          '**What your browser sends automatically.** When you submit a form we record the date and time, the page you sent it from, and your browser\'s user-agent (the browser and device type). Our hosting provider also keeps standard server logs, which include IP addresses, to run and protect the site.',
          '**How you found us.** So we know which advertising works, the site remembers in your browser (for up to 90 days) how you first arrived: the website that sent you, the first page you saw, and, if you clicked one of our ads on Google or Microsoft (Bing), the ad\'s click code and campaign. This is sent with any form you submit, together with your answer to "How did you hear about us?" if you give one.',
          '**What stays on your device.** The estimator saves your plan in your browser\'s local storage, so a refresh doesn\'t lose your work. That copy never leaves your device unless you send the plan, and it\'s cleared when you do. If you press "Use my location", your browser asks permission and uses your location only to center the map. We receive coordinates only for a fence you draw and send.',
          GOOGLE_TAG || MS_TAG
            ? `**Cookies.** We use ${[GOOGLE_TAG && 'Google Ads and Google Analytics', MS_TAG && 'Microsoft Advertising'].filter(Boolean).join(' and ')} cookies to measure which ads and pages lead to quote requests and calls (see "Who helps us handle it"). We don't use them to show you ads on other sites based on your visit here.`
            : 'We don\'t use advertising cookies, tracking pixels or analytics on this site.',
        ] },

        { heading: 'How we use it', list: [
          'To price your job, call or email you back, and schedule, run and remove your fence',
          'To keep a record of quotes and conversations so anyone at Fence Wizards who picks up your call has the details',
          'To send invoices and payment requests for work you\'ve agreed to',
          'To keep the website working and to stop spam and abuse',
        ], paras: [] },
        { paras: ['We don\'t sell your information, share it for advertising, or add you to a mailing list. We only contact you about the project you asked about, unless you ask us to.'] },

        { heading: 'Who helps us handle it', paras: [
          'A few service providers process information for us, only to provide their service:',
        ], list: [
          '**Cloudflare** hosts the website and stores form submissions and estimator plans. Its Turnstile check runs on our forms to stop spam bots; it looks at technical signals from your browser, not the details you type.',
          '**Resend** delivers the emails that send your request to Richard, including any files you attach.',
          '**Map providers.** The estimator\'s satellite and street maps come from Esri, and address search from OpenStreetMap\'s Nominatim service. When you search, the text you type is sent to that service. The Contact and Service Area pages show an embedded Google Map, and Google may set its own cookies when it loads.',
          '**Fonts and code libraries** come from Google Fonts and cdnjs (Cloudflare). Your browser contacts them to load the page.',
          ...(GOOGLE_TAG ? ['**Google Ads and Google Analytics** measure visits and conversions: whether a visit from one of our ads led to a form being sent or a call, and which pages people use. They set cookies and receive technical details such as your device, browser and approximate location. When a job is won, we may tell Google Ads the ad\'s click code and the job\'s value, not your name or contact details. Visitors who arrive from an ad may see a Google forwarding phone number that rings straight to Richard, so calls from ads can be counted. You can turn off Google\'s ad personalization at [adssettings.google.com](https://adssettings.google.com).'] : []),
          ...(MS_TAG ? ['**Microsoft Advertising** measures whether a visit from one of our ads on Bing, Yahoo, DuckDuckGo or other Microsoft search led to a form being sent or a phone tap. It sets cookies and receives technical details such as your device and browser. When a job is won, we may tell Microsoft the ad\'s click code and the job\'s value, not your name or contact details. You can manage Microsoft\'s ad personalization at [account.microsoft.com/privacy/ad-settings](https://account.microsoft.com/privacy/ad-settings).'] : []),
        ] },
        { paras: [
          'Each provider handles data under its own privacy policy. We may also share information when the law requires it, to protect our rights or someone\'s safety, or with your insurer or adjuster if you ask us to for a claim.',
        ] },

        { heading: 'How long we keep it', paras: [
          'We keep quote requests, messages and plans for as long as they\'re useful for your project and our business records, including tax and insurance requirements. Files you attach go to Richard by email and are not stored on the website. If you ask us to delete your information, we will, except for what we have to keep by law, such as invoices.',
        ] },

        { heading: 'How we protect it', paras: [
          'The site runs only over an encrypted (HTTPS) connection. Submissions are stored with our hosting provider and are only accessible to Fence Wizards. No system is perfectly secure, so please don\'t send payment card numbers or passwords through our forms. We\'ll never ask for them that way.',
        ] },

        { heading: 'Your choices', paras: [
          `You can ask us what information we have about you, ask us to correct it, or ask us to delete it. Email [${SITE.email}](mailto:${SITE.email}) or call ${SITE.phone}. We may need to confirm it's you before we act on a request. You can also clear the estimator's saved plan at any time by clearing your browser's site data.`,
        ] },

        { heading: 'Children', paras: [
          'This site is for businesses and adults arranging fence rentals. We don\'t knowingly collect information from children under 13. If you believe a child has sent us information, contact us and we\'ll delete it.',
        ] },

        { heading: 'Changes to this policy', paras: [
          'If we change how we handle information, for example when we add online payments, we\'ll update this page and the date at the top.',
        ] },

        { heading: 'Contact', paras: [
          `Fence Wizards, ${SITE.street}, ${SITE.city}, IN ${SITE.zip}. Phone ${SITE.phone}. Email [${SITE.email}](mailto:${SITE.email}).`,
        ] },
      ],
    }),
  ].join('\n'),
};
