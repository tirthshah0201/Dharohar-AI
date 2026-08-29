"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  delay?: number;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = "", children, delay = 0, ...props }, ref) => {
    if (hover) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(45,42,38,0.1)" }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`rounded-xl border border-border bg-card p-6 shadow-sm cursor-pointer transition-colors ${className}`}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={`rounded-xl border border-border bg-card p-6 shadow-sm ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-lg font-semibold text-charcoal font-serif ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-sm text-muted mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

function CardContent({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, type CardProps };
