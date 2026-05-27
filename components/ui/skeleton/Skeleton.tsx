import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const skeletonVariants = cva(
  "animate-pulse bg-background-muted",
  {
    variants: {
      variant: {
        default:  "rounded-[var(--radius-md)]",
        rounded:  "rounded-[var(--radius-full)]",
        circle:   "rounded-full",
        text:     "rounded-[var(--radius-sm)] h-4",
        heading:  "rounded-[var(--radius-sm)] h-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface SkeletonProps extends VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  className?: string;
}

/* ─── Skeleton ───────────────────────────────────────────────── */

export function Skeleton({ variant, width, height, className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(skeletonVariants({ variant }), className)}
      style={{
        width:  width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
    />
  );
}

/* ─── SkeletonText ───────────────────────────────────────────── */

export interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}

export function SkeletonText({ lines = 3, lastLineWidth = "60%", className }: SkeletonTextProps) {
  return (
    <div aria-hidden="true" className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? lastLineWidth : "100%"}
        />
      ))}
    </div>
  );
}

/* ─── SkeletonCard ───────────────────────────────────────────── */

export interface SkeletonCardProps {
  showAvatar?: boolean;
  lines?: number;
  className?: string;
}

export function SkeletonCard({ showAvatar = true, lines = 3, className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      aria-label="Yükleniyor..."
      className={cn(
        "rounded-[var(--radius-xl)] border border-border bg-surface p-5 space-y-4",
        className
      )}
    >
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton variant="circle" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="25%" />
          </div>
        </div>
      )}
      <SkeletonText lines={lines} />
    </div>
  );
}
