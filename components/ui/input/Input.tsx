"use client";

import { forwardRef, useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const inputVariants = cva(
  [
    "w-full bg-surface text-foreground",
    "border border-border rounded-[var(--radius-md)]",
    "placeholder:text-foreground-subtle",
    "transition-colors duration-150",
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-muted",
    "read-only:bg-background-muted read-only:focus:ring-0 read-only:focus:border-border",
  ],
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
      state: {
        default: "",
        error:
          "border-danger focus:border-danger focus:ring-danger/20",
        success:
          "border-success focus:border-success focus:ring-success/20",
      },
    },
    defaultVariants: {
      size: "md",
      state: "default",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Sağ tarafa tıklanabilir element (örn. "Göster" butonu) */
  rightElement?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────── */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state,
      label,
      helperText,
      errorText,
      successText,
      leftIcon,
      rightIcon,
      rightElement,
      id: idProp,
      type = "text",
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;

    // state'i otomatik hesapla
    const resolvedState = errorText ? "error" : successText ? "success" : state;

    const hasLeft = !!leftIcon;
    const hasRight = !!rightIcon || !!rightElement;

    const feedbackText = errorText ?? successText ?? helperText;
    const feedbackColor = errorText
      ? "text-danger"
      : successText
      ? "text-success"
      : "text-foreground-subtle";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground leading-none"
          >
            {label}
            {props.required && (
              <span className="text-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative flex items-center">
          {/* Left icon */}
          {hasLeft && (
            <span
              className="absolute left-3 flex items-center text-foreground-subtle pointer-events-none"
              aria-hidden="true"
            >
              <span className="size-4 flex items-center justify-center">
                {leftIcon}
              </span>
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            className={cn(
              inputVariants({ size, state: resolvedState }),
              hasLeft && "pl-9",
              hasRight && "pr-9",
              className
            )}
            {...props}
          />

          {/* Right icon (dekoratif) */}
          {rightIcon && !rightElement && (
            <span
              className="absolute right-3 flex items-center text-foreground-subtle pointer-events-none"
              aria-hidden="true"
            >
              <span className="size-4 flex items-center justify-center">
                {rightIcon}
              </span>
            </span>
          )}

          {/* Right element (tıklanabilir) */}
          {rightElement && (
            <span className="absolute right-2 flex items-center">
              {rightElement}
            </span>
          )}
        </div>

        {/* Feedback text */}
        {feedbackText && (
          <p className={cn("text-xs leading-none", feedbackColor)}>
            {feedbackText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
