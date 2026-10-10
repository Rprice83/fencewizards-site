# E. Blog posts

## Overall
- **The cost guide has the most real problems.** Removing the old claims left it self-contradicting. It names linear feet as "the single biggest driver" (line 44), then says the total is "driven mostly by how long the fence is on site" (line 53). It also says post-driven needs "added installation labor" (lines 37 and 64), which implies it costs more, but the price sheet has post-driven cheaper ($4.20/ft vs $5.65/ft). It knocks national companies for "damage waiver fees" and "fuel surcharges", yet we offer a damage waiver and charge a $1/ft surcharge beyond 50 miles. Under "The direct answer" heading there is no actual answer.
- **The posts disagree about speed.** The emergency post says "same-week" and "doesn't promise a clock time". The post-driven post says 24 to 48 hours and "same-day or next-morning" for emergencies. The cost guide says *quotes* take "24 to 48 hours", which mixes up the reply time (within 24 hours, usually the same day) with install time. The confirmed facts are: install 24 to 48 hours, emergency faster.
- **Some lines contradict the windscreen and product facts.** The event post says only "the printed version is sold". The windscreen post says "we don't … sell fence material". The post-driven post lists top rail as included, but it's a $1.60/ft add-on.
- **AI tells are worst in the post-driven and panels posts:** contrast reveals, negation lists, "This guide covers…" openers, and generic "rental provider" wording. The emergency, event, post-driven and windscreen posts also use third-person "Fence Wizards does X" where the site voice is "we".
- **Meta titles are mostly too long** (110–125 characters). The cost guide's title repeats "Fence Wizards" and the emergency title is missing a hyphen. Keep the search phrases and shorten the endings. No em dashes appear in any post.

## Findings per post

