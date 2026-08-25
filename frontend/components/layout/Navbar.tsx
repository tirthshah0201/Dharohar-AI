"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/timeline", label: "Timeline" },
  { href: "/heritage", label: "Heritage" },
  { href: "/ai", label: "Ask AI" },
  { href: "/about", label: "About" },
];

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-ivory/90 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo text-white text-xs font-bold tracking-wider">
              DA
            </div>
            <span className="font-display text-xl text-charcoal">
              Dharohar<span className="text-terracotta ml-0.5">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-terracotta bg-terracotta/5"
                      : "text-muted hover:text-charcoal hover:bg-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-muted hover:text-charcoal transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
              <span className="text-warm-gray">Search...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-border bg-parchment px-1.5 text-[10px] font-mono text-muted">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-muted hover:bg-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-terracotta bg-terracotta/5"
                      : "text-muted hover:text-charcoal hover:bg-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </Container>
    </header>
  );
}

export { Navbar };
