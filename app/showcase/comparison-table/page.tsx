"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ComparisonTable, type ComparisonPlan, type ComparisonFeature } from "@/components/ui/comparison-table";

/* ─── Data ───────────────────────────────────────────────────── */

const PLANS: ComparisonPlan[] = [
  {
    id: "free",
    name: "Ücretsiz",
    price: <span>₺0<span className="text-sm font-normal text-foreground-muted">/ay</span></span>,
    description: "Kişisel projeler",
    cta: { label: "Başla", href: "#" },
  },
  {
    id: "pro",
    name: "Pro",
    price: <span>₺299<span className="text-sm font-normal text-white/60">/ay</span></span>,
    description: "Bireysel profesyoneller",
    badge: "Popüler",
    highlighted: true,
    cta: { label: "Pro Al", href: "#" },
  },
  {
    id: "team",
    name: "Takım",
    price: <span>₺899<span className="text-sm font-normal text-foreground-muted">/ay</span></span>,
    description: "5 kişiye kadar",
    cta: { label: "Takım Al", href: "#" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Özel Fiyat",
    description: "Büyük organizasyonlar",
    cta: { label: "İletişim", href: "#" },
  },
];

const FEATURES: ComparisonFeature[] = [
  // Uncategorized
  { label: "Proje sayısı",    values: { free: "3",       pro: "Sınırsız",  team: "Sınırsız",  enterprise: "Sınırsız" } },
  { label: "Depolama",        values: { free: "1 GB",    pro: "50 GB",     team: "200 GB",    enterprise: "Özel" } },
  { label: "Ekip üyeleri",    values: { free: "1",       pro: "1",         team: "5",         enterprise: "Sınırsız" } },
  // Özellikler
  { label: "API erişimi",               category: "Özellikler", values: { free: false, pro: true,  team: true,  enterprise: true  } },
  { label: "Özel domain",               category: "Özellikler", values: { free: false, pro: true,  team: true,  enterprise: true  } },
  { label: "Gelişmiş analitik",         category: "Özellikler", values: { free: false, pro: true,  team: true,  enterprise: true  } },
  { label: "White-label",               category: "Özellikler", values: { free: false, pro: false, team: false, enterprise: true  } },
  { label: "SSO / SAML",                category: "Özellikler", values: { free: false, pro: false, team: false, enterprise: true  } },
  { label: "Audit log",                 category: "Özellikler", values: { free: false, pro: false, team: true,  enterprise: true  } },
  // Destek
  { label: "E-posta desteği",           category: "Destek", values: { free: false, pro: true,  team: true,  enterprise: true  } },
  { label: "Öncelikli destek",          category: "Destek", values: { free: false, pro: false, team: true,  enterprise: true  } },
  { label: "Dedicated hesap müdürü",    category: "Destek", values: { free: false, pro: false, team: false, enterprise: true  } },
  { label: "SLA garantisi",             category: "Destek", values: { free: false, pro: false, team: false, enterprise: true  } },
];

const SIMPLE_PLANS: ComparisonPlan[] = [
  { id: "starter", name: "Starter",  price: <span>$9<span className="text-sm font-normal text-foreground-muted">/mo</span></span>, cta: { label: "Dene", href: "#" } },
  { id: "growth",  name: "Growth",   price: <span>$29<span className="text-sm font-normal text-white/60">/mo</span></span>,  badge: "En İyi", highlighted: true, cta: { label: "Al", href: "#" } },
  { id: "scale",   name: "Scale",    price: <span>$79<span className="text-sm font-normal text-foreground-muted">/mo</span></span>, cta: { label: "Al", href: "#" } },
];

const SIMPLE_FEATURES: ComparisonFeature[] = [
  { label: "Kullanıcı",       values: { starter: "1",     growth: "5",       scale: "25" } },
  { label: "Bandwidth",       values: { starter: "10 GB", growth: "100 GB",  scale: "Sınırsız" } },
  { label: "SSL",             values: { starter: true,    growth: true,      scale: true  } },
  { label: "CDN",             values: { starter: false,   growth: true,      scale: true  } },
  { label: "Yedekleme",       values: { starter: false,   growth: "Haftalık", scale: "Günlük" } },
  { label: "7/24 Destek",     values: { starter: false,   growth: false,     scale: true  } },
];

export default function ComparisonTableShowcase() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Comparison Table</h1>
        <p className="text-foreground-muted">
          Ürün ve plan karşılaştırma tablosu. Boolean, string ve custom ReactNode değer desteği. 4 varyant.
        </p>
      </div>

      {/* Default */}
      <ShowcaseSection
        title="Default Varyant"
        description="Kategorili özellikler, highlighted plan, CTA butonlar."
        importLine={`import { ComparisonTable } from "@/components/ui/comparison-table";`}
        code={`<ComparisonTable plans={plans} features={features} variant="default" />`}
      >
        <ComparisonTable plans={PLANS} features={FEATURES} variant="default" />
      </ShowcaseSection>

      {/* Minimal */}
      <ShowcaseSection
        title="Minimal Varyant"
        description="Transparan header, daha sade görünüm."
        importLine={`import { ComparisonTable } from "@/components/ui/comparison-table";`}
        code={`<ComparisonTable plans={plans} features={features} variant="minimal" showPricing={false} />`}
      >
        <ComparisonTable plans={SIMPLE_PLANS} features={SIMPLE_FEATURES} variant="minimal" />
      </ShowcaseSection>

      {/* Colorful */}
      <ShowcaseSection
        title="Colorful Varyant"
        description="Highlighted kolon violet tonu, check ikonlar yeşil."
        importLine={`import { ComparisonTable } from "@/components/ui/comparison-table";`}
        code={`<ComparisonTable plans={plans} features={features} variant="colorful" />`}
      >
        <ComparisonTable plans={SIMPLE_PLANS} features={SIMPLE_FEATURES} variant="colorful" />
      </ShowcaseSection>

      {/* Dark */}
      <ShowcaseSection
        title="Dark Varyant"
        description="Her zaman koyu arka plan. Dark landing sayfaları için."
        importLine={`import { ComparisonTable } from "@/components/ui/comparison-table";`}
        code={`<ComparisonTable plans={plans} features={features} variant="dark" />`}
        previewClassName="bg-[#020617] rounded-[var(--radius-xl)]"
      >
        <ComparisonTable plans={PLANS} features={FEATURES} variant="dark" />
      </ShowcaseSection>

      {/* Props table */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">Props</h2>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-border">
          <table className="w-full text-sm text-left">
            <thead className="bg-background-muted border-b border-border">
              <tr>
                {["Prop", "Tip", "Varsayılan", "Açıklama"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["plans", "ComparisonPlan[]", "—", "Plan listesi (zorunlu)"],
                ["features", "ComparisonFeature[]", "—", "Özellik listesi (zorunlu)"],
                ["variant", '"default" | "minimal" | "colorful" | "dark"', '"default"', "Görsel tema"],
                ["showPricing", "boolean", "true", "Fiyat satırını göster"],
                ["stickyHeader", "boolean", "false", "Header sticky yap"],
                ["className", "string", "—", "Ek CSS sınıfı"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 font-mono text-primary text-xs">{prop}</td>
                  <td className="px-4 py-3 font-mono text-foreground-muted text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-foreground-subtle text-xs">{def}</td>
                  <td className="px-4 py-3 text-foreground-muted">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
