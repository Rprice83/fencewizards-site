# Outstanding items — Fence Wizards

The full 39-page draft is ready for review. These items are intentionally deferred, not silently represented as working features.

## Confirmed deferred by the user

- PlotQuote replaced by the custom Fence Wizards planner at /estimate/. Google Maps integration and final pricing confirmation remain pending.
- Google coverage map: restricted browser API key with the relevant Google Maps service enabled. Draw the approximate 80-mile circle from downtown Indianapolis, not the Greenwood yard.
- Google reviews: static preview uses 4.6/5 from 39 reviews, as published on the existing Fence Wizards website and checked September 28, 2026. Google direct verification was blocked. Confirm the current rating/count before launch. Potential future integration: automatically refresh rating/count and optionally review text through an approved widget or Google Places API. The displayed figures are not live.
- Final logo SVGs: current proof wordmark is temporary.
- Emergency photo: confirm whether FW-P014 was emergency/restoration work or planned demolition before using it to represent emergency service.
- Field Notes: retain the six existing guides for now. New job stories require confirmed details and publication permission.

## Before public launch

- Complete the explicit v1 cleanup checklist below before switching to the public production domain.

- Confirm test form delivery, then switch to Richard's verified Web3Forms account and test actual inbox delivery.
- Confirm any inquiry response-time promise; no new form response-time guarantee has been introduced.
- Remove private-preview labels and testing notes; configure the production domain, indexing, canonical URLs, and sitemap together.
- Verify the Google Business Profile website link after the production URL is selected.
- Richard now has viewer access to the shared Sites preview at richwarren1995@gmail.com. Future Cloudflare staff access must be configured separately.
- Reconcile original article publication dates if dates are to be displayed: the source body and sitemap disagree.

The broader questions for Richard (project permissions, buyer questions, job-story workflow, and pricing evidence) remain in the parent content-planning.md.

## Local photography added September 28, 2026

- GPS/Census matches support image sections for Indianapolis, Carmel, Bloomington, Greenwood, Muncie, and Zionsville. Internal selection and provenance are in location-photos.json. Published copies omit EXIF/GPS.
- Fishers, Noblesville, and the other service-area pages still need matching local photos; no nearby or unincorporated GPS points were relabeled as those cities.
- GPS supports the capture location, not customer identity, job scope, or a completed-project claim. Captions describe the visible scene only.

## Custom estimator — September 29, 2026

- User approved showing preliminary prices before contact details; keep current website phone/email despite different contact details on the price sheet.
- Source: Fence Wizards Price Sheet 8-12-26.pdf, internally dated August 10, 2026. Original PDF remains outside the deployed website.
- Richard to clarify panel pricing between 18 and 24 months, exact term boundaries (especially post-driven at 24 months), tax, any minimum NEW-installation charge, and how distance from Indianapolis is measured.
- Do not treat change-order callouts ($750/$1,000 or emergency $1,500/$1,850) as minimum new-installation prices.
- Confirm pricing effective date, standard fence height, footage/panel rounding, treatment of gate openings, short-term discounts, stand counts and required windscreen ballast, partial-screen runs, optional damage waiver, specialty products, and maximum duration for the 24+ month rate.
- Plain screen currently assumes the full planned fence length. Printed screen, mixed fencing, barricades, missing term rates, and emergency work require review; unsupported base rates produce no total.
- Distance is self-reported; an unknown distance produces a known-items subtotal with the potential $1/ft surcharge explicitly excluded. No tax or minimum is invented.
- Prices in this private preview are browser-calculated preliminary planning values. Server-side recalculation and validation are now implemented in the Cloudflare-ready backend; they are not active on the static Sites preview. Deploy and verify before public launch.
- Google Cloud project/billing, restricted Maps and address-search credentials, production domains, map drawing adapter and service-area distance verification are still pending. Grid coordinates are sketch units, not latitude/longitude. Do not relabel existing sketch plans as georeferenced measurements.
- Confirm real email delivery. Tests intercept Web3Forms and send no real email. The existing test recipient remains in use.
- Shared layouts use a URL fragment containing geometry and rental selections only, excluding address, name, phone, email and notes. The private preview requires recipient access. For launch, review final URL, payload limits and long-term saved-plan storage needs.

- Gate openings: confirm standard single/double widths and whether to deduct openings from billed footage. Current markers indicate locations only; no footage deduction is invented. User questioned base-rate order; supplied PDF lists post-driven at 4.20/ft and panels at 5.65/ft for the shortest listed terms. Confirm if a revised sheet should supersede this.

