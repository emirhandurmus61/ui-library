"use client";

import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface BottomNavItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  badge?: number;
}

export interface BottomNavProps {
  /** 3–5 navigation items */
  items: BottomNavItem[];
  className?: string;
}

/* ─── Item ───────────────────────────────────────────────────── */

function NavItem({ item }: { item: BottomNavItem }) {
  const sharedClass = cn(
    "relative flex flex-col items-center justify-center gap-0.5",
    "min-w-[64px] min-h-[44px] py-2 px-1",
    "text-[10px] font-medium leading-none",
    "transition-colors duration-150",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    item.active ? "text-primary" : "text-foreground-muted",
    "hover:text-foreground"
  );

  const content = (
    <>
      {/* icon wrapper — badge is anchored here */}
      <span className="relative flex items-center justify-center">
        <span className="size-5 flex items-center justify-center" aria-hidden="true">
          {item.icon}
        </span>

        {/* badge */}
        {item.badge !== undefined && item.badge > 0 && (
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5",
              "flex items-center justify-center",
              "min-w-[16px] h-4 px-[3px]",
              "rounded-[var(--radius-full)]",
              "bg-danger text-white text-[9px] font-bold leading-none",
              "pointer-events-none select-none"
            )}
            aria-label={`${item.badge} bildirim`}
          >
            {item.badge > 99 ? "99+" : item.badge}
          </span>
        )}
      </span>

      <span>{item.label}</span>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={sharedClass}
        aria-current={item.active ? "page" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={item.onClick}
      className={sharedClass}
      aria-pressed={item.active}
    >
      {content}
    </button>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      className={cn(
        // position
        "fixed bottom-0 inset-x-0 z-40",
        // background + border
        "bg-surface border-t border-border",
        // safe-area padding at bottom (iOS notch)
        "pb-[env(safe-area-inset-bottom,1rem)]",
        className
      )}
      aria-label="Gezinti çubuğu"
    >
      <ul
        className={cn(
          "flex items-center justify-around",
          "min-h-[56px]"
        )}
        role="list"
      >
        {items.map((item, i) => (
          <li key={i} className="flex-1 flex justify-center">
            <NavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
