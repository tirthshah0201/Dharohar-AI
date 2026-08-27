# DHAROHAR AI — MULTI-STATE MULTILINGUAL CHATBOT IMPLEMENTATION REPORT

## 1. Objective

Expand Dharohar AI from Gujarat-only to support 8 Indian states, add a multilingual chatbot with 6 language support, create a project-specific intent classification ML model with curated training/test datasets, and implement a project-grounded response pipeline.

## 2. Existing Architecture

- **Backend:** Node.js + Express + TypeScript
- **Frontend:** Next.js 16 + React 19 + Tailwind CSS 4
- **Database:** Neon PostgreSQL
- **AI Service:** FastAPI placeholder (preserved, not modified)
- **Chat API:** Previously a stub returning placeholder message

## 3. States Added

| State | Code | Region | Heritage Entries |
|-------|------|--------|-----------------|
| Gujarat | GJ | West | 8 |
| Rajasthan | RJ | North | 4 |
| Punjab | PB | North | 4 |
| Goa | GA | West | 3 |
| Tamil Nadu | TN | South | 3 |
| Maharashtra | MH | West | 3 |
| Madhya Pradesh | MP | Central | 3 |
| Delhi | DL | North | 3 |

**Total: 8 states, 31 heritage knowledge entries**

## 4. Languages Added

| Code | Language | Native Name |
|------|----------|-------------|
| en | English | English |
| gu | Gujarati | ગુજરાતી |
| hi | Hindi | हिन्दी |
| mr | Marathi | मराठी |
| ta | Tamil | தமிழ் |
| pa | Punjabi | ਪੰਜਾਬੀ |

## 5. Database Changes

### New Tables

| Table | Purpose |
|-------|---------|
| `supported_states` | 8 supported states with codes, regions, descriptions |
| `chatbot_knowledge` | 31 heritage knowledge entries for chatbot retrieval |
| `conversations` | Chat session tracking |
| `conversation_messages` | Individual messages with intent/state metadata |

### Migration

- `database/migrations/002_multistate_chatbot.sql` — Schema for states, knowledge, conversations
- `database/seeds/002_multistate_heritage.sql` — 8 states + 31 heritage entries

## 6. API Changes

### New Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `POST /api/ai/chat` | POST | Main chat endpoint with language + message |
| `GET /api/ai/welcome` | GET | Welcome message in specified language |
| `GET /api/ai/languages` | GET | List of supported languages |
| `GET /api/ai/suggestions` | GET | Random suggested questions from knowledge base |

### Validation

- Message: required, non-empty, max 1000 characters
- Language: must be one of en/gu/hi/mr/ta/pa
- State: optional, must be one of GJ/RJ/PB/GA/TN/MH/MP/DL
- API key: required (X-API-Key header)

## 7. Frontend Chatbot

### ChatBot Component (`components/ai/ChatBot.tsx`)

- Professional chat interface with language selector
- 6 language options with native script labels
- Welcome message loaded from API on mount
- Suggested questions from database
- Message history with user/assistant bubbles
- Loading state with spinner
- Clear conversation option
- Input validation (max 1000 chars)
- Markdown-like bold formatting in responses
- Intent badges on assistant messages

### AI Page (`app/ai/page.tsx`)

- Updated to use ChatBot component
- Shows state count, language count, heritage record count
- Lists all 8 supported states

## 8. Chatbot Architecture

```
User
  ↓
ChatBot UI (Next.js)
  ↓ POST /api/ai/chat
Express Backend
  ↓
API Key Middleware
  ↓
Chat Service
  ↓ Intent Detection (regex patterns)
  ↓ State Detection (keyword matching)
  ↓ Knowledge Retrieval (PostgreSQL tsvector + ILIKE fallback)
  ↓ Response Generation
  ↓
JSON Response
  ↓
Frontend renders response
```

## 9. Dataset

### Training Data (`ml/data/training_data.csv`)

| Metric | Value |
|--------|-------|
| Total samples | 158 |
| Languages | 6 |
| States | 8 + None |
| Intents | 9 |

### Intent Distribution

| Intent | Count |
|--------|-------|
| heritage_information | 46 |
| state_exploration | 26 |
| greeting | 21 |
| craft_information | 17 |
| unknown | 16 |
| historical_period | 11 |
| location_information | 10 |
| festival_information | 8 |
| person_information | 3 |

## 10. Training Dataset

- **File:** `ml/data/training_data.csv`
- **Samples:** 158
- **Languages represented:** en (109), hi (16), gu (13), ta (7), pa (7), mr (6)
- **States represented:** Gujarat (34), Punjab (18), Maharashtra (14), Rajasthan (13), Tamil Nadu (13), Delhi (8), Goa (6), Madhya Pradesh (6)

## 11. Testing Dataset

- **File:** `ml/data/test.csv`
- **Samples:** 32 (20% of total)
- **Split:** Stratified by intent

## 12. Dataset Statistics

| Metric | Value |
|--------|-------|
| Total samples | 158 |
| Training samples | 126 |
| Testing samples | 32 |
| Intents | 9 |
| Languages | 6 |
| States | 8 |

## 13. Model

| Property | Value |
|----------|-------|
| Type | TF-IDF + Logistic Regression |
| Vectorizer | Char n-grams (2-4), max 5000 features |
| Classifier | Logistic Regression (balanced classes) |
| Input | Query text string |
| Output | Intent label + confidence |
| Saved model | `ml/models/intent_classifier.joblib` |

## 14. Evaluation

