"use client";

import { use } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useApi } from "@/hooks/useApi";
import { getHeritageImage } from "@/constants/images";
import {
  Landmark,
  MapPin,
  Clock,
  Users,
  Palette,
  Calendar,
  BookOpen,
  Compass,
  ArrowLeft,
} from "lucide-react";
import { getCategoryIcon } from "@/constants/categories";

/* ========================================
   Types
   ======================================== */

interface CollectionEntity {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  period: { id: string; name: string } | null;
  location: { name: string; state: string } | null;
  media_url: string | null;
  media_alt: string | null;
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  entity_count: number;
  hero_image: string | null;
  entities: CollectionEntity[];
}

interface RelatedCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  shared_count: number;
  entity_count: number;
}

/* ========================================
   Helpers
   ======================================== */



/* ========================================
   Page Component
   ======================================== */

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: collection, loading, error, refetch } = useApi<Collection>(`/collections/${slug}`);
  const { data: relatedCollections } = useApi<RelatedCollection[]>(
    collection ? `/collections/${slug}/related` : "",
    { immediate: !!collection }
  );

  return (
    <div className="min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <div className="pt-6 pb-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Collections", href: "/collections" },
              { label: loading ? "Loading..." : collection?.name ?? "Not Found" },
            ]}
          />
        </div>

        {/* Loading */}
        {loading && <LoadingState message="Loading collection..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load collection"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Collection Detail */}
        {!loading && !error && collection && (
          <>
            {/* Hero */}
            <FadeIn>
              <div className="mb-10">
                <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-3">
                  {collection.name}
                </h1>
                <p className="text-muted max-w-2xl text-lg leading-relaxed">
                  {collection.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Badge variant="secondary" className="bg-terracotta/10 text-terracotta">
                    {collection.entity_count} {collection.entity_count === 1 ? "entity" : "entities"}
                  </Badge>
                </div>
              </div>
            </FadeIn>

            {/* Entities Grid */}
            {collection.entities.length > 0 ? (
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {collection.entities.map((entity) => {                   const EntityIcon = getCategoryIcon(entity.category);
                  const fallback = entity.media_url
                    ? { src: entity.media_url, alt: entity.media_alt || entity.name }
                    : getHeritageImage(entity.name, entity.category);

                  return (
                    <StaggerItem key={entity.id}>
                      <Link href={`/heritage/${entity.slug}`}>
                        <div className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md hover:border-terracotta/20 transition-all">
                          {/* Image */}
                          <div className="relative h-36 overflow-hidden">
                            {fallback ? (
                              <img
                                src={fallback.src}
                                alt={fallback.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-terracotta/10 to-heritage-gold/10 flex items-center justify-center">
                                <EntityIcon className="h-8 w-8 text-terracotta/20" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                          </div>

                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/8 shrink-0">
                                <EntityIcon className="h-4 w-4 text-terracotta" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-charcoal text-sm group-hover:text-terracotta transition-colors">
                                  {entity.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                  <Badge variant="outline" className="text-[10px] capitalize">
                                    {entity.category.replace(/_/g, " ")}
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
                                <p className="text-xs text-muted mt-1.5 line-clamp-2">
                                  {entity.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            ) : (
              <EmptyState
                title="No entities in this collection"
                description="This collection does not contain any heritage entities yet."
              />
            )}

            {/* Related Collections */}
            {relatedCollections && relatedCollections.length > 0 && (
              <div className="mb-12">
                <h2 className="font-display text-2xl text-charcoal mb-5">Related Collections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedCollections.map((rc) => (
                    <Link key={rc.id} href={`/collections/${rc.slug}`}>
                      <div className="group p-5 rounded-xl border border-border bg-card hover:shadow-md hover:border-terracotta/20 transition-all">
                        <h3 className="font-display text-base text-charcoal group-hover:text-terracotta transition-colors mb-1">
                          {rc.name}
                        </h3>
                        <p className="text-xs text-muted line-clamp-2 mb-2">{rc.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px]">{rc.entity_count} entities</Badge>
                          {rc.shared_count > 0 && (
                            <Badge variant="secondary" className="text-[10px] bg-heritage-gold/10 text-heritage-gold">
                              {rc.shared_count} shared
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="text-center pb-12 flex flex-wrap items-center justify-center gap-3">
              <Link href="/collections">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Collections
                </Button>
              </Link>
              <Link href="/heritage">
                <Button variant="outline" size="lg">
                  Browse All Heritage
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Not found */}
        {!loading && !error && !collection && (
          <ErrorState
            title="Collection not found"
            message="The collection you're looking for doesn't exist or has been removed."
          />
        )}
      </Container>
    </div>
  );
}
