-- ========================================
-- Migration 014: P1.10 Complete Heritage Content
-- Enriches all heritage entities with 200+ character descriptions
-- ========================================

-- Bandhani
UPDATE heritage_entities
SET description = 'Bandhani is a traditional tie-dye textile art form from Gujarat and Rajasthan, where skilled artisans create intricate patterns by tying thousands of tiny knots on fabric before dyeing. The craft produces vibrant designs featuring dots, waves, and floral motifs on silk, cotton, and georgette fabrics. Bandhani holds deep cultural significance in Indian weddings and festivals, with different colors and patterns symbolizing various auspicious meanings. The technique has been practiced for over 5,000 years, making it one of the oldest surviving textile traditions.'
WHERE slug = 'bandhani' AND LENGTH(description) < 200;

-- Rabari Community
UPDATE heritage_entities
SET description = 'The Rabari community is a semi-nomadic pastoral group traditionally residing in the Kutch region of Gujarat and parts of Rajasthan. Known for their distinctive embroidered textiles, mirror work, and vibrant traditional attire, the Rabari maintain a rich cultural identity centered around cattle herding and seasonal migration. Their embroidery techniques, passed down through generations, feature bold geometric patterns and symbolic motifs representing their connection to the desert landscape and spiritual traditions.'
WHERE slug = 'rabari-community' AND LENGTH(description) < 200;

-- Qutub Minar
UPDATE heritage_entities
SET description = 'Qutub Minar is the tallest brick minaret in the world, standing at 72.5 meters in the Qutub complex of Delhi. Construction began in 1192 under Qutb-ud-din Aibak and was completed by his successor Iltutmish around 1220. The five-story tower features intricate carvings, Quranic inscriptions, and a blend of Indo-Islamic architectural styles. The surrounding complex includes the Quwwat-ul-Islam Mosque, the famous Iron Pillar, and the Alai Darwaza, collectively forming a UNESCO World Heritage Site that chronicles the Delhi Sultanate period.'
WHERE slug = 'qutub-minar' AND LENGTH(description) < 200;

-- Red Fort
UPDATE heritage_entities
SET description = 'The Red Fort (Lal Qila) is a UNESCO World Heritage Site in Old Delhi, built by Mughal Emperor Shah Jahan in 1638 as the palace fortress of his capital Shahjahanabad. The massive red sandstone complex spans 254 acres and houses the Diwan-i-Am, Diwan-i-Khas, Rang Mahal, and Mumtaz Mahal. Its architectural grandeur reflects the zenith of Mughal creativity, blending Persian, Timurid, and Indian traditions. Every Independence Day, the Prime Minister addresses the nation from its Lahori Gate, symbolizing India''s democratic sovereignty.'
WHERE slug = 'red-fort' AND LENGTH(description) < 200;

-- Chandni Chowk
UPDATE heritage_entities
SET description = 'Chandni Chowk is one of the oldest and busiest markets in Old Delhi, established in the 17th century by Mughal Princess Jahanara Begum. The bustling bazaar stretches approximately 1.5 kilometers, offering everything from spices, textiles, and silverware to electronics and street food. Narrow lanes lead to hidden gems including the historic Nai Sarak, Dariba Kalan for silver, and Kinari Bazaar for wedding accessories. The market embodies centuries of Delhi''s commercial and cultural history, housing legendary food establishments and centuries-old temples.'
WHERE slug = 'chandni-chowk' AND LENGTH(description) < 200;

-- Solanki Temple Architecture
UPDATE heritage_entities
SET description = 'Solanki Temple Architecture represents the distinctive architectural style developed during the Solanki dynasty that ruled Gujarat and Rajasthan from the 10th to 13th centuries CE. Characterized by extraordinarily intricate stone carvings, elaborate stepwells (vavs), and ornate temple complexes, this style produced masterpieces like Rani ki Vav, Modhera Sun Temple, and the Dilwara Temples at Mount Abu. The architecture emphasizes geometric precision, naturalistic human and animal sculptures, and a harmonious blend of Hindu and Jain artistic traditions.'
WHERE slug = 'solanki-temple-architecture' AND LENGTH(description) < 200;

