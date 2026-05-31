"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { MagneticButton } from "@/components/ui/magnetic-button";

/* ─── CSS ────────────────────────────────────────────────── */
const CSS = `
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes gx{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes fi{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
@keyframes float-col{from{transform:translateY(0)}to{transform:translateY(calc(-50% - 10px))}}
@keyframes pulse-soft{0%,100%{opacity:.3}50%{opacity:.5}}
@keyframes shimmer{from{background-position:-200% center}to{background-position:200% center}}
@keyframes orbit{from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)}}
@keyframes scan{from{top:-20%}to{top:120%}}
@keyframes grain{0%,100%{transform:translate(0)}20%{transform:translate(-2%,-3%)}40%{transform:translate(3%,1%)}60%{transform:translate(-1%,3%)}80%{transform:translate(2%,-2%)}}

.fi-1{animation:fi .7s cubic-bezier(.22,1,.36,1) both .15s}
.fi-2{animation:fi .7s cubic-bezier(.22,1,.36,1) both .3s}
.fi-3{animation:fi .7s cubic-bezier(.22,1,.36,1) both .5s}
.fi-4{animation:fi .7s cubic-bezier(.22,1,.36,1) both .7s}
.fi-5{animation:fi .7s cubic-bezier(.22,1,.36,1) both .9s}

.grain::after{content:'';position:fixed;inset:-50%;width:200%;height:200%;pointer-events:none;z-index:9999;opacity:.02;
background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
background-size:180px;animation:grain .5s steps(1) infinite}

@keyframes marquee-fwd{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes marquee-rev{from{transform:translateX(-50%)}to{transform:translateX(0)}}
`;

/* ─── Scroll progress ───────────────────────────────────── */
function ScrollLine() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const f = () => { const d = document.documentElement; setP(d.scrollTop / (d.scrollHeight - d.clientHeight) * 100 || 0); };
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return <div className="fixed top-0 left-0 right-0 z-[200] h-[2px]"><div className="h-full" style={{ width: `${p}%`, background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899)" }} /></div>;
}

