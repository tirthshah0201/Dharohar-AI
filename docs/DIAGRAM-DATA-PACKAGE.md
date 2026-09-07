# Diagram Data Package — Astrova

> Machine-readable structured data for generating accurate diagrams.

---

## Database Entities

### heritage_entities
- **Purpose**: Cultural heritage records (monuments, crafts, traditions, festivals)
- **Primary Key**: id (UUID)
- **Columns**: id, name, slug (UNIQUE), category, description, location_id (FK→locations), period_id (FK→historical_periods), source_id (FK→sources), image_url, created_at, updated_at
- **Cardinality**: Many heritage → One location; Many heritage → One period; Many heritage → One source
- **Referenced By**: media, relationships, collection_items, user_favorites, analytics_events

### locations
- **Purpose**: Geographic locations (states, districts, cities, sites)
- **Primary Key**: id (UUID)
- **Columns**: id, name, slug (UNIQUE), type (state/district/city/village/site), description, latitude (DECIMAL 10,8), longitude (DECIMAL 11,8), parent_id (FK→locations self), state, created_at, updated_at
- **Cardinality**: One location → Many heritage; Location → Parent location (self-referencing)
- **Referenced By**: heritage_entities

### historical_periods
- **Purpose**: Time periods (Ancient, Medieval, Colonial, Modern, etc.)
- **Primary Key**: id (UUID)
- **Columns**: id, name, start_year (INTEGER), end_year (INTEGER nullable), description, created_at
- **Cardinality**: One period → Many heritage
- **Referenced By**: heritage_entities

### media
- **Purpose**: Images, videos, documents associated with heritage
- **Primary Key**: id (UUID)
- **Columns**: id, entity_id (FK→heritage_entities), type (image/video/document/audio), url, caption, alt_text, credit, display_order, is_primary, verification_status, source_id (FK→sources), created_at
- **Cardinality**: Many media → One heritage; Media → One source (optional)
- **Referenced By**: collections (hero_media_id)

### sources
- **Purpose**: Reference sources cited by heritage entities
- **Primary Key**: id (UUID)
- **Columns**: id, title, author, url, publication_date, notes, source_type, verification_status, publisher, retrieved_date, updated_at
- **Cardinality**: One source → Many heritage; One source → Many media
- **Referenced By**: heritage_entities, media

### relationships
- **Purpose**: Many-to-many relationships between heritage entities
- **Primary Key**: id (UUID)
- **Columns**: id, source_id (FK→heritage_entities), target_id (FK→heritage_entities), type (LOCATED_IN, ASSOCIATED_WITH, etc.), description, created_at
- **Cardinality**: Heritage ↔ Heritage (many-to-many)

### collections
- **Purpose**: Curated groupings of heritage entities
- **Primary Key**: id (UUID)
- **Columns**: id, name, slug (UNIQUE), description, image_url, display_order, is_active, hero_media_id (FK→media), created_at
- **Cardinality**: One collection → Many collection_items
- **Referenced By**: collection_items, analytics_events

### collection_items
- **Purpose**: Junction table linking collections to heritage entities
- **Primary Key**: id (UUID)
- **Columns**: id, collection_id (FK→collections), heritage_entity_id (FK→heritage_entities), display_order, created_at
- **Constraints**: UNIQUE(collection_id, heritage_entity_id)
- **Cardinality**: Many collection_items → One collection; Many collection_items → One heritage

### supported_states
- **Purpose**: Indian states with metadata for homepage discovery
- **Primary Key**: id (UUID)
- **Columns**: id, name, code, description, capital, region, image_url, highlights

### chatbot_knowledge
- **Purpose**: Multilingual Q&A knowledge base
- **Primary Key**: id (UUID)
- **Columns**: id, category, subcategory, language, intent, question, answer, state, heritage_name

### conversations
- **Purpose**: Chat session tracking
- **Primary Key**: id (UUID)
- **Columns**: id, session_id, language, created_at, updated_at

### conversation_messages
- **Purpose**: Individual chat messages
- **Primary Key**: id (UUID)
- **Columns**: id, conversation_id (FK→conversations), role, content, intent, created_at

### analytics_events
- **Purpose**: Usage tracking
- **Primary Key**: id (UUID)
- **Columns**: id, event_type, heritage_entity_id (FK→heritage_entities), collection_id (FK→collections), search_query, language, metadata (JSONB), created_at

### users
- **Purpose**: User accounts
- **Primary Key**: id (UUID)
- **Columns**: id, name, email (UNIQUE), password_hash, created_at, updated_at
- **Referenced By**: user_favorites

### user_favorites
- **Purpose**: Per-user favorite heritage entities
- **Primary Key**: id (UUID)
- **Columns**: id, user_id (FK→users), heritage_entity_id (FK→heritage_entities), created_at
- **Constraints**: UNIQUE(user_id, heritage_entity_id)
- **Cardinality**: Many user_favorites → One user; Many user_favorites → One heritage

---

## DFD Data

### External Entities
| Entity | Description |
|--------|-------------|
| Visitor | Unauthenticated user browsing Astrova |
| Registered User | Authenticated user with account |
| Administrator | Admin with X-Admin-Token |

### Processes
| Process | Description |
|---------|-------------|
| Authentication | Register, login, logout, session management |
| Heritage Discovery | Browse, filter, view heritage entities |
| Search | Full-text search across heritage |
| Map Exploration | Interactive Leaflet map with markers |
| Heritage Details | Detailed heritage view with story, media, sources |
| Collections | Curated heritage groupings |
| Favorites | Per-user favorite management |
| Timeline | Historical periods visualization |
| Admin Management | Content CRUD via admin portal |
| AI/Chatbot | Multilingual chatbot (Under Construction) |
| Analytics | Usage event tracking |

