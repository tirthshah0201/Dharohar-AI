"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function HoverCard({
  children,
  className = "",
  onClick,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`rounded-xl border border-border bg-card p-6 shadow-sm cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
