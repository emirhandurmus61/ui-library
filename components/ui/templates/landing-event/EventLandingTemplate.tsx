"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

/* ─── Icons ──────────────────────────────────────────────────── */

function MapPinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
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

function ArrowRightIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0" aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
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

/* ─── Data ───────────────────────────────────────────────────── */

const SPEAKERS: { name: string; title: string; company: string; topic: string }[] = [
  { name: "Emre Demir", title: "VP of Engineering", company: "TechScale", topic: "Büyük Ölçekte Mimari" },
  { name: "Ayşe Koç", title: "Head of Product", company: "ProductLab", topic: "Ürün Stratejisi" },
  { name: "Mert Şahin", title: "AI Research Lead", company: "DeepMind TR", topic: "Yapay Zeka & LLM" },
  { name: "Zeynep Arslan", title: "CTO", company: "CloudNative", topic: "DevOps & Platform" },
  { name: "Can Yıldız", title: "Design Director", company: "Figma EMEA", topic: "Tasarım Sistemleri" },
  { name: "Defne Öz", title: "Founder", company: "GrowthHQ", topic: "Büyüme & GTM" },
];

const SCHEDULE: Record<string, { time: string; title: string; speaker: string; track: string; trackColor: string }[]> = {
  "Gün 1 — 14 Eyl": [
    { time: "09:00", title: "Açılış Konuşması", speaker: "Emre Demir", track: "Keynote", trackColor: "bg-violet-100 text-violet-700" },
    { time: "10:30", title: "Büyük Ölçekte Dağıtık Sistemler", speaker: "Zeynep Arslan", track: "Mimari", trackColor: "bg-sky-100 text-sky-700" },
    { time: "12:00", title: "Öğle Arası & Networking", speaker: "—", track: "Break", trackColor: "bg-gray-100 text-gray-600" },
    { time: "13:30", title: "LLM Destekli Ürün Geliştirme", speaker: "Mert Şahin", track: "AI & Ürün", trackColor: "bg-amber-100 text-amber-700" },
    { time: "15:00", title: "Tasarım Sistemleri ile Ölçeklenme", speaker: "Can Yıldız", track: "Tasarım", trackColor: "bg-rose-100 text-rose-700" },
  ],
  "Gün 2 — 15 Eyl": [
    { time: "09:30", title: "Ürün-Led Growth Stratejileri", speaker: "Defne Öz", track: "Büyüme", trackColor: "bg-emerald-100 text-emerald-700" },
    { time: "11:00", title: "Platform Engineering Best Practices", speaker: "Zeynep Arslan", track: "DevOps", trackColor: "bg-sky-100 text-sky-700" },
    { time: "12:30", title: "Öğle Arası & Sponsor Stantları", speaker: "—", track: "Break", trackColor: "bg-gray-100 text-gray-600" },
    { time: "14:00", title: "Startup'tan Scale-up'a Geçiş", speaker: "Ayşe Koç", track: "Ürün", trackColor: "bg-violet-100 text-violet-700" },
    { time: "16:00", title: "Kapanış & Ödül Töreni", speaker: "Tüm Konuşmacılar", track: "Keynote", trackColor: "bg-violet-100 text-violet-700" },
  ],
};

const TICKETS: { name: string; price: string; originalPrice?: string; desc: string; perks: string[]; highlight: boolean }[] = [
  {
    name: "Early Bird",
    price: "₺499",
    originalPrice: "₺799",
    desc: "Sınırlı erken kayıt fırsatı",
    perks: ["2 günlük erişim", "Öğle yemeği dahil", "Etkinlik çantası", "Dijital içerikler"],
    highlight: false,
  },
  {
    name: "Standart",
    price: "₺799",
    desc: "En popüler bilet türü",
    perks: ["2 günlük erişim", "Öğle yemeği dahil", "Etkinlik çantası", "Dijital içerikler", "Workshop erişimi"],
    highlight: true,
  },
  {
    name: "VIP",
    price: "₺1,499",
    desc: "Premium deneyim",
    perks: ["2 günlük VIP erişim", "VIP akşam yemeği", "Konuşmacılarla buluşma", "Dijital içerikler", "Tüm workshoplar", "Özel lounge"],
    highlight: false,
  },
];

