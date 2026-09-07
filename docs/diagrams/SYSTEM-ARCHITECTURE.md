# System Architecture — Astrova

## Mermaid Architecture Diagram

```mermaid
graph TB
    User((User))
    
    subgraph "Client Layer"
        Browser[Browser]
        NextApp[Next.js Frontend<br/>App Router + React]
    end
    
    subgraph "API Gateway"
        Proxy[Next.js API Proxy<br/>/api/proxy/*]
    end
    
    subgraph "Server Layer"
        Express[Express Backend<br/>/api/*]
        
        subgraph "Middleware"
            CORS[CORS]
            CookieP[Cookie Parser]
            JSONP[JSON Parser]
            RateLimit[Rate Limiting]
            ApiKey[X-API-Key]
            AuthMW[JWT Auth]
            AdminMW[Admin Auth]
        end
        
        subgraph "Routes"
            HeritageR[Heritage Routes]
            SearchR[Search Routes]
            LocationR[Location Routes]
            MediaR[Media Routes]
            SourceR[Source Routes]
            PeriodR[Period Routes]
            TimelineR[Timeline Routes]
            CollectionR[Collection Routes]
            AuthR[Auth Routes]
            FavoritesR[Favorites Routes]
            AdminR[Admin Routes]
            AI_R[AI Routes]
            HealthR[Health Routes]
        end
        
        subgraph "Services"
            ChatbotSvc[Chatbot Service]
        end
    end
    
    subgraph "Data Layer"
        DB[(Neon PostgreSQL)]
    end
    
    subgraph "External Services"
        OSM[OpenStreetMap Tiles]
        Leaflet[Leaflet.js]
    end
    
    User --> Browser
    Browser --> NextApp
    NextApp --> Proxy
    Proxy --> Express
    Express --> CORS --> CookieP --> JSONP --> RateLimit
    
    RateLimit --> ApiKey
    RateLimit --> AuthMW
    RateLimit --> AdminMW
    
    ApiKey --> HeritageR
    ApiKey --> SearchR
    ApiKey --> LocationR
    ApiKey --> MediaR
    ApiKey --> SourceR
    ApiKey --> PeriodR
    ApiKey --> TimelineR
    ApiKey --> CollectionR
    AuthMW --> FavoritesR
    AuthMW --> AuthR
    AdminMW --> AdminR
    RateLimit --> AI_R
    
    HeritageR --> DB
    SearchR --> DB
    LocationR --> DB
    MediaR --> DB
    SourceR --> DB
    PeriodR --> DB
    TimelineR --> DB
    CollectionR --> DB
    AuthR --> DB
    FavoritesR --> DB
    AdminR --> DB
    AI_R --> ChatbotSvc
    ChatbotSvc --> DB
    
    NextApp --> Leaflet
    Leaflet --> OSM
```

## Layer Responsibilities

### Client Layer
| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| Browser | Chrome/Firefox/Safari | Render HTML, execute JS, handle user input |
| Next.js Frontend | Next.js 16 + React 19 | Server-side rendering, client-side navigation, state management |

### API Gateway
| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| API Proxy | Next.js Route Handler | Attach X-API-Key server-side (never exposed to browser), forward cookies/admin tokens, route to Express |

### Server Layer
| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| Express Backend | Express 4 | HTTP server, request routing, business logic |
| Middleware | Various | Security, authentication, rate limiting, parsing |
| Routes | Express Router | Endpoint handlers for each domain |
| Services | TypeScript | Business logic (chatbot) |

### Data Layer
| Component | Technology | Responsibility |
|-----------|-----------|----------------|
| Neon PostgreSQL | Serverless PostgreSQL | Persistent data storage for all entities |

### External Services
| Service | Technology | Responsibility | Status |
|---------|-----------|----------------|--------|
| Map Tiles | OpenStreetMap | Map tile rendering | Active |
| Map Rendering | Leaflet.js | Interactive map with markers | Active |
| AI Chatbot | Custom service | Multilingual chatbot | Under Construction |

## Security Architecture

```mermaid
graph LR
    Request[Incoming Request] --> CORS{CORS}
    CORS -->|Allowed| RateLimit{Rate Limit}
    CORS -->|Blocked| Reject1[403 Rejected]
    
    RateLimit -->|Within Limit| RouteType{Route Type}
    RateLimit -->|Exceeded| Reject2[429 Rate Limited]
    
    RouteType -->|Public| ApiKey{X-API-Key}
    RouteType -->|Auth Required| AuthCheck{JWT Cookie}
    RouteType -->|Admin Required| AdminCheck{X-Admin-Token}
    RouteType -->|Health| HealthRoute[Health Response]
    
    ApiKey -->|Valid| PublicRoute[Public Route]
    ApiKey -->|Invalid| Reject3[401 Unauthorized]
    
    AuthCheck -->|Valid JWT| AuthRoute[Authenticated Route]
    AuthCheck -->|Invalid/Missing| Reject4[401 Unauthorized]
    
    AdminCheck -->|Valid Token| AdminRoute[Admin Route]
    AdminCheck -->|Wrong Token| Reject5[403 Forbidden]
    AdminCheck -->|Not Configured| Reject6[503 Not Configured]
```

## Key Design Decisions

1. **API Key Server-Side Only**: The `DEMO_API_KEY` is never exposed to the browser. The Next.js proxy attaches it server-side.

2. **JWT in HttpOnly Cookie**: Authentication tokens are stored in HttpOnly cookies, preventing XSS access. `SameSite: lax` prevents CSRF for most cases.

3. **Backend-Derived User Identity**: All authenticated operations (favorites, etc.) derive user ID from the JWT token, never from client-supplied data.

4. **In-Memory Rate Limiting**: Rate limits are stored in server memory (resets on restart). Acceptable for single-server deployment.

5. **URL-Based Media**: Heritage media (images/videos) are stored as URLs in the database, not as binary files. No cloud storage integration.

6. **Serverless Database**: Neon PostgreSQL provides serverless PostgreSQL with automatic scaling.
