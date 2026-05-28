"use client";

import { DashboardTemplate } from "@/components/ui/templates/dashboard";

export default function DashboardTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard Şablonu</h1>
        <p className="text-sm text-foreground-muted">
          Sidebar · Topbar · Stat Cards · Tablo · Proje ilerleme — tam sayfa layout.
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden" style={{ height: 640 }}>
        <DashboardTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { DashboardTemplate } from "@/components/ui/templates/dashboard";

// Tam ekran kullanım
export default function DashboardPage() {
  return <DashboardTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Sidebar — logo, nav items, user footer</li>
          <li>Topbar — page title, notification bell, avatar</li>
          <li>StatCard × 4 — trend göstergeli metrikler</li>
          <li>Table — son siparişler, sortable, hoverable</li>
          <li>Card + Progress — aktif proje listesi</li>
          <li>Mobil hamburger menü desteği</li>
        </ul>
      </section>
    </div>
  );
}
