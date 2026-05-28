"use client";

import { Sparkline } from "@/components/ui/sparkline";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const UP   = [12, 18, 14, 22, 19, 28, 25, 34, 30, 38, 35, 44];
const DOWN = [44, 38, 42, 30, 35, 22, 27, 18, 20, 12, 15, 8];
const FLAT = [20, 22, 19, 23, 21, 24, 20, 22, 21, 23, 22, 20];

export default function SparklineShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Sparkline</h1>
        <p className="text-sm text-foreground-muted">
          SVG polyline · positive/negative renk · filled area · hover tooltip · StatCard entegrasyonu
        </p>
      </div>

      <ShowcaseSection
        title="Pozitif / Negatif / Nötr"
        description="Son değer ilk değerden büyükse yeşil, küçükse kırmızı renk."
        code={`<Sparkline data={[12, 18, 14, 22, 28, 25, 34, 44]} />
<Sparkline data={[44, 38, 30, 22, 18, 12, 8]} />
<Sparkline data={[20, 22, 19, 23, 21, 24, 22]} />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[
            { data: UP,   label: "Yükselen ↑" },
            { data: DOWN, label: "Düşen ↓" },
            { data: FLAT, label: "Sabit →" },
          ].map(({ data, label }) => (
            <div key={label} className="text-center">
              <Sparkline data={data} width={140} height={48} />
              <p className="text-xs text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="StatCard Entegrasyonu"
        description="Stat kartlarında sağ alt köşede mini trend göstergesi."
        code={`<div className="stat-card">
  <p className="value">$12,430</p>
  <Sparkline data={data} width={80} height={32} tooltip={false} />
</div>`}
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Gelir", value: "$12,430", data: UP,   suffix: "+18%" },
            { label: "Kullanıcı", value: "4,821", data: UP,   suffix: "+6%" },
            { label: "Bounce", value: "34.2%", data: DOWN, suffix: "-4%" },
          ].map((card) => (
            <div key={card.label} className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-foreground-muted">{card.label}</p>
                  <p className="text-xl font-bold text-foreground mt-0.5">{card.value}</p>
                  <p className="text-xs text-success mt-0.5">{card.suffix}</p>
                </div>
                <Sparkline data={card.data} width={70} height={32} tooltip={false} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyut & Stil"
        code={`<Sparkline data={data} width={80} height={24} filled={false} strokeWidth={1} />
<Sparkline data={data} width={200} height={60} strokeWidth={2.5} />`}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-center">
              <Sparkline data={UP} width={80} height={24} filled={false} strokeWidth={1} />
              <p className="text-[10px] text-foreground-muted mt-1">filled=false, sm</p>
            </div>
            <div className="text-center">
              <Sparkline data={UP} width={200} height={60} strokeWidth={2.5} />
              <p className="text-[10px] text-foreground-muted mt-1">large, strokeWidth=2.5</p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
