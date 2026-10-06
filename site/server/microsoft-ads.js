// Microsoft Advertising offline conversion upload: one row per won job that came from a Microsoft ad click (msclkid).
// Upload in Microsoft Ads: Conversions → Offline conversions → Uploads → + Upload. Matches Microsoft's own CSV template
// (CSV_Conversion_Enhanced_Import_Template.csv): a "Parameters:TimeZone" row, then exactly these columns.
// Rules from Microsoft's docs: click IDs older than 90 days are ignored; wait 2 hours after creating the goal and
// 1 hour after the click before uploading; times are UTC here (TimeZone=+0000).

// Must match the name of the offline conversion goal in Microsoft Ads exactly.
export const MS_CONVERSION_NAME = 'Won job';

const COLUMNS = ['Conversion Name', 'Conversion Time', 'Conversion Value', 'Conversion Currency', 'Microsoft Click ID', 'Hashed Email Address', 'Hashed Phone Number'];

// "2026-10-05T14:30:12.345Z" → "2026-10-05 14:30:12" (yyyy-MM-dd HH:mm:ss, one of Microsoft's accepted formats)
export const microsoftTime = iso => iso.slice(0, 19).replace('T', ' ');

const cell = v => {
  const s = String(v ?? '');
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
// The template's rows end with a trailing comma (8 fields); match it exactly
const line = fields => `${fields.map(cell).join(',')},`;

// jobs: [{ won_at, won_value, source: { msclkid } }]
export function microsoftOfflineCsv(jobs) {
  const rows = [`Parameters:TimeZone=+0000${','.repeat(COLUMNS.length)}`, line(COLUMNS)];
  for (const j of jobs) {
    if (!j.source?.msclkid || !j.won_at) continue;
    rows.push(line([MS_CONVERSION_NAME, microsoftTime(j.won_at), j.won_value ?? '', j.won_value != null ? 'USD' : '', j.source.msclkid, '', '']));
  }
  return `${rows.join('\r\n')}\r\n`;
}
