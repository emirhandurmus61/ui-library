"use client";

import { AreaChart } from "@/components/ui/area-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const WEEKS = Array.from({ length: 12 }, (_, i) => `H${i + 1}`);
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export default function AreaChartShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Area Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG alan grafiği · gradient fill · multi-dataset · hover tooltip · grid · noktasız mod · tamamen bağımlılıksız
        </p>
      </div>

      {/* Tek Dataset — Gelir */}
      <ShowcaseSection
        title="Aylık Gelir Trendi"
        description="Hover ile veri noktası tooltip'i gösterilir."
        code={`<AreaChart
  labels={["Oca", "Şub", "Mar", ...]}
  datasets={[{ label: "Gelir", data: [4200, 5800, 4900, 7100, ...] }]}
  formatValue={(v) => "$" + v.toLocaleString()}
/>`}
      >
        <AreaChart
          labels={MONTHS}
          datasets={[{ label: "Gelir", data: [4200, 5800, 4900, 7100, 6500, 8300, 7800, 9100, 8600, 10200, 9400, 11800] }]}
          width={560}
          height={200}
          formatValue={(v) => "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* 2 Dataset — Yıl Karşılaştırması */}
      <ShowcaseSection
        title="Yıl Karşılaştırması — 2 Dataset"
        description="İki veri seti üst üste çakışır — tooltip her ikisini gösterir."
        code={`<AreaChart
  labels={MONTHS}
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
          width={560}
          height={200}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* 3 Dataset — Kullanıcı Kanalları */}
      <ShowcaseSection
        title="Kullanıcı Edinme Kanalları — 3 Dataset"
        description="Organik, sosyal ve ücretli kanalların aylık kullanıcı trendi."
        code={`<AreaChart
  labels={MONTHS}
  datasets={[
    { label: "Organik", data: [...] },
    { label: "Sosyal",  data: [...], color: "var(--color-success)" },
    { label: "Ücretli", data: [...], color: "var(--color-warning)" },
  ]}
/>`}
      >
        <AreaChart
          labels={MONTHS}
          datasets={[
            { label: "Organik", data: [1800, 2200, 1900, 2800, 2500, 3400, 3100, 3900, 3600, 4400, 4100, 5200] },
            { label: "Sosyal",  data: [900, 1200, 1050, 1500, 1350, 1900, 1700, 2100, 1950, 2400, 2250, 2800], color: "var(--color-success)" },
            { label: "Ücretli", data: [600, 800, 700, 950, 850, 1200, 1100, 1400, 1300, 1600, 1450, 1800], color: "var(--color-warning)" },
          ]}
          width={560}
          height={200}
          formatValue={(v) => v.toLocaleString() + " kullanıcı"}
        />
      </ShowcaseSection>

      {/* Haftalık Aktif Kullanıcı */}
      <ShowcaseSection
        title="Haftalık Aktif Kullanıcı"
        description="12 haftalık WAU (Weekly Active Users) trendi."
        code={`<AreaChart
  labels={["H1", "H2", ..., "H12"]}
  datasets={[{
    label: "WAU",
    data: [4200, 4800, 4500, 5100, 4900, 5600, 5400, 6100, 5900, 6700, 6500, 7400],
    color: "var(--color-success)",
  }]}
/>`}
      >
        <AreaChart
          labels={WEEKS}
          datasets={[{
            label: "WAU",
            data: [4200, 4800, 4500, 5100, 4900, 5600, 5400, 6100, 5900, 6700, 6500, 7400],
            color: "var(--color-success)",
          }]}
          width={560}
          height={190}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Günlük İşlem Hacmi */}
      <ShowcaseSection
        title="Günlük İşlem Hacmi"
        description="Haftanın günlerine göre işlem hacmi karşılaştırması."
        code={`<AreaChart
  labels={["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]}
  datasets={[
    { label: "Bu Hafta",   data: [1420, 1850, 1680, 2100, 2350, 890, 640] },
    { label: "Geçen Hafta", data: [1200, 1600, 1450, 1900, 2100, 780, 520], color: "var(--color-warning)" },
  ]}
/>`}
      >
        <AreaChart
          labels={DAYS}
          datasets={[
            { label: "Bu Hafta",    data: [1420, 1850, 1680, 2100, 2350, 890, 640] },
            { label: "Geçen Hafta", data: [1200, 1600, 1450, 1900, 2100, 780, 520], color: "var(--color-warning)" },
          ]}
          width={480}
          height={190}
          formatValue={(v) => v.toLocaleString() + " işlem"}
        />
      </ShowcaseSection>

      {/* Sunucu CPU — Saatlik */}
      <ShowcaseSection
        title="Sunucu CPU Kullanımı — Saatlik"
        description="24 saatlik CPU ve RAM kullanım grafiği. Pik saatler görünür."
        code={`<AreaChart
  labels={hourLabels}
  datasets={[
    { label: "CPU %", data: [...] },
    { label: "RAM %", data: [...], color: "var(--color-warning)" },
  ]}
  formatValue={(v) => v + "%"}
/>`}
      >
        <AreaChart
          labels={HOURS}
          datasets={[
            { label: "CPU %", data: [12, 15, 11, 8, 7, 9, 18, 42, 65, 78, 72, 68, 75, 71, 80, 74, 69, 55, 42, 38, 32, 28, 20, 14] },
            { label: "RAM %", data: [55, 54, 52, 51, 50, 51, 56, 62, 70, 74, 72, 71, 73, 72, 76, 74, 71, 68, 65, 63, 61, 60, 58, 56], color: "var(--color-warning)" },
          ]}
          width={620}
          height={190}
          formatValue={(v) => v + "%"}
        />
      </ShowcaseSection>

      {/* Noktasız / Grid'siz */}
      <ShowcaseSection
        title="Görünüm Seçenekleri"
        description="dots ve grid prop'ları ile görünüm özelleştirilebilir."
        code={`<AreaChart datasets={[...]} dots={false} grid={false} />   {/* minimal */}
<AreaChart datasets={[...]} dots={true}  grid={true}  />   {/* tam    */}`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div>
            <AreaChart
              labels={MONTHS}
              datasets={[{ label: "Kullanıcılar", data: [820, 940, 880, 1120, 1050, 1340, 1240, 1500, 1420, 1680, 1560, 1900] }]}
              width={280}
              height={160}
              dots={false}
              grid={false}
              formatValue={(v) => v.toLocaleString()}
            />
            <p className="text-[10px] text-foreground-muted text-center mt-1">dots=false, grid=false</p>
          </div>
          <div>
            <AreaChart
              labels={MONTHS}
              datasets={[{ label: "Oturum", data: [1200, 1450, 1320, 1680, 1580, 1940, 1820, 2100, 1980, 2280, 2150, 2500], color: "var(--color-success)" }]}
              width={280}
              height={160}
              dots={true}
              grid={true}
              gridLines={3}
              formatValue={(v) => v.toLocaleString()}
            />
            <p className="text-[10px] text-foreground-muted text-center mt-1">dots=true, grid=true, gridLines=3</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* fillOpacity Karşılaştırması */}
      <ShowcaseSection
        title="Fill Opacity Karşılaştırması"
        description="fillOpacity prop ile dolgu saydamlığı ayarlanabilir."
        code={`<AreaChart datasets={[{ label: "Yüksek", data: [...], fillOpacity: 0.4 }]} />
<AreaChart datasets={[{ label: "Düşük",  data: [...], fillOpacity: 0.08 }]} />`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          {[
            { opacity: 0.05, label: "fillOpacity=0.05" },
            { opacity: 0.2,  label: "fillOpacity=0.2 (varsayılan)" },
            { opacity: 0.45, label: "fillOpacity=0.45" },
          ].map(({ opacity, label }) => (
            <div key={label}>
              <AreaChart
                labels={["Oca", "Şub", "Mar", "Nis", "May", "Haz"]}
                datasets={[{ label: "Değer", data: [3200, 4100, 3800, 5200, 4700, 6100], fillOpacity: opacity }]}
                width={200}
                height={130}
                formatValue={(v) => v.toLocaleString()}
              />
              <p className="text-[10px] text-foreground-muted text-center mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
