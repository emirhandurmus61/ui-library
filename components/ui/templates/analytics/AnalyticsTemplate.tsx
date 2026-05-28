"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkline } from "@/components/ui/sparkline";
import { MiniBarChart } from "@/components/ui/mini-bar-chart";
import { GaugeChart } from "@/components/ui/gauge-chart";
import { AreaChart } from "@/components/ui/area-chart";
import { DonutChart } from "@/components/ui/donut-chart";
import { HeatMap } from "@/components/ui/heat-map";
import { cn } from "@/lib/utils";

/* ─── Mock Data ──────────────────────────────────────────────── */

const VISITOR_DATA = [3200, 2800, 3500, 4100, 3800, 4500, 5200, 4800, 5600, 6100, 5800, 6400];
const REVENUE_DATA = [28, 35, 42, 38, 51, 47, 60, 55, 68, 72, 65, 80];
const CONVERSION = 3.7;

const AREA_LABELS = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
const AREA_DATASETS = [
  {
    label: "Ziyaretçi",
    data: [3200, 2800, 3500, 4100, 3800, 4500, 5200, 4800, 5600, 6100, 5800, 6400],
  },
  {
    label: "Oturum",
    data: [2100, 1900, 2400, 2900, 2700, 3200, 3700, 3400, 4000, 4400, 4100, 4600],
    color: "#8b5cf6",
  },
];

const DONUT_DATA = [
  { label: "Organik", value: 4820 },
  { label: "Referans", value: 2310 },
  { label: "Sosyal", value: 1840 },
  { label: "Direkt", value: 1290 },
];

const HEAT_DATA: Record<string, number> = {
  "2025-01-06": 12, "2025-01-07": 8, "2025-01-13": 15, "2025-01-14": 6,
  "2025-01-20": 22, "2025-01-21": 9, "2025-01-27": 18, "2025-01-28": 11,
  "2025-02-03": 7,  "2025-02-04": 14, "2025-02-10": 25, "2025-02-11": 10,
  "2025-02-17": 19, "2025-02-18": 5,  "2025-02-24": 30, "2025-02-25": 13,
  "2025-03-03": 16, "2025-03-04": 8,  "2025-03-10": 21, "2025-03-11": 7,
  "2025-03-17": 28, "2025-03-18": 12, "2025-03-24": 35, "2025-03-25": 9,
  "2025-03-31": 14, "2025-04-01": 6,  "2025-04-07": 19, "2025-04-08": 11,
  "2025-04-14": 24, "2025-04-15": 8,  "2025-04-21": 33, "2025-04-22": 15,
  "2025-04-28": 20, "2025-04-29": 7,  "2025-05-05": 42, "2025-05-06": 18,
  "2025-05-12": 38, "2025-05-13": 22, "2025-05-19": 45, "2025-05-20": 16,
  "2025-05-26": 31, "2025-05-27": 9,
};

const TOP_PAGES = [
  { page: "/dashboard", visits: 8420, bounce: "32%", avgTime: "3:24" },
  { page: "/pricing", visits: 5180, bounce: "48%", avgTime: "2:11" },
  { page: "/blog/react-19", visits: 3960, bounce: "22%", avgTime: "5:47" },
  { page: "/docs/getting-started", visits: 3240, bounce: "18%", avgTime: "7:02" },
  { page: "/showcase", visits: 2870, bounce: "35%", avgTime: "4:15" },
];

