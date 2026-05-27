"use client";

import { useState } from "react";
import { Checkbox } from "./Checkbox";
import { cn } from "@/lib/utils";

export interface CheckboxGroupOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  options: CheckboxGroupOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  /** Yatay dizilim */
  horizontal?: boolean;
  className?: string;
}

export function CheckboxGroup({
  options,
  value: valueProp,
  defaultValue = [],
  onChange,
  label,
  helperText,
  errorText,
  disabled,
  size = "md",
  horizontal = false,
  className,
}: CheckboxGroupProps) {
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const isControlled = valueProp !== undefined;
  const selected = isControlled ? valueProp : internal;

  const toggle = (val: string) => {
    const next = selected.includes(val)
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  return (
    <fieldset className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <legend className="text-sm font-medium text-foreground mb-1">{label}</legend>
      )}

      <div className={cn("flex gap-3", horizontal ? "flex-row flex-wrap" : "flex-col")}>
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            description={opt.description}
            size={size}
            disabled={disabled || opt.disabled}
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
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
