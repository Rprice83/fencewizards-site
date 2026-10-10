# A. Homepage, shared copy, About, Contact, FAQ, estimator

## Overall
- **What works:** Richard's voice holds up well. The copy is plain and specific, uses trade terms ("run of show", "a date to hold a sub to", Net 30, post-driven), and gives real numbers. The hero names the four products and three uses, and the flat-price/removal promise is the right thing to lead with. The pricing-policy cleanup held: there's no "up to 12 months" claim, no "short-job discount", and 8 ft reads as a special order everywhere I looked.
- **Biggest problem (trust):** "No rent clock / if your schedule slips a month, the price doesn't move" sits right next to an estimator that prices by term and shows the tiers to the visitor (`estimate.js:527` "Up to 12 mo $5.65 · 13–18 mo $6.85 · 19+ mo $8.20"). A GC whose job runs from 12 to 13 months sees the rate change. Richard needs to say what really happens when a job overruns, and then the homepage, FAQ and About all need to match.
- **Other contradictions across pages:**
  - **Yard location:** the site says the yard is in Greenwood, but the project notes say Richard's yard is downtown, and Yelp lists 3909 Aloda St, Indianapolis.
  - **Hours:** "7 days, 7:30am–9pm" here, but the old homepage said "Weekdays, and on the weekend when a job needs it".
  - **Emergency speed:** the homepage Emergency card says "Same-week", while the H1 says 24–48 hours and emergency work is faster.
  - **List price:** the FAQ says "There is no list price", but the estimator shows "from $5.65/ft".
  - **Damage fees:** the site attacks "a fee for every bent panel", yet the estimator sells a 5% damage waiver.
  - **Orange fencing:** About says "we don't do orange fencing", and a gallery photo on the same page shows orange safety mesh.
- **Clear AI tells, mostly carried over from the old copy:** em dashes in the hero lede and stat tiles, contrast reveals ("isn't X. It's Y", "not adjectives"), a negation list on About, and the same meta line ("true and checkable rather than adjectives") used on two pages.
- **CTA labels:** one destination (/estimate/) has seven labels: "Plan & Price Your Fence", "Plan & price your fence", "Plan & price it", "Price my job", "Get a Quote", "Get a Free Quote", "Draw your fence on a map". The "Five answers" quick form asks for five things but has no gates field.

## Findings

