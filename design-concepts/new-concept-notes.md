# Homepage concept "Job-site ledger" (new direction)

Preview: http://localhost:8788/concepts/new/ (files in `site/public/concepts/new/`: `index.html`, `new.css`, `new.js`). Marked `noindex, nofollow`. The quote form doesn't send anything.

## Design Read
Reading this as a **B2B local-service landing page for contractors, superintendents and event planners** who are often on a phone in a truck. The page should feel **utilitarian and trustworthy, like a job-site work order**. It leans toward plain CSS, one extra-wide industrial sans, sharp corners and restrained motion.

## Dials
- **DESIGN_VARIANCE 6.** It's a marketing landing page, but buyers come first and want trust: an asymmetric hero and bento, with calm sections after that.
- **MOTION_INTENSITY 4.** Motion is light and always has a job: the hero comes in, sections fade up as they appear, the fence-line ruler draws across, and the fence-type photo swaps. All of it turns off when "reduce motion" is set.
- **VISUAL_DENSITY 5.** It reads like a spec sheet: facts you can scan, normal spacing, nothing packed tight.

## Visual direction
- **Type:** Archivo is the only typeface. Headlines use its widest, heaviest setting (width 125, weight 800), which echoes the extra-wide lettering on the logo and truck wraps. Body text uses the normal width. There's no serif and no Inter.
- **Color:** a cool concrete grey (#E9EBEA) with near-black ink (#16181A) and brand red #ED1C24 as the only accent. A deeper shade of the same red (#C3121A) is used only for small red text, so it stays readable. Dark mode follows the phone or computer setting: off-black background, the same red, and the reversed logo.
- **Shape:** every corner is square (radius 0), so it feels like steel panels and paperwork. Thick 4px ink or red rules mark where important blocks start.
- **Layout:** the headline runs across the top. Below it, the short pitch and buttons sit on the left, and the drone reel is a large slab that bleeds off the right edge of the screen. The hero sits directly on a "ledger" strip of five facts. Every section after that uses a different layout (see the outline).
- **Signature detail:** in the process section, the five steps sit on a measured fence line. It's a tick-mark ruler (linear feet), each step is a red "post", and a red rail draws across as you scroll.
- **Why it fits:** these buyers want an answer fast and want to trust who they're calling. The page looks like the trade it serves. The phone number and "Price your fence online" button are always in the header, and the facts they check first (speed, flat price, owner answers, coverage, rating) are all visible before any scrolling past the hero.

## Section outline
1. **Header (sticky):** logo, 5 links (What we fence, Fence types, Pricing, Service area, Contact), phone number, and "Price your fence online". Below 1180px the links fold into a Menu button. On phones, the phone number becomes an icon button.
2. **Hero:** "Temporary fence, on site in 24 to 48 hours." with a 19-word subline and two buttons: Price your fence online, and Call (317) 296-4015. The drone reel uses the 1280 file on most screens, the 1920 file only on large or high-density screens, and the poster image when motion is reduced. It has a pause button and pauses itself when scrolled out of view.
3. **Ledger (fact strip):** 24 to 48 hours / Removal included / The owner answers / 80 miles / 4.6 on Google from 39 reviews (one star icon, linked to his Google profile).
4. **What we fence (bento):** a large Construction tile with Events and Emergency stacked beside it. Each tile links to its page.
5. **Pricing:** "One number up front. Removal included." A comparison sheet (National chains vs Fence Wizards), with the Fence Wizards column tinted red.
6. **Fence types (interactive list):** four types on the left. Hovering or tabbing to one swaps the photo frame on the right. On phones, each type shows its own photo. Each one links to its /fence/ page.
7. **Process (fence line):** the 5 steps from the current homepage on the ruler rail.
8. **Trust (full-width photo):** the truck-and-trailer photo across the full width, with a panel overlapping it that holds 4 checkable facts (insured, third generation, Where To Get Stuff Fixed 2023, buys direct).
9. **Service area:** "80 miles around downtown Indianapolis." with all 19 town pages as square tags.
10. **Quote:** a call card with a crew photo, next to the short form (name, phone, location, style, feet, duration). Inline errors show under the fields, and submitting shows "Concept preview: this form isn't connected."
11. **Footer:** logo, contact and address, hours, use and type links, privacy, and the Limestone Web Co credit.

Only 2 section labels ("What we fence", "Get a quote"), no em dashes, one button label per action, and no marquee.

## Copy notes
All facts come from `home.html`, `site.mjs` and the quote form component. Changes from the current homepage:
- New hero subline (same facts).
- "Emergency" was renamed "Emergency and restoration", which matches `USES`.
- Step 5 was reworded to "Removal was in the number, so there is nothing extra to pay."
- Area text ends at "The answer is usually yes." The clause "it costs nothing to find out" was cut.
- Duration options are written "1 to 3 months" instead of with dashes.
- The "How did you hear about us?" field was left out of the concept form. Add it back on adoption.

## What adopting it would take
- **Homepage:** replace `site/build/partials/home.html` with this markup. Keep `{{cityLinks}}` and `{{quoteCta}}` if wanted, or bring the town tags and form across as they are, rewired to `js-inquiry`, Turnstile, the honeypot and the "How did you hear" field. Add a new stylesheet. The fastest path is a separate `home.css` loaded only on `/`.
- **Header and footer are shared** (`build/lib/layout.mjs`). This concept uses its own light header with the dark-text logo, its own footer and its own tokens. For the site to feel like one site, either:
  - (a) restyle `styles.css` across all pages to the concrete, Archivo, square-corner system (bigger job, consistent result), or
  - (b) use the new look on the homepage only (quick, but the jump to inner pages will feel like a different site).

  Recommend (a), done in stages: tokens and fonts first, then header and footer, then components.
- The dropdown menus in the current header (What we fence / Fence types / Company) were simplified to plain links here. The real header should keep the dropdowns, restyled.
- Fonts: self-host Archivo (variable, width + weight) instead of loading it from Google Fonts.
- `main.js` duties to keep: source capture, `fwTrack` events, Turnstile and form posting. Replace the concept's `new.js` form handler with the real one.
- Dark mode is new for this site. Every inner page would need checking in both modes, or dark mode can be left off at first.

## For Richard to confirm
- Is he happy with "The owner answers / Richard picks up his own phone, 7 days a week" as a headline fact?
- Is the comparison wording against "national chains" OK to keep that prominent?
- Is he OK with the crew photo (faces visible) next to the phone number?
- The 4.6 / 39 reviews number needs re-checking before launch (already in TODO.md).
