-- ============================================
-- P1.24: Marathi/Tamil/Punjabi Knowledge + Search Suggestions
-- ============================================

-- MARATHI (mr) knowledge entries

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Ajanta Caves', 'monument', 'MH', 'अजिंठा गुंफा हा महाराष्ट्रातील औरंगाबाद जिल्ह्यातील एक प्रसिद्ध बौद्ध गुंफा संकुल आहे. यातील भित्तिचित्रे जगप्रसिद्ध आहेत.', 'यूनेस्को विश्व वारसा स्थळ, भारतातील सर्वात महत्त्वाच्या बौद्ध कलाकृतींमध्ये एक.', ARRAY['ajanta', 'caves', 'aurangabad', 'maharashtra', 'buddhist'], ARRAY['Ajanta Gupha'], ARRAY['Ajinta guphabaddal mahiti dya', 'Ajinta kuthye aahe'], 'f0000001-0000-0000-0000-000000000510', 'mr')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Ellora Caves', 'monument', 'MH', 'एलोरा गुंफा हा महाराष्ट्रातील औरंगाबाद जिल्ह्यातील एक प्रसिद्ध गुंफा संकुल आहे. कैलास मंदिर हे याचे सर्वात प्रसिद्ध गुंप आहे.', 'यूनेस्को विश्व वारसा स्थळ, एका खड्ड्यात खोदून बनवलेले जगातील सर्वात मोठे मंदिर.', ARRAY['ellora', 'caves', 'aurangabad', 'maharashtra', 'kailasa'], ARRAY['Ellora Gupha', 'Kailasa Temple'], ARRAY['Ellora guphabaddal mahiti dya', 'Kailasa mandir kuthye aahe'], 'f0000001-0000-0000-0000-000000000511', 'mr')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rani ki Vav', 'monument', 'GJ', 'राणी की वाव ही पाटण गुजरातमधील एक भव्य सीडीवेल आहे. ती 11व्या शतकात उदयमती मातेने बांधली होती.', 'यूनेस्को विश्व वारसा स्थळ, भारतातील सर्वात भव्य सीडीवेलांपैकी एक.', ARRAY['rani ki vav', 'patan', 'stepwell', 'gujarat'], ARRAY['Rani Ki Vav'], ARRAY['Rani ki vav baddal mahiti dya', 'Rani ki vav kuthye aahe'], 'c0000001-0000-0000-0000-000000000001', 'mr')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Golden Temple', 'monument', 'PB', 'गोल्डन टेम्पल हा अमृतसर पंजाबमधील शीखांचे सर्वात पवित्र गुरुद्वारा आहे. त्याला हरमंदिर साहिब म्हणूनही ओळखले जाते.', 'शीख धर्माचे सर्वात महत्त्वाचे धार्मिक स्थळ, सोन्याच्या छतामुळे प्रसिद्ध.', ARRAY['golden temple', 'amritsar', 'punjab', 'gurdwara'], ARRAY['Harmandir Sahib'], ARRAY['Golden temple baddal mahiti dya', 'Amritsarcha mandir'], 'f0000001-0000-0000-0000-000000000120', 'mr')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Sabarmati Ashram', 'monument', 'GJ', 'साबरमती आश्रम अहमदाबादमधील साबरमती नदीकाठी आहे. हा 1917 ते 1930 पर्यंत महात्मा गांधींचे मुख्यालय होता.', 'या आश्रमापासून गांधीजींनी 1930 मधील ऐतिहासिक दांडी सागरी सुरू केली.', ARRAY['sabarmati ashram', 'ahmedabad', 'gandhi'], ARRAY['Gandhi Ashram'], ARRAY['Sabarmati ashram baddal mahiti dya', 'Gandhi ashram kuthye aahe'], 'c0000001-0000-0000-0000-000000000004', 'mr')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Red Fort', 'monument', 'DL', 'लाल किल्ला हा दिल्लीतील एक ऐतिहासिक किल्ला आहे. त्याचा बांध 17व्या शतकात मुघल सम्राट शाहजहाँने करून दिला होता.', 'भारताच्या स्वातंत्र्याचे प्रतीक, यूनेस्को विश्व वारसा स्थळ.', ARRAY['red fort', 'delhi', 'mughal', 'lal qila'], ARRAY['Lal Qila'], ARRAY['Lal qilla baddal mahiti dya', 'Lal qilla kuthye aahe'], 'f0000001-0000-0000-0000-000000000420', 'mr')
ON CONFLICT DO NOTHING;

