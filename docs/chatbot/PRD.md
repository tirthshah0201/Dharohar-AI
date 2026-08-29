# Dharohar AI — Chatbot PRD

## 1. Overview

Dharohar AI's chatbot provides a multilingual, project-grounded heritage discovery experience. It supports 8 Indian states, 6 languages, and Romanized Gujarati input. Responses are grounded in verified heritage data from the Neon PostgreSQL knowledge base.

## 2. Supported States

| Code | State | Region |
|------|-------|--------|
| GJ | Gujarat | West |
| RJ | Rajasthan | North |
| PB | Punjab | North |
| GA | Goa | West |
| TN | Tamil Nadu | South |
| MH | Maharashtra | West |
| MP | Madhya Pradesh | Central |
| DL | Delhi | North |

## 3. Supported Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| gu | Gujarati | ગુજરાતી |
| hi | Hindi | हिन्दी |
| mr | Marathi | मराठी |
| ta | Tamil | தமிழ் |
| pa | Punjabi | ਪੰਜਾਬੀ |

## 4. Romanized Gujarati

### Detection

Users can type Gujarati using English/Roman characters. The system detects common patterns:

- **Questions:** vishe, vise, janavo, mahiti, aapo, batavo, daso
- **State:** chhe, che, shu, su, kai, kaya, kya, kyare, kem
- **Context:** Gujarat, Ahmedabad, Patan, Somnath, Modhera, Dwarka, etc.
- **Verbs:** farva, jeva, aave, lakhay, bani

### Response Mode

**Default:** Romanized Gujarati input → Gujarati-script response.

**Explicit Roman:** If user writes "roman gujarati ma jawab aapo" or "English letters ma Gujarati ma answer aapo", respond in Romanized Gujarati.

### Examples

| Input | Detected | Intent | Response Script |
|-------|----------|--------|-----------------|
| modhera surya mandir vishe mahiti aapo | Gujarati (RG) | heritage_information | Gujarati |
| gujarat na heritage places vishe janavo | Gujarati (RG) | state_exploration | Gujarati |
| somnath mandir no itihas janavo | Gujarati (RG) | heritage_information | Gujarati |

## 5. Intent Classification

| Intent | Description | Examples |
|--------|-------------|----------|
| greeting | Hello, namaste, kem cho | "Hello", "नमस्ते", "kem cho" |
| heritage_information | Specific heritage sites | "What is Rani ki Vav", "modhera surya mandir vishe mahiti aapo" |
| location_information | Where is X located | "Where is Somnath Temple", "rani ki vav kya aveli chhe" |
| state_exploration | Explore state heritage | "Tell me about Gujarat heritage", "gujarat na heritage places vishe janavo" |
| historical_period | History, dynasty, era | "Tell me about the Maratha era", "gujarat no itihas janavo" |
| craft_information | Crafts, weaving, art | "What traditional crafts does Kutch produce" |
| person_information | Historical figures | "Who built Red Fort", "Who was Sardar Vallabhbhai Patel" |
| festival_information | Festivals, dance, culture | "How is Navratri celebrated in Gujarat" |
| unknown | Unrecognized queries | "What is the weather today" |

### Intent Detection Features

- **English patterns** with word boundary matching
- **Non-Latin script patterns** for Hindi, Gujarati, Tamil, Marathi, Punjabi heritage keywords
- **Romanized Gujarati detection** via 40+ indicator words
- **Person intent filtering** to avoid false positives (e.g., "rani ki vav" is a place, not a person)
- **Overly broad patterns removed** (e.g., "what is" no longer matches all queries)

## 6. State Detection

State detection supports keywords in:

- **English:** State names and cities
- **Hindi:** राजस्थान, गुजरात, पंजाब, गोवा, महाराष्ट्र, मध्य प्रदेश, दिल्ली + cities
- **Marathi:** महाराष्ट्र + regional names
- **Gujarati:** ગુજરાત, રાજસ્થાન, પંજાબ, ગોવા, etc.

Longest keyword matching prevents partial match errors.

## 7. Knowledge Retrieval

Three-tier search strategy:

1. **Exact name match** — Heritage name ILIKE keyword (highest relevance)
2. **Full-text search** — PostgreSQL tsvector/tsquery with name boost
3. **ILIKE fallback** — Pattern matching on name, description, significance, person fields

Results limited to 3-5 per query, prioritized by relevance.

## 8. External APIs

### OpenStreetMap Nominatim

- **Purpose:** Geocoding / location lookup
- **Rate limit:** 1 request/second (built-in User-Agent compliance)
- **Timeout:** 5 seconds
- **Error handling:** Graceful fallback — returns empty results on failure
- **No API key required**

## 9. Context-Aware Suggestions

Suggestions change based on conversation context:

- **After state exploration:** State-specific heritage, craft, history suggestions
- **After heritage query:** Follow-up questions (location, history, significance)
- **After greeting:** Random exploration prompts
- **On unknown query:** Heritage exploration prompts
- **Language-specific:** Suggestions in the selected language

## 10. API Endpoints

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|------|
| /api/ai/chat | POST | Send message, get response | API Key |
| /api/ai/welcome | GET | Welcome message + suggestions | API Key |
| /api/ai/suggestions | GET | Context-aware suggestions | API Key |
| /api/ai/languages | GET | Supported languages list | API Key |

## 11. Security

- API key authentication on all endpoints
- Server-side only external API calls (Nominatim)
- No secrets in frontend code
- No secrets in Git
- Input validation (message length, language code, state code)
- Parameterized SQL queries
- Error messages sanitized (no stack traces)

## 12. Database

### Tables

- `supported_states` — 8 states with metadata
- `chatbot_knowledge` — Heritage knowledge entries (31+)
- `conversations` — Session tracking
- `conversation_messages` — Message history with intent/state

### Provider

Neon PostgreSQL (cloud-hosted, connection via DATABASE_URL)

## 13. ML Pipeline

### Model

- **Type:** TF-IDF + Logistic Regression (v3)
- **Input:** Query text
- **Output:** Intent classification
- **Accuracy:** ~74%
- **F1 (macro):** ~77%

### Dataset

- **Base training data:** 437+ samples (English + multi-state)
- **Romanized Gujarati:** 165+ samples
- **Languages:** 6 (EN, GU, HI, MR, TA, PA)
- **States:** 8 (GJ, RJ, PB, GA, TN, MH, MP, DL)
- **Intents:** 9 categories

### Note

The ML model is used as a supplementary intent classifier. The primary intent detection uses rule-based pattern matching in the chatbot service. This provides more reliable results for production use.

## 14. Architecture

```
User → Frontend (Next.js) → Backend API (Express/TS) → Chatbot Service → Neon DB
                                                                   ↘ Nominatim (geocoding)
```

## 15. Known Limitations

- Response text is in English (database content is English)
- ML model accuracy ~74% (improvable with more data)
- Geocoding rate-limited to 1 req/sec
- No conversation context across messages
- No image/media support in heritage responses

## 16. Future Enhancements

- Multilingual response generation (translations)
- Conversation context awareness
- Semantic search / RAG integration
- Knowledge graph visualization
- Additional Indian states
- LLM integration for natural responses
