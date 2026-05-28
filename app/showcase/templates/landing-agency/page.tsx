"use client";

import { AgencyLandingTemplate } from "@/components/ui/templates/landing-agency";

export default function AgencyLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Ajans / Kreatif Stüdyo Landing</h1>
        <p className="text-sm text-foreground-muted">
          Koyu Navbar · Tipografi Hero · Hizmetler · Seçilmiş İşler · Stats · Ekip · Müşteriler · CTA
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <AgencyLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { AgencyLandingTemplate } from "@/components/ui/templates/landing-agency";

export default function HomePage() {
  return <AgencyLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Koyu Navbar — bg-gray-950, gradient CTA butonu</li>
          <li>Hero — tam ekran koyu bg, dev tipografi (8xl), dekoratif blur daireler</li>
          <li>Hizmetler — bordered + glow kartlar, büyük numara (01/02...)</li>
          <li>Seçilmiş İşler — hover overlay ile "Projeyi İncele" butonu</li>
          <li>Stats Row — koyu bg, 4 büyük sayı</li>
          <li>Ekip — 4 Avatar kartı + sosyal ikonlar</li>
          <li>Güvenen Markalar — logo isimleri flex-wrap</li>
          <li>İletişim CTA — koyu section, gradient buton</li>
          <li>Koyu Footer</li>
        </ul>
      </section>
    </div>
  );
}
