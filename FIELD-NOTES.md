# Field Notes: publishing job stories

Each job story is one text file in `site/content/field-notes/` plus its photos. Publishing it automatically:
- adds it to the Field Notes page (`/blog/`)
- adds it under "Recent jobs" on the matching **town page** (e.g. Bloomington), **fence-type page(s)** and **use page** (Construction / Events / Emergency)
- adds it to the sitemap and Google's article data

---

## 1. What Richard sends (save this on his phone)

Text or email it any time after a job goes in. Rough is fine, and voice-to-text is fine.

**Photos:** 3 to 8 straight off the phone (originals, not screenshots). Include a wide shot of the whole run, a close-up of something specific (gates, windscreen, posts in the ground), and the crew or truck at work if possible.

**A few lines answering:**
1. **Where?** Town, or the nearest one. No street address needed.
2. **What kind of job?** Construction, event, or emergency/restoration, and what the site was (apartment build, demo, festival, storm damage...).
3. **What went in?** Panels, post-driven, windscreen, barricades. Roughly how many feet? Gates?
4. **How long** is it staying up?
5. **What made it interesting?** Tight timeline, rock in the ground, moved it mid-job, night install, inspector request... This is the part that makes the story worth reading.
6. **Can we name the customer or the site?** Yes or no. (Default is no.)
7. **Anything we should NOT show?** E.g. secure facilities, people's faces, other companies' logos.

---

## 2. Publishing it (with Claude Code)

1. Put the photos in a folder (anywhere), then ask Claude: *"Make a field note from these photos and Richard's notes: …"* and paste his text.
2. Claude will:
   - pick a slug (e.g. `bloomington-campus-perimeter-oct-2026`) and run
     `python tools/add-field-note-photos.py <slug> <photo folder>`, which resizes the photos, **strips their GPS/metadata**, and reports which town they were taken nearest to
   - write `site/content/field-notes/<slug>.md` from `_TEMPLATE.md` with `draft: true`, following the writing rules below
   - build a preview: `node build/build.mjs --drafts`, then open `http://localhost:8788/blog/<slug>/` (a yellow DRAFT bar shows at the top)
3. **Review it** (you and/or Richard): facts right, nothing invented, photos OK to show.
4. Remove `draft: true`, then run `npm run build` and `npm run check`. Once the site is hosted, deploy as usual.

To take a note down, delete its `.md` file and photo folder and rebuild. The build removes the old page automatically.

---

## 3. Writing rules (for whoever drafts, human or AI)

- **Only facts Richard gave.** Never invent footage, dates, customers, problems or quotes. If something is unknown, leave it out. A short true story beats a long padded one.
- **Voice:** plain-spoken, specific, first person plural ("we drove posts along…"), like the rest of the site. No hype words ("premier", "top-notch", "seamless").
- **Length:** about 250 to 600 words. Use 2 to 4 `##` sections such as *The site*, *What we put on the ground*, *How it went*.
- **Title:** says what and where in plain words, e.g. "Post-driven perimeter for a six-month build near campus". The town is added to the Google title automatically when `town:` is set.
- **Summary:** one or two sentences, 170 characters max. This is what Google shows.
- **Link naturally** to the fence-type page(s) used and, where it fits, the use page. The town page is linked automatically from "The job at a glance".
- **Privacy and security:**
  - Name customers or sites only with Richard's OK; set `customer:` only then.
  - No street addresses.
  - Don't show the layout, access points or weak spots of secure sites (government, utilities, schools, banks), or other companies' branding.
  - The photo tool removes GPS, but check the photos themselves for readable addresses or license plates.
  - The two truck photos showing the old (317) 296-4508 number are fine: both numbers work.
- **Pricing:** don't state prices, rates, discounts or rental-term rules in stories (pricing is still being finalized). "Flat price, removal included" is fine.
- **Alt text** describes what's visible ("Crew driving posts along a curb line"), not the town or the customer.
- **Pace:** a couple of stories a month across different towns is plenty. Variety of towns and job types helps search more than volume.

---

## Later (with the Quote Inbox)

Richard emails photos to a Field Notes address, or uses a form in the staff area. A draft is generated automatically using these same rules, and someone presses Publish. The file format above is already what that system will produce.
