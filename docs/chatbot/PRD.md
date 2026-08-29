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
| gujarat na heritage places vishe janavo | Romanized Gujarati → gu | state_exploration | Gujarati script |
| modhera surya mandir vishe mahiti aapo | Romanized Gujarati → gu | heritage_information | Gujarati script |
| rani ki vav kya aveli chhe | Romanized Gujarati → gu | location_information | Gujarati script |

## 5. Chat API

### POST /api/ai/chat

**Request:**
```json
{
  "message": "gujarat na heritage places vishe janavo",
  "language": "gu",
  "session_id": "optional-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "reply": "Heritage response with sources...",
    "intent": "state_exploration",
    "state": "GJ",
    "knowledge_ids": ["uuid1", "uuid2"],
    "language": "gu",
    "suggestions": [
      "modhera surya mandir vishe mahiti aapo",
      "gujarat na kila vishe janavo"
    ]
  }
}
```

### GET /api/ai/welcome?language=gu

Returns welcome message and initial suggestions.

### GET /api/ai/suggestions?language=gu&intent=state_exploration&state=GJ

Returns context-aware suggested questions based on language, last intent, and state.

### GET /api/ai/languages

Returns supported languages.

## 6. Intent Classification

| Intent | Description |
|--------|-------------|
| greeting | Hello, namaste, etc. |
| heritage_information | Temples, forts, monuments, ashrams |
| craft_information | Weaving, pottery, art, textiles |
| person_information | Kings, leaders, saints, gurus |
| festival_information | Garba, bhangra, carnival, utsav |
| historical_period | Dynasties, eras, history |
| state_exploration | What to visit, explore, famous |
| location_information | Where is X located, city, district |
| unknown | Off-topic queries |

## 7. Context-Aware Suggestions

Suggestions are context-aware and change based on:

1. **Current language** — suggestions in the active language
2. **Last intent** — follow-up questions related to the previous query type
3. **Last state** — state-specific suggestions after state exploration

### Suggestion Categories

- `explore` — state exploration prompts
- `heritage` — heritage site queries
- `craft` — craft/art queries
- `history` — historical period/person queries
- `culture` — cultural traditions/festivals
- `follow-up` — context-dependent follow-ups

## 8. External APIs

### OpenStreetMap Nominatim (Free)

- **Provider:** OpenStreetMap Foundation
- **Purpose:** Geocoding, location lookup
- **Endpoint:** `https://nominatim.openstreetmap.org/search`
- **Authentication:** None (free, rate-limited 1 req/sec)
- **User-Agent:** `DharoharAI/1.0 (heritage-platform)`

Used for location queries when internal knowledge base has no results.

## 9. Internal vs External Data

| Source | Type | Trust Level |
|--------|------|-------------|
| Neon PostgreSQL | Heritage knowledge | High (curated) |
| Nominatim | Geographic coordinates | Medium (location only) |

External API data never becomes historical truth. Only coordinates and addresses from external APIs.

## 10. ML Model

- **Type:** TF-IDF + Logistic Regression (v3)
- **Purpose:** Intent classification
- **Languages:** English, Gujarati (script + Romanized), Hindi, Marathi, Tamil, Punjabi
- **Training samples:** 648
- **Accuracy:** 74%
- **F1 (macro):** 77%

## 11. Training Dataset

| Metric | Value |
|--------|-------|
| Total samples | 648 |
| Training | 518 (80%) |
| Testing | 130 (20%) |
| Languages | 6 |
| States | 8 |
| Intents | 9 |
| RG entries | 165 |

### Class Distribution

| Intent | Count |
|--------|-------|
| heritage_information | 228 |
| craft_information | 89 |
| state_exploration | 69 |
| historical_period | 56 |
| person_information | 52 |
| unknown | 51 |
| festival_information | 39 |
| location_information | 38 |
| greeting | 26 |

## 12. Security

- API key required for all chat endpoints
- User input validated (length, language, state)
- External API errors handled gracefully
- No secrets in responses
- Database queries parameterized
- .env gitignored
- No API keys in frontend

## 13. Architecture

```
User
  ↓
Chatbot UI (React)
  ↓
Backend Chat API (Express/TypeScript)
  ↓
Language Detection (Romanized Gujarati / Unicode)
  ↓
Intent Classification (Regex-based)
  ↓
Heritage Knowledge Retrieval (Neon PostgreSQL)
  ↓
Optional: External Geocoding (Nominatim)
  ↓
Response Generation + Context-Aware Suggestions
  ↓
User
```

## 14. Future

- [ ] ML-based intent classification in production (currently regex-based)
- [ ] Conversation context/history awareness
- [ ] RAG/semantic search
- [ ] Knowledge graph visualization
- [ ] Additional Indian states
- [ ] Additional languages
- [ ] LLM integration for response generation
