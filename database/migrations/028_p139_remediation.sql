-- ============================================
-- Astrova Migration 028 — P1.39 Remediation
-- ============================================
-- 1. users.token_version: JWT revocation support (BUG-005)
-- 2. Backfill 11 NULL location slugs (BUG-003)
-- 3. Restore Adalaj Stepwell description from verified
--    project content (migration 014) (BUG-002)
-- 4. Add unique constraint on users.email if missing (safety)
-- Idempotent: safe to run multiple times.
-- ============================================

-- 1. token_version column for JWT revocation
ALTER TABLE users ADD COLUMN IF NOT EXISTS token_version INTEGER NOT NULL DEFAULT 0;

-- 2. Backfill NULL location slugs (deterministic from name).
-- Verified against live data 2026-09-06: no collisions with existing slugs.
UPDATE locations SET slug = 'jaipur' WHERE slug IS NULL AND name = 'Jaipur';
UPDATE locations SET slug = 'rajasthan' WHERE slug IS NULL AND name = 'Rajasthan';
UPDATE locations SET slug = 'punjab' WHERE slug IS NULL AND name = 'Punjab';
UPDATE locations SET slug = 'goa' WHERE slug IS NULL AND name = 'Goa';
UPDATE locations SET slug = 'madhya-pradesh' WHERE slug IS NULL AND name = 'Madhya Pradesh';
UPDATE locations SET slug = 'delhi' WHERE slug IS NULL AND name = 'Delhi';
UPDATE locations SET slug = 'new-delhi' WHERE slug IS NULL AND name = 'New Delhi';
UPDATE locations SET slug = 'north-goa' WHERE slug IS NULL AND name = 'North Goa';
UPDATE locations SET slug = 'amritsar' WHERE slug IS NULL AND name = 'Amritsar';
UPDATE locations SET slug = 'chhatarpur' WHERE slug IS NULL AND name = 'Chhatarpur';
UPDATE locations SET slug = 'raisen' WHERE slug IS NULL AND name = 'Raisen';

-- Safety net: any remaining NULL slugs get a deterministic generated one.
UPDATE locations
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL AND name IS NOT NULL;
UPDATE locations
SET slug = slug || '-' || LEFT(id::text, 8)
WHERE slug IS NULL;

-- 3. Restore Adalaj Stepwell description (content from migration 014 — verified project content)
UPDATE heritage_entities
SET description = 'Adalaj Stepwell (Adalaj ni Vav) is an intricately carved five-story stepwell located in Adalaj village near Ahmedabad, Gujarat. Built in 1498 by Queen Rudabai, the wife of Vaghela chief Rana Veer Singh, it served as both a water source and a retreat from the harsh Gujarat heat. The stepwell features remarkable Indo-Islamic architecture with detailed floral motifs, geometric patterns, and scenes from daily life carved in sandstone. The octagonal structure descends approximately 20 meters, with each level offering shelter and cool respite.'
WHERE slug = 'adalaj-stepwell' AND (description IS NULL OR LENGTH(TRIM(description)) = 0);

-- 4. Unique email constraint (already existed as index in practice; make explicit if absent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_email_unique'
  ) AND NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'users_email_unique'
  ) THEN
    ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
  END IF;
END $$;