## Quote storage and inbox implementation

- Confirmation page, D1 schema, duplicate-safe save API, server-side price calculation, protected staff API, search/status/notes UI and optional staff notifications are implemented. See CLOUDFLARE-DEPLOYMENT.md.
- The Sites preview provides fictional sample screens only. Quote submission is disabled there until a compatible backend is connected; the regular website contact form remains unchanged.
- Still needed: Cloudflare account/project/database binding, Access application and staff allowlist, Turnstile keys, final origin, optional verified email sender/recipient, real delivery test, retention/backup decisions and production smoke test. No remote Cloudflare resources, real quote records, real emails or Stripe integration were created.

- Expiring customer confirmation links and customer email delivery are now implemented (30 days, early staff revocation, separate delivery status). Before launch: configure RECEIPT_SIGNING_KEY, apply migration 0002, disable email link tracking, and test real customer delivery. The preview remains fictional and sends no email.

## Image quality and optimization — before launch

- User reports visible image softness/artifacts on desktop, especially chain-link fencing. Prioritize a visual quality audit before choosing compression settings; do not assume format conversion alone fixes this.
- Compare every used photo with its original organized asset at its actual desktop display size and on high-density screens. Check source focus, prior compression, crop, scaling and fine-mesh moire. Replace visibly degraded derivatives with exports from the highest-quality original, or choose a better photo if the source is unsuitable.
- Current chain-link.jpg and panels.jpg are 2400 x 1800, approximately 1.8–1.9 MB each. File dimensions/size alone do not establish the cause of the reported issue; inspect originals and rendered output before changing quality settings.
- Create quality-reviewed WebP derivatives and responsive mobile/desktop sizes. Preserve original assets and asset-to-location metadata. Avoid repeated lossy recompression; inspect fence mesh and wires closely before accepting exports.
- Set appropriate display dimensions/crops and responsive image selection; lazy-load below-the-fold photos. Compare visual quality and actual byte savings, not just file extension.
- Exclude logos until final SVGs arrive. Handle drone-video optimization separately. Recheck desktop and mobile output after updating images.


## Privacy policy draft — September 30, 2026
- Draft added at /privacy/ with footer, contact-form, and estimator links. Describes preview testing separately from planned production features.
- Richard to confirm the business/legal entity name, privacy contact, and who may access inquiry and quote records.
- Decide and implement retention/deletion periods for inquiries, quotes, project records, and backups. Receipt-link expiry does not delete a quote.
- Confirm production providers and recipient email; update the draft when Cloudflare, Resend, Maps, analytics, or payments are activated. Remove preview-only language after verifying live behavior.
- Review final privacy wording before public launch; add Google Maps terms/privacy notices with that integration.

## V1 go-live cleanup — required release check

- URL audit completed against the saved original sitemap: all 39 original paths exist in the build, appear in its sitemap, and retain matching production canonical URLs. No page-path redirects are needed for those 39 routes if the production domain stays the same. Evidence: qa/url-preservation-audit.json. A fresh live sitemap request returned HTTP 403; recheck the live URL inventory before cutover for changes since the saved scrape.
- Add /estimate/ to the production sitemap once ready for public indexing; it is currently omitted. /privacy/ is included. Keep /staff/quotes/ and /quote-confirmation/ excluded. Verify www/non-www, HTTPS, trailing-slash handling, and actual HTTP responses on the production host before launch; file-level preservation does not test server redirects.

- [ ] Finalize /privacy/ against the actual production setup: confirm business details, recipients, providers, storage and retention practices; replace draft/date and preview-only wording with the approved live policy. Retain accurate disclosures about any providers actually used.
- [ ] Audit every public page, shared header/footer, form, validation message, success/error state, estimator, receipt page, and staff inbox for preview/demo/testing/sample/coming-soon language, ChatGPT/OpenAI/Sites references, and development instructions. Remove internal development references; replace necessary customer guidance with accurate production wording. Update source generators as well as generated pages so cleanup survives rebuilds.
- [ ] Remove public links to fictional quote/receipt/inbox examples and disable production demo routes or query modes, including ?demo=1. Verify they cannot be used to present sample records as real submissions or bypass staff authentication.
- [ ] Replace test form recipients, sample records, placeholder branding, preview hostnames, and temporary links with approved production values. Keep internal checklists and test fixtures out of the public build.
- [ ] Verify contact and quote submissions, stored records, Richard's inbox access, customer confirmations, expiry/revocation, and actual email delivery end to end. Never show a successful delivery or saved-quote claim unless it is true.
- [ ] Review deferred features individually: connect and test them, or remove their public promotion for v1. Keep useful estimate limitations and legitimate customer-facing disclosures; do not hide an unfinished feature behind polished copy.
- [ ] Check the production domain, canonical/social URLs, sitemap, robots directives, and indexing. Public marketing pages may be indexed; staff and private receipt pages must remain excluded and protected as appropriate. Indexing exclusions are not access control.
- [ ] Run a final desktop/mobile review and text/link audit of the production build. Confirm no unintended demo, test-account, private-preview, or platform-development references remain visible before declaring v1 ready.


