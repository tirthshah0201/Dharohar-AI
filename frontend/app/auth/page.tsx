"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, LogIn, UserPlus, ArrowLeft } from "lucide-react";

/* ========================================
   Astrova — Auth Page (Login / Register)
   ======================================== */

type Tab = "login" | "register";

export default function AuthPage() {
  const router = useRouter();
  const { login, register, user, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect
  if (!loading && user) {
    router.push("/favorites");
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      if (tab === "register") {
        await register(name, email, password);
        // After register, try syncing localStorage favorites
        await syncLocalFavorites();
      } else {
        await login(email, password);
        // After login, try syncing localStorage favorites
        await syncLocalFavorites();
      }
      router.push("/favorites");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  async function syncLocalFavorites() {
    try {
      const stored = localStorage.getItem("astrova_favorites");
      if (!stored) return;
      const ids: string[] = JSON.parse(stored);
      if (ids.length === 0) return;

      const res = await fetch("/api/proxy/favorites/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ heritageIds: ids }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.favoriteIds) {
          // Replace localStorage with merged server state
          localStorage.setItem("astrova_favorites", JSON.stringify(json.data.favoriteIds));
        }
      }
    } catch {
      // Sync failure is non-fatal
    }
  }

  return (
    <div className="py-8 sm:py-12">
      <Container>
        <FadeIn>
          <div className="max-w-md mx-auto">
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted hover:text-terracotta transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl text-charcoal mb-2">
                {tab === "login" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-muted text-sm">
                {tab === "login"
                  ? "Sign in to access your favorites across devices."
                  : "Join Astrova to save and sync your favorite heritage."}
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="flex rounded-lg border border-border bg-parchment/40 p-1 mb-6">
              <button
                onClick={() => { setTab("login"); setError(""); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === "login"
                    ? "bg-white text-charcoal shadow-sm"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setTab("register"); setError(""); }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  tab === "register"
                    ? "bg-white text-charcoal shadow-sm"
                    : "text-muted hover:text-charcoal"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength={2}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    placeholder="Your name"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full px-4 py-2.5 pr-10 rounded-lg border border-border bg-white text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-colors"
                    placeholder={tab === "register" ? "Min 6 characters" : "Your password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-terracotta hover:bg-terracotta-dark text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : tab === "login" ? (
                  <>
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </button>
            </form>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
