"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/ui/LoadingState";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  Landmark, Image, Users, BookOpen, MessageSquare, Map,
  Clock, BarChart3, Settings, Database, Layers, Heart,
} from "lucide-react";
import { api } from "@/services/api";

/* ========================================
   Types
   ======================================== */

interface OverviewData {
  heritage_entities: number;
  media: number;
  relationships: number;
  collections: number;
  collection_items: number;
  chatbot_knowledge: number;
  supported_states: number;
  historical_periods: number;
  analytics_events: number;
}

/* ========================================
   Page Component
   ======================================== */

export default function AdminPage() {
  const [adminToken, setAdminToken] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [overview, setOverview] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!adminToken.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/admin/overview", {
        headers: { "X-Admin-Token": adminToken },
      });
      const data = await res.json();
      if (data.success) {
        setOverview(data.data);
        setAuthenticated(true);
      } else {
        setError(data.error?.message || "Invalid admin token");
      }
    } catch {
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta/10 mx-auto mb-5">
                <Settings className="h-7 w-7 text-terracotta" />
              </div>
              <h1 className="font-display text-2xl text-charcoal mb-2">Admin Dashboard</h1>
              <p className="text-muted mb-6">Enter your admin token to access the dashboard.</p>
              <div className="max-w-sm mx-auto">
                <input
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="Admin token"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta/30 mb-3"
                />
                {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
                <button
                  onClick={handleLogin}
                  disabled={loading || !adminToken.trim()}
                  className="w-full rounded-lg bg-terracotta hover:bg-terracotta-dark text-white py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Access Dashboard"}
                </button>
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
    );
  }

  const stats = overview ? [
    { label: "Heritage Entities", value: overview.heritage_entities, icon: Landmark, color: "text-terracotta" },
    { label: "Media Records", value: overview.media, icon: Image, color: "text-heritage-gold" },
    { label: "Relationships", value: overview.relationships, icon: Users, color: "text-terracotta-dark" },
    { label: "Collections", value: overview.collections, icon: Layers, color: "text-terracotta" },
    { label: "Collection Items", value: overview.collection_items, icon: BookOpen, color: "text-heritage-gold" },
    { label: "Chatbot Knowledge", value: overview.chatbot_knowledge, icon: MessageSquare, color: "text-terracotta-dark" },
    { label: "States", value: overview.supported_states, icon: Map, color: "text-terracotta" },
    { label: "Historical Periods", value: overview.historical_periods, icon: Clock, color: "text-heritage-gold" },
    { label: "Analytics Events", value: overview.analytics_events, icon: BarChart3, color: "text-terracotta-dark" },
  ] : [];

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <FadeIn>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-5 w-5 text-terracotta" />
              <span className="text-sm font-medium text-terracotta">Admin</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-charcoal">Dashboard</h1>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta/8">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-xs text-muted font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
                <div className="font-display text-2xl text-charcoal">{stat.value}</div>
              </div>
            );
          })}
        </div>

        {/* Quick Links */}
        <FadeIn delay={0.1}>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-lg text-charcoal mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a href="/heritage" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                <Landmark className="h-5 w-5 text-terracotta" />
                <span className="text-sm font-medium text-charcoal">View Heritage</span>
              </a>
              <a href="/collections" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                <Layers className="h-5 w-5 text-terracotta" />
                <span className="text-sm font-medium text-charcoal">View Collections</span>
              </a>
              <a href="/explore" className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream/50 transition-colors">
                <Map className="h-5 w-5 text-terracotta" />
                <span className="text-sm font-medium text-charcoal">View Map</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
