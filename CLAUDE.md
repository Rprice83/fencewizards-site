# Fence Wizards website: project handoff

New website for **Fence Wizards** (temporary fence rental, B2B, Greenwood IN; owner **Richard Warren**), built by the user for their friend Richard. Replaces fencewizards.com and an unsatisfying ChatGPT attempt (`version-2/`, reference only).

**Read first:** `TODO.md` (open items), then `site/README.md` (how it all runs). Open questions for Richard live in the shared doc https://claude.ai/code/artifact/ad94b6da-7898-4b05-8d0a-eede7e764fac ("Fence Wizards Website — Questions for Richard"). Add Richard-only questions there.

## Latest (2026-10-06) — start here
- **Go-live is waiting on Richard and on access**, not on building. The Richard-facing checklist (shared doc; the user must share it with him): https://claude.ai/code/artifact/48cf04bb-f3fd-4f30-8694-ba89e6262065. Critical path: (1) domain + account ownership in Richard's name before he drops his current web company (unlocks Resend email, the domain switch, clean Google setup); (2) his answers in the questions doc (pricing: 19–23 mo panel rate, minimum charge, damage waiver; facts; privacy retention).
- **The user's to-dos:** Google Cloud permissions on Richard's project: add `fencewizards.pages.dev/*` + `localhost:8788/*` to the Maps/Places browser key, enable **Places API (New)** + **Map Tiles API**, and create a separate Routes-only server key (they set it themselves with `wrangler pages secret put GOOGLE_MAPS_SERVER_KEY`). Then Claude switches the estimator to Google (`public/estimate/map-providers.js`) and confirms driving miles. Never paste keys in chat.
- **Built since 2026-10-03 (all live on the demo, tested):** spam protection (Turnstile), lead-source tracking (gclid/msclkid/UTM/referrer + "How did you hear about us?"), Won job amount + "Download for Google Ads" / "Download for Microsoft Ads" files, Google tag + Microsoft UET tag (both **off** until Richard's IDs exist), driving-distance surcharge (straight line until the key exists), Field Notes stage 1 (Job stories form in the staff area, R2 photos), customer confirmation email (sends once Resend is set up), four Google Ads landing pages under `/go/` (checked against the account's real search terms), footer credit "Website by Limestone Web Co" → limestonewebco.com (not live yet), scroll fade-in fix, homepage hero height cap.
- **Google Ads:** analysis + deck done; Step 1 (tracking cleanup in his account) done 2026-10-04, before/after check due ~2026-11-01 to 11-15 (`marketing/google-ads/changelog.md`). Richard prefers uncapped bids and advertising outside Indianapolis; the plan respects that (fix tracking first; location split by keyword type). Next ads work = Phase 3 restructure (tight ad groups per landing page, keyword-matched ads) at launch, then a Microsoft Ads test 4–6 weeks after launch. See TODO.md "Google Ads + landing pages".
- Open small items: the user's display name for Inbox notes (only Richard has one in `STAFF_NAMES`); Richard's OK on the footer credit.

## Status (as of 2026-10-06)
- **Done:** full site (all original URLs + /privacy/, 404); map estimator with live price; quote/contact forms with file upload; Quote Inbox (/staff/) with source tags, Won amounts and ad-platform downloads; Job stories (/staff/stories/); customer confirmation email; ad landing pages (/go/); Google + Microsoft tracking (off until IDs); 59 passing tests + a link/asset/JS-syntax checker.
- **On hold:** /pricing/ page (waiting on Richard; /pricing/ 302s to /#pricing via `public/_redirects`); Stripe payment requests (questionnaire section 5); Field Notes stages 2–3 (AI draft via Claude API, then a Publish screen).
- **Google Ads:** reports/notes in `marketing/google-ads/` (git-ignored on purpose: client account data never goes to GitHub). Analysis: `analysis-2026-10-03.md`; change log: `changelog.md`. Game-plan deck (private Artifact): https://claude.ai/artifact/CWEfY6zRPnGSdAhXpJYkxd (Richard's feedback since: keep uncapped bids, keep out-of-town ads; the deck's Phase 1 card still shows the original plan). No account changes without his OK.
- **Kept out of this folder on purpose:** pricing, the service agreement and business notes live in the user's `Agency HQ` folder. The cold-email outreach for Richard will be its own project folder.
- **Hosting (managed service, decided 2026-10-05):** everything runs in the **user's** Cloudflare account (omniring09@gmail.com): Pages project `fencewizards` (https://fencewizards.pages.dev, auto-deploys from GitHub; root dir `site`, build `npm run cloudflare-build`, output `public`), D1 `fencewizards-quotes` (migrations 0001–0008 applied remotely), R2 bucket `fencewizards-field-notes` (binding `PHOTOS`), Turnstile (test keys on the demo), Access team `limestone-web-co` (app "Quote Inbox" on paths `staff` + `api/staff`; policy "Staff" = Richard richwarren1995@gmail.com + the user; Google sign-in via the user's Google Cloud project "Limestone Web Co Sign-in"). At launch the same project serves www.fencewizards.com. Richard owns his domain, email, Google Ads/Analytics/Business Profile and Google Cloud keys. To add a staff person: Access policy **and** `STAFF_EMAILS`.
- **Not launched yet:** see the go-live checklist and TODO.md ("Accounts & keys", "MUST BE DONE AT LAUNCH").

