"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import { Search } from "lucide-react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className = "", onSearch, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          ref={ref}
          type="search"
          className={`w-full rounded-lg border border-border bg-white pl-10 pr-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray transition-colors duration-200 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30 ${className}`}
          onChange={(e) => onSearch?.(e.target.value)}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput, type SearchInputProps };