-- TAMIL (ta) knowledge entries

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Meenakshi Amman Temple', 'monument', 'TN', 'மீனாக்ஷி அம்மன் கோவில் மதுரை, தமிழ்நாட்டில் உள்ள ஒரு புகழ்பெற்ற இந்துக் கோவில் ஆகும்.', 'தென் இந்தியாவின் மிக முக்கியமான கோவில்களில் ஒன்று, அதன் வண்ணமிகு கோபுரங்கள் மற்றும் சிற்பங்களுக்கு புகழ் பெற்றது.', ARRAY['meenakshi', 'temple', 'madurai', 'tamil nadu'], ARRAY['Meenakshi Temple'], ARRAY['Meenakshi amman kovil patri sollunga', 'Madurai kovil'], 'f0000001-0000-0000-0000-000000000522', 'ta')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Bharatanatyam', 'tradition', 'TN', 'பரதநாட்டியம் தமிழ்நாட்டின் மிகப் பழமையான நடன வடிவங்களில் ஒன்று. இது கோவில்களில் தோன்றிய ஒரு செவ்வியல் நடனம்.', 'இந்தியாவின் எட்டு செவ்வியல் நடன வடிவங்களில் ஒன்று, பல நூற்றாண்டுகள் பழமையான பாரம்பரியம்.', ARRAY['bharatanatyam', 'dance', 'tamil nadu', 'classical'], ARRAY['Bharata Natyam'], ARRAY['Bharatanatyam patri sollunga', 'Bharatanatyam enna'], 'f0000001-0000-0000-0000-000000000520', 'ta')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rani ki Vav', 'monument', 'GJ', 'ராணி கி வாவ் குஜராத்தின் பாடனில் உள்ள ஒரு பிரம்மாண்டமான படிக்கிணறு ஆகும்.', 'யுனெஸ்கோ உலக பாரம்பரிய தளம், இந்தியாவின் மிக அழகான படிக்கிணறுகளில் ஒன்று.', ARRAY['rani ki vav', 'patan', 'stepwell', 'gujarat'], ARRAY['Rani Ki Vav'], ARRAY['Rani ki vav patri sollunga', 'Rani ki vav enga irukku'], 'c0000001-0000-0000-0000-000000000001', 'ta')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Golden Temple', 'monument', 'PB', 'கோல்டன் டெம்பிள் அமிர்தசரஸில் உள்ள சீக்கியர்களின் மிகப் புனிதமான குருத்துவாரா ஆகும்.', 'சீக்கிய மதத்தின் மிக முக்கியமான ஆன்மீக தளம், தங்க கூரை மற்றும் புனித ஏரிக்கு புகழ் பெற்றது.', ARRAY['golden temple', 'amritsar', 'punjab', 'gurdwara'], ARRAY['Harmandir Sahib'], ARRAY['Golden temple patri sollunga', 'Amritsar kovil'], 'f0000001-0000-0000-0000-000000000120', 'ta')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Warli Art', 'craft', 'MH', 'வார்லி ஓவியம் மகாராஷ்டிராவின் வார்லி பழங்குடியினரின் பாரம்பரிய ஓவிய பாணியாகும்.', 'இந்தியாவின் மிகப் பழமையான பழங்குடி ஓவிய மரபுகளில் ஒன்று, எளிய வடிவங்கள் மூலம் வாழ்க்கையை சித்தரிக்கிறது.', ARRAY['warli', 'art', 'tribal', 'maharashtra', 'painting'], ARRAY['Warli Painting'], ARRAY['Warli art patri sollunga', 'Warli enna'], 'f0000001-0000-0000-0000-000000000512', 'ta')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Navratri', 'festival', 'GJ', 'நவராத்திரி ஒன்பது இரவுகள் கொண்டாடப்படும் இந்து விழாவாகும். குஜராத்தின் கர்பா நடனம் உலகப் புகழ் பெற்றது.', 'குஜராத் நவராத்திரி உலகின் மிகப் பெரிய நடன விழாவாகும்.', ARRAY['navratri', 'garba', 'gujarat', 'festival', 'dance'], ARRAY['Navratri Festival'], ARRAY['Navratri patri sollunga', 'Garba enna'], 'c0000001-0000-0000-0000-000000000030', 'ta')
ON CONFLICT DO NOTHING;

