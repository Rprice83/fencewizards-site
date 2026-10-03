# Fence Wizards — To-do

> **Questions for Richard** are collected in the shared doc "Fence Wizards Website — Questions for Richard" (https://claude.ai/code/artifact/ad94b6da-7898-4b05-8d0a-eede7e764fac). Update this list as his answers come in.

## Accounts & keys (needed before launch)
- [ ] **Google Maps API key**: satellite map + drawing in the estimator (replaces the free Esri imagery used during development, whose terms restrict commercial use).
- [ ] **Google Places API key**: address autocomplete in the estimator (replaces OpenStreetMap/Nominatim search, which allows no autocomplete and 1 request/second).
- [ ] Cloudflare account: create the Pages project and the D1 database (`fencewizards-quotes`), then apply `site/migrations`.
- [ ] Resend account: verify the sending domain (fencewizards.com), then set the `RESEND_API_KEY`, `QUOTE_FROM` and `QUOTE_TO` secrets in Cloudflare.
- [ ] Cloudflare Turnstile (free spam protection) on the estimator submit. A hidden honeypot field is in place for now.
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
- [ ] **Conversion tracking:** Google tag on the site; conversions for estimator submit, quick/contact forms, and calls (≥60s, Google forwarding number on ad traffic only, so the published phone stays (317) 296-4015). Update the privacy policy for ads/analytics.
- [ ] **Click-ID capture:** store gclid/UTM with quotes and inquiries (new DB columns), show "Source" in the Quote Inbox, and later upload **Won** quotes with value to Google Ads (offline conversions).
- [ ] **Get exports from Richard's account** (read-only is fine): search terms report (90 days), campaigns/ad groups/keywords with cost and conversions, current ads, conversion actions, budget/location/schedule settings. Save them in `marketing/google-ads/`.
- [ ] **Landing pages** under `/go/…`: noindex, minimal header, one goal (call / short form / estimator), headline matching the ad, proof, 3–4 FAQs. Likely set: general rental, construction, events & barricades, emergency (call-first), maybe post-driven. Final list depends on the search terms.
- [ ] **Account cleanup:** heavy negative keywords (residential, backyard/dog/privacy fence, installers, repair, panels for sale, jobs), location = presence in the 80-mile radius, call ads during 7:30am–9pm, never send ads to the homepage.

## Later phases
- [x] Quote Inbox built (/staff/): list, status, notes, history, map of the drawn plan, call/text/email.
- [ ] Quote Inbox launch: set up Cloudflare Access with Google sign-in (steps in site/README.md). Need Richard's Google email, yours, and any employees.
- [ ] Field Notes automation: Richard emails photos and notes, a draft is generated (Claude API, following FIELD-NOTES.md), then approve and publish from the staff area. Step one (the file format, photo tool and Recent-jobs sections) is done; see FIELD-NOTES.md.
- [ ] Ask Richard for the first job story (photos + the 7 answers in FIELD-NOTES.md).
- [ ] **Payment requests (ON HOLD until Richard answers section 5 of the questionnaire):** an owner-only "Send payment request" button in the Quote Inbox. It sends a branded email from the fencewizards.com domain (via Resend) with a link to a Stripe-hosted invoice (card and/or ACH, PDF invoice, due date / Net 30). A Stripe webhook marks the quote Paid in the Inbox, Stripe sends the receipt, and Richard gets a copy of each request. It can be built and tested in Stripe test mode before his account exists. Open: Stripe account, sending address (richard@ vs billing@), payment methods, terms, card fees.
- [ ] Customer confirmation email (currently on-screen confirmation only).
- [ ] Map snapshot image in Richard's email (needs Google Static Maps; currently a Google Maps link + attached GeoJSON plan).
- [ ] Test the hero video on iPhone Safari after deploying.
