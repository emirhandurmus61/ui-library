"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface DonutSegment {
  value: number;
  label: string;
  color?: string;
}

export interface DonutChartProps {
  data: DonutSegment[];
  /** Outer radius in px (default 80) */
  radius?: number;
  /** Donut thickness in px (default 20) */
  thickness?: number;
  /** Center slot content */
  center?: React.ReactNode;
  /** Show legend (default true) */
  legend?: boolean;
  /** Value formatter for tooltip */
  formatValue?: (v: number, total: number) => string;
  className?: string;
}

/* ─── Default colors ─────────────────────────────────────────── */

const PALETTE = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#ec4899",
];

/* ─── SVG arc helper ─────────────────────────────────────────── */

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180);
  const start = { x: cx + r * Math.cos(toRad(startAngle)), y: cy + r * Math.sin(toRad(startAngle)) };
  const end   = { x: cx + r * Math.cos(toRad(endAngle)),   y: cy + r * Math.sin(toRad(endAngle)) };
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

/* ─── Component ──────────────────────────────────────────────── */

export function DonutChart({
  data,
  radius = 80,
  thickness = 20,
  center,
  legend = true,
  formatValue = (v, t) => `${Math.round((v / t) * 100)}%`,
  className,
}: DonutChartProps) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const size = radius * 2 + 8; // +8 for stroke overflow
  const cx = size / 2;
  const cy = size / 2;
  const innerR = radius - thickness;

  let cumAngle = 0;

  const segments = data.map((seg, i) => {
    const angle = (seg.value / total) * 360;
    const start = cumAngle;
    const end = cumAngle + angle - 0.5; // small gap
    cumAngle += angle;
    return { ...seg, start, end, angle, color: seg.color ?? PALETTE[i % PALETTE.length] };
  });

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {segments.map((seg, i) => {
            const isHovered = hoverIdx === i;
            const r = isHovered ? radius + 3 : radius;
            return (
              <path
                key={i}
                d={describeArc(cx, cy, (r + innerR) / 2, seg.start, seg.end)}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? thickness + 6 : thickness}
                strokeLinecap="round"
                style={{ transition: "stroke-width 150ms, r 150ms", cursor: "pointer" }}
                aria-label={`${seg.label}: ${formatValue(seg.value, total)}`}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
              />
            );
          })}
        </svg>

        {/* Center slot */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {hoverIdx !== null ? (
            <div className="text-center">
              <p className="text-xs font-semibold text-foreground">{segments[hoverIdx].label}</p>
              <p className="text-sm font-bold" style={{ color: segments[hoverIdx].color }}>
                {formatValue(segments[hoverIdx].value, total)}
              </p>
            </div>
          ) : center ? (
            center
          ) : (
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">{total.toLocaleString()}</p>
              <p className="text-[10px] text-foreground-muted">toplam</p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      {legend && (
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
          {segments.map((seg, i) => (
            <button
              key={i}
              type="button"
              className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
              {seg.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
