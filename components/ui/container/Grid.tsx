import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Grid wrapper ───────────────────────────────────────────── */

const gridVariants = cva("grid", {
  variants: {
    cols: {
      1:  "grid-cols-1",
      2:  "grid-cols-1 sm:grid-cols-2",
      3:  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4:  "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5:  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
      6:  "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      12: "grid-cols-12",
    },
    gap: {
      none: "gap-0",
      xs:   "gap-2",
      sm:   "gap-3",
      md:   "gap-4 sm:gap-6",
      lg:   "gap-6 sm:gap-8",
      xl:   "gap-8 sm:gap-12",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: "md",
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

export function Grid({ className, cols, gap, children, ...props }: GridProps) {
  return (
    <div className={cn(gridVariants({ cols, gap }), className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Grid item (col-span) ───────────────────────────────────── */

const colVariants = cva("", {
  variants: {
    span: {
      1:  "col-span-1",
      2:  "col-span-2",
      3:  "col-span-3",
      4:  "col-span-4",
      5:  "col-span-5",
      6:  "col-span-6",
      7:  "col-span-7",
      8:  "col-span-8",
      9:  "col-span-9",
      10: "col-span-10",
      11: "col-span-11",
      12: "col-span-12",
      full: "col-span-full",
    },
    spanSm: {
      1: "sm:col-span-1", 2: "sm:col-span-2", 3: "sm:col-span-3",
      4: "sm:col-span-4", 5: "sm:col-span-5", 6: "sm:col-span-6",
      full: "sm:col-span-full",
    },
    spanLg: {
      1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3",
      4: "lg:col-span-4", 5: "lg:col-span-5", 6: "lg:col-span-6",
      7: "lg:col-span-7", 8: "lg:col-span-8",
      full: "lg:col-span-full",
    },
  },
});

export interface ColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof colVariants> {}

export function Col({ className, span, spanSm, spanLg, children, ...props }: ColProps) {
  return (
    <div className={cn(colVariants({ span, spanSm, spanLg }), className)} {...props}>
      {children}
    </div>
  );
}
