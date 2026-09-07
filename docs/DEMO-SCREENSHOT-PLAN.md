# ASTROVA — Demo Screenshot Plan
## Application Screens for Final Report & Presentation

**Purpose:** Identify every application screen that should be captured for the project report and presentation.  
**Date:** September 2026

---

## Required Screenshots

### 1. Homepage

| Field | Value |
|-------|-------|
| **Screen** | Homepage |
| **Route** | `/` |
| **Purpose** | Show the main landing page with heritage imagery and navigation |
| **What should be visible** | Hero section, featured heritage, navigation bar, search bar, state highlights |
| **Why it is important** | First impression; shows the platform's visual identity and core navigation |

### 2. Explore / Heritage Listing

| Field | Value |
|-------|-------|
| **Screen** | Heritage Listing |
| **Route** | `/heritage` |
| **Purpose** | Show browsable heritage entities with filters |
| **What should be visible** | Heritage cards, category filter, state filter, pagination, FavoriteButton |
| **Why it is important** | Core discovery module; shows data richness and filtering |

### 3. Heritage Detail Page

| Field | Value |
|-------|-------|
| **Screen** | Heritage Detail |
| **Route** | `/heritage/[id]` |
| **Purpose** | Show complete heritage entity information |
| **What should be visible** | Name, description, category, historical period, location, media gallery (image/video), sources, related heritage, favorite button |
| **Why it is important** | Most detailed view; demonstrates data depth and media handling |

### 4. Interactive Map

| Field | Value |
|-------|-------|
| **Screen** | Map Exploration |
| **Route** | `/map` |
| **Purpose** | Show Leaflet.js map with heritage markers |
| **What should be visible** | OpenStreetMap tiles, 54+ location markers, popups with heritage names, zoom controls |
| **Why it is important** | Geographic exploration feature; shows real coordinate data |

### 5. Search Results

| Field | Value |
|-------|-------|
| **Screen** | Search |
| **Route** | `/search` |
| **Purpose** | Show full-text search capabilities |
| **What should be visible** | Search input, real-time suggestions, filtered results, heritage cards |
| **Why it is important** | Shows intelligent discovery and search performance |

### 6. Timeline

| Field | Value |
|-------|-------|
| **Screen** | Timeline |
| **Route** | `/timeline` |
| **Purpose** | Show chronological heritage exploration |
| **What should be visible** | 9 historical periods, heritage counts per period, BCE/CE markers, heritage items |
| **Why it is important** | Shows temporal heritage organization |

### 7. Collections

| Field | Value |
|-------|-------|
| **Screen** | Collections Listing |
| **Route** | `/collections` |
| **Purpose** | Show curated heritage groupings |
| **What should be visible** | 6 collections, entity counts, collection descriptions |
| **Why it is important** | Shows curation capabilities |

### 8. Collection Detail

| Field | Value |
|-------|-------|
| **Screen** | Collection Detail |
| **Route** | `/collections/[slug]` |
| **Purpose** | Show individual collection with heritage items |
| **What should be visible** | Collection name, description, heritage items list, entity counts |
| **Why it is important** | Shows collection-heritage relationships |

### 9. Authentication — Login

| Field | Value |
|-------|-------|
| **Screen** | Login Page |
| **Route** | `/auth` (Login tab) |
| **Purpose** | Show login form |
| **What should be visible** | Email input, password input, Login button, Create Account link |
| **Why it is important** | Shows authentication UI |

### 10. Authentication — Register

| Field | Value |
|-------|-------|
| **Screen** | Registration Page |
| **Route** | `/auth` (Register tab) |
| **Purpose** | Show registration form |
| **What should be visible** | Name, email, password inputs, Register button, Login link |
| **Why it is important** | Shows user registration flow |

### 11. Favorites (Authenticated)

| Field | Value |
|-------|-------|
| **Screen** | Favorites Page |
| **Route** | `/favorites` |
| **Purpose** | Show personalized favorites |
| **What should be visible** | User's favorited heritage items, remove buttons, empty state if no favorites |
| **Why it is important** | Shows per-user data isolation and personalization |

