"use client";

import { useState } from "react";
import { BackgroundPattern, type PatternId, type PatternTheme } from "@/components/ui/background-pattern";

/* ─── Data ───────────────────────────────────────────────────── */

const PATTERNS: { id: PatternId; label: string }[] = [
  { id: "dots",           label: "Noktalar" },
  { id: "grid",           label: "Izgara" },
  { id: "diagonal-lines", label: "Çapraz Çizgiler" },
  { id: "cross-hatch",    label: "Çapraz Tarama" },
  { id: "hexagons",       label: "Altıgenler" },
  { id: "waves",          label: "Dalgalar" },
  { id: "triangles",      label: "Üçgenler" },
  { id: "zigzag",         label: "Zigzag" },
  { id: "circuit",        label: "Devre" },
  { id: "leaves",         label: "Yapraklar" },
  { id: "diamonds",       label: "Elmaslar" },
  { id: "topography",     label: "Topografi" },
];

const THEMES: {
  id: PatternTheme;
  label: string;
  emoji: string;
  description: string;
  color: string;
  bg: string;
}[] = [
  {
    id: "minimal",
    label: "Minimal",
    emoji: "◻",
    description: "Sade, nötr — her içerik türüne uyar",
    color: "text-foreground",
    bg: "bg-background border border-border",
  },
  {
    id: "modern",
    label: "Modern",
    emoji: "◈",
    description: "Yazılım, SaaS, kurumsal",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800",
  },
  {
    id: "sport",
    label: "Spor",
    emoji: "⚡",
    description: "Fitness, sporcu ekipmanları, etkinlik",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800",
  },
  {
    id: "art",
    label: "Sanat",
    emoji: "◑",
    description: "Galeri, tasarım stüdyosu, yaratıcı ajans",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800",
  },
  {
    id: "food",
    label: "Gıda",
    emoji: "◉",
    description: "Restoran, tarif, food delivery",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800",
  },
  {
    id: "tech",
    label: "Tech",
    emoji: "◌",
    description: "Developer ürünleri, API, altyapı",
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800",
  },
  {
    id: "nature",
    label: "Doğa",
    emoji: "◎",
    description: "Sürdürülebilirlik, organik, açık hava",
    color: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-800",
  },
  {
    id: "geometric",
    label: "Geometrik",
    emoji: "◇",
    description: "Mimarlık, lüks, kurumsal kimlik",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800",
  },
];

/* ─── Section title ──────────────────────────────────────────── */

