"use client";

import { type ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-indigo/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-xl mx-4">
        <div className="flex items-center justify-between mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-charcoal font-serif">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-cream transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export { Modal, type ModalProps };
