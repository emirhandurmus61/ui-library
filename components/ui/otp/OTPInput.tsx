"use client";

import { useRef, useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface OTPInputProps {
  /** Kaç hane (varsayılan 6) */
  length?: number;
  /** Kontrollü değer — her hane birleşik string: "123456" */
  value?: string;
  onChange?: (value: string) => void;
  /** Submit tetikleyici — length dolu olduğunda çağrılır */
  onComplete?: (value: string) => void;
  /** Hata metni */
  errorText?: string;
  /** Başarı metni */
  successText?: string;
  /** Yardımcı metin */
  helperText?: string;
  /** Label */
  label?: string;
  disabled?: boolean;
  /** Karakter tipi */
  type?: "numeric" | "alphanumeric";
  /** Hane boyutu */
  size?: "sm" | "md" | "lg";
  /** Maskeleme (şifre gibi) */
  mask?: boolean;
  className?: string;
  /** Her hücreye ek class */
  cellClassName?: string;
}

/* ─── Boyut haritası ─────────────────────────────────────────── */

const sizeMap = {
  sm: "size-9 text-sm rounded-[var(--radius-md)]",
  md: "size-11 text-base rounded-[var(--radius-md)]",
  lg: "size-12 text-lg rounded-[var(--radius-lg)]",
};

const gapMap = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-3",
};

/* ─── Component ──────────────────────────────────────────────── */

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  errorText,
  successText,
  helperText,
  label,
  disabled = false,
  type = "numeric",
  size = "md",
  mask = false,
  className,
  cellClassName,
}: OTPInputProps) {
  const id = useId();
  const isControlled = value !== undefined;

  /* internal state — array of single chars */
  const [internal, setInternal] = useState<string[]>(() => Array(length).fill(""));
  const chars: string[] = isControlled
    ? Array.from({ length }, (_, i) => value![i] ?? "")
    : internal;

  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focus = (i: number) => refs.current[i]?.focus();
  const select = (i: number) => refs.current[i]?.select();

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      const joined = next.join("");
      onChange?.(joined);
      if (joined.replace(/\s/g, "").length === length) onComplete?.(joined);
    },
    [isControlled, length, onChange, onComplete]
  );

  const sanitize = (raw: string) => {
    if (type === "numeric") return raw.replace(/\D/g, "");
    return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  };

  const handleChange = (i: number, raw: string) => {
    const clean = sanitize(raw);
    if (!clean) return;

    /* paste — birden fazla karakter */
    if (clean.length > 1) {
      const next = [...chars];
      let idx = i;
      for (const ch of clean) {
        if (idx >= length) break;
        next[idx++] = ch;
      }
      commit(next);
      const jumpTo = Math.min(i + clean.length, length - 1);
      setTimeout(() => { focus(jumpTo); select(jumpTo); }, 0);
      return;
    }

    const next = [...chars];
    next[i] = clean;
    commit(next);
    if (i < length - 1) setTimeout(() => { focus(i + 1); select(i + 1); }, 0);
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (chars[i]) {
        const next = [...chars];
        next[i] = "";
        commit(next);
      } else if (i > 0) {
        const next = [...chars];
        next[i - 1] = "";
        commit(next);
        focus(i - 1);
      }
    } else if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === "ArrowRight" && i < length - 1) {
      e.preventDefault();
      focus(i + 1);
    } else if (e.key === "Delete") {
      e.preventDefault();
      const next = [...chars];
      next[i] = "";
      commit(next);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const raw = sanitize(e.clipboardData.getData("text"));
    if (!raw) return;
    const next = Array(length).fill("");
    for (let i = 0; i < Math.min(raw.length, length); i++) next[i] = raw[i];
    commit(next);
    const jumpTo = Math.min(raw.length, length - 1);
    setTimeout(() => { focus(jumpTo); select(jumpTo); }, 0);
  };

  const state = errorText ? "error" : successText ? "success" : "default";

  const cellBase = cn(
    "flex items-center justify-center text-center font-semibold tabular-nums",
    "border bg-surface text-foreground",
    "transition-all duration-150",
    "focus:outline-none focus:ring-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    sizeMap[size],
    state === "error"   && "border-danger   focus:border-danger   focus:ring-danger/20",
    state === "success" && "border-success  focus:border-success  focus:ring-success/20",
    state === "default" && "border-border   focus:border-primary  focus:ring-primary/20",
  );

  return (
    <div className={cn("inline-flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={`${id}-0`} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}

      <div
        className={cn("flex", gapMap[size])}
        onPaste={handlePaste}
        role="group"
        aria-label={label ?? "OTP girişi"}
      >
        {chars.map((ch, i) => (
          <input
            key={i}
            id={i === 0 ? `${id}-0` : undefined}
            ref={(el) => { refs.current[i] = el; }}
            type={mask ? "password" : "text"}
            inputMode={type === "numeric" ? "numeric" : "text"}
            maxLength={1}
            value={ch}
            disabled={disabled}
            autoComplete="one-time-code"
            aria-label={`${i + 1}. hane`}
            className={cn(cellBase, cellClassName)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>

      {(errorText || successText || helperText) && (
        <p className={cn(
          "text-xs",
          state === "error"   ? "text-danger" :
          state === "success" ? "text-success" :
                                "text-foreground-muted"
        )}>
          {errorText ?? successText ?? helperText}
        </p>
      )}
    </div>
  );
}
