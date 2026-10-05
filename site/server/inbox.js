// Quote Inbox data access. Quotes (from /estimate/) and inquiries (site forms) share one pipeline.
export const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost'];
export const isInquiryId = id => /^FW-M-/.test(id);
const tableFor = id => (isInquiryId(id) ? 'inquiries' : 'quotes');

const parseJson = s => { try { return JSON.parse(s); } catch { return null; } };

export const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });

// Common columns for the list view
const LIST_SQL = `
  SELECT 'quote' AS type, q.id, q.created_at, q.status, q.name, q.company, q.phone, q.email, q.address AS location,
         q.fence_type AS fence, q.feet, q.months, q.priced, q.estimate_total AS total, NULL AS message,
         (SELECT COUNT(*) FROM notes n WHERE n.item_id = q.id) AS note_count, q.email_status,
         q.source_json, q.heard_about, q.won_value
  FROM quotes q
  UNION ALL
  SELECT 'inquiry' AS type, i.id, i.created_at, i.status, i.name, NULL, i.phone, i.email, i.location,
         i.fence_style, i.feet, NULL, 0, NULL, i.message,
         (SELECT COUNT(*) FROM notes n WHERE n.item_id = i.id), i.email_status,
         i.source_json, i.heard_about, i.won_value
  FROM inquiries i`;

export async function listItems(db, { status, type, q, before, limit = 100 }) {
  const where = [], args = [];
  if (status === 'open') where.push(`status IN ('new','contacted','quoted')`);
  else if (STATUSES.includes(status)) { where.push('status = ?'); args.push(status); }
  if (type === 'quote' || type === 'inquiry') { where.push('type = ?'); args.push(type); }
  if (q) {
    const like = `%${q.replace(/[%_]/g, '')}%`;
    where.push('(name LIKE ? OR company LIKE ? OR email LIKE ? OR phone LIKE ? OR location LIKE ? OR id LIKE ? OR message LIKE ?)');
    args.push(like, like, like, like, like, like, like);
  }
  if (before) { where.push('created_at < ?'); args.push(before); }
  const sql = `SELECT * FROM (${LIST_SQL}) ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC LIMIT ?`;
  const { results } = await db.prepare(sql).bind(...args, Math.min(limit, 200) + 1).all();
  const more = results.length > limit;
  const counts = await db.prepare(`SELECT status, COUNT(*) AS n FROM (${LIST_SQL}) GROUP BY status`).all();
  for (const r of results) { r.source = parseJson(r.source_json); delete r.source_json; }
  return {
    items: results.slice(0, limit),
    more,
    counts: Object.fromEntries(STATUSES.map(s => [s, counts.results.find(r => r.status === s)?.n || 0])),
  };
}

export async function getItem(db, id) {
  const table = tableFor(id);
  const row = await db.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
  if (!row) return null;
  delete row.email_html; // large, and only needed for debugging
  const parse = parseJson;
  const item = { type: table === 'quotes' ? 'quote' : 'inquiry', ...row };
  item.source = parse(row.source_json); delete item.source_json;
  if (item.type === 'quote') {
    item.plan = parse(row.plan_json); item.options = parse(row.options_json); item.estimate = parse(row.estimate_json);
    delete item.plan_json; delete item.options_json; delete item.estimate_json;
  } else {
    item.files = parse(row.file_names) || [];
  }
  const [notes, events] = await Promise.all([
    db.prepare('SELECT id, created_at, author, body FROM notes WHERE item_id = ? ORDER BY created_at').bind(id).all(),
    db.prepare('SELECT created_at, actor, action, detail FROM events WHERE item_id = ? ORDER BY created_at').bind(id).all(),
  ]);
  item.notes = notes.results;
  item.events = events.results;
  return item;
}

export async function setStatus(db, id, status, actor) {
  if (!STATUSES.includes(status)) throw new Error('Unknown status');
  const table = tableFor(id);
  const row = await db.prepare(`SELECT status FROM ${table} WHERE id = ?`).bind(id).first();
  if (!row) return null;
  if (row.status === status) return { changed: false };
  const now = new Date().toISOString();
  await db.batch([
    db.prepare(`UPDATE ${table} SET status = ?, updated_at = ? WHERE id = ?`).bind(status, now, id),
    db.prepare('INSERT INTO events (item_id, created_at, actor, action, detail) VALUES (?,?,?,?,?)').bind(id, now, actor, 'status', `${row.status} → ${status}`),
  ]);
  return { changed: true };
}

export async function addNote(db, id, body, actor) {
  const table = tableFor(id);
  const exists = await db.prepare(`SELECT id FROM ${table} WHERE id = ?`).bind(id).first();
  if (!exists) return null;
  const now = new Date().toISOString();
  await db.batch([
    db.prepare('INSERT INTO notes (item_id, created_at, author, body) VALUES (?,?,?,?)').bind(id, now, actor, body),
    db.prepare(`UPDATE ${table} SET updated_at = ? WHERE id = ?`).bind(now, id),
  ]);
  return { created_at: now };
}
