# Astrova Audit Documentation

**Date:** August 31, 2026
**Status:** P0 Complete, P1 Planned

---

## Purpose

This directory contains comprehensive audit documentation for the Astrova project, including:

- P0-P1 handoff report
- P1 implementation plan
- Architecture diagrams
- Technical debt register

---

## Report Contents

| File | Description |
|------|-------------|
| `P0-P1-HANDOFF.md` | Complete P0 verification and P1 readiness assessment |
| `P1-PLAN.md` | Detailed P1 implementation plan with 12 steps |
| `README.md` | This file |

---

## Diagram Sources

All diagrams are in Mermaid format (`.mmd` files):

| Diagram | File | Purpose |
|---------|------|---------|
| System Architecture | `diagrams/system-architecture.mmd` | Overall system components |
| Database ERD | `diagrams/database-erd.mmd` | Database schema relationships |
| Chatbot Flow | `diagrams/chatbot-flow.mmd` | AI/chatbot architecture |
| Map Flow | `diagrams/map-flow.mmd` | Map architecture and interactions |
| Data Flow | `diagrams/data-flow.mmd` | End-to-end data flows |
| User Journey | `diagrams/user-journey.mmd` | User experience flows |
| Security Flow | `diagrams/security-flow.mmd` | Authentication and security |

### Rendering Diagrams

To view Mermaid diagrams:

1. **VS Code:** Install "Mermaid Preview" extension
2. **GitHub:** Diagrams render automatically in `.md` files
3. **Online:** Paste into [mermaid.live](https://mermaid.live)
4. **CLI:** Use `mmdc` (Mermaid CLI) to export as PNG/SVG

---

## What is Current vs Proposed

### Current (Implemented)
- ✅ Next.js frontend with 7 routes
- ✅ Express backend with 7 API modules
- ✅ Neon PostgreSQL with 8 tables
- ✅ Leaflet + OpenStreetMap map
- ✅ ML v5 intent classifier (69.3% accuracy)
- ✅ Multilingual chatbot (6 languages)
- ✅ Deterministic image mapping
- ✅ API key security via proxy

### Proposed (P1)
- 🔄 Enhanced database relationships
- 🔄 Canonical slugs for navigation
- 🔄 Source attribution system
- 🔄 Media table population
- 🔄 Enhanced map hierarchy
- 🔄 Chatbot knowledge relationships

### Future (P3+)
- 🔮 LLM integration
- 🔮 RAG (Retrieval-Augmented Generation)
- 🔮 pgvector semantic search
- 🔮 Knowledge graph
- 🔮 Voice input
- 🔮 Image understanding

---

## Regenerating Documentation

To update the audit:

1. Inspect current codebase
2. Update `P0-P1-HANDOFF.md` with findings
3. Update `P1-PLAN.md` with implementation status
4. Update diagrams as architecture changes
5. Update this README

---

## Questions?

Refer to the main project documentation:
- `docs/chatbot/PRD.md` — Product requirements
- `docs/chatbot/report.md` — Implementation report
- `docs/development/environment-config.md` — Environment setup
- `docs/development/api-key.md` — API key documentation
