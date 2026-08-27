/* ========================================
   Dharohar AI — Chatbot Service
   ========================================
   Project-grounded response pipeline.
   Searches the knowledge base and generates
   grounded responses with source attribution.
   ======================================== */

import { query } from "../database";
import {
  isValidLanguage,
  getGreetingResponse,
  getUnknownResponse,
  SUPPORTED_STATE_CODES,
  type SupportedStateCode,
} from "../config/languages";

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
  /^(hi|hello|hey|namaste|namaskar|vanakkam|sat sri akal|halo|kem cho|kaise ho|nomoshkar)/i;
const GREETING_PATTERNS_UNICODE =
  /નમસ્તે|નમસ્કાર|કેમ છો|नमस्ते|नमस्कार|வணக்கம்|ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ|ਨਮਸਤੇ/;

const STATE_KEYWORDS: Record<string, SupportedStateCode> = {
  gujarat: "GJ",
  rajasthan: "RJ",
  punjab: "PB",
  goa: "GA",
  "tamil nadu": "TN",
  tamil: "TN",
  maharashtra: "MH",
  "madhya pradesh": "MP",
  delhi: "DL",
  "new delhi": "DL",
  ahmedabad: "GJ",
  jaipur: "RJ",
  amritsar: "PB",
  panaji: "GA",
  madurai: "TN",
  mumbai: "MH",
  bhopal: "MP",
};

function detectIntent(message: string): Intent {
  const lower = message.toLowerCase().trim();
  if (GREETING_PATTERNS.test(lower) || GREETING_PATTERNS_UNICODE.test(message)) return "greeting";
  if (/temple|mosque|church|monument|fort|palace|stepwell|stupa|cave|killo|kovil|masjid|મંદિર|किल्ला|मंदिर|கோவில்|ਮੰਦਿਰ|killam/i.test(lower))
    return "heritage_information";
  if (/craft|weaving|embroidery|art|pottery|silk|textile|bronze|painting|kalaa|હસ્તકલા|शिल्प|கைவினੈ|ਹੁਣਰ/i.test(lower))
    return "craft_information";
  if (/person|king|queen|leader|gandhi|emperor|saint|poet|warrior|maharaja|rani|મહારાજા|रानी|மகாராஜா|ਮਹਾਰਾਜਾ/i.test(lower))
    return "person_information";
  if (/festival|celebration|dance|garba|bhangra|carnival|navratri|nritya|નૃત્ય|नृत्य|நடனம்|ਨੱਚ/i.test(lower))
    return "festival_information";
  if (/period|era|dynasty|century|ancient|medieval|colonial|modern|itihas|ઇતિહાસ|इतिहास|varalaru|ਇਤਿਹਾਸ/i.test(lower))
    return "historical_period";
  if (/explore|what can|what is|tell me about|virasat|varshe|વારસો|विरासत|ਪਾਸੇ|vishay|baddal|patri|sollunga|daso|kive|bare|mahiti/i.test(lower))
    return "state_exploration";
  if (/location|city|where|place|district|kuthhe|kahaan|sthalo|ਸਥਾਨ|located/i.test(lower))
    return "location_information";
  return "unknown";
}

function detectState(message: string): SupportedStateCode | null {
  const lower = message.toLowerCase();
  for (const [keyword, code] of Object.entries(STATE_KEYWORDS)) {
    if (lower.includes(keyword)) return code;
  }
  return null;
}

function extractKeywords(message: string): string[] {
  const words = message
    .toLowerCase()
    .replace(/[^\w\s\u0A80-\u0AFF\u0900-\u097F\u0B80-\u0BFF]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);
  const stopWords = new Set([
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
    "her", "was", "one", "our", "out", "has", "his", "how", "its", "may",
    "new", "now", "old", "see", "way", "who", "did", "get", "let", "say",
    "she", "too", "use", "tell", "about", "me", "what", "some", "them",
    "than", "this", "that", "with", "have", "from", "they", "been", "said",
    "each", "make", "like", "your", "will", "there", "their",
    "ke", "ka", "ki", "ko", "hai", "se", "me", "ne", "aur", "ya",
    "ma", "na", "ni", "no", "ne", "e", "o",
  ]);
  return words.filter((w) => !stopWords.has(w));
}

/* ---- Knowledge Retrieval ---- */

interface KnowledgeResult {
  id: string;
  heritage_name: string;
  heritage_type: string;
  city: string;
  historical_period: string;
  description: string;
  significance: string;
  related_event: string;
  related_person: string;
  related_craft: string;
  source: string;
  state_code: string;
}

