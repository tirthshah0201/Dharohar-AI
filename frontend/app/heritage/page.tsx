"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
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
} from "lucide-react";

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

  // Fetch heritage entities, optionally filtered by category
  const categoryParam = activeCategory ? `?category=${activeCategory}` : "";
  const { data: heritage, loading, error, refetch } = useApi<HeritageEntity[]>(
    `/heritage${categoryParam}`
  );

  // Group by category for the "All" view
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

  // Build tabs
  const tabs = categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    content: null, // Will render content outside tabs
  }));

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <SectionHeading
          title="Heritage Directory"
          subtitle="Explore Gujarat's heritage across monuments, people, crafts, traditions, festivals, and more."
        />

        {/* Category tabs */}
        <div className="mb-6">
          <Tabs
            tabs={[
              { id: "all", label: "All", content: null },
              ...tabs,
            ]}
            defaultTab={activeCategory ?? "all"}
            onChange={(id) => setActiveCategory(id === "all" ? null : id)}
          />
        </div>

        {/* Loading */}
        {loading && <LoadingState message="Loading heritage..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load heritage"
            message={error}
            onRetry={refetch}
          />
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
              <div className="space-y-8">
                {categories.map((cat) => {
                  const items = groupedHeritage[cat.id];
                  if (!items || items.length === 0) return null;
                  const Icon = cat.icon;

                  return (
                    <div key={cat.id}>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon className="h-5 w-5 text-terracotta" />
                        <h3 className="font-display text-xl text-charcoal">
                          {cat.label}
                        </h3>
                        <Badge variant="outline" className="ml-1">
                          {items.length}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map((item) => {
                          const ItemIcon = categoryIcons[item.category] || Landmark;
                          return (
                            <Link key={item.id} href={`/heritage/${item.id}`}>
                              <Card hover>
                                <CardContent>
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 shrink-0">
                                      <ItemIcon className="h-5 w-5 text-terracotta" />
                                    </div>
                                    <div className="min-w-0">
                                      <h4 className="font-semibold text-charcoal font-serif text-base truncate">
                                        {item.name}
                                      </h4>
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
                                      <p className="text-sm text-muted mt-2 line-clamp-2">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Category-filtered view */}
            {activeCategory && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {heritage.map((item) => {
                  const ItemIcon = categoryIcons[item.category] || Landmark;
                  return (
                    <Link key={item.id} href={`/heritage/${item.id}`}>
                      <Card hover>
                        <CardContent>
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 shrink-0">
                              <ItemIcon className="h-5 w-5 text-terracotta" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-semibold text-charcoal font-serif text-base truncate">
                                {item.name}
                              </h4>
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
                              <p className="text-sm text-muted mt-2 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Footer stats */}
        {!loading && !error && heritage && heritage.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted">
              Showing {heritage.length} heritage {heritage.length === 1 ? "entry" : "entries"}
              {activeCategory ? ` in ${activeCategory}` : ""} from the database.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