### how-much-does-temporary-fence-rental-cost.mjs (the cost guide)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | :37 | "That added security comes with added installation labor." | Implies post-driven costs more. The price sheet has it cheaper per foot. | "Posts are driven directly into the ground, which makes the fence far more rigid and harder to defeat than a panel system, and per foot it usually costs less than panels." (also drop "is the answer" and "a genuine priority rather than a formality", which is a contrast reveal) |
| High | :49 | "fuel surcharges, damage waiver fees, administrative fees, and escalating rent" | We offer a damage waiver and charge a distance surcharge, so this undercuts our own pricing. The competitor claim is also unsourced. | "The national temporary fence companies quote a low per-foot rate and make their margin after the fence is up: rent that keeps running when the job runs long, a charge to come collect the fence, and fees added to the invoice." (this matches the homepage wording) |
| High | :53 | "Think of temporary fence rental the way you think about any equipment rental… the total is driven mostly by how long the fence is on site." | Contradicts :44 and the flat-price / no-rent-clock pitch. Equipment rental means a rent clock. | "Our per-foot price covers delivery, install, rent and removal, and it is set by how long you tell us the fence will be up. There is no charge to collect the fence at the end, and rent doesn't keep running when a job runs long." (do not mention any month-length rate terms) |
| High | :60 | "We can turn around a quote in 24 to 48 hours as a standard matter." | Confuses quote time with install time. | "Richard gets back to you within 24 hours, usually the same day, and most installs follow within 24 to 48 hours. In an emergency (a storm, a fire, a sudden security need) we move faster." |
| High | :64 | "Post-driven chain link takes more labor, because posts have to be driven and pulled." | The FAQ is titled "for cost purposes" but never states the cost difference, and it implies the wrong one. | "Per foot, post-driven chain link usually costs less than panels and stands. Panels cost a little more but sit on any surface and your crew can move them, so they suit short jobs, pavement and layouts that will change. For long-term or high-security perimeters, post-driven is usually the better value." |
| High | :42 | "Distance from our yard in Greenwood affects delivery and pickup cost… a realistic travel component." | The surcharge is measured from downtown Indianapolis, and CLAUDE.md puts Richard's yard downtown. "Realistic travel component" is vague. | "**Project location.** New installs more than 50 driving miles from downtown Indianapolis carry a per-foot travel charge. Closer jobs don't." [NEED: where is the yard, Greenwood or downtown?] |
| Med | :31–33 | heading "The direct answer: what temporary fence rental costs" | Promises an answer but gives no number. The page doesn't answer its own title. | Either add [NEED: Richard's OK to publish starting rates, e.g. "from $4.20 per foot for post-driven chain link and $5.65 for panels, install, rent and removal included"] or rename the heading to "Temporary fence rental is priced by the linear foot". |
| Med | :46 | "Tell us how long you expect to need the fence, and when a job runs long the rent doesn't keep running. We would rather give you an honest number than see you overpay." | Left incoherent by the removals. It never says how duration affects price. | "**Rental duration.** The per-foot rate depends on how long the fence will be up, so give us your best estimate. The price is agreed once, up front, and if the job runs long the price holds." |
| Med | :54 | "panel systems… minimize the labor-intensive portions of the job" | The reason is wrong given the pricing. Panels suit short jobs because they need no holes and come out fast. | "For a weekend event or a one-week job on pavement, panels on stands are usually right because they need no holes and come out fast. For multi-month construction, post-driven chain link often makes more sense because it's more secure and usually cheaper per foot." |
| Med | :50 vs :65 | "built into the price rather than billed as a trip charge" / "Minor relocations and gate moves for ongoing clients…" | Inconsistent: are moves included for everyone or only for ongoing clients? | Keep one rule. [NEED: are gate moves and minor relocations included for every customer?] Then cut ", not a hidden revenue line" (a contrast tail). |
| Med | :57 | "This is standard in the temporary fence industry… that conversation takes about five minutes." | An unsourced industry claim and an invented-sounding number. It also differs from how-a-rental-works:40. | "Established commercial accounts run on Net 30. Smaller or first-time rentals pay up front. If you're a GC who wants an ongoing account, ask Richard." |
| Med | :63 | "doesn't impose a rigid contractual minimum. Very short rentals of a few days are possible." | Richard's minimum charge is still an open question. | [NEED: minimum charge / shortest rental] Until then: "Ask us about short rentals and we'll give you a straight answer for your job." |
| Med | :6 / :14 | summary "…with flat fees and no hidden charges in Greenwood, IN." / title "…Guide from Fence Wizards \| Fence Wizards" | "No hidden charges" sits uneasily next to the waiver and surcharge, and "in Greenwood" is placed awkwardly. The title repeats the brand name and is too long. | Description: "What temporary fence rental costs in the Indianapolis area, what drives the price, and how Fence Wizards quotes one flat price with removal included." Title: "How Much Does Temporary Fence Rental Cost? Indianapolis Buyer's Guide \| Fence Wizards" |
| Med | :41–47 | five factors (no add-ons) | Leaves out cost items that are on the price sheet. | Add a bullet: "**Add-ons.** Windscreen is sold, not rented, so you keep it. Top rail, extra sandbags and gate hardware are priced per item. [NEED: confirm the damage waiver is offered as an optional add-on before mentioning it]" |
| Low | :60 vs :40 | "have these four things ready" | Lists four items right after the "five factors" (gates missing). | "…the site address, the fence type (or the problem you're solving), linear feet, how many gates, and how long you need it." |
| Low | :66 | "for the first 15 minutes" | Invented-sounding number. | "…having a site contact available at the start of the install saves everyone time." |

### how-a-temporary-fence-rental-works.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | :53 | "Eight-foot fencing is available as a special order… All of it can be added to a rental that's already standing." | An 8 ft special order can't simply be added to a fence that's already standing. | "Eight-foot fencing is available as a special order for sites that need more height. Windscreen can be added to a fence that's already standing." |
| Low | :40 | "24 to 48 hour turnaround" | Needs hyphens as a compound modifier. | "24- to 48-hour turnaround" (or "We usually install within 24 to 48 hours") |
| Low | :56 | "roughly eighty miles" | The style rule says numerals. | "roughly 80 miles around downtown" |

