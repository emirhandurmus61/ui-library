"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, SearchIcon, BellIcon, MessageIcon, PlusIcon } from "./_icons";
import { Avatar } from "@/components/ui/avatar";
import type { NavbarBaseProps, NavUser } from "./types";

export interface NavbarSocialProps extends NavbarBaseProps {
  user?: NavUser;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  notificationCount?: number;
  messageCount?: number;
  onCreateClick?: () => void;
}

export function NavbarSocial({
  logo,
  logoText = "Brand",
  links = [],
  user,
  onSearch,
  searchPlaceholder = "Search...",
  notificationCount = 0,
  messageCount = 0,
  onCreateClick,
  className,
}: NavbarSocialProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.(searchQuery);
  }

  return (
    <nav className={cn("h-14 border-b border-border bg-background", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-full flex items-center">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          {logo ?? (
            <span className="text-lg font-bold text-foreground">{logoText}</span>
          )}
        </div>

        {/* Search bar - desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex flex-1 max-w-lg mx-6 items-center rounded-full bg-background-muted border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 h-10 px-4 transition-all"
        >
          <SearchIcon className="shrink-0 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground ml-2"
          />
        </form>

        {/* Right icon cluster - desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {/* Create/Post button */}
          <button
            type="button"
            onClick={onCreateClick}
            className="group relative size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            aria-label="Create post"
          >
            <PlusIcon className="size-4" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Create
            </span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="group relative size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background-muted transition-colors"
            aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ""}`}
          >
            <BellIcon />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                {notificationCount > 99 ? "99+" : notificationCount}
              </span>
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Notifications
            </span>
          </button>

          {/* Messages */}
          <button
            type="button"
            className="group relative size-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background-muted transition-colors"
            aria-label={`Messages${messageCount > 0 ? ` (${messageCount})` : ""}`}
          >
            <MessageIcon />
            {messageCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                {messageCount > 99 ? "99+" : messageCount}
              </span>
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Messages
            </span>
          </button>

          {/* Avatar */}
          {user && (
            <Avatar
              src={user.avatarSrc}
              name={user.name}
              size="sm"
              className="ml-1"
            />
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden ml-auto size-11 flex items-center justify-center text-foreground"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-border bg-background px-4 py-4 space-y-4">
          {/* Mobile search */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center rounded-full bg-background-muted border border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 h-10 px-4"
          >
            <SearchIcon className="shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground ml-2"
            />
          </form>

          {/* Mobile icon row */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={onCreateClick}
              className="relative size-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
              aria-label="Create post"
            >
              <PlusIcon className="size-4" />
            </button>

            <button
              type="button"
              className="relative size-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background-muted transition-colors"
              aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount})` : ""}`}
            >
              <BellIcon />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="relative size-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background-muted transition-colors"
              aria-label={`Messages${messageCount > 0 ? ` (${messageCount})` : ""}`}
            >
              <MessageIcon />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {messageCount > 99 ? "99+" : messageCount}
                </span>
              )}
            </button>

            {user && (
              <Avatar
                src={user.avatarSrc}
                name={user.name}
                size="sm"
              />
            )}
          </div>

          {/* Mobile nav links */}
          {links.length > 0 && (
            <div className="flex flex-col gap-1 pt-2 border-t border-border">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    link.active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-background-muted"
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
