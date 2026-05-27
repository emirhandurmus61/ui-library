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
        sm:   "p-4",
        md:   "p-5",
        lg:   "p-6",
      },
    },
    defaultVariants: {
      variant: "basic",
      padding: "md",
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export interface CardHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/* ─── Sub-components ─────────────────────────────────────────── */

export function CardHeader({ title, description, action, className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 mb-4", className)} {...props}>
      <div className="flex-1 min-w-0">
        {title && <h3 className="text-base font-semibold text-foreground leading-snug">{title}</h3>}
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

export function Card({ variant, padding, className, children, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)} {...props}>
      {children}
    </div>
  );
}
