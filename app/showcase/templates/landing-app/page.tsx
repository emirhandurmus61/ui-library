"use client";

import { AppLandingTemplate } from "@/components/ui/templates/landing-app";

export default function AppLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Mobil Uygulama Tanıtım Landing</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Hero + Phone Mockup · Özellikler · Ekran Görüntüleri · Stats · Yorumlar · İndir CTA
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <AppLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { AppLandingTemplate } from "@/components/ui/templates/landing-app";

export default function HomePage() {
  return <AppLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Navbar — App Store / Play Store butonları</li>
          <li>Hero — split: sol metin + indirme butonları, sağ phone mockup placeholder</li>
          <li>Özellikler — 3 kart, renkli ikon daireleri</li>
          <li>Ekran Görüntüleri — yatay scroll, 5 phone ekranı placeholder</li>
          <li>Stats — 4 büyük metrik</li>
          <li>App Store Yorumları — 3 kart, yıldız + kullanıcı adı</li>
          <li>İndir CTA — gradient section, iki store butonu</li>
          <li>Minimal Footer</li>
        </ul>
      </section>
    </div>
  );
}
