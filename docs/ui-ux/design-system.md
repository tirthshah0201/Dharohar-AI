# Design System — Dharohar AI

## Design Philosophy

**Museum + Digital Archive + Modern AI Platform**

The interface must communicate seriousness and cultural depth while remaining modern and accessible.

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#FAF7F2` | Page background |
| Parchment | `#F5F0E8` | Section backgrounds, cards |
| Cream | `#EDE8DE` | Hover states, subtle fills |
| Indigo | `#1E1B4B` | Primary actions, headings, navbar |
| Charcoal | `#2D2A26` | Body text |

### Accent Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Terracotta | `#C2703E` | Primary accent, active states, links |
| Heritage Gold | `#B8963E` | Secondary accent, badges, highlights |
| Deep Green | `#2D5016` | Success states (minimal use) |

### Utility Colors

| Token | Hex | Usage |
|-------|-----|-------|
| Muted | `#8A8279` | Secondary text, captions |
| Border | `#E0D8CC` | Borders, dividers |
| Card | `#FFFFFF` | Card backgrounds |
| Destructive | `#B91C1C` | Error states |

## Typography

### Font Families

- **UI Text**: Geist Sans (system UI fallback)
- **Display/Headings**: Georgia, "Times New Roman" (serif)
- **Code**: Geist Mono

### Type Scale

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Display | 3rem (48px) | 700 | Hero headings |
| H1 | 2.25rem (36px) | 700 | Page titles |
| H2 | 1.875rem (30px) | 700 | Section headings |
| H3 | 1.25rem (20px) | 600 | Card titles |
| Body | 1rem (16px) | 400 | Default text |
| Small | 0.875rem (14px) | 400 | Secondary text |
| Caption | 0.75rem (12px) | 400 | Labels, timestamps |

## Spacing

Consistent spacing using Tailwind's scale:
- **Section spacing**: 4-5rem (py-16 to py-20)
- **Content spacing**: 2-3rem (py-8 to py-12)
- **Component spacing**: 1-1.5rem (gap-4 to gap-6)
- **Element spacing**: 0.5-0.75rem (gap-2 to gap-3)

## Components

### Buttons

| Variant | Style |
|---------|-------|
| Primary | Indigo background, white text |
| Secondary | Terracotta background, white text |
| Ghost | Transparent, text color |
| Outline | Border, transparent background |

### Cards

- Rounded corners (xl)
- Subtle border
- White background
- Light shadow
- Hover state with increased shadow

### Badges

- Rounded full
- Small text
- Semantic color variants

### Forms

- Clean input styling
- Focus ring with terracotta color
- Clear labels and error states

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | Full layout with sidebar |

## Visual Principles

1. **Generous whitespace** — Let content breathe
2. **Strong visual hierarchy** — Clear heading levels
3. **Restrained color** — Warm neutrals with strategic accent use
4. **Modern typography** — Clean sans-serif UI with serif display faces
5. **Cultural subtlety** — Indian-inspired motifs used sparingly
6. **Accessibility** — Focus states, semantic HTML, sufficient contrast

## What to Avoid

- ❌ Excessive gradients
- ❌ Glassmorphism overuse
- ❌ Random decorative elements
- ❌ Overloaded cards
- ❌ Generic admin dashboard look
- ❌ Template-looking UI
