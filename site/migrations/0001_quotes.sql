-- Quote requests submitted from /estimate/
CREATE TABLE quotes (
  id                  TEXT PRIMARY KEY,            -- e.g. FW-261002-7K3Q
  created_at          TEXT NOT NULL,               -- ISO 8601 UTC
  status              TEXT NOT NULL DEFAULT 'new'  -- new | contacted | quoted | won | lost
                      CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),

  -- customer
  name                TEXT NOT NULL,
  company             TEXT,
  email               TEXT NOT NULL,
  phone               TEXT NOT NULL,
  contact_pref        TEXT,
  address             TEXT NOT NULL,
  customer_notes      TEXT,

  -- project
  project_type        TEXT,
  fence_type          TEXT NOT NULL,
  months              INTEGER NOT NULL,
  start_date          TEXT,
  feet                REAL NOT NULL,
  site_lat            REAL,
  site_lng            REAL,
  distance_miles      REAL,

  -- estimate (recalculated on the server)
  priced              INTEGER NOT NULL DEFAULT 0,
  estimate_total      REAL,
  price_sheet_version TEXT NOT NULL,

  plan_json           TEXT NOT NULL,               -- runs, gates, overrides
  options_json        TEXT NOT NULL,               -- everything chosen in step 2
  estimate_json       TEXT NOT NULL,               -- line items, review flags

  -- notification to Richard
  email_status        TEXT NOT NULL DEFAULT 'pending', -- pending | sent | failed | skipped
  email_error         TEXT,
  email_html          TEXT,                        -- kept when email is skipped (local dev)

  user_agent          TEXT
);
CREATE INDEX quotes_created ON quotes (created_at DESC);
CREATE INDEX quotes_status ON quotes (status, created_at DESC);

-- Internal notes for the future Quote Inbox
CREATE TABLE quote_notes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id   TEXT NOT NULL REFERENCES quotes(id),
  created_at TEXT NOT NULL,
  author     TEXT NOT NULL,
  body       TEXT NOT NULL
);
CREATE INDEX quote_notes_quote ON quote_notes (quote_id, created_at);
