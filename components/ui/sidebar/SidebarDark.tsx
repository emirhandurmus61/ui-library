"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarDarkProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  footer?: React.ReactNode;
  className?: string;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "group flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)]",
    "text-sm font-medium transition-colors duration-150 cursor-pointer w-full text-left",
    "min-h-[44px]",
    item.active
      ? "bg-white/10 text-white"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  );

  const content = (
    <>
      {item.icon && (
        <span className={cn("size-4 shrink-0 flex items-center justify-center", item.active ? "text-white" : "text-slate-400 group-hover:text-white")}>
          {item.icon}
        </span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span className="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-xs font-semibold bg-indigo-500 text-white">
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

export function SidebarDark({
  sections,
  logoText = "Brand",
  logo,
  user,
  footer,
  className,
}: SidebarDarkProps) {
  return (
    <aside className={cn("flex flex-col h-full w-64 bg-[#111827]", className)}>
      {/* Gradient accent top border */}
      <div className="h-[3px] bg-gradient-to-r from-primary via-purple-500 to-pink-500 shrink-0" />

      {/* Logo */}
      <div className="flex items-center gap-2.5 h-14 px-4 shrink-0">
        {logo ?? (
          <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-white/10 text-white text-xs font-bold shrink-0">
            {logoText[0]}
          </span>
        )}
        <span className="font-semibold text-white text-sm truncate">{logoText}</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.label && (
              <p className="px-3 mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
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

      {/* Footer slot */}
      {footer && (
        <div className="shrink-0 border-t border-white/10 p-3">
          {footer}
        </div>
      )}

      {/* User */}
      {user && (
        <div className="shrink-0 border-t border-white/10 px-3 py-3 flex items-center gap-3">
          <Avatar name={user.name} src={user.avatarSrc} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user.name}</p>
            {user.email && <p className="text-xs text-slate-400 truncate">{user.email}</p>}
          </div>
        </div>
      )}
    </aside>
  );
}
