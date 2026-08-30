/* ========================================
   Dharohar AI — Language Configuration
   ========================================
   Centralized language definitions for chatbot support.
   All language references throughout the codebase should
   import from this module.
   ======================================== */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  welcomeMessage: string;
  unknownIntentResponse: string;
  greetingResponses: string[];
}

export const SUPPORTED_LANGUAGES: Record<string, Language> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    welcomeMessage:
      "Welcome to **Heritage Atlas** — your intelligent heritage guide.\n\nExplore India's cultural heritage across 12 states and 6 languages. Discover temples, forts, crafts, waterfalls, forests, wildlife, food, traditions, and stories.",
    unknownIntentResponse:
      "I couldn't find verified information about that topic. Try asking about a specific heritage site, craft, or historical figure from one of our supported states.",
    greetingResponses: [
      "Hello! I'm Dharohar AI, your heritage guide. Ask me about India's cultural heritage — temples, forts, crafts, traditions, or historical figures.",
      "Namaste! I can tell you about Gujarat, Rajasthan, Punjab, Goa, Tamil Nadu, Maharashtra, Madhya Pradesh, Delhi, Kerala, Jammu & Kashmir, Assam, or Odisha heritage.",
      "Welcome! Ask me about heritage sites, crafts, traditions, or historical figures across India.",
    ],
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    welcomeMessage:
      "**Heritage Atlas** માં આપનું સ્વાગત છે — ભારતના સાંસ્કૃતિક વારસાનો તમારો બુદ્ધિશાળી માર્ગદર્શક.\n\n12 રાજ્યો અને 6 ભાષાઓમાં ભારતના સાંસ્કૃતિક વારસાને શોધો. મંદિરો, કિલ્લાઓ, હસ્તકલા, પ્રકૃતિ, ખોરાક અને પરંપરાઓ વિશે પૂછો.",
    unknownIntentResponse:
      "હજુ સુધી એ વિષય વિશે મારી પાસે પૂરતી ચકાસાયેલ માહિતી નથી. કોઈ ચોક્કસ વારસા સ્થળ, હસ્તકલા અથવા ઐતિહાસિક વ્યક્તિ વિશે પૂછો.",
    greetingResponses: [
      "નમસ્તે! હું ધરોહર AI છું, તમારો વારસા માર્ગદર્શક. ભારતના સાંસ્કૃતિક વારસા વિશે મને પૂછો — મંદિરો, કિલ્લાઓ, હસ્તકલા, પરંપરાઓ.",
      "નમસ્તે! મને મંદિરો, કિલ્લાઓ, હસ્તકલા અથવા પરંપરાઓ વિશે પૂછો.",
    ],
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    welcomeMessage:
      "**Heritage Atlas** में आपका स्वागत है — भारत की सांस्कृतिक विरासत का आपका बुद्धिमान गाइड.\n\n12 राज्यों और 6 भाषाओं में भारत की विरासत की खोज करें. मंदिरों, किलों, जलप्रपातों, वन्यजीवों, खाने और परंपराओं के बारे में पूछें.",
    unknownIntentResponse:
      "उस विषय के बारे में मेरे पास अभी पर्याप्त सत्यापित जानकारी नहीं है. किसी विशिष्ट विरासत स्थल, शिल्प या ऐतिहासिक व्यक्ति के बारे में पूछें.",
    greetingResponses: [
      "नमस्ते! मैं धरोहर AI हूं, आपका विरासत गाइड. भारत की सांस्कृतिक विरासत के बारे में मुझसे पूछें।",
      "नमस्ते! मंदिरों, किलों, शिल्पों या परंपराओं के बारे में मुझसे पूछें।",
    ],
  },
  mr: {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    welcomeMessage:
      "**Heritage Atlas** मध्ये आपले स्वागत आहे — भारताच्या सांस्कृतिक वारशाचा आपला बुद्धिमान मार्गदर्शक.\n\n12 राज्यांमध्ये भारताच्या वारशाचा शोध घ्या. मंदिरे, किल्ले, झरे, वन्यजीवे, अन्न आणि परंपरांबद्दल विचारा.",
    unknownIntentResponse:
      "त्या विषयाबद्दल माझ्याकडे अजून पुरेसी चकासलेली माहिती नाही. कोणत्याही विशिष्ट वारसा स्थळाबद्दल विचारा.",
    greetingResponses: [
      "नमस्कार! मी धरोहर AI आहे, तुमचा वारसा मार्गदर्शक. भारताच्या सांस्कृतिक वारशाबद्दल मला विचारा.",
    ],
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    welcomeMessage:
      "**Heritage Atlas**-க்கு வரவேற்கிறோம் — இந்தியாவின் கலாச்சார பாரம்பரியத்தின் உங்கள் புத்திசாலி வழிகாட்டி.\n\n12 மாநிலங்களில் இந்தியாவின் பாரம்பரியத்தை ஆராயுங்கள். கோவில்கள், கோட்டைகள், நீர்வீழ்ச்சிகள், உணவு மற்றும் பண்பாடு பற்றி கேளுங்கள்.",
    unknownIntentResponse:
      "அந்த தலைப்பு பற்றி எனக்கு இன்னும் போதுமான சரிபார்க்கப்பட்ட தகவல் இல்லை. ஒரு குறிப்பிட்ட பாரம்பரிய தளம் பற்றி கேட்க முடியுமா?",
    greetingResponses: [
      "வணக்கம்! நான் தரோகர் AI, உங்கள் பாரம்பரிய வழிகாட்டி. இந்தியாவின் கலாச்சார பாரம்பரியம் பற்றி கேளுங்கள்.",
    ],
  },
  pa: {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    welcomeMessage:
      "**Heritage Atlas** ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ — ਭਾਰਤ ਦੀ ਸੱਭਿਆਚਾਰਕ ਵਿਰਾਸਤ ਦਾ ਤੁਹਾਡਾ ਸਮਝਦਾਰ ਗਾਈਡ.\n\n12 ਰਾਜਾਂ ਵਿੱਚ ਭਾਰਤ ਦੀ ਵਿਰਾਸਤ ਦੀ ਖੋਜ ਕਰੋ. ਮੰਦਿਰਾਂ, ਕਿਲ੍ਹਿਆਂ, ਝਰਨਿਆਂ, ਜੰਗਲਾਂ, ਖਾਣੇ ਜਾਂ ਪਰੰਪਰਾਵਾਂ ਬਾਰੇ ਪੁੱਛੋ.",
    unknownIntentResponse:
      "ਉਸ ਵਿਸ਼ੇ ਬਾਰੇ ਮੇਰੇ ਕੋਲ ਅਜੇ ਲੋੜੀਂਦੀ ਤਸਦੀਕ ਕੀਤੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਹੈ. ਕਿਸੇ ਖਾਸ ਵਿਰਾਸਤੀ ਥਾਂ ਜਾਂ ਹੁਣਰ ਬਾਰੇ ਪੁੱਛੋ.",
    greetingResponses: [
      "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਧਰੋਹਰ AI ਹਾਂ, ਤੁਹਾਡਾ ਵਿਰਾਸਤ ਗਾਈਡ. ਭਾਰਤ ਦੀ ਸੱਭਿਆਚਾਰਕ ਵਿਰਾਸਤ ਬਾਰੇ ਪੁੱਛੋ.",
    ],
  },
};

