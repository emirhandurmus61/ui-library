"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, SearchIcon, CartIcon, ChevronIcon, GridIcon } from "./_icons";
import { Avatar } from "@/components/ui/avatar";
import type { NavbarBaseProps, NavUser, NavCategory, NavDropdownItem } from "./types";

/* ─── Props ─────────────────────────────────────────────────── */

export interface NavbarEcommerceProps extends NavbarBaseProps {
  categories?: NavCategory[];
  cartCount?: number;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  user?: NavUser;
  userMenuItems?: NavDropdownItem[];
}

/* ─── Component ─────────────────────────────────────────────── */

export function NavbarEcommerce({
  logo,
  logoText = "Brand",
  links = [],
  categories = [],
  cartCount = 0,
  searchPlaceholder = "Ürün ara...",
  onSearch,
  user,
  userMenuItems = [],
  className,
}: NavbarEcommerceProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  /* Click-outside handlers */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const defaultUserMenu: NavDropdownItem[] = [
    { label: "Hesabım", href: "#" },
    { label: "Siparişlerim", href: "#" },
    { label: "Favorilerim", href: "#" },
    { label: "Çıkış Yap", onClick: () => {}, danger: true, divider: true },
  ];
  const menuItems = userMenuItems.length ? userMenuItems : defaultUserMenu;

  return (
    <nav className={cn("w-full border-b border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ── Main row ────────────────────────────────────────── */}
        <div className="flex h-16 items-center gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            {logo ?? (
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold">
                {logoText[0]}
              </span>
            )}
            <span className="hidden sm:inline text-base">{logoText}</span>
          </a>

          {/* Search bar — desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-xl items-center"
          >
            <div className="relative w-full">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-10 pl-10 pr-4 rounded-full bg-background-muted text-sm text-foreground placeholder:text-foreground-muted border border-transparent focus:border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 shrink-0 ml-auto">
            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-1 mr-2">
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
            </div>

            {/* Cart */}
            <a
              href="#cart"
              className="relative flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
              aria-label={`Sepet${cartCount > 0 ? ` (${cartCount} ürün)` : ""}`}
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </a>

            {/* User menu — desktop */}
            {user && (
              <div ref={userMenuRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 hover:bg-background-muted transition-colors min-h-[44px]"
                  aria-expanded={userMenuOpen}
                  aria-label="Kullanıcı menüsü"
                >
                  <Avatar src={user.avatarSrc} name={user.name} size="sm" />
                  <ChevronIcon open={userMenuOpen} />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-56 bg-surface-overlay border border-border rounded-[var(--radius-md)] shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                    <div className="px-3 py-2.5 border-b border-border">
                      <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                      {user.email && (
                        <p className="text-xs text-foreground-muted truncate">{user.email}</p>
                      )}
                    </div>
                    <div className="p-1">
                      {menuItems.map((item, i) => (
                        <div key={i}>
                          {item.divider && <div className="my-1 border-t border-border" />}
                          {item.href ? (
                            <a
                              href={item.href}
                              className={cn(
                                "flex w-full items-center px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors",
                                item.danger
                                  ? "text-danger hover:bg-danger-subtle"
                                  : "text-foreground hover:bg-background-muted"
                              )}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <button
                              onClick={() => {
                                item.onClick?.();
                                setUserMenuOpen(false);
                              }}
                              className={cn(
                                "flex w-full items-center px-3 py-2 text-sm rounded-[var(--radius-sm)] transition-colors",
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

            {/* Login link when no user */}
            {!user && (
              <a
                href="#login"
                className="hidden md:inline-flex items-center h-9 px-4 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
              >
                Giriş Yap
              </a>
            )}

            {/* Hamburger — mobile */}
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

        {/* ── Categories bar — desktop ────────────────────────── */}
        {categories.length > 0 && (
          <div className="hidden md:flex items-center gap-1 -mb-px relative">
            {/* Kategoriler dropdown trigger */}
            <div ref={megaMenuRef} className="relative">
              <button
                onClick={() => setMegaMenuOpen((o) => !o)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-colors min-h-[44px]",
                  megaMenuOpen
                    ? "bg-background-muted text-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                )}
                aria-expanded={megaMenuOpen}
              >
                <GridIcon />
                <span>Kategoriler</span>
                <ChevronIcon open={megaMenuOpen} />
              </button>

              {/* Mega menu */}
              {megaMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-[640px] max-w-[calc(100vw-2rem)] bg-surface-overlay border border-border rounded-[var(--radius-md)] shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="p-4 grid grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <div key={cat.label}>
                        <a
                          href={cat.href}
                          className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors rounded-[var(--radius-sm)]"
                        >
                          {cat.icon && <span className="text-foreground-muted">{cat.icon}</span>}
                          {cat.label}
                        </a>
                        {cat.children && cat.children.length > 0 && (
                          <ul className="mt-1 space-y-0.5">
                            {cat.children.map((child) => (
                              <li key={child.label}>
                                <a
                                  href={child.href}
                                  className="block px-2 py-1.5 text-sm text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-[var(--radius-sm)] transition-colors"
                                >
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal scroll category links */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  className="whitespace-nowrap px-3 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:bg-background-muted rounded-[var(--radius-md)] transition-colors min-h-[44px] flex items-center"
                >
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile menu ───────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-2">
          {/* Mobile search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-11 pl-10 pr-4 rounded-full bg-background-muted text-sm text-foreground placeholder:text-foreground-muted border border-transparent focus:border-border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </form>

          {/* Mobile categories */}
          {categories.length > 0 && (
            <div className="flex flex-col gap-0.5 border-b border-border pb-2">
              <p className="px-3 py-1.5 text-xs font-semibold text-foreground-muted uppercase tracking-wide">
                Kategoriler
              </p>
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  className="px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors min-h-[44px] flex items-center gap-2"
                >
                  {cat.icon && <span className="text-foreground-muted">{cat.icon}</span>}
                  {cat.label}
                </a>
              ))}
            </div>
          )}

          {/* Mobile nav links */}
          {links.length > 0 && (
            <div className="flex flex-col gap-0.5 border-b border-border pb-2">
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
            </div>
          )}

          {/* Mobile user section */}
          <div className="flex flex-col gap-1">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-1 py-2">
                  <Avatar src={user.avatarSrc} name={user.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{user.name}</p>
                    {user.email && (
                      <p className="text-xs text-foreground-muted">{user.email}</p>
                    )}
                  </div>
                </div>
                {menuItems.map((item, i) =>
                  item.href ? (
                    <a
                      key={i}
                      href={item.href}
                      className={cn(
                        "px-3 py-2.5 text-sm rounded-[var(--radius-md)] flex items-center min-h-[44px]",
                        item.danger
                          ? "text-danger"
                          : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                      )}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      key={i}
                      onClick={item.onClick}
                      className={cn(
                        "px-3 py-2.5 text-sm text-left rounded-[var(--radius-md)] flex items-center w-full min-h-[44px]",
                        item.danger
                          ? "text-danger"
                          : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                      )}
                    >
                      {item.label}
                    </button>
                  )
                )}
              </>
            ) : (
              <a
                href="#login"
                className="inline-flex items-center justify-center h-11 px-4 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium"
              >
                Giriş Yap
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
