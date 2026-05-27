"use client";

import { useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const tabsListVariants = cva("flex", {
  variants: {
    variant: {
      line:    "border-b border-border gap-0",
      pill:    "bg-background-muted rounded-[var(--radius-lg)] p-1 gap-1 w-fit",
      boxed:   "border border-border rounded-[var(--radius-lg)] p-1 gap-1 w-fit bg-surface",
    },
  },
  defaultVariants: { variant: "line" },
});

const tabTriggerVariants = cva(
  [
    "inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
    "disabled:opacity-50 disabled:pointer-events-none",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        line: [
          "px-4 py-2.5 -mb-px border-b-2 border-transparent text-foreground-muted",
          "hover:text-foreground data-[active]:text-primary data-[active]:border-primary",
        ],
        pill: [
          "px-3.5 py-1.5 rounded-[var(--radius-md)] text-foreground-muted",
          "hover:text-foreground data-[active]:bg-surface data-[active]:text-foreground data-[active]:shadow-sm",
        ],
        boxed: [
          "px-3.5 py-1.5 rounded-[var(--radius-md)] text-foreground-muted",
          "hover:text-foreground data-[active]:bg-primary data-[active]:text-primary-foreground",
        ],
      },
    },
    defaultVariants: { variant: "line" },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsListVariants> {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  contentClassName?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Tabs({
  items,
  defaultTab,
  variant = "line",
  className,
  contentClassName,
}: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? items[0]?.id);
  const baseId = useId();

  const activeItem = items.find((t) => t.id === active);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab list */}
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(tabsListVariants({ variant }))}
      >
        {items.map((tab) => (
          <button
            key={tab.id}
            id={`${baseId}-tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={active === tab.id}
            aria-controls={`${baseId}-panel-${tab.id}`}
            disabled={tab.disabled}
            data-active={active === tab.id ? "" : undefined}
            onClick={() => setActive(tab.id)}
            className={cn(tabTriggerVariants({ variant }))}
          >
            {tab.icon && <span className="size-4" aria-hidden="true">{tab.icon}</span>}
            {tab.label}
            {tab.badge && <span>{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      {items.map((tab) => (
        <div
          key={tab.id}
          id={`${baseId}-panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={active !== tab.id}
          className={cn("mt-4", contentClassName)}
        >
          {activeItem?.id === tab.id && tab.content}
        </div>
      ))}
    </div>
  );
}
