"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const buttonVariants = cva(
  // Base styles — her variant'ta ortak olan
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium leading-none select-none",
    "rounded-[var(--radius-md)]",
    "border border-transparent",
    "transition-all duration-150 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "hover:bg-primary-hover",
          "active:bg-primary-active",
          "shadow-sm",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary-hover",
          "active:opacity-80",
        ],
        outline: [
          "bg-transparent text-foreground",
          "border-border",
          "hover:bg-background-muted hover:border-border-strong",
          "active:opacity-80",
        ],
        ghost: [
          "bg-transparent text-foreground",
          "hover:bg-background-muted",
          "active:opacity-80",
        ],
        danger: [
          "bg-danger text-danger-foreground",
          "hover:bg-danger-hover",
          "active:opacity-90",
          "shadow-sm",
        ],
        "danger-outline": [
          "bg-transparent text-danger",
          "border-danger/40",
          "hover:bg-danger-subtle hover:border-danger",
          "active:opacity-80",
        ],
        link: [
          "bg-transparent text-primary underline-offset-4",
          "hover:underline",
          "h-auto! px-0! py-0!",
        ],
      },
      size: {
        xs: "h-7 px-2.5 text-xs gap-1.5",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

/* ─── Spinner ────────────────────────────────────────────────── */

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const iconSize =
    size === "xs" || size === "sm" || size === "icon-sm"
      ? "size-3.5"
      : size === "lg" || size === "xl" || size === "icon-lg"
      ? "size-5"
      : "size-4";

  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Spinner className={iconSize} />
      ) : (
        leftIcon && (
          <span className={cn("shrink-0", iconSize)} aria-hidden="true">
            {leftIcon}
          </span>
        )
      )}

      {children}

      {!loading && rightIcon && (
        <span className={cn("shrink-0", iconSize)} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