-- Chola Bronzes
UPDATE heritage_entities
SET description = 'The Chola Bronzes are exquisite cast metal sculptures created during the Chola dynasty (9th-13th centuries) in Tamil Nadu, representing one of the highest achievements in Indian sculptural art. Using the sophisticated lost-wax casting technique (cire perdue), master artisans produced highly refined bronze images of Hindu deities, particularly the iconic Nataraja (Shiva as Lord of the Dance). These sculptures are celebrated worldwide for their graceful proportions, dynamic poses, technical perfection, and the spiritual energy they convey through metal.'
WHERE slug = 'chola-bronzes' AND LENGTH(description) < 200;

-- Khajuraho Temples
UPDATE heritage_entities
SET description = 'The Khajuraho Group of Monuments in Madhya Pradesh is a UNESCO World Heritage Site comprising 24 surviving temples built by the Chandela dynasty between 950-1050 CE. Famous for their intricate Nagara-style architecture and erotic sculptures, the temples celebrate various aspects of human life including spirituality, love, and daily activities. The Kandariya Mahadeva Temple is the largest and most ornate. Originally 85 temples existed, built in a sacred landscape representing the cycle of creation and human existence.'
WHERE slug = 'khajuraho-temples' AND LENGTH(description) < 200;

-- Navratri
UPDATE heritage_entities
SET description = 'Navratri is one of the most significant Hindu festivals celebrated over nine nights and ten days, typically in October. The festival honors the divine feminine (Shakti) in her various forms, with each night dedicated to a different manifestation of Goddess Durga. In Gujarat, Navratri is celebrated with the vibrant Garba and Dandiya Raas dance traditions, where communities gather in colorful attire for spirited group dances. The festival culminates in Dussehra, symbolizing the victory of good over evil and marking a period of spiritual renewal.'
WHERE slug = 'navratri' AND LENGTH(description) < 200;

-- Garba
UPDATE heritage_entities
SET description = 'Garba is a traditional Gujarati folk dance performed during the nine nights of Navratri, honoring the goddess Amba (Durga). Dancers move in circular formations around a centrally placed lamp (Garbi) or image of the goddess, performing rhythmic clapping and graceful movements. The dance symbolizes the cyclical nature of time and the divine feminine energy. Garba has evolved from a sacred ritual to a grand community celebration, with large-scale events featuring live music, elaborate costumes, and traditional Gujarati cuisine.'
WHERE slug = 'garba' AND LENGTH(description) < 200;

-- Sanchi Stupa
UPDATE heritage_entities
SET description = 'The Great Stupa at Sanchi in Madhya Pradesh is one of the oldest stone structures in India and a UNESCO World Heritage Site. Originally commissioned by Emperor Ashoka in the 3rd century BCE to enshrine relics of the Buddha, it was expanded and embellished over centuries with four elaborately carved gateways (toranas). The stupa''s perfect hemispherical dome symbolizes the cosmic mountain, while its narrative relief sculptures depict scenes from the Jataka tales, providing invaluable evidence of early Buddhist art and Indian sculptural traditions.'
WHERE slug = 'sanchi-stupa' AND LENGTH(description) < 200;

-- Amber Fort
UPDATE heritage_entities
SET description = 'Amber Fort (Amer Fort) is a magnificent hilltop fortress-palace located 11 kilometers from Jaipur in Rajasthan. Built primarily by Raja Man Singh I in 1592 and expanded by subsequent rulers, the fort blends Rajput and Mughal architectural styles. Its highlights include the Sheesh Mahal (Mirror Palace), Ganesh Pol gateway, Diwan-i-Aam, and Sukh Mandir. The fort offers panoramic views of Maota Lake and the Aravalli Hills, and the traditional elephant or jeep ride up to its entrance remains one of Rajasthan''s most iconic experiences.'
WHERE slug = 'amber-fort' AND LENGTH(description) < 200;

-- Ajanta Caves
UPDATE heritage_entities
SET description = 'The Ajanta Caves are 30 rock-cut Buddhist cave monuments in Maharashtra''s Aurangabad district, dating from the 2nd century BCE to approximately 480 CE. Carved into a horseshoe-shaped cliff overlooking the Waghora River, these caves contain some of the finest surviving examples of ancient Indian painting and sculpture. The murals depict Jataka tales, Buddhist deities, and scenes from court life with remarkable naturalism and emotional depth. Rediscovered in 1819, Ajanta is a UNESCO World Heritage Site and a masterpiece of Buddhist religious art.'
WHERE slug = 'ajanta-caves' AND LENGTH(description) < 200;

