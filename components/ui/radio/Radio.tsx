"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: string;
  description?: string;
  errorText?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { outer: "size-3.5", inner: "size-1.5", label: "text-sm", description: "text-xs", mt: "mt-px" },
  md: { outer: "size-4",   inner: "size-2",   label: "text-sm", description: "text-xs", mt: "mt-0.5" },
  lg: { outer: "size-5",   inner: "size-2.5", label: "text-base", description: "text-sm", mt: "mt-0.5" },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      description,
      errorText,
      size = "md",
      id: idProp,
      disabled,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const s = sizeMap[size];

    return (
      <div className={cn("flex gap-2.5", className)}>
        <div className={cn("relative shrink-0", s.outer, s.mt)}>
          <input
            ref={ref}
            type="radio"
            id={id}
            disabled={disabled}
            className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            {...props}
          />
          {/* Dış halka */}
          <span
            className={cn(
              "flex items-center justify-center size-full rounded-full",
              "border-2 border-border bg-surface",
              "transition-all duration-150",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30 peer-focus-visible:ring-offset-1",
              "peer-checked:border-primary",
              errorText && "border-danger peer-checked:border-danger",
              "peer-disabled:opacity-50"
            )}
          >
            {/* İç nokta */}
            <span
              className={cn(
                "rounded-full transition-all duration-150",
                s.inner,
                "scale-0 peer-checked:scale-100",
                "bg-primary",
                errorText && "bg-danger"
              )}
            />
          </span>
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  s.label,
                  "font-medium leading-none cursor-pointer",
                  disabled ? "opacity-50 cursor-not-allowed" : "text-foreground",
                  errorText && "text-danger"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(s.description, "text-foreground-muted leading-snug")}>
                {description}
              </p>
            )}
            {errorText && (
              <p className="text-xs text-danger leading-none mt-0.5">{errorText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
