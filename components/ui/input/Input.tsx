"use client";

import { forwardRef, useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Base input classes (stylePreset'ten bağımsız sabit) ─────── */

const INPUT_BASE = [
  "w-full text-foreground",
  "placeholder:text-foreground-subtle",
  "transition-colors duration-150",
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-background-muted",
  "read-only:bg-background-muted read-only:focus:ring-0",
].join(" ");

/* ─── Stil preset tanımları ──────────────────────────────────── */

const INPUT_PRESETS = {
  default: [
    "bg-surface",
    "border border-border rounded-[var(--radius-md)]",
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
    "read-only:focus:border-border",
  ].join(" "),

  /* Sadece alt border; Material Design tarzı */
  underline: [
    "bg-transparent",
    "border-0 border-b-2 border-border rounded-none",
    "focus:outline-none focus:border-primary focus:ring-0",
    "px-0!",
  ].join(" "),

  /* Dolgulu arka plan, border yok */
  filled: [
    "bg-background-muted",
    "border-0 border-b-2 border-transparent rounded-[var(--radius-md)_var(--radius-md)_0_0]",
    "focus:outline-none focus:border-primary focus:ring-0 focus:bg-background-muted",
    "hover:bg-background-muted/80",
  ].join(" "),

  /* Kalın siyah border + offset shadow */
  brutal: [
    "bg-surface",
    "border-2 border-black dark:border-white rounded-none",
    "shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.85)]",
    "focus:outline-none focus:ring-0 focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px]",
    "transition-all duration-100",
  ].join(" "),

  /* Tam yuvarlak; arama kutusu tarzı */
  pill: [
    "bg-surface",
    "border border-border rounded-[9999px]",
    "px-5!",
    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
  ].join(" "),
} as const;

export type InputStylePreset = keyof typeof INPUT_PRESETS;

/* ─── State overrides ─────────────────────────────────────────── */

const STATE_CLASSES: Record<string, Record<string, string>> = {
  default: {
    error:   "border-danger focus:border-danger focus:ring-danger/20",
    success: "border-success focus:border-success focus:ring-success/20",
  },
  underline: {
    error:   "border-b-danger focus:border-b-danger",
    success: "border-b-success focus:border-b-success",
  },
  filled: {
    error:   "border-b-danger focus:border-b-danger bg-danger-subtle/30",
    success: "border-b-success focus:border-b-success bg-success-subtle/30",
  },
  brutal: {
    error:   "border-danger! shadow-[3px_3px_0px_0px] shadow-danger/60!",
    success: "border-success! shadow-[3px_3px_0px_0px] shadow-success/60!",
  },
  pill: {
    error:   "border-danger focus:border-danger focus:ring-danger/20",
    success: "border-success focus:border-success focus:ring-success/20",
  },
};

/* ─── Size variants (ayrı cva sadece size için) ──────────────── */

const sizeVariants = cva("", {
  variants: {
    size: {
      sm: "h-8  px-3 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-11 px-4 text-base",
    },
  },
  defaultVariants: { size: "md" },
});

/* ─── Types ──────────────────────────────────────────────────── */

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof sizeVariants> {
  label?:        string;
  helperText?:   string;
  errorText?:    string;
  successText?:  string;
  leftIcon?:     React.ReactNode;
  rightIcon?:    React.ReactNode;
  rightElement?: React.ReactNode;
  /** Görsel stil presetleri (Faz 8) */
  stylePreset?:  InputStylePreset;
  state?:        "default" | "error" | "success";
}

/* ─── Component ──────────────────────────────────────────────── */

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      state,
      stylePreset = "default",
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
    const autoId      = useId();
    const id          = idProp ?? autoId;
    const feedbackId  = `${id}-feedback`;
    const resolvedState = errorText ? "error" : successText ? "success" : (state ?? "default");

    const hasLeft  = !!leftIcon;
    const hasRight = !!rightIcon || !!rightElement;

    const feedbackText  = errorText ?? successText ?? helperText;
    const feedbackColor = errorText  ? "text-danger"  : successText ? "text-success" : "text-foreground-subtle";

    const presetClass = INPUT_PRESETS[stylePreset];
    const stateClass  = resolvedState !== "default"
      ? (STATE_CLASSES[stylePreset]?.[resolvedState] ?? STATE_CLASSES.default[resolvedState] ?? "")
      : "";

    /* pill preset: sol/sağ padding daha büyük olduğu için icon offset ayarla */
    const leftOffset  = stylePreset === "pill" ? "left-5"  : "left-3";
    const rightOffset = stylePreset === "pill" ? "right-5" : "right-3";

    /* underline: padding yok, bu yüzden icon'lar konumlandırılamaz */
    const showSideIcons = stylePreset !== "underline";

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground leading-none">
            {label}
            {props.required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {showSideIcons && hasLeft && (
            <span className={cn("absolute flex items-center text-foreground-subtle pointer-events-none", leftOffset)} aria-hidden="true">
              <span className="size-4 flex items-center justify-center">{leftIcon}</span>
            </span>
          )}

          <input
            ref={ref}
            id={id}
            type={type}
            aria-describedby={feedbackText ? feedbackId : undefined}
            aria-invalid={resolvedState === "error" ? true : undefined}
            className={cn(
              INPUT_BASE,
              presetClass,
              stateClass,
              sizeVariants({ size }),
              showSideIcons && hasLeft  && "pl-9",
              showSideIcons && hasRight && "pr-9",
              className
            )}
            {...props}
          />

          {showSideIcons && rightIcon && !rightElement && (
            <span className={cn("absolute flex items-center text-foreground-subtle pointer-events-none", rightOffset)} aria-hidden="true">
              <span className="size-4 flex items-center justify-center">{rightIcon}</span>
            </span>
          )}

          {showSideIcons && rightElement && (
            <span className="absolute right-2 flex items-center">{rightElement}</span>
          )}
        </div>

        {feedbackText && (
          <p id={feedbackId} className={cn("text-xs leading-none", feedbackColor)}>{feedbackText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
