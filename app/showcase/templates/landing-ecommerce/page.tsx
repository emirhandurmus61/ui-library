"use client";

import { EcommerceLandingTemplate } from "@/components/ui/templates/landing-ecommerce";

export default function EcommerceLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">E-Ticaret / Marka Landing</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Hero · Kategoriler · Öne Çıkan Ürünler · Nasıl Çalışır · Yorumlar · Bülten · Footer
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <EcommerceLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { EcommerceLandingTemplate } from "@/components/ui/templates/landing-ecommerce";

export default function HomePage() {
  return <EcommerceLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Navbar — arama + sepet badge + hesap, mobile menü</li>
          <li>Hero — split layout, gradient başlık, ürün placeholder, trust badge'leri</li>
          <li>Kategori Tiles — 6 kart, hover scale efekti, 2→6 kolon grid</li>
          <li>Öne Çıkan Ürünler — 2→4 kolon, wishlist, sepete ekle durumu</li>
          <li>Nasıl Çalışır — 3 adım, masaüstünde bağlantı çizgisi</li>
          <li>Müşteri Yorumları — 3 kart, yıldız + avatar</li>
          <li>Bülten — gradient banner, email formu + başarı state</li>
          <li>Footer — 3 kolon + copyright</li>
        </ul>
      </section>
    </div>
  );
}
