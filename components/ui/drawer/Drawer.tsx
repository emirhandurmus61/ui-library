"use client";

import { useEffect, useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const drawerVariants = cva(
  [
    "fixed z-50 bg-surface border-border",
    "flex flex-col",
    "shadow-xl",
    "transition-transform duration-300 ease-in-out",
  ],
  {
    variants: {
      side: {
        left:   "inset-y-0 left-0 border-r w-80 max-w-[85vw]",
        right:  "inset-y-0 right-0 border-l w-80 max-w-[85vw]",
        bottom: "inset-x-0 bottom-0 border-t rounded-t-[var(--radius-xl)] max-h-[85vh]",
        top:    "inset-x-0 top-0 border-b rounded-b-[var(--radius-xl)] max-h-[85vh]",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

const translateMap = {
  left:   { closed: "-translate-x-full", open: "translate-x-0" },
  right:  { closed: "translate-x-full",  open: "translate-x-0" },
  bottom: { closed: "translate-y-full",  open: "translate-y-0" },
  top:    { closed: "-translate-y-full", open: "translate-y-0" },
} as const;

/* ─── Icons ──────────────────────────────────────────────────── */

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface DrawerProps extends VariantProps<typeof drawerVariants> {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Drawer({
  open,
  onClose,
  title,
  description,
  footer,
  hideCloseButton = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  side = "right",
  className,
  children,
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!closeOnEscape || !open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, handleClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open && drawerRef.current) drawerRef.current.focus();
  }, [open]);

  const resolvedSide = side ?? "right";
  const { closed, open: openClass } = translateMap[resolvedSide];

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={closeOnBackdropClick ? handleClose : undefined}
      />

      {/* Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={cn(
          drawerVariants({ side }),
          open ? openClass : closed,
          "focus:outline-none",
          className
        )}
      >
        {/* Handle (bottom/top drawer için) */}
        {(resolvedSide === "bottom" || resolvedSide === "top") && (
          <div className="flex justify-center pt-3 pb-1 shrink-0">
            <div className="w-10 h-1 rounded-full bg-border" aria-hidden="true" />
          </div>
        )}

        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3 shrink-0">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="drawer-title"
                  className="text-base font-semibold text-foreground leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-foreground-muted">{description}</p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                onClick={handleClose}
                className={cn(
                  "shrink-0 rounded-[var(--radius-md)] p-1.5 -mt-0.5 -mr-1",
                  "text-foreground-muted hover:text-foreground hover:bg-background-muted",
                  "transition-colors duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                )}
                aria-label="Kapat"
              >
                <XIcon />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        {children && (
          <div className="flex-1 overflow-y-auto px-5 py-2 min-h-0">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-5 py-4 border-t border-border shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