### Homepage (site/build/partials/home.html, pages/home.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | Pricing section, home.html:87; compare row :94 | "If your schedule slips a month, the price doesn&rsquo;t move." / "Schedule slips a month … Price holds" | Factual conflict: the estimator prices by term and shows the tiers | Hold until Richard answers [NEED 1]. If an overrun does cost more, replace with "Richard prices the job once, up front, for the term you need, and the number includes the removal." and change the row to "Extending the job" / "Rent keeps running" / "[NEED: extension terms]" |
| High | Uses › Emergency, :72 | "Same-week perimeter fencing after storms, fires and break-ins." | Contradicts the H1 (24–48 h) and "Emergency work moves faster" | "Tornado, fire and restoration work. Perimeter fencing after storms, fires and break-ins, usually faster than our normal 24 to 48 hours." |
| High | Service area, :196 | "We&rsquo;re based in Greenwood" | Yard location is inconsistent (notes say downtown; Yelp says Aloda St) | Keep until [NEED 2] is answered, then make it match Contact, the footer and placeCard |
| Med | Hero lede, :11 | "agreed before the first panel goes up &mdash; and it covers taking it back down." | Em dash in short copy | "One flat price, agreed before the first panel goes up, and it includes taking the fence back down." |
| Med | Hero stats, :20–22 | "From your call to fence on the ground" / "$0 Extra to pull it &mdash; removal is in the price" / "1 price Agreed up front &mdash; no rent clock" | Stat 1 repeats the H1; stats 2 and 3 repeat the lede and the pricing section; em dashes | Keep the 24–48 tile. Merge $0 and 1 price into one tile: `<strong>$0</strong><p>Extra for removal. It&rsquo;s in the price</p>`. Use the freed tile for something new: `<strong>7<span>days</span></strong><p>Richard answers his own phone</p>` (only if the hours are confirmed, [NEED 3]) |
| Med | Hero H1, :10 | "Fence on the ground <em>in 24&ndash;48 hours.</em>" | Passes the "Now you can" test. Fails the swap test (any rental company can say it) and has no "temporary fence rental" keyword (the original H1 did) | See the alternatives below |
| Med | Hero CTA, :13 | "Plan &amp; Price Your Fence" | Title case; the same button is sentence case on inner pages; seven labels for one URL | Pick one label site-wide: "Price your fence online" (see CTA section) |
| Med | Fence types note, :108 | "Anything not on this list is work we don&rsquo;t take &mdash; and we&rsquo;ll tell you on the call, not after the invoice." | Contrast reveal + em dash | "Anything not on this list is work we don&rsquo;t take, and we&rsquo;ll tell you that on the first call." |
| Med | Trust head-note, :179 | "Four things that are true and checkable &mdash; rather than four adjectives." | Contrast reveal; meta copy; repeated on About | Delete the line, or "Four things you can check." |
| Med | Trust list item 2, :182 | "Three generations of fencing" / "Ten-plus years of permanent fence work behind every temporary install." | Body doesn't support the heading | "Richard is a third-generation fencer, with ten-plus years of permanent fence work behind every temporary install." |
| Med | Pricing para, :86 | "The national companies make their margin after the fence is up &mdash; rent that keeps running…, a charge to come collect it, a fee for every bent panel." | Em dash + reflexive three. Also clashes with the 5% damage waiver | "The national companies make their margin after the fence is up: rent that keeps running when your job runs long, a charge to come collect it, and damage fees." Settle the waiver wording first [NEED 4] |
| Med | Quote CTA, home.mjs:22 | "Five answers and *Richard can price it.*" | The quick form has no gates field, so the visitor can't give the five answers | Add a "Gates" number field to quoteCta, or change to "A few answers and *Richard can price it.*" |
| Low | home.mjs:22 | "treats almost all of them as urgent, because in this trade the ones that aren't are rare." | Awkward double negative | "treats nearly all of them as urgent, because in this trade most of them are." |
| Low | Fence types › Post-driven, :124 | `<dt>Set</dt><dd>Crew on site</dd>` | Not a value; Richard confirmed 24 to 48 hours everywhere | `<dd>24&ndash;48 hours</dd>` |
| Low | Process note, :153 | "99% of our work is business-to-business" | AUTHORING style is "Ninety-nine percent"; the FAQ says "business to business" | "Ninety-nine percent of our work is business to business, so…" |
| Low | Process step 4, :159 | "Gate needs to move or a run added? Call and we come out &mdash; same day for GCs." | Ungrammatical; em dash | "Need a gate moved or a run added? Call and we come out, same day for general contractors." |
| Low | Process step 2, :157 | "Get a number same day" | Forms promise "within 24 hours, usually the same day" | "Get a number the same day you call" |
| Low | Trust item 4, :184 | "no middle man &mdash; the savings go into your quote." | "middleman"; em dash | "Our own material, bought direct with no middleman. The savings go into your quote." |
| Low | Rating card, :171–173; footer | "★★★★★" with "4.6" | Five full stars shown for 4.6 | Show 4.5 stars, or drop the stars and keep "4.6 on Google" |
| Low | Area H2, :195 | "Eighty miles around" | Style rule says "80 miles" | "80 miles around *downtown Indianapolis.*" |
| Low | Area para, :196 | "Near the edge? Call and ask &mdash; the answer is usually yes…" | Em dash | "Near the edge? Call and ask. The answer is usually yes, and it costs nothing to find out." |
| Low | Uses card › Events, :63 | "pulled the hour the event ends." | Strong promise; overnight events? (original copy) | Keep if Richard confirms [NEED 6] |

