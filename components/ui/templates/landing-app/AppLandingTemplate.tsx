"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function AppleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
      <path d="M3.18 23.76c.35.2.74.24 1.1.1l12.44-7.18-2.69-2.69zm15.7-9.07L16.4 13l-2.93 2.93 2.93 2.93 2.52-1.46a1.5 1.5 0 0 0 0-2.71zm-15.7-8.45L13.03 13l2.69-2.69L3.28.17c-.36-.15-.75-.1-1.1.1A1.5 1.5 0 0 0 1.5 1.5v21a1.5 1.5 0 0 0 .68 1.26zM14.47 13l-11.3-11.3 2.7 15.45z" />
    </svg>
  );
}

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" className="size-4" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden="true">
      <path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
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
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const FEATURES: { icon: React.ReactNode; color: string; title: string; desc: string }[] = [
  {
    icon: <BoltIcon />,
    color: "bg-amber-100 text-amber-600",
    title: "Yıldırım Hızı",
    desc: "Uygulamamız saniyeler içinde yüklenir. Düşük bant genişliğinde bile sorunsuz çalışır.",
  },
  {
    icon: <ShieldCheckIcon />,
    color: "bg-emerald-100 text-emerald-600",
    title: "Banka Düzeyinde Güvenlik",
    desc: "256-bit şifreleme ve iki faktörlü kimlik doğrulama ile verileriniz her zaman güvende.",
  },
  {
    icon: <SyncIcon />,
    color: "bg-sky-100 text-sky-600",
    title: "Gerçek Zamanlı Senkronizasyon",
    desc: "Tüm cihazlarınızda anında senkronize olun. İnternet olmasa da çevrimdışı çalışmaya devam edin.",
  },
];

const STATS = [
  { value: "10K+", label: "İndirme" },
  { value: "4.9", label: "Puan" },
  { value: "150+", label: "Ülke" },
  { value: "%98", label: "Memnuniyet" },
];

const REVIEWS: { stars: number; comment: string; username: string; date: string }[] = [
  {
    stars: 5,
    comment: "Hayatımı kolaylaştıran en iyi uygulama. Her gün kullanıyorum ve tek bir sorun yaşamadım.",
    username: "ahmet_y",
    date: "15 May 2026",
  },
  {
    stars: 5,
    comment: "Arayüz mükemmel, sezgisel ve şık. Rakiplerine kıyasla çok daha hızlı ve güvenilir.",
    username: "selin.k",
    date: "10 May 2026",
  },
  {
    stars: 5,
    comment: "İlk denedikten sonra sildim, geri yükledim. Vazgeçemedim. Kesinlikle tavsiye ederim!",
    username: "burak_dev",
    date: "3 May 2026",
  },
];

const SCREENSHOT_GRADIENTS = [
  "from-violet-500 to-indigo-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-teal-500 to-emerald-600",
  "from-sky-500 to-blue-600",
];

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">F</span>
          <span className="font-bold text-gray-900 tracking-tight">Flowly</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {["Özellikler", "Fiyat", "Blog"].map((l) => (
            <a key={l} href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">{l}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex gap-1.5 text-gray-700">
            <AppleIcon />
            App Store
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5">
            <GooglePlayIcon />
            Play Store
          </Button>
          <Button size="sm" stylePreset="gradient">
            Ücretsiz Dene
          </Button>
          <button className="md:hidden text-gray-500" aria-label="Menü">
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left */}
          <div>
            <Badge variant="primary" className="mb-6">
              ✨ Uygulama Mağazası #1 Üretkenlik Uygulaması
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight mb-5">
              Akışını Bul,{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Daha Fazlasını
              </span>{" "}
              Üret
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              Flowly, günlük görevlerinizi, alışkanlıklarınızı ve hedeflerinizi tek bir zarif uygulamada birleştirir. Odaklanın, ilerlemenizi takip edin ve her gün biraz daha iyi olun.
            </p>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white gap-2.5">
                <AppleIcon />
                <span>
                  <span className="block text-xs opacity-70 leading-tight">İndir</span>
                  <span className="font-bold leading-tight">App Store</span>
                </span>
              </Button>
              <Button size="lg" variant="outline" className="gap-2.5">
                <GooglePlayIcon />
                <span>
                  <span className="block text-xs text-gray-500 leading-tight">İndir</span>
                  <span className="font-bold leading-tight">Google Play</span>
                </span>
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
              </div>
              <span className="text-sm font-bold text-gray-900">4.9</span>
              <span className="text-sm text-gray-400">· 10K+ yorum</span>
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 scale-110 bg-gradient-to-br from-violet-400/30 to-indigo-400/30 rounded-[3rem] blur-2xl" aria-hidden="true" />

              {/* Phone */}
              <div className="relative w-64 h-[520px] bg-gray-900 rounded-[3rem] border-4 border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-full" />

                {/* Screen content placeholder */}
                <div className="absolute inset-0 pt-14 px-4 pb-4 flex flex-col gap-3">
                  <div className="h-8 bg-white/10 rounded-lg" />
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <div className="bg-violet-500/30 rounded-2xl" />
                    <div className="bg-indigo-500/30 rounded-2xl" />
                    <div className="col-span-2 bg-white/5 rounded-2xl flex-1" />
                    <div className="bg-white/5 rounded-2xl" />
                    <div className="bg-white/5 rounded-2xl" />
                  </div>
                  <div className="h-12 bg-white/10 rounded-2xl" />
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Özellikler</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
            Neden Flowly?
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            Milyonlarca kullanıcının tercih ettiği özellikler, tek bir uygulamada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <Card key={f.title} variant="elevated" stylePreset="default">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScreenshotsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-8">
          Ekran Görüntüleri
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
          {SCREENSHOT_GRADIENTS.map((g, i) => (
            <div
              key={i}
              className={`shrink-0 w-48 h-80 rounded-2xl bg-gradient-to-b ${g} shadow-lg`}
              aria-label={`Ekran görüntüsü ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-14 px-4 bg-gradient-to-br from-violet-600 to-indigo-700">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Değerlendirmeler</Badge>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Kullanıcılar Ne Diyor?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <Card key={i} variant="basic" stylePreset="default">
              <div className="flex text-amber-400 mb-3">
                {Array.from({ length: r.stars }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">&ldquo;{r.comment}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar size="sm" name={r.username} />
                  <span className="text-xs font-medium text-gray-700">@{r.username}</span>
                </div>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function DownloadCtaSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
          Hemen İndir
        </h2>
        <p className="text-white/70 mb-10 text-lg leading-relaxed">
          iOS ve Android için ücretsiz. Kredi kartı gerekmez.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 gap-2.5 w-full sm:w-auto">
            <AppleIcon />
            <span>
              <span className="block text-xs text-gray-500 leading-tight">App Store&apos;dan İndir</span>
              <span className="font-bold leading-tight">iPhone &amp; iPad</span>
            </span>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2.5 w-full sm:w-auto">
            <GooglePlayIcon />
            <span>
              <span className="block text-xs text-white/60 leading-tight">Google Play&apos;den İndir</span>
              <span className="font-bold leading-tight">Android</span>
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">F</span>
          <span className="font-bold text-white">Flowly</span>
        </div>
        <p className="text-xs text-gray-500">© 2026 Flowly Inc. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-4">
          {["Gizlilik", "Şartlar", "İletişim"].map((l) => (
            <a key={l} href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function AppLandingTemplate() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <StatsSection />
      <ReviewsSection />
      <DownloadCtaSection />
      <Footer />
    </div>
  );
}