/* ─── Typewriter ─────────────────────────────────────────── */
function TW({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [t, setT] = useState("");
  const [d, setD] = useState(false);
  useEffect(() => {
    const w = words[i];
    const id = setTimeout(() => {
      if (!d) { if (t.length < w.length) setT(w.slice(0, t.length + 1)); else setTimeout(() => setD(true), 2400); }
      else { if (t.length > 0) setT(t.slice(0, -1)); else { setD(false); setI(n => (n + 1) % words.length); } }
    }, d ? 28 : 75);
    return () => clearTimeout(id);
  }, [t, d, i, words]);
  return <>{t}<span className="inline-block w-[2px] h-[.8em] align-middle ml-0.5 bg-primary rounded-sm" style={{ animation: "blink 1s step-end infinite" }} /></>;
}

/* ─── Reveal on scroll ───────────────────────────────────── */
function Rev({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(36px)", transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .7s cubic-bezier(.22,1,.36,1) ${delay}ms` }}>{children}</div>;
}

/* ─── Stat counter ───────────────────────────────────────── */
function Stat({ n, suf, label }: { n: number; suf: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <p className="text-5xl sm:text-6xl font-black tabular-nums tracking-[-0.06em] text-foreground">{go ? <AnimatedCounter to={n} suffix={suf} duration={1400} easing="ease-out" /> : <>0{suf}</>}</p>
      <p className="text-[11px] text-foreground-subtle mt-1.5 uppercase tracking-[0.15em] font-semibold">{label}</p>
    </div>
  );
}

/* ─── Bento card wrapper ─────────────────────────────────── */
function Bento({ children, className = "", accent = "#6366f1" }: { children: React.ReactNode; className?: string; accent?: string }) {
  return (
    <div className={`group relative rounded-[20px] border border-border/50 bg-surface/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-xl ${className}`}>
      <div className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg,transparent,${accent},transparent)` }} />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%,${accent}08,transparent 60%)` }} />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   FALLING COMPONENT COLUMNS — daha temiz, daha okunabilir
   Her kolon küçük, net bileşen mockup'ları içeriyor
═══════════════════════════════════════════════════════════ */

/* Tek bir mini bileşen kartı */
function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border/40 bg-surface/60 backdrop-blur-sm shadow-sm p-2.5 ${className}`}>{children}</div>;
}

/* Her kolon için bileşen listesi — 8 kolon, KATEGORİLER KARIŞIK
   Hiçbir kolonda aynı kategori alt alta gelmiyor */

/* Kategori: btn=button, bdg=badge, tgl=toggle, inp=input, prg=progress/slider */
const COL_ITEMS: React.ReactNode[][] = [
  /* col 0 — mix: btn, tgl, bdg, inp, prg, btn */
  [
    <Chip key="c0a"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-white text-center" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>Primary</span></Chip>,
    <Chip key="c0b"><div className="flex items-center gap-2"><div className="w-8 h-[18px] rounded-full bg-[#22c55e] relative"><div className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" /></div><span className="text-[9px] text-foreground-muted">Bildirim</span></div></Chip>,
    <Chip key="c0c"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#6366f1]">New</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#22c55e]">Live</span></div></Chip>,
    <Chip key="c0d"><div className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[9px] text-foreground-subtle/50">Email adresiniz...</div></Chip>,
    <Chip key="c0e"><div className="w-full h-3 flex items-center"><div className="w-full h-1 rounded-full bg-background-muted relative"><div className="absolute left-0 top-0 h-full w-[65%] rounded-full bg-[#6366f1]"/><div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#6366f1] shadow-sm" style={{left:"65%"}}/></div></div></Chip>,
    <Chip key="c0f"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-center" style={{ background: "#0a0a0f", color: "#818cf8", boxShadow: "0 0 14px #6366f130", border: "1px solid #6366f140" }}>Neon</span></Chip>,
  ],
  /* col 1 — mix: inp, btn, prg, tgl, btn, bdg */
  [
    <Chip key="c1a"><div className="flex gap-1"><span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border bg-surface shadow-sm text-foreground-muted">⌘</span><span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border bg-surface shadow-sm text-foreground-muted">K</span></div></Chip>,
    <Chip key="c1b"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-white text-center" style={{ background: "linear-gradient(135deg,#6366f1,#a855f7,#ec4899)" }}>Gradient</span></Chip>,
    <Chip key="c1c"><div className="flex -space-x-1.5">{["#6366f1","#a855f7","#ec4899","#3b82f6"].map((c,i)=><div key={i} className="w-6 h-6 rounded-full border-2 border-surface text-white text-[7px] font-bold flex items-center justify-center" style={{background:c}}>{String.fromCharCode(65+i)}</div>)}<div className="w-6 h-6 rounded-full border-2 border-surface bg-surface-raised flex items-center justify-center text-[7px] text-foreground-muted">+3</div></div></Chip>,
    <Chip key="c1d"><div className="flex items-center gap-2"><div className="w-8 h-[18px] rounded-full bg-[#6366f1] relative"><div className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" /></div><span className="text-[9px] text-foreground-muted">Dark</span></div></Chip>,
    <Chip key="c1e"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-white text-center bg-red-500">Danger</span></Chip>,
    <Chip key="c1f"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#ef4444]">Error</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#f59e0b]">Beta</span></div></Chip>,
  ],
  /* col 2 — mix: prg, bdg, btn, inp, tgl, prg */
  [
    <Chip key="c2a"><div className="space-y-1">{[[72,"#6366f1"],[48,"#a855f7"]].map(([v,c],i)=><div key={i}><div className="flex justify-between text-[7px] text-foreground-subtle mb-0.5"><span>Task {i+1}</span><span>{v}%</span></div><div className="h-1 rounded-full bg-background-muted overflow-hidden"><div className="h-full rounded-full" style={{width:`${v}%`,background:c as string}}/></div></div>)}</div></Chip>,
    <Chip key="c2b"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>Pro</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#3b82f6]">Info</span></div></Chip>,
    <Chip key="c2c"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-center text-white/90" style={{ background: "rgba(99,102,241,.15)", border: "1px solid rgba(99,102,241,.2)" }}>Glass</span></Chip>,
    <Chip key="c2d"><div className="flex gap-1">{["4","8","2","·"].map((d,i)=><div key={i} className="w-6 h-7 rounded border border-border bg-background flex items-center justify-center text-xs font-bold text-foreground">{d}</div>)}</div></Chip>,
    <Chip key="c2e"><div className="flex items-center gap-2"><div className="w-4 h-4 rounded border-2 border-[#6366f1] bg-[#6366f1] flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg></div><span className="text-[9px] text-foreground-muted">Kabul</span></div></Chip>,
    <Chip key="c2f"><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full border-2 border-[#6366f1] flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#6366f1]"/></div><span className="text-[9px] text-foreground-muted">Seçenek A</span></div></Chip>,
  ],
  /* col 3 — mix: tgl, prg, inp, btn, bdg, tgl */
  [
    <Chip key="c3a"><div className="flex items-center gap-2"><div className="w-8 h-[18px] rounded-full bg-[#a855f7] relative"><div className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" /></div><span className="text-[9px] text-foreground-muted">Anim</span></div></Chip>,
    <Chip key="c3b"><div className="space-y-1">{[[88,"#22c55e"],[35,"#ef4444"]].map(([v,c],i)=><div key={i}><div className="flex justify-between text-[7px] text-foreground-subtle mb-0.5"><span>Job {i+1}</span><span>{v}%</span></div><div className="h-1 rounded-full bg-background-muted overflow-hidden"><div className="h-full rounded-full" style={{width:`${v}%`,background:c as string}}/></div></div>)}</div></Chip>,
    <Chip key="c3c"><div className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[9px] text-foreground flex items-center justify-between"><span>İstanbul</span><span className="text-foreground-subtle">▾</span></div></Chip>,
    <Chip key="c3d"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-center" style={{ background: "#fff", color: "#000", border: "2px solid #000", boxShadow: "3px 3px 0 #000" }}>Brutal</span></Chip>,
    <Chip key="c3e"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#a855f7]">VIP</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#ec4899]">Hot</span></div></Chip>,
    <Chip key="c3f"><div className="flex gap-0.5">{[1,2,3,4,5].map(s=><span key={s} className="text-xs" style={{color:s<=4?"#f59e0b":"var(--border)"}}>★</span>)}</div></Chip>,
  ],
  /* col 4 — mix: bdg, inp, tgl, prg, btn, inp */
  [
    <Chip key="c4a"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold border border-primary/40 text-primary">Outline</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#06b6d4]">Cyan</span></div></Chip>,
    <Chip key="c4b"><div className="flex gap-1"><span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-primary-subtle text-primary">react</span><span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-primary-subtle text-primary">ui</span><span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-primary-subtle text-primary">ts</span></div></Chip>,
    <Chip key="c4c"><div className="flex items-center gap-2"><div className="w-8 h-[18px] rounded-full bg-border relative"><div className="absolute top-[2px] left-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" /></div><span className="text-[9px] text-foreground-muted">Ses</span></div></Chip>,
    <Chip key="c4d"><div className="w-full h-3 flex items-center"><div className="w-full h-1 rounded-full bg-background-muted relative"><div className="absolute left-0 top-0 h-full w-[45%] rounded-full bg-[#a855f7]"/><div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#a855f7] shadow-sm" style={{left:"45%"}}/></div></div></Chip>,
    <Chip key="c4e"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-medium text-center border border-primary/40 text-primary">Outline</span></Chip>,
    <Chip key="c4f"><div className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[9px] text-foreground-subtle/50">Ara...</div></Chip>,
  ],
  /* col 5 — mix: btn, bdg, prg, inp, btn, tgl */
  [
    <Chip key="c5a"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-medium text-center bg-primary-subtle text-primary">Soft</span></Chip>,
    <Chip key="c5b"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#22c55e]">Active</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#6366f1]">Dev</span></div></Chip>,
    <Chip key="c5c"><div className="flex -space-x-1.5">{["#ec4899","#f59e0b","#22c55e","#6366f1"].map((c,i)=><div key={i} className="w-6 h-6 rounded-full border-2 border-surface text-white text-[7px] font-bold flex items-center justify-center" style={{background:c}}>{String.fromCharCode(69+i)}</div>)}<div className="w-6 h-6 rounded-full border-2 border-surface bg-surface-raised flex items-center justify-center text-[7px] text-foreground-muted">+5</div></div></Chip>,
    <Chip key="c5d"><div className="flex gap-1"><span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border bg-surface shadow-sm text-foreground-muted">⌥</span><span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-border bg-surface shadow-sm text-foreground-muted">P</span></div></Chip>,
    <Chip key="c5e"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-medium text-center text-foreground-muted">Ghost</span></Chip>,
    <Chip key="c5f"><div className="flex items-center gap-2"><div className="w-4 h-4 rounded border-2 border-[#22c55e] bg-[#22c55e] flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg></div><span className="text-[9px] text-foreground-muted">Onay</span></div></Chip>,
  ],
  /* col 6 — mix: inp, tgl, btn, bdg, prg, btn */
  [
    <Chip key="c6a"><div className="flex gap-1">{["7","3","·","9"].map((d,i)=><div key={i} className="w-6 h-7 rounded border border-border bg-background flex items-center justify-center text-xs font-bold text-foreground">{d}</div>)}</div></Chip>,
    <Chip key="c6b"><div className="flex items-center gap-2"><div className="w-8 h-[18px] rounded-full bg-[#ec4899] relative"><div className="absolute top-[2px] right-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" /></div><span className="text-[9px] text-foreground-muted">Auto</span></div></Chip>,
    <Chip key="c6c"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-medium text-center border border-dashed border-border font-mono text-foreground-muted">Retro</span></Chip>,
    <Chip key="c6d"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#3b82f6]">v2.0</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#f59e0b]">Warn</span></div></Chip>,
    <Chip key="c6e"><div className="space-y-1">{[[60,"#ec4899"],[82,"#22c55e"]].map(([v,c],i)=><div key={i}><div className="flex justify-between text-[7px] text-foreground-subtle mb-0.5"><span>Build {i+1}</span><span>{v}%</span></div><div className="h-1 rounded-full bg-background-muted overflow-hidden"><div className="h-full rounded-full" style={{width:`${v}%`,background:c as string}}/></div></div>)}</div></Chip>,
    <Chip key="c6f"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-white text-center" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>Primary</span></Chip>,
  ],
  /* col 7 — mix: prg, btn, tgl, bdg, inp, prg */
  [
    <Chip key="c7a"><div className="flex items-center gap-1.5"><div className="w-5 h-5 rounded-full border-2 border-[#a855f7] flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#a855f7]"/></div><span className="text-[9px] text-foreground-muted">Seçenek B</span></div></Chip>,
    <Chip key="c7b"><span className="block px-4 py-1.5 rounded-lg text-[10px] font-bold text-white text-center" style={{ background: "linear-gradient(135deg,#ec4899,#a855f7)" }}>Magenta</span></Chip>,
    <Chip key="c7c"><div className="flex gap-0.5">{[1,2,3,4,5].map(s=><span key={s} className="text-xs" style={{color:s<=3?"#ef4444":"var(--border)"}}>★</span>)}</div></Chip>,
    <Chip key="c7d"><div className="flex gap-1.5 justify-center"><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#6366f1]">Core</span><span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-[#22c55e]">Stable</span></div></Chip>,
    <Chip key="c7e"><div className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-[9px] text-foreground flex items-center justify-between"><span>Ankara</span><span className="text-foreground-subtle">▾</span></div></Chip>,
    <Chip key="c7f"><div className="w-full h-3 flex items-center"><div className="w-full h-1 rounded-full bg-background-muted relative"><div className="absolute left-0 top-0 h-full w-[78%] rounded-full bg-[#22c55e]"/><div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#22c55e] shadow-sm" style={{left:"78%"}}/></div></div></Chip>,
  ],
];

/* Her kolon için random-benzeri ama deterministik parametreler */
const COL_PARAMS = [
  { speed: 38, startOffset: -2,  gap: 28, topPad: 20,  dir: 1  },
  { speed: 52, startOffset: -14, gap: 40, topPad: 80,  dir: -1 },
  { speed: 44, startOffset: -8,  gap: 32, topPad: 140, dir: 1  },
  { speed: 58, startOffset: -22, gap: 44, topPad: 50,  dir: -1 },
  { speed: 42, startOffset: -5,  gap: 36, topPad: 110, dir: 1  },
  { speed: 55, startOffset: -18, gap: 48, topPad: 30,  dir: -1 },
  { speed: 46, startOffset: -10, gap: 30, topPad: 160, dir: 1  },
  { speed: 50, startOffset: -26, gap: 42, topPad: 70,  dir: -1 },
];

function FallingColumns() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Soft vignettes — top & bottom only */}
      <div className="absolute top-0 inset-x-0 h-36 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom,var(--background) 10%,transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-36 z-10 pointer-events-none" style={{ background: "linear-gradient(to top,var(--background) 10%,transparent)" }} />

      {/* Full width — edge to edge */}
      <div className="absolute inset-0 flex justify-between px-2 sm:px-4 opacity-[0.32]">
        {COL_ITEMS.map((col, ci) => {
          const p = COL_PARAMS[ci];
          const hiddenClass = ci >= 5 ? "hidden xl:block" : ci >= 3 ? "hidden md:block" : "";

          /* Her kolon için bileşen sırasını farklılaştır */
          const shuffled = ci % 2 === 0
            ? col
            : [...col].reverse();

          /* Araya random boşluk öğeleri ekle */
          const withGaps: React.ReactNode[] = [];
          shuffled.forEach((item, idx) => {
            withGaps.push(item);
            /* Her 2-3 öğeden sonra ekstra boşluk */
            if ((idx + ci) % 3 === 1) {
              withGaps.push(<div key={`gap-${idx}`} className="shrink-0" style={{ height: 20 + ((ci * 17 + idx * 13) % 30) }} />);
            }
          });

          return (
            <div key={ci} className={`flex-1 max-w-[160px] overflow-hidden relative ${hiddenClass}`}>
              <div
                className="flex flex-col"
                style={{
                  gap: p.gap,
                  paddingTop: p.topPad,
                  animation: `float-col ${p.speed}s linear infinite`,
                  animationDirection: p.dir < 0 ? "reverse" : "normal",
                  animationDelay: `${p.startOffset}s`,
                }}
              >
                {/* 4x tekrar for seamless loop */}
                {[...withGaps, ...withGaps, ...withGaps, ...withGaps].map((item, j) => (
                  <div key={j} className="shrink-0">{item}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Marquee ────────────────────────────────────────────── */
const ALL = ["Button","Badge","Card","Modal","Drawer","Toast","Tooltip","Accordion","Tabs","Select","Combobox","DatePicker","FileUpload","OTP","Slider","Rating","Stepper","Timeline","Skeleton","Spinner","Progress","Avatar","CodeBlock","DiffViewer","DonutChart","AreaChart","GaugeChart","HeatMap","Sparkline","Navbar","Sidebar","Footer","Breadcrumb","Pagination","Marquee","Typewriter","MagneticButton","ShimmerText","Reveal","ThemeToggle","Kbd","Tour","TreeView","KanbanBoard","Testimonial","CookieConsent","Banner","Countdown","StatCard","PricingTable","TagInput","NumberFlow","AnimatedCounter","BgAnimation","Toggle","Input","Textarea","Radio","Checkbox","ColorPicker","CommandPalette","ContextMenu","Popover","EmptyState"];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
      <div className="flex w-max gap-3 hover:[animation-play-state:paused]" style={{
        animationName: reverse ? "marquee-rev" : "marquee-fwd",
        animationDuration: "45s", animationTimingFunction: "linear", animationIterationCount: "infinite",
      }}>
        {[0, 1].map(copy => (
          <div key={copy} className="flex gap-3 shrink-0" aria-hidden={copy === 1 || undefined}>
            {items.map(name => (
              <span key={name} className="shrink-0 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border border-border/30 text-foreground-subtle/60 hover:text-primary hover:border-primary/30 transition-colors cursor-default">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function Home() {
  useEffect(() => {
    const id = "hp-css"; if (document.getElementById(id)) return;
    const el = document.createElement("style"); el.id = id; el.textContent = CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="grain min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollLine />

      {/* ━━━ NAVBAR ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-1.5rem)] max-w-3xl">
        <nav className="flex items-center justify-between h-11 px-4 rounded-2xl border border-border/25 bg-background/50 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,.06)]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg text-[10px] font-black text-white flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>U</div>
            <span className="text-sm font-bold tracking-tight">UI Library</span>
          </Link>
          <div className="flex items-center gap-0.5">
            <span className="hidden sm:flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full mr-1.5" style={{ background: "rgba(99,102,241,.08)", color: "#818cf8" }}>
              <span className="w-1 h-1 rounded-full bg-[#818cf8] animate-pulse" />beta
            </span>
            <Link href="/showcase" className="text-[12px] text-foreground-muted hover:text-foreground px-2.5 py-1 rounded-lg hover:bg-surface/60 transition-colors font-medium">Bileşenler</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[12px] text-foreground-muted hover:text-foreground px-2.5 py-1 rounded-lg hover:bg-surface/60 transition-colors font-medium flex items-center gap-1">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="opacity-70"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85 0 1.7.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>
      </header>

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Falling component columns */}
        <FallingColumns />

        {/* Central glow + text readability layer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[700px] rounded-full pointer-events-none z-10"
          style={{ background: "radial-gradient(ellipse at center,var(--background) 0%,var(--background) 20%,transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,.14) 0%,rgba(168,85,247,.07) 40%,transparent 70%)", filter: "blur(40px)", animation: "pulse-soft 6s ease-in-out infinite" }} />

        {/* Orbiting dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { r: 180, dur: "25s", size: 3, color: "#6366f1" },
            { r: 240, dur: "32s", size: 2, color: "#a855f7" },
            { r: 140, dur: "20s", size: 3, color: "#ec4899" },
          ].map((o, i) => (
            <div key={i} className="absolute top-1/2 left-1/2" style={{ "--r": `${o.r}px`, animation: `orbit ${o.dur} linear infinite -${i * 8}s` } as React.CSSProperties}>
              <div className="rounded-full" style={{ width: o.size, height: o.size, background: o.color, opacity: 0.5, boxShadow: `0 0 8px ${o.color}50` }} />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 text-center max-w-3xl mx-auto px-4">
          <div className="fi-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/25 bg-surface/30 backdrop-blur-md text-[11px] text-foreground-muted font-medium mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            Aktif geliştirme · 90+ bileşen
          </div>

          <h1 className="fi-2 font-black leading-[0.88] tracking-[-0.05em] mb-7 select-none" style={{ fontSize: "clamp(3rem,9vw,7rem)" }}>
            <span className="block text-foreground mb-1">Kişisel</span>
            <span className="block bg-clip-text text-transparent bg-[length:200%_auto]" style={{
              backgroundImage: "linear-gradient(90deg,#6366f1 0%,#a855f7 25%,#ec4899 50%,#a855f7 75%,#6366f1 100%)",
              animation: "shimmer 4s linear infinite",
            }}>UI Kütüphanesi</span>
          </h1>

          <p className="fi-3 text-base sm:text-lg text-foreground-muted max-w-md mx-auto mb-10 leading-relaxed font-medium min-h-[1.6em]">
            <TW words={["Butonu bir kez yaz, her yerde kullan.", "Tailwind v4 ile sıfırdan inşa edildi.", "Dark mode. Her zaman. Hazır.", "Sıfır bağımlılık, sıfır ödün."]} />
          </p>

          <div className="fi-4 flex flex-wrap justify-center gap-3 mb-8">
            <MagneticButton strength={14}>
              <Link href="/showcase" className="group flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all hover:shadow-[0_0_40px_rgba(99,102,241,.3)]" style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}>
                Showcase&apos;i Keşfet
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>
            </MagneticButton>
            <MagneticButton strength={10}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold px-7 py-3.5 rounded-xl text-sm border border-border/40 bg-surface/40 backdrop-blur-sm text-foreground hover:border-primary/30 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85 0 1.7.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>
                GitHub
              </a>
            </MagneticButton>
          </div>

          <div className="fi-5 flex flex-wrap justify-center gap-1.5">
            {[["Next.js 15","#fff"],["React 19","#61dafb"],["Tailwind v4","#38bdf8"],["TypeScript","#3b82f6"],["CVA","#818cf8"]].map(([n,c])=>(
              <span key={n} className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-border/25 text-foreground-subtle/60 flex items-center gap-1 bg-surface/15">
                <span className="w-1 h-1 rounded-full" style={{background:c}}/>{n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ MARQUEE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-y border-border/25 py-3 bg-surface/5">
        <Marquee items={ALL} />
      </div>

      {/* ━━━ STATS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative py-28 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div className="absolute left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom,transparent,var(--primary),transparent)", animation: "scan 7s linear infinite" }} />
        </div>
        <Rev className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 text-center">
            <Stat n={90} suf="+" label="Bileşen" />
            <Stat n={10} suf="" label="Kategori" />
            <Stat n={16} suf="" label="Şablon" />
            <Stat n={40} suf="+" label="Token" />
          </div>
        </Rev>
      </section>

      {/* ━━━ SHOWCASE BENTO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="max-w-6xl mx-auto px-4 pb-28">
        <Rev>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-2">Vitrin</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em]">İçinde neler var?</h2>
            </div>
            <Link href="/showcase" className="hidden sm:flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all">Tümünü gör <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg></Link>
          </div>
        </Rev>

        <div className="grid grid-cols-6 lg:grid-cols-12 gap-3">
          {/* BUTTON */}
          <Rev delay={0} className="col-span-6 lg:col-span-7">
            <Bento accent="#6366f1"><div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Button</p>
                <span className="text-[10px] text-foreground-subtle">7 varyant · 7 preset</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold text-white" style={{background:"linear-gradient(135deg,#6366f1,#4f46e5)"}}>Primary</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold" style={{background:"#0a0a0f",color:"#818cf8",boxShadow:"0 0 20px #6366f140,inset 0 0 16px #6366f115",border:"1px solid #6366f150"}}>Neon</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold text-white/90" style={{background:"rgba(99,102,241,.18)",border:"1px solid rgba(99,102,241,.25)",backdropFilter:"blur(12px)"}}>Glass</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold" style={{background:"#fff",color:"#000",border:"2px solid #000",boxShadow:"4px 4px 0 #000"}}>Brutal</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold text-white" style={{background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",backgroundSize:"200%",animation:"gx 3s ease infinite"}}>Gradient</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 rounded-xl text-[11px] font-medium border border-primary/40 text-primary">Outline</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-medium text-foreground-muted">Ghost</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-bold text-white bg-red-500">Danger</span>
                  <span className="px-4 py-2 rounded-xl text-[11px] font-medium bg-primary-subtle text-primary">Soft</span>
                </div>
              </div>
            </div></Bento>
          </Rev>

          {/* TOGGLE + BADGE */}
          <div className="col-span-6 lg:col-span-5 flex flex-col gap-3">
            <Rev delay={100}>
              <Bento accent="#22c55e"><div className="p-5">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-4">Toggle</p>
                <div className="space-y-3">
                  {[{on:true,c:"#6366f1",l:"Dark mode"},{on:false,c:"#22c55e",l:"Bildirimler"},{on:true,c:"#a855f7",l:"Animasyonlar"}].map(t=>(
                    <div key={t.l} className="flex items-center justify-between">
                      <span className="text-xs text-foreground-muted">{t.l}</span>
                      <div className="w-10 h-[22px] rounded-full relative cursor-default" style={{background:t.on?t.c:"var(--border)"}}>
                        <div className="absolute top-[3px] h-4 w-4 rounded-full bg-white shadow-sm transition-all" style={{left:t.on?"calc(100% - 19px)":"3px"}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div></Bento>
            </Rev>
            <Rev delay={200}>
              <Bento accent="#a855f7"><div className="p-5">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-3">Badge</p>
                <div className="flex flex-wrap gap-1.5">
                  {[{l:"New",bg:"#6366f1"},{l:"Pro",bg:"linear-gradient(135deg,#6366f1,#a855f7)"},{l:"Live",bg:"#22c55e"},{l:"Beta",bg:"#f59e0b"},{l:"Error",bg:"#ef4444"},{l:"Info",bg:"#3b82f6"}].map(b=>(
                    <span key={b.l} className="text-[10px] font-bold text-white px-2.5 py-1 rounded-full" style={{background:b.bg}}>{b.l}</span>
                  ))}
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/40 text-primary">Outline</span>
                </div>
              </div></Bento>
            </Rev>
          </div>

          {/* CODE BLOCK */}
          <Rev delay={100} className="col-span-6 lg:col-span-7">
            <Bento accent="#22c55e" className="h-full">
              <div className="bg-zinc-950 rounded-[20px] h-full">
                <div className="flex items-center gap-1.5 px-5 pt-4 pb-2">
                  {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full opacity-80" style={{background:c}} />)}
                  <span className="ml-2.5 text-[10px] text-zinc-500 font-mono">app/page.tsx</span>
                </div>
                <div className="px-5 pb-5 font-mono text-[11px] leading-[1.8] text-zinc-300">
                  <div><span className="text-blue-400">import</span> {"{"} <span className="text-amber-300">Button</span>, <span className="text-amber-300">Card</span>, <span className="text-amber-300">Badge</span> {"}"}</div>
                  <div className="pl-4"><span className="text-blue-400">from</span> <span className="text-green-400">&quot;@/components/ui&quot;</span></div>
                  <div className="text-zinc-700">&nbsp;</div>
                  <div><span className="text-purple-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">Page</span><span className="text-zinc-500">() {"{"}</span></div>
                  <div className="pl-4"><span className="text-purple-400">return</span> <span className="text-zinc-500">(</span></div>
                  <div className="pl-8"><span className="text-pink-400">{"<Card"}</span> <span className="text-blue-300">stylePreset</span>=<span className="text-green-400">&quot;glass&quot;</span><span className="text-pink-400">{">"}</span></div>
                  <div className="pl-12"><span className="text-pink-400">{"<Badge"}</span> <span className="text-blue-300">dot</span> <span className="text-blue-300">variant</span>=<span className="text-green-400">&quot;success&quot;</span><span className="text-pink-400">{" />"}</span></div>
                  <div className="pl-12"><span className="text-pink-400">{"<Button"}</span> <span className="text-blue-300">stylePreset</span>=<span className="text-green-400">&quot;neon&quot;</span><span className="text-pink-400">{" />"}</span></div>
                  <div className="pl-8"><span className="text-pink-400">{"</Card>"}</span></div>
                  <div className="pl-4"><span className="text-zinc-500">)</span></div>
                  <div><span className="text-zinc-500">{"}"}</span></div>
                </div>
              </div>
            </Bento>
          </Rev>

          {/* CHART */}
          <Rev delay={200} className="col-span-6 lg:col-span-5">
            <Bento accent="#06b6d4" className="h-full"><div className="p-6 h-full flex flex-col">
              <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-4">Charts</p>
              <div className="flex items-center gap-6 flex-1">
                <svg width="90" height="90" viewBox="0 0 90 90" className="shrink-0">
                  <circle cx="45" cy="45" r="32" fill="none" stroke="var(--background-muted)" strokeWidth="14" />
                  <circle cx="45" cy="45" r="32" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="90 111" strokeLinecap="round" transform="rotate(-90 45 45)" />
                  <circle cx="45" cy="45" r="32" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="50 151" strokeDashoffset="-90" strokeLinecap="round" transform="rotate(-90 45 45)" />
                  <circle cx="45" cy="45" r="32" fill="none" stroke="#ec4899" strokeWidth="14" strokeDasharray="35 166" strokeDashoffset="-140" strokeLinecap="round" transform="rotate(-90 45 45)" />
                </svg>
                <div className="flex-1 space-y-2">
                  {[["#6366f1","React","45%","45%"],["#a855f7","Vue","25%","25%"],["#ec4899","Svelte","18%","18%"]].map(([c,n,v,w])=>(
                    <div key={n}><div className="flex justify-between text-[10px] mb-1"><span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm" style={{background:c}}/><span className="text-foreground-muted">{n}</span></span><span className="font-bold text-foreground tabular-nums">{v}</span></div><div className="h-1 rounded-full bg-background-muted overflow-hidden"><div className="h-full rounded-full" style={{width:w,background:c}}/></div></div>
                  ))}
                </div>
              </div>
            </div></Bento>
          </Rev>

          {/* 3 compact */}
          {[
            {t:"12 Animasyon",d:"Aurora, meteor, matrix, circuit, beam, wave...",icon:"✦",accent:"#6366f1"},
            {t:"16 Şablon",d:"Landing, SaaS, dashboard, e-ticaret, portföy...",icon:"◈",accent:"#a855f7"},
            {t:"Erişilebilir",d:"ARIA, focus-visible, klavye navigasyonu, reduced-motion",icon:"◎",accent:"#ec4899"},
          ].map((item,i)=>(
            <Rev key={item.t} delay={i*80} className="col-span-6 sm:col-span-3 lg:col-span-4">
              <Bento accent={item.accent}><div className="p-5"><div className="flex items-center gap-2 mb-2"><span className="text-lg">{item.icon}</span><p className="text-sm font-bold text-foreground">{item.t}</p></div><p className="text-xs text-foreground-muted leading-relaxed">{item.d}</p></div></Bento>
            </Rev>
          ))}
        </div>
      </section>

      {/* ━━━ FEATURES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="border-t border-border/25 py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <Rev><div className="text-center mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-2">Özellikler</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em]">Neden bu kütüphane?</h2>
          </div></Rev>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/25 rounded-[20px] overflow-hidden border border-border/25">
            {[
              {n:"01",t:"Tasarım Tokenları",d:"CSS değişkenleriyle tam özelleştirilebilir renk, radius ve shadow sistemi.",i:"◎"},
              {n:"02",t:"Dark / Light",d:"Sistem tercihini algılar. Flash olmadan anlık geçiş.",i:"◐"},
              {n:"03",t:"Tam Responsive",d:"Mobile-first yaklaşım. Her bileşen her ekrana uyar.",i:"▣"},
              {n:"04",t:"TypeScript",d:"CVA tabanlı varyant sistemi. Tam tip çıkarımı, sıfır any.",i:"⟡"},
              {n:"05",t:"Sıfır Bağımlılık",d:"Sadece React ve Tailwind. 3. parti runtime yok.",i:"⊘"},
              {n:"06",t:"Preset Sistemi",d:"Neon, glass, brutal, gradient — tek prop ile stil değiştir.",i:"✦"},
            ].map((f,i)=>(
              <Rev key={f.n} delay={i*60}>
                <div className="group bg-background hover:bg-surface/50 p-7 h-full transition-colors duration-300 relative overflow-hidden">
                  <span className="absolute -bottom-3 -right-1 text-[5rem] font-black leading-none text-foreground/[0.015] select-none pointer-events-none">{f.n}</span>
                  <div className="relative"><div className="flex items-center gap-2 mb-3"><span className="text-base opacity-60">{f.i}</span><span className="text-[9px] font-bold text-foreground-subtle tracking-wider">{f.n}</span></div>
                  <h3 className="font-bold text-foreground mb-1.5 text-sm">{f.t}</h3><p className="text-xs text-foreground-muted leading-relaxed">{f.d}</p></div>
                </div>
              </Rev>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ MARQUEE REVERSE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="border-y border-border/25 py-3">
        <Marquee items={[...ALL].reverse()} reverse />
      </div>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="px-4 py-32">
        <Rev>
          <div className="max-w-3xl mx-auto relative rounded-[24px] overflow-hidden border border-border/30">
            <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(99,102,241,.08),rgba(168,85,247,.05),rgba(236,72,153,.03))",backgroundSize:"200%",animation:"gx 6s ease infinite"}} />
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]"><div className="absolute left-0 right-0 h-20" style={{background:"linear-gradient(to bottom,transparent,var(--primary),transparent)",animation:"scan 5s linear infinite"}} /></div>
            <div className="absolute top-0 inset-x-0 h-px" style={{background:"linear-gradient(90deg,transparent 10%,#6366f1,#a855f7,#ec4899,transparent 90%)"}} />
            <div className="relative z-10 py-20 sm:py-24 px-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-5">Hazır mısın?</p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] text-foreground mb-4">
                Bileşenleri keşfetmeye{" "}
                <span className="bg-clip-text text-transparent" style={{backgroundImage:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)"}}>başla</span>
              </h2>
              <p className="text-foreground-muted mb-10 max-w-sm mx-auto text-sm leading-relaxed">Canlı önizleme, kod örnekleri ve tam dokümantasyonla 90+ bileşen seni bekliyor.</p>
              <MagneticButton strength={16}>
                <Link href="/showcase" className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-white text-sm" style={{background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",backgroundSize:"200%",animation:"gx 4s ease infinite"}}>
                  Showcase&apos;e Git
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </Rev>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="relative border-t border-border/25 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none" style={{background:"radial-gradient(ellipse at 50% 0%,rgba(99,102,241,.06),transparent 70%)"}} />

        <div className="relative z-10 max-w-5xl mx-auto px-4">
          {/* Top — big brand + CTA */}
          <div className="py-16 flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl text-sm font-black text-white flex items-center justify-center" style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}}>U</div>
              <span className="text-2xl font-black tracking-tight">UI Library</span>
            </div>
            <p className="text-sm text-foreground-muted max-w-md leading-relaxed mb-8">
              Next.js, React ve Tailwind CSS v4 ile sıfırdan inşa edilmiş, 90+ bileşen içeren kişisel tasarım sistemi.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/showcase" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Bileşenler</Link>
              <Link href="/showcase/templates/landing" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Şablonlar</Link>
              <Link href="/showcase/bg-animation" className="text-foreground-muted hover:text-foreground transition-colors font-medium">Animasyonlar</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-foreground-muted hover:text-foreground transition-colors font-medium">GitHub</a>
            </div>
          </div>

          {/* Divider with gradient */}
          <div className="h-px" style={{background:"linear-gradient(90deg,transparent,var(--border),transparent)"}} />

          {/* Bottom */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap justify-center gap-1.5">
              {[["Next.js","#fff"],["React","#61dafb"],["Tailwind","#38bdf8"],["TypeScript","#3b82f6"],["CVA","#818cf8"]].map(([n,c])=>(
                <span key={n} className="text-[9px] font-medium px-2 py-0.5 rounded-full border border-border/20 text-foreground-subtle/40 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full" style={{background:c}}/>{n}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-foreground-subtle/40">&copy; 2026 Emirhan Durmuş</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
