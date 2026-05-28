"use client";

import { Marquee } from "@/components/ui/marquee";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const LOGOS = ["Acme Corp", "Vercel", "Stripe", "Linear", "Figma", "Notion", "Loom", "Retool"];
const TESTIMONIALS = [
  { name: "Ali Y.", text: "Harika bir ürün, her gün kullanıyorum." },
  { name: "Zeynep K.", text: "Ekibimizin verimliliği ikiye katlandı." },
  { name: "Mert A.", text: "Tasarım kalitesi inanılmaz." },
  { name: "Selin B.", text: "Müşteri desteği 10/10." },
  { name: "Can D.", text: "Onboarding çok kolaydi." },
];

export default function MarqueeShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Marquee</h1>
        <p className="text-sm text-foreground-muted">
          Sonsuz kayan bant · pauseOnHover · reverse · fade edges · logo wall · testimonial şerit
        </p>
      </div>

      <ShowcaseSection
        title="Logo Wall"
        description="Hover ile duraksar. Kenarlar fade mask ile kaybolur."
        code={`<Marquee speed={50} pauseOnHover gap={48}>
  {LOGOS.map((logo) => <LogoCard key={logo} name={logo} />)}
</Marquee>`}
      >
        <Marquee speed={50} pauseOnHover gap={48}>
          {LOGOS.map((name) => (
            <div key={name} className="h-10 px-5 flex items-center justify-center rounded-[var(--radius-lg)] border border-border bg-surface text-sm font-semibold text-foreground-muted hover:text-foreground hover:border-border-strong transition-colors shrink-0">
              {name}
            </div>
          ))}
        </Marquee>
      </ShowcaseSection>

      <ShowcaseSection
        title="Testimonial Şerit"
        description="Ters yönde akan testimonial kartlar."
        code={`<Marquee speed={35} reverse pauseOnHover gap={16}>
  {TESTIMONIALS.map((t) => <TestimonialCard key={t.name} {...t} />)}
</Marquee>`}
      >
        <Marquee speed={35} reverse pauseOnHover gap={16}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="w-64 p-4 rounded-[var(--radius-xl)] border border-border bg-surface shrink-0">
              <p className="text-sm text-foreground">"{t.text}"</p>
              <p className="text-xs text-foreground-muted mt-2 font-medium">— {t.name}</p>
            </div>
          ))}
        </Marquee>
      </ShowcaseSection>

      <ShowcaseSection
        title="Hız Karşılaştırması"
        code={`<Marquee speed={20}>...</Marquee>  {/* yavaş */}
<Marquee speed={80}>...</Marquee>  {/* hızlı */}`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-foreground-muted mb-2 font-mono">speed=20 (yavaş)</p>
            <Marquee speed={20} fade={false} gap={12}>
              {["🐢", "yavaş", "🐢", "yavaş", "🐢", "yavaş"].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-background-muted text-sm text-foreground shrink-0">{t}</span>
              ))}
            </Marquee>
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-2 font-mono">speed=120 (hızlı)</p>
            <Marquee speed={120} fade={false} gap={12}>
              {["🚀", "hızlı", "🚀", "hızlı", "🚀", "hızlı"].map((t, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-primary-subtle text-primary text-sm shrink-0">{t}</span>
              ))}
            </Marquee>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
