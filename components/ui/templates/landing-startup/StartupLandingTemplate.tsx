"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

/* ─── Icons ──────────────────────────────────────────────────────── */

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-yellow-400" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */

const STATS = [
  { value: "10K+", label: "Kullanıcı" },
  { value: "%99.9", label: "Uptime" },
  { value: "150+", label: "Entegrasyon" },
  { value: "<50ms", label: "Gecikme" },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "Anında Çalışır",
    desc: "Kurulum yok, yapılandırma yok. Bağlan ve saniyeler içinde üretmeye başla. Altyapıyı bize bırak.",
  },
  {
    icon: "🔒",
    title: "Kurumsal Güvenlik",
    desc: "SOC 2 Type II, GDPR uyumlu. End-to-end şifreleme ve rol bazlı erişim kontrolü standart gelir.",
  },
  {
    icon: "🚀",
    title: "Sınırsız Ölçek",
    desc: "Startup'tan enterprise'a sorunsuz büyü. Otomatik ölçekleme ile hiçbir zaman yavaşlamazsın.",
  },
];

const TESTIMONIALS_ROW_1 = [
  { name: "Burak T.", quote: "Production'a geçmemiz 2 haftadan 2 güne indi.", stars: 5 },
  { name: "Selin A.", quote: "API entegrasyonu inanılmaz kolaydı.", stars: 5 },
  { name: "Emre K.", quote: "Rakip ürünlerin 1/3 fiyatına 3x performans.", stars: 5 },
  { name: "Ayşe M.", quote: "Dokümantasyonu mükemmel, sıfır sorunla entegre ettik.", stars: 5 },
  { name: "Can D.", quote: "Destek ekibi her zaman cevap veriyor.", stars: 5 },
];

const TESTIMONIALS_ROW_2 = [
  { name: "Fatma Y.", quote: "Dashboard'u görünce rakibimizi hemen bıraktık.", stars: 5 },
  { name: "Oğuz B.", quote: "Startup için en iyi yatırım kararımız oldu.", stars: 5 },
  { name: "Elif S.", quote: "Onboarding süreci çok akıcı, 10/10.", stars: 5 },
  { name: "Murat Ç.", quote: "Webhook desteği tam ihtiyacımıza göre.", stars: 5 },
  { name: "Hande K.", quote: "Ekibim artık deployment korkusu yaşamıyor.", stars: 5 },
];

const FREE_FEATURES = ["3 proje", "1 GB depolama", "Topluluk desteği", "Temel analitik"];
const PRO_FEATURES  = ["Sınırsız proje", "100 GB depolama", "Öncelikli destek", "Gelişmiş analitik", "API erişimi", "Özel domain"];

/* ─── Sections ───────────────────────────────────────────────────── */

function StartupNavbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">L</span>
          <span className="font-bold text-white">LaunchFast</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
            Giriş Yap
          </Button>
          <Button size="sm" stylePreset="soft">
            Erken Erişim
          </Button>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4 py-24 overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <Badge variant="success" className="mb-6 text-sm">Yeni</Badge>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          Daha Hızlı{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Gönder.
          </span>
          <br />
          Daha Az Bekle.
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Geliştirici araçlarında yeni nesil deneyim. Takımınızın süreçlerini otomatikleştirin ve sıfır sürtüşmeyle üretim ortamına çıkın.
        </p>

        {/* Email waitlist form */}
        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl px-6 py-4 text-sm font-medium">
            <CheckIcon /> Listeye eklendiniz! Yakında haber vereceğiz.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-5">
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition-all"
            />
            <Button type="submit" size="md" stylePreset="gradient" rightIcon={<ArrowRightIcon />} className="w-full sm:w-auto shrink-0">
              Listeye Katıl
            </Button>
          </form>
        )}

        <p className="text-sm text-white/40">
          500+ geliştirici bekleme listesinde. Spam yok, sadece haberler.
        </p>
      </div>
    </section>
  );
}

