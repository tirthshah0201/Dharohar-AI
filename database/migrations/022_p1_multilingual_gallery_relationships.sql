-- ============================================
-- P1.22: Meaningful Relationships + Discovery
-- ============================================

-- Rajasthan cluster (Jaipur)
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000001', 'f0000001-0000-0000-0000-000000000020', 'f0000001-0000-0000-0000-000000000021', 'ASSOCIATED_WITH', 'Both are iconic landmarks of Jaipur, the Pink City of Rajasthan.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000002', 'f0000001-0000-0000-0000-000000000021', 'f0000001-0000-0000-0000-000000000022', 'ASSOCIATED_WITH', 'Both represent the rich artistic traditions of Jaipur, Rajasthan.')
ON CONFLICT DO NOTHING;

-- Gujarat cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000003', 'c0000001-0000-0000-0000-000000000001', 'ASSOCIATED_WITH', 'Both are UNESCO-recognized heritage sites showcasing ancient Gujarat civilizations.')
ON CONFLICT DO NOTHING;

-- Kerala cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000004', 'e0000001-0000-0000-0000-000000000010', 'ASSOCIATED_WITH', 'Both are coastal and natural attractions in Kerala linked to the North Malabar region.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000005', 'e0000001-0000-0000-0000-000000000005', 'e0000001-0000-0000-0000-000000000010', 'PRACTICED_BY', 'Malabar cuisine is the traditional food culture of the North Malabar region of Kerala.')
ON CONFLICT DO NOTHING;

-- Odisha cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000006', 'e0000001-0000-0000-0000-000000000031', 'e0000001-0000-0000-0000-000000000032', 'PART_OF', 'The Mahanadi River forms the Satkosia Gorge, one of Odisha most significant natural formations.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000007', 'e0000001-0000-0000-0000-000000000035', 'e0000001-0000-0000-0000-000000000032', 'ASSOCIATED_WITH', 'Eco-tourism at Satkosia operates within and around the Satkosia Tiger Reserve.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000008', 'e0000001-0000-0000-0000-000000000033', 'e0000001-0000-0000-0000-000000000036', 'ASSOCIATED_WITH', 'Konark Sun Temple and Tribal Heritage represent the diverse cultural traditions of Odisha.')
ON CONFLICT DO NOTHING;

-- J&K cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000009', 'e0000001-0000-0000-0000-000000000010', 'e0000001-0000-0000-0000-000000000011', 'PRACTICED_BY', 'The Dard-Shina people are the traditional inhabitants of the Gurez Valley in Kashmir.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000010', 'e0000001-0000-0000-0000-000000000010', 'e0000001-0000-0000-0000-000000000013', 'ASSOCIATED_WITH', 'Habba Khatoon Peak is an iconic landmark of the Gurez Valley named after the Kashmiri poetess.')
ON CONFLICT DO NOTHING;

INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000011', 'e0000001-0000-0000-0000-000000000012', 'e0000001-0000-0000-0000-000000000010', 'PART_OF', 'The Kishanganga River flows through Gurez Valley, shaping its geography and culture.')
ON CONFLICT DO NOTHING;

-- Assam cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000012', 'e0000001-0000-0000-0000-000000000026', 'e0000001-0000-0000-0000-000000000025', 'ASSOCIATED_WITH', 'Raas Leela Festival is the main occasion for Bhaona performances in Majuli, Assam.')
ON CONFLICT DO NOTHING;

-- Goa cluster
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000013', 'f0000001-0000-0000-0000-000000000222', 'f0000001-0000-0000-0000-000000000220', 'ASSOCIATED_WITH', 'Goa Carnival and Basilica of Bom Jesus both reflect the Portuguese cultural heritage of Goa.')
ON CONFLICT DO NOTHING;

-- Madhya Pradesh
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000014', 'f0000001-0000-0000-0000-000000000322', 'f0000001-0000-0000-0000-000000000320', 'ASSOCIATED_WITH', 'Gond Art and Khajuraho Temples both represent the rich cultural heritage of Madhya Pradesh.')
ON CONFLICT DO NOTHING;

-- Maharashtra
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000015', 'e0000001-0000-0000-0000-000000000042', 'e0000001-0000-0000-0000-000000000043', 'ASSOCIATED_WITH', 'The monsoon experience at Amboli showcases the Western Ghats biodiversity hotspot.')
ON CONFLICT DO NOTHING;

-- Delhi
INSERT INTO relationships (id, source_id, target_id, type, description) VALUES
('a2200001-0000-0000-0000-000000000016', 'f0000001-0000-0000-0000-000000000422', 'f0000001-0000-0000-0000-000000000420', 'ASSOCIATED_WITH', 'Chandni Chowk is the historic market adjacent to the Red Fort in Old Delhi.')
ON CONFLICT DO NOTHING;
