"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarFloatingProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  className?: string;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "group flex items-center gap-3 px-3 py-2.5 rounded-xl",
    "text-sm font-medium transition-colors duration-150 cursor-pointer w-full text-left",
    "min-h-[44px]",
    item.active
      ? "bg-primary text-primary-foreground"
      : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
  );

  const content = (
    <>
      {item.icon && (
        <span className={cn("size-4 shrink-0 flex items-center justify-center", item.active ? "text-primary-foreground" : "text-foreground-subtle group-hover:text-foreground")}>
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span className={cn(
          "ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-semibold",
          item.active ? "bg-white/20 text-primary-foreground" : "bg-secondary text-secondary-foreground"
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

/* ─── Component ──────────────────────────────────────────────── */

export function SidebarFloating({
  sections,
  logoText = "Brand",
  logo,
  user,
  className,
}: SidebarFloatingProps) {
  return (
    <aside className={cn(
      "flex flex-col h-full w-60 m-3 px-3 py-4",
      "bg-surface border border-border rounded-2xl shadow-lg",
      className
    )}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 pb-4 shrink-0">
        {logo ?? (
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xs font-bold shrink-0">
            {logoText[0]}
          </span>
        )}
        <span className="font-semibold text-foreground text-sm truncate">{logoText}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.label && (
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      {user && (
        <div className="shrink-0 border-t border-border mt-3 pt-3 px-2 flex items-center gap-3">
          <Avatar name={user.name} src={user.avatarSrc} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            {user.email && <p className="text-xs text-foreground-muted truncate">{user.email}</p>}
          </div>
        </div>
      )}
    </aside>
  );
}
