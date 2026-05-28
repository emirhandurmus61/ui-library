"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface ConfettiButtonProps {
  children: React.ReactNode;
  /** Number of particles (default 80) */
  count?: number;
  /** Particle colors (defaults to a festive palette) */
  colors?: string[];
  /** Explosion radius in px (default 120) */
  radius?: number;
  /** Duration of animation in ms (default 900) */
  duration?: number;
  /** Particle size range [min, max] in px (default [4,8]) */
  particleSize?: [number, number];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  w: number; h: number;
  rot: number; rotV: number;
  alpha: number;
}

/* ─── Component ──────────────────────────────────────────────── */

const DEFAULT_COLORS = ["#f43f5e", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7", "#ec4899"];

export function ConfettiButton({
  children,
  count = 80,
  colors = DEFAULT_COLORS,
  radius = 120,
  duration = 900,
  particleSize = [4, 8],
  className,
  onClick,
  disabled = false,
}: ConfettiButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const explode = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.();
    if (disabled || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    const particles: Particle[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (radius / duration) * 3 + 0.5;
      const sz = particleSize[0] + Math.random() * (particleSize[1] - particleSize[0]);
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        w: sz, h: sz * (0.4 + Math.random() * 0.6),
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.3,
        alpha: 1,
      };
    });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const start = performance.now();

    const frame = (now: number) => {
      const t = (now - start) / duration;
      if (t >= 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy += 0.08; // gravity
        p.rot += p.rotV;
        p.alpha = 1 - t;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(frame);
  }, [disabled, reduced, count, colors, radius, duration, particleSize, onClick]);

  return (
    <span className="relative inline-flex">
      {/* Full-viewport canvas overlay — pointer-events:none so clicks pass through */}
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="pointer-events-none absolute -inset-[200px] z-50"
        aria-hidden="true"
      />
      <button
        type="button"
        className={cn(
          "relative inline-flex items-center justify-center",
          className
        )}
        onClick={explode}
        disabled={disabled}
      >
        {children}
      </button>
    </span>
  );
}
