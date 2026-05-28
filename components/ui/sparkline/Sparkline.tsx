"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SparklineProps {
  /** Data values */
  data: number[];
  /** Width in px (default 120) */
  width?: number;
  /** Height in px (default 40) */
  height?: number;
  /** Positive trend color (default var(--color-success)) */
  positiveColor?: string;
  /** Negative trend color (default var(--color-danger)) */
  negativeColor?: string;
  /** Stroke width (default 1.5) */
  strokeWidth?: number;
  /** Show filled area under line */
  filled?: boolean;
  /** Show hover dot + tooltip */
  tooltip?: boolean;
  /** Tooltip value formatter */
  formatValue?: (v: number) => string;
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */

function normalize(data: number[], w: number, h: number, pad = 2) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  return data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - ((v - min) / range) * (h - pad * 2),
  }));
}

/* ─── Component ──────────────────────────────────────────────── */

export function Sparkline({
  data,
  width = 120,
  height = 40,
  positiveColor,
  negativeColor,
  strokeWidth = 1.5,
  filled = true,
  tooltip = true,
  formatValue = (v) => String(v),
  className,
}: SparklineProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (data.length < 2) return null;

  const isPositive = data[data.length - 1] >= data[0];
  const strokeColor = isPositive
    ? (positiveColor ?? "var(--color-success)")
    : (negativeColor ?? "var(--color-danger)");

  const pts = normalize(data, width, height);
  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPath = `M${pts[0].x},${height} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${height} Z`;

  const hovered = hoverIdx !== null ? pts[hoverIdx] : null;

  return (
    <span className={cn("relative inline-block", className)} style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
      >
        {/* Fill */}
        {filled && (
          <path
            d={fillPath}
            fill={strokeColor}
            fillOpacity={0.12}
          />
        )}

        {/* Line */}
        <polyline
          points={polyline}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Hover dot */}
        {hovered && (
          <circle
            cx={hovered.x}
            cy={hovered.y}
            r={3}
            fill={strokeColor}
            stroke="var(--color-surface)"
            strokeWidth={1.5}
          />
        )}

        {/* Invisible hit areas */}
        {tooltip && pts.map((p, i) => {
          const slotW = width / data.length;
          return (
            <rect
              key={i}
              x={p.x - slotW / 2}
              y={0}
              width={slotW}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && hovered && hoverIdx !== null && (
        <span
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -top-1 px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap bg-surface-overlay border border-border text-foreground shadow-sm"
          style={{ left: hovered.x }}
        >
          {formatValue(data[hoverIdx])}
        </span>
      )}
    </span>
  );
}
