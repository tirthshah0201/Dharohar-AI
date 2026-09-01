-- ============================================
-- Astrova P1 — Canonical Identity Migration
-- ============================================
-- Adds: slug columns to locations and heritage_entities
--        unique constraints, generation function
-- Run: psql $DATABASE_URL -f database/migrations/004_p1_canonical_ids.sql
-- ============================================

-- ---- 1. Create slug generation function ----
CREATE OR REPLACE FUNCTION generate_slug(input_text TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          TRIM(input_text),
          '[^a-zA-Z0-9\s-]', '', 'g'          -- remove non-alphanumeric (keep spaces/hyphens)
        ),
        '\s+', '-', 'g'                         -- replace spaces with hyphens
      ),
      '-+', '-', 'g'                            -- collapse multiple hyphens
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ---- 2. Add slug to locations ----
ALTER TABLE locations ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Populate slugs from existing names
UPDATE locations SET slug = generate_slug(name) WHERE slug IS NULL;

-- Add unique constraint
ALTER TABLE locations ADD CONSTRAINT locations_slug_unique UNIQUE (slug);

-- Add index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);

-- ---- 3. Add slug to heritage_entities ----
ALTER TABLE heritage_entities ADD COLUMN IF NOT EXISTS slug VARCHAR(255);

-- Populate slugs from existing names
UPDATE heritage_entities SET slug = generate_slug(name) WHERE slug IS NULL;

-- Handle potential collisions by appending location context
-- Check for duplicate slugs and disambiguate
DO $$
DECLARE
  rec RECORD;
  counter INTEGER;
  base_slug TEXT;
BEGIN
  FOR rec IN
    SELECT id, slug, name
    FROM heritage_entities
    WHERE slug IN (
      SELECT slug FROM heritage_entities GROUP BY slug HAVING COUNT(*) > 1
    )
    ORDER BY name
  LOOP
    -- Get the count of this slug
    SELECT COUNT(*) INTO counter
    FROM heritage_entities
    WHERE slug = rec.slug;

    IF counter > 1 THEN
      -- Find the position of this record among duplicates
      base_slug := rec.slug || '-' || (
        SELECT COUNT(*)
        FROM heritage_entities e2
        WHERE e2.slug = rec.slug AND e2.id <= rec.id
      );
      UPDATE heritage_entities SET slug = base_slug WHERE id = rec.id;
    END IF;
  END LOOP;
END $$;

-- Add unique constraint
ALTER TABLE heritage_entities ADD CONSTRAINT heritage_entities_slug_unique UNIQUE (slug);

-- Add index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_heritage_slug ON heritage_entities(slug);

-- ---- 4. Verify slugs populated ----
DO $$
DECLARE
  loc_count INTEGER;
  her_count INTEGER;
  loc_null INTEGER;
  her_null INTEGER;
BEGIN
  SELECT COUNT(*) INTO loc_count FROM locations;
  SELECT COUNT(*) INTO loc_null FROM locations WHERE slug IS NULL;
  SELECT COUNT(*) INTO her_count FROM heritage_entities;
  SELECT COUNT(*) INTO her_null FROM heritage_entities WHERE slug IS NULL;

  RAISE NOTICE 'Locations: % total, % without slug', loc_count, loc_null;
  RAISE NOTICE 'Heritage entities: % total, % without slug', her_count, her_null;

  IF loc_null > 0 OR her_null > 0 THEN
    RAISE WARNING 'Some records still lack slugs — review data quality';
  END IF;
END $$;
