"use client";

import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Variants ───────────────────────────────────────────────── */

const avatarVariants = cva(
  [
    "relative inline-flex shrink-0 items-center justify-center",
    "rounded-full overflow-hidden select-none",
    "font-medium leading-none",
  ],
  {
    variants: {
      size: {
        xs:  "size-6  text-[10px]",
        sm:  "size-8  text-xs",
        md:  "size-10 text-sm",
        lg:  "size-12 text-base",
        xl:  "size-16 text-xl",
        "2xl": "size-20 text-2xl",
      },
    },
    defaultVariants: { size: "md" },
  }
);

/* ─── Sabit renk paleti (isim bazlı deterministik) ───────────── */

const colorPalette = [
  "bg-violet-100  text-violet-700  dark:bg-violet-900/40 dark:text-violet-300",
  "bg-blue-100    text-blue-700    dark:bg-blue-900/40   dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-rose-100    text-rose-700    dark:bg-rose-900/40   dark:text-rose-300",
  "bg-amber-100   text-amber-700   dark:bg-amber-900/40  dark:text-amber-300",
  "bg-cyan-100    text-cyan-700    dark:bg-cyan-900/40   dark:text-cyan-300",
  "bg-pink-100    text-pink-700    dark:bg-pink-900/40   dark:text-pink-300",
  "bg-indigo-100  text-indigo-700  dark:bg-indigo-900/40 dark:text-indigo-300",
];

function getColorFromName(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colorPalette[Math.abs(hash) % colorPalette.length];
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/* ─── Status dot ─────────────────────────────────────────────── */

const statusColorMap = {
  online:  "bg-success",
  offline: "bg-foreground-subtle",
  busy:    "bg-danger",
  away:    "bg-warning",
};

const statusDotSize = {
  xs:  "size-1.5 border",
  sm:  "size-2   border",
  md:  "size-2.5 border-2",
  lg:  "size-3   border-2",
  xl:  "size-3.5 border-2",
  "2xl": "size-4 border-2",
};

/* ─── Types ──────────────────────────────────────────────────── */

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  name?: string;
  /** Fallback ikonu (src ve name ikisi de yoksa) */
  fallbackIcon?: React.ReactNode;
  status?: "online" | "offline" | "busy" | "away";
  className?: string;
}

/* ─── Component ──────────────────────────────────────────────── */

export function Avatar({
  src,
  alt,
  name,
  fallbackIcon,
  status,
  size = "md",
  className,
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = name ? getInitials(name) : null;
  const colorClass = name ? getColorFromName(name) : "bg-background-muted text-foreground-subtle";

  return (
    <span className={cn("relative inline-flex", className)}>
      <span className={cn(avatarVariants({ size }), !showImage && colorClass)}>
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? name ?? "avatar"}
            className="size-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span aria-label={name}>{initials}</span>
        ) : fallbackIcon ? (
          <span className="size-[45%] flex items-center justify-center opacity-70">
            {fallbackIcon}
          </span>
        ) : (
          /* Varsayılan kullanıcı ikonu */
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-[55%] opacity-50"
            aria-hidden="true"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </span>

      {/* Status dot */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0",
            "rounded-full border-background",
            statusDotSize[size ?? "md"],
            statusColorMap[status]
          )}
          aria-label={status}
        />
      )}
    </span>
  );
}
