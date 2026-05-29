"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, BellIcon, GearIcon, ChevronIcon, ChevronRightIcon } from "./_icons";
import { Avatar } from "@/components/ui/avatar";
import type { NavbarBaseProps, NavUser, NavBreadcrumb, NavDropdownItem } from "./types";

export interface NavbarDashboardProps extends NavbarBaseProps {
  breadcrumbs?: NavBreadcrumb[];
  user?: NavUser;
  userMenuItems?: NavDropdownItem[];
  notificationCount?: number;
  onSettingsClick?: () => void;
  onNotificationClick?: () => void;
}

export function NavbarDashboard({
  logo,
  logoText = "Brand",
  links = [],
  breadcrumbs = [],
  user,
  userMenuItems = [],
  notificationCount = 0,
  onSettingsClick,
  onNotificationClick,
  className,
}: NavbarDashboardProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
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
    <nav className={cn("w-full border-b border-border bg-surface shadow-sm", className)}>
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

          {/* Breadcrumbs — desktop only */}
          {breadcrumbs.length > 0 && (
            <div className="hidden md:flex flex-1 items-center gap-1.5 min-w-0 ml-4">
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <div key={i} className="flex items-center gap-1.5 min-w-0">
                    {i > 0 && <ChevronRightIcon className="text-foreground-muted shrink-0" />}
                    {isLast || !crumb.href ? (
                      <span
                        className={cn(
                          "text-sm truncate",
                          isLast
                            ? "font-semibold text-foreground"
                            : "text-foreground-muted"
                        )}
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <a
                        href={crumb.href}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors truncate"
                      >
                        {crumb.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Spacer when no breadcrumbs */}
          {breadcrumbs.length === 0 && <div className="hidden md:block flex-1" />}

          {/* Right side — icon group + avatar */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Notification bell */}
            <button
              onClick={onNotificationClick}
              className="relative flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
              aria-label="Bildirimler"
            >
              <BellIcon />
              {notificationCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold leading-none">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            {/* Settings gear */}
            <button
              onClick={onSettingsClick}
              className="flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
              aria-label="Ayarlar"
            >
              <GearIcon />
            </button>

            {/* Vertical divider */}
            {user && (
              <div className="hidden md:block h-6 w-px bg-border mx-1" />
            )}

            {/* User avatar + dropdown — desktop */}
            {user && (
              <div ref={dropdownRef} className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 hover:bg-background-muted transition-colors min-h-[44px]"
                  aria-expanded={userMenuOpen}
                >
                  <Avatar src={user.avatarSrc} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronIcon open={userMenuOpen} />
                </button>

                {/* User dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-1 w-52 bg-surface-overlay border border-border rounded-[var(--radius-md)] shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 duration-100">
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
                              onClick={item.onClick}
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
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 py-3 flex flex-col gap-1">
          {/* Breadcrumbs in mobile */}
          {breadcrumbs.length > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto">
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <div key={i} className="flex items-center gap-1.5 shrink-0">
                    {i > 0 && <ChevronRightIcon className="text-foreground-muted" />}
                    {isLast || !crumb.href ? (
                      <span
                        className={cn(
                          "text-sm",
                          isLast
                            ? "font-semibold text-foreground"
                            : "text-foreground-muted"
                        )}
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <a
                        href={crumb.href}
                        className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Nav links */}
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

          {/* User section */}
          {user && (
            <div className="pt-2 border-t border-border mt-1 flex flex-col gap-1">
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
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
