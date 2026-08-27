"""
Dharohar AI — Intent Classification Model Training v2
Combines base dataset with Romanized Gujarati data.
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

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")
BASE_CSV = os.path.join(DATA_DIR, "training_data.csv")
RG_CSV = os.path.join(DATA_DIR, "romanized_gujarati.csv")
COMBINED_CSV = os.path.join(DATA_DIR, "combined_training_data.csv")
TRAIN_SPLIT = os.path.join(DATA_DIR, "train_v2.csv")
TEST_SPLIT = os.path.join(DATA_DIR, "test_v2.csv")
MODEL_PATH = os.path.join(MODEL_DIR, "intent_classifier_v2.joblib")
METRICS_PATH = os.path.join(MODEL_DIR, "evaluation_metrics_v2.json")

def load_and_combine():
    base = pd.read_csv(BASE_CSV)
    rg = pd.read_csv(RG_CSV)
    
    # Normalize RG data to match base format
    rg_normalized = rg[['text', 'language', 'state', 'intent']].copy()
    rg_normalized['language'] = 'gu'
    
    combined = pd.concat([base, rg_normalized], ignore_index=True)
    combined.drop_duplicates(subset=['text'], keep='first', inplace=True)
    combined.to_csv(COMBINED_CSV, index=False)
    
    print(f"Base dataset: {len(base)} samples")
    print(f"Romanized Gujarati: {len(rg)} samples")
    print(f"Combined: {len(combined)} samples (after dedup)")
    print(f"\nIntent distribution:\n{combined['intent'].value_counts().to_string()}")
    print(f"\nLanguage distribution:\n{combined['language'].value_counts().to_string()}")
    return combined

def split_data(df, test_size=0.2, random_state=42):
    train_df, test_df = train_test_split(df, test_size=test_size, random_state=random_state, stratify=df['intent'])
    train_df.to_csv(TRAIN_SPLIT, index=False)
    test_df.to_csv(TEST_SPLIT, index=False)
    print(f"\nTrain: {len(train_df)}, Test: {len(test_df)}")
    return train_df, test_df

def train_model(train_df):
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(analyzer='char_wb', ngram_range=(2, 4), max_features=8000, sublinear_tf=True)),
        ('classifier', LogisticRegression(max_iter=1000, C=1.0, class_weight='balanced', random_state=42)),
    ])
    X_train = train_df['text'].values
    y_train = train_df['intent'].values
    pipeline.fit(X_train, y_train)
    print("Model trained.")
    return pipeline

def evaluate_model(pipeline, test_df):
    X_test = test_df['text'].values
    y_test = test_df['intent'].values
    y_pred = pipeline.predict(X_test)
    
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)
    cm = confusion_matrix(y_test, y_pred)
    
    print(f"\nAccuracy: {accuracy:.4f}")
    print(classification_report(y_test, y_pred))
    
    # Per-language
    print("Per-language accuracy:")
    for lang in test_df['language'].unique():
        mask = test_df['language'] == lang
        if mask.sum() > 0:
            acc = accuracy_score(y_test[mask], y_pred[mask])
            print(f"  {lang}: {acc:.4f} ({mask.sum()} samples)")
    
    # Check for RG in test set
    if 'script' in test_df.columns:
        rg_mask = test_df['script'] == 'roman'
        if rg_mask.sum() > 0:
            rg_acc = accuracy_score(y_test[rg_mask], y_pred[rg_mask])
            print(f"\nRomanized Gujarati accuracy: {rg_acc:.4f} ({rg_mask.sum()} samples)")
    
    labels = sorted(test_df['intent'].unique())
    metrics = {
        "accuracy": float(accuracy),
        "f1_macro": float(report['macro avg']['f1-score']),
        "f1_weighted": float(report['weighted avg']['f1-score']),
        "confusion_matrix": cm.tolist(),
        "labels": labels,
        "per_intent": {i: {"precision": float(report[i]['precision']), "recall": float(report[i]['recall']), "f1": float(report[i]['f1-score']), "support": int(report[i]['support'])} for i in labels if i in report},
        "per_language": {},
        "test_samples": len(test_df),
    }
    for lang in test_df['language'].unique():
        mask = test_df['language'] == lang
        if mask.sum() > 0:
            metrics["per_language"][lang] = {"accuracy": float(accuracy_score(y_test[mask], y_pred[mask])), "samples": int(mask.sum())}
    
    with open(METRICS_PATH, 'w') as f:
        json.dump(metrics, f, indent=2)
    print(f"Metrics saved to {METRICS_PATH}")
    return metrics

def main():
    print("=" * 60)
    print("DHAROHAR AI — Intent Classification Model Training v2")
    print("=" * 60)
    
    df = load_and_combine()
    train_df, test_df = split_data(df)
    pipeline = train_model(train_df)
    metrics = evaluate_model(pipeline, test_df)
    
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"\nModel saved to {MODEL_PATH}")
    
    print(f"\n{'=' * 60}")
    print(f"TRAINING COMPLETE — Accuracy: {metrics['accuracy']:.4f}, F1: {metrics['f1_macro']:.4f}")
    print(f"{'=' * 60}")

if __name__ == "__main__":
    main()
