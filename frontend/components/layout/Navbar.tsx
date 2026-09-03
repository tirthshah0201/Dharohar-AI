"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, ChevronRight, LogIn, User, LogOut } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { openSearchModal } from "@/components/ui/SearchModal";
import { useAuth } from "@/hooks/useAuth";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/explore", label: "Explore" },
  { href: "/timeline", label: "Timeline" },
  { href: "/heritage", label: "Heritage" },
  { href: "/collections", label: "Collections" },
  { href: "/ai", label: "Ask AI", highlight: true },
  { href: "/about", label: "About" },
];

const authNavLink: NavLink = { href: "/favorites", label: "Favorites" };

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const allLinks = user ? [...navLinks.slice(0, 4), authNavLink, ...navLinks.slice(4)] : navLinks;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-cream shadow-sm"
          : "bg-ivory/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo — Astrova */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex items-center"
            >
              <img
                src="/assets/brand/astrova-wordmark.jpg"
                alt="Astrova"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">                {allLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "text-terracotta bg-terracotta/5"
                          : "text-stone hover:text-charcoal hover:bg-cream/60"
                      }`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-1 inline-flex h-1.5 w-1.5 rounded-full bg-terracotta" />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-terracotta rounded-full"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openSearchModal()}
              className="flex items-center gap-2 rounded-lg border border-cream bg-white/60 px-3 py-1.5 text-sm text-stone hover:text-charcoal hover:bg-white transition-all"
              aria-label="Search (Ctrl+K)"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-warm-gray hidden lg:inline">Search heritage...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-cream bg-parchment/60 px-1.5 text-[10px] font-mono text-stone">
                ⌘K
              </kbd>
            </motion.button>

            {/* Auth section */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/favorites"
                  className="flex items-center gap-1.5 text-sm text-stone hover:text-terracotta transition-colors"
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden lg:inline truncate max-w-20">{user.name}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-1.5 rounded text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="flex items-center gap-1.5 rounded-lg bg-terracotta/10 px-3 py-1.5 text-sm font-medium text-terracotta hover:bg-terracotta/20 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg text-stone hover:bg-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden border-t border-cream overflow-hidden"
            >
              <div className="py-3 space-y-0.5">
                {allLinks.map((link, i) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? "text-terracotta bg-terracotta/5"
                            : "text-stone hover:text-charcoal hover:bg-cream/60"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Auth */}
              <div className="border-t border-cream mt-2 pt-3">
                {user ? (
                  <div className="flex items-center justify-between px-3">
                    <span className="text-sm text-charcoal font-medium">{user.name}</span>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 mx-3 py-2.5 rounded-lg bg-terracotta/10 text-sm font-medium text-terracotta"
                  >
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export { Navbar };
