-- ============================================
-- Astrova P1.2A — Chatbot Knowledge Bridge
-- ============================================
-- Links chatbot_knowledge to heritage_entities
-- and locations via nullable foreign keys
-- Run: psql $DATABASE_URL -f database/migrations/006_p1_chatbot_bridge.sql
-- ============================================

-- ---- 1. Add nullable FK columns to chatbot_knowledge ----
-- These are nullable so existing data is not broken

ALTER TABLE chatbot_knowledge
  ADD COLUMN IF NOT EXISTS heritage_entity_id UUID
  REFERENCES heritage_entities(id) ON DELETE SET NULL;

ALTER TABLE chatbot_knowledge
  ADD COLUMN IF NOT EXISTS location_id UUID
  REFERENCES locations(id) ON DELETE SET NULL;

-- ---- 2. Add indexes for the new FK columns ----
CREATE INDEX IF NOT EXISTS idx_knowledge_heritage_entity ON chatbot_knowledge(heritage_entity_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_location ON chatbot_knowledge(location_id);

-- ---- 3. Populate heritage_entity_id for EXACT name matches ----
-- Only match where chatbot_knowledge.heritage_name EXACTLY equals heritage_entities.name
-- This is safe because we verified 31 exact matches

UPDATE chatbot_knowledge ck
SET heritage_entity_id = he.id
FROM heritage_entities he
WHERE LOWER(ck.heritage_name) = LOWER(he.name)
  AND ck.heritage_entity_id IS NULL;

-- ---- 4. Populate location_id from matched heritage_entities ----
-- For records that now have a heritage_entity_id, inherit its location_id

UPDATE chatbot_knowledge ck
SET location_id = he.location_id
FROM heritage_entities he
WHERE ck.heritage_entity_id = he.id
  AND ck.location_id IS NULL
  AND he.location_id IS NOT NULL;

-- ---- 5. Populate location_id from state_code for state-level records ----
-- Match chatbot_knowledge.state_code to locations where type='state'

UPDATE chatbot_knowledge ck
SET location_id = l.id
FROM locations l
WHERE LOWER(ck.state_code) = LOWER(l.state)
  AND l.type = 'state'
  AND ck.location_id IS NULL;

-- ---- 6. Verify bridge results ----
DO $$
DECLARE
  total INTEGER;
  with_entity INTEGER;
  with_location INTEGER;
  without_entity INTEGER;
BEGIN
  SELECT COUNT(*) INTO total FROM chatbot_knowledge;
  SELECT COUNT(*) INTO with_entity FROM chatbot_knowledge WHERE heritage_entity_id IS NOT NULL;
  SELECT COUNT(*) INTO with_location FROM chatbot_knowledge WHERE location_id IS NOT NULL;
  without_entity := total - with_entity;

  RAISE NOTICE 'Chatbot knowledge bridge results:';
  RAISE NOTICE '  Total records: %', total;
  RAISE NOTICE '  Linked to heritage_entity: %', with_entity;
  RAISE NOTICE '  Linked to location: %', with_location;
  RAISE NOTICE '  Without heritage_entity match: %', without_entity;

  IF without_entity > 0 THEN
    RAISE NOTICE '  (These are chatbot-only entries with no matching heritage_entity in the database)';
  END IF;
END $$;
