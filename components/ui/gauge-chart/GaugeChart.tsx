"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface GaugeZone {
  from: number;
  to: number;
  color: string;
}

export interface GaugeChartProps {
  /** Current value */
  value: number;
  /** Minimum value (default 0) */
  min?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Color zones (default: red/yellow/green thirds) */
  zones?: GaugeZone[];
  /** Arc thickness in px (default 14) */
  thickness?: number;
  /** Outer radius in px (default 90) */
  radius?: number;
  /** Show needle (default true) */
  needle?: boolean;
  /** Center label (default formatted value) */
  label?: React.ReactNode;
  /** Value formatter */
  formatValue?: (v: number) => string;
  /** Animate on mount (default true) */
  animate?: boolean;
  className?: string;
}

/* ─── Arc helpers ────────────────────────────────────────────── */

// Gauge arc: -210deg to +30deg (240deg sweep), centered at bottom
const START_DEG = -210;
const SWEEP_DEG = 240;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function arcPoint(cx: number, cy: number, r: number, deg: number) {
  const rad = degToRad(deg);
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = arcPoint(cx, cy, r, startDeg);
  const e = arcPoint(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
}

function valueToDeg(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return START_DEG + pct * SWEEP_DEG;
}

/* ─── Component ──────────────────────────────────────────────── */

const DEFAULT_ZONES: GaugeZone[] = [
  { from: 0,   to: 33,  color: "var(--color-danger)" },
  { from: 33,  to: 66,  color: "var(--color-warning)" },
  { from: 66,  to: 100, color: "var(--color-success)" },
];

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  zones = DEFAULT_ZONES,
  thickness = 14,
  radius = 90,
  needle = true,
  label,
  formatValue = (v) => String(Math.round(v)),
  animate = true,
  className,
}: GaugeChartProps) {
  const [displayValue, setDisplayValue] = useState(animate ? min : value);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced || !animate) { setDisplayValue(value); return; }
    const start = performance.now();
    const duration = 900;
    const from = min;
    const to = value;
    const raf = (ts: number) => {
      const t = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayValue(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const size = radius * 2 + 20;
  const cx = size / 2;
  const cy = size / 2 + radius * 0.15; // shift center down so arc fits
  const arcR = radius - thickness / 2;
  const needleR = arcR - thickness / 2 - 4;

  const needleDeg = valueToDeg(displayValue, min, max);
  const needleTip = arcPoint(cx, cy, needleR, needleDeg);

  // Active zone color
  const pct = ((displayValue - min) / (max - min)) * 100;
  const activeZone = zones.find((z) => pct >= z.from && pct <= z.to) ?? zones[zones.length - 1];

  return (
    <div className={cn("inline-flex flex-col items-center", className)}>
      <div style={{ width: size, height: size * 0.65 }} className="relative overflow-hidden">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
        >
          {/* Background track */}
          <path
            d={describeArc(cx, cy, arcR, START_DEG, START_DEG + SWEEP_DEG)}
            fill="none"
            stroke="var(--color-background-muted)"
            strokeWidth={thickness}
            strokeLinecap="round"
          />

          {/* Zone arcs */}
          {zones.map((zone, i) => {
            const zStartDeg = START_DEG + ((zone.from / 100) * SWEEP_DEG);
            const zEndDeg   = START_DEG + ((zone.to   / 100) * SWEEP_DEG);
            return (
              <path
                key={i}
                d={describeArc(cx, cy, arcR, zStartDeg, zEndDeg)}
                fill="none"
                stroke={zone.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeOpacity={0.3}
              />
            );
          })}

          {/* Value arc */}
          <path
            d={describeArc(cx, cy, arcR, START_DEG, needleDeg)}
            fill="none"
            stroke={activeZone.color}
            strokeWidth={thickness}
            strokeLinecap="round"
          />

          {/* Needle */}
          {needle && (
            <>
              <line
                x1={cx}
                y1={cy}
                x2={needleTip.x}
                y2={needleTip.y}
                stroke="var(--color-foreground)"
                strokeWidth={2}
                strokeLinecap="round"
              />
              <circle cx={cx} cy={cy} r={5} fill="var(--color-foreground)" />
              <circle cx={cx} cy={cy} r={3} fill="var(--color-surface)" />
            </>
          )}
        </svg>
      </div>

      {/* Value label */}
      <div className="text-center -mt-2">
        {label ?? (
          <>
            <p className="text-2xl font-bold tabular-nums" style={{ color: activeZone.color }}>
              {formatValue(displayValue)}
            </p>
            <p className="text-xs text-foreground-muted mt-0.5">{min} — {max}</p>
          </>
        )}
      </div>
    </div>
  );
}
