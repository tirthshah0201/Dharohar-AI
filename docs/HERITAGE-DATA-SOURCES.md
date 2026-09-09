# Astrova Heritage Data Sources

## Purpose

Astrova uses authoritative heritage and reference sources to research, verify, normalize, and attribute heritage information. These sources are official government, international, and archival institutions whose data can be trusted for heritage research and source attribution.

This integration does NOT represent an implemented Retrieval-Augmented Generation (RAG) system. The sources are integrated as authoritative data references and source attribution.

## Registered Sources

### 1. Indian Culture Portal
- **Official URL:** https://www.indianculture.gov.in/
- **Publisher:** Ministry of Culture, Government of India
- **Source Type:** Government
- **Purpose:** Cultural heritage research and reference. Hosts manuscripts, museum collections, archival records, rare books, artworks, and audiovisual materials from repositories and institutions across India.
- **Verification Status:** Verified

### 2. Incredible India
- **Official URL:** https://www.incredibleindia.gov.in/
- **Publisher:** Ministry of Tourism, Government of India
- **Source Type:** Government
- **Purpose:** Heritage places, tourism and cultural reference information for destinations across India.
- **Verification Status:** Verified

### 3. UNESCO Intangible Cultural Heritage
- **Official URL:** https://ich.unesco.org/en
- **Publisher:** UNESCO
- **Source Type:** UNESCO
- **Purpose:** International reference for intangible cultural heritage including performing arts, oral traditions, festivals, rituals, handicrafts, and traditional knowledge.
- **Verification Status:** Verified
- **Note:** Distinct from the UNESCO World Heritage List (which covers physical/tangible sites).

### 4. National Archives of India
- **Official URL:** https://nationalarchives.nic.in/
- **Publisher:** National Archives of India, Ministry of Culture
- **Source Type:** Archive
- **Purpose:** Repository of public records, private papers, oriental records, cartographic records, and microfilms. Established 1891. Largest archival repository in South Asia.
- **Verification Status:** Verified

## Data Processing Flow

```
Authoritative Source
  → Research & Verification
  → Information Normalization
  → Duplicate Detection
  → Astrova Schema Mapping
  → PostgreSQL Storage
  → Source Attribution (source_id FK)
  → User-facing Heritage Information
```

## Data Quality Rules

1. **No fabricated facts.** Every heritage claim must be verifiable from a registered authoritative source.
2. **No duplicate records.** Existing heritage entities are checked before inserting new ones.
3. **Source attribution.** Every heritage entity should have a `source_id` pointing to its authoritative source.
4. **Verified locations.** Coordinates and locations are only used when verified from trustworthy sources.
5. **No unrelated images.** Media assets are not fabricated or downloaded from unauthorized sources.
6. **No unsupported claims.** RAG, embeddings, and vector databases are NOT part of this integration.

## UNESCO Intangible Cultural Heritage (India)

Astrova tracks all 16 Indian elements inscribed on the UNESCO Intangible Cultural Heritage Representative List:

| Year | Element | Type |
|------|---------|------|
| 2008 | Kutiyattam, Sanskrit Theatre | Performing Arts |
| 2008 | Tradition of Vedic Chanting | Oral Literature |
| 2008 | Ramlila, Traditional Performance of the Ramayana | Festival |
| 2009 | Ramman, Religious Festival of Garhwal Himalayas | Festival |
| 2010 | Chhau Dance | Performing Arts |
| 2010 | Kalbelia Folk Songs and Dances | Performing Arts |
| 2010 | Mudiyettu, Ritual Theatre of Kerala | Performing Arts |
| 2012 | Buddhist Chanting of Ladakh | Oral Literature |
| 2013 | Sankirtana, Ritual Singing of Manipur | Oral Literature/Performance |
| 2014 | Thathera Brass Craft of Jandiala Guru | Handicrafts |
| 2016 | Navroz | Festival |
| 2016 | Yoga | Practice |
| 2017 | Kumbh Mela | Festival |
| 2021 | Durga Puja in Kolkata | Festival |
| 2023 | Garba of Gujarat | Festival |
| 2025 | Deepavali | Festival |

## Migration

Source integration is applied via:
- `database/migrations/030_p1_authoritative_sources.sql`

This migration:
1. Registers 4 authoritative sources
2. Links existing heritage entities to appropriate sources
3. Adds new UNESCO ICH and Incredible India heritage records
4. Preserves all existing data

## Usage in Astrova

Users can explore heritage information knowing that every sourced entity has been attributed to an authoritative reference. The source attribution is displayed in heritage detail pages where available.
