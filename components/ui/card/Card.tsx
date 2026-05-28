"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const cardVariants = cva(
  "rounded-[var(--radius-xl)] bg-surface overflow-hidden",
  {
    variants: {
      variant: {
        basic:       "border border-border",
        bordered:    "border-2 border-border",
        elevated:    "border border-border shadow-md",
        interactive: [
          "border border-border shadow-sm",
          "transition-all duration-150 cursor-pointer",
          "hover:shadow-md hover:border-border-strong hover:-translate-y-0.5",
          "active:translate-y-0 active:shadow-sm",
        ],
        ghost: "bg-background-subtle",
      },
      padding: {
        none: "",
        sm:   "p-3 sm:p-4",
        md:   "p-4 sm:p-5",
        lg:   "p-5 sm:p-6",
      },
      /* ── Stil Presetleri (Faz 8) ──────────────────────────────
         variant ile kombinlenebilir; görsel katmanı override eder.
         Örnek: <Card variant="elevated" stylePreset="brutal">
      ──────────────────────────────────────────────────────────── */
      stylePreset: {
        default: "",

        /* Kalın siyah border + sağ-alt offset shadow, sert köşe */
        brutal: [
          "rounded-none! border-2! border-black! dark:border-white!",
          "shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.85)]",
          "bg-surface!",
        ],

        /* backdrop-blur + yarı-saydam cam efekti */
        glass: [
          "border! border-white/25! dark:border-white/15!",
          "bg-white/60! dark:bg-white/5!",
          "backdrop-blur-xl",
          "shadow-lg shadow-black/5",
          "rounded-[var(--radius-xl)]!",
        ],

        /* Gradient border: pseudo-element ile renk geçişli çerçeve */
        "gradient-border": [
          "relative border-none!",
          "before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)+1px)]",
          "before:bg-gradient-to-br before:from-primary before:via-violet-500 before:to-pink-500",
          "before:-z-10 before:p-[1.5px]",
          "after:absolute after:inset-[1.5px] after:rounded-[var(--radius-xl)] after:bg-surface after:-z-10",
          "shadow-sm",
        ],

        /* Düz + arka plan renk farkı, border/shadow yok; Notion tarzı */
        flat: [
          "border-none! shadow-none!",
          "bg-background-muted!",
          "rounded-[var(--radius-xl)]!",
        ],

        /* Hover'da parlak glow ring */
        glow: [
          "border border-border",
          "transition-all duration-300",
          "hover:border-primary/40 hover:shadow-[0_0_20px_0px] hover:shadow-primary/20",
          "hover:-translate-y-0.5",
        ],

        /* Noise texture overlay (SVG data URI) */
        noise: [
          "border border-border",
          "relative",
          "before:absolute before:inset-0 before:rounded-[var(--radius-xl)]",
          "before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMDAnIGhlaWdodD0nMjAwJz48ZmlsdGVyIGlkPSduJz48ZmVUdXJidWxlbmNlIHR5cGU9J2ZyYWN0YWxOb2lzZScgYmFzZUZyZXF1ZW5jeT0nMC45JyBzdGl0Y2hUaWxlcz0nc3RpdGNoJy8+PGZlQ29sb3JNYXRyaXggdHlwZT0nc2F0dXJhdGUnIHZhbHVlcz0nMCcvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbHRlcj0ndXJsKCNuKScgb3BhY2l0eT0nMC4wNScvPjwvc3ZnPg==')] before:opacity-100 before:pointer-events-none",
          "before:mix-blend-overlay",
          "shadow-sm",
        ],
      },
    },
    defaultVariants: {
      variant:     "basic",
      padding:     "md",
      stylePreset: "default",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?:       React.ReactNode;
  description?: React.ReactNode;
  action?:      React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/* ─── Sub-components ─────────────────────────────────────────── */

export function CardHeader({ title, description, action, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-4", className)} {...props}>
      <div className="flex-1 min-w-0">
        {title       && <h3 className="text-base font-semibold text-foreground leading-snug">{title}</h3>}
        {description && <p className="mt-0.5 text-sm text-foreground-muted">{description}</p>}
        {children}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn(
        "mt-4 pt-4 border-t border-border flex items-center justify-end gap-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────── */

export function Card({ variant, padding, stylePreset, className, children, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding, stylePreset }), className)} {...props}>
      {children}
    </div>
  );
}
