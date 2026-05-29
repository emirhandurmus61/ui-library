"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type LogLevel = "info" | "warn" | "error" | "debug" | "success" | "trace";

export interface LogEntry {
  id?: string;
  timestamp?: string;
  level: LogLevel;
  message: string;
  source?: string;
  meta?: string;
}

export type LogVariant = "dark" | "light" | "minimal";

export interface LogViewerProps {
  entries: LogEntry[];
  variant?: LogVariant;
  maxHeight?: string;
  autoScroll?: boolean;
  showTimestamps?: boolean;
  showLevels?: boolean;
  showLineNumbers?: boolean;
  filterLevels?: LogLevel[];
  searchable?: boolean;
  className?: string;
}

/* ─── Level styles ───────────────────────────────────────────── */

const levelConfig: Record<LogLevel, { label: string; badge: string; text: string; dot: string }> = {
  info:    { label: "INFO",    badge: "bg-blue-500/20 text-blue-400",     text: "text-blue-300",    dot: "bg-blue-400" },
  warn:    { label: "WARN",    badge: "bg-amber-500/20 text-amber-400",   text: "text-amber-300",   dot: "bg-amber-400" },
  error:   { label: "ERROR",   badge: "bg-red-500/20 text-red-400",       text: "text-red-300",     dot: "bg-red-400" },
  debug:   { label: "DEBUG",   badge: "bg-violet-500/20 text-violet-400", text: "text-violet-300",  dot: "bg-violet-400" },
  success: { label: "OK",      badge: "bg-emerald-500/20 text-emerald-400",text:"text-emerald-300", dot: "bg-emerald-400" },
  trace:   { label: "TRACE",   badge: "bg-slate-500/20 text-slate-400",   text: "text-slate-400",   dot: "bg-slate-500" },
};

const lightLevelConfig: Record<LogLevel, { badge: string; text: string; row: string }> = {
  info:    { badge: "bg-blue-100 text-blue-700",     text: "text-blue-700",    row: "" },
  warn:    { badge: "bg-amber-100 text-amber-700",   text: "text-amber-700",   row: "bg-amber-50/60" },
  error:   { badge: "bg-red-100 text-red-700",       text: "text-red-700",     row: "bg-red-50/60" },
  debug:   { badge: "bg-violet-100 text-violet-700", text: "text-violet-700",  row: "" },
  success: { badge: "bg-emerald-100 text-emerald-700",text:"text-emerald-700", row: "bg-emerald-50/60" },
  trace:   { badge: "bg-slate-100 text-slate-600",   text: "text-slate-500",   row: "" },
};

/* ─── Filter bar ─────────────────────────────────────────────── */

const ALL_LEVELS: LogLevel[] = ["info", "warn", "error", "debug", "success", "trace"];

