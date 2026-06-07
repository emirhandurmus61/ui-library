"use client";

import { useRef } from "react";
import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ScrollProgress } from "@/components/ui/scroll-progress";

function ScrollBox({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="space-y-2">
      <p className="text-xs text-foreground-muted">{label}</p>
      <div ref={ref} className="relative h-48 overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-surface p-4 text-sm text-foreground-muted space-y-3">
        {children}
        <ScrollProgress variant="bar-top" containerRef={ref} thickness={3} fixed={false} />
      </div>
    </div>
  );
}

const LOREM = Array.from({ length: 12 }, (_, i) =>
  `Paragraf ${i + 1}: Bu kütüphane, modern web uygulamaları için özenle tasarlanmış bileşenler sunar. Tailwind CSS v4 token sistemi ve TypeScript desteği ile güçlü bir geliştirici deneyimi sağlar.`
);

export default function ScrollProgressShowcase() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-10">
      {/* Fixed bar-top on this page */}
      <ScrollProgress variant="bar-top" fixed thickness={3} />

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Scroll Progress</h1>
        <p className="text-sm text-foreground-muted">
          Sayfa veya container okuma ilerleme göstergesi. 5 varyant — bu sayfanın üstündeki ince çubuk da bu bileşenden!
        </p>
      </div>

      <ShowcaseSection
        title="Bar — Sayfa Üstü (Fixed)"
        description="Bu sayfanın en üstünde zaten aktif. Sayfayı aşağı kaydırın."
        importLine={`import { ScrollProgress } from "@/components/ui/scroll-progress";`}
        code={`// layout.tsx veya page.tsx üstüne ekle
<ScrollProgress variant="bar-top" fixed thickness={3} />`}
      >
        <div className="flex items-center gap-2 p-3 rounded-[var(--radius-lg)] bg-background-muted border border-border text-sm text-foreground-muted">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-primary shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
          Sayfa üstündeki kırmızı/primary çubuk bu sayfada zaten aktif — aşağı kaydırdıkça dolduğunu göreceksiniz.
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Container Bar"
        description="Belirli bir scrollable container'ı takip eder. containerRef prop geçin."
        importLine={`import { ScrollProgress } from "@/components/ui/scroll-progress";`}
        code={`const ref = useRef<HTMLDivElement>(null);

<div ref={ref} className="h-48 overflow-y-auto relative">
  <ScrollProgress variant="bar-top" containerRef={ref} fixed={false} />
  {/* içerik */}
</div>`}
      >
        <div ref={ref1} className="relative h-52 overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-surface">
          <ScrollProgress variant="bar-top" containerRef={ref1} fixed={false} thickness={3} />
          <div className="p-4 space-y-3 text-sm text-foreground-muted">
            {LOREM.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Circular"
        description="Yuvarlak SVG progress göstergesi. Opsiyonel yüzde metni."
        importLine={`import { ScrollProgress } from "@/components/ui/scroll-progress";`}
        code={`const ref = useRef<HTMLDivElement>(null);

<div ref={ref} className="h-52 overflow-y-auto relative">
  <ScrollProgress variant="circular" containerRef={ref} size={48} showPercent />
  {/* içerik */}
</div>`}
      >
        <div ref={ref2} className="relative h-52 overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-surface">
          <div className="absolute top-3 right-3 z-10">
            <ScrollProgress variant="circular" containerRef={ref2} size={48} showPercent />
          </div>
          <div className="p-4 space-y-3 text-sm text-foreground-muted">
            {LOREM.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Radial"
        description="Daha büyük radial progress. Sayı göstergesi ile."
        importLine={`import { ScrollProgress } from "@/components/ui/scroll-progress";`}
        code={`<ScrollProgress variant="radial" size={64} showPercent fixed />`}
      >
        <div ref={ref3} className="relative h-52 overflow-y-auto rounded-[var(--radius-xl)] border border-border bg-surface">
          <div className="absolute bottom-3 right-3 z-10">
            <ScrollProgress variant="radial" containerRef={ref3} size={56} showPercent />
          </div>
          <div className="p-4 space-y-3 text-sm text-foreground-muted">
            {LOREM.map((t, i) => <p key={i}>{t}</p>)}
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dots"
        description="10 noktalı gösterge. Minimal ve sade tasarımlar için."
        importLine={`import { ScrollProgress } from "@/components/ui/scroll-progress";`}
        code={`<ScrollProgress variant="dots" />`}
      >
        <div className="flex items-center gap-3 flex-wrap p-3 rounded-[var(--radius-lg)] border border-border bg-surface">
          <span className="text-sm text-foreground-muted">%0</span>
          <ScrollProgress variant="dots" containerRef={{ current: null }} />
          <span className="text-sm text-foreground-muted">→ %100</span>
          <ScrollProgress variant="dots" containerRef={{ current: { scrollTop: 500, scrollHeight: 1000, clientHeight: 0 } as HTMLElement }} />
        </div>
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>{["Prop","Tip","Varsayılan","Açıklama"].map(h=><th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["variant",'"bar-top"|"bar-bottom"|"circular"|"dots"|"radial"','"bar-top"',"Görsel stil"],
                ["fixed","boolean","bar için true","viewport'a sabitlensin mi"],
                ["thickness","number","3","Bar yüksekliği (px)"],
                ["size","number","44/64","Circular/radial çap (px)"],
                ["showPercent","boolean","false","Yüzde metni göster"],
                ["color","string","primary","Aktif renk (CSS)"],
                ["containerRef","RefObject<HTMLElement>","—","Takip edilecek container"],
              ].map(([p,t,d,desc])=>(
                <tr key={p} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{p}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{t}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{d}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
