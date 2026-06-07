"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface RadarChartDataset {
  label: string;
  data: number[];
  color?: string;
  fillOpacity?: number;
}

export interface RadarChartProps {
  /** Axis labels (one per spoke) */
  axes: string[];
  datasets: RadarChartDataset[];
  /** Outer radius in px (default 100) */
  radius?: number;
  /** Number of concentric rings (default 4) */
  rings?: number;
  /** Min value (default 0) */
  min?: number;
  /** Max value (default 100) */
  max?: number;
  formatValue?: (v: number) => string;
  className?: string;
}

/* ─── Palette ────────────────────────────────────────────────── */

const PALETTE = [
  "var(--color-primary)",
  "var(--color-success)",
  "var(--color-warning)",
  "var(--color-danger)",
  "#8b5cf6",
];

const fmt = (n: number) => Math.round(n * 1e4) / 1e4;

function polarToXY(angle: number, r: number, cx: number, cy: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: fmt(cx + r * Math.cos(rad)), y: fmt(cy + r * Math.sin(rad)) };
}

/* ─── Component ──────────────────────────────────────────────── */

export function RadarChart({
  axes,
  datasets,
  radius = 100,
  rings = 4,
  min = 0,
  max = 100,
  formatValue = (v) => String(v),
  className,
}: RadarChartProps) {
  const [hoverDs, setHoverDs] = useState<number | null>(null);

  const n = axes.length;
  const size = (radius + 32) * 2;
  const cx = size / 2;
  const cy = size / 2;
  const range = max - min || 1;

  const angleStep = 360 / n;

  const spokePoints = axes.map((_, i) => polarToXY(i * angleStep, radius, cx, cy));

  const ringPaths = Array.from({ length: rings }, (_, ri) => {
    const r = (radius / rings) * (ri + 1);
    const pts = axes.map((_, i) => polarToXY(i * angleStep, r, cx, cy));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  const dsPolygons = datasets.map((ds) =>
    ds.data.map((v, i) => {
      const r = ((Math.min(Math.max(v, min), max) - min) / range) * radius;
      return polarToXY(i * angleStep, r, cx, cy);
    })
  );

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label="Radar chart">
        {/* Rings */}
        {ringPaths.map((d, ri) => (
          <path key={ri} d={d} fill="none" stroke="var(--border)" strokeWidth={1} />
        ))}

        {/* Spokes */}
        {spokePoints.map((pt, i) => (
          <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="var(--border)" strokeWidth={1} />
        ))}

        {/* Ring value labels (on first spoke) */}
        {Array.from({ length: rings }, (_, ri) => {
          const r = (radius / rings) * (ri + 1);
          const pt = polarToXY(0, r, cx, cy);
          const v = min + (range / rings) * (ri + 1);
          return (
            <text key={ri} x={pt.x + 3} y={pt.y - 2} fontSize={8} fill="var(--foreground-subtle)">
              {formatValue(v)}
            </text>
          );
        })}

        {/* Datasets */}
        {datasets.map((ds, di) => {
          const color = ds.color ?? PALETTE[di % PALETTE.length];
          const pts = dsPolygons[di];
          const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          const isHovered = hoverDs === di;
          return (
            <g
              key={di}
              onMouseEnter={() => setHoverDs(di)}
              onMouseLeave={() => setHoverDs(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={pathD}
                fill={color}
                fillOpacity={isHovered ? (ds.fillOpacity ?? 0.2) * 1.8 : (ds.fillOpacity ?? 0.15)}
                stroke={color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                style={{ transition: "fill-opacity 150ms, stroke-width 150ms" }}
              />
              {pts.map((pt, pi) => (
                <circle key={pi} cx={pt.x} cy={pt.y} r={isHovered ? 4 : 3} fill={color} stroke="var(--surface)" strokeWidth={1.5} />
              ))}
            </g>
          );
        })}

        {/* Axis labels */}
        {axes.map((lbl, i) => {
          const pt = polarToXY(i * angleStep, radius + 20, cx, cy);
          const anchor = pt.x < cx - 4 ? "end" : pt.x > cx + 4 ? "start" : "middle";
          return (
            <text key={i} x={pt.x} y={pt.y} textAnchor={anchor} dominantBaseline="middle" fontSize={11} fill="var(--foreground-muted)" fontWeight={500}>
              {lbl}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      {datasets.length > 1 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {datasets.map((ds, di) => (
            <button
              key={di}
              type="button"
              className="flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
              onMouseEnter={() => setHoverDs(di)}
              onMouseLeave={() => setHoverDs(null)}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: ds.color ?? PALETTE[di % PALETTE.length] }} />
              {ds.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
