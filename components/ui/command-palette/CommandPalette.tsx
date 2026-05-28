"use client";

import {
  useRef, useState, useEffect, useCallback,
  createContext, useContext, useMemo,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-subtle shrink-0" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowReturnIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <polyline points="9 10 4 15 9 20" /><path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface CommandItem {
  id:        string;
  label:     string;
  group?:    string;
  icon?:     React.ReactNode;
  shortcut?: string;
  keywords?: string[];
  onSelect:  () => void;
}

export interface CommandPaletteProps {
  items:        CommandItem[];
  open:         boolean;
  onClose:      () => void;
  placeholder?: string;
  /** Geçmiş aramaları göster */
  recentIds?:   string[];
  onRecentChange?: (ids: string[]) => void;
  className?:   string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function CommandPalette({
  items,
  open,
  onClose,
  placeholder = "Ara veya komut çalıştır...",
  recentIds = [],
  onRecentChange,
  className,
}: CommandPaletteProps) {
  const [query, setQuery]     = useState("");
  const [active, setActive]   = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /* Focus on open */
  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  /* Close on Escape / backdrop */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* Filtered + grouped results */
  const filtered = useMemo(() => {
    if (!query.trim()) {
      // Show recent first, then all
      const recent = recentIds
        .map((id) => items.find((it) => it.id === id))
        .filter(Boolean) as CommandItem[];
      const rest   = items.filter((it) => !recentIds.includes(it.id));
      return [
        ...(recent.length ? [{ groupLabel: "Son Aramalar", items: recent }] : []),
        ...groupItems(rest),
      ];
    }

    const q = query.toLowerCase();
    const matched = items.filter(
      (it) =>
        it.label.toLowerCase().includes(q) ||
        it.keywords?.some((k) => k.toLowerCase().includes(q))
    );
    return groupItems(matched);
  }, [query, items, recentIds]);

  /* Flat list for keyboard nav */
  const flat = useMemo(
    () => filtered.flatMap((g) => g.items),
    [filtered]
  );

  /* Keyboard */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      flat[active]?.onSelect();
      addRecent(flat[active]?.id);
      onClose();
    }
  };

  /* Scroll active into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-active="true"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const addRecent = (id?: string) => {
    if (!id) return;
    const next = [id, ...recentIds.filter((r) => r !== id)].slice(0, 5);
    onRecentChange?.(next);
  };

  if (!mounted || !open) return null;

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4 bg-black/40 backdrop-blur-sm"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Komut paleti"
        className={cn(
          "w-full max-w-xl bg-surface-overlay border border-border rounded-[var(--radius-xl)]",
          "shadow-2xl overflow-hidden",
          "animate-in fade-in-0 zoom-in-95 duration-150",
          className
        )}
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-subtle outline-none"
          />
          <kbd className="hidden sm:flex items-center text-xs text-foreground-subtle font-mono bg-background-muted border border-border px-1.5 py-0.5 rounded">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-sm text-center text-foreground-subtle">
              "{query}" için sonuç bulunamadı.
            </p>
          ) : (
            filtered.map((group, gi) => (
              <div key={gi}>
                <p className="px-3 py-1.5 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">
                  {group.groupLabel}
                </p>
                {group.items.map((item) => {
                  const idx    = flat.indexOf(item);
                  const isActive = idx === active;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-active={isActive}
                      onClick={() => { item.onSelect(); addRecent(item.id); onClose(); }}
                      onMouseEnter={() => setActive(idx)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 text-sm text-left",
                        "transition-colors duration-75",
                        isActive ? "bg-primary-subtle text-primary" : "text-foreground hover:bg-background-muted"
                      )}
                    >
                      {item.icon && (
                        <span className={cn("size-4 shrink-0 flex items-center justify-center", isActive ? "text-primary" : "text-foreground-subtle")}>
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.shortcut && (
                        <kbd className="text-xs font-mono text-foreground-subtle bg-background-muted border border-border px-1.5 py-0.5 rounded">
                          {item.shortcut}
                        </kbd>
                      )}
                      {isActive && (
                        <span className="text-foreground-subtle">
                          <ArrowReturnIcon />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-foreground-subtle">
          <span className="flex items-center gap-1">
            <kbd className="bg-background-muted border border-border px-1 rounded font-mono">↑↓</kbd> gezin
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-background-muted border border-border px-1 rounded font-mono">↵</kbd> seç
          </span>
          <span className="flex items-center gap-1">
            <kbd className="bg-background-muted border border-border px-1 rounded font-mono">Esc</kbd> kapat
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─── useCommandPalette hook ─────────────────────────────────── */

export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return { open, setOpen, toggle: () => setOpen((o) => !o) };
}

/* ─── Helpers ────────────────────────────────────────────────── */

function groupItems(items: CommandItem[]) {
  const map = new Map<string, CommandItem[]>();
  for (const item of items) {
    const grp = item.group ?? "Komutlar";
    if (!map.has(grp)) map.set(grp, []);
    map.get(grp)!.push(item);
  }
  return Array.from(map.entries()).map(([groupLabel, items]) => ({ groupLabel, items }));
}
