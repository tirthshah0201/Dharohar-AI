"""
ML Intent Classifier Service
Loads the trained v5 model and provides prediction endpoint.
Falls back gracefully if model is unavailable.
"""

import os
import joblib
from typing import Optional, List
from pathlib import Path

# Model paths
BASE_DIR = Path(__file__).parent.parent.parent
MODEL_DIR = BASE_DIR / "ml" / "models"
MODEL_PATH = MODEL_DIR / "intent_classifier_v5.joblib"

# Global model reference
_model = None
_model_loaded = False
_load_error: Optional[str] = None


def load_model() -> bool:
    """Load the ML model from disk."""
    global _model, _model_loaded, _load_error
    
    if _model_loaded:
        return _model is not None
    
    try:
        if not MODEL_PATH.exists():
            _load_error = f"Model file not found: {MODEL_PATH}"
            _model_loaded = True
            return False
        
        _model = joblib.load(MODEL_PATH)
        _model_loaded = True
        _load_error = None
        print(f"✅ ML model loaded from {MODEL_PATH}")
        return True
    except Exception as e:
        _load_error = str(e)
        _model_loaded = True
        print(f"❌ Failed to load ML model: {_load_error}")
        return False


def predict_intent(text: str) -> dict:
    """
    Predict intent for the given text.
    
    Returns:
        {
            "intent": str,
            "confidence": float,
            "probabilities": dict[intent, prob],
            "model_available": bool,
            "fallback_reason": str | None
        }
    """
    global _model, _load_error
    
    # Ensure model is loaded
    if not _model_loaded:
        load_model()
    
    # If model not available, return fallback
    if _model is None:
        return {
            "intent": "unknown",
            "confidence": 0.0,
            "probabilities": {},
            "model_available": False,
            "fallback_reason": _load_error or "Model not loaded"
        }
    
    try:
        # Get prediction and probabilities
        intent = _model.predict([text])[0]
        probas = _model.predict_proba([text])[0]
        classes = _model.classes_
        
        # Build probability dict
        prob_dict = {
            classes[i]: float(probas[i]) 
            for i in range(len(classes))
        }
        
        # Get confidence (max probability)
        confidence = float(max(probas))
        
        return {
            "intent": intent,
            "confidence": confidence,
            "probabilities": prob_dict,
            "model_available": True,
            "fallback_reason": None
        }
    except Exception as e:
        return {
            "intent": "unknown",
            "confidence": 0.0,
            "probabilities": {},
            "model_available": True,
            "fallback_reason": f"Prediction error: {str(e)}"
        }


def get_model_info() -> dict:
    """Get information about the loaded model."""
    global _model, _load_error
    
    if not _model_loaded:
        load_model()
    
    return {
        "model_loaded": _model is not None,
        "model_path": str(MODEL_PATH),
        "model_exists": MODEL_PATH.exists(),
        "error": _load_error
    }
