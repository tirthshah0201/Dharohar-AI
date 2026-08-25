import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Ask Dharohar AI",
  description:
    "Ask questions about Gujarat's history, culture, and heritage. AI-powered insights coming soon.",
};

const suggestedQuestions = [
  "How is Patan connected to Patola weaving?",
  "Why is Rani ki Vav historically important?",
  "How did trade influence Gujarat's textile traditions?",
  "What are the major historical periods of Gujarat?",
  "How is Kutch known for its crafts?",
];

export default function AIPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container size="narrow">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo/5 mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-indigo" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
            Dharohar AI
          </h1>
          <p className="mt-3 text-muted text-lg">
            Ask about Gujarat&apos;s history and culture.
          </p>
          <Badge variant="outline" className="mt-3">
            AI functionality — coming in a future phase
          </Badge>
        </div>

        {/* Chat Interface Placeholder */}
        <Card className="mb-6">
          <CardContent>
            <div className="rounded-lg bg-parchment border border-border px-4 py-3 flex items-center gap-3">
              <input
                type="text"
                placeholder="What would you like to discover?"
                disabled
                className="flex-1 bg-transparent text-sm text-charcoal placeholder:text-warm-gray outline-none"
              />
              <button
                disabled
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo/10 text-indigo"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-warm-gray mt-3 italic">
              AI will be connected in a later phase. This is the visual foundation only.
            </p>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <div>
          <h3 className="text-sm font-medium text-muted mb-3">
            Suggested questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((q) => (
              <div
                key={q}
                className="rounded-lg border border-border bg-white px-4 py-3 text-sm text-muted flex items-center gap-3"
              >
                <Sparkles className="h-4 w-4 text-heritage-gold shrink-0" />
                {q}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
