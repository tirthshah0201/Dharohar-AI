# ASTROVA — MASTER PROJECT AUDIT REPORT

**Date:** August 31, 2026  
**Project:** Astrova (formerly Dharohar AI / Heritage Atlas)  
**Audit Type:** Comprehensive Technical Audit  
**Auditor:** Buffy (Codebuff AI Agent)  
**Model:** MiMo 2.5 Balanced  

---

## EXECUTIVE SUMMARY

| Area | Status | Verdict |
|------|--------|---------|
| Architecture | WARNING | Functional but needs consolidation |
| Frontend | PASS | Working, well-structured React/Next.js |
| Backend | PASS | Functional Express API, clean |
| Database | WARNING | Schema exists, data needs enrichment |
| Map | WARNING | Functional, but missing real boundaries |
| AI/Chatbot | WARNING | Basic intent classifier, no ML integration |
| ML | RISK | Model exists but NOT deployed to chatbot |
| UI/UX | PASS | Polished, responsive, animated |
| Security | WARNING | Dev-only API key, no real auth |
| Documentation | WARNING | Partial, needs updating |

**Overall Status: YELLOW**

---

## 1. AUDIT OBJECTIVE

Complete audit of the Astrova project covering: implementation status, architecture, database, AI/ML, map system, search, security, and roadmap.

---

## 2. PROJECT INVENTORY

### Frontend (Next.js 16.3.2 + React 19.2.8)
- **53 TypeScript/TSX files**
- 6 route pages, 2 dynamic detail pages
- Map system (6 files), ChatBot (1 file), UI primitives (15 files)
- Constants: app config, images, states, map, famous markers
- Services: API client, map data loader
- Hooks: useApi generic hook
- GeoJSON: simplified state + region polygons

### Backend (Express + TypeScript)
- **34 TypeScript files**
- 7 API routes, 1 chatbot service, 2 middleware
- Config: language configuration
- Database: PostgreSQL pool + helpers

### AI Service (Python FastAPI)
- **STUB ONLY** — Empty placeholder, no implementation

### ML (Python + scikit-learn)
- 18 CSV datasets, 5 training scripts, 5 model versions
- **Latest (v5):** TF-IDF + Logistic Regression, 69.3% accuracy
- **NOT DEPLOYED** — Chatbot uses rule-based detection instead

### Database (Neon PostgreSQL)
- 10 tables: locations, heritage_entities, historical_periods, relationships, sources, media, supported_states, chatbot_knowledge, conversations, conversation_messages

---

## 3. TECHNOLOGY STACK (VERIFIED)

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js | 16.3.2 |
| Frontend | React | 19.2.8 |
| Frontend | TypeScript | ^5 |
| Frontend | Tailwind CSS | ^4 |
| Frontend | Motion | ^13.1.1 |
| Frontend | Leaflet | ^1.9.4 |
| Backend | Express | ^4.21.2 |
| Backend | pg | ^8.23.0 |
| Database | PostgreSQL (Neon) | Serverless |
| ML | scikit-learn | Latest |
| Map | OpenStreetMap | Tiles |

---

## 4. CRITICAL FINDING: ML Model NOT Integrated

**The trained ML intent classifier (v5, 69.3% accuracy) is NOT integrated into the chatbot.**

The chatbot uses rule-based regex pattern matching instead of the trained model.

---

## 5. FEATURE COMPLETENESS

| Feature | Status | Priority |
|---------|--------|----------|
| Home Page | ✅ IMPLEMENTED | — |
| Interactive Map | ✅ IMPLEMENTED | — |
| Search | ✅ IMPLEMENTED | — |
| Timeline | ✅ IMPLEMENTED | — |
| AI Chatbot | ✅ IMPLEMENTED | — |
| Multi-language (6) | ✅ IMPLEMENTED | — |
| Responsive UI | ✅ IMPLEMENTED | — |
| ML Classifier | ⚠️ NOT DEPLOYED | P1 |
| Semantic Search | ❌ NOT IMPLEMENTED | P3 |
| RAG / pgvector | ❌ NOT IMPLEMENTED | P3 |
| Real Auth | ❌ NOT IMPLEMENTED | P2 |
| Tests | ⚠️ MINIMAL | P2 |

---

## 6. TECHNICAL DEBT

### P0 — Must Fix
- AST-001: ML model not integrated into chatbot
- AST-002: ai-service/ is empty stub
- AST-017: API key exposed as NEXT_PUBLIC_DEMO_API_KEY

### P1 — Should Fix
- Multiple ML model versions (v1-v5)
- Multiple dataset versions (18 CSVs)
- Relationships table sparse/unused
- Sources/media tables unused
- No rate limiting

### P2 — Nice to Fix
- No strict null checks
- No request logging
- CORS too permissive in dev
- No error boundaries

---

## 7. SECURITY ISSUES

| Issue | Risk | Recommendation |
|-------|------|----------------|
| API key exposed to client | HIGH | Remove NEXT_PUBLIC_ prefix |
| No rate limiting | MEDIUM | Add express-rate-limit |
| CORS allows all origins | MEDIUM | Restrict in production |
| Dev API key only | MEDIUM | Replace with JWT |

---

## 8. RECOMMENDED ROADMAP

### P0 (1-2 days): Critical Fixes
- Integrate ML model into chatbot
- Remove ai-service stub
- Fix API key exposure

### P1 (3-5 days): Product Completion
- Clean up ML/data versioning
- Populate relationships data
- Add rate limiting

### P2 (1-2 weeks): Quality
- Add auth, tests, error boundaries
- Optimize images, deployment setup

### P3 (2-4 weeks): Advanced AI
- Semantic search, RAG, knowledge graph

### P4 (1-2 months): Long-term
- Voice I/O, PWA, analytics

---

*End of Audit Report — August 31, 2026*
