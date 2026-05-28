"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const buttonVariants = cva(
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
        xs:      "h-7 px-2.5 text-xs gap-1.5",
        sm:      "h-8 px-3 text-sm",
        md:      "h-10 px-4 text-sm",
        lg:      "h-11 px-5 text-base",
        xl:      "h-12 px-6 text-base",
        icon:    "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
        "icon-lg": "h-12 w-12 p-0",
      },
      /* ── Stil Presetleri (Faz 8) ──────────────────────────────
         variant ile birlikte kullanılır; görsel katmanı override eder.
         Örnek: <Button variant="primary" stylePreset="brutal">
      ──────────────────────────────────────────────────────────── */
      stylePreset: {
        default: "",

        /* Kalın siyah border + offset shadow; hover'da shadow söner + küçük translate */
        brutal: [
          "rounded-none! border-2! border-black! dark:border-white!",
          "shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)]",
          "hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]",
          "active:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
          "transition-all duration-100",
        ],

        /* Parlak glow + koyu arka plan; hover'da glow büyür */
        neon: [
          "bg-background! text-primary! border-primary/60!",
          "shadow-[0_0_8px_0px] shadow-primary/50",
          "hover:shadow-[0_0_18px_2px] hover:shadow-primary/70 hover:border-primary! hover:bg-primary/10!",
          "active:shadow-[0_0_6px_0px] active:shadow-primary/40",
          "transition-all duration-200",
        ],

        /* backdrop-blur + yarı-saydam; dark'ta da çalışır */
        glass: [
          "bg-white/15! dark:bg-white/10! text-foreground!",
          "border-white/30! dark:border-white/20!",
          "backdrop-blur-md",
          "shadow-sm",
          "hover:bg-white/25! dark:hover:bg-white/18!",
          "active:bg-white/20!",
        ],

        /* Yatay gradient; hover'da opaklık + scale */
        gradient: [
          "bg-gradient-to-r! from-primary to-violet-500! text-white!",
          "border-transparent!",
          "shadow-sm shadow-primary/30",
          "hover:opacity-90 hover:shadow-md hover:shadow-primary/40",
          "active:opacity-80 active:scale-[0.98]",
          "transition-all duration-150",
        ],

        /* Sadece subtle arka plan + renk; border yok */
        soft: [
          "bg-primary-subtle! text-primary!",
          "border-transparent!",
          "shadow-none!",
          "hover:bg-primary-subtle/80! hover:brightness-95",
          "active:brightness-90",
        ],

        /* Pastel + mono-font + dotted border + küçük ok dekorasyonu */
        retro: [
          "font-mono! rounded-[var(--radius-sm)]!",
          "bg-amber-50! dark:bg-amber-950! text-amber-900! dark:text-amber-100!",
          "border-2! border-dashed! border-amber-400! dark:border-amber-600!",
          "shadow-none!",
          "hover:bg-amber-100! dark:hover:bg-amber-900!",
          "active:bg-amber-200! dark:active:bg-amber-800!",
        ],
      },
    },
    defaultVariants: {
      variant:     "primary",
      size:        "md",
      stylePreset: "default",
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
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

/* ─── Types ──────────────────────────────────────────────────── */

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Button({
  className,
  variant,
  size,
  stylePreset,
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
      className={cn(buttonVariants({ variant, size, stylePreset }), className)}
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
