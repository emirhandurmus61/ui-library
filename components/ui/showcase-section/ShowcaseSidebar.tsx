"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ShowcaseSearch } from "./ShowcaseSearch";

/* ─── Nav data ───────────────────────────────────────────────── */

type NavItem = { href: string; label: string };
type NavCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string; // tailwind text color class
  items: NavItem[];
};

const NAV: NavCategory[] = [
  {
    id: "general",
    label: "Genel",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
    color: "text-foreground-muted",
    items: [
      { href: "/showcase", label: "Genel Bakış" },
    ],
  },
  {
    id: "primitives",
    label: "Primitives",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    color: "text-violet-500",
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
    id: "layout",
    label: "Layout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
      </svg>
    ),
    color: "text-blue-500",
    items: [
      { href: "/showcase/navbar",              label: "Navbar" },
      { href: "/showcase/sidebar",             label: "Sidebar" },
      { href: "/showcase/footer",              label: "Footer" },
      { href: "/showcase/container",           label: "Container / Grid / Stack" },
      { href: "/showcase/stepper",             label: "Stepper" },
      { href: "/showcase/back-to-top",         label: "Back to Top" },
      { href: "/showcase/bottom-nav",          label: "Bottom Nav" },
      { href: "/showcase/background-pattern",  label: "Background Pattern" },
    ],
  },
  {
    id: "auth",
    label: "Auth",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    color: "text-emerald-500",
    items: [
      { href: "/showcase/login",           label: "Login Form" },
      { href: "/showcase/register",        label: "Register Form" },
      { href: "/showcase/forgot-password", label: "Forgot Password" },
      { href: "/showcase/otp",             label: "OTP Input" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    color: "text-amber-500",
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
    id: "data-display",
    label: "Data Display",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18"/>
      </svg>
    ),
    color: "text-cyan-500",
    items: [
      { href: "/showcase/card",          label: "Card" },
      { href: "/showcase/table",         label: "Table" },
      { href: "/showcase/stat-card",     label: "Stat Card" },
      { href: "/showcase/list",          label: "List" },
      { href: "/showcase/accordion",     label: "Accordion" },
      { href: "/showcase/tabs",          label: "Tabs" },
      { href: "/showcase/breadcrumb",    label: "Breadcrumb" },
      { href: "/showcase/pagination",    label: "Pagination" },
      { href: "/showcase/progress",      label: "Progress Bar" },
      { href: "/showcase/timeline",      label: "Timeline" },
      { href: "/showcase/pricing-table",     label: "Pricing Table" },
      { href: "/showcase/faq-list",          label: "FAQ List" },
      { href: "/showcase/feature-grid",      label: "Feature Grid" },
      { href: "/showcase/logo-wall",         label: "Logo Wall" },
      { href: "/showcase/testimonial",       label: "Testimonial" },
      { href: "/showcase/banner",            label: "Banner" },
      { href: "/showcase/countdown",         label: "Countdown" },
      { href: "/showcase/comparison-table",  label: "Comparison Table" },
      { href: "/showcase/kanban-board",      label: "Kanban Board" },
      { href: "/showcase/tree-view",         label: "Tree View" },
      { href: "/showcase/diff-viewer",       label: "Diff Viewer" },
      { href: "/showcase/log-viewer",        label: "Log Viewer" },
    ],
  },
  {
    id: "interactive",
    label: "Interactive",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    color: "text-pink-500",
    items: [
      { href: "/showcase/combobox",         label: "Combobox" },
      { href: "/showcase/date-picker",      label: "Date Picker" },
      { href: "/showcase/slider",           label: "Slider" },
      { href: "/showcase/file-upload",      label: "File Upload" },
      { href: "/showcase/tag-input",        label: "Tag Input" },
      { href: "/showcase/popover",          label: "Popover" },
      { href: "/showcase/context-menu",     label: "Context Menu" },
      { href: "/showcase/command-palette",  label: "Command Palette" },
      { href: "/showcase/rating-input",     label: "Rating Input" },
      { href: "/showcase/phone-input",      label: "Phone Input" },
      { href: "/showcase/color-picker",     label: "Color Picker" },
      { href: "/showcase/multi-step-form",  label: "Multi-step Form" },
    ],
  },
  {
    id: "animation",
    label: "Animation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M5 3l14 9-14 9V3z"/>
      </svg>
    ),
    color: "text-orange-500",
    items: [
      { href: "/showcase/animated-counter", label: "Animated Counter" },
      { href: "/showcase/number-flow",      label: "Number Flow" },
      { href: "/showcase/reveal",           label: "Reveal / FadeIn" },
      { href: "/showcase/marquee",          label: "Marquee" },
      { href: "/showcase/magnetic-button",  label: "Magnetic Button" },
      { href: "/showcase/shimmer-text",     label: "Shimmer Text" },
      { href: "/showcase/typewriter",       label: "Typewriter" },
      { href: "/showcase/confetti-button",  label: "Confetti Button" },
      { href: "/showcase/bg-animation",     label: "Background Animation" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
      </svg>
    ),
    color: "text-teal-500",
    items: [
      { href: "/showcase/sparkline",       label: "Sparkline" },
      { href: "/showcase/mini-bar-chart",  label: "Mini Bar Chart" },
      { href: "/showcase/donut-chart",     label: "Donut Chart" },
      { href: "/showcase/heat-map",        label: "Heat Map" },
      { href: "/showcase/area-chart",      label: "Area Chart" },
      { href: "/showcase/gauge-chart",     label: "Gauge Chart" },
    ],
  },
  {
    id: "data-table",
    label: "Data Table",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
      </svg>
    ),
    color: "text-indigo-500",
    items: [
      { href: "/showcase/data-table", label: "Data Table" },
    ],
  },
  {
    id: "templates",
    label: "Templates",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
      </svg>
    ),
    color: "text-rose-500",
    items: [
      { href: "/showcase/templates/dashboard",         label: "Dashboard" },
      { href: "/showcase/templates/auth",             label: "Auth Sayfaları" },
      { href: "/showcase/templates/settings",         label: "Settings" },
      { href: "/showcase/templates/error",            label: "404 / Error" },
      { href: "/showcase/templates/pricing",          label: "Pricing Page" },
      { href: "/showcase/templates/blog",             label: "Blog" },
      { href: "/showcase/templates/profile",          label: "Kullanıcı Profili" },
      { href: "/showcase/templates/inbox",            label: "Inbox / Mesajlaşma" },
      { href: "/showcase/templates/kanban",           label: "Kanban Board" },
      { href: "/showcase/templates/analytics",        label: "Analytics V2" },
      { href: "/showcase/templates/landing",          label: "Landing — Genel" },
      { href: "/showcase/templates/landing-saas",     label: "Landing — SaaS" },
      { href: "/showcase/templates/landing-startup",  label: "Landing — Startup" },
      { href: "/showcase/templates/landing-portfolio",label: "Landing — Portfolyo" },
      { href: "/showcase/templates/landing-ecommerce",label: "Landing — E-Ticaret" },
      { href: "/showcase/templates/landing-agency",   label: "Landing — Ajans" },
      { href: "/showcase/templates/landing-blog",     label: "Landing — Blog/Medya" },
      { href: "/showcase/templates/landing-app",      label: "Landing — Mobil App" },
      { href: "/showcase/templates/landing-event",    label: "Landing — Etkinlik" },
    ],
  },
  {
    id: "system",
    label: "Sistem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.41 13.82M4.93 4.93A10 10 0 0 0 3.52 18.75M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    color: "text-slate-500",
    items: [
      { href: "/showcase/theme-switcher", label: "Theme Switcher" },
      { href: "/showcase/accessibility",  label: "A11Y Audit" },
    ],
  },
];

