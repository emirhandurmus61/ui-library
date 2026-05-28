"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PuzzleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02z" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const FEATURES = [
  {
    icon: <ZapIcon />,
    color: "bg-warning-subtle text-warning",
    title: "Yıldırım Hızında",
    desc: "Sıfır gecikme ile anında sonuçlar alın. Altyapımız %99.9 uptime garantisiyle çalışır.",
  },
  {
    icon: <ShieldIcon />,
    color: "bg-success-subtle text-success",
    title: "Kurumsal Güvenlik",
    desc: "SOC 2 Type II sertifikalı. Verileriniz end-to-end şifrelenmiş şekilde saklanır.",
  },
  {
    icon: <PuzzleIcon />,
    color: "bg-primary-subtle text-primary",
    title: "Kolay Entegrasyon",
    desc: "100'den fazla araçla tek tıkla bağlanın. REST API ve webhook desteği hazır.",
  },
  {
    icon: <BarChartIcon />,
    color: "bg-info-subtle text-info",
    title: "Güçlü Analitik",
    desc: "Gerçek zamanlı dashboard ile ekibinizin performansını anlık takip edin.",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "Ücretsiz",
    period: "",
    desc: "Bireysel kullanıcılar için",
    features: ["5 proje", "1 GB depolama", "Topluluk desteği", "Temel analitik"],
    cta: "Ücretsiz Başla",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₺299",
    period: "/ay",
    desc: "Büyüyen ekipler için",
    features: ["Sınırsız proje", "100 GB depolama", "Öncelikli destek", "Gelişmiş analitik", "API erişimi"],
    cta: "Pro'ya Geç",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Özel",
    period: "",
    desc: "Kurumsal çözümler",
    features: ["Her şey dahil", "Sınırsız depolama", "7/24 dedicated destek", "SLA garantisi", "Özel entegrasyon"],
    cta: "Satışla İletişim",
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: "Ayşe K.", role: "CTO, TechCorp",    text: "Geliştirme süremizi %60 azalttı. Artık rakiplerimizden çok daha hızlı ürün çıkarabiliyoruz." },
  { name: "Mehmet Y.", role: "Founder, StartupX", text: "Kurulum 5 dakika sürdü, entegrasyon sorunsuzdu. Ekip kesinlikle tavsiye ediyor." },
  { name: "Zeynep A.", role: "PM, ScaleUp",      text: "Analitik dashboard inanılmaz. Artık kararlarımızı veriye dayandırıyoruz." },
];

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  return (
    <nav className="sticky top-0 z-30 h-14 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-[var(--radius-lg)] bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">L</span>
          <span className="font-semibold text-sm text-foreground">LaunchKit</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {["Özellikler", "Fiyatlandırma", "Hakkında"].map((l) => (
            <a key={l} href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">Giriş Yap</Button>
          <Button size="sm">Ücretsiz Başla</Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="py-20 md:py-28 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <Badge variant="primary" className="mb-5">
          🚀 v2.0 Çıktı — Yenilikler →
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
          Ürününüzü{" "}
          <span className="text-primary">10x Hızlı</span>{" "}
          İnşa Edin
        </h1>
        <p className="text-lg text-foreground-muted max-w-xl mx-auto mb-8 leading-relaxed">
          Modern ekipler için tasarlanmış all-in-one platform. Geliştirin, dağıtın ve büyütün — tek bir araçla.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button size="lg" rightIcon={<ArrowRightIcon />}>Ücretsiz Dene</Button>
          <Button size="lg" variant="outline">Demo İzle</Button>
        </div>
        <div className="flex items-center justify-center gap-3">
          <AvatarGroup
            size="sm"
            max={4}
            avatars={["Ayşe K.", "Mehmet Y.", "Fatma D.", "Ali Ç.", "Zeynep A."].map((n) => ({ name: n }))}
          />
          <p className="text-sm text-foreground-muted">
            <span className="font-semibold text-foreground">12.000+</span> ekip güveniyor
          </p>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Özellikler</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Her İhtiyacınız Karşılandı</h2>
          <p className="text-foreground-muted max-w-lg mx-auto">Başarılı ekiplerin ihtiyaç duyduğu her şey, tek bir platformda.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {FEATURES.map((f) => (
            <Card key={f.title} variant="elevated">
              <div className="flex items-start gap-4">
                <span className={`w-10 h-10 rounded-[var(--radius-lg)] flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-foreground-muted leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Fiyatlandırma</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Şeffaf Fiyatlar</h2>
          <p className="text-foreground-muted">Gizli ücret yok. İstediğiniz zaman iptal edin.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              variant={plan.highlight ? "elevated" : "basic"}
              className={plan.highlight ? "ring-2 ring-primary relative" : ""}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary">Popüler</Badge>
                </div>
              )}
              <div className="mb-4">
                <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                <p className="text-xs text-foreground-muted mt-0.5">{plan.desc}</p>
              </div>
              <div className="mb-5">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-sm text-foreground-muted">{plan.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground-muted">
                    <span className="text-success shrink-0"><CheckIcon /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlight ? "primary" : "outline"} className="w-full">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-background-subtle">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Referanslar</Badge>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ekipler Ne Diyor?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} variant="basic">
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar size="sm" name={t.name} />
                <div>
                  <p className="text-xs font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground-subtle">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Bugün Başlayın</h2>
        <p className="text-foreground-muted mb-8">Kredi kartı gerektirmez. 14 gün ücretsiz Pro deneme.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" rightIcon={<ArrowRightIcon />}>Ücretsiz Dene</Button>
          <Button size="lg" variant="outline">Satışla Konuş</Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-[var(--radius-md)] bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">L</span>
          <span className="text-sm font-semibold text-foreground">LaunchKit</span>
        </div>
        <p className="text-xs text-foreground-subtle">© 2026 LaunchKit. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-4">
          {["Gizlilik", "Şartlar", "İletişim"].map((l) => (
            <a key={l} href="#" className="text-xs text-foreground-subtle hover:text-foreground transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function LandingTemplate() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
