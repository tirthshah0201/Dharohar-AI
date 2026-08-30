"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { STATE_IMAGES, CATEGORY_IMAGES, getHeritageImage } from "@/constants/images";
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
  Compass,
  BookOpen,
  Map,
} from "lucide-react";

/* ========================================
   Types
   ======================================== */

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
  { name: "Monuments", slug: "monument", icon: Landmark, description: "Architectural landmarks and structures" },
  { name: "Crafts", slug: "craft", icon: Palette, description: "Traditional arts and crafts" },
  { name: "People", slug: "person", icon: Users, description: "Historical figures and communities" },
  { name: "Festivals", slug: "festival", icon: Calendar, description: "Cultural celebrations and events" },
  { name: "Food", slug: "food", icon: Landmark, description: "Culinary heritage and traditions" },
  { name: "Traditions", slug: "tradition", icon: BookOpen, description: "Cultural practices and traditions" },
];

const suggestedQuestions = [
  "What should I explore in Gujarat?",
  "Tell me about Rani ki Vav",
  "Show me forts in Rajasthan",
  "What crafts are famous in Kutch?",
];

/* ========================================
   State Card Component
   ======================================== */

function StateCard({ state }: { state: StateData }) {
  const stateImage = STATE_IMAGES[state.code];
  return (
    <StaggerItem>
      <Link href={`/explore?state=${encodeURIComponent(state.name)}`}>
        <motion.div
          whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(139,69,19,0.12)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative rounded-xl border border-cream bg-white overflow-hidden cursor-pointer group"
        >
          {/* Image header */}
          <div className="relative h-32 overflow-hidden">
            {stateImage ? (
              <img
                src={stateImage.src}
                alt={stateImage.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-terracotta-mist to-parchment" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <h3 className="font-display text-lg text-white drop-shadow-md">{state.name}</h3>
              <p className="text-xs text-white/70 mt-0.5">{state.region}</p>
            </div>
            <Badge variant="outline" className="absolute top-3 right-3 text-[10px] bg-white/90 border-white/50 text-charcoal backdrop-blur-sm">
              {state.heritageCount} sites
            </Badge>
          </div>

          <div className="p-4">
            <p className="text-sm text-stone mb-3 line-clamp-2">{state.tagline}</p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {state.highlights.slice(0, 3).map((h) => (
                <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-terracotta-mist text-stone">
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
      </Link>
    </StaggerItem>
  );
}

/* ========================================
   Page Component
   ======================================== */

export default function HomePage() {
  const [showAllStates, setShowAllStates] = useState(false);

  const { data: timeline, loading: timelineLoading, error: timelineError } =
    useApi<TimelinePeriod[]>("/timeline");
  const { data: heritage, loading: heritageLoading, error: heritageError } =
    useApi<HeritageEntity[]>("/heritage");

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
  const totalStates = INDIAN_STATES.length;
  const totalHeritageSites = INDIAN_STATES.reduce((sum, s) => sum + s.heritageCount, 0);

  const stats = [
    { value: totalStates, label: "States Covered", suffix: "", href: "/explore" },
    { value: totalHeritageSites, label: "Heritage Records", suffix: "", href: "/heritage" },
    { value: 6, label: "Languages", suffix: "", href: null },
    { value: 9, label: "Heritage Categories", suffix: "", href: "/heritage" },
  ];

  return (
    <>
      {/* ============================================
          HERO — Heritage Atlas India-wide Experience
          ============================================ */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Terracotta gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta-deep via-terracotta to-terracotta-dark" />
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 heritage-pattern opacity-[0.06]" />
          {/* Warm glow accents */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-heritage-gold/10 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-terracotta-dark/40 blur-[80px]" />
        </motion.div>

        {/* Content */}
        <Container>
          <motion.div
            style={{ y: heroTextY }}
            className="relative py-20 sm:py-28 lg:py-36 max-w-4xl"
          >
            {/* Brand Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="accent"
                className="mb-6 bg-white/10 text-white border-white/15 backdrop-blur-sm"
              >
                <MapPin className="h-3 w-3 mr-1.5" />
                Heritage Atlas
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
                Explore India.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="block mt-1 text-heritage-gold-light"
              >
                Discover Its Stories.
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl leading-relaxed"
            >
              India&apos;s heritage is more than monuments. It&apos;s places, people, crafts, food,
              festivals, languages, traditions, and centuries of untold stories — all waiting to be
              discovered.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <Link href="/explore">
                <Button
                  size="lg"
                  className="!bg-[#1a237e] !text-white hover:!bg-[#283593] !border-0 shadow-lg shadow-black/20 font-semibold"
                >
                  <Compass className="h-4 w-4" />
                  Explore Heritage
                </Button>
              </Link>
              <Link href="/ai">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Ask Heritage Atlas
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

        {/* Hero bottom gradient fade */}
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
                {stat.href ? (
                  <Link href={stat.href} className="block group">
                    <div className="font-display text-3xl sm:text-4xl text-terracotta group-hover:text-terracotta-dark transition-colors">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-stone mt-1 font-medium uppercase tracking-wider group-hover:text-charcoal transition-colors">{stat.label}</p>
                  </Link>
                ) : (
                  <>
                    <div className="font-display text-3xl sm:text-4xl text-terracotta">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-stone mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                  </>
                )}
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* ============================================
          INTERACTIVE INDIA — Explore by State
          ============================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                  Explore India
                </h2>
                <p className="mt-2 text-stone max-w-xl">
                  Discover the cultural heritage of each state — monuments, crafts, festivals, and living traditions.
                </p>
              </div>
              <Link href="/explore" className="hidden sm:flex items-center gap-1.5 text-sm text-terracotta font-medium hover:gap-2.5 transition-all">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedStates.map((state) => (
              <StateCard key={state.code} state={state} />
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
          INTERACTIVE MAP CTA
          ============================================ */}
      <section className="py-16 sm:py-20 bg-terracotta-mist">
        <Container>
          <FadeIn>
            <div className="rounded-2xl overflow-hidden border border-cream bg-white">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Text side */}
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4 border-cream text-stone">
                    <Map className="h-3 w-3 mr-1.5" />
                    Interactive Map
                  </Badge>
                  <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                    Heritage Across India
                  </h2>
                  <p className="mt-3 text-stone leading-relaxed">
                    Explore heritage locations on an interactive map. Select a state, discover sites, and
                    ask questions about any place you find.
                  </p>
                  <div className="mt-6">
                    <Link href="/explore">
                      <Button className="bg-terracotta hover:bg-terracotta-dark text-white">
                        Open Heritage Map
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Map preview */}
                <div className="bg-cream flex items-center justify-center min-h-[240px] relative">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta-pale to-cream" />
                  </div>
                  <div className="relative text-center p-6">
                    <MapPin className="h-12 w-12 text-terracotta mx-auto mb-3 opacity-60" />
                    <p className="text-sm text-stone font-medium">30+ Heritage Markers</p>
                    <p className="text-xs text-stone/60 mt-1">{totalStates} States · Interactive Zoom</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* ============================================
          TIMELINE — Journey Through History
          ============================================ */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                Journey Through Time
              </h2>
              <p className="mt-2 text-stone max-w-xl mx-auto">
                From ancient civilizations to modern India — trace the timeline of a nation&apos;s heritage.
              </p>
            </div>
          </FadeIn>

          {timelineLoading && <LoadingState message="Loading timeline..." />}
          {timelineError && (
            <ErrorState title="Unable to load timeline" message="Could not fetch timeline data." />
          )}

          {!timelineLoading && !timelineError && timelineData.length > 0 && (
            <div className="relative max-w-3xl mx-auto">
              <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-cream" />

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
                        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta border-2 border-ivory z-10 mt-2" />
                        <div className={`ml-10 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
                          <Link href={`/timeline?period=${encodeURIComponent(item.id)}`}>          
                            <motion.div
                              whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(139,69,19,0.08)" }}
                              className="rounded-xl border border-cream bg-white p-5 shadow-sm cursor-pointer"
                            >
                              <Badge variant="secondary" className="mb-2 text-[11px] bg-terracotta-mist text-stone border-cream">{yearRange}</Badge>
                              <h3 className="font-display text-lg text-charcoal">{item.name}</h3>
                              <p className="text-sm text-stone mt-1 line-clamp-2">{item.description}</p>
                              {item.entity_count > 0 && (
                                <p className="text-xs text-terracotta mt-2 font-medium">
                                  {item.entity_count} heritage {item.entity_count === 1 ? "entity" : "entities"}
                                </p>
                              )}
                            </motion.div>
                          </Link>
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
                <Button variant="outline" className="border-cream text-charcoal hover:bg-cream/60">
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
      <section className="py-16 sm:py-20 bg-parchment">
        <Container>
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                Heritage Categories
              </h2>
              <p className="mt-2 text-stone max-w-xl mx-auto">
                Explore India&apos;s heritage across monuments, crafts, traditions, festivals, and more.
              </p>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4" staggerDelay={0.06}>
            {heritageCategories.map((category) => {
              const Icon = category.icon;
              const catImage = CATEGORY_IMAGES[category.slug];
              return (
                <StaggerItem key={category.name}>
                  <Link href={`/heritage?category=${encodeURIComponent(category.slug)}`}>
                    <motion.div
                      whileHover={{ y: -4, boxShadow: "0 12px 35px rgba(139,69,19,0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-xl border border-cream bg-white overflow-hidden cursor-pointer group"
                    >
                      {/* Category image */}
                      <div className="relative h-28 overflow-hidden">
                        {catImage ? (
                          <img
                            src={catImage.src}
                            alt={catImage.alt}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-terracotta-mist to-parchment" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-3 left-4 flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm">
                            <Icon className="h-4 w-4 text-terracotta" />
                          </div>
                          <h3 className="font-display text-base text-white drop-shadow-md">{category.name}</h3>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-xs text-stone line-clamp-1">{category.description}</p>
                        <div className="flex items-center gap-1 text-[11px] font-medium text-terracotta mt-2 group-hover:gap-1.5 transition-all">
                          Explore <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
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
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl text-charcoal">
                  Featured Heritage
                </h2>
                <p className="mt-2 text-stone">
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
            <ErrorState title="Unable to load heritage" message="Could not fetch heritage data." />
          )}

          {!heritageLoading && !heritageError && featuredHeritage.length > 0 && (
            <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredHeritage.map((item) => {
                const Icon = categoryIcons[item.category] || Landmark;
                const heritageImage = getHeritageImage(item.name, item.category);
                return (
                  <StaggerItem key={item.id}>
                    <Link href={`/heritage/${item.id}`}>
                      <motion.div
                        whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(139,69,19,0.08)" }}
                        whileTap={{ scale: 0.985 }}
                        className="rounded-xl border border-cream bg-white shadow-sm cursor-pointer overflow-hidden group"
                      >
                        {/* Image header */}
                        <div className="relative h-36 overflow-hidden">
                          {heritageImage ? (
                            <img
                              src={heritageImage.src}
                              alt={heritageImage.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-terracotta-mist to-parchment flex items-center justify-center">
                              <Icon className="h-10 w-10 text-terracotta/30" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          <Badge variant="outline" className="absolute top-3 left-3 text-[10px] bg-white/90 border-white/50 text-charcoal backdrop-blur-sm capitalize">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-charcoal font-display text-base">{item.name}</h3>
                          <p className="text-sm text-stone mt-1.5 line-clamp-2">{item.description}</p>
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
          ASK HERITAGE ATLAS — CTA Section
          ============================================ */}
      <section className="py-16 sm:py-20 bg-parchment">
        <Container size="narrow">
          <FadeIn>
            <div className="relative rounded-2xl border border-cream bg-white overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-terracotta/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-heritage-gold/5 blur-3xl" />

              <div className="relative p-8 sm:p-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 mx-auto mb-5">
                  <Sparkles className="h-7 w-7 text-terracotta" />
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-charcoal">
                  Ask Heritage Atlas
                </h2>
                <p className="mt-3 text-stone max-w-md mx-auto">
                  Ask questions about India&apos;s heritage in 6 languages. Get grounded, verified answers about monuments, crafts, traditions, and history.
                </p>

                <div className="mt-6 rounded-xl border border-cream bg-ivory p-4 max-w-lg mx-auto">
                  <div className="rounded-lg bg-white border border-cream px-4 py-3 text-sm text-stone text-left mb-3">
                    What would you like to discover?
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {suggestedQuestions.slice(0, 3).map((q) => (
                      <Link
                        key={q}
                        href={`/ai?question=${encodeURIComponent(q)}`}
                        className="rounded-full border border-cream bg-white px-2.5 py-1 text-[11px] text-stone hover:bg-terracotta/5 hover:border-terracotta/30 hover:text-charcoal transition-colors"
                      >
                        {q}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/ai">
                    <Button size="lg" className="bg-terracotta hover:bg-terracotta-dark text-white shadow-lg shadow-terracotta/15">
                      <Sparkles className="h-4 w-4" />
                      Open Heritage Atlas Guide
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
