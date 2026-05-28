"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
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

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const CATEGORIES = [
  { name: "Kadın", gradientFrom: "from-rose-400", gradientTo: "to-pink-600" },
  { name: "Erkek", gradientFrom: "from-blue-500", gradientTo: "to-indigo-700" },
  { name: "Çocuk", gradientFrom: "from-amber-400", gradientTo: "to-orange-500" },
  { name: "Aksesuar", gradientFrom: "from-emerald-400", gradientTo: "to-teal-600" },
  { name: "Spor", gradientFrom: "from-violet-500", gradientTo: "to-purple-700" },
  { name: "Ev & Yaşam", gradientFrom: "from-cyan-400", gradientTo: "to-sky-600" },
];

const PRODUCTS = [
  {
    name: "Oversize Keten Gömlek",
    price: "₺649",
    oldPrice: "₺899",
    badge: "İndirim",
    badgeVariant: "danger" as const,
    gradientFrom: "from-amber-100",
    gradientTo: "to-orange-200",
  },
  {
    name: "Premium Deri Sneaker",
    price: "₺1.299",
    oldPrice: null,
    badge: "Yeni",
    badgeVariant: "primary" as const,
    gradientFrom: "from-slate-100",
    gradientTo: "to-gray-200",
  },
  {
    name: "Relaxed Fit Jean",
    price: "₺799",
    oldPrice: "₺999",
    badge: "İndirim",
    badgeVariant: "danger" as const,
    gradientFrom: "from-blue-100",
    gradientTo: "to-indigo-200",
  },
  {
    name: "Kaşmir Kazak",
    price: "₺1.099",
    oldPrice: null,
    badge: "Trend",
    badgeVariant: "warning" as const,
    gradientFrom: "from-rose-100",
    gradientTo: "to-pink-200",
  },
];

