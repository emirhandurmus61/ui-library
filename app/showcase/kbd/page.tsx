"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { Kbd, KbdShortcut, KbdGroup } from "@/components/ui/kbd";

export default function KbdShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Keyboard Shortcut (Kbd)</h1>
        <p className="text-foreground-muted">
          ⌘K, ⇧⌘P gibi kısayol gösterme badge'leri. Sembol dönüşümü, 5 varyant, 4 boyut.
        </p>
      </div>

      {/* Single keys */}
      <ShowcaseSection
        title="Tekil Tuşlar"
        description="Otomatik sembol dönüşümü: cmd→⌘, shift→⇧, alt→⌥, ctrl→⌃, enter→↵ vb."
        importLine={`import { Kbd } from "@/components/ui/kbd";`}
        code={`<Kbd keys="cmd" />
<Kbd keys="shift" />
<Kbd keys="alt" />
<Kbd keys="ctrl" />
<Kbd keys="enter" />
<Kbd keys="escape" />
<Kbd keys="tab" />`}
      >
        <div className="flex flex-wrap gap-2 items-center">
          {["cmd", "shift", "alt", "ctrl", "enter", "escape", "tab", "delete", "up", "down", "left", "right", "space"].map(k => (
            <Kbd key={k} keys={k} />
          ))}
        </div>
      </ShowcaseSection>

      {/* Combinations */}
      <ShowcaseSection
        title="Kombinasyonlar"
        description="Array geçerek çoklu tuş kombinasyonları."
        importLine={`import { Kbd } from "@/components/ui/kbd";`}
        code={`<Kbd keys={["cmd", "K"]} />
<Kbd keys={["shift", "cmd", "P"]} />
<Kbd keys={["ctrl", "shift", "I"]} />
<Kbd keys={["alt", "F4"]} />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          <Kbd keys={["cmd", "K"]} />
          <Kbd keys={["shift", "cmd", "P"]} />
          <Kbd keys={["ctrl", "C"]} />
          <Kbd keys={["ctrl", "shift", "I"]} />
          <Kbd keys={["alt", "Tab"]} />
          <Kbd keys={["cmd", "shift", "T"]} />
        </div>
      </ShowcaseSection>

      {/* Variants */}
      <ShowcaseSection
        title="Varyantlar"
        description="default, outline, ghost, dark, colored — 5 görsel stil."
        importLine={`import { Kbd } from "@/components/ui/kbd";`}
        code={`<Kbd keys={["cmd", "K"]} variant="default" />
<Kbd keys={["cmd", "K"]} variant="outline" />
<Kbd keys={["cmd", "K"]} variant="ghost" />
<Kbd keys={["cmd", "K"]} variant="dark" />
<Kbd keys={["cmd", "K"]} variant="colored" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          {(["default","outline","ghost","dark","colored"] as const).map(v => (
            <div key={v} className="flex flex-col items-center gap-1.5">
              <Kbd keys={["cmd", "K"]} variant={v} />
              <span className="text-[11px] text-foreground-subtle">{v}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Sizes */}
      <ShowcaseSection
        title="Boyutlar"
        description="xs, sm (varsayılan), md, lg."
        importLine={`import { Kbd } from "@/components/ui/kbd";`}
        code={`<Kbd keys={["cmd", "K"]} size="xs" />
<Kbd keys={["cmd", "K"]} size="sm" />
<Kbd keys={["cmd", "K"]} size="md" />
<Kbd keys={["cmd", "K"]} size="lg" />`}
      >
        <div className="flex flex-wrap gap-4 items-center">
          {(["xs","sm","md","lg"] as const).map(s => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Kbd keys={["cmd", "K"]} size={s} />
              <span className="text-[11px] text-foreground-subtle">{s}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* KbdShortcut */}
      <ShowcaseSection
        title="KbdShortcut — Label + Tuş"
        description="Açıklama etiketi ile tuş kombinasyonunu yan yana gösterir."
        importLine={`import { KbdShortcut } from "@/components/ui/kbd";`}
        code={`<KbdShortcut label="Komut paleti" keys={["cmd", "K"]} />
<KbdShortcut label="Kaydet" keys={["cmd", "S"]} />
<KbdShortcut label="Tümünü seç" keys={["cmd", "A"]} />`}
      >
        <div className="max-w-xs space-y-2">
          <KbdShortcut label="Komut paleti" keys={["cmd", "K"]} />
          <KbdShortcut label="Kaydet" keys={["cmd", "S"]} />
          <KbdShortcut label="Geri al" keys={["cmd", "Z"]} />
          <KbdShortcut label="Yinele" keys={["cmd", "shift", "Z"]} />
          <KbdShortcut label="Bul ve değiştir" keys={["cmd", "H"]} />
          <KbdShortcut label="Yeni sekme" keys={["cmd", "T"]} />
        </div>
      </ShowcaseSection>

      {/* KbdGroup */}
      <ShowcaseSection
        title="KbdGroup — Kısayol Tablosu"
        description="Başlıklı kısayol grupları. Yardım menüsü veya modal için."
        importLine={`import { KbdGroup } from "@/components/ui/kbd";`}
        code={`<KbdGroup
  title="Genel"
  shortcuts={[
    { label: "Komut paleti", keys: ["cmd", "K"] },
    { label: "Kaydet", keys: ["cmd", "S"] },
  ]}
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-2 max-w-2xl">
          <KbdGroup title="Genel" shortcuts={[
            { label: "Komut paleti",  keys: ["cmd", "K"] },
            { label: "Arama",         keys: ["cmd", "F"] },
            { label: "Yeni öğe",      keys: ["cmd", "N"] },
            { label: "Ayarlar",       keys: ["cmd", ","] },
          ]} />
          <KbdGroup title="Düzenleme" shortcuts={[
            { label: "Geri al",       keys: ["cmd", "Z"] },
            { label: "Yinele",        keys: ["cmd", "shift", "Z"] },
            { label: "Kopyala",       keys: ["cmd", "C"] },
            { label: "Yapıştır",      keys: ["cmd", "V"] },
            { label: "Tümünü seç",    keys: ["cmd", "A"] },
          ]} />
          <KbdGroup title="Navigasyon" shortcuts={[
            { label: "Ana sayfa",     keys: ["cmd", "shift", "H"] },
            { label: "Önceki sekme",  keys: ["cmd", "shift", "Tab"] },
            { label: "Sonraki sekme", keys: ["cmd", "Tab"] },
          ]} />
          <KbdGroup title="Görünüm" shortcuts={[
            { label: "Dark mode",     keys: ["cmd", "shift", "L"] },
            { label: "Tam ekran",     keys: ["F11"] },
            { label: "Yakınlaştır",   keys: ["cmd", "+"] },
            { label: "Uzaklaştır",    keys: ["cmd", "-"] },
          ]} />
        </div>
      </ShowcaseSection>

      {/* Inline usage */}
      <ShowcaseSection
        title="Inline Kullanım"
        description="Metin içinde, buton içinde ve tooltip'te kullanım örnekleri."
        importLine={`import { Kbd } from "@/components/ui/kbd";`}
        code={`<p>Kaydetmek için <Kbd keys={["cmd", "S"]} /> kullanın.</p>
<button>Ara <Kbd keys={["cmd", "K"]} variant="colored" /></button>`}
      >
        <div className="space-y-4 text-sm text-foreground-muted">
          <p>Hızlı arama için <Kbd keys={["cmd", "K"]} /> kısayolunu kullanabilirsiniz.</p>
          <p>Değişiklikleri kaydetmek için <Kbd keys={["cmd", "S"]} />, geri almak için <Kbd keys={["cmd", "Z"]} /> tuşlarına basın.</p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border border-border bg-surface text-foreground text-sm hover:bg-background-muted transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Ara
              <Kbd keys={["cmd", "K"]} variant="colored" size="xs" />
            </button>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
