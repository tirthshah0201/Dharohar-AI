import Link from "next/link";
import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";

const footerLinks = {
  explore: [
    { href: "/explore", label: "Explore India" },
    { href: "/timeline", label: "Historical Timeline" },
    { href: "/heritage", label: "Heritage Directory" },
    { href: "/ai", label: "Ask Heritage Atlas" },
  ],
  regions: [
    { href: "/explore?state=Gujarat", label: "Gujarat" },
    { href: "/explore?state=Rajasthan", label: "Rajasthan" },
    { href: "/explore?state=Punjab", label: "Punjab" },
    { href: "/explore?state=Tamil%20Nadu", label: "Tamil Nadu" },
    { href: "/explore?state=Maharashtra", label: "Maharashtra" },
    { href: "/explore?state=Madhya%20Pradesh", label: "Madhya Pradesh" },
  ],
  project: [
    { href: "/about", label: "About Heritage Atlas" },
    { href: "/about", label: "Our Mission" },
  ],
};

function Footer() {
  return (
    <footer className="border-t border-cream bg-deep-brown text-white">
      <Container>
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-terracotta text-white">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <span className="font-display text-xl text-white">
                Heritage<span className="text-terracotta-light ml-0.5">Atlas</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
              An interactive digital platform for discovering India&apos;s cultural heritage — from ancient monuments to living traditions.
            </p>
            <p className="text-xs text-terracotta-light mt-3 font-medium">
              Explore India. Discover Its Stories.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold text-white/70 mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-terracotta-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-xs font-semibold text-white/70 mb-3 uppercase tracking-wider">
              States
            </h4>
            <ul className="space-y-2">
              {footerLinks.regions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-terracotta-light transition-colors"
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
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Heritage Atlas. Preserving India&apos;s cultural heritage through technology.
          </p>
          <p className="text-xs text-white/30">
            Built for <span className="text-terracotta-light">India</span>, designed to scale worldwide.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { Footer };
