import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterCenteredLink {
  label: string;
  href: string;
}

export interface FooterCenteredProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  links?: FooterCenteredLink[];
  socials?: React.ReactNode;
  copyright?: string;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterCentered({
  logoText = "Brand",
  logo,
  tagline,
  links = [],
  socials,
  copyright,
  className,
}: FooterCenteredProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border bg-surface", className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 flex flex-col items-center gap-6 text-center">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          {logo ?? (
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold shrink-0">
              {logoText[0]}
            </span>
          )}
          <span className="text-lg font-semibold text-foreground">{logoText}</span>
        </a>

        {/* Tagline */}
        {tagline && (
          <p className="text-sm text-foreground-muted max-w-sm leading-relaxed">
            {tagline}
          </p>
        )}

        {/* Nav links */}
        {links.length > 0 && (
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
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

        {/* Social icons */}
        {socials && (
          <div className="flex items-center justify-center gap-4 text-foreground-muted">
            {socials}
          </div>
        )}

        {/* Divider */}
        <div className="w-16 h-px bg-border" />

        {/* Copyright */}
        <p className="text-xs text-foreground-muted">
          {copyright ?? `© ${year} ${logoText}. All rights reserved.`}
        </p>
      </div>
    </footer>
  );
}
