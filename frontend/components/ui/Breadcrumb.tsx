import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-charcoal transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export { Breadcrumb, type BreadcrumbProps, type BreadcrumbItem };
