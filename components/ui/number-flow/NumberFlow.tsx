"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Inject keyframes once ──────────────────────────────────── */

const NF_STYLE_ID = "nf-keyframes";

function useNumberFlowKeyframes() {
  useEffect(() => {
    if (document.getElementById(NF_STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = NF_STYLE_ID;
    el.textContent = `
      @keyframes nf-slide-out {
        from { transform: translateY(0);     opacity: 1; }
        to   { transform: translateY(-100%); opacity: 0; }
      }
      @keyframes nf-slide-in {
        from { transform: translateY(100%);  opacity: 0; }
        to   { transform: translateY(0);     opacity: 1; }
      }
    `;
    document.head.appendChild(el);
  }, []);
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface NumberFlowProps {
  value: number;
  /** Locale for number formatting */
  locale?: string;
  /** Number of decimal places (default 0) */
  decimals?: number;
  /** Prefix e.g. "$" */
  prefix?: string;
  /** Suffix e.g. "%" */
  suffix?: string;
  /** Animation duration per digit in ms (default 400) */
  duration?: number;
  className?: string;
}

/* ─── Single rolling digit ───────────────────────────────────── */

function RollingDigit({ digit, duration }: { digit: string; duration: number }) {
  const [current, setCurrent] = useState(digit);
  const [prev, setPrev] = useState(digit);
  const [animating, setAnimating] = useState(false);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (digit === current) return;
    if (prefersReduced.current) { setCurrent(digit); return; }

    setPrev(current);
    setCurrent(digit);
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), duration);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digit]);

  // Non-numeric characters (comma, dot, space) don't animate
  if (!/\d/.test(digit)) {
    return <span>{digit}</span>;
  }

  return (
    <span className="inline-block overflow-hidden relative" style={{ height: "1.2em", verticalAlign: "bottom" }}>
      {animating ? (
        <>
          {/* outgoing — slides up */}
          <span
            className="absolute inset-x-0 top-0"
            style={{ animationName: "nf-slide-out", animationDuration: `${duration}ms`, animationTimingFunction: "ease", animationFillMode: "forwards" }}
          >
            {prev}
          </span>
          {/* incoming — slides in from bottom */}
          <span
            className="absolute inset-x-0 top-0"
            style={{ animationName: "nf-slide-in", animationDuration: `${duration}ms`, animationTimingFunction: "ease", animationFillMode: "forwards" }}
          >
            {current}
          </span>
        </>
      ) : (
        <span>{current}</span>
      )}
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function NumberFlow({
  value,
  locale,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 400,
  className,
}: NumberFlowProps) {
  useNumberFlowKeyframes();

  const formatted = decimals > 0
    ? value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value.toLocaleString(locale);

  const chars = formatted.split("");

  return (
    <span
      className={cn("inline-flex tabular-nums items-end", className)}
      aria-label={`${prefix}${formatted}${suffix}`}
      aria-live="polite"
    >
      {prefix && <span>{prefix}</span>}
      {chars.map((ch, i) => (
        <RollingDigit key={i} digit={ch} duration={duration} />
      ))}
      {suffix && <span>{suffix}</span>}
    </span>
  );
}
