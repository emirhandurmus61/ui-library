"use client";

import { useMemo } from "react";
import { HeatMap } from "@/components/ui/heat-map";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* Generate seeded-random contribution data — same output on server and client */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function genData(year: number, density = 0.4, seed = 42) {
  const rand = seededRandom(seed);
  const data: Record<string, number> = {};
  const d = new Date(year, 0, 1);
  while (d.getFullYear() === year) {
    if (rand() < density) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      data[key] = Math.ceil(rand() * 8);
    }
    d.setDate(d.getDate() + 1);
  }
  return data;
}

export default function HeatMapShowcase() {
  const DATA_2025 = useMemo(() => genData(2025, 0.45, 1), []);
  const DATA_2024 = useMemo(() => genData(2024, 0.35, 2), []);
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Heat Map</h1>
        <p className="text-sm text-foreground-muted">
          GitHub contribution tarzı · yıl bazlı · renk yoğunluğu · hover tooltip · özelleştirilebilir renk
        </p>
      </div>

      <ShowcaseSection
        title="2025 Yılı"
        description="Hover ile tarih ve değer tooltip'i gösterilir."
        code={`<HeatMap
  data={contributionData}
  year={2025}
  formatValue={(date, v) => \`\${date}: \${v} commit\`}
/>`}
      >
        <div className="overflow-x-auto pb-2">
          <HeatMap
            data={DATA_2025}
            year={2025}
            formatValue={(date, v) => `${date}: ${v} commit`}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Renk"
        description="color prop ile tek rengin yoğunluk skalası değiştirilir."
        code={`<HeatMap data={data} year={2025} color="var(--color-primary)" />
<HeatMap data={data} year={2025} color="#8b5cf6" />
<HeatMap data={data} year={2025} color="var(--color-warning)" />`}
      >
        <div className="space-y-4 overflow-x-auto">
          {[
            { color: "var(--color-primary)", label: "Primary (varsayılan)" },
            { color: "#8b5cf6",              label: "Violet" },
            { color: "var(--color-warning)", label: "Warning" },
          ].map(({ color, label }) => (
            <div key={label}>
              <p className="text-xs text-foreground-muted mb-1.5">{label}</p>
              <HeatMap data={DATA_2024} year={2024} color={color} showMonths={true} showDays={false} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hücre Boyutu"
        code={`<HeatMap data={data} cellSize={8} cellGap={1} />   {/* kompakt */}
<HeatMap data={data} cellSize={14} cellGap={3} />  {/* büyük  */}`}
      >
        <div className="space-y-4 overflow-x-auto">
          <div>
            <p className="text-xs text-foreground-muted mb-1.5">cellSize=8, cellGap=1 (kompakt)</p>
            <HeatMap data={DATA_2025} year={2025} cellSize={8} cellGap={1} showDays={false} />
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1.5">cellSize=14, cellGap={3} (büyük)</p>
            <HeatMap data={DATA_2025} year={2025} cellSize={14} cellGap={3} />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
