"use client";

import { useState } from "react";
import { MenuIcon } from "./_icons";
import { cn } from "@/lib/utils";
import type { NavbarBaseProps } from "./types";

export interface NavbarGlassProps extends NavbarBaseProps {
  ctaLabel?: string;
  ctaHref?: string;
  /** Floating pill style (default true) */
  floating?: boolean;
}

export function NavbarGlass({
  logo,
  logoText = "Brand",
  links = [],
  ctaLabel,
  ctaHref = "#",
  floating = true,
  className,
}: NavbarGlassProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={cn(
        floating
          ? "max-w-4xl w-[calc(100%-2rem)] mx-auto mt-4 rounded-2xl border border-white/30 dark:border-white/10 shadow-lg shadow-black/5"
          : "w-full border-b border-white/20 dark:border-white/10",
        "bg-white/70 dark:bg-black/40 backdrop-blur-xl",
        className,
      )}
    >
      <div className="px-5">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            {logo ?? (
              <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
                {logoText[0]}
              </span>
            )}
            <span>{logoText}</span>
          </a>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  link.active
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2">
            {ctaLabel && (
              <a
                href={ctaHref}
                className="hidden md:inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium h-9 px-5 transition-opacity hover:opacity-90"
              >
                {ctaLabel}
              </a>
            )}

            {/* Mobile hamburger — WCAG 2.5.5: min 44×44 touch target */}
            <button
              className="md:hidden flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {mobileOpen && (
        <div
          className={cn(
            "md:hidden px-5 pb-4 pt-2 flex flex-col gap-1 border-t border-white/20 dark:border-white/10",
            "bg-white/70 dark:bg-black/40 backdrop-blur-xl",
            floating && "rounded-b-2xl",
          )}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors min-h-[44px] flex items-center",
                link.active
                  ? "text-foreground"
                  : "text-foreground/80 hover:text-foreground",
              )}
            >
              {link.label}
            </a>
          ))}
          {ctaLabel && (
            <a
              href={ctaHref}
              className="mt-2 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium h-9 px-5 transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
