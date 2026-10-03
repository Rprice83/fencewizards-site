# Fence Wizards website: project handoff

New website for **Fence Wizards** (temporary fence rental, B2B, Greenwood IN; owner **Richard Warren**), built by the user for their friend Richard. Replaces fencewizards.com and an unsatisfying ChatGPT attempt (`version-2/`, reference only).

**Read first:** `TODO.md` (open items), then `site/README.md` (how it all runs). Open questions for Richard live in the shared doc https://claude.ai/code/artifact/ad94b6da-7898-4b05-8d0a-eede7e764fac ("Fence Wizards Website — Questions for Richard"). Add Richard-only questions there.

## Status (as of 2026-10-02)
- **Done:**
  - Full site in the new design: homepage with drone-video hero, all 38 original pages except /pricing/, /privacy/, 404.
  - Map estimator (/estimate/) with confirmation page.
  - Wired quote and contact forms (with file upload).
  - Quote Inbox (/staff/).
  - Field Notes job-story system (step 1).
  - 22 passing tests, plus a link/asset checker.
- **On hold:**
  - /pricing/ page (waiting on Richard).
  - Stripe payment requests (waiting on questionnaire section 5; design is in TODO.md).
- **Not deployed yet:** everything runs locally. Launch needs Cloudflare (Pages + D1 + Access), Resend, and Google Maps/Places keys (see TODO.md and the site/README.md setup sections).

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
  build/lib/              site.mjs (phone/email/towns/nav: single source), components.mjs, layout.mjs, field-notes.mjs, area-map.mjs
  build/AUTHORING.md      rules + component API for writing pages
  content/field-notes/    job stories as Markdown (+ _TEMPLATE.md)
  public/                 deployed output. The HTML is GENERATED, so never hand-edit public/**/index.html (except public/staff/*, which is hand-written)
  public/js/pricing.js    price-sheet engine, shared by browser + server
  public/estimate/        estimator app (map-providers.js = the only file to change for Google Maps)
  public/staff/           Quote Inbox app
  functions/api/          quotes.js, contact.js, staff/* (behind Access), dev/email-preview.js
  server/                 quote.js (server-side validation/pricing), email.js, inbox.js, staff-auth.js
  migrations/             D1 schema 0001–0003
  tools/add-field-note-photos.py   resize + strip GPS + detect town from photo GPS
  tests/                  node --test
```

## Commands (run in `site/`, PowerShell)
Node isn't on the default PATH in fresh shells, so prefix with:
`$env:Path = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' + [Environment]::GetEnvironmentVariable('Path','User')`
- `node build/build.mjs` (add `--drafts` to include draft Field Notes), then `node build/check.mjs`, then `node --test`
- Local server: the Browser pane's launch config **"fencewizards-site"** (`.claude/launch.json`, wrangler pages dev on :8788)
- DB: `npx wrangler d1 migrations apply fencewizards-quotes --local` (set `$env:CI='true'`)
- Dev helpers: http://localhost:8788/api/dev/email-preview (latest email Richard would get); http://localhost:8788/staff/ (auto-signed-in locally via DEV_STAFF_EMAIL in `.dev.vars`)
- Python: `$env:LOCALAPPDATA\Programs\Python\Python312\python.exe` (Pillow, pillow-heif, pymupdf installed). FFmpeg is installed via winget (Gyan.FFmpeg).

## Version history (git)
- Local git repo at the project root (branch `main`, no remote). Git: `C:\Program Files\Git\cmd\git.exe` (may not be on PATH in old shells).
- Commit a snapshot after each finished piece of work, with a plain-English message. Check `git status` first, and never commit `.dev.vars` or keys.
- Not tracked (too big, still on disk/OneDrive): `organized-assets/named-videos/` (raw 4K drone clips) and `organized-assets/working/`.

## Decisions already made (don't re-ask)
- Brand: red #ED1C24, ink #231F20, silver. Barlow Condensed stands in for Shuttleblock (paid). Logos are cropped from the PDF until the designer's SVGs arrive.
- Phone **(317) 296-4015** and **richard@fencewizards.com** everywhere. The truck wraps' old 4508 number in photos is fine.
- The drone reel is the hero video (must stay). Photos come from the full-res originals (800/1600 sizes).
- Estimator: free Esri imagery + Nominatim during development, swapped for Google later. It shows a live preliminary price. Panels at 19–23 months use $8.20/ft temporarily. The damage waiver is an optional add-on. No minimum yet.
- **Pricing-claim policy:** never state "standard rental up to 12 months" or "short-job discounts". 8 ft = special order. "Flat price, removal included, no rent clock" is fine.
- Copy: keep the original wording, polish it, never invent facts. Alt text describes only what's visible (no town or customer names).
- Hosting: Cloudflare Pages + D1 + Resend. Quote Inbox security: Cloudflare Access with Google sign-in (Richard uses Google), plus JWT and STAFF_EMAILS verification in server/staff-auth.js (fails closed).
- Field Notes: draft → human approval → publish. Never auto-publish, never invent details.

## Working style the user likes
Ask before big choices; recommend an option. Verify changes in the Browser pane (desktop and mobile). Keep TODO.md current. Explain in plain language: the user isn't a developer, and Richard is non-technical.
