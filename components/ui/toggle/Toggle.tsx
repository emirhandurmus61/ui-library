"use client";

import { forwardRef, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

/* ─── Icons (daynight variant) ───────────────────────────────── */

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Rays */}
      <line x1="12" y1="1"  x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
      {/* Core */}
      <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Crescent: full circle minus an offset circle via clip trick using path */}
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A8.93 8.93 0 0 0 12 3z" />
    </svg>
  );
}

/* ─── Track variants ─────────────────────────────────────────── */

const trackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-1",
  ],
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[52px]",
      },
      color: {
        primary: "data-[checked]:bg-primary bg-border",
        success: "data-[checked]:bg-success bg-border",
        danger:  "data-[checked]:bg-danger  bg-border",
        warning: "data-[checked]:bg-warning bg-border",
      },
      variant: {
        default:  "",
        pill:     "rounded-[6px]",
        icon:     "",
        daynight: "overflow-hidden border-0",
      },
    },
    defaultVariants: { size: "md", color: "primary", variant: "default" },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none relative rounded-full shadow-sm",
    "transition-all duration-200 ease-in-out",
    "ring-0 shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
      variant: {
        default:  "bg-white",
        pill:     "bg-white rounded-[4px]",
        icon:     "bg-white flex items-center justify-center",
        daynight: "z-10 flex items-center justify-center shadow-md",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

const translateMap = {
  sm: { off: "translate-x-0", on: "translate-x-4" },
  md: { off: "translate-x-0", on: "translate-x-5" },
  lg: { off: "translate-x-0", on: "translate-x-[26px]" },
};

/* ─── Day/night size overrides ───────────────────────────────── */

const daynightTrackSize = {
  sm: "h-6 w-11",
  md: "h-7 w-[52px]",
  lg: "h-8 w-[60px]",
};

const daynightTranslate = {
  sm: { off: "translate-x-0", on: "translate-x-5" },
  md: { off: "translate-x-0", on: "translate-x-[26px]" },
  lg: { off: "translate-x-0", on: "translate-x-[28px]" },
};

/* ─── Types ──────────────────────────────────────────────────── */

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  description?: string;
  errorText?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "danger" | "warning";
  /** Label'ı sağa mı sola mı yazar (default: right) */
  labelPosition?: "left" | "right";
  /** Görsel varyant */
  variant?: "default" | "daynight" | "icon" | "pill";
  /** variant="icon" ile thumb içinde gösterilecek ikon */
  thumbIcon?: React.ReactNode;
  /** true iken thumb spinner gösterir, tıklama dondurulur */
  loading?: boolean;
  /** Track üzerinde köşe rozeti (0 veya boş string görünmez) */
  badge?: number | string;
}

