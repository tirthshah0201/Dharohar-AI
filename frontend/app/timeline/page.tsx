"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/ui/EmptyState";
import { useApi } from "@/hooks/useApi";

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

/* ========================================
   Helpers
   ======================================== */

function formatYearRange(start: number, end: number | null): string {
  const formatYear = (y: number) =>
    y < 0 ? `${Math.abs(y)} BCE` : y > 2024 ? "Present" : `${y} CE`;
  const endStr = end === null ? "Present" : formatYear(end);
  return `${formatYear(start)} — ${endStr}`;
}

function getEraColor(index: number): string {
  const colors = [
    "border-l-terracotta",
    "border-l-heritage-gold",
    "border-l-terracotta-dark",
    "border-l-terracotta-light",
    "border-l-warm-gray",
  ];
  return colors[index % colors.length];
}

/* ========================================
   Page Component
   ======================================== */

export default function TimelinePage() {
  const {
    data: periods,
    loading,
    error,
    refetch,
  } = useApi<TimelinePeriod[]>("/timeline");

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <SectionHeading
          title="Historical Timeline"
          subtitle="Journey through the major periods and events that shaped India's heritage."
        />

        {/* Loading */}
        {loading && <LoadingState message="Loading historical periods..." />}

        {/* Error */}
        {error && (
          <ErrorState
            title="Unable to load timeline"
            message={error}
            onRetry={refetch}
          />
        )}

        {/* Empty */}
        {!loading && !error && periods && periods.length === 0 && (
          <EmptyState
            title="No historical periods"
            description="Timeline data will appear here once historical periods are added to the database."
          />
        )}

        {/* Timeline content */}
        {!loading && !error && periods && periods.length > 0 && (
          <Tabs
            tabs={periods.map((period, index) => ({
              id: period.id,
              label: period.name,
              content: (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <h3 className="font-display text-2xl text-charcoal">
                      {period.name}
                    </h3>
                    <Badge variant="secondary">
                      {formatYearRange(period.start_year, period.end_year)}
                    </Badge>
                    {period.entity_count > 0 && (
                      <Badge variant="accent">
                        {period.entity_count} {period.entity_count === 1 ? "entity" : "entities"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted leading-relaxed mb-6 max-w-2xl">
                    {period.description}
                  </p>

                  {/* Decorative era timeline visualization */}
                  <div className={`relative pl-8 border-l-2 ${getEraColor(index)} space-y-4`}>
                    {/* Start marker */}
                    <div className="relative">
                      <div className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-terracotta border-2 border-ivory" />
                      <Card hover>
                        <CardContent>
                          <Badge variant="accent" className="mb-2">
                            {formatYearRange(period.start_year, period.end_year)}
                          </Badge>
                          <h4 className="font-semibold text-charcoal">
                            {period.name} Period
                          </h4>
                          <p className="text-sm text-muted mt-1">
                            {period.description}
                          </p>
                          {period.entity_count > 0 && (
                            <p className="text-xs text-terracotta mt-2 font-medium">
                              {period.entity_count} heritage {period.entity_count === 1 ? "entity" : "entities"} from this period are recorded in the database.
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        )}

        {/* Footer info */}
        {!loading && !error && periods && periods.length > 0 && (
          <div className="mt-10 pt-8 border-t border-border text-center">
            <p className="text-sm text-muted">
              This timeline covers {periods.length} major historical periods of India.
            </p>
            <p className="text-xs text-warm-gray mt-2">
              Heritage data is sourced and verified from the database.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
