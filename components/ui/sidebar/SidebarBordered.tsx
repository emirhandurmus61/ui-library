"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarBorderedProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  className?: string;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "group flex items-center gap-3 px-3 py-2.5 rounded-lg",
    "text-sm font-medium transition-colors duration-150 cursor-pointer w-full text-left",
    "min-h-[44px]",
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

/* ─── Component ──────────────────────────────────────────────── */

export function SidebarBordered({
  sections,
  logoText = "Brand",
  logo,
  user,
  className,
}: SidebarBorderedProps) {
  return (
    <aside className={cn("flex flex-col h-full w-60 bg-surface border-r border-border", className)}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 h-14 px-4 border-b border-border shrink-0">
        {logo ?? (
          <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold shrink-0">
            {logoText[0]}
          </span>
        )}
        <span className="font-semibold text-foreground text-sm truncate">{logoText}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-3">
        {sections.map((section, si) => (
          <div
            key={si}
            className="border border-border rounded-xl p-2 bg-background-muted/30"
          >
            {section.label && (
              <p className="text-xs font-semibold text-foreground mb-2 px-2">
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
        <div className="shrink-0 px-3 pb-3">
          <div className="border border-border rounded-xl p-3 bg-background-muted/30 flex items-center gap-3">
            <Avatar name={user.name} src={user.avatarSrc} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              {user.email && <p className="text-xs text-foreground-muted truncate">{user.email}</p>}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