/* ─── Component ──────────────────────────────────────────────── */

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      className,
      label,
      description,
      errorText,
      size = "md",
      color = "primary",
      labelPosition = "right",
      variant = "default",
      thumbIcon,
      loading = false,
      badge,
      id: idProp,
      checked: checkedProp,
      defaultChecked,
      disabled,
      onChange,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;

    const isControlled = checkedProp !== undefined;
    const [internal, setInternal] = useState(defaultChecked ?? false);
    const checked = isControlled ? checkedProp : internal;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.checked);
      onChange?.(e);
    };

    const handleClick = () => {
      if (disabled || loading) return;
      const syntheticEvent = {
        target: { checked: !checked },
      } as React.ChangeEvent<HTMLInputElement>;
      handleChange(syntheticEvent);
    };

    const labelSize = size === "lg" ? "text-base" : "text-sm";
    const descSize  = size === "lg" ? "text-sm" : "text-xs";

    /* ── Thumb icon size (for variant="icon") ── */
    const thumbIconSize =
      size === "sm" ? "size-2.5" : size === "lg" ? "size-3.5" : "size-3";

    /* ── Thumb content ── */
    const thumbContent = (() => {
      if (loading) {
        return (
          <Spinner
            size="xs"
            color="current"
            className="text-foreground-muted"
          />
        );
      }
      if (variant === "icon" && thumbIcon) {
        return (
          <span
            className={cn(
              thumbIconSize,
              "flex items-center justify-center text-foreground-muted"
            )}
          >
            {thumbIcon}
          </span>
        );
      }
      if (variant === "daynight") {
        const iconClass =
          size === "sm"
            ? "size-2.5"
            : size === "lg"
            ? "size-4"
            : "size-3";
        return (
          <>
            {/* Sun (off/day) */}
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                checked ? "opacity-0 scale-50" : "opacity-100 scale-100"
              )}
            >
              <SunIcon className={cn(iconClass, "text-amber-500")} />
            </span>
            {/* Moon (on/night) */}
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}
            >
              <MoonIcon className={cn(iconClass, "text-slate-200")} />
            </span>
          </>
        );
      }
      return null;
    })();

    /* ── Daynight track decorations ── */
    const daynightDecorations = variant === "daynight" && (
      <>
        {/* Day layer (sky gradient) */}
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-500 z-0",
            checked ? "opacity-0" : "opacity-100"
          )}
          style={{
            background:
              "linear-gradient(135deg, #7ec8e3 0%, #87ceeb 50%, #fdb97d 100%)",
          }}
        />
        {/* Night layer (deep navy) */}
        <span
          className={cn(
            "absolute inset-0 transition-opacity duration-500 z-0",
            checked ? "opacity-100" : "opacity-0"
          )}
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          }}
        />
        {/* Stars (night) */}
        {[
          { pos: "top-1.5 left-3",  delay: "0ms"   },
          { pos: "top-1   left-5.5",delay: "80ms"  },
          { pos: "top-2.5 left-4.5",delay: "160ms" },
          { pos: "top-1   left-7",  delay: "40ms"  },
        ].map(({ pos, delay }, i) => (
          <span
            key={i}
            className={cn(
              "absolute size-0.5 rounded-full bg-white z-0 transition-opacity duration-400",
              pos,
              checked ? "opacity-90" : "opacity-0"
            )}
            style={{ transitionDelay: checked ? delay : "0ms" }}
          />
        ))}
        {/* Cloud (day) */}
        <span
          className={cn(
            "absolute right-2 top-1 h-1.5 w-4 bg-white/80 z-0 transition-opacity duration-300",
            checked ? "opacity-0" : "opacity-90"
          )}
          style={{
            borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
          }}
        />
        <span
          className={cn(
            "absolute right-3.5 top-0.5 h-1 w-2.5 bg-white/60 z-0 transition-opacity duration-300",
            checked ? "opacity-0" : "opacity-70"
          )}
          style={{
            borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
          }}
        />
      </>
    );

    /* ── Daynight thumb: colored circle bg ── */
    const daynightThumbBg = variant === "daynight"
      ? checked
        ? "bg-slate-700"
        : "bg-amber-300"
      : undefined;

    /* ── Track size override for daynight ── */
    const trackSizeClass =
      variant === "daynight" ? daynightTrackSize[size] : undefined;

    /* ── Translate for thumb ── */
    const translateOff =
      variant === "daynight"
        ? daynightTranslate[size].off
        : translateMap[size].off;
    const translateOn =
      variant === "daynight"
        ? daynightTranslate[size].on
        : translateMap[size].on;

    /* ── Label block ── */
    const labelBlock = (label || description || errorText) && (
      <div className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              labelSize,
              "font-medium leading-none cursor-pointer select-none",
              disabled ? "opacity-50 cursor-not-allowed" : "text-foreground",
              errorText && "text-danger"
            )}
          >
            {label}
          </label>
        )}
        {description && (
          <p className={cn(descSize, "text-foreground-muted leading-snug")}>
            {description}
          </p>
        )}
        {errorText && (
          <p className="text-xs text-danger leading-none mt-0.5">{errorText}</p>
        )}
      </div>
    );

    /* ── Badge ── */
    const badgeEl = badge !== undefined && badge !== 0 && badge !== "" && (
      <span
        aria-label={`${badge} bildirim`}
        className="absolute -top-1.5 -right-1.5 z-20 min-w-[16px] h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center leading-none"
      >
        {badge}
      </span>
    );

    return (
      <div className={cn("flex items-center gap-3", className)}>
        {labelPosition === "left" && labelBlock}

        {/* Track wrapper — relative for badge positioning */}
        <div className="relative inline-flex shrink-0">
          {badgeEl}

          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-busy={loading || undefined}
            aria-labelledby={label ? `${id}-label` : undefined}
            disabled={disabled}
            onClick={handleClick}
            className={cn(
              trackVariants({ size, color, variant }),
              trackSizeClass,
              "focus:outline-none",
              (disabled || loading) && "opacity-50 cursor-not-allowed"
            )}
            data-checked={checked ? "" : undefined}
          >
            {/* Hidden native input */}
            <input
              ref={ref}
              type="checkbox"
              id={id}
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              className="sr-only"
              {...props}
            />

            {/* Day/night track decorations */}
            {daynightDecorations}

            {/* Thumb */}
            <span
              className={cn(
                thumbVariants({ size, variant }),
                daynightThumbBg,
                checked ? translateOn : translateOff
              )}
            >
              {thumbContent}
            </span>
          </button>
        </div>

        {labelPosition === "right" && labelBlock}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
