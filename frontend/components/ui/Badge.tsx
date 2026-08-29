import { type HTMLAttributes } from "react";

type BadgeVariant = "default" | "secondary" | "accent" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-terracotta/10 text-terracotta",
  secondary: "bg-terracotta-mist text-stone",
  accent: "bg-heritage-gold/10 text-heritage-gold",
  outline: "bg-transparent border border-border text-muted",
};

function Badge({ variant = "default", className = "", children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeVariant };
