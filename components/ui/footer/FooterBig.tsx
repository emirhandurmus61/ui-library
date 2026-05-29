import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterBigLink {
  label: string;
  href: string;
  badge?: string;
}

export interface FooterBigColumn {
  title: string;
  links: FooterBigLink[];
}

export interface FooterBigProps {
  logoText?: string;
  logo?: React.ReactNode;
  tagline?: string;
  email?: string;
  phone?: string;
  address?: string;
  columns?: FooterBigColumn[];
  bottomLinks?: FooterBigLink[];
  copyright?: string;
  socials?: React.ReactNode;
  className?: string;
}

/* ─── Contact row helper ─────────────────────────────────────── */

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0 fill-current opacity-60" aria-hidden="true">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0 fill-current opacity-60" aria-hidden="true">
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4 shrink-0 fill-current opacity-60" aria-hidden="true">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterBig({
  logoText = "Brand",
  logo,
  tagline,
  email,
  phone,
  address,
  columns = [],
  bottomLinks = [],
  copyright,
  socials,
  className,
}: FooterBigProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border bg-surface", className)}>
      {/* Brand hero section */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
          <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">

            {/* Left — logo + tagline */}
            <div className="flex flex-col gap-4 max-w-sm">
              <a href="/" className="flex items-center gap-3 w-fit hover:opacity-80 transition-opacity">
                {logo ?? (
                  <span className="flex size-12 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xl font-bold shrink-0">
                    {logoText[0]}
                  </span>
                )}
                <span className="text-2xl font-bold text-foreground">{logoText}</span>
              </a>
              {tagline && (
                <p className="text-base text-foreground-muted leading-relaxed">
                  {tagline}
                </p>
              )}
              {socials && (
                <div className="flex items-center gap-4 mt-2 text-foreground-muted">
                  {socials}
                </div>
              )}
            </div>

            {/* Right — contact info */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">
                Contact
              </p>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <MailIcon />
                  {email}
                </a>
              )}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-2.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <PhoneIcon />
                  {phone}
                </a>
              )}
              {address && (
                <p className="flex items-start gap-2.5 text-sm text-foreground-muted">
                  <PinIcon />
                  <span className="leading-relaxed">{address}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4-column links section */}
      {columns.length > 0 && (
        <div className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
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
      )}

      {/* Bottom bar — language + copyright */}
      <div className="bg-background-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted order-2 sm:order-1">
            <span>🌐 English</span>
            <span className="text-border mx-1">·</span>
            <span>{copyright ?? `© ${year} ${logoText}. All rights reserved.`}</span>
          </div>
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
