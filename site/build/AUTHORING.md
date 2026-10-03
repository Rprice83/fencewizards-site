# Writing a page for the Fence Wizards site

Every page is one ES module in `site/build/pages/`. `node build/build.mjs` (run from `site/`) renders each page into `site/public/<path>/index.html`, wrapping it in the shared header, footer and SEO tags.

## Read these first
- `build/lib/components.mjs`: the building blocks and their parameters. **Do not edit the lib files.** If you need something they can't do, say so in your report.
- Model pages to copy in structure and tone:
  - Use-case page: `pages/uses/construction-fencing.mjs`
  - Fence-type page: `pages/fence/barricades.mjs`
  - Location page: `pages/service-area/anderson.mjs`
  - Blog post: `pages/blog/how-a-temporary-fence-rental-works.mjs`

## Page module shape
```js
import { pageHero, intro, prose, steps, features, specs, faq, facts, typeCards, gallery, cityList, placeCard, article, related, quoteCta, ctaBand } from '../../lib/components.mjs';
export default {
  path: '/fence/windscreen/',            // keep the original URL exactly
  title: '…',                            // original SEO title
  description: '…',                      // original meta description (polish lightly if needed, ≤ 160 chars)
  ogImage: 'windscreen-curve-downtown',  // image name used for social previews (usually the hero image)
  main: () => [ pageHero({...}), …, quoteCta({...}) ].join('\n'),
};
```

## Content source
- Original copy: `fencewizards-content-inventory/fencewizards-page-content.md` (project root, one level above `site/`). Each page starts with `# <SEO title>` and a `- URL:` line.
- The scrape lost some text, for example location-page FAQ *questions* (only the answers survived) and the link titles in "What we bring". Use **WebFetch on the live page** (https://www.fencewizards.com/<path>) to recover missing questions and lists word for word. Never invent a question.
- Map the original sections onto components: section intros become the `intro:` of a block; "####" step lists become `steps`; Q&A becomes `faq`; "Label | Value" lists become `specs`; three short "###" points become `features`; the four fence options become `typeCards`; town lists become `cityList`; "What we fence / Fence types / Where we work / Before you call" becomes `related({ current, cities: [6 slugs from the original 'Where we work'] })`; the closing "Tell us about the job" form becomes `quoteCta({ heading, text })` using that page's own closing heading and line.

## Copy rules
1. **Keep the original wording.** Polish only: fix awkward or run-on sentences, typos and stray spaces before punctuation ("custom printed ," → "custom printed,"). Natural contractions are fine. Don't rewrite whole paragraphs, add marketing fluff, or change the voice (plain-spoken, specific, first person plural, "Richard").
2. Style: "24 to 48 hours" (numerals), "80-mile radius" / "80 miles", "post-driven chain link", "Net 30", "workers' compensation", "Ninety-nine percent".
3. **Pricing claims (important):** pricing is being reworked with the owner. **Remove** any claim that the standard rental "runs up to twelve months" or that short jobs get a "discount" / "short-term rate"; keep the rest of the sentence when it still reads well (e.g. "on the same flat fee with the removal already included"). Eight-foot fencing is a **special order**, not a standard option. Keep: flat fee agreed up front, no rent clock, removal included, 24 to 48 hours, emergency faster. **List every edit of this kind in your final report** (page, original sentence, what you did).
4. Links to the pricing page: use `/#pricing` (the pricing page isn't built yet). "Quote tool" / "draw the fence on a map" → `/estimate/`.
5. Remove leftover form text ("Form field: …", "Button: …", "Richard answers his own phone. If you would rather price it yourself…"); `quoteCta` covers that.
6. Don't invent facts, customers, numbers, project names or locations.

## Headings
Use `*accent*` to make the last few words of a heading red, like the model pages: `'Questions we get *about Avon.*'`. Hero titles follow the same pattern.

## Images
Only use these names (the files are `public/assets/img/<name>-800.jpg` / `-1600.jpg`):

apartment-build-finished, apartment-build-wrapped, barricades-building-run, barricades-indoor-line, barricades-outside-building, barricades-venue, city-sidewalk-panels, cleared-lot-neighborhood, crew-and-van, crew-at-fence, demolition-site, dirt-lot-excavator, distribution-warehouse-panels, downtown-lot-barriers, event-lawn-tent, event-windscreen-tent, field-run-two, gate-across-lot, green-windscreen-lot, loading-area-panels, muddy-site-edge, open-field-run, orange-safety-grass, orange-safety-run, printed-windscreen-banners, school-building-panels, shipping-container-lot, sidewalk-windscreen, skyline-panels-indianapolis, stacked-panels-site, street-frontage-panels, truck-and-panels, truck-side-wrap, truck-trailer-load, windscreen-black-run, windscreen-building-run, windscreen-curve-downtown, windscreen-lot-run, winter-site-generator, wizard-truck-wrap, yard-tractor-panels

- Prefer the images the original page used (the list you were given). Use each image at most once per page. Avoid `skyline-panels-indianapolis` as a hero except on the Indianapolis page.
- Alt text describes only what's visible ("Panel fence along a sidewalk beside a brick building"). **Never claim a photo was taken in a specific town or for a specific customer.**

## Location pages
- `eyebrow: 'Service area · <County>'` (the county comes from `CITIES` in `lib/site.mjs`).
- `intro({ lead, paras, aside: placeCard({ slug, drive, cityLink }) })`. `drive` is the short drive description from the copy (e.g. 'About 25 minutes west on US-36'). Add `cityLink` only if the original page names the city's website, and verify the URL with WebFetch.
- "Other towns we cover" becomes `cityList({ heading, intro, cities: [slugs exactly as listed on the live page] })`, then `related({ current, showCities: false })`.

## Check your work
From `site/` in PowerShell:
```
$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User'); node build/build.mjs
```
It must say "Built N pages" with no failures. Other agents are adding pages at the same time, so ignore failures in files you didn't write, but mention them.
