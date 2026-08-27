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

Users can type Gujarati using English/Roman characters. The system detects common patterns:

- **Questions:** vishe, janavo, mahiti, aapo, batavo
- **State:** chhe, che, shu, su, kai, kaya, kya
- **Context:** Gujarat, Ahmedabad, Patan, Somnath, etc.

Romanized Gujarati is routed as Gujarati (`gu`) and responses are in Gujarati script.

## 5. Chat API

### POST /api/ai/chat

**Request:**
```json
{
  "message": "gujarat na heritage places vishe janavo",
  "language": "en",
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
    "language": "gu"
  }
}
```

### GET /api/ai/welcome?language=gu
### GET /api/ai/languages
### GET /api/ai/suggestions

## 6. Intent Classification

| Intent | Description |
|--------|-------------|
| greeting | Hello, namaste, etc. |
| heritage_information | Temples, forts, monuments |
| craft_information | Weaving, pottery, art |
| person_information | Kings, leaders, saints |
| festival_information | Garba, bhangra, etc. |
| historical_period | Dynasties, eras |
| state_exploration | What to visit, explore |
| location_information | Where is X located |
| unknown | Off-topic queries |

## 7. External APIs

### OpenStreetMap Nominatim (Free)

- **Provider:** OpenStreetMap Foundation
- **Purpose:** Geocoding, location lookup
- **Endpoint:** `https://nominatim.openstreetmap.org/search`
- **Authentication:** None (free, rate-limited 1 req/sec)
- **User-Agent:** `DharoharAI/1.0 (heritage-platform)`

Used for location queries when internal knowledge base has no results.

## 8. Internal vs External Data

| Source | Type | Trust Level |
|--------|------|-------------|
| Neon PostgreSQL | Heritage knowledge | High (curated) |
| Nominatim | Geographic coordinates | Medium (location only) |

External API data never becomes historical truth. Only coordinates and addresses from external APIs.

## 9. ML Model

- **Type:** TF-IDF + Logistic Regression
- **Purpose:** Intent classification
- **Languages:** English, Gujarati (script + Romanized), Hindi, Marathi, Tamil, Punjabi
- **Accuracy:** 67% (v2, combined dataset)

## 10. Security

- API key required for all chat endpoints
- User input validated (length, language, state)
- External API errors handled gracefully
- No secrets in responses
- Database queries parameterized
