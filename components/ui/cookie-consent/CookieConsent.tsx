"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type CookieVariant = "minimal" | "detailed" | "banner" | "modal" | "floating";
export type CookiePosition = "bottom" | "top" | "bottom-left" | "bottom-right";

export interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required?: boolean;
  defaultEnabled?: boolean;
}

export interface CookieConsentProps {
  variant?: CookieVariant;
  position?: CookiePosition;
  title?: string;
  description?: string;
  categories?: CookieCategory[];
  privacyUrl?: string;
  onAcceptAll?: (selections: Record<string, boolean>) => void;
  onRejectAll?: () => void;
  onSave?: (selections: Record<string, boolean>) => void;
  className?: string;
}

/* ─── Defaults ───────────────────────────────────────────────── */

const DEFAULT_CATEGORIES: CookieCategory[] = [
  { id: "necessary",   label: "Zorunlu",          description: "Sitenin çalışması için gerekli çerezler.",                        required: true, defaultEnabled: true },
  { id: "analytics",   label: "Analitik",          description: "Ziyaretçi davranışlarını anonim olarak analiz etmek için.",       defaultEnabled: false },
  { id: "marketing",   label: "Pazarlama",         description: "Kişiselleştirilmiş reklamlar sunmak için kullanılır.",            defaultEnabled: false },
  { id: "preferences", label: "Tercihler",         description: "Dil ve tema gibi kullanıcı tercihlerini kaydetmek için.",         defaultEnabled: true },
];

const positionClass: Record<CookiePosition, string> = {
  "bottom":       "fixed bottom-0 inset-x-0",
  "top":          "fixed top-0 inset-x-0",
  "bottom-left":  "fixed bottom-4 left-4",
  "bottom-right": "fixed bottom-4 right-4",
};

/* ─── Toggle ─────────────────────────────────────────────────── */

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200",
        enabled ? "bg-primary" : "bg-border",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform duration-200",
          enabled ? "translate-x-4" : "translate-x-0.5"
        )}
        aria-hidden="true"
      />
    </button>
  );
}

/* ─── CookieConsent ──────────────────────────────────────────── */