const HOW_IT_WORKS = [
  {
    icon: <CheckCircleIcon />,
    title: "Sipariş Ver",
    desc: "Beğendiğin ürünleri sepete ekle, hızlı ve güvenli ödeme yap.",
    color: "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300",
  },
  {
    icon: <PackageIcon />,
    title: "Hazırlanır",
    desc: "Siparişin özenle paketlenir ve aynı gün kargoya verilir.",
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300",
  },
  {
    icon: <TruckIcon />,
    title: "Teslim Edilir",
    desc: "2-3 iş günü içinde kapına kadar ücretsiz teslimat.",
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
];

const REVIEWS = [
  {
    author: "Selin Yıldız",
    rating: 5,
    comment: "Kalitesi gerçekten mükemmel. Fotoğraftaki gibi geldi, hatta daha iyi. Kesinlikle tavsiye ederim.",
  },
  {
    author: "Emre Çelik",
    rating: 5,
    comment: "Hızlı kargo, güzel paketleme. Ürünün kumaşı çok kaliteli, bedenim tam oturdu.",
  },
  {
    author: "Ayşe Kara",
    rating: 4,
    comment: "Çok güzel bir alışveriş deneyimi. Müşteri hizmetleri de çok ilgili ve yardımsever.",
  },
];

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 3;
  const links = ["Koleksiyonlar", "Hakkımızda", "Blog"];

  return (
    <nav className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-[var(--radius-md)] bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm select-none">
            M
          </div>
          <span className="font-bold text-base text-foreground hidden sm:block tracking-tight">Modeva</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" aria-label="Ara" className="hidden sm:inline-flex">
            <SearchIcon />
          </Button>

          {/* Cart with badge count */}
          <div className="relative">
            <Button variant="ghost" size="icon-sm" aria-label={`Sepet, ${cartCount} ürün`}>
              <ShoppingCartIcon />
            </Button>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center pointer-events-none" aria-hidden="true">
                {cartCount}
              </span>
            )}
          </div>

          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Hesabım
          </Button>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors ml-1"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-foreground-muted hover:text-foreground transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex items-center gap-2 pt-1">
            <Button variant="ghost" size="sm" leftIcon={<SearchIcon />}>Ara</Button>
            <Button variant="ghost" size="sm">Hesabım</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div className="order-2 md:order-1">
          <div className="mb-5">
            <Badge variant="primary" size="lg" dot dotColor="primary">Yeni Sezon 2026</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
            Tarzını{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
              Yeniden
            </span>
            {" "}Keşfet
          </h1>
          <p className="text-lg text-foreground-muted leading-relaxed mb-8 max-w-md">
            2026 koleksiyonumuz ile sezonun en trend parçalarını keşfet. Ücretsiz kargo, kolay iade ve güvenli ödeme.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button stylePreset="gradient" size="lg" rightIcon={<ArrowRightIcon />}>
              Koleksiyonu Keşfet
            </Button>
            <Button variant="outline" size="lg">
              Kampanyalar
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap gap-6">
            {["Ücretsiz Kargo", "30 Gün İade", "Güvenli Ödeme"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-success-subtle flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-success" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className="text-sm text-foreground-muted">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right – product image placeholder */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-full max-w-sm">
            <div className="aspect-[3/4] rounded-[var(--radius-xl)] bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900/30 dark:via-pink-900/20 dark:to-purple-900/30 flex items-center justify-center shadow-2xl shadow-rose-200/50 dark:shadow-rose-900/20 overflow-hidden">
              {/* Decorative gradient circles */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 opacity-40 blur-xl" aria-hidden="true" />
              <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full bg-gradient-to-br from-violet-300 to-purple-400 opacity-30 blur-2xl" aria-hidden="true" />
              <div className="relative z-10 text-center p-8">
                <div className="w-20 h-20 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-10 text-rose-500" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <p className="text-foreground-muted text-sm font-medium">Ürün Görseli</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-3 -left-3 shadow-lg">
              <Card variant="elevated" padding="sm" className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-xl">🔥</span>
                <div>
                  <p className="text-xs font-bold text-foreground">Bu Hafta</p>
                  <p className="text-xs text-foreground-muted">%40'a varan indirim</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Keşfet</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Kategoriler</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              className="group relative aspect-square rounded-[var(--radius-xl)] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              aria-label={cat.name}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} transition-transform duration-300 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="relative z-10 flex items-end justify-center h-full pb-4 px-2">
                <span className="text-white font-semibold text-sm drop-shadow-md">{cat.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  function handleAdd(name: string) {
    setAddedIds((prev) => new Set(prev).add(name));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }, 1500);
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <Badge variant="secondary" className="mb-3">Önerilen</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Öne Çıkan Ürünler</h2>
          </div>
          <Button variant="ghost" size="sm" rightIcon={<ArrowRightIcon />} className="shrink-0">
            Tümünü Gör
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((product) => (
            <Card key={product.name} variant="interactive" padding="none" className="group">
              {/* Image placeholder */}
              <div className="relative aspect-square overflow-hidden rounded-t-[calc(var(--radius-xl)-1px)]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${product.gradientFrom} ${product.gradientTo} transition-transform duration-300 group-hover:scale-105`}
                />
                {/* Badge overlay */}
                <div className="absolute top-3 left-3">
                  <Badge variant={product.badgeVariant} size="sm">{product.badge}</Badge>
                </div>
                {/* Wishlist */}
                <button
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground-muted hover:text-danger transition-colors shadow-sm"
                  aria-label="Favorilere ekle"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>

              {/* Product info */}
              <div className="p-3 md:p-4">
                <h3 className="text-sm font-semibold text-foreground mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base font-bold text-foreground">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xs text-foreground-subtle line-through">{product.oldPrice}</span>
                  )}
                </div>
                <Button
                  size="sm"
                  className="w-full"
                  variant={addedIds.has(product.name) ? "secondary" : "primary"}
                  onClick={() => handleAdd(product.name)}
                >
                  {addedIds.has(product.name) ? "Eklendi ✓" : "Sepete Ekle"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Nasıl Çalışır?</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">3 Adımda Alışveriş</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-violet-200 via-amber-200 to-emerald-200 dark:from-violet-800 dark:via-amber-800 dark:to-emerald-800" aria-hidden="true" />

          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center relative">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${step.color} relative z-10`}>
                {step.icon}
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background flex items-center justify-center text-xs font-bold text-foreground-muted border border-border z-20">
                {i + 1}
              </div>
              <h3 className="font-semibold text-foreground mb-2 mt-2">{step.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Yorumlar</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Müşteri Yorumları</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled />
              ))}
            </div>
            <span className="text-sm text-foreground-muted">4.9 / 5 — 2.400+ değerlendirme</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <Card key={review.author} variant="elevated">
              {/* Stars */}
              <div className="flex text-warning mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < review.rating} />
                ))}
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4 italic">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar size="sm" name={review.author} />
                <p className="text-sm font-semibold text-foreground">{review.author}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
    }, 1000);
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 px-6 py-14 md:px-14 text-center overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5" aria-hidden="true" />

          <div className="relative z-10">
            <Badge variant="outline" size="md" className="mb-5 border-white/40 text-white bg-white/10">
              Bülten
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
              Yeni Koleksiyonlardan Haberdar Ol
            </h2>
            <p className="text-white/80 mb-8 max-w-md mx-auto">
              Haftanın özel tekliflerini ve yeni gelenleri ilk sen öğren. İstediğin zaman aboneliğini iptal edebilirsin.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Harika! Abone oldunuz.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="E-posta adresiniz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 px-4 text-sm rounded-[var(--radius-md)] border-0 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-2 focus:outline-offset-2 focus:outline-white/50 transition-colors"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  loading={loading}
                  leftIcon={<MailIcon />}
                  className="shrink-0 bg-white! text-rose-600! hover:bg-white/90! font-semibold"
                >
                  Abone Ol
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border pt-12 pb-6 px-4 bg-background-subtle">
      <div className="max-w-7xl mx-auto">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-[var(--radius-md)] bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-sm select-none">
                M
              </div>
              <span className="font-bold text-base text-foreground">Modeva</span>
            </div>
            <p className="text-sm text-foreground-muted leading-relaxed mb-5">
              Modern moda anlayışını uygun fiyatlarla buluşturuyoruz. Kalite ve stil, herkes için.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon-sm" aria-label="Instagram">
                <InstagramIcon />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Twitter">
                <TwitterIcon />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2.5">
              {["Kadın", "Erkek", "Çocuk", "Aksesuar", "Kampanyalar", "Blog"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">İletişim</h4>
            <ul className="space-y-2.5 text-sm text-foreground-muted">
              <li>
                <a href="mailto:destek@modeva.com" className="hover:text-foreground transition-colors">
                  destek@modeva.com
                </a>
              </li>
              <li>
                <a href="tel:+902121234567" className="hover:text-foreground transition-colors">
                  +90 212 123 45 67
                </a>
              </li>
              <li>Pazartesi – Cuma, 09:00 – 18:00</li>
            </ul>
            <div className="mt-5 space-y-2.5 text-sm text-foreground-muted">
              {["Gizlilik Politikası", "Kullanım Şartları", "İade & Değişim"].map((l) => (
                <div key={l}>
                  <a href="#" className="hover:text-foreground transition-colors">{l}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground-subtle">© 2026 Modeva. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-3">
            {/* Payment icons placeholder */}
            {["Visa", "MC", "iyzico"].map((p) => (
              <span key={p} className="inline-flex items-center px-2 py-1 rounded bg-background border border-border text-xs text-foreground-muted font-medium">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function EcommerceLandingTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <HowItWorksSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
