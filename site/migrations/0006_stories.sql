-- Field Notes intake: job stories Richard sends from the staff area (answers + photos in R2).
-- A story is drafted and published by a person (FIELD-NOTES.md); nothing here is public.
CREATE TABLE stories (
  id           TEXT PRIMARY KEY,                 -- e.g. FN-261005-7K3Q
  created_at   TEXT NOT NULL,
  updated_at   TEXT,
  author       TEXT NOT NULL,                    -- staff name from Cloudflare Access
  status       TEXT NOT NULL DEFAULT 'uploading'
               CHECK (status IN ('uploading', 'submitted', 'drafted', 'published', 'archived')),
  quote_id     TEXT,                             -- optional link to a won quote / inquiry
  answers_json TEXT NOT NULL,                    -- the questionnaire (server/stories.js cleanAnswers)
  photos_json  TEXT NOT NULL DEFAULT '[]',       -- [{ n, key, name, type, size }]
  email_status TEXT
);
CREATE INDEX stories_created ON stories (created_at DESC);
