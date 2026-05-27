"use client";

import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const alertVariants = cva(
  [
    "relative flex gap-3 rounded-[var(--radius-lg)] border px-4 py-3.5",
    "transition-all duration-150",
  ],
  {
    variants: {
      variant: {
        default: "bg-surface border-border text-foreground",
        info:    "bg-info-subtle border-info/20 text-foreground",
        success: "bg-success-subtle border-success/20 text-foreground",
        warning: "bg-warning-subtle border-warning/20 text-foreground",
        error:   "bg-danger-subtle border-danger/20 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ─── Icons ──────────────────────────────────────────────────── */

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4m0-4h.01" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4m0 4h.01" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
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
  default: (cls: string) => <InfoIcon className={cls} />,
  info:    (cls: string) => <InfoIcon className={cls} />,
  success: (cls: string) => <CheckIcon className={cls} />,
  warning: (cls: string) => <WarningIcon className={cls} />,
  error:   (cls: string) => <ErrorIcon className={cls} />,
};

const iconColorMap = {
  default: "text-foreground-muted",
  info:    "text-info",
  success: "text-success",
  warning: "text-warning",
  error:   "text-danger",
};

/* ─── Types ──────────────────────────────────────────────────── */

export interface AlertProps extends VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode | false;
  action?: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Alert({
  variant = "default",
  title,
  description,
  children,
  dismissible = false,
  onDismiss,
  icon,
  action,
  className,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const resolvedVariant = variant ?? "default";
  const defaultIcon = iconMap[resolvedVariant](`size-4 shrink-0 mt-0.5 ${iconColorMap[resolvedVariant]}`);

  const renderedIcon = icon === false ? null : icon ?? defaultIcon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
    >
      {renderedIcon && <span>{renderedIcon}</span>}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold text-foreground leading-snug">
            {title}
          </p>
        )}
        {(description || children) && (
          <div className={cn("text-sm text-foreground-muted leading-snug", title && "mt-1")}>
            {description ?? children}
          </div>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>

      {dismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            "-mt-0.5 -mr-1 shrink-0 rounded-[var(--radius-sm)] p-1",
            "text-foreground-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary"
          )}
          aria-label="Kapat"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}
