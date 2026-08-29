# DHAROHAR AI — EXPANDED CHATBOT DATASET + ROMANIZED GUJARATI REPORT

## 1. Objective

Expand the Dharohar AI chatbot knowledge and training dataset so it can handle a much wider range of realistic heritage-related user questions. Add significantly more high-quality training data, improve Romanized Gujarati understanding, add recommended questions/prompts, and verify through proper train/test evaluation.

## 2. Existing System Audit

### Before Changes

| Component | Value |
|-----------|-------|
| Base training samples | 158 |
| Romanized Gujarati samples | 48 |
| Total combined | 206 |
| Model accuracy (v2) | 67% |
| F1 macro (v2) | 69% |
| Knowledge entries | 31 |
| Supported states | 8 |
| Supported languages | 6 |
| Intents | 9 |

### Issues Found

1. Small dataset limited model accuracy
2. Romanized Gujarati dataset too small (48 samples)
3. No context-aware suggestions system
4. Welcome screen lacked recommended questions
5. Unknown questions returned generic message without suggestions
6. Frontend ChatBot used static suggestions from database only
7. No Romanized Gujarati response mode

## 3. Errors Fixed

### Error 1: Limited Romanized Gujarati Dataset
- **Root Cause:** Only 48 RG samples in the original dataset
- **Fix:** Expanded to 165 Romanized Gujarati samples with natural variations
- **Verification:** Model RG accuracy improved

### Error 2: No Context-Aware Suggestions
- **Root Cause:** Suggestions were static database queries
- **Fix:** Implemented `getSuggestionsForContext()` with state/intent/language awareness
- **Verification:** Suggestions now change based on conversation context

### Error 3: Generic Welcome Screen
- **Root Cause:** Welcome message had no initial suggestions
- **Fix:** Welcome API now returns initial suggested questions
- **Verification:** Welcome includes 4 random suggestions

### Error 4: Unknown Question Without Recommendations
- **Root Cause:** Unknown intent returned generic message only
- **Fix:** Chat response now includes follow-up suggestions for all intents
- **Verification:** Unknown questions show relevant recommended prompts

### Error 5: Frontend Used Static Suggestions
- **Root Cause:** ChatBot fetched suggestions separately from chat API
- **Fix:** ChatBot now uses suggestions from API response (context-aware)
- **Verification:** Suggestions update after each message

## 4. Dataset Before Expansion

| Dataset | Samples |
|---------|---------|
| training_data.csv | 158 |
| romanized_gujarati.csv | 48 |
| **Total** | **206** |

## 5. Dataset After Expansion

| Dataset | Samples |
|---------|---------|
| training_data.csv | 483 |
| romanized_gujarati.csv | 165 |
| **Combined (after dedup)** | **648** |

### Improvement

- **Base data:** 158 → 483 (+206%)
- **RG data:** 48 → 165 (+244%)
- **Total:** 206 → 648 (+215%)

## 6. Language Distribution

| Language | Samples | % |
|----------|---------|---|
| English (en) | 437 | 67.4% |
| Gujarati (gu) | 165 | 25.5% |
| Hindi (hi) | 19 | 2.9% |
| Marathi (mr) | 10 | 1.5% |
| Tamil (ta) | 9 | 1.4% |
| Punjabi (pa) | 8 | 1.2% |

**Note:** English dominates because it covers all 8 states with detailed heritage queries. Gujarati is the second largest due to the expanded RG dataset.

## 7. State Distribution

| State | Heritage Entries in DB |
|-------|----------------------|
| Gujarat | 8 |
| Rajasthan | 4 |
| Punjab | 4 |
| Delhi | 3 |
| Tamil Nadu | 3 |
| Maharashtra | 3 |
| Madhya Pradesh | 3 |
| Goa | 3 |

## 8. Intent Distribution

| Intent | Training Samples | % |
|--------|-----------------|---|
| heritage_information | 228 | 35.2% |
| craft_information | 89 | 13.7% |
| state_exploration | 69 | 10.6% |
| historical_period | 56 | 8.6% |
| person_information | 52 | 8.0% |
| unknown | 51 | 7.9% |
| festival_information | 39 | 6.0% |
| location_information | 38 | 5.9% |
| greeting | 26 | 4.0% |

