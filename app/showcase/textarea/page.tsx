"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

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

/* autoGrow demo: controlled */
function AutoGrowDemo() {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Auto-grow (max 6 satır)"
      placeholder="Yazmaya başlayın, alan büyüyecek..."
      autoGrow
      maxRows={6}
      rows={2}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

/* Karakter sayacı demo: controlled */
function CountDemo() {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="Açıklama"
      placeholder="En fazla 200 karakter..."
      maxLength={200}
      showCount
      rows={3}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default function TextareaShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Textarea</h1>
        <p className="text-foreground-muted">
          Auto-grow · karakter sayacı · error / success state · label · helper text
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <Textarea label="Mesaj" placeholder="Mesajınızı yazın..." />
        <Textarea label="Zorunlu" placeholder="Bu alan gereklidir." required />
        <Textarea label="Özel satır sayısı" placeholder="6 satır yüksekliğinde..." rows={6} />
      </Section>

      {/* States */}
      <Section title="States">
        <Textarea
          label="Hata durumu"
          defaultValue="çok kısa"
          errorText="En az 20 karakter girilmelidir."
        />
        <Textarea
          label="Başarı durumu"
          defaultValue="Bu açıklama yeterince uzun ve geçerli."
          successText="Harika görünüyor!"
        />
        <Textarea
          label="Helper text"
          placeholder="Ürün açıklaması..."
          helperText="Alıcıların ürünü anlamasına yardımcı olacak detaylar ekleyin."
        />
      </Section>

      {/* Auto-grow */}
      <Section title="Auto-grow">
        <AutoGrowDemo />
      </Section>

      {/* Karakter sayacı */}
      <Section title="Karakter Sayacı">
        <CountDemo />
      </Section>

      {/* Disabled / ReadOnly */}
      <Section title="Disabled / Read-only">
        <Textarea label="Disabled" placeholder="Bu alan pasif." disabled />
        <Textarea
          label="Read-only"
          defaultValue="Bu içerik değiştirilemez."
          readOnly
        />
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Textarea } from "@/components/ui/textarea";

// Temel
<Textarea label="Mesaj" placeholder="Yazın..." />

// Auto-grow (max 6 satır)
<Textarea autoGrow maxRows={6} rows={2} />

// Karakter sayacı
<Textarea showCount maxLength={200} />

// Hata state
<Textarea errorText="En az 20 karakter girin." />

// Başarı state
<Textarea successText="Harika görünüyor!" />`}
        </pre>
      </section>
    </div>
  );
}