-- Phulkari
UPDATE heritage_entities
SET description = 'Phulkari is a traditional embroidery art form from Punjab, where women create vibrant floral patterns on coarse cotton fabric (khaddar) using untwisted silk thread (pat). The word Phulkari literally means "flower work," and the craft produces stunning shawls, head coverings, and garments featuring geometric and floral designs. Traditionally made by women for their daughters and as dowry items, Phulkari represents the artistic heritage of Punjabi women. The Bagh style, covering the entire fabric, is the most elaborate and time-intensive variant.'
WHERE slug = 'phulkari' AND LENGTH(description) < 200;

-- Warli Art
UPDATE heritage_entities
SET description = 'Warli Art is a tribal painting tradition of the Warli community from the Sahyadri Mountains of Maharashtra, characterized by simple white geometric figures on mud-brown walls. Using rice paste as paint and a bamboo stick as a brush, Warli artists depict scenes of daily life, harvest, hunting, dancing, and nature with stick-figure humans, animals, and geometric patterns. This ancient art form, dating back to approximately 2500 BCE, reflects the community''s deep spiritual connection to nature and the cyclical rhythms of tribal life.'
WHERE slug = 'warli-art' AND LENGTH(description) < 200;

-- Blue Pottery
UPDATE heritage_entities
SET description = 'Blue Pottery is a distinctive craft tradition of Jaipur, Rajasthan, notable for its stunning cobalt blue designs on a semi-transparent, quartz-based body. Unlike traditional pottery, it uses a dough of quartz stone powder, glass, and multani mitti (Fuller''s earth) instead of clay. The craft was introduced during the Mughal period and has evolved into one of Jaipur''s signature art forms. Products include decorative tiles, flower pots, plates, and vases adorned with intricate Persian-inspired floral and geometric patterns in characteristic blue and white.'
WHERE slug = 'blue-pottery' AND LENGTH(description) < 200;

-- Bhangra
UPDATE heritage_entities
SET description = 'Bhangra is a lively, energetic folk dance originating from the Punjab region of India and Pakistan, traditionally performed during harvest festivals, particularly Baisakhi. Characterized by vigorous movements, high jumps, shoulder shrugs, and spinning, Bhangra is accompanied by the dhol (double-headed drum) and traditional instruments like the tumbi and algoza. The dance celebrates agricultural abundance, community joy, and Punjabi cultural pride. In modern times, Bhangra has evolved into a global phenomenon, influencing contemporary music and dance worldwide.'
WHERE slug = 'bhangra' AND LENGTH(description) < 200;

-- Adalaj Stepwell
UPDATE heritage_entities
SET description = 'Adalaj Stepwell (Adalaj ni Vav) is an intricately carved five-story stepwell located in Adalaj village near Ahmedabad, Gujarat. Built in 1498 by Queen Rudabai, the wife of Vaghela chief Rana Veer Singh, it served as both a water source and a retreat from the harsh Gujarat heat. The stepwell features remarkable Indo-Islamic architecture with detailed floral motifs, geometric patterns, and scenes from daily life carved in sandstone. The octagonal structure descends approximately 20 meters, with each level offering shelter and cool respite.'
WHERE slug = 'adalaj-stepwell' AND LENGTH(description) < 200;

-- Hawa Mahal
UPDATE heritage_entities
SET description = 'Hawa Mahal (Palace of Winds) is an iconic five-story pink sandstone structure in Jaipur, Rajasthan, built in 1799 by Maharaja Sawai Pratap Singh. Designed by Lal Chand Ustad, it features 953 small windows (jharokhas) adorned with intricate latticework that allowed royal women to observe street festivities while maintaining purdah. The honeycomb-like facade, inspired by the crown of Lord Krishna, catches the breeze through its numerous windows, creating a natural cooling effect. It stands as a masterpiece of Rajput architecture and Jaipur''s most photographed monument.'
WHERE slug = 'hawa-mahal' AND LENGTH(description) < 200;