export const SUPPORTED_STATE_CODES = [
  "GJ", "RJ", "PB", "GA", "TN", "MH", "MP", "DL",
  "KL", "JK", "AS", "OD",
] as const;

export type SupportedStateCode = (typeof SUPPORTED_STATE_CODES)[number];

export function isValidLanguage(code: string): code is keyof typeof SUPPORTED_LANGUAGES {
  return code in SUPPORTED_LANGUAGES;
}

export function getLanguage(code: string): Language | undefined {
  return SUPPORTED_LANGUAGES[code];
}

export function getWelcomeMessage(code: string): string {
  return getLanguage(code)?.welcomeMessage ?? SUPPORTED_LANGUAGES.en.welcomeMessage;
}

export function getGreetingResponse(code: string): string {
  const lang = getLanguage(code);
  if (!lang) return SUPPORTED_LANGUAGES.en.greetingResponses[0];
  return lang.greetingResponses[Math.floor(Math.random() * lang.greetingResponses.length)];
}

export function getUnknownResponse(code: string): string {
  return getLanguage(code)?.unknownIntentResponse ?? SUPPORTED_LANGUAGES.en.unknownIntentResponse;
}

/* ---- Context-Aware Suggestions ---- */

export interface ChatSuggestion {
  text: string;
  category: string;
}

