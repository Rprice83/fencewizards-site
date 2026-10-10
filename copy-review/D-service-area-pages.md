# D. Service-area (town) pages

## Overall
- **The biggest problem is a fact conflict, not wording.** Every town page, the index page and the place card say the yard is in **Greenwood**. Examples: "from the Greenwood yard", "the trucks are here", the place-card label "From our Greenwood yard" (components.mjs:177), and drive times measured from Greenwood. CLAUDE.md and TODO.md:44 say **"his yard is downtown"**. One of the two is wrong, and the answer changes about 25 sentences. See [NEED 1].
- **The install-speed promise is inconsistent.** Franklin and Greenwood still promise a same-day install on a straightforward run. That contradicts the confirmed 24 to 48 hours, and on the Franklin page it contradicts its own FAQ.
- **The pages read as one template.** On all 19 pages these are identical apart from the town name: the meta description, the FAQ intro and the second sentence of the "Other towns" intro. About 10 stock phrases also recur across 4 to 10 pages each. This is thin and duplicate content for SEO.
- **The local detail is mostly real and specific.** I spot-checked the US-36 corridor, Green Street, Range Line Road, the Arts and Design District, the Ronald Reagan Parkway, the Nickel Plate Trail, Grand Park, Ruoff, the Mile Square, Monroe County limestone and Columbus architecture. It all comes from the original live-site copy, which itself has heavy AI tells: "rather than" contrasts, "genuinely" and "honest" on almost every page, and contrast reveals.
- **Voice drifts between pages.** Anderson to Indianapolis were polished with contractions ("it's", "we'll"). Lafayette to Zionsville keep the stiff originals ("it is", "we will", "cannot", "would rather").

