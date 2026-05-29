"use client";

import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/tooltip";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarMiniProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  className?: string;
}

/* ─── Nav item ───────────────────────────────────────────────── */

function NavItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "size-11 mx-auto rounded-xl flex items-center justify-center",
    "transition-colors duration-150 cursor-pointer",
    item.active
      ? "bg-primary text-primary-foreground"
      : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
  );

  const iconEl = item.icon ? (
    <span className="size-5 flex items-center justify-center">{item.icon}</span>
  ) : (
    <span className="text-xs font-bold">{item.label[0]}</span>
  );

  const el = item.href ? (
    <a href={item.href} className={base} aria-label={item.label}>{iconEl}</a>
  ) : (
    <button onClick={item.onClick} className={base} aria-label={item.label}>{iconEl}</button>
  );

  return (
    <Tooltip content={item.label} placement="right" delay={0}>
      {el}
    </Tooltip>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function SidebarMini({
  sections,
  logoText = "Brand",
  logo,
  className,
}: SidebarMiniProps) {
  return (
    <aside className={cn(
      "flex flex-col items-center h-full w-16",
      "bg-surface border-r border-border py-4",
      className
    )}>
      {/* Logo */}
      <div className="shrink-0 mb-4">
        {logo ?? (
          <span className="flex size-9 mx-auto items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
            {logoText[0]}
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto w-full space-y-1">
        {sections.map((section, si) => (
          <div key={si}>
            {si > 0 && (
              <div className="w-6 mx-auto border-t border-border my-2" />
            )}
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <NavItem item={item} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
