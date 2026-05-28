"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface RevealProps {
  children: React.ReactNode;
  /** Direction from which the element slides in (default "up") */
  direction?: RevealDirection;
  /** Delay before animation starts in ms (default 0) */
  delay?: number;
  /** Animation duration in ms (default 500) */
  duration?: number;
  /** Translate distance in px (default 24) */
  distance?: number;
  /** IntersectionObserver threshold (default 0.15) */
  threshold?: number;
  /** Only animate once (default true) */
  once?: boolean;
  className?: string;
  as?: React.ElementType;
}

/* ─── Direction → initial transform ─────────────────────────── */

const DIR_TRANSFORM: Record<RevealDirection, string> = {
  up:    "translateY(VAR)",
  down:  "translateY(-VAR)",
  left:  "translateX(VAR)",
  right: "translateX(-VAR)",
  none:  "none",
};

/* ─── Component ──────────────────────────────────────────────── */

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 500,
  distance = 24,
  threshold = 0.15,
  once = true,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const initialTransform = reduced || direction === "none"
    ? "none"
    : DIR_TRANSFORM[direction].replace("VAR", `${distance}px`);

  const style: React.CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : initialTransform,
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
      };

  return (
    <Tag ref={ref} className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
