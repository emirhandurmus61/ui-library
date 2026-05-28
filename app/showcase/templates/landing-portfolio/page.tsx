"use client";

import { PortfolioLandingTemplate } from "@/components/ui/templates/landing-portfolio";

export default function PortfolioLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Portfolyo / Freelancer Landing</h1>
        <p className="text-sm text-foreground-muted">
          Kişisel site ve freelancer portfolyoları için — Hero · Projeler · Beceriler · Deneyim · İletişim
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <PortfolioLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { PortfolioLandingTemplate } from "@/components/ui/templates/landing-portfolio";

export default function HomePage() {
  return <PortfolioLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Navbar — initials logo, nav linkleri, CV İndir butonu, mobile menü</li>
          <li>Hero — split layout, gradient isim, rol badge, sosyal ikonlar, Avatar + Müsait badge</li>
          <li>Seçilmiş Projeler — 3-kolon grid, hover overlay, tech etiketleri</li>
          <li>Teknolojiler — Frontend/Backend/Tools gruplu pill'ler</li>
          <li>Deneyim Timeline — dikey çizgi, nokta, şirket + tarih</li>
          <li>Testimonials — 2 referans kartı</li>
          <li>İletişim Formu — name/email/message + loading/success state</li>
          <li>Minimal Footer</li>
        </ul>
      </section>
    </div>
  );
}
