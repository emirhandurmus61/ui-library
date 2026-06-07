"use client";

import { useState } from "react";
import { DonutChart } from "@/components/ui/donut-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const TRAFFIC = [
  { label: "Organik", value: 4200 },
  { label: "Sosyal",  value: 1800 },
  { label: "Direkt",  value: 1200 },
  { label: "Referans", value: 800 },
  { label: "E-posta", value: 500 },
];

const BUDGET = [
  { label: "Pazarlama", value: 35, color: "#8b5cf6" },
  { label: "Ürün",      value: 28, color: "var(--color-primary)" },
  { label: "İK",        value: 20, color: "var(--color-success)" },
  { label: "Altyapı",   value: 17, color: "var(--color-warning)" },
];

const REVENUE = [
  { label: "SaaS",      value: 58000, color: "var(--color-primary)" },
  { label: "Danışmanlık", value: 22000, color: "#8b5cf6" },
  { label: "Destek",    value: 14000, color: "var(--color-success)" },
  { label: "Eğitim",    value: 9000,  color: "var(--color-warning)" },
  { label: "Diğer",     value: 4000,  color: "var(--color-danger)" },
];

const DEVICES = [
  { label: "Masaüstü", value: 48, color: "var(--color-primary)" },
  { label: "Mobil",    value: 38, color: "#8b5cf6" },
  { label: "Tablet",   value: 14, color: "var(--color-warning)" },
];

const OS_DATA = [
  { label: "Windows", value: 41 },
  { label: "macOS",   value: 28 },
  { label: "iOS",     value: 16 },
  { label: "Android", value: 11 },
  { label: "Linux",   value: 4 },
];

