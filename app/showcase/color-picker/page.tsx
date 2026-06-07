"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Preset setleri ─────────────────────────────────────────── */

const BRAND_PRESETS = [
  "#0070F3","#7C3AED","#059669","#DC2626",
  "#D97706","#0891B2","#DB2777","#1E293B",
  "#64748B","#F8FAFC","#FF6B6B","#4ECDC4",
];

const PASTEL_PRESETS = [
  "#FFB3BA","#FFDFBA","#FFFFBA","#BAFFC9",
  "#BAE1FF","#D4BAFF","#FFB3F7","#B3FFE0",
  "#FFD9B3","#B3D9FF","#F7FFB3","#FFB3CC",
];

const TAILWIND_PRESETS = [
  "#EF4444","#F97316","#EAB308","#22C55E",
  "#06B6D4","#3B82F6","#8B5CF6","#EC4899",
  "#14B8A6","#6366F1","#F43F5E","#84CC16",
];

const MONO_PRESETS = [
  "#FFFFFF","#F9FAFB","#F3F4F6","#E5E7EB",
  "#D1D5DB","#9CA3AF","#6B7280","#4B5563",
  "#374151","#1F2937","#111827","#000000",
];

/* ─── Yardımcı ───────────────────────────────────────────────── */

function ColorSwatch({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="size-8 rounded-[var(--radius-md)] border border-border shrink-0"
        style={{ backgroundColor: color }}
      />
      {label && <span className="text-xs text-foreground-muted">{label}</span>}
      <span className="text-xs font-mono text-foreground">{color}</span>
    </div>
  );
}

/* ─── Tema builder demo ──────────────────────────────────────── */

function ThemeBuilder() {
  const [primary,    setPrimary]    = useState("#6366F1");
  const [secondary,  setSecondary]  = useState("#8B5CF6");
  const [accent,     setAccent]     = useState("#EC4899");
  const [background, setBackground] = useState("#FFFFFF");
  const [text,       setText]       = useState("#111827");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: "Primary",    value: primary,    set: setPrimary },
          { label: "Secondary",  value: secondary,  set: setSecondary },
          { label: "Accent",     value: accent,     set: setAccent },
          { label: "Background", value: background, set: setBackground },
        ].map(({ label, value, set }) => (
          <div key={label} className="space-y-2">
            <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">{label}</p>
            <ColorPicker value={value} onChange={set} showPresets={false} />
          </div>
        ))}
      </div>

      {/* Canlı önizleme */}
      <div>
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-3">Canlı Önizleme</p>
        <div
          className="rounded-[var(--radius-xl)] border border-border overflow-hidden shadow-sm"
          style={{ backgroundColor: background, color: text }}
        >
          {/* Navbar */}
          <div className="px-4 py-3 flex items-center gap-3 border-b" style={{ borderColor: `${text}18`, backgroundColor: primary }}>
            <span className="text-sm font-bold text-white">Uygulama</span>
            <div className="flex-1" />
            {["Anasayfa","Özellikler","Fiyat"].map(l => (
              <span key={l} className="text-xs text-white/80">{l}</span>
            ))}
          </div>

          {/* Body */}
          <div className="p-5 space-y-3">
            <h3 className="text-base font-bold" style={{ color: text }}>Başlık Metni</h3>
            <p className="text-sm opacity-70" style={{ color: text }}>
              Renk paletinizin gerçek uygulamada nasıl göründüğünü buradan kontrol edin.
            </p>
            <div className="flex gap-2 pt-1">
              <button className="text-xs px-3 py-1.5 rounded-md font-medium text-white" style={{ backgroundColor: primary }}>
                Başla
              </button>
              <button className="text-xs px-3 py-1.5 rounded-md font-medium text-white" style={{ backgroundColor: secondary }}>
                Daha Fazla
              </button>
              <button className="text-xs px-3 py-1.5 rounded-md font-medium text-white" style={{ backgroundColor: accent }}>
                İletişim
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS çıktısı */}
      <div>
        <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider mb-2">CSS Değişkenleri</p>
        <pre className="text-xs font-mono bg-background-muted rounded-[var(--radius-lg)] p-4 text-foreground-muted overflow-x-auto">
{`:root {
  --color-primary:    ${primary};
  --color-secondary:  ${secondary};
  --color-accent:     ${accent};
  --color-background: ${background};
  --color-text:       ${text};
}`}
        </pre>
      </div>
    </div>
  );
}

/* ─── Gradient builder demo ──────────────────────────────────── */

function GradientBuilder() {
  const [from, setFrom] = useState("#6366F1");
  const [to,   setTo]   = useState("#EC4899");
  const [angle, setAngle] = useState(135);

  const gradient = `linear-gradient(${angle}deg, ${from}, ${to})`;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Başlangıç</p>
          <ColorPicker value={from} onChange={setFrom} showPresets={false} />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Bitiş</p>
          <ColorPicker value={to} onChange={setTo} showPresets={false} />
        </div>
      </div>

      {/* Açı */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">Açı</p>
          <span className="text-xs font-mono text-foreground-muted">{angle}°</span>
        </div>
        <input
          type="range" min={0} max={360} value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-primary"
        />
      </div>

      {/* Önizleme */}
      <div
        className="h-24 rounded-[var(--radius-xl)] border border-border"
        style={{ background: gradient }}
      />

      {/* CSS */}
      <pre className="text-xs font-mono bg-background-muted rounded-[var(--radius-lg)] p-3 text-foreground-muted">
        {`background: ${gradient};`}
      </pre>
    </div>
  );
}

