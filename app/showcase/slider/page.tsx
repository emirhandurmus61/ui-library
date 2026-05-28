"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function SliderShowcase() {
  const [volume,  setVolume]  = useState(60);
  const [range,   setRange]   = useState<[number, number]>([20, 80]);
  const [price,   setPrice]   = useState<[number, number]>([100, 500]);
  const [opacity, setOpacity] = useState(75);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Slider / Range</h1>
        <p className="text-sm text-foreground-muted">
          Tekli + çift handle range · step · marks · 5 renk · 3 boyut · klavye desteği
        </p>
      </div>

      <ShowcaseSection
        title="Tekli Slider"
        description="Sürükle veya klavye ok tuşlarıyla değer ayarla."
        previewClassName="px-2"
        code={`const [value, setValue] = useState(60);
<Slider value={value} onChange={(v) => setValue(v as number)} label="Ses" />`}
      >
        <div className="px-2 w-full">
          <Slider value={volume} onChange={(v) => setVolume(v as number)} label="Ses Seviyesi" showValue />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Range (İki Handle)"
        description="İki handle ile min–max aralığı seçimi."
        previewClassName="px-2"
        code={`const [range, setRange] = useState<[number, number]>([20, 80]);
<Slider range value={range} onChange={(v) => setRange(v as [number, number])} label="Aralık" />`}
      >
        <div className="px-2 w-full">
          <Slider range value={range} onChange={(v) => setRange(v as [number, number])} label="Aralık Seçimi" showValue />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Fiyat Aralığı — Marks ile"
        description="formatValue ve marks prop'u ile özel görünüm."
        previewClassName="px-2 pb-6"
        code={`<Slider
  range
  value={price}
  onChange={(v) => setPrice(v as [number, number])}
  min={0} max={1000} step={50}
  label="Fiyat Aralığı"
  formatValue={(v) => \`₺\${v}\`}
  marks={[{ value: 0, label: "₺0" }, { value: 500, label: "₺500" }, { value: 1000, label: "₺1K" }]}
/>`}
      >
        <div className="px-2 w-full">
          <Slider
            range
            value={price}
            onChange={(v) => setPrice(v as [number, number])}
            min={0}
            max={1000}
            step={50}
            label="Fiyat Aralığı"
            formatValue={(v) => `₺${v}`}
            marks={[
              { value: 0,    label: "₺0" },
              { value: 250,  label: "₺250" },
              { value: 500,  label: "₺500" },
              { value: 750,  label: "₺750" },
              { value: 1000, label: "₺1K" },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Renkler"
        previewClassName="flex flex-col gap-5 px-2"
        code={`<Slider color="primary" value={70} />
<Slider color="success" value={70} />
<Slider color="danger"  value={70} />
<Slider color="warning" value={70} />
<Slider color="info"    value={70} />`}
      >
        {(["primary", "success", "danger", "warning", "info"] as const).map((c) => (
          <Slider key={c} color={c} value={opacity} onChange={(v) => setOpacity(v as number)}
            label={c.charAt(0).toUpperCase() + c.slice(1)} showValue />
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Boyutlar"
        previewClassName="flex flex-col gap-6 px-2"
        code={`<Slider size="sm" value={50} label="Small" />
<Slider size="md" value={50} label="Medium" />
<Slider size="lg" value={50} label="Large" />`}
      >
        <Slider size="sm" defaultValue={50} label="Small (sm)"   showValue />
        <Slider size="md" defaultValue={50} label="Medium (md)"  showValue />
        <Slider size="lg" defaultValue={50} label="Large (lg)"   showValue />
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        previewClassName="px-2"
        code={`<Slider disabled value={40} label="Devre dışı" />`}
      >
        <div className="px-2 w-full">
          <Slider disabled defaultValue={40} label="Devre Dışı" showValue />
        </div>
      </ShowcaseSection>
    </div>
  );
}
