"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SearchInput } from "@/components/ui/SearchInput";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useApi } from "@/hooks/useApi";
import { MapPin, Building2, Search, Landmark } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  parent_id: string | null;
  state: string;
}

interface SearchResult {
  id: string;
  name: string;
  category: string;
  description: string;
  location_id: string | null;
  period_id: string | null;
}

/* ========================================
   Helpers
   ======================================== */

const locationTypeIcons: Record<string, typeof Building2> = {
  state: MapPin,
  district: Building2,
  city: Building2,
  village: MapPin,
  site: Landmark,
};

/* ========================================
   Page Component
   ======================================== */

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Fetch locations based on type filter
  const typeParam = activeTab !== "all" ? `?type=${activeTab}` : "";
  const { data: locations, loading, error, refetch } = useApi<Location[]>(`/locations${typeParam}`);

  // Fetch search results when there's a query
  const { data: searchResults, loading: searchLoading } = useApi<SearchResult[]>(
    debouncedQuery ? `/search?q=${encodeURIComponent(debouncedQuery)}` : "",
    { immediate: false }
  );

  // Trigger search with debounce
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    // Simple debounce via timeout
    const timeout = setTimeout(() => {
      setDebouncedQuery(value);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  const tabs = [
    { id: "all", label: "All" },
    { id: "district", label: "Districts" },
    { id: "city", label: "Cities" },
    { id: "site", label: "Heritage Sites" },
  ];

  const isSearching = debouncedQuery.trim().length > 0;
  const displayResults = isSearching ? searchResults : locations;


  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            title="Gujarat Explorer"
            subtitle="Search and explore locations, heritage sites, and cultural landmarks across Gujarat."
          />
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="max-w-md w-full">
              <SearchInput
                placeholder="Search locations, heritage..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </div>
            {searchResults && (
              <p className="text-sm text-muted">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{debouncedQuery}&rdquo;
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-parchment min-h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-10 w-10 text-terracotta mx-auto mb-3" />
                <p className="text-sm text-muted font-medium">
                  Interactive Map
                </p>
                <p className="text-xs text-warm-gray mt-1">
                  Map integration (MapLibre/Leaflet) will be added in a future phase.
                </p>
                <Badge variant="outline" className="mt-3">Coming Soon</Badge>
              </div>
            </div>
          </div>

          {/* Location Panel */}
          <div className="space-y-4">
            {!isSearching && (
              <div>
                <div className="flex gap-1 border-b border-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? "border-terracotta text-charcoal"
                          : "border-transparent text-muted hover:text-charcoal hover:border-warm-gray"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading state */}
            {(loading || searchLoading) && <LoadingState message={isSearching ? "Searching..." : "Loading locations..."} />}

            {/* Error state */}
            {error && (
              <ErrorState
                title="Unable to load locations"
                message={error}
                onRetry={refetch}
              />
            )}

            {/* Results */}
            {!loading && !searchLoading && !error && displayResults && displayResults.length > 0 && (
              <div className="space-y-3">
                {isSearching
                  ? (displayResults as SearchResult[]).map((result) => (
                      <Link key={result.id} href={`/heritage/${result.id}`}>
                        <Card hover>
                          <CardContent>
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-heritage-gold/10 shrink-0">
                                <Landmark className="h-4 w-4 text-heritage-gold" />
                              </div>
                              <div>
                                <h4 className="text-sm font-semibold text-charcoal">{result.name}</h4>
                                <Badge variant="outline" className="mt-1">{result.category}</Badge>
                                <p className="text-xs text-muted mt-1.5 line-clamp-2">{result.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  : (displayResults as Location[]).map((loc) => {
                      const Icon = locationTypeIcons[loc.type] || Building2;
                      return (
                        <Link key={loc.id} href={`/explore/${loc.id}`}>
                          <Card hover>
                            <CardContent>
                              <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/10 shrink-0">
                                  <Icon className="h-4 w-4 text-terracotta" />
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-charcoal">{loc.name}</h4>
                                  <Badge variant="outline" className="mt-1">{loc.type}</Badge>
                                  <p className="text-xs text-muted mt-1.5 line-clamp-2">{loc.description}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
              </div>
            )}

            {/* Empty state */}
            {!loading && !searchLoading && !error && (!displayResults || displayResults.length === 0) && (
              <EmptyState
                icon={<Search className="h-8 w-8" />}
                title={isSearching ? "No results found" : "No locations available"}
                description={
                  isSearching
                    ? `No heritage results found for "${debouncedQuery}". Try a different search term.`
                    : "Locations will appear here once they are added to the database."
                }
              />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
