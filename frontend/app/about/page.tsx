import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Target, Globe, Brain, Layers, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Astrova — an interactive digital platform for discovering India's cultural heritage.",
};

const goals = [
  {
    icon: Globe,
    title: "India-Wide Vision",
    description: "Covering 12 states, scaling to cover India's complete cultural heritage — monuments, crafts, festivals, traditions, nature, and culture.",
  },
  {
    icon: Brain,
    title: "AI-Powered Discovery",
    description: "Using artificial intelligence to uncover relationships between places, people, traditions, crafts, and historical events.",
  },
  {
    icon: Layers,
    title: "Knowledge Graph",
    description: "Building a rich knowledge graph that captures the interconnected nature of cultural heritage across India.",
  },
  {
    icon: BookOpen,
    title: "Verified Content",
    description: "Every piece of heritage information is sourced and verified. We present only grounded, factual content.",
  },
  {
    icon: Shield,
    title: "Open Foundation",
    description: "Built with modern open-source technologies and designed for community contribution and transparency.",
  },
  {
    icon: Target,
    title: "Scalable Architecture",
    description: "While starting with 12 states, the platform architecture supports nationwide expansion.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Hero */}
        <div className="max-w-3xl mb-12">
          <Badge variant="accent" className="mb-4">About the Project</Badge>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
            Astrova
          </h1>
          <p className="mt-4 text-lg text-stone leading-relaxed">
            Astrova is an interactive digital platform for discovering India&apos;s cultural heritage
            — from ancient monuments to living traditions. We believe heritage is best understood
            not as isolated facts, but as a rich web of interconnected stories.
          </p>
        </div>

        {/* Problem */}
        <div className="mb-12">
          <h2 className="font-display text-2xl text-charcoal mb-2">The Problem</h2>
          <p className="text-muted mb-6">India&apos;s cultural heritage is vast, but fragmented across static websites, unstructured documents, and inaccessible databases.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent>
                <h3 className="font-semibold text-charcoal mb-1">Fragmented Data</h3>
                <p className="text-sm text-muted">
                  Heritage information is scattered across hundreds of sources with no unified interface.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="font-semibold text-charcoal mb-1">No Relationships</h3>
                <p className="text-sm text-muted">
                  Existing platforms present isolated facts without showing how heritage elements connect.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="font-semibold text-charcoal mb-1">Limited AI Access</h3>
                <p className="text-sm text-muted">
                  No AI-powered tool exists specifically for exploring Indian cultural heritage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals */}
        <div className="mb-12">
          <h2 className="font-display text-2xl text-charcoal mb-2">Our Approach</h2>
          <p className="text-muted mb-6">Building a modern, intelligent platform with a clear architectural vision.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <Card key={goal.title}>
                  <CardContent>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/8 mb-3">
                      <Icon className="h-5 w-5 text-terracotta" />
                    </div>
                    <h3 className="font-semibold text-charcoal">{goal.title}</h3>
                    <p className="text-sm text-muted mt-1">{goal.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Technology */}
        <div>
          <h2 className="font-display text-2xl text-charcoal mb-2">Technology</h2>
          <p className="text-muted mb-4">Built with modern, proven technologies designed for reliability and scale.</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "TypeScript", "React", "Tailwind CSS",
              "Node.js", "Express.js", "PostgreSQL",
              "Python", "scikit-learn", "AI/ML",
              "Motion", "MapLibre GL", "OpenStreetMap",
            ].map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
