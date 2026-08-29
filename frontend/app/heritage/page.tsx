"use client";

import { useState } from "react";
import Link from "next/link";
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
  ChevronRight,
} from "lucide-react";
import { CATEGORY_IMAGES, type HeritageImage } from "@/constants/images";

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

export default function HeritagePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryParam = activeCategory ? `?category=${activeCategory}` : "";
  const { data: heritage, loading, error, refetch } = useApi<HeritageEntity[]>(
    `/heritage${categoryParam}`
  );

  const groupedHeritage = heritage?.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, HeritageEntity[]>
  ) ?? {};

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <FadeIn>
          <div className="mb-8">
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

        {/* Category filter chips */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
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
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Loading */}
        {loading && <LoadingState message="Loading heritage..." />}

        {/* Error */}
        {error && (
          <ErrorState title="Unable to load heritage" message={error} onRetry={refetch} />
        )}

        {/* Empty */}
        {!loading && !error && heritage && heritage.length === 0 && (
          <EmptyState
            title="No heritage entries"
            description={
              activeCategory
                ? `No heritage entries found in the "${activeCategory}" category.`
                : "Heritage entries will appear here once they are added to the database."
            }
          />
        )}

        {/* Results */}
        {!loading && !error && heritage && heritage.length > 0 && (
          <div>
            {/* All view — grouped by category */}
            {!activeCategory && Object.keys(groupedHeritage).length > 0 && (
              <Stagger className="space-y-8" staggerDelay={0.05}>
                {categories.map((cat) => {
                  const items = groupedHeritage[cat.id];
                  if (!items || items.length === 0) return null;
                  const Icon = cat.icon;

                  return (
                    <StaggerItem key={cat.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="h-5 w-5 text-terracotta" />
                        <h2 className="font-display text-xl text-charcoal">{cat.label}</h2>
                        <Badge variant="outline" className="ml-1">{items.length}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((item) => {
                          const ItemIcon = categoryIcons[item.category] || Landmark;
                          const catImage = CATEGORY_IMAGES[item.category];
                          return (
                            <Link key={item.id} href={`/heritage/${item.id}`}>
                              <motion.div
                                whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(139,69,19,0.08)" }}
                                className="rounded-xl border border-border bg-card overflow-hidden cursor-pointer group"
                              >
                                {/* Image header */}
                                <div className="relative h-24 overflow-hidden">
                                  {catImage ? (
                                    <img
                                      src={catImage.src}
                                      alt={catImage.alt}
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
                                <div className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                                      <ItemIcon className="h-4 w-4 text-terracotta" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h3 className="font-semibold text-charcoal font-display text-sm">{item.name}</h3>
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
                                      <p className="text-xs text-muted mt-1.5 line-clamp-2">{item.description}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          );
                        })}
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}

            {/* Category-filtered view */}
            {activeCategory && (
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {heritage.map((item) => {
                  const ItemIcon = categoryIcons[item.category] || Landmark;
                  const catImage = CATEGORY_IMAGES[item.category];
                  return (
                    <StaggerItem key={item.id}>
                      <Link href={`/heritage/${item.id}`}>
                        <motion.div
                          whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(139,69,19,0.08)" }}
                          className="rounded-xl border border-border bg-card overflow-hidden cursor-pointer group"
                        >
                          {/* Image header */}
                          <div className="relative h-24 overflow-hidden">
                            {catImage ? (
                              <img
                                src={catImage.src}
                                alt={catImage.alt}
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
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                                <ItemIcon className="h-4 w-4 text-terracotta" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-charcoal font-display text-sm">{item.name}</h3>
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
                                <p className="text-xs text-muted mt-1.5 line-clamp-2">{item.description}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            )}
          </div>
        )}

        {/* Footer stats */}
        {!loading && !error && heritage && heritage.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted">
              Showing {heritage.length} heritage {heritage.length === 1 ? "entry" : "entries"}
              {activeCategory ? ` in ${activeCategory}` : ""} from across India.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
