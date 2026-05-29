"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────
   BgAnimation — 12 farklı saf CSS/Canvas arka plan animasyonu
   Harici bağımlılık yok. Her animasyon kendi stil bloğunu inject eder.
───────────────────────────────────────────────────────────────── */

export type BgAnimationType =
  | "particles"      // Yüzen nokta parçacıkları
  | "aurora"         // Aurora / Northern Lights yumuşak blob'lar
  | "grid-pulse"     // Yanıp sönen ızgara
  | "wave"           // Yatay dalgalar
  | "gradient-shift" // Renk geçişi döngüsü
  | "bubbles"        // Kabarcık efekti
  | "meteor"         // Meteor yağmuru
  | "noise-drift"    // Drift eden gürültü gradyanı
  | "beam"           // Işın tarama efekti
  | "matrix"         // Yağmur damlası (matrix tarzı)
  | "circuit"        // Devre panosu nabzı
  | "confetti-rain"; // Rengarenk confetti yağmuru

export interface BgAnimationProps {
  type: BgAnimationType;
  /** Wrapper className — pozisyon, boyut, overflow buradan */
  className?: string;
  /** İçerik — animasyonun önünde görünür */
  children?: React.ReactNode;
  /** Animasyonu durdur */
  paused?: boolean;
}

/* ─── Inject-once helper ──────────────────────────────────────── */

