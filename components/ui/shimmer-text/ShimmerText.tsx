"use client";

import { useId, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ShimmerTextProps {
  children: React.ReactNode;
  /** Shimmer color (CSS gradient stop) — default uses primary */
  shimmerColor?: string;
  /** Base text color */
  baseColor?: string;
  /** Speed in seconds for one full sweep (default 2.5) */
  speed?: number;
  /** Shimmer width percentage (default 30) */
  shimmerWidth?: number;
  className?: string;
  as?: React.ElementType;
}

/* ─── Component ──────────────────────────────────────────────── */

export function ShimmerText({
  children,
  shimmerColor = "rgba(255,255,255,0.75)",
  baseColor,
  speed = 2.5,
  shimmerWidth = 30,
  className,
  as: Tag = "span",
}: ShimmerTextProps) {
  // useId is stable across SSR and client — safe for className
  const rawId = useId();
  // Replace special chars so it's a valid CSS class name
  const id = "shimmer-" + rawId.replace(/[^a-zA-Z0-9-_]/g, "");

  const gradient = baseColor
    ? `linear-gradient(90deg, ${baseColor} 0%, ${baseColor} ${(100 - shimmerWidth) / 2}%, ${shimmerColor} 50%, ${baseColor} ${(100 + shimmerWidth) / 2}%, ${baseColor} 100%)`
    : undefined;

  // Inject keyframe + class rule via a <style> element in useEffect
  // so it never causes SSR/hydration mismatches.
  useEffect(() => {
    const styleId = `${id}-style`;
    if (document.getElementById(styleId)) return;

    const el = document.createElement("style");
    el.id = styleId;
    el.textContent = `
      @media (prefers-reduced-motion: no-preference) {
        .${id} {
          background-size: 200% auto;
          animation: shimmer-sweep-${id} ${speed}s linear infinite;
        }
      }
      @keyframes shimmer-sweep-${id} {
        from { background-position: -200% center; }
        to   { background-position:  200% center; }
      }
    `;
    document.head.appendChild(el);

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, [id, speed]);

  return (
    <Tag
      className={cn(
        id,
        "inline-block bg-clip-text text-transparent",
        !gradient && [
          "bg-[linear-gradient(90deg,var(--color-foreground)_0%,var(--color-foreground)_35%,var(--color-primary)_50%,var(--color-foreground)_65%,var(--color-foreground)_100%)]",
        ],
        className
      )}
      style={gradient ? { backgroundImage: gradient } : undefined}
    >
      {children}
    </Tag>
  );
}
