"use client";

import { useState } from "react";
import { GaugeChart } from "@/components/ui/gauge-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function GaugeChartShowcase() {
  const [value, setValue] = useState(68);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Gauge Chart</h1>
        <p className="text-sm text-foreground-muted">
          Yarım daire gauge · animasyonlu ibre · renk zonları · özelleştirilebilir · needle
        </p>
      </div>

      <ShowcaseSection
        title="Varsayılan (Kırmızı / Sarı / Yeşil)"
        description="Değer aralığına göre renk zonu otomatik seçilir."
        code={`<GaugeChart value={68} min={0} max={100} />`}
      >
        <div className="flex flex-wrap gap-10 items-start justify-center py-2">
          <div className="text-center">
            <GaugeChart value={20} />
            <p className="text-xs text-foreground-muted mt-2">Düşük (20)</p>
          </div>
          <div className="text-center">
            <GaugeChart value={50} />
            <p className="text-xs text-foreground-muted mt-2">Orta (50)</p>
          </div>
          <div className="text-center">
            <GaugeChart value={85} />
            <p className="text-xs text-foreground-muted mt-2">Yüksek (85)</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dinamik Değer"
        description="Slider ile değeri değiştirin — ibre animasyonlu hareket eder."
        code={`const [value, setValue] = useState(68);
<GaugeChart value={value} min={0} max={100} />
<input type="range" value={value} onChange={(e) => setValue(+e.target.value)} />`}
      >
        <div className="flex flex-col items-center gap-4">
          <GaugeChart value={value} radius={100} thickness={16} />
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <p className="text-sm text-foreground-muted">Değer: {value}</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Zonlar"
        description="CPU, disk, ağ gibi metrikler için özel renk aralıkları."
        code={`<GaugeChart
  value={72}
  zones={[
    { from: 0,  to: 50, color: "var(--color-success)" },
    { from: 50, to: 80, color: "var(--color-warning)" },
    { from: 80, to: 100, color: "var(--color-danger)" },
  ]}
  formatValue={(v) => v.toFixed(0) + "%"}
  label={<p className="text-sm text-foreground-muted">CPU Kullanımı</p>}
/>`}
      >
        <div className="flex flex-wrap gap-8 justify-center py-2">
          <div className="text-center">
            <GaugeChart
              value={72}
              zones={[
                { from: 0,  to: 50, color: "var(--color-success)" },
                { from: 50, to: 80, color: "var(--color-warning)" },
                { from: 80, to: 100, color: "var(--color-danger)" },
              ]}
              formatValue={(v) => v.toFixed(0) + "%"}
            />
            <p className="text-xs text-foreground-muted mt-1">CPU</p>
          </div>
          <div className="text-center">
            <GaugeChart
              value={4.2}
              min={0}
              max={5}
              zones={[
                { from: 0,   to: 40,  color: "var(--color-danger)" },
                { from: 40,  to: 70,  color: "var(--color-warning)" },
                { from: 70,  to: 100, color: "var(--color-success)" },
              ]}
              formatValue={(v) => v.toFixed(1) + " / 5"}
            />
            <p className="text-xs text-foreground-muted mt-1">Puan</p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
