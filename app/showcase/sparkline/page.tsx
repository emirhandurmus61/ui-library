"use client";

import { Sparkline } from "@/components/ui/sparkline";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const UP        = [12, 18, 14, 22, 19, 28, 25, 34, 30, 38, 35, 44];
const DOWN      = [44, 38, 42, 30, 35, 22, 27, 18, 20, 12, 15, 8];
const FLAT      = [20, 22, 19, 23, 21, 24, 20, 22, 21, 23, 22, 20];
const VOLATILE  = [30, 55, 20, 70, 15, 80, 25, 65, 10, 90, 40, 60];
const RECOVERY  = [80, 60, 40, 25, 18, 22, 35, 50, 65, 78, 88, 95];

const STATS = [
  { label: "Gelir",       value: "$12,430",  change: "+18%",  data: UP,       positive: true },
  { label: "Kullanıcı",   value: "4,821",    change: "+6%",   data: UP,       positive: true },
  { label: "Bounce",      value: "34.2%",    change: "-4%",   data: DOWN,     positive: false },
  { label: "Oturum Süresi", value: "2m 41s", change: "+12%",  data: UP,       positive: true },
  { label: "Hata Oranı",  value: "0.42%",    change: "-0.1%", data: DOWN,     positive: false },
  { label: "Sayfa Hızı",  value: "1.2s",     change: "−0.3s", data: DOWN,     positive: false },
];

