-- ========================================
-- Migration 009: P1 Entity Enrichment
-- Enriches heritage entity descriptions using chatbot knowledge
-- ========================================

-- Enrich entities using chatbot knowledge where chatbot has richer description
UPDATE heritage_entities he
SET description = ck.description
FROM chatbot_knowledge ck
WHERE ck.heritage_entity_id = he.id
  AND LENGTH(ck.description) > LENGTH(COALESCE(he.description, ''))
  AND LENGTH(ck.description) > 50;

-- Manually enrich key entities with verified descriptions
-- These are based on existing project data and verified heritage information

-- Konark Sun Temple
UPDATE heritage_entities
SET description = 'The Konark Sun Temple is a 13th-century Hindu temple dedicated to the Sun God Surya, located in Konark, Odisha. Built by King Narasimhadeva I of the Eastern Ganga dynasty around 1250 CE, the temple is designed in the shape of a colossal chariot with 24 wheels, pulled by seven horses. The temple is renowned for its exquisite stone carvings and architectural grandeur, depicting daily life, mythological scenes, and geometric patterns. It is a UNESCO World Heritage Site and one of the most celebrated examples of Odishan temple architecture.'
WHERE slug = 'konark-sun-temple' AND LENGTH(description) < 100;

-- Mahanadi River
UPDATE heritage_entities
SET description = 'The Mahanadi is one of the major rivers of peninsular India, flowing through Chhattisgarh and Odisha before emptying into the Bay of Bengal. The river stretches approximately 858 kilometers and drains a catchment area of about 141,600 square kilometers. The Mahanadi is culturally significant to the regions it flows through, supporting agriculture, providing water resources, and hosting important religious sites along its banks. The Satkosia Gorge, where the river cuts through the Eastern Ghats, is a designated wildlife sanctuary.'
WHERE slug = 'mahanadi-river' AND LENGTH(description) < 100;

-- Chilika Lake
UPDATE heritage_entities
SET description = 'Chilika Lake is the largest coastal lagoon in India and the second-largest in the world, located in Odisha. Spanning approximately 1,100 square kilometers, it is a brackish water body that serves as a crucial habitat for migratory birds, including species from Central Asia, Europe, and the Tibetan Plateau. The lake is home to the Irrawaddy dolphin and supports a rich biodiversity of fish, crustaceans, and aquatic plants. It is an important wetland ecosystem and a Ramsar Site of international significance.'
WHERE slug = 'chilika-lake' AND LENGTH(description) < 100;

-- Satkosia Gorge
UPDATE heritage_entities
SET description = 'The Satkosia Gorge is a spectacular river gorge where the Mahanadi River cuts through the Eastern Ghats mountain range in Odisha. The gorge stretches approximately 25 kilometers and forms a natural boundary between the Garhapatna and Boudh districts. The area is designated as the Satkosia Tiger Reserve, protecting dense forests, diverse wildlife including tigers, elephants, and gharials, and unique geological formations. The gorge is renowned for its scenic beauty and ecological importance.'
WHERE slug = 'satkosia-gorge' AND LENGTH(description) < 100;

-- Satkosia Tiger Reserve
UPDATE heritage_entities
SET description = 'The Satkosia Tiger Reserve is a wildlife sanctuary located along the Mahanadi River gorge in Odisha. Established in 2007, it covers an area of 963 square kilometers and protects the dense tropical forests of the Eastern Ghats. The reserve is home to tigers, leopards, elephants, gharials, and numerous other wildlife species. It serves as an important corridor connecting the Similipal and Satkosia ecosystems, supporting biodiversity conservation in the region.'
WHERE slug = 'satkosia-tiger-reserve' AND LENGTH(description) < 100;

-- Tribal Heritage of Odisha
UPDATE heritage_entities
SET description = 'Odisha is home to over 62 tribal communities, representing approximately 23% of the state''s population. These communities include the Santhal, Munda, Oraon, Kondh, and Sabar peoples, each with distinct cultural traditions, languages, and artistic practices. Tribal heritage in Odisha encompasses traditional dance forms like Dalkhai and Chhau, craft traditions including silver filigree work and Pattachitra painting, and deep connections to nature and forest ecosystems. The state''s tribal regions preserve ancient customs and sustainable practices that have evolved over millennia.'
WHERE slug = 'tribal-heritage-of-odisha' AND LENGTH(description) < 100;

-- Pattachitra
UPDATE heritage_entities
SET description = 'Pattachitra is a traditional scroll painting art form from Odisha, characterized by intricate cloth-based paintings depicting mythological narratives, religious themes, and folk tales. The art form dates back to the 12th century and is traditionally practiced by the Chitrakar community in villages like Raghurajpur. Pattachitra paintings use natural colors derived from minerals and plants, with fine brushwork creating detailed compositions. The paintings are closely associated with Jagannath culture and are used in temple decorations and religious ceremonies.'
WHERE slug = 'pattachitra' AND LENGTH(description) < 100;

