# C. Google Ads landing pages (/go/)

## Overall
- **The headlines match the searches well.** Every H1 and eyebrow contains its ad group's main phrases: construction fence rental, temporary fencing for construction sites, job site fencing, temp fence panels, outdoor event fencing, temporary fencing for events, crowd control barricade(s) rental, emergency temporary fencing / emergency fence rental, rent a fence, temporary fence rental. Nearly every fact traces back to the site's own pages, the FAQ, the About page or a blog post. There are two exceptions: "A number for your bid, *today.*" and "certificates on request" (a mild paraphrase).
- **The biggest problem is the calls to action.** Each page offers three different next steps:
  - The hero's red "Get my price" button scrolls to the quote form. That form produces no price: it ends in "Send it to Richard" and a reply "within 24 hours".
  - The header's "Get a Quote" also goes to the form.
  - The closing `ctaBand()` has a red "Plan & price it" button that leaves the page for /estimate/.

  On the emergency page, which is meant to put the call first, that closing band's main button points to the estimator.
- **Some facts don't line up:**
  - The emergency page is planned as the target for an after-hours campaign, but it says the business is open 7:30am–9pm.
  - The events "Large events in Indianapolis" heading lists sites that are neither events nor in Indianapolis.
  - "Net 30 is normal" leaves out "new accounts pay up front", and ad clicks are mostly new accounts.
- **AI tells are few.** They come from the source copy: a "Not the following Monday." fragment, "No…" feature titles stacked next to a "No dispatch queue" trust line, and a "not a comfortable one" contrast in the emergency meta description. "Rather than" is Richard's verbal habit and shows up 6+ times. That's acceptable, but don't add more.
- **Swap test:** all four H1s are "category + Indianapolis", which a competitor could copy. That's deliberate for ad relevance, so keep the H1s. The differentiator has to land in the lede and trust line, and the construction and emergency ledes currently bury it. I also found one inconsistency outside these pages: the emergency blog post says "usually a same-week job", while the emergency pages say "faster than the standard 24 to 48 hour window".

## Findings

### Shared hero / footer (lib/landing.mjs, lib/components.mjs ctaBand, lib/layout.mjs)
| Severity | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | landing.mjs:17 (hero main button) | "Get my price" | It promises a price, but the button goes to a form that sends details and waits for a reply. That mismatch hurts trust right at the conversion point. | "Get my quote" (or point the button at /estimate/, which does show a preliminary price; see the CTA options below) |
| Med | components.mjs:290–296 `ctaBand()` used on all 4 pages | red "Plan & price it" → /estimate/, Call is secondary | It adds a third action that leaves the page and breaks "single message, single CTA". On the emergency page it flips the call-first order. | Give landing pages a band whose buttons are "Get my quote" → `#quote` (red) + Call. On emergency, make Call red and drop the estimator button. Keep the estimator as the existing text link in `quoteCta`. |
| Low | landing.mjs:18 | "★★★★★ 4.6 from 39 Google reviews" | Five full stars shown next to 4.6, and the line isn't linked. | Link it to `SITE.mapsUrl` (as the main footer does). Optionally show 4.5 stars. |
| Low | layout.mjs:82 vs hero vs form | "Get a Quote" / "Get my price" / "Get a price" (eyebrow) / "Send it to Richard" | Four names for one action. | Use "Get my quote" in the header and hero, and eyebrow "Get a quote". Keep "Send it to Richard". |
| Low | components.mjs:290 default band heading | "Fence on site in *24–48 hours.*" | Breaks the project style rule ("24 to 48 hours"). | "Fence on site in *24 to 48 hours.*" |