const SUGGESTIONS_EN: ChatSuggestion[] = [
  { text: "Explore Gujarat heritage", category: "explore" },
  { text: "Tell me about Rajasthan forts", category: "explore" },
  { text: "What is the Golden Temple?", category: "heritage" },
  { text: "Describe Bharatanatyam dance", category: "culture" },
  { text: "Show me heritage places in Delhi", category: "explore" },
  { text: "Tell me about Maharashtra heritage", category: "explore" },
  { text: "What is Patola silk weaving?", category: "craft" },
  { text: "Who built the Red Fort?", category: "history" },
  { text: "Tell me about Tamil Nadu temples", category: "heritage" },
  { text: "What can I explore in Goa?", category: "explore" },
  { text: "Describe Warli tribal art", category: "craft" },
  { text: "Tell me about Madhya Pradesh heritage", category: "explore" },
  { text: "What happened at Jallianwala Bagh?", category: "history" },
  { text: "Tell me about Khajuraho Temples", category: "heritage" },
  { text: "What is special about North Malabar?", category: "explore" },
  { text: "Tell me about Gurez Valley", category: "explore" },
  { text: "What is Majuli island famous for?", category: "explore" },
  { text: "Show waterfalls in India", category: "explore" },
  { text: "What is Chettinad cuisine?", category: "food" },
  { text: "Tell me about Satkosia Gorge", category: "explore" },
  { text: "Show wildlife sanctuaries", category: "explore" },
];

const SUGGESTIONS_GU: ChatSuggestion[] = [
  { text: "gujarat na heritage places vishe janavo", category: "explore" },
  { text: "modhera surya mandir vishe mahiti aapo", category: "heritage" },
  { text: "rani ki vav kya aveli chhe", category: "location" },
  { text: "gujarat ma kaya historical places chhe", category: "explore" },
  { text: "kutch na hathkala vishe janavo", category: "craft" },
  { text: "garba nritya vishe janavo", category: "culture" },
  { text: "somnath mandir no itihas janavo", category: "history" },
  { text: "ahmedabad ni heritage sites batavo", category: "explore" },
  { text: "gujarat no itihas janavo", category: "history" },
  { text: "gandhi ji nu jivan vishe batavo", category: "history" },
  { text: "gujarat ni sanskrutik virasat shu chhe", category: "explore" },
  { text: "patan ni rani ki vav vishe janavo", category: "heritage" },
  { text: "gujarat ma farva jeva historical places kaya chhe", category: "explore" },
  { text: "dwarka mandir vishe mahiti aapo", category: "heritage" },
];

const SUGGESTIONS_HI: ChatSuggestion[] = [
  { text: "राजस्थान की विरासत के बारे में बताइए", category: "explore" },
  { text: "गोल्डन टेम्पल का इतिहास बताओ", category: "history" },
  { text: "महाराष्ट्र में कौन से किले हैं?", category: "heritage" },
  { text: "पंजाब की विरासत के बारे में बताओ", category: "explore" },
  { text: "राजस्थान के किल्लों के बारे में बताओ", category: "heritage" },
];

const SUGGESTIONS_MR: ChatSuggestion[] = [
  { text: "महाराष्ट्रातील किल्ल्यांबद्दल माहिती द्या", category: "explore" },
  { text: "महाराष्ट्रातील वारसा स्थळांबद्दल सांगा", category: "heritage" },
  { text: "शिवाजी महाराज यांच्याबद्दल सांगा", category: "history" },
];

const SUGGESTIONS_TA: ChatSuggestion[] = [
  { text: "தமிழ்நாட்டின் பாரம்பரிய இடங்களைப் பற்றி சொல்லுங்கள்", category: "explore" },
  { text: "மீனாக்ஷி அம்மன் கோவில் பற்றி சொல்லுங்கள்", category: "heritage" },
  { text: "பரதநாட்டியம் பற்றி சொல்லுங்கள்", category: "culture" },
];

const SUGGESTIONS_PA: ChatSuggestion[] = [
  { text: "ਪੰਜਾਬ ਦੀ ਵਿਰਾਸਤ ਬਾਰੇ ਦੱਸੋ", category: "explore" },
  { text: "ਗੋਲਡਨ ਟੈਂਪਲ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ", category: "history" },
  { text: "ਭੰਗਰਾ ਨ੍ਰਿਤਿਆ ਬਾਰੇ ਦੱਸੋ", category: "culture" },
];

