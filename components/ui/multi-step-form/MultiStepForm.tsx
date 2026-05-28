"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface MultiStepFormStep {
  title: string;
  description?: string;
  content: React.ReactNode;
  /** Optional validation — return error string or null */
  validate?: () => string | null;
}

export interface MultiStepFormProps {
  steps: MultiStepFormStep[];
  onComplete?: (currentStep: number) => void;
  onStepChange?: (step: number) => void;
  showStepIndicator?: boolean;
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

/* ─── Step Dot ───────────────────────────────────────────────── */

function StepDot({
  index,
  status,
}: {
  index: number;
  status: "completed" | "current" | "upcoming";
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        aria-current={status === "current" ? "step" : undefined}
        aria-label={`Step ${index + 1}`}
        className={cn(
          "relative flex items-center justify-center size-8 rounded-full border-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          status === "completed" &&
            "bg-primary border-primary text-primary-foreground",
          status === "current" &&
            "bg-background border-primary text-primary ring-4 ring-primary/20",
          status === "upcoming" &&
            "bg-background border-border text-foreground-muted"
        )}
      >
        {status === "completed" ? (
          <CheckIcon className="size-3.5" />
        ) : (
          <span>{index + 1}</span>
        )}
      </button>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function MultiStepForm({
  steps,
  onComplete,
  onStepChange,
  showStepIndicator = true,
  className,
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [error, setError] = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const progressPct = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 100;

  const navigate = (nextStep: number, dir: "forward" | "back") => {
    setDirection(dir);
    setError(null);
    setVisible(false);
    setAnimating(true);

    setTimeout(() => {
      setCurrentStep(nextStep);
      setVisible(true);
      setTimeout(() => setAnimating(false), 200);
    }, 150);

    onStepChange?.(nextStep);
  };

  const handleNext = () => {
    const err = step.validate?.() ?? null;
    if (err) {
      setError(err);
      return;
    }

    if (isLast) {
      onComplete?.(currentStep);
      return;
    }

    navigate(currentStep + 1, "forward");
  };

  const handleBack = () => {
    if (isFirst) return;
    navigate(currentStep - 1, "back");
  };

  // Reset error when step changes
  useEffect(() => {
    setError(null);
  }, [currentStep]);

  return (
    <div className={cn("flex flex-col gap-6 w-full", className)}>
      {/* Step Indicator */}
      {showStepIndicator && (
        <div className="flex flex-col gap-3">
          <div
            className="flex items-center justify-between gap-2"
            role="list"
            aria-label="Form steps"
          >
            {steps.map((s, i) => {
              const status =
                i < currentStep
                  ? "completed"
                  : i === currentStep
                  ? "current"
                  : "upcoming";
              return (
                <div
                  key={i}
                  role="listitem"
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <StepDot index={i} status={status} />
                  <span
                    className={cn(
                      "hidden sm:block text-xs font-medium text-center leading-tight max-w-[80px] truncate",
                      status === "current"
                        ? "text-foreground"
                        : status === "completed"
                        ? "text-foreground-muted"
                        : "text-foreground-subtle"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="h-1 w-full bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progressPct}%` }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={totalSteps}
            />
          </div>

          {/* Step counter */}
          <p className="text-xs text-foreground-muted text-right">
            {currentStep + 1} / {totalSteps}
          </p>
        </div>
      )}

      {/* Step Content */}
      <div
        key={currentStep}
        className={cn(
          "transition-all duration-200",
          animating && direction === "forward" && !visible
            ? "translate-x-4 opacity-0"
            : animating && direction === "back" && !visible
            ? "-translate-x-4 opacity-0"
            : "translate-x-0 opacity-100"
        )}
      >
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
          {step.description && (
            <p className="text-sm text-foreground-muted mt-1">{step.description}</p>
          )}
        </div>

        <div>{step.content}</div>

        {error && (
          <p className="text-sm text-danger mt-2" role="alert">
            {error}
          </p>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
        <button
          type="button"
          onClick={handleBack}
          disabled={isFirst}
          className={cn(
            "inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium",
            "rounded-[var(--radius-md)] border border-border bg-transparent text-foreground",
            "hover:bg-background-muted hover:border-border-strong",
            "transition-all duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            "disabled:opacity-0 disabled:pointer-events-none"
          )}
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
            aria-hidden="true"
          >
            <polyline points="10,3 5,8 10,13" />
          </svg>
          Geri
        </button>

        <button
          type="button"
          onClick={handleNext}
          className={cn(
            "inline-flex items-center justify-center gap-2 h-10 px-4 text-sm font-medium",
            "rounded-[var(--radius-md)] bg-primary text-primary-foreground border border-transparent",
            "hover:bg-primary-hover",
            "transition-all duration-150 shadow-sm",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          )}
        >
          {isLast ? "Tamamla" : "İleri"}
          {!isLast && (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <polyline points="6,3 11,8 6,13" />
            </svg>
          )}
          {isLast && (
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <polyline points="2,8 6,12 14,4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
