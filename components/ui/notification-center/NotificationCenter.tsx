"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────── */

export type NotificationType = "info" | "success" | "warning" | "error" | "social" | "system";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  timestamp: string;
  read?: boolean;
  avatar?: string;
  action?: { label: string; onClick: () => void };
}

export interface NotificationCenterProps {
  notifications: Notification[];
  onMarkRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

/* ─── Type icon ──────────────────────────────────────────────── */

const typeStyles: Record<NotificationType, { icon: React.ReactNode; dot: string }> = {
  info:    { dot: "bg-blue-500",    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> },
  success: { dot: "bg-emerald-500", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><polyline points="20 6 9 17 4 12"/></svg> },
  warning: { dot: "bg-amber-500",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></svg> },
  error:   { dot: "bg-red-500",     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg> },
  social:  { dot: "bg-violet-500",  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  system:  { dot: "bg-slate-500",   icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.41 13.82"/></svg> },
};

const typeBg: Record<NotificationType, string> = {
  info:    "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  error:   "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  social:  "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400",
  system:  "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

/* ─── Bell icon ──────────────────────────────────────────────── */

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}

/* ─── Notification item ──────────────────────────────────────── */

function NotificationItem({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: Notification;
  onMarkRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
}) {
  const { type, title, message, timestamp, read, avatar, action } = notification;
  const cfg = typeStyles[type];

  return (
    <div
      className={cn(
        "group relative flex gap-3 px-4 py-3 hover:bg-background-muted/60 transition-colors cursor-default",
        !read && "bg-primary-subtle/20"
      )}
      onClick={() => !read && onMarkRead?.(notification.id)}
    >
      {/* Unread dot */}
      {!read && (
        <span className={cn("absolute left-1.5 top-1/2 -translate-y-1/2 size-1.5 rounded-full", cfg.dot)} aria-label="Okunmadı" />
      )}

      {/* Avatar or type icon */}
      {avatar ? (
        <img src={avatar} alt="" className="size-9 rounded-full object-cover shrink-0 mt-0.5" />
      ) : (
        <span className={cn("size-9 rounded-full flex items-center justify-center shrink-0 mt-0.5", typeBg[type])}>
          {cfg.icon}
        </span>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium leading-snug", !read ? "text-foreground" : "text-foreground-muted")}>
            {title}
          </p>
          <span className="text-[11px] text-foreground-subtle shrink-0">{timestamp}</span>
        </div>
        {message && (
          <p className="text-xs text-foreground-muted leading-relaxed mt-0.5 line-clamp-2">{message}</p>
        )}
        {action && (
          <button
            onClick={(e) => { e.stopPropagation(); action.onClick(); }}
            className="mt-1.5 text-xs font-medium text-primary hover:underline"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          onClick={(e) => { e.stopPropagation(); onDismiss(notification.id); }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-foreground-subtle hover:text-foreground p-0.5"
          aria-label="Bildirimi sil"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Notification panel ─────────────────────────────────────── */

function NotificationPanel({
  notifications,
  onMarkRead,
  onMarkAllRead,
  onDismiss,
  onClearAll,
}: NotificationCenterProps) {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">Bildirimler</h2>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && onMarkAllRead && (
            <button onClick={onMarkAllRead} className="text-xs text-primary hover:underline">
              Tümünü okundu işaretle
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-4 py-2 border-b border-border shrink-0">
        {(["all", "unread"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "text-xs px-3 py-1 rounded-[var(--radius-md)] font-medium transition-colors",
              filter === f ? "bg-background-muted text-foreground" : "text-foreground-muted hover:text-foreground"
            )}
          >
            {f === "all" ? "Tümü" : `Okunmamış${unreadCount > 0 ? ` (${unreadCount})` : ""}`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border/50">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <span className="text-3xl">🔔</span>
            <p className="text-sm text-foreground-muted">
              {filter === "unread" ? "Okunmamış bildirim yok" : "Bildirim yok"}
            </p>
          </div>
        ) : (
          filtered.map(n => (
            <NotificationItem
              key={n.id}
              notification={n}
              onMarkRead={onMarkRead}
              onDismiss={onDismiss}
            />
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && onClearAll && (
        <div className="px-4 py-2.5 border-t border-border shrink-0">
          <button onClick={onClearAll} className="text-xs text-foreground-muted hover:text-foreground transition-colors">
            Tüm bildirimleri temizle
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── NotificationCenter (trigger + popover) ─────────────────── */

export function NotificationCenter(props: NotificationCenterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = props.notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={cn("relative inline-block", props.className)}>
      {/* Bell trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        className={cn(
          "relative p-2 rounded-[var(--radius-lg)] transition-colors",
          open ? "bg-background-muted text-foreground" : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        )}
        aria-label={`Bildirimler${unreadCount > 0 ? ` (${unreadCount} okunmamış)` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span
            className="absolute top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-[var(--radius-xl)] border border-border bg-surface shadow-xl z-50 overflow-hidden"
          style={{ maxHeight: "480px", display: "flex", flexDirection: "column" }}
          role="dialog"
          aria-label="Bildirim merkezi"
        >
          <NotificationPanel {...props} />
        </div>
      )}
    </div>
  );
}
