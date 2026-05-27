import { cn } from "@/lib/utils";

export interface FooterMinimalLink {
  label: string;
  href: string;
}

export interface FooterMinimalProps {
  logoText?: string;
  logo?: React.ReactNode;
  links?: FooterMinimalLink[];
  copyright?: string;
  socials?: React.ReactNode;
  className?: string;
}

export function FooterMinimal({
  logoText = "Brand",
  logo,
  links = [],
  copyright,
  socials,
  className,
}: FooterMinimalProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Sol — Logo + copyright */}
          <div className="flex items-center gap-2.5">
            {logo ?? (
              <span className="flex size-6 items-center justify-center rounded-[var(--radius-sm)] bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                {logoText[0]}
              </span>
            )}
            <span className="text-sm text-foreground-muted">
              {copyright ?? `© ${year} ${logoText}. Tüm hakları saklıdır.`}
            </span>
          </div>

          {/* Orta — linkler */}
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

          {/* Sağ — sosyal ikonlar */}
          {socials && (
            <div className="flex items-center gap-3 text-foreground-muted">
              {socials}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
