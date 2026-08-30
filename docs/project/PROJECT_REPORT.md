# ASTROVA — PROJECT REPORT
## Smart India Hackathon Internal 2026

**Application:** Astrova — Discover India. Experience Heritage.
**Date:** August 30, 2026
**Version:** 1.0 (Regional Expansion + Nature + Living Culture)

---

## TABLE OF CONTENTS

1. Executive Summary
2. System Architecture
3. Technology Stack
4. Project Structure
5. Database Design
6. API Reference
7. Frontend Architecture
8. Interactive Map System
9. Multilingual AI Chatbot
10. ML Intent Classifier
11. Data Flow Diagrams
12. State & Region Coverage
13. Setup & Deployment Guide
14. Current Status & Metrics
15. Known Issues & Future Work

---

## 1. EXECUTIVE SUMMARY

**Astrova** is an interactive digital platform for discovering India's cultural heritage — culture, heritage, nature, and tradition — through maps, stories, history, and AI-powered exploration.

### What It Does

- **Explore 12 Indian states** with heritage sites, natural features, and cultural traditions
- **Interactive Leaflet + OpenStreetMap** map with GeoJSON state/region boundaries
- **Multilingual AI chatbot** supporting 6 languages (English, Gujarati, Hindi, Marathi, Tamil, Punjabi) plus Romanized input
- **Intent classification ML model** that understands 20 intent categories
- **40 locations + 49 heritage entities** stored in Neon PostgreSQL
- **68 map markers** loaded from the database in real-time

### Key Features

| Feature | Status |
|---|---|
| 12-state heritage data | ✅ Implemented |
| Interactive Leaflet map with GeoJSON | ✅ Implemented |
| OpenStreetMap tiles (free, no API key) | ✅ Implemented |
| State/region boundary highlighting | ✅ Implemented |
| Multilingual chatbot (6 languages) | ✅ Implemented |
| Romanized input support | ✅ Implemented |
| ML intent classifier (v5) | ✅ Implemented |
| 40 locations + 49 heritage entities | ✅ Implemented |
| Search (heritage + locations) | ✅ Implemented |
| Responsive design (mobile → desktop) | ✅ Implemented |

---

## 2. SYSTEM ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER (Browser)                           │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Homepage   │  │  Explore    │  │  Heritage   │            │
│  │  /explore    │  │  /timeline  │  │  /ai        │            │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘            │
│         │                │                │                     │
│  ┌──────┴────────────────┴────────────────┴──────┐             │
│  │           Next.js 16 Frontend                  │             │
│  │           (React 19 + TypeScript)              │             │
│  │                                                │             │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐    │             │
│  │  │ Leaflet  │  │  Search  │  │  ChatBot  │    │             │
│  │  │  + OSM   │  │  Modal   │  │  Component│    │             │
│  │  │ + GeoJSON│  │          │  │           │    │             │
│  │  └────┬─────┘  └────┬─────┘  └─────┬────┘    │             │
│  └───────┼──────────────┼──────────────┼─────────┘             │
│          │              │              │                        │
└──────────┼──────────────┼──────────────┼────────────────────────┘
           │              │              │
    ┌──────┴──────────────┴──────────────┴──────┐
    │          Backend API (Express.js)          │
    │          Port: 3001                        │
    │                                            │
    │  ┌────────┐ ┌────────┐ ┌────────┐         │
    │  │/api/   │ │/api/   │ │/api/   │         │
    │  │locations│ │heritage│ │ai/chat │         │
    │  └───┬────┘ └───┬────┘ └───┬────┘         │
    │      │          │          │               │
    │  ┌───┴──────────┴──────────┴───┐           │
    │  │     Chatbot Service         │           │
    │  │  (Intent Classification)    │           │
    │  │  + Knowledge Base           │           │
    │  └────────────┬────────────────┘           │
    └───────────────┼────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │  Neon PostgreSQL     │
         │  (Cloud Database)    │
         │                      │
         │  - locations         │
         │  - heritage_entities │
         │  - chatbot_knowledge │
         │  - timeline_periods  │
         │  - relationships     │
         └──────────────────────┘
