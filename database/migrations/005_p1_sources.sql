-- ============================================
-- Astrova P1.2A — Source System Migration
-- ============================================
-- Extends sources table with proper schema
-- Populates source records from chatbot_knowledge data
-- Run: psql $DATABASE_URL -f database/migrations/005_p1_sources.sql
-- ============================================

-- ---- 1. Extend sources table ----
ALTER TABLE sources ADD COLUMN IF NOT EXISTS source_type VARCHAR(50) DEFAULT 'OTHER'
  CHECK (source_type IN (
    'OFFICIAL', 'GOVERNMENT', 'UNESCO', 'ASI', 'TOURISM',
    'ACADEMIC', 'MUSEUM', 'ARCHIVE', 'NEWS', 'CULTURAL_INSTITUTION', 'OTHER'
  ));

ALTER TABLE sources ADD COLUMN IF NOT EXISTS verification_status VARCHAR(20) DEFAULT 'UNVERIFIED'
  CHECK (verification_status IN ('UNVERIFIED', 'REVIEWED', 'VERIFIED'));

ALTER TABLE sources ADD COLUMN IF NOT EXISTS publisher VARCHAR(255);
ALTER TABLE sources ADD COLUMN IF NOT EXISTS retrieved_date DATE;
ALTER TABLE sources ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- ---- 2. Populate sources from chatbot_knowledge distinct values ----
-- These are the verified source strings found in chatbot_knowledge.source

INSERT INTO sources (title, source_type, verification_status, publisher, notes) VALUES
  ('UNESCO World Heritage List', 'UNESCO', 'VERIFIED', 'UNESCO', 'Primary source for World Heritage Site information'),
  ('Archaeological Survey of India', 'ASI', 'VERIFIED', 'Government of India', 'Official archaeological authority for India'),
  ('Gujarat Tourism', 'TOURISM', 'REVIEWED', 'Government of Gujarat', 'Official state tourism department'),
  ('Rajasthan Tourism', 'TOURISM', 'REVIEWED', 'Government of Rajasthan', 'Official state tourism department'),
  ('Punjab Tourism', 'TOURISM', 'REVIEWED', 'Government of Punjab', 'Official state tourism department'),
  ('Goa Tourism', 'TOURISM', 'REVIEWED', 'Government of Goa', 'Official state tourism department'),
  ('Tamil Nadu Tourism', 'TOURISM', 'REVIEWED', 'Government of Tamil Nadu', 'Official state tourism department'),
  ('Maharashtra Tourism', 'TOURISM', 'REVIEWED', 'Government of Maharashtra', 'Official state tourism department'),
  ('Madhya Pradesh Tourism', 'TOURISM', 'REVIEWED', 'Government of Madhya Pradesh', 'Official state tourism department'),
  ('Delhi Tourism', 'TOURISM', 'REVIEWED', 'Government of Delhi', 'Official state tourism department'),
  ('Kerala Tourism', 'TOURISM', 'REVIEWED', 'Government of Kerala', 'Official state tourism department'),
  ('Kashmir Tourism', 'TOURISM', 'REVIEWED', 'Government of Jammu & Kashmir', 'Official state tourism department'),
  ('Assam Tourism', 'TOURISM', 'REVIEWED', 'Government of Assam', 'Official state tourism department'),
  ('Odisha Tourism', 'TOURISM', 'REVIEWED', 'Government of Odisha', 'Official state tourism department'),
  ('Geographical Indications Registry', 'GOVERNMENT', 'VERIFIED', 'Government of India', 'Official GI registry for Indian products'),
  ('Gandhi Ashram Trust', 'CULTURAL_INSTITUTION', 'REVIEWED', 'Gandhi Ashram Trust', 'Managing trust for Sabarmati Ashram'),
  ('Shiromani Gurdwara Parbandhak Committee', 'CULTURAL_INSTITUTION', 'VERIFIED', 'SGPC', 'Managing body of Golden Temple and Sikh gurdwaras'),
  ('Satkosia Tiger Reserve Authority', 'GOVERNMENT', 'VERIFIED', 'Government of Odisha', 'Official authority for Satkosia Tiger Reserve')
ON CONFLICT DO NOTHING;

-- ---- 3. Add index on source_type for filtering ----
CREATE INDEX IF NOT EXISTS idx_sources_type ON sources(source_type);
CREATE INDEX IF NOT EXISTS idx_sources_verification ON sources(verification_status);

-- ---- 4. Verify ----
DO $$
DECLARE
  source_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO source_count FROM sources;
  RAISE NOTICE 'Sources table: % records', source_count;
END $$;
