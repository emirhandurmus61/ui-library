"use client";

import { Reveal } from "@/components/ui/reveal";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function RevealShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Reveal / FadeIn</h1>
        <p className="text-sm text-foreground-muted">
          IntersectionObserver tabanlı · 5 yön · delay · duration · prefers-reduced-motion
        </p>
      </div>

      <ShowcaseSection
        title="Yönler"
        description="Scroll ederek veya sayfayı yenileyerek efekti görebilirsiniz."
        code={`<Reveal direction="up">   <Card>Yukarıdan</Card> </Reveal>
<Reveal direction="down"> <Card>Aşağıdan</Card> </Reveal>
<Reveal direction="left"> <Card>Soldan</Card>   </Reveal>
<Reveal direction="right"><Card>Sağdan</Card>   </Reveal>
<Reveal direction="none"> <Card>Sadece fade</Card></Reveal>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {(["up", "down", "left", "right", "none"] as const).map((dir) => (
            <Reveal key={dir} direction={dir} duration={600}>
              <div className="p-4 rounded-[var(--radius-xl)] border border-border bg-surface text-center">
                <p className="text-sm font-semibold text-foreground">{dir === "none" ? "fade only" : dir}</p>
                <p className="text-xs text-foreground-muted mt-0.5">direction="{dir}"</p>
              </div>
            </Reveal>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Staggered Delay"
        description="Her öğe için artan delay ile kademeli giriş."
        code={`{items.map((item, i) => (
  <Reveal key={i} direction="up" delay={i * 100} duration={500}>
    <Card>{item}</Card>
  </Reveal>
))}`}
      >
        <div className="space-y-3">
          {["İlk kart", "İkinci kart", "Üçüncü kart", "Dördüncü kart"].map((label, i) => (
            <Reveal key={label} direction="up" delay={i * 120} duration={500}>
              <div className="p-3 rounded-[var(--radius-lg)] border border-border bg-surface flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary-subtle text-primary text-xs flex items-center justify-center font-bold">{i + 1}</span>
                <span className="text-sm text-foreground">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Büyük Distance"
        description="distance prop ile kayma mesafesi artırılabilir."
        code={`<Reveal direction="up" distance={60} duration={800}>
  <Hero />
</Reveal>`}
      >
        <Reveal direction="up" distance={60} duration={800}>
          <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-primary/20 to-violet-500/20 border border-border p-8 text-center">
            <p className="text-2xl font-bold text-foreground">60px kayma</p>
            <p className="text-sm text-foreground-muted mt-1">distance=60 ile uzaktan giriyor</p>
          </div>
        </Reveal>
      </ShowcaseSection>
    </div>
  );
}
