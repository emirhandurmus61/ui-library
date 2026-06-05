"use client";

import { useState } from "react";
import { BackgroundPattern, type PatternId, type PatternTheme } from "@/components/ui/background-pattern";

/* ─── Data ───────────────────────────────────────────────────── */

const PATTERNS: { id: PatternId; label: string; desc: string; category: string }[] = [
  { id: "dots",           label: "Noktalar",       desc: "Sade, evrensel — her temaya uyar",           category: "geometric" },
  { id: "grid",           label: "Izgara",          desc: "Teknik, yapısal, minimal",                   category: "geometric" },
  { id: "diagonal-lines", label: "Çapraz Çizgiler", desc: "Dinamik yön hissi verir",                    category: "linear" },
  { id: "cross-hatch",    label: "Çapraz Tarama",   desc: "Resim / el yapımı dokusu",                   category: "linear" },
  { id: "hexagons",       label: "Altıgenler",      desc: "Teknoloji, bilim, arı peteği",               category: "geometric" },
  { id: "waves",          label: "Dalgalar",        desc: "Akışkan, sakin, organik",                    category: "organic" },
  { id: "triangles",      label: "Üçgenler",        desc: "Keskin, modern, avangard",                   category: "geometric" },
  { id: "zigzag",         label: "Zigzag",          desc: "Enerjik, spor, dikkat çekici",               category: "linear" },
  { id: "circuit",        label: "Devre",           desc: "Elektronik, yapay zeka, mühendislik",        category: "tech" },
  { id: "leaves",         label: "Yapraklar",       desc: "Doğal, organik, sürdürülebilir",             category: "organic" },
  { id: "diamonds",       label: "Elmaslar",        desc: "Lüks, kristal, zarif",                       category: "geometric" },
  { id: "topography",     label: "Topografi",       desc: "Harita, seyahat, outdoor",                   category: "organic" },
];

const PATTERN_CATEGORIES = [
  { id: "geometric", label: "Geometrik", desc: "Simetrik şekiller" },
  { id: "linear",    label: "Çizgisel",  desc: "Çizgi ve tarama" },
  { id: "organic",   label: "Organik",   desc: "Doğal formlar" },
  { id: "tech",      label: "Teknik",    desc: "Mühendislik" },
];

const THEMES: {
  id: PatternTheme;
  label: string;
  emoji: string;
  description: string;
  color: string;
  accent: string;
  bg: string;
  hex: string;
  useCases: string[];
}[] = [
  {
    id: "minimal",
    label: "Minimal",
    emoji: "◻",
    description: "Sade ve nötr",
    color: "text-foreground",
    accent: "#6b7280",
    bg: "bg-background border border-border",
    hex: "#e5e7eb",
    useCases: ["Blog", "Portfolio", "Doküman", "Genel amaç"],
  },
  {
    id: "modern",
    label: "Modern",
    emoji: "◈",
    description: "SaaS ve kurumsal",
    color: "text-violet-600 dark:text-violet-400",
    accent: "#6366f1",
    bg: "bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800",
    hex: "#6366f1",
    useCases: ["SaaS", "B2B", "Yazılım", "Dashboard"],
  },
  {
    id: "sport",
    label: "Spor",
    emoji: "⚡",
    description: "Fitness ve enerji",
    color: "text-amber-600 dark:text-amber-400",
    accent: "#f59e0b",
    bg: "bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800",
    hex: "#f59e0b",
    useCases: ["Fitness", "Spor ekipmanı", "Etkinlik", "Maraton"],
  },
  {
    id: "art",
    label: "Sanat",
    emoji: "◑",
    description: "Galeri ve yaratıcı",
    color: "text-pink-600 dark:text-pink-400",
    accent: "#ec4899",
    bg: "bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800",
    hex: "#ec4899",
    useCases: ["Galeri", "Ajans", "Moda", "Fotoğrafçı"],
  },
  {
    id: "food",
    label: "Gıda",
    emoji: "◉",
    description: "Restoran ve tarif",
    color: "text-emerald-600 dark:text-emerald-400",
    accent: "#22c55e",
    bg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800",
    hex: "#22c55e",
    useCases: ["Restoran", "Tarif", "Delivery", "Catering"],
  },
  {
    id: "tech",
    label: "Tech",
    emoji: "◌",
    description: "Developer ve API",
    color: "text-cyan-600 dark:text-cyan-400",
    accent: "#06b6d4",
    bg: "bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800",
    hex: "#06b6d4",
    useCases: ["API", "DevTools", "Altyapı", "AI ürünü"],
  },
  {
    id: "nature",
    label: "Doğa",
    emoji: "◎",
    description: "Sürdürülebilir ve organik",
    color: "text-lime-600 dark:text-lime-400",
    accent: "#84cc16",
    bg: "bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-800",
    hex: "#84cc16",
    useCases: ["Organik ürün", "Çevre", "Outdoor", "Tarım"],
  },
  {
    id: "geometric",
    label: "Geometrik",
    emoji: "◇",
    description: "Mimari ve lüks",
    color: "text-purple-600 dark:text-purple-400",
    accent: "#8b5cf6",
    bg: "bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800",
    hex: "#8b5cf6",
    useCases: ["Mimarlık", "Lüks marka", "Kurumsal", "Gayrimenkul"],
  },
];

