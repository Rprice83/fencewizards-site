# Homepage redesign concept: notes

Concept page: `site/public/concepts/redesign/` (index.html, redesign.css, redesign.js). Open at http://localhost:8788/concepts/redesign/.
It is `noindex, nofollow`. The quote form doesn't send anything: submitting it shows "Concept preview: this form isn't connected."
It doesn't load main.js, Turnstile, or the Google or Microsoft tags. It also doesn't write the lead-source entry to localStorage.
The real site is unchanged: no edits to styles.css, index.html, js/ or build/.

**Direction:** this is a targeted evolution, not a new look. The brand stays the same (red/ink/silver, Barlow Condensed italic headlines, skewed buttons and slash, drone reel). The changes are about structure and restraint. Big dark and light blocks replace a stripe on every section. One accent colour replaces three. The layouts read like a contractor's spec sheet, where the current page uses a run of identical card rows.

---

## 1. Audit (Diagnose): what was generic or weak in the current homepage

**Typography**
- Every h2 is the same italic-800-uppercase shape, and every one ends in a red `<em>` phrase. Seven headings in a row follow one template, so the red accent stops carrying any meaning.
- h3s use the same italic uppercase as h2s, so there's almost no hierarchy between section and card titles.
- Open Sans body text is the "default" humanist sans. It doesn't match the condensed, signage-like headlines.
- Headings and paragraphs have no `text-wrap: balance/pretty`, which leaves orphans (for example "IN FIVE STEPS." with one word on a line at some widths).
- Numbers (24–48, $0, 80, phone) use proportional figures.

**Colour and surfaces**
- Three accent colours: brand red, a green "online" dot in the utility bar, and a gold star on the rating. The guide calls for one accent.
- The background changes on almost every section (hero dark, red marquee, paper, ink, steel, paper, white, ink-900, steel, footer dark). With a stripe at every boundary, no section feels grouped with the next.
- Frosted-glass effects (glass hero button, blurred stats bar) are a generic SaaS look, out of place on a trade brand.
- The shadows are generic black.

**Layout**
- "What we fence" is three equal photo towers, the most common template layout.
- "Fence types" is four equal vertical cards, a second instance of the same pattern.
- "How it works" is five equal columns joined by a dashed line, the stock "steps" pattern.
- The trust block uses the stock "photo + skewed colour slab + floating rating card" composition.
- The red skewed marquee ("Construction · Events · Emergency…") repeats words the next section already says. It's `aria-hidden` and gives the visitor no facts.

**Components and content**
- The comparison table is built from `<ul>`/`<span>`s with ✓ and ✕ glyphs, so screen readers don't get table semantics.
- The Google rating card isn't a link, even though the footer link to the same profile exists.
- The secondary hero CTA ("Call Richard") is a second big button competing with "Price your fence online". For this buyer the phone number itself is the selling point.
- Contractors on phones have no persistent way to call once the hero scrolls away (the header phone icon is small).
- The key B2B fact ("Ninety-nine percent of our work is business to business") sits in a grey note under a stock steps heading.
- Step 5 copy "Not ours, and not for an extra fee." is a negation pattern from the AI-tells list.

**What already worked (kept)**: drone hero and its reduced-motion and phone handling, the skip link, focus rings, the honest copy, the comparison content, the service-area map, the form fields, and the footer's address and insurance line.

---

## 2. What changed and why, section by section

