"use client";

import { Timeline } from "@/components/ui/timeline";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Icons ──────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <polyline points="2,8 6,12 14,4" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-full" aria-hidden="true">
      <path d="M8 1l1.85 3.74L14 5.5l-3 2.92.7 4.08L8 10.5l-3.7 1.94.7-4.08L2 5.5l4.15-.76L8 1z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <path d="M8 1.5C8 1.5 13 3 13 8.5c0 2-1 3-1 3H4s-1-1-1-3C3 3 8 1.5 8 1.5z" />
      <path d="M5.5 11.5l-2 3M10.5 11.5l2 3" />
      <circle cx="8" cy="7" r="1.5" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="size-full" aria-hidden="true">
      <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0V5zm.75 7a.875.875 0 100-1.75A.875.875 0 008 12z" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <path d="M2 8.5L7.5 3H14v6.5L8.5 15 2 8.5z" />
      <circle cx="11" cy="6" r="1" fill="currentColor" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const timelineItems = [
  {
    title: "Proje Başlatıldı",
    description: "Geliştirme ekibi kuruldu, teknik gereksinimler belirlendi.",
    date: "Ocak 2025",
    variant: "primary" as const,
  },
  {
    title: "Alpha Sürümü Yayınlandı",
    description: "İlk test sürümü kapalı beta kullanıcılarına açıldı.",
    date: "Şubat 2025",
    variant: "default" as const,
  },
  {
    title: "Kritik Hata Giderildi",
    description: "Veri kaybına yol açan authentication hatası düzeltildi.",
    date: "Mart 2025",
    variant: "danger" as const,
  },
  {
    title: "Beta Sürümü",
    description: "Genel kullanıcılara açıldı, yoğun geri bildirim alındı.",
    date: "Nisan 2025",
    variant: "warning" as const,
  },
  {
    title: "v1.0 Stabil Sürüm",
    description: "Tüm özellikler tamamlandı, production ortamına alındı.",
    date: "Mayıs 2025",
    variant: "success" as const,
  },
];

const iconItems = [
  {
    title: "Görev Tamamlandı",
    description: "Sprint hedefleri başarıyla tamamlandı.",
    date: "Ocak 2025",
    variant: "success" as const,
    icon: <CheckIcon />,
  },
  {
    title: "Proje Lansman",
    description: "Ürün canlıya alındı ve kullanıcılara açıldı.",
    date: "Şubat 2025",
    variant: "primary" as const,
    icon: <RocketIcon />,
  },
  {
    title: "Uyarı Alındı",
    description: "Performans metrikleri normal dışı seviyelerde.",
    date: "Mart 2025",
    variant: "warning" as const,
    icon: <AlertIcon />,
  },
  {
    title: "Yeni Özellik",
    description: "Dashboard modülü kullanıcılara sunuldu.",
    date: "Nisan 2025",
    variant: "default" as const,
    icon: <TagIcon />,
  },
  {
    title: "Başarı Ödülü",
    description: "Yılın en iyi SaaS ürünü ödülüne layık görüldü.",
    date: "Mayıs 2025",
    variant: "success" as const,
    icon: <StarIcon />,
  },
];

/* ─── Page ───────────────────────────────────────────────────── */

export default function TimelinePage() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Timeline</h1>
        <p className="text-sm text-foreground-muted">
          Dikey zaman çizelgesi. Sol hizalı + alternatif yerleşim · renkli varyantlar
        </p>
      </div>

      <ShowcaseSection title="Sol Hizalı" description="5 öğe, karma varyantlar">
        <Timeline items={timelineItems} variant="left" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Alternatif Yerleşim"
        description="Masaüstünde öğeler sağ-sol arasında dönüşümlü, mobilde sol hizalı"
      >
        <Timeline items={timelineItems} variant="alternate" />
      </ShowcaseSection>

      <ShowcaseSection title="İkon ile" description="Her öğede özel ikon node">
        <Timeline items={iconItems} variant="left" />
      </ShowcaseSection>
    </div>
  );
}