## Cross-page patterns
| Pattern (quoted) | Pages | Fix |
|---|---|---|
| Meta description "Temporary fence rental in X, Indiana. Panels, chain link, windscreen and barricades on a flat fee. On site in 24 to 48 hours." | All 19 | Write a unique one per town (drafts at the end of this report). |
| FAQ intro "Three that come up on nearly every call from this part of the radius." | All 19 (it is also odd on Greenwood and Indianapolis, which aren't "a part of the radius") | Write one per town, or drop it. For example, Plainfield: "What distribution contractors ask before the truck loads." Bloomington: "What we get asked about campus sites and rocky ground." |
| "Other towns" intro, 2nd sentence "If your project sits between two of them, or past the edge of the radius, call and ask rather than assuming the answer is no." | All 19 | Keep it on the index FAQ only. On town pages, end after the first sentence, or vary it per town. |
| Yard named in the "Other towns" intro ("from the Greenwood yard", "out of a Greenwood yard", "run from the same Greenwood yard", "from a yard on the south side", "same yard south of the city") | Avon, Brownsburg, Fishers, Franklin, Greenwood, Indianapolis, Noblesville, Plainfield, Speedway, Westfield, Zionsville | Depends on [NEED 1]. Either way, it shouldn't be the variable part of 11 intros. |
| "…and he'll/he will price it on the call." CTA | Avon, Brownsburg, Columbus, Fishers, Indianapolis, Noblesville, Plainfield, Speedway, Westfield, Zionsville | Keep it on 2 or 3 pages. Elsewhere tie the CTA to that page's local ask, as Richmond, Lafayette and Bloomington already do. |
| The "X is a ___ town, and ___ is the reason." opener ("Speedway is a crowd-control town, and May is the reason." / "Westfield is a crowd-management town before it is a construction town, and Grand Park is the reason.") | Speedway:19, Westfield:19 | Rewrite one. Westfield: "Grand Park runs tournament weekends most of the year, and that puts crowd management ahead of construction in Westfield." |
| Contrast reveal "is not just X, it's Y" | Fishers:21, Indianapolis:21 (near verbatim), Carmel:19, Avon:21 | Per-page fixes below. |
| "plan the crew and the truck around the schedule … rather than around office hours / a standard working day" | Indianapolis:58, Westfield:30, Speedway:48, Bloomington:49, Brownsburg:57, Noblesville:49 | Say it fully on Indianapolis and Speedway. Elsewhere use one short line with the local detail ("We set to Grand Park's tournament times, early mornings included"). |
| "when the event is over rather than the following week" | Indianapolis:30, Noblesville:30 (verbatim), Westfield:49 (variant) | Keep it on one page only. |
| "rather than … where the panels ran out" / "where the panel count happened to run out" | Franklin:30, Indianapolis:57, Plainfield:30 | Keep Plainfield's version (the truck gate). Cut the other two. |
| "…is the difference between a [fence] that … and one …" | Bloomington:48, Plainfield:30 | Cut the Bloomington one. |
| "hold rather than mark" / "genuinely hold" / "genuinely apart" | Avon:31,59, Columbus:59, Franklin:30,49, Muncie:30,50 | Say once on the Products page why a driven line holds. On town pages write "has to hold". |
| "genuinely" (capped intensifier) | Anderson:30, Avon:31,59, Columbus:59, Franklin:30, Muncie:30 | Delete it every time. |
| "honest answer" / "honest trade" / "priced honestly" | Avon:59, Bloomington:30, Brownsburg:58, Columbus:57, Terre Haute:13,30 | Keep at most one on the site. Elsewhere "the answer". |
| "…before install day rather than after the truck arrives / discover it on install day" | Bloomington:31, Fishers:30, Terre Haute:31,50, Zionsville:30,50 | Keep Zionsville FAQ:50 (the loaded trailer on a brick street). Trim the others. |
| "one well-organized install beats three trips" | Lafayette:31,65 (CTA), Terre Haute:30,49 | Keep it on Terre Haute only. On Lafayette use: "Send the site plan if you have one, and the truck leaves loaded for the whole job." |
| "… territory" ("post-driven chain link territory", "panel and stand territory", "panel-and-stand territory") | Anderson:31, Avon:30, Greenwood:30, Westfield:31 (hyphenation inconsistent) | Use it once at most. |
| Superintendent opens an access point in the morning and closes it in the afternoon | Greenwood:30, Westfield:31 (near verbatim) | Keep Greenwood. Westfield: "…sites that change week to week, so panels and stands rather than driven fence." |
| "Two people can shift a section by hand" | Avon:30 and 57 (twice on one page), Greenwood:60 | Cut it from Avon's FAQ: "Yes. Panels and stands move by hand as the work walks forward. If a whole run has to relocate, call and we'll come out." |
| "inventoried from the road" | Columbus:21, Plainfield:50 | Keep one. |
| "for the length of the job" | Brownsburg:31, Carmel:58, Columbus:30, Fishers:21, Indianapolis:21, Noblesville:50 | Vary it or cut it. |
| typeCards intro "Four options, and…" / "…up here usually want(s) the driven one" | Anderson, Bloomington, Carmel, Lafayette:41, Muncie, Richmond:41, Terre Haute | Lafayette and Richmond are near verbatim. Rewrite Richmond: "Plant expansions measured in months, and a delivery side that keeps changing." |
| Same claim of being the most appearance-sensitive town | Carmel ("higher than average", "a leaning run in Carmel gets a phone call…") vs Zionsville:19 ("the town in this radius where appearance does the most work") | Drop the superlative on Zionsville: "In Zionsville, how the site looks matters as much as how it holds." |
| Same claim of being the closest town | Indianapolis:59 "the shortest run we make" vs Franklin (15 min) and Greenwood | Fix Indianapolis (below). |
| Road-name style ("US-31" / "US 31", "SR 32" / "State Road 32", "SR 37") | Carmel, Greenwood, Indianapolis vs Westfield, Noblesville, Muncie, Bloomington | Pick one style. AUTHORING already uses "US-36", so use US-31, SR 32, SR 37 consistently. |
| Contractions | Lafayette, Muncie, Noblesville, Plainfield, Richmond, Speedway, Terre Haute, Westfield, Zionsville have none | Apply the same polish pass the first batch got. |
| Same hero image | Bloomington and Lafayette both use `field-run-two` as hero and og image | Lafayette: `yard-tractor-panels` or `open-field-run` (check it isn't used elsewhere on that page). |

## Findings per page

**anderson.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :19 | "a straightforward run from Greenwood" | Depends on where the yard is [NEED 1]. | "Anderson is about fifty minutes northeast on I-69." |
| Low | :30 | "a site that is genuinely dangerous" | Capped intensifier. | "a site that is dangerous" |
| Low | :48 | "it's a regular part of what we do in Madison County" | Unverified volume claim. | [NEED 4] or "Yes. A demolition perimeter needs…" |

**avon.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :21 | "the fence is not closing a site so much as carving a working area out of a place the public is still using" | Contrast reveal. | "…which means the fence carves a working area out of a place the public is still using." |
| Med | :30 | "A driven fence in that situation is the wrong tool, and we'll say so rather than sell you the more expensive one." | It assumes driven always costs more [VERIFY 7]. "rather than" adds a pile-on. | "A driven fence is the wrong tool there, and we'll tell you so." |
| Low | :31 / :59 | "genuinely apart rather than just mark a line" / "genuinely hold rather than mark… the honest answer" | Stacked tells. | :31 "keep the public and the work apart." :59 "…because it doesn't lift or slide. Where the ground won't take a post or the site changes weekly, panels are the better fit…" |
| Low | :57 | "Two people can shift a section by hand" | Repeats :30. | See the cross-page fix. |

**bloomington.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Low | :19, :23 | "on State Road 37 and I-69" | SR 37 between Martinsville and Indianapolis has been rebuilt as I-69 [VERIFY 8]. | "About an hour south on I-69" |
| Med | :31 | "The ground is the thing that actually catches people out here." | "catches people out" is British. "actually" is filler. | "The ground is what surprises people here." |
| Low | :31 | "can hit rock a foot down south of town" | Reads as "a foot down south" (ambiguous). | "can hit rock a foot down once you're south of town." |
| Med | :48 | "it's most of what we do there… Getting that split right is the difference between a fence that holds and one you keep calling about." | Unverified "most" claim [NEED 4] plus a template line. | "Yes. Plan for the pedestrian traffic: a driven line where people pass, panels everywhere else." |
| Med | (missing) | — | Bloomington is about 50 driving miles from downtown, so the 50+ mile surcharge may apply. The page doesn't say so; Lafayette and Terre Haute do. | [NEED 3] Add one line if it applies. |

**brownsburg.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :59 | "We don't do residential fencing, and we don't install permanent fence, do fence repairs or do gate automation anywhere." | Negation list. It also never answers the question asked. | "Yes, on the construction side. We fence the site while the houses go up. We don't fence finished yards, and we don't install permanent fence, repair fences or automate gates." |
| Low | :31 | "Screened panel runs handle both without anybody having to think about it again." | Filler kicker. | "Screened panel runs handle both." |
| Low | :21 | "the raceway park" | Vague. The venue is Lucas Oil Indianapolis Raceway Park [VERIFY 9]. | "Event weekends at Lucas Oil Indianapolis Raceway Park bring…" |

**carmel.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :19 | "the thing that makes it different from the rest of the metro is not the fence, it's the expectation." | Contrast reveal (banned). | "Carmel is mostly commercial and multi-family construction, and people here expect a job site to look tidy from the street." |
| Low | :30 | "reads as a project in progress rather than a mess behind a fence" | Another "rather than" contrast. | "so the site reads as a project in progress." |
| Low | :31 | "Driven line for what stays shut, panels for what keeps moving." | Fragment that repeats the sentence before it. | Delete it. |
| Low | :58 | "controls dust, keeps the site private, and turns an open perimeter into…" | Reflexive three. | "A screened run controls dust and gives the site a finished-looking edge." |
| Med | :60 | "Roughly thirty-five minutes from the yard in Greenwood" | [NEED 1] | Depends on the answer. |

**columbus.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :49 | "and a river that has form." | British idiom that US readers won't parse. | "Industrial plants, a designed downtown, and a river that floods." |
| Low | :13 | "an architecturally serious downtown" | Odd phrase. | "a downtown known for its architecture" |
| Med | :30 | "are worth the small difference in cost" | Pricing claim. Windscreen is sold, so the cost difference isn't confirmed [NEED 2]. | "…screened runs rather than bare chain link are worth it for the length of the job." |
| Med | :58 | "it's a real part of this business rather than something bolted on" | Contrast reveal. | "Yes, and restoration companies call us for it regularly." (the index says restoration is "a large share") |
| Low | :59 | "a plant perimeter has to genuinely hold" | Intensifier. | "has to hold" |

**fishers.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :21 | "a site perimeter here is not just a security line, it's the thing residents walk past every day" | Contrast reveal, same as Indianapolis:21. | "…which means residents walk past a site perimeter here every day for the length of the job." |
| Low | :13 | "in the same square mile" | The Nickel Plate District and the Fishers Event Center are about 1 to 2 miles apart [VERIFY 10]. | "…a real event calendar, all within a few minutes of each other." |
| Low | :60 | "How long does it take you to reach Fishers from Greenwood? We're based in Greenwood…" | Says Greenwood twice; depends on [NEED 1]. | "How quickly can you reach Fishers?" |

**franklin.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :21 | "Same-day response on a straightforward run is realistic here" | Contradicts the 24 to 48 hours and its own FAQ (:48). | "A service call to move a gate or extend a run doesn't need to become a scheduling conversation." |
| Med | :19 | "which changes what we can actually promise rather than just what we can quote" | Contrast and filler. The yard claim is [NEED 1]. | "Franklin is in the same county as our yard and about fifteen minutes down I-65." (only if the yard is in Greenwood) |
| Med | :41 | "Fifteen minutes from the yard, which changes what we can promise." | Same issue. | "Fifteen minutes from the yard, so service calls are quick." |
| Med | :48 | "Faster than almost anywhere else we work… goes in within the usual 24 to 48 hours" | Says "faster", then gives the standard window. | "A straightforward run goes in within the usual 24 to 48 hours, and because we're fifteen minutes away, service calls to move a gate are easy for us to take." |
| Low | :30 | "genuinely separate… rather than a line dropped where the panels ran out" | Template tells. | "…has to separate the public from the work… and gates planned around how people move." |

**greenwood.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :21, :50, :60 | "the trucks are here" / "leaves from a yard a few minutes from your site" / "most of what goes out of this yard" | False if the yard is downtown [NEED 1]. | Rewrite after the answer. |
| High | :58 | "Same day is realistic here for a straightforward run" | Contradicts the 24 to 48 hours. | "Faster than anywhere else we work. A straightforward run goes in within 24 to 48 hours, and emergency calls in Johnson County are the easiest ones for us to take on short notice." |
| Med | :31 | "we can usually be back out the same morning you call" | A stronger service promise than the site-wide "same day for general contractors". | [NEED 5] or "…we can usually be back out the same day." |
| Med | :21 | "Richard grew up in this town, which is a different thing from serving it." | Fake-profound kicker. The fact comes from the original copy. | [VERIFY 6] "Richard lives here and grew up here." Move it up and delete the kicker. |

**indianapolis.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| High | :21 | "the perimeter is not just security, it's what the public looks at" | Contrast reveal (same template as Fishers). | "…so the public looks at the perimeter for the length of the job." |
| High | :59 | "Indianapolis is the shortest run we make" | Contradicts Franklin (15 min) and Greenwood. If the yard is downtown, all of :23, :59 and :68 change. | [NEED 1] If the yard is in Greenwood: "We're about twenty minutes from downtown up US-31 or I-65, and emergency work here moves faster than the usual 24 to 48 hours." |
| Low | :57 | "it's a large share of what we do" | Unverified [NEED 4]. | Keep only if Richard confirms. |
| Low | :57 | "rather than dropped wherever the panels ran out" | Template. | Cut after "fire lane". |

**lafayette.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Low | :31 | "Distance is real, and we price it openly rather than folding it into a vague number." | Near verbatim with the index "vague figure". | "Jobs this far out carry a distance charge, and we tell you on the call." |
| Low | :49 | "the extra install time buys a perimeter that actually holds." | Filler word. | "…buys a perimeter that holds." |
| Low | :50 | "It is part of the number" | Vague. Lafayette is over 50 driving miles, so the surcharge applies. | "Yes. Jobs more than 50 driving miles from downtown Indianapolis carry a distance charge, and we say so on the call. Everything else is the same as in the metro: one flat fee, removal included." (check against the pricing wording, [NEED 3]) |

**muncie.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :21 | "Our temporary fencing has been on sites at Ball State University, where the venue was the end user rather than our direct client, and we would rather say that plainly than leave you to assume otherwise." | Awkward ("venue" for a university), self-congratulatory, and repeated in FAQ :48. | "Our fence has been on Ball State University sites, though the university wasn't our direct client." [VERIFY 6] |
| Med | :48 | "which is a distinction plenty of companies in this trade blur and we would rather not." | Dig at competitors plus a pile-on. | "Our fence has been on sites there, though Ball State wasn't our direct client." |
| Med | :31 | "the same grounds that host a build in July host something with a crowd in September" | Reads as an invented specific. | [VERIFY 11] or "…the two overlap more than people expect, and panel runs, windscreen and crowd-control barricades all come off the same truck." |
| Low | :19, :23 | "out I-69 and across on State Road 32" | Plausible (SR 32 from I-69 exit 234) [VERIFY 12]. Muncie is over 50 driving miles, so the surcharge applies but isn't mentioned. | [NEED 3] |
| Low | :30 | "genuinely has to hold rather than mark" | Template. | "has to hold" |

**noblesville.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :21 | "the Pleasant Street work" | Date-sensitive. The Pleasant Street corridor project may be finished [VERIFY 13]. | If finished: "the SR 32 corridor and the development pushing out around the Innovation Mile." |
| Low | :13 | "the biggest outdoor concert season in the county" | Unverifiable superlative. I checked that the "Ruoff Music Center" name is still in use on 2026 listings. | "Corridor construction, a historic courthouse square, and Ruoff's summer concert season." |
| Low | :30 | "when the event is over rather than the following week" | Verbatim with Indianapolis. | "…and they come out when the event ends." |

**plainfield.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Low | :21 | "around buildings with a footprint you can see from the air. Long straight runs are the easy part of that." | Filler, plus a setup for a reveal at :30. | "…perimeters measured in thousands of feet rather than hundreds." Then start :30 with "The gates are the hard part." |
| Low | :30 | "not where the panel count happened to run out" | Template contrast. | Keep, but cut the twins on Franklin and Indianapolis. |
| Low | :31 | "Material storage is the third case here" | There is no visible "second case" (the gates aren't a case). | "Material storage is the other common call, and people make it late." |

**richmond.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :21 | "which is the same reason it suits us: this is a business-to-business company." | Colon reveal. | "The work we see there is industrial and commercial, which suits a business-to-business company." |
| Low | :19 | "the state border is part of the local economy" | Vague. | Cut after "Ohio line". |
| Med | :31 | "Contractors working Richmond frequently have crews and material moving in from Ohio" | Unverified generalization [VERIFY 11]. | "Contractors working Richmond often bring crews and material from Ohio…" only if Richard confirms. |
| Med | :49 | "The answer is sometimes yes" | The index says "usually yes" for sites just outside 80 miles. | Align both to whichever Richard confirms. |
| Low | :65 | "Tell us which side the trucks arrive from and we will put the gate there." | The CTA repeats prose :31 word for word. | "Tell Richard the site, the run and which side the trucks come in from." |

**speedway.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :31 | "costs a fraction of what the same square footage of signage would cost any other way" | Unsupported price claim [NEED 2]. | "…and printing it with a sponsor or a brand turns the perimeter into signage." |
| Low | :21 | "queue lines, vendor rows, hospitality footprints, parking separation and keeping vehicles away from people on foot" | The list trails off into a pile-on. | End at "parking separation". |
| Low | :48 | "This is exactly the kind of work barricades and panel runs exist for." | Doesn't start with "Yes". | "Yes. Give us the footprint…" |

**terre-haute.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Low | :30 | "and that is the honest trade" | Tell. | "Work this far out is planned rather than improvised." |
| Low | :31 / :50 | "River-bottom soil, old fill and hard slab…" | Repeated verbatim in prose and FAQ. | FAQ: "Yes. Around the Wabash Valley the soil varies a lot, so we'd rather check it when we quote than on install day." |
| Low | :21 | "Saying that on the call is better than burying it in a quote you find out about later." | The idea repeats :13, :48 and the CTA four times. | Delete it. |

**westfield.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :19 | "Westfield is a crowd-management town before it is a construction town, and Grand Park is the reason." | Template twin of Speedway. | See the cross-page fix. |
| Low | :31 | "because a superintendent can open an access point…" | Near verbatim with Greenwood. | See the cross-page fix. |

**zionsville.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Low | :19 | "the town in this radius where appearance does the most work" | Superlative clash with Carmel. | See the cross-page fix. |
| Low | :21 | "is the whole identity of the place… for that reason alone" | Puffery. | "The brick Main Street village is what people come to Zionsville for, and a perimeter dropped across it without thought gets noticed by the merchants, the town and everyone walking through." |
| Low | :30 | "That changes the install rather than the price" | A pricing claim about carry-in [NEED 2]. | Keep only if Richard confirms. |

**index.mjs**
| Sev | Where | Current | Problem | Fix |
|---|---|---|---|---|
| Med | :68 | "What changes across the radius is the drive. Not the fence, and not the way it's priced." | Negation fragments. | "Across the radius, only the drive changes. The fence and the flat fee are the same everywhere." |
| Med | :44 / :51 / :58 / :85 / :89 | "from a yard in Greenwood" / "One operation, based in Greenwood" | [NEED 1] | — |
| Low | :43 | Title "Temporary Fence Rental Service Area \| Indianapolis and Central Indiana" | About 70 characters, so it will be cut off, and it has no brand. | "Service Area: Indianapolis + 80 Miles \| Fence Wizards" |
| Low | :74 | "that shows up in the number" | Doesn't name the real 50+ driving-mile rule. | "Jobs more than 50 driving miles from downtown Indianapolis carry a distance charge, and we say so on the call." |

**Suggested unique meta descriptions** (only facts from each page; count characters before use, keep each at 155 or under):
- Anderson: "Temporary fence for Anderson demolition and redevelopment: windscreen for dust, driven chain link for lots that sit for months. Flat fee, removal included."
- Avon: "Temporary fence for US-36 commercial work in Avon, IN. Panels that move with each phase while stores stay open. Flat fee, removal included."
- Bloomington: "Temporary fence near IU in Bloomington, IN. Driven chain link where students walk, panels where limestone stops a post. Flat fee, removal included."
- Brownsburg: "Barricades and panels for Brownsburg race weekends, plus construction fence along I-74. Flat fee, removal included, on site in 24 to 48 hours."
- Carmel: "Screened temporary fence for Carmel job sites on Range Line Road and in the Arts and Design District. Panels, driven chain link, windscreen. Flat fee."
- Columbus: "Temporary fence in Columbus, IN for plant work, downtown sites and flood or fire damage. Driven chain link, panels and windscreen on one flat fee."
- Fishers: "Temporary fence and event barricades in Fishers, IN, for Nickel Plate Trail sites and Fishers Event Center load-ins. Flat fee, removal included."
- Franklin: "Temporary fence for campus and Main Street sites in Franklin, IN. Driven chain link and screened panels on a flat fee, removal included."
- Greenwood: "Temporary fence for US-31 and SR 135 build-outs in Greenwood, IN. Panels that move with the site, flat fee, removal included."
- Indianapolis: "Temporary fence for downtown Indianapolis: screened runs on Mile Square sidewalks and overnight event set and strike. Flat fee, removal included."
- Lafayette: "Temporary fence in Lafayette and West Lafayette for long industrial and Purdue-area runs. Post-driven chain link, one flat fee, removal included."
- Muncie: "Temporary fence in Muncie for demolition, derelict buildings and events. Driven chain link, windscreen and barricades on one quote. Flat fee."
- Noblesville: "Temporary fence in Noblesville for corridor construction, the courthouse square and Ruoff concerts. Panels, barricades, windscreen. Flat fee."
- Plainfield: "Temporary fence for Plainfield warehouse sites: runs in the thousands of feet and drive gates placed for tractor-trailers. Flat fee, removal included."
- Richmond: "Temporary fence in Richmond, IN for long industrial perimeters at the east edge of our radius. Post-driven chain link, one flat fee, removal included."
- Speedway: "Barricades, panels and printed windscreen for Speedway race month and Main Street events, set and struck to your schedule. Flat fee."
- Terre Haute: "Temporary fence in Terre Haute, the western edge of our radius. Planned installs, the drive priced up front, flat fee with removal included."
- Westfield: "Panels and barricades for Grand Park tournament weekends, plus construction fence on Westfield's US-31 and SR 32 corridors. Flat fee."
- Zionsville: "Screened temporary fence for Zionsville's brick Main Street village. Panels in weighted stands, nothing driven into brick. Flat fee, removal included."

## [VERIFY]/[NEED] list
1. **[NEED] Where is the yard: Greenwood (1176 Newark Ct) or downtown Indianapolis?** CLAUDE.md and TODO.md:44 say downtown. Every town page, index.mjs and the placeCard label (components.mjs:177) say Greenwood, and all drive times are measured from Greenwood. This blocks the Greenwood page (:21, :50, :60), the Indianapolis "shortest run" line, the Franklin "same county as our yard" line, and 11 "Other towns" intros.
2. **[NEED] Pricing claims to confirm with Richard:**
   - Columbus:30, "small difference in cost" for screened runs.
   - Speedway:31, printed windscreen "costs a fraction of" signage.
   - Zionsville:30, carry-in access "changes the install rather than the price".
   - Avon:30 and Bloomington:50, driven fence is "the more expensive one".
3. **[NEED] Distance surcharge wording:**
   - Lafayette, Terre Haute and Richmond say only "part of the number".
   - Muncie (about 57 driving miles) and Bloomington (about 50) are likely over 50 driving miles but say nothing.
   - Confirm the wording, and whether a site just outside 80 miles is "usually" (index:88) or "sometimes" (Richmond:49) a yes.
4. **[NEED] Volume claims:** Anderson:48 "regular part of what we do", Bloomington:48 "most of what we do there", Indianapolis:57 "a large share".
5. **[NEED]** Greenwood:31, "back out the same morning you call". This is stronger than the site-wide "same day for general contractors".
6. **[VERIFY]** "Richard grew up in this town" (Greenwood:21) and the Ball State end-user claim (Muncie:21, :48). Both come from the original copy; confirm they're accurate.
7. **[VERIFY]** Whether driven chain link always costs more than panels (Avon, Bloomington).
8. **[VERIFY]** Bloomington route "State Road 37 and I-69" (:19, :23). The Martinsville-to-Indianapolis stretch was upgraded to I-69 (INDOT Section 6, targeted to finish end of 2024). Web search didn't confirm the opening date.
9. **[VERIFY]** Brownsburg "raceway park" is Lucas Oil Indianapolis Raceway Park. Name it if you agree.
10. **[VERIFY]** Fishers "in the same square mile". The Nickel Plate District and the Fishers Event Center look to be about 1 to 2 miles apart.
11. **[VERIFY]** Generalizations that read invented: Muncie:31 (the same grounds host a build in July and a crowd in September) and Richmond:31 (Ohio crews and material).
12. **[VERIFY]** Muncie route via State Road 32 (probably I-69 exit 234). SR 332 is the other common route.
13. **[VERIFY]** Noblesville "Pleasant Street work" may be finished, which would make it out of date. "Ruoff Music Center" is still the venue name on 2026 concert listings; I found no rename. Source: [Songkick, Ruoff Music Center 2026 listing](https://songkick.com/concerts/43044251-hilary-duff-at-ruoff-music-center).

**What I checked:**
- Every named landmark against the original scrape (`fencewizards-content-inventory/fencewizards-page-content.md`): all of them came from the live site, none were added in this build.
- Ruoff's name and I-69 Section 6 with web searches: [Ruoff Music Center (Wikipedia)](https://en.wikipedia.org/wiki/Ruoff_Music_Center), [INDOT I-69 Section 6](https://www.in.gov/indot/projects/i69/section-6-martinsville-to-indianapolis), [WTHR on the final I-69 leg](https://wthr.com/article/news/local/first-overpass-opens-in-the-final-leg-of-i-69-project-interstate-construction/531-ee2a7379-9368-4300-a5c4-a4df8e1d48d2).
- Drive times look plausible measured from Greenwood.
- No pricing-policy violations: no "up to 12 months", no discounts, no 8 ft. Windscreen is "sold" everywhere.

**Files reviewed:**
- `C:\Users\gsvpr\OneDrive\Desktop\Richard Claude\Fence Wizards Initial Go with Claude\site\build\pages\service-area\*.mjs`
- `...\site\build\lib\site.mjs` (CITIES, lines 57–77)
- `...\site\build\lib\components.mjs:171-184` (placeCard)
