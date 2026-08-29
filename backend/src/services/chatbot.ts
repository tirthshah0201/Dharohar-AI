/* ========================================
   Dharohar AI — Chatbot Service
   ========================================
   Project-grounded response pipeline with
   Romanized Gujarati support, geocoding,
   context-aware suggestions, and RG response mode.
   ======================================== */

import { query } from "../database";
import {
  isValidLanguage,
  getGreetingResponse,
  getUnknownResponse,
  getSuggestionsForContext,
  SUPPORTED_STATE_CODES,
  type SupportedStateCode,
} from "../config/languages";

/* ---- Romanized Gujarati Detection ---- */

const ROMANIZED_GUJARATI_INDICATORS = [
  "chhe", "che", "shu", "su", "kai", "kaya", "kya", "kyare",
  "kem", "ketla", "ketli", "vishe", "vise", "mahiti", "janavo", "aapo",
  "batavo", "baro", "barsa", "varsa", "itihas", "virasat",
  "jagya", "sthal", "mandir", "kila", "durg", "halo",
  "karo", "jano", "sheno", "kay",
  "farva", "jeva", "jevi", "evu", "evi", "hato", "hati",
  "aavi", "aave", "aavelo", "aavti", "kevi", "karto",
  "vishay", "sthiti", "paristhiti", "samay", "yug",
  "lakhay", "chahiye", "bani", "daso",
];

const ROMANIZED_GUJARATI_PATTERN =
  /\b(chhe|che|shu|su|kai|kaya|kya|kyare|kem|ketla|ketli|vishe|vise|mahiti|janavo|aapo|batavo|baro|barsa|varsa|itihas|virasat|jagya|sthal|mandir|kila|durg|halo|karo|jano|sheno|farva|jeva|jevi|evu|evi|hato|hati|aavi|aave|aavelo|aavti|kevi|karto|vishay|sthiti|samay|yug|lakhay|bani|daso)\b/i;

function isRomanizedGujarati(message: string): boolean {
  const lower = message.toLowerCase();
  const hasIndicator = ROMANIZED_GUJARATI_PATTERN.test(lower);
  const hasGujaratContext = /\b(gujarat|ahmedabad|patan|somnath|modhera|dwarka|rajkot|bhuj|kutch|junagadh|vadodara|surat|gandhinagar|diu|palitana|champaner|lothal|statue of unity|gandhi)\b/i.test(lower);
  const hasHindiIndicators = /\b(batao|bolo|bataiye|kaise|bataiye|hai|mein|ka|ki|ke|ko|se|ne|aur|ya)\b/i.test(lower);
  return hasIndicator || (hasGujaratContext && !hasHindiIndicators);
}

/* ---- Romanized Gujarati Response Mode Detection ---- */

function wantsRomanizedResponse(message: string): boolean {
  return /\b(roman|roman gujarati|english letters|english ma|roman ma|romanized)\b/i.test(message);
}

/* ---- Intent Detection ---- */

type Intent =
  | "greeting"
  | "heritage_information"
  | "location_information"
  | "state_exploration"
  | "historical_period"
  | "craft_information"
  | "person_information"
  | "festival_information"
  | "unknown";

const GREETING_PATTERNS =
  /^(hi|hello|hey|namaste|namaskar|vanakkam|sat sri akal|halo|kem cho|kaise ho|nomoshkar|good morning|good afternoon|good evening)/i;
const GREETING_PATTERNS_UNICODE =
  /નમસ્તે|નમસ્કાર|કેમ છો|नमस्ते|नमस्कार|வணக்கம்|ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ|ਨਮਸਤੇ/;

