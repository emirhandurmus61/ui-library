"use client";

import {
  useRef, useState, useEffect, useLayoutEffect,
  useId, useCallback, createContext, useContext,
  isValidElement, cloneElement, Children,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

/* ─── Context ────────────────────────────────────────────────── */

interface PopoverCtx {
  open:      boolean;
  setOpen:   (v: boolean) => void;
  triggerId: string;
  contentId: string;
}

const Ctx = createContext<PopoverCtx | null>(null);

function usePopover() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("Popover bileşenleri <Popover> içinde kullanılmalıdır.");
  return ctx;
}

/* ─── Types ──────────────────────────────────────────────────── */

export type PopoverSide    = "top" | "bottom" | "left" | "right";
export type PopoverAlign   = "start" | "center" | "end";
export type PopoverTrigger = "click" | "hover";

export interface PopoverProps {
  children:  React.ReactNode;
  open?:     boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}

export interface PopoverTriggerProps {
  children:  React.ReactNode;
  trigger?:  PopoverTrigger;
  className?: string;
}

export interface PopoverContentProps {
  children:   React.ReactNode;
  side?:      PopoverSide;
  align?:     PopoverAlign;
  sideOffset?: number;
  className?: string;
  /** Dışarı tıklayınca kapat (default: true) */
  closeOnOutside?: boolean;
  /** Escape ile kapat (default: true) */
  closeOnEscape?:  boolean;
  /** Ok göster */
  showArrow?: boolean;
}

/* ─── Root ───────────────────────────────────────────────────── */

export function Popover({ children, open: openProp, onOpenChange, defaultOpen = false }: PopoverProps) {
  const triggerId = useId();
  const contentId = useId();
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp! : internalOpen;

  const setOpen = useCallback((v: boolean) => {
    if (!isControlled) setInternalOpen(v);
    onOpenChange?.(v);
  }, [isControlled, onOpenChange]);

  return (
    <Ctx.Provider value={{ open, setOpen, triggerId, contentId }}>
      {children}
    </Ctx.Provider>
  );
}

/* ─── Trigger ────────────────────────────────────────────────── */

export function PopoverTrigger({ children, trigger = "click", className }: PopoverTriggerProps) {
  const { open, setOpen, triggerId, contentId } = usePopover();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlers =
    trigger === "hover"
      ? {
          onMouseEnter: () => { hoverTimer.current && clearTimeout(hoverTimer.current); setOpen(true); },
          onMouseLeave: () => { hoverTimer.current = setTimeout(() => setOpen(false), 120); },
        }
      : { onClick: () => setOpen(!open) };

  const triggerProps = {
    id: triggerId,
    "aria-expanded": open,
    "aria-controls": contentId,
    ...handlers,
  };

  // If child is a React element (e.g. <Button>), inject props directly to avoid
  // nested <button> hydration errors.
  const child = Children.only(children);
  if (isValidElement(child)) {
    return cloneElement(child as React.ReactElement<Record<string, unknown>>, {
      ...triggerProps,
      className: cn((child.props as Record<string, unknown>).className as string | undefined, className),
    });
  }

  // Fallback: plain wrapper for non-element children (text, etc.)
  return (
    <button
      type="button"
      className={cn("inline-flex", className)}
      {...triggerProps}
    >
      {children}
    </button>
  );
}

/* ─── Content ────────────────────────────────────────────────── */

export function PopoverContent({
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  className,
  closeOnOutside = true,
  closeOnEscape = true,
  showArrow = false,
}: PopoverContentProps) {
  const { open, setOpen, triggerId, contentId } = usePopover();
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState<React.CSSProperties>({});
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  /* Position */
  useLayoutEffect(() => {
    if (!open) return;
    const trigger = document.getElementById(triggerId);
    if (!trigger || !contentRef.current) return;

    const tr = trigger.getBoundingClientRect();
    const cr = contentRef.current.getBoundingClientRect();
    let top = 0, left = 0;

    if (side === "bottom") {
      top  = tr.bottom + sideOffset;
      left = align === "start" ? tr.left : align === "end" ? tr.right - cr.width : tr.left + tr.width / 2 - cr.width / 2;
    } else if (side === "top") {
      top  = tr.top - cr.height - sideOffset;
      left = align === "start" ? tr.left : align === "end" ? tr.right - cr.width : tr.left + tr.width / 2 - cr.width / 2;
    } else if (side === "right") {
      top  = align === "start" ? tr.top : align === "end" ? tr.bottom - cr.height : tr.top + tr.height / 2 - cr.height / 2;
      left = tr.right + sideOffset;
    } else {
      top  = align === "start" ? tr.top : align === "end" ? tr.bottom - cr.height : tr.top + tr.height / 2 - cr.height / 2;
      left = tr.left - cr.width - sideOffset;
    }

    // Viewport clamp
    left = Math.max(8, Math.min(left, window.innerWidth - cr.width - 8));
    top  = Math.max(8, Math.min(top,  window.innerHeight - cr.height - 8));

    setPos({ position: "fixed", top, left, zIndex: 9998 });
  }, [open, side, align, sideOffset, triggerId]);

  /* Outside click */
  useEffect(() => {
    if (!open || !closeOnOutside) return;
    const handler = (e: MouseEvent) => {
      const trigger = document.getElementById(triggerId);
      if (
        contentRef.current && !contentRef.current.contains(e.target as Node) &&
        trigger && !trigger.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closeOnOutside, triggerId, setOpen]);

  /* Escape */
  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, setOpen]);

  if (!mounted || !open) return null;

  const ARROW_CLASS: Record<PopoverSide, string> = {
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-surface-overlay border-x-transparent border-t-transparent",
    top:    "top-full  left-1/2 -translate-x-1/2 border-t-surface-overlay border-x-transparent border-b-transparent",
    right:  "right-full top-1/2 -translate-y-1/2 border-r-surface-overlay border-y-transparent border-l-transparent",
    left:   "left-full  top-1/2 -translate-y-1/2 border-l-surface-overlay border-y-transparent border-r-transparent",
  };

  return createPortal(
    <div
      ref={contentRef}
      id={contentId}
      role="dialog"
      style={pos}
      className={cn(
        "bg-surface-overlay border border-border rounded-[var(--radius-xl)]",
        "shadow-lg",
        "animate-in fade-in-0 zoom-in-95 duration-150",
        className
      )}
    >
      {showArrow && (
        <div className={cn("absolute w-0 h-0 border-8", ARROW_CLASS[side])} />
      )}
      {children}
    </div>,
    document.body
  );
}

/* ─── Convenience close button hook ─────────────────────────── */

export function usePopoverClose() {
  const { setOpen } = usePopover();
  return () => setOpen(false);
}
