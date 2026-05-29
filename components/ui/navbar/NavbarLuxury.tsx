"use client";

import { useState } from "react";
import { MenuIcon } from "./_icons";
import { cn } from "@/lib/utils";
import type { NavbarBaseProps } from "./types";

export interface NavbarLuxuryProps extends NavbarBaseProps {
  /** Accent color - default gold (#c9a96e) */
  accentColor?: string;
}

export function NavbarLuxury({
  logo,
  logoText = "MAISON",
  links = [],
  className,
  accentColor = "#c9a96e",
}: NavbarLuxuryProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  return (
    <nav
      className={cn("h-16 bg-[#0a0a0a] border-b", className)}
      style={
        {
          "--navbar-accent": accentColor,
          borderColor: accentColor,
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-6xl px-6 h-full flex items-center justify-between">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 w-full h-full items-center">
          {/* Left links */}
          <div className="flex items-center gap-6">
            {leftLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "tracking-[0.2em] uppercase text-[11px] font-light text-white/70 transition-colors hover:text-[var(--navbar-accent)]",
                  link.active && "text-[var(--navbar-accent)]"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Center logo */}
          <div className="flex items-center justify-center">
            {logo ? (
              logo
            ) : (
              <a href="/" className="flex items-center gap-3">
                <span className="border border-[var(--navbar-accent)] size-8 flex items-center justify-center text-[var(--navbar-accent)] text-xs font-light">
                  {logoText.charAt(0)}
                </span>
                <span className="text-lg font-light tracking-[0.3em] uppercase text-white">
                  {logoText}
                </span>
              </a>
            )}
          </div>

          {/* Right links */}
          <div className="flex items-center justify-end gap-6">
            {rightLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "tracking-[0.2em] uppercase text-[11px] font-light text-white/70 transition-colors hover:text-[var(--navbar-accent)]",
                  link.active && "text-[var(--navbar-accent)]"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between w-full">
          {logo ? (
            logo
          ) : (
            <a href="/" className="flex items-center gap-2">
              <span className="border border-[var(--navbar-accent)] size-8 flex items-center justify-center text-[var(--navbar-accent)] text-xs font-light">
                {logoText.charAt(0)}
              </span>
              <span className="text-lg font-light tracking-[0.3em] uppercase text-white">
                {logoText}
              </span>
            </a>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-[var(--navbar-accent)]"
            aria-label="Toggle menu"
          >
            <MenuIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 py-6">
          <div className="flex flex-col items-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "tracking-[0.2em] uppercase text-[11px] font-light text-white/70 transition-colors hover:text-[var(--navbar-accent)]",
                  link.active && "text-[var(--navbar-accent)]"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