const injected = new Set<string>();
function injectStyle(id: string, css: string) {
  if (injected.has(id) || typeof document === "undefined") return;
  injected.add(id);
  const el = document.createElement("style");
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

/* ═══════════════════════════════════════════════════════════════
   1. PARTICLES — Yüzen nokta parçacıkları
═══════════════════════════════════════════════════════════════ */

const PARTICLES_CSS = `
@keyframes bga-float-1 { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-30px) translateX(15px)} 66%{transform:translateY(10px) translateX(-20px)} }
@keyframes bga-float-2 { 0%,100%{transform:translateY(0) translateX(0)} 40%{transform:translateY(-20px) translateX(-25px)} 70%{transform:translateY(15px) translateX(10px)} }
@keyframes bga-float-3 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(25px) translateX(20px)} }
.bga-particle { position:absolute; border-radius:50%; opacity:.35; animation-timing-function:ease-in-out; animation-iteration-count:infinite; pointer-events:none; }
`;

function ParticlesLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-particles", PARTICLES_CSS); }, []);
  const dots = [
    { size: 6, top: "10%", left: "15%", color: "#6366f1", anim: "bga-float-1", dur: "8s", delay: "0s" },
    { size: 4, top: "25%", left: "70%", color: "#a855f7", anim: "bga-float-2", dur: "11s", delay: "-3s" },
    { size: 10,top: "60%", left: "30%", color: "#6366f1", anim: "bga-float-3", dur: "9s",  delay: "-1s" },
    { size: 5, top: "80%", left: "65%", color: "#ec4899", anim: "bga-float-1", dur: "13s", delay: "-5s" },
    { size: 8, top: "40%", left: "85%", color: "#a855f7", anim: "bga-float-2", dur: "7s",  delay: "-2s" },
    { size: 3, top: "15%", left: "50%", color: "#6366f1", anim: "bga-float-3", dur: "10s", delay: "-4s" },
    { size: 7, top: "70%", left: "10%", color: "#ec4899", anim: "bga-float-1", dur: "12s", delay: "-6s" },
    { size: 4, top: "50%", left: "55%", color: "#a855f7", anim: "bga-float-2", dur: "6s",  delay: "-2s" },
    { size: 9, top: "90%", left: "40%", color: "#6366f1", anim: "bga-float-3", dur: "14s", delay: "-7s" },
    { size: 5, top: "35%", left: "20%", color: "#ec4899", anim: "bga-float-1", dur: "9s",  delay: "-3s" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="bga-particle"
          style={{
            width: d.size, height: d.size,
            top: d.top, left: d.left,
            background: d.color,
            animationName: d.anim,
            animationDuration: d.dur,
            animationDelay: d.delay,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. AURORA — Yumuşak blob gradyanlar (Northern Lights)
═══════════════════════════════════════════════════════════════ */

const AURORA_CSS = `
@keyframes bga-aurora-1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,-40px) scale(1.2)} }
@keyframes bga-aurora-2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-50px,60px) scale(0.85)} }
@keyframes bga-aurora-3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,30px) scale(1.1)} 66%{transform:translate(-30px,-20px) scale(0.9)} }
`;

function AuroraLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-aurora", AURORA_CSS); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div style={{ position:"absolute", width:"70%", height:"70%", top:"-10%", left:"-10%", borderRadius:"60% 40% 70% 30% / 50% 60% 40% 50%", background:"radial-gradient(ellipse, rgba(99,102,241,.55) 0%, transparent 70%)", filter:"blur(40px)", animation:`bga-aurora-1 12s ease-in-out infinite`, animationPlayState: paused ? "paused" : "running" }} />
      <div style={{ position:"absolute", width:"60%", height:"60%", bottom:"-15%", right:"-5%", borderRadius:"40% 60% 30% 70% / 60% 40% 60% 40%", background:"radial-gradient(ellipse, rgba(168,85,247,.5) 0%, transparent 70%)", filter:"blur(50px)", animation:`bga-aurora-2 15s ease-in-out infinite`, animationPlayState: paused ? "paused" : "running" }} />
      <div style={{ position:"absolute", width:"50%", height:"50%", top:"30%", left:"30%", borderRadius:"50% 50% 40% 60% / 40% 60% 50% 50%", background:"radial-gradient(ellipse, rgba(236,72,153,.4) 0%, transparent 70%)", filter:"blur(45px)", animation:`bga-aurora-3 10s ease-in-out infinite`, animationPlayState: paused ? "paused" : "running" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. GRID PULSE — Yanıp sönen ızgara
═══════════════════════════════════════════════════════════════ */

const GRID_PULSE_CSS = `
@keyframes bga-grid-pulse { 0%,100%{opacity:.08} 50%{opacity:.22} }
@keyframes bga-grid-dot { 0%,100%{opacity:.15} 50%{opacity:.6} }
`;

function GridPulseLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-grid-pulse", GRID_PULSE_CSS); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid lines */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)", backgroundSize:"40px 40px", animation:`bga-grid-pulse 4s ease-in-out infinite`, animationPlayState: paused ? "paused" : "running" }} />
      {/* Intersection dots */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle, var(--primary) 1.5px, transparent 1.5px)", backgroundSize:"40px 40px", backgroundPosition:"0 0", animation:`bga-grid-dot 4s ease-in-out infinite 2s`, animationPlayState: paused ? "paused" : "running" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. WAVE — Yatay SVG dalgalar
═══════════════════════════════════════════════════════════════ */

const WAVE_CSS = `
@keyframes bga-wave-move { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
`;

function WaveLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-wave", WAVE_CSS); }, []);
  // Two overlapping wave SVGs scrolling at different speeds
  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col justify-end">
      {[
        { color: "rgba(99,102,241,.25)", dur: "8s", bottom: "0", h: "40%" },
        { color: "rgba(168,85,247,.2)",  dur: "12s", bottom: "5%", h: "35%" },
        { color: "rgba(236,72,153,.15)", dur: "16s", bottom: "10%", h: "30%" },
      ].map((w, i) => (
        <div key={i} style={{ position:"absolute", bottom: w.bottom, left:0, width:"200%", height: w.h, animation:`bga-wave-move ${w.dur} linear infinite`, animationPlayState: paused ? "paused" : "running" }}>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width:"50%", height:"100%", float:"left" }}>
            <path d={`M0,100 C360,${180-i*20} 720,${20+i*20} 1440,100 L1440,200 L0,200 Z`} fill={w.color} />
          </svg>
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ width:"50%", height:"100%", float:"left" }}>
            <path d={`M0,100 C360,${180-i*20} 720,${20+i*20} 1440,100 L1440,200 L0,200 Z`} fill={w.color} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. GRADIENT SHIFT — Sürekli renk geçişi döngüsü
═══════════════════════════════════════════════════════════════ */

const GRADIENT_CSS = `
@keyframes bga-gradient { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
`;

function GradientShiftLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-gradient", GRADIENT_CSS); }, []);
  return (
    <div className="absolute inset-0" style={{ background:"linear-gradient(-45deg, #6366f1, #a855f7, #ec4899, #3b82f6, #06b6d4)", backgroundSize:"400% 400%", animation:`bga-gradient 10s ease infinite`, animationPlayState: paused ? "paused" : "running" }} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. BUBBLES — Yükselen kabarcıklar
═══════════════════════════════════════════════════════════════ */

const BUBBLES_CSS = `
@keyframes bga-rise { 0%{transform:translateY(110%) scale(.8);opacity:0} 10%{opacity:.6} 90%{opacity:.4} 100%{transform:translateY(-110%) scale(1.1);opacity:0} }
`;

function BubblesLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-bubbles", BUBBLES_CSS); }, []);
  const bubbles = [
    { size:20, left:"10%", dur:"7s", delay:"0s",  color:"rgba(99,102,241,.5)" },
    { size:14, left:"25%", dur:"9s", delay:"-2s", color:"rgba(168,85,247,.45)" },
    { size:30, left:"40%", dur:"6s", delay:"-4s", color:"rgba(236,72,153,.4)" },
    { size:10, left:"55%", dur:"11s",delay:"-1s", color:"rgba(99,102,241,.5)" },
    { size:22, left:"70%", dur:"8s", delay:"-6s", color:"rgba(168,85,247,.4)" },
    { size:16, left:"82%", dur:"10s",delay:"-3s", color:"rgba(59,130,246,.45)" },
    { size:12, left:"90%", dur:"7s", delay:"-5s", color:"rgba(6,182,212,.5)" },
    { size:25, left:"5%",  dur:"12s",delay:"-7s", color:"rgba(236,72,153,.35)" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {bubbles.map((b, i) => (
        <div
          key={i}
          style={{
            position:"absolute", bottom:"-10%", left:b.left,
            width:b.size, height:b.size,
            borderRadius:"50%",
            border:`2px solid ${b.color}`,
            background:b.color.replace(".5",",.15").replace(".45",",.12").replace(".4",",.1").replace(".35",",.08"),
            animation:`bga-rise ${b.dur} ease-in infinite ${b.delay}`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. METEOR — Meteor yağmuru
═══════════════════════════════════════════════════════════════ */

const METEOR_CSS = `
@keyframes bga-meteor { 0%{transform:translateX(0) translateY(0);opacity:1} 100%{transform:translateX(300px) translateY(300px);opacity:0} }
`;

function MeteorLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-meteor", METEOR_CSS); }, []);
  const meteors = [
    { top:"5%",  left:"20%", dur:"2s",  delay:"0s",   len:80 },
    { top:"15%", left:"60%", dur:"2.5s",delay:"-0.5s",len:60 },
    { top:"30%", left:"10%", dur:"1.8s",delay:"-1.2s",len:100 },
    { top:"50%", left:"75%", dur:"3s",  delay:"-0.8s",len:70 },
    { top:"10%", left:"45%", dur:"2.2s",delay:"-1.5s",len:90 },
    { top:"65%", left:"30%", dur:"2.8s",delay:"-0.3s",len:65 },
    { top:"80%", left:"55%", dur:"2s",  delay:"-2s",  len:75 },
    { top:"20%", left:"85%", dur:"1.6s",delay:"-1s",  len:110 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteors.map((m, i) => (
        <div
          key={i}
          style={{
            position:"absolute", top:m.top, left:m.left,
            animation:`bga-meteor ${m.dur} linear infinite ${m.delay}`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          <div style={{ width:m.len, height:1.5, background:"linear-gradient(90deg, rgba(255,255,255,0.9), transparent)", borderRadius:4, transform:"rotate(45deg)" }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. NOISE DRIFT — Drift eden gürültü gradyanı
═══════════════════════════════════════════════════════════════ */

const NOISE_CSS = `
@keyframes bga-drift-1 { 0%,100%{transform:translate(0,0) rotate(0deg)} 33%{transform:translate(40px,30px) rotate(120deg)} 66%{transform:translate(-30px,50px) rotate(240deg)} }
@keyframes bga-drift-2 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(-60px,-40px) rotate(180deg)} }
`;

function NoiseDriftLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-noise", NOISE_CSS); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div style={{ position:"absolute", width:"120%", height:"120%", top:"-10%", left:"-10%", background:"conic-gradient(from 0deg, #6366f1 0%, #a855f7 25%, #ec4899 50%, #3b82f6 75%, #6366f1 100%)", filter:"blur(80px)", opacity:.5, animation:`bga-drift-1 20s linear infinite`, animationPlayState: paused ? "paused" : "running" }} />
      <div style={{ position:"absolute", width:"80%", height:"80%", top:"10%", left:"10%", background:"radial-gradient(ellipse at center, rgba(6,182,212,.6) 0%, rgba(99,102,241,.4) 50%, transparent 70%)", filter:"blur(50px)", animation:`bga-drift-2 14s ease-in-out infinite`, animationPlayState: paused ? "paused" : "running" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. BEAM — Işın tarama efekti
═══════════════════════════════════════════════════════════════ */

const BEAM_CSS = `
@keyframes bga-beam-h { 0%{transform:translateX(-100%)} 100%{transform:translateX(100vw)} }
@keyframes bga-beam-v { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
`;

function BeamLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-beam", BEAM_CSS); }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Horizontal beams */}
      {[
        { top:"20%", dur:"4s", delay:"0s", w:200, opacity:.6 },
        { top:"50%", dur:"6s", delay:"-2s", w:120, opacity:.4 },
        { top:"75%", dur:"5s", delay:"-1s", w:160, opacity:.5 },
      ].map((b, i) => (
        <div key={`h${i}`} style={{ position:"absolute", top:b.top, left:0, height:1.5, width:"100%", overflow:"hidden", animation:"none" }}>
          <div style={{ position:"absolute", height:"100%", width:b.w, background:`linear-gradient(90deg, transparent, rgba(99,102,241,${b.opacity}), rgba(168,85,247,${b.opacity}), transparent)`, animation:`bga-beam-h ${b.dur} linear infinite ${b.delay}`, animationPlayState: paused ? "paused" : "running" }} />
        </div>
      ))}
      {/* Vertical beams */}
      {[
        { left:"30%", dur:"7s", delay:"-3s", h:150, opacity:.4 },
        { left:"65%", dur:"5s", delay:"-1s", h:100, opacity:.5 },
      ].map((b, i) => (
        <div key={`v${i}`} style={{ position:"absolute", left:b.left, top:0, width:1.5, height:"100%", overflow:"hidden" }}>
          <div style={{ position:"absolute", width:"100%", height:b.h, background:`linear-gradient(180deg, transparent, rgba(236,72,153,${b.opacity}), rgba(99,102,241,${b.opacity}), transparent)`, animation:`bga-beam-v ${b.dur} linear infinite ${b.delay}`, animationPlayState: paused ? "paused" : "running" }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. MATRIX — Düşen semboller (canvas)
═══════════════════════════════════════════════════════════════ */

function MatrixLayer({ paused }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const chars = "01アイウエオカキクケコサシスセソタチツテト";
    const fontSize = 13;
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);

    let raf: number;
    let last = 0;
    const interval = 80;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (pausedRef.current) return;
      if (now - last < interval) return;
      last = now;

      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(0);

      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.95;
        ctx.fillStyle = bright ? "#ffffff" : `rgba(99,102,241,${0.4 + Math.random() * 0.4})`;
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ═══════════════════════════════════════════════════════════════
   11. CIRCUIT — Devre panosu nabzı (canvas)
═══════════════════════════════════════════════════════════════ */

function CircuitLayer({ paused }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      buildLines();
    };

    type Line = { x1:number; y1:number; x2:number; y2:number; progress:number; speed:number; color:string; };
    let lines: Line[] = [];

    const colors = ["rgba(99,102,241,", "rgba(168,85,247,", "rgba(6,182,212,", "rgba(236,72,153,"];

    const buildLines = () => {
      lines = [];
      const grid = 40;
      const cw = canvas.width, ch = canvas.height;
      for (let x = 0; x < cw; x += grid) {
        for (let y = 0; y < ch; y += grid) {
          if (Math.random() > 0.55) continue;
          const horiz = Math.random() > 0.5;
          const len = grid * (1 + Math.floor(Math.random() * 3));
          const col = colors[Math.floor(Math.random() * colors.length)];
          lines.push({ x1: x, y1: y, x2: horiz ? x + len : x, y2: horiz ? y : y + len, progress: Math.random(), speed: 0.004 + Math.random() * 0.008, color: col });
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf: number;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (pausedRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const l of lines) {
        l.progress += l.speed;
        if (l.progress > 1) l.progress = 0;

        const alpha = Math.sin(l.progress * Math.PI);
        ctx.strokeStyle = `${l.color}${(alpha * 0.7).toFixed(2)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.stroke();

        // Pulse dot
        const px = l.x1 + (l.x2 - l.x1) * l.progress;
        const py = l.y1 + (l.y2 - l.y1) * l.progress;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${l.color}${Math.min(1, alpha * 1.5).toFixed(2)})`;
        ctx.fill();
      }
    };

    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ═══════════════════════════════════════════════════════════════
   12. CONFETTI RAIN — Rengarenk konfeti yağmuru
═══════════════════════════════════════════════════════════════ */

const CONFETTI_CSS = `
@keyframes bga-confetti-fall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(110vh) rotate(720deg);opacity:0} }
`;

function ConfettiRainLayer({ paused }: { paused?: boolean }) {
  useEffect(() => { injectStyle("bga-confetti", CONFETTI_CSS); }, []);
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    left: `${(i * 3.5) % 100}%`,
    dur: `${4 + (i % 5)}s`,
    delay: `-${(i * 0.4) % 5}s`,
    size: 6 + (i % 6),
    color: ["#6366f1","#a855f7","#ec4899","#3b82f6","#06b6d4","#f59e0b","#22c55e"][i % 7],
    shape: i % 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position:"absolute", top:"-5%", left:p.left,
            width:p.size, height:p.shape === 2 ? p.size : p.size * 0.5,
            background:p.color,
            borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "1px",
            opacity:.8,
            animation:`bga-confetti-fall ${p.dur} linear infinite ${p.delay}`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Ana bileşen — type'a göre doğru layer'ı render et
═══════════════════════════════════════════════════════════════ */

const LAYER_MAP: Record<BgAnimationType, React.ComponentType<{ paused?: boolean }>> = {
  particles:       ParticlesLayer,
  aurora:          AuroraLayer,
  "grid-pulse":    GridPulseLayer,
  wave:            WaveLayer,
  "gradient-shift":GradientShiftLayer,
  bubbles:         BubblesLayer,
  meteor:          MeteorLayer,
  "noise-drift":   NoiseDriftLayer,
  beam:            BeamLayer,
  matrix:          MatrixLayer,
  circuit:         CircuitLayer,
  "confetti-rain": ConfettiRainLayer,
};

export function BgAnimation({ type, className, children, paused }: BgAnimationProps) {
  const Layer = LAYER_MAP[type];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Layer paused={paused} />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}
