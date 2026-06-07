"use client";

import { useState } from "react";
import { BgAnimation, type BgAnimationType } from "@/components/ui/bg-animation";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { BgAnimation } from "@/components/ui/bg-animation";`;

/* ════════════════════════════════════════════════════════════════
   Ortak ikonlar
════════════════════════════════════════════════════════════════ */

const StarIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-yellow-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><polyline points="20 6 9 17 4 12"/></svg>;
const ArrowRightIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const PlayIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
const ZapIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const TrophyIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>;
const RocketIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
const MusicIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>;
const HeartIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-red-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CpuIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const TrendingUpIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const BookOpenIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const HomeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const HexagonIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><polygon points="11 2 22 8.5 22 15.5 11 22 2 15.5 2 8.5"/></svg>;

/* ════════════════════════════════════════════════════════════════
   Tüm animasyon tipleri (galeri için)
════════════════════════════════════════════════════════════════ */

const ANIMATIONS: { type: BgAnimationType; label: string; category: string; bg: string; description: string }[] = [
  { type: "particles",      label: "Particles",       category: "Parçacık",  bg: "bg-[#0f0a1e]",  description: "Yüzen nokta parçacıkları. Landing page hero alanları için." },
  { type: "aurora",         label: "Aurora",          category: "Blob",      bg: "bg-[#0d0d1a]",  description: "Kuzey ışıkları tarzı blob gradyanlar. Premium SaaS için." },
  { type: "grid-pulse",     label: "Grid Pulse",      category: "Teknik",    bg: "bg-[#030712]",  description: "Yanıp sönen ızgara ve kavşak noktaları. Tech siteleri." },
  { type: "wave",           label: "Wave",            category: "Organik",   bg: "bg-[#0a0a1a]",  description: "Akıcı yatay dalgalar. Müzik, ses veya su temalı ürünler." },
  { type: "gradient-shift", label: "Gradient Shift",  category: "Gradyan",   bg: "transparent",   description: "Sürekli değişen renk geçişi. Canlı ve dikkat çekici." },
  { type: "bubbles",        label: "Bubbles",         category: "Organik",   bg: "bg-[#06071a]",  description: "Yükselen kabarcıklar. Sağlık veya içecek markaları." },
  { type: "meteor",         label: "Meteor",          category: "Uzay",      bg: "bg-[#020817]",  description: "Meteor yağmuru efekti. Uzay veya hız temalı siteler." },
  { type: "noise-drift",    label: "Noise Drift",     category: "Sanatsal",  bg: "bg-[#05050f]",  description: "Dönen konik gradyan + drift eden blob. Sanat ve yaratıcılık." },
  { type: "beam",           label: "Beam Scan",       category: "Teknik",    bg: "bg-[#030712]",  description: "Yatay ve dikey ışın tarama. Siber güvenlik, sci-fi." },
  { type: "matrix",         label: "Matrix",          category: "Kod",       bg: "bg-black",      description: "Düşen sembol yağmuru. Terminal, hacker, kod teması." },
  { type: "circuit",        label: "Circuit",         category: "Elektronik",bg: "bg-[#020a14]",  description: "Devre panosu nabzı — canlı LED noktalar. Donanım & IoT." },
  { type: "confetti-rain",  label: "Confetti Rain",   category: "Kutlama",   bg: "bg-[#1a0a2e]",  description: "Rengarenk konfeti yağmuru. Kutlama ve başarı sayfaları." },
];

/* ════════════════════════════════════════════════════════════════
   Yardımcı bileşenler
════════════════════════════════════════════════════════════════ */

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium backdrop-blur-sm border border-white/10 ${className}`}>
      {children}
    </span>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Galeri (duraklat/oynat)
════════════════════════════════════════════════════════════════ */

