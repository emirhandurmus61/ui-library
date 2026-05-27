"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── İkonlar ────────────────────────────────────────────────── */

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarCollapsibleProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  defaultCollapsed?: boolean;
  className?: string;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) {
  const base = cn(
    "group relative flex items-center gap-3 rounded-[var(--radius-md)]",
    "text-sm font-medium transition-all duration-150 cursor-pointer w-full text-left",
    collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
    item.active
      ? "bg-primary-subtle text-primary"
      : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
  );

  const iconEl = item.icon ? (
    <span className={cn(
      "size-5 shrink-0 flex items-center justify-center",
      item.active ? "text-primary" : "text-foreground-subtle group-hover:text-foreground"
    )}>
      {item.icon}
    </span>
  ) : (
    <span className={cn(
      "size-5 shrink-0 flex items-center justify-center rounded-full text-xs font-bold",
      item.active ? "bg-primary text-primary-foreground" : "bg-border text-foreground-subtle"
    )}>
      {item.label[0]}
    </span>
  );

  const inner = (
    <>
      {iconEl}
      {!collapsed && (
        <>
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
      )}
    </>
  );

  const el = item.href ? (
    <a href={item.href} className={base}>{inner}</a>
  ) : (
    <button onClick={item.onClick} className={base}>{inner}</button>
  );

  if (collapsed) {
    return (
      <Tooltip content={item.label} placement="right" delay={0}>
        {el}
      </Tooltip>
    );
  }

  return el;
}

/* ─── Component ──────────────────────────────────────────────── */

export function SidebarCollapsible({
  sections,
  logoText = "Brand",
  logo,
  user,
  defaultCollapsed = false,
  className,
}: SidebarCollapsibleProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <aside className={cn(
      "relative flex flex-col h-full bg-surface border-r border-border",
      "transition-all duration-200 ease-in-out",
      collapsed ? "w-[60px]" : "w-56",
      className
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center h-14 border-b border-border shrink-0 overflow-hidden",
        collapsed ? "justify-center px-2" : "gap-2.5 px-4"
      )}>
        {logo ?? (
          <span className="flex size-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
            {logoText[0]}
          </span>
        )}
        {!collapsed && (
          <span className="font-semibold text-foreground text-sm truncate">{logoText}</span>
        )}
      </div>

      {/* Toggle butonu */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? "Sidebar'ı genişlet" : "Sidebar'ı daralt"}
        className={cn(
          "absolute -right-3 top-16 z-10",
          "flex size-6 items-center justify-center",
          "rounded-full bg-surface border border-border",
          "text-foreground-muted hover:text-foreground hover:bg-background-muted",
          "transition-colors shadow-sm"
        )}
      >
        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>

      {/* Nav */}
      <nav className={cn("flex-1 overflow-y-auto py-3 space-y-5", collapsed ? "px-1.5" : "px-2")}>
        {sections.map((section, si) => (
          <div key={si}>
            {section.label && !collapsed && (
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {section.label}
              </p>
            )}
            {section.label && collapsed && (
              <div className="mx-auto my-1 w-4 border-t border-border" />
            )}
            <ul className="space-y-0.5">
              {section.items.map((item, ii) => (
                <li key={ii}>
                  <NavItem item={item} collapsed={collapsed} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      {user && (
        <div className={cn(
          "shrink-0 border-t border-border flex items-center gap-2.5 overflow-hidden",
          collapsed ? "justify-center px-2 py-3" : "px-3 py-3"
        )}>
          <Tooltip content={collapsed ? `${user.name}${user.email ? `\n${user.email}` : ""}` : ""} placement="right" delay={0} disabled={!collapsed}>
            <span>
              <Avatar name={user.name} src={user.avatarSrc} size="sm" />
            </span>
          </Tooltip>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              {user.email && <p className="text-xs text-foreground-muted truncate">{user.email}</p>}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
