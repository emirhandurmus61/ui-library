"use client";

import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export interface FeatureGridProps {
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: "card" | "icon-left" | "minimal";
  className?: string;
}

/* ─── Column map ─────────────────────────────────────────────── */

const colsMap: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/* ─── Component ──────────────────────────────────────────────── */

export function FeatureGrid({
  features,
  columns = 3,
  variant = "card",
  className,
}: FeatureGridProps) {
  return (
    <div className={cn("grid gap-4 sm:gap-6", colsMap[columns], className)}>
      {features.map((feature, i) => (
        <FeatureGridItem key={i} feature={feature} variant={variant} />
      ))}
    </div>
  );
}

/* ─── Item variants ──────────────────────────────────────────── */

function FeatureGridItem({
  feature,
  variant,
}: {
  feature: FeatureItem;
  variant: NonNullable<FeatureGridProps["variant"]>;
}) {
  if (variant === "card") {
    return (
      <div
        className={cn(
          "relative flex flex-col gap-4 p-6",
          "rounded-[var(--radius-xl)] border border-border bg-surface",
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center size-10 shrink-0",
            "rounded-[var(--radius-lg)] bg-primary-subtle text-primary"
          )}
          aria-hidden="true"
        >
          {feature.icon}
        </div>

        {/* Title + badge */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {feature.title}
            </h3>
            {feature.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium bg-primary-subtle text-primary">
                {feature.badge}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm text-foreground-muted leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "icon-left") {
    return (
      <div
        className={cn(
          "flex items-start gap-4",
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
          "rounded-[var(--radius-lg)] p-2"
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "flex items-center justify-center size-10 shrink-0 mt-0.5",
            "rounded-[var(--radius-lg)] bg-primary-subtle text-primary"
          )}
          aria-hidden="true"
        >
          {feature.icon}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-foreground leading-snug">
              {feature.title}
            </h3>
            {feature.badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium bg-primary-subtle text-primary">
                {feature.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-foreground-muted leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    );
  }

  /* minimal */
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        "rounded-[var(--radius-md)] p-2"
      )}
    >
      <div
        className="flex items-center gap-2 text-primary"
        aria-hidden="true"
      >
        <span className="size-5 flex items-center justify-center">
          {feature.icon}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-foreground">
            {feature.title}
          </h3>
          {feature.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-full)] text-xs font-medium bg-primary-subtle text-primary">
              {feature.badge}
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-foreground-muted leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