## Layout
```
FIELD-NOTES.md            job-story workflow + writing rules (follow it when Richard sends a job)
TODO.md                   source of truth for open work
fencewizards-content-inventory/   scrape of the old site (page copy, media, sitemap)
organized-assets/         photos/videos (named-photos/ = full-res originals, reference-images/ = old web copies)
Fence Wizards Price Sheet 8-12-26.pdf, FenceWizards_Branding&Logo_POC 2026.pdf
version-2/                ChatGPT's attempt (reference only, don't edit)
site/                     THE WEBSITE (Cloudflare Pages project)
  build/pages/*.mjs       one module per page (content lives here)
  build/partials/         hand-built HTML: home, estimator, confirmation
  build/lib/              site.mjs (phone/email/towns/nav, INTEGRATIONS = public IDs for Turnstile/Google/Microsoft, CREDIT: single source), components.mjs, layout.mjs (header/footer, googleTag(), microsoftTag(), landing variant), landing.mjs (/go/ hero), field-notes.mjs, area-map.mjs
  build/pages/go/         Google Ads landing pages (landing: true, noindex)
  build/AUTHORING.md      rules + component API for writing pages
  content/field-notes/    job stories as Markdown (+ _TEMPLATE.md)
  public/                 deployed output. The HTML is GENERATED, so never hand-edit public/**/index.html (except public/staff/*, which is hand-written)
  public/js/pricing.js    price-sheet engine, shared by browser + server
  public/js/source.js     lead-source cleaning/labels + "How did you hear about us?" list (browser + server)
  public/js/main.js       site JS: menu, fade-ins, forms, source capture (window.fwSource), tracking events (window.fwTrack), Turnstile
  public/estimate/        estimator app (map-providers.js = the only file to change for Google Maps)
  public/staff/           Quote Inbox app; public/staff/stories/ = Job stories (Field Notes intake)
  functions/api/          quotes.js, contact.js, distance.js, staff/* (behind Access: items, stories, export/google-ads + microsoft-ads), dev/* (local previews)
  server/                 quote.js, email.js (Richard's emails), customer-email.js + confirm.js (customer confirmation), inbox.js, staff-auth.js, turnstile.js, distance.js (Routes API + cache), stories.js, google-ads.js, microsoft-ads.js
  migrations/             D1 schema 0001–0008 (0004 source + won value, 0005 distance cache, 0006 stories, 0007 confirm status, 0008 spam_check flag)
  tools/add-field-note-photos.py   resize + strip GPS + detect town from photo GPS
  tools/pull-field-note.mjs        download a Job story (photos + answers) for drafting: node tools/pull-field-note.mjs FN-…
  tests/                  node --test
```

