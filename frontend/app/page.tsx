"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { CountUp } from "@/components/motion/CountUp";
import { useApi } from "@/hooks/useApi";
import { INDIAN_STATES, type StateData } from "@/constants/india";
import {
  MapPin,
  Clock,
  Landmark,
  Users,
  Palette,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Globe,
  BookOpen,
  Compass,
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
  food: Users,
  community: Users,
  tradition: Palette,
};

const heritageCategories = [
  { name: "Monuments", icon: Landmark, count: "3,000+", color: "terracotta" },
  { name: "Crafts", icon: Palette, count: "500+", color: "heritage-gold" },
  { name: "People", icon: Users, count: "1,000+", color: "indigo" },
  { name: "Festivals", icon: Calendar, count: "200+", color: "terracotta-light" },
  { name: "Food", icon: Users, count: "100+", color: "heritage-gold" },
  { name: "Events", icon: Clock, count: "500+", color: "indigo" },
];

const suggestedQuestions = [
  "How is Patan connected to Patola weaving?",
  "Tell me about Rani ki Vav",
  "What crafts are famous in Kutch?",
  "Explore Rajasthan forts",
];

/* ========================================
   State Card Component
   ======================================== */

function StateCard({ state, index }: { state: StateData; index: number }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(45,42,38,0.12)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative rounded-xl border border-border bg-card overflow-hidden cursor-pointer group"
      >
        {/* Color accent bar */}
        <div className="h-1 w-full" style={{ backgroundColor: state.color }} />

        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-charcoal text-lg">{state.name}</h3>
              <p className="text-xs text-muted mt-0.5">{state.region}</p>
            </div>
            <Badge variant="outline" className="text-[10px] shrink-0">
              {state.heritageCount} sites
            </Badge>
          </div>

          <p className="text-sm text-muted mb-3 line-clamp-2">{state.tagline}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {state.highlights.slice(0, 3).map((h) => (
              <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-parchment text-muted">
                {h}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-terracotta group-hover:gap-2 transition-all">
            Explore {state.name}
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

/* ========================================
   Page Component
   ======================================== */

export default function HomePage() {
  const [showAllStates, setShowAllStates] = useState(false);

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

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const timelineData = timeline?.slice(0, 5) ?? [];
  const featuredHeritage = heritage?.slice(0, 6) ?? [];
  const displayedStates = showAllStates ? INDIAN_STATES : INDIAN_STATES.slice(0, 4);

  const stats = [
    { value: 8, label: "States Covered", suffix: "+" },
    { value: 31, label: "Heritage Records", suffix: "+" },
    { value: 6, label: "Languages", suffix: "" },
    { value: 9, label: "Heritage Categories", suffix: "" },
  ];

  return (
    <>
      {/* ============================================
          HERO — India-wide Heritage Discovery
          ============================================ */}
      <section ref={heroRef} className="relative bg-indigo text-white overflow-hidden">
        {/* Background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo via-[#1a1740] to-[#120f2e]"
          style={{ opacity: heroOpacity, scale: heroScale }}
        />

        {/* Decorative pattern */}
        <div className="absolute inset-0 heritage-pattern opacity-[0.03]" />

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-heritage-gold/5 blur-3xl" />

        <Container>
          <motion.div
            style={{ y: heroTextY }}
            className="relative py-20 sm:py-28 lg:py-36 max-w-4xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge variant="accent" className="mb-5 bg-heritage-gold/15 text-heritage-gold-light border-heritage-gold/20">
                <Globe className="h-3 w-3 mr-1.5" />
                AI-Powered Heritage Platform
              </Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] tracking-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="block"
              >
                Every Monument Has a Story.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="block mt-1 text-gradient-heritage"
              >
                Let&apos;s Discover Them.
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
            >
              Explore India&apos;s rich cultural heritage — from ancient temples to living traditions.
              Ask questions, discover stories, and journey through centuries of history.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/explore">
                <Button size="lg" className="bg-terracotta hover:bg-terracotta-light text-white shadow-lg shadow-terracotta/20">
                  <Compass className="h-4 w-4" />
                  Explore Heritage
                </Button>
              </Link>
              <Link href="/ai">
                <Button size="lg" variant="outline" className="border-white/15 text-white hover:bg-white/8">
                  <Sparkles className="h-4 w-4" />
                  Ask Dharohar AI
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 flex items-center gap-6 text-white/30 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live Heritage Data
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                6 Languages
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                AI-Powered
              </div>
            </motion.div>
          </motion.div>
        </Container>

        {/* Hero bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ivory to-transparent" />
      </section>

      {/* ============================================
          STATISTICS — Animated Counters
          ============================================ */}
      <section className="py-10 bg-ivory">
        <Container>
          <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-6" staggerDelay={0.08}>
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <div className="font-display text-3xl sm:text-4xl text-indigo">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-xs text-muted mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================================
          INDIA EXPLORATION — Interactive State Cards
          ============================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                  Explore India
                </h2>
                <p className="mt-2 text-muted max-w-xl">
                  Discover the cultural heritage of each state — monuments, crafts, festivals, and living traditions.
                </p>
              </div>
              <Link href="/explore" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta font-medium hover:gap-2.5 transition-all">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedStates.map((state, i) => (
              <StateCard key={state.code} state={state} index={i} />
            ))}
          </Stagger>

          {!showAllStates && INDIAN_STATES.length > 4 && (
            <FadeIn delay={0.2}>
              <div className="mt-6 text-center">
                <Button variant="ghost" className="text-terracotta" onClick={() => setShowAllStates(true)}>
                  Show all {INDIAN_STATES.length} states <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </FadeIn>
          )}
        </Container>
      </section>

      {/* ============================================
          TIMELINE — Journey Through History
          ============================================ */}
      <section className="py-16 sm:py-20 bg-parchment">
        <Container>
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                Journey Through Time
              </h2>
              <p className="mt-2 text-muted max-w-xl mx-auto">
                From ancient civilizations to modern India — trace the timeline of a nation&apos;s heritage.
              </p>
            </div>
          </FadeIn>

          {timelineLoading && <LoadingState message="Loading timeline..." />}
          {timelineError && (
            <ErrorState
              title="Unable to load timeline"
              message="Could not fetch timeline data."
            />
          )}

          {!timelineLoading && !timelineError && timelineData.length > 0 && (
            <div className="relative max-w-3xl mx-auto">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border" />

              <Stagger className="space-y-6" staggerDelay={0.1}>
                {timelineData.map((item, index) => {
                  const yearRange =
                    item.start_year < 0
                      ? `${Math.abs(item.start_year)} BCE – ${item.end_year != null ? `${item.end_year} CE` : "Present"}`
                      : item.end_year == null || item.end_year > 2024
                      ? `${item.start_year} CE – Present`
                      : `${item.start_year} – ${item.end_year} CE`;

                  return (
                    <StaggerItem key={item.id}>
                      <div
                        className={`relative flex items-start gap-6 ${
                          index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                        }`}
                      >
                        {/* Dot */}
                        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta border-2 border-parchment z-10 mt-2" />

                        {/* Content */}
                        <div className={`ml-10 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
                          <motion.div
                            whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(45,42,38,0.1)" }}
                            className="rounded-xl border border-border bg-card p-5 shadow-sm cursor-pointer"
                          >
                            <Badge variant="secondary" className="mb-2 text-[11px]">{yearRange}</Badge>
                            <h3 className="font-display text-lg text-charcoal">{item.name}</h3>
                            <p className="text-sm text-muted mt-1 line-clamp-2">{item.description}</p>
                            {item.entity_count > 0 && (
                              <p className="text-xs text-terracotta mt-2 font-medium">
                                {item.entity_count} heritage {item.entity_count === 1 ? "entity" : "entities"}
                              </p>
                            )}
                          </motion.div>
                        </div>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          )}

          <FadeIn delay={0.2}>
            <div className="mt-10 text-center">
              <Link href="/timeline">
                <Button variant="outline">
                  View Full Timeline <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          HERITAGE CATEGORIES
          ============================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                Heritage Categories
              </h2>
              <p className="mt-2 text-muted max-w-xl mx-auto">
                Explore India&apos;s heritage across monuments, crafts, traditions, festivals, and more.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {heritageCategories.map((category) => {
              const Icon = category.icon;
              return (
                <StaggerItem key={category.name}>
                  <Link href="/heritage">
                    <motion.div
                      whileHover={{ y: -3, boxShadow: "0 8px 25px rgba(45,42,38,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl border border-border bg-card p-5 text-center cursor-pointer transition-colors hover:border-terracotta/30"
                    >
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl mx-auto mb-3 bg-${category.color}/10`}>
                        <Icon className={`h-5 w-5 text-${category.color}`} />
                      </div>
                      <h3 className="font-semibold text-charcoal text-sm">{category.name}</h3>
                      <p className="text-xs text-muted mt-0.5">{category.count}</p>
                    </motion.div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <Link href="/heritage">
                <Button variant="ghost" className="text-terracotta">
                  Browse All Heritage <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          FEATURED HERITAGE
          ============================================ */}
      <section className="py-16 sm:py-20 bg-parchment">
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                  Featured Heritage
                </h2>
                <p className="mt-2 text-muted">
                  Notable heritage sites and traditions from across India.
                </p>
              </div>
              <Link href="/heritage" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta font-medium hover:gap-2.5 transition-all">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          {heritageLoading && <LoadingState message="Loading heritage..." />}
          {heritageError && (
            <ErrorState
              title="Unable to load heritage"
              message="Could not fetch heritage data."
            />
          )}

          {!heritageLoading && !heritageError && featuredHeritage.length > 0 && (
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredHeritage.map((item) => {
                const Icon = categoryIcons[item.category] || Landmark;
                return (
                  <StaggerItem key={item.id}>
                    <Link href={`/heritage/${item.id}`}>
                      <motion.div
                        whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(45,42,38,0.1)" }}
                        whileTap={{ scale: 0.985 }}
                        className="rounded-xl border border-border bg-card p-5 shadow-sm cursor-pointer"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/8 shrink-0">
                            <Icon className="h-5 w-5 text-terracotta" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-charcoal font-serif">{item.name}</h3>
                            <Badge variant="outline" className="mt-1 text-[10px]">{item.category}</Badge>
                            <p className="text-sm text-muted mt-2 line-clamp-2">{item.description}</p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}

          <FadeIn delay={0.2}>
            <div className="mt-8 text-center">
              <Link href="/heritage">
                <Button variant="ghost" className="text-terracotta">
                  View All Heritage <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          ASK DHAROHAR AI — CTA Section
          ============================================ */}
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <FadeIn>
            <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-terracotta/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-heritage-gold/5 blur-3xl" />

              <div className="relative p-8 sm:p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo/5 mx-auto mb-5">
                  <Sparkles className="h-7 w-7 text-indigo" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                  Ask Dharohar AI
                </h2>
                <p className="mt-3 text-muted max-w-md mx-auto">
                  Ask questions about India&apos;s heritage in 6 languages. Get grounded, verified answers about monuments, crafts, traditions, and history.
                </p>

                {/* Preview of suggested questions */}
                <div className="mt-6 rounded-xl border border-border bg-white p-4 max-w-lg mx-auto">
                  <div className="rounded-lg bg-parchment/60 border border-border px-4 py-3 text-sm text-muted text-left mb-3">
                    What would you like to discover?
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {suggestedQuestions.slice(0, 3).map((q) => (
                      <span
                        key={q}
                        className="rounded-full border border-border bg-white px-2.5 py-1 text-[11px] text-muted"
                      >
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/ai">
                    <Button size="lg" className="bg-indigo hover:bg-indigo/90 text-white">
                      <Sparkles className="h-4 w-4" />
                      Open AI Assistant
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
