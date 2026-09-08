# ASTROVA — MAP CLICK / STATE CARD COORDINATE BUG FIX REPORT

## 1. Status

**PASS WITH WARNINGS**

## 2. Root Cause

**Two separate bugs were identified and fixed:**

### Bug A — Reversed Latitude/Longitude in State Center Coordinates

The `INDIAN_STATES` array in `frontend/constants/india.ts` stored all state center coordinates in **`[longitude, latitude]`** format (e.g., Gujarat: `[72.6, 22.3]`). However, Leaflet's `map.flyTo()` expects **`[latitude, longitude]`** format.

When a state card was clicked, the `FlyToController` called `map.flyTo([72.6, 22.3], 7)` for Gujarat, which Leaflet interpreted as **latitude=72.6° (Arctic Ocean), longitude=22.3° (Atlantic Ocean)** — a location completely outside India. This caused the map to "fly" to an area outside the country, appearing as an unexpected "second axis" or coordinate reference element.

Additionally, the `INDIA_CENTER` constant in the same file was also in `[lng, lat]` format, though it was redundant since `AstrovaMap.tsx` imported `INDIA_CENTER` from `@/constants/map.ts` which already had the correct format.

### Bug B — Dead `selectedFeature` State Causing Unnecessary Re-renders

The `selectedFeature` state in `AstrovaMap.tsx` was set on every marker click (`setSelectedFeature(feature)`) but **never consumed by any render output**. This dead state triggered a full component re-render on every marker click, causing all 100 markers to get new `L.DivIcon` instances and event handler objects. React-leaflet detected these prop changes and updated every marker's DOM element, creating a brief visual flash/artifact across the entire map.

### Bug C — Duplicate OSM Attribution

Both `attributionControl={true}` on `MapContainer` AND a manually-added `<div>` at the bottom-right displayed "© OpenStreetMap contributors", creating a redundant duplicate.

## 3. Fix

### Fix A — Coordinate Order Correction

Swapped all 12 state center coordinates and `INDIA_CENTER` from `[longitude, latitude]` to `[latitude, longitude]` in `frontend/constants/india.ts`. Updated the type comment to reflect Leaflet format.

**Before (broken):** `[72.6, 22.3]` → Leaflet interprets as lat=72.6, lng=22.3 (Arctic Ocean)
**After (fixed):** `[22.3, 72.6]` → Leaflet interprets as lat=22.3, lng=72.6 (Gujarat, India ✓)

### Fix B — Dead State Removal

Removed `selectedFeature` state and all its references (`setSelectedFeature`) from `AstrovaMap.tsx`. The Leaflet Popup opens natively when a marker is clicked — no React state is needed for this. This eliminates unnecessary full-component re-renders.

### Fix C — Duplicate Attribution Removal

Removed the redundant manually-added OSM attribution `<div>` since Leaflet's built-in `attributionControl` already handles this.

## 4. Files Changed

| File | Change | Reason |
|------|--------|--------|
| `frontend/constants/india.ts` | Swapped all center coordinates from `[lng,lat]` to `[lat,lng]`; updated type comment | Fix coordinate order for Leaflet flyTo |
| `frontend/components/map/AstrovaMap.tsx` | Removed dead `selectedFeature` state and all references; removed duplicate OSM attribution div | Eliminate unnecessary re-renders and visual artifacts |

## 5. Map Verification

| Test | Result |
|------|--------|
| Map initialization | ✅ Map loads with India visible |
| Marker rendering | ✅ 100 markers render correctly |
| Marker click | ✅ Popup opens, no visual flash |
| Popup | ✅ Opens correctly, closeable |
| State card — Gujarat | ✅ Map flies to Gujarat (Veraval, Navsari, Valsad visible) |
| State card — Rajasthan | ✅ Map flies to Rajasthan (Jaipur, Ajmer, Bikaner, Jodhpur visible) |
| State filter | ✅ Markers filtered correctly (6 markers for Rajasthan) |
| Repeated clicks | ✅ No artifacts after multiple marker clicks |
| Reset button | ✅ Returns to India overview |

## 6. Regression

| Module | Result |
|--------|--------|
| Authentication | NOT AFFECTED |
| Admin authorization | NOT AFFECTED |
| Heritage listing | NOT AFFECTED |
| Heritage detail | NOT AFFECTED |
| Favorites isolation | NOT AFFECTED |
| Timeline | NOT AFFECTED |
| Collections | NOT AFFECTED |
| Search | NOT AFFECTED |
| Media fallback | NOT AFFECTED |
| Explore Map | ✅ IMPROVED |

## 7. Build

| Check | Result |
|-------|--------|
| Backend TypeScript | ✅ Clean |
| Frontend TypeScript | ✅ Clean |

## 8. Remaining Issues

- The `FlyToController` calls `map.flyTo()` on mount with `INDIA_CENTER` from `@/constants/map.ts`. This is a one-time animation that fires on every mount, including when the component re-mounts due to URL changes. This is cosmetic and not a bug.
- The `INDIA_CENTER` in `frontend/constants/india.ts` was also updated but is not imported by `AstrovaMap.tsx` (it imports from `constants/map.ts` instead). The update ensures consistency.

## 9. Git

DO NOT commit. DO NOT push.

Changed files (this fix only):
- `frontend/constants/india.ts` — coordinate order fix
- `frontend/components/map/AstrovaMap.tsx` — dead state removal + attribution cleanup

Additional uncommitted changes from prior work (media upload, favorites) are also present on disk.
