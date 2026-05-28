"use client";

import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M5 12h14" /><path d="M12 5v14" />
  </svg>
);
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export default function ButtonShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Button</h1>
        <p className="text-foreground-muted text-sm">
          7 variant · 8 size · 6 stylePreset · loading state · leftIcon / rightIcon
        </p>
      </div>

      {/* ── Variantlar ─────────────────────────────────────────── */}
      <ShowcaseSection
        title="Variantlar"
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="danger-outline">Danger Outline</Button>
<Button variant="link">Link</Button>`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-outline">Danger Outline</Button>
        <Button variant="link">Link</Button>
      </ShowcaseSection>

      {/* ── Boyutlar ───────────────────────────────────────────── */}
      <ShowcaseSection
        title="Boyutlar"
        previewClassName="flex flex-wrap items-end gap-3"
        code={`<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>`}
      >
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </ShowcaseSection>

      {/* ── Stil Presetleri ────────────────────────────────────── */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-1">Stil Presetleri</h2>
        <p className="text-sm text-foreground-muted mb-6">
          <code className="text-xs bg-background-muted px-1.5 py-0.5 rounded font-mono">stylePreset</code> prop'u ile
          mevcut variant'ın üstüne farklı estetik katmanlar uygulanır. Hover animasyonlarını görmek için üzerine gelin.
        </p>

        <div className="space-y-6">

          {/* brutal */}
          <ShowcaseSection
            title="brutal"
            description="Siyah çerçeve + sağ-alt offset shadow. Hover'da shadow söner, buton hafifçe kayar."
            previewClassName="flex flex-wrap items-center gap-6 py-2"
            code={`<Button stylePreset="brutal">Default</Button>
<Button stylePreset="brutal" variant="secondary">Secondary</Button>
<Button stylePreset="brutal" variant="outline">Outline</Button>
<Button stylePreset="brutal" variant="danger">Danger</Button>`}
          >
            <Button stylePreset="brutal">Default</Button>
            <Button stylePreset="brutal" variant="secondary">Secondary</Button>
            <Button stylePreset="brutal" variant="outline">Outline</Button>
            <Button stylePreset="brutal" variant="danger">Danger</Button>
          </ShowcaseSection>

          {/* neon */}
          <ShowcaseSection
            title="neon"
            description="Koyu arka plan üstünde primary renkte glow efekti. Hover'da glow büyür."
            previewClassName="flex flex-wrap items-center gap-4 py-2 bg-gray-950 px-6 rounded-[var(--radius-xl)]"
            code={`<Button stylePreset="neon">Neon Default</Button>
<Button stylePreset="neon" leftIcon={<ZapIcon />}>Launch</Button>
<Button stylePreset="neon" size="lg">Get Started</Button>`}
          >
            <Button stylePreset="neon">Neon Default</Button>
            <Button stylePreset="neon" leftIcon={<ZapIcon />}>Launch</Button>
            <Button stylePreset="neon" size="lg">Get Started</Button>
          </ShowcaseSection>

          {/* glass */}
          <ShowcaseSection
            title="glass"
            description="Cam efekti — backdrop blur + yarı-saydam arka plan. Fotoğraf / gradient arka planlar üstünde kullanın."
            previewClassName="flex flex-wrap items-center gap-4 py-4 px-6 rounded-[var(--radius-xl)] bg-gradient-to-br from-violet-500 via-primary to-blue-600"
            code={`<Button stylePreset="glass">Glass Default</Button>
<Button stylePreset="glass" size="sm">Small</Button>
<Button stylePreset="glass" leftIcon={<ArrowIcon />} size="lg">Continue</Button>`}
          >
            <Button stylePreset="glass">Glass Default</Button>
            <Button stylePreset="glass" size="sm">Small</Button>
            <Button stylePreset="glass" leftIcon={<ArrowIcon />} size="lg">Continue</Button>
          </ShowcaseSection>

          {/* gradient */}
          <ShowcaseSection
            title="gradient"
            description="Primary→Violet yatay gradient dolgu. Hover'da glow shadow belirir."
            previewClassName="flex flex-wrap items-center gap-4 py-2"
            code={`<Button stylePreset="gradient">Get Started</Button>