export function CookieConsent({
  variant = "minimal",
  position = "bottom",
  title = "Çerez Tercihleri",
  description = "Deneyiminizi iyileştirmek ve analitik için çerezler kullanıyoruz.",
  categories = DEFAULT_CATEGORIES,
  privacyUrl = "#",
  onAcceptAll,
  onRejectAll,
  onSave,
  className,
}: CookieConsentProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(variant === "detailed");
  const [selections, setSelections] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(c => [c.id, c.required ? true : (c.defaultEnabled ?? false)]))
  );

  if (dismissed) return null;

  const handleAcceptAll = () => {
    const all = Object.fromEntries(categories.map(c => [c.id, true]));
    onAcceptAll?.(all);
    setDismissed(true);
  };

  const handleRejectAll = () => {
    onRejectAll?.();
    setDismissed(true);
  };

  const handleSave = () => {
    onSave?.(selections);
    setDismissed(true);
  };

  const isModal   = variant === "modal";
  const isFloat   = variant === "floating";
  const isBanner  = variant === "banner";
  const isMinimal = variant === "minimal";

  /* ── Modal ── */
  if (isModal) {
    return (
      <div className={cn("fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-4", className)}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setDismissed(true)} aria-hidden="true" />
        <div className="relative z-10 w-full max-w-lg rounded-[var(--radius-2xl)] border border-border bg-surface shadow-2xl p-6">
          <h2 className="text-base font-semibold text-foreground mb-1">{title}</h2>
          <p className="text-sm text-foreground-muted mb-4">{description}{" "}
            <a href={privacyUrl} className="text-primary underline text-xs">Gizlilik Politikası</a>
          </p>
          <div className="space-y-3 mb-5">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    {cat.label}
                    {cat.required && <span className="text-[10px] text-foreground-subtle">(zorunlu)</span>}
                  </p>
                  <p className="text-xs text-foreground-muted mt-0.5">{cat.description}</p>
                </div>
                <Toggle enabled={selections[cat.id]} onChange={v => setSelections(s => ({ ...s, [cat.id]: v }))} disabled={cat.required} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            <button onClick={handleRejectAll} className="text-sm px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">Yalnızca Zorunlu</button>
            <button onClick={handleSave} className="text-sm px-4 py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-background-muted transition-colors">Seçimi Kaydet</button>
            <button onClick={handleAcceptAll} className="text-sm px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">Tümünü Kabul Et</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Floating ── */
  if (isFloat) {
    return (
      <div className={cn("fixed bottom-4 right-4 z-[9998] w-80 rounded-[var(--radius-2xl)] border border-border bg-surface shadow-xl p-4", className)}>
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-sm font-semibold text-foreground">🍪 {title}</p>
          <button onClick={() => setDismissed(true)} className="text-foreground-subtle hover:text-foreground p-0.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p className="text-xs text-foreground-muted mb-3">{description}</p>
        <div className="flex gap-2">
          <button onClick={handleRejectAll} className="flex-1 text-xs py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">Reddet</button>
          <button onClick={handleAcceptAll} className="flex-1 text-xs py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">Kabul Et</button>
        </div>
        <button onClick={() => setShowDetails(v => !v)} className="mt-2 text-[11px] text-primary hover:underline w-full text-center">
          {showDetails ? "Gizle" : "Tercihleri Özelleştir"}
        </button>
        {showDetails && (
          <div className="mt-2 space-y-2 border-t border-border pt-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center justify-between gap-2">
                <span className="text-xs text-foreground-muted">{cat.label}</span>
                <Toggle enabled={selections[cat.id]} onChange={v => setSelections(s => ({ ...s, [cat.id]: v }))} disabled={cat.required} />
              </div>
            ))}
            <button onClick={handleSave} className="w-full mt-1 text-xs py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-background-muted transition-colors">Kaydet</button>
          </div>
        )}
      </div>
    );
  }

  /* ── Banner / Minimal / Detailed ── */
  return (
    <div className={cn(
      "z-[9998] border-border bg-surface shadow-lg",
      isBanner ? "border-t px-6 py-4" : "border rounded-[var(--radius-2xl)] p-4 sm:p-5 m-4",
      positionClass[position],
      className
    )}>
      <div className="max-w-4xl mx-auto">
        {/* Top row */}
        <div className={cn("flex items-start gap-4", isBanner ? "" : "flex-col sm:flex-row")}>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {description}{" "}
              <a href={privacyUrl} className="text-primary underline">Gizlilik Politikası</a>
            </p>
          </div>

          {/* CTA row (minimal/banner) */}
          {!showDetails && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {!isMinimal && (
                <button onClick={() => setShowDetails(true)} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">
                  Özelleştir
                </button>
              )}
              <button onClick={handleRejectAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">
                Reddet
              </button>
              <button onClick={handleAcceptAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
                Kabul Et
              </button>
            </div>
          )}
        </div>

        {/* Detailed toggles */}
        {showDetails && (
          <>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border px-3 py-2.5">
                  <div>
                    <p className="text-xs font-medium text-foreground">{cat.label} {cat.required && <span className="text-foreground-subtle">(zorunlu)</span>}</p>
                    <p className="text-[11px] text-foreground-muted mt-0.5 leading-snug">{cat.description}</p>
                  </div>
                  <Toggle enabled={selections[cat.id]} onChange={v => setSelections(s => ({ ...s, [cat.id]: v }))} disabled={cat.required} />
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 justify-end">
              <button onClick={handleRejectAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">Yalnızca Zorunlu</button>
              <button onClick={handleSave} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-background-muted transition-colors">Seçimi Kaydet</button>
              <button onClick={handleAcceptAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">Tümünü Kabul Et</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