### Data Stores
| Store | Description |
|-------|-------------|
| Neon PostgreSQL | Main database |
| OpenStreetMap | Map tile service |
| JWT Cookie | Session storage |

---

## Use Cases

### Actor: Visitor
| Use Case | Description | Preconditions | Main Flow |
|----------|-------------|---------------|-----------|
| Browse Heritage | View all heritage entities | None | Navigate → /heritage → Browse list → Click entity → View detail |
| Search Heritage | Find heritage by name/description | None | Click search → Type query → View results → Click result → View detail |
| Explore Map | Interactive map exploration | None | Navigate → /explore → View markers → Click marker → View popup → View detail |
| View Timeline | Historical periods | None | Navigate → /timeline → View periods → Click period → View heritage |
| View Collections | Curated collections | None | Navigate → /collections → Browse → Click collection → View items |
| Register | Create account | None | Navigate → /auth → Enter details → Submit → Redirect |
| Login | Authenticate | Account exists | Navigate → /auth → Enter credentials → Submit → Redirect |

### Actor: Registered User
| Use Case | Description | Preconditions | Main Flow |
|----------|-------------|---------------|-----------|
| Manage Favorites | Add heritage to favorites | Authenticated | Heritage detail → Click heart → Backend saves → UI updates |
| View Favorites | View personal favorites | Authenticated, has favorites | Navigate → /favorites → View list → Manage |
| Remove Favorites | Remove from favorites | Authenticated, has favorites | /favorites → Click remove → Backend deletes → UI updates |

### Actor: Administrator
| Use Case | Description | Preconditions | Main Flow |
|----------|-------------|---------------|-----------|
| View Dashboard | View statistics | Valid token | /admin → Enter token → Dashboard loads with 15 stats |
| Manage Heritage | Full CRUD | Valid token | Admin → Heritage → Create/Edit/Delete → Save → Verify |
| Manage Media | Add/replace/delete media | Valid token | Admin → Media → Add image/video → Save → Verify |
| Manage Locations | CRUD with coordinates | Valid token | Admin → Locations → Add/Edit → Validate coords → Save |
| Manage Sources | CRUD sources | Valid token | Admin → Sources → Create/Edit/Delete → Verify |
| Manage Users | View/delete users | Valid token | Admin → Users → View list → View detail → Delete |
| Manage Collections | CRUD + items | Valid token | Admin → Collections → Create/Edit/Add items → Verify |
| Manage Periods | CRUD periods | Valid token | Admin → Periods → Create/Edit/Delete → Verify |

---

## Classes/Modules

### Frontend
| Class/Module | Type | Key Attributes | Key Methods | Dependencies |
|-------------|------|---------------|-------------|-------------|
| AuthProvider | Context | user, loading | login, register, logout, refresh | API proxy |
| useFavorites | Hook | favorites, loaded, authenticated | isFavorited, toggleFavorite, addFavorite, removeFavorite | useAuth, API proxy |
| useApi<T> | Hook | data, loading, error | refetch | fetch |
| FavoriteButton | Component | heritageId, isFavorited, onToggle | handleClick | useAuth |
| SearchModal | Component | query, results, loading | handleSearch | API proxy |
| AstrovaMap | Component | locations, heritage, filters | handleStateChange | Leaflet, OSM |

### Backend
| Class/Module | Type | Key Attributes | Key Methods | Dependencies |
|-------------|------|---------------|-------------|-------------|
| ExpressApp | Application | — | use, listen | Express, middleware |
| AuthMiddleware | Middleware | JWT_SECRET | requireAuth, optionalAuth, generateToken | jsonwebtoken, bcrypt, pg |
| AdminMiddleware | Middleware | ADMIN_TOKEN | requireAdmin | crypto (timing-safe) |
| ApiKeyMiddleware | Middleware | DEMO_API_KEY | requireDevelopmentApiKey | — |
| RateLimitMiddleware | Middleware | store (Map) | rateLimit | — |
| HeritageRoutes | Routes | — | list, getById, stateCounts | pg |
| FavoritesRoutes | Routes | — | list, add, remove, sync, status | pg, requireAuth |
| AdminRoutes | Routes | — | overview, heritage CRUD, media CRUD, etc. | pg, requireAdmin |
| AuthRoutes | Routes | — | register, login, logout, me | pg, bcrypt, jwt |
| ChatbotService | Service | knowledge | detectIntent, retrieveKnowledge, generateResponse | pg |

---

## Activities

### Activity: User Browses Heritage
- **Actor**: Visitor
- **Input**: URL navigation
- **Decision**: Which heritage to view
- **Next Step**: Heritage detail page
- **Alternative**: Search/filter first
- **Output**: Heritage detail displayed

### Activity: User Favorites Heritage
- **Actor**: Registered User
- **Input**: Click heart icon
- **Decision**: Authenticated?
- **Next Step**: Backend saves favorite
- **Alternative**: Login required modal
- **Output**: Heart filled, favorite saved

### Activity: Admin Creates Heritage
- **Actor**: Administrator
- **Input**: Admin form submission
- **Decision**: Valid data?
- **Next Step**: Save to database
- **Alternative**: Show validation error
- **Output**: Heritage created, visible in public API

### Activity: User Registers
- **Actor**: Visitor
- **Input**: Registration form
- **Decision**: Email exists? Valid password?
- **Next Step**: Create user, generate JWT
- **Alternative**: Show error
- **Output**: User authenticated, redirected to favorites
