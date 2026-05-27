"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function SortIcon({ direction }: { direction: "asc" | "desc" | null }) {
  if (direction === "asc") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-primary" aria-hidden="true">
        <path d="m18 15-6-6-6 6" />
      </svg>
    );
  }
  if (direction === "desc") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-primary" aria-hidden="true">
        <path d="m6 9 6 6 6-6" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle" aria-hidden="true">
      <path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  key: string;
  header: React.ReactNode;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  emptyText?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Table<T>({
  columns,
  data,
  keyExtractor,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  emptyText = "Veri bulunamadı.",
  className,
  onRowClick,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = useCallback((key: string) => {
    setSortKey((prev) => {
      if (prev !== key) {
        setSortDir("asc");
        return key;
      }
      setSortDir((d) => {
        if (d === "asc") return "desc";
        if (d === "desc") { setSortKey(null); return null; }
        return "asc";
      });
      return prev;
    });
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return 0;
    const av = col.accessor(a);
    const bv = col.accessor(b);
    const as = String(av ?? "");
    const bs = String(bv ?? "");
    return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
  });

  const alignClass = { left: "text-left", center: "text-center", right: "text-right" };
  const cellPy = compact ? "py-2" : "py-3.5";

  return (
    <div className={cn("w-full overflow-x-auto rounded-[var(--radius-lg)] border border-border", className)}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border bg-background-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={cn(
                  "px-4 py-3 font-semibold text-foreground-muted whitespace-nowrap",
                  alignClass[col.align ?? "left"],
                  col.sortable && "cursor-pointer select-none hover:text-foreground transition-colors",
                  stickyHeader && "sticky top-0 bg-background-muted z-10",
                  bordered && "border-r border-border last:border-r-0"
                )}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={
                  sortKey === col.key
                    ? sortDir === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
              >
                <span className="inline-flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    <SortIcon direction={sortKey === col.key ? sortDir : null} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-foreground-muted"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => (
              <tr
                key={keyExtractor(row)}
                className={cn(
                  "border-b border-border last:border-b-0 transition-colors duration-100",
                  striped && i % 2 === 1 && "bg-background-subtle",
                  hoverable && "hover:bg-background-muted",
                  onRowClick && "cursor-pointer"
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      `px-4 ${cellPy} text-foreground`,
                      alignClass[col.align ?? "left"],
                      bordered && "border-r border-border last:border-r-0"
                    )}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