| Metric | Value |
|--------|-------|
| Accuracy | 78.12% |
| Precision (macro) | 81% |
| Recall (macro) | 83% |
| F1 (macro) | 80.44% |
| F1 (weighted) | 78.04% |

### Per-Intent Performance

| Intent | Precision | Recall | F1 | Support |
|--------|-----------|--------|-----|---------|
| craft_information | 0.67 | 1.00 | 0.80 | 4 |
| festival_information | 1.00 | 1.00 | 1.00 | 2 |
| greeting | 0.75 | 0.75 | 0.75 | 4 |
| heritage_information | 1.00 | 0.56 | 0.71 | 9 |
| historical_period | 1.00 | 1.00 | 1.00 | 2 |
| location_information | 0.33 | 0.50 | 0.40 | 2 |
| person_information | 1.00 | 1.00 | 1.00 | 1 |
| state_exploration | 0.83 | 1.00 | 0.91 | 5 |
| unknown | 0.67 | 0.67 | 0.67 | 3 |

### Per-Language Accuracy

| Language | Accuracy | Samples |
|----------|----------|---------|
| Gujarati | 100% | 7 |
| Marathi | 100% | 1 |
| Tamil | 100% | 1 |
| Punjabi | 100% | 1 |
| English | 70% | 20 |
| Hindi | 50% | 2 |

## 15. Multilingual Testing

All 6 languages tested via API:

| Language | Greeting | Heritage Query | Status |
|----------|----------|---------------|--------|
| English | ✅ | ✅ | Working |
| Gujarati | ✅ | ✅ | Working |
| Hindi | ✅ | ✅ | Working |
| Marathi | — | ✅ | Working |
| Tamil | — | ✅ | Working |
| Punjabi | — | ✅ | Working |

## 16. Chatbot Testing

| Test Case | Status |
|-----------|--------|
| Greeting (EN) | ✅ Returns greeting |
| Heritage query (EN) | ✅ Returns relevant entry |
| State exploration (EN) | ✅ Returns state overview |
| Greeting (HI) | ✅ Returns Hindi greeting |
| Heritage query (HI) | ✅ Returns relevant entry |
| Greeting (GU) | ✅ Returns Gujarati greeting |
| Heritage query (GU) | ✅ Returns relevant entry |
| Heritage query (TA) | ✅ Returns relevant entry |
| Heritage query (PA) | ✅ Returns relevant entry |
| Heritage query (MR) | ✅ Returns relevant entry |
| Empty message | ✅ Returns 400 |
| Invalid language | ✅ Returns 400 |
| Unknown topic | ✅ Returns helpful response |

## 17. API Regression Testing

| Endpoint | Status |
|----------|--------|
| GET /api/locations | ✅ 200 (12 results) |
| GET /api/heritage | ✅ 200 (15 results) |
| GET /api/timeline | ✅ 200 (5 results) |
| GET /api/search?q=patan | ✅ 200 (3 results) |
| POST /api/ai/chat | ✅ 200 (working) |
| GET /api/ai/languages | ✅ 200 (6 languages) |
| GET /api/ai/welcome | ✅ 200 |
| GET /api/ai/suggestions | ✅ 200 (6 suggestions) |

## 18. Security Verification

- ✅ API key authentication functional
- ✅ Chat endpoint protected
- ✅ No DATABASE_URL exposed
- ✅ No API keys exposed
- ✅ No model credentials committed
- ✅ .env not committed
- ✅ User input validated (length, language, state)
- ✅ Invalid messages return 400
- ✅ Errors do not expose stack traces
- ✅ ML model binary in .gitignore

## 19. Files Created

| File | Purpose |
|------|---------|
| `backend/src/config/languages.ts` | Centralized language configuration |
| `backend/src/services/chatbot.ts` | Chatbot response pipeline |
| `frontend/components/ai/ChatBot.tsx` | Chat UI component |
| `database/migrations/002_multistate_chatbot.sql` | Multi-state + chatbot schema |
| `database/seeds/002_multistate_heritage.sql` | 8 states + 31 heritage entries |
| `database/run-multistate.js` | Migration runner |
| `ml/data/training_data.csv` | Training dataset (158 samples) |
| `ml/src/train.py` | Training pipeline |
| `ml/requirements.txt` | Python dependencies |
| `ml/README.md` | ML documentation |
| `docs/chatbot/report.md` | This report |

## 20. Files Modified

| File | Changes |
|------|---------|
| `backend/src/routes/ai.ts` | Full rewrite with chat, welcome, languages, suggestions endpoints |
| `frontend/app/ai/page.tsx` | Updated to use ChatBot component |
| `.gitignore` | Added ML model binary patterns |

## 21. Known Issues

| Severity | Issue |
|----------|-------|
| LOW | ML model accuracy is 78% — will improve with larger dataset |
| LOW | Some non-English intent detection relies on English keywords in transliterated queries |
| LOW | location_information intent has low recall (0.50) due to small test set |
| INFO | Additional Indian states planned for future updates |

## 22. Future Improvements

- Add more training data (target: 500+ samples)
- Add more states (Kerala, Karnataka, UP, West Bengal, etc.)
- Improve non-English intent detection
- Add conversation context/history awareness
- Integrate ML model as a preprocessing step in the chat pipeline
- Add entity extraction for specific heritage names
- Add multilingual response generation

## 23. PRD

**UPDATED:** `docs/api/PRD.md` (existing)
**CREATED:** `docs/chatbot/report.md`

## 24. Git

- **Commit:** pending
- **Branch:** main
- **GitHub Push:** pending

## 25. Final Status

**PASS** ✅
