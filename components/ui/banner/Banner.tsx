"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type BannerVariant = "info" | "success" | "warning" | "danger" | "neutral" | "gradient" | "dark";
export type BannerPosition = "top" | "bottom" | "inline";

export interface BannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BannerProps {
  variant?: BannerVariant;
  message: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  action?: BannerAction;
  dismissible?: boolean;
  position?: BannerPosition;
  className?: string;
}

/* ─── Variant styles ─────────────────────────────────────────── */

const variantStyles: Record<BannerVariant, { wrapper: string; icon: string; action: string }> = {
  info: {
    wrapper: "bg-info-subtle border-info/30 text-info",
    icon: "text-info",
    action: "bg-info text-white hover:bg-info/90",
  },
  success: {
    wrapper: "bg-success-subtle border-success/30 text-success",
    icon: "text-success",
    action: "bg-success text-white hover:bg-success/90",
  },
  warning: {
    wrapper: "bg-warning-subtle border-warning/30 text-warning",
    icon: "text-warning",
    action: "bg-warning text-white hover:bg-warning/90",
  },
  danger: {
    wrapper: "bg-danger-subtle border-danger/30 text-danger",
    icon: "text-danger",
    action: "bg-danger text-white hover:bg-danger/90",
  },
  neutral: {
    wrapper: "bg-background-muted border-border text-foreground",
    icon: "text-foreground-muted",
    action: "bg-foreground text-background hover:bg-foreground/90",
  },
  gradient: {
    wrapper: "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 border-transparent text-white",
    icon: "text-white/80",
    action: "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm",
  },
  dark: {
    wrapper: "bg-[#0f172a] border-white/10 text-white",
    icon: "text-white/60",
    action: "bg-white text-[#0f172a] hover:bg-white/90",
  },
};

/* ─── Default icons ──────────────────────────────────────────── */

const defaultIcons: Record<BannerVariant, React.ReactNode> = {
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  danger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="m15 9-6 6M9 9l6 6" />
    </svg>
  ),
  neutral: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
    </svg>
  ),
  gradient: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10c0-.6-.06-1.2-.16-1.78A5.5 5.5 0 0 1 13.78 2.16 10.05 10.05 0 0 0 12 2z" />
    </svg>
  ),
};

/* ─── Close button ───────────────────────────────────────────── */

function CloseButton({ onClick, light }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-[var(--radius-md)] p-1 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center",
        light ? "text-white/60 hover:text-white hover:bg-white/10" : "text-current opacity-60 hover:opacity-100 hover:bg-black/5"
      )}
      aria-label="Kapat"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

/* ─── Banner ─────────────────────────────────────────────────── */

export function Banner({
  variant = "info",
  message,
  title,
  icon,
  action,
  dismissible = true,
  position = "inline",
  className,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const styles = variantStyles[variant];
  const isLight = variant === "gradient" || variant === "dark";
  const resolvedIcon = icon ?? defaultIcons[variant];

  const positionClass =
    position === "top"
      ? "fixed top-0 inset-x-0 z-50 rounded-none border-t-0 border-x-0"
      : position === "bottom"
      ? "fixed bottom-0 inset-x-0 z-50 rounded-none border-b-0 border-x-0"
      : "rounded-[var(--radius-xl)]";

  return (
    <div
      role="alert"
      className={cn(
        "border px-4 py-3 flex items-center gap-3",
        styles.wrapper,
        positionClass,
        className
      )}
    >
      {/* Icon */}
      <span className={cn("shrink-0", styles.icon)}>{resolvedIcon}</span>

      {/* Text */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-sm font-semibold leading-snug">{title}</p>
        )}
        <p className={cn("text-sm leading-snug", title ? "opacity-80 mt-0.5" : "")}>{message}</p>
      </div>

      {/* Action */}
      {action && (
        action.href ? (
          <a
            href={action.href}
            className={cn("shrink-0 text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-md)] transition-colors whitespace-nowrap", styles.action)}
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className={cn("shrink-0 text-xs font-semibold px-3 py-1.5 rounded-[var(--radius-md)] transition-colors whitespace-nowrap", styles.action)}
          >
            {action.label}
          </button>
        )
      )}

      {/* Dismiss */}
      {dismissible && <CloseButton onClick={() => setDismissed(true)} light={isLight} />}
    </div>
  );
}
