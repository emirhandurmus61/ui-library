"use client";

import { useState, useId } from "react";
import { Radio } from "./Radio";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  horizontal?: boolean;
  /** Kart görünümü — her seçeneği bordered bir kutu içinde gösterir */
  card?: boolean;
  className?: string;
}

export function RadioGroup({
  options,
  value: valueProp,
  defaultValue,
  onChange,
  name: nameProp,
  label,
  helperText,
  errorText,
  disabled,
  size = "md",
  horizontal = false,
  card = false,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const name = nameProp ?? autoName;

  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = valueProp !== undefined;
  const selected = isControlled ? valueProp : internal;

  const handleChange = (val: string) => {
    if (!isControlled) setInternal(val);
    onChange?.(val);
  };

  if (card) {
    return (
      <fieldset className={cn("flex flex-col gap-1.5", className)}>
        {label && (
          <legend className="text-sm font-medium text-foreground mb-1">{label}</legend>
        )}
        <div className={cn("flex gap-3", horizontal ? "flex-row flex-wrap" : "flex-col")}>
          {options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <label
                key={opt.value}
                className={cn(
                  "relative flex items-start gap-3 p-3.5 rounded-[var(--radius-md)]",
                  "border-2 cursor-pointer transition-all duration-150",
                  isSelected
                    ? "border-primary bg-primary-subtle"
                    : "border-border bg-surface hover:border-border-strong hover:bg-background-muted",
                  (disabled || opt.disabled) && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
              >
                <input
                  type="radio"
                  name={name}
                  value={opt.value}
                  checked={isSelected}
                  disabled={disabled || opt.disabled}
                  onChange={() => handleChange(opt.value)}
                  className="sr-only"
                />
                {/* Custom radio halka */}
                <span
                  className={cn(
                    "mt-0.5 flex shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
                    size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : "size-4",
                    isSelected ? "border-primary" : "border-border bg-surface"
                  )}
                >
                  <span
                    className={cn(
                      "rounded-full bg-primary transition-transform duration-150",
                      size === "sm" ? "size-1.5" : size === "lg" ? "size-2.5" : "size-2",
                      isSelected ? "scale-100" : "scale-0"
                    )}
                  />
                </span>

                <div className="flex flex-col gap-0.5">
                  <span className={cn(
                    "font-medium leading-none",
                    size === "lg" ? "text-base" : "text-sm",
                    isSelected ? "text-primary" : "text-foreground"
                  )}>
                    {opt.label}
                  </span>
                  {opt.description && (
                    <span className="text-xs text-foreground-muted leading-snug mt-0.5">
                      {opt.description}
                    </span>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {(helperText || errorText) && (
          <p className={cn("text-xs mt-0.5", errorText ? "text-danger" : "text-foreground-subtle")}>
            {errorText ?? helperText}
          </p>
        )}
      </fieldset>
    );
  }

  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <legend className="text-sm font-medium text-foreground mb-1">{label}</legend>
      )}
      <div className={cn("flex gap-3", horizontal ? "flex-row flex-wrap" : "flex-col")}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            description={opt.description}
            size={size}
            disabled={disabled || opt.disabled}
            checked={selected === opt.value}
            onChange={() => handleChange(opt.value)}
            errorText={errorText && selected === "" ? "" : undefined}
          />
        ))}
      </div>

      {(helperText || errorText) && (
        <p className={cn("text-xs mt-0.5", errorText ? "text-danger" : "text-foreground-subtle")}>
          {errorText ?? helperText}
        </p>
      )}
    </fieldset>
  );
}
