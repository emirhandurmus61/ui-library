"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
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

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const SERVICES = [
  {
    num: "01",
    name: "Marka Kimliği",
    desc: "Markanızın ruhunu yansıtan görsel diller, logolar ve kimlik sistemleri tasarlıyoruz.",
  },
  {
    num: "02",
    name: "Dijital Deneyim",
    desc: "Kullanıcıyı merkeze alan, dönüşüm odaklı web siteleri ve uygulamalar geliştiriyoruz.",
  },
  {
    num: "03",
    name: "Kreatif Kampanya",
    desc: "Hedef kitlenize ulaşan, akılda kalan dijital kampanyalar ve içerik stratejileri üretiyoruz.",
  },
  {
    num: "04",
    name: "Hareket Tasarımı",
    desc: "Markanıza hayat katan animasyonlar, motion grafik ve video içerikler üretiyoruz.",
  },
];

const WORKS = [
  {
    gradient: "from-violet-600 to-indigo-600",
    name: "Nova Rebrand",
    category: "Marka Kimliği",
    year: "2025",
  },
  {
    gradient: "from-rose-500 to-orange-500",
    name: "Pulse Digital",
    category: "Web Tasarım",
    year: "2025",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    name: "Echo Campaign",
    category: "Kreatif Kampanya",
    year: "2024",
  },
];

const STATS = [
  { value: "50+", label: "Proje" },
  { value: "8 Yıl", label: "Deneyim" },
  { value: "30+", label: "Mutlu Müşteri" },
  { value: "%100", label: "Memnuniyet" },
];

const TEAM = [
  { name: "Deniz Yılmaz", role: "Kurucu & Kreatif Direktör" },
  { name: "Selin Kaya", role: "Baş Tasarımcı" },
  { name: "Burak Arslan", role: "Geliştirici" },
  { name: "Nil Öztürk", role: "Proje Yöneticisi" },
];

const BRANDS = ["Turkcell", "Arçelik", "Logo", "Vestel", "Boyner", "Migros"];

const FOOTER_LINKS = {
  Hizmetler: ["Marka Kimliği", "Web Tasarım", "Kampanya", "Motion"],
  Şirket: ["Hakkımızda", "İşler", "Blog", "Kariyer"],
  İletişim: ["hello@studio.com", "+90 212 000 00 00", "İstanbul, TR"],
};

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Hizmetler", "İşler", "Hakkımızda", "Blog"];

  return (
    <nav className="sticky top-0 z-40 bg-gray-950 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">S</span>
          <span className="font-bold text-white tracking-tight">STUDIO</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            size="sm"
            stylePreset="gradient"
            rightIcon={<ArrowRightIcon />}
          >
            Proje Başlat
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menüyü aç/kapat"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-950 border-t border-white/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l} href="#" className="block text-sm text-white/60 hover:text-white py-1 transition-colors">{l}</a>
          ))}
          <div className="pt-2">
            <Button size="sm" stylePreset="gradient" className="w-full">Proje Başlat</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative bg-gray-950 overflow-hidden py-24 sm:py-32 lg:py-40 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto">
        <Badge variant="outline" className="mb-8 border-white/20 text-white/60 bg-white/5">
          ✦ Dijital Yaratıcılık Atölyesi
        </Badge>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6">
          Markanızı{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Geleceğe
          </span>{" "}
          <br className="hidden sm:block" />
          Taşıyoruz
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-xl mb-10 leading-relaxed">
          Stratejiden uygulamaya, tasarımdan kodlamaya — markanız için eksiksiz dijital çözümler üretiyoruz.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16">
          <Button size="xl" stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
            Proje Başlat
          </Button>
          <Button size="xl" variant="ghost" className="text-white/70 hover:text-white">
            İşlerimizi İncele
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-start gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">Aşağı kaydır</span>
          <ArrowDownIcon />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <Badge variant="secondary" className="mb-4">Hizmetlerimiz</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
            Ne Yapıyoruz?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SERVICES.map((s) => (
            <Card key={s.num} variant="bordered" stylePreset="glow" className="group relative overflow-hidden">
              <div className="flex items-start gap-5">
                <span className="text-5xl font-black text-gray-100 select-none leading-none shrink-0">{s.num}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-950 mb-2">{s.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                  <Button variant="link" size="sm" rightIcon={<ArrowRightIcon />} className="text-violet-600 hover:text-violet-700 p-0">
                    Daha Fazla
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div>
            <Badge variant="secondary" className="mb-4">Portföy</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">Seçilmiş İşler</h2>
          </div>
          <Button variant="outline" rightIcon={<ArrowRightIcon />}>Tümünü Gör</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORKS.map((w) => (
            <Card key={w.name} variant="interactive" stylePreset="default" className="group overflow-hidden p-0">
              {/* Image placeholder */}
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${w.gradient} overflow-hidden`}>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-950">
                    Projeyi İncele
                  </Button>
                </div>
              </div>
              {/* Card info */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-950">{w.name}</h3>
                    <p className="text-sm text-gray-500">{w.category}</p>
                  </div>
                  <span className="text-xs text-gray-400 font-mono">{w.year}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-gray-950 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl sm:text-5xl font-black text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Ekibimiz</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">Arkamızdaki İnsanlar</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col items-center text-center gap-3">
              <Avatar size="xl" name={member.name} />
              <div>
                <p className="font-bold text-gray-950 text-sm">{member.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Twitter">
                  <TwitterIcon />
                </button>
                <button className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="LinkedIn">
                  <LinkedInIcon />
                </button>
                <button className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Instagram">
                  <InstagramIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientLogosSection() {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-10">Güvenen Markalar</p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {BRANDS.map((b) => (
            <span key={b} className="text-gray-300 font-black text-xl sm:text-2xl tracking-tight hover:text-gray-500 transition-colors cursor-default select-none">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCtaSection() {
  return (
    <section className="bg-gray-950 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-white/40 text-sm uppercase tracking-widest mb-6">Bir Sonraki Adım</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
          Projenizi hayata{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            geçirelim
          </span>
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Fikrinizi bize anlatın, birlikte olağanüstü bir şey yaratalım.
        </p>
        <Button size="xl" stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
          Konuşalım
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">S</span>
              <span className="font-bold text-white tracking-tight">STUDIO</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Markaları geleceğe taşıyan dijital yaratıcılık atölyesi.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <p className="text-white font-semibold text-sm mb-4">{title}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">© 2026 STUDIO. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function AgencyLandingTemplate() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorksSection />
      <StatsSection />
      <TeamSection />
      <ClientLogosSection />
      <ContactCtaSection />
      <Footer />
    </div>
  );
}