## Commands (run in `site/`, PowerShell)
Node isn't on the default PATH in fresh shells, so prefix with:
`$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- `node build/build.mjs` (add `--drafts` to include draft Field Notes), then `node build/check.mjs`, then `node --test`
- Local server: the Browser pane's launch config **"fencewizards-site"** (`.claude/launch.json`, wrangler pages dev on :8788)
- DB: `npx wrangler d1 migrations apply fencewizards-quotes --local` (set `$env:CI='true'`). **A new migration must also be applied with `--remote` BEFORE pushing code that uses it**: pushing deploys the code, but nothing migrates the live database automatically.
- Dev helpers: http://localhost:8788/api/dev/email-preview (latest email Richard would get); /api/dev/customer-email?id=FW-… (customer confirmation); http://localhost:8788/staff/ (auto-signed-in locally via DEV_STAFF_EMAIL in `.dev.vars`)
- Testing tracking: temporarily put pretend IDs in `INTEGRATIONS`, build, check `dataLayer` / `uetq` in the browser, then **set them back to empty strings** and rebuild before committing.
- Python: `$env:LOCALAPPDATA\Programs\Python\Python312\python.exe` (Pillow, pillow-heif, pymupdf installed). FFmpeg is installed via winget (Gyan.FFmpeg).

## Showing the site on other computers
- **Windows:** double-click `Start Website Preview.cmd` (project root).
- **Mac:** everything Mac-specific is in `mac/`, kept separate from the Windows files. The user mostly works on Windows. The Mac gets a **zip**, not the whole folder: `Desktop\Fence Wizards site (Mac preview).zip`. **After site changes, rebuild the zip** so the Mac copy is current:
  `git archive --format=zip --prefix="Fence Wizards site/" -o "C:\Users\gsvpr\OneDrive\Desktop\Fence Wizards site (Mac preview).zip" HEAD site mac CLAUDE.md TODO.md FIELD-NOTES.md .gitattributes` (commit first; it packs the last commit).
- Keep `.command` files LF and executable in git (`.gitattributes` + `git update-index --chmod=+x`).

## Version history (git)
- Git repo at the project root, branch `main`, remote `origin` = https://github.com/Rprice83/fencewizards-site (private, the user's GitHub). Git: `C:\Program Files\Git\cmd\git.exe` (may not be on PATH in old shells).
- Commit a snapshot after each finished piece of work, with a plain-English message, **then `git push`**. Check `git status` first, and never commit `.dev.vars` or keys.
- **Every push to `main` auto-deploys the hosted demo**, so only push finished, tested work. Cloudflare runs `npm run cloudflare-build` (build + link check + tests). If any of those fail, the deploy stops and the previous version stays live. **After every push, confirm the build succeeded**: `npx wrangler pages deployment list --project-name fencewizards --json` (from `site/`). Status `Active` = still building, `Failure` = failed (the old version stays up), a time like "2 minutes ago" = live. Cloudflare builds with Node 22 (`site/.nvmrc`); a test that passes locally on a newer Node can still fail there (2026-10-05: five builds failed silently because of a timer-based test).
- Not tracked (too big, still on disk/OneDrive): `organized-assets/named-videos/` (raw 4K drone clips) and `organized-assets/working/`.

## Decisions already made (don't re-ask)
- Brand: red #ED1C24, ink #231F20, silver. Barlow Condensed stands in for Shuttleblock (paid). Logos are cropped from the PDF until the designer's SVGs arrive.
- Phone **(317) 296-4015** and **richard@fencewizards.com** everywhere. The truck wraps' old 4508 number in photos is fine.
- The drone reel is the hero video (must stay). Photos come from the full-res originals (800/1600 sizes).
- Estimator: free Esri imagery + Nominatim during development, swapped for Google later (blocking for launch: Esri isn't licensed for commercial use). It shows a live preliminary price. Panels at 19–23 months use $8.20/ft temporarily. The damage waiver is an optional add-on. No minimum yet. The 50+ mile surcharge uses **driving miles from downtown Indianapolis** (Richard's yard is downtown), straight line as the fallback.
- **Pricing-claim policy:** never state "standard rental up to 12 months" or "short-job discounts". 8 ft = special order. "Flat price, removal included, no rent clock" is fine.
- Copy: keep the original wording, polish it, never invent facts. Alt text describes only what's visible (no town or customer names).
- Hosting: Cloudflare Pages + D1 + Resend. Quote Inbox security: Cloudflare Access with Google sign-in (Richard uses Google), plus JWT and STAFF_EMAILS verification in server/staff-auth.js (fails closed).
- Field Notes: draft → human approval → publish. Never auto-publish, never invent details.
- Email: Resend, set up properly once domain access exists (not a test sender). Customer confirmation goes from "Fence Wizards" <quotes@fencewizards.com>, Reply-To Richard.
- Ad landing pages: minimal header (no menu) but keep the footer's address/contact/privacy (Google rewards transparency); copy only from the site's own pages.
- Microsoft Ads: a small separate test (~$300–500/mo) 4–6 weeks after launch, importing the cleaned-up Google campaign.

## Working on this project
Verify changes in the Browser pane (desktop and mobile). Keep TODO.md current. Richard is non-technical, so anything he uses (Inbox, Field Notes intake, emails) must be dead simple. (General preferences about how the user likes to work are in their personal CLAUDE.md.)