## 9. Gujarati Dataset

### Gujarati Script (in base training_data.csv)

- **Gujarati script entries:** 0 (all Gujarati entries are in romanized_gujarati.csv as Romanized)
- **Romanized Gujarati:** 165

### Gujarati Coverage

- Heritage information queries
- Location questions
- Craft inquiries
- Festival questions
- Person inquiries
- State exploration
- Greetings
- Unknown/off-topic

## 10. Romanized Gujarati Dataset

### Location

`ml/data/romanized_gujarati.csv`

### Statistics

| Metric | Value |
|--------|-------|
| Total examples | 165 |
| Script | Roman |
| Language | Gujarati (gu) |
| States | Gujarat, None |

### Coverage

- Heritage information: ~60 entries
- State exploration: ~30 entries
- Craft information: ~15 entries
- Location information: ~15 entries
- Historical period: ~10 entries
- Festival information: ~8 entries
- Person information: ~12 entries
- Greetings: ~8 entries
- Unknown: ~7 entries

### Quality

- Natural user typing patterns
- Multiple spelling variations (chhe/che, vishe/vise)
- Real heritage names (Modhera, Rani ki Vav, Somnath, etc.)
- Context-aware queries with Gujarat state references
- No artificial duplication

## 11. Romanized Gujarati Response

### Implementation

The chatbot supports two response modes:

**Default Mode:**
- Input: Romanized Gujarati → Response: Gujarati script
- Example: "modhera surya mandir vishe janavo" → "મોઢેરા સૂર્ય મંદિર ગુજરાતના..."

**Explicit Roman Mode:**
- Detected by: "roman gujarati ma jawab aapo" / "English letters ma Gujarati"
- Input: Romanized Gujarati → Response: Romanized Gujarati
- Note: Currently responds in Gujarati script for both modes (future enhancement)

## 12. Train/Test Split

| Metric | Value |
|--------|-------|
| Training samples | 518 (80%) |
| Testing samples | 130 (20%) |
| Stratification | By intent label |
| Random seed | 42 |

### Leakage Check

- **Exact duplicates between train/test:** 0
- **No data leakage detected**

## 13. Model Training

### Architecture

- **Type:** TF-IDF + Logistic Regression (v3)
- **Vectorizer:** char_wb analyzer, ngram_range=(2,4), max_features=12000
- **Classifier:** LogisticRegression, C=2.0, class_weight='balanced', max_iter=2000
- **Pipeline:** Scikit-learn Pipeline

### Changes from v2

- Increased max_features from 8000 to 12000
- Increased C parameter from 1.0 to 2.0
- Increased max_iter from 1000 to 2000
- Expanded dataset from 206 to 648 samples

### Files

- Model: `ml/models/intent_classifier_v3.joblib`
- Metrics: `ml/models/evaluation_metrics_v3.json`
- Training script: `ml/src/train_v3.py`

## 14. Model Evaluation

### Overall

| Metric | v2 | v3 | Change |
|--------|----|----|--------|
| Accuracy | 66.67% | 73.85% | +7.18% |
| F1 (macro) | 68.76% | 76.68% | +7.92% |
| F1 (weighted) | 65.78% | 73.56% | +7.78% |

### Per-Language Accuracy

| Language | v2 | v3 | Samples (test) |
|----------|----|----|----------------|
| English | 63.64% | 80.00% | 90 |
| Gujarati | 58.33% | 66.67% | 27 |
| Hindi | 100% | 50.00% | 6 |
| Marathi | 100% | 66.67% | 3 |
| Tamil | 66.67% | 0% | 1 |
| Punjabi | 100% | 33.33% | 3 |

**Note:** Hindi/Marathi/Tamil/Punjabi have very small test sets (1-6 samples), making per-language metrics statistically unreliable. English and Gujarati have sufficient samples for meaningful conclusions.

### Per-Intent Accuracy

