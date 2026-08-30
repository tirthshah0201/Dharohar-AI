-- ============================================
-- Heritage Atlas — Regional Expansion Migration
-- ============================================
-- Adds: 4 new states, extended categories/types,
--        natural feature support, eco-tourism
-- Run: psql $DATABASE_URL -f database/migrations/003_regional_expansion.sql
-- ============================================

-- ---- 1. Extend location types to include natural features ----
-- Drop old CHECK constraint and add new one
ALTER TABLE locations DROP CONSTRAINT IF EXISTS locations_type_check;
ALTER TABLE locations ADD CONSTRAINT locations_type_check
    CHECK (type IN (
        'state', 'district', 'city', 'village', 'site',
        'region', 'river', 'waterfall', 'forest', 'wildlife_area',
        'mountain', 'beach', 'backwater', 'gorge', 'lake'
    ));

-- ---- 2. Extend heritage categories to include natural features ----
ALTER TABLE heritage_entities DROP CONSTRAINT IF EXISTS heritage_entities_category_check;
ALTER TABLE heritage_entities ADD CONSTRAINT heritage_entities_category_check
    CHECK (category IN (
        'monument', 'person', 'craft', 'tradition', 'festival',
        'architecture', 'event', 'food', 'community',
        'river', 'waterfall', 'forest', 'wildlife', 'mountain',
        'beach', 'backwater', 'gorge', 'eco_tourism', 'adventure',
        'natural_landmark', 'cultural_site', 'lake'
    ));

-- ---- 3. Extend relationship types ----
ALTER TABLE relationships DROP CONSTRAINT IF EXISTS relationships_type_check;
ALTER TABLE relationships ADD CONSTRAINT relationships_type_check
    CHECK (type IN (
        'LOCATED_IN', 'LOCATED_AT', 'ASSOCIATED_WITH', 'USED_TECHNIQUE',
        'PART_OF', 'OCCURRED_DURING', 'PRACTICED_BY', 'INFLUENCED_BY',
        'BUILT_BY', 'OCCURRED_IN',
        'FLOWS_THROUGH', 'FORMS', 'INHABITED_BY', 'PRESERVED_BY',
        'TRADITIONAL_TO', 'FAMOUS_FOR', 'CONNECTED_TO'
    ));

-- ---- 4. Add 4 new states (preserve all existing) ----
INSERT INTO supported_states (name, code, region, description, is_primary, display_order) VALUES
('Kerala', 'KL', 'South', 'Tropical Malabar Coast state known for backwaters, beaches, Ayurveda, Theyyam, and diverse cultural traditions.', FALSE, 9),
('Jammu & Kashmir', 'JK', 'North', 'Northernmost union territory with Himalayan landscapes, Dard-Shina culture, pristine valleys, and Mughal heritage.', FALSE, 10),
('Assam', 'AS', 'Northeast', 'Northeastern state known for tea, the Brahmaputra River, one-horned rhinoceros, and Majuli river island.', FALSE, 11),
('Odisha', 'OD', 'East', 'Eastern state with ancient Kalinga temples, tribal culture, Satkosia Gorge, Chilika Lake, and rich handicrafts.', FALSE, 12)
ON CONFLICT (code) DO NOTHING;

-- ---- 5. Add historical periods for new states ----
INSERT INTO historical_periods (id, name, start_year, end_year, description) VALUES
('a0000001-0000-0000-0000-000000000006', 'Chera/Chola Period', -300, 1200, 'Ancient and medieval period of South Indian dynasties including the Cheras of Kerala and Cholas of Tamil Nadu.'),
('a0000001-0000-0000-0000-000000000007', 'Sultanate/Kashmir Period', 1300, 1586, 'Period of Kashmir Sultanate and various local dynasties before Mughal conquest.'),
('a0000001-0000-0000-0000-000000000008', 'Ahom Period', 1228, 1826, 'Period of Ahom dynasty rule in Assam, spanning over 600 years.'),
('a0000001-0000-0000-0000-000000000009', 'Kalinga Period', -261, 1500, 'Period of Kalinga kingdom and subsequent Odisha dynasties including Ganga and Gajapati.')
ON CONFLICT (id) DO NOTHING;