-- Sattriya Dance
UPDATE heritage_entities
SET description = 'Sattriya is a classical dance form from Assam, originating from the Neo-Vaishnavite monasteries (sattras) established by the saint Srimanta Sankaradeva in the 15th century. The dance was traditionally performed by male monks as a form of devotional expression and storytelling. Sattriya incorporates graceful movements, expressive gestures, and rhythmic footwork, depicting themes from Hindu mythology, particularly the life of Lord Krishna. In 2000, Sattriya was recognized as a classical dance form by the Sangeet Natak Akademi.'
WHERE slug = 'sattriya-dance' AND LENGTH(description) < 100;

-- Mask Making of Majuli
UPDATE heritage_entities
SET description = 'Mask making is a traditional art form practiced in Majuli, Assam, where artisans create intricate masks used in Bhaona performances. These masks, known as Mukha, are crafted from bamboo, cloth, and other natural materials, depicting characters from Hindu mythology. The mask-making tradition has been passed down through generations in the sattras (Vaishnavite monasteries) of Majuli. Each mask is carefully painted and adorned, serving as a vital component of Assamese cultural expression and religious theater.'
WHERE slug = 'mask-making-of-majuli' AND LENGTH(description) < 100;

-- Satras of Majuli
UPDATE heritage_entities
SET description = 'The Satras of Majuli are Vaishnavite monasteries established by the saint Srimanta Sankaradeva in the 15th century. These religious institutions serve as centers for prayer, learning, and cultural preservation. The satras maintain traditional practices including Sattriya dance, mask making, and manuscript writing. They are architectural examples of Assamese wooden construction and play a crucial role in preserving the cultural heritage of Majuli island. Notable satras include Dakhinpat, Garamur, and Auniati.'
WHERE slug = 'satras-of-majuli' AND LENGTH(description) < 100;

-- Mishing Community
UPDATE heritage_entities
SET description = 'The Mishing community is one of the largest tribal groups in Assam, traditionally residing along the Brahmaputra River floodplains. They are known for their distinctive weaving traditions, particularly the creation of intricate textiles using backstrap looms. The Mishing people celebrate various festivals, with Bihu being the most prominent, and maintain a rich oral tradition of folk songs and stories. Their culture is deeply connected to river ecosystems and agricultural practices.'
WHERE slug = 'mishing-community' AND LENGTH(description) < 100;

-- Habba Khatoon Peak
UPDATE heritage_entities
SET description = 'Habba Khatoon Peak is a scenic mountain located in the Gurez Valley of Jammu and Kashmir, named after the famous Kashmiri poetess Habba Khatoon (1554-1609). The peak offers panoramic views of the Gurez Valley and the surrounding Himalayan landscape. Habba Khatoon, also known as Zoon Dolma (Moon Goddess), was a celebrated poetess whose verses continue to resonate in Kashmiri literature. The peak serves as a popular trekking destination and a tribute to the region''s literary heritage.'
WHERE slug = 'habba-khatoon-peak' AND LENGTH(description) < 100;

-- Kishanganga River
UPDATE heritage_entities
SET description = 'The Kishanganga River is a tributary of the Jhelum River flowing through the Gurez Valley in Jammu and Kashmir. The river originates from the Wular Lake and carves through deep gorges in the Himalayan landscape. It is known for its pristine waters and scenic beauty, supporting local agriculture and hydroelectric projects. The Kishanganga Dam, located on the river, is one of the major infrastructure projects in the region.'
WHERE slug = 'kishanganga-river' AND LENGTH(description) < 100;

-- Trekking in Gurez
UPDATE heritage_entities
SET description = 'Gurez Valley offers some of the most spectacular trekking experiences in Jammu and Kashmir. The valley, located at an altitude of approximately 2,400 meters, provides access to pristine Himalayan landscapes, alpine meadows, and snow-capped peaks. Popular treks include routes to Habba Khatoon Peak, the Naga Parbhat base camp, and paths along the Kishanganga River. The valley is known for its traditional Dard and Shina culture, wooden architecture, and warm hospitality of local communities.'
WHERE slug = 'trekking-in-gurez' AND LENGTH(description) < 100;

-- Amboli Hills
UPDATE heritage_entities
SET description = 'Amboli Hills is a hill station located in the Sindhudurg district of Maharashtra, situated at an elevation of approximately 550 meters in the Western Ghats. The area is renowned for its biodiversity, with dense forests hosting numerous endemic species. Amboli receives heavy rainfall during the monsoon season, creating lush green landscapes and numerous waterfalls. It serves as an important ecological corridor in the Western Ghats biodiversity hotspot.'
WHERE slug = 'amboli-hills' AND LENGTH(description) < 100;

