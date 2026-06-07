"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Spinner } from "@/components/ui/spinner";`;

function LabeledItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="text-xs text-foreground-muted">{label}</span>
    </div>
  );
}

/* ─── Estetik Animasyonlar ───────────────────────────────────── */

function GradientRing() {
  return (
    <div
      className="size-10 rounded-full"
      style={{
        background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)",
        animation: "kf-spin 1.2s linear infinite",
        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
      }}
    />
  );
}

function NeonPulse() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="size-4 rounded-full bg-cyan-400"
        style={{ animation: "kf-neon-pulse 1.2s ease-in-out infinite" }}
      />
      <div
        className="absolute size-4 rounded-full bg-cyan-400 opacity-50"
        style={{ animation: "kf-neon-ping 1.2s ease-out infinite" }}
      />
    </div>
  );
}

function AuroraBlob() {
  return (
    <div className="relative size-12 overflow-hidden rounded-full">
      <div
        className="absolute inset-0 rounded-full opacity-80"
        style={{
          background: "radial-gradient(ellipse at 30% 40%, #818cf8 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #e879f9 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, #34d399 0%, transparent 70%)",
          animation: "kf-aurora 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-1 rounded-full"
        style={{ background: "var(--color-surface, #fff)", opacity: 0.2 }}
      />
    </div>
  );
}

function MorphingBlob() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44">
      <path
        fill="#6366f1"
        style={{ animation: "kf-morph 3s ease-in-out infinite" }}
        d="M22,8 C28,8 36,12 36,22 C36,32 30,36 22,36 C14,36 8,30 8,22 C8,14 16,8 22,8 Z"
      />
    </svg>
  );
}

/* ─── Sade Animasyonlar ──────────────────────────────────────── */

function LineSweep() {
  return (
    <div className="relative w-16 h-1 bg-foreground/10 rounded-full overflow-hidden">
      <div
        className="absolute inset-y-0 w-8 rounded-full bg-primary"
        style={{ animation: "kf-sweep 1.4s ease-in-out infinite" }}
      />
    </div>
  );
}

