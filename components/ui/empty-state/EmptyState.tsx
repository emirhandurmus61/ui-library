import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-8 gap-3",
        md: "py-12 gap-4",
        lg: "py-16 gap-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/* ─── Default Icon ───────────────────────────────────────────── */

function DefaultEmptyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-10 text-foreground-subtle"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function EmptyState({
  icon,
  title,
  description,
  action,
  size,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ size }), className)}>
      {/* Icon wrapper */}
      <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-sm">
        {icon ?? <DefaultEmptyIcon />}
      </div>

      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-foreground-muted leading-relaxed">{description}</p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}
