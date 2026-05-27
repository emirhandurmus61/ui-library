"use client";

import {
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

type Placement = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "dark" | "light" | "danger" | "info";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  placement?: Placement;
  variant?: TooltipVariant;
  /** ms cinsinden gösterme gecikmesi */
  delay?: number;
  /** Tooltip'i tamamen devre dışı bırak */
  disabled?: boolean;
  /** max genişlik (Tailwind class) */
  maxWidth?: string;
  className?: string;
}

/* ─── Stil haritaları ────────────────────────────────────────── */

const variantMap: Record<TooltipVariant, string> = {
  default: "bg-foreground text-background",
  dark:    "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
  light:   "bg-surface text-foreground border border-border shadow-lg",
  danger:  "bg-danger text-danger-foreground",
  info:    "bg-info text-info-foreground",
};

const arrowVariantMap: Record<TooltipVariant, string> = {
  default: "border-foreground",
  dark:    "border-zinc-900 dark:border-zinc-100",
  light:   "border-surface",
  danger:  "border-danger",
  info:    "border-info",
};

/* Ok pozisyonu: placement'a göre kenar ve döndürme */
const arrowPlacementMap: Record<Placement, string> = {
  top:    "bottom-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[5px] border-l-[5px] border-r-[5px]",
  bottom: "top-[-5px]    left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[5px] border-l-[5px] border-r-[5px]",
  left:   "right-[-5px]  top-1/2  -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[5px] border-t-[5px] border-b-[5px]",
  right:  "left-[-5px]   top-1/2  -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[5px] border-t-[5px] border-b-[5px]",
};

/* Tooltip konumu */
const placementClasses: Record<Placement, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full    left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full  top-1/2  -translate-y-1/2 mr-2",
  right:  "left-full   top-1/2  -translate-y-1/2 ml-2",
};

/* ─── Component ──────────────────────────────────────────────── */

export function Tooltip({
  content,
  children,
  placement = "top",
  variant = "default",
  delay = 150,
  disabled = false,
  maxWidth = "max-w-xs",
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useId();

  const show = useCallback(() => {
    if (disabled) return;
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [disabled, delay]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  // Unmount'ta timer temizle
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Trigger — aria-describedby ile tooltip'e bağlı */}
      <span
        aria-describedby={visible ? tooltipId : undefined}
        className="inline-flex"
      >
        {children}
      </span>

      {/* Tooltip balonu */}
      {visible && !disabled && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none",
            placementClasses[placement],
            "px-2.5 py-1.5 rounded-[var(--radius-md)]",
            "text-xs font-medium leading-snug whitespace-normal",
            "animate-in fade-in-0 zoom-in-95 duration-100",
            maxWidth,
            variantMap[variant],
            className
          )}
        >
          {content}

          {/* Ok */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute w-0 h-0 border-solid",
              arrowPlacementMap[placement],
              arrowVariantMap[variant]
            )}
          />
        </span>
      )}
    </span>
  );
}
