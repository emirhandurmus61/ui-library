"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showHexInput?: boolean;
  showOpacity?: boolean;
  className?: string;
}

/* ─── Constants ──────────────────────────────────────────────── */

const DEFAULT_PRESETS = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#10b981", // emerald
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#0ea5e9", // sky
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#a855f7", // purple
  "#ec4899", // pink
  "#f43f5e", // rose
];

/* ─── Helpers ────────────────────────────────────────────────── */

function isValidHex(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value);
}

function hexWithOpacity(hex: string, opacity: number): string {
  const alpha = Math.round((opacity / 100) * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${hex}${alpha}`;
}

/* ─── Component ──────────────────────────────────────────────── */

export function ColorPicker({
  value,
  onChange,
  presets,
  showHexInput = true,
  showOpacity = false,
  className,
}: ColorPickerProps) {
  const id = useId();
  const resolvedPresets = presets ?? DEFAULT_PRESETS;

  const [internalHex, setInternalHex] = useState<string>(value ?? "#3b82f6");
  const [opacity, setOpacity] = useState(100);
  const [inputValue, setInputValue] = useState<string>(
    (value ?? "#3b82f6").replace("#", "").toUpperCase()
  );

  const hex = value !== undefined ? value : internalHex;

  const emitChange = (newHex: string, newOpacity = opacity) => {
    const color = showOpacity ? hexWithOpacity(newHex, newOpacity) : newHex;
    onChange?.(color);
    if (value === undefined) {
      setInternalHex(newHex);
    }
  };

  const handlePresetClick = (preset: string) => {
    const clean = preset.slice(0, 7); // strip alpha if any
    setInputValue(clean.replace("#", "").toUpperCase());
    if (value === undefined) setInternalHex(clean);
    emitChange(clean);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, "");
    setInputValue(raw);
  };

  const handleInputBlur = () => {
    const candidate = `#${inputValue}`;
    if (isValidHex(candidate)) {
      if (value === undefined) setInternalHex(candidate);
      emitChange(candidate);
    } else {
      // Revert input to current valid value
      setInputValue(hex.replace("#", "").toUpperCase());
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setOpacity(val);
    emitChange(hex, val);
  };

  const baseHex = hex.slice(0, 7);

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {/* Color preview + hex input row */}
      {showHexInput && (
        <div className="flex items-center gap-3">
          {/* Preview square */}
          <div
            className="size-10 rounded-[var(--radius-md)] border border-border shrink-0 transition-colors duration-150"
            style={{ backgroundColor: baseHex }}
            aria-hidden="true"
          />

          {/* Hex input */}
          <div className="relative flex-1 flex items-center">
            <span
              className="absolute left-3 size-4 rounded-sm shrink-0 border border-border"
              style={{ backgroundColor: baseHex }}
              aria-hidden="true"
            />
            <span className="absolute left-9 text-sm text-foreground-muted font-mono select-none">
              #
            </span>
            <input
              id={`${id}-hex`}
              type="text"
              value={inputValue}
              maxLength={6}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              aria-label="Hex color value"
              placeholder="3B82F6"
              className={cn(
                "w-full h-10 pl-12 pr-3 font-mono text-sm uppercase",
                "bg-surface border border-border rounded-[var(--radius-md)]",
                "text-foreground placeholder:text-foreground-subtle",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                "transition-colors duration-150"
              )}
            />
          </div>
        </div>
      )}

      {/* Preset swatches */}
      {resolvedPresets.length > 0 && (
        <div
          className="grid grid-cols-8 gap-1.5"
          role="listbox"
          aria-label="Color presets"
        >
          {resolvedPresets.map((preset) => {
            const presetBase = preset.slice(0, 7);
            const isSelected =
              presetBase.toLowerCase() === baseHex.toLowerCase();
            return (
              <button
                key={preset}
                type="button"
                role="option"
                aria-selected={isSelected}
                aria-label={preset}
                onClick={() => handlePresetClick(preset)}
                className={cn(
                  "size-6 rounded-[var(--radius-sm)] cursor-pointer border-2 transition-all duration-150",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  isSelected
                    ? "border-foreground shadow-sm scale-110"
                    : "border-transparent hover:border-border hover:scale-105"
                )}
                style={{ backgroundColor: presetBase }}
              />
            );
          })}
        </div>
      )}

      {/* Opacity slider */}
      {showOpacity && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`${id}-opacity`}
              className="text-xs font-medium text-foreground-muted"
            >
              Opacity
            </label>
            <span className="text-xs font-mono text-foreground-muted">
              {opacity}%
            </span>
          </div>

          {/* Gradient track background */}
          <div className="relative h-4 flex items-center">
            <div
              className="absolute inset-0 rounded-full border border-border"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, ${baseHex})`,
              }}
              aria-hidden="true"
            />
            <input
              id={`${id}-opacity`}
              type="range"
              min={0}
              max={100}
              value={opacity}
              onChange={handleOpacityChange}
              aria-label="Opacity"
              className={cn(
                "relative w-full h-4 appearance-none bg-transparent cursor-pointer",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:size-4",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:bg-white",
                "[&::-webkit-slider-thumb]:border-2",
                "[&::-webkit-slider-thumb]:border-border",
                "[&::-webkit-slider-thumb]:shadow-sm",
                "[&::-webkit-slider-thumb]:cursor-pointer",
                "[&::-webkit-slider-thumb]:transition-transform",
                "[&::-webkit-slider-thumb]:hover:scale-110",
                "[&::-moz-range-thumb]:size-4",
                "[&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:bg-white",
                "[&::-moz-range-thumb]:border-2",
                "[&::-moz-range-thumb]:border-border",
                "[&::-moz-range-thumb]:cursor-pointer"
              )}
            />
          </div>
        </div>
      )}
    </div>
  );
}
