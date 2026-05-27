"use client";

import { forwardRef, useId, useRef, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const textareaVariants = cva(
  [
    "w-full bg-surface text-foreground",
    "border border-border rounded-[var(--radius-md)]",
    "placeholder:text-foreground-subtle",
    "transition-colors duration-150",
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-muted",
    "read-only:bg-background-muted read-only:focus:ring-0 read-only:focus:border-border",
    "px-3 py-2.5 text-sm leading-relaxed",
    "resize-none",
  ],
  {
    variants: {
      state: {
        default: "",
        error: "border-danger focus:border-danger focus:ring-danger/20",
        success: "border-success focus:border-success focus:ring-success/20",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "rows">,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  /** Sabit satır sayısı. autoGrow ile birlikte başlangıç yüksekliği olarak kullanılır. */
  rows?: number;
  /** true ise içerik büyüdükçe textarea otomatik uzar */
  autoGrow?: boolean;
  /** autoGrow açıkken maksimum satır sayısı */
  maxRows?: number;
  /** Karakter sayacı göster */
  showCount?: boolean;
}

/* ─── Component ──────────────────────────────────────────────── */

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      state,
      label,
      helperText,
      errorText,
      successText,
      rows = 4,
      autoGrow = false,
      maxRows,
      showCount = false,
      maxLength,
      id: idProp,
      onChange,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    const resolvedState = errorText ? "error" : successText ? "success" : state;

    const feedbackText = errorText ?? successText ?? helperText;
    const feedbackColor = errorText
      ? "text-danger"
      : successText
      ? "text-success"
      : "text-foreground-subtle";

    // autoGrow: içerik değiştikçe yüksekliği yeniden hesapla
    const recalcHeight = useCallback(() => {
      const el = innerRef.current;
      if (!el || !autoGrow) return;

      el.style.height = "auto";
      const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 20;
      const paddingY =
        parseInt(getComputedStyle(el).paddingTop) +
        parseInt(getComputedStyle(el).paddingBottom);

      const maxHeight = maxRows
        ? lineHeight * maxRows + paddingY
        : Infinity;

      const scrollH = el.scrollHeight;
      el.style.height = Math.min(scrollH, maxHeight) + "px";
      el.style.overflowY = scrollH > maxHeight ? "auto" : "hidden";
    }, [autoGrow, maxRows]);

    // mount'ta bir kez hesapla
    useEffect(() => {
      recalcHeight();
    }, [recalcHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      recalcHeight();
      onChange?.(e);
    };

    // ref birleştir
    const setRefs = (el: HTMLTextAreaElement | null) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
    };

    // karakter sayısı
    const charCount =
      typeof props.value === "string"
        ? props.value.length
        : typeof props.defaultValue === "string"
        ? props.defaultValue.length
        : undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {/* Label satırı */}
        {(label || (showCount && maxLength)) && (
          <div className="flex items-center justify-between">
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
            {showCount && maxLength && (
              <span
                className={cn(
                  "text-xs tabular-nums",
                  charCount !== undefined && charCount >= maxLength
                    ? "text-danger"
                    : "text-foreground-subtle"
                )}
              >
                {charCount ?? 0} / {maxLength}
              </span>
            )}
          </div>
        )}

        <textarea
          ref={setRefs}
          id={id}
          rows={autoGrow ? rows : rows}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ state: resolvedState }),
            autoGrow && "overflow-hidden",
            className
          )}
          onChange={handleChange}
          {...props}
        />

        {/* Feedback */}
        {feedbackText && (
          <p className={cn("text-xs leading-none", feedbackColor)}>
            {feedbackText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
