import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Target, Globe, Brain, Layers, BookOpen, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Dharohar AI project — an intelligent platform for discovering Gujarat's cultural heritage.",
};

const goals = [
  {
    icon: Globe,
    title: "Gujarat-First",
    description: "Our MVP focuses exclusively on Gujarat's heritage. The architecture is designed to scale to all Indian states.",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Using AI to uncover relationships between places, people, traditions, crafts, and historical events.",
  },
  {
    icon: Layers,
    title: "Knowledge Graph",
    description: "Building a rich knowledge graph that captures the interconnected nature of cultural heritage.",
  },
  {
    icon: BookOpen,
    title: "Verified Content",
    description: "Every piece of heritage information is sourced and verified. We do not present unverified claims.",
  },
  {
    icon: Shield,
    title: "Open Foundation",
    description: "Built with modern open-source technologies and designed for community contribution.",
  },
  {
    icon: Target,
    title: "Scalable",
    description: "While Gujarat is our starting point, the platform is designed to support India's complete cultural heritage.",
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
            Dharohar AI
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Dharohar AI is an intelligent cultural and historical knowledge platform
            that allows users to discover Gujarat&apos;s heritage through places,
            people, traditions, crafts, events, and AI-powered exploration.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            The central concept is: <strong className="text-charcoal">Heritage information + relationships + interactive exploration + AI</strong>.
            We believe that cultural heritage is best understood not as isolated facts,
            but as a rich web of interconnected stories.
          </p>
        </div>

        {/* Problem */}
        <SectionHeading
          title="The Problem"
          subtitle="India's cultural heritage is vast, but fragmented across static websites, unstructured documents, and inaccessible databases."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
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

        {/* Goals */}
        <SectionHeading
          title="Our Approach"
          subtitle="Building a modern, intelligent platform with a clear architectural vision."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <Card key={goal.title}>
                <CardContent>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo/5 mb-3">
                    <Icon className="h-5 w-5 text-indigo" />
                  </div>
                  <h3 className="font-semibold text-charcoal">{goal.title}</h3>
                  <p className="text-sm text-muted mt-1">{goal.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technology */}
        <div className="mt-12">
          <SectionHeading
            title="Technology"
            subtitle="Built with modern, proven technologies designed for reliability and scale."
          />
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "TypeScript", "React", "Tailwind CSS",
              "Node.js", "Express.js", "PostgreSQL", "Neo4j",
              "Python", "FastAPI", "pgvector", "AI/ML",
            ].map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
