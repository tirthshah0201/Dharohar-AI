"""
Dharohar AI Service — FastAPI Application

This service will eventually handle:
- Query understanding
- RAG (Retrieval-Augmented Generation)
- Embeddings generation
- Knowledge graph queries
- LLM integration
- Multilingual AI processing
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic_settings import BaseSettings
from datetime import datetime


class Settings(BaseSettings):
    app_name: str = "Dharohar AI Service"
    version: str = "0.1.0"
    debug: bool = True
    database_url: str = ""
    neo4j_uri: str = "bolt://localhost:7687"
    neo4j_username: str = "neo4j"
    neo4j_password: str = ""
    llm_api_key: str = ""
    llm_model: str = "gpt-4"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.version,
    description="AI service for the Dharohar Heritage Platform",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "success": True,
        "service": settings.app_name,
        "version": settings.version,
        "timestamp": datetime.utcnow().isoformat(),
        "modules": {
            "rag": "not_implemented",
            "embeddings": "not_implemented",
            "graph": "not_implemented",
            "llm": "not_implemented",
        },
    }


@app.get("/")
async def root():
    return {"message": f"{settings.app_name} is running"}


# Import and include API routers
from app.api import chat, rag, graph, predict
from app.models.intent_classifier import load_model

app.include_router(chat.router, prefix="/api/ai", tags=["chat"])
app.include_router(rag.router, prefix="/api/rag", tags=["rag"])
app.include_router(graph.router, prefix="/api/graph", tags=["graph"])
app.include_router(predict.router, prefix="/api/ml", tags=["ml"])

# Load ML model on startup
@app.on_event("startup")
async def startup_event():
    """Load ML model when service starts."""
    load_model()
