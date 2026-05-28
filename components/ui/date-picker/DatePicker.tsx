"use client";

import {
  useId,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ─── Locale helpers ─────────────────────────────────────────── */

const MONTHS_TR = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];
const DAYS_TR = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}
function isBetween(d: Date, start: Date, end: Date) {
  const t = d.getTime();
  return t > start.getTime() && t < end.getTime();
}
function formatDate(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;
}

/* ─── Icons ──────────────────────────────────────────────────── */

function ChevronLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-subtle" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface DatePickerProps {
  value?:       Date | null;
  defaultValue?: Date | null;
  onChange?:    (date: Date | null) => void;
  /** Range mode */
  range?:       boolean;
  rangeValue?:  [Date | null, Date | null];
  defaultRangeValue?: [Date | null, Date | null];
  onRangeChange?: (range: [Date | null, Date | null]) => void;
  minDate?:     Date;
  maxDate?:     Date;
  placeholder?: string;
  label?:       string;
  helperText?:  string;
  errorText?:   string;
  successText?: string;
  disabled?:    boolean;
  clearable?:   boolean;
  size?:        "sm" | "md" | "lg";
  id?:          string;
  className?:   string;
}

/* ─── Calendar grid ───────────────────────────────────────────── */

function Calendar({
  viewDate,
  onViewChange,
  selected,
  rangeStart,
  rangeEnd,
  hoverDate,
  onHoverDate,
  onSelect,
  minDate,
  maxDate,
  range,
}: {
  viewDate:     Date;
  onViewChange: (d: Date) => void;
  selected?:    Date | null;
  rangeStart?:  Date | null;
  rangeEnd?:    Date | null;
  hoverDate?:   Date | null;
  onHoverDate?: (d: Date | null) => void;
  onSelect:     (d: Date) => void;
  minDate?:     Date;
  maxDate?:     Date;
  range?:       boolean;
}) {
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = startOfMonth(viewDate);
  /* Monday-based: Sunday = 6, Monday = 0 */
  const startOffset = (first.getDay() + 6) % 7;
  const days   = daysInMonth(year, month);
  const cells  = startOffset + days;
  const total  = Math.ceil(cells / 7) * 7;

  const prevMonth = () => onViewChange(new Date(year, month - 1, 1));
  const nextMonth = () => onViewChange(new Date(year, month + 1, 1));

  const isDisabled = (d: Date) =>
    (minDate ? d < minDate : false) || (maxDate ? d > maxDate : false);

  const isInRange = (d: Date) => {
    if (!range) return false;
    const start = rangeStart;
    const end   = rangeEnd ?? hoverDate;
    if (!start || !end) return false;
    const s = start < end ? start : end;
    const e = start < end ? end   : start;
    return isBetween(d, s, e);
  };

  const isRangeEdge = (d: Date) => {
    if (!range) return false;
    return (rangeStart && isSameDay(d, rangeStart)) ||
           (rangeEnd   && isSameDay(d, rangeEnd));
  };

  return (
    <div className="p-3 w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-background-muted transition-colors text-foreground-muted">
          <ChevronLeftIcon />
        </button>
        <button type="button"
          className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
          {MONTHS_TR[month]} {year}
        </button>
        <button type="button" onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-[var(--radius-sm)] hover:bg-background-muted transition-colors text-foreground-muted">
          <ChevronRightIcon />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_TR.map((d) => (
          <div key={d} className="h-8 flex items-center justify-center text-xs font-medium text-foreground-subtle">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {Array.from({ length: total }).map((_, i) => {
          const dayNum = i - startOffset + 1;
          if (dayNum < 1 || dayNum > days) {
            return <div key={i} />;
          }
          const date     = new Date(year, month, dayNum);
          const sel      = selected  && isSameDay(date, selected);
          const inRange  = isInRange(date);
          const edge     = isRangeEdge(date);
          const disabled = isDisabled(date);
          const today    = isSameDay(date, new Date());

          return (
            <button
              key={i}
              type="button"
              disabled={disabled}
              onClick={() => !disabled && onSelect(date)}
              onMouseEnter={() => onHoverDate?.(date)}
              onMouseLeave={() => onHoverDate?.(null)}
              className={cn(
                "h-8 w-full flex items-center justify-center text-sm rounded-[var(--radius-sm)]",
                "transition-colors duration-100",
                disabled && "opacity-30 cursor-not-allowed",
                !disabled && !sel && !edge && "hover:bg-background-muted",
                today && !sel && !edge && "font-semibold text-primary",
                inRange && "bg-primary-subtle/60",
                (sel || edge) && "bg-primary text-primary-foreground font-semibold",
              )}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Dropdown portal ─────────────────────────────────────────── */

function DatePickerPortal({
  anchorRef,
  open,
  children,
}: {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  children: React.ReactNode;
}) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropUp = spaceBelow < 320 && rect.top > spaceBelow;
    setStyle({
      position: "fixed",
      left: rect.left,
      zIndex: 9999,
      ...(dropUp ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
    });
  }, [open, anchorRef]);

  if (!mounted || !open) return null;
  return createPortal(<div style={style}>{children}</div>, document.body);
}

/* ─── Main component ──────────────────────────────────────────── */

const SIZE = { sm: "h-8 px-3 text-sm", md: "h-10 px-3 text-sm", lg: "h-11 px-4 text-base" };

export function DatePicker({
  value: valueProp,
  defaultValue,
  onChange,
  range = false,
  rangeValue: rangeValueProp,
  defaultRangeValue,
  onRangeChange,
  minDate,
  maxDate,
  placeholder = "Tarih seçin",
  label,
  helperText,
  errorText,
  successText,
  disabled = false,
  clearable = true,
  size = "md",
  id: idProp,
  className,
}: DatePickerProps) {
  const autoId    = useId();
  const id        = idProp ?? autoId;
  const anchorRef = useRef<HTMLDivElement>(null);

  /* Single */
  const isControlled  = valueProp !== undefined;
  const [internal, setInternal] = useState<Date | null>(defaultValue ?? null);
  const current = isControlled ? (valueProp ?? null) : internal;

  /* Range */
  const isRangeControlled = rangeValueProp !== undefined;
  const [rangeInternal, setRangeInternal] = useState<[Date | null, Date | null]>(
    defaultRangeValue ?? [null, null]
  );
  const [rangeStart, rangeEnd] = isRangeControlled ? (rangeValueProp ?? [null, null]) : rangeInternal;

  const [open,       setOpen]      = useState(false);
  const [viewDate,   setViewDate]  = useState(new Date());
  const [hoverDate,  setHoverDate] = useState<Date | null>(null);
  const [pickingEnd, setPickingEnd] = useState(false);

  /* Close on outside */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (date: Date) => {
    if (!range) {
      if (!isControlled) setInternal(date);
      onChange?.(date);
      setOpen(false);
      return;
    }
    if (!pickingEnd || !rangeStart) {
      const next: [Date | null, Date | null] = [date, null];
      if (!isRangeControlled) setRangeInternal(next);
      onRangeChange?.(next);
      setPickingEnd(true);
    } else {
      const start = rangeStart < date ? rangeStart : date;
      const end   = rangeStart < date ? date : rangeStart;
      const next: [Date | null, Date | null] = [start, end];
      if (!isRangeControlled) setRangeInternal(next);
      onRangeChange?.(next);
      setPickingEnd(false);
      setOpen(false);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (range) {
      if (!isRangeControlled) setRangeInternal([null, null]);
      onRangeChange?.([null, null]);
      setPickingEnd(false);
    } else {
      if (!isControlled) setInternal(null);
      onChange?.(null);
    }
  };

  const displayValue = (() => {
    if (range) {
      if (rangeStart && rangeEnd) return `${formatDate(rangeStart)} – ${formatDate(rangeEnd)}`;
      if (rangeStart) return `${formatDate(rangeStart)} – ...`;
      return "";
    }
    return current ? formatDate(current) : "";
  })();

  const hasValue = range ? !!rangeStart : !!current;

  const feedbackText  = errorText ?? successText ?? helperText;
  const feedbackColor = errorText ? "text-danger" : successText ? "text-success" : "text-foreground-subtle";

  const triggerBorder =
    errorText   ? "border-danger focus:border-danger focus:ring-danger/20" :
    successText ? "border-success focus:border-success focus:ring-success/20" :
    open        ? "border-primary ring-2 ring-primary/20" : "";

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground leading-none">
          {label}
        </label>
      )}

      <div ref={anchorRef} className="relative">
        <button
          type="button"
          id={id}
          disabled={disabled}
          onClick={() => !disabled && setOpen((o) => !o)}
          className={cn(
            "w-full flex items-center gap-2",
            "bg-surface text-foreground border border-border rounded-[var(--radius-md)]",
            "transition-colors duration-150 cursor-pointer select-none",
            "focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            SIZE[size],
            triggerBorder
          )}
        >
          <CalendarIcon />
          <span className={cn("flex-1 text-left truncate", !hasValue && "text-foreground-subtle")}>
            {hasValue ? displayValue : placeholder}
          </span>
          {clearable && hasValue && (
            <span
              role="button"
              onClick={handleClear}
              className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-background-muted text-foreground-subtle hover:text-foreground transition-colors"
              aria-label="Temizle"
            >
              <XIcon />
            </span>
          )}
        </button>

        <DatePickerPortal anchorRef={anchorRef} open={open}>
          <div className={cn(
            "bg-surface-overlay border border-border rounded-[var(--radius-xl)]",
            "shadow-lg overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 duration-100"
          )}>
            {range && rangeStart && !rangeEnd && (
              <div className="px-3 pt-2 pb-0">
                <p className="text-xs text-foreground-muted bg-primary-subtle text-primary px-2 py-1 rounded-[var(--radius-sm)]">
                  Bitiş tarihini seçin
                </p>
              </div>
            )}
            <Calendar
              viewDate={viewDate}
              onViewChange={setViewDate}
              selected={range ? null : current}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              hoverDate={hoverDate}
              onHoverDate={setHoverDate}
              onSelect={handleSelect}
              minDate={minDate}
              maxDate={maxDate}
              range={range}
            />
          </div>
        </DatePickerPortal>
      </div>

      {feedbackText && (
        <p className={cn("text-xs leading-none", feedbackColor)}>{feedbackText}</p>
      )}
    </div>
  );
}
