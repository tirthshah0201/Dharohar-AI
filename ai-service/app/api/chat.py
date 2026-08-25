"""
Chat API — placeholder for future LLM integration.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    session_id: str | None = None


class ChatResponse(BaseModel):
    success: bool
    message: str
    reply: str | None = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint — not yet connected to an LLM.

    This will be implemented in a future phase with:
    - Query understanding
    - RAG retrieval
    - Knowledge graph context
    - LLM generation
    """
    return ChatResponse(
        success=True,
        message="AI chat is not yet implemented. This is a placeholder.",
        reply=None,
    )