```

---

## 3. TECHNOLOGY STACK

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.3.2 | React framework (App Router, Turbopack) |
| React | 19.2.8 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Leaflet | Latest | Interactive map |
| React-Leaflet | Latest | React-Leaflet bindings |
| Motion | 13.x | Animations |
| Lucide React | 1.x | Icons |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | LTS | Runtime |
| Express.js | Latest | HTTP server |
| TypeScript | 5.x | Type safety |
| PostgreSQL | (Neon) | Database |

### AI/ML
| Technology | Purpose |
|---|---|
| Python 3.x | ML training |
| scikit-learn | Intent classifier |
| TF-IDF | Feature extraction |
| MultinomialNB | Classification |

### Infrastructure
| Service | Purpose |
|---|---|
| Neon PostgreSQL | Cloud database hosting |
| OpenStreetMap | Free map tiles |
| Leaflet.js | Map rendering |
| GeoJSON | Geographic boundaries |

---

## 4. PROJECT STRUCTURE

```
Astrova/
├── frontend/                          # Next.js Frontend
│   ├── app/                           # App Router pages
│   │   ├── page.tsx                   # Homepage
│   │   ├── layout.tsx                 # Root layout
│   │   ├── explore/page.tsx           # Explore India + Map
│   │   ├── heritage/page.tsx          # Heritage directory
│   │   ├── timeline/page.tsx          # Historical timeline
│   │   ├── ai/page.tsx                # AI chatbot page
│   │   └── about/page.tsx             # About page
│   ├── components/
│   │   ├── map/AstrovaMap.tsx         # Main Leaflet map
│   │   ├── ai/ChatBot.tsx             # Chat interface
│   │   ├── layout/Navbar.tsx          # Navigation bar
│   │   └── layout/Footer.tsx          # Footer
│   ├── constants/                     # Data & config
│   ├── data/geojson/                  # GeoJSON boundaries
│   ├── services/                      # API & map services
│   └── public/assets/                 # Images & logos
│
├── backend/                           # Express.js API
│   └── src/
│       ├── routes/                    # API endpoints
│       ├── services/chatbot.ts        # Intent classifier
│       └── config/languages.ts        # Language support
│
├── database/                          # Database management
│   ├── migrations/                    # Schema migrations
│   └── seeds/                         # Seed data
│
├── ml/                                # Machine Learning
│   ├── src/train_v5.py               # Training script
│   ├── data/                          # Training/test data
│   └── models/                        # Evaluation metrics
│
├── ai-service/                        # Python AI (Future)
└── docs/                              # Documentation
```

---

## 5. DATABASE DESIGN

### Entity Relationship Diagram

```
┌──────────────────────┐     ┌──────────────────────┐
│    locations          │     │ heritage_entities     │
├──────────────────────┤     ├──────────────────────┤
│ id (UUID, PK)        │◄────│ location_id (UUID, FK)│
│ name (VARCHAR)       │     │ id (UUID, PK)        │
│ type (VARCHAR)       │     │ name (VARCHAR)       │
│ description (TEXT)   │     │ category (VARCHAR)   │
│ latitude (DECIMAL)   │     │ description (TEXT)   │
│ longitude (DECIMAL)  │     │ period_id (UUID, FK) │──┐
│ parent_id (UUID, FK) │──┐  │ image_url (TEXT)     │  │
│ state (VARCHAR)      │  │  └──────────────────────┘  │
└──────────────────────┘  │                             │
                          │  ┌──────────────────────┐  │
┌──────────────────────┐  │  │ historical_periods   │  │
│ chatbot_knowledge    │ 

### Location Types
state, district, city, village, site, region, waterfall, river, forest, wildlife_area, mountain, beach, backwater, gorge, lake

### Heritage Categories
monument, person, craft, tradition, festival, architecture, event, food, community, natural_landmark, waterfall, river, forest, wildlife, mountain, beach, backwater, gorge, lake

---

## 6. API REFERENCE

### Base URL: `http://localhost:3001/api`

All endpoints (except health) require `X-API-Key` header.

```
GET  /api/health                    — Health check (no auth)
GET  /api/locations                 — All 40 locations
GET  /api/locations/:id             — Single location
GET  /api/heritage                  — All 49 heritage entities
GET  /api/heritage/:id              — Single heritage entity
GET  /api/heritage/category/:cat    — Heritage by category
GET  /api/search?q=QUERY            — Search heritage + locations
GET  /api/timeline                  — Historical periods
POST /api/ai/chat                   — Chatbot conversation
GET  /api/ai/welcome?language=CODE  — Welcome message
GET  /api/ai/suggestions            — Suggested questions
GET  /api/ai/languages              — Supported languages
GET  /api/system/connectivity       — DB connectivity test
```

---

## 7. FRONTEND ARCHITECTURE

### Page Routing

```
/                    → Homepage (hero, stats, state cards)
/explore             → Explore India (Leaflet map + search)
/explore/[id]        → Location detail
/heritage            → Heritage directory
/heritage/[id]       → Heritage entity detail
/timeline            → Historical timeline
/ai                  → AI chatbot interface
/about               → About Astrova
```

