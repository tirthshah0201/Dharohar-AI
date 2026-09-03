/* ========================================
   Astrova — Shared Types
   ======================================== */

// ---- Locations ----
export interface Location {
  id: string;
  name: string;
  type: "state" | "district" | "city" | "village" | "site";
  description?: string;
  latitude?: number;
  longitude?: number;
  parentId?: string;
}

// ---- Historical Periods ----
export interface HistoricalPeriod {
  id: string;
  name: string;
  startYear: number;
  endYear: number | null;
  description?: string;
}

// ---- Heritage Entities ----
export type HeritageCategory =
  | "monument"
  | "person"
  | "craft"
  | "tradition"
  | "festival"
  | "architecture"
  | "event"
  | "food"
  | "community";

export interface HeritageEntity {
  id: string;
  name: string;
  category: HeritageCategory;
  description: string;
  locationId?: string;
  periodId?: string;
  image?: string;
}

// ---- Relationships ----
export type RelationshipType =
  | "LOCATED_IN"
  | "LOCATED_AT"
  | "ASSOCIATED_WITH"
  | "USED_TECHNIQUE"
  | "PART_OF"
  | "OCCURRED_DURING"
  | "PRACTICED_BY"
  | "INFLUENCED_BY";

export interface Relationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  description?: string;
}

// ---- Events ----
export interface HistoricalEvent {
  id: string;
  title: string;
  year: number | string;
  description: string;
  locationId?: string;
  periodId?: string;
}

// ---- API ----
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// ---- Search ----
export interface SearchFilters {
  query?: string;
  category?: HeritageCategory;
  locationId?: string;
  periodId?: string;
}

// ---- AI Chat ----
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
}
