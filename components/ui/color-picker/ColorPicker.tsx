"use client";

import { useState, useId, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ColorPickerProps {
  value?: string;           // hex string e.g. "#3b82f6"
  onChange?: (hex: string) => void;
  presets?: string[];
  showPresets?: boolean;
  showOpacity?: boolean;
  className?: string;
}

/* ─── Color math ─────────────────────────────────────────────── */

interface HSV { h: number; s: number; v: number }
interface RGB { r: number; g: number; b: number }

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "").slice(0, 6);
  const n = parseInt(clean.padEnd(6, "0"), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex({ r, g, b }: RGB): string {
  return "#" + [r, g, b].map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("").toUpperCase();
}

function rgbToHsv({ r, g, b }: RGB): HSV {
  const rr = r / 255, gg = g / 255, bb = b / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rr)      h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
    else if (max === gg) h = ((bb - rr) / d + 2) / 6;
    else                 h = ((rr - gg) / d + 4) / 6;
  }
  return { h: h * 360, s: max === 0 ? 0 : d / max, v: max };
}

function hsvToRgb({ h, s, v }: HSV): RGB {
  const hh = ((h % 360) + 360) % 360 / 60;
  const i = Math.floor(hh), f = hh - i;
  const p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
  const [r, g, b] = (
    i === 0 ? [v, t, p] :
    i === 1 ? [q, v, p] :
    i === 2 ? [p, v, t] :
    i === 3 ? [p, q, v] :
    i === 4 ? [t, p, v] :
              [v, p, q]
  ).map(c => Math.round(c * 255));
  return { r, g, b };
}

function hueToHex(h: number): string {
  return rgbToHex(hsvToRgb({ h, s: 1, v: 1 }));
}

function isValidHex(v: string) { return /^#[0-9A-Fa-f]{6}$/.test(v); }

/* ─── Default presets ────────────────────────────────────────── */

const DEFAULT_PRESETS = [
  "#EF4444","#F97316","#F59E0B","#EAB308",
  "#84CC16","#22C55E","#10B981","#14B8A6",
  "#06B6D4","#0EA5E9","#3B82F6","#6366F1",
  "#8B5CF6","#A855F7","#EC4899","#F43F5E",
  "#FFFFFF","#E5E7EB","#9CA3AF","#6B7280",
  "#374151","#1F2937","#111827","#000000",
];

/* ─── Copy icon ──────────────────────────────────────────────── */
function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-success" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ─── Draggable canvas helper ────────────────────────────────── */

function useDrag(onMove: (x: number, y: number, rect: DOMRect) => void) {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handle = useCallback((e: PointerEvent) => {
    if (!dragging.current || !ref.current) return;
    e.preventDefault();
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onMove(x, y, rect);
  }, [onMove]);

  const onDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    onMove(x, y, rect);
  }, [onMove]);

  const onUp = useCallback(() => { dragging.current = false; }, []);

  return { ref, onDown, onUp, onMove: handle };
}

/* ─── ColorPicker ────────────────────────────────────────────── */

