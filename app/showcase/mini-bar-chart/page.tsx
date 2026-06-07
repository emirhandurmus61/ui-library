"use client";

import { MiniBarChart } from "@/components/ui/mini-bar-chart";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const WEEKLY = [12, 28, 18, 35, 22, 40, 31];
const MONTHLY = [
  { value: 45, label: "Oca" }, { value: 62, label: "Şub" }, { value: 38, label: "Mar" },
  { value: 71, label: "Nis" }, { value: 55, label: "May" }, { value: 83, label: "Haz" },
  { value: 67, label: "Tem" }, { value: 79, label: "Ağu" }, { value: 91, label: "Eyl" },
  { value: 74, label: "Eki" }, { value: 88, label: "Kas" }, { value: 95, label: "Ara" },
];
const DAILY_USERS = [820, 1240, 980, 1560, 1380, 640, 480];
const HOURLY = [12, 8, 6, 4, 5, 9, 18, 42, 68, 74, 70, 66, 72, 68, 78, 74, 65, 52, 40, 35, 28, 22, 18, 14];

export default function MiniBarChartShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Mini Bar Chart</h1>
        <p className="text-sm text-foreground-muted">
          Kompakt SVG sütun grafiği · hover tooltip · renk özelleştirme · StatCard uyumlu · inline kullanım
        </p>
      </div>

      {/* Temel */}
      <ShowcaseSection
        title="Temel — Haftalık & Aylık"
        description="Hover ile bar üzerinde değer tooltip'i gösterilir. label varsa tooltip'e eklenir."
        code={`<MiniBarChart data={[12, 28, 18, 35, 22, 40, 31]} width={140} height={48} />
<MiniBarChart data={[{ value: 45, label: "Oca" }, ...]} width={240} height={60} />`}
      >
        <div className="flex flex-wrap gap-8 items-end">
          <div className="text-center">
            <MiniBarChart data={WEEKLY} width={140} height={48} />
            <p className="text-xs text-foreground-muted mt-1">Haftalık (sayı dizisi)</p>
          </div>
          <div className="text-center">
            <MiniBarChart data={MONTHLY} width={240} height={60} />
            <p className="text-xs text-foreground-muted mt-1">Aylık (label tooltip)</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Günlük Kullanıcı */}
      <ShowcaseSection
        title="Günlük Aktif Kullanıcı"
        description="Haftanın günlerine göre DAU görselleştirmesi."
        code={`<MiniBarChart
  data={[
    { value: 820,  label: "Pzt" },
    { value: 1240, label: "Sal" },
    { value: 980,  label: "Çar" },
    ...
  ]}
  width={200}
  height={56}
  color="var(--color-success)"
  formatValue={(v) => v.toLocaleString() + " kullanıcı"}
/>`}
      >
        <div className="text-center">
          <MiniBarChart
            data={[
              { value: 820,  label: "Pzt" },
              { value: 1240, label: "Sal" },
              { value: 980,  label: "Çar" },
              { value: 1560, label: "Per" },
              { value: 1380, label: "Cum" },
              { value: 640,  label: "Cmt" },
              { value: 480,  label: "Paz" },
            ]}
            width={200}
            height={56}
            color="var(--color-success)"
            formatValue={(v) => v.toLocaleString() + " kullanıcı"}
          />
          <p className="text-xs text-foreground-muted mt-1">DAU — Son 7 gün</p>
        </div>
      </ShowcaseSection>

      {/* Saatlik CPU */}
      <ShowcaseSection
        title="Saatlik CPU Kullanımı"
        description="24 saatlik CPU verisi — yoğun saatler görsel olarak öne çıkar."
        code={`<MiniBarChart
  data={hourlyData}
  width={320}
  height={48}
  color="var(--color-warning)"
  formatValue={(v) => v + "%"}
/>`}
      >
        <div className="text-center">
          <MiniBarChart data={HOURLY} width={360} height={52} color="var(--color-warning)" formatValue={(v) => v + "%"} />
          <p className="text-xs text-foreground-muted mt-1">CPU% — 00:00–23:00</p>
        </div>
      </ShowcaseSection>

      {/* Renkler */}
      <ShowcaseSection
        title="Renk Varyasyonları"
        description="color prop ile bar rengi, highlightColor ile hover rengi değiştirilebilir."
        code={`<MiniBarChart data={data} color="var(--color-primary)" />
<MiniBarChart data={data} color="var(--color-success)" />
<MiniBarChart data={data} color="var(--color-warning)" />
<MiniBarChart data={data} color="var(--color-danger)" />
<MiniBarChart data={data} color="#8b5cf6" />`}
      >
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { color: "var(--color-primary)", label: "Primary" },
            { color: "var(--color-success)", label: "Success" },
            { color: "var(--color-warning)", label: "Warning" },
            { color: "var(--color-danger)",  label: "Danger" },
            { color: "#8b5cf6",              label: "Violet" },
            { color: "#06b6d4",              label: "Cyan" },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <MiniBarChart data={WEEKLY} width={100} height={40} color={color} />
              <p className="text-[10px] text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Bar Radius */}
      <ShowcaseSection
        title="Bar Radius"
        description="radius prop ile köşe yuvarlama ayarlanır."
        code={`<MiniBarChart data={data} radius={0} />  {/* keskin */}
<MiniBarChart data={data} radius={4} />  {/* yuvarlak */}
<MiniBarChart data={data} radius={8} />  {/* pill    */}`}
      >
        <div className="flex flex-wrap gap-8 items-end">
          {[0, 3, 6, 10].map((r) => (
            <div key={r} className="text-center">
              <MiniBarChart data={WEEKLY} width={100} height={44} radius={r} />
              <p className="text-[10px] text-foreground-muted mt-1">radius={r}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* StatCard Entegrasyonu */}
      <ShowcaseSection
        title="StatCard Entegrasyonu"
        description="MiniBarChart stat kartların alt kısmında inline trend göstergesi olarak kullanılır."
        code={`<div className="p-4 rounded-xl border border-border bg-surface">
  <p className="text-xs text-foreground-muted">Sipariş</p>
  <p className="text-xl font-bold">1,284</p>
  <MiniBarChart data={weekly} width={160} height={32} tooltip={false} />
</div>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl">
          {[
            { label: "Sipariş",     value: "1,284",  data: WEEKLY,                color: "var(--color-primary)", suffix: "+12%" },
            { label: "Gelir",       value: "$48.2K",  data: MONTHLY.map(m => m.value), color: "var(--color-success)", suffix: "+8.4%" },
            { label: "Kullanıcı",   value: "8,741",  data: DAILY_USERS,           color: "#8b5cf6",              suffix: "+3.1%" },
            { label: "Hata Oranı",  value: "0.42%",  data: [4, 2, 5, 3, 1, 6, 2], color: "var(--color-danger)",  suffix: "-0.1%" },
            { label: "Sayfa Hızı",  value: "1.2s",   data: [8, 6, 9, 5, 7, 4, 6], color: "var(--color-warning)", suffix: "-0.3s" },
            { label: "Dönüşüm",     value: "3.8%",   data: [3, 4, 3, 5, 4, 6, 5], color: "var(--color-success)", suffix: "+0.5%" },
          ].map((card) => (
            <div key={card.label} className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
              <p className="text-xs text-foreground-muted">{card.label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5">{card.value}</p>
              <p className="text-[10px] text-foreground-subtle mt-0.5">{card.suffix}</p>
              <div className="mt-2">
                <MiniBarChart data={card.data} width={160} height={28} color={card.color} tooltip={false} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Gap Varyasyonları */}
      <ShowcaseSection
        title="Gap Ayarı"
        description="gap prop ile barlar arasındaki boşluk kontrol edilir."
        code={`<MiniBarChart data={data} gap={1} />  {/* sık    */}
<MiniBarChart data={data} gap={4} />  {/* geniş  */}`}
      >
        <div className="flex flex-wrap gap-8 items-end">
          {[0, 2, 4, 8].map((g) => (
            <div key={g} className="text-center">
              <MiniBarChart data={MONTHLY.map(m => m.value)} width={160} height={48} gap={g} />
              <p className="text-[10px] text-foreground-muted mt-1">gap={g}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
