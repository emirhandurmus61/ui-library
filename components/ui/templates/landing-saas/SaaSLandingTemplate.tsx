"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────────── */

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

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
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

function BarChartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 text-yellow-400" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */

const NAV_LINKS = ["Özellikler", "Fiyatlandırma", "Blog", "Hakkında"];

const LOGOS = ["Acme Corp", "Stellar Inc", "NovaTech", "BluePeak", "CloudBase", "Zenith IO"];

const FEATURES = [
  { icon: <ZapIcon />, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400", title: "Yıldırım Hızında", desc: "Sıfır gecikme ile anında sonuçlar alın. Altyapımız %99.9 uptime garantisiyle çalışır." },
  { icon: <ShieldIcon />, color: "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400", title: "Kurumsal Güvenlik", desc: "SOC 2 Type II sertifikalı. Verileriniz end-to-end şifrelenmiş şekilde saklanır." },
  { icon: <BarChartIcon />, color: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400", title: "Güçlü Analitik", desc: "Gerçek zamanlı dashboard ile ekibinizin performansını anlık takip edin." },
  { icon: <UsersIcon />, color: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400", title: "Ekip Yönetimi", desc: "Roller ve izinlerle ekibinizi kolayca yönetin. Davet linki ile saniyeler içinde ekleyin." },
  { icon: <LayersIcon />, color: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400", title: "Kolay Entegrasyon", desc: "100'den fazla araçla tek tıkla bağlanın. REST API ve webhook desteği hazır." },
  { icon: <RefreshIcon />, color: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400", title: "Otomatik Yedekleme", desc: "Verileriniz her gün otomatik olarak yedeklenir. Geri dönüş tek tık uzakta." },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Hesap Oluşturun", desc: "E-posta adresinizle 30 saniyede ücretsiz hesabınızı oluşturun. Kredi kartı gerekmez." },
  { step: "2", title: "Entegrasyon Yapın", desc: "Mevcut araçlarınızla bağlantı kurun. Hazır şablonlarla dakikalar içinde başlayın." },
  { step: "3", title: "Büyüyün", desc: "Ekibinizi davet edin, süreçleri otomatikleştirin ve veriye dayalı kararlar alın." },
];

const MONTHLY_PRICES = { starter: "Ücretsiz", pro: "₺299", enterprise: "Özel" };
const YEARLY_PRICES  = { starter: "Ücretsiz", pro: "₺239", enterprise: "Özel" };

const PLANS = [
  {
    key: "starter" as const,
    name: "Starter",
    period: "",
    desc: "Bireysel kullanıcılar için",
    features: ["5 proje", "1 GB depolama", "Topluluk desteği", "Temel analitik"],
    cta: "Ücretsiz Başla",
    highlight: false,
  },
  {
    key: "pro" as const,
    name: "Pro",
    period: "/ay",
    desc: "Büyüyen ekipler için",
    features: ["Sınırsız proje", "100 GB depolama", "Öncelikli destek", "Gelişmiş analitik", "API erişimi"],
    cta: "Pro'ya Geç",
    highlight: true,
  },
  {
    key: "enterprise" as const,
    name: "Enterprise",
    period: "",
    desc: "Kurumsal çözümler",
    features: ["Her şey dahil", "Sınırsız depolama", "7/24 dedicated destek", "SLA garantisi", "Özel entegrasyon"],
    cta: "Satışla İletişim",
    highlight: false,
  },
];

const TESTIMONIALS = [
  { name: "Ayşe K.", role: "CTO, TechCorp", text: "Geliştirme süremizi %60 azalttı. Artık rakiplerimizden çok daha hızlı ürün çıkarabiliyoruz." },
  { name: "Mehmet Y.", role: "Founder, StartupX", text: "Kurulum 5 dakika sürdü, entegrasyon sorunsuzdu. Ekibimiz kesinlikle tavsiye ediyor." },
  { name: "Zeynep A.", role: "PM, ScaleUp", text: "Analitik dashboard inanılmaz. Artık kararlarımızı tamamen veriye dayandırıyoruz." },
];

const FAQ_ITEMS = [
  { q: "Ücretsiz planda kredi kartı gerekiyor mu?", a: "Hayır, ücretsiz planı başlatmak için herhangi bir ödeme bilgisi girmenize gerek yok. İstediğiniz zaman yükseltebilirsiniz." },
  { q: "İstediğim zaman iptal edebilir miyim?", a: "Evet, aboneliğinizi dilediğiniz zaman iptal edebilirsiniz. İptal sonrasında mevcut dönem sonuna kadar planınızı kullanmaya devam edersiniz." },
  { q: "Verilerimi dışa aktarabilir miyim?", a: "Kesinlikle. Tüm verilerinizi CSV veya JSON formatında istediğiniz zaman dışa aktarabilirsiniz." },
  { q: "Kaç kullanıcı ekleyebilirim?", a: "Pro planında sınırsız kullanıcı ekleyebilirsiniz. Starter planında ise 3 üyeye kadar destek sunulmaktadır." },
  { q: "Teknik destek nasıl çalışıyor?", a: "Starter kullanıcıları topluluk forumu üzerinden destek alabilir. Pro ve Enterprise kullanıcıları öncelikli e-posta ve chat desteğine sahiptir." },
];

const FOOTER_LINKS = [
  { heading: "Ürün", links: ["Özellikler", "Fiyatlandırma", "Değişiklik Günlüğü", "Yol Haritası"] },
  { heading: "Şirket", links: ["Hakkımızda", "Blog", "Kariyer", "Basın"] },
  { heading: "Destek", links: ["Dokümantasyon", "API Referansı", "Topluluk", "İletişim"] },
];

/* ─── Sections ───────────────────────────────────────────────────── */

function SaaSNavbar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</span>
          <span className="font-bold text-foreground">SaaSify</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm">Giriş Yap</Button>
          <Button size="sm" stylePreset="gradient">Ücretsiz Başla</Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground py-1">
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            <Button variant="ghost" size="sm" className="justify-start">Giriş Yap</Button>
            <Button size="sm" stylePreset="gradient">Ücretsiz Başla</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="py-20 md:py-28 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <Badge variant="primary" className="mb-5">Yeni v3.0 Çıktı — Yenilikleri Keşfet</Badge>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-5">
          Ekibinizi{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            10x Daha Hızlı
          </span>{" "}
          Büyütün
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Modern ekipler için tasarlanmış all-in-one SaaS platformu. Geliştirin, dağıtın ve ölçeklendirin — tek bir araçla, minimum süreyle.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button size="xl" stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
            Ücretsiz Başla
          </Button>
          <Button size="xl" variant="outline">
            Demo İzle
          </Button>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <AvatarGroup
            size="sm"
            max={4}
            avatars={["Ayşe K.", "Mehmet Y.", "Fatma D.", "Ali Ç.", "Zeynep A.", "Burak T."].map((n) => ({ name: n }))}
          />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">1.000+</span> ekip güveniyor
          </p>
        </div>

        {/* Product screenshot */}
        <div className="relative aspect-[16/10] rounded-xl shadow-2xl border border-border bg-gradient-to-br from-violet-100 via-indigo-50 to-blue-100 dark:from-violet-950 dark:via-indigo-950 dark:to-blue-950 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-2xl px-8 space-y-3 opacity-60">
              <div className="h-4 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full w-3/4 mx-auto" />
              <div className="h-3 bg-indigo-300 dark:bg-indigo-700 rounded-full w-1/2 mx-auto" />
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-white/50 dark:bg-white/10 rounded-lg border border-white/60 dark:border-white/20" />
                ))}
              </div>
            </div>
          </div>
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoWall() {
  return (
    <section className="py-12 px-4 border-y border-border bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-7 uppercase tracking-widest font-medium">
          Bu markalar güveniyor
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-lg font-bold text-muted-foreground/50 hover:text-muted-foreground/70 transition-colors grayscale select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">Özellikler</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Neden bizi seçin?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Başarılı ekiplerin ihtiyaç duyduğu tüm araçlar tek bir platformda toplandı.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Card key={f.title} variant="ghost">
              <div className="flex flex-col gap-4">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">Nasıl Çalışır?</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">3 adımda başlayın</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Dakikalar içinde kurulum yapın, hemen değer elde etmeye başlayın.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-0">
          {HOW_IT_WORKS.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col items-center text-center flex-1 px-4">
              {/* Connector line */}
              {idx < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-border" />
              )}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mb-4 shrink-0 z-10">
                {step.step}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [yearly, setYearly] = useState<boolean>(false);
  const prices = yearly ? YEARLY_PRICES : MONTHLY_PRICES;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">Fiyatlandırma</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Şeffaf Fiyatlar</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-7">
            Gizli ücret yok. İstediğiniz zaman iptal edin.
          </p>
          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted rounded-full px-4 py-2">
            <span className={`text-sm font-medium ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>Aylık</span>
            <button
              role="switch"
              aria-checked={yearly}
              onClick={() => setYearly((v) => !v)}
              className={`relative inline-flex w-11 h-6 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${yearly ? "bg-violet-600" : "bg-muted-foreground/30"}`}
            >
              <span className={`inline-block w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${yearly ? "translate-x-5 ml-0.5" : "translate-x-0.5"}`} />
            </button>
            <span className={`text-sm font-medium ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yıllık
            </span>
            {yearly && <Badge variant="success" size="sm">%20 İndirim</Badge>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.name} className="relative">
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="primary">Popüler</Badge>
                </div>
              )}
              <Card
                variant={plan.highlight ? "interactive" : "bordered"}
                stylePreset={plan.highlight ? "gradient-border" : "default"}
                className={plan.highlight ? "pt-6" : ""}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{prices[plan.key]}</span>
                  {plan.key === "pro" && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-green-500 shrink-0"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.highlight ? "primary" : plan.key === "enterprise" ? "outline" : "outline"}
                  stylePreset={plan.highlight ? "gradient" : "default"}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-3">Müşteri Yorumları</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Onlar ne diyor?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Binlerce ekip her gün SaaSify ile daha verimli çalışıyor.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} variant="elevated">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">SSS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <p className="text-muted-foreground">Aklınızdaki soruların cevabını burada bulun.</p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border border-border rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left bg-background hover:bg-muted/50 transition-colors"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
              >
                <span className="font-medium text-foreground text-sm pr-4">{item.q}</span>
                <span className={`shrink-0 text-muted-foreground transition-transform duration-200 ${openIdx === idx ? "rotate-180" : ""}`}>
                  <ChevronDownIcon />
                </span>
              </button>
              {openIdx === idx && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed bg-background">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Bugün başlamaya hazır mısınız?
          </h2>
          <p className="text-violet-100 max-w-lg mx-auto mb-8 leading-relaxed">
            14 gün ücretsiz deneyin. Kredi kartı gerekmez. İstediğiniz zaman iptal edin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" variant="secondary" className="bg-white text-violet-700 hover:bg-violet-50">
              Ücretsiz Başla
            </Button>
            <Button size="lg" variant="ghost" className="text-white border-white/40 hover:bg-white/10">
              Demo İste
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SaaSFooter() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</span>
              <span className="font-bold text-foreground">SaaSify</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Modern ekipler için tasarlanmış all-in-one platform.
            </p>
            <div className="flex items-center gap-3">
              <GlobeIcon />
              <span className="text-sm text-muted-foreground">Dünya genelinde hizmet</span>
            </div>
          </div>
          {/* Link groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h4 className="font-semibold text-foreground text-sm mb-4">{group.heading}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 SaaSify. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-5">
            {["Gizlilik", "Kullanım Koşulları", "Çerezler"].map((l) => (
              <a key={l} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */

export function SaaSLandingTemplate() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SaaSNavbar />
      <main>
        <HeroSection />
        <LogoWall />
        <FeaturesGrid />
        <HowItWorks />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTABanner />
      </main>
      <SaaSFooter />
    </div>
  );
}
