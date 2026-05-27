"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4 shrink-0 text-foreground-muted transition-transform duration-200", open && "rotate-180")}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface AccordionItemData {
  id: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemData[];
  multiple?: boolean;
  defaultOpen?: string[];
  variant?: "default" | "bordered" | "flush";
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Accordion({
  items,
  multiple = false,
  defaultOpen = [],
  variant = "default",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));
  const baseId = useId();

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const wrapperClass = cn(
    variant === "bordered" && "border border-border rounded-[var(--radius-xl)] overflow-hidden divide-y divide-border",
    variant === "default" && "divide-y divide-border border border-border rounded-[var(--radius-xl)] overflow-hidden",
    variant === "flush" && "divide-y divide-border",
    className
  );

  return (
    <div className={wrapperClass}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `${baseId}-trigger-${item.id}`;
        const panelId = `${baseId}-panel-${item.id}`;

        return (
          <div key={item.id} className="bg-surface">
            {/* Trigger */}
            <button
              id={triggerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              onClick={() => toggle(item.id)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-5 py-4",
                "text-sm font-medium text-foreground text-left",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40",
                !item.disabled && "hover:bg-background-muted cursor-pointer",
                item.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {item.trigger}
              <ChevronIcon open={isOpen} />
            </button>

            {/* Panel */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden transition-all duration-200",
                isOpen ? "max-h-[2000px]" : "max-h-0"
              )}
            >
              <div className="px-5 pb-5 pt-1 text-sm text-foreground-muted leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
