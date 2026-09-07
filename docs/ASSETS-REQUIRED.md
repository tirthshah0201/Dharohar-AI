# Assets Required — Missing Heritage Media (P1.39)

**Status:** 33 of 72 media records reference files that do not exist anywhere in the project repository.
**Action taken:** NOT fabricated. No unrelated/substitute images were associated with these heritage entities (per project asset rule). The frontend's verified `onError` fallback (`frontend/constants/images.ts` → category-appropriate verified asset) renders instead, so users see correct-category imagery, never broken-image icons.
**Resolution:** Supply the correct, verified photograph for each item below at the exact path, or update the media record via Admin.

| # | Required file (frontend/public +) | Heritage entity | Subject | Format | Aspect |
|---|---|---|---|---|---|
| 1 | /assets/heritage/amboli_hills.jpg | Amboli Ghat | Hill station in Sahyadri, Maharashtra | JPG | 3:2 |
| 2 | /assets/heritage/amboli_waterfalls.jpg | Amboli Waterfalls | Waterfall, Maharashtra | JPG | 3:2 |
| 3 | /assets/heritage/bhangra.jpg | Bhangra | Punjabi folk dance | JPG | 4:3 |
| 4 | /assets/heritage/blue_pottery.jpg | Blue Pottery | Jaipur glazed ceramic craft | JPG | 1:1 |
| 5 | /assets/heritage/chandni_chowk.jpg | Chandni Chowk | Historic Delhi market street | JPG | 3:2 |
| 6 | /assets/heritage/chettinad_mansions.jpg | Chettinad Mansions | Tamil Nadu merchant mansions | JPG | 3:2 |
| 7 | /assets/heritage/chilika_lake.jpg | Chilika Lake | Brackish lagoon, Odisha | JPG | 3:2 |
| 8 | /assets/heritage/chokhi_dhani.jpg | Chokhi Dhani | Rajasthani village resort | JPG | 3:2 |
| 9 | /assets/heritage/chola_bronzes.jpg | Chola Bronzes | South Indian bronze sculpture | JPG | 1:1 |
| 10 | /assets/heritage/dard_shina_culture.jpg | Dard/Shina Culture | Ladakh tribal culture | JPG | 3:2 |
| 11 | /assets/heritage/eco_tourism_satkosia.jpg | Satkosia Eco-Tourism | Gorge sanctuary, Odisha | JPG | 3:2 |
| 12 | /assets/heritage/ellora_caves.jpg | Ellora Caves | Rock-cut caves, Maharashtra | JPG | 3:2 |
| 13 | /assets/heritage/feni.jpg | Feni | Goan palm liquor heritage | JPG | 1:1 |
| 14 | /assets/heritage/goa_carnival.jpg | Goa Carnival | Panaji festival parade | JPG | 3:2 |
| 15 | /assets/heritage/gond_art.jpg | Gond Art | Tribal painting, MP | JPG | 4:3 |
| 16 | /assets/heritage/gurez_valley.jpg | Gurez Valley | Kashmir valley landscape | JPG | 3:2 |
| 17 | /assets/heritage/habba_khatoon_peak.jpg | Habba Khatoon Peak | Kashmir mountain | JPG | 3:2 |
| 18 | /assets/heritage/kishanganga_river.jpg | Kishanganga River | Kashmir river | JPG | 3:2 |
| 19 | /assets/heritage/konark_sun_temple.jpg | Konark Sun Temple | 13th-c. temple, Odisha | JPG | 3:2 |
| 20 | /assets/heritage/mahanadi_river.jpg | Mahanadi River | Major Odisha river | JPG | 3:2 |
| 21 | /assets/heritage/mask_making_majuli.jpg | Majuli Mask Making | Assam mask craft | JPG | 1:1 |
| 22 | /assets/heritage/meenmutty_falls.jpg | Meenmutty Falls | Kerala waterfall | JPG | 3:2 |
| 23 | /assets/heritage/monsoon_amboli.jpg | Amboli Monsoon | Amboli in monsoon | JPG | 3:2 |
| 24 | /assets/heritage/muzhappilangad_beach.jpg | Muzhappilangad Beach | Kerala drive-in beach | JPG | 3:2 |
| 25 | /assets/heritage/qutub_minar.jpg | Qutub Minar | Delhi minaret | JPG | 2:3 |
| 26 | /assets/heritage/sanchi_stupa.jpg | Sanchi Stupa | Buddhist stupa, MP | JPG | 3:2 |
| 27 | /assets/heritage/satkosia_tiger_reserve.jpg | Satkosia Tiger Reserve | Odisha reserve | JPG | 3:2 |
| 28 | /assets/heritage/satras_of_majuli.jpg | Satras of Majuli | Assam monasteries | JPG | 3:2 |
| 29 | /assets/heritage/solanki_temple.jpg | Solanki Temple | Gujarat temple architecture | JPG | 3:2 |
| 30 | /assets/heritage/trekking_gurez.jpg | Gurez Trekking | Kashmir trekking | JPG | 3:2 |
| 31 | /assets/heritage/tribal_heritage_odisha.jpg | Odisha Tribal Heritage | Odisha tribes | JPG | 3:2 |
| 32 | /assets/heritage/valiyaparamba_backwaters.jpg | Valiyaparamba Backwaters | Kerala backwaters | JPG | 3:2 |
| 33 | /assets/heritage/western_ghats.jpg | Western Ghats | Mountain range | JPG | 3:2 |

**Fixed this phase (4):** patola_weaving.jpg→.webp, phulkari.jpg→.webp, chettiar_community.jpg→.jpeg, mishing_community.jpg→.jpeg — DB URLs updated to the existing verified files (same subject, correct asset).

**Fallback behavior (verified):** when a media URL 404s, the heritage detail/list/collection components swap in the mapped verified category image via `onError` handlers (no broken-image icon, no unrelated monument substitution in the DB).
