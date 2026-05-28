"use client";

import { AreaChart } from "@/components/ui/area-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];

export default function AreaChartShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Area Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG path · gradient fill · grid lines · hover tooltip · 2 dataset overlay · tamamen bağımlılıksız
        </p>
      </div>

      <ShowcaseSection
        title="Tek Dataset"
        description="Hover ile veri noktası tooltip'i gösterilir."
        code={`<AreaChart
  labels={["Oca", "Şub", "Mar", ...]}
  datasets={[{ label: "Gelir", data: [4200, 5800, 4900, ...] }]}
  formatValue={(v) => "$" + v.toLocaleString()}
/>`}
      >
        <AreaChart
          labels={MONTHS}
          datasets={[{ label: "Gelir", data: [4200, 5800, 4900, 7100, 6500, 8300, 7800, 9100, 8600, 10200, 9400, 11800] }]}
          width={480}
          height={200}
          formatValue={(v) => "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="2 Dataset Overlay"
        description="İki veri seti üst üste çakışır — tooltip her ikisini gösterir."
        code={`<AreaChart
  labels={labels}
  datasets={[
    { label: "2025", data: [...] },
    { label: "2024", data: [...], color: "#8b5cf6" },
  ]}
/>`}
      >
        <AreaChart
          labels={MONTHS}
          datasets={[
            { label: "2025", data: [3100, 4200, 3800, 5200, 4700, 6100, 5600, 7200, 6800, 8100, 7400, 9200] },
            { label: "2024", data: [2400, 3100, 2800, 3900, 3500, 4600, 4200, 5300, 5000, 6100, 5600, 7000], color: "#8b5cf6" },
          ]}
          width={480}
          height={200}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Noktasız / Grid'siz"
        code={`<AreaChart datasets={[...]} dots={false} grid={false} />`}
      >
        <AreaChart
          labels={MONTHS}
          datasets={[{ label: "Kullanıcılar", data: [820, 940, 880, 1120, 1050, 1340, 1240, 1500, 1420, 1680, 1560, 1900] }]}
          width={480}
          height={180}
          dots={false}
          grid={false}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>
    </div>
  );
}
