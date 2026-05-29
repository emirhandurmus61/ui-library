import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterStackedLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterStackedColumn {
  title: string;
  links: FooterStackedLink[];
}

export interface FooterStackedProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  columns?: FooterStackedColumn[];
  bottomLinks?: FooterStackedLink[];
  copyright?: string;
  socials?: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterStacked({
  logoText = "Brand",
  logo,
  tagline,
  columns = [],
  bottomLinks = [],
  copyright,
  socials,
  className,
}: FooterStackedProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border", className)}>

      {/* ── Band 1: Top — columns + branding ────────────────── */}
      <div className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 xl:col-span-2 flex flex-col gap-3 pr-0 lg:pr-8">
              <a href="/" className="flex items-center gap-2.5 w-fit hover:opacity-80 transition-opacity">
                {logo ?? (
                  <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold shrink-0">
                    {logoText[0]}
                  </span>
                )}
                <span className="font-semibold text-foreground">{logoText}</span>
              </a>
              {tagline && (
                <p className="text-sm text-foreground-muted leading-relaxed max-w-xs">
                  {tagline}
                </p>
              )}
            </div>

            {/* Columns */}
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
        </div>
      </div>

      {/* ── Band 2: Middle — socials centered ───────────────── */}
      <div className="bg-background-muted border-y border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
          {socials ? (
            <div className="flex items-center justify-center gap-5 text-foreground-muted">
              {socials}
            </div>
          ) : (
            <div className="h-4" />
          )}
        </div>
      </div>

      {/* ── Band 3: Bottom — copyright + legal links ─────────── */}
      <div className="bg-[color-mix(in_srgb,var(--color-background-muted)_70%,var(--color-border)_30%)]">
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
