"use client";

import { Button } from "@/components/ui/button";

/* ─── İkon örnekleri ─────────────────────────────────────────── */

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

/* ─── Section bileşeni ───────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

/* ─── Showcase ───────────────────────────────────────────────── */

export default function ButtonShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Button</h1>
        <p className="text-foreground-muted">
          7 variant · 8 size · loading state · icon desteği
        </p>
      </div>

      {/* Variants */}
      <Section title="Variants">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="danger-outline">Danger Outline</Button>
        <Button variant="link">Link</Button>
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
        <Button size="xl">Extra Large</Button>
      </Section>

      {/* Icon buttons */}
      <Section title="Icon Buttons">
        <Button size="icon-sm" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon-lg" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
        <Button size="icon" variant="primary" aria-label="Beğen"><HeartIcon /></Button>
        <Button size="icon" variant="danger" aria-label="Sil"><TrashIcon /></Button>
      </Section>

      {/* Left & right icons */}
      <Section title="İkon ile">
        <Button leftIcon={<PlusIcon />}>Yeni Oluştur</Button>
        <Button rightIcon={<ArrowIcon />} variant="outline">Devam Et</Button>
        <Button leftIcon={<TrashIcon />} variant="danger">Sil</Button>
        <Button leftIcon={<HeartIcon />} variant="ghost" size="sm">Beğen</Button>
      </Section>

      {/* Loading */}
      <Section title="Loading State">
        <Button loading>Yükleniyor</Button>
        <Button loading variant="secondary">Kaydediliyor</Button>
        <Button loading variant="outline">Bekleniyor</Button>
        <Button loading variant="danger">Siliniyor</Button>
        <Button loading size="icon" aria-label="Yükleniyor" />
      </Section>

      {/* Disabled */}
      <Section title="Disabled">
        <Button disabled>Disabled Primary</Button>
        <Button disabled variant="outline">Disabled Outline</Button>
        <Button disabled variant="danger">Disabled Danger</Button>
        <Button disabled variant="ghost">Disabled Ghost</Button>
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Button } from "@/components/ui/button";

// Temel
<Button>Tıkla</Button>

// Variant + size
<Button variant="outline" size="lg">Geniş</Button>

// İkon ile
<Button leftIcon={<PlusIcon />}>Ekle</Button>

// Loading
<Button loading>Kaydediliyor...</Button>

// Disabled
<Button disabled>Pasif</Button>`}
        </pre>
      </section>
    </div>
  );
}
