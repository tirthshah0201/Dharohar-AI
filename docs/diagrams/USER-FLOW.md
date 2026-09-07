# User Flow — Astrova

## 1. Visitor Journey (Unauthenticated)

```mermaid
flowchart LR
    A[Open Astrova] --> B[Homepage]
    B --> C[Discover States]
    B --> D[Featured Heritage]
    B --> E[Explore Map]
    B --> F[Collections]
    B --> G[Timeline]
    B --> H[Search]
    
    C --> I[State Detail]
    D --> J[Heritage Detail]
    E --> K[Map View]
    F --> L[Collection Detail]
    G --> M[Period Detail]
    H --> N[Search Results]
    
    I --> J
    K --> J
    L --> J
    M --> J
    N --> J
    
    J --> O[View Story]
    J --> P[View Location]
    J --> Q[View Media]
    J --> R[View Sources]
    J --> S[Related Heritage]
    
    O --> T[Add to Favorites?]
    T -->|Click Heart| U[Login Required Modal]
    U --> V[Login / Register]
```

**Description**: Visitors can freely browse all public content — heritage listings, map, timeline, collections, search. When they try to favorite, they're prompted to authenticate.

## 2. Registration Journey

```mermaid
flowchart LR
    A[Click Create Account] --> B[/auth Page]
    B --> C[Enter Name]
    C --> D[Enter Email]
    D --> E[Enter Password]
    E --> F[Click Create Account]
    F --> G{Validation Pass?}
    G -->|No| H[Show Error]
    H --> B
    G -->|Yes| I[POST /api/auth/register]
    I --> J{Email Exists?}
    J -->|Yes| K[Show Duplicate Error]
    K --> B
    J -->|No| L[Hash Password]
    L --> M[Create User]
    M --> N[Generate JWT]
    N --> O[Set HttpOnly Cookie]
    O --> P[Sync localStorage]
    P --> Q[Redirect to /favorites]
```

## 3. Login Journey

```mermaid
flowchart LR
    A[Click Sign In] --> B[/auth Page]
    B --> C[Enter Email]
    C --> D[Enter Password]
    D --> E[Click Sign In]
    E --> F{Validation Pass?}
    F -->|No| G[Show Error]
    G --> B
    F -->|Yes| H[POST /api/auth/login]
    H --> I{Valid Credentials?}
    I -->|No| J[Show Invalid Credentials]
    J --> B
    I -->|Yes| K[Generate JWT]
    K --> L[Set HttpOnly Cookie]
    L --> M[Update Auth State]
    M --> N[Sync localStorage Favorites]
    N --> O[Redirect to /favorites]
```

## 4. Favorite Journey

```mermaid
flowchart LR
    A[Heritage Detail Page] --> B[Click Heart Icon]
    B --> C{Authenticated?}
    C -->|No| D[Login Required Modal]
    D --> E[Click Sign In]
    E --> F[/auth Page]
    F --> G[Login]
    G --> H[Return to Heritage]
    H --> B
    
    C -->|Yes| I[toggleFavorite]
    I --> J[Optimistic UI Update]
    J --> K[POST /api/favorites/:id]
    K --> L{Backend Success?}
    L -->|No| M[Revert UI]
    L -->|Yes| N[Heart Filled]
    
    N --> O[Visit /favorites]
    O --> P[See Favorite in List]
    P --> Q[Click Remove?]
    Q -->|Yes| R[DELETE /api/favorites/:id]
    R --> S[Heart Unfilled]
```

## 5. Heritage Discovery Journey

```mermaid
flowchart LR
    A[Homepage] --> B[Click State]
    B --> C[Explore Page with State Filter]
    C --> D[Map Shows State Heritage]
    D --> E[Click Heritage Marker]
    E --> F[Heritage Detail]
    
    A --> G[Click Category]
    G --> H[Heritage Listing with Category Filter]
    H --> I[Browse Heritage Cards]
    I --> J[Click Heritage Card]
    J --> F
    
    A --> K[Search]
    K --> L[Type Query]
    L --> M[Search Results]
    M --> N[Click Result]
    N --> F
```

## 6. Search Journey

```mermaid
flowchart LR
    A[Click Search Icon] --> B[Search Modal Opens]
    B --> C[Type Query]
    C --> D[Debounced Search]
    D --> E[API /api/search?q=]
    E --> F[Results Appear]
    F --> G[Click Result]
    G --> H[Navigate to Heritage]
    
    B --> I[View Suggestions]
    I --> J[Click Suggestion]
    J --> H
    
    F --> K[No Results]
    K --> L[Try Different Query]
```

## 7. Map Journey

```mermaid
flowchart LR
    A[Explore Page] --> B[Map Loads]
    B --> C[Heritage Markers Appear]
    C --> D[Click Marker]
    D --> E[Popup Shows]
    E --> F[Click View Detail]
    F --> G[Heritage Detail]
    
    B --> H[Select State Filter]
    H --> I[Map Flies to State]
    I --> J[Only State Heritage Shows]
    
    B --> K[Select Category Filter]
    K --> L[Filtered Markers]
```

## 8. Collection Journey

```mermaid
flowchart LR
    A[Homepage] --> B[Click Collection]
    B --> C[Collections Page]
    C --> D[Click Collection Card]
    D --> E[Collection Detail]
    E --> F[View Heritage Items]
    F --> G[Click Heritage Item]
    G --> H[Heritage Detail]
    
    E --> I[View Related Collections]
    I --> J[Click Related Collection]
    J --> E
```

## 9. Timeline Journey

```mermaid
flowchart LR
    A[Timeline Page] --> B[View Periods]
    B --> C[Click Period]
    C --> D[Period Details]
    D --> E[Heritage in Period]
    E --> F[Click Heritage]
    F --> G[Heritage Detail]
    
    B --> H[Search Periods]
    H --> I[Filter Results]
    I --> C
```

## 10. Admin Journey

```mermaid
flowchart LR
    A[Visit /admin] --> B[Enter Token]
    B --> C{Valid Token?}
    C -->|No| D[Error: Invalid Token]
    C -->|Yes| E[Admin Dashboard]
    
    E --> F[View Stats]
    E --> G[Manage Heritage]
    E --> H[Manage Media]
    E --> I[Manage Locations]
    E --> J[Manage Sources]
    E --> K[Manage Users]
    E --> L[Manage Collections]
    E --> M[Manage Periods]
    
    G --> N[Create / Edit / Delete]
    N --> O[Save to Database]
    O --> P[Verify in Public API]
    
    H --> Q[Add Image / Video]
    Q --> O
    
    I --> R[Add / Edit Location]
    R --> S[Validate Coordinates]
    S --> O
    
    M --> T[Create / Edit Period]
    T --> O
```
