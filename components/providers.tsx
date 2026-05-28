"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ToastProvider } from "@/components/ui/toast";

/* ─── Types ──────────────────────────────────────────────────── */

export type Theme         = "light" | "dark" | "system";
export type ColorPreset   = "default" | "rose" | "emerald" | "amber" | "slate";
export type RadiusPreset  = "sharp" | "default" | "rounded";
export type FontPreset    = "geist" | "inter" | "dm-sans" | "mono";

export interface ThemeContextValue {
  theme:        Theme;
  resolvedTheme:"light" | "dark";
  colorPreset:  ColorPreset;
  radiusPreset: RadiusPreset;
  fontPreset:   FontPreset;
  setTheme:        (t: Theme)        => void;
  setColorPreset:  (p: ColorPreset)  => void;
  setRadiusPreset: (p: RadiusPreset) => void;
  setFontPreset:   (p: FontPreset)   => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme:         "system",
  resolvedTheme: "light",
  colorPreset:   "default",
  radiusPreset:  "default",
  fontPreset:    "geist",
  setTheme:        () => {},
  setColorPreset:  () => {},
  setRadiusPreset: () => {},
  setFontPreset:   () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/* ─── Helpers ────────────────────────────────────────────────── */

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const COLOR_CLASSES:  Record<ColorPreset,  string | null> = {
  default: null,
  rose:    "preset-rose",
  emerald: "preset-emerald",
  amber:   "preset-amber",
  slate:   "preset-slate",
};

const RADIUS_CLASSES: Record<RadiusPreset, string | null> = {
  sharp:   "radius-sharp",
  default: null,
  rounded: "radius-rounded",
};

const FONT_CLASSES:   Record<FontPreset,   string | null> = {
  geist:   null,
  inter:   "font-inter",
  "dm-sans":"font-dm-sans",
  mono:    "font-mono-all",
};

function applyClasses(
  theme: "light" | "dark",
  color: ColorPreset,
  radius: RadiusPreset,
  font: FontPreset,
) {
  const root = document.documentElement;

  /* theme */
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.style.colorScheme = theme;

  /* color preset */
  root.classList.remove(...Object.values(COLOR_CLASSES).filter(Boolean) as string[]);
  const cc = COLOR_CLASSES[color];
  if (cc) root.classList.add(cc);

  /* radius preset */
  root.classList.remove(...Object.values(RADIUS_CLASSES).filter(Boolean) as string[]);
  const rc = RADIUS_CLASSES[radius];
  if (rc) root.classList.add(rc);

  /* font preset */
  root.classList.remove(...Object.values(FONT_CLASSES).filter(Boolean) as string[]);
  const fc = FONT_CLASSES[font];
  if (fc) root.classList.add(fc);
}

/* ─── Provider ───────────────────────────────────────────────── */

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme,        setThemeState]   = useState<Theme>("system");
  const [resolvedTheme, setResolved]    = useState<"light" | "dark">("light");
  const [colorPreset,  setColorState]   = useState<ColorPreset>("default");
  const [radiusPreset, setRadiusState]  = useState<RadiusPreset>("default");
  const [fontPreset,   setFontState]    = useState<FontPreset>("geist");
  const [mounted,      setMounted]      = useState(false);

  useEffect(() => {
    const t = (localStorage.getItem("theme")         as Theme        | null) ?? "system";
    const c = (localStorage.getItem("colorPreset")   as ColorPreset  | null) ?? "default";
    const r = (localStorage.getItem("radiusPreset")  as RadiusPreset | null) ?? "default";
    const f = (localStorage.getItem("fontPreset")    as FontPreset   | null) ?? "geist";
    const resolved = t === "system" ? getSystemTheme() : t;
    setThemeState(t);
    setResolved(resolved);
    setColorState(c);
    setRadiusState(r);
    setFontState(f);
    applyClasses(resolved, c, r, f);
    setMounted(true);
  }, []);

  /* system preference listener */
  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setResolved(resolved);
      applyClasses(resolved, colorPreset, radiusPreset, fontPreset);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, colorPreset, radiusPreset, fontPreset]);

  const setTheme = (t: Theme) => {
    localStorage.setItem("theme", t);
    setThemeState(t);
    const resolved = t === "system" ? getSystemTheme() : t;
    setResolved(resolved);
    applyClasses(resolved, colorPreset, radiusPreset, fontPreset);
  };

  const setColorPreset = (p: ColorPreset) => {
    localStorage.setItem("colorPreset", p);
    setColorState(p);
    applyClasses(resolvedTheme, p, radiusPreset, fontPreset);
  };

  const setRadiusPreset = (p: RadiusPreset) => {
    localStorage.setItem("radiusPreset", p);
    setRadiusState(p);
    applyClasses(resolvedTheme, colorPreset, p, fontPreset);
  };

  const setFontPreset = (p: FontPreset) => {
    localStorage.setItem("fontPreset", p);
    setFontState(p);
    applyClasses(resolvedTheme, colorPreset, radiusPreset, p);
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{
        theme, resolvedTheme, colorPreset, radiusPreset, fontPreset,
        setTheme, setColorPreset, setRadiusPreset, setFontPreset,
      }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{
      theme, resolvedTheme, colorPreset, radiusPreset, fontPreset,
      setTheme, setColorPreset, setRadiusPreset, setFontPreset,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ─── Providers ──────────────────────────────────────────────── */

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </CustomThemeProvider>
  );
}