## Pricing-page review — September 30, 2026
- Reviewed against the supplied August 10 price sheet, original site terms, and current estimator. Updated rental-term, per-foot pricing, gate, travel, damage, and preliminary-estimate explanations. Kept established payment terms and existing website contact details.
- Before launch, reconcile older 12-month blanket rental and short-discount wording on the homepage, FAQ, and other pages with the final approved terms. The pricing page now distinguishes panel and post-driven base terms and requires Richard to confirm discounts.
- Existing unresolved rates, term boundaries, tax, minimum new-installation charge, distance measurement, and gate/ballast assumptions still require Richard; no missing amounts were invented.

## Future enhancements — after v1 launch

These are future-state ideas, not pre-go-live requirements or blockers for v1.

- **Stripe invoicing from the Quote Inbox:** Richard reviews the project with the customer, then uses Prepare Invoice to review the recipient email, quote ID, approved final amount, description, and due date. Send Invoice creates and sends a Stripe invoice with a hosted payment link; the customer does not manually enter an amount or quote ID.
- Keep the original estimate separate from the approved invoice amount. Include the Fence Wizards quote ID alongside Stripe's invoice number, prevent duplicate invoices from repeated clicks, and support the agreed upfront or Net 30 payment terms.
- Receive verified Stripe payment updates in the backend so the inbox can show Awaiting payment or Paid and link to the invoice. Requires Richard's Stripe account, secure backend integration, and payment-flow testing when this phase is authorized.
- Update the privacy policy to reflect Stripe when the payment integration is introduced. No Stripe implementation is requested for v1.

### Operations portal and inventory tracking

- Expand the Quote Inbox into a staff portal connecting quotes, confirmed jobs, customers, installation/pickup schedules, inventory, and the future Stripe payment workflow. Saved as a future-state idea only; not a v1 launch requirement or authorization to implement now.
- Suggested phases: (1) accepted quotes become jobs with scheduling; (2) inventory and equipment allocation; (3) payments and operational reporting.
- Track equipment availability by date, including quantities in the yard, reserved, installed on jobs, missing, or awaiting repair. A quote alone must not reserve inventory; Richard explicitly confirms the job and allocates equipment.
- Proposed lifecycle: quote → confirmed job → equipment reserved → installed → picked up → inspected and returned to available inventory. Extensions, partial returns, and damaged/missing items must affect availability correctly.
- Distinguish billable footage from physical equipment quantities. Confirm panel lengths, gate sizes, stand/ballast requirements, and starting stock before deriving materials from drawings. Track reusable equipment separately from sold materials or consumables such as windscreen.
- Before design, ask Richard how inventory and scheduling are handled today, who would maintain records, and whether availability, scheduling conflicts, or missing equipment is the main problem. Prefer a simple workflow the crew can keep current; define staff permissions and record changes as the portal grows.


## Version comparison — October 1, 2026
- version-1/ preserves source and built assets before the wizard change, with SHA-256 snapshot checks. version-2/ holds the new build; website-preview/ remains the managed publishing checkout. Excludes dependencies, credentials, runtime caches, and Git metadata.
- Shared preview: /estimate/ is Version 2; /estimate-original/ is the original scrolling alternative for Richard to compare. Both retain preview-only submission restrictions. Remove the comparison route and links before production launch after Richard chooses.


## Post-deployment Cloudflare verification — hero video
- User reports hero video still does not play on iPhone 15 Pro Safari on the Sites preview, although other websites play. Troubleshooting explicitly paused at user request.
- After publishing to Cloudflare Pages, test the actual production homepage on that device/browser: visible playback, looping, inline muted behavior, and poster fallback. Check media response headers/range support and playback errors if it still fails. Moving hosts may help but is not a confirmed fix. Verify before the public launch is signed off.