function FilterBar({
  active,
  onToggle,
  search,
  onSearch,
  variant,
}: {
  active: Set<LogLevel>;
  onToggle: (l: LogLevel) => void;
  search: string;
  onSearch: (s: string) => void;
  variant: LogVariant;
}) {
  const isDark = variant !== "light";
  return (
    <div className={cn("flex flex-wrap items-center gap-2 px-3 py-2 border-b", isDark ? "border-white/10" : "border-border")}>
      {/* Search */}
      <div className={cn("flex items-center gap-1.5 rounded-[var(--radius-md)] px-2 h-7 flex-1 min-w-[120px]", isDark ? "bg-white/5 text-white/60" : "bg-background-muted text-foreground-muted")}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3 shrink-0" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Filtrele..."
          className="bg-transparent text-xs outline-none flex-1 placeholder:text-current"
        />
      </div>
      {/* Level toggles */}
      <div className="flex flex-wrap gap-1">
        {ALL_LEVELS.map(level => {
          const cfg = levelConfig[level];
          const isActive = active.has(level);
          return (
            <button
              key={level}
              onClick={() => onToggle(level)}
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors",
                isActive ? cfg.badge : isDark ? "text-white/20 hover:text-white/40" : "text-foreground-subtle hover:text-foreground-muted"
              )}
            >
              {cfg.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── LogViewer ──────────────────────────────────────────────── */

export function LogViewer({
  entries,
  variant = "dark",
  maxHeight = "400px",
  autoScroll = true,
  showTimestamps = true,
  showLevels = true,
  showLineNumbers = false,
  searchable = true,
  className,
}: LogViewerProps) {
  const [activeLevels, setActiveLevels] = useState<Set<LogLevel>>(new Set(ALL_LEVELS));
  const [search, setSearch] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isDark = variant !== "light";

  useEffect(() => {
    if (autoScroll && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [entries, autoScroll]);

  const toggleLevel = (level: LogLevel) => {
    setActiveLevels(prev => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level); else next.add(level);
      return next;
    });
  };

  const filtered = entries.filter(e =>
    activeLevels.has(e.level) &&
    (search === "" || e.message.toLowerCase().includes(search.toLowerCase()) || e.source?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={cn(
      "rounded-[var(--radius-xl)] border overflow-hidden font-mono text-xs",
      isDark ? "bg-[#0d1117] border-white/10" : "bg-surface border-border",
      className
    )}>
      {/* Header bar */}
      <div className={cn(
        "flex items-center gap-2 px-4 py-2 border-b",
        isDark ? "bg-white/5 border-white/10" : "bg-background-muted border-border"
      )}>
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500/70" />
          <span className="size-3 rounded-full bg-amber-500/70" />
          <span className="size-3 rounded-full bg-emerald-500/70" />
        </div>
        <span className={cn("text-xs ml-2", isDark ? "text-white/30" : "text-foreground-subtle")}>
          terminal — {filtered.length} giriş
        </span>
      </div>

      {/* Filter bar */}
      {searchable && (
        <FilterBar
          active={activeLevels}
          onToggle={toggleLevel}
          search={search}
          onSearch={setSearch}
          variant={variant}
        />
      )}

      {/* Log lines */}
      <div className="overflow-y-auto" style={{ maxHeight }}>
        <div className="py-2">
          {filtered.length === 0 && (
            <p className={cn("px-4 py-8 text-center text-xs", isDark ? "text-white/20" : "text-foreground-subtle")}>
              Eşleşen kayıt bulunamadı
            </p>
          )}
          {filtered.map((entry, i) => {
            const cfg = levelConfig[entry.level];
            const lcfg = lightLevelConfig[entry.level];
            return (
              <div
                key={entry.id ?? i}
                className={cn(
                  "flex items-start gap-2 px-4 py-0.5 hover:bg-white/5 transition-colors",
                  isDark ? "" : lcfg.row
                )}
              >
                {/* Line number */}
                {showLineNumbers && (
                  <span className={cn("w-7 text-right shrink-0 select-none", isDark ? "text-white/15" : "text-foreground-subtle")}>
                    {i + 1}
                  </span>
                )}

                {/* Timestamp */}
                {showTimestamps && entry.timestamp && (
                  <span className={cn("shrink-0 text-[11px] tabular-nums", isDark ? "text-white/25" : "text-foreground-subtle")}>
                    {entry.timestamp}
                  </span>
                )}

                {/* Level badge */}
                {showLevels && (
                  <span className={cn("shrink-0 text-[10px] font-bold w-11 text-center py-px rounded", isDark ? cfg.badge : lcfg.badge)}>
                    {cfg.label}
                  </span>
                )}

                {/* Source */}
                {entry.source && (
                  <span className={cn("shrink-0 text-[11px]", isDark ? "text-white/30" : "text-foreground-subtle")}>
                    [{entry.source}]
                  </span>
                )}

                {/* Message */}
                <span className={cn("flex-1 break-all leading-relaxed", isDark ? cfg.text : lcfg.text)}>
                  {entry.message}
                </span>

                {/* Meta */}
                {entry.meta && (
                  <span className={cn("shrink-0 text-[11px]", isDark ? "text-white/20" : "text-foreground-subtle")}>
                    {entry.meta}
                  </span>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
