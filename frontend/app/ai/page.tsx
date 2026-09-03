"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChatBot } from "@/components/ai/ChatBot";
import { useApi } from "@/hooks/useApi";
import { Sparkles, Globe, Database, MapPin, MessageCircle } from "lucide-react";

function AIPageContent() {
  const searchParams = useSearchParams();
  const initialQuestion = searchParams.get("question") || undefined;
  const { data: heritage } = useApi<Array<{ id: string }>>("/heritage");
  const heritageCount = heritage?.length ?? 74;

  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-terracotta" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
            Astrova Guide
          </h1>
          <p className="mt-3 text-stone text-lg">
            Ask about India&apos;s heritage across 12 states in 6 languages.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <Badge variant="default" className="bg-terracotta text-white">
              <Globe className="h-3 w-3 mr-1" /> 6 Languages
            </Badge>
            <Badge variant="secondary" className="bg-terracotta-mist text-stone border-cream">
              <Database className="h-3 w-3 mr-1" /> {heritageCount} Heritage Records
            </Badge>
            <Badge variant="outline" className="border-cream text-stone">
              <MapPin className="h-3 w-3 mr-1" /> 12 States
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden border-cream shadow-lg shadow-terracotta/5">
            <CardContent className="p-0">
              <ChatBot initialQuestion={initialQuestion} />
            </CardContent>
          </Card>
        </div>

        {/* Supported States */}
        <div className="mt-10 text-center">
          <h3 className="text-sm font-medium text-stone mb-3">
            Supported States
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {            ["Gujarat", "Rajasthan", "Punjab", "Goa", "Tamil Nadu", "Maharashtra", "Madhya Pradesh", "Delhi", "Kerala", "Jammu & Kashmir", "Assam", "Odisha"].map(
              (state) => (
                <Badge key={state} variant="outline" className="border-cream text-stone">
                  {state}
                </Badge>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function AIPage() {
  return (
    <Suspense fallback={
      <div className="py-8 sm:py-12">
        <Container>
          <div className="text-center py-20">
            <div className="inline-flex h-6 w-6 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted mt-3">Loading...</p>
          </div>
        </Container>
      </div>
    }>
      <AIPageContent />
    </Suspense>
  );
}
