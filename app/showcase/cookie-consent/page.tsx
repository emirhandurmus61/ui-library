"use client";

import { useState } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { CookieConsent } from "@/components/ui/cookie-consent";

function DemoWrapper({ children, label }: { children: React.ReactNode; label: string }) {
  const [key, setKey] = useState(0);
  return (
    <div className="relative rounded-[var(--radius-xl)] border border-border overflow-hidden bg-background-muted/30 min-h-[160px]">
      <div className="p-6 text-sm text-foreground-muted text-center opacity-50">{label}</div>
      <div key={key}>{children}</div>
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setKey(k => k + 1)}
          className="text-[11px] px-2 py-1 rounded-[var(--radius-md)] bg-background-muted border border-border text-foreground-muted hover:text-foreground transition-colors"
        >
          Sıfırla
        </button>
      </div>
    </div>
  );
}

export default function CookieConsentShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Cookie Consent</h1>
        <p className="text-foreground-muted">
          GDPR uyumlu çerez onay bileşeni. 5 varyant, toggle'lı kategori seçimi, "Sıfırla" ile tekrar görüntüle.
        </p>
      </div>

      <ShowcaseSection
        title="Minimal"
        description="Tek satır, Reddet / Kabul Et. En az bilgi gösteren varyant."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="minimal" position="bottom" />`}
      >
        <DemoWrapper label="Sayfa içeriği">
          <CookieConsent variant="minimal" position="bottom" />
        </DemoWrapper>
      </ShowcaseSection>

      <ShowcaseSection
        title="Detailed (Kategorili)"
        description="Açık kategori toggle'ları ile detaylı tercih yönetimi."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="detailed" />`}
      >
        <DemoWrapper label="Sayfa içeriği">
          <CookieConsent variant="detailed" />
        </DemoWrapper>
      </ShowcaseSection>

      <ShowcaseSection
        title="Floating"
        description="Sağ alt köşede küçük kart. 'Tercihleri Özelleştir' ile genişler."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="floating" />`}
      >
        <DemoWrapper label="Sayfa içeriği">
          <CookieConsent variant="floating" />
        </DemoWrapper>
      </ShowcaseSection>

      <ShowcaseSection
        title="Modal"
        description="Sayfanın ortasında overlay modal. Kapsamlı tercih yönetimi."
        importLine={`import { CookieConsent } from "@/components/ui/cookie-consent";`}
        code={`<CookieConsent variant="modal" />`}
      >
        <DemoWrapper label="Sayfa içeriği">
          <CookieConsent variant="modal" />
        </DemoWrapper>
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Varsayılan","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["variant",'"minimal"|"detailed"|"banner"|"modal"|"floating"','"minimal"',"Görüntüleme tipi"],
                ["position",'"bottom"|"top"|"bottom-left"|"bottom-right"','"bottom"',"Ekran konumu"],
                ["title","string",'"Çerez Tercihleri"',"Başlık"],
                ["description","string","...","Açıklama metni"],
                ["categories","CookieCategory[]","4 varsayılan kategori","Kategori listesi"],
                ["privacyUrl","string",'"#"',"Gizlilik politikası URL"],
                ["onAcceptAll","(selections) => void","—","Tümünü kabul callback"],
                ["onRejectAll","() => void","—","Reddet callback"],
                ["onSave","(selections) => void","—","Seçimi kaydet callback"],
              ].map(([p,t,d,desc])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{d}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
