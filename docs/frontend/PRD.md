# Dharohar AI — Frontend Architecture PRD

## 1. Overview

Dharohar AI is a cultural heritage discovery platform focused on Gujarat, India. The frontend provides a professional, responsive interface for exploring heritage sites, historical periods, and cultural entities powered by real data from a Neon PostgreSQL backend via Express.js APIs.

## 2. Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.3.2 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Fonts | Geist Sans, Geist Mono, Georgia (display) |

## 3. Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `ivory` | `#FAF7F2` | Page background |
| `parchment` | `#F5F0E8` | Section backgrounds |
| `indigo` | `#1E1B4B` | Primary dark, navigation, hero |
| `terracotta` | `#C2703E` | Primary accent, CTAs, active states |
| `heritage-gold` | `#B8963E` | Secondary accent, heritage highlights |
| `charcoal` | `#2D2A26` | Text color |
| `muted` | `#8A8279` | Secondary text |

### Typography

- **Display headings:** Georgia serif (`font-display`)
- **Body text:** Geist Sans (`font-sans`)
- **Mono:** Geist Mono (`font-mono`)

### Component Library

All components are in `components/ui/`:
- `Button` — primary/secondary/ghost/outline variants
- `Card` — with optional hover state
- `Badge` — default/secondary/accent/outline
- `Tabs` — client-side tab switching
- `SearchInput` — search with icon
- `Container` — max-width wrapper (narrow/default/wide)
- `SectionHeading` — title + subtitle
- `Breadcrumb` — navigation breadcrumb
- `LoadingState` — spinner + message
- `EmptyState` — icon + title + description
- `ErrorState` — error icon + retry button
- `Modal` — overlay dialog

## 4. Application Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Homepage with hero, locations, timeline, heritage, AI CTA |
| `/explore` | Static | Gujarat explorer with search, filters, location cards |
| `/explore/[id]` | Dynamic | Location detail with breadcrumbs, map placeholder, links |
| `/timeline` | Static | Historical periods with tabs, year ranges, entity counts |
| `/heritage` | Static | Heritage directory with category tabs, grouped listing |
| `/heritage/[id]` | Dynamic | Heritage detail with breadcrumbs, metadata, linked info |
| `/ai` | Static | AI chat placeholder (future phase) |
| `/about` | Static | Project description, problem, approach, tech |

## 5. API Integration

### API Client

`services/api.ts` provides a centralized `ApiClient` class:
- Routes all requests through `/api/proxy/*` (API key attached server-side)
- No `NEXT_PUBLIC_DEMO_API_KEY` needed (removed for security)
- Handles 401, 400, 404, 500 errors with structured error messages
- Supports GET, POST, PUT, DELETE methods

### Data Fetching Hook

`hooks/useApi.ts` provides `useApi<T>(endpoint)`:
- Returns `{ data, loading, error, refetch }`
- Supports `immediate` option for conditional fetching
- Handles endpoint changes and refetching

### API Endpoints Consumed

| Endpoint | Used By | Returns |
|----------|---------|---------|
| `GET /locations?type=` | Homepage, Explore | Location[] with districts filtered |
| `GET /locations/:id` | Location Detail | Single Location |
| `GET /heritage?category=` | Homepage, Heritage | HeritageEntity[] |
| `GET /heritage/:id` | Heritage Detail | Single HeritageEntity |
| `GET /timeline` | Homepage, Timeline | TimelinePeriod[] with entity counts |
| `GET /search?q=` | Explore | SearchResult[] with relevance ranking |
| `GET /system/connectivity` | (Dev) | Connectivity status |

## 6. Data States

Every API-driven page implements four states:

1. **Loading:** `<LoadingState message="..." />`
2. **Success:** Rendered content
3. **Empty:** `<EmptyState title="..." description="..." />`
4. **Error:** `<ErrorState title="..." message="..." onRetry={refetch} />`

## 7. Responsive Design

| Breakpoint | Behavior |
|-----------|----------|
| Mobile (< 640px) | Single column, hamburger nav, stacked cards |
| Tablet (640-1024px) | 2-column grids, expanded tabs |
| Desktop (> 1024px) | 3-4 column grids, full navigation |

## 8. Accessibility

- Semantic HTML (nav, main, section, article, footer)
- ARIA labels on interactive elements
- Focus-visible outlines (terracotta accent)
- Keyboard navigable
- Image alt text
- Proper heading hierarchy (h1 > h2 > h3)
- Form labels on inputs

## 9. Current Implementation Status

### Completed
- ✅ Design system (colors, typography, components)
- ✅ Homepage with real API data (locations, timeline, heritage)
- ✅ Explore page with search, type filtering, real data
- ✅ Heritage page with category tabs, grouped display
- ✅ Timeline page with period tabs, year formatting
- ✅ Heritage detail page with breadcrumbs, metadata
- ✅ Location detail page with breadcrumbs, map, links
- ✅ Loading, empty, error states on all pages
- ✅ Responsive navigation (desktop + mobile)
- ✅ API client with auth header
- ✅ Shared useApi hook
- ✅ Production build passes
- ✅ TypeScript passes
- ✅ Lint passes

### Not Implemented (Future Phases)
- Interactive map (MapLibre/Leaflet)
- AI/RAG chat interface
- Knowledge graph visualization
- Search command palette (⌘K)
- Recommendations
- Admin CMS
- Additional database tables

## 10. File Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Homepage (real API data)
│   ├── globals.css         # Design system
│   ├── explore/
│   │   ├── page.tsx        # Explore with search + filters
│   │   └── [id]/page.tsx   # Location detail
│   ├── heritage/
│   │   ├── page.tsx        # Heritage directory
│   │   └── [id]/page.tsx   # Heritage detail
│   ├── timeline/
│   │   └── page.tsx        # Historical timeline
│   ├── ai/
│   │   └── page.tsx        # AI placeholder
│   └── about/
│       └── page.tsx        # About page
├── components/
│   ├── ui/                 # Reusable UI components
│   └── layout/             # Navbar, Footer
├── hooks/
│   └── useApi.ts           # Data fetching hook
├── services/
│   └── api.ts              # API client
├── constants/
│   └── index.ts            # App constants
└── types/
    └── index.ts            # TypeScript types
```
