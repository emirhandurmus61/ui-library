"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type CountdownVariant = "default" | "minimal" | "cards" | "flip" | "ring" | "compact";

export interface CountdownProps {
  /** Target date/time as ISO string or Date */
  targetDate: string | Date;
  variant?: CountdownVariant;
  showLabels?: boolean;
  showDays?: boolean;
  onComplete?: () => void;
  className?: string;
}

/* ─── Time calculation ───────────────────────────────────────── */

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(target: Date): TimeLeft {
  const total = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours   = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days    = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/* ─── Segment component ──────────────────────────────────────── */

function Segment({
  value,
  label,
  variant,
}: {
  value: number;
  label: string;
  variant: CountdownVariant;
}) {
  if (variant === "cards") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="relative w-16 h-20 bg-surface border border-border rounded-[var(--radius-xl)] flex items-center justify-center shadow-sm overflow-hidden">
          {/* Top half */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-background-muted/60 border-b border-border/50" />
          <span className="relative text-3xl font-bold tabular-nums text-foreground z-10">
            {pad(value)}
          </span>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">{label}</span>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="flex flex-col items-center">
        <span className="text-4xl font-light tabular-nums text-foreground">{pad(value)}</span>
        <span className="text-[10px] uppercase tracking-widest text-foreground-subtle mt-0.5">{label}</span>
      </div>
    );
  }

  if (variant === "ring") {
    const max = label === "Gün" ? 365 : label === "Saat" ? 24 : 60;
    const pct = value / max;
    const r = 22;
    const circ = 2 * Math.PI * r;
    const dash = circ * (1 - pct);
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="relative size-16">
          <svg className="size-full -rotate-90" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r={r} fill="none" stroke="currentColor" strokeWidth="3.5" className="text-border" />
            <circle
              cx="28" cy="28" r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray={circ}
              strokeDashoffset={dash}
              strokeLinecap="round"
              className="text-primary transition-all duration-700"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-base font-bold tabular-nums text-foreground">
            {pad(value)}
          </span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">{label}</span>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-0.5">
        <span className="text-2xl font-bold tabular-nums text-foreground">{pad(value)}</span>
        <span className="text-xs text-foreground-muted self-end pb-0.5">{label[0].toLowerCase()}</span>
      </div>
    );
  }

  if (variant === "flip") {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-14 h-16 bg-[#1e293b] dark:bg-[#0f172a] rounded-[var(--radius-lg)] flex items-center justify-center shadow-lg border border-white/5">
          <span className="text-3xl font-black tabular-nums text-white">{pad(value)}</span>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">{label}</span>
      </div>
    );
  }

  // default
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded-[var(--radius-xl)] bg-primary/10 border border-primary/20 px-4 py-3 min-w-[60px] text-center">
        <span className="text-3xl font-bold tabular-nums text-primary">{pad(value)}</span>
      </div>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">{label}</span>
    </div>
  );
}

/* ─── Separator ──────────────────────────────────────────────── */

function Sep({ variant }: { variant: CountdownVariant }) {
  if (variant === "ring" || variant === "minimal") {
    return <span className="text-foreground-subtle text-2xl font-light pb-4">·</span>;
  }
  if (variant === "compact") {
    return <span className="text-foreground-subtle text-xl font-light">:</span>;
  }
  return <span className="text-foreground-subtle text-2xl font-bold pb-4">:</span>;
}

/* ─── Main component ─────────────────────────────────────────── */

export function Countdown({
  targetDate,
  variant = "default",
  showDays = true,
  onComplete,
  className,
}: CountdownProps) {
  const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
  const [time, setTime] = useState<TimeLeft>(() => calcTimeLeft(target));
  const completedRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const t = calcTimeLeft(target);
      setTime(t);
      if (t.total === 0 && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    };
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target, onComplete]);

  if (time.total === 0) {
    return (
      <div className={cn("flex items-center justify-center py-4", className)}>
        <span className="text-lg font-semibold text-foreground">Süre doldu!</span>
      </div>
    );
  }

  const segments = [
    ...(showDays ? [{ value: time.days,    label: "Gün" }] : []),
    { value: time.hours,   label: "Saat" },
    { value: time.minutes, label: "Dakika" },
    { value: time.seconds, label: "Saniye" },
  ];

  const gapClass = variant === "compact" ? "gap-2" : "gap-3 sm:gap-5";

  return (
    <div className={cn("flex items-end flex-wrap", gapClass, className)}>
      {segments.map((seg, i) => (
        <div key={seg.label} className="flex items-end gap-2 sm:gap-3 lg:gap-5">
          <Segment value={seg.value} label={seg.label} variant={variant} />
          {i < segments.length - 1 && <Sep variant={variant} />}
        </div>
      ))}
    </div>
  );
}
