"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface TourStep {
  target: string;           // CSS selector
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right" | "center";
}

export interface TourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
  /** Spotlight cutout padding in px */
  padding?: number;
}

interface Rect { top: number; left: number; width: number; height: number }

const EMPTY_RECT: Rect = { top: 0, left: 0, width: 0, height: 0 };

/* ─── Placement arrow ────────────────────────────────────────── */

function Arrow({ placement }: { placement: TourStep["placement"] }) {
  if (placement === "center" || !placement) return null;
  const base = "absolute size-3 border-border";
  const map: Record<string, string> = {
    bottom: "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-l border-t rotate-45 bg-surface",
    top:    "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-r border-b rotate-45 bg-surface",
    right:  "left-0 top-1/2 -translate-y-1/2 -translate-x-full border-l border-b rotate-45 bg-surface",
    left:   "right-0 top-1/2 -translate-y-1/2 translate-x-full border-r border-t rotate-45 bg-surface",
  };
  return <span className={cn(base, map[placement])} aria-hidden="true" />;
}

/* ─── Tooltip positioning ─────────────────────────────────────── */

function getTooltipStyle(rect: Rect, placement: TourStep["placement"] = "bottom", padding = 12): React.CSSProperties {
  if (placement === "center") {
    return { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
  }
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const tooltipW = 300;
  const tooltipH = 200; // approx

  let top = 0, left = 0;

  switch (placement) {
    case "bottom":
      top  = rect.top + rect.height + padding;
      left = rect.left + rect.width / 2 - tooltipW / 2;
      break;
    case "top":
      top  = rect.top - tooltipH - padding;
      left = rect.left + rect.width / 2 - tooltipW / 2;
      break;
    case "right":
      top  = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.left + rect.width + padding;
      break;
    case "left":
      top  = rect.top + rect.height / 2 - tooltipH / 2;
      left = rect.left - tooltipW - padding;
      break;
  }

  // Clamp to viewport
  left = Math.max(8, Math.min(left, vw - tooltipW - 8));
  top  = Math.max(8, Math.min(top,  vh - tooltipH - 8));

  return { position: "fixed", top, left, width: tooltipW };
}

/* ─── Tour ───────────────────────────────────────────────────── */

export function Tour({ steps, isOpen, onClose, onComplete, padding = 8 }: TourProps) {
  const [current, setCurrent] = useState(0);
  const [rect, setRect] = useState<Rect>(EMPTY_RECT);
  const rafRef = useRef<number | null>(null);

  const step = steps[current];

  const measureTarget = useCallback(() => {
    if (!step) return;
    const el = step.placement === "center" ? null : document.querySelector(step.target);
    if (!el) { setRect(EMPTY_RECT); return; }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  useEffect(() => {
    if (!isOpen) return;
    measureTarget();
    const onResize = () => measureTarget();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
    };
  }, [isOpen, measureTarget]);

  useEffect(() => { if (isOpen) setCurrent(0); }, [isOpen]);

  if (!isOpen || !step) return null;

  const isLast    = current === steps.length - 1;
  const placement = step.placement ?? "bottom";
  const isCenter  = placement === "center";
  const p = padding;

  const spotTop    = rect.top    - p;
  const spotLeft   = rect.left   - p;
  const spotWidth  = rect.width  + p * 2;
  const spotHeight = rect.height + p * 2;

  const goNext = () => {
    if (isLast) { onComplete?.(); onClose(); }
    else setCurrent(c => c + 1);
  };
  const goPrev = () => setCurrent(c => Math.max(0, c - 1));

  return (
    <div className="fixed inset-0 z-[9999]" role="dialog" aria-modal="true" aria-label={step.title}>
      {/* Overlay with spotlight cutout */}
      {!isCenter && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <mask id="tour-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect
                x={spotLeft} y={spotTop}
                width={spotWidth} height={spotHeight}
                rx="8" fill="black"
              />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#tour-mask)" />
        </svg>
      )}
      {isCenter && <div className="absolute inset-0 bg-black/55" />}

      {/* Spotlight border ring */}
      {!isCenter && spotWidth > 0 && (
        <div
          className="absolute rounded-[8px] ring-2 ring-primary pointer-events-none"
          style={{ top: spotTop, left: spotLeft, width: spotWidth, height: spotHeight }}
          aria-hidden="true"
        />
      )}

      {/* Tooltip */}
      <div
        style={getTooltipStyle(rect, placement)}
        className="relative bg-surface border border-border rounded-[var(--radius-xl)] shadow-xl p-5 z-10"
      >
        <Arrow placement={placement} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-sm font-semibold text-foreground leading-snug">{step.title}</p>
          <button
            onClick={onClose}
            className="shrink-0 text-foreground-muted hover:text-foreground transition-colors p-0.5"
            aria-label="Turu kapat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <p className="text-sm text-foreground-muted leading-relaxed mb-4">{step.content}</p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          {/* Step dots */}
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <span key={i} className={cn("size-1.5 rounded-full transition-colors", i === current ? "bg-primary" : "bg-border")} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-subtle">{current + 1} / {steps.length}</span>
            {current > 0 && (
              <button
                onClick={goPrev}
                className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors"
              >
                Geri
              </button>
            )}
            <button
              onClick={goNext}
              className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              {isLast ? "Bitir" : "Sonraki"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
