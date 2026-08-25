import { type HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide";
}

function Container({ size = "default", className = "", children, ...props }: ContainerProps) {
  const sizeStyles = {
    narrow: "max-w-4xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };

  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container, type ContainerProps };
