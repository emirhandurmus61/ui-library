"use client";
import { AnalyticsTemplate } from "@/components/ui/templates/analytics";

export default function AnalyticsTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Analytics Dashboard Şablonu</h1>
        <p className="text-sm text-foreground-muted">Kapsamlı analitik dashboard — stat kartlar, alan grafiği, çörek grafik, ısı haritası ve sayfa tablosu.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <AnalyticsTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { AnalyticsTemplate } from "@/components/ui/templates/analytics";
export default function Page() { return <AnalyticsTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Header — tarih aralığı seçici (7G/30G/90G, useState)</li>
          <li>Stat Cards — Sparkline, MiniBarChart, GaugeChart, Badge ile 4 metrik kartı</li>
          <li>AreaChart — aylık ziyaretçi ve oturum trendi</li>
          <li>DonutChart — trafik kaynakları (Organik/Referans/Sosyal/Direkt)</li>
          <li>HeatMap — 2025 yılı aktivite takvimi</li>
          <li>Tablo — top 5 sayfa, hemen çıkma oranı ve süre bilgileri</li>
        </ul>
      </section>
    </div>
  );
}
