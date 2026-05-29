"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type PatternId =
  | "dots"
  | "grid"
  | "diagonal-lines"
  | "cross-hatch"
  | "hexagons"
  | "waves"
  | "triangles"
  | "zigzag"
  | "circuit"
  | "leaves"
  | "diamonds"
  | "topography";

export type PatternTheme =
  | "minimal"
  | "modern"
  | "sport"
  | "art"
  | "food"
  | "tech"
  | "nature"
  | "geometric";

export interface BackgroundPatternProps {
  /** SVG pattern variant */
  pattern?: PatternId;
  /** Colour preset that tints the pattern */
  theme?: PatternTheme;
  /** 0–1 opacity multiplier for the pattern layer */
  opacity?: number;
  /** Extra classes applied to the root wrapper */
  className?: string;
  children?: ReactNode;
}

/* ─── Theme colour map ───────────────────────────────────────── */

const THEME_COLORS: Record<PatternTheme, { stroke: string; fill: string; bg: string }> = {
  minimal:  { stroke: "#e5e7eb", fill: "#e5e7eb", bg: "transparent" },
  modern:   { stroke: "#6366f1", fill: "#6366f1", bg: "transparent" },
  sport:    { stroke: "#f59e0b", fill: "#f59e0b", bg: "transparent" },
  art:      { stroke: "#ec4899", fill: "#ec4899", bg: "transparent" },
  food:     { stroke: "#22c55e", fill: "#22c55e", bg: "transparent" },
  tech:     { stroke: "#06b6d4", fill: "#06b6d4", bg: "transparent" },
  nature:   { stroke: "#84cc16", fill: "#84cc16", bg: "transparent" },
  geometric:{ stroke: "#8b5cf6", fill: "#8b5cf6", bg: "transparent" },
};

/* ─── Pattern SVG definitions ────────────────────────────────── */

function patternDefs(id: string, pattern: PatternId, colors: { stroke: string; fill: string }) {
  const { stroke, fill } = colors;

  switch (pattern) {
    case "dots":
      return (
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill={fill} />
        </pattern>
      );

    case "grid":
      return (
        <pattern id={id} x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke={stroke} strokeWidth="0.5" />
        </pattern>
      );

    case "diagonal-lines":
      return (
        <pattern id={id} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="12" stroke={stroke} strokeWidth="1" />
        </pattern>
      );

    case "cross-hatch":
      return (
        <pattern id={id} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 16 16 M 16 0 L 0 16" stroke={stroke} strokeWidth="0.6" fill="none" />
        </pattern>
      );

    case "hexagons":
      return (
        <pattern id={id} x="0" y="0" width="28" height="32" patternUnits="userSpaceOnUse">
          <polygon points="14,2 26,9 26,23 14,30 2,23 2,9" fill="none" stroke={stroke} strokeWidth="0.8" />
          <polygon points="14,18 26,25 26,39 14,46 2,39 2,25" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      );

    case "waves":
      return (
        <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 C10 0, 20 20, 30 10 S 40 0, 40 10" fill="none" stroke={stroke} strokeWidth="1" />
        </pattern>
      );

    case "triangles":
      return (
        <pattern id={id} x="0" y="0" width="24" height="20" patternUnits="userSpaceOnUse">
          <polygon points="12,2 22,18 2,18" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      );

    case "zigzag":
      return (
        <pattern id={id} x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <polyline points="0,10 10,2 20,10 30,2 40,10" fill="none" stroke={stroke} strokeWidth="1.2" />
          <polyline points="0,18 10,10 20,18 30,10 40,18" fill="none" stroke={stroke} strokeWidth="1.2" />
        </pattern>
      );

    case "circuit":
      return (
        <pattern id={id} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 10 10 L 20 10 L 20 20 L 40 20" fill="none" stroke={stroke} strokeWidth="0.8" />
          <path d="M 0 30 L 20 30 L 20 40" fill="none" stroke={stroke} strokeWidth="0.8" />
          <circle cx="10" cy="10" r="2" fill={fill} />
          <circle cx="20" cy="20" r="2" fill={fill} />
          <circle cx="20" cy="30" r="2" fill={fill} />
        </pattern>
      );

    case "leaves":
      return (
        <pattern id={id} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M15 5 Q25 15 15 25 Q5 15 15 5" fill="none" stroke={stroke} strokeWidth="0.8" />
          <path d="M5 15 Q15 5 25 15" fill="none" stroke={stroke} strokeWidth="0.6" />
        </pattern>
      );

    case "diamonds":
      return (
        <pattern id={id} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke={stroke} strokeWidth="0.8" />
        </pattern>
      );

    case "topography":
      return (
        <pattern id={id} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 10 30 Q 20 10 30 30 Q 40 50 50 30" fill="none" stroke={stroke} strokeWidth="0.7" />
          <path d="M 0 40 Q 15 20 30 40 Q 45 60 60 40" fill="none" stroke={stroke} strokeWidth="0.7" />
          <path d="M 5 15 Q 20 0 35 15 Q 50 30 65 15" fill="none" stroke={stroke} strokeWidth="0.5" />
        </pattern>
      );

    default:
      return null;
  }
}

/* ─── Component ──────────────────────────────────────────────── */

let _counter = 0;

export function BackgroundPattern({
  pattern = "dots",
  theme = "minimal",
  opacity = 1,
  className,
  children,
}: BackgroundPatternProps) {
  // stable-enough id per render (not SSR-safe for hydration, but fine for decorative SVG)
  const uid = `bp-${pattern}-${theme}`;
  const colors = THEME_COLORS[theme];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Pattern layer */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>{patternDefs(uid, pattern, colors)}</defs>
        <rect width="100%" height="100%" fill={`url(#${uid})`} />
      </svg>

      {/* Content layer */}
      <div className="relative">{children}</div>
    </div>
  );
}
