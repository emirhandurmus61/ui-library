"use client";

import { useState } from "react";
import { ColorPicker } from "@/components/ui/color-picker";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const BRAND_PRESETS = [
  "#0070f3", // Vercel blue
  "#7c3aed", // purple
  "#059669", // green
  "#dc2626", // red
  "#d97706", // amber
  "#0891b2", // cyan
  "#db2777", // pink
  "#1e293b", // dark
  "#64748b", // slate
  "#f8fafc", // white
];

export default function ColorPickerPage() {
  const [color, setColor] = useState("#3b82f6");
  const [opacityColor, setOpacityColor] = useState("#8b5cf6");
  const [brandColor, setBrandColor] = useState("#0070f3");

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Color Picker</h1>
        <p className="text-sm text-foreground-muted">
          Renk seçici. Preset renkler · hex input · opacity slider
        </p>
      </div>

      <ShowcaseSection
        title="Varsayılan"
        description="Hex input + preset renkler"
      >
        <div className="max-w-xs space-y-3">
          <ColorPicker value={color} onChange={setColor} />
          <p className="text-sm text-foreground-muted flex items-center gap-2">
            Seçilen renk:
            <span
              className="inline-block size-4 rounded border border-border"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            <span className="font-mono text-foreground">{color}</span>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Opacity ile"
        description="showOpacity slider — rgba değeri emit eder"
      >
        <div className="max-w-xs space-y-3">
          <ColorPicker value={opacityColor} onChange={setOpacityColor} showOpacity />
          <p className="text-sm text-foreground-muted">
            Değer:{" "}
            <span className="font-mono text-foreground text-xs">{opacityColor}</span>
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Presetler"
        description="Marka renkleri ile özelleştirilmiş preset listesi"
      >
        <div className="max-w-xs space-y-3">
          <ColorPicker
            value={brandColor}
            onChange={setBrandColor}
            presets={BRAND_PRESETS}
          />
          <p className="text-sm text-foreground-muted flex items-center gap-2">
            Seçilen:
            <span
              className="inline-block size-4 rounded border border-border"
              style={{ backgroundColor: brandColor }}
              aria-hidden="true"
            />
            <span className="font-mono text-foreground">{brandColor}</span>
          </p>
        </div>
      </ShowcaseSection>
    </div>
  );
}
