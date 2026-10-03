# Fence Wizards: quote storage and staff inbox

## What is ready

- `/estimate/` posts to a same-origin Pages Function instead of sending the planner through Web3Forms. The separate website contact form remains unchanged.
- The server validates the layout and rental inputs, recomputes footage/gate totals/prices from the shared rate rules, and saves the original request and calculated estimate in D1.
- Every saved request receives a random `FW-…` reference. A hashed submission key prevents duplicate records when a customer retries. Reusing a key with different details returns a conflict.
- `/quote-confirmation/` appears after a successful database save. It shows the reference, submitted plan and preliminary amount. It says **saved**, not delivered to Richard’s inbox. It does not accept payment.
- `/staff/quotes/` provides search, pagination, status filtering, contact links, layout and price details, private notes, record download and print. Updates use revision checks so one staff member cannot silently overwrite another’s edit. Audit rows record the actor, time and status/revision.
- Staff APIs verify Cloudflare Access signatures, issuer, audience, expiry, and the email allowlist. Missing configuration denies access. No development authentication bypass is shipped.
- Optional Resend staff and customer confirmation emails are attempted only after saving. Failed/unconfigured notifications are visible in the inbox and can be retried there. “Accepted” means the email provider accepted the message, not proof of inbox delivery. No actual email has been sent in testing.

## Current preview versus deployment

The shared Sites preview remains static. It includes explicit fictional examples at `/quote-confirmation/?demo=1` and `/staff/quotes/?demo=1`. These examples do not save real customer data or send mail. The planner disables submission when the backend is unavailable and offers those example links. Drawings and price calculations still work.

Production code is in `functions/` and `server/`; only `dist/` is uploaded to the current static preview. No customer database or Cloudflare account resources have been created remotely. Richard’s existing Sites preview access is preserved. This access is separate from the future Cloudflare staff login.

## Deploy later to Cloudflare Pages

Use the website owner's Cloudflare account. These commands are setup instructions, not steps already performed remotely.

1. Install Node 22+ and pnpm, then run `pnpm install --frozen-lockfile` in this folder. The checked-in lockfile pins tested dependencies.
2. Run `pnpm exec wrangler login`. Create the database with `pnpm exec wrangler d1 create fence-wizards-quotes`. Replace the all-zero local `database_id` in `wrangler.jsonc` with the returned ID. Keep binding name `QUOTES_DB`.
3. Create the Pages project named `fence-wizards` (or set `name` in `wrangler.jsonc` to the actual project name). Use Git integration or `pnpm exec wrangler pages project create fence-wizards` followed by CLI deployment. Do not upload just `dist/` through a drag-and-drop static deployment: the `functions/` directory must also be compiled.
4. Apply the schema: `pnpm exec wrangler d1 migrations apply QUOTES_DB --remote`. Use a **separate D1 database and email test recipient for staging**. Never attach preview branches to live customer records.
5. Configure the variables and secrets below in Pages settings for the intended production environment. Start with `ACCEPT_QUOTES=false`. Set `PUBLIC_ORIGIN` to the exact final HTTPS origin, without a trailing slash. Only that origin accepts submissions and staff writes.
6. Deploy with `pnpm exec wrangler pages deploy dist`. Commands run from the project root, where `functions/`, `wrangler.jsonc` and dependencies are present. The `_routes.json` file routes only `/api/*` through Functions so static pages remain static.
7. Connect the final domain. Configure Access before enabling submissions or importing real data. Redeploy after changing bindings or environment values.
8. Perform the launch checks below, then change `ACCEPT_QUOTES=true` and redeploy. Approval of the unresolved price-sheet rules and Google Maps integration remain separate tasks.

## Configuration

| Name | Purpose |
| --- | --- |
| `QUOTES_DB` | D1 database binding from Wrangler configuration |
| `PUBLIC_ORIGIN` | Exact production origin; no trailing slash |
| `ACCEPT_QUOTES` | Literal `true` enables submissions; anything else keeps them disabled |
| `TURNSTILE_SITE_KEY` | Public widget key, restricted to production hostname |
| `TURNSTILE_SECRET_KEY` | **Secret** for server verification; widget action must be `quote` |
| `RECEIPT_SIGNING_KEY` | **Secret**, at least 32 characters of cryptographically random material, dedicated to private confirmation links |
| `ACCESS_TEAM_DOMAIN` | Your `team-name.cloudflareaccess.com`, without protocol/path |
| `ACCESS_AUD` | Access application audience tag |
| `STAFF_EMAILS` | Comma-separated authorized email addresses, initially the owner and Richard |
| `RESEND_API_KEY` | Optional **secret** for staff email notifications |
| `QUOTE_NOTIFY_FROM` | Sender on a domain verified with Resend |
| `QUOTE_NOTIFY_TO` | Test recipient first; confirm Richard’s production destination before switching |

Secrets belong in Cloudflare settings or `wrangler pages secret put`, never in `dist/`, source files or browser configuration. `.dev.vars` and `.env` are ignored by Git. The example file contains no credentials.

Resend is the implemented optional notification adapter; no paid account has been created. Another email provider can be substituted in `server/notifications.mjs`. The original Web3Forms account continues to serve the separate contact form only. A customer confirmation email is now implemented. It goes only to the email submitted with that request and contains the quote reference plus a private link. Configure and test the verified sender before enabling submissions. Staff and customer email delivery statuses are tracked independently. Disable email click tracking for these private links in the provider settings so access tokens are not sent through a tracking redirect.

## Staff login setup

