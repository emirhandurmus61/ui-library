"use client";

import { forwardRef, useId, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Track variants ─────────────────────────────────────────── */

const trackVariants = cva(
  [
    "relative inline-flex shrink-0 cursor-pointer rounded-full",
    "border-2 border-transparent",
    "transition-colors duration-200 ease-in-out",
    "focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-1",
    "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
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
    },
    defaultVariants: { size: "md", color: "primary" },
  }
);

const thumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white shadow-sm",
    "transition-transform duration-200 ease-in-out",
    "ring-0",
  ],
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-6",
      },
    },
    defaultVariants: { size: "md" },
  }
);

const translateMap = {
  sm: { off: "translate-x-0", on: "translate-x-4" },
  md: { off: "translate-x-0", on: "translate-x-5" },
  lg: { off: "translate-x-0", on: "translate-x-[26px]" },
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

    const labelSize = size === "lg" ? "text-base" : "text-sm";
    const descSize  = size === "lg" ? "text-sm" : "text-xs";

    const labelBlock = (label || description) && (
      <div className="flex flex-col gap-0.5">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              labelSize,
              "font-medium leading-none cursor-pointer",
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

    return (
      <div className={cn("flex items-center gap-3", className)}>
        {labelPosition === "left" && labelBlock}

        {/* Track */}
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-labelledby={label ? `${id}-label` : undefined}
          disabled={disabled}
          onClick={() => {
            if (disabled) return;
            const syntheticEvent = {
              target: { checked: !checked },
            } as React.ChangeEvent<HTMLInputElement>;
            handleChange(syntheticEvent);
          }}
          className={cn(
            trackVariants({ size, color }),
            "focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          data-checked={checked ? "" : undefined}
        >
          {/* Gizli native input (form uyumluluğu için) */}
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
          {/* Thumb */}
          <span
            className={cn(
              thumbVariants({ size }),
              checked ? translateMap[size].on : translateMap[size].off
            )}
          />
        </button>

        {labelPosition === "right" && labelBlock}
      </div>
    );
  }
);

Toggle.displayName = "Toggle";
