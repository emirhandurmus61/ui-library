"use client";

import { cn } from "@/lib/utils";

export interface ShowcasePageHeaderProps {
  title: string;
  description?: string;
  /** Chip tags shown below description (e.g. "accessible", "keyboard nav") */
  tags?: string[];
  /** Import statement shown in a badge (e.g. `import { Button } from "@/components/ui/button"`) */
  importLine?: string;
  className?: string;
}

export function ShowcasePageHeader({
  title,
  description,
  tags,
  importLine,
  className,
}: ShowcasePageHeaderProps) {
  return (
    <header className={cn("space-y-3 pb-6 border-b border-border", className)}>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>

      {description && (
        <p className="text-sm text-foreground-muted leading-relaxed max-w-2xl">
          {description}
        </p>
      )}

      {importLine && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-foreground-subtle font-medium uppercase tracking-wider">
            Import
          </span>
          <code className="text-xs font-mono bg-surface border border-border rounded-[var(--radius-md)] px-2.5 py-1 text-foreground">
            {importLine}
          </code>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-subtle text-primary border border-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </header>
  );
}
