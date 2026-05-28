"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
  );
}

/* ─── Error variants ─────────────────────────────────────────── */

interface ErrorConfig {
  code: string;
  title: string;
  description: string;
  badge: { variant: "danger" | "warning" | "info"; label: string };
  actions: { label: string; icon: React.ReactNode; variant: "primary" | "outline" }[];
  emoji: string;
}

const ERROR_CONFIGS: Record<"404" | "500" | "403", ErrorConfig> = {
  "404": {
    code: "404",
    title: "Sayfa Bulunamadı",
    description: "Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir. URL'yi kontrol edin ya da ana sayfaya dönün.",
    badge: { variant: "warning", label: "404 Not Found" },
    actions: [
      { label: "Ana Sayfaya Dön",  icon: <HomeIcon />,    variant: "primary" },
      { label: "Geri Git",         icon: <ArrowLeftIcon />, variant: "outline" },
    ],
    emoji: "🔍",
  },
  "500": {
    code: "500",
    title: "Sunucu Hatası",
    description: "Sunucumuzda beklenmeyen bir hata oluştu. Ekibimiz bilgilendirildi ve sorunu en kısa sürede çözeceğiz.",
    badge: { variant: "danger", label: "500 Internal Server Error" },
    actions: [
      { label: "Tekrar Dene",      icon: <RefreshIcon />, variant: "primary" },
      { label: "Ana Sayfaya Dön",  icon: <HomeIcon />,    variant: "outline" },
    ],
    emoji: "⚠️",
  },
  "403": {
    code: "403",
    title: "Erişim Reddedildi",
    description: "Bu sayfayı görüntülemek için gerekli izniniz bulunmuyor. Giriş yaptıysanız yöneticinizle iletişime geçin.",
    badge: { variant: "info", label: "403 Forbidden" },
    actions: [
      { label: "Giriş Yap",        icon: <ArrowLeftIcon />, variant: "primary" },
      { label: "Ana Sayfaya Dön",  icon: <HomeIcon />,      variant: "outline" },
    ],
    emoji: "🔒",
  },
};

/* ─── Single error page ──────────────────────────────────────── */

function ErrorPage({ type }: { type: "404" | "500" | "403" }) {
  const config = ERROR_CONFIGS[type];

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] px-6 text-center bg-background">
      {/* Big number */}
      <div className="relative mb-6 select-none">
        <span className="text-[120px] md:text-[160px] font-black leading-none text-foreground/5 tracking-tight">
          {config.code}
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl md:text-6xl">{config.emoji}</span>
        </div>
      </div>

      <Badge variant={config.badge.variant} className="mb-4 font-mono">
        {config.badge.label}
      </Badge>

      <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        {config.title}
      </h1>
      <p className="text-foreground-muted text-sm md:text-base max-w-md mb-8 leading-relaxed">
        {config.description}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        {config.actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant}
            leftIcon={action.icon}
          >
            {action.label}
          </Button>
        ))}
      </div>

      {/* Support hint */}
      <p className="mt-10 text-xs text-foreground-subtle">
        Sorun devam ediyorsa{" "}
        <a href="#" className="text-primary hover:underline font-medium">destek ekibiyle iletişime geçin</a>
        {type === "500" && " · Hata ID: #ERR-8f2a1c"}
        .
      </p>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function ErrorPageTemplate() {
  const [active, setActive] = useState<"404" | "500" | "403">("404");

  return (
    <div className="space-y-6">
      {/* Switcher */}
      <div className="flex gap-1 p-1 bg-background-muted rounded-[var(--radius-lg)] w-fit">
        {(["404", "500", "403"] as const).map((code) => (
          <button
            key={code}
            onClick={() => setActive(code)}
            className={cn(
              "px-4 py-1.5 rounded-[var(--radius-md)] text-sm font-mono font-semibold transition-all duration-150",
              active === code
                ? "bg-surface shadow-sm text-foreground"
                : "text-foreground-muted hover:text-foreground"
            )}
          >
            {code}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden">
        <ErrorPage type={active} />
      </div>
    </div>
  );
}
