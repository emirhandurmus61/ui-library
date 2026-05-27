"use client";

import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

/* Indeterminate demo */
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
        <p className="text-foreground-muted">
          3 size · indeterminate · description · error state · CheckboxGroup
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <Checkbox label="Beni hatırla" />
        <Checkbox label="Varsayılan seçili" defaultChecked />
        <Checkbox label="Hizmet şartlarını kabul ediyorum" description="Devam etmek için şartları kabul etmeniz gerekmektedir." />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Checkbox size="sm" label="Small (sm)" defaultChecked />
        <Checkbox size="md" label="Medium (md) — varsayılan" defaultChecked />
        <Checkbox size="lg" label="Large (lg)" defaultChecked />
      </Section>

      {/* Indeterminate */}
      <Section title="Indeterminate (Tümünü Seç)">
        <IndeterminateDemo />
      </Section>

      {/* States */}
      <Section title="States">
        <Checkbox label="Hata durumu" errorText="Bu alanı işaretlemeniz zorunludur." />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled seçili" disabled defaultChecked />
      </Section>

      {/* CheckboxGroup */}
      <Section title="CheckboxGroup">
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
      </Section>

      {/* CheckboxGroup horizontal */}
      <Section title="CheckboxGroup — Yatay">
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
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";

// Temel
<Checkbox label="Beni hatırla" />

// Indeterminate
<Checkbox
  label="Tümünü seç"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={toggleAll}
/>

// CheckboxGroup
<CheckboxGroup
  label="İlgi alanları"
  value={selected}
  onChange={setSelected}
  options={[
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
  ]}
/>`}
        </pre>
      </section>
    </div>
  );
}
