"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type KanbanPriority = "low" | "medium" | "high" | "critical";
export type KanbanColor = "slate" | "blue" | "violet" | "amber" | "emerald" | "rose";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  priority?: KanbanPriority;
  assignee?: { name: string; avatar?: string };
  tags?: string[];
  dueDate?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: KanbanColor;
  cards: KanbanCard[];
  limit?: number;
}

export interface KanbanBoardProps {
  columns: KanbanColumn[];
  onChange?: (columns: KanbanColumn[]) => void;
  className?: string;
}

/* ─── Constants ──────────────────────────────────────────────── */

const priorityStyles: Record<KanbanPriority, string> = {
  low:      "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
  medium:   "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  high:     "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const priorityLabels: Record<KanbanPriority, string> = {
  low: "Düşük", medium: "Orta", high: "Yüksek", critical: "Kritik",
};

const colHeaderColors: Record<KanbanColor, string> = {
  slate:   "bg-slate-500",
  blue:    "bg-blue-500",
  violet:  "bg-violet-500",
  amber:   "bg-amber-500",
  emerald: "bg-emerald-500",
  rose:    "bg-rose-500",
};

/* ─── Avatar ─────────────────────────────────────────────────── */

function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) return <img src={avatar} alt={name} className="size-6 rounded-full object-cover" />;
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["bg-violet-200 text-violet-800", "bg-blue-200 text-blue-800", "bg-emerald-200 text-emerald-800", "bg-amber-200 text-amber-800"];
  return (
    <span className={cn("size-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0", colors[initials.charCodeAt(0) % colors.length])}>
      {initials}
    </span>
  );
}

/* ─── Card ───────────────────────────────────────────────────── */

function Card({
  card,
  onDragStart,
}: {
  card: KanbanCard;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className={cn(
        "bg-surface rounded-[var(--radius-lg)] border border-border p-3 cursor-grab active:cursor-grabbing",
        "shadow-sm hover:shadow-md transition-shadow duration-150 select-none",
        "hover:border-border-strong"
      )}
    >
      {/* Tags */}
      {card.tags && card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.tags.map(tag => (
            <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-primary-subtle text-primary">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <p className="text-sm font-medium text-foreground leading-snug">{card.title}</p>

      {/* Description */}
      {card.description && (
        <p className="text-xs text-foreground-muted mt-1 leading-relaxed line-clamp-2">{card.description}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-2.5">
        <div className="flex items-center gap-1.5">
          {card.priority && (
            <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full", priorityStyles[card.priority])}>
              {priorityLabels[card.priority]}
            </span>
          )}
          {card.dueDate && (
            <span className="text-[10px] text-foreground-subtle flex items-center gap-0.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              {card.dueDate}
            </span>
          )}
        </div>
        {card.assignee && <Avatar name={card.assignee.name} avatar={card.assignee.avatar} />}
      </div>
    </div>
  );
}

/* ─── Column ─────────────────────────────────────────────────── */

function Column({
  column,
  onDragStart,
  onDrop,
  onDragOver,
  onDragLeave,
  isDragOver,
}: {
  column: KanbanColumn;
  onDragStart: (e: React.DragEvent, cardId: string, fromColumnId: string) => void;
  onDrop: (e: React.DragEvent, toColumnId: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDragLeave: () => void;
  isDragOver: boolean;
}) {
  const color = column.color ?? "slate";
  const isOverLimit = column.limit !== undefined && column.cards.length >= column.limit;

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={cn("w-2.5 h-2.5 rounded-full", colHeaderColors[color])} aria-hidden="true" />
        <h3 className="text-sm font-semibold text-foreground flex-1">{column.title}</h3>
        <div className="flex items-center gap-1.5">
          <span className={cn("text-xs font-medium tabular-nums px-1.5 py-0.5 rounded-full", isOverLimit ? "bg-danger-subtle text-danger" : "bg-background-muted text-foreground-muted")}>
            {column.cards.length}{column.limit ? `/${column.limit}` : ""}
          </span>
        </div>
      </div>

      {/* Drop zone */}
      <div
        onDrop={(e) => onDrop(e, column.id)}
        onDragOver={(e) => onDragOver(e, column.id)}
        onDragLeave={onDragLeave}
        className={cn(
          "flex flex-col gap-2.5 min-h-[200px] p-2 rounded-[var(--radius-xl)] border-2 border-dashed transition-colors duration-150",
          isDragOver
            ? "border-primary bg-primary-subtle/30"
            : "border-transparent bg-background-muted/40"
        )}
      >
        {column.cards.map(card => (
          <Card
            key={card.id}
            card={card}
            onDragStart={(e, cardId) => onDragStart(e, cardId, column.id)}
          />
        ))}
        {column.cards.length === 0 && (
          <div className="flex-1 flex items-center justify-center py-8">
            <p className="text-xs text-foreground-subtle">Kart yok</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── KanbanBoard ─────────────────────────────────────────────── */

export function KanbanBoard({ columns: initialColumns, onChange, className }: KanbanBoardProps) {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const dragging = useRef<{ cardId: string; fromCol: string } | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string, fromColumnId: string) => {
    dragging.current = { cardId, fromCol: fromColumnId };
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(columnId);
  };

  const handleDragLeave = () => setDragOverCol(null);

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    setDragOverCol(null);
    if (!dragging.current) return;
    const { cardId, fromCol } = dragging.current;
    if (fromCol === toColumnId) return;

    setColumns(prev => {
      const next = prev.map(col => ({ ...col, cards: [...col.cards] }));
      const fromColObj = next.find(c => c.id === fromCol);
      const toColObj   = next.find(c => c.id === toColumnId);
      if (!fromColObj || !toColObj) return prev;

      const cardIdx = fromColObj.cards.findIndex(c => c.id === cardId);
      if (cardIdx === -1) return prev;

      const [card] = fromColObj.cards.splice(cardIdx, 1);
      toColObj.cards.push(card);
      onChange?.(next);
      return next;
    });

    dragging.current = null;
  };

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {columns.map(col => (
        <Column
          key={col.id}
          column={col}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          isDragOver={dragOverCol === col.id}
        />
      ))}
    </div>
  );
}