---

## 8. INTERACTIVE MAP SYSTEM

### Map Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LEAFLET MAP                               │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              OpenStreetMap Tiles                     │   │
│  │   https://tile.openstreetmap.org/{z}/{x}/{y}.png    │   │
│  │   (Free, no API key required)                        │   │
│  │   © OpenStreetMap contributors                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            GeoJSON State Boundaries                  │   │
│  │   12 states with hover/click highlighting            │   │
│  │   fillColor: #C2703E (terracotta)                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           GeoJSON Region Boundaries                  │   │
│  │   6 regions with hover/click highlighting            │   │
│  │   fillColor: #6D28D9 (purple)                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              68 Map Markers                          │   │
│  │   ● Location (circle)    #C2703E terracotta         │   │
│  │   ◆ Heritage (diamond)   #B8963E gold               │   │
│  │   ● Waterfall            #0891B2 cyan               │   │
│  │   ● River                #2563EB blue               │   │
│  │   ● Forest               #166534 green              │   │
│  │   ● Wildlife             #DC2626 red                │   │
│  │   ● Mountain             #6B7280 gray               │   │
│  │   ● Beach                #0EA5E9 sky                │   │
│  │   ● Gorge                #475569 slate              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ State        │  │  Map         │  │  Legend       │     │
│  │ Selector     │  │  Controls    │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### Map Interaction Flow

```
User hovers marker
       │
       ▼
┌──────────────┐
│  Tooltip     │  ← Lightweight: Name, State, Type
│  appears     │
└──────┬───────┘
       │
       ▼
User clicks marker
       │
       ▼
┌──────────────────────────────────┐
│  Popup opens                     │
│  ┌────────────────────────────┐  │
│  │  [Icon] Name               │  │
│  │  State · Type              │  │
│  │  Description (3 lines)     │  │
│  │                            │  │
│  │  [Ask Atlas]  [Details]    │  │
│  └────────────────────────────┘  │
└──────────────┬───────────────────┘
               │
       ┌───────┴───────┐
       ▼               ▼
┌──────────────┐  ┌──────────────┐
│ Ask Atlas    │  │ Details      │
│ → /ai?       │  │ → /heritage  │
│   question=  │  │              │
│   Tell me    │  │              │
│   about...   │  │              │
└──────────────┘  └──────────────┘
```

---

## 9. MULTILINGUAL AI CHATBOT

### Supported Languages

```
English (en)    → "Tell me about Rani ki Vav"
Gujarati (gu)   → "Rani ki Vav vishe janavo"
Hindi (hi)      → "Rani ki Vav ke bare me bataiye"
Marathi (mr)    → "Rani ki Vav baddal sanga"
Tamil (ta)      → "Rani ki Vav pathi sollunga"
Punjabi (pa)    → "Rani ki Vav bare daso"
```

### Chatbot Flow

```
User types message
       │
       ▼
┌──────────────────────────┐
│  Detect language          │
│  (script analysis +       │
│   keyword matching)       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Classify intent          │
│  (ML model / keyword      │
│   fallback)               │
│                           │
│  20 intent categories:    │
│  state_exploration        │
│  heritage_information     │
│  location_information     │
│  craft_information        │
│  festival_information     │
│  waterfall, river,        │
│  mountain, beach,         │
│  wildlife, architecture,  │
│  tradition, community,    │
│  food, greeting, unknown  │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Query chatbot_knowledge  │
│  (Neon PostgreSQL)        │
│  MATCH on:                │
│  - intent                 │
│  - state                  │
│  - language               │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Generate response        │
│  + guided choices         │
│  + navigation actions     │
│  + suggested follow-ups   │
└──────────────────────────┘
```

---

## 10. ML INTENT CLASSIFIER

### Model Architecture

```
Input: User message text
       │
       ▼
┌──────────────────────────┐
│  Preprocessing           │
│  Lowercase + normalize   │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  TF-IDF Vectorizer       │
│  max_features: 5000      │
│  ngram_range: (1, 2)     │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  MultinomialNB           │
│  alpha: 0.1              │
└──────────┬───────────────┘
           │
           ▼
Output: Intent label + confidence
(20 categories)
```

### V5 Model Metrics

| Metric | Value |
|---|---|
| Accuracy | 69.3% |
| F1 Macro | 65.9% |
| F1 Weighted | 68.3% |
| Precision Macro | 69.0% |
| Recall Macro | 70.8% |
| Train samples | 692 |
| Test samples | 215 |

### Per-Language Accuracy