### emergency-fence-rental-…-break-ins.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | :39 | "doesn't promise a clock time on a website… usually a same-week job, and often faster" | Undersells the confirmed 24–48 hours (emergency faster) and contradicts post-driven:49 ("same-day or next-morning"). | "Our standard install is 24 to 48 hours, and emergency jobs go faster. How much faster depends on the day, the location and what's already on the trucks, so call and Richard will tell you when a crew can be there. Sites farther out are scheduled around the route." [NEED: what emergency speed to promise] |
| High | :5 / :14 | headline "same-week perimeter fencing" / title "Same Week" | Contradicts the 24–48 hour install. The title is missing a hyphen and runs about 115 characters. | Keep the URL. Headline: "Emergency fence rental in Indiana: fast perimeter fencing after storms, fires and break-ins". Title: "Emergency Fence Rental in Indiana After Storms, Fires and Break-Ins \| Fence Wizards" |
| Med | :45 | "a crew that has installed hundreds of perimeters" | Invented-sounding count. | [NEED: real figure] or "a crew that installs temporary fence every week". |
| Med | :33 | "Restoration contractors are regular Fence Wizards customers" | Unverified customer claim. | [NEED: confirm] Otherwise cut the sentence. |
| Med | :55 | "Fence Wizards installs across Indiana" | We cover an 80-mile radius, not the whole state. | "Yes, within about 80 miles of Indianapolis. We schedule by route, so call with the address." |
| Med | :42, :58 | "privacy screen or printed windscreen…" | Doesn't say windscreen is sold. | Add to :58: "It's sold rather than rented, so it's yours to keep." |
| Med | throughout | "Fence Wizards handles… the company does promise…" | Third person throughout. The site voice is "we" / "Richard". | Use "we" in the body, e.g. :39 "What we do promise is a straight answer when you call". |
| Low | :46, :49 | "the value of the site being secure tonight is the whole point." / "and an open site doesn't wait." | Fake-profound kickers. | End :46 at "…a guess at labor." End :49 at "…because the site is open." |
| Low | :61–62 | OSHA line comes after the CTA | The post should end on the next step. | Put the OSHA sentence first, then "Property open? Call Fence Wizards…". |

### event-fence-rental-indianapolis-….mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | :42 | "the printed version is sold rather than rented" | All windscreen is sold. This implies plain screen is rented. | "Windscreen is sold rather than rented, plain or printed, so the organizer keeps it for next year." |
| Med | :33 | "Fence Wizards has installed enough Indianapolis events to know which questions the permit office will ask" | Unverified claim. | [NEED: confirm event/permit experience] Or: "The fence plan is drawn to meet the permit's emergency access widths and closure hours." |
| Med | :45, :51 | "walks it with the organizer…", "Multi-day events get a check-in…", "the same plan is on file for next year" | Service promises that may be invented. | [NEED: confirm each] Cut any Richard doesn't confirm. |
| Med | :15 | description (about 200 characters) | Over the 160-character limit. | "Event fence rental in Indianapolis: panel fence on sandbag stands, steel barricades at gates and stages, and windscreen for sponsors, timed to your permit." |
| Low | :48 | "farmers markets, county fairs… breweries" | A customer list that may be invented. | [NEED: confirm the customer types] |
| Low | :57 | "installed in a matter of hours" | Could read as "booked within hours". | "…installed in a few hours on the day, once the site is available. Book ahead so we can schedule it." |
| Low | :62 | OSHA *construction* link on an events post | Irrelevant here. | Delete the line so the post ends on the CTA. |