### Shared copy (components.mjs, layout.mjs, site.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | layout.mjs:53, :96, :133; components.mjs:260 | "Open 7 days, 7:30am&ndash;9pm" / "Richard answers his own phone, 7 days" | Conflicts with the original homepage ("Weekdays, and on the weekend when a job needs it") | [NEED 3] |
| Med | layout.mjs:74 and :82 | "Get a Free Quote" / "Get a Quote" → /estimate/ | Synonym cycling; the estimator gives a "preliminary estimate", not a quote | Both: "Price your fence" |
| Med | components.mjs:55, :223, :295 | "Plan &amp; price your fence" / "Plan &amp; price it" | Same destination, different labels | Use one label everywhere (see CTA section) |
| Low | components.mjs:262 | "Prefer to price it yourself? <a…>Draw your fence on a map &rarr;" | Arrow character; fine otherwise | Keep, or "Draw your fence and see a price" |
| Low | layout.mjs:138 | "workers&rsquo; comp insured. &middot;" | Stray period before the middot | "workers&rsquo; comp insured &middot; " |
| Low | components.mjs:284 vs contact.mjs:46 | Quick form has the reply promise; the contact form doesn't | Inconsistent | Add "Richard reaches out within 24 hours, usually the same day." to the contact form note |
| Low | site.mjs:46 vs home.html:71 | USES name "Emergency & Restoration" vs the homepage card "Emergency" | Minor naming drift | Fine as is, or make the card "Emergency & restoration" |

### About (pages/about.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | Gallery, :87 vs :51 | image `orange-safety-grass` ("Chain link with orange safety mesh") next to "we don't do… orange fencing" | Contradiction on the same page | Swap for another image (e.g. `field-run-two`), or confirm with Richard [NEED 7] |
| Med | Features 01, :48 | "Flat fee, no rent that keeps running, no removal charge, no excessive damage fees." | Negation list (ban); waiver conflict | "One flat fee covers delivery, install, the rental for the agreed term and taking it back down, and we don't charge excessive damage fees. At a national company each of those is a profit center, and we decided not to build one." (wording from the original FAQ) |
| Med | Features intro, :44 | "The goal on any job isn't to make as much as possible on that job. It's to be the number…" | Contrast reveal | "On every job, the goal is to be the number a project manager calls the next ten times, and the ten after that." |
| Med | Equipment, :31 | "and the reason isn't that it's impressive. It's that the crew gets more done…" | Contrast reveal | "We buy the most current fence installation equipment we can, because the crew gets more done in a day and finishes it less beaten up." |
| Med | Sites intro, :58 | "We name the sites, not claim the venues as customers. … so the sites are what we name." | Broken parallelism, circular, contrast | "These are sites our fence has stood on. At this scale the venue is the end user and another company hired us, so we list the sites rather than claim the venues as customers." |
| Med | Facts heading, :73 | "Checkable facts, *not adjectives.*" | Contrast reveal; duplicates the homepage line | "Facts you can *check.*" |
| Med | Features 03, :50 | "A live person on the first ring…" | Overclaim; Contact says "answers or calls straight back" | "A live person, or a call straight back, is most of what separates us from a dispatch queue." |
| Med | Facts, :78 | "Recognized: Indianapolis Monthly" | Publication name isn't in the original copy | [NEED 8] |
| Low | Intro para, :21 | "The ten-plus years of permanent fence work behind this company really go back a lot further than that." | Illogical ("ten years go back further") | "The company has ten-plus years of permanent fence work behind it, and the family's goes back a lot further." |
| Low | :33 | "Richard is working on his OSHA 30." | May be out of date | [NEED 9] |
| Low | Hero lede, :13 | "Owner run out of Greenwood" | Hyphen | "Owner-run out of Greenwood" |
| Low | :62 vs faq.mjs:98 | "Google Pixel event" vs "Google Pixel Event" | Capitalization; already open in TODO (one site or two?) | Pick one |
| Low | :65–66 | Label "Indiana" for VA / SSA | Vague | [NEED 10: city] |
| Low | quoteCta, :95 | eyebrow "Work with the owner" + heading "Work with *the owner.*" | Same words twice | eyebrow: 'Get a quote' |

