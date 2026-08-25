# Dharohar AI

**An intelligent cultural and historical knowledge platform for discovering Gujarat's heritage.**

## Problem

India's cultural heritage is vast but fragmented across static websites, unstructured documents, and inaccessible databases. There is no unified, AI-powered platform for exploring the interconnected nature of cultural heritage.

## Solution

Dharohar AI provides:

- **Heritage exploration** through places, people, traditions, crafts, and events
- **Knowledge graph** capturing relationships between heritage entities
- **AI-powered insights** through retrieval-augmented generation
- **Interactive timeline** spanning ancient to modern periods
- **Geographic exploration** with map-based interfaces

## Scope — Gujarat MVP

The initial version focuses **exclusively on Gujarat, India**. The architecture is designed to scale to all Indian states in future phases.

## Architecture

```
Frontend (Next.js)  →  Backend API (Express)  →  PostgreSQL (Neon) + pgvector
                      AI Service (FastAPI)    →  Neo4j (Knowledge Graph)
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Node.js, Express.js, TypeScript, pg |
| AI Service | Python, FastAPI |
| Database | Neon PostgreSQL + pgvector |
| Knowledge Graph | Neo4j |
| Icons | Lucide React |

## Folder Structure

```
Project SIH Internal 2026/
├── frontend/          # Next.js application
├── backend/           # Express.js API server
├── ai-service/        # FastAPI AI service
├── database/          # Database schemas and migrations
├── docs/              # Documentation
├── testing/           # Test suites
├── scripts/           # Utility scripts
├── backups/           # Database backups
├── exports/           # Data exports
├── .env.example       # Environment template
├── .gitignore         # Git ignore rules
├── package.json       # Root workspace package
└── README.md          # This file
```

## Installation

### Prerequisites

- Node.js 18+
- Python 3.10+
- A Neon PostgreSQL account (free tier works)

### Install Dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd backend && npm install

# AI Service
cd ai-service && pip install -r requirements.txt
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

**Required `.env` values:**

| Variable | Description | Where to get it |
|----------|-------------|----------------|
| `DATABASE_URL` | Neon PostgreSQL connection string | [console.neon.tech](https://console.neon.tech) |
| `DEMO_API_KEY` | Development API key (random string) | Generate with `node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"` |
| `NEXT_PUBLIC_DEMO_API_KEY` | Same as DEMO_API_KEY (for frontend) | Same value as DEMO_API_KEY |

See [docs/database/neon-setup.md](docs/database/neon-setup.md) for detailed Neon setup instructions.

### Database Setup

```bash
# Run migrations against Neon
npx ts-node database/migrate.ts migrate

# Seed with Gujarat heritage data
npx ts-node database/migrate.ts seed

# Check migration status
npx ts-node database/migrate.ts status
```

## Running

### Development

```bash
# Frontend (port 3000)
cd frontend && npm run dev

# Backend API (port 3001)
cd backend && npm run dev

# AI Service (port 8000)
cd ai-service && python -m uvicorn app.main:app --reload --port 8000
```

### Production Build

```bash
# Frontend
cd frontend && npm run build

# Backend
cd backend && npm run build
```

## API Key System

All data endpoints require a development API key. The health endpoint is public.

```bash
# Health check (no key needed)
curl http://localhost:3001/api/health

# Data endpoint (key required)
curl -H "X-API-Key: your_key_here" http://localhost:3001/api/locations

# Connectivity check
curl -H "X-API-Key: your_key_here" http://localhost:3001/api/system/connectivity
```

See [docs/development/api-key.md](docs/development/api-key.md) for full details.

> ⚠️ This is a temporary development mechanism. It will be replaced by JWT authentication in a future phase.

## API Endpoints

### Backend API (port 3001)

| Method | Endpoint | Auth | Status |
|--------|----------|------|--------|
| GET | `/api/health` | Public | ✅ Working |
| GET | `/api/system/connectivity` | API Key | ✅ Working |
| GET | `/api/locations` | API Key | ✅ Database-backed |
| GET | `/api/locations/:id` | API Key | ✅ Database-backed |
| GET | `/api/heritage` | API Key | ✅ Database-backed |
| GET | `/api/heritage/:id` | API Key | ✅ Database-backed |
| GET | `/api/timeline` | API Key | ✅ Database-backed |
| GET | `/api/timeline/eras` | API Key | ✅ Database-backed |
| GET | `/api/search?q=...` | API Key | ✅ Database-backed |
| POST | `/api/ai/chat` | API Key | 🚧 Stub |

### AI Service (port 8000)

| Method | Endpoint | Status |
|--------|----------|--------|
| GET | `/health` | ✅ Working |
| POST | `/api/ai/chat` | 🚧 Stub |
| POST | `/api/rag/retrieve` | 🚧 Stub |
| POST | `/api/graph/query` | 🚧 Stub |

## Frontend Routes

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | ✅ Foundation |
| `/explore` | Gujarat Explorer | ✅ Foundation |
| `/timeline` | Historical Timeline | ✅ Foundation |
| `/heritage` | Heritage Directory | ✅ Foundation |
| `/ai` | AI Assistant | ✅ Foundation |
| `/about` | About | ✅ Foundation |

## Development Commands

```bash
# Install all
npm run install:all

# Development
npm run dev:frontend
npm run dev:backend

# Build
npm run build:frontend
npm run build:backend

# Type check
npm run typecheck:frontend
npm run typecheck:backend

# Lint
npm run lint:frontend
npm run lint:backend

# Database
npx ts-node database/migrate.ts migrate
npx ts-node database/migrate.ts seed
npx ts-node database/migrate.ts status
npx ts-node database/migrate.ts reset
```

## Documentation

- [System Architecture](docs/architecture/system-architecture.md)
- [Database Design](docs/database/database-design.md)
- [Neon Setup](docs/database/neon-setup.md)
- [API Key System](docs/development/api-key.md)
- [Design System](docs/ui-ux/design-system.md)
- [Development Workflow](docs/development/development-workflow.md)

## Future Modules (Not Yet Implemented)

- [ ] Full AI chatbot with LLM integration
- [ ] RAG pipeline with pgvector
- [ ] Neo4j knowledge graph integration
- [ ] User authentication (JWT)
- [ ] Admin CMS
- [ ] Multilingual support
- [ ] Interactive map with MapLibre
- [ ] Contribution system
- [ ] Production deployment

## Development Rules

1. TypeScript strict mode
2. No unnecessary dependencies
3. No fabricated historical data
4. No fake functionality presented as complete
5. Reuse components
6. Validate API input
7. Handle loading, empty, and error states
8. Do not expose secrets
9. Keep modules loosely coupled
10. Document major decisions

## License

UNLICENSED — Internal project.

---

Built with care for Gujarat's heritage. Designed to scale for all of India.