### Construction (go/construction-fence-rental.mjs)
| Severity | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | quoteCta heading, :25 | "A number for your bid, *today.*" | "today" is a new promise that isn't in the source. The form note promises "within 24 hours, usually the same day". | "A number you can put *in a bid.*" (source wording) |
| Med | hero lede, :17 | "Temporary fencing for construction sites: temp fence panels and stands, post-driven chain link, gates and windscreen, usually set within 24 to 48 hours of the call. The price is agreed…" | The first sentence is a 28-word inventory list. The real differentiator (same-day moves) appears only in the trust strip, and "temp fence panels and stands" reads as keyword stuffing. | "Temporary fencing for construction sites, usually set within 24 to 48 hours of the call. When a gate has to move or a run has to be added, we come back out the same day, and the price agreed up front covers removal at the end." (Keep "temp fence panels" in the features or FAQ so the phrase stays on the page.) |
| Med | features "Paperwork in order", :38 | "Net 30 is normal for clients we have worked with." | Ad visitors are mostly new accounts. Leaving out the up-front rule sets up a surprise at the invoice. | "Net 30 is normal for clients we have worked with. New accounts pay up front, and we say so on the first call. Certificates of insurance for your vendor file: umbrella, general liability, commercial auto and workers' compensation." |
| Low | features "A number you can put in a bid", :35 | "We quote verbally first, on the call, and send the written proposal after. The price is agreed before the first panel goes in." | Repeats the quoteCta text word for word and repeats the lede. | "One call gets you a verbal number, and the written proposal follows. Net 30 terms and certificates are covered below." Or replace the quoteCta text with the default "Five answers and Richard can price it. He takes every inquiry himself." |
| Low | keywords | (no "temporary chain link fence") | That keyword (Quality Score 4–5) isn't on any /go/ page, if it belongs to this ad group. | In the FAQ answer at :59: "…post-driven chain link, a temporary chain link fence with driven posts, is the stronger call." |

