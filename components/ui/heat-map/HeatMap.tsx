"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface HeatMapProps {
  /** Record of "YYYY-MM-DD" → number */
  data: Record<string, number>;
  /** Year to display (default current year) */
  year?: number;
  /** Color for max intensity (default primary) */
  color?: string;
  /** Show month labels (default true) */
  showMonths?: boolean;
  /** Show day labels Mon/Wed/Fri (default true) */
  showDays?: boolean;
  /** Cell size in px (default 11) */
  cellSize?: number;
  /** Cell gap in px (default 2) */
  cellGap?: number;
  /** Value formatter for tooltip */
  formatValue?: (date: string, value: number) => string;
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */

const DAY_LABELS = ["", "Pzt", "", "Çar", "", "Cum", ""];
const MONTH_SHORT = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildGrid(year: number) {
  // Start from first Sunday on or before Jan 1
  const jan1 = new Date(year, 0, 1);
  const startOffset = (jan1.getDay() + 6) % 7; // Monday-first
  const start = new Date(jan1);
  start.setDate(1 - startOffset);

  const cells: { date: string; week: number; day: number }[] = [];
  const cur = new Date(start);

  let week = 0;
  while (cur.getFullYear() <= year) {
    const day = (cur.getDay() + 6) % 7; // 0=Mon
    if (day === 0 && cells.length > 0) week++;
    cells.push({ date: toISO(cur), week, day });
    cur.setDate(cur.getDate() + 1);
    if (cur.getFullYear() > year) break;
  }

  return { cells, weeks: week + 1 };
}

function buildMonthPositions(year: number, cells: ReturnType<typeof buildGrid>["cells"]) {
  const positions: { label: string; week: number }[] = [];
  let lastMonth = -1;
  for (const c of cells) {
    const [y, m] = c.date.split("-").map(Number);
    if (y === year && m !== lastMonth) {
      positions.push({ label: MONTH_SHORT[m - 1], week: c.week });
      lastMonth = m;
    }
  }
  return positions;
}

/* ─── Component ──────────────────────────────────────────────── */

export function HeatMap({
  data,
  year = new Date().getFullYear(),
  color,
  showMonths = true,
  showDays = true,
  cellSize = 11,
  cellGap = 2,
  formatValue = (date, value) => `${date}: ${value}`,
  className,
}: HeatMapProps) {
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const { cells, weeks } = buildGrid(year);
  const monthPositions = buildMonthPositions(year, cells);

  const max = Math.max(...Object.values(data), 1);
  const step = cellSize + cellGap;
  const dayLabelW = showDays ? 28 : 0;
  const monthLabelH = showMonths ? 16 : 0;
  const svgW = dayLabelW + weeks * step;
  const svgH = monthLabelH + 7 * step;

  const baseColor = color ?? "var(--color-primary)";

  return (
    <div className={cn("relative inline-block", className)}>
      <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} overflow="visible">
        {/* Month labels */}
        {showMonths && monthPositions.map((mp) => (
          <text
            key={mp.label + mp.week}
            x={dayLabelW + mp.week * step}
            y={10}
            fontSize={9}
            fill="var(--color-foreground-subtle)"
            fontFamily="inherit"
          >
            {mp.label}
          </text>
        ))}

        {/* Day labels */}
        {showDays && DAY_LABELS.map((label, i) => (
          label ? (
            <text
              key={i}
              x={0}
              y={monthLabelH + i * step + cellSize * 0.75}
              fontSize={8}
              fill="var(--color-foreground-subtle)"
              fontFamily="inherit"
            >
              {label}
            </text>
          ) : null
        ))}

        {/* Cells */}
        {cells.map((cell) => {
          const value = data[cell.date] ?? 0;
          const intensity = value === 0 ? 0 : 0.15 + (value / max) * 0.85;
          const x = dayLabelW + cell.week * step;
          const y = monthLabelH + cell.day * step;

          return (
            <rect
              key={cell.date}
              x={x}
              y={y}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={value === 0 ? "var(--color-background-muted)" : baseColor}
              fillOpacity={value === 0 ? 1 : intensity}
              style={{ cursor: value > 0 ? "pointer" : "default" }}
              onMouseEnter={(e) => {
                if (value > 0) {
                  setTooltip({ text: formatValue(cell.date, value), x: x + cellSize / 2, y });
                }
              }}
              onMouseLeave={() => setTooltip(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <span
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full px-1.5 py-0.5 rounded text-[10px] font-medium whitespace-nowrap bg-surface-overlay border border-border text-foreground shadow-sm"
          style={{ left: tooltip.x, top: tooltip.y - 4 }}
        >
          {tooltip.text}
        </span>
      )}
    </div>
  );
}
