"use client";

import { useMemo } from "react";
import { HeatMap } from "@/components/ui/heat-map";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Seeded random — aynı çıktıyı server ve client'ta üretir ── */
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function genData(year: number, density = 0.4, seed = 42, maxVal = 8) {
  const rand = seededRandom(seed);
  const data: Record<string, number> = {};
  const d = new Date(year, 0, 1);
  while (d.getFullYear() === year) {
    if (rand() < density) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      data[key] = Math.ceil(rand() * maxVal);
    }
    d.setDate(d.getDate() + 1);
  }
  return data;
}

/* Gün bazlı yoğunluk — hafta içi yüksek */
function genWorkdayData(year: number, seed = 99) {
  const rand = seededRandom(seed);
  const data: Record<string, number> = {};
  const d = new Date(year, 0, 1);
  while (d.getFullYear() === year) {
    const dayOfWeek = d.getDay(); // 0=Sun, 6=Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const density = isWeekend ? 0.1 : 0.7;
    if (rand() < density) {
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      data[key] = Math.ceil(rand() * (isWeekend ? 3 : 10));
    }
    d.setDate(d.getDate() + 1);
  }
  return data;
}

export default function HeatMapShowcase() {
  const DATA_2025      = useMemo(() => genData(2025, 0.45, 1), []);
  const DATA_2024      = useMemo(() => genData(2024, 0.35, 2), []);
  const DATA_2023      = useMemo(() => genData(2023, 0.55, 3, 12), []);
  const DATA_WORKDAY   = useMemo(() => genWorkdayData(2025, 77), []);
  const DATA_SALES     = useMemo(() => genData(2025, 0.6, 42, 50), []);
  const DATA_ERRORS    = useMemo(() => genData(2025, 0.2, 13, 15), []);

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Heat Map</h1>
        <p className="text-sm text-foreground-muted">
          GitHub katkı takvimi · yıl bazlı · renk yoğunluğu · hover tooltip · özelleştirilebilir renk & hücre boyutu
        </p>
      </div>

      {/* 2025 Katkı Takvimi */}
      <ShowcaseSection
        title="GitHub Katkı Takvimi — 2025"
        description="Hover ile tarih ve değer tooltip'i gösterilir. Renk yoğunluğu değer büyüklüğüyle orantılıdır."
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

      {/* Hafta İçi Yoğunluk */}
      <ShowcaseSection
        title="Çalışma Günü Aktivitesi"
        description="Hafta içi yoğunluk belirgin şekilde daha yüksek — pattern açıkça görünür."
        code={`<HeatMap
  data={workdayData}
  year={2025}
  formatValue={(date, v) => \`\${date}: \${v} işlem\`}
/>`}
      >
        <div className="overflow-x-auto pb-2">
          <HeatMap
            data={DATA_WORKDAY}
            year={2025}
            formatValue={(date, v) => `${date}: ${v} işlem`}
          />
        </div>
      </ShowcaseSection>

      {/* Satış Yoğunluğu */}
      <ShowcaseSection
        title="Günlük Satış Yoğunluğu"
        description="Satış verilerini takvim üzerinde görselleştirme. Yoğun aylar ve kampanya dönemleri belirgin."
        code={`<HeatMap
  data={salesData}
  year={2025}
  color="var(--color-success)"
  formatValue={(date, v) => \`\${date}: \${v} satış\`}
/>`}
      >
        <div className="overflow-x-auto pb-2">
          <HeatMap
            data={DATA_SALES}
            year={2025}
            color="var(--color-success)"
            formatValue={(date, v) => `${date}: ${v} satış`}
          />
        </div>
      </ShowcaseSection>

      {/* Hata / Olay Günlüğü */}
      <ShowcaseSection
        title="Hata & Olay Günlüğü"
        description="Sistem hatalarının takvim üzerinde dağılımı. Kırmızı tonlar kritik günleri işaret eder."
        code={`<HeatMap
  data={errorData}
  year={2025}
  color="var(--color-danger)"
  formatValue={(date, v) => \`\${date}: \${v} hata\`}
/>`}
      >
        <div className="overflow-x-auto pb-2">
          <HeatMap
            data={DATA_ERRORS}
            year={2025}
            color="var(--color-danger)"
            formatValue={(date, v) => `${date}: ${v} hata`}
          />
        </div>
      </ShowcaseSection>

      {/* Özel Renkler */}
      <ShowcaseSection
        title="Renk Temaları"
        description="color prop ile tek rengin yoğunluk skalası değiştirilir."
        code={`<HeatMap data={data} year={2025} color="var(--color-primary)" />
<HeatMap data={data} year={2025} color="#8b5cf6" />
<HeatMap data={data} year={2025} color="var(--color-warning)" />
<HeatMap data={data} year={2025} color="#06b6d4" />`}
      >
        <div className="space-y-5 overflow-x-auto">
          {[
            { color: "var(--color-primary)", label: "Primary (indigo)" },
            { color: "#8b5cf6",              label: "Violet" },
            { color: "var(--color-warning)", label: "Warning (amber)" },
            { color: "#06b6d4",              label: "Cyan" },
          ].map(({ color, label }) => (
            <div key={label}>
              <p className="text-xs text-foreground-muted mb-1.5">{label}</p>
              <HeatMap data={DATA_2024} year={2024} color={color} showMonths={true} showDays={false} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Çok Yıllı Karşılaştırma */}
      <ShowcaseSection
        title="Çok Yıllı Karşılaştırma"
        description="Farklı yılları alt alta karşılaştırma — aktivite artışı veya azalışı görselleştirilir."
        code={`<HeatMap data={data2025} year={2025} showDays={false} cellSize={10} />
<HeatMap data={data2024} year={2024} showDays={false} cellSize={10} />
<HeatMap data={data2023} year={2023} showDays={false} cellSize={10} />`}
      >
        <div className="space-y-4 overflow-x-auto">
          {[
            { data: DATA_2025, year: 2025 },
            { data: DATA_2024, year: 2024 },
            { data: DATA_2023, year: 2023 },
          ].map(({ data, year }) => (
            <div key={year}>
              <p className="text-xs text-foreground-muted mb-1">{year}</p>
              <HeatMap data={data} year={year} showDays={false} cellSize={10} cellGap={2} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Hücre Boyutu Varyasyonları */}
      <ShowcaseSection
        title="Hücre Boyutu"
        description="cellSize ve cellGap prop'ları ile kompaktan genişe farklı yoğunluk görünümleri."
        code={`<HeatMap data={data} cellSize={7}  cellGap={1} />  {/* kompakt  */}
<HeatMap data={data} cellSize={11} cellGap={2} />  {/* varsayılan */}
<HeatMap data={data} cellSize={16} cellGap={3} />  {/* büyük     */}`}
      >
        <div className="space-y-5 overflow-x-auto">
          {[
            { size: 7,  gap: 1, label: "cellSize=7, cellGap=1 (kompakt)" },
            { size: 11, gap: 2, label: "cellSize=11, cellGap=2 (varsayılan)" },
            { size: 16, gap: 3, label: "cellSize=16, cellGap=3 (büyük)" },
          ].map(({ size, gap, label }) => (
            <div key={size}>
              <p className="text-xs text-foreground-muted mb-1.5">{label}</p>
              <HeatMap data={DATA_2025} year={2025} cellSize={size} cellGap={gap} showDays={size < 11} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Etiket Seçenekleri */}
      <ShowcaseSection
        title="Etiket Seçenekleri"
        description="showMonths ve showDays prop'ları ile etiketler gizlenebilir."
        code={`<HeatMap data={data} showMonths={true}  showDays={true}  />  {/* tam       */}
<HeatMap data={data} showMonths={true}  showDays={false} />  {/* ay etiket */}
<HeatMap data={data} showMonths={false} showDays={false} />  {/* minimal   */}`}
      >
        <div className="space-y-5 overflow-x-auto">
          <div>
            <p className="text-xs text-foreground-muted mb-1.5">showMonths=true, showDays=true (tam)</p>
            <HeatMap data={DATA_2025} year={2025} showMonths={true} showDays={true} cellSize={10} />
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1.5">showMonths=true, showDays=false</p>
            <HeatMap data={DATA_2025} year={2025} showMonths={true} showDays={false} cellSize={10} />
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-1.5">showMonths=false, showDays=false (minimal)</p>
            <HeatMap data={DATA_2025} year={2025} showMonths={false} showDays={false} cellSize={10} />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