function StatsRow() {
  return (
    <section className="bg-gray-900 border-y border-white/10 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-3 border-white/20 text-gray-300">Özellikler</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Her şey düşünüldü</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Geliştirici deneyimini en önde tutarak tasarlanmış araçlar.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <Card key={f.title} variant="bordered" stylePreset="glow">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <section className="py-20 px-4 bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Geliştiriciler seviyor</h2>
          <p className="text-gray-400">Topluluğumuzdan gerçek yorumlar.</p>
        </div>

        {/* Row 1 — scroll right */}
        <div className="overflow-hidden mb-4">
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee-left 28s linear infinite" }}
          >
            {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((t, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-800 border border-white/10 rounded-full px-4 py-2.5 shrink-0"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <span className="text-sm text-gray-300 font-medium">{t.name}</span>
                <span className="text-gray-500">·</span>
                <span className="text-sm text-gray-400">{t.quote}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scroll left (reverse) */}
        <div className="overflow-hidden">
          <div
            className="flex gap-4 w-max"
            style={{ animation: "marquee-right 34s linear infinite" }}
          >
            {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((t, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-800 border border-white/10 rounded-full px-4 py-2.5 shrink-0"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.stars }).map((_, i) => <StarIcon key={i} />)}
                </div>
                <span className="text-sm text-gray-300 font-medium">{t.name}</span>
                <span className="text-gray-500">·</span>
                <span className="text-sm text-gray-400">{t.quote}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframes */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="py-20 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-3 border-white/20 text-gray-300">Fiyatlandırma</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Basit, Şeffaf</h2>
          <p className="text-gray-400 max-w-md mx-auto">Büyüdükçe öde. Gizli ücret yok.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-gray-900 p-7">
            <h3 className="text-lg font-bold text-white mb-1">Ücretsiz</h3>
            <p className="text-sm text-gray-400 mb-5">Başlamak için ideal</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">₺0</span>
              <span className="text-sm text-gray-400">/ay</span>
            </div>
            <ul className="space-y-3 mb-7">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="text-emerald-500"><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Ücretsiz Başla
            </Button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 to-gray-900 p-7 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge variant="success" size="sm">Önerilen</Badge>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
            <p className="text-sm text-gray-400 mb-5">Büyüyen ekipler için</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">₺299</span>
              <span className="text-sm text-gray-400">/ay</span>
            </div>
            <ul className="space-y-3 mb-7">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-emerald-400"><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
            <Button stylePreset="gradient" className="w-full">
              Pro&apos;ya Geç
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-emerald-950 via-teal-950 to-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent pointer-events-none" />
      <div className="relative max-w-2xl mx-auto text-center z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Hemen katıl.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Ücretsiz başla.
          </span>
        </h2>
        <p className="text-white/60 text-lg mb-10 leading-relaxed">
          14 gün ücretsiz dene. Kredi kartı gerekmez. İptal her an mümkün.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl px-6 py-4 text-sm font-medium">
            <CheckIcon /> Harika! Sizi listeye ekledik, yakında haber vereceğiz.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 transition-all"
            />
            <Button type="submit" size="md" stylePreset="gradient" rightIcon={<ArrowRightIcon />} className="w-full sm:w-auto shrink-0">
              Başla
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function StartupFooter() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs">L</span>
          <span className="text-sm font-semibold text-gray-400">LaunchFast</span>
        </div>
        <p className="text-xs text-gray-600">© 2026 LaunchFast. Tüm hakları saklıdır.</p>
        <div className="flex items-center gap-5">
          {["Gizlilik", "Koşullar", "İletişim"].map((l) => (
            <a key={l} href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Export ────────────────────────────────────────────────── */

export function StartupLandingTemplate() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <StartupNavbar />
      <main>
        <HeroSection />
        <StatsRow />
        <FeaturesSection />
        <SocialProofSection />
        <PricingTeaser />
        <CTASection />
      </main>
      <StartupFooter />
    </div>
  );
}
