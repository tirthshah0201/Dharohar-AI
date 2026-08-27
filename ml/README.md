# Dharohar AI — ML Pipeline

## Overview

Intent classification model for the Dharohar AI heritage chatbot. Classifies user queries into heritage-related intents to route queries to the correct knowledge retrieval process.

## Model

- **Type:** TF-IDF + Logistic Regression
- **Input:** User query text
- **Output:** Intent classification + confidence
- **Features:** Character n-grams (2-4) for multilingual support

## Dataset

- **Source:** `data/training_data.csv`
- **Total samples:** 158
- **Languages:** English, Gujarati, Hindi, Marathi, Tamil, Punjabi
- **States:** Gujarat, Rajasthan, Punjab, Goa, Tamil Nadu, Maharashtra, Madhya Pradesh, Delhi
- **Intents:** 9 (greeting, heritage_information, craft_information, person_information, festival_information, historical_period, state_exploration, location_information, unknown)

## Train/Test Split

- Training: 126 samples (80%)
- Testing: 32 samples (20%)
- Stratified by intent

## Evaluation

- **Accuracy:** 78.12%
- **F1 (macro):** 80.44%
- **F1 (weighted):** 78.04%

## Usage

```bash
# Install dependencies
pip install -r requirements.txt

# Train model
python src/train.py

# Model saved to models/intent_classifier.joblib
# Metrics saved to models/evaluation_metrics.json
```

## File Structure

```
ml/
├── data/
│   ├── training_data.csv     # Full dataset
│   ├── train.csv             # Training split
│   └── test.csv              # Testing split
├── src/
│   └── train.py              # Training pipeline
├── models/
│   ├── intent_classifier.joblib  # Trained model
│   └── evaluation_metrics.json   # Evaluation results
├── requirements.txt
└── README.md
```
