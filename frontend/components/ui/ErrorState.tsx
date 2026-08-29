"use client";

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import { type ReactNode } from "react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  action?: ReactNode;
  onRetry?: () => void | Promise<void>;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  action,
  onRetry,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 mb-4">
        <AlertTriangle className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="text-base font-semibold text-charcoal">{title}</h3>
      <p className="text-sm text-muted mt-1 max-w-sm">{message}</p>
      {onRetry && !action && (
        <div className="mt-4">
          <Button variant="outline" size="sm" onClick={onRetry}>
            Try Again
          </Button>
        </div>
      )}
      {action && <div className="mt-4">{action}</div>}
    </motion.div>
  );
}
