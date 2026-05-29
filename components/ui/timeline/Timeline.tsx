"use client";

import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary";
}

export interface TimelineProps {
  items: TimelineItem[];
  /** "left": all items left-aligned (default + mobile fallback).
   *  "alternate": items alternate sides at md+ breakpoint.
   *  "horizontal": horizontal scrollable timeline. */
  variant?: "left" | "alternate" | "horizontal";
  className?: string;
}

/* ─── Variant style maps ─────────────────────────────────────── */

const dotBorderMap: Record<NonNullable<TimelineItem["variant"]>, string> = {
  default: "border-border bg-surface",
  success: "border-success bg-success-subtle text-success",
  warning: "border-warning bg-warning-subtle text-warning",
  danger:  "border-danger bg-danger-subtle text-danger",
  primary: "border-primary bg-primary-subtle text-primary",
};

/* ─── Dot ────────────────────────────────────────────────────── */

function TimelineDot({
  icon,
  itemVariant = "default",
}: {
  icon?: React.ReactNode;
  itemVariant?: TimelineItem["variant"];
}) {
  return (
    <span
      className={cn(
        "shrink-0 size-8 rounded-full border-2",
        "flex items-center justify-center",
        dotBorderMap[itemVariant ?? "default"]
      )}
      aria-hidden="true"
    >
      {icon && (
        <span className="size-4 flex items-center justify-center">{icon}</span>
      )}
    </span>
  );
}

/* ─── Left variant ───────────────────────────────────────────── */

function LeftTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol className={cn("relative", className)} aria-label="Zaman çizelgesi">
      {/* vertical line */}
      <span
        className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border"
        aria-hidden="true"
      />

      {items.map((item, i) => (
        <li key={i} className="relative pl-10 pb-8 last:pb-0">
          {/* dot */}
          <span className="absolute left-0 top-0">
            <TimelineDot icon={item.icon} itemVariant={item.variant} />
          </span>

          {/* content */}
          <div>
            {item.date && (
              <time className="text-xs text-foreground-subtle">{item.date}</time>
            )}
            <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">
              {item.title}
            </p>
            {item.description && (
              <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ─── Alternate variant ──────────────────────────────────────── */

function AlternateTimeline({
  items,
  className,
}: {
  items: TimelineItem[];
  className?: string;
}) {
  return (
    <ol
      className={cn("relative", className)}
      aria-label="Zaman çizelgesi"
    >
      {/* center line — hidden on mobile, shown md+ */}
      <span
        className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"
        aria-hidden="true"
      />
      {/* mobile left line */}
      <span
        className="block md:hidden absolute left-[15px] top-0 bottom-0 w-0.5 bg-border"
        aria-hidden="true"
      />

      {items.map((item, i) => {
        const isEven = i % 2 === 0;

        return (
          <li
            key={i}
            className={cn(
              // mobile: same as left layout
              "relative pl-10 pb-8 last:pb-0",
              // desktop: full-width flex row
              "md:pl-0 md:flex md:items-start md:gap-0 md:pb-10 md:last:pb-0"
            )}
          >
            {/* ── Mobile dot (absolute left) ── */}
            <span className="md:hidden absolute left-0 top-0">
              <TimelineDot icon={item.icon} itemVariant={item.variant} />
            </span>

            {/* ── Desktop: left content slot ── */}
            <div
              className={cn(
                "hidden md:block md:flex-1 md:pr-12",
                isEven ? "md:text-right" : "md:invisible"
              )}
            >
              {isEven && (
                <>
                  {item.date && (
                    <time className="text-xs text-foreground-subtle">
                      {item.date}
                    </time>
                  )}
                  <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* ── Desktop: center dot ── */}
            <div className="hidden md:flex md:shrink-0 md:items-center md:justify-center md:relative md:z-10">
              <TimelineDot icon={item.icon} itemVariant={item.variant} />
            </div>

            {/* ── Desktop: right content slot ── */}
            <div
              className={cn(
                "hidden md:block md:flex-1 md:pl-12",
                !isEven ? "" : "md:invisible"
              )}
            >
              {!isEven && (
                <>
                  {item.date && (
                    <time className="text-xs text-foreground-subtle">
                      {item.date}
                    </time>
                  )}
                  <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </>
              )}
            </div>

            {/* ── Mobile content ── */}
            <div className="md:hidden">
              {item.date && (
                <time className="text-xs text-foreground-subtle">
                  {item.date}
                </time>
              )}
              <p className="text-sm font-semibold text-foreground leading-snug mt-0.5">
                {item.title}
              </p>
              {item.description && (
                <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ─── Horizontal timeline ────────────────────────────────────── */

function HorizontalTimeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <div className={cn("w-full overflow-x-auto pb-2", className)}>
      <ol className="flex items-start min-w-max px-4" aria-label="Zaman çizelgesi">
        {items.map((item, i) => (
          <li key={i} className="relative flex flex-col items-center" style={{ minWidth: "140px" }}>
            {/* Connector line */}
            {i < items.length - 1 && (
              <span
                className="absolute top-4 left-1/2 w-full h-0.5 bg-border"
                style={{ transform: "translateY(-50%)" }}
                aria-hidden="true"
              />
            )}
            {/* Dot */}
            <span className="relative z-10">
              <TimelineDot icon={item.icon} itemVariant={item.variant} />
            </span>
            {/* Content below */}
            <div className="mt-3 text-center px-2 max-w-[130px]">
              {item.date && (
                <time className="text-[10px] text-foreground-subtle block mb-0.5">{item.date}</time>
              )}
              <p className="text-sm font-semibold text-foreground leading-snug">{item.title}</p>
              {item.description && (
                <p className="text-xs text-foreground-muted mt-1 leading-relaxed">{item.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function Timeline({ items, variant = "left", className }: TimelineProps) {
  if (variant === "alternate") {
    return <AlternateTimeline items={items} className={className} />;
  }
  if (variant === "horizontal") {
    return <HorizontalTimeline items={items} className={className} />;
  }
  return <LeftTimeline items={items} className={className} />;
}
