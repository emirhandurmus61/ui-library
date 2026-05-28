"use client";

import { useId, useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SliderProps {
  value?:        number | [number, number];
  defaultValue?: number | [number, number];
  onChange?:     (value: number | [number, number]) => void;
  min?:          number;
  max?:          number;
  step?:         number;
  range?:        boolean;
  disabled?:     boolean;
  label?:        string;
  showValue?:    boolean;
  formatValue?:  (v: number) => string;
  color?:        "primary" | "success" | "danger" | "warning" | "info";
  size?:         "sm" | "md" | "lg";
  marks?:        { value: number; label?: string }[];
  className?:    string;
  id?:           string;
}

/* ─── Color map ───────────────────────────────────────────────── */

const TRACK_FILL: Record<string, string> = {
  primary: "bg-primary",
  success: "bg-success",
  danger:  "bg-danger",
  warning: "bg-warning",
  info:    "bg-info",
};

const THUMB_RING: Record<string, string> = {
  primary: "focus-visible:ring-primary/30",
  success: "focus-visible:ring-success/30",
  danger:  "focus-visible:ring-danger/30",
  warning: "focus-visible:ring-warning/30",
  info:    "focus-visible:ring-info/30",
};

const SIZE_TRACK: Record<string, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const SIZE_THUMB: Record<string, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

/* ─── Component ──────────────────────────────────────────────── */

export function Slider({
  value: valueProp,
  defaultValue,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  disabled = false,
  label,
  showValue = true,
  formatValue = (v) => String(v),
  color = "primary",
  size = "md",
  marks,
  className,
  id: idProp,
}: SliderProps) {
  const autoId = useId();
  const id     = idProp ?? autoId;
  const trackRef = useRef<HTMLDivElement>(null);

  const normalize = useCallback(
    (v: number | [number, number] | undefined): [number, number] => {
      if (range) {
        if (Array.isArray(v)) return v as [number, number];
        if (typeof v === "number") return [min, v];
        return [min, Math.round((min + max) / 2)];
      }
      const val = Array.isArray(v) ? v[0] : (v ?? min);
      return [val, val];
    },
    [range, min, max]
  );

  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState<[number, number]>(() => normalize(defaultValue));
  const current = isControlled ? normalize(valueProp) : internal;

  const clamp  = (v: number) => Math.min(max, Math.max(min, v));
  const snap   = (v: number) => Math.round((v - min) / step) * step + min;

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const emit = useCallback(
    (next: [number, number]) => {
      if (!isControlled) setInternal(next);
      onChange?.(range ? next : next[0]);
    },
    [isControlled, onChange, range]
  );

  /* ── Drag ─────────────────────────────────────────────────── */

  const dragging = useRef<0 | 1 | null>(null);

  const getValueFromEvent = useCallback(
    (clientX: number): number => {
      if (!trackRef.current) return min;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = (clientX - rect.left) / rect.width;
      return clamp(snap(min + ratio * (max - min)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min, max, step]
  );

  const onTrackPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      const v = getValueFromEvent(e.clientX);
      if (range) {
        const d0 = Math.abs(v - current[0]);
        const d1 = Math.abs(v - current[1]);
        dragging.current = d0 <= d1 ? 0 : 1;
      } else {
        dragging.current = 0;
      }
      const next: [number, number] = [...current] as [number, number];
      next[dragging.current!] = v;
      emit(next);
    },
    [disabled, getValueFromEvent, range, current, emit]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragging.current === null) return;
      const v = getValueFromEvent(e.clientX);
      const next: [number, number] = [...current] as [number, number];
      next[dragging.current] = v;
      if (range && next[0] > next[1]) {
        [next[0], next[1]] = [next[1], next[0]];
        dragging.current = dragging.current === 0 ? 1 : 0;
      }
      emit(next);
    },
    [getValueFromEvent, current, range, emit]
  );

  const onPointerUp = useCallback(() => { dragging.current = null; }, []);

  /* ── Keyboard ─────────────────────────────────────────────── */

  const handleThumbKey = (e: React.KeyboardEvent, idx: 0 | 1) => {
    if (disabled) return;
    const delta =
      e.key === "ArrowRight" || e.key === "ArrowUp"   ?  step :
      e.key === "ArrowLeft"  || e.key === "ArrowDown"  ? -step :
      e.key === "Home"  ? min - current[idx] :
      e.key === "End"   ? max - current[idx] : 0;
    if (!delta) return;
    e.preventDefault();
    const next: [number, number] = [...current] as [number, number];
    next[idx] = clamp(snap(current[idx] + delta));
    emit(next);
  };

  const fillLeft  = pct(range ? current[0] : min);
  const fillRight = pct(range ? current[1] : current[0]);

  return (
    <div className={cn("w-full", className)}>
      {/* Label + value */}
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-3">
          {label && <label htmlFor={id} className="text-sm font-medium text-foreground">{label}</label>}
          {showValue && (
            <span className="text-sm text-foreground-muted font-mono">
              {range
                ? `${formatValue(current[0])} – ${formatValue(current[1])}`
                : formatValue(current[0])}
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className={cn(
          "relative w-full rounded-full bg-background-muted cursor-pointer select-none",
          SIZE_TRACK[size],
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onPointerDown={onTrackPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Fill */}
        <div
          className={cn("absolute top-0 h-full rounded-full", TRACK_FILL[color])}
          style={{ left: `${fillLeft}%`, width: `${fillRight - fillLeft}%` }}
        />

        {/* Thumb(s) */}
        {(range ? [0, 1] as const : [0] as const).map((idx) => (
          <div
            key={idx}
            role="slider"
            id={idx === 0 ? id : undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={current[idx]}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => handleThumbKey(e, idx)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "rounded-full bg-surface border-2 border-current shadow-sm",
              "transition-transform duration-100",
              "focus-visible:outline-none focus-visible:ring-4",
              THUMB_RING[color],
              SIZE_THUMB[size],
              TRACK_FILL[color].replace("bg-", "text-"),
              !disabled && "hover:scale-110 active:scale-95",
              disabled && "cursor-not-allowed"
            )}
            style={{ left: `${pct(current[idx])}%` }}
          />
        ))}
      </div>

      {/* Marks */}
      {marks && marks.length > 0 && (
        <div className="relative mt-2">
          {marks.map((m) => (
            <div
              key={m.value}
              className="absolute flex flex-col items-center"
              style={{ left: `${pct(m.value)}%`, transform: "translateX(-50%)" }}
            >
              <div className="w-0.5 h-1.5 bg-border" />
              {m.label && <span className="text-xs text-foreground-subtle mt-0.5">{m.label}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
