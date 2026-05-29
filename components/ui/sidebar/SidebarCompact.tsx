"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { SidebarSection, SidebarItem } from "./types";

/* ─── Types ──────────────────────────────────────────────────── */

export interface SidebarCompactProps {
  sections: SidebarSection[];
  logoText?: string;
  logo?: React.ReactNode;
  user?: { name: string; email?: string; avatarSrc?: string };
  defaultSection?: number;
  className?: string;
}

/* ─── Panel nav item ─────────────────────────────────────────── */

function PanelItem({ item }: { item: SidebarItem }) {
  const base = cn(
    "group flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)]",
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

export function SidebarCompact({
  sections,
  logoText = "Brand",
  logo,
  user,
  defaultSection = 0,
  className,
}: SidebarCompactProps) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const currentSection = sections[activeSection] ?? sections[0];

  return (
    <aside className={cn("flex h-full w-64", className)}>
      {/* Left rail */}
      <div className="flex flex-col items-center w-14 bg-background-muted border-r border-border py-3 shrink-0">
        {/* Logo */}
        <div className="mb-4 shrink-0">
          {logo ?? (
            <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
              {logoText[0]}
            </span>
          )}
        </div>

        {/* Section icons */}
        <nav className="flex-1 flex flex-col items-center gap-1 w-full px-1.5">
          {sections.map((section, si) => {
            const isActive = si === activeSection;
            const firstItem = section.items[0];
            const sectionIcon = firstItem?.icon;

            return (
              <button
                key={si}
                onClick={() => setActiveSection(si)}
                className={cn(
                  "size-10 flex items-center justify-center rounded-lg",
                  "transition-colors duration-150 cursor-pointer",
                  "min-h-[44px]",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
                )}
                aria-label={section.label ?? `Section ${si + 1}`}
              >
                {sectionIcon ? (
                  <span className="size-5 flex items-center justify-center">{sectionIcon}</span>
                ) : (
                  <span className="text-xs font-bold">
                    {(section.label ?? `${si + 1}`)[0]}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User avatar in rail */}
        {user && (
          <div className="mt-auto pt-3 shrink-0">
            <Avatar name={user.name} src={user.avatarSrc} size="sm" />
          </div>
        )}
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col bg-surface overflow-hidden">
        {/* Section title */}
        {currentSection?.label && (
          <div className="px-3 pt-4 pb-2 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {currentSection.label}
            </p>
          </div>
        )}

        {/* Items */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="space-y-0.5">
            {currentSection?.items.map((item) => (
              <li key={item.label}>
                <PanelItem item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
