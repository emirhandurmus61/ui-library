"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/ui/radio";

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
        <p className="text-foreground-muted">
          3 size · description · error state · yatay · kart görünümü
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <RadioGroup
          label="Cinsiyet"
          defaultValue="male"
          options={[
            { value: "male", label: "Erkek" },
            { value: "female", label: "Kadın" },
            { value: "other", label: "Belirtmek istemiyorum" },
          ]}
        />
      </Section>

      {/* Controlled */}
      <Section title="Controlled + Description">
        <ControlledDemo />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
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
      </Section>

      {/* Yatay */}
      <Section title="Yatay (Horizontal)">
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
      </Section>

      {/* Error */}
      <Section title="Error State">
        <RadioGroup
          label="Ödeme yöntemi"
          errorText="Bir ödeme yöntemi seçmeniz zorunludur."
          options={[
            { value: "card", label: "Kredi Kartı" },
            { value: "bank", label: "Banka Transferi" },
            { value: "crypto", label: "Kripto", disabled: true },
          ]}
        />
      </Section>

      {/* Kart görünümü */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Kart Görünümü (card)
        </h2>
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
      </section>

      {/* Kart yatay */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Kart Görünümü — Yatay
        </h2>
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
      </section>

      {/* Disabled */}
      <Section title="Disabled">
        <RadioGroup
          label="Disabled grup"
          disabled
          defaultValue="a"
          options={[
            { value: "a", label: "Seçenek A" },
            { value: "b", label: "Seçenek B" },
          ]}
        />
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { RadioGroup } from "@/components/ui/radio";

// Temel
<RadioGroup
  label="Plan"
  defaultValue="free"
  options={[
    { value: "free", label: "Ücretsiz" },
    { value: "pro", label: "Pro" },
  ]}
/>

// Controlled
<RadioGroup value={value} onChange={setValue} options={[...]} />

// Kart görünümü
<RadioGroup card options={[...]} />

// Yatay
<RadioGroup horizontal options={[...]} />`}
        </pre>
      </section>
    </div>
  );
}