function DotsFade() {
  return (
    <span className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-2 rounded-full bg-foreground-muted"
          style={{ animation: `kf-fade 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </span>
  );
}

function ThinRing() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" className="opacity-15 text-foreground" />
      <circle
        cx="18" cy="18" r="15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="20 74"
        className="text-primary"
        style={{ animation: "kf-spin 1s linear infinite", transformOrigin: "center" }}
      />
    </svg>
  );
}

function TypingCursor() {
  return (
    <div className="flex items-center gap-1 text-sm text-foreground-muted font-mono">
      <span>yükleniyor</span>
      <span
        className="inline-block w-px h-4 bg-primary"
        style={{ animation: "kf-blink 0.9s step-end infinite" }}
      />
    </div>
  );
}

/* ─── Modern Animasyonlar ────────────────────────────────────── */

// Precalculated segment paths to avoid floating point hydration mismatch
const SEGMENT_PATHS = (() => {
  const segments = 8;
  return Array.from({ length: segments }).map((_, i) => {
    const angle = (i / segments) * 360;
    const rad = (angle - 90) * (Math.PI / 180);
    const x1 = (20 + 14 * Math.cos(rad)).toFixed(4);
    const y1 = (20 + 14 * Math.sin(rad)).toFixed(4);
    const rad2 = ((angle + 360 / segments - 5) - 90) * (Math.PI / 180);
    const x2 = (20 + 14 * Math.cos(rad2)).toFixed(4);
    const y2 = (20 + 14 * Math.sin(rad2)).toFixed(4);
    return `M ${x1} ${y1} A 14 14 0 0 1 ${x2} ${y2}`;
  });
})();

function SegmentedArc({ color = "currentColor", className = "text-primary" }: { color?: string; className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {SEGMENT_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color === "currentColor" ? "currentColor" : color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          className={color === "currentColor" ? className : undefined}
          style={{
            opacity: 0.15,
            animation: `kf-segment-glow 1.6s ease-in-out ${(i * 1.6 / 8).toFixed(3)}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

function HelixDots() {
  return (
    <div className="relative size-10 flex items-center justify-center">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="absolute size-3 rounded-full bg-primary"
          style={{
            animation: `kf-helix-${i === 0 ? "a" : "b"} 1.4s ease-in-out infinite`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function RippleStack() {
  return (
    <div className="relative size-12 flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-primary"
          style={{
            inset: 0,
            animation: `kf-ripple 1.8s ease-out ${i * 0.5}s infinite`,
            opacity: 0,
          }}
        />
      ))}
      <div className="size-3 rounded-full bg-primary" />
    </div>
  );
}

function ProgressShimmer() {
  return (
    <div className="w-24 h-2 bg-foreground/10 rounded-full overflow-hidden relative">
      <div
        className="absolute inset-y-0 w-1/2 rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)",
          animation: "kf-shimmer 1.4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ─── Eğlenceli Animasyonlar ─────────────────────────────────── */

function BouncingBall() {
  return (
    <div className="flex flex-col items-center gap-0" style={{ height: 60 }}>
      <div
        className="size-6 rounded-full bg-primary shadow-lg"
        style={{
          animation: "kf-ball-bounce 0.7s cubic-bezier(0.33,0,0.66,0) infinite alternate",
          marginTop: 4,
        }}
      />
      <div
        className="w-5 h-1.5 rounded-full bg-foreground/20 mt-1"
        style={{ animation: "kf-ball-shadow 0.7s ease-in-out infinite alternate" }}
      />
    </div>
  );
}

function PacMan() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      <path
        fill="#f59e0b"
        style={{ animation: "kf-pacman 0.5s linear infinite" }}
        d="M20,20 L20,2 A18,18 0 1 1 20,20 Z"
      />
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={32 - i * 6}
          cy="20"
          r="2"
          fill="#f59e0b"
          style={{
            animation: `kf-pellet 0.5s linear ${i * 0.1}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </svg>
  );
}

function RubberDots() {
  return (
    <span className="flex items-end gap-1.5" style={{ height: 28 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-3 rounded-full bg-primary"
          style={{
            animation: `kf-rubber 0.8s cubic-bezier(0.36,0,0.64,1) ${i * 0.12}s infinite`,
            height: 12,
          }}
        />
      ))}
    </span>
  );
}

function FlipCard() {
  return (
    <div
      className="size-10 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold"
      style={{ animation: "kf-flip 1.2s ease-in-out infinite", perspective: 200 }}
    >
      UI
    </div>
  );
}

// Precalculated star positions (50 + 42 * cos/sin for 4 points at 0°,90°,180°,270°)
const STAR_POS = [
  { x: "50%", y: "8%" },
  { x: "92%", y: "50%" },
  { x: "50%", y: "92%" },
  { x: "8%",  y: "50%" },
];

function SpinningStars() {
  return (
    <div className="relative size-10 flex items-center justify-center">
      <div className="absolute size-full" style={{ animation: "kf-spin 2s linear infinite" }}>
        {STAR_POS.map((pos, i) => (
          <div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%,-50%)",
              fontSize: i % 2 === 0 ? 10 : 7,
              animation: `kf-star-twinkle 1s ease-in-out ${i * 0.25}s infinite`,
            }}
          >
            ★
          </div>
        ))}
      </div>
      <div className="size-2 rounded-full bg-yellow-400" />
    </div>
  );
}

/* ─── Etkileyici Animasyonlar ────────────────────────────────── */

function WaveBars() {
  return (
    <span className="flex items-center gap-1" style={{ height: 40 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="w-1.5 rounded-full bg-primary"
          style={{
            animation: `kf-wave 1s ease-in-out ${i * 0.1}s infinite`,
            height: 8,
          }}
        />
      ))}
    </span>
  );
}

function OrbitSpinner() {
  return (
    <div className="relative size-12 flex items-center justify-center">
      <div className="size-4 rounded-full bg-primary opacity-30" />
      <div
        className="absolute size-full rounded-full"
        style={{ animation: "kf-spin 1.2s linear infinite" }}
      >
        <div
          className="absolute size-3 rounded-full bg-primary shadow-lg"
          style={{ top: 0, left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}

function DNAHelix() {
  const points = 6;
  return (
    <div className="relative flex gap-3 items-center" style={{ height: 40 }}>
      {Array.from({ length: points }).map((_, i) => {
        const delay = i * (1 / points);
        return (
          <div key={i} className="relative flex flex-col items-center justify-center" style={{ height: 40 }}>
            <div
              className="size-2.5 rounded-full bg-primary"
              style={{
                animation: `kf-dna-top 1.2s ease-in-out ${delay}s infinite`,
                position: "absolute",
              }}
            />
            <div
              className="size-2.5 rounded-full bg-purple-400"
              style={{
                animation: `kf-dna-bot 1.2s ease-in-out ${delay}s infinite`,
                position: "absolute",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function MatrixRain() {
  const chars = ["0", "1", "A", "Z", "9", "3", "X", "7", "F", "2", "B", "8"];
  const cols = 5;
  return (
    <div className="relative overflow-hidden rounded-lg bg-black" style={{ width: 60, height: 48 }}>
      {Array.from({ length: cols }).map((_, col) => (
        <div
          key={col}
          className="absolute top-0 text-green-400 font-mono text-xs leading-none"
          style={{
            left: col * 12,
            animation: `kf-matrix 1.2s linear ${col * 0.15}s infinite`,
          }}
        >
          {chars.slice(col * 2, col * 2 + 4).map((c, j) => (
            <div key={j} style={{ opacity: 1 - j * 0.25 }}>{c}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Gerçek Kullanım: Etkileşimli ──────────────────────────── */

type ApiState = "idle" | "loading" | "success" | "error";

function ApiSimDemo() {
  const [state, setState] = useState<ApiState>("idle");

  function simulate(result: "success" | "error") {
    setState("loading");
    setTimeout(() => setState(result), 1800);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative flex items-center justify-center size-16 rounded-full border-2 transition-all duration-500"
        style={{
          borderColor:
            state === "success" ? "var(--color-success, #22c55e)" :
            state === "error" ? "var(--color-danger, #ef4444)" :
            "var(--color-border, #e5e7eb)",
        }}
      >
        {state === "idle" && <span className="text-2xl text-foreground-muted">⏳</span>}
        {state === "loading" && <Spinner size="lg" variant="ring" />}
        {state === "success" && <span className="text-2xl" style={{ animation: "kf-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>✅</span>}
        {state === "error" && <span className="text-2xl" style={{ animation: "kf-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>❌</span>}
      </div>
      <p className="text-sm text-foreground-muted text-center">
        {state === "idle" && "Butona bas ve API çağrısını simüle et"}
        {state === "loading" && "Sunucuya bağlanılıyor..."}
        {state === "success" && "Veri başarıyla alındı!"}
        {state === "error" && "Bağlantı hatası oluştu."}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => simulate("success")}
          disabled={state === "loading"}
          className="px-3 py-1.5 rounded-[var(--radius-md)] bg-primary text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Başarı simüle et
        </button>
        <button
          onClick={() => simulate("error")}
          disabled={state === "loading"}
          className="px-3 py-1.5 rounded-[var(--radius-md)] bg-danger text-white text-xs font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Hata simüle et
        </button>
        {(state === "success" || state === "error") && (
          <button
            onClick={() => setState("idle")}
            className="px-3 py-1.5 rounded-[var(--radius-md)] border border-border text-foreground text-xs font-medium hover:bg-surface transition-colors"
          >
            Sıfırla
          </button>
        )}
      </div>
    </div>
  );
}

function MultiStepDemo() {
  const steps = [
    { label: "Bağlanıyor", spinner: <Spinner variant="ring" size="sm" /> },
    { label: "Doğrulanıyor", spinner: <Spinner variant="dots" size="sm" /> },
    { label: "Kaydediliyor", spinner: <Spinner variant="bars" size="sm" /> },
  ];
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  function nextStep() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStep(0);
    setDone(false);
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      {steps.map((s, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="size-7 flex items-center justify-center rounded-full border-2 border-border shrink-0"
            style={{
              borderColor: i < step || done ? "var(--color-success, #22c55e)" : i === step && !done ? "var(--color-primary, #6366f1)" : undefined,
              background: i < step || done ? "var(--color-success, #22c55e)" : "transparent",
            }}
          >
            {(i < step || done)
              ? <span className="text-white text-xs">✓</span>
              : i === step && !done
                ? s.spinner
                : <span className="text-xs text-foreground-muted">{i + 1}</span>
            }
          </div>
          <span className={`text-sm ${i === step && !done ? "text-foreground font-medium" : i < step || done ? "text-foreground-muted line-through" : "text-foreground-muted"}`}>
            {s.label}
          </span>
        </div>
      ))}
      {!done ? (
        <button
          onClick={nextStep}
          className="mt-1 px-4 py-1.5 rounded-[var(--radius-md)] bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity"
        >
          Sonraki adım
        </button>
      ) : (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-success font-medium">Tamamlandı!</span>
          <button onClick={reset} className="text-xs text-foreground-muted underline underline-offset-2">
            Tekrar dene
          </button>
        </div>
      )}
    </div>
  );
}

function LoadingButtonDemo() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaving(true);
    setSaved(false);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 2000);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 h-10 px-5 rounded-[var(--radius-md)] bg-primary text-white text-sm font-medium disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition-all"
        style={{ minWidth: 140 }}
      >
        {saving ? (
          <>
            <Spinner size="sm" color="white" />
            Kaydediliyor...
          </>
        ) : saved ? (
          <>
            <span>✓</span>
            Kaydedildi!
          </>
        ) : (
          "Kaydet"
        )}
      </button>
      {saved && !saving && (
        <button onClick={() => setSaved(false)} className="text-xs text-foreground-muted underline underline-offset-2">
          Sıfırla
        </button>
      )}
    </div>
  );
}

/* ─── Ana Sayfa ──────────────────────────────────────────────── */

export default function SpinnerShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      {/* Keyframe Animations */}
      <style>{`
        @keyframes kf-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes kf-neon-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes kf-neon-ping {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes kf-aurora {
          0%, 100% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
          33%       { transform: rotate(120deg) scale(1.1); filter: hue-rotate(60deg); }
          66%       { transform: rotate(240deg) scale(0.95); filter: hue-rotate(120deg); }
        }
        @keyframes kf-morph {
          0%, 100% { d: path("M22,8 C28,8 36,12 36,22 C36,32 30,36 22,36 C14,36 8,30 8,22 C8,14 16,8 22,8 Z"); }
          33%       { d: path("M22,6 C32,6 38,14 36,24 C34,34 28,38 20,36 C12,34 6,28 8,18 C10,8 16,6 22,6 Z"); }
          66%       { d: path("M24,8 C34,10 38,18 36,26 C34,34 26,40 16,36 C8,32 6,22 10,14 C14,6 18,6 24,8 Z"); }
        }
        @keyframes kf-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes kf-fade {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 1; }
        }
        @keyframes kf-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes kf-segment-glow {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 1; }
        }
        @keyframes kf-helix-a {
          0%   { transform: translateX(-10px) scale(1); }
          50%  { transform: translateX(10px) scale(0.6); }
          100% { transform: translateX(-10px) scale(1); }
        }
        @keyframes kf-helix-b {
          0%   { transform: translateX(10px) scale(0.6); }
          50%  { transform: translateX(-10px) scale(1); }
          100% { transform: translateX(10px) scale(0.6); }
        }
        @keyframes kf-ripple {
          0%   { transform: scale(0.3); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes kf-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes kf-ball-bounce {
          0%   { transform: scaleX(1)   scaleY(1)   translateY(0px); }
          80%  { transform: scaleX(1)   scaleY(1)   translateY(-28px); }
          100% { transform: scaleX(1.3) scaleY(0.7) translateY(0px); }
        }
        @keyframes kf-ball-shadow {
          0%   { transform: scaleX(1.3); opacity: 0.25; }
          80%  { transform: scaleX(0.5); opacity: 0.08; }
          100% { transform: scaleX(1.3); opacity: 0.25; }
        }
        @keyframes kf-pacman {
          0%, 100% { clip-path: polygon(50% 50%, 100% 15%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 85%); }
          50%       { clip-path: polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 50%); }
        }
        @keyframes kf-pellet {
          0%   { transform: translateX(0); opacity: 0.5; }
          50%  { transform: translateX(-6px); opacity: 1; }
          100% { transform: translateX(-12px); opacity: 0; }
        }
        @keyframes kf-rubber {
          0%, 100% { transform: scaleY(1) translateY(0); }
          30%       { transform: scaleY(1.6) translateY(-6px); }
          60%       { transform: scaleY(0.7) translateY(3px); }
        }
        @keyframes kf-flip {
          0%   { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
          50%  { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); }
          100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); }
        }
        @keyframes kf-star-twinkle {
          0%, 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
          50%       { opacity: 0.3; transform: translate(-50%,-50%) scale(0.6); }
        }
        @keyframes kf-wave {
          0%, 100% { height: 8px;  }
          50%       { height: 32px; }
        }
        @keyframes kf-dna-top {
          0%   { transform: translateY(-10px) scale(1); opacity: 1; }
          50%  { transform: translateY(10px) scale(0.5); opacity: 0.4; }
          100% { transform: translateY(-10px) scale(1); opacity: 1; }
        }
        @keyframes kf-dna-bot {
          0%   { transform: translateY(10px) scale(0.5); opacity: 0.4; }
          50%  { transform: translateY(-10px) scale(1); opacity: 1; }
          100% { transform: translateY(10px) scale(0.5); opacity: 0.4; }
        }
        @keyframes kf-matrix {
          0%   { transform: translateY(-100%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
        @keyframes kf-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Spinner</h1>
        <p className="text-sm text-foreground-muted">
          5 variant · 5 size · 7 renk · erişilebilir (role=status, sr-only label)
        </p>
      </div>

      {/* ── Mevcut Variants ── */}
      <ShowcaseSection
        title="Variants"
        description="circle, ring, dots, bars ve pulse animasyon çeşitleri."
        importLine={IMPORT}
        code={`<Spinner variant="circle" size="lg" />
<Spinner variant="ring"   size="lg" />
<Spinner variant="dots"   size="lg" />
<Spinner variant="bars"   size="lg" />
<Spinner variant="pulse"  size="lg" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
        <LabeledItem label="circle"><Spinner variant="circle" size="lg" /></LabeledItem>
        <LabeledItem label="ring"><Spinner variant="ring" size="lg" /></LabeledItem>
        <LabeledItem label="dots"><Spinner variant="dots" size="lg" /></LabeledItem>
        <LabeledItem label="bars"><Spinner variant="bars" size="lg" /></LabeledItem>
        <LabeledItem label="pulse"><Spinner variant="pulse" size="lg" /></LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sizes"
        description="xs, sm, md, lg ve xl boyut seçenekleri."
        importLine={IMPORT}
        code={`<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
        previewClassName="flex flex-wrap items-end gap-6"
      >
        <LabeledItem label="xs"><Spinner size="xs" /></LabeledItem>
        <LabeledItem label="sm"><Spinner size="sm" /></LabeledItem>
        <LabeledItem label="md"><Spinner size="md" /></LabeledItem>
        <LabeledItem label="lg"><Spinner size="lg" /></LabeledItem>
        <LabeledItem label="xl"><Spinner size="xl" /></LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Renkler"
        description="primary, secondary, success, danger, warning, current ve white renk seçenekleri."
        importLine={IMPORT}
        code={`<Spinner color="primary"   size="lg" />
<Spinner color="secondary" size="lg" />
<Spinner color="success"   size="lg" />
<Spinner color="danger"    size="lg" />
<Spinner color="warning"   size="lg" />
<Spinner color="current"   size="lg" className="text-pink-500" />`}
        previewClassName="flex flex-wrap items-center gap-6"
      >
        <LabeledItem label="primary">  <Spinner color="primary"   size="lg" /></LabeledItem>
        <LabeledItem label="secondary"><Spinner color="secondary" size="lg" /></LabeledItem>
        <LabeledItem label="success">  <Spinner color="success"   size="lg" /></LabeledItem>
        <LabeledItem label="danger">   <Spinner color="danger"    size="lg" /></LabeledItem>
        <LabeledItem label="warning">  <Spinner color="warning"   size="lg" /></LabeledItem>
        <LabeledItem label="current">  <Spinner color="current"   size="lg" className="text-pink-500" /></LabeledItem>
        <LabeledItem label="white">
          <div className="bg-primary rounded-lg p-2">
            <Spinner color="white" size="lg" />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      {/* ── KATEGORİ: ESTETİK ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Estetik
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="Gradient Ring"
        description="conic-gradient ile dönen çok renkli halka. Renk geçişleri animasyonla birleşince derinlik hissi verir."
        previewClassName="flex flex-wrap items-center justify-center gap-8 py-4"
        code={`<div
  className="size-10 rounded-full"
  style={{
    background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)",
    animation: "spin 1.2s linear infinite",
    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
    mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
  }}
/>`}
      >
        <LabeledItem label="sm">
          <div className="size-6 rounded-full" style={{ background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)", animation: "kf-spin 1.2s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 2px))" }} />
        </LabeledItem>
        <LabeledItem label="md">
          <GradientRing />
        </LabeledItem>
        <LabeledItem label="lg">
          <div className="size-16 rounded-full" style={{ background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #f59e0b, #6366f1)", animation: "kf-spin 1.2s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))" }} />
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Neon Pulse"
        description="Işıyan neon nokta: içten dışa genişleyen parlama halkasıyla dikkat çeken bir tasarım."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div className="relative flex items-center justify-center">
  <div
    className="size-4 rounded-full bg-cyan-400"
    style={{
      animation: "neon-pulse 1.2s ease-in-out infinite",
      boxShadow: "0 0 8px 3px #22d3ee",
    }}
  />
  <div
    className="absolute size-4 rounded-full bg-cyan-400 opacity-50"
    style={{ animation: "neon-ping 1.2s ease-out infinite" }}
  />
</div>`}
      >
        {[
          { color: "bg-cyan-400", shadow: "0 0 8px 3px #22d3ee" },
          { color: "bg-violet-400", shadow: "0 0 8px 3px #a78bfa" },
          { color: "bg-rose-400", shadow: "0 0 8px 3px #fb7185" },
          { color: "bg-emerald-400", shadow: "0 0 8px 3px #34d399" },
        ].map((neon, i) => (
          <LabeledItem key={i} label={["cyan", "violet", "rose", "emerald"][i]}>
            <div className="relative flex items-center justify-center">
              <div className={`size-4 rounded-full ${neon.color}`} style={{ animation: "kf-neon-pulse 1.2s ease-in-out infinite", boxShadow: neon.shadow }} />
              <div className={`absolute size-4 rounded-full ${neon.color} opacity-50`} style={{ animation: "kf-neon-ping 1.2s ease-out infinite" }} />
            </div>
          </LabeledItem>
        ))}
      </ShowcaseSection>

      <ShowcaseSection
        title="Aurora Blob"
        description="Birden fazla radial gradient katmanının dönerek renk değiştirdiği organik blob animasyonu."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div className="relative size-12 overflow-hidden rounded-full">
  <div
    className="absolute inset-0 rounded-full opacity-80"
    style={{
      background:
        "radial-gradient(ellipse at 30% 40%, #818cf8 0%, transparent 60%)," +
        "radial-gradient(ellipse at 70% 60%, #e879f9 0%, transparent 60%)," +
        "radial-gradient(ellipse at 50% 50%, #34d399 0%, transparent 70%)",
      animation: "aurora 3s ease-in-out infinite",
    }}
  />
</div>`}
      >
        <LabeledItem label="aurora">
          <AuroraBlob />
        </LabeledItem>
        <LabeledItem label="sunset">
          <div className="relative size-12 overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full opacity-80" style={{ background: "radial-gradient(ellipse at 30% 40%, #f97316 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #ec4899 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, #fbbf24 0%, transparent 70%)", animation: "kf-aurora 3s ease-in-out infinite" }} />
          </div>
        </LabeledItem>
        <LabeledItem label="ocean">
          <div className="relative size-12 overflow-hidden rounded-full">
            <div className="absolute inset-0 rounded-full opacity-80" style={{ background: "radial-gradient(ellipse at 30% 40%, #06b6d4 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #6366f1 0%, transparent 60%), radial-gradient(ellipse at 50% 50%, #0ea5e9 0%, transparent 70%)", animation: "kf-aurora 4s ease-in-out infinite" }} />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Morphing Blob"
        description="SVG path animasyonu ile sürekli şekil değiştiren canlı blob. Organik ve akıcı bir his verir."
        previewClassName="flex flex-wrap items-center justify-center gap-8 py-4"
        code={`<svg width="44" height="44" viewBox="0 0 44 44">
  <path
    fill="#6366f1"
    style={{ animation: "morph 3s ease-in-out infinite" }}
    d="M22,8 C28,8 36,12 36,22 C36,32 30,36 22,36 C14,36 8,30 8,22 C8,14 16,8 22,8 Z"
  />
</svg>

/* @keyframes morph {
  0%, 100% { d: path("M22,8 C28,8 36,12 36,22..."); }
  33%       { d: path("M22,6 C32,6 38,14 36,24..."); }
  66%       { d: path("M24,8 C34,10 38,18 36,26..."); }
} */`}
      >
        <LabeledItem label="indigo"><MorphingBlob /></LabeledItem>
        <LabeledItem label="rose">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <path fill="#f43f5e" style={{ animation: "kf-morph 2.5s ease-in-out infinite" }} d="M22,8 C28,8 36,12 36,22 C36,32 30,36 22,36 C14,36 8,30 8,22 C8,14 16,8 22,8 Z" />
          </svg>
        </LabeledItem>
        <LabeledItem label="amber">
          <svg width="44" height="44" viewBox="0 0 44 44">
            <path fill="#f59e0b" style={{ animation: "kf-morph 3.5s ease-in-out infinite" }} d="M22,8 C28,8 36,12 36,22 C36,32 30,36 22,36 C14,36 8,30 8,22 C8,14 16,8 22,8 Z" />
          </svg>
        </LabeledItem>
      </ShowcaseSection>

      {/* ── KATEGORİ: SADE ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Sade
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="Line Sweep"
        description="İnce bir çizgi üzerinde soldan sağa kayan parlama. Sade ve minimal yükleme ifadesi."
        previewClassName="flex flex-col items-center justify-center gap-6 py-4"
        code={`<div className="relative w-16 h-1 bg-foreground/10 rounded-full overflow-hidden">
  <div
    className="absolute inset-y-0 w-8 rounded-full bg-primary"
    style={{ animation: "sweep 1.4s ease-in-out infinite" }}
  />
</div>

/* @keyframes sweep {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
} */`}
      >
        <LabeledItem label="primary"><LineSweep /></LabeledItem>
        <LabeledItem label="geniş">
          <div className="relative w-40 h-1 bg-foreground/10 rounded-full overflow-hidden">
            <div className="absolute inset-y-0 w-1/2 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)", animation: "kf-shimmer 1.6s ease-in-out infinite" }} />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Dots Fade"
        description="3 nokta sırayla beliriyor ve söküyor. Bounce yerine opacity geçişiyle çok daha sakin görünür."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<span className="flex items-center gap-1.5">
  {[0, 1, 2].map((i) => (
    <span
      key={i}
      className="size-2 rounded-full bg-foreground-muted"
      style={{ animation: \`fade 1.2s ease-in-out \${i * 0.2}s infinite\` }}
    />
  ))}
</span>

/* @keyframes fade {
  0%, 100% { opacity: 0.2; }
  50%       { opacity: 1; }
} */`}
      >
        <LabeledItem label="sade"><DotsFade /></LabeledItem>
        <LabeledItem label="küçük">
          <span className="flex items-center gap-1">
            {[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-foreground-muted" style={{ animation: `kf-fade 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
          </span>
        </LabeledItem>
        <LabeledItem label="büyük">
          <span className="flex items-center gap-2">
            {[0, 1, 2].map((i) => <span key={i} className="size-3 rounded-full bg-primary" style={{ animation: `kf-fade 1.4s ease-in-out ${i * 0.25}s infinite` }} />)}
          </span>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Thin Ring"
        description="Çok ince stroke'lu klasik halka. Minimal tasarımlarda göze batmadan çalışır."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <circle cx="18" cy="18" r="15" stroke="currentColor"
    strokeWidth="1.5" className="opacity-15 text-foreground" />
  <circle
    cx="18" cy="18" r="15"
    stroke="currentColor" strokeWidth="1.5"
    strokeLinecap="round" strokeDasharray="20 74"
    className="text-primary"
    style={{ animation: "spin 1s linear infinite", transformOrigin: "center" }}
  />
</svg>`}
      >
        <LabeledItem label="sm">
          <svg width="24" height="24" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" className="opacity-15 text-foreground" />
            <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="20 74" className="text-primary" style={{ animation: "kf-spin 1s linear infinite", transformOrigin: "center" }} />
          </svg>
        </LabeledItem>
        <LabeledItem label="md"><ThinRing /></LabeledItem>
        <LabeledItem label="lg">
          <svg width="56" height="56" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1" className="opacity-15 text-foreground" />
            <circle cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeDasharray="20 74" className="text-primary" style={{ animation: "kf-spin 1s linear infinite", transformOrigin: "center" }} />
          </svg>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Typing Cursor"
        description="Yanıp sönen imleç. Metin tabanlı arayüzlerde doğal bir 'yazıyor...' hissi yaratır."
        previewClassName="flex flex-wrap items-center justify-center gap-6 py-4"
        code={`<div className="flex items-center gap-1 text-sm text-foreground-muted font-mono">
  <span>yükleniyor</span>
  <span
    className="inline-block w-px h-4 bg-primary"
    style={{ animation: "blink 0.9s step-end infinite" }}
  />
</div>

/* @keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
} */`}
      >
        <TypingCursor />
        <div className="flex items-center gap-1 text-sm text-foreground font-mono">
          <span>yükleniyor</span>
          <span className="inline-block w-px h-4 bg-foreground" style={{ animation: "kf-blink 0.9s step-end infinite" }} />
        </div>
      </ShowcaseSection>

      {/* ── KATEGORİ: MODERN ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Modern
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="Segmented Arc"
        description="8 ayrı yay segmenti sırayla parlıyor. Dashboard ve analitik arayüzlerde kullanılan teknolojik his."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`// 8 yay segmenti — her biri sırayla opacity:1 olur
const paths = computeSegmentPaths(8, cx=20, cy=20, r=14, gap=5);

<svg width="40" height="40" viewBox="0 0 40 40">
  {paths.map((d, i) => (
    <path
      key={i} d={d}
      stroke="currentColor" strokeWidth="3"
      strokeLinecap="round" fill="none"
      className="text-primary"
      style={{
        opacity: 0.15,
        animation: \`segment-glow 1.6s ease-in-out \${i * 0.2}s infinite\`,
      }}
    />
  ))}
</svg>

/* @keyframes segment-glow {
  0%, 100% { opacity: 0.15; }
  50%       { opacity: 1; }
} */`}
      >
        <LabeledItem label="indigo"><SegmentedArc /></LabeledItem>
        <LabeledItem label="rose">
          <SegmentedArc color="#f43f5e" className="" />
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Helix"
        description="İki nokta karşılıklı ileri-geri ve büyük-küçük hareketiyle sarmal izlenimi verir."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div className="relative size-10 flex items-center justify-center">
  <div className="absolute size-3 rounded-full bg-primary"
    style={{ animation: "helix-a 1.4s ease-in-out infinite" }} />
  <div className="absolute size-3 rounded-full bg-primary"
    style={{ animation: "helix-b 1.4s ease-in-out infinite" }} />
</div>

/* @keyframes helix-a {
  0%   { transform: translateX(-10px) scale(1); }
  50%  { transform: translateX(10px) scale(0.6); }
  100% { transform: translateX(-10px) scale(1); }
}
@keyframes helix-b {
  0%   { transform: translateX(10px) scale(0.6); }
  50%  { transform: translateX(-10px) scale(1); }
  100% { transform: translateX(10px) scale(0.6); }
} */`}
      >
        <LabeledItem label="helix"><HelixDots /></LabeledItem>
        <LabeledItem label="purple">
          <div className="relative size-10 flex items-center justify-center">
            {[0, 1].map((i) => (
              <div key={i} className="absolute size-3 rounded-full bg-purple-500" style={{ animation: `kf-helix-${i === 0 ? "a" : "b"} 1.4s ease-in-out infinite`, opacity: 0.9 }} />
            ))}
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Ripple Stack"
        description="İç içe daireler sırayla dışa doğru genişleyerek kaybolur. Su damlaması efekti."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div className="relative size-12 flex items-center justify-center">
  {[0, 1, 2].map((i) => (
    <div
      key={i}
      className="absolute rounded-full border-2 border-primary"
      style={{
        inset: 0,
        animation: \`ripple 1.8s ease-out \${i * 0.5}s infinite\`,
        opacity: 0,
      }}
    />
  ))}
  <div className="size-3 rounded-full bg-primary" />
</div>

/* @keyframes ripple {
  0%   { transform: scale(0.3); opacity: 0.8; }
  100% { transform: scale(2); opacity: 0; }
} */`}
      >
        <LabeledItem label="indigo"><RippleStack /></LabeledItem>
        <LabeledItem label="emerald">
          <div className="relative size-12 flex items-center justify-center">
            {[0, 1, 2].map((i) => <div key={i} className="absolute rounded-full border-2 border-emerald-500" style={{ inset: 0, animation: `kf-ripple 1.8s ease-out ${i * 0.5}s infinite`, opacity: 0 }} />)}
            <div className="size-3 rounded-full bg-emerald-500" />
          </div>
        </LabeledItem>
        <LabeledItem label="rose">
          <div className="relative size-12 flex items-center justify-center">
            {[0, 1, 2].map((i) => <div key={i} className="absolute rounded-full border-2 border-rose-500" style={{ inset: 0, animation: `kf-ripple 1.8s ease-out ${i * 0.5}s infinite`, opacity: 0 }} />)}
            <div className="size-3 rounded-full bg-rose-500" />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Progress Shimmer"
        description="Bar üzerinde sağa kayan parlama. Belirsiz ilerleme için doğal ve tanıdık bir dil."
        previewClassName="flex flex-col items-center justify-center gap-5 py-4"
        code={`<div className="w-48 h-2 bg-foreground/10 rounded-full overflow-hidden relative">
  <div
    className="absolute inset-y-0 w-1/3 rounded-full"
    style={{
      background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)",
      animation: "shimmer 1.4s ease-in-out infinite",
    }}
  />
</div>

/* @keyframes shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(250%); }
} */`}
      >
        <LabeledItem label="dar"><ProgressShimmer /></LabeledItem>
        <LabeledItem label="geniş">
          <div className="w-48 h-2 bg-foreground/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 w-1/3 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #6366f1, #a855f7, transparent)", animation: "kf-shimmer 1.4s ease-in-out infinite" }} />
          </div>
        </LabeledItem>
        <LabeledItem label="yüksek">
          <div className="w-40 h-3 bg-foreground/10 rounded-full overflow-hidden relative">
            <div className="absolute inset-y-0 w-1/3 rounded-full" style={{ background: "linear-gradient(90deg, transparent, #f59e0b, #fbbf24, transparent)", animation: "kf-shimmer 1.2s ease-in-out infinite" }} />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      {/* ── KATEGORİ: EĞLENCELİ ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Eğlenceli
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="Bouncing Ball"
        description="Squash & stretch fizik efektiyle zıplayan top. Hem komik hem de canlı bir his verir."
        previewClassName="flex flex-wrap items-center justify-center gap-12 py-2"
        code={`<div className="flex flex-col items-center" style={{ height: 60 }}>
  <div
    className="size-6 rounded-full bg-primary shadow-lg"
    style={{
      animation: "ball-bounce 0.7s cubic-bezier(0.33,0,0.66,0) infinite alternate",
      marginTop: 4,
    }}
  />
  <div
    className="w-5 h-1.5 rounded-full bg-foreground/20 mt-1"
    style={{ animation: "ball-shadow 0.7s ease-in-out infinite alternate" }}
  />
</div>

/* @keyframes ball-bounce {
  0%   { transform: scaleX(1) scaleY(1) translateY(0px); }
  80%  { transform: scaleX(1) scaleY(1) translateY(-28px); }
  100% { transform: scaleX(1.3) scaleY(0.7) translateY(0px); }
} */`}
      >
        <LabeledItem label="indigo"><BouncingBall /></LabeledItem>
        <LabeledItem label="rose">
          <div className="flex flex-col items-center gap-0" style={{ height: 60 }}>
            <div className="size-6 rounded-full bg-rose-500 shadow-lg" style={{ animation: "kf-ball-bounce 0.9s cubic-bezier(0.33,0,0.66,0) infinite alternate", marginTop: 4 }} />
            <div className="w-5 h-1.5 rounded-full bg-rose-500/20 mt-1" style={{ animation: "kf-ball-shadow 0.9s ease-in-out infinite alternate" }} />
          </div>
        </LabeledItem>
        <LabeledItem label="hızlı">
          <div className="flex flex-col items-center gap-0" style={{ height: 60 }}>
            <div className="size-5 rounded-full bg-amber-400 shadow-lg" style={{ animation: "kf-ball-bounce 0.5s cubic-bezier(0.33,0,0.66,0) infinite alternate", marginTop: 8 }} />
            <div className="w-4 h-1 rounded-full bg-amber-400/20 mt-1" style={{ animation: "kf-ball-shadow 0.5s ease-in-out infinite alternate" }} />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Pac-Man"
        description="Klasik arcade oyunundan ilham alan ağız açıp kapatan animasyon. Nostaljik ve eğlenceli."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<svg width="40" height="40" viewBox="0 0 40 40">
  <path
    fill="#f59e0b"
    style={{ animation: "pacman 0.5s linear infinite" }}
    d="M20,20 L20,2 A18,18 0 1 1 20,20 Z"
  />
</svg>

/* @keyframes pacman {
  0%, 100% { clip-path: polygon(50% 50%, 100% 15%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 85%); }
  50%       { clip-path: polygon(50% 50%, 100% 50%, 100% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 50%); }
} */`}
      >
        <LabeledItem label="pac-man"><PacMan /></LabeledItem>
        <LabeledItem label="mini">
          <svg width="24" height="24" viewBox="0 0 40 40">
            <path fill="#f59e0b" style={{ animation: "kf-pacman 0.5s linear infinite" }} d="M20,20 L20,2 A18,18 0 1 1 20,20 Z" />
            {[0, 1, 2].map((i) => <circle key={i} cx={32 - i * 6} cy="20" r="2" fill="#f59e0b" style={{ animation: `kf-pellet 0.5s linear ${i * 0.1}s infinite`, opacity: 0.5 }} />)}
          </svg>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Rubber Dots"
        description="Elastik yaylanma efektiyle uzayıp kısalan noktalar. Fizik tabanlı animasyonun saf hali."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<span className="flex items-end gap-1.5" style={{ height: 28 }}>
  {[0, 1, 2].map((i) => (
    <span
      key={i}
      className="w-3 rounded-full bg-primary"
      style={{
        animation: \`rubber 0.8s cubic-bezier(0.36,0,0.64,1) \${i * 0.12}s infinite\`,
        height: 12,
      }}
    />
  ))}
</span>

/* @keyframes rubber {
  0%, 100% { transform: scaleY(1) translateY(0); }
  30%       { transform: scaleY(1.6) translateY(-6px); }
  60%       { transform: scaleY(0.7) translateY(3px); }
} */`}
      >
        <LabeledItem label="indigo"><RubberDots /></LabeledItem>
        <LabeledItem label="rose">
          <span className="flex items-end gap-1.5" style={{ height: 28 }}>
            {[0, 1, 2].map((i) => <span key={i} className="w-3 rounded-full bg-rose-500" style={{ animation: `kf-rubber 0.8s cubic-bezier(0.36,0,0.64,1) ${i * 0.12}s infinite`, height: 12 }} />)}
          </span>
        </LabeledItem>
        <LabeledItem label="yavaş">
          <span className="flex items-end gap-1.5" style={{ height: 28 }}>
            {[0, 1, 2].map((i) => <span key={i} className="w-3 rounded-full bg-emerald-500" style={{ animation: `kf-rubber 1.2s cubic-bezier(0.36,0,0.64,1) ${i * 0.2}s infinite`, height: 12 }} />)}
          </span>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Flip Card"
        description="Kart X ve Y eksenlerinde dönerek yükleme yapıldığını gösterir. Logo veya ikon ile güzel görünür."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div
  className="size-10 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold"
  style={{ animation: "flip 1.2s ease-in-out infinite" }}
>
  UI
</div>

/* @keyframes flip {
  0%   { transform: perspective(120px) rotateX(0deg) rotateY(0deg); }
  50%  { transform: perspective(120px) rotateX(-180deg) rotateY(0deg); }
  100% { transform: perspective(120px) rotateX(-180deg) rotateY(-180deg); }
} */`}
      >
        <LabeledItem label="UI"><FlipCard /></LabeledItem>
        <LabeledItem label="emoji">
          <div className="size-10 rounded-lg bg-amber-400 flex items-center justify-center text-lg" style={{ animation: "kf-flip 1.2s ease-in-out infinite" }}>
            ⚡
          </div>
        </LabeledItem>
        <LabeledItem label="⬛">
          <div className="size-10 rounded-lg bg-foreground flex items-center justify-center" style={{ animation: "kf-flip 1.5s ease-in-out infinite" }}>
            <div className="size-4 rounded-sm bg-white" />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Spinning Stars"
        description="Yıldızlar dönen bir yörüngede parlar. Oyun ve ödül arayüzlerinde neşe katar."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<div className="relative size-10 flex items-center justify-center">
  <div className="absolute size-full" style={{ animation: "spin 2s linear infinite" }}>
    {[0, 1, 2, 3].map((i) => {
      const angle = (i / 4) * 360;
      const rad = (angle - 90) * (Math.PI / 180);
      const x = 50 + 42 * Math.cos(rad);
      const y = 50 + 42 * Math.sin(rad);
      return (
        <div key={i} className="absolute text-yellow-400"
          style={{
            left: \`\${x}%\`, top: \`\${y}%\`,
            transform: "translate(-50%,-50%)",
            fontSize: i % 2 === 0 ? 10 : 7,
            animation: \`star-twinkle 1s ease-in-out \${i * 0.25}s infinite\`,
          }}>★</div>
      );
    })}
  </div>
  <div className="size-2 rounded-full bg-yellow-400" />
</div>`}
      >
        <LabeledItem label="yıldızlar"><SpinningStars /></LabeledItem>
        <LabeledItem label="hızlı">
          <div className="relative size-10 flex items-center justify-center">
            <div className="absolute size-full" style={{ animation: "kf-spin 1s linear infinite" }}>
              {STAR_POS.map((pos, i) => (
                <div key={i} className="absolute text-rose-400" style={{ left: pos.x, top: pos.y, transform: "translate(-50%,-50%)", fontSize: i % 2 === 0 ? 10 : 7, animation: `kf-star-twinkle 0.6s ease-in-out ${i * 0.15}s infinite` }}>★</div>
              ))}
            </div>
            <div className="size-2 rounded-full bg-rose-400" />
          </div>
        </LabeledItem>
      </ShowcaseSection>

      {/* ── KATEGORİ: ETKİLEYİCİ ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Etkileyici
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="Wave Bars"
        description="5 bar dalga efektiyle yükselip alçalır. Ses veya veri akışı görselleştirmelerinde yaygın."
        previewClassName="flex flex-wrap items-center justify-center gap-10 py-4"
        code={`<span className="flex items-center gap-1" style={{ height: 40 }}>
  {[0, 1, 2, 3, 4].map((i) => (
    <span
      key={i}
      className="w-1.5 rounded-full bg-primary"
      style={{
        animation: \`wave 1s ease-in-out \${i * 0.1}s infinite\`,
        height: 8,
      }}
    />
  ))}
</span>

/* @keyframes wave {
  0%, 100% { height: 8px; }
  50%       { height: 32px; }
} */`}
      >
        <LabeledItem label="indigo"><WaveBars /></LabeledItem>
        <LabeledItem label="rose">
          <span className="flex items-center gap-1" style={{ height: 40 }}>
            {[0, 1, 2, 3, 4].map((i) => <span key={i} className="w-1.5 rounded-full bg-rose-500" style={{ animation: `kf-wave 1s ease-in-out ${i * 0.1}s infinite`, height: 8 }} />)}
          </span>
        </LabeledItem>
        <LabeledItem label="geniş">
          <span className="flex items-center gap-1.5" style={{ height: 40 }}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => <span key={i} className="w-1 rounded-full bg-primary" style={{ animation: `kf-wave 1.2s ease-in-out ${i * 0.08}s infinite`, height: 8 }} />)}
          </span>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Orbit"
        description="Küçük bir gezegen büyük bir çekirdeğin etrafında döner. Yerçekimi ve uzay hissi verir."
        previewClassName="flex flex-wrap items-center justify-center gap-12 py-4"
        code={`<div className="relative size-12 flex items-center justify-center">
  {/* merkez */}
  <div className="size-4 rounded-full bg-primary opacity-30" />
  {/* yörünge */}
  <div
    className="absolute size-full rounded-full"
    style={{ animation: "spin 1.2s linear infinite" }}
  >
    <div
      className="absolute size-3 rounded-full bg-primary shadow-lg"
      style={{ top: 0, left: "50%", transform: "translate(-50%, -50%)" }}
    />
  </div>
</div>`}
      >
        <LabeledItem label="indigo"><OrbitSpinner /></LabeledItem>
        <LabeledItem label="çift">
          <div className="relative size-12 flex items-center justify-center">
            <div className="size-4 rounded-full bg-primary opacity-30" />
            <div className="absolute size-full rounded-full" style={{ animation: "kf-spin 1.2s linear infinite" }}>
              <div className="absolute size-3 rounded-full bg-primary shadow-lg" style={{ top: 0, left: "50%", transform: "translate(-50%, -50%)" }} />
            </div>
            <div className="absolute size-full rounded-full" style={{ animation: "kf-spin 2s linear infinite reverse" }}>
              <div className="absolute size-2 rounded-full bg-purple-400 shadow-lg" style={{ bottom: 0, left: "50%", transform: "translate(-50%, 50%)" }} />
            </div>
          </div>
        </LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="DNA Helix"
        description="İki karşılıklı nokta serisi alternating animasyonla çift sarmal DNA görünümü verir."
        previewClassName="flex flex-wrap items-center justify-center gap-8 py-4"
        code={`<div className="relative flex gap-3 items-center" style={{ height: 40 }}>
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="relative flex flex-col items-center justify-center" style={{ height: 40 }}>
      <div className="size-2.5 rounded-full bg-primary absolute"
        style={{ animation: \`dna-top 1.2s ease-in-out \${i / 6}s infinite\` }} />
      <div className="size-2.5 rounded-full bg-purple-400 absolute"
        style={{ animation: \`dna-bot 1.2s ease-in-out \${i / 6}s infinite\` }} />
    </div>
  ))}
</div>

/* @keyframes dna-top {
  0%   { transform: translateY(-10px) scale(1); opacity: 1; }
  50%  { transform: translateY(10px) scale(0.5); opacity: 0.4; }
  100% { transform: translateY(-10px) scale(1); opacity: 1; }
} */`}
      >
        <LabeledItem label="DNA"><DNAHelix /></LabeledItem>
      </ShowcaseSection>

      <ShowcaseSection
        title="Matrix Rain"
        description="Yeşil karakterlerin dikey düştüğü Matrix efekti. Terminal ve hacker temalı arayüzler için."
        previewClassName="flex flex-wrap items-center justify-center gap-8 py-4"
        code={`<div className="relative overflow-hidden rounded-lg bg-black" style={{ width: 60, height: 48 }}>
  {Array.from({ length: 5 }).map((_, col) => (
    <div key={col} className="absolute top-0 text-green-400 font-mono text-xs leading-none"
      style={{
        left: col * 12,
        animation: \`matrix 1.2s linear \${col * 0.15}s infinite\`,
      }}>
      {["0","1","A","Z"].map((c, j) => (
        <div key={j} style={{ opacity: 1 - j * 0.25 }}>{c}</div>
      ))}
    </div>
  ))}
</div>

/* @keyframes matrix {
  0%   { transform: translateY(-100%); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(200%); opacity: 0; }
} */`}
      >
        <LabeledItem label="matrix"><MatrixRain /></LabeledItem>
        <LabeledItem label="büyük">
          <div className="relative overflow-hidden rounded-lg bg-black" style={{ width: 100, height: 72 }}>
            {Array.from({ length: 8 }).map((_, col) => (
              <div key={col} className="absolute top-0 text-green-400 font-mono text-xs leading-4" style={{ left: col * 12, animation: `kf-matrix 1.2s linear ${col * 0.15}s infinite` }}>
                {["0", "1", "A", "Z", "9", "3", "X", "7", "F", "2", "B", "8"].slice(col % 4, (col % 4) + 5).map((c, j) => <div key={j} style={{ opacity: 1 - j * 0.2 }}>{c}</div>)}
              </div>
            ))}
          </div>
        </LabeledItem>
      </ShowcaseSection>

      {/* ── KATEGORİ: GERÇEK KULLANIM ── */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted px-2">
            Gerçek Kullanım
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>

      <ShowcaseSection
        title="API Yükleme → Sonuç"
        description="Spinner'dan başarı/hata durumuna geçiş. Gerçek bir API çağrısının görsel akışını simüle eder."
        importLine={IMPORT}
        code={`const [state, setState] = useState<"idle"|"loading"|"success"|"error">("idle");

async function fetchData() {
  setState("loading");
  try {
    await api.getData();
    setState("success");
  } catch {
    setState("error");
  }
}

<div className="flex items-center justify-center size-16 rounded-full border-2">
  {state === "idle"    && <span>⏳</span>}
  {state === "loading" && <Spinner size="lg" variant="ring" />}
  {state === "success" && <span>✅</span>}
  {state === "error"   && <span>❌</span>}
</div>`}
      >
        <ApiSimDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="Çok Adımlı İşlem"
        description="Her adımda farklı spinner çeşidi kullanan çok adımlı ilerleme göstergesi."
        importLine={IMPORT}
        code={`const steps = [
  { label: "Bağlanıyor",   spinner: <Spinner variant="ring" size="sm" /> },
  { label: "Doğrulanıyor", spinner: <Spinner variant="dots" size="sm" /> },
  { label: "Kaydediliyor", spinner: <Spinner variant="bars" size="sm" /> },
];
const [step, setStep] = useState(0);

{steps.map((s, i) => (
  <div key={i} className="flex items-center gap-3">
    <div className="size-7 rounded-full border-2 flex items-center justify-center">
      {i < step ? <span className="text-white text-xs">✓</span>
       : i === step ? s.spinner
       : <span className="text-xs text-foreground-muted">{i + 1}</span>}
    </div>
    <span>{s.label}</span>
  </div>
))}`}
      >
        <MultiStepDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="Buton Yükleme Durumu"
        description="Tıklama → yükleniyor → tamamlandı akışı. En yaygın kullanım senaryosu."
        importLine={IMPORT}
        code={`const [saving, setSaving] = useState(false);

<button disabled={saving} onClick={handleSave}>
  {saving ? (
    <>
      <Spinner size="sm" color="white" />
      Kaydediliyor...
    </>
  ) : "Kaydet"}
</button>`}
      >
        <LoadingButtonDemo />
      </ShowcaseSection>

      <ShowcaseSection
        title="Satır İçi Kullanım"
        description="Metin içine gömülü küçük spinner örnekleri. Bildirim, durum çubuğu ve form öğelerinde kullanışlı."
        importLine={IMPORT}
        code={`<div className="flex items-center gap-2">
  <Spinner size="xs" color="secondary" />
  <span>Veriler senkronize ediliyor</span>
</div>`}
        previewClassName="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2 text-sm text-foreground-muted">
          <Spinner size="xs" color="secondary" />
          <span>Veriler senkronize ediliyor</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground">
          <Spinner size="xs" color="primary" />
          <span>Bağlantı kuruluyor...</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-success">
          <Spinner size="xs" color="success" />
          <span>Dosya yükleniyor</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Spinner size="xs" color="warning" />
          <span className="text-warning">Sunucu geç yanıt veriyor</span>
        </div>
      </ShowcaseSection>
    </div>
  );
}
