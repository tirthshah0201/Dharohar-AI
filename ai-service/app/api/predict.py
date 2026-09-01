"""
ML Prediction API — Intent classification using trained model.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import Optional, Dict
from app.models.intent_classifier import predict_intent, get_model_info, load_model

router = APIRouter()


class PredictRequest(BaseModel):
    """Request for intent prediction."""
    text: str = Field(..., min_length=1, max_length=500, description="Text to classify")
    language: Optional[str] = Field(None, description="Detected language code")


class PredictResponse(BaseModel):
    """Response from intent prediction."""
    success: bool
    intent: str
    confidence: float
    probabilities: Dict[str, float]
    model_available: bool
    fallback_reason: Optional[str] = None


@router.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    """
    Predict intent for the given text.
    
    Uses the trained ML v5 model (TF-IDF + LogisticRegression).
    Falls back gracefully if model is unavailable.
    """
    result = predict_intent(request.text)
    
    return PredictResponse(
        success=True,
        intent=result["intent"],
        confidence=result["confidence"],
        probabilities=result["probabilities"],
        model_available=result["model_available"],
        fallback_reason=result.get("fallback_reason")
    )


@router.get("/model/info")
async def model_info():
    """Get information about the loaded ML model."""
    return get_model_info()


@router.post("/model/reload")
async def reload_model():
    """Reload the ML model from disk."""
    load_model()
    return get_model_info()
