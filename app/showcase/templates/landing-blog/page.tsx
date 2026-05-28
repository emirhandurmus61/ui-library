"use client";

import { BlogLandingTemplate } from "@/components/ui/templates/landing-blog";

export default function BlogLandingPage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Blog / İçerik / Medya Landing</h1>
        <p className="text-sm text-foreground-muted">
          Navbar · Featured Hero · Kategori Filtre · Makaleler Grid · Bülten · Etiketler · Footer
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <BlogLandingTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { BlogLandingTemplate } from "@/components/ui/templates/landing-blog";

export default function HomePage() {
  return <BlogLandingTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bölümler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Navbar — arama + Abone Ol gradient butonu</li>
          <li>Featured Hero — gradient overlay, Öne Çıkan badge, yazar + okuma süresi</li>
          <li>Kategori Filtresi — horizontal scroll chip'ler, aktif seçim state</li>
          <li>Makaleler Grid — 3-kolon, kategori badge + başlık + özet + yazar</li>
          <li>Bülten — email formu, sosyal kanıt ("2000+ okuyucu")</li>
          <li>Popüler Etiketler — outline badge flex-wrap</li>
          <li>2-kolon Footer</li>
        </ul>
      </section>
    </div>
  );
}
