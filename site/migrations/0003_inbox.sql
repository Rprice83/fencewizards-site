-- Quote Inbox: one status pipeline for estimator quotes and form inquiries, plus notes and an activity log.

-- Inquiries move to the same statuses as quotes (new → contacted → quoted → won / lost).
-- SQLite can't change a CHECK constraint in place, so rebuild the table.
CREATE TABLE inquiries_new (
  id            TEXT PRIMARY KEY,
  created_at    TEXT NOT NULL,
  updated_at    TEXT,
  kind          TEXT NOT NULL CHECK (kind IN ('quick', 'contact')),
  status        TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),
  page          TEXT,
  name          TEXT NOT NULL,
  phone         TEXT,
  email         TEXT,
  location      TEXT,
  fence_style   TEXT,
  feet          REAL,
  duration      TEXT,
  message       TEXT,
  file_names    TEXT,
  email_status  TEXT NOT NULL DEFAULT 'pending',
  email_error   TEXT,
  email_html    TEXT,
  user_agent    TEXT
);
INSERT INTO inquiries_new (id, created_at, kind, status, page, name, phone, email, location, fence_style, feet, duration, message, file_names, email_status, email_error, email_html, user_agent)
  SELECT id, created_at, kind, CASE status WHEN 'closed' THEN 'lost' ELSE status END, page, name, phone, email, location, fence_style, feet, duration, message, file_names, email_status, email_error, email_html, user_agent
  FROM inquiries;
DROP TABLE inquiries;
ALTER TABLE inquiries_new RENAME TO inquiries;
CREATE INDEX inquiries_created ON inquiries (created_at DESC);
CREATE INDEX inquiries_status ON inquiries (status, created_at DESC);

ALTER TABLE quotes ADD COLUMN updated_at TEXT;

-- Replaces the unused quote_notes table: notes for either kind of item (ids are FW-… or FW-M-…)
DROP TABLE IF EXISTS quote_notes;
CREATE TABLE notes (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id    TEXT NOT NULL,
  created_at TEXT NOT NULL,
  author     TEXT NOT NULL,   -- staff email from Cloudflare Access
  body       TEXT NOT NULL
);
CREATE INDEX notes_item ON notes (item_id, created_at);

-- Who changed what, when
CREATE TABLE events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id    TEXT NOT NULL,
  created_at TEXT NOT NULL,
  actor      TEXT NOT NULL,
  action     TEXT NOT NULL,   -- status | note
  detail     TEXT
);
CREATE INDEX events_item ON events (item_id, created_at);
