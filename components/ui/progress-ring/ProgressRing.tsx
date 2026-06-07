"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ProgressRingProps {
  /** Current value (0–max) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Ring size in px (default 80) */
  size?: number;
  /** Ring stroke thickness (default 8) */
  thickness?: number;
  /** Ring color (default --color-primary) */
  color?: string;
  /** Track color (default --border) */
  trackColor?: string;
  /** Animate on mount (default true) */
  animate?: boolean;
  /** Custom center content — overrides default percentage label */
  center?: React.ReactNode;
  /** Value formatter for default label (default: "X%") */
  formatValue?: (value: number, max: number) => string;
  /** Stroke linecap style (default "round") */
  linecap?: "round" | "butt" | "square";
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function ProgressRing({
  value,
  max = 100,
  size = 80,
  thickness = 8,
  color = "var(--color-primary)",
  trackColor = "var(--border)",
  animate = true,
  center,
  formatValue = (v, m) => `${Math.round((v / m) * 100)}%`,
  linecap = "round",
  className,
}: ProgressRingProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : value);

  useEffect(() => {
    if (!animate) { setDisplayed(value); return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setDisplayed(value); return; }

    const duration = 700;
    const start = performance.now();
    const from = 0;
    const to = Math.min(Math.max(value, 0), max);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(from + (to - from) * ease);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, max, animate]);

  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(Math.max(displayed / max, 0), 1);
  const dash = Math.round((pct * circumference) * 1e4) / 1e4;
  const cx = size / 2;

  return (
    <div className={cn("inline-flex items-center justify-center relative", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        {/* Track */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={trackColor}
          strokeWidth={thickness}
        />
        {/* Progress */}
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap={linecap}
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: animate ? "stroke-dasharray 50ms linear" : undefined }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {center ?? (
          <span className="text-xs font-bold text-foreground" style={{ fontSize: Math.max(10, size * 0.18) }}>
            {formatValue(Math.round(displayed), max)}
          </span>
        )}
      </div>
    </div>
  );
}