/* ─── Icons ──────────────────────────────────────────────────── */

function ShowcaseSearchTrigger() {
  const open = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );
  };
  return (
    <button
      onClick={open}
      className={cn(
        "w-full flex items-center gap-2 h-8 px-2.5 rounded-[var(--radius-md)]",
        "bg-background-muted border border-border",
        "text-foreground-subtle hover:text-foreground hover:border-border-strong",
        "transition-colors duration-150"
      )}
      aria-label="Bileşen ara (Ctrl+K)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 shrink-0" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <span className="flex-1 text-left text-xs">Bileşen ara...</span>
      <kbd className="hidden sm:flex items-center text-[10px] font-mono bg-background border border-border px-1 py-0.5 rounded">
        ⌘K
      </kbd>
    </button>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("size-3 transition-transform duration-200 shrink-0", open ? "rotate-90" : "rotate-0")} aria-hidden="true">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

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
          "flex items-center gap-2 pl-7 pr-2 py-1.5 rounded-[var(--radius-md)] text-sm transition-colors duration-100",
          active
            ? "bg-primary-subtle text-primary font-medium"
            : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <span className="absolute left-[calc(0.75rem+0.875rem)] w-1 h-4 rounded-full bg-primary" aria-hidden="true" />
        )}
        {label}
      </a>
    </li>
  );
}

