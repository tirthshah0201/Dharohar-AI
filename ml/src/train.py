"""
Dharohar AI — Intent Classification Model Training

Trains a lightweight text classifier for heritage chatbot intent recognition.
Supports multilingual queries across 8 Indian states and 6 languages.

Model: TF-IDF + Logistic Regression
Input: User query text
Output: Intent classification + confidence score
"""

import os
import sys
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.pipeline import Pipeline
import joblib

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")
TRAIN_CSV = os.path.join(DATA_DIR, "training_data.csv")
TRAIN_SPLIT = os.path.join(DATA_DIR, "train.csv")
TEST_SPLIT = os.path.join(DATA_DIR, "test.csv")
MODEL_PATH = os.path.join(MODEL_DIR, "intent_classifier.joblib")
METRICS_PATH = os.path.join(MODEL_DIR, "evaluation_metrics.json")


def load_data():
    """Load and validate the training data."""
    df = pd.read_csv(TRAIN_CSV)
    print(f"Loaded {len(df)} samples")
    print(f"Intents: {df['intent'].nunique()}")
    print(f"Languages: {df['language'].nunique()}")
    print(f"States: {df['state'].nunique()}")
    print(f"\nIntent distribution:")
    print(df['intent'].value_counts().to_string())
    print(f"\nLanguage distribution:")
    print(df['language'].value_counts().to_string())
    print(f"\nState distribution:")
    print(df['state'].value_counts().to_string())
    return df


def split_data(df, test_size=0.2, random_state=42):
    """Create train/test split ensuring intent representation."""
    train_df, test_df = train_test_split(
        df,
        test_size=test_size,
        random_state=random_state,
        stratify=df['intent']
    )
    
    train_df.to_csv(TRAIN_SPLIT, index=False)
    test_df.to_csv(TEST_SPLIT, index=False)
    
    print(f"\nTrain/test split:")
    print(f"  Training: {len(train_df)} samples")
    print(f"  Testing: {len(test_df)} samples")
    print(f"  Test size: {test_size*100}%")
    
    return train_df, test_df


def train_model(train_df):
    """Train the intent classification model."""
    print("\nTraining model...")
    
    # Create pipeline: TF-IDF + Logistic Regression
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(
            analyzer='char_wb',
            ngram_range=(2, 4),
            max_features=5000,
            sublinear_tf=True,
        )),
        ('classifier', LogisticRegression(
            max_iter=1000,
            C=1.0,
            class_weight='balanced',
            random_state=42,
        )),
    ])
    
    # Train
    X_train = train_df['text'].values
    y_train = train_df['intent'].values
    
    pipeline.fit(X_train, y_train)
    
    print("Model trained successfully.")
    return pipeline


def evaluate_model(pipeline, test_df):
    """Evaluate the model on test data."""
    print("\nEvaluating model...")
    
    X_test = test_df['text'].values
    y_test = test_df['intent'].values
    
    # Predictions
    y_pred = pipeline.predict(X_test)
    y_proba = pipeline.predict_proba(X_test)
    
    # Metrics
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)
    cm = confusion_matrix(y_test, y_pred)
    
    print(f"\nAccuracy: {accuracy:.4f}")
    print(f"\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Confusion matrix
    labels = sorted(test_df['intent'].unique())
    print(f"Confusion Matrix:")
    print(f"Labels: {labels}")
    print(cm)
    
    # Per-language performance
    print(f"\nPer-language accuracy:")
    for lang in test_df['language'].unique():
        lang_mask = test_df['language'] == lang
        lang_acc = accuracy_score(y_test[lang_mask], y_pred[lang_mask])
        print(f"  {lang}: {lang_acc:.4f} ({lang_mask.sum()} samples)")
    
    # Save metrics
    metrics = {
        "accuracy": float(accuracy),
        "precision_macro": float(report['macro avg']['precision']),
        "recall_macro": float(report['macro avg']['recall']),
        "f1_macro": float(report['macro avg']['f1-score']),
        "precision_weighted": float(report['weighted avg']['precision']),
        "recall_weighted": float(report['weighted avg']['recall']),
        "f1_weighted": float(report['weighted avg']['f1-score']),
        "confusion_matrix": cm.tolist(),
        "labels": labels,
        "per_intent": {
            intent: {
                "precision": float(report[intent]['precision']),
                "recall": float(report[intent]['recall']),
                "f1": float(report[intent]['f1-score']),
                "support": int(report[intent]['support']),
            }
            for intent in labels
            if intent in report
        },
        "per_language": {},
        "test_samples": len(test_df),
        "train_samples": len(test_df) if not hasattr(pipeline, '_train_size') else None,
    }
    
    for lang in test_df['language'].unique():
        lang_mask = test_df['language'] == lang
        if lang_mask.sum() > 0:
            metrics["per_language"][lang] = {
                "accuracy": float(accuracy_score(y_test[lang_mask], y_pred[lang_mask])),
                "samples": int(lang_mask.sum()),
            }
    
    with open(METRICS_PATH, 'w') as f:
        json.dump(metrics, f, indent=2)
    
    print(f"\nMetrics saved to {METRICS_PATH}")
    return metrics


def save_model(pipeline):
    """Save the trained model."""
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"Model saved to {MODEL_PATH}")


def main():
    """Main training pipeline."""
    print("=" * 60)
    print("DHAROHAR AI — Intent Classification Model Training")
    print("=" * 60)
    
    # Load data
    df = load_data()
    
    # Split
    train_df, test_df = split_data(df)
    
    # Train
    pipeline = train_model(train_df)
    
    # Evaluate
    metrics = evaluate_model(pipeline, test_df)
    
    # Save
    save_model(pipeline)
    
    print("\n" + "=" * 60)
    print("TRAINING COMPLETE")
    print(f"Accuracy: {metrics['accuracy']:.4f}")
    print(f"F1 (macro): {metrics['f1_macro']:.4f}")
    print(f"F1 (weighted): {metrics['f1_weighted']:.4f}")
    print("=" * 60)


if __name__ == "__main__":
    main()
