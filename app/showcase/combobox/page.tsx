"use client";

import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const FRUITS = [
  { value: "apple",  label: "Elma" },
  { value: "banana", label: "Muz" },
  { value: "cherry", label: "Kiraz" },
  { value: "grape",  label: "Üzüm" },
  { value: "kiwi",   label: "Kivi" },
  { value: "lemon",  label: "Limon" },
  { value: "mango",  label: "Mango" },
  { value: "orange", label: "Portakal" },
  { value: "peach",  label: "Şeftali" },
  { value: "pear",   label: "Armut" },
];

const COUNTRIES = [
  { value: "tr", label: "Türkiye",   group: "Orta Doğu" },
  { value: "ae", label: "BAE",       group: "Orta Doğu" },
  { value: "de", label: "Almanya",   group: "Avrupa" },
  { value: "fr", label: "Fransa",    group: "Avrupa" },
  { value: "gb", label: "İngiltere", group: "Avrupa" },
  { value: "us", label: "ABD",       group: "Amerika" },
  { value: "br", label: "Brezilya",  group: "Amerika" },
];

const TAGS = [
  { value: "react",      label: "React" },
  { value: "typescript", label: "TypeScript" },
  { value: "nextjs",     label: "Next.js" },
  { value: "tailwind",   label: "Tailwind CSS" },
  { value: "nodejs",     label: "Node.js" },
  { value: "python",     label: "Python" },
  { value: "rust",       label: "Rust" },
];

export default function ComboboxShowcase() {
  const [single, setSingle] = useState("");
  const [multi,  setMulti]  = useState<string[]>([]);
  const [country, setCountry] = useState("");
  const [creatable, setCreatable] = useState<string[]>([]);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Combobox</h1>
        <p className="text-sm text-foreground-muted">
          Arama + seçme hibrid · multi-select · gruplu seçenekler · creatable · clearable · portal dropdown
        </p>
      </div>

      <ShowcaseSection
        title="Tekli Seçim"
        description="Arama yapılabilen standart dropdown."
        previewClassName="max-w-sm"
        code={`const [value, setValue] = useState("");

<Combobox
  options={FRUITS}
  value={value}
  onChange={(v) => setValue(v as string)}
  label="Meyve Seç"
  placeholder="Meyve seçiniz..."
  clearable
/>`}
      >
        <Combobox
          options={FRUITS}
          value={single}
          onChange={(v) => setSingle(v as string)}
          label="Meyve Seç"
          placeholder="Meyve seçiniz..."
          clearable
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Gruplu Seçenekler"
        description="Seçenekler grup başlıklarıyla ayrılmış dropdown."
        previewClassName="max-w-sm"
        code={`<Combobox
  options={COUNTRIES}
  value={country}
  onChange={(v) => setCountry(v as string)}
  label="Ülke"
  placeholder="Ülke seçin..."
  clearable
/>`}
      >
        <Combobox
          options={COUNTRIES}
          value={country}
          onChange={(v) => setCountry(v as string)}
          label="Ülke"
          placeholder="Ülke seçin..."
          clearable
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Multi-Select"
        description="Birden fazla seçim. Seçilen değerler trigger'da gösterilir, footer'da temizle butonu vardır."
        previewClassName="max-w-sm"
        code={`const [values, setValues] = useState<string[]>([]);

<Combobox
  options={TAGS}
  value={values}
  onChange={(v) => setValues(v as string[])}
  multiple
  label="Teknolojiler"
  placeholder="Teknoloji seçin..."
  clearable
/>`}
      >
        <div className="max-w-sm w-full space-y-2">
          <Combobox
            options={TAGS}
            value={multi}
            onChange={(v) => setMulti(v as string[])}
            multiple
            label="Teknolojiler"
            placeholder="Teknoloji seçin..."
            clearable
          />
          {multi.length > 0 && (
            <p className="text-xs text-foreground-muted">
              Seçili: {multi.join(", ")}
            </p>
          )}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Creatable"
        description="Sonuç bulunamazsa yeni seçenek oluşturma butonu çıkar."
        previewClassName="max-w-sm"
        code={`<Combobox
  options={options}
  multiple
  creatable
  onCreateOption={(val) => addOption(val)}
  label="Etiketler"
  placeholder="Etiket ekle veya oluştur..."
/>`}
      >
        <Combobox
          options={TAGS.filter((t) => creatable.includes(t.value) || TAGS.includes(t))}
          multiple
          creatable
          value={creatable}
          onChange={(v) => setCreatable(v as string[])}
          onCreateOption={(val) => {
            const newOpt = { value: val.toLowerCase().replace(/\s+/g, "-"), label: val };
            TAGS.push(newOpt);
            setCreatable((p) => [...p, newOpt.value]);
          }}
          label="Etiketler"
          placeholder="Etiket ara veya oluştur..."
          clearable
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        previewClassName="flex flex-col gap-4 max-w-sm"
        code={`<Combobox options={FRUITS} errorText="Bu alan zorunludur." />
<Combobox options={FRUITS} successText="Geçerli seçim." defaultValue="apple" />
<Combobox options={FRUITS} disabled placeholder="Devre dışı" />`}
      >
        <Combobox options={FRUITS} errorText="Bu alan zorunludur." placeholder="Hata durumu" />
        <Combobox options={FRUITS} successText="Geçerli seçim." defaultValue="apple" label="Başarı" />
        <Combobox options={FRUITS} disabled placeholder="Devre dışı" label="Disabled" />
      </ShowcaseSection>
    </div>
  );
}
