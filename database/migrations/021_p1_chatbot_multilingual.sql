-- ============================================
-- P1.21: Chatbot Knowledge Expansion + Multilingual Readiness
-- ============================================
-- 1. Adds language column for future multilingual knowledge
-- 2. Adds chatbot knowledge for 17 entities missing coverage

-- Step 1: Add language column (idempotent)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'chatbot_knowledge' AND column_name = 'language'
  ) THEN
    ALTER TABLE chatbot_knowledge ADD COLUMN language VARCHAR(10) DEFAULT 'en';
    UPDATE chatbot_knowledge SET language = 'en' WHERE language IS NULL;
    ALTER TABLE chatbot_knowledge ALTER COLUMN language SET NOT NULL;
    CREATE INDEX IF NOT EXISTS idx_chatbot_knowledge_language ON chatbot_knowledge(language);
    -- Add unique constraint for ON CONFLICT support
    CREATE UNIQUE INDEX IF NOT EXISTS idx_chatbot_knowledge_entity_lang 
      ON chatbot_knowledge(heritage_entity_id, language) 
      WHERE heritage_entity_id IS NOT NULL;
  END IF;
END $$;

-- Step 2: Add knowledge entries for entities missing coverage
-- Uses ON CONFLICT (heritage_entity_id, language) DO NOTHING for idempotency