const COMBOS: {
  pattern: PatternId;
  theme: PatternTheme;
  label: string;
  desc: string;
  tag: string;
  cta: string;
  headline: string;
  sub: string;
}[] = [
  {
    pattern: "circuit",    theme: "tech",      label: "Tech / AI",
    tag: "Yapay Zeka",     cta: "Ücretsiz Dene",
    headline: "Yapay Zeka ile Kod Yaz",
    sub: "Geliştirme sürecinizi 10x hızlandıran AI asistanı.",
    desc: "Devre deseni + tech teması — developer ürünleri için",
  },
  {
    pattern: "zigzag",     theme: "sport",     label: "Spor / Fitness",
    tag: "Yeni Sezon",     cta: "Hemen Katıl",
    headline: "Limitlerini Aş",
    sub: "Kişiselleştirilmiş antrenman planı ve profesyonel koçluk.",
    desc: "Zigzag + spor teması — fitness ve sporcu ekipmanları için",
  },
  {
    pattern: "waves",      theme: "food",      label: "Restoran / Delivery",
    tag: "Günün Menüsü",   cta: "Sipariş Ver",
    headline: "Lezzeti Kapına Getiriyoruz",
    sub: "300+ restoran, 30 dakika teslimat garantisi.",
    desc: "Dalgalar + gıda teması — yemek platformları için",
  },
  {
    pattern: "hexagons",   theme: "geometric", label: "Mimarlık / Tasarım",
    tag: "Premium",        cta: "Projeyi Gör",
    headline: "Mekânları Yeniden Tasarlıyoruz",
    sub: "Ödüllü mimarlık ofisimizle hayalinizdeki mekânı inşa edin.",
    desc: "Altıgenler + geometrik tema — mimari ve lüks için",
  },
  {
    pattern: "leaves",     theme: "nature",    label: "Organik / Sürdürülebilir",
    tag: "%100 Doğal",     cta: "Keşfet",
    headline: "Doğadan Sofranıza",
    sub: "Sertifikalı organik üreticilerden doğrudan kapınıza.",
    desc: "Yapraklar + doğa teması — organik ve çevre ürünleri için",
  },
  {
    pattern: "diagonal-lines", theme: "art",   label: "Sanat / Galeri",
    tag: "Yeni Sergi",     cta: "Bilet Al",
    headline: "Sanatı Yakından Hisset",
    sub: "Çağdaş Türk sanatçıların eserleriyle buluşma noktası.",
    desc: "Çapraz çizgiler + sanat teması — galeri ve yaratıcı ajanslar için",
  },
  {
    pattern: "topography", theme: "modern",    label: "Kurumsal / SaaS",
    tag: "Enterprise",     cta: "Demo İste",
    headline: "Ekibinizi Bir Adım Öne Taşıyın",
    sub: "50.000+ şirketin güvendiği kurumsal yönetim platformu.",
    desc: "Topografi + modern tema — B2B ve kurumsal ürünler için",
  },
  {
    pattern: "dots",       theme: "minimal",   label: "Blog / Portfolio",
    tag: "Yeni Yazı",      cta: "Oku",
    headline: "Düşüncelerimi Paylaşıyorum",
    sub: "Tasarım, kod ve yaratıcılık üzerine haftalık yazılar.",
    desc: "Noktalar + minimal tema — blog ve portfolio için",
  },
];

