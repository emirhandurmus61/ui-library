"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { RadioGroup } from "@/components/ui/radio";`;

function ControlledDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <RadioGroup
        label="Paket seçin"
        value={value}
        onChange={setValue}
        options={[
          { value: "free", label: "Ücretsiz", description: "Temel özellikler, 5 proje" },
          { value: "pro", label: "Pro — ₺99/ay", description: "Sınırsız proje, öncelikli destek" },
          { value: "team", label: "Takım — ₺299/ay", description: "5 kullanıcı, tüm özellikler" },
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

export default function RadioShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Radio / RadioGroup</h1>
        <p className="text-sm text-foreground-muted">
          3 size · description · error state · yatay · kart görünümü
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="label, defaultValue ve options ile temel radio grubu."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Cinsiyet"
  defaultValue="male"
  options={[
    { value: "male", label: "Erkek" },
    { value: "female", label: "Kadın" },
    { value: "other", label: "Belirtmek istemiyorum" },
  ]}
/>`}
      >
        <div className="max-w-sm">
          <RadioGroup
            label="Cinsiyet"
            defaultValue="male"
            options={[
              { value: "male", label: "Erkek" },
              { value: "female", label: "Kadın" },
              { value: "other", label: "Belirtmek istemiyorum" },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Controlled + Description"
        description="value/onChange ile dışarıdan yönetim; her seçenekte açıklama satırı."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Paket seçin"
  value={value}
  onChange={setValue}
  options={[
    { value: "free", label: "Ücretsiz", description: "Temel özellikler, 5 proje" },
    { value: "pro",  label: "Pro — ₺99/ay", description: "Sınırsız proje, öncelikli destek" },
  ]}
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
        code={`<RadioGroup size="sm" defaultValue="a" options={[{ value: "a", label: "Small (sm)" }]} />
<RadioGroup size="md" defaultValue="a" options={[{ value: "a", label: "Medium (md)" }]} />
<RadioGroup size="lg" defaultValue="a" options={[{ value: "a", label: "Large (lg)" }]} />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <RadioGroup
            size="sm"
            defaultValue="a"
            options={[{ value: "a", label: "Small (sm)" }, { value: "b", label: "Seçenek B" }]}
          />
          <RadioGroup
            size="md"
            defaultValue="a"
            options={[{ value: "a", label: "Medium (md) — varsayılan" }, { value: "b", label: "Seçenek B" }]}
          />
          <RadioGroup
            size="lg"
            defaultValue="a"
            options={[{ value: "a", label: "Large (lg)" }, { value: "b", label: "Seçenek B" }]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Yatay (Horizontal)"
        description="horizontal prop ile seçenekler yan yana dizilir."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Sıralama"
  horizontal
  defaultValue="asc"
  options={[
    { value: "asc",  label: "A → Z" },
    { value: "desc", label: "Z → A" },
    { value: "new",  label: "En yeni" },
  ]}
/>`}
      >
        <div className="max-w-sm">
          <RadioGroup
            label="Sıralama"
            horizontal
            defaultValue="asc"
            options={[
              { value: "asc", label: "A → Z" },
              { value: "desc", label: "Z → A" },
              { value: "new", label: "En yeni" },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Error State"
        description="errorText ile zorunlu alan hatası gösterilir."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Ödeme yöntemi"
  errorText="Bir ödeme yöntemi seçmeniz zorunludur."
  options={[
    { value: "card",   label: "Kredi Kartı" },
    { value: "bank",   label: "Banka Transferi" },
    { value: "crypto", label: "Kripto", disabled: true },
  ]}
/>`}
      >
        <div className="max-w-sm">
          <RadioGroup
            label="Ödeme yöntemi"
            errorText="Bir ödeme yöntemi seçmeniz zorunludur."
            options={[
              { value: "card", label: "Kredi Kartı" },
              { value: "bank", label: "Banka Transferi" },
              { value: "crypto", label: "Kripto", disabled: true },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Kart Görünümü (card)"
        description="card prop ile her seçenek ayrı bir kart olarak gösterilir."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Plan seçin"
  card
  defaultValue="pro"
  options={[
    { value: "starter",    label: "Starter",    description: "Bireysel kullanım, 3 proje limiti." },
    { value: "pro",        label: "Pro",         description: "Sınırsız proje, analitik paneli." },
    { value: "enterprise", label: "Enterprise",  description: "Özel fiyatlandırma, SLA garantisi." },
  ]}
/>`}
      >
        <div className="max-w-md">
          <RadioGroup
            label="Plan seçin"
            card
            defaultValue="pro"
            options={[
              {
                value: "starter",
                label: "Starter",
                description: "Bireysel kullanım, 3 proje limiti.",
              },
              {
                value: "pro",
                label: "Pro",
                description: "Sınırsız proje, analitik paneli, öncelikli destek.",
              },
              {
                value: "enterprise",
                label: "Enterprise",
                description: "Özel fiyatlandırma, SLA garantisi.",
              },
            ]}
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Kart Görünümü — Yatay"
        description="card ve horizontal kombinasyonu ile yatay kart seçimi."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Fatura dönemi"
  card
  horizontal
  defaultValue="annual"
  options={[
    { value: "monthly", label: "Aylık",  description: "₺99/ay" },
    { value: "annual",  label: "Yıllık", description: "₺79/ay · %20 indirim" },
  ]}
/>`}
      >
        <RadioGroup
          label="Fatura dönemi"
          card
          horizontal
          defaultValue="annual"
          options={[
            { value: "monthly", label: "Aylık", description: "₺99/ay" },
            { value: "annual", label: "Yıllık", description: "₺79/ay · %20 indirim" },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled"
        description="disabled prop ile tüm grup etkileşime kapatılır."
        importLine={IMPORT}
        code={`<RadioGroup
  label="Disabled grup"
  disabled
  defaultValue="a"
  options={[
    { value: "a", label: "Seçenek A" },
    { value: "b", label: "Seçenek B" },
  ]}
/>`}
      >
        <div className="max-w-sm">
          <RadioGroup
            label="Disabled grup"
            disabled
            defaultValue="a"
            options={[
              { value: "a", label: "Seçenek A" },
              { value: "b", label: "Seçenek B" },
            ]}
          />
        </div>
      </ShowcaseSection>
    </div>
  );
}
