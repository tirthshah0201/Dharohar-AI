# Use Case Diagram — Astrova

## Mermaid Use Case Diagram

```mermaid
graph TB
    Visitor((Visitor))
    User((Registered User))
    Admin((Administrator))
    
    subgraph "Astrova System"
        UC1["Browse Heritage"]
        UC2["Search Heritage"]
        UC3["Explore Map"]
        UC4["View Heritage Details"]
        UC5["View Timeline"]
        UC6["View Collections"]
        UC7["View Collection Detail"]
        UC8["Register Account"]
        UC9["Login"]
        UC10["Logout"]
        UC11["Manage Favorites"]
        UC12["View Favorites"]
        UC13["Remove Favorites"]
        UC14["View About Page"]
        UC15["Manage Heritage (CRUD)"]
        UC16["Manage Media (CRUD)"]
        UC17["Manage Locations (CRUD)"]
        UC18["Manage Sources (CRUD)"]
        UC19["Manage Collections (CRUD)"]
        UC20["Manage Historical Periods (CRUD)"]
        UC21["View Admin Dashboard"]
        UC22["Manage Users"]
        UC23["Use AI Chatbot"]
    end
    
    Visitor --> UC1
    Visitor --> UC2
    Visitor --> UC3
    Visitor --> UC4
    Visitor --> UC5
    Visitor --> UC6
    Visitor --> UC7
    Visitor --> UC8
    Visitor --> UC9
    Visitor --> UC14
    
    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC10
    User --> UC11
    User --> UC12
    User --> UC13
    User --> UC23
    
    Admin --> UC9
    Admin --> UC15
    Admin --> UC16
    Admin --> UC17
    Admin --> UC18
    Admin --> UC19
    Admin --> UC20
    Admin --> UC21
    Admin --> UC22
    
    UC8 ..> UC9 : "extends"
    UC11 ..> UC9 : "requires"
```

## Actor Descriptions

| Actor | Description |
|-------|-------------|
| **Visitor** | Unauthenticated user browsing the public Astrova platform |
| **Registered User** | Authenticated user with an Astrova account who can manage favorites |
| **Administrator** | Authorized user with X-Admin-Token who can manage all content |

## Use Case Descriptions

### Visitor Use Cases

| Use Case | Description | Preconditions |
|----------|-------------|---------------|
| Browse Heritage | View the heritage listing page with all 74 entities | None |
| Search Heritage | Full-text search across heritage names and descriptions | None |
| Explore Map | Interactive Leaflet map with heritage markers and state filtering | None |
| View Heritage Details | Detailed view of a heritage entity with story, media, sources, location | None |
| View Timeline | Historical periods timeline with associated heritage | None |
| View Collections | Browse curated heritage collections | None |
| View Collection Detail | View specific collection with its heritage entities | None |
| Register Account | Create a new Astrova account | None |
| Login | Authenticate with existing credentials | Account exists |
| View About Page | Read about the Astrova project | None |

### Registered User Use Cases

| Use Case | Description | Preconditions |
|----------|-------------|---------------|
| Manage Favorites | Add heritage to personal favorites | Authenticated |
| View Favorites | View personal favorites list | Authenticated |
| Remove Favorites | Remove heritage from favorites | Authenticated, has favorites |
| Use AI Chatbot | Interact with the Astrova AI assistant | Authenticated (Under Construction) |
| Logout | End session | Authenticated |

### Administrator Use Cases

| Use Case | Description | Preconditions |
|----------|-------------|---------------|
| View Admin Dashboard | View 15 dynamic database statistics | Valid X-Admin-Token |
| Manage Heritage (CRUD) | Create, read, update, delete heritage entities | Valid X-Admin-Token |
| Manage Media (CRUD) | Add, edit, replace, delete media (Image/Video) | Valid X-Admin-Token |
| Manage Locations (CRUD) | Create, edit, delete locations with coordinates | Valid X-Admin-Token |
| Manage Sources (CRUD) | Create, edit, delete reference sources | Valid X-Admin-Token |
| Manage Collections (CRUD) | Create, edit, delete collections and items | Valid X-Admin-Token |
| Manage Historical Periods (CRUD) | Create, edit, delete historical periods | Valid X-Admin-Token |
| Manage Users | View users, view details, delete accounts | Valid X-Admin-Token |
