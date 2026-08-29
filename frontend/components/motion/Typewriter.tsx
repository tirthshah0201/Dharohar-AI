"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

interface TypewriterProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Typewriter({
  children,
  className = "",
  delay = 0,
}: TypewriterProps) {
  return (
    <motion.span
      initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
      animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordByWord?: boolean;
}

export function RevealText({
  text,
  className = "",
  delay = 0,
  wordByWord = false,
}: RevealTextProps) {
  if (wordByWord) {
    const words = text.split(" ");
    return (
      <span className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: delay + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`inline-block ${className}`}
    >
      {text}
    </motion.span>
  );
}
