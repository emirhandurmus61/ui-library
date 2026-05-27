"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NavbarBaseProps } from "./types";

/* ─── Hamburger ikonu ────────────────────────────────────────── */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      {open ? (
        <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>
      ) : (
        <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>
      )}
    </svg>
  );
}

export interface NavbarMinimalProps extends NavbarBaseProps {
  /** Sağ taraf ek içerik (CTA, buton vb.) */
  rightSlot?: React.ReactNode;
}

export function NavbarMinimal({
  logo,
  logoText = "Brand",
  links = [],
  rightSlot,
  className,
}: NavbarMinimalProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={cn("w-full border-b border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity">
            {logo ?? (
              <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
                {logoText[0]}
              </span>
            )}
            <span>{logoText}</span>
          </a>

          {/* Masaüstü linkler */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                  link.active
                    ? "bg-background-muted text-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Sağ slot + hamburger */}
          <div className="flex items-center gap-2">
            {rightSlot && <div className="hidden md:flex items-center gap-2">{rightSlot}</div>}
            <button
              className="md:hidden flex items-center justify-center size-8 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={open}
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                "px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                link.active
                  ? "bg-background-muted text-foreground"
                  : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
              )}
            >
              {link.label}
            </a>
          ))}
          {rightSlot && <div className="pt-2 border-t border-border mt-1">{rightSlot}</div>}
        </div>
      )}
    </nav>
  );
}
