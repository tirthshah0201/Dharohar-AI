"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useApi } from "@/hooks/useApi";
import { INDIAN_STATES } from "@/constants/india";
import {
  MapPin,
  Building2,
  Search,
  Landmark,
  ChevronRight,
  Compass,
} from "lucide-react";

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
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">Explore India</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              Discover India&apos;s Heritage
            </h1>
            <p className="text-muted max-w-xl">
              Search and explore locations, heritage sites, and cultural landmarks across India.
            </p>
          </div>
        </FadeIn>

        {/* State Cards */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-charcoal mb-4">Explore by State</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {INDIAN_STATES.map((state) => (
                <Link key={state.code} href="/explore">
                  <motion.div
                    whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(45,42,38,0.08)" }}
                    className="rounded-lg border border-border bg-card p-4 cursor-pointer"
                  >
                    <div className="h-1 w-full rounded-full mb-3" style={{ backgroundColor: state.color }} />
                    <h3 className="font-semibold text-charcoal text-sm">{state.name}</h3>
                    <p className="text-xs text-muted mt-0.5">{state.region}</p>
                    <p className="text-[11px] text-terracotta mt-2 flex items-center gap-1">
                      {state.heritageCount} sites <ChevronRight className="h-3 w-3" />
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Search and Tabs */}
        <FadeIn delay={0.15}>
          <div className="mb-6">
            <div className="max-w-md mb-4">
              <SearchInput
                placeholder="Search locations, heritage..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </div>

            {!isSearching && (
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
            )}
          </div>
        </FadeIn>

        {/* Results */}
        <FadeIn delay={0.2}>
          {/* Loading */}
          {(loading || searchLoading) && <LoadingState message={isSearching ? "Searching..." : "Loading locations..."} />}

          {/* Error */}
          {error && (
            <ErrorState title="Unable to load locations" message={error} onRetry={refetch} />
          )}

          {/* Results */}
          {!loading && !searchLoading && !error && displayResults && displayResults.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {isSearching
                ? (displayResults as SearchResult[]).map((result) => (
                    <Link key={result.id} href={`/heritage/${result.id}`}>
                      <motion.div
                        whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(45,42,38,0.08)" }}
                        className="rounded-xl border border-border bg-card p-4 cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-heritage-gold/10 shrink-0">
                            <Landmark className="h-4 w-4 text-heritage-gold" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-charcoal">{result.name}</h4>
                            <Badge variant="outline" className="mt-1 text-[10px]">{result.category}</Badge>
                            <p className="text-xs text-muted mt-1.5 line-clamp-2">{result.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                : (displayResults as Location[]).map((loc) => {
                    const Icon = locationTypeIcons[loc.type] || Building2;
                    return (
                      <Link key={loc.id} href={`/explore/${loc.id}`}>
                        <motion.div
                          whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(45,42,38,0.08)" }}
                          className="rounded-xl border border-border bg-card p-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/10 shrink-0">
                              <Icon className="h-4 w-4 text-terracotta" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-semibold text-charcoal">{loc.name}</h4>
                              <Badge variant="outline" className="mt-1 text-[10px]">{loc.type}</Badge>
                              <p className="text-xs text-muted mt-1.5 line-clamp-2">{loc.description}</p>
                            </div>
                          </div>
                        </motion.div>
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
        </FadeIn>
      </Container>
    </div>
  );
}
