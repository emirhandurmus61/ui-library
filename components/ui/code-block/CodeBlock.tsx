"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ─── Icons ──────────────────────────────────────────────────── */

function CopyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function CodeBlock({ code, lang = "tsx", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lines = code.trim().split("\n");

  return (
    <div className={cn("rounded-[var(--radius-xl)] overflow-hidden border border-border bg-[#0d0d10]", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-foreground-subtle ml-1 font-mono">
            {filename ?? lang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-[var(--radius-md)]",
            "transition-all duration-150",
            copied
              ? "text-emerald-400 bg-emerald-400/10"
              : "text-[#9ca3af] hover:text-white hover:bg-white/10"
          )}
          aria-label={copied ? "Kopyalandı" : "Kodu kopyala"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-5 text-sm font-mono leading-relaxed min-w-0">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-5">
              <span className="select-none text-right shrink-0 w-6 text-[#4b5563] text-xs leading-relaxed">
                {i + 1}
              </span>
              <code className="text-[#e2e8f0] flex-1 min-w-0 leading-relaxed">{line || " "}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