### post-driven-chain-link-…-hamilton-marion-county.mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | :45 | "includes the driven posts, the chain link fabric, and the top rail" | Top rail is a priced add-on. | "…includes the driven posts and the chain link fabric. Top rail is available as an add-on." |
| High | :32 | "is not a routine construction project. It is a high-traffic…" / "Temporary fencing is not optional… It is the first line of defense" | Two contrast reveals, a dramatic invented scenario ("bridge deck collapses"), and the post doesn't answer "why post-driven" until section 2. | "Flood repair and public works sites put pedestrians, traffic and heavy equipment on the same tight footprint, often in a neighborhood still recovering from the flood. Post-driven chain link is driven into the ground, so it holds a line that panels on stands can't, and per foot it usually costs less." |
| Med | :39 | "vehicle drift… curious residents, trespassers, and stray equipment paths are a daily reality" | Implies chain link stops vehicles. Reflexive three plus puffery. | Cut "vehicle drift,". End the sentence at "…harder to lift, push, or walk through." |
| Med | :42 | "Inspectors, insurance carriers, and public agency project managers expect…most reliably does" | Weasel source. | "On longer publicly funded repairs such as bridge, creek channel and road base work, post-driven chain link is usually the right fit." |
| Med | :53 | heading "…printed panels" / "turning a security perimeter into a communication asset…" | It's printed windscreen, not printed panels. Trailing pile-on. It doesn't say windscreen is sold. | Heading "Windscreen and printed windscreen for public-facing sites". End: "…or public information messages. Windscreen is sold, not rented, so it stays with the contractor or agency." |
| Low | :50 | "before the preconstruction meeting, not after the first inspection flag" | Contrast tail. | "…the time to spec the fence is before the preconstruction meeting." |
| Low | :14 | title about 125 characters | Too long. | "Post-Driven Chain Link Fence Rental for Flood Repair and Public Works \| Fence Wizards" |

### printed-windscreen-for-construction-fence-….mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | :55 | "Fence Wizards rents temporary fence only. We don't install permanent fence or sell fence material" | Contradicts this same post: we sell windscreen. | "Fence Wizards rents temporary fence. We don't install permanent fence or sell panels and posts, and we'll say so if that's what a project actually needs." |
| Med | :45 | "produces the screen to the length of the fence run… UV-resistant ties at close spacing… Gates get their own panels" | The price sheet lists branded screens at $800 each with a minimum of 6, which suggests fixed sizes, not printed to length. The detail may be invented. | [NEED: how printed screen is sized, attached and ordered] |
| Med | :48, :51 | "on exposed sites, bracing" / "a couple of weeks is comfortable" | Unconfirmed details. | [NEED: bracing? print lead time?] Ballast is confirmed: "screened runs get extra sandbags on each stand". |
| Med | :42, :54 | "seen by more people in a week than most billboards" / "screen is the cheapest improvement the rental can carry" | Unsupported claims. | Cut both, or "A fence on a busy downtown sidewalk is seen by everyone who walks past." |
| Med | :54 | "Downtown Indianapolis and Carmel projects on a sidewalk. Retail and restaurant build-outs… Hospital… Demolition… And any project…" | Fragment drumbeat. | Merge into one sentence: "The sites that get the most from screen have a public face: sidewalk projects downtown or in Carmel, build-outs next to open stores, hospital and school work, dusty demolition phases, and any job where the GC or developer wants their name on the fence." |
| Low | :31 | "Here is what it does and what to think through before you order it." | Announcing line. | Delete it. |
| Low | :14 | title about 120 characters | Too long. | "Printed Windscreen for Construction Fence in Indianapolis \| Fence Wizards" |

