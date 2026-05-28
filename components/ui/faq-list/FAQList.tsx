"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "size-4 shrink-0 text-foreground-muted transition-transform duration-300",
        open && "rotate-180"
      )}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-foreground-subtle shrink-0"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface FAQListProps {
  items: FAQItem[];
  searchable?: boolean;
  filterable?: boolean;
  allowMultiple?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FAQList({
  items,
  searchable = false,
  filterable = false,
  allowMultiple = false,
  className,
}: FAQListProps) {
  const baseId = useId();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tümü");
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  /* Unique categories */
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean) as string[])
  );

  /* Toggle accordion */
  const toggle = (index: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  /* Filtered items */
  const filtered = items.filter((item) => {
    const matchesSearch =
      !query ||
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      activeCategory === "Tümü" || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className={cn("w-full", className)}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* ── Search ─────────────────────────────────────────── */}
      {searchable && (
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sorularda ara…"
            className={cn(
              "w-full pl-9 pr-4 py-2.5 text-sm",
              "bg-surface border border-border rounded-[var(--radius-lg)]",
              "text-foreground placeholder:text-foreground-subtle",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60"
            )}
          />
        </div>
      )}

      {/* ── Category chips ─────────────────────────────────── */}
      {filterable && categories.length > 0 && (
        <div
          className="flex flex-wrap gap-2 mb-5"
          role="group"
          aria-label="Kategori filtresi"
        >
          {["Tümü", ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium",
                "transition-colors duration-150 cursor-pointer",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-background-muted text-foreground-muted hover:bg-background-subtle"
              )}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── Items ──────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-foreground-muted">
          Sonuç bulunamadı
        </div>
      ) : (
        <div className="divide-y divide-border border border-border rounded-[var(--radius-xl)] overflow-hidden">
          {filtered.map((item, idx) => {
            /* Use original index as stable key for open state */
            const originalIndex = items.indexOf(item);
            const isOpen = openIds.has(originalIndex);
            const triggerId = `${baseId}-trigger-${originalIndex}`;
            const panelId = `${baseId}-panel-${originalIndex}`;

            return (
              <div
                key={originalIndex}
                className="bg-surface"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                {/* Trigger */}
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(originalIndex)}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-5 py-4",
                    "text-sm font-semibold text-foreground text-left",
                    "transition-colors duration-150 cursor-pointer",
                    "hover:bg-background-muted",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40"
                  )}
                >
                  <span itemProp="name">{item.question}</span>
                  <ChevronIcon open={isOpen} />
                </button>

                {/* Panel */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    isOpen ? "max-h-96" : "max-h-0"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div
                    className="px-5 pb-5 pt-1 text-sm text-foreground-muted leading-relaxed"
                    itemProp="text"
                  >
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