const STATE_KEYWORDS: Record<string, SupportedStateCode> = {
  // English
  gujarat: "GJ", rajasthan: "RJ", punjab: "PB", goa: "GA",
  "tamil nadu": "TN", tamil: "TN", maharashtra: "MH",
  "madhya pradesh": "MP", delhi: "DL", "new delhi": "DL",
  ahmedabad: "GJ", jaipur: "RJ", amritsar: "PB", panaji: "GA",
  madurai: "TN", mumbai: "MH", bhopal: "MP",
  somnath: "GJ", dwarka: "GJ", patan: "GJ", rajkot: "GJ",
  bhuj: "GJ", kutch: "GJ", junagadh: "GJ", vadodara: "GJ",
  surat: "GJ", gandhinagar: "GJ", modhera: "GJ", diu: "GJ",
  palitana: "GJ", champaner: "GJ", lothal: "GJ",
  // Hindi state names
  "\u0930\u093E\u091C\u0938\u094D\u0925\u093E\u0928": "RJ",  // राजस्थान
  "\u092A\u0902\u091C\u093E\u092C": "PB",  // पंजाब
  "\u0917\u094B\u0935\u093E": "GA",  // गोवा
  "\u0924\u092E\u093F\u0932": "TN",  // तमिल
  "\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930": "MH",  // महाराष्ट्र
  "\u092E\u0927\u094D\u092F \u092A\u094D\u0930\u0926\u0947\u0936": "MP",  // मध्य प्रदेश
  "\u0926\u093F\u0932\u094D\u0939\u0940": "DL",  // दिल्ली
  "\u0917\u0941\u091C\u0930\u093E\u0924": "GJ",  // गुजरात
  "\u0927\u094B\u0935\u091C\u093E": "GJ",  // धोजा (dwarka)
  "\u0938\u094B\u092E\u0928\u093E\u0925": "GJ",  // सोमनाथ
  "\u092E\u094B\u0921\u094D\u0939\u0947\u0930\u093E": "GJ",  // मोढेरा
  // Hindi cities
  "\u0905\u092E\u094D\u0930\u093F\u0924\u0938\u0930": "PB",  // अमृतसर
  "\u091C\u092F\u092A\u0941\u0930": "RJ",  // जयपुर
  "\u092E\u0941\u0902\u092C\u0907": "MH",  // मुंबई
  "\u092D\u094B\u092A\u093E\u0932": "MP",  // भोपाल
  // Marathi state/city names
  // (Maharashtra in Marathi uses the same Unicode as Hindi महाराष्ट्र, already listed above)
  // Gujarati state names
  "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4": "GJ",  // ગુજરાત
  "\u0AB0\u0ABE\u0A9C\u0AB8\u0ACD\u0AA5\u0ABE\u0A82": "RJ",  // રાજસ્થાન
  "\u0AAA\u0A82\u0A9C\u0ABE\u0AAC": "PB",  // પંજાબ
  "\u0A97\u0acb\u0AB5\u0ABE": "GA",  // ગોવા
  "\u0A9F\u0ABF\u0A9C\u0ABF\u0AA4 \u0A9F\u0AC1": "TN",  // ટિજિટ ટુ
  "\u0AAE\u0AB9\u0ABE\u0AB0\u0ABE\u0AB7\u0ACD\u0A9F\u0ACD\u0AB0": "MH",  // મહારાષ્ટ્ર
  "\u0A2E\u0A27\u0acd\u0AAF \u0AAA\u0acd\u0AB0\u0A26\u0AC7\u0AB6": "MP",  // મધ્ય પ્રદેશ
  "\u0A26\u0ABF\u0AB2\u0acd\u0AB9\u0AC0": "DL",  // દિલ્હી
};

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();
  if (GREETING_PATTERNS.test(lower) || GREETING_PATTERNS_UNICODE.test(message)) return "greeting";

  // Heritage sites: temples, forts, monuments, etc.
  if (/\b(temple|mosque|church|monument|fort|palace|stepwell|stupa|cave|killo|kovil|masjid|mandir|kila|durg|surya mandir|ashram|haveli|ruins|archaeolog)\b/i.test(lower))
    return "heritage_information";
  // Non-Latin heritage keywords by script
  if (/મંદિર|કિલ્લો|મસ્જિદ|દુર્ગ|ગુંફ|ભવન/i.test(message)) return "heritage_information";  // Gujarati
  if (/मंदिर|किल्ला|मस्जिद|किला|गुंफा|मंदिरे|किल्ल्य|स्थळ/i.test(message)) return "heritage_information";  // Hindi+Marathi
  if (/கோவில்|கோட்டை|மசூதி|குகை|தூபி/i.test(message)) return "heritage_information";  // Tamil
  if (/ਮੰਦਿਰ|ਕਿੱਲਾ|ਮਸਜਿਦ|ਗੁੰਫਾ|ਕਿੱਲੇ/i.test(message)) return "heritage_information";  // Punjabi

  // Crafts and arts
  if (/\b(crafts?|weaving|embroidery|art|pottery|silk|textile|bronze|painting|kalaa|hathkala|bandhani|patola)\b/i.test(lower) ||
      /હસ્તકલા|શિલ્પ|કલા|બાંધણી|પટોળા|शिल्प|कला|शिल्पकला|कौशल|कारीगरी|கைவினை|நெசவு|ਹੁਣਰ|ਕਲਾ|ਫੁਲਕਾਰੀ|ਬੁਣਾਈ|ਮਾਹਿਰ/i.test(message))
    return "craft_information";

  // Person information: be specific to avoid false positives (e.g. "rani ki vav" is a place, not a person)
  if (/\b(king|queen|leader|emperor|saint|poet|warrior|maharaja|guru|who was|who built|who is)\b/i.test(lower))
    return "person_information";
  if (/\b(gandhi|sardar patel|vallabhbhai|shivaji|maharana pratap|ranjit singh)\b/i.test(lower) &&
      !/\b(ki vav|ni vav|vav|stepwell|temple|fort|palace|mandir)\b/i.test(lower))
    return "person_information";
  if (/\b(rani)\b/i.test(lower) &&
      /\b(padmini|durgavati|lakshmi|velu nachiyar|sati|lakshmibai)\b/i.test(lower))
    return "person_information";

  // Festival and cultural events
  if (/\b(festival|celebration|dance|garba|bhangra|carnival|navratri|nritya|utsav)\b/i.test(lower))
    return "festival_information";
  // Non-Latin festival keywords
  if (/ઉત્સવ|ગરબા|નૃત્ય|नृत्य|उत्सव|नाच|நடனம்|விழா|ਨੱਚ|ਉੱਚ|ઉત્સવ/i.test(message))
    return "festival_information";

  // Historical period
  if (/\b(period|era|dynasty|century|ancient|medieval|colonial|modern|history|historical|samay|yug)\b/i.test(lower))
    return "historical_period";
  // Non-Latin history keywords (Hindi: इतिहास, Gujarati: ઇતિહાસ, Tamil: வரலாறு, Punjabi: ਇਤਿਹਾਸ)
  if (/ઇતિહાસ|ઇતિહાસ|વારસો|વર્ષ|इतिहास|ઇतिहास|वंश|वरलारू|ਇਤਿਹਾਸ|ਵਰਲਾਰੂ|varalaru|itihas/i.test(message))
    return "historical_period";

  // State exploration: match specific heritage/state keywords
  if (/\b(explore|what can|tell me about|places|sites|what to see)\b/i.test(lower))
    return "state_exploration";
  // Romanized Gujarati exploration keywords
  if (/\b(virasat|varshe|janavo|vishe|vise|batavo|daso|kive|bare|mahiti|farva|jeva|farva jeva)\b/i.test(lower))
    return "state_exploration";
  // Non-Latin exploration keywords (Hindi: बताओ, Gujarati: વારસો, Tamil: சொல்லுங்கள், Punjabi: ਦੱਸੋ)
  if (/વારસો|વિરાસત|પાસે|બતાવો|વિશે|માહિતી|जानवो|बताओ|विरासत|विशे|சொல்லுங்கள்|பற்றி|ஆராய|ਦੱਸੋ|ਵਿਰਾਸਤ|ਬਾਰੇ|ਖੋਜੋ/i.test(message))
    return "state_exploration";

  // Location information
  if (/\b(location|city|where|place|district|kuthhe|kahaan|sthalo|located|kya aveli|kya che|kya chhe|kya thi|kya aavelu)\b/i.test(lower))
    return "location_information";

  return "unknown";
}

