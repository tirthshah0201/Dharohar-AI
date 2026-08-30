"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useApi } from "@/hooks/useApi";
import {
  Landmark,
  Users,
  Palette,
  Calendar,
  UtensilsCrossed,
  Clock,
  MapPin,
  BookOpen,
  Theater,
  Search,
  X,
} from "lucide-react";
import { CATEGORY_IMAGES, getHeritageImage } from "@/constants/images";

/* ========================================
   Types
   ======================================== */

interface HeritageEntity {
  id: string;
  name: string;
  category: string;
  description: string;
  location_id: string | null;
  period_id: string | null;
  created_at: string;
}

/* ========================================
   Category icons
   ======================================== */

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
};

const categories = [
  { id: "monument", label: "Monuments", icon: Landmark },
  { id: "person", label: "People", icon: Users },
  { id: "craft", label: "Crafts", icon: Palette },
  { id: "festival", label: "Festivals", icon: Calendar },
  { id: "architecture", label: "Architecture", icon: Landmark },
  { id: "event", label: "Events", icon: Clock },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "community", label: "Communities", icon: Theater },
  { id: "tradition", label: "Traditions", icon: BookOpen },
];

/* ========================================
   Page Component
   ======================================== */

function HeritageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || null;

  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryParam = activeCategory ? `?category=${activeCategory}` : "";
  const { data: heritage, loading, error, refetch } = useApi<HeritageEntity[]>(
    `/heritage${categoryParam}`
  );

  // Client-side search filter
  const filteredHeritage = useMemo(() => {
    if (!heritage) return [];
    if (!searchQuery.trim()) return heritage;
    const query = searchQuery.toLowerCase();
    return heritage.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [heritage, searchQuery]);

  const groupedHeritage = useMemo(() => {
    return filteredHeritage.reduce(
      (acc, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {} as Record<string, HeritageEntity[]>
    );
  }, [filteredHeritage]);

  // Get unique categories from results
  const activeCategories = useMemo(() => {
    return categories.filter((cat) => groupedHeritage[cat.id]?.length > 0);
  }, [groupedHeritage]);

  const hasResults = filteredHeritage.length > 0;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">Heritage Directory</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              India&apos;s Heritage
            </h1>
            <p className="text-muted max-w-xl">
              Explore heritage across monuments, people, crafts, traditions, festivals, and more.
            </p>
          </div>
        </FadeIn>

        {/* Search and Category Filters */}
        <FadeIn delay={0.1}>
          <div className="mb-6 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search heritage by name, category, or description..."
                className="w-full rounded-lg border border-border bg-white pl-10 pr-10 py-2.5 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded hover:bg-parchment transition-colors"
                >
                  <X className="h-4 w-4 text-muted" />
                </button>
              )}
            </div>

            {/* Category Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-terracotta text-white"
                    : "bg-parchment text-muted hover:bg-cream hover:text-charcoal"
                }`}
              >
                All
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                const count = groupedHeritage[cat.id]?.length ?? 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? "bg-terracotta text-white"
                        : "bg-parchment text-muted hover:bg-cream hover:text-charcoal"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {cat.label}
                    {!isSearching && count > 0 && (
                      <span className="text-[10px] opacity-70">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* Loading */}
        {loading && <LoadingState message="Loading heritage..." />}

        {/* Error */}
        {error && (
          <ErrorState title="Unable to load heritage" message={error} onRetry={refetch} />
        )}

        {/* Empty */}
        {!loading && !error && filteredHeritage.length === 0 && (
          <EmptyState
            icon={<Search className="h-8 w-8" />}
            title={isSearching ? "No results found" : "No heritage entries"}
            description={
              isSearching
                ? `No heritage results found for "${searchQuery}". Try a different search term.`
                : activeCategory
                ? `No heritage entries found in the "${activeCategory}" category.`
                : "Heritage entries will appear here once they are added to the database."
            }
          />
        )}

        {/* Results */}
        {!loading && !error && hasResults && (
          <div>
            {/* Result count */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted">
                {isSearching ? (
                  <>
                    Showing <span className="font-medium text-charcoal">{filteredHeritage.length}</span>{" "}
                    result{filteredHeritage.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                  </>
                ) : (
                  <>
                    Showing <span className="font-medium text-charcoal">{filteredHeritage.length}</span>{" "}
                    heritage {filteredHeritage.length === 1 ? "entry" : "entries"} across{" "}
                    <span className="font-medium text-charcoal">{activeCategories.length}</span>{" "}
                    categor{activeCategories.length !== 1 ? "ies" : "y"}
                  </>
                )}
              </p>
              {(isSearching || activeCategory) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory(null);
                  }}
                  className="text-xs text-terracotta hover:text-terracotta-dark font-medium transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* All view — grouped by category */}
            {!activeCategory && !isSearching && Object.keys(groupedHeritage).length > 0 && (
              <Stagger className="space-y-8" staggerDelay={0.05}>
                {activeCategories.map((cat) => {
                  const items = groupedHeritage[cat.id];
                  const Icon = cat.icon;

                  return (
                    <StaggerItem key={cat.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="h-5 w-5 text-terracotta" />
                        <h2 className="font-display text-xl text-charcoal">{cat.label}</h2>
                        <Badge variant="outline" className="ml-1">
                          {items.length}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((item) => {
                          const ItemIcon = categoryIcons[item.category] || Landmark;
                          const heritageImage = getHeritageImage(item.name, item.category);
                          return (
                            <motion.div
                              key={item.id}
                              whileHover={{
                                y: -2,
                                boxShadow: "0 6px 20px rgba(139,69,19,0.08)",
                              }}
                              className="rounded-xl border border-border bg-card overflow-hidden group"
                            >
                              {/* Image header — linked to heritage detail */}
                              <Link href={`/heritage/${item.id}`} className="block cursor-pointer">
                                <div className="relative h-24 overflow-hidden">
                                  {heritageImage ? (
                                    <img
                                      src={heritageImage.src}
                                      alt={heritageImage.alt}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-terracotta-mist to-parchment flex items-center justify-center">
                                      <ItemIcon className="h-8 w-8 text-terracotta/20" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                              </Link>
                              <div className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                                    <ItemIcon className="h-4 w-4 text-terracotta" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <Link href={`/heritage/${item.id}`} className="block">
                                      <h3 className="font-semibold text-charcoal font-display text-sm hover:text-terracotta transition-colors">
                                        {item.name}
                                      </h3>
                                    </Link>
                                    {item.location_id && (
                                      <div className="flex items-center gap-1.5 mt-1">
                                        <MapPin className="h-3 w-3 text-terracotta" />
                                        <Link
                                          href={`/explore/${item.location_id}`}
                                          className="text-xs text-muted hover:text-terracotta transition-colors"
                                        >
                                          View location
                                        </Link>
                                      </div>
                                    )}
                                    <p className="text-xs text-muted mt-1.5 line-clamp-2">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}

            {/* Category-filtered or search view */}
            {(activeCategory || isSearching) && (
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredHeritage.map((item) => {
                  const ItemIcon = categoryIcons[item.category] || Landmark;
                  const heritageImage = getHeritageImage(item.name, item.category);
                  return (                          <StaggerItem key={item.id}>
                      <motion.div
                        whileHover={{
                          y: -2,
                          boxShadow: "0 6px 20px rgba(139,69,19,0.08)",
                        }}
                        className="rounded-xl border border-border bg-card overflow-hidden group"
                      >
                        {/* Image header — linked to heritage detail */}
                        <Link href={`/heritage/${item.id}`} className="block cursor-pointer">
                          <div className="relative h-24 overflow-hidden">
                            {heritageImage ? (
                              <img
                                src={heritageImage.src}
                                alt={heritageImage.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-terracotta-mist to-parchment flex items-center justify-center">
                              <ItemIcon className="h-8 w-8 text-terracotta/20" />
                            </div>
                          )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>
                        </Link>
                        <div className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                              <ItemIcon className="h-4 w-4 text-terracotta" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <Link href={`/heritage/${item.id}`} className="block">
                                <h3 className="font-semibold text-charcoal font-display text-sm hover:text-terracotta transition-colors">
                                  {item.name}
                                </h3>
                              </Link>
                              <Badge variant="outline" className="mt-1 text-[10px] capitalize">
                                {item.category}
                              </Badge>
                              {item.location_id && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <MapPin className="h-3 w-3 text-terracotta" />
                                  <Link
                                    href={`/explore/${item.location_id}`}
                                    className="text-xs text-muted hover:text-terracotta transition-colors"
                                  >
                                    View location
                                  </Link>
                                </div>
                              )}
                              <p className="text-xs text-muted mt-1.5 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default function HeritagePage() {
  return (
    <Suspense fallback={
      <div className="py-8 sm:py-12">
        <Container>
          <div className="text-center py-20">
            <div className="inline-flex h-6 w-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted mt-3">Loading heritage...</p>
          </div>
        </Container>
      </div>
    }>
      <HeritageContent />
    </Suspense>
  );
}
