"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const toastVariants = cva(
  [
    "relative flex items-start gap-3 w-full max-w-sm",
    "rounded-[var(--radius-lg)] border px-4 py-3.5",
    "shadow-lg pointer-events-auto",
    "transition-all duration-300",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface border-border text-foreground",
        success: "bg-success-subtle border-success/20 text-foreground",
        error:   "bg-danger-subtle border-danger/20 text-foreground",
        warning: "bg-warning-subtle border-warning/20 text-foreground",
        info:    "bg-info-subtle border-info/20 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ─── Icons ──────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-success mt-0.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-danger mt-0.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-warning mt-0.5" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4m0 4h.01" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-info mt-0.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

const iconMap = {
  default: null,
  success: <CheckIcon />,
  error:   <ErrorIcon />,
  warning: <WarningIcon />,
  info:    <InfoIcon />,
};

/* ─── Types ──────────────────────────────────────────────────── */

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/* ─── Context ────────────────────────────────────────────────── */

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

/* ─── Individual Toast ───────────────────────────────────────── */

function ToastItem({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mount animasyonu
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-dismiss
  useEffect(() => {
    const duration = item.duration ?? 4000;
    if (duration === Infinity) return;
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(item.id), 300);
    }, duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [item.id, item.duration, onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss(item.id), 300);
  };

  const variant = item.variant ?? "default";
  const icon = iconMap[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        toastVariants({ variant }),
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2"
      )}
    >
      {icon}
      <div className="flex-1 min-w-0">
        {item.title && (
          <p className="text-sm font-semibold text-foreground leading-snug">
            {item.title}
          </p>
        )}
        {item.description && (
          <p className="text-sm text-foreground-muted mt-0.5 leading-snug">
            {item.description}
          </p>
        )}
        {item.action && (
          <button
            onClick={item.action.onClick}
            className="mt-2 text-xs font-semibold text-primary hover:text-primary-hover underline-offset-2 hover:underline transition-colors"
          >
            {item.action.label}
          </button>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className={cn(
          "-mt-0.5 -mr-1 shrink-0 rounded-[var(--radius-sm)] p-1",
          "text-foreground-muted hover:text-foreground hover:bg-background-muted",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
        )}
        aria-label="Bildirimi kapat"
      >
        <XIcon />
      </button>
    </div>
  );
}

/* ─── Provider ───────────────────────────────────────────────── */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((options: ToastOptions): string => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, ...options }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {/* Toast container */}
      <div
        aria-label="Bildirimler"
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((item) => (
          <ToastItem key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
