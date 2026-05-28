"use client";

import { useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function AnimatedCounterShowcase() {
  const [key, setKey] = useState(0);
  const replay = () => setKey((k) => k + 1);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Animated Counter</h1>
        <p className="text-sm text-foreground-muted">
          Sayısal değer değiştiğinde animasyonlu geçiş · from/to · easing · prefix/suffix · locale
        </p>
      </div>

      <ShowcaseSection
        title="Temel Kullanım"
        description="Butona tıklayarak animasyonu yeniden başlatın."
        code={`<AnimatedCounter to={9842} duration={1500} suffix="+" />`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-primary tabular-nums">
            <AnimatedCounter key={key} to={9842} duration={1500} suffix="+" />
          </div>
          <Button size="sm" variant="outline" onClick={replay}>Tekrar Oynat</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Prefix / Suffix / Locale"
        code={`<AnimatedCounter to={1250000} prefix="$" locale="en-US" duration={2000} />
<AnimatedCounter to={98.7} suffix="%" decimals={1} duration={1200} />`}
      >
        <div className="flex flex-wrap gap-10 items-end">
          <div className="text-center">
            <div className="text-3xl font-bold text-success">
              <AnimatedCounter key={key} to={1250000} prefix="$" locale="en-US" duration={2000} />
            </div>
            <p className="text-xs text-foreground-muted mt-1">Revenue</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              <AnimatedCounter key={key} to={98.7} suffix="%" decimals={1} duration={1200} />
            </div>
            <p className="text-xs text-foreground-muted mt-1">Uptime</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning">
              <AnimatedCounter key={key} to={4.8} suffix=" / 5" decimals={1} duration={800} />
            </div>
            <p className="text-xs text-foreground-muted mt-1">Rating</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Easing Seçenekleri"
        code={`<AnimatedCounter to={1000} easing="linear" />
<AnimatedCounter to={1000} easing="ease-out" />
<AnimatedCounter to={1000} easing="ease-in" />
<AnimatedCounter to={1000} easing="ease-in-out" />`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(["linear", "ease-out", "ease-in", "ease-in-out"] as const).map((e) => (
            <div key={e} className="text-center p-4 rounded-[var(--radius-lg)] bg-background-muted">
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter key={key} to={1000} easing={e} duration={1800} />
              </div>
              <p className="text-xs text-foreground-muted mt-1 font-mono">{e}</p>
            </div>
          ))}
        </div>
        <Button size="sm" variant="outline" onClick={replay} className="mt-3">Tekrar Oynat</Button>
      </ShowcaseSection>

      <ShowcaseSection
        title="Stat Card'larla Kullanım"
        code={`<div className="stat-card">
  <AnimatedCounter to={2847} suffix=" kullanıcı" />
</div>`}
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Kullanıcılar", to: 2847, suffix: "", color: "text-primary" },
            { label: "Siparişler", to: 14320, suffix: "", color: "text-success" },
            { label: "Dönüşüm", to: 3.2, suffix: "%", decimals: 1, color: "text-warning" },
          ].map((s) => (
            <div key={s.label} className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface text-center">
              <div className={`text-2xl font-bold ${s.color}`}>
                <AnimatedCounter key={key} to={s.to} suffix={s.suffix} decimals={s.decimals} duration={1400} />
              </div>
              <p className="text-xs text-foreground-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </div>
  );
}
