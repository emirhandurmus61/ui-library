"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Check icon ─────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <path
        d="M2 6l3 3 5-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Indeterminate çizgisi */
function MinusIcon() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-full"
      aria-hidden="true"
    >
      <path
        d="M2.5 6h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  description?: string;
  errorText?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
}

/* ─── Size map ───────────────────────────────────────────────── */

const sizeMap = {
  sm: { box: "size-3.5", label: "text-sm", description: "text-xs", mt: "mt-px" },
  md: { box: "size-4",   label: "text-sm", description: "text-xs", mt: "mt-0.5" },
  lg: { box: "size-5",   label: "text-base", description: "text-sm", mt: "mt-0.5" },
};

/* ─── Component ──────────────────────────────────────────────── */

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      errorText,
      indeterminate = false,
      size = "md",
      id: idProp,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const s = sizeMap[size];

    const isChecked = checked ?? props.defaultChecked;
    const showIcon = isChecked || indeterminate;

    return (
      <div className={cn("flex gap-2.5", className)}>
        {/* Gizli native input */}
        <div className={cn("relative shrink-0", s.box, s.mt)}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            checked={checked}
            className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            {...props}
          />
          {/* Görsel kutu */}
          <span
            className={cn(
              "flex items-center justify-center",
              "size-full rounded-[var(--radius-sm)]",
              "border-2 border-border bg-surface",
              "transition-all duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-1",
              // checked veya indeterminate
              "peer-checked:bg-primary peer-checked:border-primary",
              indeterminate && "bg-primary border-primary",
              // error
              errorText && "border-danger peer-checked:bg-danger peer-checked:border-danger",
              // disabled
              "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
            )}
          >
            <span
              className={cn(
                "text-primary-foreground transition-opacity duration-100",
                "size-[65%]",
                showIcon ? "opacity-100" : "opacity-0 peer-checked:opacity-100"
              )}
            >
              {indeterminate ? <MinusIcon /> : <CheckIcon />}
            </span>
          </span>
        </div>

        {/* Label + description */}
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  s.label,
                  "font-medium leading-none cursor-pointer",
                  disabled ? "opacity-50 cursor-not-allowed" : "text-foreground",
                  errorText && "text-danger"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(s.description, "text-foreground-muted leading-snug")}>
                {description}
              </p>
            )}
            {errorText && (
              <p className="text-xs text-danger leading-none mt-0.5">{errorText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
