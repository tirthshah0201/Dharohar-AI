# Data Flow Diagrams — Astrova

## DFD Level 0 — Context Diagram

```mermaid
graph TD
    Visitor["External Entity:<br/>Visitor / User"]
    Admin["External Entity:<br/>Administrator"]
    Astrova["Process 0:<br/>Astrova Platform"]
    DB[("Data Store:<br/>Neon PostgreSQL")]
    
    Visitor -->|"Browse, Search, Login, Favorite"| Astrova
    Astrova -->|"Heritage data, UI, Search results"| Visitor
    
    Admin -->|"Manage Heritage, Media, Locations,<br/>Sources, Users, Collections, Periods"| Astrova
    Astrova -->|"Admin dashboard, CRUD responses"| Admin
    
    Astrova <-->|"Read/Write all data"| DB
```

**Explanation**: The context diagram shows Astrova as a single process interacting with two external entities (Visitors and Administrators) and one data store (Neon PostgreSQL). Visitors browse heritage, search, authenticate, and manage favorites. Administrators manage all content through the Admin Portal.

---

## DFD Level 1 — Major Processes

```mermaid
graph TD
    Visitor["External Entity:<br/>Visitor"]
    Admin["External Entity:<br/>Administrator"]
    
    P1["Process 1:<br/>Authentication"]
    P2["Process 2:<br/>Heritage Discovery"]
    P3["Process 3:<br/>Search & Filtering"]
    P4["Process 4:<br/>Favorites Management"]
    P5["Process 5:<br/>Collections & Timeline"]
    P6["Process 6:<br/>Admin Management"]
    P7["Process 7:<br/>AI/Chatbot"]
    
    DB[("Data Store:<br/>Neon PostgreSQL")]
    
    Visitor -->|"Register, Login"| P1
    P1 -->|"Auth token, Session"| Visitor
    
    Visitor -->|"Browse, Explore, View Detail"| P2
    P2 -->|"Heritage data, Media, Sources"| Visitor
    
    Visitor -->|"Search queries"| P3
    P3 -->|"Search results, Suggestions"| Visitor
    
    Visitor -->|"Add/Remove Favorites"| P4
    P4 -->|"Favorite status, Favorites list"| Visitor
    
    Visitor -->|"Browse Collections, Timeline"| P5
    P5 -->|"Collection data, Period data"| Visitor
    
    Visitor -->|"Chat queries"| P7
    P7 -->|"Chat responses"| Visitor
    
    Admin -->|"CRUD Operations"| P6
    P6 -->|"Admin dashboard, Management UI"| Admin
    
    P1 <-->|"User data"| DB
    P2 <-->|"Heritage, Media, Sources"| DB
    P3 <-->|"Search queries, Results"| DB
    P4 <-->|"User favorites"| DB
    P5 <-->|"Collections, Periods"| DB
    P6 <-->|"All tables"| DB
    P7 <-->|"Chatbot knowledge"| DB
```

**Explanation**: Level 1 breaks Astrova into 7 major processes. Each process interacts with the database and serves specific user needs.

---

## DFD Level 2 — Heritage Discovery (Detailed)

```mermaid
graph TD
    User["External Entity:<br/>User"]
    
    subgraph "Frontend Layer"
        UI["Heritage UI Components"]
        Proxy["Next.js API Proxy"]
    end
    
    subgraph "Backend Layer"
        AuthMW["API Key Middleware"]
        HeritageR["Heritage Routes"]
        SearchR["Search Routes"]
        LocationR["Location Routes"]
        MediaR["Media Routes"]
    end
    
    subgraph "Database"
        DB_HER[("heritage_entities")]
        DB_LOC[("locations")]
        DB_PER[("historical_periods")]
        DB_MED[("media")]
        DB_SRC[("sources")]
        DB_REL[("relationships")]
    end
    
    User -->|"Browse heritage"| UI
    User -->|"Search heritage"| UI
    User -->|"Filter by state/category/period"| UI
    User -->|"Click heritage card"| UI
    
    UI -->|"API request"| Proxy
    Proxy -->|"Attach X-API-Key"| AuthMW
    AuthMW -->|"Authenticated request"| HeritageR
    AuthMW -->|"Authenticated request"| SearchR
    AuthMW -->|"Authenticated request"| LocationR
    
    HeritageR -->|"Query heritage"| DB_HER
    HeritageR -->|"Join location"| DB_LOC
    HeritageR -->|"Join period"| DB_PER
    HeritageR -->|"Join source"| DB_SRC
    HeritageR -->|"Query media"| DB_MED
    HeritageR -->|"Query relationships"| DB_REL
    
    SearchR -->|"Full-text search"| DB_HER
    LocationR -->|"Query locations"| DB_LOC
    
    HeritageR -->|"Heritage data + relations"| Proxy
    SearchR -->|"Search results"| Proxy
    LocationR -->|"Location data"| Proxy
    
    Proxy -->|"JSON response"| UI
    UI -->|"Render heritage cards, detail, map markers"| User
```

**Explanation**: Level 2 shows the detailed data flow for heritage discovery. The user interacts with the frontend, which proxies requests through the Next.js API layer. The backend validates the API key, queries the database with appropriate JOINs, and returns structured JSON data that the frontend renders.

---

## DFD Level 2 — Authentication & Favorites (Detailed)

```mermaid
graph TD
    User["External Entity:<br/>User"]
    
    subgraph "Frontend"
        AuthUI["Auth Page"]
        FavBtn["Favorite Button"]
        FavPage["Favorites Page"]
        Proxy["API Proxy"]
    end
    
    subgraph "Backend"
        AuthR["Auth Routes"]
        FavR["Favorites Routes"]
        AuthMW["requireAuth"]
    end
    
    subgraph "Database"
        DB_USERS[("users")]
        DB_FAV[("user_favorites")]
        DB_HER[("heritage_entities")]
    end
    
    User -->|"Register/Login"| AuthUI
    AuthUI -->|"POST /api/proxy/auth/register"| Proxy
    AuthUI -->|"POST /api/proxy/auth/login"| Proxy
    
    Proxy -->|"Forward cookie"| AuthR
    AuthR -->|"bcrypt hash"| DB_USERS
    AuthR -->|"JWT sign"| AuthR
    AuthR -->|"Set HttpOnly cookie"| Proxy
    Proxy -->|"Set-Cookie"| AuthUI
    AuthUI -->|"User state updated"| User
    
    User -->|"Click Favorite"| FavBtn
    FavBtn -->|"Check auth state"| AuthMW
    AuthMW -->|"req.user.id from JWT"| FavR
    
    FavR -->|"INSERT user_favorites"| DB_FAV
    FavR -->|"WHERE user_id = auth user"| DB_FAV
    
    User -->|"View Favorites"| FavPage
    FavPage -->|"GET /api/proxy/favorites"| Proxy
    Proxy -->|"Cookie"| AuthMW
    AuthMW -->|"User ID"| FavR
    FavR -->|"SELECT WHERE user_id = $1"| DB_FAV
    FavR -->|"JOIN heritage_entities"| DB_HER
    FavR -->|"User's favorites only"| Proxy
    Proxy -->|"JSON"| FavPage
    FavPage -->|"Render favorites"| User
```

**Explanation**: Level 2 for Authentication & Favorites shows the complete flow from registration through favorite management. Key security points: (1) Passwords are hashed with bcrypt, (2) JWT is stored in HttpOnly cookie, (3) Favorites are always scoped to the authenticated user via `requireAuth` middleware, (4) The backend derives user identity from JWT, never from client-supplied data.
