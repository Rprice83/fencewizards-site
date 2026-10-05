-- Where each request came from (Google Ads click id, campaign, referring site) and,
-- once Richard marks it won, what the job was worth. Used to report which ads bring jobs.
ALTER TABLE quotes ADD COLUMN source_json TEXT;   -- cleaned by public/js/source.js
ALTER TABLE quotes ADD COLUMN heard_about TEXT;   -- "How did you hear about us?" (optional)
ALTER TABLE quotes ADD COLUMN won_value REAL;     -- job amount entered when marked won
ALTER TABLE quotes ADD COLUMN won_at TEXT;

ALTER TABLE inquiries ADD COLUMN source_json TEXT;
ALTER TABLE inquiries ADD COLUMN heard_about TEXT;
ALTER TABLE inquiries ADD COLUMN won_value REAL;
ALTER TABLE inquiries ADD COLUMN won_at TEXT;