export function ColorPicker({
  value,
  onChange,
  presets,
  showPresets = true,
  showOpacity = false,
  className,
}: ColorPickerProps) {
  const uid = useId();
  const resolvedPresets = presets ?? DEFAULT_PRESETS;

  /* ── Internal state ─────────────────────────────────────────── */
  const [internalHex, setInternalHex] = useState(() => {
    const v = value ?? "#3B82F6";
    return isValidHex(v) ? v.toUpperCase() : "#3B82F6";
  });

  const hex = (value !== undefined && isValidHex(value))
    ? value.toUpperCase()
    : internalHex;

  const rgb = hexToRgb(hex);
  const hsv = rgbToHsv(rgb);

  const [hue, setHue] = useState(() => rgbToHsv(hexToRgb(hex)).h);
  const [sat, setSat] = useState(() => rgbToHsv(hexToRgb(hex)).s);
  const [bri, setBri] = useState(() => rgbToHsv(hexToRgb(hex)).v);
  const [opacity, setOpacity] = useState(100);

  const [hexInput, setHexInput] = useState(() => hex.replace("#", ""));
  const [rgbInput, setRgbInput] = useState<[string,string,string]>(() => [String(rgb.r), String(rgb.g), String(rgb.b)]);
  const [inputMode, setInputMode] = useState<"hex" | "rgb">("hex");
  const [copied, setCopied] = useState(false);

  /* Sync when value prop changes externally */
  useEffect(() => {
    if (value && isValidHex(value)) {
      const up = value.toUpperCase();
      const { h, s, v } = rgbToHsv(hexToRgb(up));
      setHue(h); setSat(s); setBri(v);
      setHexInput(up.replace("#", ""));
      const r2 = hexToRgb(up);
      setRgbInput([String(r2.r), String(r2.g), String(r2.b)]);
    }
  }, [value]);

  /* ── Emit ───────────────────────────────────────────────────── */
  const emit = useCallback((newHex: string) => {
    const up = newHex.toUpperCase();
    setInternalHex(up);
    setHexInput(up.replace("#", ""));
    const r2 = hexToRgb(up);
    setRgbInput([String(r2.r), String(r2.g), String(r2.b)]);
    onChange?.(up);
  }, [onChange]);

  const emitFromHsv = useCallback((h: number, s: number, v: number) => {
    const newHex = rgbToHex(hsvToRgb({ h, s, v }));
    emit(newHex);
  }, [emit]);

  /* ── Saturation/Brightness canvas ───────────────────────────── */
  const onSBMove = useCallback((x: number, y: number) => {
    const newS = x, newV = 1 - y;
    setSat(newS); setBri(newV);
    emitFromHsv(hue, newS, newV);
  }, [hue, emitFromHsv]);

  const sbDrag = useDrag(onSBMove);

  /* ── Hue slider ─────────────────────────────────────────────── */
  const onHueMove = useCallback((x: number) => {
    const newH = x * 360;
    setHue(newH);
    emitFromHsv(newH, sat, bri);
  }, [sat, bri, emitFromHsv]);

  const hueDrag = useDrag((x) => onHueMove(x));

  /* ── Opacity slider ─────────────────────────────────────────── */
  const opaDrag = useDrag((x) => setOpacity(Math.round(x * 100)));

  /* ── Hex input ──────────────────────────────────────────────── */
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, "").slice(0, 6);
    setHexInput(raw);
    if (raw.length === 6) {
      const candidate = "#" + raw;
      const { h, s, v } = rgbToHsv(hexToRgb(candidate));
      setHue(h); setSat(s); setBri(v);
      emit(candidate);
    }
  };

  const handleHexBlur = () => {
    if (hexInput.length !== 6) {
      setHexInput(hex.replace("#", ""));
    }
  };

  /* ── RGB inputs ─────────────────────────────────────────────── */
  const handleRgbChange = (idx: 0 | 1 | 2, val: string) => {
    const next = [...rgbInput] as [string, string, string];
    next[idx] = val.replace(/[^0-9]/g, "").slice(0, 3);
    setRgbInput(next);
    const nums = next.map(v => Math.min(255, parseInt(v || "0", 10)));
    const newHex = rgbToHex({ r: nums[0], g: nums[1], b: nums[2] });
    const { h, s, v } = rgbToHsv(hexToRgb(newHex));
    setHue(h); setSat(s); setBri(v);
    emit(newHex);
  };

  /* ── Preset click ────────────────────────────────────────────── */
  const handlePreset = (preset: string) => {
    const clean = preset.slice(0, 7).toUpperCase();
    const { h, s, v } = rgbToHsv(hexToRgb(clean));
    setHue(h); setSat(s); setBri(v);
    emit(clean);
  };

  /* ── Copy ───────────────────────────────────────────────────── */
  const handleCopy = () => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  /* ── Derived values ─────────────────────────────────────────── */
  const hueHex   = hueToHex(hue);        // pure hue color for gradients
  const thumbX   = sat * 100;            // % inside SB canvas
  const thumbY   = (1 - bri) * 100;      // %
  const hueX     = (hue / 360) * 100;    // %

  return (
    <div className={cn("flex flex-col gap-3 w-full select-none", className)}>

      {/* ── Saturation / Brightness canvas ────────────────────── */}
      <div
        ref={sbDrag.ref}
        className="relative w-full rounded-[var(--radius-lg)] overflow-hidden cursor-crosshair"
        style={{ height: 180 }}
        onPointerDown={sbDrag.onDown}
        onPointerMove={(e) => sbDrag.onMove(e.nativeEvent)}
        onPointerUp={sbDrag.onUp}
      >
        {/* Saturation gradient (left=white, right=pure hue) */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, #fff, ${hueHex})` }} />
        {/* Brightness gradient (top=transparent, bottom=black) */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent, #000)" }} />

        {/* Thumb */}
        <div
          className="absolute size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.3)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: `${thumbX}%`, top: `${thumbY}%`, background: hex }}
        />
      </div>

      {/* ── Hue slider ────────────────────────────────────────── */}
      <div
        ref={hueDrag.ref}
        className="relative h-3 w-full rounded-full cursor-pointer overflow-hidden"
        style={{ background: "linear-gradient(to right,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }}
        onPointerDown={hueDrag.onDown}
        onPointerMove={(e) => hueDrag.onMove(e.nativeEvent)}
        onPointerUp={hueDrag.onUp}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
          style={{ left: `${hueX}%`, background: hueHex }}
        />
      </div>

      {/* ── Opacity slider ────────────────────────────────────── */}
      {showOpacity && (
        <div
          ref={opaDrag.ref}
          className="relative h-3 w-full rounded-full cursor-pointer overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to right, transparent, ${hueHex}),
              repeating-linear-gradient(45deg, #ccc 0 4px, #fff 4px 8px)`,
          }}
          onPointerDown={opaDrag.onDown}
          onPointerMove={(e) => opaDrag.onMove(e.nativeEvent)}
          onPointerUp={opaDrag.onUp}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-4 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)] pointer-events-none"
            style={{ left: `${opacity}%`, background: hex }}
          />
        </div>
      )}

      {/* ── Preview + inputs ──────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Color swatch */}
        <div
          className="size-9 rounded-[var(--radius-md)] border border-border shrink-0"
          style={{ background: showOpacity ? `${hex}${Math.round(opacity/100*255).toString(16).padStart(2,"0")}` : hex }}
        />

        {/* Input mode tabs */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex gap-1 mb-1">
            {(["hex", "rgb"] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setInputMode(mode)}
                className={cn(
                  "text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded transition-colors",
                  inputMode === mode
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-subtle hover:text-foreground"
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {inputMode === "hex" ? (
            <div className="flex items-center h-8 rounded-[var(--radius-md)] border border-border bg-surface overflow-hidden">
              <span className="px-2 text-xs text-foreground-muted font-mono select-none">#</span>
              <input
                type="text"
                value={hexInput}
                maxLength={6}
                onChange={handleHexChange}
                onBlur={handleHexBlur}
                onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                className="flex-1 h-full bg-transparent text-xs font-mono uppercase text-foreground focus:outline-none pr-2"
                aria-label="Hex color"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="flex gap-1">
              {(["R","G","B"] as const).map((ch, i) => (
                <div key={ch} className="flex-1 flex items-center h-8 rounded-[var(--radius-md)] border border-border bg-surface overflow-hidden">
                  <span className="px-1.5 text-[10px] text-foreground-subtle font-semibold">{ch}</span>
                  <input
                    type="text"
                    value={rgbInput[i]}
                    onChange={(e) => handleRgbChange(i as 0|1|2, e.target.value)}
                    className="flex-1 w-0 h-full bg-transparent text-xs font-mono text-foreground focus:outline-none"
                    aria-label={`${ch} channel`}
                    spellCheck={false}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          title="Kopyala"
          className="size-9 shrink-0 flex items-center justify-center rounded-[var(--radius-md)] border border-border bg-surface hover:bg-background-muted text-foreground-muted hover:text-foreground transition-colors"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>

      {/* ── Opacity value display ─────────────────────────────── */}
      {showOpacity && (
        <div className="flex items-center justify-between text-xs text-foreground-muted">
          <span>Opaklık</span>
          <span className="font-mono">{opacity}%</span>
        </div>
      )}

      {/* ── Presets ───────────────────────────────────────────── */}
      {showPresets && resolvedPresets.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground-subtle mb-2">Presetler</p>
          <div className="grid grid-cols-8 gap-1.5" role="listbox" aria-label="Color presets">
            {resolvedPresets.map((preset) => {
              const isSelected = preset.toUpperCase().slice(0,7) === hex.slice(0,7);
              return (
                <button
                  key={preset}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-label={preset}
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "size-6 rounded-[var(--radius-sm)] border-2 transition-all duration-100",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    isSelected
                      ? "border-foreground scale-110 shadow-sm"
                      : "border-transparent hover:scale-105 hover:border-border"
                  )}
                  style={{ backgroundColor: preset }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
