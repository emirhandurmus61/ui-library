"use client";

import { useState } from "react";
import { GaugeChart } from "@/components/ui/gauge-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function GaugeChartShowcase() {
  const [value, setValue] = useState(68);
  const [speed, setSpeed] = useState(120);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Gauge Chart</h1>
        <p className="text-sm text-foreground-muted">
          Yarım daire gauge · animasyonlu ibre · renk zonları · özelleştirilebilir · needle · dashboard metrikleri
        </p>
      </div>

      {/* Varsayılan Zonlar */}
      <ShowcaseSection
        title="Varsayılan Renk Zonları"
        description="Değer aralığına göre kırmızı / sarı / yeşil zon otomatik seçilir."
        code={`<GaugeChart value={20} />
<GaugeChart value={50} />
<GaugeChart value={85} />`}
      >
        <div className="flex flex-wrap gap-10 items-start justify-center py-2">
          {[
            { value: 15, label: "Kritik (15)" },
            { value: 42, label: "Uyarı (42)" },
            { value: 68, label: "Normal (68)" },
            { value: 91, label: "Mükemmel (91)" },
          ].map(({ value: v, label }) => (
            <div key={label} className="text-center">
              <GaugeChart value={v} />
              <p className="text-xs text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Dinamik Slider */}
      <ShowcaseSection
        title="Dinamik Değer"
        description="Slider ile değeri değiştirin — ibre animasyonlu hareket eder."
        code={`const [value, setValue] = useState(68);
<GaugeChart value={value} radius={100} thickness={16} />
<input type="range" value={value} onChange={(e) => setValue(+e.target.value)} />`}
      >
        <div className="flex flex-col items-center gap-4">
          <GaugeChart value={value} radius={100} thickness={16} />
          <input
            type="range" min={0} max={100} value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <p className="text-sm text-foreground-muted">Değer: {value}</p>
        </div>
      </ShowcaseSection>

      {/* CPU / RAM / Disk */}
      <ShowcaseSection
        title="Sistem Metrikleri — CPU / RAM / Disk"
        description="Özel zonlar ile kaynak kullanım göstergeleri."
        code={`<GaugeChart
  value={72}
  zones={[
    { from: 0,  to: 50, color: "var(--color-success)" },
    { from: 50, to: 80, color: "var(--color-warning)" },
    { from: 80, to: 100, color: "var(--color-danger)" },
  ]}
  formatValue={(v) => v.toFixed(0) + "%"}
/>`}
      >
        <div className="flex flex-wrap gap-8 justify-center py-2">
          {[
            { value: 72, label: "CPU" },
            { value: 48, label: "RAM" },
            { value: 91, label: "Disk" },
          ].map(({ value: v, label }) => (
            <div key={label} className="text-center">
              <GaugeChart
                value={v}
                zones={[
                  { from: 0,  to: 50, color: "var(--color-success)" },
                  { from: 50, to: 80, color: "var(--color-warning)" },
                  { from: 80, to: 100, color: "var(--color-danger)" },
                ]}
                formatValue={(val) => val.toFixed(0) + "%"}
                label={<p className="text-xs text-foreground-muted">{label}</p>}
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Hız Göstergesi */}
      <ShowcaseSection
        title="Hız Göstergesi"
        description="Araç hız göstergesi simülasyonu. Özel min/max ve format."
        code={`<GaugeChart
  value={speed}
  min={0}
  max={240}
  zones={[
    { from: 0,   to: 60,  color: "var(--color-success)" },
    { from: 60,  to: 120, color: "var(--color-warning)" },
    { from: 120, to: 240, color: "var(--color-danger)" },
  ]}
  formatValue={(v) => Math.round(v) + " km/h"}
/>`}
      >
        <div className="flex flex-col items-center gap-4">
          <GaugeChart
            value={speed}
            min={0}
            max={240}
            radius={110}
            thickness={18}
            zones={[
              { from: 0,   to: 60,  color: "var(--color-success)" },
              { from: 60,  to: 120, color: "var(--color-warning)" },
              { from: 120, to: 240, color: "var(--color-danger)" },
            ]}
            formatValue={(v) => Math.round(v) + " km/h"}
            label={<p className="text-xs text-foreground-muted mt-1">Hız</p>}
          />
          <input
            type="range" min={0} max={240} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <p className="text-sm text-foreground-muted">{speed} km/h</p>
        </div>
      </ShowcaseSection>

      {/* Puan / Rating */}
      <ShowcaseSection
        title="Puan & Derecelendirme"
        description="0–5 arası puan skalası. Müşteri memnuniyeti veya performans değerlendirmesi."
        code={`<GaugeChart
  value={4.2}
  min={0}
  max={5}
  zones={[
    { from: 0,  to: 40,  color: "var(--color-danger)" },
    { from: 40, to: 70,  color: "var(--color-warning)" },
    { from: 70, to: 100, color: "var(--color-success)" },
  ]}
  formatValue={(v) => v.toFixed(1) + " / 5"}
/>`}
      >
        <div className="flex flex-wrap gap-8 justify-center py-2">
          {[
            { value: 1.8, label: "Ürün A" },
            { value: 3.4, label: "Ürün B" },
            { value: 4.7, label: "Ürün C" },
          ].map(({ value: v, label }) => (
            <div key={label} className="text-center">
              <GaugeChart
                value={v}
                min={0}
                max={5}
                zones={[
                  { from: 0, to: 40,  color: "var(--color-danger)" },
                  { from: 40, to: 70, color: "var(--color-warning)" },
                  { from: 70, to: 100, color: "var(--color-success)" },
                ]}
                formatValue={(val) => val.toFixed(1) + " ★"}
                label={<p className="text-xs text-foreground-muted">{label}</p>}
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* NPS */}
      <ShowcaseSection
        title="Net Promoter Score (NPS)"
        description="NPS değerleri -100 ile +100 arasındadır. Özel min/max ile modelleme."
        code={`<GaugeChart
  value={42}
  min={-100}
  max={100}
  zones={[
    { from: -100, to: 0,   color: "var(--color-danger)" },
    { from: 0,    to: 50,  color: "var(--color-warning)" },
    { from: 50,   to: 100, color: "var(--color-success)" },
  ]}
  formatValue={(v) => "NPS " + (v >= 0 ? "+" : "") + Math.round(v)}
/>`}
      >
        <div className="flex flex-wrap gap-8 justify-center">
          {[
            { value: -25, label: "Kötü" },
            { value: 28,  label: "Orta" },
            { value: 72,  label: "İyi" },
          ].map(({ value: v, label }) => (
            <div key={label} className="text-center">
              <GaugeChart
                value={v}
                min={-100}
                max={100}
                zones={[
                  { from: -100, to: 0,   color: "var(--color-danger)" },
                  { from: 0,    to: 50,  color: "var(--color-warning)" },
                  { from: 50,   to: 100, color: "var(--color-success)" },
                ]}
                formatValue={(val) => "NPS " + (val >= 0 ? "+" : "") + Math.round(val)}
                label={<p className="text-xs text-foreground-muted">{label}</p>}
              />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Boyut Varyasyonları */}
      <ShowcaseSection
        title="Boyut Varyasyonları"
        description="radius ve thickness prop'ları ile tam boyut kontrolü."
        code={`<GaugeChart value={68} radius={60}  thickness={8} />
<GaugeChart value={68} radius={90}  thickness={14} />
<GaugeChart value={68} radius={120} thickness={20} />`}
      >
        <div className="flex flex-wrap gap-10 items-end justify-center">
          {[
            { radius: 60,  thickness: 8,  label: "Küçük" },
            { radius: 90,  thickness: 14, label: "Orta" },
            { radius: 120, thickness: 20, label: "Büyük" },
          ].map(({ radius, thickness, label }) => (
            <div key={label} className="text-center">
              <GaugeChart value={68} radius={radius} thickness={thickness} />
              <p className="text-[10px] text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