const ALL_SUGGESTIONS: Record<string, ChatSuggestion[]> = {
  en: SUGGESTIONS_EN,
  gu: SUGGESTIONS_GU,
  hi: SUGGESTIONS_HI,
  mr: SUGGESTIONS_MR,
  ta: SUGGESTIONS_TA,
  pa: SUGGESTIONS_PA,
};

const STATE_SUGGESTIONS: Record<string, Record<string, ChatSuggestion[]>> = {
  GJ: {
    en: [
      { text: "Tell me about Gujarat heritage", category: "explore" },
      { text: "What are famous temples in Gujarat?", category: "heritage" },
      { text: "Describe Patola silk weaving", category: "craft" },
      { text: "Tell me about Rani ki Vav", category: "heritage" },
    ],
    gu: [
      { text: "gujarat na heritage places vishe janavo", category: "explore" },
      { text: "modhera surya mandir vishe mahiti aapo", category: "heritage" },
      { text: "gujarat ni famous crafts kai chhe", category: "craft" },
      { text: "gujarat na kila vishe janavo", category: "heritage" },
    ],
  },
  RJ: {
    en: [
      { text: "Tell me about Rajasthan forts", category: "explore" },
      { text: "Describe Blue Pottery of Jaipur", category: "craft" },
      { text: "Who was Maharana Pratap?", category: "history" },
      { text: "Tell me about Amber Fort", category: "heritage" },
    ],
    hi: [
      { text: "राजस्थान के किल्लों के बारे में बताओ", category: "explore" },
      { text: "हवा महल क्यों फेमस है", category: "heritage" },
    ],
  },
  PB: {
    en: [
      { text: "Tell me about Golden Temple", category: "heritage" },
      { text: "Describe Phulkari embroidery", category: "craft" },
      { text: "What happened at Jallianwala Bagh?", category: "history" },
    ],
    pa: [
      { text: "ਗੋਲਡਨ ਟੈਂਪਲ ਦਾ ਇਤਿਹਾਸ ਦੱਸੋ", category: "history" },
      { text: "ਫੁਲਕਾਰੀ ਕਿਵੇਂ ਬਣੀ ਜਾਂਦੀ ਹੈ", category: "craft" },
    ],
  },
  MH: {
    en: [
      { text: "Tell me about Ajanta Caves", category: "heritage" },
      { text: "Describe Warli tribal art", category: "craft" },
      { text: "Who was Shivaji Maharaj?", category: "history" },
    ],
    mr: [
      { text: "अजिंठा गुंफांबद्दल माहिती द्या", category: "heritage" },
      { text: "वारली कला बद्दल सांगा", category: "craft" },
    ],
  },
  TN: {
    en: [
      { text: "Tell me about Meenakshi Temple", category: "heritage" },
      { text: "Describe Bharatanatyam dance", category: "culture" },
      { text: "What are Chola Bronzes?", category: "craft" },
    ],
    ta: [
      { text: "மீனாக்ஷி அம்மன் கோவில் பற்றி சொல்லுங்கள்", category: "heritage" },
      { text: "பரதநாட்டியம் பற்றி சொல்லுங்கள்", category: "culture" },
    ],
  },
  GA: {
    en: [
      { text: "Tell me about Basilica of Bom Jesus", category: "heritage" },
      { text: "What is the Goa Carnival?", category: "culture" },
      { text: "Describe Portuguese heritage in Goa", category: "history" },
    ],
  },
  MP: {
    en: [
      { text: "Tell me about Khajuraho Temples", category: "heritage" },
      { text: "What is the Sanchi Stupa?", category: "heritage" },
      { text: "Describe Gond tribal art", category: "craft" },
    ],
  },
  DL: {
    en: [
      { text: "Tell me about Red Fort Delhi", category: "heritage" },
      { text: "What is the Qutub Minar?", category: "heritage" },
      { text: "Describe Chandni Chowk market", category: "culture" },
    ],
  },
  KL: {
    en: [
      { text: "Tell me about North Malabar Theyyam", category: "heritage" },
      { text: "What are Kerala backwaters?", category: "explore" },
      { text: "Show waterfalls in Kerala", category: "explore" },
    ],
  },
  JK: {
    en: [
      { text: "Tell me about Gurez Valley", category: "explore" },
      { text: "What is Dard-Shina culture?", category: "culture" },
      { text: "Show mountains in Kashmir", category: "explore" },
    ],
  },
  AS: {
    en: [
      { text: "Tell me about Majuli island", category: "explore" },
      { text: "What are Satras in Assam?", category: "heritage" },
      { text: "Show mask making in Majuli", category: "craft" },
    ],
  },
  OD: {
    en: [
      { text: "Tell me about Satkosia Gorge", category: "explore" },
      { text: "What is Kalinga temple architecture?", category: "heritage" },
      { text: "Show wildlife in Odisha", category: "explore" },
    ],
  },
};