**Global**
- Body font is **Barlow** (Barlow Condensed's normal-width sibling). It keeps one type family with a signage feel and reads well at 16–17px. Headlines are still Barlow Condensed italic 800/900 uppercase.
- **h3s are upright** (italic is kept for display type), so section and card titles separate clearly.
- The red `<em>` accent appears only on the hero, the pricing promise and the quote close. Everywhere else headlines are solid ink or white.
- `text-wrap: balance` on headings and `pretty` on paragraphs; tabular figures on every number.
- One accent colour: the green dot is removed and the stars are red.
- Warm grays tinted toward ink (`--muted #59534F`, `--line #E3DFDB`, `--paper #F8F6F3`), with ink-tinted shadows.
- Background rhythm in big blocks: **dark hero → light (uses + types) → dark band (pricing + process) → light (trust + area) → dark close (quote + footer)**. The chain-link diagonal mesh texture (already used on pricing) is used only on the dark bands.
- Radius scale: 10px on containers, 4px on badges and inner bits.
- Buttons get a physical press state (`scale(.98)`). Focus rings turn white on dark grounds so they stay visible.
- Section padding is slightly larger at the bottom than the top (optical balance).

**Header**: same markup and behaviour. "Concept preview" tag in the utility bar; the green dot is gone.

**Hero**
- Same video, poster, 1920/1280 sources, phone-size swap, reduced-motion pause and pause button.
- The ghost "glass" button is replaced by a **phone link**: a round phone icon, "Or call Richard, 7 days" and the number in display type. One primary button, one direct line.
- Added a small **"4.6 on Google from 39 reviews"** link to Richard's Google profile, using the rating already shown on the site.
- The stats bar is a solid ink strip with a red top rule instead of frosted glass, with tabular numbers.
- The phone shade is darker so the lede stays readable over the busy reel.

**Marquee**: removed. It repeated the next section's words and carried no facts.

**What we fence**: an **asymmetric grid**. Construction is the large lead card (most of the work), with Events and Emergency stacked beside it. The "01/02/03" numbering is dropped and the copy is unchanged.

**Fence types**: **2×2 horizontal spec cards**, with the photo beside the text and a spec table under a heavy ink rule (Height / Set / Best for). On narrow screens they stack. "Most popular" is now a square flag, not a skewed pill. The copy is unchanged.

**Pricing + How it works (one dark band)**
- Price and process sit together because they answer the same question ("what am I signing up for").
- The comparison is now a real `<table>` with a caption, column and row headers. The Fence Wizards column is tinted, with a red slash marker instead of ✓/✕ glyphs.
- Process is a **two-column ledger**: a sticky heading plus the B2B note on the left, and five ruled rows with outlined red numerals on the right (the first is filled, and each fills on hover). This replaces the five-column dashed-line row.
- Step 5 copy changed from "Not ours, and not for an extra fee." to "There's no extra fee to collect it." Same fact, without the negation pattern.

**Trust**
- Main photo (truck + panels), with a smaller crew photo (`crew-at-fence`) overlapping its corner for depth. This replaces the skewed red slab.
- The four facts are a 2×2 list under heavy ink rules (no icon tiles), with copy unchanged.
- The rating is a dark **link block** ("4.6 · On Google, from 39 reviews → Read the reviews on Richard's Google profile").

**Service area**
- Light version of the same map: ink dots, the red 80-mile ring, a red Greenwood HQ, and the pulse on Indianapolis (off with reduced motion).
- The 19 town links are a 3-column list (2 on phones) instead of pills, with a "See the full service area" text link.

**Quote (dark close)**
- Same heading, copy and fields. The white form panel sits on ink, and the call card is dark with a red edge.
- The honeypot and Turnstile are removed from the concept only. In the real site both stay.

**Footer**: the same, minus the 19-town column (the towns now sit in the section right above). It has four columns, and the rating star is red.

**New: phone call bar**: on screens 720px and narrower, a two-button bar ("Call Richard" / "Price it online") slides up once the hero has scrolled away. It hides while the menu is open, and the body gets bottom padding so the footer isn't covered.

**Checked**: 1440, 1280 and 375 wide; no horizontal scroll; video plays (1920 file on desktop, 1280 on phones); mobile menu, dropdowns and the call bar work; form shows the preview note; no console errors; `node build/check.mjs` passes.

---

## 3. What would change in the real site to adopt it

1. **`build/lib/layout.mjs`**
   - Font link: swap `Open+Sans:wght@400;500;600;700` for `Barlow:wght@400;500;600;700`.
   - Utility bar: remove `<span class="dot">`.
   - Footer: decide whether to drop the "Where we work" town column. It's shared by every page, so maybe keep it on inner pages and drop it only on the homepage, or keep it everywhere for internal links (see question 4).
   - Add the mobile call bar markup (all pages, or only pages with a hero).
2. **`build/partials/home.html`**: replace the section markup with the concept's `<main>` (hero actions, uses grid, type cards, `.rd-dark` wrapper with the pricing table and process ledger, trust, area, quote). Keep the real form attributes: `class="quote-form js-inquiry" data-kind="quick"`, the honeypot `label.hp` and the `cf-turnstile` div. Remove the marquee. Rename the `rd-` classes to plain names when merging, e.g. `.use-grid`→ the new layout.
3. **`public/styles.css`**
   - `--font-body` → Barlow; the `--muted/--line/--paper` warm-gray values; add the radius tokens.
   - Global `h1–h3` `text-wrap`; h3 upright (check inner pages: `.feature-body h3`, `.rel-group h3` and FAQ already override, so test the type and use pages).
   - Replace the homepage blocks (`.marquee`, `.use-*`, `.type-*`, `.compare`, `.steps` on the home only, `.trust-*`, `.area-map` colours, `.quote`) with the concept rules. `.steps` is also used by inner-page `steps()` components, so keep the old `.steps` and give the home ledger its own class.
   - Stats bar: solid background, no `backdrop-filter`. `.btn-glass` can stay for inner pages or be retired.
   - `.footer-rating span` and `.stars` → red.
4. **`public/js/main.js`**
   - Add the `rd-past-hero` toggle (two lines in the existing scroll handler) for the call bar, and Escape-to-close for the drawer.
   - Update the reveal target list to the new class names.
   - Keep everything else (source capture, tracking, Turnstile, form posting) as it is.
5. Rebuild, `node build/check.mjs`, `node --test`, check in the Browser pane on desktop and mobile, then rebuild the Mac zip.

---

## 4. For Richard to confirm

1. **Rating in the hero**: OK to show "4.6 on Google from 39 reviews" near the top? (TODO.md already says to confirm the current rating before launch.)
2. **Crew photo in the trust section**: the three people in `crew-at-fence` are identifiable. Is he fine with them appearing on the homepage?
3. **"Most popular" on Panels & Stands**: it's on the current homepage. Is it still true?
4. **Footer town list**: fine to drop it from the homepage footer since the towns are listed just above? (It's an SEO and internal-linking call more than a Richard call.)
5. **Mobile call bar**: does he want calls to be the first thing a phone visitor can tap all the way down the page? It will raise call volume relative to form leads.

## Copy pass with the humanizer skill (2026-10-10)
- Headlines chosen by Robert: uses H2 "Construction, events and emergency work." (was "Built for the call that came in this morning."); trust H2 "The company behind the fence." (was "Insured, third generation, and buying direct.").
- Stat strip: the "1 call" tile is now "4.6 ★ On Google, from 39 reviews" (linked); the separate rating line under the hero buttons is gone so the rating isn't shown twice above the fold.
- Minor fixes: Construction card "general contractors get same-day moves" (was "Moved the same day a superintendent asks"); Events "struck the night the event ends" (was "pulled the hour the event ends"); Emergency card renamed "Emergency & restoration" and rewritten (said "fire" twice); cut the unverified "We clear standard vendor requirements" (the live homepage still has it) and "Four things you can check."; step 5 reworded.
- Kept for Richard: "Most popular" flag (question 10.11 in his doc). Left untouched because they wait on his answers: the national-chains comparison and "price doesn't move if your schedule slips" (R1), "a fee for every bent panel" (R4), hours "7 days" (R3), Greenwood as the base (R2), "Where To Get Stuff Fixed".
