CREATE TABLE quotes (
 id TEXT PRIMARY KEY,
 request_key_hash TEXT NOT NULL UNIQUE,
 payload_hash TEXT NOT NULL,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL,
 name TEXT NOT NULL,
 email TEXT NOT NULL,
 address TEXT NOT NULL,
 status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','quoted','closed')),
 payload_json TEXT NOT NULL,
 estimate_json TEXT NOT NULL,
 internal_notes TEXT NOT NULL DEFAULT '',
 revision INTEGER NOT NULL DEFAULT 1,
 notification_status TEXT NOT NULL DEFAULT 'pending',
 notification_attempts INTEGER NOT NULL DEFAULT 0,
 notification_updated_at TEXT,
 last_edited_by TEXT
);
CREATE INDEX quotes_created ON quotes(created_at DESC,id DESC);
CREATE INDEX quotes_status_created ON quotes(status,created_at DESC,id DESC);
CREATE TABLE quote_events (
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 quote_id TEXT NOT NULL REFERENCES quotes(id),
 created_at TEXT NOT NULL,
 actor TEXT NOT NULL,
 revision INTEGER NOT NULL,
 status TEXT NOT NULL,
 UNIQUE(quote_id,revision)
);
