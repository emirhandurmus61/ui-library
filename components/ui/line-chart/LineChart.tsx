"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface LineChartDataset {
  label: string;
  data: (number | null)[];
  color?: string;
  /** Dashed line (default false) */
  dashed?: boolean;
  /** Show area fill (default false) */
  filled?: boolean;
  fillOpacity?: number;
  strokeWidth?: number;
}

export interface LineChartProps {
  labels: string[];
  datasets: LineChartDataset[];
  width?: number;
  height?: number;
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  grid?: boolean;
  gridLines?: number;
  /** Show dots at data points (default true) */
  dots?: boolean;
  /** Smooth curves (default true) */
  smooth?: boolean;
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
  "#06b6d4",
  "#f97316",
  "#ec4899",
];

const fmt = (n: number) => Math.round(n * 1e6) / 1e6;

/* ─── Smooth path ────────────────────────────────────────────── */

function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  let d = `M ${fmt(points[0].x)} ${fmt(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = fmt((prev.x + curr.x) / 2);
    d += ` C ${cpX} ${fmt(prev.y)} ${cpX} ${fmt(curr.y)} ${fmt(curr.x)} ${fmt(curr.y)}`;
  }
  return d;
}

function linearPath(points: { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${fmt(p.x)} ${fmt(p.y)}`).join(" ");
}

/* ─── Component ──────────────────────────────────────────────── */

export function LineChart({
  labels,
  datasets,
  width = 480,
  height = 220,
  padding: p = {},
  grid = true,
  gridLines = 4,
  dots = true,
  smooth = true,
  formatValue = (v) => v.toLocaleString(),
  className,
}: LineChartProps) {
  const [hoverX, setHoverX] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; items: { label: string; value: number | null; color: string }[] } | null>(null);

  const pad = { top: p.top ?? 20, right: p.right ?? 16, bottom: p.bottom ?? 36, left: p.left ?? 44 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  const allValues = datasets.flatMap((d) => d.data.filter((v): v is number => v !== null));
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(0, ...allValues);
  const range = maxVal - minVal || 1;

  const n = labels.length;
  const xStep = n > 1 ? W / (n - 1) : W;

  const toX = (i: number) => fmt(i * xStep);
  const toY = (v: number) => fmt(H - ((v - minVal) / range) * H);

  const gridVals = Array.from({ length: gridLines + 1 }, (_, i) => ({
    v: minVal + (range / gridLines) * i,
    y: toY(minVal + (range / gridLines) * i),
  }));

  const dsPoints = datasets.map((ds) =>
    ds.data.map((v, i) => (v !== null ? { x: toX(i), y: toY(v), v } : null))
  );

  return (
    <div className={cn("relative inline-block", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onMouseLeave={() => { setTooltip(null); setHoverX(null); }}
        aria-label="Line chart"
      >
        <defs>
          {datasets.map((ds, di) => {
            const color = ds.color ?? PALETTE[di % PALETTE.length];
            return (
              <linearGradient key={di} id={`lc-fill-${di}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={ds.fillOpacity ?? 0.18} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            );
          })}
        </defs>

        <g transform={`translate(${pad.left},${pad.top})`}>
          {/* Grid */}
          {grid && gridVals.map(({ v, y }, i) => (
            <g key={i}>
              <line x1={0} y1={y} x2={W} y2={y} stroke="var(--border)" strokeWidth={1} strokeDasharray={i === 0 ? "none" : "3 3"} />
              <text x={-6} y={y} textAnchor="end" dominantBaseline="middle" fill="var(--foreground-muted)" fontSize={10}>
                {formatValue(v)}
              </text>
            </g>
          ))}

          {/* X labels */}
          {labels.map((lbl, i) => (
            <text key={i} x={toX(i)} y={H + 18} textAnchor="middle" fill="var(--foreground-muted)" fontSize={10}>
              {lbl}
            </text>
          ))}

          {/* Hover column */}
          {hoverX !== null && (
            <line x1={hoverX} y1={0} x2={hoverX} y2={H} stroke="var(--border-strong)" strokeWidth={1} strokeDasharray="4 2" />
          )}

          {/* Lines & fills */}
          {datasets.map((ds, di) => {
            const color = ds.color ?? PALETTE[di % PALETTE.length];
            const pts = dsPoints[di].filter((p): p is { x: number; y: number; v: number } => p !== null);
            if (pts.length < 2) return null;
            const pathD = smooth ? smoothPath(pts) : linearPath(pts);
            const fillD = `${pathD} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;
            return (
              <g key={di}>
                {ds.filled && <path d={fillD} fill={`url(#lc-fill-${di})`} />}
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth={ds.strokeWidth ?? 2}
                  strokeDasharray={ds.dashed ? "6 3" : undefined}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {dots && pts.map((pt, pi) => (
                  <circle key={pi} cx={pt.x} cy={pt.y} r={3} fill={color} stroke="var(--surface)" strokeWidth={1.5} />
                ))}
              </g>
            );
          })}

          {/* Hover capture overlay */}
          {labels.map((lbl, i) => {
            const x = toX(i);
            const halfStep = xStep / 2;
            return (
              <rect
                key={i}
                x={Math.max(0, x - halfStep)}
                y={0}
                width={i === 0 || i === n - 1 ? halfStep : xStep}
                height={H}
                fill="transparent"
                onMouseEnter={() => {
                  setHoverX(x);
                  const items = datasets.map((ds, di) => ({
                    label: ds.label,
                    value: ds.data[i] ?? null,
                    color: ds.color ?? PALETTE[di % PALETTE.length],
                  }));
                  const yVals = items.filter(it => it.value !== null).map(it => toY(it.value as number));
                  const avgY = yVals.length ? yVals.reduce((a, b) => a + b) / yVals.length : H / 2;
                  setTooltip({ x: x + pad.left, y: avgY + pad.top - 8, label: lbl, items });
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-[var(--radius-md)] border border-border bg-surface-overlay shadow-md px-3 py-2 text-xs min-w-[120px]"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          <p className="font-semibold text-foreground mb-1">{tooltip.label}</p>
          {tooltip.items.map((it) => (
            <div key={it.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: it.color }} />
              <span className="text-foreground-muted">{it.label}:</span>
              <span className="font-medium text-foreground">{it.value !== null ? formatValue(it.value) : "—"}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {datasets.length > 1 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
          {datasets.map((ds, di) => (
            <div key={di} className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <span
                className="inline-block shrink-0"
                style={{
                  width: 16, height: 2,
                  background: ds.color ?? PALETTE[di % PALETTE.length],
                  borderRadius: 1,
                  borderTop: ds.dashed ? `2px dashed ${ds.color ?? PALETTE[di % PALETTE.length]}` : undefined,
                }}
              />
              {ds.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
