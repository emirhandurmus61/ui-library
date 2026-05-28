"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Easing functions ───────────────────────────────────────── */

type Easing = "linear" | "ease-out" | "ease-in" | "ease-in-out";

function easingFn(t: number, easing: Easing): number {
  switch (easing) {
    case "linear":     return t;
    case "ease-in":    return t * t;
    case "ease-out":   return 1 - (1 - t) * (1 - t);
    case "ease-in-out":return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
}

/* ─── Hook ───────────────────────────────────────────────────── */

function useAnimatedCounter(to: number, from: number, duration: number, easing: Easing) {
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (prefersReduced.current) {
      setValue(to);
      return;
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easingFn(progress, easing);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [to, from, duration, easing]);

  return value;
}

/* ─── Props ──────────────────────────────────────────────────── */

export interface AnimatedCounterProps {
  /** Target value */
  to: number;
  /** Start value (default 0) */
  from?: number;
  /** Duration in ms (default 1200) */
  duration?: number;
  /** Easing (default "ease-out") */
  easing?: Easing;
  /** Prefix e.g. "$" */
  prefix?: string;
  /** Suffix e.g. "%" */
  suffix?: string;
  /** Locale for number formatting */
  locale?: string;
  /** Number of decimal places */
  decimals?: number;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1200,
  easing = "ease-out",
  prefix = "",
  suffix = "",
  locale,
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const value = useAnimatedCounter(to, from, duration, easing);

  const formatted = decimals > 0
    ? value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toLocaleString(locale);

  return (
    <span
      className={cn("tabular-nums", className)}
      aria-label={`${prefix}${to.toLocaleString(locale)}${suffix}`}
      aria-live="polite"
    >
      {prefix}{formatted}{suffix}
    </span>
  );
}
