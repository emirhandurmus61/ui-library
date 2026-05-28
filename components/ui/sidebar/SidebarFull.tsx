"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Icons ──────────────────────────────────────────────────── */

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarFullProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  footer?: React.ReactNode;
  width?: string;
  className?: string;
  /**
   * When true, renders a hamburger trigger button that opens a slide-over drawer
   * on mobile (< lg). On desktop the sidebar is always visible inline.
   * Set this when the sidebar is used inside a layout alongside main content.
   */
  mobileDrawer?: boolean;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "group flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]",
    "text-sm font-medium transition-colors duration-150 cursor-pointer w-full text-left",
    "min-h-[44px]", /* WCAG 2.5.5 touch target */
    item.active
      ? "bg-primary-subtle text-primary"
      : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
  );

  const content = (
    <>
      {item.icon && (
        <span className={cn("size-4 shrink-0 flex items-center justify-center", item.active ? "text-primary" : "text-foreground-subtle group-hover:text-foreground")}>
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span className={cn(
          "ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-semibold",
          item.active ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}>
          {item.badge}
        </span>
      )}
    </>
  );

  if (item.href) {
    return <a href={item.href} className={base}>{content}</a>;
  }
  return <button onClick={item.onClick} className={base}>{content}</button>;
}

/* ─── Sidebar inner content ──────────────────────────────────── */

function SidebarInner({
  sections,
  logoText,
  logo,
  user,
  footer,
  onClose,
}: {
  sections: SidebarSection[];
  logoText: string;
  logo?: React.ReactNode;
  user?: SidebarFullProps["user"];
  footer?: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          {logo ?? (
            <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold shrink-0">
              {logoText[0]}
            </span>
          )}
          <span className="font-semibold text-foreground text-sm truncate">{logoText}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center size-9 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
            aria-label="Menüyü kapat"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.label && (
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item, ii) => (
                <li key={ii}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer slot */}
      {footer && (
        <div className="shrink-0 border-t border-border p-3">
          {footer}
        </div>
      )}

      {/* User */}
      {user && (
        <div className="shrink-0 border-t border-border px-3 py-3 flex items-center gap-3">
          <Avatar name={user.name} src={user.avatarSrc} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            {user.email && <p className="text-xs text-foreground-muted truncate">{user.email}</p>}
          </div>
        </div>
      )}
    </>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function SidebarFull({
  sections,
  logoText = "Brand",
  logo,
  user,
  footer,
  width = "w-64",
  className,
  mobileDrawer = false,
}: SidebarFullProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!mobileDrawer) {
    /* Static sidebar — consumer handles mobile visibility */
    return (
      <aside className={cn(
        "flex flex-col h-full",
        "bg-surface border-r border-border",
        width,
        className
      )}>
        <SidebarInner
          sections={sections}
          logoText={logoText}
          logo={logo}
          user={user}
          footer={footer}
        />
      </aside>
    );
  }

  /* ── Responsive sidebar with mobile drawer ── */
  return (
    <>
      {/* Desktop: always visible */}
      <aside className={cn(
        "hidden lg:flex flex-col h-full",
        "bg-surface border-r border-border",
        width,
        className
      )}>
        <SidebarInner
          sections={sections}
          logoText={logoText}
          logo={logo}
          user={user}
          footer={footer}
        />
      </aside>

      {/* Mobile: hamburger trigger */}
      <button
        onClick={() => setDrawerOpen(true)}
        className={cn(
          "lg:hidden fixed top-3 left-3 z-50",
          "flex items-center justify-center size-11 rounded-[var(--radius-md)]",
          "bg-surface border border-border shadow-sm",
          "text-foreground-muted hover:text-foreground transition-colors"
        )}
        aria-label="Menüyü aç"
        aria-expanded={drawerOpen}
      >
        <MenuIcon />
      </button>

      {/* Mobile: backdrop */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile: slide-over drawer */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 z-50 flex flex-col",
          "bg-surface border-r border-border shadow-xl",
          "transition-transform duration-300 ease-in-out",
          width,
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!drawerOpen}
      >
        <SidebarInner
          sections={sections}
          logoText={logoText}
          logo={logo}
          user={user}
          footer={footer}
          onClose={() => setDrawerOpen(false)}
        />
      </aside>
    </>
  );
}
