"use client";

import { RadarChart } from "@/components/ui/radar-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const SKILLS = ["JavaScript", "TypeScript", "React", "Node.js", "CSS", "Testing"];
const PRODUCT_AXES = ["Kullanım Kolaylığı", "Performans", "Güvenlik", "Destek", "Fiyat", "Entegrasyon"];
const TEAM_AXES = ["Hız", "Kalite", "İletişim", "Yaratıcılık", "Güvenilirlik", "Uyum"];

export default function RadarChartShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Radar Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG örümcek ağı grafiği · multi-dataset · hover highlight · özelleştirilebilir eksenler ve halkalar
        </p>
      </div>

      {/* Beceri Profili */}
      <ShowcaseSection
        title="Geliştirici Beceri Profili"
        description="Tek dataset ile altıgen radar. Hover ile dolgu belirginleşir."
        code={`<RadarChart
  axes={["JavaScript", "TypeScript", "React", "Node.js", "CSS", "Testing"]}
  datasets={[{ label: "Emirhan", data: [90, 85, 95, 75, 80, 70] }]}
/>`}
      >
        <RadarChart
          axes={SKILLS}
          datasets={[{ label: "Emirhan", data: [90, 85, 95, 75, 80, 70] }]}
          radius={110}
        />
      </ShowcaseSection>

      {/* Ürün Karşılaştırması */}
      <ShowcaseSection
        title="Ürün Karşılaştırması"
        description="İki ürünü çok boyutlu olarak karşılaştır. Legend ile hover bağlantılı."
        code={`<RadarChart
  axes={["Kullanım Kolaylığı", "Performans", "Güvenlik", "Destek", "Fiyat", "Entegrasyon"]}
  datasets={[
    { label: "Ürün A", data: [85, 92, 78, 70, 60, 88] },
    { label: "Ürün B", data: [70, 80, 90, 88, 95, 72], color: "var(--color-success)" },
  ]}
/>`}
      >
        <RadarChart
          axes={PRODUCT_AXES}
          datasets={[
            { label: "Ürün A", data: [85, 92, 78, 70, 60, 88] },
            { label: "Ürün B", data: [70, 80, 90, 88, 95, 72], color: "var(--color-success)" },
          ]}
          radius={110}
        />
      </ShowcaseSection>

      {/* 3 Dataset — Takım Değerlendirmesi */}
      <ShowcaseSection
        title="Takım Performans Değerlendirmesi"
        description="Üç takımın kriter bazlı karşılaştırması."
        code={`<RadarChart
  axes={["Hız", "Kalite", "İletişim", "Yaratıcılık", "Güvenilirlik", "Uyum"]}
  datasets={[
    { label: "Backend",  data: [78, 92, 70, 65, 95, 80] },
    { label: "Frontend", data: [85, 88, 90, 92, 82, 88], color: "var(--color-success)" },
    { label: "DevOps",   data: [92, 80, 75, 60, 98, 85], color: "var(--color-warning)" },
  ]}
/>`}
      >
        <RadarChart
          axes={TEAM_AXES}
          datasets={[
            { label: "Backend",  data: [78, 92, 70, 65, 95, 80] },
            { label: "Frontend", data: [85, 88, 90, 92, 82, 88], color: "var(--color-success)" },
            { label: "DevOps",   data: [92, 80, 75, 60, 98, 85], color: "var(--color-warning)" },
          ]}
          radius={110}
        />
      </ShowcaseSection>

      {/* Özel formatValue */}
      <ShowcaseSection
        title="Özel Değer Formatı & Boyut"
        description="formatValue ve radius prop'ları ile boyut ve etiket formatı özelleştirilebilir."
        code={`<RadarChart
  axes={["UX", "Perf", "A11y", "SEO", "PWA", "BP"]}
  datasets={[{ label: "Score", data: [95, 88, 79, 92, 70, 85] }]}
  radius={80}
  formatValue={(v) => v + "pt"}
/>`}
      >
        <div className="flex flex-wrap gap-10 items-start justify-center">
          <div className="text-center">
            <RadarChart
              axes={["UX", "Perf", "A11y", "SEO", "PWA", "BP"]}
              datasets={[{ label: "Score", data: [95, 88, 79, 92, 70, 85] }]}
              radius={80}
              formatValue={(v) => v + "pt"}
            />
            <p className="text-[10px] text-foreground-muted mt-1">radius=80</p>
          </div>
          <div className="text-center">
            <RadarChart
              axes={["UX", "Perf", "A11y", "SEO", "PWA", "BP"]}
              datasets={[
                { label: "v1.0", data: [72, 65, 58, 80, 50, 70] },
                { label: "v2.0", data: [95, 88, 79, 92, 70, 85], color: "var(--color-success)" },
              ]}
              radius={80}
              formatValue={(v) => v + "pt"}
            />
            <p className="text-[10px] text-foreground-muted mt-1">Sürüm karşılaştırması</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 5 Eksen — Pazarlama Mix */}
      <ShowcaseSection
        title="5 Boyutlu — Pazarlama Kanalı Analizi"
        description="Beş kanallı pazarlama mix performansı."
        code={`<RadarChart
  axes={["Erişim", "Etkileşim", "Dönüşüm", "ROI", "Marka"]}
  datasets={[
    { label: "SEO",    data: [90, 65, 55, 80, 70] },
    { label: "Paid",   data: [95, 55, 75, 60, 50], color: "var(--color-danger)" },
    { label: "Social", data: [75, 92, 45, 55, 88], color: "#8b5cf6" },
  ]}
/>`}
      >
        <RadarChart
          axes={["Erişim", "Etkileşim", "Dönüşüm", "ROI", "Marka"]}
          datasets={[
            { label: "SEO",    data: [90, 65, 55, 80, 70] },
            { label: "Paid",   data: [95, 55, 75, 60, 50], color: "var(--color-danger)" },
            { label: "Social", data: [75, 92, 45, 55, 88], color: "#8b5cf6" },
          ]}
          radius={110}
        />
      </ShowcaseSection>
    </div>
  );
}