/* ─── Showcase ───────────────────────────────────────────────── */

export default function ColorPickerPage() {
  const [basic,   setBasic]   = useState("#3B82F6");
  const [opacity, setOpacity] = useState("#8B5CF6");
  const [brand,   setBrand]   = useState("#0070F3");
  const [pastel,  setPastel]  = useState("#FFB3BA");
  const [tw,      setTw]      = useState("#6366F1");
  const [mono,    setMono]    = useState("#374151");

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Color Picker</h1>
        <p className="text-sm text-foreground-muted">
          HSV gradyan · hue slider · opacity · hex &amp; RGB input · kopyala · preset setleri · tema &amp; gradient builder
        </p>
      </div>

      {/* ── 1. Temel ─────────────────────────────────────────── */}
      <ShowcaseSection
        title="Temel Kullanım"
        description="Gradyan canvas + hue slider + hex input. Sürükle veya preset seç."
        code={`const [color, setColor] = useState("#3B82F6");
<ColorPicker value={color} onChange={setColor} />`}
      >
        <div className="max-w-xs space-y-3">
          <ColorPicker value={basic} onChange={setBasic} />
          <ColorSwatch color={basic} label="Seçilen:" />
        </div>
      </ShowcaseSection>

      {/* ── 2. Opacity ───────────────────────────────────────── */}
      <ShowcaseSection
        title="Opacity Slider"
        description="showOpacity ile alfa kanalı slider'ı aktif olur."
        code={`<ColorPicker value={color} onChange={setColor} showOpacity />`}
      >
        <div className="max-w-xs space-y-3">
          <ColorPicker value={opacity} onChange={setOpacity} showOpacity />
          <ColorSwatch color={opacity} label="Seçilen:" />
        </div>
      </ShowcaseSection>

      {/* ── 3. Preset setleri ────────────────────────────────── */}
      <ShowcaseSection
        title="Preset Setleri"
        description="Marka, pastel, Tailwind renkleri ve monokrom — presets prop ile özelleştirilebilir."
        code={`<ColorPicker presets={BRAND_PRESETS} value={color} onChange={setColor} />
<ColorPicker presets={PASTEL_PRESETS} value={color} onChange={setColor} />
<ColorPicker presets={TAILWIND_PRESETS} value={color} onChange={setColor} />`}
      >
        <div className="space-y-8">
          {[
            { label: "Marka Renkleri",  presets: BRAND_PRESETS,    value: brand,  set: setBrand },
            { label: "Pastel",          presets: PASTEL_PRESETS,   value: pastel, set: setPastel },
            { label: "Tailwind",        presets: TAILWIND_PRESETS, value: tw,     set: setTw },
            { label: "Monokrom",        presets: MONO_PRESETS,     value: mono,   set: setMono },
          ].map(({ label, presets, value: v, set }) => (
            <div key={label} className="space-y-2">
              <p className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">{label}</p>
              <div className="max-w-xs">
                <ColorPicker presets={presets} value={v} onChange={set} />
              </div>
              <ColorSwatch color={v} />
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* ── 4. Sadece Presetler ──────────────────────────────── */}
      <ShowcaseSection
        title="Sadece Presetler (Minimal)"
        description="showPresets=true, gradyan canvas'ı olmadan sade bir palet seçici."
        code={`<ColorPicker
  presets={BRAND_PRESETS}
  value={color}
  onChange={setColor}
/>`}
      >
        <div className="max-w-xs">
          <ColorPicker
            presets={BRAND_PRESETS}
            value={brand}
            onChange={setBrand}
            showPresets={true}
          />
        </div>
      </ShowcaseSection>

      {/* ── 5. Tema Builder ──────────────────────────────────── */}
      <ShowcaseSection
        title="Tema Builder"
        description="Birden fazla ColorPicker ile canlı UI tema önizlemesi ve CSS değişken çıktısı."
        code={`const [primary, setPrimary] = useState("#6366F1");
const [secondary, setSecondary] = useState("#8B5CF6");

<ColorPicker value={primary} onChange={setPrimary} showPresets={false} />
<ColorPicker value={secondary} onChange={setSecondary} showPresets={false} />`}
      >
        <ThemeBuilder />
      </ShowcaseSection>

      {/* ── 6. Gradient Builder ──────────────────────────────── */}
      <ShowcaseSection
        title="Gradient Builder"
        description="İki renk ve açı ayarıyla canlı CSS gradient üretici."
        code={`const [from, setFrom] = useState("#6366F1");
const [to, setTo]     = useState("#EC4899");

<ColorPicker value={from} onChange={setFrom} showPresets={false} />
<ColorPicker value={to}   onChange={setTo}   showPresets={false} />`}
      >
        <GradientBuilder />
      </ShowcaseSection>
    </div>
  );
}