| Intent | Precision | Recall | F1 | Support |
|--------|-----------|--------|----|---------| 
| craft_information | 0.71 | 0.83 | 0.77 | 18 |
| festival_information | 0.88 | 0.88 | 0.88 | 8 |
| greeting | 0.80 | 0.80 | 0.80 | 5 |
| heritage_information | 0.80 | 0.61 | 0.69 | 46 |
| historical_period | 0.64 | 0.82 | 0.72 | 11 |
| location_information | 0.58 | 0.88 | 0.70 | 8 |
| person_information | 1.00 | 0.80 | 0.89 | 10 |
| state_exploration | 0.56 | 0.64 | 0.60 | 14 |
| unknown | 0.82 | 0.90 | 0.86 | 10 |

### Notes

- Accuracy improved significantly with more training data
- English accuracy now at 80% (up from 64%)
- Gujarati accuracy at 67% (up from 58%)
- heritage_information is the largest class but has lower recall — many heritage queries overlap with other intents
- state_exploration has lower precision — some queries classified as exploration when they could be heritage information

## 15. Recommended User Questions

### Implementation

Added context-aware suggestion system in:

- **Backend:** `getSuggestionsForContext()` in `backend/src/config/languages.ts`
- **Frontend:** `ChatBot.tsx` uses suggestions from API response

### Suggestion Behavior

1. **On welcome:** 4 random suggestions in selected language
2. **After heritage query:** Follow-up questions (location, history, significance)
3. **After state exploration:** State-specific heritage suggestions
4. **After unknown query:** Default exploration suggestions
5. **After greeting:** Exploration prompts

### Supported Suggestion Sets

| Language | Available |
|----------|-----------|
| English | 14 suggestions |
| Gujarati (RG) | 14 suggestions |
| Hindi | 5 suggestions |
| Marathi | 3 suggestions |
| Tamil | 3 suggestions |
| Punjabi | 3 suggestions |

## 16. Context-Aware Recommendations

### Architecture

```
Chat API Response
  ↓
suggestions: [{ text, category }]
  ↓
Frontend displays suggestions
  ↓
User clicks → sends as chat message
```

### Context Sources

- **Language:** suggestions match active language
- **State:** state-specific after state exploration
- **Intent:** follow-up based on query type
- **Default:** random from language pool

## 17. Chatbot UI Changes

### Frontend Updates

1. **Suggestions from API:** Chat response includes `suggestions[]` field
2. **Dynamic suggestions:** Suggestions update after each message
3. **Suggestion label:** Changes from "Suggested questions:" to "Try asking:" after first query
4. **Welcome suggestions:** Initial suggestions from welcome API
5. **Clear resets:** Clearing conversation resets suggestions to welcome defaults

## 18. External Location API

### OpenStreetMap Nominatim

- **Provider:** OpenStreetMap Foundation
- **Purpose:** Geocoding and location lookup
- **Endpoint:** `https://nominatim.openstreetmap.org/search`
- **Authentication:** None (free, public API)
- **Rate Limit:** 1 request per second
- **Error Handling:** 5-second timeout, graceful fallback

## 19. Neon Database

### Knowledge Base

| Table | Records |
|-------|---------|
| supported_states | 8 |
| chatbot_knowledge | 31 |
| locations | 12 |
| heritage_entities | 15 |
| historical_periods | 5 |
| relationships | 9 |
| conversations | 77+ |
| conversation_messages | 154+ |

## 20. Security Verification

- ✅ API key required for all chat endpoints
- ✅ No API keys in frontend source
- ✅ No secrets in Git (.env gitignored)
- ✅ No API keys in datasets or model files
- ✅ User input validated (length, language, state)
- ✅ External API errors sanitized
- ✅ SQL queries parameterized
- ✅ No stack traces returned to users
- ✅ No secrets in documentation

## 21. Performance

- Chat API response time: <100ms (internal queries)
- Geocoding: <5s timeout with graceful fallback
- No Redis or caching infrastructure needed
- Rate limiting: 1 req/sec enforced by Nominatim

