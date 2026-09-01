# ML Model Version History — Astrova

## Overview

This document tracks all ML model versions for the Astrova intent classifier.

**DO NOT DELETE** any model files without explicit approval.

---

## Model Versions

| Version | File | Accuracy | F1 Macro | Test Samples | Train Samples | Intents | Status |
|---------|------|----------|----------|--------------|---------------|---------|--------|
| v1 | `intent_classifier.joblib` | 78.1% | 80.4% | 32 | 32 | 9 | ARCHIVED |
| v2 | `intent_classifier_v2.joblib` | 66.7% | 68.8% | 42 | - | 9 | ARCHIVED |
| v3 | `intent_classifier_v3.joblib` | 73.8% | 76.7% | 130 | 518 | 9 | ARCHIVED |
| v4 | `intent_classifier_v4.joblib` | 74.7% | 73.7% | 162 | 647 | 9 | ARCHIVED |
| v5 | `intent_classifier_v5.joblib` | 69.3% | 65.9% | 215 | 692 | 20 | **CANONICAL** |

---

## Version Details

### v1 (ARCHIVED)
- **Algorithm:** LogisticRegression with TF-IDF
- **Dataset:** Small (32 samples)
- **Intents:** 9 (craft, festival, greeting, heritage, historical_period, location, person, state_exploration, unknown)
- **Notes:** High accuracy but tiny dataset. Not reliable for production.

### v2 (ARCHIVED)
- **Algorithm:** Same as v1
- **Dataset:** 42 samples
- **Notes:** Regression from v1. Dataset still too small.

### v3 (ARCHIVED)
- **Algorithm:** Same as v1
- **Dataset:** 130 train, 130 test
- **Notes:** More stable with larger dataset. Still 9 intents.

### v4 (ARCHIVED)
- **Algorithm:** Same as v1
- **Dataset:** 162 test, 647 train
- **Notes:** Most data for 9-intent model. Stable performance.

### v5 (CANONICAL)
- **Algorithm:** LogisticRegression with TF-IDF (char_wb ngrams 2-4)
- **Dataset:** 215 test, 692 train
- **Intents:** 20 (expanded with nature categories)
- **New Intents:** architecture, beach, community, mountain, river, waterfall, wildlife, gorge
- **Languages:** English, Gujarati, Hindi, Marathi, Tamil, Punjabi
- **States:** All 12 supported states
- **Notes:** Lower accuracy due to expanded intent set. More comprehensive coverage.

---

## Why v5 is Canonical

1. **Most comprehensive** - 20 intents vs 9 in older versions
2. **Most data** - 692 training samples
3. **Multi-state** - Covers all 12 supported states
4. **Multi-language** - 6 languages including Romanized input
5. **Nature categories** - Includes waterfall, river, mountain, beach, wildlife
6. **Production integrated** - Connected to chatbot via AI service

---

## Accuracy Trade-off

v5 has lower accuracy (69.3%) than v1 (78.1%) because:
- More intents to classify (20 vs 9)
- More diverse input patterns
- Multi-language complexity
- Nature categories added

This is expected. The regex fallback in the chatbot compensates for low-confidence predictions.

---

## Model File Locations

```
ml/models/
├── intent_classifier.joblib         # v1 (ARCHIVED)
├── intent_classifier_v2.joblib      # v2 (ARCHIVED)
├── intent_classifier_v3.joblib      # v3 (ARCHIVED)
├── intent_classifier_v4.joblib      # v4 (ARCHIVED)
├── intent_classifier_v5.joblib      # v5 (CANONICAL)
├── evaluation_metrics.json          # v1 metrics
├── evaluation_metrics_v2.json       # v2 metrics
├── evaluation_metrics_v3.json       # v3 metrics
├── evaluation_metrics_v4.json       # v4 metrics
└── evaluation_metrics_v5.json       # v5 metrics
```

---

## Usage

The chatbot uses v5 via the AI service:
- Endpoint: `POST /api/ml/predict`
- Input: `{ "text": "...", "language": "en" }`
- Output: `{ "intent": "...", "confidence": 0.85, "model_available": true }`

If confidence < 0.3 or model unavailable, falls back to regex detection.

---

## Future Improvements

1. Increase training data for low-performing intents
2. Add more Romanized language samples
3. Fine-tune for specific use cases
4. Consider ensemble methods
5. Add confidence calibration
