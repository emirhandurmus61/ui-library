"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type ScrollProgressVariant =
  | "bar-top"
  | "bar-bottom"
  | "circular"
  | "dots"
  | "radial";

export interface ScrollProgressProps {
  variant?: ScrollProgressVariant;
  color?: string;
  trackColor?: string;
  thickness?: number;
  size?: number;
  showPercent?: boolean;
  /** bar-top/bottom: fixed to viewport. inline: positioned relative to container */
  fixed?: boolean;
  /** Element to track instead of the window */
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/* ─── Hook ───────────────────────────────────────────────────── */

function useScrollProgress(containerRef?: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getProgress = () => {
      if (containerRef?.current) {
        const el = containerRef.current;
        const scrolled = el.scrollTop;
        const total = el.scrollHeight - el.clientHeight;
        return total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      }
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      return total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    };

    const handler = () => setProgress(getProgress());
    const el = containerRef?.current;
    const target: Window | HTMLElement = (el && typeof el.addEventListener === "function") ? el : window;
    target.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => target.removeEventListener("scroll", handler);
  }, [containerRef]);

  return progress;
}

/* ─── Bar (top / bottom) ─────────────────────────────────────── */

function BarProgress({
  progress,
  variant,
  color = "hsl(var(--primary))",
  trackColor,
  thickness = 3,
  fixed,
  className,
}: ScrollProgressProps & { progress: number }) {
  const isTop = variant === "bar-top";
  return (
    <div
      className={cn(
        "z-[9999] left-0 right-0",
        fixed ? (isTop ? "fixed top-0" : "fixed bottom-0") : (isTop ? "absolute top-0" : "absolute bottom-0"),
        className
      )}
      style={{ height: thickness, background: trackColor ?? "transparent" }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sayfa ilerleme"
    >
      <div
        className="h-full transition-[width] duration-100 ease-linear"
        style={{ width: `${progress}%`, background: color }}
      />
    </div>
  );
}

/* ─── Circular ───────────────────────────────────────────────── */

function CircularProgress({
  progress,
  color = "hsl(var(--primary))",
  trackColor,
  size = 44,
  showPercent = false,
  fixed,
  className,
}: ScrollProgressProps & { progress: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - progress / 100);

  return (
    <div
      className={cn(fixed && "fixed bottom-6 right-6 z-[9999]", className)}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sayfa ilerleme"
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor ?? "var(--color-border)"} strokeWidth="3.5" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-100 ease-linear"
        />
      </svg>
      {showPercent && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-foreground rotate-0">
          {Math.round(progress)}
        </span>
      )}
    </div>
  );
}

/* ─── Dots ───────────────────────────────────────────────────── */

function DotsProgress({
  progress,
  color = "hsl(var(--primary))",
  fixed,
  className,
}: ScrollProgressProps & { progress: number }) {
  const total = 10;
  const filled = Math.round((progress / 100) * total);

  return (
    <div
      className={cn("flex gap-1", fixed && "fixed bottom-6 right-6 z-[9999]", className)}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Sayfa ilerleme"
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="size-2 rounded-full transition-colors duration-200"
          style={{ background: i < filled ? color : "var(--color-border)" }}
        />
      ))}
    </div>
  );
}

/* ─── Radial (large overlay) ─────────────────────────────────── */

function RadialProgress({
  progress,
  color = "hsl(var(--primary))",
  size = 64,
  showPercent = true,
  fixed,
  className,
}: ScrollProgressProps & { progress: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - progress / 100);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        fixed && "fixed bottom-6 right-6 z-[9999]",
        className
      )}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--color-border)" strokeWidth="5" />
        <circle
          cx={size/2} cy={size/2} r={r}
          fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={dash}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-100 ease-linear"
        />
      </svg>
      {showPercent && (
        <span className="relative text-xs font-bold text-foreground tabular-nums">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
}

/* ─── ScrollProgress ─────────────────────────────────────────── */

export function ScrollProgress({
  variant = "bar-top",
  containerRef,
  ...props
}: ScrollProgressProps) {
  const progress = useScrollProgress(containerRef);

  if (variant === "bar-top" || variant === "bar-bottom") {
    return <BarProgress progress={progress} variant={variant} fixed={props.fixed ?? true} {...props} />;
  }
  if (variant === "circular") return <CircularProgress progress={progress} fixed={props.fixed ?? false} {...props} />;
  if (variant === "dots")     return <DotsProgress     progress={progress} fixed={props.fixed ?? false} {...props} />;
  if (variant === "radial")   return <RadialProgress   progress={progress} fixed={props.fixed ?? false} {...props} />;
  return null;
}
