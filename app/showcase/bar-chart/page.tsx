"use client";

import { BarChart } from "@/components/ui/bar-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const MONTHS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export default function BarChartShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Bar Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG sütun grafiği · gruplandırılmış dataset · hover tooltip · negatif değerler · özelleştirilebilir
        </p>
      </div>

      {/* Tek Dataset — Aylık Satış */}
      <ShowcaseSection
        title="Aylık Satış"
        description="Hover ile sütun üzerinde değer tooltip'i gösterilir."
        code={`<BarChart
  labels={["Oca", "Şub", "Mar", ...]}
  datasets={[{ label: "Satış", data: [4200, 5800, 4900, ...] }]}
  formatValue={(v) => "$" + v.toLocaleString()}
/>`}
      >
        <BarChart
          labels={MONTHS}
          datasets={[{ label: "Satış", data: [4200, 5800, 4900, 7100, 6500, 8300, 7800, 9100, 8600, 10200, 9400, 11800] }]}
          width={580}
          height={220}
          formatValue={(v) => "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Gruplandırılmış — 2 Dataset */}
      <ShowcaseSection
        title="Gruplandırılmış — Yıl Karşılaştırması"
        description="Birden fazla dataset gruplanmış sütunlar olarak gösterilir. Legend otomatik oluşur."
        code={`<BarChart
  labels={["Q1", "Q2", "Q3", "Q4"]}
  datasets={[
    { label: "2025", data: [42000, 58000, 71000, 93000] },
    { label: "2024", data: [31000, 44000, 55000, 72000] },
  ]}
  formatValue={(v) => "$" + (v / 1000).toFixed(0) + "K"}
/>`}
      >
        <BarChart
          labels={QUARTERS}
          datasets={[
            { label: "2025", data: [42000, 58000, 71000, 93000] },
            { label: "2024", data: [31000, 44000, 55000, 72000] },
          ]}
          width={480}
          height={220}
          formatValue={(v) => "$" + (v / 1000).toFixed(0) + "K"}
        />
      </ShowcaseSection>

      {/* 3 Dataset — Kanal Karşılaştırması */}
      <ShowcaseSection
        title="3 Dataset — Kanal Bazlı Gelir"
        description="Web, mobil ve API kanallarının aylık gelir karşılaştırması."
        code={`<BarChart
  labels={MONTHS}
  datasets={[
    { label: "Web",    data: [...] },
    { label: "Mobil",  data: [...], color: "var(--color-success)" },
    { label: "API",    data: [...], color: "var(--color-warning)" },
  ]}
/>`}
      >
        <BarChart
          labels={["Oca", "Şub", "Mar", "Nis", "May", "Haz"]}
          datasets={[
            { label: "Web",   data: [3200, 4100, 3800, 5200, 4700, 6100] },
            { label: "Mobil", data: [1800, 2400, 2100, 3100, 2900, 3800], color: "var(--color-success)" },
            { label: "API",   data: [900, 1200, 1100, 1600, 1400, 1900], color: "var(--color-warning)" },
          ]}
          width={560}
          height={220}
          formatValue={(v) => "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Haftalık Aktivite */}
      <ShowcaseSection
        title="Haftalık Aktivite"
        description="Gün bazlı işlem sayısı — sade tek renk."
        code={`<BarChart
  labels={["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"]}
  datasets={[{ label: "İşlem", data: [140, 220, 190, 280, 310, 95, 60] }]}
  radius={6}
/>`}
      >
        <BarChart
          labels={DAYS}
          datasets={[{ label: "İşlem", data: [140, 220, 190, 280, 310, 95, 60] }]}
          width={420}
          height={180}
          radius={6}
          formatValue={(v) => v + " işlem"}
        />
      </ShowcaseSection>

      {/* Negatif Değerler — Kâr/Zarar */}
      <ShowcaseSection
        title="Negatif Değerler — Kâr / Zarar"
        description="Sıfır çizgisi otomatik eklenir, pozitif ve negatif sütunlar ayrı yönde çizilir."
        code={`<BarChart
  labels={MONTHS}
  datasets={[{
    label: "Net Kâr",
    data: [1200, -400, 800, 2100, -200, 1600, 3100, 2400, -800, 1900, 2800, 4200],
    color: "var(--color-success)",
  }]}
/>`}
      >
        <BarChart
          labels={MONTHS}
          datasets={[{
            label: "Net Kâr",
            data: [1200, -400, 800, 2100, -200, 1600, 3100, 2400, -800, 1900, 2800, 4200],
            color: "var(--color-success)",
          }]}
          width={580}
          height={220}
          formatValue={(v) => (v >= 0 ? "+" : "") + "$" + v.toLocaleString()}
        />
      </ShowcaseSection>

      {/* Departman Karşılaştırması */}
      <ShowcaseSection
        title="Departman Hedef Gerçekleşme"
        description="Hedef ve gerçekleşme değerlerini yan yana karşılaştırma."
        code={`<BarChart
  labels={["Satış", "Pazarlama", "Ürün", "Destek", "Finans"]}
  datasets={[
    { label: "Hedef",        data: [100, 85, 90, 75, 95] },
    { label: "Gerçekleşme", data: [87, 92, 78, 88, 102], color: "var(--color-success)" },
  ]}
  formatValue={(v) => v + "%"}
/>`}
      >
        <BarChart
          labels={["Satış", "Pazarlama", "Ürün", "Destek", "Finans"]}
          datasets={[
            { label: "Hedef",        data: [100, 85, 90, 75, 95] },
            { label: "Gerçekleşme", data: [87, 92, 78, 88, 102], color: "var(--color-success)" },
          ]}
          width={480}
          height={220}
          formatValue={(v) => v + "%"}
        />
      </ShowcaseSection>

      {/* Renk Temaları */}
      <ShowcaseSection
        title="Renk Temaları"
        description="color prop ile her dataset için özel renk atanabilir."
        code={`<BarChart datasets={[{ label: "Değer", data: [...], color: "var(--color-danger)" }]} />`}
      >
        <div className="flex flex-wrap gap-8 items-end">
          {[
            { color: "var(--color-primary)", label: "Primary" },
            { color: "var(--color-success)", label: "Success" },
            { color: "var(--color-warning)", label: "Warning" },
            { color: "var(--color-danger)",  label: "Danger" },
            { color: "#8b5cf6",              label: "Violet" },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <BarChart
                labels={DAYS}
                datasets={[{ label, data: [4, 7, 5, 9, 6, 3, 8], color }]}
                width={160}
                height={100}
                formatValue={(v) => String(v)}
                padding={{ left: 8, right: 4, top: 8, bottom: 20 }}
              />
              <p className="text-[10px] text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
