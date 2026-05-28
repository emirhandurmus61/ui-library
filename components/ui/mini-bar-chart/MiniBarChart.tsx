"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface MiniBarChartBar {
  value: number;
  label?: string;
  color?: string;
}

export interface MiniBarChartProps {
  data: (number | MiniBarChartBar)[];
  /** Width in px (default 120) */
  width?: number;
  /** Height in px (default 40) */
  height?: number;
  /** Bar gap in px (default 2) */
  gap?: number;
  /** Default bar color */
  color?: string;
  /** Highlight bar color on hover */
  highlightColor?: string;
  /** Show tooltip on hover */
  tooltip?: boolean;
  /** Value formatter */
  formatValue?: (v: number) => string;
  /** Bar border radius in px (default 2) */
  radius?: number;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function MiniBarChart({
  data,
  width = 120,
  height = 40,
  gap = 2,
  color,
  highlightColor,
  tooltip = true,
  formatValue = (v) => String(v),
  radius = 2,
  className,
}: MiniBarChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const bars: MiniBarChartBar[] = data.map((d) =>
    typeof d === "number" ? { value: d } : d
  );

  const max = Math.max(...bars.map((b) => b.value), 1);
  const barW = (width - gap * (bars.length - 1)) / bars.length;
  const defaultColor = color ?? "var(--color-primary)";
  const hColor = highlightColor ?? "var(--color-primary)";

  return (
    <span className={cn("relative inline-block", className)} style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {bars.map((bar, i) => {
          const barH = Math.max(2, (bar.value / max) * height);
          const x = i * (barW + gap);
          const y = height - barH;
          const isHovered = hoverIdx === i;
          const fill = bar.color ?? (isHovered ? hColor : defaultColor);

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={radius}
              ry={radius}
              fill={fill}
              fillOpacity={isHovered ? 1 : 0.75}
              style={{ transition: "fill-opacity 100ms" }}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && hoverIdx !== null && (() => {
        const bar = bars[hoverIdx];
        const x = hoverIdx * (barW + gap) + barW / 2;
        return (
          <span
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full -top-1 px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap bg-surface-overlay border border-border text-foreground shadow-sm"
            style={{ left: x }}
          >
            {bar.label ? `${bar.label}: ` : ""}{formatValue(bar.value)}
          </span>
        );
      })()}
    </span>
  );
}
