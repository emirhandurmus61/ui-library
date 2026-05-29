import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterSplitLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterSplitColumn {
  title: string;
  links: FooterSplitLink[];
}

export interface FooterSplitProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  columns?: FooterSplitColumn[];
  bottomLinks?: FooterSplitLink[];
  copyright?: string;
  socials?: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterSplit({
  logoText = "Brand",
  logo,
  tagline,
  columns = [],
  bottomLinks = [],
  copyright,
  socials,
  className,
}: FooterSplitProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border bg-surface", className)}>
      {/* Main split section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left — Branding */}
          <div className="flex flex-col gap-5">
            <a href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
              {logo ?? (
                <span className="flex size-10 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-base font-bold shrink-0">
                  {logoText[0]}
                </span>
              )}
              <span className="text-xl font-semibold text-foreground">{logoText}</span>
            </a>
            {tagline && (
              <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
                {tagline}
              </p>
            )}
            {socials && (
              <div className="flex items-center gap-3 text-foreground-muted mt-auto pt-2">
                {socials}
              </div>
            )}
          </div>

          {/* Right — Link columns grid */}
          {columns.length > 0 && (
            <div
              className="grid gap-8"
              style={{
                gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, minmax(0, 1fr))`,
              }}
            >
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                    {col.title}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                        >
                          {link.label}
                          {link.badge && (
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                              {link.badge}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar — separator + copyright */}
      <div className="border-t border-border bg-background-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-foreground-muted order-2 sm:order-1">
            {copyright ?? `© ${year} ${logoText}. All rights reserved.`}
          </p>
          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 order-1 sm:order-2">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-foreground-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
