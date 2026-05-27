import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle shrink-0" aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SlashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle shrink-0" aria-hidden="true">
      <line x1="16" y1="4" x2="8" y2="20" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash" | React.ReactNode;
  maxItems?: number;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Breadcrumb({
  items,
  separator = "chevron",
  maxItems,
  className,
}: BreadcrumbProps) {
  let visibleItems = items;

  // Collapse middle items if maxItems is set
  if (maxItems && items.length > maxItems) {
    const head = items.slice(0, 1);
    const tail = items.slice(-(maxItems - 1));
    visibleItems = [
      ...head,
      { label: "…" },
      ...tail,
    ];
  }

  const sep =
    separator === "chevron" ? <ChevronIcon /> :
    separator === "slash"   ? <SlashIcon />   :
    separator;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {visibleItems.map((item, i) => {
          const isLast = i === visibleItems.length - 1;

          return (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden="true">{sep}</span>}

              {isLast || !item.href ? (
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    isLast
                      ? "font-medium text-foreground"
                      : "text-foreground-muted"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon && <span className="size-3.5" aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors duration-150"
                >
                  {item.icon && <span className="size-3.5" aria-hidden="true">{item.icon}</span>}
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
