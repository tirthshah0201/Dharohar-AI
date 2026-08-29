"use client";

import { motion } from "motion/react";

interface LoadingStateProps {
  message?: string;
  variant?: "spinner" | "skeleton";
  lines?: number;
}

export function LoadingState({
  message = "Loading...",
  variant = "spinner",
  lines = 3,
}: LoadingStateProps) {
  if (variant === "skeleton") {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="skeleton h-4 rounded"
            style={{ width: `${85 - i * 15}%` }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center gap-3 py-8"
    >
      <div className="flex gap-1">
        <span className="typing-dot h-2 w-2 rounded-full bg-terracotta" />
        <span className="typing-dot h-2 w-2 rounded-full bg-terracotta" />
        <span className="typing-dot h-2 w-2 rounded-full bg-terracotta" />
      </div>
      <span className="text-sm text-muted">{message}</span>
    </motion.div>
  );
}
