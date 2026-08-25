# System Architecture — Dharohar AI

## Overview

Dharohar AI uses a multi-service architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│              Next.js + React + TypeScript        │
│                    :3000                         │
└──────────┬──────────────────┬───────────────────┘
           │ REST API         │ AI Service
           ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│    Backend API   │  │    AI Service    │
│  Express + TS    │  │   FastAPI + Py   │
│      :3001       │  │      :8000       │
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         ▼                     ▼
┌──────────────────┐  ┌──────────────────┐
│   PostgreSQL     │  │     Neo4j        │
│   + pgvector     │  │  Knowledge Graph │
│      :5432       │  │      :7687       │
└──────────────────┘  └──────────────────┘
```

## Services

### Frontend (Next.js)
- **Port**: 3000
- **Responsibility**: UI rendering, client-side routing, static content
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4

### Backend API (Express.js)
- **Port**: 3001
- **Responsibility**: REST API, business logic, data validation, authentication (future)
- **Framework**: Express.js with TypeScript

### AI Service (FastAPI)
- **Port**: 8000
- **Responsibility**: AI processing, RAG, embeddings, LLM integration, knowledge graph queries
- **Framework**: FastAPI with Python

### PostgreSQL
- **Port**: 5432
- **Responsibility**: Primary data storage, vector search (pgvector)
- **Extensions**: pgvector

### Neo4j
- **Port**: 7687 (Bolt), 7474 (HTTP)
- **Responsibility**: Knowledge graph, relationship queries, graph traversal

## Data Flow

### Heritage Exploration
```
User → Frontend → Backend API → PostgreSQL → Response
```

### AI Query
```
User → Frontend → AI Service → RAG Pipeline → LLM → Response
                                    ↓
                              PostgreSQL (pgvector)
                              Neo4j (graph context)
```

### Knowledge Graph Query
```
User → Frontend → AI Service → Neo4j → Graph Results → Response
```

## Security

- No secrets in client-side code
- Environment variables for all configuration
- CORS configured per environment
- Input validation at API boundaries
- Authentication will be added in a future phase

## Scalability

- Services are independently deployable
- Database connections pool-managed
- API responses can be cached (future: Redis)
- AI service can be horizontally scaled
- Neo4j supports clustering for large graphs
