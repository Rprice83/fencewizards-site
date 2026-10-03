# Fence Wizards estimator — implementation and rate decisions

The private preview now includes `/estimate/`, linked from the homepage and former PlotQuote entry points. It is an integrated static planner, not yet a production booking system.

## Working now

- Scale-grid drawing, multiple runs, draggable corners, close-run, undo/redo, and editable segment lengths.
- Manual linear-footage entry and immediate itemized preliminary estimates before contact details.
- Panel/driven term rates and supported accessories from the supplied PDF; unsupported cases are clearly flagged.
- File export/import, printable plan, and shareable layout fragments. Contact details and addresses are not included in exported plans or layout links.
- Web3Forms inquiry handoff using the existing test account, including line-item estimate, selections, address, notes, segment lengths, and layout link. No real email was sent during automated checks.

## Rate interpretation

Source filename: `Fence Wizards Price Sheet 8-12-26.pdf`; the document itself is dated August 10, 2026. Rates are implemented in `dist/estimator-core.mjs` with version `FW-2026-08-10`. Quotes are pre-tax planning estimates, with unconfirmed minimums and site conditions called out. Fractional footage is rounded to one decimal for calculation, and each line item to cents; Richard must approve this rounding policy before launch.

Panels: <=12 months $5.65/ft; >12 through18 $6.85/ft; 19–23 months custom quote; >=24 $8.20/ft. Driven: <=18 $4.20/ft; 19–23 $5.10/ft; exactly24 custom quote due source overlap; >=25 $6/ft. No unlisted short-term discount is invented.

The missing rules, contact discrepancy, map setup and launch tasks are recorded in OUTSTANDING-ITEMS.md. Website contacts were retained per user confirmation.

## Remaining before production

- Actual Google address search and satellite-backed drawing; the current scale sketch has no geographic coordinates and cannot locate a property.
- Server-side recalculation and submission validation. Current preview computes prices in the browser and labels emailed values as unverified preliminary figures; it must not be used for automatic contractual quotes or payments.
- Richard's approval of omitted/ambiguous rules and reference-case tests against real quotes.
- Actual inbox-delivery confirmation and production recipient.

## Build and checks

`build-pages.py` calls `build-estimator.py` after the shared page build. `test-estimator.mjs` covers pricing tiers, missing rates, accessories, and geometry. `check-estimator.cjs` covers drawing, manual inputs, undo, price changes, mocked email, and responsive layout. Original 39 URLs remain, plus the new estimator route and 404 page.

Gate placement update: single/double markers are anchored to a segment and percentage along it. Located gates plus additional unlocated counts feed pricing, the send-form summary, email and exported/shared plans. Markers follow moved endpoints. Standard panel gates remain included; post-driven gates use the PDF rates of 140/280 dollars. Gate widths and footage deductions await confirmation.

Gate toolbar simplification: add single, add double, remove gate and draw fence now live with the drawing controls. Click a marker in remove mode (or focus it and press Enter). The rental fields display total gates, including located markers. Raising a total adds unlocated gates; reducing below located counts requires removing markers. Undo, plan exports and legacy plan imports preserve counts.

## Quote backend update

The planner now targets the Cloudflare quote API. Web3Forms is no longer used for planner submission (the separate contact form still uses it). Static Sites hosting disables submission and links to explicit fictional examples. Server pricing/storage, confirmation and staff inbox are implemented for Cloudflare deployment; see CLOUDFLARE-DEPLOYMENT.md for setup and tests. Earlier implementation notes above describe the initial preview, superseded for submission by this update.

Customer receipts now use private signed links with fixed 30-day expiry instead of tab-only submission secrets. New customer-email and revocation logic is in server/receipts.mjs and server/notifications.mjs; deployment configuration is documented in CLOUDFLARE-DEPLOYMENT.md.
