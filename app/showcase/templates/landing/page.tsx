"use client";

import { LandingTemplate } from "@/components/ui/templates/landing";

export default function LandingTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Landing Page Şablonu</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Hero · Features · Pricing · Testimonials · CTA · Footer — tam sayfalık landing page.
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <LandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { LandingTemplate } from "@/components/ui/templates/landing";

export default function HomePage() {
  return <LandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Navbar — logo, nav linkleri, CTA butonları</li>
          <li>Hero — başlık, açıklama, CTA butonları, AvatarGroup sosyal kanıt</li>
          <li>Features — 4 özellik kartı, ikon + renk kodlu</li>
          <li>Pricing — 3 plan, popüler badge, özellik listesi</li>
          <li>Testimonials — 3 referans kartı, avatar</li>
          <li>CTA — son çağrı aksiyonu bölümü</li>
          <li>Footer — minimal, linkler, copyright</li>
        </ul>
      </section>
    </div>
  );
}
