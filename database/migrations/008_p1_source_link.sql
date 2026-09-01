-- ============================================
-- Astrova P1.4 — Source Link Migration
-- ============================================
-- Adds source_id to heritage_entities
-- Populates from chatbot_knowledge source text
-- ============================================

-- ---- 1. Add source_id to heritage_entities ----
ALTER TABLE heritage_entities ADD COLUMN IF NOT EXISTS source_id UUID REFERENCES sources(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_heritage_source ON heritage_entities(source_id);

-- ---- 2. Create a mapping of chatbot_knowledge source text to sources.id ----
-- First, normalize the source text values

DO $$
DECLARE
  rec RECORD;
  src_id UUID;
BEGIN
  -- For each chatbot_knowledge record with a source and heritage_entity_id
  FOR rec IN
    SELECT ck.id, ck.source, ck.heritage_entity_id
    FROM chatbot_knowledge ck
    WHERE ck.source IS NOT NULL
      AND ck.source != ''
      AND ck.heritage_entity_id IS NOT NULL
  LOOP
    -- Find matching source by normalized title
    SELECT s.id INTO src_id
    FROM sources s
    WHERE LOWER(s.title) = LOWER(rec.source)
       OR LOWER(s.title) LIKE '%' || LOWER(rec.source) || '%'
       OR LOWER(rec.source) LIKE '%' || LOWER(s.title) || '%'
    LIMIT 1;
    
    -- If no exact match, try common normalizations
    IF src_id IS NULL THEN
      IF LOWER(rec.source) = 'unesco' OR LOWER(rec.source) = 'unesco tentative list' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'UNESCO World Heritage List' LIMIT 1;
      ELSIF LOWER(rec.source) = 'asi' OR LOWER(rec.source) = 'archaeological survey of india' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Archaeological Survey of India' LIMIT 1;
      ELSIF LOWER(rec.source) = 'sgpc' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Shiromani Gurdwara Parbandhak Committee' LIMIT 1;
      ELSIF LOWER(rec.source) = 'gi registry india' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Geographical Indications Registry' LIMIT 1;
      ELSIF LOWER(rec.source) = 'kashmir tourism official' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Kashmir Tourism' LIMIT 1;
      ELSIF LOWER(rec.source) = 'mp tourism' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Madhya Pradesh Tourism' LIMIT 1;
      ELSIF LOWER(rec.source) = 'satkosia tiger reserve' THEN
        SELECT id INTO src_id FROM sources WHERE title = 'Satkosia Tiger Reserve Authority' LIMIT 1;
      END IF;
    END IF;
    
    -- Update the heritage entity with the source link
    IF src_id IS NOT NULL THEN
      UPDATE heritage_entities SET source_id = src_id WHERE id = rec.heritage_entity_id;
    END IF;
  END LOOP;
END $$;

-- ---- 3. Verify ----
DO $$
DECLARE
  total INTEGER;
  with_source INTEGER;
BEGIN
  SELECT COUNT(*) INTO total FROM heritage_entities;
  SELECT COUNT(*) INTO with_source FROM heritage_entities WHERE source_id IS NOT NULL;
  RAISE NOTICE 'Heritage entities: % total, % with source attribution', total, with_source;
END $$;