### Contact (pages/contact.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | Tool card, :21 | "the tool works out the run. Estimators use it the same way, as a reference for a bid." | Undersells the tool (it now shows a price); "Estimators use it" can't be checked on a tool that hasn't launched | "If you'd rather not talk yet, draw the fence on a map and the tool measures the run and shows a preliminary price you can use as a reference for a bid." |
| Med | Closing quoteCta, :95 | "Or just call and *get it over with.*" | A "call" headline over a form; "get it over with" is negative; a second form on the same page | "Or send the five answers *in one go.*" Or drop this quoteCta and use ctaBand() |
| Low | Para 1, :9 | "rather than making you wait for a written proposal you don't have time for yet." | Awkward | "rather than making you wait for the written proposal. That follows." (then delete "The written version follows.") |
| Low | Para 2, :10 | "…because the site plan changed: those are normal, not a complaint, and general contractors…" | Colon reveal + contrast | "…because the site plan changed. Those calls are a normal part of the job, and general contractors get same-day service on them." |
| Low | Form label, :34 | "Comments" | Weak label | "What's the job?" (and shorten the placeholder to "Dates, footage, gates, anything we should know.") |
| Low | Yard, :16 / Find us, :55 | "Greenwood, IN" / "Based in Greenwood" | Location question | [NEED 2] |
| Low | Meta description, :73 | "crowd control barricades" | Hyphen | "crowd-control barricades" |

### FAQ (pages/faq.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | Rent by the month, :32–33 | "If your schedule slips and the job runs long, the number doesn't move. There is no meter running on the fence." | Same term-pricing conflict | [NEED 1] |
| Med | Cost, :28 | "There is no list price, and any company that gives you one before asking about your site is guessing." | Our estimator shows "from $5.65/ft" and a live price | "There's no one-size price. The number comes from five things: where the project is, what style of fence, how many linear feet, how many gates, and how long you need it." |
| Med | Distance, :81 | "On a job near the outer edge of the radius, yes…" | Vague; the estimator applies a 50+ mile rule | "Yes, for sites more than 50 miles from downtown Indianapolis, and it shows up as its own line in the number rather than getting folded into a vague figure." |
| Med | Damage fees, :36 | "We don't charge excessive damage fees." | The estimator offers a 5% waiver with no explanation | Add a sentence once [NEED 4] is answered |
| Low | Emergency, :48 | "is a real part of this business rather than something bolted on. The honest answer on timing depends…" | Contrast + "honest" weasel | "Yes. [Emergency work](/emergency-fencing/) is a regular part of this business. Timing depends on where the site is and what is already on the truck that day. Call and we will give you a real time, and if we can't make it work we will say so on that call." |
| Low | Large events, :98 | Q "Have you worked on large events?" lists VA, SSA, Ball State | Answer isn't about events | Q: "Where has your fence been used?" |
| Low | Intro :19, :38 | "wants to know what he is actually buying" / "before he needs it" | Gendered | "they are actually buying" / "before they need it" |
| Low | :29 | "the [quote tool](/estimate/) … returns a number by itself" | Term drift (the page calls it an estimator elsewhere) | "the [estimator](/estimate/) lets you draw the run on a map and shows a preliminary price" |
| Low | :92 | "No. We don't take residential fencing work." | Redundant | "No. Ninety-nine percent of what we do is business to business…" |
| Low | Night installs, :49 | "Event schedules are the reason this business is built the way it is." | Vague | "Yes. Tell us your load-in window and we work to it, including overnight and before dawn." |