-- Meenakshi Amman Temple
UPDATE heritage_entities
SET description = 'Meenakshi Amman Temple is a historic Hindu temple located on the southern bank of the Vaigai River in Madurai, Tamil Nadu. Dedicated to Goddess Meenakshi (a form of Parvati) and Lord Sundareshwar (Shiva), this Dravidian architectural marvel features 14 towering gopurams (gateway towers) covered with approximately 33,000 colorful sculptures. The temple complex spans 14 acres and includes the Hall of 1,000 Pillars, sacred tanks, and extensive corridor networks. It remains one of India''s most active temples, attracting over 15,000 visitors daily.'
WHERE slug = 'meenakshi-amman-temple' AND LENGTH(description) < 200;

-- Modhera Sun Temple
UPDATE heritage_entities
SET description = 'The Modhera Sun Temple in Gujarat, built by King Bhima I of the Chalukya dynasty around 1026 CE, is dedicated to the Hindu solar deity Surya. The temple complex consists of the main shrine (Guda Mandapa), a rectangular hall (Sabha Mandapa), and a sacred stepwell (Surya Kund). The architecture features intricate carvings depicting scenes from the Ramayana, Mahabharata, and daily life. The temple''s astronomical alignment ensures that the first rays of the rising equinox sun illuminate the central image of Surya through the main entrance.'
WHERE slug = 'modhera-sun-temple' AND LENGTH(description) < 200;

-- Jallianwala Bagh
UPDATE heritage_entities
SET description = 'Jallianwala Bagh is a public garden and memorial in Amritsar, Punjab, marking the site of the tragic massacre on April 13, 1919. On that fateful day, British Colonel Reginald Dyer ordered troops to fire on a peaceful gathering of thousands of people, many attending the Baisakhi festival and protesting the Rowlatt Act. The barrage of bullets killed hundreds and wounded over a thousand civilians. The narrow entrance, bullet-marked walls, and the Martyrs'' Well serve as somber reminders, making it a symbol of India''s freedom struggle.'
WHERE slug = 'jallianwala-bagh' AND LENGTH(description) < 200;

-- Mahatma Gandhi
UPDATE heritage_entities
SET description = 'Mohandas Karamchand Gandhi (1869-1948), known as Mahatma Gandhi, was the leader of India''s non-violent independence movement against British colonial rule. Born in Porbandar, Gujarat, Gandhi pioneered the philosophy of satyagraha (truth-force) and ahimsa (non-violence), leading campaigns including the Salt March, Quit India Movement, and non-cooperation movement. His methods inspired civil rights movements worldwide. After independence, he worked to end untouchability and promote communal harmony until his assassination in 1948.'
WHERE slug = 'mahatma-gandhi' AND LENGTH(description) < 200;

-- Gujarati Thali
UPDATE heritage_entities
SET description = 'Gujarati Thali is a traditional vegetarian meal format originating from Gujarat, featuring an elaborate spread of dishes served on a round steel or silver plate. A typical thali includes dal (lentils), kadhi (yogurt curry), shaak (vegetable preparations), rice, roti or thepla (flatbreads), pickles, chutneys, papad, and sweets like shrikhand or basundi. The meal balances six tastes (rasas) according to Ayurvedic principles, with a distinctive sweet-sour-spicy flavor profile. The Gujarati Thali represents the state''s rich vegetarian culinary heritage.'
WHERE slug = 'gujarati-thali' AND LENGTH(description) < 200;

-- Ellora Caves
UPDATE heritage_entities
SET description = 'The Ellora Caves are a UNESCO World Heritage Site comprising 34 rock-cut cave temples and monasteries carved into the volcanic basalt cliffs of Maharashtra. Built between the 6th and 11th centuries CE, the caves represent Buddhist, Hindu, and Jain traditions coexisting side by side. The most spectacular is Cave 16 (Kailasa Temple), the largest monolithic structure in the world, carved top-down from a single rock. Ellora demonstrates the extraordinary artistic and engineering achievement of medieval Indian craftsmen in creating enduring monuments of faith.'
WHERE slug = 'ellora-caves' AND LENGTH(description) < 200;

-- Patola Weaving
UPDATE heritage_entities
SET description = 'Patola Weaving is a highly skilled double ikat textile tradition practiced by the Salvi community in Patan, Gujarat. The craft involves resist-dyeing both warp and weft threads before weaving, creating reversible textiles with intricate geometric and figurative patterns. A single Patola sari can take six months to two years to complete, requiring extraordinary precision in thread alignment. Historically reserved for royalty and aristocracy, Patola textiles hold ceremonial importance in Gujarati and Indonesian cultures, representing the pinnacle of Indian weaving artistry.'
WHERE slug = 'patola-weaving' AND LENGTH(description) < 200;

