import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface FooterGradientLink {
  label: string;
  href: string;
}

export interface FooterGradientProps {
  logoText?: string;
  logo?: React.ReactNode;
  links?: FooterGradientLink[];
  copyright?: string;
  socials?: React.ReactNode;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function FooterGradient({
  logoText = "Brand",
  logo,
  links = [],
  copyright,
  socials,
  gradientFrom = "#6366f1",
  gradientVia = "#a855f7",
  gradientTo = "#ec4899",
  className,
}: FooterGradientProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full bg-surface", className)}>
      {/* Colorful gradient top border */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
        }}
      />

      {/* Main row */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity shrink-0">
            {logo ?? (
              <span
                className="flex size-8 items-center justify-center rounded-[var(--radius-md)] text-white text-sm font-bold shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                }}
              >
                {logoText[0]}
              </span>
            )}
            <span className="font-semibold text-foreground">{logoText}</span>
          </a>

          {/* Nav links */}
          {links.length > 0 && (
            <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
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

          {/* Right side — socials + copyright */}
          <div className="flex items-center gap-4">
            {socials && (
              <div className="flex items-center gap-3 text-foreground-muted">
                {socials}
              </div>
            )}
            <p className="text-xs text-foreground-muted whitespace-nowrap">
              {copyright ?? `© ${year} ${logoText}`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
