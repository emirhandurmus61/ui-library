"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface BarChartBar {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface BarChartProps {
  /** X-axis labels */
  labels: string[];
  /** Single dataset (simple) or multiple datasets (grouped) */
  datasets: BarChartDataset[];
  width?: number;
  height?: number;
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Show horizontal grid lines (default true) */
  grid?: boolean;
  /** Number of grid lines (default 4) */
  gridLines?: number;
  /** Show values on top of bars (default false) */
  showValues?: boolean;
  /** Horizontal bars instead of vertical (default false) */
  horizontal?: boolean;
  /** Bar border radius (default 4) */
  radius?: number;
  /** Value formatter */
  formatValue?: (v: number) => string;
  className?: string;
}

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

const fmt3 = (n: number) => Math.round(n * 1000) / 1000;

/* ─── Component ──────────────────────────────────────────────── */

export function BarChart({
  labels,
  datasets,
  width = 480,
  height = 220,
  padding: p = {},
  grid = true,
  gridLines = 4,
  showValues = false,
  horizontal = false,
  radius = 4,
  formatValue = (v) => v.toLocaleString(),
  className,
}: BarChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; items: { label: string; value: number; color: string }[] } | null>(null);
  const uid = useId();

  const pad = { top: p.top ?? 20, right: p.right ?? 16, bottom: p.bottom ?? 36, left: p.left ?? 44 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;

  const allValues = datasets.flatMap((d) => d.data);
  const maxVal = Math.max(...allValues, 1);
  const minVal = Math.min(0, ...allValues);
  const range = maxVal - minVal || 1;

  const groupCount = labels.length;
  const dsCount = datasets.length;
  const groupWidth = W / groupCount;
  const barGap = 2;
  const barWidth = Math.max(4, (groupWidth - barGap * (dsCount + 1)) / dsCount);

  const toY = (v: number) => fmt3(H - ((v - minVal) / range) * H);
  const zeroY = toY(0);

  // Grid values
  const gridVals = Array.from({ length: gridLines + 1 }, (_, i) => {
    const v = minVal + (range / gridLines) * i;
    return { v, y: toY(v) };
  });

  return (
    <div className={cn("relative inline-block", className)}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        onMouseLeave={() => setTooltip(null)}
        aria-label="Bar chart"
      >
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

          {/* Zero line */}
          {minVal < 0 && (
            <line x1={0} y1={zeroY} x2={W} y2={zeroY} stroke="var(--border-strong)" strokeWidth={1.5} />
          )}

          {/* Bars */}
          {labels.map((lbl, gi) => {
            const groupX = gi * groupWidth;
            return (
              <g key={gi}>
                {datasets.map((ds, di) => {
                  const color = ds.color ?? PALETTE[di % PALETTE.length];
                  const val = ds.data[gi] ?? 0;
                  const barX = fmt3(groupX + barGap + di * (barWidth + barGap));
                  const barY = fmt3(Math.min(zeroY, toY(val)));
                  const barH = fmt3(Math.abs(zeroY - toY(val)));
                  const r = Math.min(radius, barH / 2, barWidth / 2);
                  const d = barH > r
                    ? `M ${barX + r} ${barY} h ${barWidth - 2 * r} a ${r} ${r} 0 0 1 ${r} ${r} v ${barH - r} h ${-(barWidth)} v ${-(barH - r)} a ${r} ${r} 0 0 1 ${r} ${-(r)} z`
                    : `M ${barX} ${barY} h ${barWidth} v ${barH} h ${-(barWidth)} z`;
                  return (
                    <path
                      key={di}
                      d={d}
                      fill={color}
                      opacity={0.9}
                      className="transition-opacity duration-150 hover:opacity-100"
                      onMouseEnter={(e) => {
                        const svgRect = e.currentTarget.closest("svg")!.getBoundingClientRect();
                        const items = datasets.map((s, si) => ({
                          label: s.label,
                          value: s.data[gi] ?? 0,
                          color: s.color ?? PALETTE[si % PALETTE.length],
                        }));
                        setTooltip({
                          x: barX + barWidth / 2 + pad.left,
                          y: barY + pad.top - 8,
                          label: lbl,
                          items,
                        });
                      }}
                    />
                  );
                })}
                {/* X label */}
                <text
                  x={fmt3(groupX + groupWidth / 2)}
                  y={H + 18}
                  textAnchor="middle"
                  fill="var(--foreground-muted)"
                  fontSize={10}
                >
                  {lbl}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-[var(--radius-md)] border border-border bg-surface-overlay shadow-md px-3 py-2 text-xs min-w-[100px]"
          style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
        >
          <p className="font-semibold text-foreground mb-1">{tooltip.label}</p>
          {tooltip.items.map((it) => (
            <div key={it.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: it.color }} />
              <span className="text-foreground-muted">{it.label}:</span>
              <span className="font-medium text-foreground">{formatValue(it.value)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Legend (multi-dataset) */}
      {datasets.length > 1 && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
          {datasets.map((ds, di) => (
            <div key={di} className="flex items-center gap-1.5 text-xs text-foreground-muted">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: ds.color ?? PALETTE[di % PALETTE.length] }} />
              {ds.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
