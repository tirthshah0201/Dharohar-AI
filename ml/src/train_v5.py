"""
Heritage Atlas — Intent Classification Model Training v5
Uses clean dataset (no train/test leakage, no duplicates).
Regional expansion: 12 states, nature categories, Romanized languages.
"""

import os
import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, f1_score, precision_score, recall_score
from sklearn.pipeline import Pipeline
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")
TRAIN_CSV = os.path.join(DATA_DIR, "train_clean.csv")
TEST_CSV = os.path.join(DATA_DIR, "test_clean.csv")
MODEL_PATH = os.path.join(MODEL_DIR, "intent_classifier_v5.joblib")
METRICS_PATH = os.path.join(MODEL_DIR, "evaluation_metrics_v5.json")


def load_data():
    train_df = pd.read_csv(TRAIN_CSV)
    test_df = pd.read_csv(TEST_CSV)
    print(f"Train: {len(train_df)} examples")
    print(f"Test: {len(test_df)} examples")
    
    # Verify no leakage
    train_texts = set(train_df["text"].str.lower().str.strip())
    test_texts = set(test_df["text"].str.lower().str.strip())
    leakage = train_texts & test_texts
    print(f"Train/test leakage: {len(leakage)}")
    assert len(leakage) == 0, f"Found {len(leakage)} overlapping examples!"
    
    return train_df, test_df


def train_model(train_df):
    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer(
            analyzer="char_wb",
            ngram_range=(2, 4),
            max_features=15000,
            sublinear_tf=True,
        )),
        ("classifier", LogisticRegression(
            max_iter=2000,
            C=2.0,
            class_weight="balanced",
            random_state=42,
        )),
    ])
    X_train = train_df["text"].values
    y_train = train_df["intent"].values
    pipeline.fit(X_train, y_train)
    print("Model trained.")
    return pipeline


def evaluate_model(pipeline, test_df):
    X_test = test_df["text"].values
    y_test = test_df["intent"].values
    y_pred = pipeline.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)
    cm = confusion_matrix(y_test, y_pred)

    print(f"\nAccuracy: {accuracy:.4f}")
    print(classification_report(y_test, y_pred))

    # Per-language accuracy
    per_language = {}
    print("\nPer-language accuracy:")
    for lang in test_df["language"].unique():
        mask = test_df["language"] == lang
        if mask.sum() > 0:
            acc = accuracy_score(y_test[mask], y_pred[mask])
            print(f"  {lang}: {acc:.4f} ({mask.sum()} samples)")
            per_language[lang] = {"accuracy": float(acc), "samples": int(mask.sum())}

    # Per-state accuracy
    per_state = {}
    print("\nPer-state accuracy:")
    for state in test_df["state"].unique():
        if pd.isna(state) or state == "":
            continue
        mask = test_df["state"] == state
        if mask.sum() >= 3:
            acc = accuracy_score(y_test[mask], y_pred[mask])
            print(f"  {state}: {acc:.4f} ({mask.sum()} samples)")
            per_state[state] = {"accuracy": float(acc), "samples": int(mask.sum())}

    # Per-intent with new categories
    labels = sorted(test_df["intent"].unique())
    per_intent = {}
    for i in labels:
        if i in report:
            per_intent[i] = {
                "precision": float(report[i]["precision"]),
                "recall": float(report[i]["recall"]),
                "f1": float(report[i]["f1-score"]),
                "support": int(report[i]["support"]),
            }

    metrics = {
        "accuracy": float(accuracy),
        "f1_macro": float(report["macro avg"]["f1-score"]),
        "f1_weighted": float(report["weighted avg"]["f1-score"]),
        "precision_macro": float(report["macro avg"]["precision"]),
        "recall_macro": float(report["macro avg"]["recall"]),
        "confusion_matrix": cm.tolist(),
        "labels": labels,
        "per_intent": per_intent,
        "per_language": per_language,
        "per_state": per_state,
        "test_samples": len(test_df),
        "train_samples": len(test_df),  # Updated later
    }

    return metrics


def main():
    print("=" * 60)
    print("HERITAGE ATLAS — Intent Classification Model Training v5")
    print("=" * 60)

    train_df, test_df = load_data()
    pipeline = train_model(train_df)
    metrics = evaluate_model(pipeline, test_df)

    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(pipeline, MODEL_PATH)
    print(f"\nModel saved to {MODEL_PATH}")

    # Update train_samples
    metrics["train_samples"] = len(train_df)
    with open(METRICS_PATH, "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"Metrics saved to {METRICS_PATH}")

    print(f"\n{'=' * 60}")
    print(f"TRAINING COMPLETE — Accuracy: {metrics['accuracy']:.4f}, F1: {metrics['f1_macro']:.4f}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
