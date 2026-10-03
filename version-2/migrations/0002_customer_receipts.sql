ALTER TABLE quotes ADD COLUMN receipt_nonce TEXT;
ALTER TABLE quotes ADD COLUMN receipt_expires_at TEXT;
ALTER TABLE quotes ADD COLUMN receipt_revoked_at TEXT;
ALTER TABLE quotes ADD COLUMN customer_notification_status TEXT NOT NULL DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN customer_notification_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE quotes ADD COLUMN customer_notification_updated_at TEXT;
