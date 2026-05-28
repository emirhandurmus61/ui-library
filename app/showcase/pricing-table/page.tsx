"use client";

import { PricingTable } from "@/components/ui/pricing-table";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── 3-plan data ─────────────────────────────────────────────── */

const threePlans = [
  {
    name: "Ücretsiz",
    price: "₺0",
    period: "/ay",
    description: "Bireysel projeler için",
    highlighted: false,
    ctaLabel: "Ücretsiz Başla",
    ctaHref: "#",
  },
  {
    name: "Pro",
    price: "₺299",
    period: "/ay",
    description: "Büyüyen ekipler için",
    highlighted: true,
    ctaLabel: "Pro'ya Geç",
    ctaHref: "#",
  },
  {
    name: "Kurumsal",
    price: "₺999",
    period: "/ay",
    description: "Ölçekli organizasyonlar için",
    highlighted: false,
    ctaLabel: "Satışla İletişime Geç",
    ctaHref: "#",
  },
];

const threeFeatures = [
  { label: "Kullanıcı sayısı", plans: ["1 kullanıcı", "10 kullanıcı", "Sınırsız"] },
  { label: "Depolama", plans: ["5 GB", "100 GB", "1 TB"] },
  { label: "API erişimi", plans: [false, true, true] },
  { label: "Öncelikli destek", plans: [false, true, true] },
  { label: "Özel domain", plans: [false, false, true] },
  { label: "Analitik", plans: [false, true, true] },
  { label: "SSO", plans: [false, false, true] },
  { label: "SLA garantisi", plans: [false, false, true] },
];

/* ─── 2-plan data ─────────────────────────────────────────────── */

const twoPlans = [
  {
    name: "Başlangıç",
    price: "₺149",
    period: "/ay",
    description: "Küçük ekipler için",
    highlighted: false,
    ctaLabel: "Başla",
    ctaHref: "#",
  },
  {
    name: "İşletme",
    price: "₺599",
    period: "/ay",
    description: "Profesyonel kullanım için",
    highlighted: true,
    ctaLabel: "İşletme'ye Geç",
    ctaHref: "#",
  },
];

const twoFeatures = [
  { label: "Kullanıcı sayısı", plans: ["5 kullanıcı", "Sınırsız"] },
  { label: "Depolama", plans: ["20 GB", "500 GB"] },
  { label: "API erişimi", plans: [false, true] },
  { label: "Öncelikli destek", plans: [false, true] },
  { label: "Özel domain", plans: [false, true] },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function PricingTablePage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Pricing Table</h1>
        <p className="text-sm text-foreground-muted">
          Feature karşılaştırma tablosu. Sticky başlık · öne çıkan plan · mobilde yatay kaydırma
        </p>
      </div>

      <ShowcaseSection title="3 Planlı Karşılaştırma">
        <PricingTable plans={threePlans} features={threeFeatures} />
      </ShowcaseSection>

      <ShowcaseSection title="2 Planlı">
        <PricingTable plans={twoPlans} features={twoFeatures} />
      </ShowcaseSection>
    </div>
  );
}
