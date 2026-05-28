"use client";

import { useState, useRef, useId, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface RatingInputProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
  allowHalf?: boolean;
  label?: string;
  showValue?: boolean;
  className?: string;
}

/* ─── Size map ───────────────────────────────────────────────── */

const SIZE_CLASS: Record<string, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

/* ─── Star SVG ───────────────────────────────────────────────── */

function StarIcon({
  fill,
  half,
  className,
}: {
  fill: "full" | "half" | "empty";
  half?: boolean;
  className?: string;
}) {
  const id = useId();
  const gradId = `half-${id}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {fill === "half" && (
        <defs>
          <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          fill === "full"
            ? "currentColor"
            : fill === "half"
            ? `url(#${gradId})`
            : "none"
        }
        stroke="currentColor"
        strokeWidth={fill === "empty" ? "1.5" : "0"}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function RatingInput({
  value = 0,
  onChange,
  max = 5,
  size = "md",
  readOnly = false,
  allowHalf = false,
  label,
  showValue = false,
  className,
}: RatingInputProps) {
  const groupId = useId();
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const displayValue = hoverValue ?? value;

  const getStarFill = (starIndex: number): "full" | "half" | "empty" => {
    const starNumber = starIndex + 1;
    if (displayValue >= starNumber) return "full";
    if (allowHalf && displayValue >= starNumber - 0.5) return "half";
    return "empty";
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
      if (readOnly) return;
      if (!allowHalf) {
        setHoverValue(starIndex + 1);
        return;
      }
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const isLeftHalf = x < rect.width / 2;
      setHoverValue(isLeftHalf ? starIndex + 0.5 : starIndex + 1);
    },
    [readOnly, allowHalf]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, starIndex: number) => {
      if (readOnly) return;
      let newValue: number;
      if (!allowHalf) {
        newValue = starIndex + 1;
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        newValue = x < rect.width / 2 ? starIndex + 0.5 : starIndex + 1;
      }
      // Toggle off: clicking same value deselects
      onChange?.(newValue === value ? 0 : newValue);
    },
    [readOnly, allowHalf, value, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (readOnly) return;
      const step = allowHalf ? 0.5 : 1;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onChange?.(Math.min(max, (value || 0) + step));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onChange?.(Math.max(0, (value || 0) - step));
      } else if (e.key === "Home") {
        e.preventDefault();
        onChange?.(0);
      } else if (e.key === "End") {
        e.preventDefault();
        onChange?.(max);
      }
    },
    [readOnly, allowHalf, value, max, onChange]
  );

  return (
    <div className={cn("flex flex-col gap-1.5 w-fit", className)}>
      {label && (
        <label
          id={`${groupId}-label`}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <div
          role="radiogroup"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-label={!label ? "Rating" : undefined}
          onKeyDown={handleKeyDown}
          onMouseLeave={() => !readOnly && setHoverValue(null)}
          className={cn(
            "flex items-center gap-0.5",
            readOnly ? "pointer-events-none" : "cursor-pointer"
          )}
        >
          {Array.from({ length: max }, (_, i) => {
            const starValue = allowHalf ? i + 0.5 : i + 1;
            const fullValue = i + 1;
            const isChecked = value === fullValue || (allowHalf && value === starValue);
            const fill = getStarFill(i);

            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={
                  allowHalf
                    ? value >= i + 0.5 && value < i + 1
                      ? "mixed"
                      : value >= i + 1
                    : value >= i + 1
                }
                aria-label={`${allowHalf ? i + 1 : i + 1} star${i + 1 !== 1 ? "s" : ""}`}
                tabIndex={!readOnly ? (i === 0 ? 0 : -1) : -1}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onClick={(e) => handleClick(e, i)}
                className={cn(
                  "relative transition-transform duration-100 focus-visible:outline-none",
                  SIZE_CLASS[size],
                  !readOnly && "hover:scale-110 active:scale-95",
                  fill === "full" || fill === "half"
                    ? "text-amber-400"
                    : "text-foreground-subtle/30"
                )}
              >
                <StarIcon fill={fill} className="size-full" />
              </button>
            );
          })}
        </div>

        {showValue && (
          <span className="text-sm text-foreground-muted tabular-nums">
            {displayValue % 1 === 0
              ? `${displayValue}`
              : `${displayValue}`}{" "}
            / {max}
          </span>
        )}
      </div>
    </div>
  );
}