const SPONSORS: Record<string, string[]> = {
  "Altın": ["TechScale", "CloudNative", "DeepMind TR"],
  "Gümüş": ["ProductLab", "GrowthHQ", "DevOps Hub"],
  "Bronz": ["CodeCraft", "UIForge", "DataStream", "BuildFast"],
};

/* ─── Helpers ─────────────────────────────────────────────────── */

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[72px] sm:min-w-[88px]">
        <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">{value}</span>
      </div>
      <span className="text-xs text-white/50 mt-2 uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─── Sections ───────────────────────────────────────────────── */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = ["Konuşmacılar", "Program", "Biletler", "İletişim"];

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">T</span>
          <span className="font-bold text-white tracking-tight">TechConf <span className="text-white/40 font-normal">&apos;26</span></span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Button size="sm" stylePreset="gradient" rightIcon={<TicketIcon />} className="hidden sm:inline-flex">
            Bilet Al
          </Button>
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menüyü aç"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-950 border-t border-white/10 px-4 py-4 space-y-2">
          {links.map((l) => (
            <a key={l} href="#" className="block text-sm text-white/60 hover:text-white py-1.5 transition-colors">{l}</a>
          ))}
          <div className="pt-2">
            <Button size="sm" stylePreset="gradient" className="w-full">Bilet Al</Button>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  // Static countdown values (no real interval — display only)
  const countdown = { days: "47", hours: "12", minutes: "38", seconds: "24" };

  return (
    <section className="relative bg-gray-950 overflow-hidden py-20 sm:py-28 lg:py-36 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-700/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-700/15 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-fuchsia-700/10 rounded-full blur-2xl pointer-events-none -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Badge variant="primary" className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30">
          📅 14–15 Eylül 2026 · İstanbul
        </Badge>

        <h1 className="text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-6">
          TechConf&apos;26
          <span className="block text-3xl sm:text-5xl mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
            Geleceği Birlikte İnşa Edelim
          </span>
        </h1>

        {/* Date + location */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-white/60 text-sm mb-10">
          <span className="flex items-center gap-2">
            <CalendarIcon />
            14–15 Eylül 2026
          </span>
          <span className="hidden sm:block text-white/30">·</span>
          <span className="flex items-center gap-2">
            <MapPinIcon />
            Lütfi Kırdar Kongre Merkezi, İstanbul
          </span>
        </div>

        {/* Countdown */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 mb-12">
          <CountdownUnit value={countdown.days} label="Gün" />
          <span className="text-2xl sm:text-3xl font-black text-white/40 mb-4">:</span>
          <CountdownUnit value={countdown.hours} label="Saat" />
          <span className="text-2xl sm:text-3xl font-black text-white/40 mb-4">:</span>
          <CountdownUnit value={countdown.minutes} label="Dakika" />
          <span className="text-2xl sm:text-3xl font-black text-white/40 mb-4">:</span>
          <CountdownUnit value={countdown.seconds} label="Saniye" />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="xl" stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
            Bilet Al
          </Button>
          <Button size="xl" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
            Programı İncele
          </Button>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "500+", label: "Katılımcı" },
    { value: "20+", label: "Konuşmacı" },
    { value: "2 Gün", label: "Süre" },
    { value: "10+", label: "Workshop" },
  ];

  return (
    <section className="bg-gray-900 py-12 px-4 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-sm text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeakersSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Konuşmacılar</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Alanında Uzman İsimler
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {SPEAKERS.map((speaker) => (
            <Card key={speaker.name} variant="bordered" stylePreset="default" className="text-center">
              <div className="flex flex-col items-center">
                <Avatar size="xl" name={speaker.name} className="mb-4" />
                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{speaker.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{speaker.title}</p>
                <p className="text-xs text-gray-400 mb-3">{speaker.company}</p>
                <Badge variant="secondary" size="sm">{speaker.topic}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const days = Object.keys(SCHEDULE);
  const [activeDay, setActiveDay] = useState(days[0]);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Program</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Etkinlik Programı</h2>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeDay === day
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-3">
          {SCHEDULE[activeDay].map((session, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white rounded-xl p-4 sm:p-5 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <span className="text-sm font-mono font-bold text-gray-400 shrink-0 w-14 pt-0.5">{session.time}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug">{session.title}</h3>
                {session.speaker !== "—" && (
                  <p className="text-xs text-gray-500 mt-1">{session.speaker}</p>
                )}
              </div>
              <Badge variant="outline" size="sm" className={`shrink-0 ${session.trackColor} border-transparent`}>
                {session.track}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TicketsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">Biletler</Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Biletini Seç</h2>
          <p className="text-gray-500 mt-3 text-sm">Erken kayıt fırsatını kaçırma!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TICKETS.map((ticket) => (
            <Card
              key={ticket.name}
              variant={ticket.highlight ? "elevated" : "bordered"}
              stylePreset={ticket.highlight ? "glow" : "default"}
              className={ticket.highlight ? "ring-2 ring-violet-500 relative" : "relative"}
            >
              {ticket.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" size="sm">En Popüler</Badge>
                </div>
              )}

              <CardHeader className="px-0 pt-0 pb-4">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{ticket.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900">{ticket.price}</span>
                  {ticket.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">{ticket.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">{ticket.desc}</p>
              </CardHeader>

              <ul className="space-y-2.5 mb-6">
                {ticket.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-violet-600 shrink-0"><CheckIcon /></span>
                    {perk}
                  </li>
                ))}
              </ul>

              <CardFooter className="px-0 pb-0 pt-4 border-t border-gray-100">
                <Button
                  variant={ticket.highlight ? "primary" : "outline"}
                  className="w-full"
                  stylePreset={ticket.highlight ? "gradient" : "default"}
                >
                  Satın Al
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SponsorsSection() {
  const tierStyles: Record<string, string> = {
    "Altın": "text-amber-600 font-black text-2xl sm:text-3xl",
    "Gümüş": "text-gray-500 font-bold text-xl sm:text-2xl",
    "Bronz": "text-orange-700/70 font-semibold text-base sm:text-lg",
  };

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm text-gray-400 uppercase tracking-widest mb-12">Sponsorlar</p>

        {Object.entries(SPONSORS).map(([tier, sponsors]) => (
          <div key={tier} className="mb-10">
            <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-5">{tier} Sponsorlar</p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {sponsors.map((s) => (
                <span key={s} className={`${tierStyles[tier]} cursor-default select-none hover:opacity-80 transition-opacity`}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-20 px-4 bg-gray-950 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
          <AlertIcon />
          Son 50 bilet kaldı!
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
          Yerinizi Hemen Ayırtın
        </h2>
        <p className="text-white/50 mb-10 leading-relaxed">
          TechConf&apos;26&apos;da Türkiye&apos;nin en iyi teknoloji liderlerinden ilham alın. Ağınızı genişletin, yeni fikirler edinin.
        </p>

        <Button size="xl" stylePreset="gradient" rightIcon={<ArrowRightIcon />}>
          Bilet Al
        </Button>

        <p className="text-xs text-white/30 mt-4">Güvenli ödeme · Anında e-bilet · 7 gün iade garantisi</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-white/10 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm">T</span>
            <span className="font-bold text-white">TechConf <span className="text-white/40 font-normal">&apos;26</span></span>
          </div>

          <div className="flex items-center gap-4 text-white/40 text-sm">
            {["Konuşmacılar", "Program", "Biletler", "İletişim"].map((l) => (
              <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="text-white/40 hover:text-white transition-colors" aria-label="Twitter">
              <TwitterIcon />
            </button>
            <button className="text-white/40 hover:text-white transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </button>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">© 2026 TechConf. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function EventLandingTemplate() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <SpeakersSection />
      <ScheduleSection />
      <TicketsSection />
      <SponsorsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
