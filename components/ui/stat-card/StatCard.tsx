import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const trendVariants = cva("inline-flex items-center gap-1 text-xs font-semibold rounded-[var(--radius-full)] px-2 py-0.5", {
  variants: {
    direction: {
      up:      "text-success bg-success-subtle",
      down:    "text-danger bg-danger-subtle",
      neutral: "text-foreground-muted bg-background-muted",
    },
  },
});

/* ─── Icons ──────────────────────────────────────────────────── */

function TrendUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface StatCardTrend {
  value: string;
  direction: "up" | "down" | "neutral";
  label?: string;
}

export interface StatCardProps {
  title: string;
  value: React.ReactNode;
  description?: string;
  trend?: StatCardTrend;
  icon?: React.ReactNode;
  iconColor?: "primary" | "success" | "danger" | "warning" | "info";
  className?: string;
}

const iconBgMap = {
  primary: "bg-primary-subtle text-primary",
  success: "bg-success-subtle text-success",
  danger:  "bg-danger-subtle text-danger",
  warning: "bg-warning-subtle text-warning",
  info:    "bg-info-subtle text-info",
};

/* ─── Component ──────────────────────────────────────────────── */

export function StatCard({
  title,
  value,
  description,
  trend,
  icon,
  iconColor = "primary",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-border bg-surface p-5 flex flex-col gap-3",
        className
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-foreground-muted leading-snug">{title}</p>
        {icon && (
          <span className={cn("rounded-[var(--radius-lg)] p-2 shrink-0", iconBgMap[iconColor])}>
            {icon}
          </span>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-bold text-foreground leading-none tracking-tight">
        {value}
      </p>

      {/* Bottom row */}
      {(trend || description) && (
        <div className="flex items-center gap-2 flex-wrap">
          {trend && (
            <span className={trendVariants({ direction: trend.direction })}>
              {trend.direction === "up" && <TrendUpIcon />}
              {trend.direction === "down" && <TrendDownIcon />}
              {trend.value}
            </span>
          )}
          {(trend?.label || description) && (
            <span className="text-xs text-foreground-muted">
              {trend?.label ?? description}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
