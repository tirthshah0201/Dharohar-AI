import { type HTMLAttributes } from "react";

interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

function SectionHeading({
  title,
  subtitle,
  align = "left",
  className = "",
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-8 ${align === "center" ? "text-center" : ""} ${className}`}
      {...props}
    >
      <h2 className="font-display text-3xl text-charcoal sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { SectionHeading, type SectionHeadingProps };
