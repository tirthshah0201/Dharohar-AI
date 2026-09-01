"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { useApi } from "@/hooks/useApi";
import {
  Landmark,
  Clock,
  MapPin,
  Palette,
  Users,
  Calendar,
  UtensilsCrossed,
  BookOpen,
  Theater,
  Search,
  Filter,
  X,
} from "lucide-react";
import { getHeritageImage } from "@/constants/images";

/* ========================================
   Types
   ======================================== */

interface TimelineEntity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  location: { name: string; state: string } | null;
  media_url: string | null;
  media_alt: string | null;
}

interface TimelinePeriod {
  id: string;
  name: string;
  start_year: number;
  end_year: number | null;
  description: string;
  entity_count: number;
  entities: TimelineEntity[];
}

/* ========================================
   Helpers
   ======================================== */

function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BCE`;
  if (year > 2024) return "Present";
  return `${year} CE`;
}

function formatYearRange(start: number, end: number | null): string {
  return `${formatYear(start)} — ${end !== null ? formatYear(end) : "Present"}`;
}

function getDuration(start: number, end: number | null): string {
  const e = end ?? 2026;
  const years = e - start;
  if (years > 1000) return `${Math.round(years / 1000)}k+ years`;
  return `${years} years`;
}

const categoryIcons: Record<string, typeof Landmark> = {
  monument: Landmark,
  craft: Palette,
  person: Users,
  festival: Calendar,
  architecture: Landmark,
  event: Clock,
  food: UtensilsCrossed,
  community: Theater,
  tradition: BookOpen,
  natural_landmark: MapPin,
  waterfall: MapPin,
  lake: MapPin,
  river: MapPin,
  mountain: MapPin,
  gorge: MapPin,
  beach: MapPin,
  backwater: MapPin,
  cultural_site: Landmark,
  wildlife: MapPin,
  eco_tourism: MapPin,
  adventure: MapPin,
};

const CORE_CATEGORIES = ["monument", "craft", "person", "festival", "architecture", "event", "food", "community", "tradition"];

const periodColors = [
  "from-amber-50 to-orange-50 border-amber-200",
  "from-yellow-50 to-amber-50 border-yellow-200",
  "from-orange-50 to-red-50 border-orange-200",
  "from-red-50 to-rose-50 border-red-200",
  "from-rose-50 to-pink-50 border-rose-200",
  "from-pink-50 to-fuchsia-50 border-pink-200",
  "from-fuchsia-50 to-purple-50 border-fuchsia-200",
  "from-purple-50 to-indigo-50 border-purple-200",
  "from-indigo-50 to-blue-50 border-indigo-200",
];

/* ========================================
   Page Component
   ======================================== */

function TimelineContent() {
  const searchParams = useSearchParams();
  const highlightPeriod = searchParams.get("period") || undefined;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    data: periods,
    loading,
    error,
    refetch,
  } = useApi<TimelinePeriod[]>("/timeline");

  // Filtered periods
  const displayPeriods = useMemo(() => {
    if (!periods) return periods;
    if (!searchQuery && !selectedCategory) return periods;

    const q = searchQuery.toLowerCase();
    return periods
      .map((period) => ({
        ...period,
        entities: period.entities.filter((e) => {
          const matchesSearch = !q ||
            e.name.toLowerCase().includes(q) ||
            e.description.toLowerCase().includes(q) ||
            (e.location?.state || "").toLowerCase().includes(q);
          const matchesCategory = !selectedCategory || e.category === selectedCategory;
          return matchesSearch && matchesCategory;
        }),
      }))
      .filter((period) => {
        if (!searchQuery && !selectedCategory) return true;
        return period.entities.length > 0;
      });
  }, [periods, searchQuery, selectedCategory]);

  const hasFilters = searchQuery || selectedCategory;
  const totalEntities = displayPeriods?.reduce((sum, p) => sum + p.entities.length, 0) ?? 0;

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">
                Historical Timeline
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              India&apos;s Heritage Through Time
            </h1>
            <p className="text-muted max-w-xl">
              Journey through the major periods that shaped India&apos;s cultural
              heritage, from ancient civilizations to the modern era.
            </p>
          </div>
        </FadeIn>

        {/* Loading */}
        {loading && <LoadingState message="Loading historical periods..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load timeline"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Filters */}
        {!loading && !error && periods && periods.length > 0 && (
          <FadeIn delay={0.05}>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
                  <input
                    type="text"
                    placeholder="Search heritage in timeline..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-border bg-white pl-10 pr-8 py-2.5 text-sm text-charcoal placeholder:text-warm-gray transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted hover:text-charcoal"
                      aria-label="Clear search"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Category filter */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none rounded-lg border border-border bg-white pl-10 pr-8 py-2.5 text-sm text-charcoal transition-colors focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30"
                  >
                    <option value="">All Categories</option>
                    {CORE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear filters */}
                {hasFilters && (
                  <button
                    onClick={() => { setSearchQuery(""); setSelectedCategory(""); }}
                    className="text-sm text-terracotta hover:text-terracotta-dark font-medium whitespace-nowrap px-3 py-2"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Empty */}
        {!loading && !error && periods && periods.length === 0 && (
          <EmptyState
            title="No historical periods"
            description="Timeline data will appear here once historical periods are added to the database."
          />
        )}

        {/* Timeline */}
        {!loading && !error && displayPeriods && displayPeriods.length > 0 && (
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-terracotta/20 via-heritage-gold/20 to-terracotta/20 hidden sm:block" />

            <div className="space-y-12">
              {displayPeriods.map((period, index) => {
                const colorClass = periodColors[index % periodColors.length];
                const isHighlighted = highlightPeriod === period.id;

                return (
                  <FadeIn
                    key={period.id}
                    delay={index * 0.08}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-5 top-6 w-4 h-4 rounded-full bg-terracotta border-4 border-white shadow-sm z-10 hidden sm:block" />

                    {/* Period card */}
                    <div
                      className={`sm:ml-16 rounded-2xl border bg-gradient-to-br ${colorClass} p-6 sm:p-8 ${
                        isHighlighted ? "ring-2 ring-terracotta shadow-lg" : ""
                      }`}
                      id={`period-${period.id}`}
                    >
                      {/* Period header */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                          {period.name}
                        </h2>
                        <Badge variant="secondary" className="bg-white/60">
                          {formatYearRange(period.start_year, period.end_year)}
                        </Badge>
                        <Badge variant="secondary" className="bg-white/60 text-xs">
                          {getDuration(period.start_year, period.end_year)}
                        </Badge>
                      </div>

                      <p className="text-charcoal/70 leading-relaxed mb-6 max-w-2xl">
                        {period.description}
                      </p>

                      {/* View Heritage Link */}
                      {period.entity_count > 0 && (
                        <Link
                          href={`/heritage?period=${period.id}`}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors mb-6"
                        >
                          View {period.entity_count} Heritage {period.entity_count === 1 ? "Entity" : "Entities"}
                          →
                        </Link>
                      )}

                      {/* Entities in this period */}
                      {period.entities.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-semibold text-charcoal/60 uppercase tracking-wider mb-3">
                            Heritage from this period
                            {hasFilters && (
                              <span className="text-charcoal/40 normal-case ml-2">
                                ({period.entities.length} {period.entities.length === 1 ? "match" : "matches"})
                              </span>
                            )}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {period.entities.map((entity) => {
                              const EntityIcon = categoryIcons[entity.category] || Landmark;
                              const heroImage =
                                entity.media_url ||
                                getHeritageImage(entity.name, entity.category)?.src ||
                                null;
                              const heroAlt =
                                entity.media_alt ||
                                getHeritageImage(entity.name, entity.category)?.alt ||
                                entity.name;

                              return (
                                <Link key={entity.id} href={`/heritage/${entity.slug}`}>
                                  <div className="group rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 overflow-hidden hover:shadow-md hover:border-terracotta/20 transition-all">
                                    {heroImage && (
                                      <div className="relative h-28 overflow-hidden">
                                        <img
                                          src={heroImage}
                                          alt={heroAlt}
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                          loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                      </div>
                                    )}
                                    <div className="p-3">
                                      <div className="flex items-center gap-2 mb-1">
                                        <EntityIcon className="h-3.5 w-3.5 text-terracotta shrink-0" />
                                        <h4 className="font-semibold text-sm text-charcoal truncate group-hover:text-terracotta transition-colors">
                                          {entity.name}
                                        </h4>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-[10px] capitalize">
                                          {entity.category}
                                        </Badge>
                                        {entity.location && (
                                          <span className="text-[10px] text-muted flex items-center gap-0.5">
                                            <MapPin className="h-2.5 w-2.5" />
                                            {entity.location.state}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-charcoal/50 italic">
                          No heritage entities currently linked to this period.
                        </p>
                      )}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        )}

        {/* No results with filters */}
        {!loading && !error && displayPeriods && displayPeriods.length === 0 && hasFilters && (
          <EmptyState
            title="No matching heritage"
            description="Try adjusting your filters or search query."
          />
        )}

        {/* Footer */}
        {!loading && !error && periods && periods.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border text-center">
            {hasFilters ? (
              <p className="text-sm text-muted">
                Showing <span className="font-medium text-charcoal">{totalEntities}</span> heritage {totalEntities === 1 ? "entity" : "entities"} across{" "}
                <span className="font-medium text-charcoal">{displayPeriods?.length ?? 0}</span> {(displayPeriods?.length ?? 0) === 1 ? "period" : "periods"}.
              </p>
            ) : (
              <p className="text-sm text-muted">
                This timeline covers{" "}
                <span className="font-medium text-charcoal">{periods.length}</span>{" "}
                major historical periods spanning{" "}
                <span className="font-medium text-charcoal">
                  {formatYear(periods[0].start_year)}
                </span>{" "}
                to the present day.
              </p>
            )}
            <p className="text-xs text-warm-gray mt-2">
              Heritage data is sourced and verified from the database.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

export default function TimelinePage() {
  return (
    <Suspense
      fallback={
        <div className="py-8 sm:py-12">
          <Container>
            <div className="text-center py-20">
              <div className="inline-flex h-6 w-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted mt-3">Loading timeline...</p>
            </div>
          </Container>
        </div>
      }
    >
      <TimelineContent />
    </Suspense>
  );
}
