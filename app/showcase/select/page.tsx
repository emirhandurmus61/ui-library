"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Select } from "@/components/ui/select";`;

const TrFlag = () => <span>🇹🇷</span>;
const UsFlag = () => <span>🇺🇸</span>;
const DeFlag = () => <span>🇩🇪</span>;
const FrFlag = () => <span>🇫🇷</span>;
const JpFlag = () => <span>🇯🇵</span>;

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
        <p className="text-sm text-foreground-muted">
          Custom dropdown · arama · gruplu seçenekler · icon · error / success state · 3 size
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="label, placeholder ve options ile temel açılır liste."
        importLine={IMPORT}
        code={`<Select
  label="Kategori"
  placeholder="Bir kategori seçin..."
  options={[
    { value: "tech", label: "Teknoloji" },
    { value: "design", label: "Tasarım" },
    { value: "marketing", label: "Pazarlama" },
    { value: "finance", label: "Finans" },
  ]}
/>`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Controlled"
        description="value ve onChange ile dışarıdan yönetilen seçim."
        importLine={IMPORT}
        code={`<Select
  label="Şehir seçin"
  placeholder="Bir şehir seçin..."
  value={value}
  onChange={setValue}
  options={[...]}
/>`}
      >
        <div className="max-w-sm">
          <ControlledDemo />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="sm, md (varsayılan) ve lg boyut seçenekleri."
        importLine={IMPORT}
        code={`<Select size="sm" placeholder="Small (sm)" options={[...]} />
<Select size="md" placeholder="Medium (md) — varsayılan" options={[...]} />
<Select size="lg" placeholder="Large (lg)" options={[...]} />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="errorText, successText ve helperText ile durum geri bildirimleri."
        importLine={IMPORT}
        code={`<Select label="Hata durumu" placeholder="Seçiniz..." errorText="Bu alan zorunludur." options={[...]} />
<Select label="Başarı durumu" defaultValue="a" successText="Geçerli seçim!" options={[...]} />
<Select label="Helper text" placeholder="Seçiniz..." helperText="Projenize uygun teknolojiyi seçin." options={[...]} />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon ile"
        description="Her seçeneğe icon prop ile görsel eklenebilir."
        importLine={IMPORT}
        code={`<Select
  label="Ülke"
  placeholder="Ülke seçin..."
  options={[
    { value: "tr", label: "Türkiye", icon: <TrFlag /> },
    { value: "us", label: "ABD", icon: <UsFlag /> },
  ]}
/>`}
      >
        <div className="max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Aranabilir (Searchable)"
        description="searchable prop ile liste içinde metin araması yapılabilir."
        importLine={IMPORT}
        code={`<Select
  label="Ülke (aranabilir)"
  placeholder="Ülke seçin..."
  searchable
  value={value}
  onChange={setValue}
  options={[...]}
/>`}
      >
        <div className="max-w-sm">
          <SearchableDemo />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Gruplu Seçenekler"
        description="groups prop ile seçenekler kategorilere ayrılır."
        importLine={IMPORT}
        code={`<Select
  label="Framework"
  placeholder="Bir framework seçin..."
  groups={[
    { label: "Frontend", options: [{ value: "next", label: "Next.js" }] },
    { label: "Backend",  options: [{ value: "express", label: "Express" }] },
  ]}
/>`}
      >
        <div className="max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="Tekil seçenek veya tüm bileşen devre dışı bırakılabilir."
        importLine={IMPORT}
        code={`<Select
  label="Disabled seçenek"
  options={[
    { value: "a", label: "Aktif seçenek" },
    { value: "b", label: "Pasif seçenek", disabled: true },
  ]}
/>
<Select label="Tümüyle disabled" placeholder="Bu alan pasif" disabled options={[...]} />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
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
        </div>
      </ShowcaseSection>
    </div>
  );
}
