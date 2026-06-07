"use client";

import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";`;

function IndeterminateDemo() {
  const items = ["JavaScript", "TypeScript", "Python"];
  const [selected, setSelected] = useState<string[]>(["JavaScript"]);

  const allChecked = selected.length === items.length;
  const someChecked = selected.length > 0 && !allChecked;

  const toggleAll = () =>
    setSelected(allChecked ? [] : items);

  return (
    <div className="flex flex-col gap-2">
      <Checkbox
        label="Tümünü seç"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={toggleAll}
      />
      <div className="ml-6 flex flex-col gap-2">
        {items.map((item) => (
          <Checkbox
            key={item}
            label={item}
            checked={selected.includes(item)}
            onChange={() =>
              setSelected((prev) =>
                prev.includes(item)
                  ? prev.filter((i) => i !== item)
                  : [...prev, item]
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function CheckboxShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Checkbox</h1>
        <p className="text-sm text-foreground-muted">
          3 size · indeterminate · description · error state · CheckboxGroup
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="Basit checkbox kullanımı; label, defaultChecked ve description prop'ları."
        importLine={IMPORT}
        code={`<Checkbox label="Beni hatırla" />
<Checkbox label="Varsayılan seçili" defaultChecked />
<Checkbox
  label="Hizmet şartlarını kabul ediyorum"
  description="Devam etmek için şartları kabul etmeniz gerekmektedir."
/>`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox label="Beni hatırla" />
          <Checkbox label="Varsayılan seçili" defaultChecked />
          <Checkbox label="Hizmet şartlarını kabul ediyorum" description="Devam etmek için şartları kabul etmeniz gerekmektedir." />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="sm, md (varsayılan) ve lg boyutları."
        importLine={IMPORT}
        code={`<Checkbox size="sm" label="Small (sm)" defaultChecked />
<Checkbox size="md" label="Medium (md) — varsayılan" defaultChecked />
<Checkbox size="lg" label="Large (lg)" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox size="sm" label="Small (sm)" defaultChecked />
          <Checkbox size="md" label="Medium (md) — varsayılan" defaultChecked />
          <Checkbox size="lg" label="Large (lg)" defaultChecked />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Indeterminate (Tümünü Seç)"
        description="indeterminate prop ile kısmen seçili durumu gösterilir."
        importLine={IMPORT}
        code={`<Checkbox
  label="Tümünü seç"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={toggleAll}
/>`}
      >
        <IndeterminateDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="Hata, disabled ve disabled+seçili durumları."
        importLine={IMPORT}
        code={`<Checkbox label="Hata durumu" errorText="Bu alanı işaretlemeniz zorunludur." />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled seçili" disabled defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox label="Hata durumu" errorText="Bu alanı işaretlemeniz zorunludur." />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Disabled seçili" disabled defaultChecked />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="CheckboxGroup"
        description="Birden fazla checkbox'ı grup olarak yönetir; helperText ve disabled seçenek desteği."
        importLine={IMPORT}
        code={`<CheckboxGroup
  label="İlgi alanları"
  helperText="Birden fazla seçebilirsiniz."
  defaultValue={["design"]}
  options={[
    { value: "frontend", label: "Frontend Geliştirme" },
    { value: "backend", label: "Backend Geliştirme" },
    { value: "design", label: "UI/UX Tasarım" },
    { value: "devops", label: "DevOps" },
    { value: "mobile", label: "Mobil", disabled: true },
  ]}
/>`}
      >
        <CheckboxGroup
          label="İlgi alanları"
          helperText="Birden fazla seçebilirsiniz."
          defaultValue={["design"]}
          options={[
            { value: "frontend", label: "Frontend Geliştirme" },
            { value: "backend", label: "Backend Geliştirme" },
            { value: "design", label: "UI/UX Tasarım" },
            { value: "devops", label: "DevOps" },
            { value: "mobile", label: "Mobil", disabled: true },
          ]}
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="CheckboxGroup — Yatay"
        description="horizontal prop ile seçenekler yan yana dizilir."
        importLine={IMPORT}
        code={`<CheckboxGroup
  label="Teknolojiler"
  horizontal
  defaultValue={["react", "ts"]}
  options={[
    { value: "react", label: "React" },
    { value: "ts", label: "TypeScript" },
    { value: "tailwind", label: "Tailwind" },
    { value: "next", label: "Next.js" },
  ]}
/>`}
      >
        <CheckboxGroup
          label="Teknolojiler"
          horizontal
          defaultValue={["react", "ts"]}
          options={[
            { value: "react", label: "React" },
            { value: "ts", label: "TypeScript" },
            { value: "tailwind", label: "Tailwind" },
            { value: "next", label: "Next.js" },
          ]}
        />
      </ShowcaseSection>
    </div>
  );
}
