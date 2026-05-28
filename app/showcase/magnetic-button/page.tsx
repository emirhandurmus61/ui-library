"use client";

import { MagneticButton } from "@/components/ui/magnetic-button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

export default function MagneticButtonShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Magnetic Button</h1>
        <p className="text-sm text-foreground-muted">
          Hover'da cursor yakınlığına göre manyetik çekim · strength · ease · prefers-reduced-motion
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Butonun üzerine gelin — fare pozisyonuna doğru çekilir."
        code={`<MagneticButton>
  <Button variant="primary">Manyetik</Button>
</MagneticButton>`}
      >
        <div className="flex items-center justify-center py-8">
          <MagneticButton>
            <span className="inline-flex items-center justify-center px-6 py-3 rounded-[var(--radius-xl)] bg-primary text-primary-foreground font-semibold text-sm shadow-md">
              Manyetik Buton
            </span>
          </MagneticButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Strength Karşılaştırması"
        description="strength prop büyüdükçe çekim kuvveti artar."
        code={`<MagneticButton strength={6}>  {/* hafif */}
<MagneticButton strength={16}> {/* güçlü */}
<MagneticButton strength={28}> {/* çok güçlü */}`}
      >
        <div className="flex flex-wrap gap-8 justify-center py-6">
          {[{ s: 6, label: "Hafif (6)" }, { s: 16, label: "Normal (16)" }, { s: 28, label: "Güçlü (28)" }].map(({ s, label }) => (
            <MagneticButton key={s} strength={s}>
              <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-lg)] border-2 border-border bg-surface text-foreground font-medium text-sm hover:border-primary transition-colors">
                {label}
              </span>
            </MagneticButton>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon Buton"
        description="Sadece ikon içeren yuvarlak butonlarda da kullanılabilir."
        code={`<MagneticButton strength={14}>
  <IconButton />
</MagneticButton>`}
      >
        <div className="flex gap-6 justify-center py-6">
          {["★", "♥", "✦", "⚡"].map((icon) => (
            <MagneticButton key={icon} strength={14}>
              <span className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center text-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer">
                {icon}
              </span>
            </MagneticButton>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="disabled=true iken manyetik efekt devre dışıdır."
        code={`<MagneticButton disabled>
  <Button disabled>Devre Dışı</Button>
</MagneticButton>`}
      >
        <div className="flex gap-4 justify-center py-4">
          <MagneticButton>
            <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-lg)] bg-primary text-primary-foreground font-medium text-sm">
              Aktif
            </span>
          </MagneticButton>
          <MagneticButton disabled>
            <span className="inline-flex items-center justify-center px-5 py-2.5 rounded-[var(--radius-lg)] bg-background-muted text-foreground-subtle font-medium text-sm cursor-not-allowed">
              Disabled
            </span>
          </MagneticButton>
        </div>
      </ShowcaseSection>
    </div>
  );
}
