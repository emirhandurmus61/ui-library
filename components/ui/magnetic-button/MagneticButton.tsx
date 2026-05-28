"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Max displacement in px (default 12) */
  strength?: number;
  /** Spring easing duration in ms (default 300) */
  ease?: number;
  /** Disable magnetic effect (default false) */
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

/* ─── Component ──────────────────────────────────────────────── */

export function MagneticButton({
  children,
  strength = 12,
  ease = 300,
  disabled = false,
  className,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTranslate({ x: dx * strength, y: dy * strength });
  }, [disabled, reduced, strength]);

  const handleMouseLeave = useCallback(() => {
    setTranslate({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer select-none",
        "transition-shadow duration-200",
        className
      )}
      style={{
        transform: `translate(${translate.x}px, ${translate.y}px)`,
        transition: translate.x === 0 && translate.y === 0
          ? `transform ${ease}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
          : "transform 80ms linear",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
