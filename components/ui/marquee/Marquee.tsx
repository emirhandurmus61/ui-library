"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface MarqueeProps {
  children: React.ReactNode;
  /** Pixels per second (default 60) */
  speed?: number;
  /** Pause on hover (default true) */
  pauseOnHover?: boolean;
  /** Reverse direction (default false) */
  reverse?: boolean;
  /** Gap between items in px (default 32) */
  gap?: number;
  /** Fade edges (default true) */
  fade?: boolean;
  className?: string;
  itemClassName?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Marquee({
  children,
  speed = 60,
  pauseOnHover = true,
  reverse = false,
  gap = 32,
  fade = true,
  className,
  itemClassName,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(10);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Inject keyframes once — avoids inline <style> SSR mismatch
  useEffect(() => {
    const styleId = "marquee-keyframes";
    if (document.getElementById(styleId)) return;
    const el = document.createElement("style");
    el.id = styleId;
    el.textContent = `
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes marquee-reverse {
        from { transform: translateX(-50%); }
        to   { transform: translateX(0); }
      }
    `;
    document.head.appendChild(el);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    // Duration = width of one copy / speed
    const w = el.scrollWidth / 2;
    setDuration(w / speed);
  }, [speed, children]);

  const keyframe = reverse ? "marquee-reverse" : "marquee";
  // Use longhand properties only — never mix animation shorthand with
  // animationPlayState as it causes React style conflict warnings.
  const animStyle: React.CSSProperties = reduced
    ? {}
    : {
        animationName: keyframe,
        animationDuration: `${duration}s`,
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
        animationFillMode: "none",
        animationDirection: "normal",
        animationDelay: "0s",
      };

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden",
          fade && [
            "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
            "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
          ],
          className
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            "flex w-max",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          style={animStyle}
        >
          {/* Two copies for seamless loop */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center shrink-0"
              style={{ gap }}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {Array.isArray(children)
                ? (children as React.ReactNode[]).map((child, i) => (
                    <div key={i} className={cn("shrink-0", itemClassName)}>{child}</div>
                  ))
                : <div className={cn("shrink-0", itemClassName)}>{children}</div>
              }
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
