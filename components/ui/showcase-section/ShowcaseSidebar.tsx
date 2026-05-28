"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/* ─── Nav data ───────────────────────────────────────────────── */

const NAV = [
  {
    label: "Genel",
    items: [
      { href: "/showcase", label: "Genel Bakış" },
    ],
  },
  {
    label: "Faz 1 — Primitive",
    items: [
      { href: "/showcase/button",   label: "Button" },
      { href: "/showcase/input",    label: "Input" },
      { href: "/showcase/textarea", label: "Textarea" },
      { href: "/showcase/select",   label: "Select" },
      { href: "/showcase/checkbox", label: "Checkbox" },
      { href: "/showcase/radio",    label: "Radio" },
      { href: "/showcase/toggle",   label: "Toggle" },
      { href: "/showcase/badge",    label: "Badge" },
      { href: "/showcase/avatar",   label: "Avatar" },
      { href: "/showcase/spinner",  label: "Spinner" },
      { href: "/showcase/tooltip",  label: "Tooltip" },
    ],
  },
  {
    label: "Faz 2 — Layout",
    items: [
      { href: "/showcase/navbar",     label: "Navbar" },
      { href: "/showcase/sidebar",    label: "Sidebar" },
      { href: "/showcase/footer",     label: "Footer" },
      { href: "/showcase/container",  label: "Container / Grid / Stack" },
    ],
  },
  {
    label: "Faz 3 — Auth",
    items: [
      { href: "/showcase/login",           label: "Login Form" },
      { href: "/showcase/register",        label: "Register Form" },
      { href: "/showcase/forgot-password", label: "Forgot Password" },
      { href: "/showcase/otp",             label: "OTP Input" },
    ],
  },
  {
    label: "Faz 4 — Feedback",
    items: [
      { href: "/showcase/modal",       label: "Modal" },
      { href: "/showcase/drawer",      label: "Drawer" },
      { href: "/showcase/toast",       label: "Toast" },
      { href: "/showcase/alert",       label: "Alert" },
      { href: "/showcase/skeleton",    label: "Skeleton" },
      { href: "/showcase/empty-state", label: "Empty State" },
    ],
  },
  {
    label: "Faz 5 — Data Display",
    items: [
      { href: "/showcase/card",       label: "Card" },
      { href: "/showcase/table",      label: "Table" },
      { href: "/showcase/stat-card",  label: "Stat Card" },
      { href: "/showcase/list",       label: "List" },
      { href: "/showcase/accordion",  label: "Accordion" },
      { href: "/showcase/tabs",       label: "Tabs" },
      { href: "/showcase/breadcrumb", label: "Breadcrumb" },
      { href: "/showcase/pagination", label: "Pagination" },
      { href: "/showcase/progress",   label: "Progress Bar" },
    ],
  },
  {
    label: "Faz 7 — Şablonlar",
    items: [
      { href: "/showcase/templates/dashboard", label: "Dashboard" },
      { href: "/showcase/templates/landing",   label: "Landing Page" },
      { href: "/showcase/templates/auth",      label: "Auth Sayfaları" },
      { href: "/showcase/templates/settings",  label: "Settings" },
      { href: "/showcase/templates/error",     label: "404 / Error" },
    ],
  },
  {
    label: "Faz 9 — Etkileşimli",
    items: [
      { href: "/showcase/combobox",       label: "Combobox" },
      { href: "/showcase/date-picker",    label: "Date Picker" },
      { href: "/showcase/slider",         label: "Slider" },
      { href: "/showcase/file-upload",    label: "File Upload" },
      { href: "/showcase/tag-input",      label: "Tag Input" },
      { href: "/showcase/popover",        label: "Popover" },
      { href: "/showcase/context-menu",   label: "Context Menu" },
      { href: "/showcase/command-palette", label: "Command Palette" },
    ],
  },
] as const;

/* ─── Search ─────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-foreground-subtle" aria-hidden="true">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}

/* ─── Mobile menu icon ───────────────────────────────────────── */

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

/* ─── NavItem ────────────────────────────────────────────────── */

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <a
        href={href}
        className={cn(
          "flex items-center gap-2 px-2 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors duration-100",
          active
            ? "bg-primary-subtle text-primary font-medium"
            : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0",
            active ? "bg-primary" : "bg-success"
          )}
        />
        {label}
      </a>
    </li>
  );
}

/* ─── Sidebar content ────────────────────────────────────────── */

function SidebarContent({ pathname, query, onQueryChange }: {
  pathname: string;
  query: string;
  onQueryChange: (v: string) => void;
}) {
  const filtered = query.trim()
    ? NAV.map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter((g) => g.items.length > 0)
    : NAV;

  return (
    <>
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            type="search"
            placeholder="Bileşen ara..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className={cn(
              "w-full h-8 pl-8 pr-3 text-sm rounded-[var(--radius-md)]",
              "bg-background-muted border border-border",
              "text-foreground placeholder:text-foreground-subtle",
              "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
              "transition-colors duration-150"
            )}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-2 px-3">
        {filtered.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="px-2 mb-1.5 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </ul>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="px-2 py-4 text-xs text-foreground-subtle text-center">
            Sonuç bulunamadı.
          </p>
        )}
      </nav>
    </>
  );
}

/* ─── ShowcaseSidebar ────────────────────────────────────────── */

export function ShowcaseSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden lg:flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <a href="/" className="flex items-center gap-2 group">
            <span className="w-6 h-6 rounded-[var(--radius-md)] bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">U</span>
            <span className="font-semibold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">UI Library</span>
          </a>
          <ThemeToggle />
        </div>
        <SidebarContent pathname={pathname} query={query} onQueryChange={setQuery} />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 border-b border-border bg-surface/80 backdrop-blur-md flex items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-[var(--radius-md)] bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">U</span>
          <span className="font-semibold text-foreground text-sm">UI Library</span>
        </a>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded-[var(--radius-md)] text-foreground-muted hover:text-foreground hover:bg-background-muted transition-colors"
            aria-label="Menüyü aç"
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}
      <aside
        className={cn(
          "lg:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-surface border-r border-border flex flex-col",
          "transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent pathname={pathname} query={query} onQueryChange={setQuery} />
      </aside>
    </>
  );
}
