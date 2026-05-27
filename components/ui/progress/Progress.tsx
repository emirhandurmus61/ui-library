import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const trackVariants = cva("w-full overflow-hidden rounded-[var(--radius-full)] bg-background-muted", {
  variants: {
    size: {
      xs: "h-1",
      sm: "h-2",
      md: "h-3",
      lg: "h-4",
    },
  },
  defaultVariants: { size: "md" },
});

const fillVariants = cva(
  "h-full rounded-[var(--radius-full)] transition-all duration-500 ease-out",
  {
    variants: {
      color: {
        primary: "bg-primary",
        success: "bg-success",
        danger:  "bg-danger",
        warning: "bg-warning",
        info:    "bg-info",
      },
      animated: {
        true:  "animate-pulse",
        false: "",
      },
    },
    defaultVariants: { color: "primary", animated: false },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface ProgressProps
  extends VariantProps<typeof trackVariants>,
    VariantProps<typeof fillVariants> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  striped?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size,
  color,
  animated,
  striped = false,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-medium text-foreground-muted tabular-nums">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn(trackVariants({ size }))}
      >
        <div
          className={cn(
            fillVariants({ color, animated }),
            striped && [
              "bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgba(255,255,255,0.15)_6px,rgba(255,255,255,0.15)_12px)]",
            ]
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
