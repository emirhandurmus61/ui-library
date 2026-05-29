"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type PrintVariant = "default" | "minimal" | "icon" | "pill";

export interface PrintButtonProps {
  /** CSS selector of the element to print. If omitted, prints whole page. */
  targetSelector?: string;
  variant?: PrintVariant;
  size?: "sm" | "md" | "lg";
  label?: string;
  title?: string;
  /** Extra CSS injected into the print iframe */
  printStyles?: string;
  onBeforePrint?: () => void;
  onAfterPrint?: () => void;
  className?: string;
}

/* ─── Print icon ─────────────────────────────────────────────── */

function PrintIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden="true">
      <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
      <rect width="12" height="8" x="6" y="14"/>
    </svg>
  );
}

/* ─── Core print logic ────────────────────────────────────────── */

function printContent(
  targetSelector?: string,
  title?: string,
  printStyles?: string,
  onBefore?: () => void,
  onAfter?: () => void
) {
  onBefore?.();

  let html: string;

  if (targetSelector) {
    const el = document.querySelector(targetSelector);
    if (!el) { window.print(); onAfter?.(); return; }
    html = (el as HTMLElement).outerHTML;
  } else {
    window.print();
    onAfter?.();
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  if (!doc) { document.body.removeChild(iframe); onAfter?.(); return; }

  // Collect current stylesheets
  const styleLinks = Array.from(document.querySelectorAll("link[rel=stylesheet]"))
    .map((l) => l.outerHTML)
    .join("\n");
  const inlineStyles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  doc.open();
  doc.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title ?? document.title}</title>
  ${styleLinks}
  ${inlineStyles}
  <style>
    @media print {
      body { margin: 0; padding: 0; }
      * { box-sizing: border-box; }
      ${printStyles ?? ""}
    }
  </style>
</head>
<body>${html}</body>
</html>`);
  doc.close();

  iframe.contentWindow?.focus();

  const cleanup = () => {
    document.body.removeChild(iframe);
    onAfter?.();
  };

  iframe.contentWindow?.addEventListener("afterprint", cleanup, { once: true });
  setTimeout(() => {
    iframe.contentWindow?.print();
  }, 250);
}

/* ─── PrintButton ────────────────────────────────────────────── */

export function PrintButton({
  targetSelector,
  variant = "default",
  size = "md",
  label = "Yazdır",
  title,
  printStyles,
  onBeforePrint,
  onAfterPrint,
  className,
}: PrintButtonProps) {
  const [printing, setPrinting] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    printContent(
      targetSelector,
      title,
      printStyles,
      onBeforePrint,
      () => { setPrinting(false); onAfterPrint?.(); }
    );
  };

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-3.5 py-2 gap-2",
    lg: "text-base px-4 py-2.5 gap-2.5",
  };

  const base = cn(
    "inline-flex items-center font-medium rounded-[var(--radius-md)] transition-colors disabled:opacity-50",
    sizeClasses[size]
  );

  if (variant === "icon") {
    return (
      <button
        onClick={handlePrint}
        disabled={printing}
        className={cn(base, "bg-background-muted border border-border text-foreground-muted hover:text-foreground hover:bg-background-muted/80 !px-2 !py-2", className)}
        aria-label={label}
        title={label}
      >
        <PrintIcon />
      </button>
    );
  }

  if (variant === "minimal") {
    return (
      <button
        onClick={handlePrint}
        disabled={printing}
        className={cn("inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors disabled:opacity-50", className)}
      >
        <PrintIcon />
        {printing ? "Hazırlanıyor..." : label}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handlePrint}
        disabled={printing}
        className={cn(base, "rounded-full bg-background-muted border border-border text-foreground-muted hover:text-foreground", className)}
      >
        <PrintIcon />
        {printing ? "Hazırlanıyor..." : label}
      </button>
    );
  }

  // default
  return (
    <button
      onClick={handlePrint}
      disabled={printing}
      className={cn(base, "bg-background-muted border border-border text-foreground hover:bg-background-muted/80", className)}
    >
      <PrintIcon />
      {printing ? "Hazırlanıyor..." : label}
    </button>
  );
}
