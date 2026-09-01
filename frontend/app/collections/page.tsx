"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useApi } from "@/hooks/useApi";
import { getHeritageImage } from "@/constants/images";
import { Landmark, Users, Palette, Calendar, BookOpen, Compass } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  entity_count: number;
  hero_image: string | null;
}

/* ========================================
   Helpers
   ======================================== */

const collectionIcons: Record<string, typeof Landmark> = {
  "sacred-architecture": Landmark,
  "indian-crafts": Palette,
  "living-traditions": BookOpen,
  "natural-heritage": Compass,
  "ancient-india": Users,
  "first-time-explorers": Calendar,
};

/* ========================================
   Page Component
   ======================================== */

export { type Collection };

export default function CollectionsPage() {
  const { data: collections, loading, error, refetch } = useApi<Collection[]>("/collections");

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">
                Curated Collections
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              Heritage Collections
            </h1>
            <p className="text-muted max-w-xl">
              Explore curated groupings of India&apos;s heritage — from sacred architecture
              to living traditions and natural wonders.
            </p>
          </div>
        </FadeIn>

        {/* Loading */}
        {loading && <LoadingState message="Loading collections..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load collections"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Empty */}
        {!loading && !error && collections && collections.length === 0 && (
          <EmptyState
            title="No collections yet"
            description="Curated collections will appear here once they are created."
          />
        )}

        {/* Collections Grid */}
        {!loading && !error && collections && collections.length > 0 && (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collections.map((collection) => {
              const Icon = collectionIcons[collection.slug] || Landmark;
              const fallback = collection.hero_image
                ? { src: collection.hero_image, alt: collection.name }
                : getHeritageImage(collection.name, "monument");

              return (
                <StaggerItem key={collection.id}>
                  <Link href={`/collections/${collection.slug}`}>
                    <div className="group rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg hover:border-terracotta/20 transition-all duration-300">
                      {/* Hero Image */}
                      <div className="relative h-44 overflow-hidden">
                        {fallback ? (
                          <img
                            src={fallback.src}
                            alt={fallback.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-terracotta/10 to-heritage-gold/10 flex items-center justify-center">
                            <Icon className="h-12 w-12 text-terracotta/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                              <Icon className="h-4 w-4 text-terracotta" />
                            </div>
                            <h2 className="font-display text-xl text-white drop-shadow-md">
                              {collection.name}
                            </h2>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="absolute top-3 right-3 text-[10px] bg-white/90 border-white/50 text-charcoal backdrop-blur-sm"
                        >
                          {collection.entity_count} {collection.entity_count === 1 ? "entity" : "entities"}
                        </Badge>
                      </div>

                      {/* Description */}
                      <div className="p-5">
                        <p className="text-sm text-muted leading-relaxed line-clamp-3">
                          {collection.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-terracotta group-hover:gap-2 transition-all">
                          Explore collection
                          <span className="text-terracotta/40">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Container>
    </div>
  );
}