-- PUNJABI (pa) knowledge entries

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Golden Temple', 'monument', 'PB', 'ਗੋਲਡਨ ਟੈਂਪਲ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਸਿੱਖਾਂ ਦਾ ਸਭ ਤੋਂ ਪਵਿੱਤਰ ਗੁਰਦੁਆਰਾ ਹੈ। ਇਸ ਨੂੰ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ।', 'ਸਿੱਖ ਧਰਮ ਦਾ ਸਭ ਤੋਂ ਮਹੱਤਵਪੂਰਨ ਧਾਰਮਿਕ ਸਥਾਨ, ਸੋਨ ਦੀ ਛੱਤ ਅਤੇ ਪਵਿੱਤਰ ਤਲਾਬ ਲਈ ਮਸ਼ਹੂਰ।', ARRAY['golden temple', 'amritsar', 'punjab', 'gurdwara'], ARRAY['Harmandir Sahib'], ARRAY['Golden temple bare daso', 'Amritsar da mandir'], 'f0000001-0000-0000-0000-000000000120', 'pa')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Jallianwala Bagh', 'monument', 'PB', 'ਜੱਲੀਆਂਵਾਲਾ ਬਾਗ ਅੰਮ੍ਰਿਤਸਰ ਵਿੱਚ ਇੱਕ ਇਤਿਹਾਸਿਕ ਬਾਗ ਹੈ। 1919 ਵਿੱਚ ਇੱਥੇ ਹੋਇਆ ਕਤਲੇਆਮ ਭਾਰਤੀ ਸੁਤੰਤਰਤਾ ਅੰਦੋਲਨ ਦਾ ਮਹੱਤਵਪੂਰਨ ਹਿੱਸਾ ਸੀ।', 'ਭਾਰਤੀ ਸੁਤੰਤਰਤਾ ਅੰਦੋਲਨ ਦਾ ਪ੍ਰਤੀਕ, ਜੱਲੀਆਂਵਾਲਾ ਬਾਗ ਹੱਤਿਆਕਾਂਡ ਦੀ ਯਾਦ।', ARRAY['jallianwala bagh', 'amritsar', 'punjab', 'massacre'], ARRAY['Jallianwala'], ARRAY['Jallianwala bagh bare daso', 'Jallianwala bagh kithon hai'], 'f0000001-0000-0000-0000-000000000121', 'pa')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Phulkari', 'craft', 'PB', 'ਫੁਲਕਾਰੀ ਪੰਜਾਬ ਦੀ ਪਰੰਪਰਾਗਤ ਹੱਥ ਕਲਾ ਹੈ। ਇਹ ਰੰਗੀਨ ਧਾਗਿਆਂ ਨਾਲ ਬੁਣੀ ਜਾਂਦੀ ਹੈ।', 'ਪੰਜਾਬ ਦੀ ਸਭ ਤੋਂ ਪ੍ਰਸਿੱਧ ਹੱਥ ਕਲਾ, ਲੱਛਣ ਅਤੇ ਦੁਪੱਟੇ ਲਈ ਮਸ਼ਹੂਰ।', ARRAY['phulkari', 'embroidery', 'punjab', 'craft'], ARRAY['Phulkari Embroidery'], ARRAY['Phulkari bare daso', 'Phulkari kive bannidi hai'], 'f0000001-0000-0000-0000-000000000122', 'pa')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rani ki Vav', 'monument', 'GJ', 'ਰਾਣੀ ਕੀ ਵਾਵ ਪਾਟਨ ਗੁਜਰਾਤ ਵਿੱਚ ਇੱਕ ਸ਼ਾਨਦਾਰ ਸੀੜ੍ਹੀਵੈਲ ਹੈ। ਇਹ 11ਵੀਂ ਸਦੀ ਵਿੱਚ ਬਣਾਈ ਗਈ ਸੀ।', 'ਯੂਨੈਸਕੋ ਵਰਲਡ ਹੈਰਿਟੇਜ ਸਾਈਟ, ਭਾਰਤ ਦੇ ਸਭ ਤੋਂ ਸ਼ਾਨਦਾਰ ਸੀੜ੍ਹੀਵੈਲਾਂ ਵਿੱਚੋਂ ਇੱਕ।', ARRAY['rani ki vav', 'patan', 'stepwell', 'gujarat'], ARRAY['Rani Ki Vav'], ARRAY['Rani ki vav bare daso', 'Rani ki vav kithon hai'], 'c0000001-0000-0000-0000-000000000001', 'pa')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Sabarmati Ashram', 'monument', 'GJ', 'ਸਾਬਰਮਤੀ ਆਸ਼ਰਮ ਅਹਿਮਦਾਬਾਦ ਵਿੱਚ ਸਾਬਰਮਤੀ ਦਰਿਆ ਦੇ ਕਿਨਾਰੇ ਸਥਿਤ ਹੈ। ਇਹ 1917 ਤੋਂ 1930 ਤੱਕ ਮਹਾਤਮਾ ਗਾਂਧੀ ਦਾ ਮੁੱਖਾਲਯ ਸੀ।', 'ਇਸ ਆਸ਼ਰਮ ਤੋਂ ਗਾਂਧੀ ਜੀ ਨੇ 1930 ਵਿੱਚ ਇਤਿਹਾਸਿਕ ਦਾਂਡੀ ਮਾਰਚ ਸ਼ੁਰੂ ਕੀਤਾ।', ARRAY['sabarmati ashram', 'ahmedabad', 'gandhi'], ARRAY['Gandhi Ashram'], ARRAY['Sabarmati ashram bare daso', 'Gandhi ashram kithon hai'], 'c0000001-0000-0000-0000-000000000004', 'pa')
ON CONFLICT DO NOTHING;
