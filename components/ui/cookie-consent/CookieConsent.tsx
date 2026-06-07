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
  /** Demo mode: renders inline (no fixed positioning) */
  inline?: boolean;
  className?: string;
}

/* ─── Defaults ───────────────────────────────────────────────── */

const DEFAULT_CATEGORIES: CookieCategory[] = [
  { id: "necessary",   label: "Zorunlu",    description: "Sitenin temel işlevleri için gereklidir. Devre dışı bırakılamaz.",          required: true,  defaultEnabled: true  },
  { id: "analytics",   label: "Analitik",   description: "Ziyaretçi davranışlarını anonim olarak ölçmemizi sağlar.",                  defaultEnabled: false },
  { id: "marketing",   label: "Pazarlama",  description: "İlgi alanlarınıza göre kişiselleştirilmiş içerik sunmak için kullanılır.",  defaultEnabled: false },
  { id: "preferences", label: "Tercihler",  description: "Dil, tema ve bölge gibi kullanıcı tercihlerini hatırlatır.",                defaultEnabled: true  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

const positionClass: Record<CookiePosition, string> = {
  "bottom":       "fixed bottom-0 inset-x-0",
  "top":          "fixed top-0 inset-x-0",
  "bottom-left":  "fixed bottom-4 left-4",
  "bottom-right": "fixed bottom-4 right-4",
};

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-primary" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

/* ─── Toggle ─────────────────────────────────────────────────── */

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        enabled ? "bg-primary" : "bg-border",
        disabled && "opacity-50 cursor-not-allowed"
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

/* ─── CategoryRow ────────────────────────────────────────────── */

function CategoryRow({
  cat,
  enabled,
  onChange,
}: {
  cat: CookieCategory;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-foreground">{cat.label}</p>
          {cat.required && (
            <span className="text-[10px] font-medium text-foreground-subtle bg-background-muted px-1.5 py-0.5 rounded-full">zorunlu</span>
          )}
        </div>
        <p className="text-xs text-foreground-muted mt-0.5 leading-relaxed">{cat.description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} disabled={cat.required} />
    </div>
  );
}

/* ─── CategoryCard (grid variant) ───────────────────────────── */

function CategoryCard({
  cat,
  enabled,
  onChange,
}: {
  cat: CookieCategory;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={cn(
      "flex items-start justify-between gap-3 rounded-[var(--radius-lg)] border px-3 py-3 transition-colors",
      enabled && !cat.required ? "border-primary/30 bg-primary-subtle/40" : "border-border bg-surface"
    )}>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-xs font-semibold text-foreground">{cat.label}</p>
          {cat.required && (
            <span className="text-[9px] font-medium text-foreground-subtle bg-background-muted px-1 py-0.5 rounded-full">zorunlu</span>
          )}
        </div>
        <p className="text-[11px] text-foreground-muted leading-snug">{cat.description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} disabled={cat.required} />
    </div>
  );
}

/* ─── Action Buttons ─────────────────────────────────────────── */

function ActionButtons({
  showSave,
  onReject,
  onSave,
  onAccept,
  size = "md",
}: {
  showSave?: boolean;
  onReject: () => void;
  onSave?: () => void;
  onAccept: () => void;
  size?: "sm" | "md";
}) {
  const base = size === "sm"
    ? "text-xs px-3 py-1.5 rounded-[var(--radius-md)]"
    : "text-sm px-4 py-2 rounded-[var(--radius-md)]";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        onClick={onReject}
        className={cn(base, "border border-border text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors")}
      >
        Yalnızca Zorunlu
      </button>
      {showSave && onSave && (
        <button
          onClick={onSave}
          className={cn(base, "border border-border text-foreground hover:bg-background-muted transition-colors")}
        >
          Seçimi Kaydet
        </button>
      )}
      <button
        onClick={onAccept}
        className={cn(base, "bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium")}
      >
        Tümünü Kabul Et
      </button>
    </div>
  );
}

/* ─── CookieConsent ──────────────────────────────────────────── */

export function CookieConsent({
  variant = "minimal",
  position = "bottom",
  title = "Çerez Tercihleri",
  description = "GDPR uyumlu bir deneyim için çerezleri yönetin. İstediğiniz zaman tercihlerinizi değiştirebilirsiniz.",
  categories = DEFAULT_CATEGORIES,
  privacyUrl = "#",
  onAcceptAll,
  onRejectAll,
  onSave,
  inline = false,
  className,
}: CookieConsentProps) {
  const [dismissed, setDismissed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selections, setSelections] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.map(c => [c.id, c.required ? true : (c.defaultEnabled ?? false)]))
  );

  if (dismissed) return null;

  const toggle = (id: string, v: boolean) => setSelections(s => ({ ...s, [id]: v }));

  const handleAcceptAll = () => {
    onAcceptAll?.(Object.fromEntries(categories.map(c => [c.id, true])));
    setDismissed(true);
  };
  const handleRejectAll = () => { onRejectAll?.(); setDismissed(true); };
  const handleSave = () => { onSave?.(selections); setDismissed(true); };

  /* ── MODAL ─────────────────────────────────────────────────── */
  if (variant === "modal") {
    return (
      <div className={cn("z-[9998] flex items-end sm:items-center justify-center p-4", inline ? "relative min-h-[480px]" : "fixed inset-0", className)}>
        {!inline && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDismissed(true)} aria-hidden="true" />}
        <div className="relative z-10 w-full max-w-md rounded-[var(--radius-2xl)] border border-border bg-surface shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-border">
            <div className="w-8 h-8 rounded-[var(--radius-lg)] bg-primary-subtle flex items-center justify-center shrink-0">
              <ShieldIcon />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
              <p className="text-xs text-foreground-muted">GDPR Uyumlu</p>
            </div>
            <button onClick={() => setDismissed(true)} className="p-1 rounded-[var(--radius-md)] text-foreground-subtle hover:text-foreground hover:bg-background-muted transition-colors">
              <XIcon />
            </button>
          </div>

          {/* Body */}
          <div className="px-5 py-4">
            <p className="text-sm text-foreground-muted leading-relaxed mb-4">
              {description}{" "}
              <a href={privacyUrl} className="text-primary hover:underline font-medium">Gizlilik Politikası →</a>
            </p>
            <div className="divide-y divide-border">
              {categories.map(cat => (
                <CategoryRow key={cat.id} cat={cat} enabled={selections[cat.id]} onChange={v => toggle(cat.id, v)} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-border bg-background-subtle flex flex-wrap gap-2 justify-end">
            <ActionButtons showSave onReject={handleRejectAll} onSave={handleSave} onAccept={handleAcceptAll} />
          </div>
        </div>
      </div>
    );
  }

  /* ── FLOATING ───────────────────────────────────────────────── */
  if (variant === "floating") {
    return (
      <div className={cn(
        "z-[9998] w-80 rounded-[var(--radius-2xl)] border border-border bg-surface shadow-xl overflow-hidden",
        inline ? "relative" : "fixed bottom-4 right-4",
        className
      )}>
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-border">
          <div className="w-7 h-7 rounded-[var(--radius-md)] bg-primary-subtle flex items-center justify-center shrink-0">
            <ShieldIcon />
          </div>
          <p className="text-sm font-semibold text-foreground flex-1">{title}</p>
          <button onClick={() => setDismissed(true)} className="p-0.5 text-foreground-subtle hover:text-foreground transition-colors">
            <XIcon />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3">
          <p className="text-xs text-foreground-muted leading-relaxed mb-3">{description}</p>

          {/* Details */}
          {showDetails && (
            <div className="space-y-2 mb-3">
              {categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between gap-3 py-1">
                  <div>
                    <p className="text-xs font-medium text-foreground">{cat.label}</p>
                    {cat.required && <p className="text-[10px] text-foreground-subtle">Zorunlu</p>}
                  </div>
                  <Toggle enabled={selections[cat.id]} onChange={v => toggle(cat.id, v)} disabled={cat.required} />
                </div>
              ))}
            </div>
          )}

          {/* Toggle details link */}
          <button
            onClick={() => setShowDetails(v => !v)}
            className="text-[11px] text-primary hover:underline mb-3 inline-flex items-center gap-1"
          >
            {showDetails ? "Gizle" : "Tercihleri Özelleştir"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3 transition-transform", showDetails && "rotate-180")} aria-hidden="true">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {/* Actions */}
          <div className="flex gap-2">
            <button onClick={handleRejectAll} className="flex-1 text-xs py-2 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">
              Reddet
            </button>
            {showDetails && (
              <button onClick={handleSave} className="flex-1 text-xs py-2 rounded-[var(--radius-md)] border border-border text-foreground hover:bg-background-muted transition-colors">
                Kaydet
              </button>
            )}
            <button onClick={handleAcceptAll} className="flex-1 text-xs py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium">
              Kabul Et
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── BANNER / MINIMAL / DETAILED ────────────────────────────── */
  const isBanner  = variant === "banner";
  const isMinimal = variant === "minimal";

  const wrapperCls = inline
    ? "relative rounded-[var(--radius-2xl)] border border-border bg-surface shadow-sm overflow-hidden"
    : cn("z-[9998] border-border bg-surface shadow-lg", isBanner ? "border-t" : "border rounded-[var(--radius-2xl)] m-3", positionClass[position]);

  return (
    <div className={cn(wrapperCls, className)}>
      <div className={cn("max-w-4xl mx-auto", isBanner ? "px-6 py-4" : "p-4 sm:p-5")}>

        {/* Top area */}
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-[var(--radius-lg)] bg-primary-subtle flex items-center justify-center shrink-0 mt-0.5">
            <ShieldIcon />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-0.5">{title}</p>
            <p className="text-xs text-foreground-muted leading-relaxed">
              {description}{" "}
              <a href={privacyUrl} className="text-primary hover:underline font-medium">Gizlilik Politikası</a>
            </p>
          </div>

          {/* Compact CTA (minimal / banner without details) */}
          {!showDetails && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {!isMinimal && (
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors"
                >
                  Özelleştir
                </button>
              )}
              <button onClick={handleRejectAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground-muted hover:bg-background-muted transition-colors">
                Reddet
              </button>
              <button onClick={handleAcceptAll} className="text-xs px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium">
                Kabul Et
              </button>
            </div>
          )}
        </div>

        {/* Minimal — expand link */}
        {isMinimal && !showDetails && (
          <button onClick={() => setShowDetails(true)} className="mt-2 ml-11 text-[11px] text-primary hover:underline">
            Tercihleri Özelleştir →
          </button>
        )}

        {/* Category grid */}
        {showDetails && (
          <>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {categories.map(cat => (
                <CategoryCard
                  key={cat.id}
                  cat={cat}
                  enabled={selections[cat.id]}
                  onChange={v => toggle(cat.id, v)}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <button onClick={() => setShowDetails(false)} className="text-xs text-foreground-subtle hover:text-foreground transition-colors">
                ← Geri
              </button>
              <ActionButtons size="sm" showSave onReject={handleRejectAll} onSave={handleSave} onAccept={handleAcceptAll} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
