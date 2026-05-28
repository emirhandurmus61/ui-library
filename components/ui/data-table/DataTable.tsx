"use client";

import { useState, useCallback, useRef, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function SortAscIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-primary" aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function SortDescIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-primary" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function SortNoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle" aria-hidden="true">
      <path d="m7 15 5 5 5-5" /><path d="m7 9 5-5 5 5" />
    </svg>
  );
}

function ChevronRightIcon({ open }: { open: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3.5 text-foreground-muted transition-transform duration-150", open && "rotate-90")} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ColumnsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect width="18" height="18" x="3" y="3" rx="2" /><path d="M12 3v18M3 9h18M3 15h18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function XSmallIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export type SortDirection = "asc" | "desc" | null;

export interface DataTableColumn<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  /** Raw string value used for sorting, filtering and export */
  rawValue?: (row: T) => string | number;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  /** Render an editable input for this cell; receives current value and setter */
  editable?: boolean;
  /** Raw value type for inline editing */
  editAccessor?: (row: T) => string;
  onEdit?: (row: T, newValue: string) => void;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  /** Render expanded row content */
  expandedRow?: (row: T) => React.ReactNode;
  /** Enable checkbox row selection */
  selectable?: boolean;
  onSelectionChange?: (selectedKeys: (string | number)[]) => void;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  emptyText?: string;
  /** Show toolbar with filter, column visibility, export buttons */
  toolbar?: boolean;
  exportFilename?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}

/* ─── Toolbar Button ─────────────────────────────────────────── */

function ToolbarButton({ children, active, onClick, title }: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-background-muted text-foreground-muted border border-border hover:bg-background-subtle hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

/* ─── DataTable ──────────────────────────────────────────────── */

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  expandedRow,
  selectable = false,
  onSelectionChange,
  striped = false,
  hoverable = true,
  bordered = false,
  compact = false,
  stickyHeader = false,
  emptyText = "Veri bulunamadı.",
  toolbar = true,
  exportFilename = "export",
  className,
  onRowClick,
}: DataTableProps<T>) {
  const id = useId();

  /* Sort */
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  /* Selection */
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  /* Expanded rows */
  const [expandedKeys, setExpandedKeys] = useState<Set<string | number>>(new Set());

  /* Column visibility */
  const [hiddenCols, setHiddenCols] = useState<Set<string>>(new Set());
  const [showColMenu, setShowColMenu] = useState(false);
  const colMenuRef = useRef<HTMLDivElement>(null);

  /* Filters */
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string>>({});

  /* Inline edit */
  const [editingCell, setEditingCell] = useState<{ rowKey: string | number; colKey: string } | null>(null);
  const [editValue, setEditValue] = useState("");

  /* ── Sort handler ── */
  const handleSort = useCallback((key: string) => {
    if (sortKey !== key) {
      setSortKey(key); setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null); setSortDir(null);
    }
  }, [sortKey, sortDir]);

  /* ── Filter + Sort pipeline ── */
  const filteredData = data.filter((row) => {
    return columns.every((col) => {
      const f = filters[col.key];
      if (!f) return true;
      const raw = col.rawValue ? String(col.rawValue(row)) : String(col.accessor(row) ?? "");
      return raw.toLowerCase().includes(f.toLowerCase());
    });
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return 0;
    const av = col.rawValue ? col.rawValue(a) : String(col.accessor(a) ?? "");
    const bv = col.rawValue ? col.rawValue(b) : String(col.accessor(b) ?? "");
    const as = String(av); const bs = String(bv);
    const numA = Number(av); const numB = Number(bv);
    if (!isNaN(numA) && !isNaN(numB)) {
      return sortDir === "asc" ? numA - numB : numB - numA;
    }
    return sortDir === "asc" ? as.localeCompare(bs, "tr") : bs.localeCompare(as, "tr");
  });

  const visibleColumns = columns.filter((c) => !hiddenCols.has(c.key));

  /* ── Selection helpers ── */
  const allKeys = sortedData.map((r) => keyExtractor(r));
  const allSelected = allKeys.length > 0 && allKeys.every((k) => selectedKeys.has(k));
  const someSelected = allKeys.some((k) => selectedKeys.has(k)) && !allSelected;

  const toggleAll = () => {
    const next = allSelected
      ? new Set<string | number>()
      : new Set<string | number>(allKeys);
    setSelectedKeys(next);
    onSelectionChange?.([...next]);
  };

  const toggleRow = (key: string | number) => {
    const next = new Set(selectedKeys);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelectedKeys(next);
    onSelectionChange?.([...next]);
  };

  /* ── Expand helpers ── */
  const toggleExpand = (key: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  /* ── Inline edit helpers ── */
  const startEdit = (rowKey: string | number, col: DataTableColumn<T>, row: T, e: React.MouseEvent) => {
    e.stopPropagation();
    const val = col.editAccessor ? col.editAccessor(row) : String(col.rawValue ? col.rawValue(row) : col.accessor(row) ?? "");
    setEditingCell({ rowKey, colKey: col.key });
    setEditValue(val);
  };

  const commitEdit = (col: DataTableColumn<T>, row: T) => {
    col.onEdit?.(row, editValue);
    setEditingCell(null);
  };

  const cancelEdit = () => setEditingCell(null);

  /* ── Export ── */
  const exportData = (format: "csv" | "json") => {
    const exportCols = visibleColumns.filter((c) => c.rawValue);
    if (format === "csv") {
      const header = exportCols.map((c) => `"${c.header}"`).join(",");
      const rows = sortedData.map((row) =>
        exportCols.map((c) => `"${String(c.rawValue!(row)).replace(/"/g, '""')}"`).join(",")
      );
      const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
      downloadBlob(blob, `${exportFilename}.csv`);
    } else {
      const rows = sortedData.map((row) =>
        Object.fromEntries(exportCols.map((c) => [c.key, c.rawValue!(row)]))
      );
      const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
      downloadBlob(blob, `${exportFilename}.json`);
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  /* ── Active filter count ── */
  const activeFilters = Object.values(filters).filter(Boolean).length;

  /* ── Styles ── */
  const alignClass = { left: "text-left", center: "text-center", right: "text-right" };
  const cellPy = compact ? "py-2" : "py-3.5";

  return (
    <div className={cn("w-full space-y-2", className)}>

      {/* ── Toolbar ── */}
      {toolbar && (
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Filter toggle */}
            <ToolbarButton
              active={showFilters}
              onClick={() => setShowFilters((v) => !v)}
              title="Filtrele"
            >
              <FilterIcon />
              Filtrele
              {activeFilters > 0 && (
                <span className="ml-0.5 bg-primary-foreground/20 text-primary-foreground rounded-full px-1 text-[10px] leading-none py-0.5">
                  {activeFilters}
                </span>
              )}
            </ToolbarButton>

            {/* Column visibility */}
            <div className="relative" ref={colMenuRef}>
              <ToolbarButton
                active={showColMenu}
                onClick={() => setShowColMenu((v) => !v)}
                title="Kolonları göster/gizle"
              >
                <ColumnsIcon />
                Kolonlar
              </ToolbarButton>
              {showColMenu && (
                <div
                  className="absolute top-full left-0 mt-1 z-20 w-44 bg-surface border border-border rounded-[var(--radius-lg)] shadow-lg py-1"
                  onMouseLeave={() => setShowColMenu(false)}
                >
                  {columns.map((col) => {
                    const hidden = hiddenCols.has(col.key);
                    return (
                      <button
                        key={col.key}
                        type="button"
                        className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-foreground hover:bg-background-muted transition-colors"
                        onClick={() => {
                          setHiddenCols((prev) => {
                            const next = new Set(prev);
                            hidden ? next.delete(col.key) : next.add(col.key);
                            return next;
                          });
                        }}
                      >
                        <span className={cn("size-4 rounded border border-border flex items-center justify-center shrink-0", !hidden && "bg-primary border-primary")}>
                          {!hidden && <CheckIcon />}
                        </span>
                        {col.header}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Active filter badges */}
            {Object.entries(filters).filter(([, v]) => v).map(([key, val]) => {
              const col = columns.find((c) => c.key === key);
              return (
                <span key={key} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-primary-subtle text-primary border border-primary/20">
                  {col?.header}: <strong>{val}</strong>
                  <button
                    type="button"
                    onClick={() => setFilters((f) => { const n = { ...f }; delete n[key]; return n; })}
                    className="ml-0.5 hover:text-danger transition-colors"
                  >
                    <XSmallIcon />
                  </button>
                </span>
              );
            })}
          </div>

          {/* Export */}
          <div className="flex items-center gap-1.5">
            <ToolbarButton onClick={() => exportData("csv")} title="CSV olarak indir">
              <DownloadIcon /> CSV
            </ToolbarButton>
            <ToolbarButton onClick={() => exportData("json")} title="JSON olarak indir">
              <DownloadIcon /> JSON
            </ToolbarButton>
          </div>
        </div>
      )}

      {/* ── Selection info bar ── */}
      {selectable && selectedKeys.size > 0 && (
        <div className="flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] bg-primary-subtle border border-primary/20 text-sm text-primary">
          <span><strong>{selectedKeys.size}</strong> satır seçildi</span>
          <button
            type="button"
            className="text-xs underline hover:no-underline"
            onClick={() => { setSelectedKeys(new Set()); onSelectionChange?.([]); }}
          >
            Seçimi temizle
          </button>
        </div>
      )}

      {/* ── Table ── */}
      <div className="w-full overflow-x-auto rounded-[var(--radius-lg)] border border-border">
        <table className="w-full text-sm border-collapse">
          <thead>
            {/* Filter row */}
            {showFilters && (
              <tr className="border-b border-border bg-background-subtle">
                {selectable && <th className="w-10 px-3 py-2" />}
                {expandedRow && <th className="w-8 px-2 py-2" />}
                {visibleColumns.map((col) => (
                  <th key={col.key} className="px-3 py-2">
                    {col.filterable !== false && (
                      <input
                        type="text"
                        placeholder={`${col.header}...`}
                        value={filters[col.key] ?? ""}
                        onChange={(e) => setFilters((f) => ({ ...f, [col.key]: e.target.value }))}
                        className={cn(
                          "w-full h-7 px-2 text-xs rounded-[var(--radius-sm)]",
                          "bg-background border border-border",
                          "text-foreground placeholder:text-foreground-subtle",
                          "focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary",
                          "transition-colors"
                        )}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}

            {/* Header row */}
            <tr className="border-b border-border bg-background-muted">
              {/* Select-all checkbox */}
              {selectable && (
                <th className="w-10 px-3 py-3" scope="col">
                  <input
                    id={`${id}-select-all`}
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => { if (el) el.indeterminate = someSelected; }}
                    onChange={toggleAll}
                    className="size-4 accent-primary cursor-pointer"
                    aria-label="Tümünü seç"
                  />
                </th>
              )}
              {/* Expand spacer */}
              {expandedRow && <th className="w-8 px-2 py-3" scope="col" />}
              {/* Columns */}
              {visibleColumns.map((col) => (
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
                      ? sortDir === "asc" ? "ascending" : "descending"
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && (
                      sortKey === col.key
                        ? sortDir === "asc" ? <SortAscIcon /> : <SortDescIcon />
                        : <SortNoneIcon />
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
                  colSpan={visibleColumns.length + (selectable ? 1 : 0) + (expandedRow ? 1 : 0)}
                  className="px-4 py-10 text-center text-foreground-muted"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((row, i) => {
                const rowKey = keyExtractor(row);
                const isSelected = selectedKeys.has(rowKey);
                const isExpanded = expandedKeys.has(rowKey);

                return [
                  /* ── Main row ── */
                  <tr
                    key={rowKey}
                    className={cn(
                      "border-b border-border transition-colors duration-100",
                      !isExpanded && "last:border-b-0",
                      striped && i % 2 === 1 && "bg-background-subtle",
                      hoverable && "hover:bg-background-muted",
                      isSelected && "bg-primary-subtle hover:bg-primary-subtle",
                      onRowClick && "cursor-pointer"
                    )}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {/* Checkbox */}
                    {selectable && (
                      <td className="w-10 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(rowKey)}
                          className="size-4 accent-primary cursor-pointer"
                          aria-label={`Satırı seç`}
                        />
                      </td>
                    )}

                    {/* Expand toggle */}
                    {expandedRow && (
                      <td className="w-8 px-2">
                        <button
                          type="button"
                          onClick={(e) => toggleExpand(rowKey, e)}
                          className="flex items-center justify-center size-5 rounded hover:bg-background-subtle transition-colors"
                          aria-expanded={isExpanded}
                          aria-label="Satırı genişlet"
                        >
                          <ChevronRightIcon open={isExpanded} />
                        </button>
                      </td>
                    )}

                    {/* Cells */}
                    {visibleColumns.map((col) => {
                      const isEditing = editingCell?.rowKey === rowKey && editingCell?.colKey === col.key;

                      return (
                        <td
                          key={col.key}
                          className={cn(
                            `px-4 ${cellPy} text-foreground`,
                            alignClass[col.align ?? "left"],
                            bordered && "border-r border-border last:border-r-0",
                            col.editable && "group relative"
                          )}
                          onDoubleClick={col.editable ? (e) => startEdit(rowKey, col, row, e) : undefined}
                        >
                          {isEditing ? (
                            <input
                              autoFocus
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={() => commitEdit(col, row)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") commitEdit(col, row);
                                if (e.key === "Escape") cancelEdit();
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-1.5 py-0.5 text-sm rounded border border-primary bg-background focus:outline-none focus:ring-1 focus:ring-primary/40"
                            />
                          ) : (
                            <span className="flex items-center gap-1.5">
                              {col.accessor(row)}
                              {col.editable && (
                                <button
                                  type="button"
                                  onClick={(e) => startEdit(rowKey, col, row, e)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-background-muted text-foreground-subtle hover:text-foreground"
                                  aria-label="Düzenle"
                                >
                                  <PencilIcon />
                                </button>
                              )}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>,

                  /* ── Expanded content row ── */
                  isExpanded && expandedRow ? (
                    <tr key={`${rowKey}-expanded`} className="border-b border-border last:border-b-0 bg-background-subtle">
                      <td
                        colSpan={visibleColumns.length + (selectable ? 1 : 0) + 1}
                        className="px-6 py-4"
                      >
                        {expandedRow(row)}
                      </td>
                    </tr>
                  ) : null,
                ];
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
