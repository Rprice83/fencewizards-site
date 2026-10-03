-- Quick-quote and contact form submissions (every page's "Tell us about the job" form and /contact/)
CREATE TABLE inquiries (
  id            TEXT PRIMARY KEY,              -- e.g. FW-M-261002-7K3Q
  created_at    TEXT NOT NULL,
  kind          TEXT NOT NULL CHECK (kind IN ('quick', 'contact')),
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  page          TEXT,                          -- path the form was sent from
  name          TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  location      TEXT,
  fence_style   TEXT,
  feet          REAL,
  duration      TEXT,
  message       TEXT,
  file_names    TEXT,                          -- JSON array; files go to Richard as email attachments, not stored
  email_status  TEXT NOT NULL DEFAULT 'pending',
  email_error   TEXT,
  email_html    TEXT,
  user_agent    TEXT
);
CREATE INDEX inquiries_created ON inquiries (created_at DESC);
