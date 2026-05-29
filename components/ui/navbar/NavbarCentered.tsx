"use client";

import { useState } from "react";
import { MenuIcon } from "./_icons";
import { cn } from "@/lib/utils";
import type { NavbarBaseProps } from "./types";

export interface NavbarCenteredProps extends NavbarBaseProps {
  ctaLabel?: string;
  ctaHref?: string;
}

export function NavbarCentered({
  logo,
  logoText = "Brand",
  links = [],
  ctaLabel,
  ctaHref = "#",
  className,
}: NavbarCenteredProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={cn("w-full border-b border-border bg-surface", className)}>
      {/* ── Row 1: Centered logo (desktop) / Logo + hamburger (mobile) ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-center justify-center py-5 relative">
          {/* Logo — centered on desktop, left-aligned on mobile */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 text-xl font-semibold text-foreground hover:opacity-80 transition-opacity md:mx-auto"
          >
            {logo ?? (
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold">
                {logoText[0]}
              </span>
            )}
            <span>{logoText}</span>
          </a>

          {/* Mobile hamburger — absolute right so logo stays centered on desktop */}
          <button
            className="md:hidden absolute right-0 flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ── Row 2: Centered links (desktop only) ── */}
      {links.length > 0 && (
        <div className="hidden md:block border-t border-border">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex justify-center items-center gap-8 py-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    link.active
                      ? "text-foreground border-b-2 border-primary pb-px"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              ))}

              {ctaLabel && (
                <a
                  href={ctaHref}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1 rounded-[var(--radius-full)] bg-primary/10"
                >
                  {ctaLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile dropdown menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-3 flex flex-col items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "w-full text-center px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors min-h-[44px] flex items-center justify-center",
                  link.active
                    ? "text-foreground bg-background-muted"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                )}
              >
                {link.label}
              </a>
            ))}

            {ctaLabel && (
              <a
                href={ctaHref}
                className="w-full text-center px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-primary hover:text-primary/80 transition-colors min-h-[44px] flex items-center justify-center mt-1 border-t border-border pt-3"
              >
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
