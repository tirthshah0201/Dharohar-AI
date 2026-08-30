# HERITAGE ATLAS — Missing Images Report

> **Generated:** August 30, 2026
> **Purpose:** Track images that must be manually provided by the developer

---

## MISSING IMAGES

All new states and areas require developer-supplied images. No unrelated images have been used as substitutes.

### State Images
| Entity | Required File | Reason Missing | Suggested Search |
|--------|-------------|---------------|-----------------|
| Kerala | `kerala_state.jpg` | New state | Kerala tourism photography |
| Jammu & Kashmir | `jk_state.jpg` | New state | Kashmir landscape photography |
| Assam | `assam_state.jpg` | New state | Assam tea garden or river photography |
| Odisha | `odisha_state.jpg` | New state | Odisha temple or landscape photography |

### Area Images
| Entity | Required File | Reason Missing | Suggested Search |
|--------|-------------|---------------|-----------------|
| North Malabar | `north_malabar.jpg` | New area | Theyyam performance or North Kerala landscape |
| Chettinad | `chettinad.jpg` | New area | Chettinad mansion facade |
| Gurez Valley | `gurez_valley.jpg` | New area | Gurez Valley mountain/river landscape |
| Satkosia Gorge | `satkosia_gorge.jpg` | New area | Mahanadi gorge with forests |
| Amboli | `amboli.jpg` | New area | Amboli waterfall during monsoon |
| Majuli | `majuli.jpg` | New area | Majuli island or Satra |

### Heritage/Nature Entity Images
| Entity | Required File | Reason Missing | Suggested Search |
|--------|-------------|---------------|-----------------|
| Mahanadi River | `mahanadi.jpg` | New entity | Mahanadi River gorge |
| Theyyam | `theyyam.jpg` | New entity | Theyyam ritual performance |
| Chettinad Cuisine | `chettinad_cuisine.jpg` | New entity | Chettinad food spread |
| Athangudi Tiles | `athangudi_tiles.jpg` | New entity | Athangudi tile pattern |
| Mask Making (Majuli) | `majuli_masks.jpg` | New entity | Majuli bamboo masks |
| Sattriya Dance | `sattriya.jpg` | New entity | Sattriya classical dance |
| Habba Khatoon Peak | `habba_khatoon.jpg` | New entity | Gurez Valley mountain peak |
| Kishanganga River | `kishanganga.jpg` | New entity | Kishanganga River |

---

## INSTRUCTIONS FOR DEVELOPER

1. Place all images in `frontend/public/assets/states/` (for state images) or `frontend/public/assets/heritage/` (for entity images).
2. Use the exact filenames listed above.
3. Images should be:
   - High resolution (minimum 1200px wide)
   - Relevant to the entity
   - Clear and well-composed
   - Non-watermarked
   - Appropriate license
4. After providing images, update `frontend/constants/images.ts` to reference them.
5. Do NOT rename files without updating the constants.

---

## STATUS

- **Total images needed:** 20
- **Images provided:** 0
- **Images missing:** 20
- **Status:** PENDING DEVELOPER INPUT
