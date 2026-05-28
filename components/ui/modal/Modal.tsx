"use client";

import { useEffect, useRef, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const modalVariants = cva(
  [
    "relative bg-surface rounded-[var(--radius-xl)]",
    "shadow-xl border border-border",
    "w-full mx-4",
    "flex flex-col max-h-[calc(100vh-4rem)]",
  ],
  {
    variants: {
      size: {
        sm:   "max-w-sm",
        md:   "max-w-md",
        lg:   "max-w-lg",
        xl:   "max-w-xl",
        "2xl": "max-w-2xl",
        full: "max-w-full mx-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

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

export interface ModalProps extends VariantProps<typeof modalVariants> {
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

export function Modal({
  open,
  onClose,
  title,
  description,
  footer,
  hideCloseButton = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  size,
  className,
  children,
}: ModalProps) {
  const dialogRef   = useRef<HTMLDivElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Escape tuşu ile kapanma
  useEffect(() => {
    if (!closeOnEscape || !open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, handleClose]);

  // Scroll kilit
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus yönetimi: açılırken trigger'ı sakla, kapanırken geri ver
  useEffect(() => {
    if (open) {
      prevFocusRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.focus();
    } else {
      prevFocusRef.current?.focus();
      prevFocusRef.current = null;
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
        onClick={closeOnBackdropClick ? handleClose : undefined}
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={cn(
          modalVariants({ size }),
          "animate-in fade-in zoom-in-95 duration-200",
          "focus:outline-none",
          className
        )}
      >
        {/* Header */}
        {(title || !hideCloseButton) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
            <div className="flex-1 min-w-0">
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-foreground leading-tight"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className="mt-1 text-sm text-foreground-muted"
                >
                  {description}
                </p>
              )}
            </div>
            {!hideCloseButton && (
              <button
                onClick={handleClose}
                className={cn(
                  "shrink-0 rounded-[var(--radius-md)] p-1.5 -mt-0.5 -mr-1.5",
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
          <div className="flex-1 overflow-y-auto px-6 py-2 min-h-0">
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 pt-4 border-t border-border shrink-0 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
