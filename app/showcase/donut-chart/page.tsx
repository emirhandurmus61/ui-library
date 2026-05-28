"use client";

import { DonutChart } from "@/components/ui/donut-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const TRAFFIC = [
  { label: "Organik", value: 4200 },
  { label: "Sosyal", value: 1800 },
  { label: "Direkt", value: 1200 },
  { label: "Referans", value: 800 },
];

const BUDGET = [
  { label: "Pazarlama", value: 35, color: "#8b5cf6" },
  { label: "Ürün",      value: 28, color: "var(--color-primary)" },
  { label: "İK",        value: 20, color: "var(--color-success)" },
  { label: "Altyapı",   value: 17, color: "var(--color-warning)" },
];

export default function DonutChartShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Donut Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG doughnut · hover highlight · merkez slot · legend · özel renkler
        </p>
      </div>

      <ShowcaseSection
        title="Trafik Kaynakları"
        description="Segment üzerine gelin — hover'da detay gösterilir."
        code={`<DonutChart
  data={[
    { label: "Organik", value: 4200 },
    { label: "Sosyal",  value: 1800 },
    { label: "Direkt",  value: 1200 },
  ]}
/>`}
      >
        <DonutChart data={TRAFFIC} radius={90} thickness={22} />
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Renkler & Merkez Slot"
        description="center prop ile merkeze özel içerik koyulabilir."
        code={`<DonutChart
  data={BUDGET}
  center={
    <div className="text-center">
      <p className="text-xs text-foreground-muted">Toplam</p>
      <p className="text-lg font-bold">$240K</p>
    </div>
  }
/>`}
      >
        <DonutChart
          data={BUDGET}
          radius={85}
          thickness={18}
          center={
            <div className="text-center">
              <p className="text-[10px] text-foreground-muted">Toplam</p>
              <p className="text-lg font-bold text-foreground">$240K</p>
            </div>
          }
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="İnce / Kalın thickness"
        code={`<DonutChart data={data} thickness={8} />
<DonutChart data={data} thickness={32} />`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div className="text-center">
            <DonutChart data={TRAFFIC} radius={70} thickness={8} legend={false} />
            <p className="text-xs text-foreground-muted mt-2">thickness=8</p>
          </div>
          <div className="text-center">
            <DonutChart data={TRAFFIC} radius={70} thickness={32} legend={false} />
            <p className="text-xs text-foreground-muted mt-2">thickness=32</p>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