-- Bharatanatyam
UPDATE heritage_entities
SET description = 'Bharatanatyam is one of the oldest classical dance forms of India, originating in Tamil Nadu''s temples over 2,000 years ago. The dance combines nritta (pure dance movements), nritya (expressive storytelling), and natya (dramatic enactment) through intricate footwork, precise hand gestures (mudras), facial expressions, and body postures. Traditionally performed by devadasis (temple dancers), Bharatanatyam was revived in the early 20th century by pioneers like Rukmini Devi Arundale. It remains one of India''s most celebrated classical art forms.'
WHERE slug = 'bharatanatyam' AND LENGTH(description) < 200;

-- Dholavira
UPDATE heritage_entities
SET description = 'Dholavira is an archaeological site on Khadir Island in Gujarat''s Rann of Kutch, representing one of the five largest Harappan (Indus Valley Civilization) settlements. Dating from approximately 3000-1500 BCE, the site showcases remarkable urban planning with a citadel, middle town, and lower town, along with sophisticated water management systems including reservoirs and channels. Excavations have revealed a unique signboard with Indus script, seals, jewelry, and pottery. Dholavira is a UNESCO World Heritage Site and a testament to ancient Indian urban civilization.'
WHERE slug = 'dholavira' AND LENGTH(description) < 200;

-- Rani ki Vav
UPDATE heritage_entities
SET description = 'Rani ki Vav (Queen''s Stepwell) is a UNESCO World Heritage Site located in Patan, Gujarat, built in the 11th century by Queen Udayamati in memory of her husband King Bhima I. This inverted temple-style stepwell descends seven levels with over 500 principal sculptures and over 1,000 minor ones, depicting religious, mythological, and secular motifs. The stepwell stretches 64 meters long, 20 meters wide, and 27 meters deep, showcasing the Solanki architectural style at its finest. It represents the cultural significance of water management in ancient Gujarat.'
WHERE slug = 'rani-ki-vav' AND LENGTH(description) < 200;

-- Golden Temple
UPDATE heritage_entities
SET description = 'The Golden Temple (Sri Harmandir Sahib) is the holiest shrine of Sikhism, located in Amritsar, Punjab. Built in the 16th century by Guru Arjan Dev Ji, the temple was later covered in gold foil by Maharaja Ranjit Singh in the early 19th century. Set in the center of the sacred Amrit Sarovar (Pool of Nectar), the temple is accessible via a causeway from the complex''s marble walkway. The Langar (community kitchen) serves free meals to approximately 50,000-100,000 people daily, embodying Sikh principles of equality and service.'
WHERE slug = 'golden-temple' AND LENGTH(description) < 200;

-- Kutch Embroidery
UPDATE heritage_entities
SET description = 'Kutch Embroidery is a vibrant textile art form from the Kutch district of Gujarat, practiced by various communities including the Rabari, Ahir, and Jat groups. The craft features intricate needlework combining cross-stitch, chain-stitch, and mirror work (abhla) on cotton and silk fabrics. Each community has distinct styles: Rabari embroidery uses bold black and red patterns, while Ahir work features colorful floral motifs. Kutch Embroidery adorns garments, bags, wall hangings, and accessories, representing Gujarat''s rich multicultural textile heritage.'
WHERE slug = 'kutch-embroidery' AND LENGTH(description) < 200;

-- Verify final counts
DO $$
DECLARE
  desc_200 INTEGER;
  desc_300 INTEGER;
  media_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO desc_200 FROM heritage_entities WHERE LENGTH(description) >= 200;
  SELECT COUNT(*) INTO desc_300 FROM heritage_entities WHERE LENGTH(description) >= 300;
  SELECT COUNT(*) INTO media_count FROM media;
  
  RAISE NOTICE '=== MIGRATION 014 RESULTS ===';
  RAISE NOTICE 'Descriptions 200+: %', desc_200;
  RAISE NOTICE 'Descriptions 300+: %', desc_300;
  RAISE NOTICE 'Media records: %', media_count;
END $$;