function detectState(message: string): SupportedStateCode | null {
  const lower = message.toLowerCase();
  // Try longest keywords first to avoid partial matches
  const sorted = Object.entries(STATE_KEYWORDS).sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, code] of sorted) {
    if (lower.includes(keyword)) return code;
  }
  return null;
}

function extractKeywords(message: string): string[] {
  const words = message
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F\u0A80-\u0AFF\u0B80-\u0BFF]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const stopWords = new Set([
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "has", "his", "how", "its", "may",
    "new", "now", "old", "see", "way", "who", "did", "get", "let", "say",
    "she", "too", "use", "tell", "about", "me", "what", "some", "them",
    "than", "this", "that", "with", "have", "from", "they", "been", "said",
    "each", "make", "like", "your", "will", "there", "their", "show",
    "ke", "ka", "ki", "ko", "hai", "se", "me", "ne", "aur", "ya",
    "ma", "na", "ni", "no", "e", "o",
    "chhe", "che", "shu", "su", "kai", "kem", "halo",
  ]);
  return words.filter((w) => !stopWords.has(w));
}

/* ---- Geocoding (OpenStreetMap Nominatim) ---- */

interface GeoResult {
  name: string;
  displayName: string;
  lat: number;
  lon: number;
  type: string;
}

async function geocodeLocation(query_text: string): Promise<GeoResult[]> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query_text + ", India")}&format=json&limit=3&addressdetails=1`;
    const response = await fetch(url, {
      headers: { "User-Agent": "DharoharAI/1.0 (heritage-platform)" },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return [];
    const data = await response.json() as Array<{
      display_name: string; lat: string; lon: string; type: string;
      address?: { state?: string; city?: string; town?: string; village?: string };
    }>;
    return data.map((item) => ({
      name: item.address?.city || item.address?.town || item.address?.village || query_text,
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      type: item.type,
    }));
  } catch {
    return [];
  }
}

/* ---- Knowledge Retrieval ---- */

interface KnowledgeResult {
  id: string; heritage_name: string; heritage_type: string; city: string;
  historical_period: string; description: string; significance: string;
  related_event: string; related_person: string; related_craft: string;
  source: string; state_code: string;
}

async function searchKnowledge(message: string, stateCode: string | null): Promise<KnowledgeResult[]> {
  const keywords = extractKeywords(message);
  if (keywords.length === 0) return [];

  // Step 1: Try exact heritage name match first (highest relevance)
  const nameConditions = keywords.map((k, i) => `heritage_name ILIKE $${i + 1}`).join(" OR ");
  const nameParams: unknown[] = keywords.map((k) => `%${k}%`);
  const nameSql = `SELECT id, heritage_name, heritage_type, city, historical_period,
    description, significance, related_event, related_person,
    related_craft, source, state_code
  FROM chatbot_knowledge WHERE ${nameConditions} LIMIT 3`;
  const nameResult = await query(nameSql, nameParams);
  const nameResults = nameResult.rows as unknown as KnowledgeResult[];
  if (nameResults.length > 0) return nameResults;

  // Step 2: Full-text search with ranking boost for name matches
  const searchQuery = keywords.join(" ");
  let sql = `
    SELECT id, heritage_name, heritage_type, city, historical_period,
      description, significance, related_event, related_person,
      related_craft, source, state_code
    FROM chatbot_knowledge
    WHERE to_tsvector('english',
      heritage_name || ' ' || COALESCE(description, '') || ' ' ||
      COALESCE(significance, '') || ' ' || COALESCE(related_event, '') || ' ' ||
      COALESCE(related_person, '') || ' ' || COALESCE(related_craft, '') || ' ' ||
      COALESCE(array_to_string(keywords, ' '), '')
    ) @@ plainto_tsquery('english', $1)
  `;
  const params: unknown[] = [searchQuery];
  if (stateCode) { sql += " AND state_code = $2"; params.push(stateCode); }
  sql += ` ORDER BY ts_rank(
    to_tsvector('english', heritage_name || ' ' || COALESCE(description, '')),
    plainto_tsquery('english', $1)
  ) DESC LIMIT 5`;

  let { rows } = await query(sql, params);
  let results = rows as unknown as KnowledgeResult[];

  // Step 3: Fallback to ILIKE search if full-text returns nothing
  if (results.length === 0) {
    const likeConditions = keywords.map((_, i) =>
      `(heritage_name ILIKE $${i + 1} OR description ILIKE $${i + 1} OR COALESCE(significance, '') ILIKE $${i + 1} OR COALESCE(related_person, '') ILIKE $${i + 1})`
    ).join(" OR ");
    let fallbackSql = `SELECT id, heritage_name, heritage_type, city, historical_period,
      description, significance, related_event, related_person,
      related_craft, source, state_code FROM chatbot_knowledge WHERE ${likeConditions}`;
    const fallbackParams: unknown[] = keywords.map((k) => `%${k}%`);
    if (stateCode) { fallbackSql += ` AND state_code = $${keywords.length + 1}`; fallbackParams.push(stateCode); }
    fallbackSql += " LIMIT 5";
    const fallback = await query(fallbackSql, fallbackParams);
    results = fallback.rows as unknown as KnowledgeResult[];
  }
  return results;
}

async function getStateOverview(stateCode: string): Promise<KnowledgeResult[]> {
  const { rows } = await query(
    `SELECT heritage_name, heritage_type, city, description, significance, source, state_code
     FROM chatbot_knowledge WHERE state_code = $1 ORDER BY heritage_name LIMIT 8`, [stateCode]
  );
  return rows as unknown as KnowledgeResult[];
}

/* ---- Response Generation ---- */

const STATE_NAMES: Record<string, string> = {
  GJ: "Gujarat", RJ: "Rajasthan", PB: "Punjab", GA: "Goa",
  TN: "Tamil Nadu", MH: "Maharashtra", MP: "Madhya Pradesh", DL: "Delhi",
};

const STATE_NAMES_GU: Record<string, string> = {
  GJ: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4", RJ: "\u0AB0\u0ABE\u0A9C\u0AB8\u0ACD\u0AA5\u0ABE\u0A82", PB: "\u0AAA\u0A82\u0A9C\u0ABE\u0AAC", GA: "\u0A97\u0acb\u0AB5\u0ABE",
  TN: "\u0A9F\u0ABF\u0A9C\u0ABF\u0AA4 \u0A9F\u0AC1", MH: "\u0AAE\u0AB9\u0ABE\u0AB0\u0ABE\u0AB7\u0ACD\u0A9F\u0ACD\u0AB0", MP: "\u0AAE\u0A27\u0acd\u0AAF \u0AAA\u0acd\u0AB0\u0A26\u0AC7\u0AB6", DL: "\u0A26\u0ABF\u0AB2\u0acd\u0AB9\u0AC0",
};

function formatHeritageResponse(results: KnowledgeResult[], language: string): string {
  if (results.length === 0) return "";
  const parts: string[] = [];
  for (const r of results.slice(0, 3)) {
    let entry = `**${r.heritage_name}** (${r.heritage_type})`;
    if (r.city) entry += ` — ${r.city}`;
    if (r.historical_period) entry += `, ${r.historical_period}`;
    entry += `\n${r.description}`;
    if (r.significance) entry += `\nSignificance: ${r.significance}`;
    if (r.source) entry += `\nSource: ${r.source}`;
    parts.push(entry);
  }
  return parts.join("\n\n");
}

function formatGeoResponse(geoResults: GeoResult[], _language: string): string {
  if (geoResults.length === 0) return "";
  const parts: string[] = ["Location found:"];
  for (const g of geoResults.slice(0, 2)) {
    parts.push(`\uD83D\uDCCD **${g.name}** (${g.lat.toFixed(4)}, ${g.lon.toFixed(4)})`);
    parts.push(`   ${g.displayName}`);
  }
  parts.push("\n_source: OpenStreetMap_");
  return parts.join("\n");
}

function formatStateOverview(results: KnowledgeResult[], language: string): string {
  if (results.length === 0) return "";
  const list = results.map((r) =>
    `- **${r.heritage_name}** (${r.heritage_type}): ${r.description?.substring(0, 120)}...`
  ).join("\n");
  return list;
}

function getSupportedStatesList(language: string): string {
  const names = language === "gu" ? STATE_NAMES_GU : STATE_NAMES;
  return SUPPORTED_STATE_CODES.map((c) => `- ${names[c]}`).join("\n");
}

/* ---- Context-Aware Suggestions ---- */

export interface ChatSuggestion {
  text: string;
  category: string;
}

function getContextSuggestions(lastIntent: string | null, lastState: SupportedStateCode | null, language: string): ChatSuggestion[] {
  return getSuggestionsForContext(lastIntent, lastState, language);
}

/* ---- Main Chat Function ---- */

export interface ChatRequest {
  message: string; language: string; sessionId?: string;
}

export interface ChatResponse {
  reply: string; intent: string; stateCode: string | null; knowledgeIds: string[];
  suggestions: ChatSuggestion[];
}

export async function handleChat(req: ChatRequest): Promise<ChatResponse> {
  const { message, language } = req;
  const isRG = isRomanizedGujarati(message);
  const wantsRoman = wantsRomanizedResponse(message);
  // Determine response language: RG input -> Gujarati, unless user wants Romanized
  const langCode = (isValidLanguage(language) ? language : (isRG ? "gu" : "en"));
  const intent = detectIntent(message);
  const stateCode = detectState(message);

  let reply = "";
  let knowledgeIds: string[] = [];

  switch (intent) {
    case "greeting": {
      reply = getGreetingResponse(langCode);
      break;
    }
    case "heritage_information":
    case "location_information":
    case "craft_information":
    case "person_information":
    case "festival_information":
    case "historical_period": {
      const results = await searchKnowledge(message, stateCode);
      if (results.length > 0) {
        knowledgeIds = results.map((r) => r.id);
        reply = formatHeritageResponse(results, langCode);
      } else {
        if (intent === "location_information" || /where|kya|kya aveli|kya chhe|kya aavelu/i.test(message)) {
          const geoResults = await geocodeLocation(message);
          if (geoResults.length > 0) {
            reply = formatGeoResponse(geoResults, langCode);
          } else {
            reply = getUnknownResponse(langCode);
          }
        } else {
          reply = getUnknownResponse(langCode);
        }
      }
      break;
    }
    case "state_exploration": {
      if (stateCode) {
        const results = await getStateOverview(stateCode);
        if (results.length > 0) {
          knowledgeIds = results.map((r) => r.id);
          reply = formatStateOverview(results, langCode);
        } else {
          reply = getUnknownResponse(langCode);
        }
      } else {
        reply = langCode === "gu"
          ? `\u0AB9\u0AC1\u0A82 \u0A86 \u0AB8\u0ABE\u0AAA\u0acb\u0AB0\u0ACD\u0A9F\u0AC7\u0AB2 \u0AB0\u0ABE\u0A9C\u0acd\u0AAF\u0acb\u0A82\u0A9A\u0ABE \u0AB5\u0ABE\u0AB0\u0AB8\u0ABE\u0A82\u0A9A\u0AAE\u0ABE\u0A82\u0A9D \u0AB6\u0acb\u0A9C\u0AB5\u0ABE\u0A2E\u0ABE\u0A82 \u0A9A \u0AB6\u0A15\u0AC1\u0ABE \u0AB6\u0A15\u0AC1\u0AB8 \u0A9B\u0AC1\u0AB8:\n\n${getSupportedStatesList(langCode)}\n\n\u0A95\u0acb\u0A88 \u0AAA\u0ABE\u0AB8 \u0AB0\u0ABE\u0A9C\u0acd\u0AAF \u0AB5\u0ABF\u0AB6\u0ABE \u0AAA\u0AC2\u0A9B\u0acb!`
          : `I can help you explore heritage from these supported states:\n\n${getSupportedStatesList(langCode)}\n\nAsk me about any of these states!`;
      }
      break;
    }
    default: {
      const results = await searchKnowledge(message, stateCode);
      if (results.length > 0) {
        knowledgeIds = results.map((r) => r.id);
        reply = formatHeritageResponse(results, langCode);
      } else {
        reply = getUnknownResponse(langCode);
      }
      break;
    }
  }

  const suggestions = getContextSuggestions(intent, stateCode, langCode);

  return { reply, intent, stateCode, knowledgeIds, suggestions };
}

export { detectIntent, detectState, isRomanizedGujarati, wantsRomanizedResponse };
