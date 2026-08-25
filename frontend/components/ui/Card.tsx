import { type HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover = false, className = "", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-xl border border-border bg-card p-6 shadow-sm ${
          hover ? "transition-shadow duration-200 hover:shadow-md cursor-pointer" : ""
        } ${className}`}
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