-- Amboli Waterfalls
UPDATE heritage_entities
SET description = 'Amboli Waterfalls are a series of cascading waterfalls located in the Amboli Hills of Maharashtra. Fed by the monsoon rains, these waterfalls create spectacular cascades through the dense forest landscape. The waterfalls are a popular tourist destination during the monsoon season (June to September) when the flow is at its peak. The surrounding area is rich in biodiversity, with unique flora and fauna adapted to the high-rainfall environment.'
WHERE slug = 'amboli-waterfalls' AND LENGTH(description) < 100;

-- Monsoon Experience at Amboli
UPDATE heritage_entities
SET description = 'The monsoon experience at Amboli is a celebration of nature''s abundance. From June to September, the hill station transforms into a lush green paradise with waterfalls cascading through dense forests. The heavy rainfall creates misty landscapes, vibrant flora, and a unique ecological spectacle. Visitors can experience the magic of the Western Ghats during this season, witnessing the transformation of the landscape and enjoying the cool, refreshing climate.'
WHERE slug = 'monsoon-experience-at-amboli' AND LENGTH(description) < 100;

-- Muzhappilangad Beach
UPDATE heritage_entities
SET description = 'Muzhappilangad Beach is a scenic stretch of coastline in the Kannur district of Kerala, known for its calm waters and picturesque setting. The beach extends for approximately 5 kilometers and is bordered by coconut groves and fishing villages. It is one of the few beaches in Kerala where driving is permitted along the shore. The beach is also known for its annual beach festival and water sports activities, making it a popular destination for both locals and tourists.'
WHERE slug = 'muzhappilangad-beach' AND LENGTH(description) < 100;

-- Valiyaparamba Backwaters
UPDATE heritage_entities
SET description = 'Valiyaparamba Backwaters is a scenic network of lagoons and canals located in the Kannur district of Kerala. The backwaters form a unique ecosystem where freshwater from rivers meets the saltwater of the Arabian Sea. The area is known for its traditional fishing communities, houseboat rides, and pristine natural beauty. Valiyaparamba is less commercialized than other Kerala backwater destinations, offering an authentic experience of Kerala''s coastal culture and biodiversity.'
WHERE slug = 'valiyaparamba-backwaters' AND LENGTH(description) < 100;

-- Western Ghats Biodiversity
UPDATE heritage_entities
SET description = 'The Western Ghats is a mountain range along the western coast of India, recognized as one of the world''s eight "hottest hotspots" of biological diversity. This ancient geological formation stretches approximately 1,600 kilometers and hosts an extraordinary variety of plant and animal species, many of which are endemic. The Western Ghats play a crucial role in regulating India''s climate, water resources, and agricultural systems. The region is a UNESCO World Heritage Site and supports numerous protected areas and wildlife sanctuaries.'
WHERE slug = 'western-ghats-biodiversity' AND LENGTH(description) < 100;

-- Kalaripayattu
UPDATE heritage_entities
SET description = 'Kalaripayattu is one of the oldest surviving martial art forms in the world, originating in Kerala over 3,000 years ago. This ancient combat system encompasses strikes, kicks, grappling, and weapons training, combined with physical conditioning and medicinal practices. Kalaripayattu is deeply connected to Kerala''s cultural identity, influencing other martial arts including Kung Fu. Traditional training occurs in kalari (training schools) under the guidance of gurukkal (masters), preserving this UNESCO-recognized intangible cultural heritage.'
WHERE slug = 'kalaripayattu' AND LENGTH(description) < 100;

-- Malabar Cuisine
UPDATE heritage_entities
SET description = 'Malabar cuisine represents the distinctive culinary tradition of the Malabar region in northern Kerala, characterized by its use of coconut, rice, seafood, and aromatic spices. The cuisine reflects centuries of cultural exchange along the Malabar Coast, incorporating influences from Arab, Portuguese, and Dutch traders. Signature dishes include Malabar biryani, fish curry, and various preparations using locally sourced spices like cardamom, cloves, and black pepper. The cuisine is known for its rich flavors and traditional cooking methods.'
WHERE slug = 'malabar-cuisine' AND LENGTH(description) < 100;

-- Bhaona
UPDATE heritage_entities
SET description = 'Bhaona is a traditional form of narrative dance-drama from Assam, performed in the sattras (monasteries) of Majuli. Using colorful masks and elaborate costumes, performers enact stories from Hindu mythology, particularly the epics Ramayana and Mahabharata. The tradition was established by the 15th-century saint Srimanta Sankaradeva as a means of spreading religious teachings through visual storytelling. Bhaona performances combine music, dance, and theater, creating an immersive cultural experience.'
WHERE slug = 'bhaona' AND LENGTH(description) < 100;

