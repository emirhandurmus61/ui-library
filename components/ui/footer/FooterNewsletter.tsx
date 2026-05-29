"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterNewsletterLink {
  label: string;
  href: string;
}

export interface FooterNewsletterProps {
  logoText?: string;
  logo?: React.ReactNode;
  links?: FooterNewsletterLink[];
  copyright?: string;
  socials?: React.ReactNode;
  newsletterTitle?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterNewsletter({
  logoText = "Brand",
  logo,
  links = [],
  copyright,
  socials,
  newsletterTitle = "Stay in the loop",
  newsletterDescription = "Get the latest updates, articles, and resources delivered straight to your inbox.",
  newsletterPlaceholder = "Enter your email",
  onSubscribe,
  className,
}: FooterNewsletterProps) {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe?.(email.trim());
      setEmail("");
    }
  }

  return (
    <footer className={cn("w-full", className)}>
      {/* Newsletter banner */}
      <div className="w-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-sm">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                {newsletterTitle}
              </h2>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {newsletterDescription}
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-auto gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={newsletterPlaceholder}
                required
                className="flex-1 lg:w-64 px-3.5 py-2 text-sm rounded-[var(--radius-md)] border border-border bg-surface text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-[var(--radius-md)] bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Logo + copyright */}
            <div className="flex items-center gap-2.5">
              {logo ?? (
                <span className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                  {logoText[0]}
                </span>
              )}
              <span className="text-sm text-foreground-muted">
                {copyright ?? `© ${year} ${logoText}. All rights reserved.`}
              </span>
            </div>

            {/* Links */}
            {links.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Socials */}
            {socials && (
              <div className="flex items-center gap-3 text-foreground-muted">
                {socials}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
