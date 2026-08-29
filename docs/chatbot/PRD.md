# Dharohar AI — Chatbot PRD

## 1. Overview

Dharohar AI is a cultural heritage platform with an AI-powered chatbot supporting 8 Indian states and 6 languages. The frontend provides a premium "Contemporary Heritage" visual experience with Motion animations, responsive design, and accessibility support.

## 2. Design Direction

**"Contemporary Heritage"** — combining warm cultural visual language with modern typography, clean cards, subtle heritage-inspired patterns, refined Motion transitions, and premium spacing.

## 3. Supported States

Gujarat, Rajasthan, Punjab, Goa, Tamil Nadu, Maharashtra, Madhya Pradesh, Delhi

## 4. Supported Languages

English, Gujarati, Hindi, Marathi, Tamil, Punjabi

## 5. Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| ivory | #FAF7F2 | Page background |
| parchment | #F5F0E8 | Section backgrounds |
| cream | #EDE8DE | Hover states |
| indigo | #1E1B4B | Primary, hero |
| charcoal | #2D2A26 | Body text |
| terracotta | #C2703E | CTA, accents |
| heritage-gold | #B8963E | Accent, highlights |

### Animation Tokens

| Token | Value |
|-------|-------|
| --duration-fast | 150ms |
| --duration-normal | 250ms |
| --duration-slow | 400ms |
| --stagger | 80ms |
| --ease-spring | cubic-bezier(0.34, 1.56, 0.64, 1) |

### Typography

- **Display:** Georgia, "Times New Roman", serif
- **Body:** Geist (system font)
- **Mono:** Geist Mono

## 6. Animation System

### Motion Components

| Component | Purpose |
|-----------|---------|
| FadeIn | Scroll-triggered fade + direction |
| Stagger | Staggered children container |
| StaggerItem | Individual stagger child |
| HoverCard | Card with hover elevation |
| RevealText | Word-by-word text reveal |
| Typewriter | Clip-path text reveal |

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce`.

## 7. UI Components

### Card

- Motion hover: y: -3, boxShadow elevation
- Motion tap: scale: 0.985
- Spring physics: stiffness: 400, damping: 25

### Button

- Motion hover: scale: 1.02
- Motion tap: scale: 0.97
- Spring physics: stiffness: 400, damping: 20

### Chatbot

- Message entrance: Spring animation
- Typing indicator: 3 bouncing dots
- Language selector: AnimatePresence dropdown
- Suggestions: Scale on hover/tap
- Context-aware recommendations from API

### Loading States

- Spinner: 3-dot typing animation
- Skeleton: Shimmer gradient effect

### Error States

- AlertTriangle icon
- Title + description
- Optional retry button

### Empty States

- Inbox icon
- Title + description + action

## 8. Responsive Design

| Viewport | Layout |
|----------|--------|
| 375px | Mobile: stacked cards, collapsed nav |
| 768px | Tablet: 2-column grids |
| 1024px | Desktop: full layout |
| 1440px | Wide: max-width container |

## 9. Accessibility

- Focus-visible outlines (terracotta)
- prefers-reduced-motion support
- Keyboard navigation
- ARIA labels
- Semantic HTML
- Sufficient color contrast

## 10. API Endpoints

| Endpoint | Method | Auth |
|----------|--------|------|
| /api/ai/chat | POST | API Key |
| /api/ai/welcome | GET | API Key |
| /api/ai/suggestions | GET | API Key |
| /api/ai/languages | GET | API Key |

## 11. Chatbot Features

- Romanized Gujarati detection and response
- Context-aware suggested questions
- Language selector (6 languages)
- State detection (8 states, multi-script)
- Knowledge retrieval from Neon PostgreSQL
- Geocoding via OpenStreetMap Nominatim
- Conversation logging

## 12. Security

- API key authentication
- Server-side external API calls
- No secrets in frontend
- Parameterized SQL queries
- Input validation
- Error message sanitization

## 13. Performance

- GPU-accelerated animations (transform, opacity only)
- viewport: { once: true } prevents re-triggering
- Stagger delays under 100ms
- No layout reflow animations

## 14. Future Enhancements

- Multilingual typography (Noto Sans Gujarati/Hindi/Tamil/Punjabi)
- MapLibre GL JS interactive map
- Heritage images/media
- Search command palette (Cmd+K)
- Dark mode
- Page transitions
- Virtual scrolling
- RAG/semantic search
- Knowledge graph visualization