<Button stylePreset="gradient" leftIcon={<ZapIcon />}>Upgrade Now</Button>
<Button stylePreset="gradient" size="lg">Join Waitlist</Button>
<Button stylePreset="gradient" size="sm" rightIcon={<ArrowIcon />}>Learn More</Button>`}
          >
            <Button stylePreset="gradient">Get Started</Button>
            <Button stylePreset="gradient" leftIcon={<ZapIcon />}>Upgrade Now</Button>
            <Button stylePreset="gradient" size="lg">Join Waitlist</Button>
            <Button stylePreset="gradient" size="sm" rightIcon={<ArrowIcon />}>Learn More</Button>
          </ShowcaseSection>

          {/* soft */}
          <ShowcaseSection
            title="soft"
            description="Renk vurgulu subtle arka plan, border yok. Ghost'tan daha belirgin, primary'dan daha sakin."
            previewClassName="flex flex-wrap items-center gap-3 py-2"
            code={`<Button stylePreset="soft">Soft Primary</Button>
<Button stylePreset="soft" size="sm">Small</Button>
<Button stylePreset="soft" leftIcon={<HeartIcon />}>Beğen</Button>
<Button stylePreset="soft" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>`}
          >
            <Button stylePreset="soft">Soft Primary</Button>
            <Button stylePreset="soft" size="sm">Small</Button>
            <Button stylePreset="soft" leftIcon={<HeartIcon />}>Beğen</Button>
            <Button stylePreset="soft" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>
          </ShowcaseSection>

          {/* retro */}
          <ShowcaseSection
            title="retro"
            description="Pastel amber zemin + mono font + dashed border. Vintage / indie proje estetiği."
            previewClassName="flex flex-wrap items-center gap-4 py-2"
            code={`<Button stylePreset="retro">Retro Button</Button>
<Button stylePreset="retro" size="sm">Small</Button>
<Button stylePreset="retro" leftIcon={<ZapIcon />}>Hızlı Başla</Button>
<Button stylePreset="retro" size="lg">Join the Club</Button>`}
          >
            <Button stylePreset="retro">Retro Button</Button>
            <Button stylePreset="retro" size="sm">Small</Button>
            <Button stylePreset="retro" leftIcon={<ZapIcon />}>Hızlı Başla</Button>
            <Button stylePreset="retro" size="lg">Join the Club</Button>
          </ShowcaseSection>

        </div>
      </div>

      {/* ── İkon butonları ─────────────────────────────────────── */}
      <ShowcaseSection
        title="İkon Butonları"
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button size="icon-sm" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
<Button size="icon" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
<Button size="icon-lg" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
<Button size="icon" variant="primary" aria-label="Beğen"><HeartIcon /></Button>
<Button size="icon" variant="danger" aria-label="Sil"><TrashIcon /></Button>`}
      >
        <Button size="icon-sm" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon-lg" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon" variant="primary" aria-label="Beğen"><HeartIcon /></Button>
        <Button size="icon" variant="danger" aria-label="Sil"><TrashIcon /></Button>
      </ShowcaseSection>

      {/* ── Loading ────────────────────────────────────────────── */}
      <ShowcaseSection
        title="Loading State"
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button loading>Yükleniyor</Button>
<Button loading variant="secondary">Kaydediliyor</Button>
<Button loading variant="outline">Bekleniyor</Button>
<Button loading variant="danger">Siliniyor</Button>`}
      >
        <Button loading>Yükleniyor</Button>
        <Button loading variant="secondary">Kaydediliyor</Button>
        <Button loading variant="outline">Bekleniyor</Button>
        <Button loading variant="danger">Siliniyor</Button>
      </ShowcaseSection>

      {/* ── Disabled ───────────────────────────────────────────── */}
      <ShowcaseSection
        title="Disabled"
        previewClassName="flex flex-wrap items-center gap-3"
        code={`<Button disabled>Primary</Button>
<Button disabled variant="outline">Outline</Button>
<Button disabled variant="danger">Danger</Button>
<Button disabled variant="ghost">Ghost</Button>`}
      >
        <Button disabled>Primary</Button>
        <Button disabled variant="outline">Outline</Button>
        <Button disabled variant="danger">Danger</Button>
        <Button disabled variant="ghost">Ghost</Button>
      </ShowcaseSection>
    </div>
  );
}