## 22. Testing

### Chat API Tests

| Test | Language | Status |
|------|----------|--------|
| RG heritage query | gu | ✅ |
| RG location query | gu | ✅ |
| Hindi state query | hi | ✅ |
| Marathi heritage query | mr | ✅ |
| Tamil heritage query | ta | ✅ |
| Punjabi heritage query | pa | ✅ |
| English heritage query | en | ✅ |
| Empty message | — | ✅ 400 |
| Invalid language | — | ✅ 400 |
| Very long message | — | ✅ 400 |

### State Tests (All 8)

| State | Query | Status |
|-------|-------|--------|
| Gujarat | heritage | ✅ GJ |
| Rajasthan | forts | ✅ RJ |
| Punjab | Golden Temple | ✅ PB |
| Goa | heritage | ✅ GA |
| Tamil Nadu | temples | ✅ TN |
| Maharashtra | Ajanta Caves | ✅ MH |
| Madhya Pradesh | Khajuraho | ✅ MP |
| Delhi | Red Fort | ✅ DL |

### Regression Tests

| Endpoint | Status |
|----------|--------|
| GET /api/locations | ✅ 12 |
| GET /api/heritage | ✅ 15 |
| GET /api/timeline | ✅ 5 |
| GET /api/search?q=patan | ✅ 3 |
| GET /api/system/connectivity | ✅ connected |

## 23. Files Created

| File | Purpose |
|------|---------|
| `ml/data/training_data.csv` | Expanded base dataset (483 samples) |
| `ml/data/romanized_gujarati.csv` | Expanded RG dataset (165 samples) |
| `ml/data/combined_training_data_v3.csv` | Combined dataset (648 samples) |
| `ml/data/train_v3.csv` | Training split (518 samples) |
| `ml/data/test_v3.csv` | Testing split (130 samples) |
| `ml/src/train_v3.py` | v3 training pipeline |
| `ml/models/intent_classifier_v3.joblib` | Trained model |
| `ml/models/evaluation_metrics_v3.json` | Evaluation metrics |
| `docs/chatbot/PRD.md` | Updated PRD |

## 24. Files Modified

| File | Changes |
|------|---------|
| `backend/src/services/chatbot.ts` | RG response mode, improved intent detection, suggestions in response |
| `backend/src/config/languages.ts` | Added `getSuggestionsForContext()`, context-aware suggestion sets |
| `backend/src/routes/ai.ts` | Suggestions in chat response, context-aware suggestions endpoint |
| `frontend/components/ai/ChatBot.tsx` | Context-aware suggestions from API, dynamic suggestion display |

## 25. Known Issues

| Severity | Issue |
|----------|-------|
| LOW | ML model accuracy 74% — will improve with more data and language-specific features |
| LOW | Non-English intent detection relies on regex (not ML) in production |
| LOW | Small test sets for Hindi/Marathi/Tamil/Punjabi make per-language metrics unreliable |
| INFO | Romanized Gujarati response mode currently responds in Gujarati script for both modes |
| INFO | Additional Indian states planned for future updates |

## 26. Limitations

- ML model has moderate accuracy (74%) — regex-based intent detection handles most production cases
- Romanized Gujarati detection is rule-based, not ML-based
- External API (Nominatim) is free but rate-limited
- No conversation history/context awareness between messages
- Suggestion sets for non-English languages are smaller

## 27. Future Improvements

- More training data (target: 1000+ samples)
- Additional Indian states (Kerala, Karnataka, UP, West Bengal, etc.)
- Conversation context/history awareness
- ML-based Romanized Gujarati detection
- RAG/semantic search for heritage knowledge
- Knowledge graph visualization
- Advanced AI/LLM integration
- Larger suggestion sets for all languages
- Romanized Gujarati response mode (explicit Roman output)
- Per-intent ML model for better accuracy

## 28. PRD

**UPDATED:** `docs/chatbot/PRD.md`

## 29. Git

- **Commit:** pending
- **Branch:** main
- **GitHub Push:** pending

## 30. Final Status

**PASS** ✅
