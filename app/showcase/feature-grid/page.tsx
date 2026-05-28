"use client";

import { FeatureGrid } from "@/components/ui/feature-grid";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Icons ──────────────────────────────────────────────────── */

function RocketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5V19a9 3 0 0 0 18 0V5"/>
      <path d="M3 12a9 3 0 0 0 18 0"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

/* ─── Feature data ────────────────────────────────────────────── */

const cardFeatures = [
  {
    icon: <RocketIcon />,
    title: "Hızlı Kurulum",
    description: "5 dakika içinde projenize entegre edin. Dokümantasyon ve örnek kodlarla başlangıç çok kolay.",
  },
  {
    icon: <ShieldIcon />,
    title: "Güvenli Altyapı",
    description: "SOC 2 Type II sertifikalı altyapı. Verileriniz uçtan uca şifrelenerek saklanır.",
  },
  {
    icon: <HeadphonesIcon />,
    title: "7/24 Destek",
    description: "Uzman destek ekibimiz her zaman yanınızda. Ortalama yanıt süresi 2 dakikadır.",
  },
  {
    icon: <DatabaseIcon />,
    title: "Otomatik Yedekleme",
    description: "Verileriniz günlük olarak yedeklenir. 30 günlük geçmişten istediğiniz noktaya dönebilirsiniz.",
  },
  {
    icon: <CodeIcon />,
    title: "API Entegrasyonu",
    description: "REST ve GraphQL API desteği. Webhook'lar ile mevcut iş akışlarınıza kolayca entegre olun.",
  },
  {
    icon: <BarChartIcon />,
    title: "Detaylı Analitik",
    description: "Gerçek zamanlı dashboard ve raporlar. İş kararlarınızı veriye dayalı alın.",
  },
];

const iconLeftFeatures = [
  {
    icon: <UsersIcon />,
    title: "Takım İşbirliği",
    description: "Ekip üyelerinizi davet edin, rol ve izin yönetimini kolayca yapın. Gerçek zamanlı işbirliği araçları.",
  },
  {
    icon: <PaletteIcon />,
    title: "Özel Temalar",
    description: "Marka kimliğinize uygun renk paleti, yazı tipi ve bileşen stillerini özelleştirin.",
  },
  {
    icon: <CloudIcon />,
    title: "Bulut Depolama",
    description: "Dosyalarınız güvenli bulut altyapısında saklanır. CDN desteği ile dünya genelinde hızlı erişim.",
  },
  {
    icon: <LockIcon />,
    title: "Gelişmiş Güvenlik",
    description: "İki faktörlü doğrulama, SSO ve IP kısıtlamaları ile hesabınızı güvende tutun.",
  },
];

const minimalFeatures = [
  { icon: <RocketIcon />, title: "Hızlı Kurulum", description: "5 dakika içinde kullanıma hazır." },
  { icon: <ShieldIcon />, title: "Güvenli Altyapı", description: "Uçtan uca şifreleme." },
  { icon: <HeadphonesIcon />, title: "7/24 Destek", description: "Her zaman yanınızdayız." },
  { icon: <DatabaseIcon />, title: "Otomatik Yedekleme", description: "Günlük otomatik yedek." },
  { icon: <CodeIcon />, title: "API Entegrasyonu", description: "REST ve GraphQL desteği." },
  { icon: <BarChartIcon />, title: "Detaylı Analitik", description: "Gerçek zamanlı raporlar." },
  { icon: <UsersIcon />, title: "Takım İşbirliği", description: "Rol tabanlı yetkilendirme." },
  { icon: <GlobeIcon />, title: "Çoklu Dil", description: "20+ dil desteği." },
];

const badgeFeatures = [
  {
    icon: <ZapIcon />,
    title: "Hızlı Kurulum",
    description: "5 dakika içinde projenize entegre edin.",
    badge: "Yeni",
  },
  {
    icon: <ShieldIcon />,
    title: "Güvenli Altyapı",
    description: "SOC 2 Type II sertifikalı, uçtan uca şifreleme.",
    badge: "Sertifikalı",
  },
  {
    icon: <CodeIcon />,
    title: "API Entegrasyonu",
    description: "REST, GraphQL ve webhook desteğiyle tam esneklik.",
    badge: "Beta",
  },
  {
    icon: <BarChartIcon />,
    title: "Detaylı Analitik",
    description: "Gerçek zamanlı dashboard ve özelleştirilebilir raporlar.",
  },
  {
    icon: <UsersIcon />,
    title: "Takım İşbirliği",
    description: "Ekip davet, rol yönetimi ve gerçek zamanlı düzenleme.",
  },
  {
    icon: <PaletteIcon />,
    title: "Özel Temalar",
    description: "Marka kimliğinize uygun tam özelleştirme imkânı.",
    badge: "Pro",
  },
];

/* ─── Page ────────────────────────────────────────────────────── */

export default function FeatureGridPage() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Feature Grid</h1>
        <p className="text-sm text-foreground-muted">
          Özellik listesi bileşeni. 3 varyant · 2/3/4 sütun · landing page için
        </p>
      </div>

      <ShowcaseSection title="Kart Varyant — 3 Sütun">
        <FeatureGrid features={cardFeatures} variant="card" columns={3} />
      </ShowcaseSection>

      <ShowcaseSection title="İkon Sol — 2 Sütun">
        <FeatureGrid features={iconLeftFeatures} variant="icon-left" columns={2} />
      </ShowcaseSection>

      <ShowcaseSection title="Minimal — 4 Sütun">
        <FeatureGrid features={minimalFeatures} variant="minimal" columns={4} />
      </ShowcaseSection>

      <ShowcaseSection title="Badge ile">
        <FeatureGrid features={badgeFeatures} variant="card" columns={3} />
      </ShowcaseSection>
    </div>
  );
}