### temporary-fence-panels-for-rent-in-indianapolis-….mjs
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | :32 | "no digging, no concrete, and no specialized equipment… one of the most practical fencing options available" | Negation list plus puffery. | "They need no holes in the ground, so a crew can set a run in hours on pavement, grass or a parking lot." |
| Med | :33 | "This guide covers how panel-and-stand systems work…" | Announcing opener. | Delete the second sentence. |
| Med | :36 | "a pair of rubber or plastic feet" / "doesn't require tools in most configurations" | Cost guide :36 says "plastic or steel stands". The no-tools claim is unverified. | [NEED: stand material; are panels clamped with tools?] |
| Med | :47 | "It is not a placeholder: its weight determines…" | Contrast plus colon reveal. | "The sandbags do real structural work. Their weight keeps the fence upright in wind and when people lean on it." |
| Med | :48 | "worth discussing with your rental provider… a rooftop" | Generic third-party wording (that's us). Rooftop work is unconfirmed. | "If the site is unusually exposed, such as an open field or a lot beside a highway, tell us before delivery and we'll add sandbags." |
| Low | :37 | "they simply uncouple… simply not possible" | "Simply" twice. | "…they uncouple a section. Post-driven fence can't do that: it's set once and stays put." |
| Low | :62 | "Rentals are available for short-term and extended durations." | Filler. | Delete it. |
| Low | :65 | "keep your project safe and on track" | Generic close. Install time is missing from the whole post. | "…and we'll work out the panel count, sandbags and an install date, usually within 24 to 48 hours." |

### index.mjs (blog index)
| Sev | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | :36 | "every one comes from a real job, a real call, or a real mistake somebody almost made" | Not true of the generic guides. "Real… real… real" is a drumbeat. | "New notes land here as we write them, along with job stories from sites we've fenced." |

field-notes.mjs and _TEMPLATE.md: no problems.

## [NEED] questions for Richard
1. Can we publish starting per-foot rates in the cost guide ($4.20 post-driven, $5.65 panels, install/rent/removal included)?
2. Where is the yard: Greenwood or downtown? Several posts say "our yard in Greenwood".
3. Minimum charge / shortest rental?
4. Is the damage waiver offered (optional), and can we say so?
5. Are gate moves and minor relocations included for every customer, or only ongoing clients?
6. What emergency install speed can we promise (same-day / next-morning)?
7. Printed windscreen: is it fixed-size banners ($800 each, minimum 6) or printed to the run length? How is it attached? Print lead time? Bracing on panel fence?
8. Stand material (plastic, rubber, steel)? Do panels clamp together without tools?
9. Confirm or drop: "installed hundreds of perimeters", restoration contractors as regular customers, event permit-office experience, mid-event check-ins, "plan on file for next year", the event customer list, insurance-readable invoices.

## Applied 2026-10-10
Only `site/build/pages/blog/*.mjs` edited. URLs/slugs unchanged. All files pass `node --check`; no tests reference blog copy. Not built (other edits running in parallel).

**Cost guide (how-much-does-temporary-fence-rental-cost)**
- Title → "How Much Does Temporary Fence Rental Cost? | Fence Wizards" (58). Summary/description → the suggested wording (149), "no hidden charges in Greenwood" gone.
- Heading "The direct answer…" → "Temporary fence rental is priced by the linear foot". Cut the "Here is what actually drives…" announcing line.
- Post-driven paragraph: "added installation labor" removed; now says it's more rigid and "per foot it usually costs less than panels". Contrast tail ("genuine priority rather than a formality") and "is the answer" removed.
- Factors: heading → "What determines your final price"; location bullet → the 50-driving-mile rule (replaces "our yard in Greenwood… realistic travel component"); duration bullet → "The per-foot rate depends on how long the fence will be up, so give us your best estimate. The price is agreed once, up front." (no "price holds" / rent-clock claim); new Add-ons bullet (top rail priced add-on; windscreen sold, plain or printed).
- National companies paragraph: removed "fuel surcharges, damage waiver fees… escalating rent"; now "a charge to come collect the fence, and fees added to the invoice". Dropped "We don't operate that way."
- Duration section: "equipment rental… driven mostly by how long" and its rent-clock line replaced with the approved duration wording + removal included. Panels reasoning → "need no holes and come out fast"; post-driven "more secure and usually costs less per foot".
- Payment terms: cut the "standard in the industry" claim and "five minutes"; voice → "we".
- Quote section: reply within 24 hours (usually same day), install 24 to 48 hours, emergency faster; checklist now five items incl. gates.
- FAQ: minimum-period answer cut to "Ask us about short rentals…" (no claim about minimums); cost FAQ now states post-driven usually costs less per foot; ", not a hidden revenue line" cut; "first 15 minutes" → "at the start of the install"; "Fence Wizards builds" → "We build".

**Emergency post**: headline "same-week" → "fast perimeter fencing…" (URL unchanged); title → "Emergency Fence Rental in Indiana After Storms & Fires | Fence Wizards" (70); description → "we… across central Indiana" (158). "How fast" section → standard 24 to 48 hours, emergency faster, no clock promise beyond that. Opening "same week" → "fast". Cut: restoration contractors "regular customers" sentence, "hundreds of perimeters" count, "not next month", both fake-profound kickers. FAQ "across Indiana" → "within about 80 miles of Indianapolis"; windscreen FAQ adds "sold rather than rented, yours to keep". OSHA line moved before the CTA. Third person → "we" throughout; "simply continues" → "continues".

**Event post**: windscreen → "sold rather than rented, plain or printed". Title (69) and description (155) shortened. Cut the permit-office experience sentence, the irrelevant OSHA line, "not days". FAQ install time → "a few hours on the day… Book ahead". Third person → "we" ("Who rents event fence from us").

**Post-driven post**: top rail → add-on (body + "fabric (and top rail, if ordered)"). Emergency "same-day or next-morning" → "we move faster than that". Opening contrast reveals + "bridge deck collapses" scenario replaced with the suggested plain paragraph (incl. "usually costs less" per foot). Cut "vehicle drift" and the trailing pile-on; weasel "inspectors… expect" sentence → plain "usually the right fit". Heading → "Windscreen and printed windscreen…", ends with windscreen sold. Contrast tails cut. Title → 68 chars; description trimmed to ~146. "threat environment" → "how much security the site needs". Voice → "we".

**Windscreen post**: "don't… sell fence material" → "don't install permanent fence or sell panels and posts". Title → 73 chars. Cut the announcing line, the billboard comparison (→ "seen by everyone who walks past"), the "cheapest improvement" claim and the "instead of on top of it" kicker; fragment drumbeat merged into one sentence; colon reveal fixed. Voice → "we".

**Panels post**: title → 63 chars. Negation list + puffery → "They need no holes in the ground, so a crew can set a run in hours…"; "This guide covers…" cut; "simply" ×2 cut; sandbag contrast reveal fixed; "your rental provider" → "tell us"; "rooftop" cut; filler "short-term and extended durations" cut; close now gives the 24 to 48 hour install.

**How a rental works**: title → 66 chars; "24- to 48-hour"; "80 miles"; "All of it can be added…" → "Windscreen can be added to a fence that's already standing."

**Blog index**: line → "New notes land here as we write them, along with job stories from sites we've fenced."

**Skipped (blocked on Richard / unverified, left untouched):**
- Starting per-foot rates not published (Q1, 10.8).
- "At Fence Wizards in Greenwood" (cost guide intro), "We work out of Greenwood" (emergency), "across Greenwood" (panels): left, since no 50-mile replacement applies there (Q2).
- "that number doesn't change unless the scope changes" (cost guide intro) and the existing rent-clock lines in how-a-rental-works left as is (R1).
- Gate moves "built into the price" vs "for ongoing clients" inconsistency left (Q5); only the contrast tail was cut.
- Insurance-readable invoices (emergency), event "walks it with the organizer", mid-event check-in, "plan on file", event customer list: left untouched (Q9).
- Printed windscreen sizing/attachment, bracing, print lead time (Q7); stand material and no-tools claim (Q8): left untouched.
- Damage waiver: not mentioned anywhere (Q4).
- Windscreen title is 73 chars (kept the full search phrase); emergency title 70.
