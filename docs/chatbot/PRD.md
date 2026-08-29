# Heritage Atlas — PRD

## 1. Overview

Heritage Atlas is an interactive digital platform for discovering India's cultural heritage through maps, stories, history, places, culture, and AI-powered exploration.

## 2. Design Direction

**"Contemporary Heritage"** — premium digital museum meets interactive atlas meets AI-powered exploration

## 3. Branding

- **Name:** Heritage Atlas
- **Tagline:** Explore India. Discover Its Stories.
- **Positioning:** India-wide interactive cultural heritage platform

## 4. Supported States

Gujarat, Rajasthan, Punjab, Goa, Tamil Nadu, Maharashtra, Madhya Pradesh, Delhi

## 5. Supported Languages

English, Gujarati, Hindi, Marathi, Tamil, Punjabi

## 6. Design System

### Colors
- ivory: #FAF7F2 (background)
- terracotta: #C2703E (primary)
- terracotta-dark: #A85A2E (primary-dark)
- terracotta-deep: #8B4513 (hero background)
- heritage-gold: #B8963E (secondary accent)
- charcoal: #2D2A26 (text)
- deep-brown: #1C1915 (footer)
- heritage-gold: #B8963E (highlight)

### Typography
- Display: Georgia serif
- Body: Geist sans

### Animation
- FadeIn, Stagger, CountUp motion components
- Spring physics for hover/tap
- prefers-reduced-motion support

## 7. Pages

| Page | Purpose |
|------|---------|
| Home | Hero, state cards, timeline, heritage, AI CTA |
| Explore | State cards, location search, type filters |
| Heritage | Category chips, grouped listing |
| Timeline | Historical periods with animation |
| AI | Chatbot with 6 languages |
| About | Mission, approach, technology |

## 8. State Architecture

Scalable `StateData` interface in `constants/india.ts` — add new states by extending the array.

## 9. Chatbot

- 6 languages supported
- Romanized Gujarati detection
- Context-aware suggestions
- Neon PostgreSQL knowledge base
- OpenStreetMap Nominatim geocoding

## 10. Accessibility

- Focus-visible outlines
- Keyboard navigation
- Reduced motion support
- Semantic HTML
- ARIA labels

## 11. Performance

- GPU-accelerated animations
- Lazy loading
- No layout reflow

## 12. Future

- MapLibre GL JS interactive map
- Heritage images/media
- Dark mode
- Additional Indian states
- RAG/semantic search
