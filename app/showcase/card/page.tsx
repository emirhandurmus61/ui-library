"use client";

import { useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Helpers ────────────────────────────────────────────────── */

function SectionTitle({
  tag,
  title,
  description,
  tagColor = "bg-primary-subtle text-primary",
}: {
  tag: string;
  title: string;
  description: string;
  tagColor?: string;
}) {
  return (
    <div className="mb-6">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${tagColor}`}>
        {tag}
      </span>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-foreground-muted mt-0.5">{description}</p>
    </div>
  );
}

/* ─── Star rating ────────────────────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} yıldız`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} viewBox="0 0 20 20" className={`size-3.5 ${s <= rating ? "fill-amber-400 text-amber-400" : "fill-foreground-subtle/30 text-foreground-subtle/30"}`} aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"/>
        </svg>
      ))}
    </div>
  );
}

/* ─── Icon helpers ───────────────────────────────────────────── */
function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
    </svg>
  );
}
function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
function TrendUpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════ */

export default function CardShowcase() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  return (
    <div className="max-w-5xl space-y-16">

      {/* ── Başlık ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Card</h1>
        <p className="text-foreground-muted text-sm">
          5 variant · 4 padding · 6 stylePreset — gerçek dünya senaryolarına göre kategorize edilmiş örnekler.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 1 — E-TİCARET KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="E-Ticaret"
          title="Ürün Kartları"
          description="Online mağaza, pazar yeri ve alışveriş uygulamaları için."
          tagColor="bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
        />

        {/* ProductCard — standart */}
        <ShowcaseSection
          title="ProductCard — Standart"
          description="Görsel + isim + fiyat + stok + sepet. En yaygın e-ticaret kartı."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          code={`<Card variant="interactive" padding="none" className="group">
  {/* Görsel */}
  <div className="relative overflow-hidden aspect-[4/3] bg-background-muted">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30" />
    <span className="absolute top-2 left-2">
      <Badge variant="danger" size="sm">-20%</Badge>
    </span>
    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50">
      <HeartIcon />
    </button>
  </div>
  {/* Bilgi */}
  <div className="p-4">
    <p className="text-xs text-foreground-muted mb-1">Kategori</p>
    <p className="text-sm font-semibold text-foreground leading-snug mb-2">Ürün Adı</p>
    <Stars rating={4} />
    <div className="flex items-center justify-between mt-3">
      <div>
        <span className="text-base font-bold text-foreground">₺299</span>
        <span className="ml-1.5 text-xs line-through text-foreground-subtle">₺374</span>
      </div>
      <Button size="sm" leftIcon={<CartIcon />}>Ekle</Button>
    </div>
  </div>
</Card>`}
        >
          {[
            { id: 1, name: "Kablosuz Kulaklık", category: "Elektronik", price: 299, old: 374, discount: 20, rating: 4, from: "from-violet-100 to-pink-100", dark: "dark:from-violet-900/30 dark:to-pink-900/30" },
            { id: 2, name: "Deri Cüzdan", category: "Aksesuar", price: 149, old: 149, discount: 0, rating: 5, from: "from-amber-100 to-orange-100", dark: "dark:from-amber-900/30 dark:to-orange-900/30" },
            { id: 3, name: "Spor Ayakkabı", category: "Giyim", price: 549, old: 699, discount: 21, rating: 4, from: "from-emerald-100 to-teal-100", dark: "dark:from-emerald-900/30 dark:to-teal-900/30" },
          ].map((p) => (
            <Card key={p.id} variant="interactive" padding="none" className="group">
              <div className="relative overflow-hidden aspect-[4/3] bg-background-muted">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.from} ${p.dark}`} />
                {p.discount > 0 && (
                  <span className="absolute top-2 left-2">
                    <Badge variant="danger" size="sm">-{p.discount}%</Badge>
                  </span>
                )}
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className={`absolute top-2 right-2 p-1.5 rounded-full bg-white/80 dark:bg-black/50 transition-colors ${wishlist.includes(p.id) ? "text-red-500" : "text-foreground-muted hover:text-red-400"}`}
                  aria-label="Favorilere ekle"
                >
                  <HeartIcon filled={wishlist.includes(p.id)} />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-foreground-muted mb-1">{p.category}</p>
                <p className="text-sm font-semibold text-foreground leading-snug mb-2">{p.name}</p>
                <Stars rating={p.rating} />
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-base font-bold text-foreground">₺{p.price}</span>
                    {p.discount > 0 && (
                      <span className="ml-1.5 text-xs line-through text-foreground-subtle">₺{p.old}</span>
                    )}
                  </div>
                  <Button size="sm" leftIcon={<CartIcon />}>Ekle</Button>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* ProductCard — Yatay (liste görünümü) */}
        <ShowcaseSection
          title="ProductCard — Yatay Liste"
          description="Sol görsel + sağ bilgi. Sepet sayfası ve arama sonuçları için idealdir."
          previewClassName="flex flex-col gap-3"
          code={`<Card variant="basic" padding="none" className="flex gap-0">
  <div className="w-24 h-24 shrink-0 bg-background-muted rounded-l-[var(--radius-xl)]" />
  <div className="flex flex-1 items-center justify-between p-4">
    <div>
      <p className="text-xs text-foreground-muted">Kategori</p>
      <p className="text-sm font-semibold text-foreground">Ürün Adı</p>
      <Stars rating={4} />
    </div>
    <div className="text-right">
      <p className="text-base font-bold text-foreground">₺299</p>
      <Button size="sm" variant="outline" className="mt-2">Sepete Ekle</Button>
    </div>
  </div>
</Card>`}
        >
          {[
            { id: 4, name: "Mekanik Klavye", cat: "Elektronik", price: 899, rating: 5, from: "from-blue-100 to-indigo-100", dark: "dark:from-blue-900/30 dark:to-indigo-900/30" },
            { id: 5, name: "Notebook Çantası", cat: "Aksesuar", price: 349, rating: 4, from: "from-slate-100 to-gray-200", dark: "dark:from-slate-900/30 dark:to-gray-900/30" },
            { id: 6, name: "USB-C Hub", cat: "Elektronik", price: 199, rating: 4, from: "from-rose-100 to-pink-100", dark: "dark:from-rose-900/30 dark:to-pink-900/30" },
          ].map((p) => (
            <Card key={p.id} variant="basic" padding="none" className="flex overflow-hidden">
              <div className={`w-24 sm:w-32 shrink-0 bg-gradient-to-br ${p.from} ${p.dark}`} />
              <div className="flex flex-1 flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="text-xs text-foreground-muted">{p.cat}</p>
                  <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                  <div className="mt-1"><Stars rating={p.rating} /></div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <p className="text-base font-bold text-foreground">₺{p.price}</p>
                  <Button size="sm" variant="outline" leftIcon={<CartIcon />}>Ekle</Button>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* CartItemCard */}
        <ShowcaseSection
          title="CartItemCard — Sepet"
          description="Adet kontrolü + kaldır. Sepet / checkout sayfası için."
          previewClassName="flex flex-col gap-3 max-w-xl"
          code={`<Card variant="basic" padding="none" className="flex overflow-hidden">
  {/* Görsel */}
  <div className="w-20 shrink-0 bg-background-muted" />
  {/* Bilgi */}
  <div className="flex flex-1 flex-col justify-between p-3 gap-2">
    <div className="flex justify-between gap-2">
      <p className="text-sm font-semibold text-foreground">Ürün</p>
      <button className="text-foreground-subtle hover:text-danger text-xs">Kaldır</button>
    </div>
    <p className="text-xs text-foreground-muted">Varyant: Siyah / L</p>
    <div className="flex items-center justify-between">
      {/* Adet */}
      <div className="flex items-center border border-border rounded-[var(--radius-md)]">
        <button className="px-2 py-1 text-sm text-foreground-muted hover:text-foreground">−</button>
        <span className="px-2 py-1 text-sm font-medium text-foreground border-x border-border">1</span>
        <button className="px-2 py-1 text-sm text-foreground-muted hover:text-foreground">+</button>
      </div>
      <span className="text-sm font-bold text-foreground">₺299</span>
    </div>
  </div>
</Card>`}
        >
          {[
            { id: 7, name: "Kablosuz Kulaklık", variant: "Siyah / Tek ebat", price: 299, qty: 1, from: "from-violet-100 to-pink-100", dark: "dark:from-violet-900/30 dark:to-pink-900/30" },
            { id: 8, name: "Deri Cüzdan", variant: "Kahverengi", price: 149, qty: 2, from: "from-amber-100 to-orange-100", dark: "dark:from-amber-900/30 dark:to-orange-900/30" },
          ].map((item) => {
            const [qty, setQty] = useState(item.qty);
            return (
              <Card key={item.id} variant="basic" padding="none" className="flex overflow-hidden">
                <div className={`w-20 shrink-0 bg-gradient-to-br ${item.from} ${item.dark}`} />
                <div className="flex flex-1 flex-col justify-between p-3 gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <button className="text-xs text-foreground-subtle hover:text-danger transition-colors shrink-0">Kaldır</button>
                  </div>
                  <p className="text-xs text-foreground-muted">{item.variant}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border rounded-[var(--radius-md)]">
                      <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-2 py-1 text-sm text-foreground-muted hover:text-foreground transition-colors">−</button>
                      <span className="px-2 py-1 text-sm font-medium text-foreground border-x border-border min-w-[2rem] text-center">{qty}</span>
                      <button onClick={() => setQty(qty + 1)} className="px-2 py-1 text-sm text-foreground-muted hover:text-foreground transition-colors">+</button>
                    </div>
                    <span className="text-sm font-bold text-foreground">₺{item.price * qty}</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 2 — BLOG & İÇERİK KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Blog / Medya"
          title="İçerik Kartları"
          description="Blog, haber, makale ve içerik listeleme uygulamaları için."
          tagColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />

        {/* ArticleCard — standart */}
        <ShowcaseSection
          title="ArticleCard — Standart"
          description="Kapak + kategori + başlık + özet + yazar + okuma süresi. Blog grid'leri için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          code={`<Card variant="interactive" padding="none">
  <div className="aspect-[16/9] bg-background-muted overflow-hidden" />
  <div className="p-5">
    <Badge variant="primary" size="sm">Teknoloji</Badge>
    <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug line-clamp-2">
      Yapay Zekanın Geleceği
    </h3>
    <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2">
      Kısa açıklama metni burada yer alır.
    </p>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar size="xs" name="Ali Veli" />
        <span className="text-xs text-foreground-muted">Ali Veli</span>
      </div>
      <div className="flex items-center gap-1 text-xs text-foreground-subtle">
        <ClockIcon />
        <span>5 dk</span>
      </div>
    </div>
  </div>
</Card>`}
        >
          {[
            { title: "Yapay Zekanın Geleceği ve İnsan Üzerindeki Etkileri", cat: "Teknoloji", catVariant: "primary" as const, author: "Ali Veli", read: 5, from: "from-blue-200 to-indigo-200", dark: "dark:from-blue-900/40 dark:to-indigo-900/40", desc: "2030 itibarıyla AI sistemlerinin toplumsal yapıyı nasıl dönüştüreceğine dair kapsamlı bir analiz." },
            { title: "Next.js 16 ile Sunucu Bileşenleri", cat: "Geliştirme", catVariant: "success" as const, author: "Selin Kaya", read: 8, from: "from-emerald-200 to-teal-200", dark: "dark:from-emerald-900/40 dark:to-teal-900/40", desc: "React Server Components paradigmasının pratik kullanımı ve performans kazanımları." },
            { title: "Minimalist Tasarımın 7 Altın Kuralı", cat: "Tasarım", catVariant: "warning" as const, author: "Can Demir", read: 4, from: "from-amber-200 to-orange-200", dark: "dark:from-amber-900/40 dark:to-orange-900/40", desc: "Daha azıyla daha fazlasını başarmanın sanat ve bilim arasındaki dengesi." },
          ].map((a, i) => (
            <Card key={i} variant="interactive" padding="none">
              <div className={`aspect-[16/9] bg-gradient-to-br ${a.from} ${a.dark} overflow-hidden`} />
              <div className="p-5">
                <Badge variant={a.catVariant} size="sm">{a.cat}</Badge>
                <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug line-clamp-2">{a.title}</h3>
                <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2">{a.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" name={a.author} />
                    <span className="text-xs text-foreground-muted">{a.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground-subtle">
                    <ClockIcon />
                    <span>{a.read} dk</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* ArticleCard — Yatay */}
        <ShowcaseSection
          title="ArticleCard — Yatay"
          description="Geniş ekranda yatay, dar ekranda dikey. Liste ve arama sonuçları için."
          previewClassName="flex flex-col gap-3"
          code={`<Card variant="basic" padding="none" className="flex flex-col sm:flex-row overflow-hidden">
  <div className="sm:w-44 aspect-[16/9] sm:aspect-auto bg-background-muted shrink-0" />
  <div className="flex flex-col justify-between p-4">
    <div>
      <Badge variant="primary" size="sm">Kategori</Badge>
      <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">Başlık</h3>
      <p className="mt-1 text-xs text-foreground-muted line-clamp-2">Açıklama</p>
    </div>
    <div className="mt-3 flex items-center gap-3">
      <Avatar size="xs" name="Yazar" />
      <span className="text-xs text-foreground-muted">Yazar · 5 dk</span>
      <Badge variant="outline" size="sm">Etiket</Badge>
    </div>
  </div>
</Card>`}
        >
          {[
            { title: "Tailwind CSS v4'ün Getirdiği Yenilikler", cat: "CSS", catVariant: "info" as const, author: "Merve Şahin", read: 6, tag: "Yeni", from: "from-sky-200 to-blue-200", dark: "dark:from-sky-900/40 dark:to-blue-900/40" },
            { title: "TypeScript 5.5 ile Tip Güvenliği", cat: "TypeScript", catVariant: "primary" as const, author: "Emre Yıldız", read: 7, tag: "Öne Çıkan", from: "from-violet-200 to-purple-200", dark: "dark:from-violet-900/40 dark:to-purple-900/40" },
          ].map((a, i) => (
            <Card key={i} variant="basic" padding="none" className="flex flex-col sm:flex-row overflow-hidden">
              <div className={`sm:w-44 aspect-[16/9] sm:aspect-auto bg-gradient-to-br ${a.from} ${a.dark} shrink-0`} />
              <div className="flex flex-col justify-between p-4">
                <div>
                  <Badge variant={a.catVariant} size="sm">{a.cat}</Badge>
                  <h3 className="mt-2 text-sm font-semibold text-foreground leading-snug">{a.title}</h3>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Avatar size="xs" name={a.author} />
                    <span className="text-xs text-foreground-muted">{a.author}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-foreground-subtle">
                    <ClockIcon />
                    <span>{a.read} dk</span>
                  </div>
                  <Badge variant="outline" size="sm">{a.tag}</Badge>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* FeaturedArticle */}
        <ShowcaseSection
          title="FeaturedArticleCard — Hero"
          description="Tam genişlik öne çıkan yazı. Blog ana sayfası hero bölümü için."
          previewClassName="w-full"
          code={`<Card variant="basic" padding="none" className="relative overflow-hidden">
  <div className="aspect-[21/9] sm:aspect-[3/1] bg-background-muted" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
  <div className="absolute bottom-0 left-0 p-5 sm:p-8">
    <Badge variant="danger" size="sm">Öne Çıkan</Badge>
    <h2 className="mt-2 text-lg sm:text-2xl font-bold text-white leading-snug max-w-xl">
      Başlık
    </h2>
    <div className="mt-3 flex items-center gap-3">
      <Avatar size="sm" name="Yazar" />
      <span className="text-sm text-white/80">Yazar · 10 dk okuma</span>
    </div>
  </div>
</Card>`}
        >
          <Card variant="basic" padding="none" className="relative overflow-hidden">
            <div className="aspect-[21/9] sm:aspect-[3/1] bg-gradient-to-br from-indigo-400 via-violet-500 to-pink-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-8">
              <Badge variant="danger" size="sm">Öne Çıkan</Badge>
              <h2 className="mt-2 text-lg sm:text-2xl font-bold text-white leading-snug max-w-xl">
                2026'da Web Geliştirmenin Geleceği: React, AI ve Edge Computing
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" name="Kemal Aydın" />
                  <span className="text-sm text-white/80">Kemal Aydın</span>
                </div>
                <span className="text-white/50 hidden sm:inline">·</span>
                <div className="flex items-center gap-1 text-sm text-white/70">
                  <ClockIcon />
                  <span>10 dk okuma</span>
                </div>
              </div>
            </div>
          </Card>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 3 — KULLANICI & PROFİL KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Kullanıcı / Profil"
          title="Kişi & Ekip Kartları"
          description="Ekip sayfaları, testimonial ve kullanıcı profilleri için."
          tagColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />

        {/* TeamMemberCard */}
        <ShowcaseSection
          title="TeamMemberCard"
          description="Avatar + isim + unvan + sosyal ikonlar. Hakkımızda / ekip sayfası için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          code={`<Card variant="elevated" className="text-center">
  <div className="flex flex-col items-center">
    <Avatar size="xl" name="Ayşe Kaya" status="online" />
    <h3 className="mt-3 text-sm font-semibold text-foreground">Ayşe Kaya</h3>
    <p className="text-xs text-foreground-muted mt-0.5">Ürün Tasarımcısı</p>
    <div className="flex gap-2 mt-3">
      <Button size="icon-sm" variant="ghost"><GithubIcon /></Button>
    </div>
  </div>
</Card>`}
        >
          {[
            { name: "Ayşe Kaya", role: "Ürün Tasarımcısı", status: "online" as const },
            { name: "Mert Yılmaz", role: "Fullstack Geliştirici", status: "busy" as const },
            { name: "Elif Şen", role: "Veri Bilimci", status: "away" as const },
            { name: "Burak Çelik", role: "DevOps Mühendisi", status: "offline" as const },
          ].map((m) => (
            <Card key={m.name} variant="elevated" className="text-center">
              <div className="flex flex-col items-center">
                <Avatar size="xl" name={m.name} status={m.status} />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{m.name}</h3>
                <p className="text-xs text-foreground-muted mt-0.5">{m.role}</p>
                <div className="flex gap-1.5 mt-3">
                  <Button size="icon-sm" variant="ghost" aria-label="GitHub"><GithubIcon /></Button>
                  <Button size="icon-sm" variant="ghost" aria-label="Dış link"><ExternalLinkIcon /></Button>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* TestimonialCard */}
        <ShowcaseSection
          title="TestimonialCard"
          description="Alıntı + yıldız + yazar + şirket. Landing page sosyal kanıt bölümü için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          code={`<Card variant="bordered" stylePreset="glow">
  <Stars rating={5} />
  <blockquote className="mt-3 text-sm text-foreground leading-relaxed">
    "Çok güzel bir ürün, ekibimiz büyük beğeniyle kullandı."
  </blockquote>
  <div className="mt-4 flex items-center gap-3">
    <Avatar size="sm" name="Zeynep Arslan" />
    <div>
      <p className="text-xs font-semibold text-foreground">Zeynep Arslan</p>
      <p className="text-xs text-foreground-muted">CTO, TechStartup</p>
    </div>
  </div>
</Card>`}
        >
          {[
            { quote: "Bu kütüphane proje geliştirme süremizi yarıya indirdi. Bileşenler çok iyi düşünülmüş.", author: "Zeynep Arslan", role: "CTO, TechStartup", rating: 5 },
            { quote: "Responsive tasarım ve dark mode desteği harika. Hiçbir şeyi sıfırdan yazmak zorunda kalmadım.", author: "Oğuz Türk", role: "Kurucu, DesignStudio", rating: 5 },
            { quote: "Erişilebilirlik odağı özellikle göze çarpıyor. WCAG standartlarına uyum mükemmel.", author: "Deniz Yıldız", role: "Frontend Müh., BigCorp", rating: 4 },
          ].map((t, i) => (
            <Card key={i} variant="bordered" stylePreset="glow">
              <Stars rating={t.rating} />
              <blockquote className="mt-3 text-sm text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <Avatar size="sm" name={t.author} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-foreground-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* UserProfileCard */}
        <ShowcaseSection
          title="UserProfileCard"
          description="Cover + avatar + bio + istatistikler + takip et. Sosyal ve SaaS profil sayfaları için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
          code={`<Card variant="elevated" padding="none" className="overflow-hidden">
  <div className="h-20 bg-gradient-to-r from-primary to-violet-500" />
  <div className="px-5 pb-5">
    <div className="-mt-7 mb-3">
      <Avatar size="lg" name="Serkan Doğan" status="online" className="ring-2 ring-surface" />
    </div>
    <h3 className="text-sm font-bold text-foreground">Serkan Doğan</h3>
    <p className="text-xs text-foreground-muted mt-0.5">Fullstack Developer · İstanbul</p>
    <div className="flex gap-4 mt-3">
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">142</p>
        <p className="text-xs text-foreground-muted">Takip</p>
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-foreground">3.4K</p>
        <p className="text-xs text-foreground-muted">Takipçi</p>
      </div>
    </div>
    <Button size="sm" className="mt-3 w-full">Takip Et</Button>
  </div>
</Card>`}
        >
          {[
            { name: "Serkan Doğan", role: "Fullstack Developer", loc: "İstanbul", following: 142, followers: "3.4K", from: "from-primary to-violet-500", status: "online" as const },
            { name: "Aylin Çetin", role: "UI/UX Tasarımcısı", loc: "Ankara", following: 89, followers: "1.2K", from: "from-pink-500 to-rose-500", status: "away" as const },
          ].map((u) => (
            <Card key={u.name} variant="elevated" padding="none" className="overflow-hidden">
              <div className={`h-20 bg-gradient-to-r ${u.from}`} />
              <div className="px-5 pb-5">
                <div className="-mt-7 mb-3">
                  <Avatar size="lg" name={u.name} status={u.status} className="ring-2 ring-surface" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{u.name}</h3>
                <p className="text-xs text-foreground-muted mt-0.5">{u.role} · {u.loc}</p>
                <div className="flex gap-5 mt-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">{u.following}</p>
                    <p className="text-xs text-foreground-muted">Takip</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">{u.followers}</p>
                    <p className="text-xs text-foreground-muted">Takipçi</p>
                  </div>
                </div>
                <Button size="sm" className="mt-3 w-full">Takip Et</Button>
              </div>
            </Card>
          ))}
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 4 — PROJe & PORTFÖLYo KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Portfolyo"
          title="Proje & Portfolyo Kartları"
          description="Kişisel site, ajans ve geliştirici portfolyoları için."
          tagColor="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
        />

        {/* ProjectCard */}
        <ShowcaseSection
          title="ProjectCard"
          description="Thumbnail + başlık + teknoloji etiketleri + GitHub / Demo linkleri."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          code={`<Card variant="interactive" padding="none" className="group">
  <div className="relative aspect-[16/9] overflow-hidden bg-background-muted">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20" />
    {/* Hover overlay */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
        Demo
      </Button>
      <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10">
        GitHub
      </Button>
    </div>
  </div>
  <div className="p-4">
    <h3 className="text-sm font-semibold text-foreground">Proje Adı</h3>
    <p className="text-xs text-foreground-muted mt-1 line-clamp-2">Kısa açıklama.</p>
    <div className="flex flex-wrap gap-1.5 mt-3">
      <Badge variant="secondary" size="sm">Next.js</Badge>
      <Badge variant="secondary" size="sm">TypeScript</Badge>
    </div>
  </div>
</Card>`}
        >
          {[
            { name: "E-Ticaret Platformu", desc: "Next.js ve Stripe ile tam işlevli alışveriş deneyimi.", tags: ["Next.js", "Stripe", "PostgreSQL"], from: "from-blue-400/30 to-indigo-500/30" },
            { name: "AI Chat Uygulaması", desc: "Claude API entegrasyonlu gerçek zamanlı sohbet platformu.", tags: ["React", "WebSocket", "Claude API"], from: "from-violet-400/30 to-pink-500/30" },
            { name: "Dashboard Analitik", desc: "Özelleştirilebilir metrik paneli ve raporlama aracı.", tags: ["TypeScript", "D3.js", "Tailwind"], from: "from-emerald-400/30 to-teal-500/30" },
          ].map((p, i) => (
            <Card key={i} variant="interactive" padding="none" className="group">
              <div className="relative aspect-[16/9] overflow-hidden bg-background-muted">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.from}`} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                  <Button size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10" leftIcon={<ExternalLinkIcon />}>Demo</Button>
                  <Button size="sm" variant="outline" className="border-white/40 text-white hover:bg-white/10" leftIcon={<GithubIcon />}>Kod</Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                <p className="text-xs text-foreground-muted mt-1 line-clamp-2">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tags.map((t) => <Badge key={t} variant="secondary" size="sm">{t}</Badge>)}
                </div>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* RepositoryCard */}
        <ShowcaseSection
          title="RepositoryCard"
          description="GitHub repo tarzı kart: dil rengi + yıldız + fork. Geliştirici portfolyoları için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 gap-3"
          code={`<Card variant="bordered" stylePreset="glow" className="hover:border-primary/40">
  <div className="flex items-start justify-between gap-3">
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <GithubIcon />
        <h3 className="text-sm font-semibold text-primary truncate">repo-adı</h3>
      </div>
      <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2">Açıklama</p>
    </div>
    <Badge variant="outline" size="sm">Public</Badge>
  </div>
  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
    <span className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      JavaScript
    </span>
    <span>⭐ 1.2k</span>
    <span>🍴 234</span>
  </div>
</Card>`}
        >
          {[
            { name: "ui-library", desc: "Next.js + Tailwind CSS v4 ile kişisel UI bileşen kütüphanesi.", lang: "TypeScript", langColor: "bg-blue-500", stars: "1.2k", forks: 234, visibility: "Public" },
            { name: "ai-chat-app", desc: "Claude API kullanarak inşa edilmiş gerçek zamanlı AI sohbet uygulaması.", lang: "JavaScript", langColor: "bg-yellow-400", stars: "456", forks: 89, visibility: "Public" },
            { name: "dashboard-kit", desc: "Yönetim panelleri için hazır şablonlar ve veri görselleştirme araçları.", lang: "TypeScript", langColor: "bg-blue-500", stars: "289", forks: 47, visibility: "Public" },
            { name: "cli-toolkit", desc: "Geliştirici araçları: proje iskelet oluşturma, kod üretimi ve deployment yardımcıları.", lang: "Go", langColor: "bg-cyan-400", stars: "178", forks: 32, visibility: "Private" },
          ].map((r) => (
            <Card key={r.name} variant="bordered" stylePreset="glow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground-muted shrink-0"><GithubIcon /></span>
                    <h3 className="text-sm font-semibold text-primary truncate">{r.name}</h3>
                  </div>
                  <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2">{r.desc}</p>
                </div>
                <Badge variant={r.visibility === "Public" ? "outline" : "secondary"} size="sm">{r.visibility}</Badge>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
                <span className="flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${r.langColor}`} aria-hidden="true" />
                  {r.lang}
                </span>
                <span>⭐ {r.stars}</span>
                <span>🍴 {r.forks}</span>
              </div>
            </Card>
          ))}
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 5 — SaaS & YÖNETİM PANELİ KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="SaaS / Yönetim"
          title="SaaS & Dashboard Kartları"
          description="Fiyatlandırma, entegrasyon, bildirim ve görev yönetimi uygulamaları için."
          tagColor="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
        />

        {/* PricingCard */}
        <ShowcaseSection
          title="PricingCard"
          description="Plan + fiyat + özellik listesi + CTA. Öne çıkan plan gradient-border ile vurgulanır."
          previewClassName="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start"
          code={`<Card stylePreset="gradient-border" variant="elevated">
  <div className="flex items-center justify-between mb-1">
    <h3 className="text-base font-bold text-foreground">Pro</h3>
    <Badge variant="primary">Popüler</Badge>
  </div>
  <div className="mt-2 mb-4">
    <span className="text-3xl font-extrabold text-foreground">₺299</span>
    <span className="text-sm text-foreground-muted">/ay</span>
  </div>
  <ul className="space-y-2 mb-5">
    {["5 proje", "Sınırsız kullanıcı", "API erişimi"].map(f => (
      <li key={f} className="flex items-center gap-2 text-sm text-foreground">
        <span className="text-success">✓</span> {f}
      </li>
    ))}
  </ul>
  <Button stylePreset="gradient" className="w-full">Başla</Button>
</Card>`}
        >
          {[
            { name: "Başlangıç", price: "Ücretsiz", badge: null, features: ["1 proje", "3 kullanıcı", "Topluluk desteği", "5GB depolama"], cta: "Hemen Başla", ctaVariant: "outline" as const, featured: false, preset: "default" as const },
            { name: "Pro", price: "₺299", badge: "Popüler", features: ["Sınırsız proje", "25 kullanıcı", "Öncelikli destek", "100GB depolama", "API erişimi"], cta: "14 Gün Ücretsiz", ctaVariant: "primary" as const, featured: true, preset: "gradient-border" as const },
            { name: "Kurumsal", price: "₺999", badge: null, features: ["Sınırsız her şey", "SSO & SAML", "SLA garantisi", "Özel entegrasyon", "Dedike destek"], cta: "Satışla İletişim", ctaVariant: "outline" as const, featured: false, preset: "default" as const },
          ].map((plan) => (
            <Card key={plan.name} stylePreset={plan.preset} variant={plan.featured ? "elevated" : "basic"}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                {plan.badge && <Badge variant="primary" size="sm">{plan.badge}</Badge>}
              </div>
              <div className="mt-2 mb-5">
                <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                {plan.price !== "Ücretsiz" && <span className="text-sm text-foreground-muted">/ay</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-success shrink-0" aria-hidden="true">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.ctaVariant} stylePreset={plan.featured ? "gradient" : "default"} className="w-full">{plan.cta}</Button>
            </Card>
          ))}
        </ShowcaseSection>

        {/* NotificationCard */}
        <ShowcaseSection
          title="NotificationCard"
          description="İkon + başlık + açıklama + zaman + okundu durumu. Bildirim merkezi için."
          previewClassName="flex flex-col gap-2 max-w-md"
          code={`<Card variant="basic" padding="sm" className="flex gap-3">
  <div className="w-8 h-8 rounded-full bg-primary-subtle flex items-center justify-center text-primary shrink-0">
    ✓
  </div>
  <div className="flex-1 min-w-0">
    <div className="flex items-start justify-between gap-2">
      <p className="text-sm font-medium text-foreground">Başlık</p>
      <span className="text-xs text-foreground-subtle shrink-0">2 dk önce</span>
    </div>
    <p className="text-xs text-foreground-muted mt-0.5 line-clamp-2">Açıklama metni.</p>
  </div>
  <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
</Card>`}
        >
          {[
            { icon: "✓", iconBg: "bg-success/15 text-success", title: "Ödeme onaylandı", desc: "₺1.299 tutarındaki ödemeniz başarıyla tamamlandı.", time: "2 dk önce", unread: true },
            { icon: "👤", iconBg: "bg-primary-subtle text-primary", title: "Yeni takipçi", desc: "Ayşe Kaya sizi takip etmeye başladı.", time: "15 dk önce", unread: true },
            { icon: "⚠️", iconBg: "bg-warning/15 text-warning", title: "Depolama uyarısı", desc: "Depolama alanınızın %90'ını kullandınız. Plan yükseltmeyi düşünün.", time: "1 saat önce", unread: false },
            { icon: "🚀", iconBg: "bg-info/15 text-info", title: "Dağıtım tamamlandı", desc: "v2.4.1 sürümü production ortamına başarıyla dağıtıldı.", time: "3 saat önce", unread: false },
          ].map((n, i) => (
            <Card key={i} variant="basic" padding="sm" className={`flex gap-3 transition-colors ${n.unread ? "border-primary/20 bg-primary-subtle/20" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${n.iconBg}`} aria-hidden="true">
                {n.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <span className="text-xs text-foreground-subtle shrink-0 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-xs text-foreground-muted mt-0.5 line-clamp-2">{n.desc}</p>
              </div>
              {n.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" aria-label="Okunmadı" />}
            </Card>
          ))}
        </ShowcaseSection>

        {/* TaskCard */}
        <ShowcaseSection
          title="TaskCard — Kanban"
          description="Başlık + öncelik + atanan avatar + son tarih + etiket. Kanban board için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          code={`<Card variant="basic" stylePreset="flat" padding="sm" className="cursor-pointer hover:border-border-strong transition-colors">
  <div className="flex items-start justify-between gap-2">
    <p className="text-sm font-medium text-foreground leading-snug">Görev başlığı</p>
    <Badge variant="danger" size="sm">Yüksek</Badge>
  </div>
  <p className="mt-1.5 text-xs text-foreground-muted line-clamp-2">Kısa açıklama.</p>
  <div className="mt-3 flex items-center justify-between">
    <AvatarGroup size="xs" max={3} avatars={[{ name: "Kullanıcı 1" }]} />
    <span className="text-xs text-foreground-subtle">28 Mayıs</span>
  </div>
</Card>`}
        >
          {[
            { title: "API entegrasyonu tamamla", desc: "Ödeme gateway'i için Stripe API'sini entegre et.", priority: "Yüksek", priorityVariant: "danger" as const, assignees: ["Ali V.", "Selin K."], due: "28 May", tags: ["Backend", "API"] },
            { title: "Landing page A/B testi", desc: "İki farklı hero bölümünü kullanıcı davranışı açısından karşılaştır.", priority: "Orta", priorityVariant: "warning" as const, assignees: ["Elif Ş."], due: "2 Haz", tags: ["Tasarım"] },
            { title: "Performans optimizasyonu", desc: "Core Web Vitals skorlarını iyileştir, LCP'yi 2.5s altına indir.", priority: "Düşük", priorityVariant: "success" as const, assignees: ["Burak Ç.", "Mert Y."], due: "10 Haz", tags: ["Frontend"] },
          ].map((task, i) => (
            <Card key={i} variant="basic" stylePreset="flat" padding="sm" className="cursor-pointer group hover:shadow-sm transition-all border border-transparent hover:border-border">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-foreground leading-snug">{task.title}</p>
                <Badge variant={task.priorityVariant} size="sm" className="shrink-0">{task.priority}</Badge>
              </div>
              <p className="text-xs text-foreground-muted line-clamp-2">{task.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {task.tags.map((t) => <Badge key={t} variant="outline" size="sm">{t}</Badge>)}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <AvatarGroup
                  size="xs"
                  max={3}
                  avatars={task.assignees.map((a) => ({ name: a }))}
                />
                <span className="text-xs text-foreground-subtle">{task.due}</span>
              </div>
            </Card>
          ))}
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 6 — METRİK KARTLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Dashboard"
          title="Metrik & İstatistik Kartları"
          description="Analitik paneli ve yönetim arayüzleri için sayısal veri gösterimi."
          tagColor="bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400"
        />

        {/* MetricCard */}
        <ShowcaseSection
          title="MetricCard"
          description="Büyük sayı + etiket + trend göstergesi. Dashboard üst satırı için standart kart."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          code={`<Card variant="elevated">
  <div className="flex items-start justify-between mb-3">
    <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide">Toplam Gelir</p>
    <div className="w-8 h-8 rounded-[var(--radius-md)] bg-success/15 flex items-center justify-center text-success">
      <TrendUpIcon />
    </div>
  </div>
  <p className="text-2xl font-bold text-foreground">₺48.295</p>
  <div className="flex items-center gap-1.5 mt-2">
    <Badge variant="success" size="sm" dot dotColor="success">+12.5%</Badge>
    <span className="text-xs text-foreground-muted">geçen aya göre</span>
  </div>
</Card>`}
        >
          {[
            { label: "Toplam Gelir", value: "₺48.295", change: "+12.5%", trend: "up", iconBg: "bg-success/15 text-success" },
            { label: "Aktif Kullanıcı", value: "3.847", change: "+8.2%", trend: "up", iconBg: "bg-primary-subtle text-primary" },
            { label: "Dönüşüm Oranı", value: "%4.7", change: "-0.3%", trend: "down", iconBg: "bg-warning/15 text-warning" },
            { label: "Destek Talepleri", value: "24", change: "+2", trend: "neutral", iconBg: "bg-info/15 text-info" },
          ].map((m) => (
            <Card key={m.label} variant="elevated">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-medium text-foreground-muted uppercase tracking-wide">{m.label}</p>
                <div className={`w-8 h-8 rounded-[var(--radius-md)] flex items-center justify-center shrink-0 ${m.iconBg}`} aria-hidden="true">
                  <TrendUpIcon />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{m.value}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Badge
                  variant={m.trend === "up" ? "success" : m.trend === "down" ? "danger" : "secondary"}
                  size="sm"
                >
                  {m.change}
                </Badge>
                <span className="text-xs text-foreground-muted">geçen aya göre</span>
              </div>
            </Card>
          ))}
        </ShowcaseSection>

        {/* GoalCard */}
        <ShowcaseSection
          title="GoalCard — Hedef Takibi"
          description="İlerleme çubuğu + yüzde + kalan süre. OKR ve hedef panelleri için."
          previewClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          code={`<Card variant="bordered">
  <div className="flex items-start justify-between mb-3">
    <h3 className="text-sm font-semibold text-foreground">Aylık Gelir Hedefi</h3>
    <Badge variant="primary" size="sm">Q2</Badge>
  </div>
  <div className="flex items-end justify-between mb-2">
    <p className="text-2xl font-bold text-foreground">₺36.200</p>
    <p className="text-sm text-foreground-muted">/ ₺50.000</p>
  </div>
  <div className="w-full bg-background-muted rounded-full h-2 overflow-hidden">
    <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
  </div>
  <div className="flex items-center justify-between mt-2">
    <span className="text-xs text-foreground-muted">%72 tamamlandı</span>
    <span className="text-xs text-foreground-subtle">3 gün kaldı</span>
  </div>
</Card>`}
        >
          {[
            { title: "Aylık Gelir Hedefi", current: "₺36.200", target: "₺50.000", pct: 72, badge: "Q2", color: "bg-primary", remaining: "3 gün kaldı" },
            { title: "Yeni Kullanıcı Kaydı", current: "840", target: "1.000", pct: 84, badge: "Mayıs", color: "bg-success", remaining: "5 gün kaldı" },
            { title: "Destek Memnuniyeti", current: "4.6/5", target: "4.8/5", pct: 92, badge: "Haftalık", color: "bg-amber-500", remaining: "Bu hafta" },
          ].map((g) => (
            <Card key={g.title} variant="bordered">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
                <Badge variant="outline" size="sm">{g.badge}</Badge>
              </div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-2xl font-bold text-foreground">{g.current}</p>
                <p className="text-sm text-foreground-muted">/ {g.target}</p>
              </div>
              <div className="w-full bg-background-muted rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={g.pct} aria-valuemin={0} aria-valuemax={100}>
                <div className={`${g.color} h-2 rounded-full transition-all`} style={{ width: `${g.pct}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-foreground-muted">%{g.pct} tamamlandı</span>
                <span className="text-xs text-foreground-subtle">{g.remaining}</span>
              </div>
            </Card>
          ))}
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 7 — STİL PRESTLERİ (Temel)
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Stil Presetleri"
          title="Görsel Katman Varyantları"
          description="stylePreset prop'u ile variant üstüne farklı estetik uygulayın."
          tagColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { preset: "brutal" as const, label: "brutal", bg: "", desc: "Sert köşe, kalın border, offset gölge." },
            { preset: "glass" as const, label: "glass", bg: "bg-gradient-to-br from-violet-500 to-pink-500 p-4 rounded-[var(--radius-xl)]", desc: "Backdrop blur, yarı-saydam cam." },
            { preset: "gradient-border" as const, label: "gradient-border", bg: "", desc: "Gradient renk geçişli çerçeve." },
            { preset: "flat" as const, label: "flat", bg: "", desc: "Arka plan farkı, border/gölge yok." },
            { preset: "glow" as const, label: "glow", bg: "", desc: "Hover'da primary renk parıltısı." },
            { preset: "noise" as const, label: "noise", bg: "", desc: "SVG noise texture overlay." },
          ].map(({ preset, label, bg, desc }) => (
            <div key={preset} className={bg}>
              <Card stylePreset={preset}>
                <p className="text-xs font-mono font-semibold text-foreground-muted mb-1">{label}</p>
                <p className={`text-sm ${preset === "glass" ? "text-white/80" : "text-foreground-muted"}`}>{desc}</p>
              </Card>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
