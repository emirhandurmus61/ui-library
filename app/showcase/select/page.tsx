"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";

/* ─── İkonlar ────────────────────────────────────────────────── */
const TrFlag = () => <span>🇹🇷</span>;
const UsFlag = () => <span>🇺🇸</span>;
const DeFlag = () => <span>🇩🇪</span>;
const FrFlag = () => <span>🇫🇷</span>;
const JpFlag = () => <span>🇯🇵</span>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-4 max-w-sm">{children}</div>
    </section>
  );
}

/* ─── Controlled demo ────────────────────────────────────────── */
function ControlledDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <Select
        label="Şehir seçin"
        placeholder="Bir şehir seçin..."
        value={value}
        onChange={setValue}
        options={[
          { value: "ist", label: "İstanbul" },
          { value: "ank", label: "Ankara" },
          { value: "izm", label: "İzmir" },
          { value: "brs", label: "Bursa" },
          { value: "ant", label: "Antalya" },
        ]}
      />
      {value && (
        <p className="text-xs text-foreground-muted">
          Seçilen: <span className="font-medium text-foreground">{value}</span>
        </p>
      )}
    </div>
  );
}

/* ─── Searchable demo ────────────────────────────────────────── */
function SearchableDemo() {
  const [value, setValue] = useState("");
  return (
    <Select
      label="Ülke (aranabilir)"
      placeholder="Ülke seçin..."
      searchable
      value={value}
      onChange={setValue}
      options={[
        { value: "tr", label: "Türkiye", icon: <TrFlag /> },
        { value: "us", label: "Amerika Birleşik Devletleri", icon: <UsFlag /> },
        { value: "de", label: "Almanya", icon: <DeFlag /> },
        { value: "fr", label: "Fransa", icon: <FrFlag /> },
        { value: "jp", label: "Japonya", icon: <JpFlag /> },
        { value: "gb", label: "Birleşik Krallık" },
        { value: "ca", label: "Kanada" },
        { value: "au", label: "Avustralya" },
        { value: "br", label: "Brezilya" },
        { value: "in", label: "Hindistan" },
      ]}
    />
  );
}

export default function SelectShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Select</h1>
        <p className="text-foreground-muted">
          Custom dropdown · arama · gruplu seçenekler · icon · error / success state · 3 size
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <Select
          label="Kategori"
          placeholder="Bir kategori seçin..."
          options={[
            { value: "tech", label: "Teknoloji" },
            { value: "design", label: "Tasarım" },
            { value: "marketing", label: "Pazarlama" },
            { value: "finance", label: "Finans" },
          ]}
        />
      </Section>

      {/* Controlled */}
      <Section title="Controlled">
        <ControlledDemo />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Select
          size="sm"
          placeholder="Small (sm)"
          options={[{ value: "a", label: "Seçenek A" }, { value: "b", label: "Seçenek B" }]}
        />
        <Select
          size="md"
          placeholder="Medium (md) — varsayılan"
          options={[{ value: "a", label: "Seçenek A" }, { value: "b", label: "Seçenek B" }]}
        />
        <Select
          size="lg"
          placeholder="Large (lg)"
          options={[{ value: "a", label: "Seçenek A" }, { value: "b", label: "Seçenek B" }]}
        />
      </Section>

      {/* States */}
      <Section title="States">
        <Select
          label="Hata durumu"
          placeholder="Seçiniz..."
          errorText="Bu alan zorunludur."
          options={[{ value: "a", label: "Seçenek A" }]}
        />
        <Select
          label="Başarı durumu"
          defaultValue="a"
          successText="Geçerli seçim!"
          options={[{ value: "a", label: "Onaylandı" }]}
        />
        <Select
          label="Helper text"
          placeholder="Seçiniz..."
          helperText="Projenize uygun teknolojiyi seçin."
          options={[
            { value: "next", label: "Next.js" },
            { value: "remix", label: "Remix" },
            { value: "astro", label: "Astro" },
          ]}
        />
      </Section>

      {/* Icon ile */}
      <Section title="İkon ile">
        <Select
          label="Ülke"
          placeholder="Ülke seçin..."
          options={[
            { value: "tr", label: "Türkiye", icon: <TrFlag /> },
            { value: "us", label: "ABD", icon: <UsFlag /> },
            { value: "de", label: "Almanya", icon: <DeFlag /> },
            { value: "fr", label: "Fransa", icon: <FrFlag /> },
          ]}
        />
      </Section>

      {/* Searchable */}
      <Section title="Aranabilir (Searchable)">
        <SearchableDemo />
      </Section>

      {/* Gruplu */}
      <Section title="Gruplu Seçenekler">
        <Select
          label="Framework"
          placeholder="Bir framework seçin..."
          groups={[
            {
              label: "Frontend",
              options: [
                { value: "next", label: "Next.js" },
                { value: "remix", label: "Remix" },
                { value: "nuxt", label: "Nuxt" },
              ],
            },
            {
              label: "Backend",
              options: [
                { value: "express", label: "Express" },
                { value: "fastify", label: "Fastify" },
                { value: "hono", label: "Hono" },
              ],
            },
          ]}
        />
      </Section>

      {/* Disabled seçenek + disabled select */}
      <Section title="Disabled">
        <Select
          label="Disabled seçenek"
          placeholder="Seçiniz..."
          options={[
            { value: "a", label: "Aktif seçenek" },
            { value: "b", label: "Pasif seçenek", disabled: true },
            { value: "c", label: "Aktif seçenek" },
          ]}
        />
        <Select
          label="Tümüyle disabled"
          placeholder="Bu alan pasif"
          disabled
          options={[{ value: "a", label: "Seçenek" }]}
        />
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Select } from "@/components/ui/select";

// Temel
<Select
  label="Kategori"
  placeholder="Seçiniz..."
  options={[
    { value: "a", label: "Seçenek A" },
    { value: "b", label: "Seçenek B" },
  ]}
/>

// Controlled
<Select value={value} onChange={setValue} options={[...]} />

// Aranabilir
<Select searchable options={[...]} />

// Gruplu
<Select groups={[
  { label: "Grup 1", options: [...] },
  { label: "Grup 2", options: [...] },
]} />

// İkon ile
<Select options={[
  { value: "tr", label: "Türkiye", icon: <TrFlag /> },
]} />`}
        </pre>
      </section>
    </div>
  );
}
