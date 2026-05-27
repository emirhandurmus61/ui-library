"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { NavbarBaseProps, NavUser } from "./types";

/* ─── İkonlar ────────────────────────────────────────────────── */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      {open ? <><path d="M18 6 6 18" /><path d="M6 6l12 12" /></> : <><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></>}
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3.5 transition-transform duration-150", open && "rotate-180")} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export interface NavDropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export interface NavbarFullProps extends NavbarBaseProps {
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  user?: NavUser;
  userMenuItems?: NavDropdownItem[];
}

export function NavbarFull({
  logo,
  logoText = "Brand",
  links = [],
  ctaLabel = "Başla",
  ctaHref = "#",
  ctaOnClick,
  user,
  userMenuItems = [],
  className,
}: NavbarFullProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dışarı tıklayınca dropdown kapat
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const defaultUserMenu: NavDropdownItem[] = [
    { label: "Profil", href: "#" },
    { label: "Ayarlar", href: "#" },
    { label: "Çıkış Yap", onClick: () => {}, danger: true, divider: true },
  ];
  const menuItems = userMenuItems.length ? userMenuItems : defaultUserMenu;

  return (
    <nav className={cn("w-full border-b border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity">
            {logo ?? (
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold">
                {logoText[0]}
              </span>
            )}
            <span className="text-base">{logoText}</span>
          </a>

          {/* Orta — masaüstü nav */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
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

          {/* Sağ — CTA + Avatar */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {!user && (
              <a
                href={ctaHref}
                onClick={ctaOnClick}
                className="inline-flex items-center h-9 px-4 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                {ctaLabel}
              </a>
            )}

            {user && (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-1.5 hover:bg-background-muted transition-colors"
                  aria-expanded={dropdownOpen}
                >
                  <Avatar src={user.avatarSrc} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">{user.name}</span>
                  <ChevronIcon open={dropdownOpen} />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-surface-overlay border border-border rounded-[var(--radius-md)] shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                    {/* Kullanıcı bilgisi */}
                    <div className="px-3 py-2.5 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                      {user.email && <p className="text-xs text-foreground-muted truncate">{user.email}</p>}
                    </div>
                    <div className="p-1">
                      {menuItems.map((item, i) => (
                        <div key={i}>
                          {item.divider && <div className="my-1 border-t border-border" />}
                          {item.href ? (
                            <a
                              href={item.href}
                              className={cn(
                                "flex w-full items-center px-3 py-1.5 text-sm rounded-[var(--radius-sm)] transition-colors",
                                item.danger
                                  ? "text-danger hover:bg-danger-subtle"
                                  : "text-foreground hover:bg-background-muted"
                              )}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <button
                              onClick={item.onClick}
                              className={cn(
                                "flex w-full items-center px-3 py-1.5 text-sm rounded-[var(--radius-sm)] transition-colors",
                                item.danger
                                  ? "text-danger hover:bg-danger-subtle"
                                  : "text-foreground hover:bg-background-muted"
                              )}
                            >
                              {item.label}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex items-center justify-center size-8 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
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
          <div className="pt-2 border-t border-border mt-1 flex flex-col gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-1 py-1">
                  <Avatar src={user.avatarSrc} name={user.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    {user.email && <p className="text-xs text-foreground-muted">{user.email}</p>}
                  </div>
                </div>
                {menuItems.map((item, i) => (
                  item.href ? (
                    <a key={i} href={item.href} className={cn("px-3 py-2 text-sm rounded-[var(--radius-md)]", item.danger ? "text-danger" : "text-foreground-muted")}>
                      {item.label}
                    </a>
                  ) : (
                    <button key={i} onClick={item.onClick} className={cn("px-3 py-2 text-sm text-left rounded-[var(--radius-md)]", item.danger ? "text-danger" : "text-foreground-muted")}>
                      {item.label}
                    </button>
                  )
                ))}
              </>
            ) : (
              <a href={ctaHref} className="inline-flex items-center justify-center h-9 px-4 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium">
                {ctaLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
