-- Spam-check outcome for each request (server/spam-check.js): NULL = passed;
-- honeypot | blocked | setup-error | unreachable | not-checked = saved but flagged in the Quote Inbox.
ALTER TABLE quotes ADD COLUMN spam_check TEXT;
ALTER TABLE inquiries ADD COLUMN spam_check TEXT;
