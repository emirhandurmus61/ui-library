import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const spinnerVariants = cva("inline-flex items-center justify-center shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      md: "size-5",
      lg: "size-7",
      xl: "size-10",
    },
    color: {
      primary:  "text-primary",
      secondary:"text-foreground-muted",
      white:    "text-white",
      success:  "text-success",
      danger:   "text-danger",
      warning:  "text-warning",
      current:  "text-current",
    },
  },
  defaultVariants: { size: "md", color: "primary" },
});

/* ─── Types ──────────────────────────────────────────────────── */

type SpinnerVariant = "circle" | "dots" | "bars" | "ring" | "pulse";

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  variant?: SpinnerVariant;
  label?: string;
  className?: string;
}

/* ─── SVG animasyonları ──────────────────────────────────────── */

function CircleSpinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin" aria-hidden="true">
      <circle
        className="opacity-20"
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function RingSpinner() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full animate-spin" aria-hidden="true">
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="32 60"
      />
    </svg>
  );
}

function DotsSpinner({ size }: { size: SpinnerProps["size"] }) {
  const dotSize = size === "xs" || size === "sm" ? "size-1" : size === "lg" || size === "xl" ? "size-2" : "size-1.5";
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn("rounded-full bg-current animate-bounce", dotSize)}
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
        />
      ))}
    </span>
  );
}

function BarsSpinner({ size }: { size: SpinnerProps["size"] }) {
  const barW = size === "xs" || size === "sm" ? "w-0.5" : "w-1";
  const barH = size === "xs" ? "h-3" : size === "sm" ? "h-4" : size === "lg" ? "h-6" : size === "xl" ? "h-8" : "h-5";
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn("rounded-full bg-current animate-pulse", barW, barH)}
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

function PulseSpinner() {
  return (
    <span className="relative flex size-full" aria-hidden="true">
      <span className="absolute inline-flex size-full rounded-full bg-current opacity-60 animate-ping" />
      <span className="relative inline-flex size-full rounded-full bg-current opacity-80" />
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function Spinner({
  variant = "circle",
  size = "md",
  color = "primary",
  label = "Yükleniyor...",
  className,
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size, color }), className)}
    >
      {variant === "circle" && <CircleSpinner />}
      {variant === "ring"   && <RingSpinner />}
      {variant === "dots"   && <DotsSpinner size={size} />}
      {variant === "bars"   && <BarsSpinner size={size} />}
      {variant === "pulse"  && <PulseSpinner />}
      <span className="sr-only">{label}</span>
    </span>
  );
}
