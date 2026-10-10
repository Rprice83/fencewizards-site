# B. Use pages (construction, event, emergency) and fence-type pages

## Overall
- **What works:** Richard's trade voice comes through: "a date they can hold a sub to", "hasn't stood next to one in March", "where the fence has to hold rather than just mark", "Call, don't email". The spec tables and the "wrong answer to" FAQs are specific and believable. I found no pricing-policy violations: no 12-month claim, no short-job discount, and 8 ft is listed as a special order everywhere.
- **Biggest tic across all pages: "rather than".** It appears 36 times in 7 pages (10 on the event page alone). Most uses are soft contrast reveals ("X rather than Y"), along with "honest/honestly" (5×), "actually" (4×) and "we don't/won't pretend" (2×). Cut about two-thirds of them and state the positive fact.
- **Photo problems that hurt trust (High):**
  - The post-driven chain link page shows panels on stands in 3 places.
  - The barricades page says "we don't carry" plastic, then shows red plastic barricades.
  - Several alt texts describe things that aren't in the photo.
- **Contradictions between pages:**
  - Same-day moves: "for general contractors" on some pages, unqualified on others.
  - Install time for driven chain link: 24–48 h on the construction page, "longer, scheduled accordingly" on its own page.
  - Event strike: "the hour the last guest leaves" vs "the night the event ends".
  - Each use page claims the business was "built around" its own use.
  - The same paragraph is repeated within pages: the venue-list disclaimer appears twice on the events page, and "nobody has a measured plan" appears 3× on the emergency page.
- **Gaps buyers will look for:** after-hours emergency availability, windscreen colors and print turnaround, barricade size and quantity, and lead time for driven fence. These are listed as [NEED] below.

## Findings

### uses/construction-fencing.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | FAQ, line 71 | "and it doesn't keep running if your project runs long" | Pricing claim: the price sheet has duration tiers (e.g. 19–23 mo panel rate), so a job that runs long may change price | [NEED: what happens to the price if a job runs past the quoted duration?] Until answered, use: "No. The rental is a flat fee agreed before the install, with removal included. There is no monthly bill." |
| Med | meta description, line 6 | "moved the same day the plan changes" | Overclaim: same-day is for GCs only (step 4, FAQ 3) | "Construction site fence rental across Indianapolis. Panels, chain link, gates and windscreen, on site in 24 to 48 hours. Flat fee, removal included." |
| Med | hero lede, line 13 | "A perimeter that moves as fast as your schedule does, on a flat fee that already includes taking it back down." | Fails the swap test (first half is generic) | "Panels, chain link, gates and windscreen on site in 24 to 48 hours, on one flat price that already covers taking it down." |
| Med | intro, line 21 | "When a gate has to move or a run has to be added, we come back out the same day." | Inconsistent: elsewhere it is "same-day service for general contractors" | "When a gate has to move or a run has to be added, we come back out, same day for general contractors." |
| Med | intro, line 21 | "We set panels and stands, post-driven chain link, gates and windscreen ... usually within 24 to 48 hours of the call." | Conflicts with the post-driven page ("Longer ... we schedule it accordingly") | [NEED: is 24–48 h true for driven chain link?] If not: "We set panels and stands within 24 to 48 hours of the call, and schedule post-driven chain link, gates and windscreen around the job." |
| Low | prose para 3 (line 33), steps intro (line 43), FAQ 3 (line 72) | "Fencing gets in somebody's way at least once on every project." | Same line three times on one page | Keep it in the steps intro. Cut the prose para 3 sentence and change FAQ 3 to "You call and we come out. General contractors get same-day service on moves, gate relocations and sections added to an existing run." |
| Low | FAQ 3, line 72 | "so we built the business around answering that call rather than avoiding it" | Contrast reveal; also each use page claims the business was "built" for it | Delete the clause (see fix above). |
| Low | step 4, line 48 | "Fence moved, gates relocated, sections added to an existing run. Same-day service for general contractors." | Fragment drumbeat (two fragments) | "Call when the fence needs moving, a gate relocated or a section added. General contractors get same-day service." |
| Low | intro imageAlt, line 24 | "Panel fence with gates around a school building project" | Alt text: no gate is visible and "school" can't be confirmed from the photo | "Panel fence on sandbagged stands across a lawn beside a brick building" |