Create a Cloudflare Access self-hosted application covering **both** `<production-host>/staff/*` and `<production-host>/api/staff/*`, with the same audience. Enable email one-time PIN or an approved identity provider, and allow only `omniring09@gmail.com` and `richwarren1995@gmail.com` initially. Copy that application's audience into `ACCESS_AUD`, its team domain into `ACCESS_TEAM_DOMAIN`, and those emails into `STAFF_EMAILS`.

Do not protect the public submission routes `/api/quotes`, `/api/quote-config`, `/api/quote-receipt`, or the public estimator and confirmation page behind staff Access. If you use more than one staff Access application, update the backend audience validation deliberately; do not disable it.

Opening a notification’s link takes Richard to the staff request. Access signs him in first. Protect the staff page and APIs on every deployed hostname. Direct `pages.dev`/preview hosts must not bypass this: the backend independently requires a valid Access JWT even when edge protection is absent; writes also require the configured production origin. Verify this in an incognito browser before launch.

## Data and recovery

The database stores customer contact details, address, original drawing JSON, options, date, customer notes, calculated price/rate version, status and internal notes. Customer-supplied prices are ignored. Gate positions and measurements remain customer-supplied estimates, not verified site measurements.

The customer receipt is accessible only with its reference and a private 256-bit HMAC token derived from a cryptographically random per-request nonce, the reference, expiry and `RECEIPT_SIGNING_KEY`. Neither the browser submission ID nor the quote ID alone grants access. The signing secret stays in Cloudflare settings; raw access tokens are not stored in D1 or returned by staff-record/download endpoints.

A link is valid for exactly 30 days from the original submission. Retrying a submission returns the same token and does not extend its expiry. Tokens travel in the link’s URL fragment (after `#`), which browsers do not send in the initial HTTP request; the page removes it from the address bar and sends it to the receipt API in a POST body. The API does not log request bodies. Do not add analytics that collect fragments, page DOM, or receipt API bodies. Keep the page’s no-referrer/noindex settings.

The customer can open the email link on another device, copy the private link, or print the confirmation. Session storage is only a refresh convenience, not the access mechanism. Anyone holding the link can view the submitted plan, project location and preliminary estimate. Customer email, phone, customer notes and staff notes are excluded from the public receipt.

Expired or staff-disabled links return an unavailable message without exposing the plan; the quote record remains in Richard’s inbox. Staff can disable a link early and retry failed customer emails. Retries do not extend or reactivate links, and accepted emails are not automatically sent again. No public “resend by quote ID” endpoint exists. For a lost/expired link, the page directs the customer to Richard. Token renewal is not implemented.

Configure `RECEIPT_SIGNING_KEY` before enabling submissions and keep it stable. Rotating it invalidates all existing links; it does not delete records. Apply migration `0002_customer_receipts.sql` as well as the original migration. Pre-upgrade records have no token and remain staff-only; no production records existed at implementation time. The staff JSON download contains personal data and must be handled privately.

No automatic deletion or permanent public lookup is implemented. Agree a retention period with Richard. Use D1 recovery plus regular exports stored **outside the website’s published folder**, restrict export access, and test a restore. Example operator command: `pnpm exec wrangler d1 export QUOTES_DB --remote --output <private-backup-path.sql>`. Do not commit exports or upload them with the website.

Notification failure does not roll back a saved quote. Richard should check the inbox as well as email. Retry pending/failed notifications from a record; provider acceptance is not delivery confirmation. Retries use an email idempotency key, subject to the provider’s retention window. There is no unattended email retry scheduler yet.

## Local verification and launch checks

Already completed locally: SQL-backed API tests, duplicate retries, invalid inputs, origin checks, server price calculation, staff JWT signature/audience/expiry/allowlist checks, protected receipt retrieval, concurrent-update conflicts, notification-not-configured behavior, D1 migration, Cloudflare function compilation, and browser tests for confirmation/inbox/mobile/failure recovery. Email and browser API calls were mocked where credentials would be needed.

Run:

```text
pnpm test:quotes
pnpm build:functions
pnpm db:local
pnpm dev:cloudflare --port 8788
```

Copy `.dev.vars.example` to `.dev.vars` for local configuration. Without credentials the runtime intentionally shows disabled submissions and denies staff access. Do not solve this by adding a production auth bypass. For UI examples, use `?demo=1` with fictional data.

Before accepting real submissions:

- Confirm Richard’s rates, missing terms, tax, minimums, gates, and distance rules. Test several of his actual historical quotes.
- Test real Turnstile on the production hostname, a successful submission and a retry, then confirm exactly one D1 record and a matching confirmation reference.
- Test staff login as each allowed account and denial for an unrelated account, including direct API and preview-host access.
- Test actual staff and customer email inboxes, sender verification, reply-to and failed-email recovery. Use test customer addresses until approved. Verify the customer link in a fresh browser, after expiry, and after staff revocation.
- Test editing the same record in two tabs: stale updates should return a conflict without overwriting notes.
- Set appropriate request-abuse limits in Cloudflare and monitor D1/function usage. Turnstile, bounded payloads and validation are implemented; custom per-IP rate limiting is not.
- Confirm privacy/retention wording, backup ownership, and restore procedure. Remove launch-blocking preview text/noindex only as part of the overall website launch. Staff and confirmation pages must stay noindex.
- Google Maps, payments, customer accounts, final-price approval and Stripe webhooks are not included in this phase.

Reference documentation: [Pages D1 bindings](https://developers.cloudflare.com/pages/functions/bindings/), [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/), [Access JWT validation](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

Expiring-link verification completed locally: fresh-browser fragment access and removal, signed-token checks, fixed 30-day expiry, early revocation, duplicate retry stability, customer email failure/retry with mocked provider, D1 migration 0002, and Worker compilation. No real emails were sent.
