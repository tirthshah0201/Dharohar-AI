# Development Workflow — Dharohar AI

## Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Neo4j 5+ (for future graph features)

## Setup

### 1. Clone and Install

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install AI service dependencies
cd ../ai-service && pip install -r requirements.txt
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your local configuration
```

### 3. Start Services

```bash
# Terminal 1: Frontend (port 3000)
cd frontend && npm run dev

# Terminal 2: Backend API (port 3001)
cd backend && npm run dev

# Terminal 3: AI Service (port 8000)
cd ai-service && python -m uvicorn app.main:app --reload --port 8000
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev:frontend` | Start frontend dev server |
| `npm run dev:backend` | Start backend dev server |
| `npm run build:frontend` | Build frontend for production |
| `npm run build:backend` | Build backend for production |
| `npm run typecheck` | Type check all TypeScript |
| `npm run lint` | Lint all code |

## Code Structure

### Frontend

```
frontend/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── features/         # Feature-specific modules
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── services/         # API client
├── types/            # TypeScript types
└── constants/        # App constants
```

### Backend

```
backend/src/
├── controllers/      # Request handlers
├── routes/           # API route definitions
├── services/         # Business logic
├── middleware/        # Express middleware
├── models/           # Data models
├── validators/       # Input validation
├── utils/            # Utility functions
├── config/           # Configuration
└── types/            # TypeScript types
```

### AI Service

```
ai-service/app/
├── api/              # FastAPI route handlers
├── rag/              # RAG pipeline
├── embeddings/       # Embedding generation
├── graph/            # Neo4j integration
├── llm/              # LLM integration
├── services/         # Business logic
├── models/           # Data models
├── config/           # Configuration
└── utils/            # Utility functions
```

## Code Style

- TypeScript strict mode
- ESLint for linting
- Consistent naming: camelCase for JS/TS, snake_case for Python
- Components: PascalCase
- Files: kebab-case
- No unused imports
- No `any` types

## Git Workflow

- Feature branches from `main`
- Descriptive commit messages
- No secrets in commits
- Clean commit history
- Review before merge

## Testing

- Frontend: Playwright for E2E (future)
- Backend: Jest for unit tests
- AI Service: pytest

## Common Issues

### Port conflicts
Check if ports 3000, 3001, 8000 are available:
```bash
lsof -i :3000
lsof -i :3001
lsof -i :8000
```

### Database connection
Ensure PostgreSQL is running and `DATABASE_URL` is correct in `.env`.

### TypeScript errors
Run `npm run typecheck` to identify issues.