/* ─── Helpers ────────────────────────────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

function SectionTitle({ tag, title, description }: { tag: string; title: string; description: string }) {
  return (
    <div className="mb-6">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-2">
        {tag}
      </span>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-foreground-muted mt-0.5">{description}</p>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  return (
    <div className="relative group">
      <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-xs font-mono text-foreground overflow-x-auto whitespace-pre leading-relaxed">
        {code}
      </pre>
      <button
        onClick={copy}
        className="absolute top-2.5 right-2.5 px-2 py-1 text-xs rounded bg-background-muted border border-border text-foreground-muted hover:text-foreground opacity-0 group-hover:opacity-100 transition-all"
      >
        {copied ? "Kopyalandı!" : "Kopyala"}
      </button>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function BackgroundPatternPage() {
  const [activePattern, setActivePattern] = useState<PatternId>("dots");
  const [activeTheme, setActiveTheme] = useState<PatternTheme>("minimal");
  const [opacity, setOpacity] = useState(0.6);
  const [patternCat, setPatternCat] = useState<string>("all");

  const currentTheme = THEMES.find((t) => t.id === activeTheme)!;
  const filteredPatterns = patternCat === "all" ? PATTERNS : PATTERNS.filter((p) => p.category === patternCat);

  return (
    <div className="max-w-5xl space-y-16">

      {/* ── HEADER ── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Background Pattern</h1>
        <p className="text-sm text-foreground-muted max-w-2xl">
          SVG tabanlı arka plan desenleri — spor, sanat, gıda gibi sektörel temalara göre renklendirilebilir.
          Landing page hero, hero banner veya bölüm arka planları için idealdir.
        </p>
      </div>

      {/* ── CANLI ÖNİZLEME ── */}
      <section>
        <SectionTitle
          tag="Önizleme"
          title="Canlı Önizleme"
          description="Desen, tema ve opaklığı seçerek sonucu anında görün. Değişiklikler aşağıdaki hero mockup'a yansır."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Pattern picker */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Desen</label>
              <div className="flex gap-1">
                <button
                  onClick={() => setPatternCat("all")}
                  className={`px-2 py-0.5 rounded text-xs transition-all ${patternCat === "all" ? "bg-primary text-white" : "text-foreground-muted hover:text-foreground"}`}
                >
                  Tümü
                </button>
                {PATTERN_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setPatternCat(c.id)}
                    className={`px-2 py-0.5 rounded text-xs transition-all ${patternCat === c.id ? "bg-primary text-white" : "text-foreground-muted hover:text-foreground"}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {filteredPatterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePattern(p.id)}
                  title={p.desc}
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

          {/* Theme + Opacity */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground-muted mb-2 uppercase tracking-wider">Tema</label>
              <div className="flex flex-wrap gap-1.5">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t.id)}
                    title={t.description}
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
            <div>
              <label className="block text-xs font-semibold text-foreground-muted mb-2 uppercase tracking-wider">
                Opaklık — {Math.round(opacity * 100)}%
              </label>
              <input
                type="range" min="0.05" max="1" step="0.05"
                value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-foreground-muted mt-0.5">
                <span>5% (neredeyse görünmez)</span>
                <span>100% (tam)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview hero */}
        <BackgroundPattern
          pattern={activePattern}
          theme={activeTheme}
          opacity={opacity}
          className="rounded-[var(--radius-xl)] border border-border bg-background min-h-[360px] flex items-center justify-center"
        >
          <div className="py-20 px-8 text-center max-w-lg mx-auto">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${currentTheme.bg} ${currentTheme.color}`}>
              {currentTheme.emoji} {currentTheme.label} — {currentTheme.description}
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Ürününüzü Öne Çıkarın
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-6">
              Her sektöre uygun arka plan deseni ile hero bölümünüze karakter katın.
              Opaklık ve tema değiştirerek tam istediğiniz efekti elde edin.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-[var(--radius-md)] hover:opacity-90 transition-opacity shadow-sm">
                Başlayın
              </button>
              <button className="px-5 py-2.5 border border-border text-foreground text-sm font-medium rounded-[var(--radius-md)] hover:bg-background-muted transition-colors">
                Demo İzle
              </button>
            </div>
          </div>
        </BackgroundPattern>

        {/* Active selection info */}
        <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
          <span className="font-mono bg-background-muted px-1.5 py-0.5 rounded border border-border">
            pattern=&quot;{activePattern}&quot;
          </span>
          <span>+</span>
          <span className="font-mono bg-background-muted px-1.5 py-0.5 rounded border border-border">
            theme=&quot;{activeTheme}&quot;
          </span>
          <span>+</span>
          <span className="font-mono bg-background-muted px-1.5 py-0.5 rounded border border-border">
            opacity={`{${opacity}}`}
          </span>
        </div>
      </section>

      {/* ── KATEGORİ: TEMALAR ── */}
      <SectionDivider label="Sektörel Temalar" />

      <section>
        <SectionTitle
          tag="Temalar"
          title="8 Sektörel Renk Teması"
          description="Her tema bir sektör veya estetik anlayışa özel renk paleti içerir. Aynı desen farklı temalarda tamamen farklı bir his verir."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => { setActiveTheme(t.id); }}
              className="text-left group"
            >
              <BackgroundPattern
                pattern={activePattern}
                theme={t.id}
                opacity={0.5}
                className={`rounded-[var(--radius-lg)] border-2 transition-all ${
                  activeTheme === t.id
                    ? "border-primary shadow-md scale-[1.02]"
                    : "border-border hover:border-border-strong"
                } h-36`}
              >
                <div className="h-full flex flex-col justify-between p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{t.emoji}</span>
                    <span
                      className="size-3 rounded-full"
                      style={{ background: t.hex }}
                    />
                  </div>
                  <div>
                    <div className={`text-sm font-bold ${t.color}`}>{t.label}</div>
                    <div className="text-xs text-foreground-muted mt-0.5 leading-snug">{t.description}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {t.useCases.slice(0, 2).map((u) => (
                        <span key={u} className="text-[10px] px-1.5 py-0.5 rounded bg-background/70 border border-border text-foreground-muted">
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
      </section>

      {/* Tema detay */}
      <section>
        <SectionTitle
          tag="Tema Detayı"
          title={`${currentTheme.emoji} ${currentTheme.label} Teması`}
          description={`"${currentTheme.label}" teması için önerilen desenler ve kullanım alanları.`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePattern(p.id)}
              className="text-left group"
            >
              <BackgroundPattern
                pattern={p.id}
                theme={activeTheme}
                opacity={0.55}
                className={`rounded-[var(--radius-lg)] border-2 transition-all h-24 ${
                  activePattern === p.id
                    ? "border-primary shadow-md"
                    : "border-border hover:border-border-strong"
                }`}
              >
                <div className="h-full flex flex-col justify-between p-2.5">
                  <div />
                  <div>
                    <span className="text-xs font-semibold text-foreground bg-background/80 px-1.5 py-0.5 rounded">
                      {p.label}
                    </span>
                    <div className="text-[10px] text-foreground-muted mt-0.5 leading-tight">{p.desc}</div>
                  </div>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
        {/* Use cases */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-foreground-muted text-xs font-medium uppercase tracking-wider">Kullanım alanları:</span>
          {currentTheme.useCases.map((u) => (
            <span key={u} className={`px-3 py-1 rounded-full text-xs font-medium ${currentTheme.bg} ${currentTheme.color}`}>{u}</span>
          ))}
        </div>
      </section>

      {/* ── KATEGORİ: DESEN KATEGORİLERİ ── */}
      <SectionDivider label="Desen Kategorileri" />

      <section>
        <SectionTitle
          tag="Desenler"
          title="12 SVG Deseni — 4 Kategori"
          description="Her kategori farklı bir görsel dil ve his sunar. Kategoriye göre filtreleyerek proje ruhuna uygun deseni bulun."
        />

        {PATTERN_CATEGORIES.map((cat) => (
          <div key={cat.id} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
              <span className="text-xs text-foreground-muted">— {cat.desc}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {PATTERNS.filter((p) => p.category === cat.id).map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setActivePattern(p.id); }}
                  className="text-left group"
                >
                  <BackgroundPattern
                    pattern={p.id}
                    theme={activeTheme}
                    opacity={0.6}
                    className={`rounded-[var(--radius-lg)] border-2 transition-all h-28 ${
                      activePattern === p.id
                        ? "border-primary shadow-md"
                        : "border-border hover:border-border-strong"
                    }`}
                  >
                    <div className="h-full flex flex-col justify-between p-3">
                      <div />
                      <div>
                        <div className="text-xs font-semibold text-foreground bg-background/80 px-1.5 py-0.5 rounded inline-block">
                          {p.label}
                        </div>
                        <div className="text-[10px] text-foreground-muted mt-1 leading-snug">{p.desc}</div>
                      </div>
                    </div>
                  </BackgroundPattern>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ── KATEGORİ: GERÇEK HERO ÖRNEKLERİ ── */}
      <SectionDivider label="Gerçek Kullanım Örnekleri" />

      <section>
        <SectionTitle
          tag="Hero Mockuplar"
          title="Sektöre Özel Landing Page Hero'ları"
          description="Her kombinasyon, o sektörün gerçek bir landing page hero bölümünü simüle eder. Tıklayarak önizlemeyi güncelleyebilirsiniz."
        />
        <div className="space-y-6">
          {COMBOS.map((combo) => {
            const theme = THEMES.find((t) => t.id === combo.theme)!;
            return (
              <div key={`${combo.pattern}-${combo.theme}`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold text-foreground">{combo.label}</span>
                    <span className="text-xs text-foreground-muted ml-2">— {combo.desc}</span>
                  </div>
                  <button
                    onClick={() => { setActivePattern(combo.pattern); setActiveTheme(combo.theme); }}
                    className="text-xs text-primary hover:underline underline-offset-2"
                  >
                    Önizlemede Aç →
                  </button>
                </div>
                <BackgroundPattern
                  pattern={combo.pattern}
                  theme={combo.theme}
                  opacity={0.45}
                  className="rounded-[var(--radius-xl)] border border-border bg-background min-h-[220px] flex items-center"
                >
                  <div className="w-full max-w-2xl mx-auto px-8 py-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex-1 text-center sm:text-left">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${theme.bg} ${theme.color}`}>
                        {theme.emoji} {combo.tag}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-2">{combo.headline}</h3>
                      <p className="text-sm text-foreground-muted leading-relaxed mb-4">{combo.sub}</p>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <button className="px-4 py-2 bg-primary text-primary-foreground text-xs font-medium rounded-[var(--radius-md)] hover:opacity-90 transition-opacity">
                          {combo.cta}
                        </button>
                        <button className="px-4 py-2 border border-border text-foreground text-xs font-medium rounded-[var(--radius-md)] hover:bg-background-muted transition-colors">
                          Daha Fazla
                        </button>
                      </div>
                    </div>
                    {/* Decorative mockup box */}
                    <div className="shrink-0 hidden sm:block">
                      <BackgroundPattern
                        pattern={combo.pattern}
                        theme={combo.theme}
                        opacity={0.3}
                        className="size-28 rounded-[var(--radius-lg)] border border-border flex items-center justify-center"
                      >
                        <span className="text-4xl">{theme.emoji}</span>
                      </BackgroundPattern>
                    </div>
                  </div>
                </BackgroundPattern>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── KATEGORİ: OPAKLIL SKALASI ── */}
      <SectionDivider label="Opaklık Rehberi" />

      <section>
        <SectionTitle
          tag="Opaklık"
          title="Opaklık Değerinin Etkisi"
          description="Aynı desen farklı opaklık değerlerinde çok farklı görünür. Doğru değeri seçmek tasarımın kalitesini belirler."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[0.1, 0.25, 0.5, 0.75, 1].map((op) => (
            <div key={op}>
              <BackgroundPattern
                pattern={activePattern}
                theme={activeTheme}
                opacity={op}
                className="rounded-[var(--radius-lg)] border border-border h-24 flex items-end p-2"
              >
                <span className="text-xs font-mono bg-background/80 px-1.5 py-0.5 rounded text-foreground">
                  {Math.round(op * 100)}%
                </span>
              </BackgroundPattern>
              <p className="text-[10px] text-foreground-muted mt-1.5 text-center">
                {op === 0.1 && "Çok hafif"}
                {op === 0.25 && "Hafif"}
                {op === 0.5 && "Orta"}
                {op === 0.75 && "Belirgin"}
                {op === 1 && "Tam"}
              </p>
              <p className="text-[10px] text-foreground-subtle mt-0.5 text-center">
                {op === 0.1 && "Metin okunurluğu çok yüksek"}
                {op === 0.25 && "Metin üzerinde güvenli"}
                {op === 0.5 && "Hero için ideal"}
                {op === 0.75 && "Desen ön planda"}
                {op === 1 && "Maksimum desen"}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-[var(--radius-lg)] bg-background-muted border border-border text-xs text-foreground-muted leading-relaxed">
          <span className="font-semibold text-foreground">İpucu:</span> Hero ve banner bölümleri için{" "}
          <code className="bg-background px-1 rounded border border-border">opacity=&#123;0.35&#125;</code> ile{" "}
          <code className="bg-background px-1 rounded border border-border">opacity=&#123;0.6&#125;</code>{" "}
          arasındaki değerler en iyi okunurluğu sağlar. Çok açık renk temalarda daha yüksek, koyu arka planlarda daha düşük opaklık tercih edin.
        </div>
      </section>

      {/* ── KATEGORİ: KARŞILAŞTIRMA ── */}
      <SectionDivider label="Aynı Desen — Farklı Tema" />

      <section>
        <SectionTitle
          tag="Karşılaştırma"
          title="Aynı Desen, 8 Farklı Tema"
          description={`"${PATTERNS.find((p) => p.id === activePattern)?.label}" deseni tüm temalarda nasıl görünür?`}
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className="text-left"
            >
              <BackgroundPattern
                pattern={activePattern}
                theme={t.id}
                opacity={0.55}
                className={`rounded-[var(--radius-lg)] border-2 transition-all h-20 flex items-end p-2 ${
                  activeTheme === t.id ? "border-primary shadow-md" : "border-border hover:border-border-strong"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 rounded-full shrink-0"
                    style={{ background: t.hex }}
                  />
                  <span className="text-xs font-semibold text-foreground bg-background/80 px-1 py-0.5 rounded">
                    {t.label}
                  </span>
                </div>
              </BackgroundPattern>
            </button>
          ))}
        </div>
      </section>

      {/* ── KATEGORİ: NASIL KULLANILIR ── */}
      <SectionDivider label="Nasıl Kullanılır" />

      <section className="space-y-6">
        <SectionTitle
          tag="Kullanım"
          title="Kurulum ve Kod Örnekleri"
          description="Bileşeni projenize entegre etmek için aşağıdaki örnekleri kullanın."
        />

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">1. Temel Kullanım</h3>
            <CodeBlock code={`import { BackgroundPattern } from "@/components/ui/background-pattern";

// En sade kullanım
<BackgroundPattern pattern="dots" theme="minimal">
  <YourContent />
</BackgroundPattern>`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">2. Hero Section</h3>
            <CodeBlock code={`// Landing page hero bölümü
<BackgroundPattern
  pattern="circuit"
  theme="tech"
  opacity={0.4}
  className="min-h-screen flex items-center"
>
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-5xl font-bold">AI ile Kod Yaz</h1>
    <p className="text-xl mt-4 text-foreground-muted">
      Geliştirme sürecinizi 10x hızlandırın.
    </p>
    <button className="mt-8 px-8 py-3 bg-primary text-white rounded-lg">
      Ücretsiz Başla
    </button>
  </div>
</BackgroundPattern>`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">3. CTA (Call-to-Action) Bölümü</h3>
            <CodeBlock code={`// Sayfa sonu CTA bölümü
<BackgroundPattern
  pattern="hexagons"
  theme="modern"
  opacity={0.35}
  className="rounded-2xl py-20 px-8 text-center"
>
  <h2 className="text-3xl font-bold">Bugün Başlayın</h2>
  <p className="mt-3 text-foreground-muted">14 gün ücretsiz deneme, kredi kartı gerekmez.</p>
  <button className="mt-6 px-8 py-3 bg-primary text-white rounded-lg font-semibold">
    Ücretsiz Dene
  </button>
</BackgroundPattern>`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">4. Bölüm Ayırıcı</h3>
            <CodeBlock code={`// Sayfa içi bölüm arka planı
<section>
  <BackgroundPattern
    pattern="waves"
    theme="food"
    opacity={0.25}
    className="py-16"
  >
    <div className="container mx-auto">
      <h2>Öne Çıkan Ürünler</h2>
      <ProductGrid />
    </div>
  </BackgroundPattern>
</section>`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">5. Kart / Panel Arka Planı</h3>
            <CodeBlock code={`// Pricing card veya feature panel
<BackgroundPattern
  pattern="diamonds"
  theme="geometric"
  opacity={0.3}
  className="rounded-xl border border-border p-8"
>
  <div className="text-center">
    <span className="text-4xl font-bold">₺299</span>
    <span className="text-foreground-muted">/ay</span>
    <p className="mt-2 text-sm text-foreground-muted">Pro Plan</p>
    <ul className="mt-6 space-y-2 text-sm">
      <li>✓ Sınırsız proje</li>
      <li>✓ Öncelikli destek</li>
      <li>✓ Özel alan adı</li>
    </ul>
  </div>
</BackgroundPattern>`} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">6. Dinamik Tema (Kullanıcı Seçimi)</h3>
            <CodeBlock code={`// Kullanıcının seçtiği tema ile dinamik background
const [theme, setTheme] = useState<PatternTheme>("minimal");

<BackgroundPattern
  pattern="dots"
  theme={theme}
  opacity={0.5}
  className="min-h-[300px]"
>
  {/* içerik */}
</BackgroundPattern>

{/* Tema seçici */}
<div className="flex gap-2 mt-4">
  {themes.map((t) => (
    <button key={t} onClick={() => setTheme(t)}>
      {t}
    </button>
  ))}
</div>`} />
          </div>
        </div>
      </section>

      {/* ── PROPS TABLOSU ── */}
      <SectionDivider label="API Referansı" />

      <section className="space-y-6">
        <SectionTitle
          tag="Props"
          title="Bileşen API'si"
          description="BackgroundPattern bileşeninin tüm prop'ları ve tip tanımları."
        />

        {/* Props table */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">BackgroundPattern Props</h3>
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
                  ["opacity", "number", "1", "Desen katmanı opaklığı (0–1 arası)"],
                  ["className", "string", "—", "Wrapper div'e eklenen Tailwind sınıfları"],
                  ["children", "ReactNode", "—", "İçerik — pattern katmanının üstünde render edilir"],
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
        </div>

        {/* PatternId values */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">PatternId Değerleri</h3>
          <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-subtle">
                <tr>
                  {["Değer", "Etiket", "Kategori", "Önerilen Kullanım"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider border-b border-border">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PATTERNS.map((p) => (
                  <tr key={p.id} className="hover:bg-background-subtle/50">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">&quot;{p.id}&quot;</td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{p.label}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground-muted capitalize">{p.category}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground-muted">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PatternTheme values */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">PatternTheme Değerleri</h3>
          <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-subtle">
                <tr>
                  {["Değer", "Etiket", "Renk", "Kullanım Alanları"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-foreground-muted uppercase tracking-wider border-b border-border">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {THEMES.map((t) => (
                  <tr key={t.id} className="hover:bg-background-subtle/50">
                    <td className="px-4 py-2.5 font-mono text-xs text-primary">&quot;{t.id}&quot;</td>
                    <td className="px-4 py-2.5 text-xs text-foreground flex items-center gap-2">
                      <span className="size-3 rounded-full shrink-0" style={{ background: t.hex }} />
                      {t.label}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-foreground-muted">{t.hex}</td>
                    <td className="px-4 py-2.5 text-xs text-foreground-muted">{t.useCases.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tip */}
        <div className="p-4 rounded-[var(--radius-lg)] bg-primary/5 border border-primary/20 text-xs text-foreground-muted leading-relaxed">
          <span className="font-semibold text-foreground">Erişilebilirlik notu:</span> BackgroundPattern yalnızca dekoratif amaçlıdır.
          SVG katmanı <code className="bg-background px-1 rounded border border-border">aria-hidden=&quot;true&quot;</code> ile işaretlenmiştir ve ekran okuyucular tarafından yok sayılır.
          Metin içeriğinin desen rengiyle yeterli kontrast oranını koruduğundan emin olun — bunun için{" "}
          <code className="bg-background px-1 rounded border border-border">opacity</code> değerini düşürün.
        </div>
      </section>

    </div>
  );
}
