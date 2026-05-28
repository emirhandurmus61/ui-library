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

export default function MiniBarChartShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Mini Bar Chart</h1>
        <p className="text-sm text-foreground-muted">
          SVG sütun grafiği · hover tooltip · renk özelleştirme · StatCard uyumlu
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Hover ile bar üzerinde değer tooltip'i gösterilir."
        code={`<MiniBarChart data={[12, 28, 18, 35, 22, 40, 31]} width={140} height={48} />`}
      >
        <div className="flex flex-wrap gap-8 items-end">
          <div className="text-center">
            <MiniBarChart data={WEEKLY} width={140} height={48} />
            <p className="text-xs text-foreground-muted mt-1">Haftalık</p>
          </div>
          <div className="text-center">
            <MiniBarChart data={MONTHLY} width={240} height={60} />
            <p className="text-xs text-foreground-muted mt-1">Aylık (label tooltip)</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Renkler"
        code={`<MiniBarChart data={data} color="var(--color-success)" />
<MiniBarChart data={data} color="var(--color-warning)" />
<MiniBarChart data={data} color="var(--color-danger)" />`}
      >
        <div className="flex flex-wrap gap-6 items-end">
          {[
            { color: "var(--color-primary)", label: "Primary" },
            { color: "var(--color-success)", label: "Success" },
            { color: "var(--color-warning)", label: "Warning" },
            { color: "var(--color-danger)",  label: "Danger"  },
          ].map(({ color, label }) => (
            <div key={label} className="text-center">
              <MiniBarChart data={WEEKLY} width={100} height={40} color={color} />
              <p className="text-xs text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="StatCard Entegrasyonu"
        code={`<StatCard>
  <p>{value}</p>
  <MiniBarChart data={weekly} width={80} height={32} tooltip={false} />
</StatCard>`}
      >
        <div className="grid grid-cols-2 gap-4 max-w-sm">
          {[
            { label: "Sipariş", value: "1,284", data: WEEKLY },
            { label: "Ziyaretçi", value: "8,741", data: MONTHLY.map(m => m.value) },
          ].map((card) => (
            <div key={card.label} className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
              <p className="text-xs text-foreground-muted">{card.label}</p>
              <p className="text-xl font-bold text-foreground mt-0.5">{card.value}</p>
              <div className="mt-2">
                <MiniBarChart data={card.data} width={160} height={32} tooltip={false} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
