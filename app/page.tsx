"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { BgAnimation } from "@/components/ui/bg-animation";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Marquee } from "@/components/ui/marquee";
import { ShimmerText } from "@/components/ui/shimmer-text";
import { Reveal } from "@/components/ui/reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";

/* ══════════════════════════════════════════════════════════════
   GLOBAL STYLES — inject once
══════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  @keyframes grain {
    0%,100%{transform:translate(0,0)}
    10%{transform:translate(-2%,-3%)}
    20%{transform:translate(3%,2%)}
    30%{transform:translate(-1%,4%)}
    40%{transform:translate(4%,-1%)}
    50%{transform:translate(-3%,3%)}
    60%{transform:translate(2%,-4%)}
    70%{transform:translate(-4%,1%)}
    80%{transform:translate(1%,3%)}
    90%{transform:translate(3%,-2%)}
  }
  @keyframes scroll-hint {
    0%{transform:translateY(0);opacity:1}
    100%{transform:translateY(12px);opacity:0}
  }
  @keyframes float-y {
    0%,100%{transform:translateY(0px)}
    50%{transform:translateY(-18px)}
  }
  @keyframes rotate-slow {
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
  }
  @keyframes dash-draw {
    from{stroke-dashoffset:1000}
    to{stroke-dashoffset:0}
  }
  @keyframes pulse-ring {
    0%{transform:scale(0.8);opacity:0.8}
    100%{transform:scale(2.2);opacity:0}
  }
  @keyframes text-clip-reveal {
    from{clip-path:inset(0 100% 0 0)}
    to{clip-path:inset(0 0% 0 0)}
  }
  @keyframes h-line {
    from{width:0}
    to{width:100%}
  }
  @keyframes count-up-glow {
    0%,100%{text-shadow:0 0 0px transparent}
    50%{text-shadow:0 0 40px rgba(99,102,241,0.5)}
  }
  @keyframes cursor-blink {
    0%,100%{opacity:1}50%{opacity:0}
  }
  @keyframes card-levitate {
    0%,100%{transform:translateY(0) rotate(-1deg)}
    50%{transform:translateY(-10px) rotate(1deg)}
  }
  @keyframes gradient-x {
    0%,100%{background-position:0% 50%}
    50%{background-position:100% 50%}
  }
  @keyframes split-left {
    from{transform:translateX(0)}
    to{transform:translateX(-6px)}
  }
  @keyframes split-right {
    from{transform:translateX(0)}
    to{transform:translateX(6px)}
  }
  .grain-overlay::after {
    content:'';
    position:fixed;
    inset:-50%;
    width:200%;
    height:200%;
    pointer-events:none;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E");
    background-size:256px;
    opacity:0.035;
    animation:grain 0.8s steps(1) infinite;
    z-index:9999;
  }
  .hide-scrollbar::-webkit-scrollbar{display:none}
  .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
`;

/* ══════════════════════════════════════════════════════════════
   CURSOR — özel imleç
══════════════════════════════════════════════════════════════ */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring_pos = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hovering.current = !!(t.closest("a,button,[data-cursor-grow]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      ring_pos.current.x = lerp(ring_pos.current.x, pos.current.x, 0.12);
      ring_pos.current.y = lerp(ring_pos.current.y, pos.current.y, 0.12);
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        const s = hovering.current ? 1.8 : 1;
        ring.current.style.transform = `translate(${ring_pos.current.x - 20}px,${ring_pos.current.y - 20}px) scale(${s})`;
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[9998] pointer-events-none w-2 h-2 rounded-full bg-primary mix-blend-difference" style={{ willChange: "transform" }} />
      <div ref={ring} className="fixed top-0 left-0 z-[9997] pointer-events-none w-10 h-10 rounded-full border border-primary/50 mix-blend-difference transition-transform duration-100" style={{ willChange: "transform" }} />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   SCROLL PROGRESS — top bar
══════════════════════════════════════════════════════════════ */
function ScrollBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setP((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 || 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px]">
      <div style={{ width: `${p}%`, background: "linear-gradient(90deg,#6366f1,#a855f7,#ec4899,#f43f5e)", transition: "width 60ms linear" }} className="h-full" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TYPEWRITER inline
══════════════════════════════════════════════════════════════ */
function TW({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    const id = setTimeout(() => {
      if (!del) {
        if (txt.length < w.length) setTxt(w.slice(0, txt.length + 1));
        else setTimeout(() => setDel(true), 2200);
      } else {
        if (txt.length > 0) setTxt(txt.slice(0, -1));
        else { setDel(false); setI(n => (n + 1) % words.length); }
      }
    }, del ? 35 : 85);
    return () => clearTimeout(id);
  }, [txt, del, i, words]);
  return (
    <span>
      {txt}
      <span className="inline-block w-[2px] h-[0.9em] align-middle ml-[2px] bg-primary" style={{ animation: "cursor-blink 1s step-end infinite" }} />
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   SPLIT CHAR TITLE — her harf ayrı animasyon
══════════════════════════════════════════════════════════════ */
function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            animation: `text-clip-reveal 0.6s cubic-bezier(0.77,0,0.18,1) both`,
            animationDelay: `${i * 0.04}s`,
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   GLOWING ORB
══════════════════════════════════════════════════════════════ */
function Orb({ x, y, size, color, opacity = 0.15, blur = 80, delay = "0s", duration = "20s" }: {
  x: string; y: string; size: number; color: string; opacity?: number; blur?: number; delay?: string; duration?: string;
}) {
  return (
    <div aria-hidden className="absolute pointer-events-none rounded-full" style={{
      left: x, top: y, width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity, filter: `blur(${blur}px)`,
      animation: `float-y ${duration} ease-in-out infinite ${delay}`,
      transform: "translate(-50%,-50%)",
    }} />
  );
}

/* ══════════════════════════════════════════════════════════════
   LIVE COMPONENT PREVIEW CARDS
══════════════════════════════════════════════════════════════ */
function LiveCard({ children, label, x, y, rotate, delay }: {
  children: React.ReactNode; label: string;
  x: string; y: string; rotate: number; delay: string;
}) {
  return (
    <div className="absolute pointer-events-none" style={{
      left: x, top: y,
      animation: `card-levitate 6s ease-in-out infinite ${delay}`,
      transform: `rotate(${rotate}deg)`,
    }}>
      <div className="rounded-2xl border border-border/60 bg-surface/80 backdrop-blur-xl shadow-2xl overflow-hidden">
        <div className="px-3 pt-3 pb-2">{children}</div>
        <div className="px-3 pb-2.5 border-t border-border/40 mt-1">
          <span className="text-[9px] font-mono text-foreground-subtle">{label}</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT NAMES
══════════════════════════════════════════════════════════════ */
const NAMES = [
  "Button","Badge","Card","Modal","Drawer","Toast","Tooltip","Accordion","Tabs",
  "Select","Combobox","DatePicker","FileUpload","OTP","Slider","Rating","Stepper",
  "Timeline","Skeleton","Spinner","Progress","Avatar","CodeBlock","DiffViewer",
  "DonutChart","AreaChart","GaugeChart","HeatMap","Sparkline","Navbar","Sidebar",
  "Footer","BottomNav","Breadcrumb","Pagination","Marquee","Typewriter","Confetti",
  "MagneticButton","ShimmerText","Reveal","BackToTop","ThemeToggle","Kbd","Tour",
  "TreeView","LogViewer","KanbanBoard","Testimonial","CookieConsent","Notification",
  "ShareButton","Banner","Countdown","ComparisonTable","StatCard","FeatureGrid",
  "PricingTable","TagInput","NumberFlow","AnimatedCounter","BgAnimation","Pattern",
  "Alert","Checkbox","Input","Textarea","Toggle","Radio","ColorPicker","PhoneInput",
  "MultiStepForm","CommandPalette","ContextMenu","Popover","Gauge","MiniBarChart",
  "LogoWall","EmptyState","FaqList","ReadingTime","PrintButton","ScrollProgress",
  "BackgroundPattern","NumberFlow","Shimmer","Confetti","Magnetic",
];

const COLORS: Record<string, string> = {
  Button:"#6366f1",Badge:"#a855f7",Card:"#3b82f6",Modal:"#ec4899",Drawer:"#f59e0b",
  Toast:"#22c55e",Tooltip:"#06b6d4",Accordion:"#8b5cf6",DonutChart:"#06b6d4",
  AreaChart:"#6366f1",Timeline:"#f59e0b",KanbanBoard:"#ec4899",Typewriter:"#a855f7",
};

/* ══════════════════════════════════════════════════════════════
   SECTION: HORIZONTAL SCROLL FEATURE
══════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    num: "01", title: "90+ Bileşen", body: "Primitive'lerden tam sayfa şablonlara kadar ihtiyacınız olan her şey tek depoda.",
    bg: "from-indigo-500/10 to-violet-500/5", accent: "#6366f1",
    visual: (
      <div className="flex flex-wrap gap-1.5 max-w-[200px]">
        {["Button","Badge","Card","Modal","Select","Tabs","Accordion","Toast","Tooltip","Slider"].map(n=>(
          <span key={n} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-indigo-500/30 text-indigo-400 bg-indigo-500/10">{n}</span>
        ))}
      </div>
    ),
  },
  {
    num: "02", title: "Tasarım Tokenları", body: "CSS değişkenleriyle tam özelleştirilebilir renk, radius, shadow ve tipografi sistemi.",
    bg: "from-violet-500/10 to-purple-500/5", accent: "#a855f7",
    visual: (
      <div className="grid grid-cols-4 gap-1.5">
        {[
          ["#6366f1","primary"],["#a855f7","violet"],["#ec4899","pink"],["#3b82f6","blue"],
          ["#22c55e","success"],["#ef4444","danger"],["#f59e0b","warn"],["#06b6d4","cyan"],
        ].map(([c,n])=>(
          <div key={n} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-xl shadow-lg" style={{background:c}}/>
            <span className="text-[8px] text-foreground-subtle font-mono">{n}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "03", title: "12 Animasyon", body: "Aurora, meteor, circuit, matrix... Sıfır bağımlılık, tam CSS/Canvas animasyon sistemi.",
    bg: "from-pink-500/10 to-rose-500/5", accent: "#ec4899",
    visual: (
      <div className="relative w-full h-24 rounded-xl overflow-hidden">
        <BgAnimation type="aurora" className="absolute inset-0 opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white/80 font-mono">aurora</span>
        </div>
      </div>
    ),
  },
  {
    num: "04", title: "16 Şablon", body: "Landing, SaaS, e-ticaret, dashboard, portföy — hazır sayfa şablonları.",
    bg: "from-blue-500/10 to-cyan-500/5", accent: "#3b82f6",
    visual: (
      <div className="space-y-2">
        {["Landing","SaaS","E-Commerce","Dashboard","Portfolio","Blog"].map(t=>(
          <div key={t} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"/>
            <span className="text-xs text-foreground-muted font-medium">{t}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "05", title: "Dark Mode", body: "Sistem tercihini algılar, flash olmadan anlık geçiş, her token dark'ta ayrı tanımlanmış.",
    bg: "from-slate-500/10 to-zinc-500/5", accent: "#94a3b8",
    visual: (
      <div className="flex gap-3">
        <div className="flex-1 rounded-xl bg-white border border-gray-200 p-3">
          <div className="h-1.5 rounded bg-gray-200 w-3/4 mb-1.5"/>
          <div className="h-1.5 rounded bg-gray-100 w-1/2 mb-3"/>
          <div className="h-5 w-12 rounded-lg bg-indigo-500"/>
        </div>
        <div className="flex-1 rounded-xl bg-zinc-900 border border-zinc-800 p-3">
          <div className="h-1.5 rounded bg-zinc-700 w-3/4 mb-1.5"/>
          <div className="h-1.5 rounded bg-zinc-800 w-1/2 mb-3"/>
          <div className="h-5 w-12 rounded-lg bg-indigo-400"/>
        </div>
      </div>
    ),
  },
  {
    num: "06", title: "TypeScript", body: "CVA tabanlı varyant sistemi, tam tip çıkarımı, IntelliSense ve sıfır any.",
    bg: "from-sky-500/10 to-blue-500/5", accent: "#38bdf8",
    visual: (
      <div className="rounded-xl bg-background-muted p-3 font-mono text-[10px] space-y-1 leading-relaxed">
        <div><span className="text-blue-400">type </span><span className="text-green-400">ButtonVariant</span><span className="text-foreground-subtle"> =</span></div>
        <div className="pl-3"><span className="text-amber-300">&quot;primary&quot;</span><span className="text-foreground-subtle"> |</span></div>
        <div className="pl-3"><span className="text-amber-300">&quot;ghost&quot;</span><span className="text-foreground-subtle"> |</span></div>
        <div className="pl-3"><span className="text-amber-300">&quot;danger&quot;</span><span className="text-foreground-subtle"> |</span></div>
        <div className="pl-3"><span className="text-amber-300">&quot;neon&quot;</span></div>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════
   COMPONENT SHOWCASE GRID
══════════════════════════════════════════════════════════════ */
const SHOWCASE = [
  {
    name: "Button", sub: "7 varyant · 6 preset",
    accent: "#6366f1", wide: true,
    preview: (
      <div className="space-y-3 p-1">
        <div className="flex flex-wrap gap-2">
          {[
            {label:"Primary", bg:"linear-gradient(135deg,#6366f1,#4f46e5)", color:"white"},
            {label:"Neon", bg:"#0a0a0f", color:"#6366f1", border:"1px solid #6366f1", shadow:"0 0 16px #6366f180"},
            {label:"Glass", bg:"rgba(99,102,241,0.15)", color:"white", border:"1px solid rgba(99,102,241,0.3)", backdropFilter:"blur(12px)"},
            {label:"Brutal", bg:"#fff", color:"#000", border:"2px solid #000", boxShadow:"3px 3px 0 #000"},
          ].map(b=>(
            <span key={b.label} className="text-xs font-bold px-3 py-1.5 rounded-lg cursor-default" style={b}>{b.label}</span>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-500/40 text-indigo-400 cursor-default">Outline</span>
          <span className="text-xs font-medium px-3 py-1.5 rounded-lg text-foreground-muted cursor-default">Ghost</span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-lg text-white cursor-default" style={{background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",backgroundSize:"200%",animation:"gradient-x 3s ease infinite"}}>Gradient</span>
        </div>
      </div>
    ),
  },
  {
    name: "Data Table", sub: "Sort · Filter · Paging",
    accent: "#06b6d4", wide: false,
    preview: (
      <div className="text-[9px] font-mono w-full">
        <div className="flex gap-2 border-b border-border pb-1.5 mb-2 font-bold text-foreground-subtle">
          <span className="w-14">Name</span><span className="w-14">Role</span><span className="flex-1">Status</span>
        </div>
        {[["Emirhan","Dev","●"],["Ayşe","Design","●"],["Mehmet","PM","○"]].map(([n,r,s])=>(
          <div key={n} className="flex gap-2 py-1 text-foreground-muted border-b border-border/40">
            <span className="w-14">{n}</span><span className="w-14 text-foreground-subtle">{r}</span>
            <span className={s==="●"?"text-success":"text-border-strong"}>{s} {s==="●"?"Active":"Away"}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "Donut Chart", sub: "Etkileşimli · Tooltip",
    accent: "#a855f7", wide: false,
    preview: (
      <div className="flex items-center gap-3">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="26" fill="none" stroke="var(--background-muted)" strokeWidth="12"/>
          <circle cx="36" cy="36" r="26" fill="none" stroke="#6366f1" strokeWidth="12" strokeDasharray="75 88" strokeLinecap="round" transform="rotate(-90 36 36)"/>
          <circle cx="36" cy="36" r="26" fill="none" stroke="#a855f7" strokeWidth="12" strokeDasharray="40 123" strokeDashoffset="-75" strokeLinecap="round" transform="rotate(-90 36 36)"/>
          <circle cx="36" cy="36" r="26" fill="none" stroke="#ec4899" strokeWidth="12" strokeDasharray="28 135" strokeDashoffset="-115" strokeLinecap="round" transform="rotate(-90 36 36)"/>
          <text x="36" y="39" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">67%</text>
        </svg>
        <div className="space-y-1.5">
          {[["#6366f1","React"],["#a855f7","Vue"],["#ec4899","Angular"]].map(([c,n])=>(
            <div key={n} className="flex items-center gap-1.5 text-[10px]">
              <div className="w-2 h-2 rounded-sm" style={{background:c}}/>
              <span className="text-foreground-muted">{n}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Aurora BG", sub: "12 animasyon tipi",
    accent: "#6366f1", wide: false,
    preview: (
      <div className="relative h-20 rounded-xl overflow-hidden -mx-1">
        <BgAnimation type="aurora" className="absolute inset-0"/>
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {["aurora","beam","meteor"].map(t=>(
            <span key={t} className="text-[9px] font-mono font-bold text-white/70 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-sm">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: "Modal / Drawer", sub: "Portal · Focus trap · a11y",
    accent: "#f59e0b", wide: false,
    preview: (
      <div className="relative h-24 flex items-center justify-center">
        <div className="absolute inset-4 rounded-2xl border border-border bg-surface/60 backdrop-blur-sm shadow-2xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="h-2 w-20 rounded bg-foreground-subtle/30"/>
              <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center">
                <span className="text-[8px] text-foreground-subtle">✕</span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded bg-foreground-subtle/15 mb-1"/>
            <div className="h-1.5 w-3/4 rounded bg-foreground-subtle/10 mb-3"/>
            <div className="flex gap-1.5">
              <div className="h-5 w-12 rounded-lg bg-indigo-500"/>
              <div className="h-5 w-12 rounded-lg border border-border"/>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Code Block", sub: "Syntax · Copy · Diff",
    accent: "#22c55e", wide: true,
    preview: (
      <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3 font-mono text-[10px] leading-relaxed">
        <div className="flex items-center gap-1.5 mb-3">
          {["#ef4444","#f59e0b","#22c55e"].map(c=><div key={c} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}
          <span className="ml-2 text-zinc-500">app/page.tsx</span>
        </div>
        <div className="space-y-0.5">
          <div><span className="text-blue-400">import </span><span className="text-amber-300">{"{ Button }"} </span><span className="text-blue-400">from </span><span className="text-green-400">&quot;@/components/ui&quot;</span></div>
          <div className="text-zinc-600">&nbsp;</div>
          <div><span className="text-purple-400">export default </span><span className="text-blue-400">function </span><span className="text-yellow-300">Page</span><span className="text-zinc-400">() {"{"}</span></div>
          <div><span className="text-zinc-400 pl-4">return </span><span className="text-pink-400">{"<Button"}</span><span className="text-blue-300"> preset</span><span className="text-zinc-400">=</span><span className="text-green-400">&quot;neon&quot;</span><span className="text-pink-400">{"/>"}</span></div>
          <div><span className="text-zinc-400">{"}"}</span></div>
        </div>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════════
   STAT with intersection trigger
══════════════════════════════════════════════════════════════ */
function Stat({ n, suf, label, color }: {n:number;suf:string;label:string;color:string}) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current; if(!el) return;
    const obs = new IntersectionObserver(([e])=>{if(e.isIntersecting){setGo(true);obs.disconnect();}},{threshold:0.4});
    obs.observe(el); return ()=>obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="group flex flex-col items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background:color,filter:"blur(20px)",opacity:0.15}}/>
        <span className="relative text-6xl sm:text-7xl font-black tabular-nums tracking-[-0.05em]" style={{
          background:`linear-gradient(135deg,${color},white)`,
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          animation: go ? "count-up-glow 2s ease-in-out" : undefined,
        }}>
          {go ? <AnimatedCounter to={n} suffix={suf} duration={1600} easing="ease-out"/> : `0${suf}`}
        </span>
      </div>
      <span className="text-sm text-foreground-muted font-medium tracking-wide uppercase">{label}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════════════════ */
export default function Home() {
  /* ── inject global styles ── */
  useEffect(() => {
    const id = "landing-global";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  return (
    <div className="grain-overlay min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollBar />
      <CustomCursor />

      {/* ════════════════════════════════════════════════════
          NAVBAR — glass morphism
      ════════════════════════════════════════════════════ */}
      <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
        <div className="rounded-2xl border border-border/50 bg-background/70 backdrop-blur-2xl shadow-xl px-5 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[11px] text-white select-none" style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}}>U</div>
            <span className="font-bold text-sm tracking-tight">UI Library</span>
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{background:"rgba(99,102,241,0.12)",color:"#818cf8"}}>
              <span className="w-1 h-1 rounded-full bg-[#818cf8] animate-pulse"/>v0.1-beta
            </div>
          </div>
          <nav className="flex items-center gap-1">
            <Link href="/showcase" className="text-xs text-foreground-muted hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-surface/80 transition-colors">Showcase</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-xs text-foreground-muted hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-surface/80 transition-colors">GitHub</a>
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          HERO — fullscreen sinematik
      ════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Background layers */}
        <div className="absolute inset-0">
          <BgAnimation type="aurora" className="absolute inset-0 opacity-25 dark:opacity-40" />
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Orb x="15%" y="20%" size={500} color="#6366f1" opacity={0.08} blur={100} duration="25s" />
          <Orb x="85%" y="15%" size={400} color="#a855f7" opacity={0.07} blur={90} delay="-8s" duration="20s" />
          <Orb x="70%" y="75%" size={350} color="#ec4899" opacity={0.06} blur={80} delay="-15s" duration="22s" />
          <Orb x="30%" y="80%" size={300} color="#3b82f6" opacity={0.05} blur={70} delay="-5s" duration="18s" />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:"linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
          backgroundSize:"80px 80px",
          opacity:0.3,
          maskImage:"radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 100%)",
        }}/>

        {/* Floating live component cards — desktop only */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
          <LiveCard label="<Badge preset='gradient'/>" x="5%" y="25%" rotate={-5} delay="0s">
            <div className="flex gap-1.5">
              {["New","Sale","Hot"].map(t=>(
                <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}}>{t}</span>
              ))}
            </div>
          </LiveCard>
          <LiveCard label="<Toggle checked />" x="78%" y="20%" rotate={4} delay="-2s">
            <div className="flex items-center gap-2">
              <div className="w-9 h-5 rounded-full bg-indigo-500 relative flex items-center px-0.5">
                <div className="w-4 h-4 rounded-full bg-white ml-auto shadow-sm"/>
              </div>
              <span className="text-[10px] text-foreground-muted">On</span>
            </div>
          </LiveCard>
          <LiveCard label="<Avatar group />" x="82%" y="65%" rotate={3} delay="-4s">
            <div className="flex -space-x-2">
              {["#6366f1","#a855f7","#ec4899","#3b82f6"].map((c,i)=>(
                <div key={i} className="w-7 h-7 rounded-full border-2 border-surface flex items-center justify-center text-white font-bold text-[9px]" style={{background:c}}>
                  {String.fromCharCode(65+i)}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-surface bg-surface-raised flex items-center justify-center text-[9px] text-foreground-muted">+5</div>
            </div>
          </LiveCard>
          <LiveCard label="<Progress value={72} />" x="6%" y="68%" rotate={-3} delay="-6s">
            <div className="w-36 space-y-1.5">
              {[[72,"#6366f1"],[48,"#a855f7"],[91,"#22c55e"]].map(([v,c],i)=>(
                <div key={i}>
                  <div className="flex justify-between text-[8px] text-foreground-subtle mb-0.5">
                    <span>Task {i+1}</span><span>{v}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-background-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{width:`${v}%`,background:c as string}}/>
                  </div>
                </div>
              ))}
            </div>
          </LiveCard>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-10" style={{background:"linear-gradient(to bottom,transparent,var(--background))"}}/>

        {/* CONTENT */}
        <div className="relative z-20 text-center max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">

          {/* eyebrow */}
          <div className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/60 bg-surface/60 backdrop-blur-sm text-xs font-semibold text-foreground-muted"
            style={{animation:"text-clip-reveal 0.8s cubic-bezier(0.77,0,0.18,1) both 0.2s"}}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"/>
              Aktif geliştirme
            </span>
            <span className="w-px h-3 bg-border"/>
            <span className="text-primary font-bold">90+ bileşen</span>
            <span className="w-px h-3 bg-border"/>
            <span>v0.1-beta</span>
          </div>

          {/* MEGA headline */}
          <h1 className="font-black leading-none tracking-[-0.05em] mb-2 select-none" style={{fontSize:"clamp(3.5rem,11vw,9rem)"}}>
            <SplitTitle text="Kişisel" className="block text-foreground" />
          </h1>
          <h1 className="font-black leading-none tracking-[-0.05em] mb-8 select-none" style={{fontSize:"clamp(3.5rem,11vw,9rem)"}}>
            <SplitTitle text="UI Kütüphanesi" className="block" />
            <span className="block" style={{
              background:"linear-gradient(135deg,#6366f1 0%,#a855f7 30%,#ec4899 60%,#f43f5e 100%)",
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
              animation:"text-clip-reveal 0.9s cubic-bezier(0.77,0,0.18,1) both 0.5s",
              fontSize:"clamp(3.5rem,11vw,9rem)",lineHeight:1,
            }}>
              &nbsp;
            </span>
          </h1>

          {/* Sub / typewriter */}
          <p className="text-xl sm:text-2xl text-foreground-muted font-medium mb-10 min-h-[2rem]"
            style={{animation:"text-clip-reveal 0.7s cubic-bezier(0.77,0,0.18,1) both 0.7s"}}>
            <TW words={[
              "Butonu bir kez yaz, her yerde kullan.",
              "Tailwind v4 ile sıfırdan inşa edildi.",
              "Dark mode. Her zaman. Hazır.",
              "90+ bileşen, sıfır bağımlılık.",
            ]}/>
          </p>

          {/* CTA */}
          <div className="flex flex-wrap justify-center gap-3 mb-14"
            style={{animation:"text-clip-reveal 0.7s cubic-bezier(0.77,0,0.18,1) both 0.9s"}}>
            <MagneticButton strength={16} className="rounded-xl overflow-hidden">
              <Link href="/showcase" className="relative flex items-center gap-2 font-bold px-8 py-3.5 text-white text-base rounded-xl overflow-hidden"
                style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}}>
                <span className="relative z-10 flex items-center gap-2">
                  Showcase&apos;i Keşfet
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            </MagneticButton>

            <MagneticButton strength={12} className="rounded-xl">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 font-semibold px-8 py-3.5 rounded-xl border border-border bg-surface/80 backdrop-blur-sm text-foreground text-base hover:border-primary/40 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            </MagneticButton>
          </div>

          {/* Stack pills */}
          <div className="flex flex-wrap justify-center gap-2" style={{animation:"text-clip-reveal 0.7s cubic-bezier(0.77,0,0.18,1) both 1.1s"}}>
            {[["Next.js 15","#fff"],["React 19","#61dafb"],["Tailwind v4","#38bdf8"],["TypeScript","#3b82f6"],["CVA","#818cf8"],["Geist","#a1a1aa"]].map(([n,c])=>(
              <span key={n} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border border-border/60 bg-surface/50 backdrop-blur-sm text-foreground-muted">
                <span className="w-1.5 h-1.5 rounded-full" style={{background:c}}/>
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-foreground-subtle">Scroll</span>
          <div className="w-px h-12 overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent" style={{animation:"scroll-hint 1.4s ease-in-out infinite"}}/>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MARQUEE 1 — component names
      ════════════════════════════════════════════════════ */}
      <div className="border-y border-border py-4 bg-background-subtle/30 overflow-hidden">
        <Marquee speed={50} pauseOnHover gap={16} fade>
          {NAMES.map(name=>(
            <span key={name} className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-3 py-1.5 rounded-full border border-border bg-surface text-foreground-muted hover:border-primary/40 hover:text-primary transition-colors cursor-default">
              <span className="w-1.5 h-1.5 rounded-full" style={{background:COLORS[name]??"#6366f1"}}/>
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ════════════════════════════════════════════════════
          STATS — beam bg
      ════════════════════════════════════════════════════ */}
      <section className="relative border-b border-border overflow-hidden py-28 px-4">
        <BgAnimation type="beam" className="absolute inset-0 opacity-20 dark:opacity-30"/>
        <div className="relative z-10 max-w-4xl mx-auto">
          <Reveal direction="up" duration={700}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              <Stat n={90} suf="+" label="Bileşen" color="#6366f1"/>
              <Stat n={10} suf="" label="Kategori" color="#a855f7"/>
              <Stat n={16} suf="" label="Şablon" color="#ec4899"/>
              <Stat n={40} suf="+" label="Token" color="#3b82f6"/>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SHOWCASE GRID — canlı bileşen önizlemeleri
      ════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-28">
        <Reveal direction="up" duration={600}>
          <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground-subtle mb-3">Bileşen Vitrini</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] text-foreground leading-tight">
                Her şeyi içinde<br/>
                <ShimmerText shimmerColor="rgba(99,102,241,0.9)" speed={3} className="font-black text-4xl sm:text-5xl">
                  barındırır
                </ShimmerText>
              </h2>
            </div>
            <Link href="/showcase" className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
              Tümünü gör
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHOWCASE.map((item, idx) => (
            <Reveal key={item.name} direction="up" delay={idx * 80} duration={600}>
              <div
                className={`group relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${item.wide?"lg:col-span-2":""}`}
                style={{gridColumn: item.wide && idx===0 ? "1/-1" : item.wide && idx===5 ? "1/-1" : undefined}}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{background:`radial-gradient(circle at 50% 0%,${item.accent}12,transparent 60%)`}}/>
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{background:`linear-gradient(90deg,transparent,${item.accent},transparent)`}}/>

                <div className="p-5">
                  <div className="mb-4">{item.preview}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-foreground-subtle mt-0.5">{item.sub}</p>
                    </div>
                    <div className="w-7 h-7 rounded-lg border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{background:`${item.accent}15`}}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={item.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FEATURES — horizontal cards with number
      ════════════════════════════════════════════════════ */}
      <section className="border-t border-border bg-background-subtle/30 py-28 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Reveal direction="up" duration={600}>
            <div className="mb-16 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-foreground-subtle mb-3">Neden bu kütüphane?</p>
              <h2 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] text-foreground">
                Detaylar önemlidir
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <Reveal key={f.num} direction="up" delay={i * 100} duration={600}>
                <div className={`group relative h-full rounded-2xl border border-border bg-gradient-to-br ${f.bg} p-6 overflow-hidden transition-all duration-300 hover:border-[${f.accent}]/40 hover:-translate-y-1 hover:shadow-xl`}>
                  {/* Number watermark */}
                  <span className="absolute -top-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none"
                    style={{color:`${f.accent}08`}}>
                    {f.num}
                  </span>
                  <div className="relative">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{color:f.accent}}>{f.num}</div>
                    <h3 className="text-lg font-black text-foreground mb-2 tracking-tight">{f.title}</h3>
                    <p className="text-sm text-foreground-muted leading-relaxed mb-5">{f.body}</p>
                    <div className="rounded-xl border border-border/40 bg-background/60 backdrop-blur-sm p-3 overflow-hidden">
                      {f.visual}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MARQUEE 2 — reverse direction
      ════════════════════════════════════════════════════ */}
      <div className="border-y border-border py-4 overflow-hidden">
        <Marquee speed={35} reverse pauseOnHover gap={16} fade>
          {[...NAMES].reverse().map(name=>(
            <span key={name} className="shrink-0 text-[11px] font-mono font-medium px-3 py-1.5 rounded-full text-foreground-subtle border border-border/60 hover:border-primary/40 hover:text-primary transition-colors cursor-default">{name}</span>
          ))}
        </Marquee>
      </div>

      {/* ════════════════════════════════════════════════════
          CTA — meteor + circuit
      ════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 py-32">
        <div className="max-w-5xl mx-auto">
          <Reveal direction="up" duration={700}>
            <div className="relative rounded-3xl overflow-hidden border border-border">
              {/* bg animations stack */}
              <BgAnimation type="circuit" className="absolute inset-0 opacity-40"/>
              <BgAnimation type="meteor" className="absolute inset-0 opacity-30"/>
              <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(99,102,241,0.1),rgba(168,85,247,0.06),rgba(236,72,153,0.04))"}}/>

              {/* Top glow line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent 0%,#6366f1 30%,#a855f7 50%,#ec4899 70%,transparent 100%)"}}/>

              <div className="relative z-10 py-24 px-6 sm:px-16 text-center">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"/>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">Hazır mısın?</span>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"/>
                </div>

                <h2 className="text-4xl sm:text-6xl font-black tracking-[-0.04em] text-foreground mb-6 leading-tight">
                  Bileşenleri keşfetmeye<br/>
                  <span style={{background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                    başla
                  </span>
                </h2>

                <p className="text-lg text-foreground-muted max-w-lg mx-auto mb-12">
                  Canlı önizleme, kod örnekleri ve tam dökümanlarla 90+ bileşen seni bekliyor.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <MagneticButton strength={18} className="rounded-2xl">
                    <Link href="/showcase"
                      className="relative flex items-center gap-2.5 font-black px-10 py-4 rounded-2xl text-white text-lg overflow-hidden"
                      style={{background:"linear-gradient(135deg,#6366f1,#a855f7,#ec4899)",backgroundSize:"200% 200%",animation:"gradient-x 3s ease infinite"}}>
                      <span className="relative z-10 flex items-center gap-2.5">
                        Showcase&apos;e Git
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                      </span>
                    </Link>
                  </MagneticButton>
                </div>

                {/* Floating dot rings */}
                <div aria-hidden className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
                  {[1,2,3].map(i=>(
                    <div key={i} className="absolute rounded-full border border-primary/20" style={{
                      width:i*80,height:i*80,top:`-${i*40}px`,left:`-${i*40}px`,
                      animation:`pulse-ring ${1.5+i*0.5}s ease-out infinite ${i*0.4}s`,
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <footer className="border-t border-border/60 bg-surface/20 px-4 sm:px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-xs" style={{background:"linear-gradient(135deg,#6366f1,#a855f7)"}}>U</div>
            <div>
              <p className="font-bold text-sm text-foreground">UI Library</p>
              <p className="text-xs text-foreground-subtle">Emirhan Durmuş · 2026</p>
            </div>
          </div>
          <p className="text-xs text-foreground-subtle text-center">
            Next.js 15 · React 19 · Tailwind CSS v4 · TypeScript · CVA
          </p>
          <div className="flex gap-4 text-xs text-foreground-subtle">
            <Link href="/showcase" className="hover:text-foreground transition-colors">Showcase</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
