import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      xs:   "max-w-screen-sm",   // 640px
      sm:   "max-w-screen-md",   // 768px
      md:   "max-w-screen-lg",   // 1024px
      lg:   "max-w-screen-xl",   // 1280px
      xl:   "max-w-screen-2xl",  // 1536px
      full: "max-w-full",
      prose:"max-w-prose",       // 65ch
    },
    padding: {
      none: "px-0",
      sm:   "px-3 sm:px-4",
      md:   "px-4 sm:px-6 lg:px-8",
      lg:   "px-6 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "md",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({
  className,
  size,
  padding,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
