import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const listVariants = cva("w-full", {
  variants: {
    variant: {
      default:  "divide-y divide-border",
      bordered: "border border-border rounded-[var(--radius-xl)] divide-y divide-border overflow-hidden",
      flush:    "divide-y divide-border",
      ghost:    "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const listItemVariants = cva(
  "flex items-center gap-3 text-sm",
  {
    variants: {
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-5 py-4",
      },
      interactive: {
        true:  "cursor-pointer hover:bg-background-muted transition-colors duration-100",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      interactive: false,
    },
  }
);

/* ─── Types ──────────────────────────────────────────────────── */

export interface ListProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof listVariants> {}

export interface ListItemProps
  extends Omit<React.LiHTMLAttributes<HTMLLIElement>, "title">,
    VariantProps<typeof listItemVariants> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
}

/* ─── List ───────────────────────────────────────────────────── */

export function List({ variant, className, children, ...props }: ListProps) {
  return (
    <ul
      className={cn(listVariants({ variant }), className)}
      {...props}
    >
      {children}
    </ul>
  );
}

/* ─── ListItem ───────────────────────────────────────────────── */

export function ListItem({
  leading,
  trailing,
  title,
  description,
  selected = false,
  size,
  interactive,
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn(
        listItemVariants({ size, interactive }),
        selected && "bg-primary-subtle",
        className
      )}
      aria-selected={selected}
      {...props}
    >
      {leading && (
        <span className="shrink-0 text-foreground-muted">{leading}</span>
      )}

      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-medium text-foreground truncate">{title}</p>
        )}
        {description && (
          <p className="text-xs text-foreground-muted mt-0.5 truncate">{description}</p>
        )}
        {children}
      </div>

      {trailing && (
        <span className="shrink-0 text-foreground-muted">{trailing}</span>
      )}
    </li>
  );
}
