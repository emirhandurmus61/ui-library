"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ReadingTime } from "@/components/ui/reading-time";

const SHORT_TEXT = "Merhaba dünya! Bu kısa bir paragraftır.";
const MEDIUM_TEXT = Array.from({ length: 50 }, () => "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt").join(" ");
const LONG_TEXT   = Array.from({ length: 200 }, () => "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt").join(" ");

export default function ReadingTimeShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Reading Time</h1>
        <p className="text-sm text-foreground-muted">
          Blog yazıları için tahmini okuma süresi badge'i. İçerik metni veya kelime sayısından hesaplar.
        </p>
      </div>

      <ShowcaseSection
        title="Varyantlar"
        description="badge (varsayılan), pill, inline, icon, detailed."
        importLine={`import { ReadingTime } from "@/components/ui/reading-time";`}
        code={`<ReadingTime content={text} variant="badge" />
<ReadingTime content={text} variant="pill" />
<ReadingTime content={text} variant="inline" />
<ReadingTime content={text} variant="icon" />
<ReadingTime content={text} variant="detailed" />`}
      >
        <div className="flex flex-col gap-4">
          {(["badge","pill","inline","icon","detailed"] as const).map(v => (
            <div key={v} className="flex items-center gap-3">
              <span className="text-xs text-foreground-subtle w-16">{v}</span>
              <ReadingTime content={LONG_TEXT} variant={v} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Farklı İçerik Uzunlukları"
        description="Kısa / orta / uzun içerik için hesaplanan dakikalar."
        importLine={`import { ReadingTime } from "@/components/ui/reading-time";`}
        code={`<ReadingTime content={shortText} />   // ~1 dk
<ReadingTime content={mediumText} />  // ~2 dk
<ReadingTime content={longText} />    // ~8 dk
<ReadingTime words={1500} />          // word count direkt geç`}
      >
        <div className="space-y-3">
          {[
            { label: "Kısa (~40 kelime)",  text: SHORT_TEXT },
            { label: "Orta (~400 kelime)", text: MEDIUM_TEXT },
            { label: "Uzun (~1600 kelime)",text: LONG_TEXT },
          ].map(({ label, text }) => (
            <div key={label} className="flex items-center justify-between p-3 rounded-[var(--radius-lg)] border border-border bg-surface">
              <span className="text-sm text-foreground-muted">{label}</span>
              <ReadingTime content={text} variant="detailed" />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Blog Kartı Entegrasyonu"
        description="Gerçek kullanım: kart başlığının altında reading time badge."
        importLine={`import { ReadingTime } from "@/components/ui/reading-time";`}
        code={`<article className="...">
  <img src="..." />
  <div>
    <div className="flex items-center gap-2">
      <span className="badge">Teknoloji</span>
      <ReadingTime words={840} variant="icon" />
    </div>
    <h2>Başlık</h2>
  </div>
</article>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Next.js 15 ile Server Actions", cat: "Next.js", words: 840, img: "bg-gradient-to-br from-blue-500 to-violet-600" },
            { title: "Tailwind CSS v4 Token Sistemi", cat: "CSS",     words: 1200, img: "bg-gradient-to-br from-teal-500 to-cyan-600" },
            { title: "TypeScript Tip Güvenliği",      cat: "TypeScript", words: 560, img: "bg-gradient-to-br from-blue-600 to-indigo-700" },
          ].map(({ title, cat, words, img }) => (
            <div key={title} className="rounded-[var(--radius-xl)] border border-border bg-surface overflow-hidden">
              <div className={`h-28 ${img}`} />
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary-subtle text-primary">{cat}</span>
                  <ReadingTime words={words} variant="icon" />
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug">{title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-subtle">28 May 2026</span>
                  <ReadingTime words={words} variant="badge" />
                </div>
              </div>
            </div>
          ))}
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
                ["content","string","—","Ham metin (kelime sayısı otomatik hesaplanır)"],
                ["words","number","—","Kelime sayısını direkt geç"],
                ["wpm","number","200","Kelime/dakika hızı"],
                ["variant",'"badge"|"pill"|"inline"|"icon"|"detailed"','"badge"',"Görsel stil"],
                ["showIcon","boolean","true","Saat ikonu göster"],
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
