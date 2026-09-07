# Entity Relationship Diagram — Astrova

## Mermaid ER Diagram

```mermaid
erDiagram
    heritage_entities {
        uuid id PK
        varchar name
        varchar slug UK
        varchar category
        text description
        uuid location_id FK
        uuid period_id FK
        uuid source_id FK
        text image_url
        timestamp created_at
        timestamp updated_at
    }

    locations {
        uuid id PK
        varchar name
        varchar slug UK
        varchar type
        text description
        decimal latitude
        decimal longitude
        uuid parent_id FK
        varchar state
        timestamp created_at
        timestamp updated_at
    }

    historical_periods {
        uuid id PK
        varchar name
        integer start_year
        integer end_year
        text description
        timestamp created_at
    }

    media {
        uuid id PK
        uuid entity_id FK
        varchar type
        text url
        text caption
        text alt_text
        text credit
        integer display_order
        boolean is_primary
        varchar verification_status
        uuid source_id FK
        timestamp created_at
    }

    sources {
        uuid id PK
        varchar title
        varchar author
        text url
        date publication_date
        text notes
        varchar source_type
        varchar verification_status
        varchar publisher
        date retrieved_date
        timestamp updated_at
    }

    relationships {
        uuid id PK
        uuid source_id FK
        uuid target_id FK
        varchar type
        text description
        timestamp created_at
    }

    collections {
        uuid id PK
        varchar name
        varchar slug UK
        text description
        varchar image_url
        integer display_order
        boolean is_active
        uuid hero_media_id FK
        timestamp created_at
    }

    collection_items {
        uuid id PK
        uuid collection_id FK
        uuid heritage_entity_id FK
        integer display_order
        timestamp created_at
    }

    supported_states {
        uuid id PK
        varchar name
        varchar code
        text description
        varchar capital
        varchar region
        text image_url
        text highlights
    }

    chatbot_knowledge {
        uuid id PK
        varchar category
        varchar subcategory
        varchar language
        varchar intent
        text question
        text answer
        varchar state
        varchar heritage_name
    }

    conversations {
        uuid id PK
        varchar session_id
        varchar language
        timestamp created_at
        timestamp updated_at
    }

    conversation_messages {
        uuid id PK
        uuid conversation_id FK
        varchar role
        text content
        varchar intent
        timestamp created_at
    }

    analytics_events {
        uuid id PK
        varchar event_type
        uuid heritage_entity_id FK
        uuid collection_id FK
        text search_query
        varchar language
        jsonb metadata
        timestamp created_at
    }

    users {
        uuid id PK
        varchar name
        varchar email UK
        varchar password_hash
        timestamp created_at
        timestamp updated_at
    }

    user_favorites {
        uuid id PK
        uuid user_id FK
        uuid heritage_entity_id FK
        timestamp created_at
    }

    %% Relationships
    heritage_entities ||--o{ locations : "located in"
    heritage_entities ||--o{ historical_periods : "belongs to period"
    heritage_entities ||--o| sources : "referenced by"
    heritage_entities ||--o{ media : "has media"
    heritage_entities ||--o{ relationships : "source of relationship"
    heritage_entities ||--o{ relationships : "target of relationship"
    heritage_entities ||--o{ collection_items : "in collections"
    heritage_entities ||--o{ user_favorites : "favorited by users"
    heritage_entities ||--o{ analytics_events : "tracked in analytics"

    locations ||--o{ heritage_entities : "contains heritage"
    locations ||--o{ locations : "parent location"

    historical_periods ||--o{ heritage_entities : "contains heritage"

    sources ||--o{ heritage_entities : "cited by heritage"
    sources ||--o{ media : "cited by media"

    media ||--o{ heritage_entities : "belongs to heritage"
    media ||--o| collections : "hero image for collection"

    collections ||--o{ collection_items : "contains items"
    collections ||--o{ analytics_events : "tracked in analytics"

    collection_items ||--o| heritage_entities : "references heritage"

    users ||--o{ user_favorites : "has favorites"
    user_favorites ||--o| heritage_entities : "favorites heritage"

    conversations ||--o{ conversation_messages : "contains messages"

    analytics_events ||--o| heritage_entities : "tracks heritage"
    analytics_events ||--o| collections : "tracks collections"
```

## Human-Readable Explanation

### Core Entities

1. **heritage_entities** (74 records) — The central table. Each record represents an Indian cultural heritage entity (monument, craft, tradition, festival, etc.) with name, slug, category, description, and links to location, period, and source.

2. **locations** (54 records) — Geographic locations where heritage exists. Supports hierarchical structure (state → district → city → site) via self-referencing `parent_id`. Contains latitude/longitude coordinates for map display.

3. **historical_periods** (9 records) — Time periods from Ancient Period (-3300 BCE) to Modern Period (1947–present). Each heritage entity can be linked to one period.

4. **media** (72 records) — Images, videos, documents associated with heritage entities. Supports primary media flag for hero display. All current records are images.

5. **sources** (18 records) — Academic, government, and other reference sources cited by heritage entities. Includes verification status.

### Relationship Tables

6. **relationships** (49 records) — Many-to-many relationships between heritage entities (e.g., "LOCATED_IN", "ASSOCIATED_WITH", "BUILT_BY").

7. **collections** (7 records) — Curated groupings of heritage entities (e.g., "Sacred Architecture", "Indian Crafts").

8. **collection_items** (98 records) — Junction table linking collections to heritage entities.

### User & Auth

9. **users** (25 records) — User accounts with name, email, bcrypt-hashed password.

10. **user_favorites** (4 records) — Per-user favorite heritage entities. Enforces unique (user_id, heritage_entity_id) constraint.

### Chatbot

11. **chatbot_knowledge** (107 records) — Multilingual Q&A knowledge base for the chatbot.

12. **conversations** — Chat session tracking.

13. **conversation_messages** — Individual chat messages.

### Analytics

14. **analytics_events** (0 records) — Usage tracking for heritage views, searches, collection views.

### Reference

15. **supported_states** (12 records) — Indian states with metadata, highlights, and images for the homepage state discovery section.

### Key Relationships

- **Heritage → Location**: Many-to-one (heritage can have one location; location can have many heritage)
- **Heritage → Period**: Many-to-one
- **Heritage → Source**: Many-to-one (optional)
- **Heritage → Media**: One-to-many
- **Heritage ↔ Heritage**: Many-to-many (via relationships table)
- **Collection ↔ Heritage**: Many-to-many (via collection_items)
- **User → Favorites → Heritage**: Many-to-many (via user_favorites)
