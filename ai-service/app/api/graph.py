"""
Knowledge Graph API — placeholder for future Neo4j integration.
"""

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class GraphQueryRequest(BaseModel):
    entity: str
    relationship: str | None = None
    depth: int = 1


class GraphQueryResponse(BaseModel):
    success: bool
    message: str
    nodes: list = []
    edges: list = []


@router.post("/query", response_model=GraphQueryResponse)
async def query_graph(request: GraphQueryRequest):
    """
    Knowledge graph query — not yet implemented.

    Future implementation will:
    - Connect to Neo4j
    - Execute graph traversal queries
    - Return nodes and edges
    """
    return GraphQueryResponse(
        success=True,
        message="Knowledge graph is not yet implemented. This is a placeholder.",
        nodes=[],
        edges=[],
    )
