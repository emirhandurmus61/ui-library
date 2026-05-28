"use client";

import { SaaSLandingTemplate } from "@/components/ui/templates/landing-saas";

export default function SaaSLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">SaaS Landing Page</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Hero · Logo Wall · Features · How It Works · Pricing · Testimonials · FAQ · CTA · Footer
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <SaaSLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { SaaSLandingTemplate } from "@/components/ui/templates/landing-saas";

export default function HomePage() {
  return <SaaSLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Navbar — logo, nav linkleri, mobile hamburger menü</li>
          <li>Hero — gradient başlık, 2 CTA, AvatarGroup sosyal kanıt, ürün ekran görüntüsü</li>
          <li>Logo Wall — güvenen marka isimleri, grayscale efekt</li>
          <li>Features Grid — 6 özellik kartı, 2-3 kolon responsive grid</li>
          <li>How It Works — 3 numaralı adım, masaüstünde bağlantı çizgisi</li>
          <li>Pricing — aylık/yıllık toggle, 3 plan (Starter/Pro/Enterprise)</li>
          <li>Testimonials — 3 referans kartı, yıldız + alıntı + avatar</li>
          <li>FAQ — 5 soru, bağımsız accordion toggle</li>
          <li>CTA Banner — gradient arka plan, son çağrı</li>
          <li>Footer — 4 kolon, copyright bar</li>
        </ul>
      </section>
    </div>
  );
}
