import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterAppLink {
  label: string;
  href: string;
}

export interface FooterAppColumn {
  title: string;
  links: FooterAppLink[];
}

export interface FooterAppProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  columns?: FooterAppColumn[];
  copyright?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  className?: string;
}

/* ─── Inline store button SVGs ───────────────────────────────── */

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 fill-current" aria-hidden="true">
      <path d="M17.523 15.341c-.34 0-.614-.276-.614-.617V9.09c0-.34.275-.617.614-.617.34 0 .617.277.617.617v5.634c0 .34-.277.617-.617.617zm-11.046 0c-.34 0-.617-.276-.617-.617V9.09c0-.34.277-.617.617-.617.341 0 .617.277.617.617v5.634c0 .34-.276.617-.617.617zm8.122 2.568l.872 1.514c.055.098.02.222-.08.277-.099.055-.223.02-.278-.08l-.883-1.534A5.37 5.37 0 0 1 12 18.35a5.37 5.37 0 0 1-2.23-.464l-.883 1.534c-.055.099-.179.135-.278.08-.099-.055-.135-.18-.08-.277l.872-1.514A5.196 5.196 0 0 1 6.75 13.18h10.5a5.196 5.196 0 0 1-2.65 4.729zM9.5 14.75c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zm5 0c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75zM12 5.25a6.737 6.737 0 0 1 5.744 3.24H6.256A6.737 6.737 0 0 1 12 5.25zm-2.637-.87 1.06-1.836c.055-.098.02-.222-.079-.277-.098-.056-.222-.02-.277.079l-1.076 1.864A6.76 6.76 0 0 0 6.262 7.74h11.476A6.758 6.758 0 0 0 14.01 4.21L12.933 2.346c-.055-.099-.179-.135-.277-.079-.099.055-.134.18-.079.277l1.06 1.836A6.697 6.697 0 0 0 12 4.25a6.697 6.697 0 0 0-2.637.13z" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterApp({
  logoText = "Brand",
  logo,
  tagline,
  columns = [],
  copyright,
  appStoreUrl = "#",
  playStoreUrl = "#",
  className,
}: FooterAppProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border bg-surface", className)}>
      {/* Top section */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — branding + download buttons */}
          <div className="flex flex-col gap-6">
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

            {/* App store buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={appStoreUrl}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] bg-foreground text-background hover:opacity-90 transition-opacity w-fit"
              >
                <AppleLogo />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] opacity-70">Download on the</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </a>
              <a
                href={playStoreUrl}
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-md)] border border-border bg-surface text-foreground hover:bg-background-muted transition-colors w-fit"
              >
                <AndroidLogo />
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] text-foreground-muted">Get it on</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right — link columns */}
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
                          className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                        >
                          {link.label}
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

      {/* Bottom bar */}
      <div className="border-t border-border bg-background-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
          <p className="text-xs text-foreground-muted text-center sm:text-left">
            {copyright ?? `© ${year} ${logoText}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
