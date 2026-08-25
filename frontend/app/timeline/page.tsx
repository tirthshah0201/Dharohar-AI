import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";

export const metadata: Metadata = {
  title: "Historical Timeline",
  description:
    "Explore Gujarat's history through an interactive timeline spanning ancient to modern periods.",
};

/* ========================================
   Placeholder timeline data.
   Clearly marked as non-final.
   ======================================== */

const eras = [
  {
    id: "ancient",
    label: "Ancient",
    period: "Before 700 CE",
    events: [
      { year: "~2500 BCE", title: "Indus Valley Influences", description: "Early settlements in the Gujarat region show connections to Indus Valley civilization patterns." },
      { year: "~300 BCE", title: "Maurya Period", description: "Gujarat becomes part of the Mauryan Empire under Chandragupta Maurya." },
      { year: "~100 CE", title: "Western Kshatrapas", description: "Rule of the Western Kshatrapas in parts of Gujarat." },
    ],
  },
  {
    id: "medieval",
    label: "Medieval",
    period: "700 – 1300 CE",
    events: [
      { year: "~950 CE", title: "Solanki Dynasty Rise", description: "The Solanki (Chaulukya) dynasty establishes power in Gujarat." },
      { year: "~1026 CE", title: "Mahmud's Invasions", description: "Historical raids affecting Gujarat's temple architecture period." },
      { year: "~1063 CE", title: "Rani ki Vav Construction", description: "Construction of the stepwell at Patan attributed to Queen Udayamati." },
    ],
  },
  {
    id: "sultanate",
    label: "Sultanate",
    period: "1300 – 1573 CE",
    events: [
      { year: "~1400 CE", title: "Ahmedabad Founded", description: "Ahmed Shah I establishes Ahmedabad as the capital of the Gujarat Sultanate." },
      { year: "~1500 CE", title: "Golden Age of Trade", description: "Gujarat becomes a major center for international maritime trade." },
    ],
  },
  {
    id: "colonial",
    label: "Colonial",
    period: "1573 – 1947 CE",
    events: [
      { year: "1573", title: "Mughal Conquest", description: "Akbar conquers Gujarat, incorporating it into the Mughal Empire." },
      { year: "1818", title: "British Paramountcy", description: "Gujarat's princely states come under British influence." },
    ],
  },
  {
    id: "modern",
    label: "Modern",
    period: "1947 – Present",
    events: [
      { year: "1947", title: "Independence", description: "Gujarat becomes part of independent India." },
      { year: "1960", title: "Gujarat State Formation", description: "Gujarat is formed as a separate state from the former Bombay State." },
    ],
  },
];

export default function TimelinePage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <SectionHeading
          title="Historical Timeline"
          subtitle="Journey through the major periods and events that shaped Gujarat's heritage."
        />
        <p className="text-xs text-warm-gray italic mb-6">
          Placeholder events — detailed historical data will be curated and verified.
        </p>

        <Tabs
          tabs={eras.map((era) => ({
            id: era.id,
            label: era.label,
            content: (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-display text-2xl text-charcoal">{era.label}</h3>
                  <Badge variant="secondary">{era.period}</Badge>
                </div>
                <div className="relative pl-8 border-l-2 border-border space-y-6">
                  {era.events.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-terracotta border-2 border-ivory" />
                      <Card hover>
                        <CardContent>
                          <Badge variant="accent" className="mb-2">{event.year}</Badge>
                          <h4 className="font-semibold text-charcoal">{event.title}</h4>
                          <p className="text-sm text-muted mt-1">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ),
          }))}
        />
      </Container>
    </div>
  );
}
