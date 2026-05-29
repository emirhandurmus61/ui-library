"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  badge?: string | number;
  disabled?: boolean;
  defaultExpanded?: boolean;
}

export type TreeViewVariant = "default" | "files" | "minimal" | "bordered";

export interface TreeViewProps {
  nodes: TreeNode[];
  variant?: TreeViewVariant;
  selectable?: boolean;
  multiSelect?: boolean;
  defaultSelected?: string[];
  onSelect?: (ids: string[]) => void;
  className?: string;
}

/* ─── File/folder icons ──────────────────────────────────────── */

function FolderIcon({ open }: { open: boolean }) {
  return open ? (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-amber-400 shrink-0" aria-hidden="true">
      <path d="M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v2"/><path d="M21 19H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h14v10Z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-amber-400 shrink-0" aria-hidden="true">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-foreground-muted shrink-0" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3 text-foreground-subtle transition-transform duration-150 shrink-0", open && "rotate-90")} aria-hidden="true">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

/* ─── Node with per-node state ───────────────────────────────── */

function TreeNodeItemWrapper({
  node,
  depth,
  variant,
  selectable,
  selectedIds,
  onToggleSelect,
}: {
  node: TreeNode;
  depth: number;
  variant: TreeViewVariant;
  selectable: boolean;
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(node.defaultExpanded ?? depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedIds.has(node.id);
  const indentWidth = depth * 16;

  const rowBase = cn(
    "group flex items-center gap-1.5 w-full text-left py-1 px-2 rounded-[var(--radius-md)] transition-colors duration-100 min-h-[28px]",
    node.disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
    isSelected
      ? "bg-primary-subtle text-primary"
      : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
  );

  return (
    <li className="select-none">
      <div style={{ paddingLeft: `${indentWidth}px` }}>
        <button
          className={rowBase}
          disabled={node.disabled}
          onClick={() => {
            if (hasChildren) setExpanded(v => !v);
            if (selectable && !node.disabled) onToggleSelect(node.id);
          }}
          aria-expanded={hasChildren ? expanded : undefined}
        >
          <span className="size-3 flex items-center justify-center shrink-0">
            {hasChildren ? <ChevronIcon open={expanded} /> : null}
          </span>
          {node.icon ? (
            <span className="shrink-0 size-4 flex items-center justify-center">{node.icon}</span>
          ) : variant === "files" ? (
            hasChildren ? <FolderIcon open={expanded} /> : <FileIcon />
          ) : null}
          <span className="flex-1 text-sm truncate">{node.label}</span>
          {node.badge !== undefined && (
            <span className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-background-muted text-foreground-muted">
              {node.badge}
            </span>
          )}
        </button>
      </div>
      {hasChildren && expanded && (
        <ul role="group">
          {node.children!.map(child => (
            <TreeNodeItemWrapper
              key={child.id}
              node={child}
              depth={depth + 1}
              variant={variant}
              selectable={selectable}
              selectedIds={selectedIds}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

/* ─── TreeView ───────────────────────────────────────────────── */

export function TreeView({
  nodes,
  variant = "default",
  selectable = false,
  multiSelect = false,
  defaultSelected = [],
  onSelect,
  className,
}: TreeViewProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(defaultSelected));

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (multiSelect) {
        if (next.has(id)) next.delete(id);
        else next.add(id);
      } else {
        if (next.has(id)) next.clear();
        else { next.clear(); next.add(id); }
      }
      onSelect?.(Array.from(next));
      return next;
    });
  };

  return (
    <div className={cn("w-full", className)}>
      <ul
        role="tree"
        className={cn(
          "space-y-0.5",
          variant === "bordered" && "border border-border rounded-[var(--radius-xl)] divide-y divide-border overflow-hidden"
        )}
      >
        {nodes.map(node => (
          <TreeNodeItemWrapper
            key={node.id}
            node={node}
            depth={0}
            variant={variant}
            selectable={selectable}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </ul>
    </div>
  );
}
