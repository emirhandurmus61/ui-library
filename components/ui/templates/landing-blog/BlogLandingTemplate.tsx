"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const CATEGORIES = ["Tümü", "Teknoloji", "Tasarım", "Kariyer", "Araçlar", "Kişisel Gelişim"];

const ARTICLES: {
  gradient: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
}[] = [
  {
    gradient: "from-violet-400 to-indigo-500",
    category: "Teknoloji",
    title: "React 19'un Yeni Özellikleri: Ne Değişti?",
    excerpt: "Actions, use() hook, ve daha fazlası — React 19 ile gelen değişikliklere kapsamlı bir bakış.",
    author: "Ahmet Yıldız",
    date: "20 May 2026",
    readTime: "6 dk",
  },
  {
    gradient: "from-rose-400 to-pink-500",
    category: "Tasarım",
    title: "Minimal UI Tasarımında 7 Altın Kural",
    excerpt: "Daha az ile daha fazlasını anlatmak. Başarılı minimal tasarımın arkasındaki prensipler.",
    author: "Selin Kaya",
    date: "15 May 2026",
    readTime: "5 dk",
  },
  {
    gradient: "from-amber-400 to-orange-500",
    category: "Kariyer",
    title: "Senior Yazılımcıya Giden Yolda 5 Kritik Adım",
    excerpt: "Sadece kod yazmak yetmez. Kariyer basamaklarını hızlı çıkmak için yapmanız gerekenler.",
    author: "Can Demir",
    date: "10 May 2026",
    readTime: "8 dk",
  },
  {
    gradient: "from-teal-400 to-emerald-500",
    category: "Araçlar",
    title: "2026'nın En İyi Geliştirici Araçları",
    excerpt: "Verimliliğinizi artıracak, iş akışınızı kolaylaştıracak araçların derlediğimiz listesi.",
    author: "Berk Şahin",
    date: "5 May 2026",
    readTime: "4 dk",
  },
  {
    gradient: "from-sky-400 to-blue-500",
    category: "Teknoloji",
    title: "TypeScript ile Tip Güvenli API Katmanı",
    excerpt: "Zod, tRPC ve TypeScript kullanarak uçtan uca tip güvenli uygulamalar nasıl inşa edilir.",
    author: "Ahmet Yıldız",
    date: "1 May 2026",
    readTime: "7 dk",
  },
  {
    gradient: "from-purple-400 to-violet-500",
    category: "Kişisel Gelişim",
    title: "Geliştirici Olarak Tükenmişliği Önlemenin Yolları",
    excerpt: "Sürdürülebilir bir çalışma ritmi kurmak ve uzun vadede motivasyonunuzu korumak için ipuçları.",
    author: "Nil Öztürk",
    date: "25 Nis 2026",
    readTime: "6 dk",
  },
];

const TAGS = ["Next.js", "TypeScript", "Tailwind", "React", "Figma", "Node.js", "PostgreSQL", "DevOps", "AI", "UI/UX", "Agile", "Remote Work"];

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Konular", "Yazarlar", "Bülten", "Hakkında"];

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">B</span>
          <span className="font-bold text-gray-900 tracking-tight">Bytes&amp;Bits</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Ara">
            <SearchIcon />
          </Button>
          <Button size="sm" stylePreset="gradient" className="hidden sm:inline-flex">
            Abone Ol
          </Button>
          <button
            className="md:hidden text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {links.map((l) => (
            <a key={l} href="#" className="block text-sm text-gray-600 hover:text-gray-900 py-1.5 transition-colors">{l}</a>
          ))}
          <div className="pt-2">
            <Button size="sm" stylePreset="gradient" className="w-full">Abone Ol</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function FeaturedHeroPost() {
  return (
    <section className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Card variant="basic" stylePreset="default" className="overflow-hidden p-0">
          <div className="relative bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 min-h-[360px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-10 right-10 w-64 h-64 rounded-full border-4 border-white" />
              <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full border-2 border-white" />
            </div>

            {/* Öne çıkan badge */}
            <div className="relative mb-4">
              <Badge variant="warning" size="sm">✦ Öne Çıkan</Badge>
            </div>

            <div className="relative">
              <h1 className="text-2xl sm:text-4xl font-bold text-white leading-snug mb-4 max-w-2xl">
                Yapay Zeka ve Yazılım Geliştirme: 2026&apos;da Gerçekten Ne Değişti?
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" name="Deniz Yılmaz" />
                  <span className="text-white/80 text-sm font-medium">Deniz Yılmaz</span>
                </div>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon />
                    22 May 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon />
                    12 dk okuma
                  </span>
                </div>
              </div>

              <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                Makaleyi Oku
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function CategoryFilter({ active, setActive }: { active: string; setActive: (c: string) => void }) {
  return (
    <section className="px-4 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                active === cat
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesGrid({ activeCategory }: { activeCategory: string }) {
  const filtered = activeCategory === "Tümü"
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <section className="px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((article) => (
            <Card key={article.title} variant="interactive" stylePreset="default" className="overflow-hidden p-0 flex flex-col group">
              {/* Thumbnail */}
              <div className={`aspect-video bg-gradient-to-br ${article.gradient}`} />

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <Badge variant="secondary" size="sm">{article.category}</Badge>
                </div>

                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-700 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed flex-1 line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" name={article.author} />
                    <span className="text-xs text-gray-500 font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1">
                      <ClockIcon />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Bu kategoride henüz içerik yok.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="px-4 py-16 bg-gray-50">
      <div className="max-w-xl mx-auto text-center">
        <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-5">
          <MailIcon />
        </div>
        <Badge variant="primary" className="mb-4">Bülten</Badge>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Haftalık bültenimize abone olun
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Her Pazartesi sabahı, haftanın en iyi teknoloji ve tasarım yazılarını, araçlarını ve ipuçlarını gelen kutunuza gönderiyoruz.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <Button stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
            Abone Ol
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
          <span className="font-semibold text-gray-600">2000+</span> okuyucu zaten aramıza katıldı · Spam yok, istediğin zaman çık
        </p>
      </div>
    </section>
  );
}

function PopularTagsSection() {
  return (
    <section className="px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Popüler Etiketler</h2>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <Badge key={tag} variant="outline" size="sm" className="cursor-pointer hover:border-gray-400 transition-colors">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 px-4 mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">B</span>
              <span className="font-bold text-gray-900 tracking-tight">Bytes&amp;Bits</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Yazılım geliştirme, tasarım ve kariyer hakkında haftalık içerikler.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Keşfet</p>
              {["Tüm Yazılar", "Konular", "Yazarlar", "Arşiv"].map((l) => (
                <a key={l} href="#" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2">{l}</a>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Şirket</p>
              {["Hakkımızda", "Bülten", "İletişim", "RSS"].map((l) => (
                <a key={l} href="#" className="block text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2026 Bytes&amp;Bits. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4">
            {["Gizlilik", "Şartlar"].map((l) => (
              <a key={l} href="#" className="text-xs text-gray-400 hover:text-gray-700 transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function BlogLandingTemplate() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <FeaturedHeroPost />
      <CategoryFilter active={activeCategory} setActive={setActiveCategory} />
      <ArticlesGrid activeCategory={activeCategory} />
      <NewsletterSection />
      <PopularTagsSection />
      <Footer />
    </div>
  );
}