const INTENT_SUGGESTIONS: Record<string, Record<string, ChatSuggestion[]>> = {
  heritage_information: {
    en: [
      { text: "Tell me more about this heritage site", category: "follow-up" },
      { text: "Where is this located?", category: "follow-up" },
      { text: "What is its historical period?", category: "follow-up" },
    ],
    gu: [
      { text: "aa sthal vishay ma vadhare mahiti aapo", category: "follow-up" },
      { text: "aa kya avelu chhe", category: "follow-up" },
      { text: "aa kya yug nu chhe", category: "follow-up" },
    ],
  },
  state_exploration: {
    en: [
      { text: "What are the UNESCO sites in this state?", category: "follow-up" },
      { text: "What crafts are famous here?", category: "follow-up" },
      { text: "Tell me about historical events here", category: "follow-up" },
    ],
    gu: [
      { text: "aa rajya ma kai UNESCO sites chhe", category: "follow-up" },
      { text: "aa rajya ni kai famous crafts chhe", category: "follow-up" },
      { text: "aa rajya no itihas janavo", category: "follow-up" },
    ],
  },
  craft_information: {
    en: [
      { text: "Where is this craft practiced?", category: "follow-up" },
      { text: "Tell me about the artisans who make this", category: "follow-up" },
    ],
  },
  location_information: {
    en: [
      { text: "What heritage sites are near this location?", category: "follow-up" },
      { text: "What is the historical significance of this place?", category: "follow-up" },
    ],
  },
  greeting: {
    en: [
      { text: "Explore Gujarat heritage", category: "explore" },
      { text: "Tell me about Rajasthan", category: "explore" },
      { text: "What heritage sites can I visit?", category: "explore" },
    ],
    gu: [
      { text: "gujarat na heritage places vishe janavo", category: "explore" },
      { text: "modhera surya mandir vishe mahiti aapo", category: "explore" },
    ],
  },
  unknown: {
    en: [
      { text: "Tell me about Gujarat heritage", category: "explore" },
      { text: "Show me historical places", category: "explore" },
      { text: "Explore Rajasthan", category: "explore" },
    ],
    gu: [
      { text: "gujarat na heritage places vishe janavo", category: "explore" },
      { text: "gujarat no itihas janavo", category: "explore" },
    ],
  },
};

export function getSuggestionsForContext(
  lastIntent: string | null,
  lastState: SupportedStateCode | null,
  language: string
): ChatSuggestion[] {
  // Priority 1: State-specific suggestions after state exploration
  if (lastState && STATE_SUGGESTIONS[lastState]?.[language]) {
    return STATE_SUGGESTIONS[lastState][language].slice(0, 3);
  }
  if (lastState && STATE_SUGGESTIONS[lastState]?.["en"]) {
    return STATE_SUGGESTIONS[lastState]["en"].slice(0, 3);
  }

  // Priority 2: Intent-specific follow-up suggestions
  if (lastIntent && INTENT_SUGGESTIONS[lastIntent]?.[language]) {
    return INTENT_SUGGESTIONS[lastIntent][language].slice(0, 3);
  }
  if (lastIntent && INTENT_SUGGESTIONS[lastIntent]?.["en"]) {
    return INTENT_SUGGESTIONS[lastIntent]["en"].slice(0, 3);
  }

  // Priority 3: Default suggestions for the language
  const langSuggestions = ALL_SUGGESTIONS[language] || ALL_SUGGESTIONS["en"];
  // Pick 4 random suggestions
  const shuffled = [...langSuggestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}
