import { type NextRequest } from "next/server";

/* ─── Token definitions ──────────────────────────────────────── */

const BASE_TOKENS = {
  colors: {
    background:           "#ffffff",
    "background-subtle":  "#f8f9fa",
    "background-muted":   "#f1f3f5",
    foreground:           "#0f0f10",
    "foreground-muted":   "#6b7280",
    "foreground-subtle":  "#9ca3af",
    surface:              "#ffffff",
    "surface-raised":     "#f9fafb",
    "surface-overlay":    "#ffffff",
    border:               "#e5e7eb",
    "border-strong":      "#d1d5db",
    danger:               "#ef4444",
    "danger-hover":       "#dc2626",
    "danger-subtle":      "#fef2f2",
    "danger-foreground":  "#ffffff",
    success:              "#22c55e",
    "success-subtle":     "#f0fdf4",
    "success-foreground": "#ffffff",
    warning:              "#f59e0b",
    "warning-subtle":     "#fffbeb",
    "warning-foreground": "#ffffff",
    info:                 "#3b82f6",
    "info-subtle":        "#eff6ff",
    "info-foreground":    "#ffffff",
  },
  radius: {
    sm:   "4px",
    md:   "8px",
    lg:   "12px",
    xl:   "16px",
    "2xl":"24px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
  },
  typography: {
    fontSans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    fontMono: "var(--font-geist-mono), 'Fira Code', monospace",
  },
};

const COLOR_PRESETS: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {
  default: {
    light: { primary: "#6366f1", "primary-hover": "#4f46e5", "primary-active": "#4338ca", "primary-subtle": "#eef2ff", "primary-foreground": "#ffffff" },
    dark:  { primary: "#818cf8", "primary-hover": "#6366f1", "primary-active": "#4f46e5", "primary-subtle": "#1e1b4b", "primary-foreground": "#ffffff" },
  },
  rose: {
    light: { primary: "#f43f5e", "primary-hover": "#e11d48", "primary-active": "#be123c", "primary-subtle": "#fff1f2", "primary-foreground": "#ffffff" },
    dark:  { primary: "#fb7185", "primary-hover": "#f43f5e", "primary-active": "#e11d48", "primary-subtle": "#2d0a10", "primary-foreground": "#ffffff" },
  },
  emerald: {
    light: { primary: "#10b981", "primary-hover": "#059669", "primary-active": "#047857", "primary-subtle": "#ecfdf5", "primary-foreground": "#ffffff" },
    dark:  { primary: "#34d399", "primary-hover": "#10b981", "primary-active": "#059669", "primary-subtle": "#052e16", "primary-foreground": "#ffffff" },
  },
  amber: {
    light: { primary: "#f59e0b", "primary-hover": "#d97706", "primary-active": "#b45309", "primary-subtle": "#fffbeb", "primary-foreground": "#ffffff" },
    dark:  { primary: "#fbbf24", "primary-hover": "#f59e0b", "primary-active": "#d97706", "primary-subtle": "#1c1408", "primary-foreground": "#ffffff" },
  },
  slate: {
    light: { primary: "#64748b", "primary-hover": "#475569", "primary-active": "#334155", "primary-subtle": "#f1f5f9", "primary-foreground": "#ffffff" },
    dark:  { primary: "#94a3b8", "primary-hover": "#64748b", "primary-active": "#475569", "primary-subtle": "#0f172a", "primary-foreground": "#ffffff" },
  },
};

const RADIUS_PRESETS: Record<string, Record<string, string>> = {
  sharp:   { sm: "0px",  md: "0px",  lg: "2px",  xl: "4px",  "2xl": "6px",  full: "0px" },
  default: { sm: "4px",  md: "8px",  lg: "12px", xl: "16px", "2xl": "24px", full: "9999px" },
  rounded: { sm: "8px",  md: "12px", lg: "16px", xl: "24px", "2xl": "32px", full: "9999px" },
};

/* ─── GET /api/tokens ────────────────────────────────────────── */

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const colorPreset  = searchParams.get("color")  ?? "default";
  const radiusPreset = searchParams.get("radius") ?? "default";
  const mode         = searchParams.get("mode")   ?? "light"; // "light" | "dark"

  const primary = COLOR_PRESETS[colorPreset] ?? COLOR_PRESETS.default;
  const radius  = RADIUS_PRESETS[radiusPreset] ?? RADIUS_PRESETS.default;

  const darkTokens = mode === "dark"
    ? {
        background:           "#0a0a0b",
        "background-subtle":  "#111113",
        "background-muted":   "#18181b",
        foreground:           "#fafafa",
        "foreground-muted":   "#a1a1aa",
        "foreground-subtle":  "#71717a",
        surface:              "#18181b",
        "surface-raised":     "#1f1f23",
        "surface-overlay":    "#27272a",
        border:               "#27272a",
        "border-strong":      "#3f3f46",
      }
    : {};

  const response = {
    meta: {
      generated: new Date().toISOString(),
      colorPreset,
      radiusPreset,
      mode,
    },
    tokens: {
      colors: {
        ...BASE_TOKENS.colors,
        ...darkTokens,
        ...(mode === "dark" ? primary.dark : primary.light),
      },
      radius,
      shadows: mode === "dark"
        ? {
            sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
            md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
            lg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
            xl: "0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
          }
        : BASE_TOKENS.shadows,
      typography: BASE_TOKENS.typography,
    },
    cssVariables: Object.entries({
      ...BASE_TOKENS.colors,
      ...darkTokens,
      ...(mode === "dark" ? primary.dark : primary.light),
    }).map(([k, v]) => `  --${k}: ${v};`).join("\n"),
  };

  return Response.json(response, {
    headers: { "Cache-Control": "no-store" },
  });
}
