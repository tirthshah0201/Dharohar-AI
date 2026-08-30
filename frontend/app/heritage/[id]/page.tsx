"use client";

import { use } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useApi } from "@/hooks/useApi";
import {
  Landmark,
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Palette,
  Calendar,
  UtensilsCrossed,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getHeritageImage } from "@/constants/images";

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
   Helpers
   ======================================== */

const categoryIcons: Record<string, typeof Landmark> = {
  monument: Landmark,
  craft: Palette,
  person: Users,
  festival: Calendar,
  architecture: Landmark,
  event: Clock,
  food: UtensilsCrossed,
  community: Users,
  tradition: BookOpen,
};

const categoryColors: Record<string, string> = {
  monument: "bg-terracotta/10 text-terracotta",
  craft: "bg-heritage-gold/10 text-heritage-gold",
  person: "bg-terracotta-dark/10 text-terracotta-dark",
  festival: "bg-terracotta-light/10 text-terracotta-dark",
  architecture: "bg-terracotta/10 text-terracotta",
  event: "bg-terracotta-dark/10 text-terracotta-dark",
  food: "bg-heritage-gold/10 text-heritage-gold",
  community: "bg-terracotta-light/10 text-terracotta-dark",
  tradition: "bg-heritage-gold/10 text-heritage-gold",
};

/* ========================================
   Page Component
   ======================================== */

export default function HeritageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { data: heritage, loading, error, refetch } = useApi<HeritageEntity>(`/heritage/${id}`);

  const Icon = categoryIcons[heritage?.category || "monument"] || Landmark;
  const colorClass = categoryColors[heritage?.category || "monument"] || "bg-terracotta/10 text-terracotta";

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Heritage", href: "/heritage" },
              { label: loading ? "Loading..." : heritage?.name ?? "Not Found" },
            ]}
          />
        </div>

        {/* Back link */}
        <Link
          href="/heritage"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-charcoal transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Heritage
        </Link>

        {/* Loading */}
        {loading && <LoadingState message="Loading heritage entity..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load heritage entity"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Heritage Detail */}
        {!loading && !error && heritage && (
          <>
            {/* Hero Image */}
            {(() => {
              const heroImage = getHeritageImage(heritage.name, heritage.category);
              return heroImage ? (
                <div className="relative rounded-2xl overflow-hidden mb-8 h-64 sm:h-80">
                  <img
                    src={heroImage.src}
                    alt={heroImage.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge variant="secondary" className="bg-white/90 text-charcoal backdrop-blur-sm">
                        {heritage.category}
                      </Badge>
                    </div>
                    <h1 className="font-display text-3xl sm:text-4xl text-white drop-shadow-md">
                      {heritage.name}
                    </h1>
                    <p className="text-sm text-white/80 mt-2 max-w-xl">
                      {heritage.description.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shrink-0 ${colorClass}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
                          {heritage.name}
                        </h1>
                        <Badge variant="secondary">{heritage.category}</Badge>
                      </div>
                      <p className="text-sm text-muted">
                        {heritage.description.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Description Card */}
            <Card className="mb-8">
              <CardContent>
                <h2 className="font-display text-xl text-charcoal mb-3">About {heritage.name}</h2>
                <p className="text-muted leading-relaxed whitespace-pre-wrap">{heritage.description}</p>
              </CardContent>
            </Card>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Category */}
              <Card>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">Category</p>
                      <p className="text-sm font-semibold text-charcoal capitalize">{heritage.category}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              {heritage.location_id && (
                <Link href={`/explore/${heritage.location_id}`}>
                  <Card hover>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10">
                          <MapPin className="h-5 w-5 text-terracotta" />
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider">Location</p>
                          <p className="text-sm font-semibold text-terracotta">View location →</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}

              {/* Period */}
              {heritage.period_id && (
                <Link href="/timeline">
                  <Card hover>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-heritage-gold/10">
                          <Clock className="h-5 w-5 text-heritage-gold" />
                        </div>
                        <div>
                          <p className="text-xs text-muted uppercase tracking-wider">Historical Period</p>
                          <p className="text-sm font-semibold text-heritage-gold">View timeline →</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted ml-auto" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
            </div>

            {/* Ask Astrova about this */}
            <Card className="mb-8 border-terracotta/20">
              <CardContent>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 shrink-0">
                    <Sparkles className="h-5 w-5 text-terracotta" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal">Ask Astrova about {heritage.name}</h3>
                    <p className="text-sm text-muted">Get AI-powered insights about this heritage entry.</p>
                  </div>
                  <Link href="/ai">
                    <Button size="sm" variant="secondary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Ask Astrova
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Back to heritage */}
            <div className="text-center">
              <Link href="/heritage">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4" />
                  Browse All Heritage
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* Not found */}
        {!loading && !error && !heritage && (
          <ErrorState
            title="Heritage entity not found"
            message="The heritage entity you're looking for doesn't exist or has been removed."
          />
        )}
      </Container>
    </div>
  );
}
