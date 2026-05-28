"use client";

import { useId, useRef, useState, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface TagInputProps {
  value?:          string[];
  defaultValue?:   string[];
  onChange?:       (tags: string[]) => void;
  placeholder?:    string;
  label?:          string;
  helperText?:     string;
  errorText?:      string;
  successText?:    string;
  disabled?:       boolean;
  maxTags?:        number;
  /** Duplicate tag'lere izin verme */
  allowDuplicate?: boolean;
  /** Her tag için renk tonu */
  tagColor?:       "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  /** Enter dışında ayırıcı — virgül gibi */
  delimiter?:      string;
  /** Minimum karakter sayısı */
  minLength?:      number;
  /** Maksimum karakter sayısı */
  maxLength?:      number;
  size?:           "sm" | "md" | "lg";
  id?:             string;
  className?:      string;
}

/* ─── Color map ──────────────────────────────────────────────── */

const TAG_COLOR: Record<string, string> = {
  primary:   "bg-primary-subtle text-primary",
  secondary: "bg-secondary text-secondary-foreground",
  success:   "bg-success-subtle text-success",
  warning:   "bg-warning-subtle text-warning",
  danger:    "bg-danger-subtle text-danger",
  info:      "bg-info-subtle text-info",
};

const SIZE_INPUT: Record<string, string> = {
  sm: "min-h-8  px-2 py-1 text-sm",
  md: "min-h-10 px-3 py-1.5 text-sm",
  lg: "min-h-11 px-3 py-2 text-base",
};

/* ─── Component ──────────────────────────────────────────────── */

export function TagInput({
  value: valueProp,
  defaultValue = [],
  onChange,
  placeholder = "Etiket ekle...",
  label,
  helperText,
  errorText,
  successText,
  disabled = false,
  maxTags,
  allowDuplicate = false,
  tagColor = "primary",
  delimiter = ",",
  minLength = 1,
  maxLength,
  size = "md",
  id: idProp,
  className,
}: TagInputProps) {
  const autoId   = useId();
  const id       = idProp ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const tags = isControlled ? (valueProp ?? []) : internal;

  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  const emit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const addTag = (raw: string) => {
    const val = raw.trim();
    if (!val || val.length < minLength) return;
    if (maxLength && val.length > maxLength) return;
    if (!allowDuplicate && tags.includes(val)) return;
    if (maxTags && tags.length >= maxTags) return;
    emit([...tags, val]);
    setInputValue("");
  };

  const removeTag = (idx: number) => {
    const next = tags.filter((_, i) => i !== idx);
    emit(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === delimiter) && inputValue) {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.endsWith(delimiter)) {
      addTag(val.slice(0, -1));
    } else {
      setInputValue(val);
    }
  };

  const feedbackText  = errorText ?? successText ?? helperText;
  const feedbackColor = errorText ? "text-danger" : successText ? "text-success" : "text-foreground-subtle";

  const reachedMax = maxTags ? tags.length >= maxTags : false;
  const state = errorText ? "border-danger" : successText ? "border-success" : focused ? "border-primary ring-2 ring-primary/20" : "";

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground leading-none">
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex flex-wrap gap-1.5 w-full",
          "bg-surface border border-border rounded-[var(--radius-md)]",
          "cursor-text transition-colors duration-150",
          SIZE_INPUT[size],
          state,
          disabled && "opacity-50 cursor-not-allowed bg-background-muted"
        )}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Tags */}
        {tags.map((tag, idx) => (
          <span
            key={`${tag}-${idx}`}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-full)]",
              "text-xs font-medium",
              TAG_COLOR[tagColor]
            )}
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(idx); }}
                className="flex items-center justify-center rounded-full w-3.5 h-3.5 hover:opacity-70 transition-opacity"
                aria-label={`${tag} kaldır`}
              >
                <XIcon />
              </button>
            )}
          </span>
        ))}

        {/* Input */}
        {!reachedMax && (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => { setFocused(false); if (inputValue.trim()) addTag(inputValue); }}
            placeholder={tags.length === 0 ? placeholder : ""}
            disabled={disabled}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-foreground placeholder:text-foreground-subtle"
          />
        )}

        {reachedMax && tags.length > 0 && !inputValue && (
          <span className="text-xs text-foreground-subtle self-center">Maks. {maxTags} etiket</span>
        )}
      </div>

      {feedbackText && (
        <p className={cn("text-xs leading-none", feedbackColor)}>{feedbackText}</p>
      )}
    </div>
  );
}
