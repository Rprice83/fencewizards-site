# Fence Wizards — To-do

> **Questions for Richard** are collected in the shared doc "Fence Wizards Website — Questions for Richard" (https://claude.ai/code/artifact/ad94b6da-7898-4b05-8d0a-eede7e764fac). Update this list as his answers come in.

## Open issues
- [ ] (Low priority now that the hosted demo exists; the Mac demo worked at the meeting.) **Mac preview "write EPIPE" error** with mac/Start Website Preview.command on the user's MacBook. Get the macOS version + chip and the Terminal output. Likely an old macOS (workerd needs ~13.5+); fix or document. The backup `Start Simple Preview (no forms).command` works meanwhile. Rebuild the Mac zip afterwards.

## Accounts & keys (needed before launch)
- [ ] **Before Richard fires his current website company:** confirm *he* owns (logins in his name) the fencewizards.com domain registrar account, DNS, email (richard@fencewizards.com), Google Ads, Google Analytics, Google Business Profile and Search Console. Get access transferred first, then cut over.
- [ ] **URL match at launch (checked 2026-10-03):** every address in the live fencewizards.com sitemap exists on the new site, except `/pricing/` (temporary 302 to `/#pricing` in `site/public/_redirects`; remove when the page is built). Right before launch, re-run the check (live sitemap vs `site/public/.generated-pages.json`), because the current company may publish new posts. One did: the Aug 31 event-fence post, now copied. Then submit the new sitemap in Search Console.
- [ ] At launch: make `fencewizards.com` (no www) redirect to `https://www.fencewizards.com` (it currently serves the site on both). Also redirect Richard's other domains seen in his Google Ads history, **fencerentalnearme.com** and **thefencewizards.com**, to the matching new pages if he owns them (ask).
- [ ] **Google Maps API key**: satellite map + drawing in the estimator (replaces the free Esri imagery used during development, whose terms restrict commercial use).
- [ ] **Google Places API key**: address autocomplete in the estimator (replaces OpenStreetMap/Nominatim search, which allows no autocomplete and 1 request/second).
- [x] Hosted demo: Pages project `fencewizards` + D1 `fencewizards-quotes` in the user's Cloudflare account, auto-deploying from GitHub (2026-10-03).
- [ ] At launch: **production stays in the user's Cloudflare account** (managed service, decided 2026-10-05), same Pages project `fencewizards` and D1. Add www.fencewizards.com as a custom domain on the Pages project. The domain itself stays registered in Richard's name; either move its DNS (nameservers) to the user's Cloudflare account or add a CNAME at his DNS host. Clear the test quotes out of D1 before go-live.
- [x] Quote Inbox on the demo: Cloudflare Access (team limestone-web-co, Google sign-in) for Richard + the user (2026-10-03).
- [ ] Resend account: verify the sending domain (fencewizards.com), then set the `RESEND_API_KEY`, `QUOTE_FROM` and `QUOTE_TO` secrets in Cloudflare.
- [x] Cloudflare Turnstile spam check on all three forms (estimator, quick quote, contact), verified on the server (`server/turnstile.js`), plus the honeypot. Built 2026-10-05; demo uses Cloudflare's public test keys.
- [ ] **At launch:** create a Turnstile widget in the user's Cloudflare account (hostnames www.fencewizards.com + fencewizards.pages.dev), put its site key in `INTEGRATIONS.turnstileSiteKey` (`site/build/lib/site.mjs`) and its secret as the `TURNSTILE_SECRET` Pages secret. Without the secret the check is skipped.
- [ ] Send a real test quote to richard@fencewizards.com once Resend is set up, and confirm it lands in the inbox, not spam.
- [ ] Final logo SVGs from the designer (current logos are cropped from the PDF proof).
- [ ] License the Shuttleblock Narrow Bold Italic font (Barlow Condensed is the stand-in).

## Pricing questions for Richard
- [ ] **Panels & stands, 19–23 months**: the sheet has no rate. The estimator temporarily uses $8.20/ft (the 24+ rate).
- [ ] **Minimum charge** for a new installation: is there one? Not applied in the estimator yet.
- [ ] Term boundaries: the estimator reads "up to 12 / 12–18" as ≤12 and 13–18 months, and "up to 18 / 18–24 / 24 and on" as ≤18, 19–23 and 24+. Confirm.
- [ ] Standard panel width (the estimator assumes 10 ft panels to estimate stand counts for windscreen ballast).
- [ ] Do gate openings get deducted from billed footage? (Currently not deducted.)
- [ ] The 50+ mile surcharge: the estimator measures straight-line distance from downtown Indianapolis. Confirm that's the intended measure (driving distance needs Google).
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
- [ ] **MUST BE DONE BEFORE LAUNCH (Step 2, website lead tracking):** Google tag on the new site (Google Ads + a GA4 property owned by Richard); conversions for estimator submit, quote/contact forms, and phone taps/calls (≥60s, Google forwarding number on ad traffic only, so the published phone stays (317) 296-4015). Update the privacy policy for ads/analytics. Build and test before launch; create the conversion actions in Richard's account only at the end (with his OK).
- [ ] **MUST BE DONE BEFORE LAUNCH (Step 3, which ads become jobs):** store gclid/UTM with every quote and inquiry (new DB columns), show "Source" in the Quote Inbox, and a job amount when Richard marks a quote **Won**, then send Won quotes with their value to Google Ads (offline conversions; manual CSV upload first, automatic later). Add a "How did you hear about us?" dropdown to the forms.
- [x] **Step 1, clean up tracking inside Google Ads:** done 2026-10-04 (log: marketing/google-ads/changelog.md). Before/after check due ~2026-11-01 to 11-15. (calls from ads ≥60s, remove/demote dead and misconfigured conversion actions, turn off auto-apply "Upgrade your conversion tracking"). Meanwhile Richard asks every caller "How did you hear about us?"
- [x] (2026-10-03: received; first analysis in marketing/google-ads/analysis-2026-10-03.md. Still need Quality Score columns, campaign settings screenshots, device + day/hour reports, auto-apply screenshot, and Richard's answers.) **Get exports from Richard's account** (read-only is fine): search terms report (90 days), campaigns/ad groups/keywords with cost and conversions, current ads, conversion actions, budget/location/schedule settings. Save them in `marketing/google-ads/`.
- [ ] **Landing pages** under `/go/…`: noindex, minimal header, one goal (call / short form / estimator), headline matching the ad, proof, 3–4 FAQs. Likely set: general rental, construction, events & barricades, emergency (call-first), maybe post-driven. Final list depends on the search terms.
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
- [ ] Field Notes automation: Richard emails photos and notes, a draft is generated (Claude API, following FIELD-NOTES.md), then approve and publish from the staff area. Step one (the file format, photo tool and Recent-jobs sections) is done; see FIELD-NOTES.md.
- [ ] Ask Richard for the first job story (photos + the 7 answers in FIELD-NOTES.md).
- [ ] **Payment requests (ON HOLD until Richard answers section 5 of the questionnaire):** an owner-only "Send payment request" button in the Quote Inbox. It sends a branded email from the fencewizards.com domain (via Resend) with a link to a Stripe-hosted invoice (card and/or ACH, PDF invoice, due date / Net 30). A Stripe webhook marks the quote Paid in the Inbox, Stripe sends the receipt, and Richard gets a copy of each request. It can be built and tested in Stripe test mode before his account exists. Open: Stripe account, sending address (richard@ vs billing@), payment methods, terms, card fees.
- [ ] Customer confirmation email (currently on-screen confirmation only).
- [ ] Map snapshot image in Richard's email (needs Google Static Maps; currently a Google Maps link + attached GeoJSON plan).
- [ ] Test the hero video on iPhone Safari after deploying.
