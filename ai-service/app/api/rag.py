"""
RAG API — placeholder for future retrieval-augmented generation.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class RAGRequest(BaseModel):
    query: str
    context_limit: int = 5


class RAGResponse(BaseModel):
    success: bool
    message: str
    sources: list = []


@router.post("/retrieve", response_model=RAGResponse)
async def retrieve(request: RAGRequest):
    """
    RAG retrieval endpoint — not yet implemented.

    Future implementation will:
    - Generate query embeddings
    - Search pgvector for similar content
    - Query Neo4j for graph context
    - Return relevant sources
    """
    return RAGResponse(
        success=True,
        message="RAG is not yet implemented. This is a placeholder.",
        sources=[],
    )
