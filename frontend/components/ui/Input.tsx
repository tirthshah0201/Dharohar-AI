import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-charcoal"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray transition-colors duration-200 focus:border-terracotta focus:outline-none focus:ring-1 focus:ring-terracotta/30 ${
            error ? "border-destructive" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
