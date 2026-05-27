"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

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

const themes = [
  { value: "light",  label: "Açık",   icon: <SunIcon /> },
  { value: "dark",   label: "Koyu",   icon: <MoonIcon /> },
  { value: "system", label: "Sistem", icon: <SystemIcon /> },
] as const;

export interface ThemeToggleProps {
  variant?: "icon" | "segmented";
  className?: string;
}

export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn("h-9 w-9 rounded-[var(--radius-md)] bg-background-muted animate-pulse", className)} />;
  }

  if (variant === "segmented") {
    return (
      <div
        role="radiogroup"
        aria-label="Tema seçimi"
        className={cn(
          "inline-flex items-center rounded-[var(--radius-lg)] border border-border bg-background-muted p-1 gap-0.5",
          className
        )}
      >
        {themes.map((t) => (
          <button
            key={t.value}
            role="radio"
            aria-checked={theme === t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary",
              theme === t.value
                ? "bg-surface text-foreground shadow-sm"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
    );
  }

  // Icon variant — cycles through themes
  const current = themes.find((t) => t.value === theme) ?? themes[2];
  const next = themes[(themes.findIndex((t) => t.value === theme) + 1) % themes.length];

  return (
    <button
      onClick={() => setTheme(next.value)}
      title={`Tema: ${current.label} — ${next.label}'e geç`}
      aria-label={`Tema değiştir (şu an: ${current.label})`}
      className={cn(
        "inline-flex items-center justify-center h-9 w-9 rounded-[var(--radius-md)]",
        "text-foreground-muted hover:text-foreground hover:bg-background-muted",
        "transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className
      )}
    >
      {current.icon}
    </button>
  );
}
