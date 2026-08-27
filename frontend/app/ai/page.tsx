"use client";

import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChatBot } from "@/components/ai/ChatBot";
import { Sparkles, Globe, Database, MessageCircle } from "lucide-react";

export default function AIPage() {
  return (
    <div className="py-8 sm:py-12">
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo/5 mx-auto mb-4">
            <Sparkles className="h-7 w-7 text-indigo" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal">
            Dharohar AI
          </h1>
          <p className="mt-3 text-muted text-lg">
            Ask about India&apos;s heritage across 8 states in 6 languages.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <Badge variant="default">
              <Globe className="h-3 w-3 mr-1" /> 6 Languages
            </Badge>
            <Badge variant="secondary">
              <Database className="h-3 w-3 mr-1" /> 31 Heritage Records
            </Badge>
            <Badge variant="accent">
              <MessageCircle className="h-3 w-3 mr-1" /> 8 States
            </Badge>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <ChatBot />
            </CardContent>
          </Card>
        </div>

        {/* Supported States */}
        <div className="mt-10 text-center">
          <h3 className="text-sm font-medium text-muted mb-3">
            Supported States
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Gujarat", "Rajasthan", "Punjab", "Goa", "Tamil Nadu", "Maharashtra", "Madhya Pradesh", "Delhi"].map(
              (state) => (
                <Badge key={state} variant="outline">
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
