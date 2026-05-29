"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Countdown } from "@/components/ui/countdown";

/* target = 3 days from now, stable for SSR */
function futureDate(daysFromNow: number): string {
  const d = new Date("2026-06-15T12:00:00Z");
  return d.toISOString();
}

const TARGET = futureDate(3);

export default function CountdownShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Countdown</h1>
        <p className="text-foreground-muted">
          Gerçek zamanlı geri sayım sayacı. 6 varyant ile her tasarıma uyum sağlar.
        </p>
      </div>

      {/* Default */}
      <ShowcaseSection
        title="Default"
        description="Primary renkli kutular, günler dahil."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="default" />`}
      >
        <Countdown targetDate={TARGET} variant="default" />
      </ShowcaseSection>

      {/* Cards */}
      <ShowcaseSection
        title="Cards"
        description="Kart tasarımı, üst yarı koyu arka planlı flip clock hissi."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="cards" />`}
      >
        <Countdown targetDate={TARGET} variant="cards" />
      </ShowcaseSection>

      {/* Flip */}
      <ShowcaseSection
        title="Flip (Dark)"
        description="Her zaman koyu arka plan, bej/beyaz rakamlar. Dark tema ve kampanya sayfaları için."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="flip" />`}
      >
        <div className="bg-[#0f172a] rounded-[var(--radius-xl)] p-8 flex justify-center">
          <Countdown targetDate={TARGET} variant="flip" />
        </div>
      </ShowcaseSection>

      {/* Ring */}
      <ShowcaseSection
        title="Ring"
        description="SVG dairesel ilerleme çemberi ile her birimin doluluk oranı gösterilir."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="ring" />`}
      >
        <Countdown targetDate={TARGET} variant="ring" />
      </ShowcaseSection>

      {/* Minimal */}
      <ShowcaseSection
        title="Minimal"
        description="İnce font ağırlığı, geniş letter-spacing. Lüks ve editorial tasarımlar için."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="minimal" />`}
      >
        <Countdown targetDate={TARGET} variant="minimal" />
      </ShowcaseSection>

      {/* Compact */}
      <ShowcaseSection
        title="Compact"
        description="Tek satır, inline kullanım. Navbar veya kart içi için."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<Countdown targetDate="2026-06-15T12:00:00Z" variant="compact" />`}
      >
        <div className="flex items-center gap-3 p-4 rounded-[var(--radius-xl)] border border-border bg-surface w-fit">
          <span className="text-sm text-foreground-muted font-medium">Kampanya bitiyor:</span>
          <Countdown targetDate={TARGET} variant="compact" showDays={false} />
        </div>
      </ShowcaseSection>

      {/* Embedded in hero */}
      <ShowcaseSection
        title="Hero Senaryosu"
        description="Gerçek dünya kullanımı: lanssman sayfası countdown bloğu."
        importLine={`import { Countdown } from "@/components/ui/countdown";`}
        code={`<div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-white p-10 text-center">
  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Lansmana kalan süre</p>
  <h2 className="text-3xl font-bold mb-8">Yakında geliyor</h2>
  <Countdown targetDate="2026-06-15T12:00:00Z" variant="cards" className="justify-center" />
</div>`}
      >
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-white p-10 text-center">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Lansmana kalan süre</p>
          <h2 className="text-3xl font-bold mb-8">Yakında geliyor</h2>
          <Countdown targetDate={TARGET} variant="cards" className="justify-center" />
        </div>
      </ShowcaseSection>

      {/* Props table */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["targetDate", "string | Date", "—", "Hedef tarih/saat (zorunlu)"],
                ["variant", '"default" | "minimal" | "cards" | "flip" | "ring" | "compact"', '"default"', "Görsel stil"],
                ["showDays", "boolean", "true", "Gün segmentini göster"],
                ["onComplete", "() => void", "—", "Süre dolduğunda callback"],
                ["className", "string", "—", "Ek CSS sınıfı"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{prop}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{def}</td>
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
