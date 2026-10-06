# Fence Wizards — To-do

> **Questions for Richard** are collected in the shared doc "Fence Wizards Website — Questions for Richard" (https://claude.ai/code/artifact/ad94b6da-7898-4b05-8d0a-eede7e764fac). Update this list as his answers come in.

## Open issues
- [ ] (Low priority now that the hosted demo exists; the Mac demo worked at the meeting.) **Mac preview "write EPIPE" error** with mac/Start Website Preview.command on the user's MacBook. Get the macOS version + chip and the Terminal output. Likely an old macOS (workerd needs ~13.5+); fix or document. The backup `Start Simple Preview (no forms).command` works meanwhile. Rebuild the Mac zip afterwards.

## Accounts & keys (needed before launch)
- [ ] **Before Richard fires his current website company:** confirm *he* owns (logins in his name) the fencewizards.com domain registrar account, DNS, email (richard@fencewizards.com), Google Ads, Google Analytics, Google Business Profile and Search Console. Get access transferred first, then cut over.
- [ ] **URL match at launch (checked 2026-10-03):** every address in the live fencewizards.com sitemap exists on the new site, except `/pricing/` (temporary 302 to `/#pricing` in `site/public/_redirects`; remove when the page is built). Right before launch, re-run the check (live sitemap vs `site/public/.generated-pages.json`), because the current company may publish new posts. One did: the Aug 31 event-fence post, now copied. Then submit the new sitemap in Search Console.
- [ ] At launch: make `fencewizards.com` (no www) redirect to `https://www.fencewizards.com` (it currently serves the site on both). Also redirect Richard's other domains seen in his Google Ads history, **fencerentalnearme.com** and **thefencewizards.com**, to the matching new pages if he owns them (ask).
- [ ] **Google Maps + Places (browser key): the user has it** from Richard's Google Cloud project (Maps + Places enabled; never commit it to git or paste it in chat). The user believes it's restricted to the fencewizards.com domain. To use it on the demo and for local testing, add website restrictions `fencewizards.pages.dev/*` and `localhost:8788/*` (alongside `www.fencewizards.com/*` and `fencewizards.com/*`). Then switch the estimator to Google: satellite map + drawing (replaces the free Esri imagery, whose terms restrict commercial use) and address autocomplete (replaces OpenStreetMap/Nominatim, which allows no autocomplete and 1 request/second). `public/estimate/map-providers.js` is the file to change.
- [x] Hosted demo: Pages project `fencewizards` + D1 `fencewizards-quotes` in the user's Cloudflare account, auto-deploying from GitHub (2026-10-03).
- [ ] At launch: **production stays in the user's Cloudflare account** (managed service, decided 2026-10-05), same Pages project `fencewizards` and D1. Add www.fencewizards.com as a custom domain on the Pages project. The domain itself stays registered in Richard's name; either move its DNS (nameservers) to the user's Cloudflare account or add a CNAME at his DNS host. Clear the test quotes out of D1 before go-live.
- [x] Quote Inbox on the demo: Cloudflare Access (team limestone-web-co, Google sign-in) for Richard + the user (2026-10-03).
- [ ] Resend account: verify the sending domain (fencewizards.com), then set the `RESEND_API_KEY`, `QUOTE_FROM` and `QUOTE_TO` secrets in Cloudflare.
- [x] Cloudflare Turnstile spam check on all three forms (estimator, quick quote, contact), verified on the server (`server/turnstile.js`), plus the honeypot. Built 2026-10-05; demo uses Cloudflare's public test keys.
- [ ] **At launch:** create a Turnstile widget in the user's Cloudflare account (hostnames www.fencewizards.com + fencewizards.pages.dev), put its site key in `INTEGRATIONS.turnstileSiteKey` (`site/build/lib/site.mjs`) and its secret as the `TURNSTILE_SECRET` Pages secret. Without the secret the check is skipped.
- [ ] Send a real test quote to richard@fencewizards.com once Resend is set up, and confirm it lands in the inbox, not spam.
- [ ] **Footer credit** "Website by Limestone Web Co" links to https://limestonewebco.com (`CREDIT` in `site/build/lib/site.mjs`). On 2026-10-05 that domain didn't load yet: make sure it's live before launch (or set `url: ''` for plain text). Richard should OK the credit.
- [ ] Final logo SVGs from the designer (current logos are cropped from the PDF proof).
- [ ] License the Shuttleblock Narrow Bold Italic font (Barlow Condensed is the stand-in).

## Pricing questions for Richard
- [ ] **Panels & stands, 19–23 months**: the sheet has no rate. The estimator temporarily uses $8.20/ft (the 24+ rate).
- [ ] **Minimum charge** for a new installation: is there one? Not applied in the estimator yet.
- [ ] Term boundaries: the estimator reads "up to 12 / 12–18" as ≤12 and 13–18 months, and "up to 18 / 18–24 / 24 and on" as ≤18, 19–23 and 24+. Confirm.
- [ ] Standard panel width (the estimator assumes 10 ft panels to estimate stand counts for windscreen ballast).
- [ ] Do gate openings get deducted from billed footage? (Currently not deducted.)
- [x] The 50+ mile surcharge: Richard wants **driving miles from downtown Indianapolis** (his yard is downtown), straight line as the fallback. Built 2026-10-05: `server/distance.js` (Google Routes API, 2.5 s timeout, D1 cache per ~100 m), `/api/distance` for the live estimate, quote API recomputes on submit; email/Inbox say "driving" or "straight line".
- [ ] **Driving-miles key (user to do; keys live in Richard's Google Cloud project):** (1) APIs & Services → Library → enable **Routes API**; (2) Credentials → create a **new** key "Fence Wizards server (Routes)": application restriction **None** (server calls), API restriction **Routes API only**; (3) Routes API → Quotas → cap "Compute routes" at ~500/day, plus an optional ~$10/month budget alert; (4) the user sets it themselves (never paste keys in chat): `npx wrangler pages secret put GOOGLE_MAPS_SERVER_KEY --project-name fencewizards` from `site/`; (5) Claude redeploys and confirms `/api/distance` on the demo returns `"method":"driving"`. Until then the estimator uses straight-line miles. Optional: ask Richard whether to keep the 50-mile cutoff now that road miles run ~20–30% higher than straight-line.
- [ ] Branded windscreen orders under 6 ("slightly more per unit"): the estimator prices at $800 each and flags it for Richard.
- [ ] Sales tax: estimates are shown pre-tax.
- [ ] Short-term/event discounts: the homepage mentions a short-job discount, but the price sheet lists none.
- [ ] The homepage says panels come in 6 and 8 ft; the price sheet lists 8 ft as special order. Align the copy.

## Pages & content
- [ ] **Pricing page (/pricing/):** on hold, waiting on Richard. Until it exists, "Pricing" links go to the flat-price section on the homepage (`/#pricing`). When it's built, update `BEFORE_YOU_CALL` and the nav in `site/build/lib/site.mjs` and `layout.mjs`.
- [ ] **Privacy policy (/privacy/): drafted, needs Richard's review before launch:**
  - Confirm the legal business name (e.g. an LLC name) to use instead of just "Fence Wizards".
  - Decide how long quotes and messages are kept (the draft says "as long as useful for the project and business records").
  - Set the "Last updated" date to the launch date (`UPDATED` in `site/build/pages/privacy.mjs`).
  - Update the provider list if anything changes: Google Maps replacing Esri/OpenStreetMap, analytics, Stripe payments.
  - Optional: have a lawyer look it over. It's written for a small Indiana B2B business, not legal advice.
- [ ] Richard to review the pricing wording changed to match the August price sheet:
  - Removed the "standard rental runs up to 12 months" and "short-job discount" claims on Construction, Anderson, Lafayette, FAQ, the How a Rental Works post, and the cost guide.
  - 8 ft fencing now reads as a special order (Panels, Post-Driven, FAQ, How It Works post).
  - Homepage: the "12 mo" stat is now "1 price, agreed up front", and the "Short jobs: discounted" comparison row is gone.
  - **The cost guide post** (`/blog/how-much-does-temporary-fence-rental-cost/`) originally framed panels as the cheaper option; the price sheet says post-driven is cheaper per foot. Those statements were removed or neutralized, so the post needs a proper look.
- [ ] Panels page says install is "usually same or next day", while everything else says 24 to 48 hours. Pick one.
- [ ] The windscreen blog post says the screen is quoted "as one line on the rental", but elsewhere windscreen is "sold, not rented". Reconcile.
- [ ] About page: confirm "NBA All-Star Game Google Pixel event" is one site, not two.
- [ ] Fishers page links to fishersin.gov (couldn't be checked automatically, so verify by hand). Plainfield, Avon, Muncie and Westfield links were updated to their current official sites.
- [ ] Refresh the Google rating (4.6 from 39 reviews) before launch. It's set once in `site/build/lib/site.mjs`.

## Google Ads + landing pages (next workstream: start a new chat in this folder)
Plan agreed 2026-10-02. Order: tracking → review Richard's account exports → landing pages → restructure campaigns.
- [x] **Step 2, website lead tracking (built 2026-10-05):** Google tag in `build/lib/layout.mjs` (`googleTag()`), switched on by the IDs in `INTEGRATIONS` (`build/lib/site.mjs`); empty IDs = no Google code at all. Events from `window.fwTrack` in `public/js/main.js`: "Website lead" conversion + GA4 `generate_lead` on a successful quick/contact form and once on the estimator confirmation page (request id as transaction_id, so no double counting); "Phone tap" conversion + GA4 `phone_tap` on any tel: link; website call conversion via Google forwarding number for ad visitors. The privacy policy switches its cookie/provider wording automatically. Tested with pretend IDs.
- [ ] **MUST BE DONE AT LAUNCH (Step 2 hookup, with Richard's OK):** (1) create a GA4 property in Richard's Google account (add the user as editor) → `ga4Id`; (2) in Google Ads create three website conversions: **Website lead** (primary), **Phone tap** (secondary, so it doesn't double-count calls) and **Calls from website** (60s+, primary) → put the AW- ID and each label in `INTEGRATIONS`; (3) link GA4 to Google Ads; (4) build, deploy, then check with Google Tag Assistant that each event fires; (5) after a week, confirm conversions show in Google Ads.
- [x] **Step 3, which ads become jobs (built 2026-10-05):** gclid/UTM/referrer remembered 90 days and saved with every quote and inquiry (`public/js/source.js`, migration 0004); "How did you hear about us?" on every form; Source shown in the Quote Inbox and Richard's emails; job amount asked when marked **Won**; Won tab → "Download for Google Ads" CSV (`server/google-ads.js`). Auto-tagging confirmed on in Richard's account.
- [ ] **Google Ads side of Step 3 (with Richard's OK):** create a conversion action named exactly **"Won job"** (Goals → Conversions → New → Import → Other data sources or CRMs → Track conversions from clicks; category Purchase/Qualified lead; value from the file; count One). Then upload the Won-tab file monthly (Goals → Conversions → Uploads). Later: automate the upload via the Google Ads API, and consider enhanced conversions for leads (hashed email/phone) for leads without a click id.
- [x] **Step 1, clean up tracking inside Google Ads:** done 2026-10-04 (log: marketing/google-ads/changelog.md). Before/after check due ~2026-11-01 to 11-15. (calls from ads ≥60s, remove/demote dead and misconfigured conversion actions, turn off auto-apply "Upgrade your conversion tracking"). Meanwhile Richard asks every caller "How did you hear about us?"
- [x] (2026-10-03: received; first analysis in marketing/google-ads/analysis-2026-10-03.md. Still need Quality Score columns, campaign settings screenshots, device + day/hour reports, auto-apply screenshot, and Richard's answers.) **Get exports from Richard's account** (read-only is fine): search terms report (90 days), campaigns/ad groups/keywords with cost and conversions, current ads, conversion actions, budget/location/schedule settings. Save them in `marketing/google-ads/`.
- [ ] **Microsoft Advertising test (Richard is interested; after launch + Google fixes):** about 4–6 weeks after launch, import the *cleaned-up* Google campaign into Microsoft Ads (not the current one), add LinkedIn profile targeting (industry: construction; job functions like project manager / estimator), and run a separate small test budget (~$300–500/mo) for 2–3 months, then compare cost per lead / won job with Google. Needs: the Microsoft UET tag + conversion goals in `googleTag()`/`fwTrack` (or a sibling), Microsoft offline conversion import for Won jobs (`msclkid` capture + "Microsoft Ads" label already built 2026-10-05), and Microsoft offline conversion import for Won jobs.
- [x] **Ad landing pages built (2026-10-05):** `/go/construction-fence-rental/`, `/go/event-fencing-barricades/`, `/go/emergency-fencing/` (call first), `/go/temporary-fence-rental/` (`site/build/pages/go/`, hero in `build/lib/landing.mjs`). `landing: true` = no menu + short footer with address/contact/privacy; `noindex` and not in the sitemap. Copy reused from the site's own pages (no new facts or prices). **Richard to approve** before ads point at them; open facts they repeat: past-sites list (question 1.7), "24 to 48 hours" (3.2). **At launch:** point each ad group's final URL at its page (construction → construction, events/barricades → events, emergency/after-hours → emergency, broad "fence rental near me"/"rent a fence" → general); review after 4–6 weeks; then one Google Ads experiment (e.g. headline, or call vs. price as the main button).
- [ ] (Original plan, for reference) **Landing pages** under `/go/…`: noindex, minimal header, one goal (call / short form / estimator), headline matching the ad, proof, 3–4 FAQs. Likely set: general rental, construction, events & barricades, emergency (call-first), maybe post-driven. Final list depends on the search terms.
- [ ] **Account cleanup:** heavy negative keywords (residential, backyard/dog/privacy fence, installers, repair, panels for sale, jobs), location = presence in the 80-mile radius, call ads during 7:30am–9pm, never send ads to the homepage.

## Operations & reporting roadmap (future, after Google Ads)
Goal: management reporting for Richard (complements his bookkeeper/CPA, doesn't replace them). Build in the staff area behind the same Access login.
- [ ] **Job records:** "Won" quote → job with install/removal dates, actual footage, and panels/stands/gates used; term-ending reminders (extension upsell).
- [ ] **Inventory:** counts by type (panels, stands, driven posts, gates, sandbags, barricades), what's in the yard vs out on jobs, damaged/lost.
- [ ] **Accounting link:** connect his bookkeeping (QuickBooks / Xero / spreadsheet; ask Richard) and Stripe once payments are live.
- [ ] **Owner dashboard:**
  - revenue, jobs won, average job size
  - money owed by age and days to get paid
  - lead source ROI (cost per won job)
  - quote win rate and response time
  - revenue per panel and per linear foot, utilization, payback per panel
  - repeat-customer value
  - damage/loss
  - seasonal capacity (buy more inventory when utilization stays above ~80%)
- [ ] **Later:** pricing/margin analysis by fence type, term and distance; job costing (crew hours, fuel); one-click COI sending; branded PDF proposals with e-signature; scheduling board; customer portal for GCs; vendor/purchase tracking.

## Later phases
- [x] Quote Inbox built (/staff/): list, status, notes, history, map of the drawn plan, call/text/email.
- [ ] Quote Inbox launch: in the existing Access app "Quote Inbox" (team limestone-web-co), add www.fencewizards.com with paths `staff` and `api/staff`. Ask about any employees.
- [x] Field Notes stage 1 (2026-10-05): "Job stories" form in the staff area (`/staff/stories/`): photos + questionnaire, stored in D1 (`stories`, migration 0006) and R2; reviewer email via Resend (`STORY_NOTIFY`); `site/tools/pull-field-note.mjs` downloads a story for drafting. See FIELD-NOTES.md.
- [x] Field Notes photo uploads switched on (2026-10-05): R2 enabled, bucket `fencewizards-field-notes` created, bound as `PHOTOS`.
- [ ] Field Notes stage 2 (auto draft with the Claude API; needs an Anthropic Console account with a spend limit, key as a Cloudflare secret) and stage 3 (review screen + Publish to GitHub). Plan in FIELD-NOTES.md "Later stages".
- [ ] Ask Richard for the first job story (photos + the 7 answers in FIELD-NOTES.md).
- [ ] **Payment requests (ON HOLD until Richard answers section 5 of the questionnaire):** an owner-only "Send payment request" button in the Quote Inbox. It sends a branded email from the fencewizards.com domain (via Resend) with a link to a Stripe-hosted invoice (card and/or ACH, PDF invoice, due date / Net 30). A Stripe webhook marks the quote Paid in the Inbox, Stripe sends the receipt, and Richard gets a copy of each request. It can be built and tested in Stripe test mode before his account exists. Open: Stripe account, sending address (richard@ vs billing@), payment methods, terms, card fees.
- [x] Customer confirmation email (built 2026-10-05): `server/customer-email.js` + `server/confirm.js`; sent from `CONFIRM_FROM` with Reply-To = Richard, after the estimator and contact forms (the quick-quote form has no email field); outcome in `confirm_status` (shown in the Inbox history). Starts sending once Resend is set up. Preview locally: `/api/dev/customer-email?id=FW-…`.
- [ ] Map snapshot image in Richard's email (needs Google Static Maps; currently a Google Maps link + attached GeoJSON plan).
- [ ] Test the hero video on iPhone Safari after deploying.
