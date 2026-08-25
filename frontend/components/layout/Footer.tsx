import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  explore: [
    { href: "/explore", label: "Explore Gujarat" },
    { href: "/timeline", label: "Historical Timeline" },
    { href: "/heritage", label: "Heritage Directory" },
    { href: "/ai", label: "Ask AI" },
  ],
  about: [
    { href: "/about", label: "About Dharohar AI" },
    { href: "/about#team", label: "Our Mission" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-border bg-parchment mt-auto">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo text-white text-xs font-bold tracking-wider">
                DA
              </div>
              <span className="font-display text-xl text-charcoal">
                Dharohar<span className="text-terracotta ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              An intelligent platform for discovering and exploring the rich cultural heritage of Gujarat through AI-powered insights and interactive exploration.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="text-sm font-semibold text-charcoal mb-3 uppercase tracking-wider">
              Project
            </h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-charcoal transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Dharohar AI. An initiative for preserving cultural heritage.
          </p>
          <p className="text-xs text-muted">
            Built for <span className="text-terracotta">Gujarat</span>, scalable to all of India.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
