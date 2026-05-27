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
        primary:        "bg-primary-subtle text-primary",
        secondary:      "bg-secondary text-secondary-foreground",
        success:        "bg-success-subtle text-success",
        warning:        "bg-warning-subtle text-warning",
        danger:         "bg-danger-subtle text-danger",
        info:           "bg-info-subtle text-info",
        outline:        "bg-transparent border border-border text-foreground",
        solid:          "bg-foreground text-background",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Nokta göstergesi (status badge için) */
  dot?: boolean;
  dotColor?: "primary" | "success" | "warning" | "danger" | "info" | "muted";
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
  leftIcon,
  rightIcon,
  dot,
  dotColor = "primary",
  children,
  ...props
}: BadgeProps) {
  const iconSize = size === "lg" ? "size-3.5" : "size-3";

  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "rounded-full shrink-0 animate-pulse",
            iconSize,
            dotColorMap[dotColor]
          )}
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
