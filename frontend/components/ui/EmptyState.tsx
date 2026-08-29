"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";
import { Inbox } from "lucide-react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-parchment mb-4">
        {icon || <Inbox className="h-6 w-6 text-muted" />}
      </div>
      <h3 className="text-base font-semibold text-charcoal">{title}</h3>
      <p className="text-sm text-muted mt-1 max-w-sm">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