const RANGES = ["7G", "30G", "90G"];

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatBox({
  title,
  value,
  trend,
  children,
}: {
  title: string;
  value: string;
  trend?: { label: string; up: boolean };
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-[var(--radius-xl)] p-4 flex flex-col gap-3">
      <p className="text-xs font-medium text-foreground-muted">{title}</p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
          {trend && (
            <span className={cn("inline-flex items-center gap-1 text-xs font-medium mt-1", trend.up ? "text-success" : "text-danger")}>
              {trend.up ? "↑" : "↓"} {trend.label}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ─── AnalyticsTemplate ──────────────────────────────────────── */
export function AnalyticsTemplate() {
  const [range, setRange] = useState("30G");

  return (
    <div className="bg-background min-h-screen p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Analytics</h1>
          <p className="text-xs text-foreground-muted mt-0.5">Son güncelleme: 28 Mayıs 2025, 09:41</p>
        </div>
        <div className="flex items-center bg-background-muted rounded-[var(--radius-lg)] p-0.5 gap-0.5">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                range === r
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox
          title="Toplam Ziyaretçi"
          value="64.2K"
          trend={{ label: "%12.4 artış", up: true }}
        >
          <Sparkline data={VISITOR_DATA} width={80} height={36} />
        </StatBox>

        <StatBox
          title="Gelir"
          value="₺80.4K"
          trend={{ label: "%8.1 artış", up: true }}
        >
          <MiniBarChart
            data={REVENUE_DATA}
            width={80}
            height={36}
            gap={2}
            radius={2}
          />
        </StatBox>

        <StatBox
          title="Dönüşüm Oranı"
          value={`%${CONVERSION}`}
          trend={{ label: "%0.3 düşüş", up: false }}
        >
          <GaugeChart
            value={CONVERSION}
            min={0}
            max={10}
            radius={28}
            thickness={7}
            needle={false}
            animate={false}
            label={<span className="text-xs font-bold text-foreground">{CONVERSION}%</span>}
            className="scale-75 origin-right"
          />
        </StatBox>

        <StatBox
          title="Aktif Kullanıcı"
          value="1,284"
          trend={{ label: "%5.7 artış", up: true }}
        >
          <Badge variant="success" size="sm" dot dotColor="success">Canlı</Badge>
        </StatBox>
      </div>

      {/* Area Chart */}
      <div className="bg-surface border border-border rounded-[var(--radius-xl)] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Ziyaretçi & Oturum Trendi</h2>
            <p className="text-xs text-foreground-muted">2025 yılı aylık özet</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-foreground-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-primary inline-block" />
              Ziyaretçi
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-violet-500 inline-block" />
              Oturum
            </span>
          </div>
        </div>
        <AreaChart
          labels={AREA_LABELS}
          datasets={AREA_DATASETS}
          width={760}
          height={200}
          className="w-full max-w-full"
          formatValue={(v) => v.toLocaleString()}
        />
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-surface border border-border rounded-[var(--radius-xl)] p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">Trafik Kaynakları</h2>
          <p className="text-xs text-foreground-muted mb-5">Kullanıcıların nereden geldiği</p>
          <div className="flex justify-center">
            <DonutChart
              data={DONUT_DATA}
              radius={70}
              thickness={18}
              formatValue={(v, t) => `${Math.round((v / t) * 100)}%`}
            />
          </div>
        </div>

        {/* Heat Map */}
        <div className="bg-surface border border-border rounded-[var(--radius-xl)] p-5">
          <h2 className="text-sm font-semibold text-foreground mb-1">Aktivite Takvimi</h2>
          <p className="text-xs text-foreground-muted mb-5">2025 yılı günlük aktivite yoğunluğu</p>
          <div className="overflow-x-auto">
            <HeatMap
              data={HEAT_DATA}
              year={2025}
              cellSize={10}
              cellGap={2}
              formatValue={(date, value) => `${date}: ${value} aktivite`}
            />
          </div>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-surface border border-border rounded-[var(--radius-xl)] overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">En Çok Ziyaret Edilen Sayfalar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-background-muted">
                <th className="text-left px-5 py-2.5 text-xs font-medium text-foreground-muted">Sayfa</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-foreground-muted">Ziyaret</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-foreground-muted">Hemen Çıkma</th>
                <th className="text-right px-5 py-2.5 text-xs font-medium text-foreground-muted">Ort. Süre</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PAGES.map((row, i) => (
                <tr key={row.page} className={cn("border-b border-border/50 last:border-0 hover:bg-background-muted transition-colors", i % 2 === 0 ? "" : "")}>
                  <td className="px-5 py-3 font-mono text-xs text-foreground">{row.page}</td>
                  <td className="px-5 py-3 text-right text-xs text-foreground tabular-nums">{row.visits.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right">
                    <span className={cn("text-xs", parseFloat(row.bounce) < 30 ? "text-success" : parseFloat(row.bounce) < 40 ? "text-warning" : "text-danger")}>
                      {row.bounce}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-xs text-foreground-muted tabular-nums">{row.avgTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
