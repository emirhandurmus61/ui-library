"use client";

import { EventLandingTemplate } from "@/components/ui/templates/landing-event";

export default function EventLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Etkinlik / Konferans Landing</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Hero + Geri Sayım · Stats · Konuşmacılar · Program · Biletler · Sponsorlar · CTA
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <EventLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { EventLandingTemplate } from "@/components/ui/templates/landing-event";

export default function HomePage() {
  return <EventLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Navbar — gradient CTA "Bilet Al"</li>
          <li>Hero — koyu gradient, geri sayım sayacı (statik), tarih/yer bilgisi</li>
          <li>Stats — 4 büyük sayı, koyu bg</li>
          <li>Konuşmacılar — 6 kart, Avatar + isim + unvan + konu badge</li>
          <li>Program — 2 günlük tab seçimi, her gün için 5 oturum listesi</li>
          <li>Biletler — 3 tip (Early Bird / Standart / VIP) kart</li>
          <li>Sponsorlar — Altın/Gümüş/Bronz tier'ları</li>
          <li>Acele CTA — "Son 50 bilet" urgency section</li>
          <li>Footer</li>
        </ul>
      </section>
    </div>
  );
}
