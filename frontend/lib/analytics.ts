/* ========================================
   Astrova — Analytics Tracking Helper
   ========================================
   Client-side analytics event tracking.
   Events are sent to the admin analytics API.
   ======================================== */

import { api } from "@/services/api";

type EventType =
  | "heritage_view"
  | "search"
  | "collection_view"
  | "chatbot_query"
  | "favorite_add"
  | "favorite_remove";

interface TrackEventParams {
  eventType: EventType;
  heritageEntityId?: string;
  collectionId?: string;
  searchQuery?: string;
  language?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Track an analytics event.
 * Fire-and-forget — failures are silently ignored.
 */
export async function trackEvent(params: TrackEventParams): Promise<void> {
  try {
    await api.post("/admin/analytics/track", {
      event_type: params.eventType,
      heritage_entity_id: params.heritageEntityId || null,
      collection_id: params.collectionId || null,
      search_query: params.searchQuery || null,
      language: params.language || null,
      metadata: params.metadata || null,
    });
  } catch {
    // Analytics failures should not affect UX
  }
}
