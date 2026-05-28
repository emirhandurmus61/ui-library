"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────── */

const CATEGORIES = ["Tümü", "Teknoloji", "Tasarım", "İş", "Kariyer"];

const FEATURED = {
  category: "Teknoloji",
  title: "React 19 ile Gelen Devrim Niteliğindeki Özellikler",
  summary:
    "React 19, Server Components, Suspense iyileştirmeleri ve yeni hooks API'siyle frontend geliştirmeyi kökten değiştiriyor. Bu yazıda yeni özellikleri detaylıca inceliyoruz.",
  author: { name: "Emirhan Durmuş", initials: "ED" },
  date: "14 Mayıs 2025",
  readTime: "8 dk",
};

const ARTICLES = [
  {
    id: 1,
    category: "Teknoloji",
    bg: "bg-blue-500",
    title: "Tailwind CSS v4: Sıfırdan Yazılan Yeni Motor",
    summary: "Tailwind v4, Rust tabanlı yeni motoru ile 10 kat daha hızlı build süreleri sunuyor.",
    author: { name: "Ayşe Kaya" },
    date: "10 Mayıs 2025",
    readTime: "5 dk",
  },
  {
    id: 2,
    category: "Tasarım",
    bg: "bg-violet-500",
    title: "2025 UI Trendleri: Glassmorphism'in Geri Dönüşü",
    summary: "Modern arayüz tasarımında glassmorphism ve liquid glass efektleri yeniden popüler oluyor.",
    author: { name: "Zeynep Arslan" },
    date: "8 Mayıs 2025",
    readTime: "4 dk",
  },
  {
    id: 3,
    category: "İş",
    bg: "bg-emerald-500",
    title: "Startup'ınız için Doğru Tech Stack Seçimi",
    summary: "İlk MVP'nizi geliştirirken hangi teknolojileri seçmelisiniz? Deneyimli kuruculardan öneriler.",
    author: { name: "Mert Yıldız" },
    date: "5 Mayıs 2025",
    readTime: "7 dk",
  },
  {
    id: 4,
    category: "Kariyer",
    bg: "bg-orange-500",
    title: "2025'te Junior Developer Olmak",
    summary: "Yazılım sektörüne giriş yapacaklar için kapsamlı bir yol haritası ve tavsiyeler.",
    author: { name: "Fatma Demir" },
    date: "2 Mayıs 2025",
    readTime: "6 dk",
  },
  {
    id: 5,
    category: "Teknoloji",
    bg: "bg-cyan-500",
    title: "TypeScript 5.5: Yeni Type Inference İyileştirmeleri",
    summary: "TypeScript 5.5 ile gelen inferred type predicates ve yeni strict mod seçenekleri.",
    author: { name: "Burak Çelik" },
    date: "28 Nisan 2025",
    readTime: "5 dk",
  },
  {
    id: 6,
    category: "Tasarım",
    bg: "bg-pink-500",
    title: "Figma'dan Koda: Design Token Sistemi Kurmak",
    summary: "Figma Variables ile tasarım sistemini koda nasıl aktarırsınız? Adım adım rehber.",
    author: { name: "Selin Öztürk" },
    date: "25 Nisan 2025",
    readTime: "9 dk",
  },
];

const categoryBadgeVariant = (cat: string): "primary" | "success" | "warning" | "danger" | "outline" => {
  switch (cat) {
    case "Teknoloji": return "primary";
    case "Tasarım": return "warning";
    case "İş": return "success";
    case "Kariyer": return "danger";
    default: return "outline";
  }
};

/* ─── BlogTemplate ───────────────────────────────────────────── */
export function BlogTemplate() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [page, setPage] = useState(1);

  const filtered =
    activeCategory === "Tümü"
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <div className="bg-background min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-base font-bold text-foreground">Nexus Blog</span>
            <div className="hidden md:flex items-center gap-6 text-sm text-foreground-muted">
              <a href="#" className="hover:text-foreground transition-colors">Teknoloji</a>
              <a href="#" className="hover:text-foreground transition-colors">Tasarım</a>
              <a href="#" className="hover:text-foreground transition-colors">İş</a>
              <a href="#" className="hover:text-foreground transition-colors">Kariyer</a>
            </div>
          </div>
          <button className="text-foreground-muted hover:text-foreground transition-colors" aria-label="Ara">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Featured Post Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-600 via-violet-600 to-purple-700" />
          <div className="p-6 md:p-8">
            <Badge variant={categoryBadgeVariant(FEATURED.category)} size="sm" className="mb-3">
              {FEATURED.category}
            </Badge>
            <h2 className="text-2xl font-bold text-foreground mb-3 leading-snug">
              {FEATURED.title}
            </h2>
            <p className="text-foreground-muted text-sm leading-relaxed mb-5 max-w-2xl">
              {FEATURED.summary}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={FEATURED.author.name} size="sm" />
                <div>
                  <p className="text-sm font-medium text-foreground">{FEATURED.author.name}</p>
                  <p className="text-xs text-foreground-muted">{FEATURED.date} · {FEATURED.readTime} okuma</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Devamını Oku →</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
              className={cn(
                "px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium whitespace-nowrap transition-colors",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-background-muted text-foreground-muted hover:text-foreground hover:bg-background-subtle"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Article Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-foreground-muted text-sm">Bu kategoride içerik bulunamadı.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="rounded-[var(--radius-xl)] border border-border bg-surface overflow-hidden hover:border-border-strong transition-colors cursor-pointer group"
              >
                <div className={cn("h-36 w-full", article.bg)} />
                <div className="p-5">
                  <Badge variant={categoryBadgeVariant(article.category)} size="sm" className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-foreground-muted leading-relaxed mb-4 line-clamp-2">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-2">
                    <Avatar name={article.author.name} size="xs" />
                    <span className="text-xs text-foreground-muted">{article.author.name}</span>
                    <span className="text-xs text-foreground-muted ml-auto">{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      <section className="max-w-6xl mx-auto px-6 pb-12 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ← Önceki
        </Button>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={cn(
              "size-8 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
              page === n
                ? "bg-primary text-primary-foreground"
                : "text-foreground-muted hover:bg-background-muted"
            )}
          >
            {n}
          </button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(5, p + 1))}
        >
          Sonraki →
        </Button>
      </section>
    </div>
  );
}
