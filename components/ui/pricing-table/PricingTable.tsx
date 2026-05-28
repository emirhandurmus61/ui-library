"use client";

import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-success shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 text-foreground-subtle shrink-0"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface PricingFeature {
  label: string;
  plans: (boolean | string)[];
}

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  highlighted?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  features: PricingFeature[];
  className?: string;
}

/* ─── Helpers ────────────────────────────────────────────────── */

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="flex justify-center items-center" aria-label="Dahil">
        <CheckIcon />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="flex justify-center items-center" aria-label="Dahil değil">
        <DashIcon />
      </span>
    );
  }
  return (
    <span className="text-sm text-foreground text-center block">{value}</span>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function PricingTable({ plans, features, className }: PricingTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="min-w-[640px] w-full border-collapse">
        {/* ── Header ─────────────────────────────────────────── */}
        <thead>
          <tr className="sticky top-0 z-10">
            {/* Feature label column — sticky left */}
            <th
              scope="col"
              className="sticky left-0 z-20 bg-surface min-w-[180px] w-[180px] px-4 py-4 text-left"
            />

            {plans.map((plan, i) => (
              <th
                key={i}
                scope="col"
                className={cn(
                  "px-4 py-4 text-center min-w-[160px]",
                  plan.highlighted
                    ? "bg-primary-subtle"
                    : "bg-surface"
                )}
              >
                {/* Popüler badge */}
                {plan.highlighted && (
                  <span className="inline-flex items-center mb-2 px-2.5 py-0.5 rounded-[var(--radius-full)] text-xs font-semibold bg-primary text-primary-foreground">
                    Popüler
                  </span>
                )}

                <div className="text-base font-semibold text-foreground">{plan.name}</div>

                <div className="mt-1 flex items-baseline justify-center gap-0.5">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm text-foreground-muted">{plan.period}</span>
                  )}
                </div>

                {plan.description && (
                  <p className="mt-1 text-xs text-foreground-muted">{plan.description}</p>
                )}

                {/* CTA */}
                {(plan.ctaLabel || plan.ctaHref) && (
                  plan.ctaHref ? (
                    <a
                      href={plan.ctaHref}
                      className={cn(
                        "mt-3 inline-flex w-full items-center justify-center gap-1.5",
                        "rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium",
                        "transition-all duration-150",
                        plan.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-background border border-border text-foreground hover:bg-background-subtle"
                      )}
                    >
                      {plan.ctaLabel ?? "Başlayın"}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={plan.ctaOnClick}
                      className={cn(
                        "mt-3 inline-flex w-full items-center justify-center gap-1.5",
                        "rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium",
                        "transition-all duration-150 cursor-pointer",
                        plan.highlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-background border border-border text-foreground hover:bg-background-subtle"
                      )}
                    >
                      {plan.ctaLabel ?? "Başlayın"}
                    </button>
                  )
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ───────────────────────────────────────────── */}
        <tbody>
          {features.map((feature, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx % 2 === 0 ? "bg-background" : "bg-surface"}
            >
              {/* Feature label — sticky left */}
              <td
                className={cn(
                  "sticky left-0 z-10 px-4 py-3 text-sm font-medium text-foreground border-t border-border",
                  rowIdx % 2 === 0 ? "bg-background" : "bg-surface"
                )}
              >
                {feature.label}
              </td>

              {plans.map((_, planIdx) => (
                <td
                  key={planIdx}
                  className={cn(
                    "px-4 py-3 text-center border-t border-border",
                    plans[planIdx].highlighted && "bg-primary-subtle/40"
                  )}
                >
                  <FeatureCell value={feature.plans[planIdx] ?? false} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