async function searchKnowledge(
  message: string,
  stateCode: string | null
): Promise<KnowledgeResult[]> {
  const keywords = extractKeywords(message);
  if (keywords.length === 0) return [];

  // Try full-text search first
  let sql = `
    SELECT
      id, heritage_name, heritage_type, city, historical_period,
      description, significance, related_event, related_person,
      related_craft, source, state_code
    FROM chatbot_knowledge
    WHERE to_tsvector('english',
      heritage_name || ' ' ||
      COALESCE(description, '') || ' ' ||
      COALESCE(significance, '') || ' ' ||
      COALESCE(related_event, '') || ' ' ||
      COALESCE(related_person, '') || ' ' ||
      COALESCE(related_craft, '') || ' ' ||
      COALESCE(array_to_string(keywords, ' '), '')
    ) @@ plainto_tsquery('english', $1)
  `;
  const params: unknown[] = [keywords.join(" ")];

  if (stateCode) {
    sql += " AND state_code = $2";
    params.push(stateCode);
  }

  sql += ` ORDER BY ts_rank(
    to_tsvector('english', heritage_name || ' ' || COALESCE(description, '')),
    plainto_tsquery('english', $1)
  ) DESC LIMIT 5`;

  let { rows } = await query(sql, params);
  let results = rows as unknown as KnowledgeResult[];

  // Fallback: LIKE search if tsvector found nothing
  if (results.length === 0 && keywords.length > 0) {
    const likeConditions = keywords.map((_, i) =>
      `(heritage_name ILIKE $${i + 1} OR description ILIKE $${i + 1} OR COALESCE(significance, '') ILIKE $${i + 1} OR COALESCE(related_person, '') ILIKE $${i + 1})`
    ).join(" OR ");

    let fallbackSql = `
      SELECT id, heritage_name, heritage_type, city, historical_period,
        description, significance, related_event, related_person,
        related_craft, source, state_code
      FROM chatbot_knowledge
      WHERE ${likeConditions}
    `;
    const fallbackParams: unknown[] = keywords.map((k) => `%${k}%`);

    if (stateCode) {
      fallbackSql += ` AND state_code = $${keywords.length + 1}`;
      fallbackParams.push(stateCode);
    }

    fallbackSql += " LIMIT 5";
    const fallback = await query(fallbackSql, fallbackParams);
    results = fallback.rows as unknown as KnowledgeResult[];
  }

  return results;
}

async function getStateOverview(stateCode: string): Promise<KnowledgeResult[]> {
  const { rows } = await query(
    `SELECT heritage_name, heritage_type, city, description, significance, source, state_code
     FROM chatbot_knowledge WHERE state_code = $1 ORDER BY heritage_name LIMIT 8`,
    [stateCode]
  );
  return rows as unknown as KnowledgeResult[];
}

/* ---- Response Generation ---- */

function formatHeritageResponse(
  results: KnowledgeResult[],
  _language: string
): string {
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

/* ---- Main Chat Function ---- */

export interface ChatRequest {
  message: string;
  language: string;
  sessionId?: string;
}

export interface ChatResponse {
  reply: string;
  intent: string;
  stateCode: string | null;
  knowledgeIds: string[];
}

export async function handleChat(req: ChatRequest): Promise<ChatResponse> {
  const { message, language } = req;

  const langCode = isValidLanguage(language) ? language : "en";
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
        reply = getUnknownResponse(langCode);
      }
      break;
    }

    case "state_exploration": {
      if (stateCode) {
        const results = await getStateOverview(stateCode);
        if (results.length > 0) {
          knowledgeIds = results.map((r) => r.id);
          const list = results
            .map(
              (r) =>
                `- **${r.heritage_name}** (${r.heritage_type}): ${r.description?.substring(0, 100)}...`
            )
            .join("\n");
          reply = list;
        } else {
          reply = getUnknownResponse(langCode);
        }
      } else {
        const stateNames: Record<string, string> = {
          GJ: "Gujarat", RJ: "Rajasthan", PB: "Punjab", GA: "Goa",
          TN: "Tamil Nadu", MH: "Maharashtra", MP: "Madhya Pradesh", DL: "Delhi",
        };
        reply = `I can help you explore heritage from these supported states:\n\n${SUPPORTED_STATE_CODES.map((c) => `- ${stateNames[c]}`).join("\n")}\n\nAsk me about any of these states!`;
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

  return { reply, intent, stateCode, knowledgeIds };
}

export { detectIntent, detectState };