function SectionTitle({ tag, title, description }: { tag: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary mb-2">
        {tag}
      </span>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-foreground-muted mt-0.5">{description}</p>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function BackgroundPatternPage() {
  const [activePattern, setActivePattern] = useState<PatternId>("dots");
  const [activeTheme, setActiveTheme] = useState<PatternTheme>("minimal");
  const [opacity, setOpacity] = useState(0.6);

  const currentTheme = THEMES.find((t) => t.id === activeTheme)!;

  return (
    <div className="max-w-5xl space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Background Pattern</h1>
        <p className="text-sm text-foreground-muted">
          SVG tabanlı arka plan desenleri — spor, sanat, gıda gibi sektörel temalara göre renklendirilebilir.
          Landing page hero, hero banner veya bölüm arka planları için idealdir.
        </p>
      </div>

      {/* Live preview */}
      <section>
        <SectionTitle
          tag="Önizleme"
          title="Canlı Önizleme"
          description="Desen ve temayı seçerek sonucu anında görün."
        />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Pattern picker */}
          <div>
            <label className="block text-xs font-semibold text-foreground-muted mb-2 uppercase tracking-wider">
              Desen
            </label>
            <div className="flex flex-wrap gap-1.5">
              {PATTERNS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePattern(p.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    activePattern === p.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background-muted text-foreground-muted hover:bg-secondary hover:text-foreground border border-border"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme picker */}
          <div>
            <label className="block text-xs font-semibold text-foreground-muted mb-2 uppercase tracking-wider">
              Tema
            </label>
            <div className="flex flex-wrap gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                    activeTheme === t.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-background-muted text-foreground-muted hover:bg-secondary hover:text-foreground border border-border"
                  }`}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Opacity */}
          <div>
            <label className="block text-xs font-semibold text-foreground-muted mb-2 uppercase tracking-wider">
              Opaklık — {Math.round(opacity * 100)}%
            </label>
            <input
              type="range"
              min="0.05"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* Preview card — hero mockup */}
        <BackgroundPattern
          pattern={activePattern}
          theme={activeTheme}
          opacity={opacity}
          className="rounded-[var(--radius-xl)] border border-border bg-background min-h-[320px] flex items-center justify-center"
        >
          <div className="py-16 px-8 text-center max-w-lg mx-auto">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${currentTheme.bg} ${currentTheme.color}`}>
              {currentTheme.emoji} {currentTheme.label} — {currentTheme.description}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ürününüzü Öne Çıkarın
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              Her sektöre uygun arka plan deseni ile hero bölümünüze karakter katın.
              Opaklık ve tema değiştirerek tam istediğiniz efekti elde edin.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-[var(--radius-md)] hover:bg-primary-hover transition-colors">
                Başlayın
              </button>
              <button className="px-4 py-2 border border-border text-foreground text-sm font-medium rounded-[var(--radius-md)] hover:bg-background-muted transition-colors">
                Demo İzle
              </button>
            </div>
          </div>
        </BackgroundPattern>
      </section>

      {/* Theme gallery */}
      <section>
        <SectionTitle
          tag="Temalar"
          title="Sektörel Tema Galerisii"
          description="Her tema farklı bir sektöre veya estetik anlayışa hitap eder."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTheme(t.id); setActivePattern("dots"); }}
              className="text-left group"
            >
              <BackgroundPattern
                pattern="dots"
                theme={t.id}
                opacity={0.5}
                className={`rounded-[var(--radius-lg)] border-2 transition-all ${
                  activeTheme === t.id ? "border-primary shadow-md scale-[1.02]" : "border-border hover:border-border-strong"
                } h-28 flex items-center justify-center`}
              >
                <div className="text-center px-3 py-4">
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  <div className={`text-xs font-semibold ${t.color}`}>{t.label}</div>
                  <div className="text-xs text-foreground-subtle mt-0.5 leading-snug">{t.description}</div>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
      </section>

      {/* Pattern gallery */}
      <section>
        <SectionTitle
          tag="Desenler"
          title="Tüm Desenler"
          description={`Seçili tema: ${currentTheme.emoji} ${currentTheme.label}`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePattern(p.id)}
              className="text-left group"
            >
              <BackgroundPattern
                pattern={p.id}
                theme={activeTheme}
                opacity={0.6}
                className={`rounded-[var(--radius-lg)] border-2 transition-all h-24 ${
                  activePattern === p.id
                    ? "border-primary shadow-md"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div className="h-full flex items-end p-2">
                  <span className="text-xs font-medium text-foreground-muted bg-background/80 px-1.5 py-0.5 rounded">
                    {p.label}
                  </span>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
      </section>

      {/* Combination showcase */}
      <section>
        <SectionTitle
          tag="Kombinasyonlar"
          title="Önerilen Desen + Tema Eşleşmeleri"
          description="Her sektör için hazır kombinasyonlar."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { pattern: "circuit" as PatternId,        theme: "tech" as PatternTheme,     label: "Tech / SaaS",           desc: "Devre deseni + tech teması" },
            { pattern: "waves" as PatternId,           theme: "food" as PatternTheme,     label: "Gıda / Restoran",        desc: "Dalgalar + gıda teması" },
            { pattern: "zigzag" as PatternId,          theme: "sport" as PatternTheme,    label: "Spor / Fitness",         desc: "Zigzag + spor teması" },
            { pattern: "hexagons" as PatternId,        theme: "geometric" as PatternTheme,label: "Geometrik / Mimari",     desc: "Altıgenler + geometrik tema" },
            { pattern: "leaves" as PatternId,          theme: "nature" as PatternTheme,   label: "Doğa / Organik",        desc: "Yapraklar + doğa teması" },
            { pattern: "diagonal-lines" as PatternId,  theme: "art" as PatternTheme,      label: "Sanat / Galeri",         desc: "Çapraz çizgiler + sanat teması" },
            { pattern: "topography" as PatternId,      theme: "modern" as PatternTheme,   label: "Modern / Kurumsal",      desc: "Topografi + modern tema" },
            { pattern: "dots" as PatternId,            theme: "minimal" as PatternTheme,  label: "Minimal / Genel Amaç",  desc: "Noktalar + minimal tema" },
          ].map((combo) => (
            <button
              key={`${combo.pattern}-${combo.theme}`}
              onClick={() => { setActivePattern(combo.pattern); setActiveTheme(combo.theme); }}
              className="text-left"
            >
              <BackgroundPattern
                pattern={combo.pattern}
                theme={combo.theme}
                opacity={0.5}
                className="rounded-[var(--radius-lg)] border border-border hover:border-border-strong transition-all h-20 group"
              >
                <div className="h-full flex items-center px-4 gap-3">
                  <div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {combo.label}
                    </div>
                    <div className="text-xs text-foreground-muted">{combo.desc}</div>
                  </div>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { BackgroundPattern } from "@/components/ui/background-pattern";

// Temel kullanım
<BackgroundPattern pattern="dots" theme="minimal">
  <YourContent />
</BackgroundPattern>

// Hero section örneği
<BackgroundPattern
  pattern="circuit"
  theme="tech"
  opacity={0.4}
  className="min-h-screen"
>
  <HeroSection />
</BackgroundPattern>

// Spor temalı landing
<BackgroundPattern pattern="zigzag" theme="sport" opacity={0.35}>
  <SportHero />
</BackgroundPattern>`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Props</h2>
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-background-subtle">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider border-b border-border">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["pattern", "PatternId", '"dots"', "SVG desen türü (12 seçenek)"],
                ["theme", "PatternTheme", '"minimal"', "Renk teması (8 sektörel seçenek)"],
                ["opacity", "number", "1", "Desen katmanı opaklığı (0–1)"],
                ["className", "string", "—", "Wrapper div'e eklenen sınıflar"],
                ["children", "ReactNode", "—", "İçerik — pattern'ın üstünde render edilir"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-background-subtle/50">
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground-muted">{type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-foreground-subtle">{def}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
