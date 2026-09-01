"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface MediaItem {
  id: string;
  url: string;
  caption: string | null;
  alt_text: string | null;
  credit: string | null;
  type: string;
  is_primary: boolean;
}

interface GalleryLightboxProps {
  media: MediaItem[];
  initialIndex?: number;
  open: boolean;
  onClose: () => void;
  entityName: string;
}

/* ========================================
   Component
   ======================================== */

export function GalleryLightbox({
  media,
  initialIndex = 0,
  open,
  onClose,
  entityName,
}: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  // Reset index when opening
  useEffect(() => {
    if (open) setCurrentIndex(initialIndex);
  }, [open, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setCurrentIndex((i) => (i - 1 + media.length) % media.length);
      if (e.key === "ArrowRight") setCurrentIndex((i) => (i + 1) % media.length);
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, media.length, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % media.length);
    setImgError((prev) => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  }, [media.length, currentIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + media.length) % media.length);
    setImgError((prev) => {
      const next = { ...prev };
      delete next[currentIndex];
      return next;
    });
  }, [media.length, currentIndex]);

  // Touch swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  if (!open || media.length === 0) return null;

  const current = media[currentIndex];
  const hasMultiple = media.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-label={`Gallery for ${entityName}`}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <ImageIcon className="h-4 w-4 text-white/60 shrink-0" />
          <span className="text-sm text-white/80 truncate">
            {entityName}
          </span>
          {hasMultiple && (
            <span className="text-xs text-white/50 shrink-0">
              {currentIndex + 1} / {media.length}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden min-h-0"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous button */}
        {hasMultiple && (
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Image */}
        <div className="flex items-center justify-center w-full h-full px-12 sm:px-16 py-4">
          {imgError[currentIndex] ? (
            <div className="text-center text-white/50">
              <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Image unavailable</p>
            </div>
          ) : (
            <img
              src={current.url}
              alt={current.alt_text || `${entityName} - image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
              onError={() => setImgError((prev) => ({ ...prev, [currentIndex]: true }))}
            />
          )}
        </div>

        {/* Next button */}
        {hasMultiple && (
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>

      {/* Bottom info + thumbnails */}
      <div className="bg-black/80 shrink-0">
        {/* Caption/Credit */}
        {(current.caption || current.credit) && (
          <div className="px-4 pt-3 flex items-center justify-between text-xs text-white/60">
            {current.caption && <span>{current.caption}</span>}
            {current.credit && <span className="italic">Credit: {current.credit}</span>}
          </div>
        )}

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="px-4 py-3 overflow-x-auto">
            <div className="flex items-center gap-2 justify-center">
              {media.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setImgError((prev) => {
                      const next = { ...prev };
                      delete next[idx];
                      return next;
                    });
                  }}
                  className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex
                      ? "border-white shadow-lg scale-105"
                      : "border-white/20 opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  {imgError[idx] ? (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <ImageIcon className="h-3 w-3 text-white/40" />
                    </div>
                  ) : (
                    <img
                      src={m.url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => setImgError((prev) => ({ ...prev, [idx]: true }))}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
