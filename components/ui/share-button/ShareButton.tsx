"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type ShareVariant = "default" | "minimal" | "icon" | "pill" | "dropdown";

export interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  variant?: ShareVariant;
  size?: "sm" | "md" | "lg";
  label?: string;
  showCopyFeedback?: boolean;
  platforms?: SharePlatform[];
  className?: string;
}

export type SharePlatform = "copy" | "twitter" | "linkedin" | "whatsapp" | "telegram" | "email";

/* ─── Platform config ────────────────────────────────────────── */

interface PlatformConfig {
  label: string;
  color: string;
  icon: React.ReactNode;
  getUrl: (url: string, title: string, text: string) => string | null;
}

const PLATFORMS: Record<SharePlatform, PlatformConfig> = {
  copy: {
    label: "Linki Kopyala",
    color: "text-foreground-muted hover:text-foreground",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>,
    getUrl: () => null,
  },
  twitter: {
    label: "X (Twitter)",
    color: "text-foreground-muted hover:text-foreground",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  linkedin: {
    label: "LinkedIn",
    color: "text-[#0077b5] hover:text-[#005885]",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>,
    getUrl: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  whatsapp: {
    label: "WhatsApp",
    color: "text-[#25d366] hover:text-[#1da851]",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  telegram: {
    label: "Telegram",
    color: "text-[#26a5e4] hover:text-[#1a86bc]",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
    getUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  email: {
    label: "E-posta",
    color: "text-foreground-muted hover:text-foreground",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
    getUrl: (url, title, text) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + "\n\n" + url)}`,
  },
};

const DEFAULT_PLATFORMS: SharePlatform[] = ["copy", "twitter", "linkedin", "whatsapp", "telegram", "email"];

/* ─── Share icon ─────────────────────────────────────────────── */

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-4", className)} aria-hidden="true">
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

/* ─── Core share logic ────────────────────────────────────────── */

function useShare(url: string, title: string, text: string) {
  const [copied, setCopied] = useState(false);

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try { await navigator.share({ url, title, text }); return true; } catch { return false; }
    }
    return false;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement("input");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openPlatform = (platform: SharePlatform) => {
    if (platform === "copy") { copyLink(); return; }
    const cfg = PLATFORMS[platform];
    const shareUrl = cfg.getUrl(url, title, text);
    if (shareUrl) window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return { nativeShare, copyLink, openPlatform, copied };
}

/* ─── ShareButton ────────────────────────────────────────────── */

export function ShareButton({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Bu sayfayı paylaş",
  text = "",
  variant = "default",
  size = "md",
  label = "Paylaş",
  platforms = DEFAULT_PLATFORMS,
  className,
}: ShareButtonProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { nativeShare, openPlatform, copied } = useShare(url, title, text);

  const sizeClasses = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-3.5 py-2 gap-2",
    lg: "text-base px-4 py-2.5 gap-2.5",
  };

  const baseBtn = cn(
    "inline-flex items-center font-medium rounded-[var(--radius-md)] transition-colors",
    sizeClasses[size]
  );

  /* icon-only */
  if (variant === "icon") {
    return (
      <button
        onClick={async () => { if (!(await nativeShare())) openPlatform("copy"); }}
        className={cn(baseBtn, "bg-background-muted border border-border text-foreground-muted hover:text-foreground hover:bg-background-muted/80", "!px-2 !py-2", className)}
        aria-label={label}
      >
        {copied
          ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-4 text-success" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          : <ShareIcon />}
      </button>
    );
  }

  /* pill */
  if (variant === "pill") {
    return (
      <button
        onClick={async () => { if (!(await nativeShare())) openPlatform("copy"); }}
        className={cn(baseBtn, "rounded-full bg-background-muted border border-border text-foreground-muted hover:text-foreground", className)}
        aria-label={label}
      >
        <ShareIcon />
        {copied ? "Kopyalandı!" : label}
      </button>
    );
  }

  /* minimal */
  if (variant === "minimal") {
    return (
      <button
        onClick={async () => { if (!(await nativeShare())) openPlatform("copy"); }}
        className={cn("inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors", className)}
      >
        <ShareIcon />
        {copied ? "Kopyalandı!" : label}
      </button>
    );
  }

  /* dropdown */
  if (variant === "dropdown") {
    return (
      <div className={cn("relative inline-block", className)}>
        <button
          onClick={() => setDropdownOpen(v => !v)}
          className={cn(baseBtn, "bg-background-muted border border-border text-foreground hover:bg-background-muted/80")}
          aria-expanded={dropdownOpen}
          aria-haspopup="menu"
        >
          <ShareIcon />
          {label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3 transition-transform", dropdownOpen && "rotate-180")} aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        {dropdownOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} aria-hidden="true" />
            <div className="absolute top-full left-0 mt-1.5 w-48 rounded-[var(--radius-xl)] border border-border bg-surface shadow-lg z-20 py-1 overflow-hidden">
              {platforms.map(p => {
                const cfg = PLATFORMS[p];
                return (
                  <button
                    key={p}
                    onClick={() => { openPlatform(p); setDropdownOpen(false); }}
                    className={cn("w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-background-muted transition-colors", cfg.color)}
                  >
                    {cfg.icon}
                    {p === "copy" && copied ? "Kopyalandı! ✓" : cfg.label}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    );
  }

  /* default — platform buttons row */
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {platforms.map(p => {
        const cfg = PLATFORMS[p];
        return (
          <button
            key={p}
            onClick={() => openPlatform(p)}
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[var(--radius-md)] border border-border bg-surface hover:bg-background-muted transition-colors",
              cfg.color
            )}
            title={cfg.label}
            aria-label={cfg.label}
          >
            {cfg.icon}
            <span className="hidden sm:inline">{p === "copy" && copied ? "Kopyalandı!" : cfg.label}</span>
          </button>
        );
      })}
    </div>
  );
}