-- Bandhani (GJ, craft)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Bandhani', 'craft', 'GJ',
  'Bandhani is a traditional tie-dye textile technique from Gujarat and Rajasthan. The name comes from the Sanskrit word bandha meaning to tie. Skilled artisans create intricate patterns by tying thousands of tiny knots in fabric before dyeing it in vibrant colors.',
  'One of the oldest known forms of tie-dye, Bandhani is a living craft tradition practiced by communities across Gujarat. It is integral to Gujarati wedding traditions and festive attire.',
  ARRAY['bandhani', 'tie-dye', 'textile', 'gujarat', 'craft', 'bandhej', 'bandhani art'],
  ARRAY['Bandhej', 'Bandhani Art', 'Tie-Dye'],
  ARRAY['Tell me about Bandhani', 'How is Bandhani made', 'What is Bandhani tie-dye'],
  'c0000001-0000-0000-0000-000000000012', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Bhaona (AS, tradition)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Bhaona', 'tradition', 'AS',
  'Bhaona is a traditional form of entertainment with religious messages, performed in Assam using masks. It originated in the Vaishnavite monasteries of Majuli island and is closely associated with the Sattriya tradition.',
  'Bhaona preserves the ancient Assamese tradition of mask-making and dance-drama. It is performed during the Raas Leela festival and other religious occasions in Majuli.',
  ARRAY['bhaona', 'assam', 'dance', 'masks', 'majuli', 'sattriya', 'folk'],
  ARRAY['Bhaona Dance', 'Assamese Dance-Drama'],
  ARRAY['Tell me about Bhaona', 'What is Bhaona dance', 'Majuli masks and Bhaona'],
  'e0000001-0000-0000-0000-000000000025', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Chettiar Community (TN, community)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Chettiar Community', 'community', 'TN',
  'The Chettiar community is a prominent merchant and banking community from the Chettinad region of Tamil Nadu. They are known for their grand mansions, spicy cuisine, and entrepreneurial traditions spanning Southeast Asia.',
  'The Chettinad mansions are architectural marvels featuring Athangudi tiles, ornate woodwork, and imported materials. The community played a significant role in trade across Burma, Malaya, and Ceylon.',
  ARRAY['chettiar', 'chettinad', 'tamil nadu', 'community', 'merchants', 'mansions'],
  ARRAY['Chettiars', 'Nattukottai Chettiars'],
  ARRAY['Tell me about Chettiar Community', 'Who are the Chettiars', 'Chettinad mansions history'],
  'e0000001-0000-0000-0000-000000000053', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Eco-tourism at Satkosia (OD, eco_tourism)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Eco-tourism at Satkosia', 'eco_tourism', 'OD',
  'Satkosia Gorge in Odisha offers eco-tourism experiences along the Mahanadi River. The 22-kilometer gorge is home to diverse wildlife including crocodiles, gharials, and elephants.',
  'Satkosia is one of Odisha''s premier wildlife destinations, combining riverine ecology with dense forest. Eco-tourism here supports conservation while offering boat safaris and nature trails.',
  ARRAY['satkosia', 'eco-tourism', 'odisha', 'mahanadi', 'gorge', 'wildlife'],
  ARRAY['Satkosia Eco-Tourism', 'Satkosia Gorge Tourism'],
  ARRAY['What is eco-tourism at Satkosia', 'Tell me about Satkosia wildlife', 'Activities in Satkosia Gorge'],
  'e0000001-0000-0000-0000-000000000035', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Gujarati Thali (GJ, food)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Gujarati Thali', 'food', 'GJ',
  'A Gujarati Thali is a traditional meal served on a round plate with multiple small bowls. It typically includes dal, rice, rotli, shaak (vegetables), kadhi, pickle, papad, and sweets like shrikhand or mohanthal.',
  'The Gujarati Thali represents the diverse flavors of Gujarat — sweet, salty, spicy, and sour — all balanced in one meal. It reflects the vegetarian culinary tradition of the region.',
  ARRAY['gujarati thali', 'food', 'gujarat', 'cuisine', 'vegetarian', 'meal'],
  ARRAY['Gujarat Thali', 'Thali'],
  ARRAY['What is Gujarati Thali', 'Tell me about Gujarati food', 'What dishes are in a Gujarati Thali'],
  'c0000001-0000-0000-0000-000000000050', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Kite Festival / Uttarayan (GJ, festival)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Kite Festival (Uttarayan)', 'festival', 'GJ',
  'Uttarayan is Gujarat''s international kite festival celebrated on January 14-15 marking the transition of the sun into the zodiac sign of Capricorn. The sky fills with millions of colorful kites from dawn to dusk.',
  'Uttarayan is one of Gujarat''s most iconic celebrations, attracting kite enthusiasts from around the world. Ahmedabad hosts the International Kite Festival with participants from dozens of countries.',
  ARRAY['kite festival', 'uttarayan', 'gujarat', 'makar sankranti', 'kites', 'ahmedabad'],
  ARRAY['Uttarayan', 'Makar Sankranti', 'International Kite Festival'],
  ARRAY['Tell me about Uttarayan', 'What is the kite festival in Gujarat', 'When is Uttarayan celebrated'],
  'c0000001-0000-0000-0000-000000000031', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Meenmutty Falls (KL, waterfall)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Meenmutty Falls', 'waterfall', 'KL',
  'Meenmutty Falls is a three-tiered waterfall located in Wayanad, Kerala. Standing at about 300 meters, it is one of the largest waterfalls in Kerala and a popular trekking destination.',
  'The falls are nestled in dense tropical forest and require a trek through the Wayanad wilderness. The area is rich in biodiversity with endemic species of flora and fauna.',
  ARRAY['meenmutty', 'waterfall', 'kerala', 'wayanad', 'trekking', 'nature'],
  ARRAY['Meenmutty Waterfall'],
  ARRAY['Tell me about Meenmutty Falls', 'Where are Meenmutty Falls located', 'How to reach Meenmutty Falls'],
  'e0000001-0000-0000-0000-000000000003', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Monsoon Experience at Amboli (MH, adventure)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Monsoon Experience at Amboli', 'adventure', 'MH',
  'Amboli is a hill station on the Western Ghats in Maharashtra, known for its dramatic monsoon experience. The region receives heavy rainfall transforming the landscape into a lush green paradise with cascading waterfalls.',
  'Amboli offers one of the most spectacular monsoon experiences in Maharashtra. The Western Ghats biodiversity hotspot is home to rare species including the Amboli bush viper and numerous endemic frogs.',
  ARRAY['amboli', 'monsoon', 'maharashtra', 'waterfalls', 'hill station', 'western ghats'],
  ARRAY['Amboli Hill Station', 'Amboli Monsoon'],
  ARRAY['Tell me about Amboli', 'What is special about Amboli monsoon', 'Best time to visit Amboli'],
  'e0000001-0000-0000-0000-000000000042', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Muzhappilangad Beach (KL, beach)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Muzhappilangad Beach', 'beach', 'KL',
  'Muzhappilangad Beach in Kannur, Kerala is Asia''s longest drive-in beach. Visitors can drive along the 4-kilometer stretch of clean, golden sand with the Arabian Sea on one side.',
  'This beach is unique in Asia for its drive-in accessibility. The calm bay protected by a rocky outcrop makes it one of the safest beaches in Kerala for swimming and water sports.',
  ARRAY['muzhappilangad', 'beach', 'kerala', 'kannur', 'drive-in beach', 'arabian sea'],
  ARRAY['Muzhappilangad Drive-in Beach', 'Kannur Beach'],
  ARRAY['Tell me about Muzhappilangad Beach', 'Where is the drive-in beach in Kerala', 'Muzhappilangad Beach activities'],
  'e0000001-0000-0000-0000-000000000004', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Narsinh Mehta (GJ, person)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Narsinh Mehta', 'person', 'GJ',
  'Narsinh Mehta (1414-1481) was a Vaishnavite poet-saint from Gujarat, regarded as the premier poet of Gujarati literature. He composed devotional hymns including the famous bhajan Vaishnav Jan To.',
  'Vaishnav Jan To, composed by Narsinh Mehta, was Mahatma Gandhi''s favorite hymn and became a symbol of the Indian independence movement. He is honored as Gujarat''s state poet.',
  ARRAY['narsinh mehta', 'poet', 'gujarat', 'bhajan', 'vaishnav jan to', 'saint'],
  ARRAY['Narsinh Mehta', 'Narsinhbhai Mehta'],
  ARRAY['Who was Narsinh Mehta', 'Tell me about Narsinh Mehta', 'What did Narsinh Mehta write'],
  'c0000001-0000-0000-0000-000000000021', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Navratri (GJ, festival)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Navratri', 'festival', 'GJ',
  'Navratri is a nine-night Hindu festival celebrated across India, but Gujarat''s celebration with Garba and Dandiya Raas dances is world-famous. Millions gather in public grounds to dance through the night.',
  'Gujarat''s Navratri is the largest dance festival in the world. The nine nights of Garba and Dandiya Raas celebrate the feminine divine and Gujarat''s vibrant community spirit.',
  ARRAY['navratri', 'garba', 'gujarat', 'festival', 'dandiya', 'dance', 'nine nights'],
  ARRAY['Navratri Festival', 'Nine Nights Festival'],
  ARRAY['What is Navratri', 'Tell me about Navratri in Gujarat', 'How is Navratri celebrated'],
  'c0000001-0000-0000-0000-000000000030', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Rabari Community (GJ, community)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rabari Community', 'community', 'GJ',
  'The Rabari community are semi-nomadic pastoralists from Gujarat and Rajasthan. Known for their distinctive embroidered clothing, mirror work, and camel-herding traditions in the Kutch region.',
  'The Rabari are master embroiderers whose textile art is recognized globally. Their distinctive black attire with vibrant embroidery and mirror work represents centuries of cultural tradition in Kutch.',
  ARRAY['rabari', 'community', 'kutch', 'gujarat', 'embroidery', 'pastoral', 'nomadic'],
  ARRAY['Rabari', 'Rabari Pastoralists'],
  ARRAY['Tell me about Rabari Community', 'Who are the Rabaris of Kutch', 'Rabari embroidery tradition'],
  'c0000001-0000-0000-0000-000000000041', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Sabarmati Ashram (GJ, monument)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Sabarmati Ashram', 'monument', 'GJ',
  'Sabarmati Ashram is located on the banks of the Sabarmati River in Ahmedabad. It was the headquarters of Mahatma Gandhi''s freedom movement and served as his home from 1917 to 1930.',
  'From this ashram, Gandhi launched the historic Dandi Salt March in 1930. The ashram is now a museum housing Gandhi''s manuscripts, photographs, and personal belongings.',
  ARRAY['sabarmati ashram', 'ahmedabad', 'gandhi', 'monument', 'museum', 'freedom'],
  ARRAY['Gandhi Ashram', 'Satyagraha Ashram', 'Hriday Kunj'],
  ARRAY['Tell me about Sabarmati Ashram', 'What is the history of Sabarmati Ashram', 'Gandhi Ashram Ahmedabad'],
  'c0000001-0000-0000-0000-000000000004', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Salvi Community (GJ, community)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Salvi Community', 'community', 'GJ',
  'The Salvi community are traditional wood-carving artisans from Gujarat, particularly renowned for their intricate wooden temple and architectural carvings. They have practiced this craft for generations.',
  'The Salvi artisans are responsible for some of Gujarat''s finest wood-carvings seen in temples, havelis, and traditional buildings. Their craft represents a living tradition of skilled artisanal work.',
  ARRAY['salvi', 'community', 'wood carving', 'gujarat', 'artisans', 'craft'],
  ARRAY['Salvi Artisans', 'Salvi Carvers'],
  ARRAY['Tell me about Salvi Community', 'Who are the Salvi wood carvers', 'Gujarati wood carving tradition'],
  'c0000001-0000-0000-0000-000000000040', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Satkosia Tiger Reserve (OD, wildlife)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Satkosia Tiger Reserve', 'wildlife', 'OD',
  'Satkosia Tiger Reserve spans the Satkosia Gorge of the Mahanadi River in Odisha. It is home to tigers, elephants, gharials, and diverse wildlife in a mix of riverine and forest habitats.',
  'The reserve protects one of Odisha''s most important wildlife corridors. The Mahanadi gorge provides a unique ecosystem where riverine and forest habitats converge.',
  ARRAY['satkosia', 'tiger reserve', 'odisha', 'wildlife', 'mahanadi', 'gharial'],
  ARRAY['Satkosia Wildlife Sanctuary', 'Satkosia Conservation'],
  ARRAY['Tell me about Satkosia Tiger Reserve', 'What wildlife is in Satkosia', 'Satkosia tiger reserve safari'],
  'e0000001-0000-0000-0000-000000000032', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Solanki Temple Architecture (GJ, architecture)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Solanki Temple Architecture', 'architecture', 'GJ',
  'Solanki (Chalukya) temple architecture is a style of Hindu temple building that flourished in Gujarat from the 10th to 13th centuries. Notable examples include Modhera Sun Temple, Rani ki Vav, and numerous stepwells.',
  'The Solanki period was a golden age of Gujarati temple architecture. The intricate carvings, geometric precision, and fusion of styles created some of India''s finest architectural achievements.',
  ARRAY['solanki', 'architecture', 'temple', 'gujarat', 'chalukya', 'modhera', 'stepwell'],
  ARRAY['Solanki Architecture', 'Gujarat Temple Architecture', 'Chalukya Style'],
  ARRAY['What is Solanki architecture', 'Tell me about Gujarat temple architecture', 'Solanki period temples'],
  'c0000001-0000-0000-0000-000000000060', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;

-- Trekking in Gurez (JK, adventure)
INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Trekking in Gurez', 'adventure', 'JK',
  'Gurez Valley in Jammu & Kashmir offers pristine trekking routes through alpine meadows, along the Kishanganga River, and past traditional Dard-Shina villages. Popular treks include the Razdan Pass and Harmukh approaches.',
  'Gurez trekking provides access to some of the most unspoiled Himalayan landscapes in India. The valley is home to the Dard-Shina people and offers a unique cultural trekking experience.',
  ARRAY['gurez', 'trekking', 'kashmir', 'himalaya', 'adventure', 'kishanganga'],
  ARRAY['Gurez Trek', 'Gurez Valley Trek'],
  ARRAY['Tell me about trekking in Gurez', 'What treks are in Gurez Valley', 'Gurez Valley adventure activities'],
  'e0000001-0000-0000-0000-000000000014', 'en')
ON CONFLICT (heritage_entity_id, language) DO NOTHING;
