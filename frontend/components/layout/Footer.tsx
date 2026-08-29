import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  explore: [
    { href: "/explore", label: "Explore India" },
    { href: "/timeline", label: "Historical Timeline" },
    { href: "/heritage", label: "Heritage Directory" },
    { href: "/ai", label: "Ask AI" },
  ],
  regions: [
    { href: "/explore", label: "Gujarat" },
    { href: "/explore", label: "Rajasthan" },
    { href: "/explore", label: "Punjab" },
    { href: "/explore", label: "Tamil Nadu" },
    { href: "/explore", label: "Maharashtra" },
    { href: "/explore", label: "Madhya Pradesh" },
  ],
  project: [
    { href: "/about", label: "About Dharohar AI" },
    { href: "/about", label: "Our Mission" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-border bg-indigo text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white text-xs font-bold tracking-wider">
                DA
              </div>
              <span className="font-display text-xl text-white">
                Dharohar<span className="text-terracotta-light ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              An AI-powered platform for discovering and exploring the cultural heritage of India — from ancient monuments to living traditions.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-xs font-semibold text-white/80 mb-3 uppercase tracking-wider">
              States
            </h4>
            <ul className="space-y-2">
              {footerLinks.regions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Dharohar AI. Preserving India&apos;s cultural heritage through technology.
          </p>
          <p className="text-xs text-white/40">
            Built for <span className="text-terracotta-light">India</span>, designed to scale worldwide.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
