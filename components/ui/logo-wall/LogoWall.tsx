"use client";

import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface LogoItem {
  name: string;
  logo: React.ReactNode;
}

export interface LogoWallProps {
  logos: LogoItem[];
  /** Auto-scroll marquee instead of static grid */
  marquee?: boolean;
  /** Speed in seconds for one full loop */
  speed?: number;
  /** Logos shown as grayscale, full color on hover */
  grayscale?: boolean;
  /** Optional heading above logos */
  title?: string;
  className?: string;
}

/* ─── Logo cell ──────────────────────────────────────────────── */

function LogoCell({
  item,
  grayscale,
}: {
  item: LogoItem;
  grayscale: boolean;
}) {
  return (
    <div
      title={item.name}
      aria-label={item.name}
      className={cn(
        "flex items-center justify-center h-12 px-6 py-4 shrink-0",
        "transition-all duration-200",
        grayscale && [
          "[&>*]:grayscale [&>*]:opacity-60",
          "hover:[&>*]:grayscale-0 hover:[&>*]:opacity-100",
        ]
      )}
    >
      {item.logo}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────── */

export function LogoWall({
  logos,
  marquee = false,
  speed = 30,
  grayscale = true,
  title,
  className,
}: LogoWallProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Optional heading */}
      {title && (
        <p className="mb-6 text-center text-sm font-medium text-foreground-muted tracking-wide uppercase">
          {title}
        </p>
      )}

      {marquee ? (
        /* ── Marquee mode ──────────────────────────────────── */
        <MarqueeTrack logos={logos} speed={speed} grayscale={grayscale} />
      ) : (
        /* ── Static grid mode ──────────────────────────────── */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-0">
          {logos.map((item, i) => (
            <LogoCell key={i} item={item} grayscale={grayscale} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Marquee sub-component ──────────────────────────────────── */

function MarqueeTrack({
  logos,
  speed,
  grayscale,
}: {
  logos: LogoItem[];
  speed: number;
  grayscale: boolean;
}) {
  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes logo-wall-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .logo-wall-track {
          animation: logo-wall-marquee ${speed}s linear infinite;
        }
        .logo-wall-outer:hover .logo-wall-track {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={cn(
          "logo-wall-outer",
          "relative overflow-hidden",
          /* Left + right fade masks */
          "before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-16 sm:before:w-24",
          "before:bg-gradient-to-r before:from-background before:to-transparent before:pointer-events-none",
          "after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-16 sm:after:w-24",
          "after:bg-gradient-to-l after:from-background after:to-transparent after:pointer-events-none"
        )}
        aria-label="Logo karusel"
      >
        {/* Track — two copies for seamless loop */}
        <div className="logo-wall-track flex w-max">
          {/* Copy 1 */}
          {logos.map((item, i) => (
            <LogoCell key={`a-${i}`} item={item} grayscale={grayscale} />
          ))}
          {/* Copy 2 */}
          {logos.map((item, i) => (
            <LogoCell key={`b-${i}`} item={item} grayscale={grayscale} />
          ))}
        </div>
      </div>
    </>
  );
}
