"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface BackToTopProps {
  /** Scroll distance in px before the button appears. Default: 300 */
  threshold?: number;
  /** Use smooth scrolling behavior. Default: true */
  smooth?: boolean;
  className?: string;
}

/* ─── Icon ───────────────────────────────────────────────────── */

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="18,15 12,9 6,15" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function BackToTop({
  threshold = 300,
  smooth = true,
  className,
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Yukarı çık"
      className={cn(
        // position
        "fixed bottom-6 right-6 z-50",
        // size + shape
        "size-10 rounded-[var(--radius-full)]",
        // colors
        "bg-primary text-primary-foreground",
        // shadow
        "shadow-lg",
        // hover / active
        "hover:bg-primary-hover hover:scale-105",
        "active:scale-95",
        // focus
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        // layout
        "flex items-center justify-center",
        // transition
        "transition-all duration-200 ease-in-out",
        // visibility: fade + slight upward slide
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-2 pointer-events-none",
        className
      )}
    >
      <ArrowUpIcon className="size-5" />
    </button>
  );
}