### uses/event-fencing.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | hero lede, line 13 | "Set on your run of show rather than ours, and pulled the hour the last guest leaves." | Over-promise that conflicts with FAQ 4 ("the night the event ends"); also a contrast reveal | "Set to your load-in times, including overnight, and struck the night the event ends." [NEED: confirm same-night strike is always possible] |
| High | prose para 3 (line 33) + FAQ 6 (line 74) | "NBA All-Star Game Google Pixel Event" | Missing punctuation makes it read as one event name. Naming NBA and Google needs confirming | [NEED: exact wording, e.g. "the Google Pixel event at the NBA All-Star Game", and Richard's OK to name these] |
| Med | prose para 3 + FAQ 6 | "We are naming sites our fence has stood on rather than claiming the venues as customers, because at that scale the venue is the end user and whoever hired us is somebody else." | Defensive, awkward, and repeated almost word for word on the same page | Prose: "We were hired by the contractors and production companies working those sites, not by the venues." FAQ 6: cut the second sentence. |
| Med | prose para 1, line 31 | "Most event fencing is treated as a cost. It doesn't have to be." | Contrast reveal | "Windscreen fitted across a panel run gives you privacy and dust control. Printed, the same run becomes a banner the length of the site." |
| Med | typeCards `pick`, line 56 | `['barricades', 'windscreen']` | Inconsistent: the copy is all about "panel runs", and the panels page says panels suit "most events" | `['barricades', 'panels', 'windscreen']` and add `panels: 'Set during load-in and pulled during load-out. Your crew can shift a section by hand.'` |
| Med | FAQ 1, line 69 | "Event schedules are the reason this business is built the way it is." | Unverifiable; the construction and emergency pages make the same claim for their own uses | "Yes. Tell us the load-in window and we work to it, including overnight and before dawn, and plan the crew and the truck around it." |
| Med | FAQ 3, line 71 | "it's usually the cheapest large-format signage on the job" | Unverifiable superlative, repeated on 3 pages | [NEED: rough cost comparison, or OK to keep?] Softer: "On an event it often costs less than separate banners covering the same length." |
| Med | FAQ 4, line 72 | "an event fence that is still standing the next morning is a problem for the venue rather than for us, which is exactly why we don't leave it there" | The logic reads backwards; run-on | "Yes. The removal is already in the price, and a fence still standing the next morning is the venue's problem, so we don't leave it there." |
| Med | step 5, line 49 | "Not the following Monday. The removal was already priced." | Negation fragment | "The same night, with the removal already in the price." |
| Low | step 1, line 45 | "The fence plan follows those three times, not a generic install window." | Contrast tail | "The fence plan is built around those three times." |
| Low | step 3, line 47 | "Event work doesn't happen at a convenient hour and we don't pretend it does." | "We don't pretend" tic (also on the post-driven page) | "Event work happens at inconvenient hours, so we schedule crews for them." |
| Low | step 4, line 48 | "Stay on call through the event" | Unconfirmed promise | [NEED: is someone on call during events?] |
| Low | intro, line 21 | "rather than the next business day" | One of 10 "rather than" on this page | "we pull them when the event is over." |

### uses/emergency-fencing.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | meta description, line 6 | "Built for restoration contractors who need a perimeter today." | "Today" is a promise; FAQ 1 says it "depends". Break-ins are missing | "Emergency fence rental after a storm, fire, break-in or structural loss, across central Indiana. Call Richard for a real arrival time." |
| High | page-wide | (no mention of hours) | The emergency page never says whether Richard answers nights and weekends | [NEED: after-hours/weekend emergency availability] Then add to step 1: "Richard answers it himself, [hours]." |
| Med | step 3 title, line 47 | "We set what we can today" | Same overclaim as the meta description | "We set what we can first" |
| Med | intro, line 21 | "and this part of the business was built for it rather than bolted on" | Contrast reveal; conflicts with the other pages' "built around" claims | Delete the clause: "We take emergency fencing calls across the Indianapolis metro and within roughly 80 miles of downtown. Call and tell us where it is and how much of it needs closing." |
| Med | intro lead, line 19 | "After a tornado, a fire or a structural loss" | Break-ins are in the USES blurb but not on this page | "After a storm, a fire, a break-in or a structural loss, the perimeter is the first thing an adjuster and a restoration contractor both need." |
| Med | FAQ 3, line 71 | "which clears standard vendor requirements for restoration companies and property managers" | Unverifiable without limits | "Tell us your required limits and we will confirm before the job." [NEED: policy limits] |
| Low | prose para 3, line 33 | "The commercial insurance package behind us is a full one:" | Awkward; colon reveal | "We carry umbrella, general liability, commercial auto and workers' compensation." |
| Low | steps intro (43), step 2 (46), FAQ 4 (72) | "nobody has a measured plan" | Said 3× | Cut it from the step 2 text: "Rough linear feet and whether the ground is clear enough to drive posts." |
| Low | FAQ 5, line 73, and step 4 | windscreen mentions | Never says windscreen is sold, and typeCards omits it | Add "Windscreen is sold rather than rented, so it stays with the property." Consider adding `'windscreen'` to `pick`. |
| Low | FAQ 2, line 70 | Q: "...restoration companies and adjusters?" | The answer never mentions adjusters | [NEED: does he work directly with adjusters?] Otherwise drop "and adjusters" from the question. |
| Low | FAQ 1, line 69 | "the honest answer depends" | "Honest" tic | "it depends on where the site is and what else is on the truck that day." |
| Low | intro imageAlt, line 24 | "Temporary chain link fence around a cleared lot" | Photo shows panels on stands | "Panel fence on stands along a lot beside houses" |
| Low | hero imageAlt, line 15 | "building with a damaged roof" | Roof is visibly collapsed | "building with a collapsed roof" |

### fence/panels-and-stands.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | hero lede, line 13 | "The portable run. Fast to set, easy for your own crew to shift, and the fence most jobs start with." | Fragment, then a reflexive three | "Six-foot panels in sandbagged stands, on site in 24 to 48 hours, and light enough for two of your crew to shift a section by hand." |
| Low | specs, line 37 | `'Install speed', 'The fastest option we carry, usually within 24 to 48 hours'` | Mixes install speed with lead time; 24–48 h applies to everything | `'Lead time', '24 to 48 hours from the call, emergencies faster. The fastest type to install.'` |
| Low | specs, line 38 | "By hand, section by section, without tools" | Original says no tools "in most configurations" | "By hand, section by section, usually without tools" |
| Low | features 2, line 52 | "which is the only schedule an event fence can actually keep" | Hyperbole plus "actually" | "which is the schedule an event fence has to keep." |
| Low | FAQ 6, line 66 | "is the honest recommendation, and we will say so on the call" | "Honest" tic | "is the better choice, and we will say so on the call." |

### fence/post-driven-chain-link.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | specs image (line 32), features 2 image (line 52), gallery (line 72) | `apartment-build-wrapped`, `stacked-panels-site`, `school-building-panels` | All three photos show **panels on sandbagged stands**, not driven chain link, on the page arguing driven beats panels | Swap for driven photos (`muddy-site-edge`, `orange-safety-grass`, `field-run-two`, `winter-site-generator`), or [NEED: more driven-fence photos]. Fix the alts: "Chain link fence around an apartment building..." and "Chain link fence around stacked material" are not what's shown. |
| High | specs (line 37), FAQ 3 (line 63) | "Longer than panels, planned rather than improvised" / "we schedule it accordingly" | Vague; doesn't answer the question; conflicts with the construction page's 24–48 h | [NEED: typical lead time and install pace for driven, e.g. days from call, feet per day] |
| Med | hero lede, line 13 | "Driven into the ground. It doesn't lift, it doesn't slide, and it doesn't get walked through." | Negation list plus fragment in the hero; the same phrasing repeats in the meta description and FAQ 1 | "Posts driven into the ground and fabric tensioned between them, for a site that has to stay shut after your crew leaves." |
| Med | FAQ 2, line 62 | "panels in sandbagged stands do the same job above grade" | Contradicts the page: panels don't do the same job | "panels in sandbagged stands are the above-grade option." |
| Low | title, line 5 | "Post Driven Temporary Chain Link Fence Rental Indianapolis \| Fence Wizards" | ~75 chars (truncated in Google); missing hyphen | "Post-Driven Chain Link Fence Rental Indianapolis \| Fence Wizards" |
| Low | FAQ 6, line 66 | "We aren't a landscaping company and we won't pretend a driven post leaves no mark" | Doesn't answer yes/no; "pretend" tic | [NEED: are post holes filled at removal?] Then: "No. The posts come out with the fence, and the removal is in the price, but a driven post leaves holes. If the surface matters, say so and we will talk about panels instead." |
| Low | specs, line 41 | "real security" | Overclaim | "sites that have to stay shut" |
| Low | gallery, line 74 | `orange-safety-grass` | Original site says "We do not do ... orange fencing" | [NEED: is the orange mesh theirs? If not, drop the photo.] |

### fence/windscreen.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | specs, lines 35–42 | (no color, height, material or print lead time) | Buyers need these facts; photos show black and green | [NEED: colors, heights/roll sizes, print turnaround, minimum print order] Add rows such as `['Colors', '[NEED]']` and `['Print lead time', '[NEED]']`. |
| Med | page-wide | "Sold rather than rented" | Unclear whether install and removal are included and who keeps it at pickup | [NEED: is fitting included in the sale price? At removal, do you take it down and leave it with the customer?] |
| Med | features 3 (53), FAQ 2 (62) | "It's the cheapest large-format signage on most event sites." / "by a wide margin" | Unverifiable superlative (3 pages) | [NEED: proof] or "It costs less than separate banners covering the same length." |
| Low | hero lede, line 13 | "Privacy and dust across the whole run" | Missing word | "Privacy and dust control across the whole run, plain or printed with your own mark." |
| Low | title, line 5 | "Construction Windscreen and Printed Fence Screen Indianapolis \| Fence Wizards" | ~77 chars, truncated | "Construction Windscreen and Printed Fence Screen \| Fence Wizards" |

### fence/barricades.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | features 3 image, line 53 | `downtown-lot-barriers`, alt "Barricades separating a downtown parking lot" | Photo shows red **plastic** barricades, directly under "Plastic ... which is why we don't carry them" | Replace with `barricades-outside-building` or another steel barricade photo; for the alt, describe what's visible. |
| Med | specs image (32) + features 2 (52) | `barricades-venue`, "Barricades shaping a queue outside a venue" / "Steel barricades in front of a venue" | Same photo used twice; both alts are wrong (it's inside an open hangar) | Use it once, alt "Steel barricades lined up inside an open hangar door"; use `barricades-building-run` or another photo for the other slot. |
| Med | gallery, lines 72–75 | `barricades-outside-building` (duplicates the hero), `city-sidewalk-panels`, `orange-safety-run`, `winter-site-generator` "...with a generator in winter" | Off-topic (no barricades); no generator is visible | Drop the gallery or limit it to barricade photos. |
| Med | specs, line 38 | "Smaller than a fence run, priced the same honest way" | "Honest" puffery | "Smaller than a fence run, on one flat price agreed up front" [NEED: confirm barricade pricing works this way, incl. delivery and pickup] |
| Med | specs (missing) | — | No barricade length, height or quantity on hand | [NEED: section length, height, how many in stock] |
| Low | FAQ 6, line 66 | "Event work often moves faster than that, so call..." | Unclear (does Fence Wizards move faster, or the events?) | "If your event is sooner than that, call and tell us the date rather than assuming it's too late." |
| Low | hero imageAlt, line 15 | "lining the outside of a venue" | "Venue" is not visible | "Steel crowd-control barricades along the outside of a metal building" |
| Low | features 2, line 52 | "Plastic and stanchions don't, which is why we don't carry them." | Fine as voice; keep only once the photo is fixed | — |

## [NEED] questions for Richard
1. If a job runs longer than the quoted duration, does the flat price change? (The construction FAQ says it "doesn't keep running if your project runs long.")
2. Is driven chain link also installed within 24–48 hours? What is a typical lead time and install pace?
3. Do you answer emergency calls nights and weekends? What hours should the emergency page state?
4. Is the event strike always the same night? Is someone on call during events?
5. Exact wording for "NBA All-Star Game Google Pixel Event" (which event, which year), and OK to name the NBA, Google, Final Four, VA and SSA?
6. Windscreen: colors, heights, print turnaround, minimum order. Is fitting included in the sale? What happens to it at removal?
7. Can "cheapest large-format signage on the job" be backed up, or should it be softened?
8. Barricades: section length/height, quantity available, and is pricing a flat price including delivery and pickup?
9. Insurance limits, to support "clears standard vendor requirements"?
10. Do you work directly with insurance adjusters?
11. Are post holes filled when driven fence is pulled?
12. Is the orange mesh in `orange-safety-grass` / `orange-safety-run` yours? (The old site says "We do not do ... orange fencing.")
13. More photos of post-driven chain link and of steel barricades, to replace panel and plastic shots on those pages.

## Applied 2026-10-10
"rather than" in these 7 files: from ~36 down to 1 (kept "where the fence has to hold rather than just mark" on the event page, Richard's voice). All "honest", "actually" and "pretend" tics are gone. Pages render without errors (`node --check` plus an in-memory render); the full build was not run (other agents are working in parallel). No tests assert this copy.

### uses/construction-fencing.mjs
- Meta: "…moved the same day the plan changes. Flat fee." → "…at one flat fee, removal included. Most installs within 24 to 48 hours."
- Hero lede: "A perimeter that moves as fast as your schedule does…" → "Fence on site in 24 to 48 hours, on one flat price that already covers taking it down." (I left out "chain link" so it doesn't promise 24 to 48 hours for driven fence; see R6.)
- Intro: "we come back out the same day" → "we come back out, the same day for general contractors".
- Intro image alt → "Panel fence on sandbagged stands across a lawn beside a brick building".
- Prose: "at the start rather than at the invoice" → "on the first call"; cut the repeated "Fencing gets in somebody's way at least once on every project" (kept in the steps intro) → "When the fence is in the way, you call, and we come out."
- Step 4 (fragments) → "Call when the fence needs moving, a gate relocated or a section added. General contractors get same-day service."
- FAQ 1: "plan rather than improvise" → "plan ahead". FAQ 3: cut "Fencing is in somebody's way… we built the business around answering that call rather than avoiding it". FAQ 5: "on the first call rather than at the invoice" → "on the first call".

### uses/event-fencing.mjs
- Hero lede: "Set on your run of show rather than ours, and pulled the hour the last guest leaves." → "Set to your load-in times, including overnight, and struck the night the event ends."
- Intro: cut "rather than the next business day".
- Prose 1 (contrast reveal) → "Windscreen fitted across a panel run gives you privacy and dust control. Printed, the same run becomes a banner the length of the site."
- Prose 2: cut "rather than dropped in a pile for your crew to sort out".
- Prose 3: "Google Pixel Event" → "Google Pixel event" (names unchanged); the disclaimer is now one sentence: "On jobs that size the venue is the end user, and whoever hired us was somebody else working the job."
- Steps 1, 3, 5: "not a generic install window" → "is built around those three times"; "we don't pretend it does" → "Event work happens at inconvenient hours, so we schedule crews for them."; "Not the following Monday. The removal was already priced." → "The same night, with the removal already in the price."
- Type cards: added panels ("Set during load-in and pulled during load-out. Your crew can shift a section by hand."), with the intro updated to match.
- FAQ 1: cut "Event schedules are the reason this business is built the way it is" and "rather than around a standard day". FAQ 3: "usually the cheapest large-format signage on the job" → "often costs less than separate banners covering the same length". FAQ 4 → "Yes. The removal is already in the price, and a fence still standing the next morning is the venue's problem, so we don't leave it there." FAQ 5: cut "rather than just mark" (it duplicated step 2). FAQ 6: removed the repeated disclaimer and fixed "Google Pixel event".

### uses/emergency-fencing.mjs
- Meta: "after a tornado, fire or structural loss… who need a perimeter today" → "after a storm, fire, break-in or structural loss, across central Indiana. Call Richard for a real arrival time."
- Hero alt: "damaged roof" → "collapsed roof". Intro alt: "Temporary chain link fence around a cleared lot beside houses" → "Panel fence on stands along a lot beside houses".
- Intro lead: added a break-in ("After a storm, a fire, a break-in or a structural loss…"). Intro: cut "this part of the business was built for it rather than bolted on".
- Prose 1: "ours rather than allocated from a regional pool…" → "Richard takes the call and sends our own crew and our own material." Prose 3: "The commercial insurance package behind us is a full one:" → "We carry umbrella, general liability, commercial auto and workers' compensation insurance."
- Steps intro: "built around that rather than around a tidy scope document" → "starts with what you can tell us on the phone". Step 2: cut the third "measured plan" line. Step 3: "We set what we can today" → "We set what we can first". Step 5: "we would rather come out than have you work around us" → "Call and we come out, so your crew isn't working around the fence."
- Type cards: added windscreen ("Screens a loss site from the street. Sold, not rented, so it stays with the property.").
- FAQ 1: removed "honest" and "rather than a comfortable one" (it still says "faster than the standard 24 to 48 hour window"). FAQ 2: dropped "and adjusters" from the question (unconfirmed). FAQ 3: "which clears standard vendor requirements…" → "Tell us the limits your vendor file requires and we will confirm them before the job." FAQ 4: reworded so "measured plan" isn't repeated. FAQ 5: added "Windscreen is sold, not rented, so it stays with the property." FAQ 6: removed the duplicate "rather come out" line.

### fence/panels-and-stands.mjs
- Hero lede → "Six-foot panels in sandbagged stands, on site in 24 to 48 hours, and light enough for two of your crew to shift a section by hand."
- Intro lead: "rather than in the ground" → "on top of the ground".
- Specs: "Install speed" row → "Lead time: 24 to 48 hours from the call, emergencies faster. The fastest type to install."; "without tools" → "usually without tools".
- Features 2: "the only schedule an event fence can actually keep" → "the schedule an event fence has to keep".
- FAQs: cut three "rather than" phrases; FAQ 4: removed "honest answer" and "changes the answer"; FAQ 5: "sold rather than rented" → "sold, not rented"; FAQ 6: "the honest recommendation" → "the better choice".

### fence/post-driven-chain-link.mjs
- Title → "Post-Driven Chain Link Fence Rental Indianapolis | Fence Wizards" (64 chars). Meta: the negation list → "Posts driven into the ground for a perimeter that has to stay shut."
- Hero lede → "Posts driven into the ground and fabric tensioned between them, for a site that has to stay shut after your crew leaves."
- Specs: "planned rather than improvised" → "scheduled ahead with a crew on site" (tidy only, no new lead time); "real security" → "Long jobs and sites that have to stay shut".
- Features 2: cut "rather than a marker".
- FAQ 1: the negation list → "so the line can't be lifted at a joint or pushed aside". FAQ 2: "do the same job above grade" → "are the above-grade option"; "rather than after the crew arrives" → "before the crew arrives". FAQ 3: "honest trade" → "trade". FAQ 5: "real work rather than a two-person lift" → "takes a crew visit. On panels it's a two-person lift." FAQ 6: removed "We aren't a landscaping company and we won't pretend…" → "A driven post does leave a mark in the ground, so if the surface matters…".
- **Image swaps** (checked each photo): specs `apartment-build-wrapped` (panels on stands) → `crew-at-fence` (chain link on posts in a lawn; alt "Three crew members standing in front of a chain link fence on a lawn beside a brick building"). Features 2 `stacked-panels-site` (panels) → `windscreen-lot-run` (no stands visible; alt "A long fence run covered in black windscreen along a paved drive"). Features 3 `green-windscreen-lot` (panels on sandbagged stands) → `windscreen-black-run` (no stands visible; alt "Black windscreen on fence runs along the edge of a paved lot"). Features 1 alt now starts "Chain link fence…".
- **Gallery removed:** `school-building-panels` and `muddy-site-edge` both show panels on sandbagged stands (muddy-site-edge is also panels, not driven). That left only `orange-safety-grass` (P3, waiting on Richard), and a one-photo gallery shows full width, so I removed the section. If Richard confirms the orange-mesh job is his, it could come back with another driven photo.

### fence/windscreen.mjs
- Title → "Construction Windscreen and Printed Fence Screen | Fence Wizards". Meta and specs: "Sold rather than rented" → "Sold, not rented".
- Hero lede: "Privacy and dust" → "Privacy and dust control".
- Intro: "We treat it as a sale rather than a rental" → "We sell it".
- Features 3 and FAQ 2: "cheapest large-format signage…" → "costs less than separate banners covering the same length".
- FAQ 1: "Sold, not rented… which is different from how the fence itself is priced" → "Sold. … The fence itself is rented on a flat price." FAQ 3: "What does it actually do?" → "What does it do?" FAQ 5: removed "rather than rented" and "rather look at it than guess" → "we will want to look at it before we say yes".

### fence/barricades.mjs
- Hero alt → "Steel crowd-control barricades along the outside of a metal building".
- Intro: cut "rather than dropped in a pile for somebody else to sort out".
- Specs alt (`barricades-venue`) → "Steel barricades lined up inside an open hangar door". "priced the same honest way" → "priced the same way". "linear feet of line rather than a barricade count" → "Give us the linear feet of line and we can price it faster than from a barricade count".
- **Features:** removed all three images. `downtown-lot-barriers` showed red plastic barricades, `barricades-venue` was a duplicate of the specs photo, and the remaining barricade photo (`barricades-building-run`) is the same building as the hero. Three text cards look even, where one photo card next to two text cards would not. Features 1: "can actually work" → "can do its job".
- **Gallery removed:** it repeated the hero photo and showed no barricades (panels, orange mesh, and a "generator" alt for a photo with no visible generator).
- FAQ 1: "actually" and "rather than just marking…" → "They interlock into a line that holds a crowd in place." FAQ 3: shortened the "isn't a delivery" negation. FAQ 4: cut "rather than a generic install window". FAQ 6 → "If your event is sooner than that, call and tell us the date before assuming it's too late."

### Skipped (and why)
- Construction FAQ 2 "doesn't keep running if your project runs long": blocked on R1.
- Construction intro "post-driven chain link… within 24 to 48 hours": blocked on R6, left as is. Post-driven specs/FAQ 3 lead time: blocked on R6 (tidied only).
- Event step 4 "Stay on call through the event": blocked on R7. Past-sites names: only the capitalization of "event" changed.
- Emergency hours/after-hours line: blocked on R3. Emergency speed wording beyond removing "today": blocked on R5.
- Post-driven FAQ 6 "are holes filled": no yes/no added (Richard question 11).
- Windscreen [NEED] spec rows (colors, sizes, print lead time, fitting/pickup): no placeholder rows added.
- Barricade size/quantity rows and the confirmation of flat pricing incl. delivery/pickup: waiting on Richard.
- `orange-safety-grass` / `orange-safety-run`: not used as replacements (P3).
