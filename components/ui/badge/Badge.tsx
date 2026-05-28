import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 font-medium leading-none",
    "rounded-[var(--radius-full)]",
    "transition-colors duration-150",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-primary-subtle text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        success:   "bg-success-subtle text-success",
        warning:   "bg-warning-subtle text-warning",
        danger:    "bg-danger-subtle text-danger",
        info:      "bg-info-subtle text-info",
        outline:   "bg-transparent border border-border text-foreground",
        solid:     "bg-foreground text-background",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
      /* ── Stil Presetleri (Faz 8) ──────────────────────────────
         variant ile birlikte kullanılır.
         Örnek: <Badge variant="primary" stylePreset="gradient">
      ──────────────────────────────────────────────────────────── */
      stylePreset: {
        default: "",

        /* Yatay renk geçişi; variant renkleriyle uyumlu */
        gradient: [
          "bg-gradient-to-r! from-primary to-violet-500! text-white!",
          "border-none!",
        ],

        /* Renk + box-shadow glow */
        glow: [
          "shadow-[0_0_8px_1px]",
          /* variant rengine göre glow tonu class ile değil inline style ile sağlanıyor;
             bu preset kendi glow rengini primary olarak sabitler — özelleştirmek için
             className ile shadow-{color}/50 ekleyin */
          "shadow-primary/50",
          "border border-primary/30",
          "bg-primary/10! text-primary!",
        ],

        /* Sert köşe + siyah border + küçük offset shadow */
        brutal: [
          "rounded-none!",
          "border-2! border-black! dark:border-white!",
          "shadow-[2px_2px_0px_0px_#000] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.85)]",
          "bg-surface! text-foreground!",
        ],

        /* Çok ince, minimal; yalnızca metin + alt çizgi */
        minimal: [
          "bg-transparent! border-none! rounded-none!",
          "border-b border-current pb-0 py-0",
          "font-semibold",
        ],
      },
    },
    defaultVariants: {
      variant:     "secondary",
      size:        "md",
      stylePreset: "default",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  dot?:       boolean;
  dotColor?:  "primary" | "success" | "warning" | "danger" | "info" | "muted";
}

/* ─── Dot renk map ───────────────────────────────────────────── */

const dotColorMap: Record<NonNullable<BadgeProps["dotColor"]>, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger:  "bg-danger",
  info:    "bg-info",
  muted:   "bg-foreground-subtle",
};

/* ─── Component ──────────────────────────────────────────────── */

export function Badge({
  className,
  variant,
  size,
  stylePreset,
  leftIcon,
  rightIcon,
  dot,
  dotColor = "primary",
  children,
  ...props
}: BadgeProps) {
  const iconSize = size === "lg" ? "size-3.5" : "size-3";

  return (
    <span className={cn(badgeVariants({ variant, size, stylePreset }), className)} {...props}>
      {dot && (
        <span
          className={cn("rounded-full shrink-0 animate-pulse", iconSize, dotColorMap[dotColor])}
          aria-hidden="true"
        />
      )}

      {!dot && leftIcon && (
        <span className={cn("shrink-0 flex items-center", iconSize)} aria-hidden="true">
          {leftIcon}
        </span>
      )}

      {children}

      {rightIcon && (
        <span className={cn("shrink-0 flex items-center", iconSize)} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </span>
  );
}