### 12. Favorites — Login Required

| Field | Value |
|-------|-------|
| **Screen** | Favorites (Unauthenticated) |
| **Route** | `/favorites` |
| **Purpose** | Show login-required state |
| **What should be visible** | "Please sign in" message, login/create account buttons |
| **Why it is important** | Shows authentication gate for protected features |

### 13. Admin — Login

| Field | Value |
|-------|-------|
| **Screen** | Admin Login |
| **Route** | `/admin` |
| **Purpose** | Show admin token authentication |
| **What should be visible** | Admin token input, Access Dashboard button |
| **Why it is important** | Shows admin security mechanism |

### 14. Admin — Dashboard Overview

| Field | Value |
|-------|-------|
| **Screen** | Admin Dashboard |
| **Route** | `/admin` (Overview tab) |
| **Purpose** | Show dynamic dashboard statistics |
| **What should be visible** | 9+ stat cards with real counts: heritage, media, locations, sources, collections, users, etc. |
| **Why it is important** | Shows dynamic database-connected statistics |

### 15. Admin — Heritage Management

| Field | Value |
|-------|-------|
| **Screen** | Admin Heritage Tab |
| **Route** | `/admin` (Heritage tab) |
| **Purpose** | Show heritage CRUD interface |
| **What should be visible** | Heritage list, search, category/state filters, Add button, edit/delete controls |
| **Why it is important** | Shows content management capabilities |

### 16. Admin — Media Management

| Field | Value |
|-------|-------|
| **Screen** | Admin Media Tab |
| **Route** | `/admin` (Media tab) |
| **Purpose** | Show media CRUD interface |
| **What should be visible** | Media list, image/video types, add/edit/delete controls |
| **Why it is important** | Shows media management (Image/Video only) |

### 17. Admin — Location Management

| Field | Value |
|-------|-------|
| **Screen** | Admin Locations Tab |
| **Route** | `/admin` (Locations tab) |
| **Purpose** | Show location management with coordinates |
| **What should be visible** | Location list, latitude/longitude display, state/type filters, add/edit |
| **Why it is important** | Shows geographic data management |

### 18. About Page

| Field | Value |
|-------|-------|
| **Screen** | About Page |
| **Route** | `/about` |
| **Purpose** | Show project information |
| **What should be visible** | Project description, technology stack, team information |
| **Why it is important** | Shows project context |

### 19. AI Page (Under Construction)

| Field | Value |
|-------|-------|
| **Screen** | AI Chatbot Page |
| **Route** | `/ai` |
| **Purpose** | Show under-construction status |
| **What should be visible** | "ASTROVA AI — UNDER CONSTRUCTION" message |
| **Why it is important** | Documents current chatbot status honestly |

### 20. Mobile Responsive View

| Field | Value |
|-------|-------|
| **Screen** | Mobile Homepage |
| **Route** | `/` (mobile viewport) |
| **Purpose** | Show responsive design |
| **What should be visible** | Mobile navigation, responsive layout, touch-friendly buttons |
| **Why it is important** | Demonstrates responsive design capability |

---

## Screenshot Specifications

| Specification | Value |
|---------------|-------|
| **Format** | PNG |
| **Resolution** | 1920×1080 (desktop), 375×812 (mobile) |
| **Browser** | Chrome (latest) |
| **State** | Both authenticated and unauthenticated where applicable |
| **Annotations** | Add arrows/labels for key features in report |

## Capture Order

1. Homepage (desktop + mobile)
2. Heritage listing
3. Heritage detail (with image + video media)
4. Map with markers
5. Search results
6. Timeline
7. Collections listing + detail
8. Login page
9. Register page
10. Favorites (unauthenticated)
11. Login → Favorites (authenticated)
12. Admin login
13. Admin dashboard
14. Admin heritage management
15. Admin media management
16. Admin location management
17. About page
18. AI page (under construction)

**Total screenshots:** ~20  
**Estimated capture time:** 30–45 minutes
