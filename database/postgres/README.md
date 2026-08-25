# PostgreSQL Database — Dharohar AI

## Overview

PostgreSQL serves as the primary relational database for Dharohar AI. It stores structured heritage data, user data, and application state.

## Extensions

- **pgvector** — Vector similarity search for AI embeddings

## Planned Entities

### Core Tables

| Table | Purpose |
|-------|---------|
| `users` | User accounts and profiles |
| `locations` | Places, districts, cities, sites |
| `historical_periods` | Time periods (Ancient, Medieval, etc.) |
| `heritage_entities` | Core heritage items with categories |
| `monuments` | Specific monument data |
| `people` | Historical figures |
| `crafts` | Traditional crafts and artisans |
| `traditions` | Cultural traditions |
| `festivals` | Festivals and celebrations |
| `events` | Historical events |
| `communities` | Cultural communities |
| `sources` | Reference sources and citations |
| `media` | Images, documents, audio |
| `relationships` | Connections between entities |
| `contributions` | User-contributed content |

### Indexes

- Full-text search indexes on name and description fields
- Spatial indexes for geographic queries (PostGIS, future)
- Vector indexes for embedding similarity search (pgvector)

## Setup

```bash
# Create database
createdb dharohar_ai

# Enable extensions
psql dharohar_ai -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

## Migration Strategy

Migrations will be managed through numbered SQL files in the `migrations/` directory.
