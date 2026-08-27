"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { useApi } from "@/hooks/useApi";
import {
  MapPin,
  Clock,
  Landmark,
  Users,
  Palette,
  UtensilsCrossed,
  Calendar,
  Sparkles,
  ArrowRight,
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

interface TimelinePeriod {
  id: string;
  name: string;
  start_year: number;
  end_year: number | null;
  description: string;
  entity_count: number;
}

interface HeritageEntity {
  id: string;
  name: string;
  category: string;
  description: string;
  location_id: string | null;
  period_id: string | null;
}

/* ========================================
   Category icons mapping
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
  tradition: Palette,
};

const heritageCategories = [
  { name: "Monuments", icon: Landmark, description: "Architectural landmarks and structures" },
  { name: "People", icon: Users, description: "Historical figures and communities" },
  { name: "Crafts", icon: Palette, description: "Traditional arts and crafts" },
  { name: "Festivals", icon: Calendar, description: "Cultural celebrations and events" },
  { name: "Food", icon: UtensilsCrossed, description: "Culinary heritage and traditions" },
  { name: "Events", icon: Clock, description: "Significant historical events" },
];

const suggestedQuestions = [
  "How is Patan connected to Patola weaving?",
  "Why is Rani ki Vav historically important?",
  "How did trade influence Gujarat's textile traditions?",
];

/* ========================================
   Page Component
   ======================================== */

export default function HomePage() {
  const {
    data: locations,
    loading: locationsLoading,
    error: locationsError,
  } = useApi<Location[]>("/locations?type=district");

  const {
    data: timeline,
    loading: timelineLoading,
    error: timelineError,
  } = useApi<TimelinePeriod[]>("/timeline");

  const {
    data: heritage,
    loading: heritageLoading,
    error: heritageError,
  } = useApi<HeritageEntity[]>("/heritage");

  // Take first 4 featured locations, 5 timeline periods, 6 heritage items
  const featuredLocations = locations?.slice(0, 4) ?? [];
  const timelineData = timeline?.slice(0, 5) ?? [];
  const featuredHeritage = heritage?.slice(0, 6) ?? [];

  return (
    <>
      {/* ---- Hero ---- */}
      <section className="relative bg-indigo text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo via-indigo/95 to-charcoal/90" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          />
        </div>
        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40 max-w-3xl">
            <Badge variant="accent" className="mb-6 bg-heritage-gold/20 text-heritage-gold-light border-heritage-gold/30">
              Gujarat, India
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
              Discover the Heritage
              <br />
              <span className="text-heritage-gold-light">of Gujarat</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 max-w-xl leading-relaxed">
              Explore centuries of culture, architecture, traditions, and history
              through an intelligent platform powered by AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta-light text-white">
                  Explore Gujarat
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/timeline">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Clock className="h-4 w-4" />
                  Explore Timeline
                </Button>
              </Link>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ---- Explore Gujarat (Real API Data) ---- */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Explore Gujarat"
            subtitle="Discover the districts and regions that shape Gujarat's rich cultural landscape."
          />

          {/* Map placeholder */}
          <div className="rounded-xl border border-border bg-parchment p-8 mb-8 min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-10 w-10 text-terracotta mx-auto mb-3" />
              <p className="text-sm text-muted font-medium">
                Interactive map will be integrated here.
              </p>
              <Badge variant="outline" className="mt-3">Coming Soon</Badge>
            </div>
          </div>

          {/* District cards from API */}
          {locationsLoading && <LoadingState message="Loading locations..." />}
          {locationsError && (
            <ErrorState
              title="Unable to load locations"
              message="Could not fetch location data from the server. Please try again."
            />
          )}
          {!locationsLoading && !locationsError && featuredLocations.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredLocations.map((loc) => (
                <Link key={loc.id} href={`/explore/${loc.id}`}>
                  <Card hover>
                    <CardContent>
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-terracotta/10 shrink-0">
                          <MapPin className="h-4 w-4 text-terracotta" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal text-sm">{loc.name}</h3>
                          <Badge variant="outline" className="mt-1 text-[10px]">{loc.type}</Badge>
                          <p className="text-xs text-muted mt-1.5 line-clamp-2">{loc.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
          {!locationsLoading && !locationsError && featuredLocations.length === 0 && (
            <div className="text-center py-8 text-sm text-muted">
              No locations available yet.
            </div>
          )}
          <div className="mt-6 text-center">
            <Link href="/explore">
              <Button variant="ghost" className="text-terracotta">
                View all districts <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---- Explore Through Time (Real API Data) ---- */}
      <section className="py-16 sm:py-20 bg-parchment">
        <Container>
          <SectionHeading
            title="Explore Through Time"
            subtitle="Journey through the major historical periods of Gujarat."
          />
          {timelineLoading && <LoadingState message="Loading timeline..." />}
          {timelineError && (
            <ErrorState
              title="Unable to load timeline"
              message="Could not fetch timeline data from the server."
            />
          )}
          {!timelineLoading && !timelineError && timelineData.length > 0 && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {timelineData.map((item, index) => {
                  const yearRange =
                    item.start_year < 0
                      ? `${Math.abs(item.start_year)} BCE – ${item.end_year != null ? `${item.end_year} CE` : "Present"}`
                      : item.end_year == null || item.end_year > 2024
                      ? `${item.start_year} CE – Present`
                      : `${item.start_year} – ${item.end_year} CE`;

                  return (
                    <div
                      key={item.id}
                      className={`relative flex items-start gap-6 ${
                        index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                      }`}
                    >
                      {/* Dot */}
                      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta border-2 border-parchment z-10 mt-1" />

                      {/* Content */}
                      <div className={`ml-10 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                        <Card hover>
                          <CardContent>
                            <Badge variant="secondary" className="mb-2">{yearRange}</Badge>
                            <h3 className="font-display text-xl text-charcoal">{item.name}</h3>
                            <p className="text-sm text-muted mt-1">{item.description}</p>
                            {item.entity_count > 0 && (
                              <p className="text-xs text-terracotta mt-2 font-medium">
                                {item.entity_count} heritage {item.entity_count === 1 ? "entity" : "entities"}
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href="/timeline">
              <Button variant="outline">
                View Full Timeline <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---- Heritage Categories ---- */}
      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            title="Heritage Categories"
            subtitle="Discover Gujarat's heritage across multiple dimensions of culture and history."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {heritageCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href="/heritage">
                  <Card hover>
                    <CardContent>
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo/5 shrink-0">
                          <Icon className="h-5 w-5 text-indigo" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal">{category.name}</h3>
                          <p className="text-sm text-muted mt-0.5">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/heritage">
              <Button variant="ghost" className="text-terracotta">
                Browse Heritage <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---- Featured Heritage (Real API Data) ---- */}
      <section className="py-16 sm:py-20 bg-parchment">
        <Container>
          <SectionHeading
            title="Featured Heritage"
            subtitle="Notable heritage sites and traditions of Gujarat."
          />
          {heritageLoading && <LoadingState message="Loading heritage..." />}
          {heritageError && (
            <ErrorState
              title="Unable to load heritage"
              message="Could not fetch heritage data from the server."
            />
          )}
          {!heritageLoading && !heritageError && featuredHeritage.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredHeritage.map((item) => {
                const Icon = categoryIcons[item.category] || Landmark;
                return (
                  <Link key={item.id} href={`/heritage/${item.id}`}>
                    <Card hover>
                      <CardContent>
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/10 shrink-0">
                            <Icon className="h-5 w-5 text-terracotta" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-charcoal font-serif">{item.name}</h3>
                            <Badge variant="outline" className="mt-1 text-[10px]">{item.category}</Badge>
                            <p className="text-sm text-muted mt-2 line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link href="/heritage">
              <Button variant="ghost" className="text-terracotta">
                View all heritage <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ---- Ask Dharohar AI ---- */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo/5 mx-auto mb-6">
              <Sparkles className="h-7 w-7 text-indigo" />
            </div>
            <SectionHeading
              title="Ask Dharohar AI"
              subtitle="Ask questions about Gujarat's history, culture, and heritage. AI-powered insights are coming soon."
              align="center"
            />
            <div className="mt-6 rounded-xl border border-border bg-white p-6">
              <div className="rounded-lg bg-parchment border border-border px-4 py-3 text-sm text-muted text-left">
                What would you like to discover?
              </div>
              <p className="text-xs text-warm-gray mt-4 mb-4 italic">
                AI functionality will be connected in a later phase.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestedQuestions.map((q) => (
                  <span
                    key={q}
                    className="rounded-full border border-border bg-parchment px-3 py-1.5 text-xs text-muted"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <Link href="/ai">
                <Button variant="outline">
                  Open AI Assistant <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
