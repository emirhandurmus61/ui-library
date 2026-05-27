"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/ui/code-block";

/* ─── Icons ──────────────────────────────────────────────────── */

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface ShowcaseSectionProps {
  title: string;
  description?: string;
  code?: string;
  lang?: string;
  filename?: string;
  /** Layout of the preview area */
  previewClassName?: string;
  children: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function ShowcaseSection({
  title,
  description,
  code,
  lang,
  filename,
  previewClassName,
  children,
  className,
}: ShowcaseSectionProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <section className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-foreground-subtle">{description}</p>
          )}
        </div>
        {code && (
          <button
            onClick={() => setShowCode((v) => !v)}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-[var(--radius-md)]",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
              showCode
                ? "bg-primary-subtle text-primary"
                : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
            )}
            aria-pressed={showCode}
          >
            {showCode ? <EyeIcon /> : <CodeIcon />}
            {showCode ? "Önizleme" : "Kodu Gör"}
          </button>
        )}
      </div>

      {/* Preview */}
      {!showCode && (
        <div
          className={cn(
            "rounded-[var(--radius-xl)] border border-border bg-background-subtle p-6",
            previewClassName
          )}
        >
          {children}
        </div>
      )}

      {/* Code */}
      {showCode && code && (
        <CodeBlock code={code} lang={lang} filename={filename} />
      )}
    </section>
  );
}
