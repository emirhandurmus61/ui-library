"use client";

import { cn } from "@/lib/utils";

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

function ChevronsLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m11 17-5-5 5-5" /><path d="m18 17-5-5 5-5" />
    </svg>
  );
}

function ChevronsRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m6 17 5-5-5-5" /><path d="m13 17 5-5-5-5" />
    </svg>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */

function getPages(current: number, total: number, siblings = 1): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const left  = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  const pages: (number | "…")[] = [1];
  if (left > 2) pages.push("…");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("…");
  pages.push(total);
  return pages;
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  showFirstLast?: boolean;
  size?: "sm" | "md";
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  showFirstLast = false,
  size = "md",
  className,
}: PaginationProps) {
  const pages = getPages(page, totalPages, siblings);

  const btnBase = cn(
    "inline-flex items-center justify-center rounded-[var(--radius-md)]",
    "font-medium transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:opacity-40 disabled:pointer-events-none",
    size === "sm" ? "h-7 min-w-7 px-2 text-xs" : "h-9 min-w-9 px-2.5 text-sm"
  );

  const pageBtn = (p: number | "…", i: number) => {
    if (p === "…") {
      return (
        <span key={`ellipsis-${i}`} className={cn(btnBase, "text-foreground-subtle cursor-default")}>
          …
        </span>
      );
    }
    const isActive = p === page;
    return (
      <button
        key={p}
        type="button"
        aria-label={`Sayfa ${p}`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => onPageChange(p)}
        className={cn(
          btnBase,
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        )}
      >
        {p}
      </button>
    );
  };

  return (
    <nav
      aria-label="Sayfalama"
      className={cn("flex items-center gap-1", className)}
    >
      {showFirstLast && (
        <button
          type="button"
          aria-label="İlk sayfa"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
          className={cn(btnBase, "text-foreground-muted hover:bg-background-muted hover:text-foreground")}
        >
          <ChevronsLeftIcon />
        </button>
      )}

      <button
        type="button"
        aria-label="Önceki sayfa"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(btnBase, "text-foreground-muted hover:bg-background-muted hover:text-foreground")}
      >
        <ChevronLeftIcon />
      </button>

      {pages.map((p, i) => pageBtn(p, i))}

      <button
        type="button"
        aria-label="Sonraki sayfa"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className={cn(btnBase, "text-foreground-muted hover:bg-background-muted hover:text-foreground")}
      >
        <ChevronRightIcon />
      </button>

      {showFirstLast && (
        <button
          type="button"
          aria-label="Son sayfa"
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
          className={cn(btnBase, "text-foreground-muted hover:bg-background-muted hover:text-foreground")}
        >
          <ChevronsRightIcon />
        </button>
      )}
    </nav>
  );
}