function AnimationGallery() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">12 animasyon · saf CSS/Canvas · harici bağımlılık yok · duraklat/oynat</p>
        <button
          onClick={() => setPaused(p => !p)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-sm text-foreground-muted hover:bg-background-muted transition-colors"
        >
          {paused ? (
            <><svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><path d="M5 3l14 9-14 9V3z"/></svg> Oynat</>
          ) : (
            <><svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> Duraklat</>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ANIMATIONS.map(({ type, label, category, bg, description }) => (
          <div key={type} className="rounded-[var(--radius-xl)] overflow-hidden border border-border">
            <BgAnimation type={type} paused={paused} className={`h-40 ${bg}`}>
              <div className="flex items-center justify-center h-40">
                <div className="text-center">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-white/60 text-[10px] font-medium mb-1.5 backdrop-blur-sm">{category}</span>
                  <h3 className="text-white font-semibold drop-shadow">{label}</h3>
                </div>
              </div>
            </BgAnimation>
            <div className="px-4 py-2.5 bg-surface border-t border-border">
              <p className="text-xs text-foreground-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SENARYO BİLEŞENLERİ
════════════════════════════════════════════════════════════════ */

/* ── 1. SaaS Landing Hero ──────────────────────────────────────── */
function SaasHero() {
  return (
    <BgAnimation type="aurora" className="rounded-2xl bg-[#0d0d1a] min-h-[340px]">
      <div className="flex flex-col items-center justify-center min-h-[340px] px-6 py-12 text-center gap-5">
        <Pill className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
          <ZapIcon />
          v2.0 yayınlandı — Yenilikler
        </Pill>
        <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight max-w-lg">
          Ekibinizin verimliliğini<br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">10x artırın</span>
        </h1>
        <p className="text-white/60 max-w-sm text-sm leading-relaxed">
          Yapay zeka destekli proje yönetimi. Görevleri otomatikleştirin, takımı senkronize edin.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors">
            Ücretsiz Başla <ArrowRightIcon />
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/10 transition-colors">
            <PlayIcon /> Demo İzle
          </button>
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
          <span className="ml-1">4.9 · 2.400+ takım kullanıyor</span>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 2. Siber Güvenlik ─────────────────────────────────────────── */
function CyberHero() {
  return (
    <BgAnimation type="beam" className="rounded-2xl bg-[#030712] min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        {/* Sol */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldIcon />
            </div>
            <span className="text-emerald-400 text-xs font-medium tracking-widest uppercase">SecureOS</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug">
            Altyapınızı<br />
            <span className="text-emerald-400">7/24 koruma</span> altına alın
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Gerçek zamanlı tehdit tespiti, sıfır-güven mimarisi ve otomatik yanıt sistemi.
          </p>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-medium border border-emerald-500/30 transition-colors">
            Güvenlik Denetimi Başlat <ArrowRightIcon />
          </button>
        </div>
        {/* Sağ — stat kartları */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          {[
            { label: "Engellenen Saldırı", val: "1.2M", color: "text-emerald-400" },
            { label: "Uptime", val: "99.99%", color: "text-blue-400" },
            { label: "Tepki Süresi", val: "<50ms", color: "text-purple-400" },
            { label: "Müşteri", val: "8.400+", color: "text-amber-400" },
          ].map(s => (
            <GlassCard key={s.label} className="text-center p-3 min-w-[90px]">
              <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
              <p className="text-white/40 text-[10px] mt-0.5 leading-tight">{s.label}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 3. Oyun / Gaming ─────────────────────────────────────────── */
function GamingHero() {
  return (
    <BgAnimation type="meteor" className="rounded-2xl bg-[#020817] min-h-[320px]">
      <div className="flex flex-col items-center justify-center min-h-[320px] px-6 py-10 text-center gap-4 relative">
        <div className="flex items-center gap-2 mb-1">
          <TrophyIcon />
          <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Season 4 Aktif</span>
        </div>
        <h2 className="text-4xl font-black text-white tracking-tight leading-none">
          GALAXY
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            STRIKE
          </span>
        </h2>
        <p className="text-white/50 text-sm max-w-xs">
          50M+ oyuncu · Çapraz platform · Sıfır gecikme
        </p>
        <div className="flex gap-3 mt-2">
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-sm font-black tracking-wide hover:opacity-90 transition-opacity">
            OYNA — ÜCRETSİZ
          </button>
          <button className="px-4 py-2.5 rounded-full bg-white/5 text-white/60 text-sm font-medium border border-white/10 hover:bg-white/10 transition-colors">
            Liderboard
          </button>
        </div>
        {/* Rank badges */}
        <div className="flex gap-2 mt-1">
          {["Bronz","Gümüş","Altın","Platin","Elmas"].map((r, i) => (
            <div key={r} className="size-8 rounded-full border border-white/20 flex items-center justify-center text-[8px] font-bold text-white/60" style={{ background: ["#cd7f32","#c0c0c0","#ffd700","#e5e4e2","#b9f2ff"][i] + "22" }}>
              {r[0]}
            </div>
          ))}
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 4. Müzik / Ses Platformu ─────────────────────────────────── */
function MusicHero() {
  return (
    <BgAnimation type="wave" className="rounded-2xl bg-[#0a0a1a] min-h-[300px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[300px] px-8 py-10 gap-8">
        {/* Sol — albüm kartı */}
        <div className="relative shrink-0">
          <div className="size-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/40 flex items-center justify-center">
            <MusicIcon />
            <div className="absolute -bottom-2 -right-2 size-8 rounded-full bg-white flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" className="size-4"><polygon points="5 3 19 12 5 21 5 3" fill="#6366f1"/></svg>
            </div>
          </div>
          {/* Dalga efekti halkalar */}
          <div className="absolute inset-0 -m-3 rounded-3xl border border-purple-500/20 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
        {/* Sağ */}
        <div className="flex-1 space-y-3">
          <p className="text-purple-400 text-xs font-medium uppercase tracking-widest">Şimdi Çalıyor</p>
          <div>
            <h2 className="text-2xl font-bold text-white">Midnight Echoes</h2>
            <p className="text-white/50 text-sm">Luna Waves · Synthwave Collection</p>
          </div>
          {/* Waveform */}
          <div className="flex items-end gap-0.5 h-8">
            {Array.from({ length: 40 }, (_, i) => (
              <div
                key={i}
                className="w-1 rounded-sm"
                style={{
                  height: `${20 + Math.sin(i * 0.8) * 10 + Math.sin(i * 1.7 + 2.3) * 4}px`,
                  background: i < 25 ? "#a855f7" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-white/40">
            <span>1:42</span><span>3:28</span>
          </div>
          <div className="flex items-center gap-3">
            {[
              <svg key="prev" viewBox="0 0 24 24" fill="white" className="size-4 opacity-60"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5" stroke="white" strokeWidth="2"/></svg>,
              <div key="play" className="size-9 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" fill="#6366f1" className="size-4 ml-0.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>,
              <svg key="next" viewBox="0 0 24 24" fill="white" className="size-4 opacity-60"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2"/></svg>,
            ]}
            <div className="flex-1 h-1 bg-white/10 rounded-full ml-2">
              <div className="w-[48%] h-full bg-purple-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 5. E-Ticaret / Ürün Lansmanı ─────────────────────────────── */
function EcommerceHero() {
  return (
    <BgAnimation type="gradient-shift" className="rounded-2xl min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        {/* Sol metin */}
        <div className="flex-1 space-y-4">
          <Pill className="bg-white/15 text-white border-white/20">
            🔥 Sınırlı stok
          </Pill>
          <h2 className="text-3xl font-black text-white leading-tight">
            AirMax Ultra<br />
            <span className="text-4xl">Pro 2026</span>
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Karbon fiber taban · Adaptif köpük · 48 saat pil ömrü. Sporu yeniden tanımla.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">₺4.299</span>
            <span className="text-white/50 text-sm line-through">₺6.499</span>
            <Pill className="bg-red-500/80 text-white border-red-400/30 text-xs">%34 indirim</Pill>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-full bg-white text-purple-700 text-sm font-bold hover:bg-white/90 transition-colors">
              Sepete Ekle
            </button>
            <button className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 hover:bg-white/15 transition-colors">
              <HeartIcon />
            </button>
          </div>
        </div>
        {/* Sağ — ürün kutu */}
        <div className="shrink-0 relative">
          <div className="size-40 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <svg viewBox="0 0 80 60" className="w-32 opacity-80" fill="none">
              <ellipse cx="40" cy="45" rx="30" ry="8" fill="rgba(255,255,255,0.1)"/>
              <path d="M15 35 Q20 20 40 18 Q60 20 65 35 Q55 42 40 43 Q25 42 15 35Z" fill="white" opacity="0.9"/>
              <path d="M20 33 Q40 25 60 33" stroke="rgba(100,50,200,0.5)" strokeWidth="2" fill="none"/>
              <circle cx="40" cy="43" r="5" fill="rgba(255,255,255,0.3)"/>
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 size-8 rounded-full bg-yellow-400 text-black text-[10px] font-black flex items-center justify-center">
            YENİ
          </div>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 6. Geliştirici / API Dokümantasyon ───────────────────────── */
function DevDocsHero() {
  return (
    <BgAnimation type="grid-pulse" className="rounded-2xl bg-[#030712] min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        {/* Sol */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
              <CpuIcon />
            </div>
            <span className="text-primary text-xs font-mono font-medium">NexAPI v4.2</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Güçlü API,<br />
            <span className="text-primary">sıfır karmaşıklık</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            REST ve GraphQL desteği · TypeScript uyumlu · 300+ endpoint · Anlık dokümantasyon.
          </p>
          <div className="flex gap-3">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors">
              Dökümantasyon <ArrowRightIcon />
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10 hover:bg-white/10 transition-colors font-mono">
              API Key Al
            </button>
          </div>
        </div>
        {/* Sağ — kod snippet */}
        <div className="shrink-0 w-full sm:w-64">
          <div className="rounded-xl bg-black/60 border border-white/10 overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/5">
              <div className="size-2 rounded-full bg-red-500/60" />
              <div className="size-2 rounded-full bg-yellow-500/60" />
              <div className="size-2 rounded-full bg-green-500/60" />
              <span className="ml-2 text-white/30 text-xs font-mono">terminal</span>
            </div>
            <div className="p-3 font-mono text-xs space-y-1">
              <p><span className="text-green-400">$</span> <span className="text-white/70">npm install nexapi</span></p>
              <p className="text-white/30">✓ Package installed</p>
              <p className="mt-2"><span className="text-purple-400">import</span> <span className="text-white/70">{"{ NexAPI }"}</span> <span className="text-purple-400">from</span> <span className="text-yellow-300">&apos;nexapi&apos;</span></p>
              <p><span className="text-blue-400">const</span> <span className="text-white/70">api = </span><span className="text-blue-400">new</span> <span className="text-green-300">NexAPI</span><span className="text-white/70">(</span><span className="text-yellow-300">&apos;key&apos;</span><span className="text-white/70">)</span></p>
              <p className="text-white/30 text-[10px] mt-2"># 300+ endpoint hazır</p>
            </div>
          </div>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 7. Başarı / Onboarding Tamamlandı ────────────────────────── */
function SuccessScreen() {
  return (
    <BgAnimation type="confetti-rain" className="rounded-2xl bg-[#0f0a2e] min-h-[280px]">
      <div className="flex flex-col items-center justify-center min-h-[280px] px-6 py-10 text-center gap-4">
        <div className="size-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-1 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-8">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Hesabın Hazır! 🎉</h2>
        <p className="text-white/60 text-sm max-w-xs leading-relaxed">
          Tüm özelliklere erişim sağlandı. İlk projenizi oluşturmaya hazırsınız.
        </p>
        {/* Rozet */}
        <div className="flex gap-3 mt-1">
          {[
            { icon: "⭐", label: "Erken Kullanıcı" },
            { icon: "🚀", label: "Kurucu Üye" },
            { icon: "💎", label: "Pro Plan" },
          ].map(b => (
            <div key={b.label} className="flex flex-col items-center gap-1">
              <div className="size-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl backdrop-blur-sm">
                {b.icon}
              </div>
              <span className="text-white/40 text-[9px]">{b.label}</span>
            </div>
          ))}
        </div>
        <button className="mt-1 px-6 py-2.5 rounded-full bg-white text-purple-700 text-sm font-bold hover:bg-white/90 transition-colors">
          Panele Git
        </button>
      </div>
    </BgAnimation>
  );
}

/* ── 8. Sağlık / Wellness Uygulaması ─────────────────────────── */
function HealthHero() {
  return (
    <BgAnimation type="bubbles" className="rounded-2xl bg-[#03071a] min-h-[300px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[300px] px-8 py-10 gap-8">
        <div className="flex-1 space-y-4">
          <Pill className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            🌿 %100 Doğal
          </Pill>
          <h2 className="text-2xl font-bold text-white leading-snug">
            Zihninizi ve<br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              bedeninizi dinleyin
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Kişiselleştirilmiş meditasyon, uyku takibi ve stres analizi. Yapay zeka koçunuz her zaman yanınızda.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: "12dk", label: "Günlük Hedef" },
              { val: "7.8h", label: "Ort. Uyku" },
              { val: "%92", label: "Skor" },
            ].map(s => (
              <GlassCard key={s.label} className="text-center p-2">
                <p className="text-emerald-400 font-bold text-sm">{s.val}</p>
                <p className="text-white/40 text-[10px] leading-tight">{s.label}</p>
              </GlassCard>
            ))}
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Oturumu Başlat <ArrowRightIcon />
          </button>
        </div>
        {/* Sağ — mindfulness ring */}
        <div className="shrink-0 relative size-32 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="size-32 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8"/>
            <circle cx="50" cy="50" r="42" fill="none" stroke="url(#healthGrad)" strokeWidth="8" strokeDasharray="264" strokeDashoffset="23" strokeLinecap="round"/>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#34d399"/>
                <stop offset="100%" stopColor="#06b6d4"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <span className="text-2xl font-bold text-white">92</span>
            <p className="text-white/40 text-[9px]">Wellness</p>
          </div>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 9. Yapay Zeka / AI Ürünü ─────────────────────────────────── */
function AIHero() {
  return (
    <BgAnimation type="noise-drift" className="rounded-2xl bg-[#05050f] min-h-[300px]">
      <div className="flex flex-col items-center justify-center min-h-[300px] px-8 py-12 text-center gap-5">
        {/* Animasyonlu ikon */}
        <div className="relative size-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 opacity-40 blur-xl" />
          <div className="size-16 rounded-full bg-gradient-to-br from-indigo-500/30 to-pink-500/30 border border-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-7">
              <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"/>
              <path d="M12 13v9"/>
              <path d="M8 22h8"/>
              <path d="M7 8H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"/>
              <path d="M17 8h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"/>
            </svg>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">
            Yapay Zeka ile
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Düşün, Yarat, Dönüştür
            </span>
          </h2>
          <p className="text-white/50 text-sm max-w-sm mx-auto leading-relaxed">
            GPT-4o tabanlı asistan. Metin, görsel, kod ve ses — tüm üretkenlik araçları tek platformda.
          </p>
        </div>
        {/* Özellik chip'leri */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["Kod Üret","Görsel Oluştur","Ses Dönüştür","Belge Analiz","Otomatik E-posta"].map(f => (
            <span key={f} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 cursor-pointer transition-colors">
              <CheckIcon /> {f}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Ücretsiz Kullan
          </button>
          <button className="px-6 py-2.5 rounded-full bg-white/5 text-white/70 text-sm border border-white/10 hover:bg-white/10 transition-colors">
            Fiyatlar
          </button>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 10. Startup / Pitch Deck ─────────────────────────────────── */
function StartupHero() {
  return (
    <BgAnimation type="particles" className="rounded-2xl bg-[#0f0a1e] min-h-[300px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[300px] px-8 py-10 gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <RocketIcon />
            <span className="text-white/60 text-xs font-medium uppercase tracking-widest">LaunchPad 2026</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug">
            Fikirinizi<br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              60 günde
            </span> ürüne dönüştürün
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Mentorluk, yatırım ağı, teknik altyapı ve pazar erişimi. Sıfırdan MVP'ye.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["#6366f1","#a855f7","#ec4899","#3b82f6"].map((c, i) => (
                <div key={i} className="size-7 rounded-full border-2 border-[#0f0a1e] flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>
                  {["AY","BK","CR","DM"][i]}
                </div>
              ))}
            </div>
            <span className="text-white/40 text-xs">+240 kurucu katıldı</span>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Başvuru Yap <ArrowRightIcon />
          </button>
        </div>
        {/* Sağ — milestone zaman çizelgesi */}
        <div className="shrink-0 space-y-2 w-44">
          {[
            { week: "Hafta 1-2",  label: "İdea Validasyon",  done: true },
            { week: "Hafta 3-4",  label: "Prototip",         done: true },
            { week: "Hafta 5-8",  label: "MVP Geliştirme",   done: false },
            { week: "Hafta 9-10", label: "Beta Lansmanı",    done: false },
          ].map(m => (
            <div key={m.week} className="flex items-center gap-2.5">
              <div className={`size-5 rounded-full border-2 flex items-center justify-center shrink-0 ${m.done ? "border-violet-400 bg-violet-400/20" : "border-white/20 bg-transparent"}`}>
                {m.done && <CheckIcon />}
              </div>
              <div>
                <p className="text-white/80 text-xs font-medium">{m.label}</p>
                <p className="text-white/30 text-[10px]">{m.week}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 11. Küresel Hizmet / Servis ──────────────────────────────── */
function GlobalHero() {
  return (
    <BgAnimation type="circuit" className="rounded-2xl bg-[#020a14] min-h-[280px]">
      <div className="flex flex-col items-center justify-center min-h-[280px] px-8 py-10 text-center gap-4">
        <div className="flex items-center gap-2">
          <GlobeIcon />
          <span className="text-cyan-400 text-xs font-medium uppercase tracking-widest">Global Network</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          <span className="text-cyan-400">42 ülke</span>de kesintisiz hizmet
        </h2>
        <p className="text-white/50 text-sm max-w-sm leading-relaxed">
          Dağıtık altyapı, edge computing ve otomatik yük dengeleme ile her yerden düşük gecikme.
        </p>
        {/* Bölge sayaçları */}
        <div className="flex gap-4 mt-1">
          {[
            { region: "EU", latency: "12ms", color: "text-blue-400" },
            { region: "US", latency: "8ms",  color: "text-green-400" },
            { region: "AS", latency: "19ms", color: "text-amber-400" },
          ].map(r => (
            <GlassCard key={r.region} className="text-center px-4 py-2">
              <p className={`font-bold text-sm ${r.color}`}>{r.latency}</p>
              <p className="text-white/40 text-[10px]">{r.region}</p>
            </GlassCard>
          ))}
        </div>
        <button className="px-6 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium border border-cyan-500/30 transition-colors">
          Altyapıyı İncele
        </button>
      </div>
    </BgAnimation>
  );
}

/* ── 12. Fintech / Yatırım Platformu ─────────────────────────── */
function FintechHero() {
  return (
    <BgAnimation type="grid-pulse" className="rounded-2xl bg-[#020c18] min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        {/* Sol */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUpIcon />
            </div>
            <span className="text-emerald-400 text-xs font-medium tracking-widest uppercase">TradeFlow Pro</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug">
            Portföyünüzü<br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              akıllıca büyütün
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Yapay zeka destekli analiz, otomatik yeniden dengeleme ve gerçek zamanlı piyasa verileriyle yatırımlarınızı optimize edin.
          </p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors">
              Hesap Aç <ArrowRightIcon />
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/5 text-white/60 text-sm border border-white/10 hover:bg-white/10 transition-colors">
              Demo Gör
            </button>
          </div>
        </div>
        {/* Sağ — mini grafik */}
        <div className="shrink-0 space-y-3">
          {/* Fake sparkline */}
          <GlassCard className="p-4 space-y-2 min-w-[180px]">
            <div className="flex items-center justify-between">
              <span className="text-white/60 text-xs">BIST 100</span>
              <span className="text-emerald-400 text-xs font-medium">+2.34%</span>
            </div>
            <svg viewBox="0 0 160 40" className="w-full h-10">
              <polyline
                points="0,35 20,28 40,30 60,18 80,22 100,12 120,8 140,14 160,6"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <linearGradient id="fintechGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#34d399" stopOpacity="0"/>
              </linearGradient>
              <polygon points="0,35 20,28 40,30 60,18 80,22 100,12 120,8 140,14 160,6 160,40 0,40" fill="url(#fintechGrad)"/>
            </svg>
            <p className="text-white font-bold text-lg">₺8.647,50</p>
          </GlassCard>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Günlük K/Z", val: "+₺1.240", up: true },
              { label: "Toplam", val: "+%18.4", up: true },
            ].map(s => (
              <GlassCard key={s.label} className="p-2.5 text-center">
                <p className={`font-bold text-sm ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.val}</p>
                <p className="text-white/40 text-[10px] leading-tight">{s.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 13. Eğitim / Online Kurs Platformu ─────────────────────── */
function EducationHero() {
  return (
    <BgAnimation type="aurora" className="rounded-2xl bg-[#0a0520] min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <BookOpenIcon />
            </div>
            <span className="text-violet-400 text-xs font-medium tracking-widest uppercase">LearnPath</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug">
            Kariyerinizi
            <span className="block bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              bir sonraki seviyeye taşıyın
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Uzman eğitmenler, sertifikalı programlar ve esnek öğrenme planları. 500.000+ öğrenci topluluğuna katılın.
          </p>
          {/* Popüler kurslar */}
          <div className="space-y-1.5">
            {[
              { name: "Full-Stack Web Geliştirme", students: "24.8K", rating: "4.9" },
              { name: "Makine Öğrenmesi",          students: "18.2K", rating: "4.8" },
              { name: "UI/UX Tasarım",             students: "31.5K", rating: "4.9" },
            ].map(c => (
              <div key={c.name} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="size-7 rounded-md bg-violet-500/20 flex items-center justify-center text-xs text-violet-400 font-bold shrink-0">
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/80 text-xs font-medium truncate">{c.name}</p>
                  <p className="text-white/30 text-[10px]">{c.students} öğrenci</p>
                </div>
                <span className="text-yellow-400 text-xs font-medium shrink-0">★ {c.rating}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Sağ — ilerleme kartı */}
        <div className="shrink-0 space-y-3">
          <GlassCard className="p-4 w-48 space-y-3">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-sm font-bold">AY</div>
              <div>
                <p className="text-white/80 text-xs font-medium">Ayşe Yılmaz</p>
                <p className="text-white/40 text-[10px]">Pro Üye</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Haftalık İlerleme</span>
                <span className="text-violet-400 font-medium">%74</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[74%] bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1 text-center">
              {[{ val: "12", label: "Ders" }, { val: "4", label: "Sertifika" }, { val: "🔥 7", label: "Gün" }].map(s => (
                <div key={s.label}>
                  <p className="text-white font-bold text-xs">{s.val}</p>
                  <p className="text-white/30 text-[9px]">{s.label}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 14. Gayrimenkul / Emlak ──────────────────────────────────── */
function RealEstateHero() {
  return (
    <BgAnimation type="noise-drift" className="rounded-2xl bg-[#0a0800] min-h-[320px]">
      <div className="flex flex-col items-center justify-center min-h-[320px] px-8 py-12 text-center gap-5">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <HomeIcon />
          </div>
          <span className="text-amber-400 text-xs font-medium tracking-widest uppercase">PrimEstate</span>
        </div>
        <h2 className="text-3xl font-bold text-white leading-snug max-w-md">
          Hayalinizdeki evi<br />
          <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            3 dakikada bulun
          </span>
        </h2>
        <p className="text-white/50 text-sm max-w-sm leading-relaxed">
          Yapay zeka destekli eşleştirme, sanal tur ve 3D plan görüntüleme. İstanbul'da 28.000+ ilan.
        </p>
        {/* Arama kutusu */}
        <div className="flex w-full max-w-md gap-2 mt-1">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" className="size-4 shrink-0"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <span className="text-white/30 text-sm">Konum, ilçe veya proje adı…</span>
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors shrink-0">
            Ara
          </button>
        </div>
        {/* Hızlı filtreler */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["Satılık Daire","Kiralık","Villa","Yazlık","Yeni Proje"].map(f => (
            <button key={f} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white/80 transition-colors">
              {f}
            </button>
          ))}
        </div>
        {/* Stats */}
        <div className="flex gap-6 text-center">
          {[["28K+","Aktif İlan"], ["4.8★","Müşteri Puanı"], ["15K","Satılan"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-amber-400 font-bold text-base">{val}</p>
              <p className="text-white/40 text-[10px]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── 15. Kripto / Web3 ────────────────────────────────────────── */
function Web3Hero() {
  return (
    <BgAnimation type="matrix" className="rounded-2xl bg-black min-h-[320px]">
      <div className="flex flex-col sm:flex-row items-center min-h-[320px] px-8 py-10 gap-8">
        {/* Sol */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
              <HexagonIcon />
            </div>
            <span className="text-green-400 text-xs font-mono tracking-widest uppercase">ChainVault</span>
          </div>
          <h2 className="text-2xl font-bold text-white leading-snug">
            DeFi portföyünüzü
            <span className="block text-green-400 font-mono">
              tek panelde yönetin
            </span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs font-mono">
            50+ zincir desteği · CEX/DEX entegrasyonu · gerçek zamanlı gas tracker · NFT portföy takibi
          </p>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-300 text-sm font-mono border border-green-500/30 transition-colors">
              Cüzdanı Bağla <ArrowRightIcon />
            </button>
          </div>
        </div>
        {/* Sağ — token listesi */}
        <div className="shrink-0 w-48 space-y-1.5">
          <p className="text-white/30 text-[10px] font-mono uppercase mb-2">Portföy · $42.816</p>
          {[
            { sym: "BTC",  name: "Bitcoin",  val: "$28.400",  change: "+3.2%" },
            { sym: "ETH",  name: "Ethereum", val: "$9.120",   change: "+1.8%" },
            { sym: "SOL",  name: "Solana",   val: "$3.640",   change: "-0.9%" },
            { sym: "AVAX", name: "Avalanche",val: "$1.656",   change: "+5.1%" },
          ].map(t => (
            <div key={t.sym} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="size-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-[9px] font-mono font-bold text-green-400 shrink-0">
                {t.sym[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 text-[11px] font-mono font-medium">{t.sym}</p>
                <p className="text-white/30 text-[9px] font-mono">{t.val}</p>
              </div>
              <span className={`text-[10px] font-mono font-medium ${t.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BgAnimation>
  );
}

/* ── İnteraktif Geçiş Demo ───────────────────────────────────── */
function InteractiveSwitcher() {
  const [selected, setSelected] = useState<BgAnimationType>("aurora");

  const options: { type: BgAnimationType; label: string; bg: string }[] = [
    { type: "aurora",        label: "Aurora",         bg: "bg-[#0d0d1a]" },
    { type: "particles",     label: "Particles",      bg: "bg-[#0f0a1e]" },
    { type: "grid-pulse",    label: "Grid Pulse",     bg: "bg-[#030712]" },
    { type: "wave",          label: "Wave",           bg: "bg-[#0a0a1a]" },
    { type: "gradient-shift",label: "Gradient Shift", bg: "transparent" },
    { type: "bubbles",       label: "Bubbles",        bg: "bg-[#06071a]" },
    { type: "meteor",        label: "Meteor",         bg: "bg-[#020817]" },
    { type: "noise-drift",   label: "Noise Drift",    bg: "bg-[#05050f]" },
    { type: "beam",          label: "Beam",           bg: "bg-[#030712]" },
    { type: "matrix",        label: "Matrix",         bg: "bg-black" },
    { type: "circuit",       label: "Circuit",        bg: "bg-[#020a14]" },
    { type: "confetti-rain", label: "Confetti",       bg: "bg-[#1a0a2e]" },
  ];

  const current = options.find(o => o.type === selected)!;

  return (
    <div className="space-y-4">
      {/* Buton grid */}
      <div className="flex flex-wrap gap-2">
        {options.map(o => (
          <button
            key={o.type}
            onClick={() => setSelected(o.type)}
            className={`px-3 py-1.5 rounded-[var(--radius-md)] text-xs font-medium transition-colors border ${
              selected === o.type
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background border-border text-foreground-muted hover:bg-background-muted"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      {/* Canlı önizleme */}
      <BgAnimation
        type={selected}
        className={`rounded-[var(--radius-xl)] min-h-[240px] transition-all ${current.bg}`}
      >
        <div className="flex flex-col items-center justify-center min-h-[240px] gap-3 px-6 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/60 text-xs backdrop-blur-sm border border-white/10 font-mono">
            type=&quot;{selected}&quot;
          </span>
          <h3 className="text-2xl font-bold text-white drop-shadow">{current.label}</h3>
          <p className="text-white/40 text-sm">Animasyon seçmek için yukarıdaki butonları kullanın</p>
        </div>
      </BgAnimation>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ANA SAYFA
════════════════════════════════════════════════════════════════ */

export default function BgAnimationShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Background Animation</h1>
        <p className="text-sm text-foreground-muted">
          12 animasyon · 15 gerçek kullanım senaryosu · İnteraktif önizleme · SaaS · Fintech · Eğitim · Emlak · Web3 · ve daha fazlası
        </p>
      </div>

      {/* ── Galeri ── */}
      <ShowcaseSection
        title="Tüm Animasyonlar"
        description="12 farklı animasyon türünün canlı önizlemesi."
        importLine={IMPORT}
        code={`<BgAnimation type="aurora" className="h-64 bg-[#0d0d1a] rounded-xl">
  <div className="flex items-center justify-center h-full">
    <h1 className="text-white text-3xl font-bold">Hero Başlık</h1>
  </div>
</BgAnimation>`}
      >
        <AnimationGallery />
      </ShowcaseSection>

      {/* ── Senaryo 1: SaaS ── */}
      <ShowcaseSection
        title="Senaryo 1 — SaaS Landing Hero"
        description="Aurora blob gradyanlar + glassmorphism CTA. B2B SaaS ürünlerinde ana hero bölümü için."
        importLine={IMPORT}
        code={`<BgAnimation type="aurora" className="rounded-2xl bg-[#0d0d1a] min-h-[340px]">
  {/* Badge + başlık + CTA butonları */}
  <div className="flex flex-col items-center justify-center min-h-[340px] px-6 py-12 text-center gap-5">
    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs border border-indigo-500/30">
      v2.0 yayınlandı
    </span>
    <h1 className="text-4xl font-bold text-white">
      Ekibinizin verimliliğini
      <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        10x artırın
      </span>
    </h1>
    <div className="flex gap-3">
      <button className="px-5 py-2.5 rounded-full bg-indigo-500 text-white text-sm font-medium">
        Ücretsiz Başla
      </button>
      <button className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm border border-white/10">
        Demo İzle
      </button>
    </div>
  </div>
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <SaasHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 2: Siber Güvenlik ── */}
      <ShowcaseSection
        title="Senaryo 2 — Siber Güvenlik"
        description="Beam tarama efekti + stat kartları. Güvenlik ürünleri, SOC platformları ve altyapı araçları için."
        importLine={IMPORT}
        code={`<BgAnimation type="beam" className="rounded-2xl bg-[#030712] min-h-[320px]">
  {/* Sol: başlık + CTA  ·  Sağ: stat kartları */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <CyberHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 3: Oyun ── */}
      <ShowcaseSection
        title="Senaryo 3 — Gaming / Oyun"
        description="Meteor yağmuru + agresif tipografi. Oyun landing sayfaları, battle-pass tanıtımları için."
        importLine={IMPORT}
        code={`<BgAnimation type="meteor" className="rounded-2xl bg-[#020817] min-h-[320px]">
  {/* Büyük başlık + gradient metin + oyna butonu */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <GamingHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 4: Müzik ── */}
      <ShowcaseSection
        title="Senaryo 4 — Müzik / Ses Platformu"
        description="Dalga animasyonu + şarkı çalar arayüzü. Müzik streaming, podcast ve ses uygulamaları için."
        importLine={IMPORT}
        code={`<BgAnimation type="wave" className="rounded-2xl bg-[#0a0a1a] min-h-[300px]">
  {/* Albüm kapağı + waveform + oynatıcı kontrolleri */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <MusicHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 5: E-Ticaret ── */}
      <ShowcaseSection
        title="Senaryo 5 — E-Ticaret / Ürün Lansmanı"
        description="Gradient shift + ürün showcase. Moda, ayakkabı ve lifestyle markaları için dikkat çekici hero."
        importLine={IMPORT}
        code={`<BgAnimation type="gradient-shift" className="rounded-2xl min-h-[320px]">
  {/* Ürün adı + fiyat + indirim badge + sepete ekle */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <EcommerceHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 6: Dev Docs ── */}
      <ShowcaseSection
        title="Senaryo 6 — Geliştirici / API"
        description="Grid pulse + terminal kod bloğu. API dokümantasyonu, developer tools ve SDK landing sayfaları."
        importLine={IMPORT}
        code={`<BgAnimation type="grid-pulse" className="rounded-2xl bg-[#030712] min-h-[320px]">
  {/* Sol: açıklama + CTA  ·  Sağ: terminal snippet */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <DevDocsHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 7: Başarı Ekranı ── */}
      <ShowcaseSection
        title="Senaryo 7 — Başarı / Onboarding Tamamlandı"
        description="Konfeti yağmuru + rozet sistemi. Kayıt tamamlama, ödeme onayı ve başarı ekranları için."
        importLine={IMPORT}
        code={`<BgAnimation type="confetti-rain" className="rounded-2xl bg-[#0f0a2e] min-h-[280px]">
  {/* Checkmark + tebrik mesajı + rozetler + devam butonu */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <SuccessScreen />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 8: Sağlık ── */}
      <ShowcaseSection
        title="Senaryo 8 — Sağlık / Wellness"
        description="Kabarcık animasyonu + dairesel metrik. Meditasyon, sağlık takibi ve wellness uygulamaları için."
        importLine={IMPORT}
        code={`<BgAnimation type="bubbles" className="rounded-2xl bg-[#03071a] min-h-[300px]">
  {/* Metrikler + wellness skoru + dairesel progress */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <HealthHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 9: AI ── */}
      <ShowcaseSection
        title="Senaryo 9 — Yapay Zeka / AI Ürünü"
        description="Noise drift + özellik chip'leri. LLM araçları, AI asistanlar ve üretken yapay zeka platformları."
        importLine={IMPORT}
        code={`<BgAnimation type="noise-drift" className="rounded-2xl bg-[#05050f] min-h-[300px]">
  {/* AI ikonu + gradient başlık + özellik etiketleri */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <AIHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 10: Startup ── */}
      <ShowcaseSection
        title="Senaryo 10 — Startup / Akseleratör"
        description="Parçacık animasyonu + mileston zaman çizelgesi. Startup programları, inkübatörler ve pitch sayfaları."
        importLine={IMPORT}
        code={`<BgAnimation type="particles" className="rounded-2xl bg-[#0f0a1e] min-h-[300px]">
  {/* Sol: açıklama + kurucu avatarları  ·  Sağ: yol haritası */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <StartupHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 11: Global Altyapı ── */}
      <ShowcaseSection
        title="Senaryo 11 — Küresel Altyapı / CDN"
        description="Circuit board animasyonu + bölgesel gecikme metrikleri. CDN, cloud ve altyapı servis sağlayıcıları."
        importLine={IMPORT}
        code={`<BgAnimation type="circuit" className="rounded-2xl bg-[#020a14] min-h-[280px]">
  {/* Dünya harita görseli + bölge gecikme kartları */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <GlobalHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 12: Fintech ── */}
      <ShowcaseSection
        title="Senaryo 12 — Fintech / Yatırım Platformu"
        description="Grid pulse + sahte sparkline grafik. Hisse senedi, kripto ve yatırım takip platformları için."
        importLine={IMPORT}
        code={`<BgAnimation type="grid-pulse" className="rounded-2xl bg-[#020c18] min-h-[320px]">
  {/* Sol: başlık + CTA  ·  Sağ: portföy kartı + sparkline */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <FintechHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 13: Eğitim ── */}
      <ShowcaseSection
        title="Senaryo 13 — Eğitim / Online Kurs Platformu"
        description="Aurora blob + kurs listesi + ilerleme kartı. Online öğrenme platformları ve sertifika programları için."
        importLine={IMPORT}
        code={`<BgAnimation type="aurora" className="rounded-2xl bg-[#0a0520] min-h-[320px]">
  {/* Sol: kurs listesi + CTA  ·  Sağ: öğrenci ilerleme kartı */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <EducationHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 14: Emlak ── */}
      <ShowcaseSection
        title="Senaryo 14 — Gayrimenkul / Emlak"
        description="Noise drift + arama kutusu + hızlı filtreler. Emlak platformları ve proje tanıtım sayfaları için."
        importLine={IMPORT}
        code={`<BgAnimation type="noise-drift" className="rounded-2xl bg-[#0a0800] min-h-[320px]">
  {/* Arama kutusu + filtre butonları + istatistikler */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <RealEstateHero />
        </div>
      </ShowcaseSection>

      {/* ── Senaryo 15: Web3 ── */}
      <ShowcaseSection
        title="Senaryo 15 — Kripto / Web3"
        description="Matrix + token portföy listesi. DeFi uygulamaları, kripto borsaları ve NFT platformları için."
        importLine={IMPORT}
        code={`<BgAnimation type="matrix" className="rounded-2xl bg-black min-h-[320px]">
  {/* Sol: başlık + cüzdan bağla  ·  Sağ: token listesi */}
</BgAnimation>`}
        previewClassName="p-0"
      >
        <div className="rounded-[var(--radius-xl)] overflow-hidden">
          <Web3Hero />
        </div>
      </ShowcaseSection>

      {/* ── İnteraktif Geçiş ── */}
      <ShowcaseSection
        title="İnteraktif Animasyon Seçici"
        description="Tüm 12 animasyon türünü tek panelde karşılaştırın. Butona tıklayarak canlı geçiş yapın."
        importLine={IMPORT}
        code={`const [type, setType] = useState<BgAnimationType>("aurora");

<BgAnimation type={type} className="rounded-2xl bg-[#0d0d1a] min-h-[240px]">
  {/* içerik */}
</BgAnimation>`}
      >
        <InteractiveSwitcher />
      </ShowcaseSection>

      {/* ── Props tablosu ── */}
      <ShowcaseSection
        title="Props"
        description="BgAnimation bileşeninin tüm prop'ları."
        importLine={IMPORT}
        code={`// type (zorunlu) — animasyon türü
type BgAnimationType =
  | "particles"       // Yüzen nokta parçacıkları
  | "aurora"          // Kuzey ışıkları blob gradyanlar
  | "grid-pulse"      // Yanıp sönen ızgara
  | "wave"            // Akıcı yatay dalgalar
  | "gradient-shift"  // Renk geçişi döngüsü
  | "bubbles"         // Yükselen kabarcıklar
  | "meteor"          // Meteor yağmuru
  | "noise-drift"     // Drift eden konik gradyan
  | "beam"            // Işın tarama efekti
  | "matrix"          // Düşen semboller (canvas)
  | "circuit"         // Devre panosu nabzı (canvas)
  | "confetti-rain";  // Konfeti yağmuru

className?: string   // boyut, arka plan, rounded
children?: ReactNode // animasyonun önünde görünür (z-10)
paused?: boolean     // animasyonu durdur`}
        previewClassName="p-0"
      >
        <div className="overflow-x-auto border border-border rounded-[var(--radius-lg)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="text-left px-4 py-3 text-foreground font-semibold">Animasyon</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Render</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Örnek Senaryo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["aurora",          "CSS",    "SaaS, AI, Eğitim — Senaryo 1, 9, 13"],
                ["beam",            "CSS",    "Siber Güvenlik — Senaryo 2"],
                ["meteor",          "CSS",    "Gaming — Senaryo 3"],
                ["wave",            "CSS",    "Müzik — Senaryo 4"],
                ["gradient-shift",  "CSS",    "E-Ticaret — Senaryo 5"],
                ["grid-pulse",      "CSS",    "API/Geliştirici, Fintech — Senaryo 6, 12"],
                ["confetti-rain",   "CSS",    "Başarı Ekranı — Senaryo 7"],
                ["bubbles",         "CSS",    "Sağlık/Wellness — Senaryo 8"],
                ["particles",       "CSS",    "Startup — Senaryo 10"],
                ["circuit",         "Canvas", "Global Altyapı — Senaryo 11"],
                ["matrix",          "Canvas", "Web3/Kripto — Senaryo 15"],
                ["noise-drift",     "CSS",    "Emlak, Sanat, NFT — Senaryo 14"],
              ].map(([type, render, usage]) => (
                <tr key={type} className="border-b border-border last:border-0 hover:bg-background-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${render === "Canvas" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" : "bg-primary-subtle text-primary"}`}>
                      {render}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted text-xs">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}
