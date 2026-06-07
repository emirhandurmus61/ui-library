"use client";

import { LineChart } from "@/components/ui/line-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const WEEKS = Array.from({ length: 12 }, (_, i) => `H${i + 1}`);
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function LineChartShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Line Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG çizgi grafiği · smooth bezier · multi-dataset · dashed · filled · hover tooltip · null değer desteği
        </p>
      </div>

      {/* Tek Dataset */}
      <ShowcaseSection
        title="Gelir Trendi"
        description="Hover ile veri noktası tooltip'i gösterilir. Smooth bezier eğrisi varsayılan."
        code={`<LineChart
  labels={["Oca", "Şub", "Mar", ...]}
  datasets={[{ label: "Gelir", data: [4200, 5800, 4900, 7100, ...] }]}
  formatValue={(v) => "$" + v.toLocaleString()}
/>`}
      >
        <LineChart
          labels={MONTHS}
          datasets={[{ label: "Gelir", data: [4200, 5800, 4900, 7100, 6500, 8300, 7800, 9100, 8600, 10200, 9400, 11800] }]}
          width={560}
          height={220}
          formatValue={(v) => "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Multi Dataset */}
      <ShowcaseSection
        title="Çoklu Dataset — Kanal Karşılaştırması"
        description="Birden fazla veri serisi aynı eksende. Legend otomatik oluşur."
        code={`<LineChart
  labels={MONTHS}
  datasets={[
    { label: "Organik",   data: [...] },
    { label: "Sosyal",    data: [...], color: "#8b5cf6" },
    { label: "Direkt",    data: [...], color: "var(--color-warning)" },
  ]}
/>`}
      >
        <LineChart
          labels={MONTHS}
          datasets={[
            { label: "Organik", data: [2800, 3200, 2900, 4100, 3800, 5100, 4700, 5900, 5400, 6800, 6200, 7800] },
            { label: "Sosyal",  data: [1200, 1800, 1500, 2300, 2100, 2800, 2600, 3200, 3000, 3700, 3400, 4300], color: "#8b5cf6" },
            { label: "Direkt",  data: [800, 950, 880, 1100, 1020, 1350, 1250, 1520, 1420, 1680, 1580, 1900], color: "var(--color-warning)" },
          ]}
          width={560}
          height={220}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Yıl Karşılaştırması — Dashed */}
      <ShowcaseSection
        title="Yıl Karşılaştırması — Kesikli Çizgi"
        description="dashed prop ile önceki dönem kesikli, mevcut dönem düz çizgiyle gösterilir."
        code={`<LineChart
  labels={MONTHS}
  datasets={[
    { label: "2025", data: [...] },
    { label: "2024", data: [...], dashed: true, color: "var(--color-primary)" },
  ]}
/>`}
      >
        <LineChart
          labels={MONTHS}
          datasets={[
            { label: "2025", data: [3100, 4200, 3800, 5200, 4700, 6100, 5600, 7200, 6800, 8100, 7400, 9200] },
            { label: "2024", data: [2400, 3100, 2800, 3900, 3500, 4600, 4200, 5300, 5000, 6100, 5600, 7000], dashed: true, color: "var(--color-primary)" },
          ]}
          width={560}
          height={220}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Filled Area */}
      <ShowcaseSection
        title="Filled Area"
        description="filled prop ile çizginin altı dolgu ile kaplanır."
        code={`<LineChart
  labels={MONTHS}
  datasets={[
    { label: "Aktif Kullanıcı", data: [...], filled: true },
    { label: "Yeni Kullanıcı",  data: [...], filled: true, color: "var(--color-success)" },
  ]}
/>`}
      >
        <LineChart
          labels={MONTHS}
          datasets={[
            { label: "Aktif Kullanıcı", data: [4200, 4800, 4400, 5600, 5200, 6400, 6000, 7200, 6800, 8100, 7600, 9000], filled: true, fillOpacity: 0.15 },
            { label: "Yeni Kullanıcı",  data: [820, 940, 880, 1120, 1050, 1340, 1240, 1500, 1420, 1680, 1560, 1900], filled: true, color: "var(--color-success)", fillOpacity: 0.15 },
          ]}
          width={560}
          height={220}
          formatValue={(v) => v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Null değer — eksik veri */}
      <ShowcaseSection
        title="Eksik / Boş Veri"
        description="null değerler grafik çizgisinde boşluk bırakır. Kesintili veri setlerini modellemek için kullanılır."
        code={`<LineChart
  labels={WEEKS}
  datasets={[{
    label: "Uptime",
    data: [99.9, 99.8, null, null, 98.2, 99.5, 99.9, 99.7, null, 99.1, 99.8, 99.9],
  }]}
  formatValue={(v) => v + "%"}
/>`}
      >
        <LineChart
          labels={WEEKS}
          datasets={[{
            label: "Uptime",
            data: [99.9, 99.8, null, null, 98.2, 99.5, 99.9, 99.7, null, 99.1, 99.8, 99.9],
            color: "var(--color-success)",
          }]}
          width={560}
          height={200}
          formatValue={(v) => v + "%"}
          padding={{ left: 44, top: 16, bottom: 36, right: 16 }}
        />
      </ShowcaseSection>

      {/* Noktasız / Düz çizgi */}
      <ShowcaseSection
        title="Minimal — Noktasız & Grid'siz"
        code={`<LineChart
  datasets={[...]}
  dots={false}
  grid={false}
  smooth={false}
/>`}
      >
        <div className="flex flex-wrap gap-8 items-start">
          <div>
            <LineChart
              labels={MONTHS}
              datasets={[{ label: "Satış", data: [420, 580, 490, 710, 650, 830, 780, 910, 860, 1020, 940, 1180] }]}
              width={280}
              height={160}
              dots={false}
              grid={false}
            />
            <p className="text-[10px] text-foreground-muted text-center mt-1">dots=false, grid=false</p>
          </div>
          <div>
            <LineChart
              labels={MONTHS}
              datasets={[{ label: "Kullanıcı", data: [820, 940, 880, 1120, 1050, 1340, 1240, 1500, 1420, 1680, 1560, 1900] }]}
              width={280}
              height={160}
              dots={false}
              smooth={false}
            />
            <p className="text-[10px] text-foreground-muted text-center mt-1">smooth=false (linear)</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Haftalık Stres Testi */}
      <ShowcaseSection
        title="Anlık Sunucu Metrikleri"
        description="CPU, RAM ve ağ trafik verilerini aynı anda karşılaştırma."
        code={`<LineChart
  labels={DAYS}
  datasets={[
    { label: "CPU %",    data: [45, 68, 55, 82, 74, 38, 29] },
    { label: "RAM %",    data: [62, 71, 67, 79, 75, 58, 52], color: "var(--color-warning)" },
    { label: "Network",  data: [22, 45, 31, 67, 58, 18, 12], color: "var(--color-danger)" },
  ]}
  formatValue={(v) => v + "%"}
/>`}
      >
        <LineChart
          labels={DAYS}
          datasets={[
            { label: "CPU %",   data: [45, 68, 55, 82, 74, 38, 29] },
            { label: "RAM %",   data: [62, 71, 67, 79, 75, 58, 52], color: "var(--color-warning)" },
            { label: "Network", data: [22, 45, 31, 67, 58, 18, 12], color: "var(--color-danger)" },
          ]}
          width={480}
          height={220}
          formatValue={(v) => v + "%"}
        />
      </ShowcaseSection>
    </div>
  );
}
