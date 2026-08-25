import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SearchInput } from "@/components/ui/SearchInput";
import { MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Explore Gujarat",
  description:
    "Explore the districts, cities, and heritage locations of Gujarat through an interactive map and curated information.",
};

const placeholderLocations = [
  { name: "Patan", type: "City", description: "Historic capital of the Solanki dynasty, home to Rani ki Vav" },
  { name: "Ahmedabad", type: "City", description: "UNESCO World Heritage walled city, cultural capital" },
  { name: "Junagadh", type: "City", description: "Ancient city with connections to Maurya and Gupta empires" },
  { name: "Bhuj", type: "City", description: "Gateway to the Rann of Kutch, historical trade center" },
  { name: "Vadodara", type: "City", description: "Cultural center with Maratha heritage" },
  { name: "Rajkot", type: "City", description: "Historical princely state capital" },
];

export default function ExplorePage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <SectionHeading
            title="Gujarat Explorer"
            subtitle="Search and explore locations, heritage sites, and cultural landmarks across Gujarat."
          />
          <div className="max-w-md">
            <SearchInput placeholder="Search locations, heritage sites..." />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-parchment min-h-[400px] flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="h-10 w-10 text-terracotta mx-auto mb-3" />
                <p className="text-sm text-muted font-medium">
                  Interactive Map
                </p>
                <p className="text-xs text-warm-gray mt-1">
                  Map integration (MapLibre/Leaflet) will be added in a future phase.
                </p>
                <Badge variant="outline" className="mt-3">
                  Coming Soon
                </Badge>
              </div>
            </div>
          </div>

          {/* Location Panel */}
          <div className="space-y-4">
            <h3 className="font-display text-lg text-charcoal">
              Locations
            </h3>
            <p className="text-xs text-warm-gray italic">
              Placeholder data — real curated content pending.
            </p>
            {placeholderLocations.map((loc) => (
              <Card key={loc.name} hover>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-terracotta/10 shrink-0">
                      <Building2 className="h-4 w-4 text-terracotta" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-charcoal">{loc.name}</h4>
                      <Badge variant="outline" className="mt-1">{loc.type}</Badge>
                      <p className="text-xs text-muted mt-1.5">{loc.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
