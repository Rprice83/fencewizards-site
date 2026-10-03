# Fence Wizards — full website draft

The approved Industrial design now covers all 39 original sitemap addresses: homepage, contact, three service pages, four fence-type pages, pricing, About, FAQ, service-area overview, 19 city pages, Field Notes index, and six guides. The existing live website is unchanged. Publication is to the established owner-private preview.

## Content and maintenance

- `page-content.py` contains the reviewed service, product, pricing, company, FAQ, and city copy.
- `article-content.py` contains six revised evergreen guides. They are not presented as newly reported jobs.
- `build-pages.py` writes the remaining pages and updates shared homepage/contact navigation. It reads the original sitemap and organized asset folder in the parent project. Existing homepage/contact layouts are retained.
- `route-inventory.json` maps every original route. `dist/sitemap.xml` uses the intended production domain; preview pages remain noindex and robots-disallowed.
- Source article dates conflict between the scraped body and sitemap. No unverified publication dates are displayed or added to structured metadata.
- City copy adapts relevant planning context from the original site; it does not claim photographed jobs happened in those cities or that nearby institutions are direct clients.
- The hero retains the approved quote form, headline, timing, footage, and banner. The first pricing statement is Local Ownership. Lower Prices.; the third uses the approved clipboard icon.

## Forms and integrations

Web3Forms uses the supplied testing key. No real submission was sent by automated QA. Mocked success/failure paths pass, and failed submissions preserve entered details. Actual recipient association and inbox delivery remain unverified. Switch to Richard's verified form account before launch.

City-page quote links prefill the location on the contact page. Contact remains the primary action, with phone access and a clearly marked PlotQuote coming-soon dialog.

Final logo SVGs, PlotQuote, the Google coverage map, review excerpts/widget, and emergency-project photo confirmation remain pending by the user's instruction. See OUTSTANDING-ITEMS.md.

## Validation

All 39 original routes checked at 1440px and 390px (78 browser checks); 39 unique page titles, one H1 per page, local links/assets/anchors, robots directives, mobile navigation, FAQs, quote-tool dialog, and city prefills pass. Existing contact-flow checks also pass using mocked responses. QA artifacts stay local and are excluded from hosting.

Native WebMCP support is unavailable in the test browser; the optional form-staging adapter was checked through a mock registry. It prepares fields without submitting.

## Windows publishing

The native site-workflow helper opens and pushes source with credentials supplied through stdin. Its Bash packaging launcher is unavailable in this Windows runtime. After the pushed source is verified, use the bundled prepare-site-build.cjs and native tar on that same clean source to package the static output, then the native Sites private deployment tool. Keep credentials out of files and command arguments.
