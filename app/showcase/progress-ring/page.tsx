"use client";

import { useState } from "react";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function ProgressRingShowcase() {
  const [value, setValue] = useState(72);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Progress Ring</h1>
        <p className="text-sm text-foreground-muted">
          SVG dairesel ilerleme · animasyonlu mount · merkez slot · boyut & renk varyasyonları
        </p>
      </div>

      {/* Temel */}
      <ShowcaseSection
        title="Temel Kullanım"
        description="Mount animasyonu ile değer 0'dan hedefe gider."
        code={`<ProgressRing value={72} />
<ProgressRing value={45} />
<ProgressRing value={90} />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[25, 50, 72, 90].map((v) => (
            <div key={v} className="text-center">
              <ProgressRing value={v} size={80} />
              <p className="text-[10px] text-foreground-muted mt-2">value={v}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Dinamik */}
      <ShowcaseSection
        title="Dinamik Değer"
        description="Slider ile değeri değiştirin. Halka animasyonlu güncellenir."
        code={`const [value, setValue] = useState(72);
<ProgressRing value={value} size={120} thickness={10} />
<input type="range" value={value} onChange={(e) => setValue(+e.target.value)} />`}
      >
        <div className="flex flex-col items-center gap-4">
          <ProgressRing value={value} size={120} thickness={10} />
          <input
            type="range" min={0} max={100} value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-48 accent-primary"
          />
          <p className="text-sm text-foreground-muted">Değer: {value}</p>
        </div>
      </ShowcaseSection>

      {/* Renkler */}
      <ShowcaseSection
        title="Renk Varyasyonları"
        description="color prop ile halka rengi değiştirilebilir. trackColor ile iz rengi ayarlanır."
        code={`<ProgressRing value={65} color="var(--color-success)" />
<ProgressRing value={45} color="var(--color-warning)" />
<ProgressRing value={80} color="var(--color-danger)" />
<ProgressRing value={70} color="#8b5cf6" />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[
            { color: "var(--color-primary)", value: 75, label: "Primary" },
            { color: "var(--color-success)", value: 65, label: "Success" },
            { color: "var(--color-warning)", value: 45, label: "Warning" },
            { color: "var(--color-danger)",  value: 80, label: "Danger" },
            { color: "#8b5cf6",              value: 60, label: "Violet" },
          ].map(({ color, value: v, label }) => (
            <div key={label} className="text-center">
              <ProgressRing value={v} size={72} color={color} />
              <p className="text-[10px] text-foreground-muted mt-2">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Boyutlar */}
      <ShowcaseSection
        title="Boyut Skalası"
        description="size ve thickness prop'ları ile tam kontrol."
        code={`<ProgressRing value={72} size={40}  thickness={4} />
<ProgressRing value={72} size={80}  thickness={8} />
<ProgressRing value={72} size={120} thickness={12} />
<ProgressRing value={72} size={160} thickness={16} />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[
            { size: 40,  thickness: 4 },
            { size: 64,  thickness: 6 },
            { size: 96,  thickness: 10 },
            { size: 128, thickness: 14 },
          ].map(({ size, thickness }) => (
            <div key={size} className="text-center">
              <ProgressRing value={72} size={size} thickness={thickness} />
              <p className="text-[10px] text-foreground-muted mt-2">{size}px</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Merkez Slot */}
      <ShowcaseSection
        title="Özel Merkez İçerik"
        description="center prop ile merkeze herhangi bir ReactNode koyulabilir."
        code={`<ProgressRing
  value={84}
  size={120}
  center={
    <div className="text-center">
      <p className="text-xs text-foreground-muted">Görev</p>
      <p className="text-xl font-bold">84</p>
      <p className="text-[10px] text-foreground-muted">/100</p>
    </div>
  }
/>`}
      >
        <div className="flex flex-wrap gap-10 items-center">
          <ProgressRing
            value={84}
            size={120}
            center={
              <div className="text-center">
                <p className="text-[10px] text-foreground-muted">Görev</p>
                <p className="text-xl font-bold text-foreground">84</p>
                <p className="text-[10px] text-foreground-muted">/100</p>
              </div>
            }
          />
          <ProgressRing
            value={63}
            size={120}
            color="var(--color-success)"
            center={
              <div className="text-center">
                <p className="text-[10px] text-foreground-muted">Tamamlanan</p>
                <p className="text-xl font-bold text-foreground">63%</p>
              </div>
            }
          />
          <ProgressRing
            value={2.4}
            max={5}
            size={120}
            color="var(--color-warning)"
            center={
              <div className="text-center">
                <p className="text-[10px] text-foreground-muted">Puan</p>
                <p className="text-xl font-bold text-foreground">2.4</p>
                <p className="text-[10px] text-foreground-muted">/ 5.0</p>
              </div>
            }
          />
        </div>
      </ShowcaseSection>

      {/* Dashboard entegrasyonu */}
      <ShowcaseSection
        title="Dashboard Metrikleri"
        description="Sistem durumu paneli örneği. Birden fazla ProgressRing yan yana."
        code={`<div className="grid grid-cols-4 gap-6">
  <ProgressRing value={72} color="var(--color-success)" />
  <ProgressRing value={48} color="var(--color-warning)" />
  <ProgressRing value={91} color="var(--color-primary)" />
  <ProgressRing value={15} color="var(--color-danger)" />
</div>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "CPU", value: 72, color: "var(--color-success)" },
            { label: "RAM", value: 48, color: "var(--color-warning)" },
            { label: "Disk", value: 91, color: "var(--color-primary)" },
            { label: "Net", value: 15, color: "var(--color-danger)" },
          ].map(({ label, value: v, color }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
              <ProgressRing value={v} size={72} color={color} thickness={7} />
              <p className="text-xs font-medium text-foreground-muted">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Linecap */}
      <ShowcaseSection
        title="Linecap Stilleri"
        description="linecap prop: round (varsayılan), butt, square."
        code={`<ProgressRing value={65} linecap="round" />
<ProgressRing value={65} linecap="butt" />
<ProgressRing value={65} linecap="square" />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {(["round", "butt", "square"] as const).map((lc) => (
            <div key={lc} className="text-center">
              <ProgressRing value={65} size={80} linecap={lc} />
              <p className="text-[10px] text-foreground-muted mt-2">{lc}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
