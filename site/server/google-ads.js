// Google Ads offline conversion upload ("conversions from clicks"): one row per won job that came from an ad click.
// Upload in Google Ads: Goals → Conversions → Uploads → upload this file. Google matches each Click ID (gclid)
// to the original ad click and credits the job's value to that campaign and keyword. Click IDs expire after 90 days.

// Must match the name of the conversion action in Google Ads exactly (type: Import → conversions from clicks).
export const CONVERSION_NAME = 'Won job';

const HEADER = ['Google Click ID', 'Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency'];

// "2026-10-05T14:30:12.345Z" → "2026-10-05 14:30:12+00:00" (a format Google accepts, with an explicit time zone)
export const googleTime = iso => `${iso.slice(0, 19).replace('T', ' ')}+00:00`;

const cell = v => {
  const s = String(v ?? '');
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// jobs: [{ won_at, won_value, source: { gclid } }]
export function offlineConversionsCsv(jobs) {
  const rows = [HEADER];
  for (const j of jobs) {
    if (!j.source?.gclid || !j.won_at) continue;
    rows.push([j.source.gclid, CONVERSION_NAME, googleTime(j.won_at), j.won_value ?? '', 'USD']);
  }
  return `${rows.map(r => r.map(cell).join(',')).join('\r\n')}\r\n`;
}