export default function SparklineShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Sparkline</h1>
        <p className="text-sm text-foreground-muted">
          SVG polyline · positive/negative renk · filled area · hover tooltip · StatCard entegrasyonu · çoklu senaryo
        </p>
      </div>

      {/* Pozitif / Negatif / Nötr */}
      <ShowcaseSection
        title="Trend Renkleri"
        description="Son değer ilk değerden büyükse yeşil, küçükse kırmızı, aynıysa muted renk."
        code={`<Sparkline data={[12, 18, 14, 22, 28, 34, 44]} />   {/* yeşil  — yükselen */}
<Sparkline data={[44, 38, 30, 22, 18, 12, 8]} />   {/* kırmızı — düşen   */}
<Sparkline data={[20, 22, 19, 23, 21, 24, 22]} />  {/* muted   — sabit   */}`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[
            { data: UP,      label: "Yükselen ↑" },
            { data: DOWN,    label: "Düşen ↓" },
            { data: FLAT,    label: "Sabit →" },
            { data: VOLATILE, label: "Volatil ~" },
            { data: RECOVERY, label: "Toparlanma ↗" },
          ].map(({ data, label }) => (
            <div key={label} className="text-center">
              <Sparkline data={data} width={140} height={48} />
              <p className="text-xs text-foreground-muted mt-1">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* StatCard Entegrasyonu — 6 Kart */}
      <ShowcaseSection
        title="StatCard Entegrasyonu"
        description="6 farklı metrik kartında sağ üst köşede mini trend göstergesi."
        code={`<div className="stat-card">
  <div>
    <p className="label">Gelir</p>
    <p className="value">$12,430</p>
    <p className="change">+18%</p>
  </div>
  <Sparkline data={data} width={80} height={36} tooltip={false} />
</div>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {STATS.map((card) => (
            <div key={card.label} className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs text-foreground-muted">{card.label}</p>
                  <p className="text-xl font-bold text-foreground mt-0.5">{card.value}</p>
                  <p className={`text-xs mt-0.5 ${card.positive ? "text-success" : "text-danger"}`}>{card.change}</p>
                </div>
                <Sparkline data={card.data} width={72} height={36} tooltip={false} />
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Filled vs Unfilled */}
      <ShowcaseSection
        title="Filled / Unfilled"
        description="filled prop ile alan dolgusu kapatılabilir. Sadece çizgi görünümü."
        code={`<Sparkline data={data} filled={true} />   {/* alan dolgusu — varsayılan */}
<Sparkline data={data} filled={false} />  {/* sadece çizgi             */}`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          <div className="text-center">
            <Sparkline data={UP} width={160} height={56} filled={true} />
            <p className="text-[10px] text-foreground-muted mt-1">filled=true (varsayılan)</p>
          </div>
          <div className="text-center">
            <Sparkline data={UP} width={160} height={56} filled={false} />
            <p className="text-[10px] text-foreground-muted mt-1">filled=false</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Stroke Width */}
      <ShowcaseSection
        title="Stroke Width"
        description="strokeWidth prop ile çizgi kalınlığı ayarlanır."
        code={`<Sparkline data={data} strokeWidth={1} />
<Sparkline data={data} strokeWidth={2} />
<Sparkline data={data} strokeWidth={3.5} />`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          {[1, 1.5, 2.5, 4].map((sw) => (
            <div key={sw} className="text-center">
              <Sparkline data={UP} width={140} height={48} strokeWidth={sw} />
              <p className="text-[10px] text-foreground-muted mt-1">strokeWidth={sw}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Boyut Skalası */}
      <ShowcaseSection
        title="Boyut Skalası"
        description="width ve height ile kompakt'tan geniş ekrana kadar farklı bağlamlarda kullanım."
        code={`<Sparkline data={data} width={60}  height={24} />  {/* xs — tablo hücresi  */}
<Sparkline data={data} width={120} height={40} />  {/* sm — kart         */}
<Sparkline data={data} width={240} height={60} />  {/* md — panel        */}
<Sparkline data={data} width={400} height={80} />  {/* lg — seksiyon     */}`}
      >
        <div className="space-y-4">
          {[
            { w: 60,  h: 24, label: "xs — tablo hücresi" },
            { w: 120, h: 40, label: "sm — stat kart" },
            { w: 240, h: 60, label: "md — panel" },
            { w: 400, h: 80, label: "lg — seksiyon" },
          ].map(({ w, h, label }) => (
            <div key={label} className="flex items-center gap-4">
              <Sparkline data={UP} width={w} height={h} />
              <p className="text-xs text-foreground-muted">{label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Tooltip Formatı */}
      <ShowcaseSection
        title="Özel Tooltip Formatı"
        description="formatValue prop ile hover tooltip içeriği özelleştirilebilir."
        code={`<Sparkline
  data={revenueData}
  formatValue={(v) => "$" + v.toLocaleString()}
/>
<Sparkline
  data={percentData}
  formatValue={(v) => v.toFixed(1) + "%"}
/>`}
      >
        <div className="flex flex-wrap gap-8 items-center">
          <div className="text-center">
            <Sparkline
              data={[4200, 5800, 4900, 7100, 6500, 8300, 7800, 9100, 8600, 10200, 9400, 11800]}
              width={180}
              height={56}
              formatValue={(v) => "$" + v.toLocaleString()}
            />
            <p className="text-[10px] text-foreground-muted mt-1">Para birimi formatı</p>
          </div>
          <div className="text-center">
            <Sparkline
              data={[34.2, 35.1, 33.8, 31.4, 30.9, 29.5, 28.8, 27.4, 26.1, 25.8, 25.2, 24.9]}
              width={180}
              height={56}
              formatValue={(v) => v.toFixed(1) + "%"}
            />
            <p className="text-[10px] text-foreground-muted mt-1">Yüzde formatı</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Inline tablo kullanımı */}
      <ShowcaseSection
        title="Tablo İçi Kullanım"
        description="Tablo satırlarında kompakt trend göstergesi olarak kullanım."
        code={`<td>
  <Sparkline data={rowData} width={60} height={24} tooltip={false} filled={false} />
</td>`}
      >
        <div className="rounded-[var(--radius-lg)] border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background-subtle">
                <th className="px-4 py-2 text-left text-xs text-foreground-muted font-medium">Ürün</th>
                <th className="px-4 py-2 text-right text-xs text-foreground-muted font-medium">Gelir</th>
                <th className="px-4 py-2 text-right text-xs text-foreground-muted font-medium">Değ.</th>
                <th className="px-4 py-2 text-xs text-foreground-muted font-medium">Trend</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Pro Plan",    revenue: "$48.2K", change: "+12%", data: UP,       positive: true },
                { name: "Starter",     revenue: "$22.1K", change: "+4%",  data: [14,18,15,20,18,22,21], positive: true },
                { name: "Enterprise",  revenue: "$91.4K", change: "-3%",  data: DOWN,     positive: false },
                { name: "Add-ons",     revenue: "$8.7K",  change: "+22%", data: RECOVERY, positive: true },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-background-subtle transition-colors">
                  <td className="px-4 py-2.5 font-medium text-foreground">{row.name}</td>
                  <td className="px-4 py-2.5 text-right text-foreground">{row.revenue}</td>
                  <td className={`px-4 py-2.5 text-right text-xs font-medium ${row.positive ? "text-success" : "text-danger"}`}>{row.change}</td>
                  <td className="px-4 py-2.5">
                    <Sparkline data={row.data} width={64} height={24} tooltip={false} filled={false} strokeWidth={1.5} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}
