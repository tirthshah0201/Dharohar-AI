import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
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

export const metadata: Metadata = {
  title: "Heritage Directory",
  description:
    "Discover Gujarat's heritage across monuments, people, crafts, traditions, festivals, and more.",
};

/* ========================================
   Placeholder data — clearly marked.
   ======================================== */

const categories = [
  { id: "monuments", label: "Monuments", icon: Landmark },
  { id: "people", label: "People", icon: Users },
  { id: "crafts", label: "Crafts", icon: Palette },
  { id: "traditions", label: "Traditions", icon: BookOpen },
  { id: "festivals", label: "Festivals", icon: Calendar },
  { id: "architecture", label: "Architecture", icon: Landmark },
  { id: "events", label: "Events", icon: Clock },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "communities", label: "Communities", icon: Theater },
];

const placeholderItems: Record<string, Array<{ name: string; description: string; location: string }>> = {
  monuments: [
    { name: "Rani ki Vav", description: "A UNESCO World Heritage stepwell in Patan, built in the 11th century.", location: "Patan" },
    { name: "Adalaj Stepwell", description: "An intricately carved five-story stepwell built in 1498.", location: "Ahmedabad" },
    { name: "Champaner-Pavagadh", description: "UNESCO World Heritage archaeological park with pre-Mughal Islamic city.", location: "Panchmahal" },
  ],
  people: [
    { name: "Sardar Vallabhbhai Patel", description: "Architect of unified India, born in Gujarat.", location: "Nadiad" },
    { name: "Mahatma Gandhi", description: "Father of the Indian nation, deeply connected to Gujarat.", location: "Porbandar" },
  ],
  crafts: [
    { name: "Patola Silk", description: "Double ikat woven silk sari tradition from Patan.", location: "Patan" },
    { name: "Bandhani", description: "Traditional tie-dye textile art.", location: "Gujarat-wide" },
    { name: "Kutchi Mirror Work", description: "Embroidery featuring small mirrors stitched into fabric.", location: "Kutch" },
  ],
  traditions: [
    { name: "Garba", description: "Traditional devotional dance performed during Navratri.", location: "Gujarat-wide" },
  ],
  festivals: [
    { name: "Navratri", description: "Nine-night celebration featuring Garba and Dandiya Raas.", location: "Gujarat-wide" },
    { name: "Uttarayan", description: "International kite festival celebrated in January.", location: "Ahmedabad" },
  ],
  architecture: [
    { name: "Solanki Temple Architecture", description: "Distinctive temple style from the Solanki period.", location: "Patan" },
  ],
  events: [
    { name: "Salt March (Dandi March)", description: "1930 non-violent protest march led by Mahatma Gandhi.", location: "Sabarmati to Dandi" },
  ],
  food: [
    { name: "Dhokla", description: "Steamed fermented rice and chickpea flour savory cake.", location: "Gujarat-wide" },
  ],
  communities: [
    { name: "Ahir Community", description: "Pastoral community with deep cultural traditions.", location: "Saurashtra" },
  ],
};

export default function HeritagePage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        <SectionHeading
          title="Heritage Directory"
          subtitle="Explore Gujarat's heritage across monuments, people, crafts, traditions, festivals, and more."
        />
        <p className="text-xs text-warm-gray italic mb-6">
          Placeholder data — heritage entries will be curated and verified.
        </p>

        <Tabs
          tabs={categories.map((category) => ({
            id: category.id,
            label: category.label,
            content: (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(placeholderItems[category.id] || []).map((item) => (
                  <Card key={item.name} hover>
                    <CardContent>
                      <h3 className="font-semibold text-charcoal font-serif text-base">{item.name}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <MapPin className="h-3 w-3 text-terracotta" />
                        <span className="text-xs text-muted">{item.location}</span>
                      </div>
                      <p className="text-sm text-muted mt-2">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {(placeholderItems[category.id] || []).length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-sm text-muted">No items yet. Content will be curated for this category.</p>
                  </div>
                )}
              </div>
            ),
          }))}
        />
      </Container>
    </div>
  );
}
