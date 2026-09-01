-- ============================================
-- P1.23: Multilingual Chatbot Knowledge Population
-- ============================================
-- Adds Gujarati and Hindi knowledge for the top heritage entities.
-- Uses ON CONFLICT DO NOTHING for idempotency.
-- Falls back to English if no results in requested language.

-- Gujarati knowledge entries for top heritage entities

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rani ki Vav', 'monument', 'GJ', 'રાણી કી વાવ પાટણ ગુજરાતમાં આવેલું એક ભવ્ય સીડીવેલ છે. તે 11મી સદીમાં ઉદયમતી માતા દ્વારા બનાવવામાં આવ્યું હતું.', 'UNESCO વિશ્વ વારસા સ્થળ તરીકે માન્યતા પ્રાપ્ત, ભારતના સૌથી ભવ્ય સીડીવેલોમાંનું એક.', ARRAY['rani ki vav', 'patan', 'stepwell', 'gujarat', 'unesco'], ARRAY['Rani Ki Vav', 'Queen Stepwell'], ARRAY['Rani ki Vav vishe janavo', 'Rani ki Vav su che', 'Patan ni Rani ki Vav'], 'c0000001-0000-0000-0000-000000000001', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Modhera Sun Temple', 'monument', 'GJ', 'મોઢેરા સૂર્ય મંદિર ગુજરાતના મોઢેરા ગામમાં આવેલું એક ભવ્ય સૂર્ય મંદિર છે. તે 11મી સદીમાં સોલંકી વંશ દ્વારા બનાવવામાં આવ્યું હતું.', 'ભારતના ત્રણ મુખ્ય સૂર્ય મંદિરોમાંનું એક, સોલંકી કાળની સ્થાપત્ય કલાનું ઉત્તમ ઉદાહરણ.', ARRAY['modhera', 'sun temple', 'gujarat', 'surya mandir'], ARRAY['Modhera Sun Temple', 'Surya Mandir Modhera'], ARRAY['Modhera surya mandir vishe mahiti aapo', 'Modhera mandir kya che'], 'c0000001-0000-0000-0000-000000000002', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Sabarmati Ashram', 'monument', 'GJ', 'સાબરમતી આશ્રમ અમદાવાદમાં સાબરમતી નદીના કિનારે આવેલો છે. તે 1917 થી 1930 સુધી મહાત્મા ગાંધીજીનું મુખ્યાલય હતું.', 'આ આશ્રમથી ગાંધીજીએ 1930માં ઐતિહાસિક દાંડી કૂચનો પ્રારંભ કર્યો હતો.', ARRAY['sabarmati ashram', 'ahmedabad', 'gandhi', 'monument'], ARRAY['Gandhi Ashram', 'Sabarmati Ashram'], ARRAY['Sabarmati ashram vishe janavo', 'Gandhi ashram kya che'], 'c0000001-0000-0000-0000-000000000004', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Golden Temple', 'monument', 'PB', 'ગોલ્ડન ટેમ્પલ અમૃતસર પંજાબમાં આવેલું શીખોનું સૌથી પવિત્ર ગુરુદ્વારા છે. તેને હરમંદિર સાહિબ તરીકે પણ ઓળખવામાં આવે છે.', 'શીખ ધર્મનું સૌથી મહત્વપૂર્ણ ધાર્મિક સ્થળ, સોનાની છત અને પવિત્ર તળાવથી પ્રસિદ્ધ.', ARRAY['golden temple', 'amritsar', 'punjab', 'gurdwara'], ARRAY['Harmandir Sahib', 'Golden Temple Amritsar'], ARRAY['Golden temple vishe janavo', 'Amritsar nu mandir'], 'f0000001-0000-0000-0000-000000000120', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Dholavira', 'monument', 'GJ', 'ધોળાવીરા ગુજરાતના કચ્છ જિલ્લામાં આવેલું સિંધુ ખીણ સભ્યતાનું મહત્વપૂર્ણ સ્થળ છે. UNESCO વિશ્વ વારસા સ્થળ છે.', 'ભારતના સૌથી જૂના શહેરોમાંનું એક, સિંધુ ખીણ સભ્યતાની ઉત્કૃષ્ટ નગર યોજના.', ARRAY['dholavira', 'indus valley', 'kutch', 'unesco'], ARRAY['Dholavira IVC'], ARRAY['Dholavira vishe janavo', 'Dholavira su che'], 'c0000001-0000-0000-0000-000000000003', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Adalaj Stepwell', 'monument', 'GJ', 'અદાલજ સીડીવેલ અમદાવાદ નજીક આવેલું એક ભવ્ય પાંચ માળનું સીડીવેલ છે. તે 1498માં બનાવવામાં આવ્યું હતું.', 'ગુજરાતના સૌથી સુંદર સીડીવેલોમાંનું એક, હિન્દુ-મુસ્લિમ સ્થાપત્ય શૈલીનું મિશ્રણ.', ARRAY['adalaj', 'stepwell', 'ahmedabad', 'gujarat'], ARRAY['Adalaj ni Vav'], ARRAY['Adalaj stepwell vishe janavo', 'Adalaj vav kya che'], 'f0000001-0000-0000-0000-000000000501', 'gu')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Kutch Embroidery', 'craft', 'GJ', 'કચ્છ એમ્બ્રોઇડરી કચ્છ પ્રદેશની પરંપરાગત હસ્તકલા છે. તે અરીસાના કામ અને રંગબેરંગી દોરાથી પ્રસિદ્ધ છે.', 'કચ્છની હસ્તકલા વૈશ્વિક સ્તરે ઓળખાય છે, રબારી સમુદાયની કલા.', ARRAY['kutch embroidery', 'kutch', 'craft', 'mirror work'], ARRAY['Kutch hathkala'], ARRAY['Kutch embroidery vishe janavo', 'Kutch ni hathkala'], 'c0000001-0000-0000-0000-000000000011', 'gu')
ON CONFLICT DO NOTHING;

