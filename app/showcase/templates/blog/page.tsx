"use client";
import { BlogTemplate } from "@/components/ui/templates/blog";

export default function BlogTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Blog Şablonu</h1>
        <p className="text-sm text-foreground-muted">İçerik listeleme ve blog sayfası — öne çıkan yazı, kategori filtreleme, makale grid ve pagination.</p>
      </div>
      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <BlogTemplate />
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { BlogTemplate } from "@/components/ui/templates/blog";
export default function Page() { return <BlogTemplate />; }`}
        </pre>
      </section>
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">İçerdiği Bileşenler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li>Sticky Navbar — logo, kategori linkleri, arama ikonu</li>
          <li>Featured Post Hero — büyük kart, Badge, Avatar, "Devamını Oku" Button</li>
          <li>Kategori filtre tabs — useState ile aktif kategori</li>
          <li>Article Grid — 6 kart, kategori Badge, Avatar, okuma süresi</li>
          <li>Pagination — önceki/sonraki buton, sayfa numaraları</li>
        </ul>
      </section>
    </div>
  );
}
