"use client";
import { PricingTemplate } from "@/components/ui/templates/pricing";

export default function PricingTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Fiyatlandırma Şablonu</h1>
        <p className="text-sm text-foreground-muted">SaaS ürünleri için fiyatlandırma sayfası — aylık/yıllık toggle, 3 plan, FAQ accordion ve CTA bölümü.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <PricingTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { PricingTemplate } from "@/components/ui/templates/pricing";
export default function Page() { return <PricingTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Navbar — logo, navigasyon linkleri, CTA butonları</li>
          <li>Hero — başlık, açıklama, aylık/yıllık toggle (useState)</li>
          <li>Pricing Cards — 3 plan (Starter/Pro/Enterprise), Badge, Button</li>
          <li>FAQ Accordion — 5 soru-cevap, useState ile aç/kapat</li>
          <li>Bottom CTA — iki aksiyon butonu</li>
        </ul>
      </section>
    </div>
  );
}
