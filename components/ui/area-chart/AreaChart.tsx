"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface AreaChartDataset {
  label: string;
  data: number[];
  color?: string;
  fillOpacity?: number;
}

export interface AreaChartProps {
  /** X-axis labels */
  labels: string[];
  datasets: AreaChartDataset[];
  /** Width in px (default 400) */
  width?: number;
  /** Height in px (default 180) */
  height?: number;
  /** Padding around chart area in px */
  padding?: { top?: number; right?: number; bottom?: number; left?: number };
  /** Show grid lines (default true) */
  grid?: boolean;
  /** Number of horizontal grid lines (default 4) */
  gridLines?: number;
  /** Show dots on data points (default true) */
  dots?: boolean;
  /** Value formatter for tooltip/axis */
  formatValue?: (v: number) => string;
  className?: string;
}

/* ─── Default dataset colors ─────────────────────────────────── */

const COLORS = ["var(--color-primary)", "#8b5cf6", "var(--color-success)", "var(--color-warning)"];

/* ─── Component ──────────────────────────────────────────────── */

export function AreaChart({
  labels,
  datasets,
  width = 400,
  height = 180,
  padding: pad = {},
  grid = true,
  gridLines = 4,
  dots = true,
  formatValue = (v) => String(v),
  className,
}: AreaChartProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [tooltip, setTooltip] = useState<{ x: number; y: number; items: { label: string; value: number; color: string }[] } | null>(null);

  const pt = pad.top ?? 16;
  const pr = pad.right ?? 16;
  const pb = pad.bottom ?? 28;
  const pl = pad.left ?? 40;

  const chartW = width - pl - pr;
  const chartH = height - pt - pb;

  // Global min/max across all datasets
  const allValues = datasets.flatMap((d) => d.data);
  const minV = Math.min(...allValues);
  const maxV = Math.max(...allValues, minV + 1);

  const toX = (i: number) => pl + (i / (labels.length - 1)) * chartW;
  const toY = (v: number) => pt + chartH - ((v - minV) / (maxV - minV)) * chartH;

  const buildPoints = (data: number[]) =>
    data.map((v, i) => ({ x: toX(i), y: toY(v), v }));

  const buildLinePath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const buildAreaPath = (pts: { x: number; y: number }[]) =>
    `${buildLinePath(pts)} L${pts[pts.length - 1].x},${pt + chartH} L${pts[0].x},${pt + chartH} Z`;

  // Grid tick values
  const ticks = Array.from({ length: gridLines + 1 }, (_, i) =>
    minV + (i / gridLines) * (maxV - minV)
  );

  return (
    <div className={cn("relative inline-block", className)} style={{ width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          {datasets.map((ds, di) => {
            const color = ds.color ?? COLORS[di % COLORS.length];
            return (
              <linearGradient key={di} id={`ag-${uid}-${di}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={ds.fillOpacity ?? 0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Grid lines + Y labels */}
        {grid && ticks.map((tick, i) => {
          const y = toY(tick);
          return (
            <g key={i}>
              <line x1={pl} y1={y} x2={pl + chartW} y2={y} stroke="var(--color-border)" strokeWidth={0.5} strokeDasharray="3,3" />
              <text x={pl - 6} y={y + 3} fontSize={9} textAnchor="end" fill="var(--color-foreground-subtle)" fontFamily="inherit">
                {formatValue(Math.round(tick))}
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        {labels.map((label, i) => (
          <text
            key={i}
            x={toX(i)}
            y={pt + chartH + 16}
            fontSize={9}
            textAnchor="middle"
            fill="var(--color-foreground-subtle)"
            fontFamily="inherit"
          >
            {label}
          </text>
        ))}

        {/* Datasets */}
        {datasets.map((ds, di) => {
          const color = ds.color ?? COLORS[di % COLORS.length];
          const pts = buildPoints(ds.data);
          return (
            <g key={di}>
              <path d={buildAreaPath(pts)} fill={`url(#ag-${uid}-${di})`} />
              <path d={buildLinePath(pts)} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
              {dots && pts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={3} fill={color} stroke="var(--color-surface)" strokeWidth={1.5} />
              ))}
            </g>
          );
        })}

        {/* Hover columns (invisible hit areas) */}
        {labels.map((_, i) => (
          <rect
            key={i}
            x={toX(i) - chartW / labels.length / 2}
            y={pt}
            width={chartW / labels.length}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => {
              setTooltip({
                x: toX(i),
                y: pt,
                items: datasets.map((ds, di) => ({
                  label: ds.label,
                  value: ds.data[i],
                  color: ds.color ?? COLORS[di % COLORS.length],
                })),
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 px-2 py-1.5 rounded-[var(--radius-md)] text-[11px] bg-surface-overlay border border-border shadow-md space-y-0.5"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.items.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color }} />
              <span className="text-foreground-muted">{item.label}:</span>
              <span className="font-semibold text-foreground">{formatValue(item.value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