### Event fencing & barricades (go/event-fencing-barricades.mjs)
| Severity | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Med | prose heading, :45 | "Large events *in Indianapolis.*" | The list under it includes Ball State University (Muncie), Veterans Affairs and the Social Security Administration, which aren't events. The heading overclaims, and the list is still open question 1.7. | "Sites our fence *has stood on.*" |
| Med | quoteCta text, :27 | "For an event fencing rental quote: load-in, doors and load-out, the footprint, and roughly how much line you need. Richard prices it himself." | It asks for times and a footprint, but the form has no field for either. The colon also makes the first line a fragment. | "Five answers and Richard prices it himself. Have your load-in, doors and load-out times handy for the call." |
| Low | feature "Struck when it ends", :39 | "Not the following Monday. The removal was already inside the price, agreed before the first panel goes up." | Opens with a contrast fragment (AI-tell pattern 1/6), and the tense is mixed ("was … goes"). | "We pull the fence the night the event ends. The removal was already inside the price agreed before the first panel went up." |
| Low | feature title, :36 | "Temporary fencing for events, on your window" | "On your window" is awkward. | "Temporary fencing for events, set on your schedule" |
| Low | hero lede / features | "crowd control barricades" vs. the form option "Crowd-control barricades" | Inconsistent hyphenation. | Keep the unhyphenated form (it's the search phrase) on this page. Fine to leave the form as is. |

### Emergency (go/emergency-fencing.mjs)
| Severity | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| High | trust, :22 + file comment :2 | "Open 7 days, 7:30am–9pm" (the page is also planned as "the target for an after-hours emergency call campaign") | An after-hours ad that lands here shows the business as closed, and the call may go unanswered. That wastes the most expensive clicks. | Don't point the after-hours campaign here until [NEED: who answers 9pm–7:30am?]. If no one does, run emergency ads only from 7:30am to 9pm (matches the TODO). |
| Med | hero lede, :18 | "…call and tell us where it is and how much of it needs closing. Richard answers the phone himself." | Says nothing about speed above the fold, which is the emergency searcher's first question. | "After a storm, a fire or a break-in, call and tell us where it is and how much of it needs closing. Richard answers the phone himself and gives you a real time on that call." |
| Med | trust, :22 + features :31–32 | "No dispatch queue: the owner answers" / "No dispatch queue" / "No measured plan needed" | Three "No…" lines in a row (negation-list tell), plus a colon reveal. The trust line repeats the lede. | Trust: "Faster than the standard 24 to 48 hours". Feature titles: "Richard takes the call" and "Rough numbers are enough". |
| Med | meta description, :10 | "Call Richard and get a real time, not a comfortable one." | Contrast reveal (pattern 1) in short copy. | "Emergency fence rental after a storm, fire or break-in, across Indianapolis and central Indiana. Call Richard for a straight answer on timing." (about 140 characters) |
| Low | quoteCta text, :41 | "Otherwise, five answers and Richard will get back to you." | Vague when a concrete promise exists. | "Otherwise, five answers and Richard reaches out within 24 hours, usually the same day." |
| Low | features eyebrow, :26 | "Why the small company answers faster" | A ranking claim with no proof on the page beyond the dispatch-queue line (it is sourced). | Keep it. Optional: "Why it matters who answers" (source eyebrow). |

### Temporary fence rental (go/temporary-fence-rental.mjs)
| Severity | Where | Current text | Problem | Suggested fix |
|---|---|---|---|---|
| Low | typeCards intro, :41 | "…which is the right call. Temp fence panels on stands are the most portable." | The keyword sentence reads bolted on. "Most portable" is a ranking the source doesn't make. | "…which is the right call. Temp fence panels on stands are the fence most jobs start with." (panels page lede) |
| Low | hero lede, :17 | "Rent a fence for … portable fence panels, post-driven chain link, windscreen and barricades." | Windscreen is sold, not rented. | "…portable fence panels, post-driven chain link and barricades, plus windscreen to buy." Or leave it, since the sale is explained elsewhere. |
| Low | FAQ order, :60 | "Do you do residential fencing?" (last) | Broad "fence rental near me" traffic includes homeowners. Saying "business to business" earlier saves their time and Richard's. | Move this FAQ to first, or add trust item "Business-to-business rental" (source: "Ninety-nine percent of what we do is business to business"). |

## Headline + CTA alternatives
H1s keep the ad-group phrase. Run against the Now-you-can test.
- **Construction**
  - A: "Construction fence rental, *moved the same day your plan changes.*" Rationale: keeps the keyword and adds the real differentiator (source meta).
  - B: "Construction fence rental *at one flat price.*" Rationale: answers the estimator's first question.
  - CTA: "Get a number for my bid" (contractor language) / "Get my quote".
- **Events**
  - A: "Event fencing and barricades, *set on your run of show.*" Rationale: planner language; Now-you-can: "set on your run of show" passes.
  - B: "Event fencing and barricade rental, *struck the night it ends.*" Rationale: venues care about the strike.
  - CTA: "Quote my event" / "Get my event quote".
- **Emergency**
  - A: "Emergency fencing after a storm, fire *or break-in.*" Rationale: mirrors the searcher's situation; keep "emergency fence rental" in the eyebrow and lede.
  - B: "Emergency fence rental, *a real time on the first call.*" Rationale: honest speed promise (source).
  - CTA: keep "Call Richard · (317) 296-4015"; alt "Call now · (317) 296-4015".
- **General rental**
  - A: "Temporary fence rental, *removal included.*" Rationale: the flat-price differentiator lands in the H1.
  - B: "Rent a fence in Indianapolis *at one flat price.*" Rationale: matches "rent a fence" exactly.
  - CTA: "Get my quote" / "Send Richard the job".

## [NEED] questions for Richard
1. **After hours:** does anyone answer (317) 296-4015 between 9pm and 7:30am? This decides whether the after-hours emergency campaign can point at /go/emergency-fencing/.
2. **"No rent clock":** if a job runs past the term it was priced on (prices change by duration, e.g. the 19–23 month rate), does the price really stay the same? The pages say the fee "doesn't keep running if your project runs long."
3. **Emergency speed:** what can we honestly say? The pages say "faster than 24 to 48 hours". The blog says "usually a same-week job". Is there a typical metro response, such as same day?
4. **Certificates of insurance:** how fast can he send one? A stated turnaround would strengthen "certificates on request".
5. **Past-sites list (open question 1.7):** OK to show NBA All-Star / Final Four / Ball State / VA / SSA / White River State Park on the events ad page?
6. **Already open in TODO.md:** current Google rating (4.6/39), and which phone number and address are right (939-9030 / Aloda St vs 296-4015 / Newark Ct). These show in the landing hero and footer.

I only reviewed the files; nothing was edited. Files reviewed:
- C:\Users\gsvpr\OneDrive\Desktop\Richard Claude\Fence Wizards Initial Go with Claude\site\build\pages\go\*.mjs
- ...\site\build\lib\landing.mjs
- ...\site\build\lib\components.mjs (ctaBand, quoteCta)
- ...\site\build\lib\layout.mjs (landing header and footer)
