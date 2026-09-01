"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useApi } from "@/hooks/useApi";
import { useFavorites } from "@/hooks/useFavorites";
import { getHeritageImage } from "@/constants/images";
import { Landmark, MapPin, Clock, Heart, Trash2 } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface HeritageEntity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  location?: { name: string; state: string } | null;
  period?: { id: string; name: string } | null;
}

/* ========================================
   Helpers
   ======================================== */

const categoryIcons: Record<string, typeof Landmark> = {
  monument: Landmark, craft: Landmark, person: Landmark,
  festival: Landmark, architecture: Landmark, event: Landmark,
  food: Landmark, community: Landmark, tradition: Landmark,
  natural_landmark: Landmark, waterfall: Landmark, lake: Landmark,
  river: Landmark, mountain: Landmark, gorge: Landmark,
  beach: Landmark, backwater: Landmark, cultural_site: Landmark,
  wildlife: Landmark, eco_tourism: Landmark, adventure: Landmark,
};

/* ========================================
   Page Component
   ======================================== */

export default function FavoritesPage() {
  const { favorites, loaded, removeFavorite, count } = useFavorites();
  const [allHeritage, setAllHeritage] = useState<HeritageEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loaded) return;
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    // Fetch all heritage and filter to favorites
    setLoading(true);
    fetch("/api/proxy/heritage", {
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.success && j.data) {
          setAllHeritage(j.data.filter((h: HeritageEntity) => favorites.includes(h.id)));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [favorites, loaded]);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">My Favorites</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">
              Favorite Heritage
            </h1>
            <p className="text-muted">
              {count > 0
                ? `You have ${count} favorite heritage ${count === 1 ? "site" : "sites"}.`
                : "Start exploring and save heritage sites you love."}
            </p>
          </div>
        </FadeIn>

        {/* Loading */}
        {loading && <LoadingState message="Loading favorites..." />}

        {/* Empty */}
        {!loading && count === 0 && (
          <>
            <EmptyState
              icon={<Heart className="h-8 w-8" />}
              title="No favorites yet"
              description="Browse heritage sites and click the heart icon to save your favorites."
            />
            <div className="text-center mt-4">
              <Link href="/heritage">
                <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
                  Explore Heritage
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Favorites Grid */}
        {!loading && allHeritage.length > 0 && (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allHeritage.map((entity) => {
              const Icon = categoryIcons[entity.category] || Landmark;
              const heritageImage = getHeritageImage(entity.name, entity.category);

              return (
                <StaggerItem key={entity.id}>
                  <div className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-terracotta/20 transition-all">
                    {/* Image */}
                    <Link href={`/heritage/${entity.slug}`} className="block">
                      <div className="relative h-36 overflow-hidden">
                        {heritageImage ? (
                          <img
                            src={heritageImage.src}
                            alt={heritageImage.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-terracotta/10 to-heritage-gold/10 flex items-center justify-center">
                            <Icon className="h-8 w-8 text-terracotta/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                    </Link>

                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                          <Icon className="h-4 w-4 text-terracotta" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link href={`/heritage/${entity.slug}`}>
                            <h3 className="font-semibold text-charcoal text-sm group-hover:text-terracotta transition-colors">
                              {entity.name}
                            </h3>
                          </Link>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <Badge variant="outline" className="text-[10px] capitalize">
                              {entity.category}
                            </Badge>
                            {entity.location && (
                              <span className="text-[10px] text-muted flex items-center gap-0.5">
                                <MapPin className="h-2.5 w-2.5" />
                                {entity.location.state}
                              </span>
                            )}
                            {entity.period && (
                              <Badge variant="secondary" className="text-[9px] bg-heritage-gold/10 text-heritage-gold">
                                {entity.period.name}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFavorite(entity.id)}
                          className="p-1.5 rounded text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                          aria-label={`Remove ${entity.name} from favorites`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </Container>
    </div>
  );
}