/* ─── CategoryGroup ──────────────────────────────────────────── */

function CategoryGroup({
  category,
  pathname,
  isOpen,
  onToggle,
}: {
  category: NavCategory;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasActive = category.items.some((item) => item.href === pathname);

  return (
    <div className="mb-0.5">
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors duration-100",
          "hover:bg-background-muted",
          hasActive && !isOpen
            ? "text-foreground"
            : isOpen
            ? "text-foreground"
            : "text-foreground-muted"
        )}
        aria-expanded={isOpen}
      >
        <span className={cn("shrink-0", category.color)}>{category.icon}</span>
        <span className="flex-1 text-left text-xs font-semibold uppercase tracking-wider">{category.label}</span>
        {hasActive && !isOpen && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" aria-hidden="true" />
        )}
        <ChevronIcon open={isOpen} />
      </button>

      {/* Items — animate height with max-height trick */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="py-1 space-y-0.5 relative">
          {/* Left indent line */}
          <span className="absolute left-[calc(0.5rem+0.4375rem)] top-0 bottom-0 w-px bg-border" aria-hidden="true" />
          {category.items.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Sidebar content ────────────────────────────────────────── */

function SidebarContent({ pathname }: { pathname: string }) {
  // Determine which categories are open by default:
  // - the category containing the active route is always open
  // - otherwise start collapsed
  const getDefaultOpen = () => {
    const openSet = new Set<string>();
    NAV.forEach((cat) => {
      if (cat.id === "general") return; // general has no toggle
      if (cat.items.some((item) => item.href === pathname)) {
        openSet.add(cat.id);
      }
    });
    return openSet;
  };

  const [openCategories, setOpenCategories] = useState<Set<string>>(getDefaultOpen);

  // Re-sync when pathname changes (e.g. navigation)
  useEffect(() => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      NAV.forEach((cat) => {
        if (cat.items.some((item) => item.href === pathname)) {
          next.add(cat.id);
        }
      });
      return next;
    });
  }, [pathname]);

  const toggle = (id: string) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {/* ⌘K Search trigger */}
      <div className="px-3 pt-3 pb-2 shrink-0">
        <ShowcaseSearchTrigger />
      </div>

      <nav className="flex-1 overflow-y-auto py-1 px-3" aria-label="Bileşen navigasyonu">
        <>
          {/* "Genel Bakış" — no toggle, always visible */}
            <a
              href="/showcase"
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 mb-2 rounded-[var(--radius-md)] text-sm transition-colors duration-100",
                pathname === "/showcase"
                  ? "bg-primary-subtle text-primary font-medium"
                  : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
              )}
              aria-current={pathname === "/showcase" ? "page" : undefined}
            >
              <span className="text-foreground-muted">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5" aria-hidden="true">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider">Genel Bakış</span>
            </a>

            {/* Collapsible categories (skip "general") */}
            {NAV.filter((c) => c.id !== "general").map((category) => (
              <CategoryGroup
                key={category.id}
                category={category}
                pathname={pathname}
                isOpen={openCategories.has(category.id)}
                onToggle={() => toggle(category.id)}
              />
            ))}
          </>
      </nav>
    </>
  );
}

/* ─── ShowcaseSidebar ────────────────────────────────────────── */

export function ShowcaseSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Global ⌘K command palette (mounted once here) */}
      <ShowcaseSearch />

      {/* Desktop sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden lg:flex flex-col h-full overflow-y-auto">
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
          <a href="/" className="flex items-center gap-2 group">
            <span className="w-6 h-6 rounded-[var(--radius-md)] bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">U</span>
            <span className="font-semibold text-foreground text-sm tracking-tight group-hover:text-primary transition-colors">UI Library</span>
          </a>
          <ThemeToggle />
        </div>
        <SidebarContent pathname={pathname} />
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
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      {/* Mobile drawer */}
      <aside
        className={cn(
          "lg:hidden fixed top-14 left-0 bottom-0 z-40 w-72 bg-surface border-r border-border flex flex-col",
          "transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
