"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { NavbarBaseProps } from "./types";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      {open ? <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
    </svg>
  );
}

export interface NavbarStickyProps extends NavbarBaseProps {
  ctaLabel?: string;
  ctaHref?: string;
  /** İkincil link (örn. "Giriş Yap") */
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function NavbarSticky({
  logo,
  logoText = "Brand",
  links = [],
  ctaLabel = "Ücretsiz Başla",
  ctaHref = "#",
  secondaryLabel = "Giriş Yap",
  secondaryHref = "#",
  className,
}: NavbarStickyProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity">
            {logo ?? (
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold">
                {logoText[0]}
              </span>
            )}
            <span>{logoText}</span>
          </a>

          {/* Masaüstü nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-[var(--radius-full)] text-sm font-medium transition-colors",
                  link.active
                    ? "text-foreground"
                    : "text-foreground-muted hover:text-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Sağ butonlar */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <a
              href={secondaryHref}
              className="px-4 py-2 text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
            >
              {secondaryLabel}
            </a>
            <a
              href={ctaHref}
              className="inline-flex items-center h-9 px-4 rounded-[var(--radius-full)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm"
            >
              {ctaLabel}
            </a>
          </div>

          {/* Hamburger — WCAG 2.5.5: min 44×44px touch target */}
          <button
            className="md:hidden flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menüyü aç/kapat"
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobil menü */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border px-4 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors min-h-[44px] flex items-center",
                link.active
                  ? "bg-background-muted text-foreground"
                  : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
              )}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-border mt-1">
            <a href={secondaryHref} className="px-3 py-2.5 text-sm font-medium text-foreground-muted flex items-center min-h-[44px]">
              {secondaryLabel}
            </a>
            <a href={ctaHref} className="inline-flex items-center justify-center h-11 px-4 rounded-[var(--radius-full)] bg-primary text-primary-foreground text-sm font-medium">
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
