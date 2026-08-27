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
      "Welcome to Dharohar AI. I can help you explore the heritage of India. Ask me about temples, forts, crafts, historical figures, or traditions from any of our supported states.",
    unknownIntentResponse:
      "I don't have enough verified information about that topic yet. Could you try asking about a specific heritage site, craft, or historical figure from one of our supported states?",
    greetingResponses: [
      "Hello! I'm Dharohar AI, your heritage guide. Ask me about India's cultural heritage.",
      "Namaste! Ask me about heritage sites, crafts, traditions, or historical figures across India.",
      "Welcome! I can tell you about Gujarat, Rajasthan, Punjab, Goa, Tamil Nadu, Maharashtra, Madhya Pradesh, or Delhi heritage.",
    ],
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    welcomeMessage:
      "ધરોહર AI માં આપનું સ્વાગત છે. હું ભારતના વારસાને શોધવામાં તમારી મદદ કરી શકું છું. મંદિરો, કિલ્લાઓ, હસ્તકલા, ઐતિહાસિક વ્યક્તિઓ અથવા પરંપરાઓ વિશે પૂછો.",
    unknownIntentResponse:
      "હજુ સુધી એ વિષય વિશે મારી પાસે પૂરતી ચકાસાયેલ માહિતી નથી. શું તમે કોઈ ચોક્કસ વારસા સ્થળ, હસ્તકલા અથવા ઐતિહાસિક વ્યક્તિ વિશે પૂછી શકો છો?",
    greetingResponses: [
      "નમસ્તે! હું ધરોહર AI છું, તમારો વારસા માર્ગદર્શક. ભારતના સાંસ્કૃતિક વારસા વિશે મને પૂછો.",
      "નમસ્તે! મને મંદિરો, કિલ્લાઓ, હસ્તકલા અથવા પરંપરાઓ વિશે પૂછો.",
    ],
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    welcomeMessage:
      "धरोहर AI में आपका स्वागत है। मैं भारत की विरासत की खोज में आपकी मदद कर सकता हूं। मंदिरों, किलों, शिल्पों, ऐतिहासिक व्यक्तियों या परंपराओं के बारे में पूछें।",
    unknownIntentResponse:
      "उस विषय के बारे में मेरे पास अभी पर्याप्त सत्यापित जानकारी नहीं है। क्या आप किसी विशिष्ट विरासत स्थल, शिल्प या ऐतिहासिक व्यक्ति के बारे में पूछ सकते हैं?",
    greetingResponses: [
      "नमस्ते! मैं धरोहर AI हूं, आपका विरासत गाइड। भारत की सांस्कृतिक विरासत के बारे में मुझसे पूछें।",
      "नमस्ते! मंदिरों, किलों, शिल्पों या परंपराओं के बारे में मुझसे पूछें।",
    ],
  },
  mr: {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    welcomeMessage:
      "धरोहर AI मध्ये आपले स्वागत आहे. मी भारताच्या वारशाचा शोध घेण्यास तुम्हाला मदत करू शकतो. मंदिरे, किल्ले, हस्तकला, ऐतिहासिक व्यक्ती किंवा परंपरांबद्दल विचारा.",
    unknownIntentResponse:
      "त्या विषयाबद्दल माझ्याकडे अजून पुरेसी चकासलेली माहिती नाही. तुम्ही कोणत्याऀ विशिष्ट वारसा स्थळाबद्दल विचारू शकता.",
    greetingResponses: [
      "नमस्कार! मी धरोहर AI आहे, तुमचा वारसा मार्गदर्शक. भारताच्या सांस्कृतिक वारशाबद्दल मला विचारा.",
    ],
  },
  ta: {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    welcomeMessage:
      "தரோகர் AI-க்கு வரவேற்கிறோம். இந்தியாவின் பாரம்பரியத்தை ஆராய நாங்கள் உங்களுக்கு உதவ முடியும். கோவில்கள், கோட்டைகள், கைவினைகள், வரலாற்று நபர்கள் அல்லது மரபுகள் பற்றி கேளுங்கள்.",
    unknownIntentResponse:
      "அந்த தலைப்பு பற்றி எனக்கு இன்னும் போதுமான சரிபார்க்கப்பட்ட தகவல் இல்லை. ஒரு குறிப்பிட்ட பாரம்பரிய தளம் அல்லது கைவினை பற்றி கேட்க முடியுமா?",
    greetingResponses: [
      "வணக்கம்! நான் தரோகர் AI, உங்கள் பாரம்பரிய வழிகாட்டி. இந்தியாவின் கலாச்சார பாரம்பரியம் பற்றி கேளுங்கள்.",
    ],
  },
  pa: {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    welcomeMessage:
      "ਧਰੋਹਰ AI ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਭਾਰਤ ਦੀ ਵਿਰਾਸਤ ਦੀ ਖੋਜ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਮੰਦਿਰਾਂ, ਕਿਲ੍ਹਿਆਂ, ਹੁਣਰ ਜਾਂ ਇਤਿਹਾਸਕ ਹਸਤੀਆਂ ਬਾਰੇ ਪੁੱਛੋ।",
    unknownIntentResponse:
      "ਉਸ ਵਿਸ਼ੇ ਬਾਰੇ ਮੇਰੇ ਕੋਲ ਅਜੇ ਲੋੜੀਂਦੀ ਤਸਦੀਕ ਕੀਤੀ ਜਾਣਕਾਰੀ ਨਹੀਂ ਹੈ। ਕੀ ਤੁਸੀਂ ਕਿਸੇ ਖਾਸ ਵਿਰਾਸਤੀ ਥਾਂ ਜਾਂ ਹੁਣਰ ਬਾਰੇ ਪੁੱਛ ਸਕਦੇ ਹੋ?",
    greetingResponses: [
      "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਧਰੋਹਰ AI ਹਾਂ, ਤੁਹਾਡਾ ਵਿਰਾਸਤ ਗਾਈਡ। ਭਾਰਤ ਦੀ ਸੱਭਿਆਚਾਰਕ ਵਿਰਾਸਤ ਬਾਰੇ ਪੁੱਛੋ।",
    ],
  },
};

export const SUPPORTED_STATE_CODES = [
  "GJ",
  "RJ",
  "PB",
  "GA",
  "TN",
  "MH",
  "MP",
  "DL",
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