### Estimator + confirmation (partials/estimate.html, confirmation.html, pages/estimate.mjs)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | Panel intro, estimate.html:58 | "Richard reviews every plan and calls you within 24 hours." | Contradicts the Text/Email preference; drops "usually the same day" | "Richard reviews every plan and gets back to you within 24 hours, usually the same day." |
| Med | Step 3 intro, :225 | "will reach out within 24 hours to go over your plan" | Missing "usually the same day" | "…will reach out within 24 hours, usually the same day, to go over your plan and confirm the price." |
| Med | Damage waiver, :212 | "Optional, adds 5% of the contract price. Richard will walk you through what it covers." | Vague; clashes with the "no damage-fee" message | "[NEED 4: one line on what it covers]" |
| Med | Branded windscreen, :209 vs pricing.js:155 | "$800 each (min. 6)" vs "orders under 6 are priced slightly higher" | The two say different things; "each" what size? | "Custom printed, $800 per screen for 6 or more" + [NEED 11: screen size] |
| Med | H1, :57 | "Draw it. Price it. <em>Send it to Richard.</em>" | Fragment drumbeat + reflexive three (borderline; it is a real 3-step) | "Draw your fence, see a price, <em>send it to Richard.</em>" or keep as a deliberate device |
| Low | Summary fine print, :268 | "Pre-tax planning estimate from Richard&rsquo;s August 2026 price sheet." | Will age; "planning" vs "preliminary" | "Preliminary, pre-tax estimate. Richard confirms the final price after reviewing your site." (matches the confirmation page) |
| Low | :200 vs :205 | "sand bags" vs "sandbagged" elsewhere | Spelling | "sandbags" |
| Low | Confirmation H1, confirmation.html:7 | "Thanks! Your plan is…" | Exclamation point | "Thanks. Your plan is <em>on its way to Richard.</em>" |
| Low | Confirmation lede, :8 | "within 24 hours" | No "usually the same day" (step 2 has it) | Fine; optional add |

### 404 / Privacy
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Low | 404 lede | "Try one of these, or call Richard" | "these" means only the towns list | "Try the links below, price your fence, or call Richard at …". Optionally add `related()` so fence types and uses are reachable |
| Low | Privacy | Tone is clear and plain | No real issues; the legal items are already tracked in TODO | — |

## Headline/CTA alternatives
**Hero H1**
- A: "Temporary fence rental in Indianapolis, *on site in 24–48 hours.*" Puts back the original H1's keyword (SEO and Ads relevance) and keeps the speed claim.
- B: "One flat price, *fence up in 24–48 hours.*" Pairs speed with the flat price, which is harder to copy, so it does better on the swap test. Only use it once [NEED 1] is answered.
- C: "Temporary fence from the owner, *on the ground in 24–48 hours.*" Leans on the owner-answered phone, which is the clearest difference from the national chains.

**Main CTA (one label site-wide for /estimate/)**
- A: "Price your fence online". Says what they get and works in the hero, nav and the bands.
- B: "Draw it and see a price". Concrete about how it works; good for the hero and the tool card.
- C: Keep "Plan & price your fence" but in sentence case everywhere, and change the nav's "Get a (Free) Quote" to "Price your fence". This is the smallest change.

## [NEED] questions for Richard
1. **Term overrun:** if a job runs past the agreed months (for example 12 → 13, which crosses a price tier), does the price stay the same, get extended at a set rate, or get re-quoted? The "no rent clock / price holds if the schedule slips" claims on the homepage, FAQ and About depend on this.
2. **Yard location:** is the yard in Greenwood (1176 Newark Ct) or downtown Indianapolis (3909 Aloda St appears on Yelp/MapQuest)? The site says Greenwood in several places.
3. **Hours:** is it truly 7 days, 7:30am–9pm (used site-wide), or "weekdays, and weekends when a job needs it" (old homepage)?
4. **Damage waiver:** what does the 5% waiver cover, and what does a customer pay for damage without it? The site says "no excessive damage fees" and attacks per-panel fees.
5. **Emergency speed:** is "same-week" or "faster than 24–48 hours" the right promise for emergency work?
6. **Events:** is "pulled the hour the event ends" accurate, including overnight load-outs?
7. **Orange fencing:** About says "we don't do orange fencing", but the About gallery shows orange safety mesh on chain link. Is that photo his job, and is that something he offers?
8. **"Where To Get Stuff Fixed" 2023:** is this Indianapolis Monthly's list? The About page names the publication; the original copy didn't.
9. **OSHA 30:** finished yet?
10. **VA and SSA sites:** which city? (Also already open: is the NBA All-Star Game Google Pixel event one site or two?)
11. **Branded windscreen:** what size is one "screen" at $800, and is 6 a firm minimum or just a price break?
12. **Phone number** (already in TODO): his Google profile shows (317) 939-9030 while the site uses 296-4015.
