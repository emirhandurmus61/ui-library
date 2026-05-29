import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type ReadingTimeVariant = "badge" | "inline" | "pill" | "icon" | "detailed";

export interface ReadingTimeProps {
  /** Pass raw text content or word count */
  content?: string;
  words?: number;
  /** Words per minute (default: 200) */
  wpm?: number;
  variant?: ReadingTimeVariant;
  showIcon?: boolean;
  className?: string;
}

/* ─── Calculation ────────────────────────────────────────────── */

function calcReadingTime(content?: string, words?: number, wpm = 200): { minutes: number; wordCount: number } {
  const wordCount = words ?? (content ? content.trim().split(/\s+/).filter(Boolean).length : 0);
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  return { minutes, wordCount };
}

/* ─── Clock icon ─────────────────────────────────────────────── */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3.5 shrink-0", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
    </svg>
  );
}

/* ─── ReadingTime ────────────────────────────────────────────── */

export function ReadingTime({
  content,
  words,
  wpm = 200,
  variant = "badge",
  showIcon = true,
  className,
}: ReadingTimeProps) {
  const { minutes, wordCount } = calcReadingTime(content, words, wpm);
  const label = `${minutes} dk okuma`;

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-sm text-foreground-muted", className)}>
        {showIcon && <ClockIcon />}
        {label}
      </span>
    );
  }

  if (variant === "pill") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-background-muted border border-border text-foreground-muted", className)}>
        {showIcon && <ClockIcon />}
        {label}
      </span>
    );
  }

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex items-center gap-1 text-xs text-foreground-subtle", className)} title={label}>
        <ClockIcon />
        <span>{minutes} dk</span>
      </span>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={cn("flex items-center gap-3 text-sm text-foreground-muted", className)}>
        <span className="inline-flex items-center gap-1.5">
          <ClockIcon />
          <span className="font-medium text-foreground">{minutes} dk okuma</span>
        </span>
        <span className="text-border">·</span>
        <span>{wordCount.toLocaleString("tr-TR")} kelime</span>
      </div>
    );
  }

  // badge (default)
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-[var(--radius-md)] bg-primary-subtle text-primary border border-primary/20", className)}>
      {showIcon && <ClockIcon className="size-3" />}
      {label}
    </span>
  );
}
