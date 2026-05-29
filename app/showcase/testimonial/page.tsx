"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Testimonial, type TestimonialItem } from "@/components/ui/testimonial";

/* ─── Sample data ────────────────────────────────────────────── */

const ITEMS: TestimonialItem[] = [
  {
    quote: "Bu kütüphane projemizin geliştirme sürecini inanılmaz hızlandırdı. Bileşenler hem estetik hem de kullanımı kolay.",
    author: { name: "Ayşe Kaya", title: "Kurucu", company: "Nexora" },
    rating: 5,
    tag: "Öne Çıkan",
    featured: true,
  },
  {
    quote: "Dark mode desteği ve erişilebilirlik standartları mükemmel. Production'a geçmek çok daha güvenli hissettiriyor.",
    author: { name: "Mehmet Demir", title: "Senior Frontend Dev", company: "Craftly" },
    rating: 5,
  },
  {
    quote: "Tasarım tutarlılığı açısından şimdiye kadar kullandığım en iyi kütüphanelerden biri. Token sistemi harika.",
    author: { name: "Selin Arslan", title: "UI/UX Designer", company: "Pixelstorm" },
    rating: 4,
  },
  {
    quote: "TypeScript tipleri çok iyi yazılmış. Otomatik tamamlama sayesinde dokümantasyona bakmadan kullanabiliyorum.",
    author: { name: "Burak Yılmaz", title: "Full Stack Developer", company: "DevHub" },
    rating: 5,
  },
  {
    quote: "Ekibimize entegre etmek saatler değil dakikalar sürdü. Storybook ile birlikte mükemmel çalışıyor.",
    author: { name: "Zeynep Çelik", title: "Tech Lead", company: "Flowworks" },
    rating: 5,
  },
  {
    quote: "Responsive tasarım ve mobil uyumluluk kutudan çıktığı gibi mükemmel. Hiçbir düzeltmeye gerek duymadım.",
    author: { name: "Can Öztürk", title: "Mobile Developer", company: "AppForge" },
    rating: 4,
  },
];

const EXTRA: TestimonialItem[] = [
  ...ITEMS,
  {
    quote: "Animasyonlar ve micro-interaction'lar kullanıcı deneyimini ciddi ölçüde iyileştirdi.",
    author: { name: "Elif Şahin", title: "Product Designer", company: "Studio88" },
    rating: 5,
  },
  {
    quote: "Bundle size konusunda çok dikkatli bir yaklaşım var. Tree-shaking çalışıyor, sadece kullandıklarımı import ediyorum.",
    author: { name: "Onur Bektaş", title: "Performance Engineer", company: "FastFlow" },
    rating: 5,
  },
];

export default function TestimonialShowcase() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Testimonial</h1>
        <p className="text-foreground-muted">
          Müşteri yorumları için 6 farklı layout. Grid, carousel, masonry, list, spotlight ve wall.
        </p>
      </div>

      {/* Grid */}
      <ShowcaseSection
        title="Grid Layout"
        description="3 kolonlu standart grid. En yaygın kullanım."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="grid" showRating />`}
      >
        <Testimonial items={ITEMS} layout="grid" showRating />
      </ShowcaseSection>

      {/* Carousel */}
      <ShowcaseSection
        title="Carousel Layout"
        description="Tek seferde bir yorum, ok ve nokta navigasyonu ile."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="carousel" showRating />`}
      >
        <Testimonial items={ITEMS} layout="carousel" showRating />
      </ShowcaseSection>

      {/* Masonry */}
      <ShowcaseSection
        title="Masonry Layout"
        description="İki kolon zig-zag yerleşim. Farklı uzunluktaki yorumlar için ideal."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="masonry" showRating />`}
      >
        <Testimonial items={ITEMS} layout="masonry" showRating />
      </ShowcaseSection>

      {/* List */}
      <ShowcaseSection
        title="List Layout"
        description="Yatay sıralı, yoğun ve sade bir liste görünümü."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="list" showRating />`}
      >
        <Testimonial items={ITEMS} layout="list" showRating />
      </ShowcaseSection>

      {/* Spotlight */}
      <ShowcaseSection
        title="Spotlight Layout"
        description="Sol büyük featured yorum, sağda mini liste. Tıklayarak spotlight değiştir."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="spotlight" showRating />`}
      >
        <Testimonial items={ITEMS} layout="spotlight" showRating />
      </ShowcaseSection>

      {/* Wall */}
      <ShowcaseSection
        title="Wall Layout"
        description="CSS columns ile masonry benzeri duvar görünümü. Çok sayıda yorum için mükemmel."
        importLine={`import { Testimonial } from "@/components/ui/testimonial";`}
        code={`<Testimonial items={items} layout="wall" showRating />`}
      >
        <Testimonial items={EXTRA} layout="wall" showRating />
      </ShowcaseSection>

      {/* Props table */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["items", "TestimonialItem[]", "—", "Yorum listesi (zorunlu)"],
                ["layout", '"grid" | "carousel" | "masonry" | "list" | "spotlight" | "wall"', '"grid"', "Görüntüleme düzeni"],
                ["showRating", "boolean", "true", "Yıldız göster/gizle"],
                ["className", "string", "—", "Ek CSS sınıfı"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{prop}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{def}</td>
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
