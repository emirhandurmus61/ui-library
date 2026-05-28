"use client";

import { useTheme, type ColorPreset, type RadiusPreset, type FontPreset, type Theme } from "@/components/providers";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3" aria-hidden="true">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  );
}

/* ─── Section label ──────────────────────────────────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground-subtle mb-2">
      {children}
    </p>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const THEMES: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light",  label: "Açık",   icon: <SunIcon /> },
  { value: "dark",   label: "Koyu",   icon: <MoonIcon /> },
  { value: "system", label: "Sistem", icon: <SystemIcon /> },
];

const COLOR_PRESETS: { value: ColorPreset; label: string; color: string; darkColor: string }[] = [
  { value: "default", label: "Indigo",  color: "#6366f1", darkColor: "#818cf8" },
  { value: "rose",    label: "Rose",    color: "#f43f5e", darkColor: "#fb7185" },
  { value: "emerald", label: "Emerald", color: "#10b981", darkColor: "#34d399" },
  { value: "amber",   label: "Amber",   color: "#f59e0b", darkColor: "#fbbf24" },
  { value: "slate",   label: "Slate",   color: "#64748b", darkColor: "#94a3b8" },
];

const RADIUS_PRESETS: { value: RadiusPreset; label: string; preview: string }[] = [
  { value: "sharp",   label: "Sharp",   preview: "rounded-none" },
  { value: "default", label: "Default", preview: "rounded-md" },
  { value: "rounded", label: "Rounded", preview: "rounded-xl" },
];

const FONT_PRESETS: { value: FontPreset; label: string; sample: string }[] = [
  { value: "geist",   label: "Geist",   sample: "Aa" },
  { value: "inter",   label: "Inter",   sample: "Aa" },
  { value: "dm-sans", label: "DM Sans", sample: "Aa" },
  { value: "mono",    label: "Mono",    sample: "Aa" },
];

/* ─── ThemeSwitcher ──────────────────────────────────────────── */

export interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const {
    theme, resolvedTheme,
    colorPreset, radiusPreset, fontPreset,
    setTheme, setColorPreset, setRadiusPreset, setFontPreset,
  } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <div className={cn("space-y-5 p-4 w-64 bg-surface border border-border rounded-[var(--radius-xl)] shadow-lg", className)}>

      {/* ── Theme ── */}
      <div>
        <Label>Tema</Label>
        <div className="flex gap-1.5">
          {THEMES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded-[var(--radius-md)] text-xs border transition-colors",
                theme === t.value
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border bg-background-muted text-foreground-muted hover:text-foreground hover:bg-background-subtle"
              )}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Color preset ── */}
      <div>
        <Label>Renk</Label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_PRESETS.map((p) => {
            const active = colorPreset === p.value;
            const swatch = isDark ? p.darkColor : p.color;
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => setColorPreset(p.value)}
                title={p.label}
                className="flex flex-col items-center gap-1 group"
              >
                <span
                  className={cn(
                    "size-7 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110",
                    active ? "border-foreground scale-110" : "border-transparent"
                  )}
                  style={{ background: swatch }}
                >
                  {active && (
                    <span className="text-white">
                      <CheckIcon />
                    </span>
                  )}
                </span>
                <span className={cn("text-[10px]", active ? "text-foreground font-medium" : "text-foreground-subtle")}>
                  {p.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Radius preset ── */}
      <div>
        <Label>Radius</Label>
        <div className="flex gap-1.5">
          {RADIUS_PRESETS.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRadiusPreset(r.value)}
              className={cn(
                "flex-1 flex flex-col items-center gap-2 py-2.5 border transition-colors",
                r.preview,
                radiusPreset === r.value
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border bg-background-muted text-foreground-muted hover:text-foreground hover:bg-background-subtle"
              )}
            >
              {/* Mini preview box */}
              <span
                className={cn("size-6 border-2 bg-background", r.preview,
                  radiusPreset === r.value ? "border-primary" : "border-foreground-subtle"
                )}
              />
              <span className="text-[10px] font-medium">{r.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Font preset ── */}
      <div>
        <Label>Font</Label>
        <div className="grid grid-cols-2 gap-1.5">
          {FONT_PRESETS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFontPreset(f.value)}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] border text-xs transition-colors",
                fontPreset === f.value
                  ? "border-primary bg-primary-subtle text-primary"
                  : "border-border bg-background-muted text-foreground-muted hover:text-foreground hover:bg-background-subtle"
              )}
            >
              <span>{f.label}</span>
              {fontPreset === f.value && <CheckIcon />}
            </button>
          ))}
        </div>
      </div>

      {/* ── Reset ── */}
      <button
        type="button"
        onClick={() => {
          setColorPreset("default");
          setRadiusPreset("default");
          setFontPreset("geist");
          setTheme("system");
        }}
        className="w-full py-1.5 text-xs text-foreground-muted hover:text-foreground border border-border rounded-[var(--radius-md)] hover:bg-background-muted transition-colors"
      >
        Sıfırla
      </button>
    </div>
  );
}