-- Hindi knowledge entries for top heritage entities

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Rani ki Vav', 'monument', 'GJ', 'रानी की वाव पाटन गुजरात में स्थित एक भव्य सीढ़ीवेल है। इसे 11वीं सदी में उदयमती माता ने बनवाया था।', 'यूनेस्को विश्व धरोहर स्थल, भारत के सबसे भव्य सीढ़ीवेलों में से एक।', ARRAY['rani ki vav', 'patan', 'stepwell', 'gujarat', 'unesco'], ARRAY['Rani Ki Vav', 'Queen Stepwell'], ARRAY['Rani ki Vav ke baare mein batao', 'Rani ki Vav kya hai'], 'c0000001-0000-0000-0000-000000000001', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Modhera Sun Temple', 'monument', 'GJ', 'मोढेरा सूर्य मंदिर गुजरात के मोढेरा गांव में स्थित एक भव्य सूर्य मंदिर है। इसे 11वीं सदी में सोलंकी वंश ने बनवाया था।', 'भारत के तीन प्रमुख सूर्य मंदिरों में से एक, सोलंकी काल की स्थापत्य कला का उत्कृष्ट उदाहरण।', ARRAY['modhera', 'sun temple', 'gujarat', 'surya mandir'], ARRAY['Modhera Sun Temple', 'Surya Mandir'], ARRAY['Modhera surya mandir ke baare mein batao', 'Modhera mandir kahan hai'], 'c0000001-0000-0000-0000-000000000002', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Sabarmati Ashram', 'monument', 'GJ', 'साबरमती आश्रम अहमदाबाद में साबरमती नदी के किनारे स्थित है। यह 1917 से 1930 तक महात्मा गांधी का मुख्यालय था।', 'इस आश्रम से गांधी जी ने 1930 में ऐतिहासिक दांडी मार्च शुरू किया था।', ARRAY['sabarmati ashram', 'ahmedabad', 'gandhi', 'monument'], ARRAY['Gandhi Ashram'], ARRAY['Sabarmati ashram ke baare mein batao', 'Gandhi ashram kahan hai'], 'c0000001-0000-0000-0000-000000000004', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Golden Temple', 'monument', 'PB', 'गोल्डन टेम्पल अमृतसर पंजाब में स्थित सिखों का सबसे पवित्र गुरुद्वारा है। इसे हरमंदिर साहिब भी कहा जाता है।', 'सिख धर्म का सबसे महत्वपूर्ण धार्मिक स्थल, सोने की छत और पवित्र तालाब के लिए प्रसिद्ध।', ARRAY['golden temple', 'amritsar', 'punjab', 'gurdwara'], ARRAY['Harmandir Sahib'], ARRAY['Golden temple ke baare mein batao', 'Amritsar ka mandir'], 'f0000001-0000-0000-0000-000000000120', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Dholavira', 'monument', 'GJ', 'धोलावीरा गुजरात के कच्छ जिले में स्थित सिंधु घाटी सभ्यता का एक महत्वपूर्ण स्थल है। यूनेस्को विश्व धरोहर स्थल है।', 'भारत के सबसे पुराने शहरों में से एक, सिंधु घाटी सभ्यता की उत्कृष्ट नगर योजना।', ARRAY['dholavira', 'indus valley', 'kutch', 'unesco'], ARRAY['Dholavira IVC'], ARRAY['Dholavira ke baare mein batao', 'Dholavira kya hai'], 'c0000001-0000-0000-0000-000000000003', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Adalaj Stepwell', 'monument', 'GJ', 'अदालज सीढ़ीवेल अहमदाबाद के पास स्थित एक भव्य पांच मंजिला सीढ़ीवेल है। इसे 1498 में बनाया गया था।', 'गुजरात के सबसे सुंदर सीढ़ीवेलों में से एक, हिंदू-मुस्लिम स्थापत्य शैली का मिश्रण।', ARRAY['adalaj', 'stepwell', 'ahmedabad', 'gujarat'], ARRAY['Adalaj ni Vav'], ARRAY['Adalaj stepwell ke baare mein batao', 'Adalaj vav kahan hai'], 'f0000001-0000-0000-0000-000000000501', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Kutch Embroidery', 'craft', 'GJ', 'कच्छ एम्ब्रोइडरी कच्छ क्षेत्र की पारंपरिक हस्तकला है। यह शीशे के काम और रंगीन धागों से प्रसिद्ध है।', 'कच्छ की हस्तकला वैश्विक स्तर पर जानी जाती है, रबारी समुदाय की कला।', ARRAY['kutch embroidery', 'kutch', 'craft', 'mirror work'], ARRAY['Kutch hathkala'], ARRAY['Kutch embroidery ke baare mein batao', 'Kutch ki hathkala'], 'c0000001-0000-0000-0000-000000000011', 'hi')
ON CONFLICT DO NOTHING;

INSERT INTO chatbot_knowledge (heritage_name, heritage_type, state_code, description, significance, keywords, aliases, chatbot_question_examples, heritage_entity_id, language)
VALUES ('Hawa Mahal', 'monument', 'RJ', 'हवा महल जयपुर राजस्थान में स्थित एक प्रतिष्ठित महल है। इसे 1799 में महाराजा सवाई प्रताप सिंह ने बनवाया था।', 'जयपुर का प्रतीक, 953 छोटी खिड़कियों (झरोखों) वाला अद्वितीय महल।', ARRAY['hawa mahal', 'jaipur', 'rajpalace', 'pink city'], ARRAY['Palace of Winds'], ARRAY['Hawa mahal ke baare mein batao', 'Hawa mahal kyon prasidh hai'], 'f0000001-0000-0000-0000-000000000021', 'hi')
ON CONFLICT DO NOTHING;
