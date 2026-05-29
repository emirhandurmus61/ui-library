"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export interface TestimonialAuthor {
  name: string;
  title?: string;
  company?: string;
  avatar?: string;
  initials?: string;
}

export interface TestimonialItem {
  quote: string;
  author: TestimonialAuthor;
  rating?: number; // 1-5
  featured?: boolean;
  tag?: string;
}

export type TestimonialLayout =
  | "grid"
  | "carousel"
  | "masonry"
  | "list"
  | "spotlight"
  | "wall";

export interface TestimonialProps {
  items: TestimonialItem[];
  layout?: TestimonialLayout;
  showRating?: boolean;
  accentColor?: string;
  className?: string;
}

/* ─── Star rating ─────────────────────────────────────────────── */

function Stars({ rating, color = "#f59e0b" }: { rating: number; color?: string }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} yıldız`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="size-3.5"
          fill={i < rating ? color : "none"}
          stroke={i < rating ? color : "currentColor"}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────── */

function AuthorAvatar({ author }: { author: TestimonialAuthor }) {
  if (author.avatar) {
    return (
      <img
        src={author.avatar}
        alt={author.name}
        className="size-10 rounded-full object-cover shrink-0"
      />
    );
  }
  const initials = author.initials ?? author.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const colors = [
    "bg-violet-100 text-violet-700",
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
  ];
  const colorClass = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div className={cn("size-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0", colorClass)}>
      {initials}
    </div>
  );
}

/* ─── Quote icon ─────────────────────────────────────────────── */

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("size-6", className)} aria-hidden="true">
      <path d="M11.3 4.9C9.6 6.5 8.7 8.4 8.7 11H11v5H6v-5c0-4 2.1-7 6.3-8.1l-1 2zM19.3 4.9C17.6 6.5 16.7 8.4 16.7 11H19v5h-5v-5c0-4 2.1-7 6.3-8.1l-1 2z" />
    </svg>
  );
}

/* ─── Single card ─────────────────────────────────────────────── */

function TestimonialCard({
  item,
  showRating,
  compact = false,
}: {
  item: TestimonialItem;
  showRating: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] border border-border bg-surface flex flex-col gap-3",
        compact ? "p-4" : "p-5",
        item.featured && "ring-2 ring-primary/20 border-primary/30"
      )}
    >
      {item.tag && (
        <span className="self-start text-[11px] font-semibold uppercase tracking-widest text-primary bg-primary-subtle px-2 py-0.5 rounded-full">
          {item.tag}
        </span>
      )}
      {showRating && item.rating && <Stars rating={item.rating} />}
      <p className={cn("text-foreground leading-relaxed flex-1", compact ? "text-sm" : "text-sm")}>
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-1 border-t border-border">
        <AuthorAvatar author={item.author} />
        <div>
          <p className="text-sm font-semibold text-foreground">{item.author.name}</p>
          {(item.author.title || item.author.company) && (
            <p className="text-xs text-foreground-muted">
              {[item.author.title, item.author.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Grid layout ─────────────────────────────────────────────── */

function GridLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <TestimonialCard key={i} item={item} showRating={showRating} />
      ))}
    </div>
  );
}

/* ─── Masonry layout ──────────────────────────────────────────── */

function MasonryLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 === 1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
      <div className="flex flex-col gap-4">
        {col1.map((item, i) => <TestimonialCard key={i} item={item} showRating={showRating} />)}
      </div>
      <div className="flex flex-col gap-4 sm:mt-6">
        {col2.map((item, i) => <TestimonialCard key={i} item={item} showRating={showRating} />)}
      </div>
    </div>
  );
}

/* ─── List layout ─────────────────────────────────────────────── */

function ListLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  return (
    <div className="flex flex-col divide-y divide-border">
      {items.map((item, i) => (
        <div key={i} className="py-5 flex gap-4">
          <AuthorAvatar author={item.author} />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div>
                <span className="text-sm font-semibold text-foreground">{item.author.name}</span>
                {(item.author.title || item.author.company) && (
                  <span className="text-xs text-foreground-muted ml-2">
                    {[item.author.title, item.author.company].filter(Boolean).join(" · ")}
                  </span>
                )}
              </div>
              {showRating && item.rating && <Stars rating={item.rating} />}
            </div>
            <p className="text-sm text-foreground leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Carousel layout ─────────────────────────────────────────── */

function CarouselLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Main card */}
      <div className="relative w-full max-w-2xl mx-auto rounded-[var(--radius-2xl)] border border-border bg-surface p-8 text-center">
        <QuoteIcon className="text-primary/20 mx-auto mb-4 size-8" />
        {showRating && item.rating && (
          <div className="flex justify-center mb-3"><Stars rating={item.rating} /></div>
        )}
        {item.tag && (
          <span className="inline-block mb-3 text-[11px] font-semibold uppercase tracking-widest text-primary bg-primary-subtle px-2 py-0.5 rounded-full">
            {item.tag}
          </span>
        )}
        <p className="text-foreground text-lg leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
        <div className="flex items-center justify-center gap-3">
          <AuthorAvatar author={item.author} />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{item.author.name}</p>
            {(item.author.title || item.author.company) && (
              <p className="text-xs text-foreground-muted">
                {[item.author.title, item.author.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Dots + arrows */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActive((a) => (a - 1 + items.length) % items.length)}
          className="size-8 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-border-strong transition-colors"
          aria-label="Önceki"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn("rounded-full transition-all duration-200", i === active ? "w-5 h-2 bg-primary" : "size-2 bg-border hover:bg-border-strong")}
              aria-label={`${i + 1}. yorum`}
            />
          ))}
        </div>
        <button
          onClick={() => setActive((a) => (a + 1) % items.length)}
          className="size-8 rounded-full border border-border flex items-center justify-center text-foreground-muted hover:text-foreground hover:border-border-strong transition-colors"
          aria-label="Sonraki"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Spotlight layout ────────────────────────────────────────── */

function SpotlightLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  const [active, setActive] = useState(0);
  const featured = items[active];
  const rest = items.filter((_, i) => i !== active);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main */}
      <div className="lg:col-span-2 rounded-[var(--radius-2xl)] bg-gradient-to-br from-primary/5 via-primary/[0.02] to-transparent border border-primary/20 p-7 flex flex-col gap-4">
        <QuoteIcon className="text-primary/30" />
        {showRating && featured.rating && <Stars rating={featured.rating} />}
        {featured.tag && (
          <span className="self-start text-[11px] font-semibold uppercase tracking-widest text-primary bg-primary-subtle px-2 py-0.5 rounded-full">
            {featured.tag}
          </span>
        )}
        <p className="text-foreground text-lg leading-relaxed flex-1">&ldquo;{featured.quote}&rdquo;</p>
        <div className="flex items-center gap-3 pt-2 border-t border-border">
          <AuthorAvatar author={featured.author} />
          <div>
            <p className="font-semibold text-foreground">{featured.author.name}</p>
            {(featured.author.title || featured.author.company) && (
              <p className="text-sm text-foreground-muted">
                {[featured.author.title, featured.author.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Sidebar list */}
      <div className="flex flex-col gap-2">
        {rest.slice(0, 4).map((item, i) => {
          const origIdx = items.indexOf(item);
          return (
            <button
              key={i}
              onClick={() => setActive(origIdx)}
              className="text-left rounded-[var(--radius-xl)] border border-border bg-surface hover:border-primary/30 hover:bg-primary-subtle/30 p-3.5 transition-colors"
            >
              <p className="text-xs text-foreground line-clamp-2 mb-2">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-2">
                <AuthorAvatar author={item.author} />
                <span className="text-xs font-medium text-foreground-muted">{item.author.name}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Wall layout ─────────────────────────────────────────────── */

function WallLayout({ items, showRating }: { items: TestimonialItem[]; showRating: boolean }) {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
      {items.map((item, i) => (
        <div key={i} className="break-inside-avoid">
          <TestimonialCard item={item} showRating={showRating} compact />
        </div>
      ))}
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────── */

export function Testimonial({
  items,
  layout = "grid",
  showRating = true,
  className,
}: TestimonialProps) {
  return (
    <div className={cn("w-full", className)}>
      {layout === "grid"      && <GridLayout     items={items} showRating={showRating} />}
      {layout === "carousel"  && <CarouselLayout  items={items} showRating={showRating} />}
      {layout === "masonry"   && <MasonryLayout   items={items} showRating={showRating} />}
      {layout === "list"      && <ListLayout      items={items} showRating={showRating} />}
      {layout === "spotlight" && <SpotlightLayout items={items} showRating={showRating} />}
      {layout === "wall"      && <WallLayout      items={items} showRating={showRating} />}
    </div>
  );
}
