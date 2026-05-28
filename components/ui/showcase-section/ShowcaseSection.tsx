"use client";

import { useState, useEffect } from "react";
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

function MonitorIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}

function TabletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

type Viewport = "desktop" | "tablet" | "mobile";

const VIEWPORT_WIDTHS: Record<Viewport, string | undefined> = {
  desktop: undefined,
  tablet: "768px",
  mobile: "375px",
};

const VIEWPORT_LABELS: Record<Viewport, string> = {
  desktop: "Desktop",
  tablet: "Tablet",
  mobile: "Mobil",
};

export interface ShowcaseSectionProps {
  title: string;
  description?: string;
  code?: string;
  lang?: string;
  filename?: string;
  /** Optional import statement prepended when copying "Import dahil" */
  importLine?: string;
  /** Layout of the preview area */
  previewClassName?: string;
  /** Show viewport toggle buttons */
  viewportToggle?: boolean;
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
  importLine,
  previewClassName,
  viewportToggle = false,
  children,
  className,
}: ShowcaseSectionProps) {
  const [showCode, setShowCode] = useState(false);
  const [copyMode, setCopyMode] = useState<"jsx" | "import">("jsx");
  const [viewport, setViewport] = useState<Viewport>(() => {
    if (typeof window === "undefined") return "desktop";
    return (localStorage.getItem("showcase-viewport") as Viewport) ?? "desktop";
  });

  useEffect(() => {
    localStorage.setItem("showcase-viewport", viewport);
  }, [viewport]);

  const viewportWidth = VIEWPORT_WIDTHS[viewport];

  const copyCode = copyMode === "import" && importLine && code
    ? `${importLine}\n\n${code.trim()}`
    : code?.trim() ?? "";

  return (
    <section className={cn("space-y-3", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-foreground-subtle">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Viewport toggle */}
          {viewportToggle && !showCode && (
            <div className="flex items-center rounded-[var(--radius-md)] border border-border overflow-hidden">
              {(["desktop", "tablet", "mobile"] as Viewport[]).map((vp) => (
                <button
                  key={vp}
                  onClick={() => setViewport(vp)}
                  title={VIEWPORT_LABELS[vp]}
                  className={cn(
                    "px-2 py-1.5 text-xs transition-colors duration-150 flex items-center gap-1",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    viewport === vp
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                  )}
                  aria-pressed={viewport === vp}
                >
                  {vp === "desktop" && <MonitorIcon />}
                  {vp === "tablet" && <TabletIcon />}
                  {vp === "mobile" && <MobileIcon />}
                </button>
              ))}
            </div>
          )}

          {/* Copy mode toggle (only shown when code exists and in code view) */}
          {code && showCode && importLine && (
            <div className="flex items-center rounded-[var(--radius-md)] border border-border overflow-hidden text-xs">
              <button
                onClick={() => setCopyMode("jsx")}
                className={cn(
                  "px-2.5 py-1.5 transition-colors duration-150",
                  copyMode === "jsx"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                )}
              >
                Sadece JSX
              </button>
              <button
                onClick={() => setCopyMode("import")}
                className={cn(
                  "px-2.5 py-1.5 transition-colors duration-150 border-l border-border",
                  copyMode === "import"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                )}
              >
                Import dahil
              </button>
            </div>
          )}

          {/* Preview / Code toggle */}
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
      </div>

      {/* Preview */}
      {!showCode && (
        <div className="rounded-[var(--radius-xl)] border border-border bg-background-subtle overflow-x-auto">
          {viewportToggle && viewportWidth ? (
            /* Constrained viewport — previewClassName applies inside the constrained box */
            <div style={{ width: viewportWidth }} className="mx-auto">
              <div className={cn("p-6", previewClassName)}>{children}</div>
            </div>
          ) : (
            /* Full width — previewClassName applies to the content wrapper */
            <div className={cn("p-6", previewClassName)}>{children}</div>
          )}
        </div>
      )}

      {/* Code */}
      {showCode && code && (
        <CodeBlock code={copyCode} lang={lang} filename={filename} />
      )}
    </section>
  );
}
