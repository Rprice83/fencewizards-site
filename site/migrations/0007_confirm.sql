-- Customer confirmation email outcome: sent | failed: … | skipped | no-email
ALTER TABLE quotes ADD COLUMN confirm_status TEXT;
ALTER TABLE inquiries ADD COLUMN confirm_status TEXT;
