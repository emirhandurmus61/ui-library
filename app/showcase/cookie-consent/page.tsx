"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { CookieConsent } from "@/components/ui/cookie-consent";

/* ─── Demo wrapper ───────────────────────────────────────────── */

function Demo({
  label,
  children,
}: {
  label: string;
  children: (key: number, reset: () => void) => React.ReactNode;
}) {
  const [key, setKey] = useState(0);
  const reset = () => setKey(k => k + 1);

  return (
    <div className="relative rounded-[var(--radius-xl)] border border-border bg-background-subtle overflow-hidden">
      {/* Faux page content */}
      <div className="p-8 flex items-center justify-center min-h-[80px]">
        <p className="text-sm text-foreground-subtle select-none">{label}</p>
      </div>

      {/* Component */}
      <div key={key}>{children(key, reset)}</div>

      {/* Reset button */}
      <button
        onClick={reset}
        className="absolute top-2 right-2 text-[11px] px-2 py-1 rounded-[var(--radius-md)] bg-surface border border-border text-foreground-muted hover:text-foreground transition-colors"
      >
        ↺ Sıfırla
      </button>
    </div>
  );
}

/* ─── Trigger demo (overlay variants) ───────────────────────── */

function TriggerDemo({
  label,
  buttonLabel = "Göster",
  children,
}: {
  label: string;
  buttonLabel?: string;
  children: (onClose: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-[var(--radius-xl)] border border-border bg-background-subtle overflow-hidden min-h-[180px]">
      {/* Faux page content */}
      <div className="p-8 flex flex-col items-center justify-center gap-3 min-h-[180px]">
        <p className="text-sm text-foreground-subtle select-none">{label}</p>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="text-sm px-4 py-2 rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:bg-primary-hover transition-colors font-medium"
          >
            {buttonLabel}
          </button>
        )}
      </div>

      {/* Overlay */}
      {open && children(() => setOpen(false))}
    </div>
  );
}

export default function CookieConsentShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Cookie Consent</h1>
        <p className="text-sm text-foreground-muted">
          GDPR uyumlu çerez onay bileşeni · 5 varyant · kategori toggle · "Sıfırla" ile tekrar göster
        </p>
      </div>

      {/* Minimal */}
      <ShowcaseSection
        title="Minimal"
        description="En sade varyant. Reddet / Kabul Et + isteğe bağlı Özelleştir akışı."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="minimal" position="bottom" />`}
      >
        <Demo label="Sayfa içeriği burada görünür">
          {(_, reset) => (
            <CookieConsent
              variant="minimal"
              inline
              onAcceptAll={reset}
              onRejectAll={reset}
              onSave={reset}
            />
          )}
        </Demo>
      </ShowcaseSection>

      {/* Banner */}
      <ShowcaseSection
        title="Banner"
        description="Tam genişlik banner. Üstte açıklama, sağda butonlar. 'Özelleştir' ile kategori grid'i açılır."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="banner" position="bottom" />`}
      >
        <Demo label="Sayfa içeriği burada görünür">
          {(_, reset) => (
            <CookieConsent
              variant="banner"
              inline
              onAcceptAll={reset}
              onRejectAll={reset}
              onSave={reset}
            />
          )}
        </Demo>
      </ShowcaseSection>

      {/* Detailed */}
      <ShowcaseSection
        title="Detailed"
        description="Kategori kartları hemen açık gelir. Her kart seçili olduğunda primary tonunda renklenir."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="detailed" />`}
      >
        <Demo label="Sayfa içeriği burada görünür">
          {(_, reset) => (
            <CookieConsent
              variant="detailed"
              inline
              onAcceptAll={reset}
              onRejectAll={reset}
              onSave={reset}
            />
          )}
        </Demo>
      </ShowcaseSection>

      {/* Floating */}
      <ShowcaseSection
        title="Floating"
        description="Sağ alt köşe kartı. 'Tercihleri Özelleştir' ile kategori toggle'ları expand olur."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="floating" />`}
      >
        <div className="relative rounded-[var(--radius-xl)] border border-border bg-background-subtle min-h-[340px] overflow-hidden">
          <div className="p-8 flex items-center justify-center min-h-[340px]">
            <p className="text-sm text-foreground-subtle select-none">Sayfa içeriği burada görünür</p>
          </div>
          <CookieConsent
            variant="floating"
            inline
            className="absolute bottom-4 right-4"
          />
        </div>
      </ShowcaseSection>

      {/* Modal */}
      <ShowcaseSection
        title="Modal"
        description="Sayfa ortasında overlay. 'Göster' butonuna tıklayarak tetikle."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="modal" />`}
      >
        <TriggerDemo label="Sayfa içeriği burada görünür" buttonLabel="Modal'ı Aç">
          {(close) => (
            <CookieConsent
              variant="modal"
              inline
              onAcceptAll={close}
              onRejectAll={close}
              onSave={close}
            />
          )}
        </TriggerDemo>
      </ShowcaseSection>

      {/* Özel Kategoriler */}
      <ShowcaseSection
        title="Özel Kategori Listesi"
        description="categories prop ile tamamen özel kategori seti tanımlanabilir."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent
  variant="banner"
  categories={[
    { id: "necessary", label: "Zorunlu",     description: "...", required: true, defaultEnabled: true },
    { id: "perf",      label: "Performans",  description: "Sayfa yükleme sürelerini ölçer.", defaultEnabled: true },
    { id: "social",    label: "Sosyal Medya",description: "Paylaşım butonları için gerekli.", defaultEnabled: false },
  ]}
/>`}
      >
        <Demo label="Sayfa içeriği burada görünür">
          {(_, reset) => (
            <CookieConsent
              variant="banner"
              inline
              categories={[
                { id: "necessary", label: "Zorunlu",      description: "Sitenin çalışması için zorunludur.",     required: true, defaultEnabled: true },
                { id: "perf",      label: "Performans",   description: "Sayfa yükleme ve hata izleme metrikleri.", defaultEnabled: true },
                { id: "social",    label: "Sosyal Medya", description: "Paylaşım butonları ve sosyal kimlik doğrulama.", defaultEnabled: false },
              ]}
              onAcceptAll={reset}
              onRejectAll={reset}
              onSave={reset}
            />
          )}
        </Demo>
      </ShowcaseSection>

      {/* Props tablosu */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-foreground uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["variant",    '"minimal" | "detailed" | "banner" | "modal" | "floating"', '"minimal"',  "Görüntüleme tipi"],
                ["position",   '"bottom" | "top" | "bottom-left" | "bottom-right"',        '"bottom"',   "Ekran konumu (fixed)"],
                ["inline",     "boolean",                                                   "false",      "Demo/test için inline render (fixed kaldırılır)"],
                ["title",      "string",                                                    '"Çerez Tercihleri"', "Başlık metni"],
                ["description","string",                                                    "...",        "Açıklama metni"],
                ["categories", "CookieCategory[]",                                         "4 varsayılan","Kategori listesi"],
                ["privacyUrl", "string",                                                    '"#"',        "Gizlilik politikası URL'si"],
                ["onAcceptAll","(selections: Record<string,boolean>) => void",              "—",          "Tümünü kabul callback"],
                ["onRejectAll","() => void",                                                "—",          "Reddet callback"],
                ["onSave",     "(selections: Record<string,boolean>) => void",              "—",          "Seçimi kaydet callback"],
              ].map(([p, t, d, desc]) => (
                <tr key={p} className="hover:bg-background-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{d}</td>
                  <td className="px-4 py-3 text-foreground-muted text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
