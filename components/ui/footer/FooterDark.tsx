import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterDarkLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterDarkColumn {
  title: string;
  links: FooterDarkLink[];
}

export interface FooterDarkProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  columns?: FooterDarkColumn[];
  bottomLinks?: FooterDarkLink[];
  copyright?: string;
  socials?: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterDark({
  logoText = "Brand",
  logo,
  tagline,
  columns = [],
  bottomLinks = [],
  copyright,
  socials,
  className,
}: FooterDarkProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full bg-[#0f172a]", className)}>
      {/* Gradient accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-transparent to-transparent" />

      {/* Main content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 xl:col-span-2 flex flex-col gap-4 pr-0 lg:pr-8">
            <a href="/" className="flex items-center gap-2.5 w-fit hover:opacity-80 transition-opacity">
              {logo ?? (
                <span className="flex size-8 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-bold shrink-0">
                  {logoText[0]}
                </span>
              )}
              <span className="font-semibold text-white">{logoText}</span>
            </a>
            {tagline && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                {tagline}
              </p>
            )}
            {socials && (
              <div className="flex items-center gap-3 mt-1 text-slate-400">
                {socials}
              </div>
            )}
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/20 text-primary">
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

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 order-2 sm:order-1">
            {copyright ?? `© ${year} ${logoText}. All rights reserved.`}
          </p>
          {bottomLinks.length > 0 && (
            <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 order-1 sm:order-2">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
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
