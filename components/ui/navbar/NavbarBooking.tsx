"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, MapPinIcon, CalendarIcon, UsersIcon } from "./_icons";
import { SearchIcon } from "./_icons";
import type { NavbarBaseProps } from "./types";

export interface NavbarBookingProps extends NavbarBaseProps {
  destination?: string;
  dateRange?: string;
  guestCount?: number;
  onSearch?: () => void;
  ctaLabel?: string;
  onDestinationChange?: (value: string) => void;
  onDateClick?: () => void;
  onGuestChange?: (count: number) => void;
}

export function NavbarBooking({
  logo,
  logoText = "Brand",
  links = [],
  destination = "",
  dateRange = "Add dates",
  guestCount: guestCountProp,
  onSearch,
  ctaLabel,
  onDestinationChange,
  onDateClick,
  onGuestChange,
  className,
}: NavbarBookingProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [internalGuests, setInternalGuests] = useState(guestCountProp ?? 1);

  const guests = guestCountProp ?? internalGuests;

  function handleGuestChange(delta: number) {
    const next = Math.max(1, guests + delta);
    setInternalGuests(next);
    onGuestChange?.(next);
  }

  /* ─── Booking bar segments (shared between desktop & mobile) ── */

  const destinationSegment = (
    <div className="flex items-center gap-2 min-h-[44px] px-4 flex-1 min-w-0">
      <MapPinIcon className="size-4 shrink-0 text-foreground-muted" />
      <input
        type="text"
        placeholder="Where to?"
        value={destination}
        onChange={(e) => onDestinationChange?.(e.target.value)}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted outline-none"
        aria-label="Destination"
      />
    </div>
  );

  const dateSegment = (
    <button
      type="button"
      onClick={onDateClick}
      className="flex items-center gap-2 min-h-[44px] px-4 text-sm text-foreground-muted hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
      aria-label="Select dates"
    >
      <CalendarIcon className="size-4 shrink-0" />
      <span>{dateRange}</span>
    </button>
  );

  const guestSegment = (
    <div className="flex items-center gap-2 min-h-[44px] px-4">
      <UsersIcon className="size-4 shrink-0 text-foreground-muted" />
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handleGuestChange(-1)}
          disabled={guests <= 1}
          className="flex items-center justify-center size-7 rounded-full border border-border text-foreground-muted hover:border-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          aria-label="Decrease guests"
        >
          &minus;
        </button>
        <span className="text-sm font-medium text-foreground tabular-nums min-w-[1.25rem] text-center">
          {guests}
        </span>
        <button
          type="button"
          onClick={() => handleGuestChange(1)}
          className="flex items-center justify-center size-7 rounded-full border border-border text-foreground-muted hover:border-foreground hover:text-foreground transition-colors text-sm font-medium"
          aria-label="Increase guests"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <nav className={cn("w-full border-b border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ─── Top row: logo + (desktop booking bar) + CTA / hamburger ─── */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 shrink-0 font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            {logo ?? (
              <span className="flex size-7 items-center justify-center rounded-[var(--radius-md)] bg-primary text-primary-foreground text-xs font-bold">
                {logoText[0]}
              </span>
            )}
            <span className="hidden sm:inline">{logoText}</span>
          </a>

          {/* Desktop links (optional) */}
          {links.length > 0 && (
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors",
                    link.active
                      ? "bg-background-muted text-foreground"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* ─── Desktop booking bar (pill-shaped) ─── */}
          <div className="hidden md:flex items-center rounded-full bg-background-muted border border-border shadow-sm">
            {/* Destination */}
            {destinationSegment}
            {/* Divider */}
            <div className="w-px self-stretch my-2 bg-border" />
            {/* Date */}
            {dateSegment}
            {/* Divider */}
            <div className="w-px self-stretch my-2 bg-border" />
            {/* Guests */}
            {guestSegment}
          </div>

          {/* Right side: CTA + mobile hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* CTA / Search button */}
            <button
              type="button"
              onClick={onSearch}
              className="flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground min-h-[44px] px-4 text-sm font-medium hover:opacity-90 transition-opacity"
              aria-label={ctaLabel ?? "Search"}
            >
              <SearchIcon className="size-4" />
              {ctaLabel && <span className="hidden sm:inline">{ctaLabel}</span>}
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden flex items-center justify-center size-11 rounded-[var(--radius-md)] text-foreground-muted hover:bg-background-muted transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile expanded: booking bar as stacked rows ─── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface px-4 pb-4">
          <div className="flex flex-col gap-1 pt-3">
            {/* Destination row */}
            <div className="rounded-[var(--radius-md)] bg-background-muted border border-border">
              {destinationSegment}
            </div>
            {/* Date row */}
            <div className="rounded-[var(--radius-md)] bg-background-muted border border-border">
              {dateSegment}
            </div>
            {/* Guest row */}
            <div className="rounded-[var(--radius-md)] bg-background-muted border border-border">
              {guestSegment}
            </div>
          </div>

          {/* Mobile links */}
          {links.length > 0 && (
            <div className="flex flex-col gap-1 pt-3 mt-3 border-t border-border">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors min-h-[44px] flex items-center",
                    link.active
                      ? "bg-background-muted text-foreground"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
