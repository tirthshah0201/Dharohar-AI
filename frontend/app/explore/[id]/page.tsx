"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useApi } from "@/hooks/useApi";
import { MapPin, ArrowLeft, Landmark, Clock, ExternalLink } from "lucide-react";

// Dynamic import for MapLibre (no SSR)
const IndiaHeritageMap = dynamic(
  () => import("@/components/map/IndiaHeritageMap").then((mod) => mod.IndiaHeritageMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[350px] rounded-xl border border-border bg-parchment animate-pulse flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted">
          <div className="h-4 w-4 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Loading map...</span>
        </div>
      </div>
    ),
  }
);

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

/* ========================================
   Page Component
   ======================================== */

export default function LocationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: location, loading, error, refetch } = useApi<Location>(`/locations/${id}`);

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Explore", href: "/explore" },
              { label: loading ? "Loading..." : location?.name ?? "Not Found" },
            ]}
          />
        </div>

        {/* Back link */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>

        {/* Loading */}
        {loading && <LoadingState message="Loading location..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load location"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Location Detail */}
        {!loading && !error && location && (
          <>
            {/* Hero */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 shrink-0">
                  <MapPin className="h-7 w-7 text-terracotta" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
                      {location.name}
                    </h1>
                    <Badge variant="secondary">{location.type}</Badge>
                  </div>
                  <p className="text-sm text-muted">
                    {location.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Map — real implementation */}
            <div className="mb-8">
              {location.latitude && location.longitude ? (
                <div className="rounded-xl overflow-hidden border border-border">
                  <IndiaHeritageMap height="350px" />
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-parchment min-h-[250px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="h-8 w-8 text-terracotta mx-auto mb-2 opacity-50" />
                    <p className="text-sm text-muted">Location coordinates not available for map view</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <Card className="mb-8">
              <CardContent>
                <h2 className="font-display text-xl text-charcoal mb-3">About {location.name}</h2>
                <p className="text-muted leading-relaxed">{location.description}</p>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/heritage">
                <Card hover>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10">
                        <Landmark className="h-5 w-5 text-terracotta" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">Heritage Directory</h3>
                        <p className="text-xs text-muted">Browse all heritage sites</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/timeline">
                <Card hover>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-heritage-gold/10">
                        <Clock className="h-5 w-5 text-heritage-gold" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-charcoal">Historical Timeline</h3>
                        <p className="text-xs text-muted">Explore through different eras</p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted ml-auto" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Coordinates info */}
            {location.latitude && location.longitude && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-warm-gray">
                  Location coordinates: {Number(location.latitude).toFixed(4)}°N, {Number(location.longitude).toFixed(4)}°E
                </p>
              </div>
            )}
          </>
        )}

        {/* Not found */}
        {!loading && !error && !location && (
          <ErrorState
            title="Location not found"
            message="The location you're looking for doesn't exist or has been removed."
          />
        )}
      </Container>
    </div>
  );
}
