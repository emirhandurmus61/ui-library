import React from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ComparisonPlan {
  id: string;
  name: string;
  price?: React.ReactNode;
  description?: string;
  badge?: string;
  highlighted?: boolean;
  cta?: { label: string; href?: string; onClick?: () => void };
}

export interface ComparisonFeature {
  label: string;
  description?: string;
  category?: string;
  values: Record<string, boolean | string | React.ReactNode>;
}

export type ComparisonVariant = "default" | "minimal" | "colorful" | "dark";

export interface ComparisonTableProps {
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  variant?: ComparisonVariant;
  showPricing?: boolean;
  stickyHeader?: boolean;
  className?: string;
}

/* ─── Check / X icons ────────────────────────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

/* ─── Cell value renderer ────────────────────────────────────── */

function CellValue({
  value,
  highlighted,
  variant,
}: {
  value: boolean | string | React.ReactNode;
  highlighted: boolean;
  variant: ComparisonVariant;
}) {
  if (value === true) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center size-6 rounded-full",
          highlighted
            ? "bg-primary text-primary-foreground"
            : variant === "colorful"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-success-subtle text-success"
        )}
        aria-label="Evet"
      >
        <CheckIcon className="size-3.5" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-background-muted text-foreground-subtle" aria-label="Hayır">
        <XIcon className="size-3.5" />
      </span>
    );
  }
  if (value === null || value === undefined || value === "") {
    return (
      <span className="inline-flex items-center justify-center size-6 rounded-full bg-background-muted text-foreground-subtle" aria-label="Yok">
        <MinusIcon className="size-3.5" />
      </span>
    );
  }
  // String or ReactNode
  return (
    <span className={cn("text-sm font-medium", highlighted ? "text-primary" : "text-foreground")}>
      {value as React.ReactNode}
    </span>
  );
}

/* ─── Category separator row ────────────────────────────────── */

function CategoryRow({ label, colCount }: { label: string; colCount: number }) {
  return (
    <tr>
      <td
        colSpan={colCount + 1}
        className="px-4 py-2 bg-background-muted/70 text-xs font-semibold uppercase tracking-wider text-foreground-muted border-y border-border"
      >
        {label}
      </td>
    </tr>
  );
}

/* ─── Highlight column accent ────────────────────────────────── */

function getColStyle(plan: ComparisonPlan, variant: ComparisonVariant) {
  if (!plan.highlighted) return "";
  if (variant === "colorful") return "bg-violet-50/50 dark:bg-violet-900/10";
  if (variant === "dark") return "bg-white/5";
  return "bg-primary-subtle/40";
}

/* ─── Main component ─────────────────────────────────────────── */

export function ComparisonTable({
  plans,
  features,
  variant = "default",
  showPricing = true,
  stickyHeader = false,
  className,
}: ComparisonTableProps) {
  // Group features by category
  const categories = Array.from(new Set(features.map((f) => f.category).filter(Boolean))) as string[];
  const uncategorized = features.filter((f) => !f.category);

  const renderFeatures = (feats: ComparisonFeature[]) =>
    feats.map((feature, fi) => (
      <tr
        key={fi}
        className={cn(
          "border-b border-border transition-colors",
          variant === "dark" ? "hover:bg-white/5" : "hover:bg-background-muted/50"
        )}
      >
        {/* Feature label */}
        <td className="px-4 py-3 text-sm text-foreground-muted align-middle">
          <div>
            {feature.label}
            {feature.description && (
              <p className="text-xs text-foreground-subtle mt-0.5">{feature.description}</p>
            )}
          </div>
        </td>
        {/* Values per plan */}
        {plans.map((plan) => (
          <td
            key={plan.id}
            className={cn("px-4 py-3 text-center align-middle", getColStyle(plan, variant))}
          >
            <div className="flex items-center justify-center">
              <CellValue
                value={feature.values[plan.id]}
                highlighted={!!plan.highlighted}
                variant={variant}
              />
            </div>
          </td>
        ))}
      </tr>
    ));

  const wrapperClass = cn(
    "w-full overflow-x-auto rounded-[var(--radius-xl)] border border-border",
    variant === "dark" && "bg-[#0f172a] border-white/10",
    className
  );

  const theadClass = cn(
    "border-b border-border",
    stickyHeader && "sticky top-0 z-10",
    variant === "dark" ? "bg-[#0f172a]" : variant === "minimal" ? "bg-transparent" : "bg-surface"
  );

  return (
    <div className={wrapperClass}>
      <table className="w-full text-left border-collapse">
        <thead className={theadClass}>
          <tr>
            {/* Empty corner cell */}
            <th className="px-4 py-4 w-[220px]" />
            {plans.map((plan) => (
              <th
                key={plan.id}
                className={cn("px-4 py-4 text-center align-top", getColStyle(plan, variant))}
              >
                <div className="flex flex-col items-center gap-2">
                  {plan.badge && (
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full",
                      plan.highlighted
                        ? "bg-primary text-primary-foreground"
                        : "bg-background-muted text-foreground-muted"
                    )}>
                      {plan.badge}
                    </span>
                  )}
                  <p className={cn(
                    "font-semibold text-sm",
                    plan.highlighted
                      ? variant === "dark" ? "text-white" : "text-primary"
                      : variant === "dark" ? "text-white/80" : "text-foreground"
                  )}>
                    {plan.name}
                  </p>
                  {showPricing && plan.price && (
                    <div className={cn("text-2xl font-bold", variant === "dark" ? "text-white" : "text-foreground")}>
                      {plan.price}
                    </div>
                  )}
                  {plan.description && (
                    <p className={cn("text-xs leading-snug", variant === "dark" ? "text-white/40" : "text-foreground-subtle")}>
                      {plan.description}
                    </p>
                  )}
                  {plan.cta && (
                    plan.cta.href ? (
                      <a
                        href={plan.cta.href}
                        className={cn(
                          "mt-1 text-xs font-semibold px-4 py-1.5 rounded-[var(--radius-md)] transition-colors whitespace-nowrap",
                          plan.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : variant === "dark"
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-background-muted text-foreground hover:bg-background-muted/70 border border-border"
                        )}
                      >
                        {plan.cta.label}
                      </a>
                    ) : (
                      <button
                        onClick={plan.cta.onClick}
                        className={cn(
                          "mt-1 text-xs font-semibold px-4 py-1.5 rounded-[var(--radius-md)] transition-colors whitespace-nowrap",
                          plan.highlighted
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : variant === "dark"
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-background-muted text-foreground hover:bg-background-muted/70 border border-border"
                        )}
                      >
                        {plan.cta.label}
                      </button>
                    )
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Uncategorized features */}
          {renderFeatures(uncategorized)}

          {/* Categorized features */}
          {categories.map((cat) => (
            <React.Fragment key={cat}>
              <CategoryRow label={cat} colCount={plans.length} />
              {renderFeatures(features.filter((f) => f.category === cat))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