export default function DonutChartShowcase() {
  const [activeRevenue, setActiveRevenue] = useState<number | null>(null);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Donut Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG doughnut · hover highlight · merkez slot · legend · özel renkler · çoklu kullanım senaryoları
        </p>
      </div>

      {/* Trafik Kaynakları */}
      <ShowcaseSection
        title="Trafik Kaynakları"
        description="Segment üzerine gelin — hover'da detay gösterilir, legend ile hover bağlantılı."
        code={`<DonutChart
  data={[
    { label: "Organik", value: 4200 },
    { label: "Sosyal",  value: 1800 },
    { label: "Direkt",  value: 1200 },
    { label: "Referans", value: 800 },
    { label: "E-posta", value: 500 },
  ]}
  radius={90}
  thickness={22}
/>`}
      >
        <DonutChart data={TRAFFIC} radius={90} thickness={22} />
      </ShowcaseSection>

      {/* Gelir Dağılımı — Merkez Slot */}
      <ShowcaseSection
        title="Gelir Dağılımı — Merkez Slot"
        description="center prop ile merkeze özel içerik koyulabilir. Toplam, oran veya ikon eklenebilir."
        code={`<DonutChart
  data={REVENUE}
  center={
    <div className="text-center">
      <p className="text-[10px] text-foreground-muted">Toplam</p>
      <p className="text-lg font-bold">$107K</p>
      <p className="text-[10px] text-foreground-muted">Bu ay</p>
    </div>
  }
/>`}
      >
        <DonutChart
          data={REVENUE}
          radius={90}
          thickness={20}
          formatValue={(v, t) => "$" + (v / 1000).toFixed(0) + "K (" + Math.round((v / t) * 100) + "%)"}
          center={
            <div className="text-center">
              <p className="text-[10px] text-foreground-muted">Toplam Gelir</p>
              <p className="text-lg font-bold text-foreground">$107K</p>
              <p className="text-[10px] text-foreground-muted">Bu ay</p>
            </div>
          }
        />
      </ShowcaseSection>

      {/* Bütçe Dağılımı */}
      <ShowcaseSection
        title="Bütçe Dağılımı — Özel Renkler"
        description="Her segment için color prop ile özel renk tanımlanabilir."
        code={`<DonutChart
  data={[
    { label: "Pazarlama", value: 35, color: "#8b5cf6" },
    { label: "Ürün",      value: 28, color: "var(--color-primary)" },
    { label: "İK",        value: 20, color: "var(--color-success)" },
    { label: "Altyapı",   value: 17, color: "var(--color-warning)" },
  ]}
  formatValue={(v, t) => Math.round((v/t)*100) + "%"}
/>`}
      >
        <DonutChart
          data={BUDGET}
          radius={85}
          thickness={18}
          formatValue={(v, t) => Math.round((v / t) * 100) + "%"}
          center={
            <div className="text-center">
              <p className="text-[10px] text-foreground-muted">Toplam</p>
              <p className="text-lg font-bold text-foreground">$240K</p>
            </div>
          }
        />
      </ShowcaseSection>

      {/* Cihaz Dağılımı */}
      <ShowcaseSection
        title="Cihaz Dağılımı"
        description="Masaüstü, mobil ve tablet trafik oranlarının görselleştirilmesi."
        code={`<DonutChart
  data={[
    { label: "Masaüstü", value: 48, color: "var(--color-primary)" },
    { label: "Mobil",    value: 38, color: "#8b5cf6" },
    { label: "Tablet",   value: 14, color: "var(--color-warning)" },
  ]}
  formatValue={(v, t) => Math.round((v / t) * 100) + "%"}
/>`}
      >
        <DonutChart
          data={DEVICES}
          radius={85}
          thickness={24}
          formatValue={(v, t) => Math.round((v / t) * 100) + "%"}
          center={
            <div className="text-center">
              <p className="text-[10px] text-foreground-muted">Cihaz</p>
              <p className="text-base font-bold text-foreground">Mix</p>
            </div>
          }
        />
      </ShowcaseSection>

      {/* İşletim Sistemi */}
      <ShowcaseSection
        title="İşletim Sistemi Dağılımı"
        description="Çok segmentli dağılım — legend ile tüm kategoriler listelenir."
        code={`<DonutChart
  data={[
    { label: "Windows", value: 41 },
    { label: "macOS",   value: 28 },
    { label: "iOS",     value: 16 },
    { label: "Android", value: 11 },
    { label: "Linux",   value: 4 },
  ]}
/>`}
      >
        <DonutChart
          data={OS_DATA}
          radius={90}
          thickness={20}
          formatValue={(v, t) => Math.round((v / t) * 100) + "%"}
        />
      </ShowcaseSection>

      {/* Thickness Varyasyonları */}
      <ShowcaseSection
        title="Thickness Varyasyonları"
        description="thickness prop ile halka kalınlığı kontrol edilir. Küçük thickness'ta pie chart görünümüne yaklaşır."
        code={`<DonutChart data={data} thickness={6} />   {/* ince    */}
<DonutChart data={data} thickness={20} />  {/* normal  */}
<DonutChart data={data} thickness={36} />  {/* kalın   */}`}
      >
        <div className="flex flex-wrap gap-10 items-start">
          {[
            { thickness: 6,  label: "thickness=6 (ince)" },
            { thickness: 20, label: "thickness=20 (normal)" },
            { thickness: 36, label: "thickness=36 (kalın)" },
          ].map(({ thickness, label }) => (
            <div key={thickness} className="text-center">
              <DonutChart data={TRAFFIC} radius={70} thickness={thickness} legend={false} />
              <p className="text-[10px] text-foreground-muted mt-2">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* İkili Donut — Dashboard */}
      <ShowcaseSection
        title="Dashboard Paneli — Yan Yana"
        description="Birden fazla DonutChart yan yana dashboard metriği olarak."
        code={`<div className="flex gap-8">
  <DonutChart data={TRAFFIC} radius={60} thickness={14} />
  <DonutChart data={DEVICES} radius={60} thickness={14} />
  <DonutChart data={BUDGET}  radius={60} thickness={14} />
</div>`}
      >
        <div className="flex flex-wrap gap-8 justify-center">
          {[
            { data: TRAFFIC, label: "Trafik" },
            { data: DEVICES, label: "Cihaz" },
            { data: BUDGET,  label: "Bütçe" },
          ].map(({ data, label }) => (
            <div key={label} className="text-center">
              <DonutChart data={data} radius={65} thickness={14} legend={false} />
              <p className="text-xs font-medium text-foreground-muted mt-2">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Özel formatValue */}
      <ShowcaseSection
        title="Özel Değer Formatı"
        description="formatValue prop ile tooltip ve etiket formatı tam kontrol."
        code={`<DonutChart
  data={REVENUE}
  formatValue={(v, total) =>
    "$" + (v / 1000).toFixed(1) + "K — " + Math.round((v / total) * 100) + "%"
  }
/>`}
      >
        <DonutChart
          data={REVENUE}
          radius={90}
          thickness={20}
          formatValue={(v, t) => "$" + (v / 1000).toFixed(1) + "K — " + Math.round((v / t) * 100) + "%"}
        />
      </ShowcaseSection>
    </div>
  );
}
