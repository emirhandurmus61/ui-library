"use client";

import { StartupLandingTemplate } from "@/components/ui/templates/landing-startup";

export default function StartupLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Startup / Ürün Lansmanı Landing</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Koyu Hero · Stats · Features · Sosyal Kanıt · Pricing Teaser · CTA · Footer
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <StartupLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { StartupLandingTemplate } from "@/components/ui/templates/landing-startup";

export default function HomePage() {
  return <StartupLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Minimal Navbar — koyu arka plan, ghost + soft buton</li>
          <li>Hero — tam ekran koyu gradient, büyük bold başlık, email waitlist formu</li>
          <li>Stats Row — 4 büyük metrik, koyu kart</li>
          <li>Features — 3 kart, bordered + glow stylePreset</li>
          <li>Sosyal Kanıt — hareketli testimonial şeritleri (CSS animasyon)</li>
          <li>Pricing Teaser — Free vs Pro karşılaştırma</li>
          <li>CTA — gradient section, ikinci email formu</li>
          <li>Minimal Footer</li>
        </ul>
      </section>
    </div>
  );
}
