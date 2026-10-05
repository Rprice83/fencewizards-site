// GET /api/staff/export/google-ads?days=90 — CSV of won jobs from Google ad clicks, for upload to Google Ads.
// Headers X-Jobs / X-Missing-Value tell the Inbox what's in the file.
import { wonAdJobs } from '../../../../server/inbox.js';
import { offlineConversionsCsv } from '../../../../server/google-ads.js';

export async function onRequestGet({ request, env }) {
  const days = Math.min(Math.max(Number(new URL(request.url).searchParams.get('days')) || 90, 1), 90);
  const since = new Date(Date.now() - days * 864e5).toISOString();
  const jobs = await wonAdJobs(env.DB, { since });
  const today = new Date().toISOString().slice(0, 10);
  return new Response(offlineConversionsCsv(jobs), {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="fence-wizards-won-jobs-for-google-ads-${today}.csv"`,
      'X-Jobs': String(jobs.length),
      'X-Missing-Value': String(jobs.filter(j => j.won_value == null).length),
    },
  });
}