| Language | Accuracy | Samples |
|---|---|---|
| Marathi | 88.9% | 9 |
| Hindi | 72.0% | 25 |
| Tamil | 71.4% | 7 |
| English | 68.8% | 125 |
| Gujarati | 67.5% | 40 |
| Punjabi | 55.6% | 9 |

---

## 11. DATA FLOW DIAGRAMS

### User Journey — Explore Heritage

```
HOME
  │
  ├─→ Click "Explore Heritage"
  │      │
  │      ▼
  │   /explore
  │      │
  │      ├─→ View Leaflet Map (68 markers)
  │      │      │
  │      │      ├─→ Hover marker → Tooltip
  │      │      ├─→ Click marker → Popup
  │      │      │     


---

## 12. STATE & REGION COVERAGE

### 12 Supported States

```
                    Jammu & Kashmir
                         ^
                         |
        +----------------+----------------+
        |                |                |
   Punjab          Rajasthan         (Himachal)
        |                |
   Delhi ----- Madhya Pradesh ----- Odisha
        |                |                |
        |           Maharashtra            |
        |                |                |
     (Gujarat)        Goa            Assam
                         |
                    Kerala
                         |
                  Tamil Nadu
```

### 6 Required Regions

| Region | State | Type | Key Features |
|---|---|---|---|
| North Malabar | Kerala | Cultural | Theyyam, waterfalls, forests, beaches |
| Chettinad | Tamil Nadu | Cultural | Mansions, Athangudi tiles, cuisine |
| Gurez Valley | J&K | Cultural | Dard/Shina culture, mountains |
| Satkosia Gorge | Odisha | Natural | Mahanadi River, wildlife, eco-tourism |
| Amboli | Maharashtra | Natural | Waterfalls, Western Ghats, monsoon |
| Majuli | Assam | Cultural | River island, Satras, Sattriya, masks |

---

## 13. SETUP & DEPLOYMENT GUIDE

### Prerequisites
- Node.js 18+ (LTS)
- npm or yarn
- Python 3.8+ (for ML training)
- Neon PostgreSQL account (free tier)

### Environment Variables

```
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
DEMO_API_KEY=your_dev_key
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_DEMO_API_KEY=your_dev_key
```

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/tirthshah0201/Dharohar-AI.git
cd Dharohar-AI

# 2. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 3. Set up environment
cp .env.example .env

# 4. Run database migrations
cd database && node migrate.ts

# 5. Start backend (port 3001)
cd backend && npm run dev

# 6. Start frontend (port 3000)
cd frontend && npm run dev

# 7. Open browser -> http://localhost:3000
```

---

## 14. CURRENT STATUS & METRICS

### Data Counts

| Data Type | Count |
|---|---|
| States | 12 |
| Regions | 6 |
| Locations | 40 |
| Heritage entities | 49 |
| Map markers | 68 |
| Chatbot knowledge | 58 |
| Historical periods | 8+ |
| Languages | 6 |
| Intent categories | 20 |
| ML training samples | 692 |
| ML test samples | 215 |

### Build Status

| Check | Status |
|---|---|
| TypeScript (frontend) | 0 errors |
| TypeScript (backend) | 0 errors |
| Git commit | Latest: 0380f33 |
| GitHub push | Success |

---

## 15. KNOWN ISSUES & FUTURE WORK

### Known Issues

| Issue | Priority |
|---|---|
| 20 images need developer provision | MEDIUM |
| J&K accuracy low (25%) in ML model | LOW |
| GeoJSON boundaries are approximate | LOW |
| Map zoom hierarchy not fully implemented | LOW |

### Future Work

| Feature | Priority | Effort |
|---|---|---|
| RAG (Retrieval-Augmented Generation) | HIGH | Large |
| Semantic search with pgvector | MEDIUM | Medium |
| Neo4j knowledge graph | MEDIUM | Large |
| Production LLM integration | HIGH | Medium |
| Additional states (beyond 12) | LOW | Medium |
| Voice interface | LOW | Large |
| Image understanding | LOW | Large |
| Map clustering | LOW | Small |

---

## APPENDIX: GIT HISTORY

```
0380f33  feat: migrate map from MapLibre to Leaflet + OpenStreetMap + GeoJSON
5f2226f  feat: rebrand Heritage Atlas to Astrova with logo assets
07d7383  fix: resolve map API connectivity failure + update stats/search
db2b87c  feat: expand Heritage Atlas with regional nature and living culture
7987929  feat: complete regional expansion and stabilize heritage intelligence
```

---

**Report prepared by:** Buffy (Codebuff AI Agent)
**Date:** August 30, 2026
**Project:** Astrova - Smart India Hackathon Internal 2026
