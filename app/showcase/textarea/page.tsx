"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Textarea } from "@/components/ui/textarea";`;

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
        <p className="text-sm text-foreground-muted">
          Auto-grow · karakter sayacı · error / success state · label · helper text
        </p>
      </div>

      <ShowcaseSection
        title="Temel"
        description="label, placeholder, required ve rows prop'larıyla temel kullanım."
        importLine={IMPORT}
        code={`<Textarea label="Mesaj" placeholder="Mesajınızı yazın..." />
<Textarea label="Zorunlu" placeholder="Bu alan gereklidir." required />
<Textarea label="Özel satır sayısı" placeholder="6 satır yüksekliğinde..." rows={6} />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <Textarea label="Mesaj" placeholder="Mesajınızı yazın..." />
          <Textarea label="Zorunlu" placeholder="Bu alan gereklidir." required />
          <Textarea label="Özel satır sayısı" placeholder="6 satır yüksekliğinde..." rows={6} />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="States"
        description="errorText, successText ve helperText ile durum geri bildirimi."
        importLine={IMPORT}
        code={`<Textarea label="Hata durumu" defaultValue="çok kısa" errorText="En az 20 karakter girilmelidir." />
<Textarea label="Başarı durumu" defaultValue="Bu açıklama yeterince uzun ve geçerli." successText="Harika görünüyor!" />
<Textarea label="Helper text" placeholder="Ürün açıklaması..." helperText="Alıcıların ürünü anlamasına yardımcı olacak detaylar ekleyin." />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
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
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Auto-grow"
        description="autoGrow prop ile alan içerik arttıkça maxRows sınırına kadar büyür."
        importLine={IMPORT}
        code={`<Textarea
  label="Auto-grow (max 6 satır)"
  autoGrow
  maxRows={6}
  rows={2}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
      >
        <div className="max-w-sm">
          <AutoGrowDemo />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Karakter Sayacı"
        description="showCount ve maxLength ile kalan karakter sayısı gösterilir."
        importLine={IMPORT}
        code={`<Textarea
  label="Açıklama"
  maxLength={200}
  showCount
  rows={3}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`}
      >
        <div className="max-w-sm">
          <CountDemo />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Disabled / Read-only"
        description="disabled ile etkileşim tamamen kapatılır, readOnly ile salt-okunur hale gelir."
        importLine={IMPORT}
        code={`<Textarea label="Disabled" placeholder="Bu alan pasif." disabled />
<Textarea label="Read-only" defaultValue="Bu içerik değiştirilemez." readOnly />`}
      >
        <div className="flex flex-col gap-4 max-w-sm">
          <Textarea label="Disabled" placeholder="Bu alan pasif." disabled />
          <Textarea
            label="Read-only"
            defaultValue="Bu içerik değiştirilemez."
            readOnly
          />
        </div>
      </ShowcaseSection>
    </div>
  );
}
