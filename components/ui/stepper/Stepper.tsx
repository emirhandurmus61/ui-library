"use client";

import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface StepperStep {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  currentStep: number; // 0-indexed
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "numbered" | "dots";
  className?: string;
}

/* ─── Icons ──────────────────────────────────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="2,8 6,12 14,4" />
    </svg>
  );
}

/* ─── Step Indicator ─────────────────────────────────────────── */

function StepIndicator({
  index,
  status,
  variant,
}: {
  index: number;
  status: "completed" | "current" | "upcoming";
  variant: NonNullable<StepperProps["variant"]>;
}) {
  const base =
    "relative shrink-0 flex items-center justify-center transition-colors duration-200";

  if (variant === "dots") {
    return (
      <span
        className={cn(
          base,
          "size-3 rounded-full",
          status === "completed" && "bg-primary",
          status === "current" && "bg-primary ring-4 ring-primary/25",
          status === "upcoming" && "bg-border"
        )}
      />
    );
  }

  if (variant === "numbered") {
    return (
      <span
        className={cn(
          base,
          "size-8 rounded-full border-2 text-xs font-semibold leading-none",
          status === "completed" &&
            "border-primary bg-primary text-primary-foreground",
          status === "current" &&
            "border-primary bg-surface text-primary ring-4 ring-primary/20",
          status === "upcoming" &&
            "border-border bg-surface text-foreground-muted"
        )}
      >
        {status === "completed" ? (
          <CheckIcon className="size-3.5" />
        ) : (
          String(index + 1)
        )}
      </span>
    );
  }

  // default variant
  return (
    <span
      className={cn(
        base,
        "size-8 rounded-full border-2",
        status === "completed" &&
          "border-primary bg-primary text-primary-foreground",
        status === "current" &&
          "border-primary bg-surface ring-4 ring-primary/20",
        status === "upcoming" && "border-border bg-surface"
      )}
    >
      {status === "completed" && <CheckIcon className="size-3.5" />}
      {status === "current" && (
        <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
      )}
    </span>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  variant = "default",
  className,
}: StepperProps) {
  const isDots = variant === "dots";

  /* ── Vertical layout ────────────────────────────────────────── */
  if (orientation === "vertical") {
    return (
      <ol
        className={cn("flex flex-col", className)}
        aria-label="Progress"
      >
        {steps.map((step, i) => {
          const status =
            i < currentStep
              ? "completed"
              : i === currentStep
              ? "current"
              : "upcoming";
          const isLast = i === steps.length - 1;

          return (
            <li
              key={i}
              className="relative flex gap-3"
              aria-current={status === "current" ? "step" : undefined}
              aria-label={`Step ${i + 1}: ${step.label}${status === "completed" ? " (completed)" : status === "current" ? " (current)" : ""}`}
            >
              {/* connector line column */}
              <div className="flex flex-col items-center">
                <StepIndicator index={i} status={status} variant={variant} />
                {!isLast && (
                  <span
                    className={cn(
                      "mt-1 w-0.5 flex-1 min-h-[24px]",
                      i < currentStep ? "bg-primary" : "bg-border"
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* content */}
              <div
                className={cn(
                  "pt-0.5 pb-6",
                  isLast && "pb-0",
                  isDots && "pt-0 flex items-center"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    status === "upcoming"
                      ? "text-foreground-muted"
                      : "text-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-xs text-foreground-subtle leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    );
  }

  /* ── Horizontal layout (auto-switches to vertical on mobile) ── */
  return (
    <ol
      className={cn(
        // mobile: vertical
        "flex flex-col",
        // sm+: horizontal
        "sm:flex-row sm:items-start",
        className
      )}
      aria-label="Progress"
    >
      {steps.map((step, i) => {
        const status =
          i < currentStep
            ? "completed"
            : i === currentStep
            ? "current"
            : "upcoming";
        const isLast = i === steps.length - 1;

        return (
          <li
            key={i}
            className={cn(
              // mobile: vertical item
              "relative flex gap-3",
              // sm+: horizontal item
              "sm:flex-col sm:items-center sm:gap-2 sm:flex-1",
              isLast ? "" : "sm:flex-1"
            )}
            aria-current={status === "current" ? "step" : undefined}
            aria-label={`Step ${i + 1}: ${step.label}${status === "completed" ? " (completed)" : status === "current" ? " (current)" : ""}`}
          >
            {/* ── Mobile vertical connector ── */}
            <div className="flex flex-col items-center sm:hidden">
              <StepIndicator index={i} status={status} variant={variant} />
              {!isLast && (
                <span
                  className={cn(
                    "mt-1 w-0.5 flex-1 min-h-[24px]",
                    i < currentStep ? "bg-primary" : "bg-border"
                  )}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* ── Desktop horizontal connector row ── */}
            <div className="hidden sm:flex items-center w-full">
              {/* left connector */}
              <span
                className={cn(
                  "flex-1 h-0.5",
                  i === 0 ? "invisible" : i <= currentStep ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
              <StepIndicator index={i} status={status} variant={variant} />
              {/* right connector */}
              <span
                className={cn(
                  "flex-1 h-0.5",
                  isLast ? "invisible" : i < currentStep ? "bg-primary" : "bg-border"
                )}
                aria-hidden="true"
              />
            </div>

            {/* ── Mobile: content ── */}
            <div
              className={cn(
                "pt-0.5 pb-6 sm:hidden",
                isLast && "pb-0",
                isDots && "flex items-center pt-0"
              )}
            >
              <p
                className={cn(
                  "text-sm font-medium leading-tight",
                  status === "upcoming"
                    ? "text-foreground-muted"
                    : "text-foreground"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-xs text-foreground-subtle leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>

            {/* ── Desktop: label below indicator ── */}
            <div className="hidden sm:block text-center px-1">
              <p
                className={cn(
                  "text-xs font-medium leading-tight",
                  status === "upcoming"
                    ? "text-foreground-muted"
                    : "text-foreground"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="mt-0.5 text-[11px] text-foreground-subtle leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