-- Chettinad Mansions
UPDATE heritage_entities
SET description = 'Chettinad Mansions are grand ancestral homes built by the wealthy Nattukottai Chettiar community in the Chettinad region of Tamil Nadu. These palatial residences, constructed in the late 19th and early 20th centuries, showcase exceptional architectural craftsmanship with imported materials including Burmese teak, Italian marble, and European tiles. The mansions feature intricate wood carvings, elaborate courtyards, and traditional Tamil architecture. They represent the prosperity and cultural values of the Chettiar community, who were prominent bankers and traders.'
WHERE slug = 'chettinad-mansions' AND LENGTH(description) < 100;

-- Chettinad Cuisine
UPDATE heritage_entities
SET description = 'Chettinad cuisine is one of the most celebrated culinary traditions of Tamil Nadu, known for its bold flavors, aromatic spices, and elaborate preparations. Originating from the Chettinad region, this cuisine features a rich variety of vegetarian and non-vegetarian dishes prepared with freshly ground masalas. Signature dishes include chicken Chettinad, kuzhi paniyaram, and various rice preparations. The cuisine reflects the community''s trading heritage and access to spices from across Southeast Asia.'
WHERE slug = 'chettinad-cuisine' AND LENGTH(description) < 100;

-- Chettiar Community
UPDATE heritage_entities
SET description = 'The Chettiar community, also known as Nattukottai Chettiars, is a prominent Tamil merchant and banking community from the Chettinad region of Tamil Nadu. Historically known as financiers and traders, they established banking networks across Southeast Asia during the colonial period. The community is renowned for its distinctive architectural style, entrepreneurial spirit, and philanthropic contributions. Chettiar culture emphasizes education, commerce, and the preservation of traditional values.'
WHERE slug = 'chettiar-community' AND LENGTH(description) < 100;

-- Athangudi Tiles
UPDATE heritage_entities
SET description = 'Athangudi Tiles are traditional handmade floor tiles produced in the Chettinad region of Tamil Nadu using natural materials and time-honored techniques. These tiles are known for their vibrant colors, geometric patterns, and exceptional durability. The manufacturing process involves using cement, sand, and natural pigments, with each tile handcrafted to create unique designs. Athangudi tiles are an integral part of Chettinad architecture and represent a sustainable building tradition that has been practiced for generations.'
WHERE slug = 'athangudi-tiles' AND LENGTH(description) < 100;

-- Meenmutty Falls
UPDATE heritage_entities
SET description = 'Meenmutty Falls is a spectacular three-tiered waterfall located in the Wayanad district of Kerala, cascading from a height of approximately 300 meters. The falls are surrounded by dense tropical forests and are accessible via a moderate trek through the Western Ghats. During the monsoon season, the waterfall reaches its full glory with massive volumes of water. The area around Meenmutty is rich in biodiversity, hosting various species of flora and fauna endemic to the Western Ghats.'
WHERE slug = 'meenmutty-falls' AND LENGTH(description) < 100;

-- Eco-tourism at Satkosia
UPDATE heritage_entities
SET description = 'Eco-tourism at Satkosia offers visitors an opportunity to experience the pristine natural beauty of the Mahanadi River gorge and surrounding forests. Activities include boat cruises on the river, wildlife spotting, nature walks, and visits to local tribal communities. The eco-tourism initiative supports conservation efforts while providing sustainable livelihoods for local communities. Visitors can experience the unique ecosystem of the Eastern Ghats while learning about the region''s biodiversity and cultural heritage.'
WHERE slug = 'eco-tourism-at-satosia' AND LENGTH(description) < 100;

-- Raas Leela Festival
UPDATE heritage_entities
SET description = 'Raas Leela is a traditional dance festival celebrated in Majuli, Assam, depicting the divine love of Lord Krishna and the gopis. Performed during the Kartik Purnima festival, Raas Leela combines dance, music, and storytelling in an immersive theatrical experience. The performances are staged in the sattras and feature traditional Assamese music, elaborate costumes, and devotional themes. This centuries-old tradition is a vital part of Majuli''s cultural identity and attracts visitors from across India.'
WHERE slug = 'raas-leela-festival' AND LENGTH(description) < 100;

-- Verify updated counts
DO $$
DECLARE
  complete_count INTEGER;
  enrichment_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO complete_count 
  FROM heritage_entities 
  WHERE LENGTH(description) >= 100;
  
  SELECT COUNT(*) INTO enrichment_count 
  FROM heritage_entities 
  WHERE LENGTH(description) >= 10 AND LENGTH(description) < 100;
  
  RAISE NOTICE '=== ENRICHMENT SUMMARY ===';
  RAISE NOTICE 'Complete descriptions (100+ chars): %', complete_count;
  RAISE NOTICE 'Needs enrichment (10-99 chars): %', enrichment_count;
END $$;
