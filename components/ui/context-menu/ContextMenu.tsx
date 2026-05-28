"use client";

import {
  useRef, useState, useEffect, useCallback,
  createContext, useContext, useId,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ContextMenuItemDef {
  type?:     "item" | "divider" | "label";
  label?:    string;
  icon?:     React.ReactNode;
  shortcut?: string;
  danger?:   boolean;
  disabled?: boolean;
  onClick?:  () => void;
  /** Alt menü */
  children?: ContextMenuItemDef[];
}

export interface ContextMenuProps {
  items:     ContextMenuItemDef[];
  children:  React.ReactNode;
  className?: string;
  disabled?:  boolean;
}

/* ─── Context ────────────────────────────────────────────────── */

interface Ctx { close: () => void }
const MenuCtx = createContext<Ctx>({ close: () => {} });

/* ─── Menu panel ─────────────────────────────────────────────── */

function MenuPanel({
  items,
  style,
  onClose,
  depth = 0,
}: {
  items:   ContextMenuItemDef[];
  style?:  React.CSSProperties;
  onClose: () => void;
  depth?:  number;
}) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <div
      ref={panelRef}
      role="menu"
      aria-orientation="vertical"
      style={style}
      className={cn(
        "bg-surface-overlay border border-border rounded-[var(--radius-lg)]",
        "shadow-lg py-1 min-w-[180px]",
        "animate-in fade-in-0 zoom-in-95 duration-100",
        depth > 0 && "absolute"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, idx) => {
        if (item.type === "divider") return <div key={idx} className="my-1 border-t border-border" />;
        if (item.type === "label") return (
          <p key={idx} className="px-3 py-1 text-xs font-semibold text-foreground-subtle uppercase tracking-wider">{item.label}</p>
        );

        const hasSub = item.children && item.children.length > 0;

        return (
          <div
            key={idx}
            role="menuitem"
            aria-haspopup={hasSub}
            aria-disabled={item.disabled}
            className="relative"
            onMouseEnter={() => {
              hoverTimer.current && clearTimeout(hoverTimer.current);
              setActiveIdx(idx);
            }}
            onMouseLeave={() => {
              hoverTimer.current = setTimeout(() => setActiveIdx(null), 200);
            }}
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (item.disabled || hasSub) return;
                item.onClick?.();
                onClose();
              }}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-1.5 text-sm",
                "transition-colors duration-100 text-left",
                item.danger
                  ? "text-danger hover:bg-danger-subtle"
                  : "text-foreground hover:bg-background-muted",
                item.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {item.icon && (
                <span className="size-4 shrink-0 flex items-center justify-center text-foreground-subtle">
                  {item.icon}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
              {item.shortcut && (
                <kbd className="ml-auto text-xs text-foreground-subtle font-mono bg-background-muted px-1.5 py-0.5 rounded">
                  {item.shortcut}
                </kbd>
              )}
              {hasSub && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle ml-auto" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
            </button>

            {/* Sub menu */}
            {hasSub && activeIdx === idx && (
              <MenuPanel
                items={item.children!}
                onClose={onClose}
                depth={depth + 1}
                style={{ position: "absolute", top: 0, left: "100%", marginLeft: 2, zIndex: 9999 + depth + 1 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function ContextMenu({ items, children, className, disabled = false }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos,  setPos]  = useState({ x: 0, y: 0, clampedX: 0, clampedY: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    const menuW = 200, menuH = items.length * 34 + 8;
    const clampedX = Math.min(e.clientX, window.innerWidth  - menuW - 8);
    const clampedY = Math.min(e.clientY, window.innerHeight - menuH - 8);
    setPos({ x: e.clientX, y: e.clientY, clampedX, clampedY });
    setOpen(true);
  };

  /* Close on outside click / scroll / Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | KeyboardEvent) => {
      if ((e as KeyboardEvent).key === "Escape" || e.type === "mousedown") close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown",   handler);
    document.addEventListener("scroll",    close, true);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown",   handler);
      document.removeEventListener("scroll",    close, true);
    };
  }, [open, close]);

  return (
    <MenuCtx.Provider value={{ close }}>
      <div onContextMenu={handleContextMenu} className={cn("select-none", className)}>
        {children}
      </div>

      {mounted && open && createPortal(
        <div style={{ position: "fixed", left: pos.clampedX, top: pos.clampedY, zIndex: 9999 }}>
          <MenuPanel items={items} onClose={close} />
        </div>,
        document.body
      )}
    </MenuCtx.Provider>
  );
}
