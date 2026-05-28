"use client";

import { useState } from "react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { useTheme } from "@/components/providers";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ─── Preview card to show token effects live ─────────────────── */

function PreviewCard() {
  const { colorPreset, radiusPreset, resolvedTheme } = useTheme();
  return (
    <div className="p-5 bg-surface border border-border rounded-[var(--radius-xl)] space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-foreground">Canlı Önizleme</p>
          <p className="text-sm text-foreground-muted">Token değişiklikleri anında yansır</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          <Badge variant="primary" size="sm">{colorPreset}</Badge>
          <Badge variant="secondary" size="sm">{radiusPreset}</Badge>
          <Badge variant={resolvedTheme === "dark" ? "secondary" : "warning"} size="sm">{resolvedTheme}</Badge>
        </div>
      </div>

      {/* Button row */}
      <div className="flex flex-wrap gap-2">
        {(["primary","secondary","outline","ghost","danger"] as const).map((v) => (
          <button
            key={v}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] border transition-colors",
              v === "primary"   && "bg-primary text-primary-foreground border-primary hover:bg-primary-hover",
              v === "secondary" && "bg-secondary text-secondary-foreground border-border hover:bg-secondary-hover",
              v === "outline"   && "bg-transparent text-primary border-primary hover:bg-primary-subtle",
              v === "ghost"     && "bg-transparent text-foreground border-transparent hover:bg-background-muted",
              v === "danger"    && "bg-danger text-danger-foreground border-danger hover:bg-danger-hover",
            )}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="Input önizlemesi..."
        className="w-full h-9 px-3 text-sm rounded-[var(--radius-md)] bg-background border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        readOnly
      />

      {/* Cards */}
      <div className="grid grid-cols-3 gap-2">
        {["Başarılı", "Uyarı", "Hata"].map((label, i) => (
          <div
            key={label}
            className={cn(
              "p-3 rounded-[var(--radius-lg)] border text-sm font-medium text-center",
              i === 0 && "bg-success/10 border-success/20 text-success",
              i === 1 && "bg-warning/10 border-warning/20 text-warning",
              i === 2 && "bg-danger/10  border-danger/20  text-danger",
            )}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-foreground-muted">
          <span>İlerleme</span><span>72%</span>
        </div>
        <div className="h-2 rounded-full bg-background-muted overflow-hidden">
          <div className="h-full w-[72%] rounded-full bg-primary transition-all" />
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function ThemeSwitcherShowcase() {
  const [apiResult, setApiResult] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const { colorPreset, radiusPreset, resolvedTheme } = useTheme();

  const fetchTokens = async () => {
    setApiLoading(true);
    try {
      const res = await fetch(`/api/tokens?color=${colorPreset}&radius=${radiusPreset}&mode=${resolvedTheme}`);
      const json = await res.json();
      setApiResult(JSON.stringify(json, null, 2));
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Theme Switcher</h1>
        <p className="text-sm text-foreground-muted">
          5 renk preset · 3 radius modu · 4 font seçeneği · localStorage kalıcı · CSS token export API
        </p>
      </div>

      {/* Live panel + preview */}
      <ShowcaseSection
        title="Canlı Panel"
        description="Seçimler anında tüm sayfaya yansır ve localStorage'a kaydedilir."
        code={`import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "@/components/providers";

// Panel olarak yerleştir
<ThemeSwitcher />

// useTheme hook ile mevcut değerleri oku
const { colorPreset, radiusPreset, fontPreset, setColorPreset } = useTheme();`}
      >
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <ThemeSwitcher />
          <div className="flex-1 min-w-0">
            <PreviewCard />
          </div>
        </div>
      </ShowcaseSection>

      {/* API Token Export */}
      <ShowcaseSection
        title="CSS Token Export API"
        description="GET /api/tokens?color=&radius=&mode= — aktif preset'e göre JSON token çıktısı döner."
        code={`// GET /api/tokens?color=rose&radius=rounded&mode=dark
fetch('/api/tokens?color=${colorPreset}&radius=${radiusPreset}&mode=${resolvedTheme}')
  .then(r => r.json())
  .then(console.log)`}
      >
        <div className="space-y-3">
          <button
            type="button"
            onClick={fetchTokens}
            disabled={apiLoading}
            className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            {apiLoading ? "Yükleniyor..." : `Token'ları çek (${colorPreset} · ${radiusPreset} · ${resolvedTheme})`}
          </button>
          {apiResult && (
            <pre className="max-h-80 overflow-auto p-4 text-xs bg-background-muted border border-border rounded-[var(--radius-lg)] font-mono text-foreground-muted whitespace-pre">
              {apiResult}
            </pre>
          )}
        </div>
      </ShowcaseSection>

      {/* Presets reference */}
      <ShowcaseSection
        title="Preset Referansı"
        description="CSS sınıfları doğrudan html elementine uygulanır — JavaScript gerektirmez."
        code={`/* globals.css içinde tanımlı */

/* Renk preset'leri */
.preset-rose    { --primary: #f43f5e; ... }
.preset-emerald { --primary: #10b981; ... }
.preset-amber   { --primary: #f59e0b; ... }
.preset-slate   { --primary: #64748b; ... }

/* Radius preset'leri */
.radius-sharp   { --radius-md: 0px;   --radius-lg: 2px;  ... }
.radius-rounded { --radius-md: 12px;  --radius-lg: 16px; ... }

/* Font preset'leri */
.font-inter     { --font-sans: "Inter", system-ui, sans-serif; }
.font-dm-sans   { --font-sans: "DM Sans", system-ui, sans-serif; }
.font-mono-all  { --font-sans: var(--font-geist-mono), monospace; }`}
      >
        <div className="grid grid-cols-5 gap-2">
          {[
            { label: "Indigo", color: "#6366f1" },
            { label: "Rose",   color: "#f43f5e" },
            { label: "Emerald",color: "#10b981" },
            { label: "Amber",  color: "#f59e0b" },
            { label: "Slate",  color: "#64748b" },
          ].map((p) => (
            <div key={p.label} className="flex flex-col items-center gap-1.5">
              <span className="size-10 rounded-full border-2 border-border/40" style={{ background: p.color }} />
              <span className="text-xs text-foreground-muted">{p.label}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
