"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";

/* ─── Data ───────────────────────────────────────────────────── */

const QUICK_START = `import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";

export default function Example() {
  return (
    <Card variant="elevated">
      <CardHeader
        title="Merhaba Dünya"
        action={<Badge variant="success">Aktif</Badge>}
      />
      <Button leftIcon={<PlusIcon />}>Yeni Ekle</Button>
    </Card>
  );
}`;

type ComponentItem = { href: string; label: string };
type ComponentCategory = {
  label: string;
  color: string;
  bg: string;
  text: string;
  icon: string;
  items: ComponentItem[];
};

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    label: "Primitives",
    color: "bg-violet-500",
    bg: "bg-violet-500/8 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    icon: "⬡",
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
      { href: "/showcase/kbd",      label: "Keyboard Shortcut" },
    ],
  },
  {
    label: "Layout",
    color: "bg-blue-500",
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    icon: "▦",
    items: [
      { href: "/showcase/navbar",             label: "Navbar" },
      { href: "/showcase/sidebar",            label: "Sidebar" },
      { href: "/showcase/footer",             label: "Footer" },
      { href: "/showcase/container",          label: "Container / Grid" },
      { href: "/showcase/stepper",            label: "Stepper" },
      { href: "/showcase/back-to-top",        label: "Back to Top" },
      { href: "/showcase/bottom-nav",         label: "Bottom Nav" },
      { href: "/showcase/background-pattern", label: "Background Pattern" },
    ],
  },
  {
    label: "Auth",
    color: "bg-emerald-500",
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "◉",
    items: [
      { href: "/showcase/login",           label: "Login Form" },
      { href: "/showcase/register",        label: "Register Form" },
      { href: "/showcase/forgot-password", label: "Forgot Password" },
      { href: "/showcase/otp",             label: "OTP Input" },
    ],
  },
  {
    label: "Feedback & Overlay",
    color: "bg-amber-500",
    bg: "bg-amber-500/8 dark:bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    icon: "◎",
    items: [
      { href: "/showcase/modal",                label: "Modal" },
      { href: "/showcase/drawer",               label: "Drawer" },
      { href: "/showcase/toast",                label: "Toast" },
      { href: "/showcase/alert",                label: "Alert" },
      { href: "/showcase/banner",               label: "Banner" },
      { href: "/showcase/skeleton",             label: "Skeleton" },
      { href: "/showcase/empty-state",          label: "Empty State" },
      { href: "/showcase/notification-center",  label: "Notification Center" },
      { href: "/showcase/cookie-consent",       label: "Cookie Consent" },
      { href: "/showcase/countdown",            label: "Countdown" },
      { href: "/showcase/tour",                 label: "Tour / Onboarding" },
    ],
  },
  {
    label: "Data Display",
    color: "bg-cyan-500",
    bg: "bg-cyan-500/8 dark:bg-cyan-500/10",
    text: "text-cyan-600 dark:text-cyan-400",
    icon: "◈",
    items: [
      { href: "/showcase/card",             label: "Card" },
      { href: "/showcase/table",            label: "Table" },
      { href: "/showcase/data-table",       label: "Data Table" },
      { href: "/showcase/stat-card",        label: "Stat Card" },
      { href: "/showcase/list",             label: "List" },
      { href: "/showcase/accordion",        label: "Accordion" },
      { href: "/showcase/tabs",             label: "Tabs" },
      { href: "/showcase/breadcrumb",       label: "Breadcrumb" },
      { href: "/showcase/pagination",       label: "Pagination" },
      { href: "/showcase/progress",         label: "Progress Bar" },
      { href: "/showcase/timeline",         label: "Timeline" },
      { href: "/showcase/pricing-table",    label: "Pricing Table" },
      { href: "/showcase/faq-list",         label: "FAQ List" },
      { href: "/showcase/feature-grid",     label: "Feature Grid" },
      { href: "/showcase/logo-wall",        label: "Logo Wall" },
      { href: "/showcase/testimonial",      label: "Testimonial" },
      { href: "/showcase/comparison-table", label: "Comparison Table" },
      { href: "/showcase/kanban-board",     label: "Kanban Board" },
      { href: "/showcase/tree-view",        label: "Tree View" },
      { href: "/showcase/diff-viewer",      label: "Diff Viewer" },
      { href: "/showcase/log-viewer",       label: "Log Viewer" },
    ],
  },
  {
    label: "Interactive",
    color: "bg-pink-500",
    bg: "bg-pink-500/8 dark:bg-pink-500/10",
    text: "text-pink-600 dark:text-pink-400",
    icon: "◇",
    items: [
      { href: "/showcase/combobox",        label: "Combobox" },
      { href: "/showcase/date-picker",     label: "Date Picker" },
      { href: "/showcase/slider",          label: "Slider" },
      { href: "/showcase/file-upload",     label: "File Upload" },
      { href: "/showcase/tag-input",       label: "Tag Input" },
      { href: "/showcase/popover",         label: "Popover" },
      { href: "/showcase/context-menu",    label: "Context Menu" },
      { href: "/showcase/command-palette", label: "Command Palette" },
      { href: "/showcase/rating-input",    label: "Rating Input" },
      { href: "/showcase/phone-input",     label: "Phone Input" },
      { href: "/showcase/color-picker",    label: "Color Picker" },
      { href: "/showcase/multi-step-form", label: "Multi-step Form" },
    ],
  },
  {
    label: "Animation",
    color: "bg-orange-500",
    bg: "bg-orange-500/8 dark:bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    icon: "◈",
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
    label: "Charts",
    color: "bg-teal-500",
    bg: "bg-teal-500/8 dark:bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    icon: "◉",
    items: [
      { href: "/showcase/sparkline",      label: "Sparkline" },
      { href: "/showcase/mini-bar-chart", label: "Mini Bar Chart" },
      { href: "/showcase/progress-ring",  label: "Progress Ring" },
      { href: "/showcase/donut-chart",    label: "Donut Chart" },
      { href: "/showcase/bar-chart",      label: "Bar Chart" },
      { href: "/showcase/line-chart",     label: "Line Chart" },
      { href: "/showcase/area-chart",     label: "Area Chart" },
      { href: "/showcase/radar-chart",    label: "Radar Chart" },
      { href: "/showcase/gauge-chart",    label: "Gauge Chart" },
      { href: "/showcase/heat-map",       label: "Heat Map" },
    ],
  },
  {
    label: "Utility",
    color: "bg-lime-500",
    bg: "bg-lime-500/8 dark:bg-lime-500/10",
    text: "text-lime-600 dark:text-lime-400",
    icon: "◌",
    items: [
      { href: "/showcase/scroll-progress", label: "Scroll Progress" },
      { href: "/showcase/reading-time",    label: "Reading Time" },
      { href: "/showcase/share-button",    label: "Share Button" },
      { href: "/showcase/print-button",    label: "Print Button" },
      { href: "/showcase/accessibility",   label: "A11Y Audit" },
      { href: "/showcase/theme-switcher",  label: "Theme Switcher" },
    ],
  },
  {
    label: "Templates",
    color: "bg-rose-500",
    bg: "bg-rose-500/8 dark:bg-rose-500/10",
    text: "text-rose-600 dark:text-rose-400",
    icon: "▣",
    items: [
      { href: "/showcase/templates/dashboard",         label: "Dashboard" },
      { href: "/showcase/templates/analytics",         label: "Analytics" },
      { href: "/showcase/templates/inbox",             label: "Inbox" },
      { href: "/showcase/templates/settings",          label: "Settings" },
      { href: "/showcase/templates/profile",           label: "Profil" },
      { href: "/showcase/templates/kanban",            label: "Kanban Board" },
      { href: "/showcase/templates/pricing",           label: "Pricing" },
      { href: "/showcase/templates/blog",              label: "Blog" },
      { href: "/showcase/templates/auth",              label: "Auth Sayfaları" },
      { href: "/showcase/templates/error",             label: "404 / Error" },
      { href: "/showcase/templates/landing",           label: "Landing — Genel" },
      { href: "/showcase/templates/landing-saas",      label: "Landing — SaaS" },
      { href: "/showcase/templates/landing-startup",   label: "Landing — Startup" },
      { href: "/showcase/templates/landing-portfolio", label: "Landing — Portfolyo" },
      { href: "/showcase/templates/landing-ecommerce", label: "Landing — E-Ticaret" },
      { href: "/showcase/templates/landing-agency",    label: "Landing — Ajans" },
      { href: "/showcase/templates/landing-blog",      label: "Landing — Blog/Medya" },
      { href: "/showcase/templates/landing-app",       label: "Landing — Mobil App" },
      { href: "/showcase/templates/landing-event",     label: "Landing — Etkinlik" },
    ],
  },
];

const totalComponents = COMPONENT_CATEGORIES.reduce((s, c) => s + c.items.length, 0);

/* ─── Tech stack badges ──────────────────────────────────────── */

const TECH = [
  { label: "Next.js 16.2",   color: "bg-foreground text-background" },
  { label: "React 19",       color: "bg-[#61DAFB]/15 text-[#0ea5e9]" },
  { label: "TypeScript 5",   color: "bg-[#3178C6]/15 text-[#3b82f6]" },
  { label: "Tailwind v4",    color: "bg-[#06B6D4]/15 text-[#06b6d4]" },
  { label: "CVA",            color: "bg-violet-500/15 text-violet-500" },
];

/* ─── Design tokens ──────────────────────────────────────────── */

const TOKENS = [
  { label: "primary",    cls: "bg-primary" },
  { label: "success",    cls: "bg-success" },
  { label: "warning",    cls: "bg-warning" },
  { label: "danger",     cls: "bg-danger" },
  { label: "info",       cls: "bg-info" },
  { label: "foreground", cls: "bg-foreground" },
  { label: "muted",      cls: "bg-foreground-muted" },
  { label: "surface",    cls: "bg-surface border border-border" },
  { label: "border",     cls: "bg-border" },
];

/* ─── Featured highlights ────────────────────────────────────── */

const HIGHLIGHTS = [
  {
    title: "10 Chart",
    desc: "SVG/Canvas · sıfır harici bağımlılık",
    color: "from-teal-500/20 to-teal-500/5",
    dot: "bg-teal-500",
    href: "/showcase/bar-chart",
  },
  {
    title: "12 Animasyon",
    desc: "BgAnimation · CSS & Canvas efektleri",
    color: "from-orange-500/20 to-orange-500/5",
    dot: "bg-orange-500",
    href: "/showcase/bg-animation",
  },
  {
    title: "19 Template",
    desc: "Dashboard · Landing · Auth sayfaları",
    color: "from-rose-500/20 to-rose-500/5",
    dot: "bg-rose-500",
    href: "/showcase/templates/dashboard",
  },
  {
    title: "Dark Mode",
    desc: "Her tokenda tam destek · sistem teması",
    color: "from-indigo-500/20 to-indigo-500/5",
    dot: "bg-indigo-500",
    href: "/showcase/theme-switcher",
  },
];

/* ─── Component ──────────────────────────────────────────────── */

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = activeCategory
    ? COMPONENT_CATEGORIES.filter((c) => c.label === activeCategory)
    : COMPONENT_CATEGORIES;

  return (
    <div className="space-y-14">

      {/* ══════════════════════════ HERO ══════════════════════════ */}
      <div className="space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/8 text-primary text-xs font-semibold tracking-wide">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          Kişisel UI Bileşen Kütüphanesi
        </div>

        {/* Heading */}
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-foreground leading-tight tracking-tight">
            Showcase
          </h1>
          <p className="text-base text-foreground-muted leading-relaxed max-w-xl">
            Üretim kalitesinde bileşenler, tam sayfa şablonlar ve gerçek kullanım senaryoları. Canlı önizleme, kod görüntüleme ve viewport testi ile birlikte.
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {TECH.map((t) => (
            <span
              key={t.label}
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${t.color}`}
            >
              {t.label}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 max-w-sm">
          {[
            { value: String(totalComponents), label: "Bileşen" },
            { value: "19",                    label: "Template" },
            { value: String(COMPONENT_CATEGORIES.length), label: "Kategori" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-[var(--radius-xl)] border border-border bg-surface p-3 text-center"
            >
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-foreground-muted mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════ HIGHLIGHTS ════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HIGHLIGHTS.map((h) => (
          <a
            key={h.title}
            href={h.href}
            className={`group relative rounded-[var(--radius-xl)] border border-border bg-gradient-to-br ${h.color} p-5 hover:border-primary/30 transition-all duration-200`}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1 size-2 rounded-full shrink-0 ${h.dot}`} />
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {h.title}
                </p>
                <p className="text-xs text-foreground-muted mt-0.5">{h.desc}</p>
              </div>
            </div>
            <svg
              className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-foreground-subtle opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        ))}
      </div>

      {/* ══════════════════════ COMPONENTS ════════════════════════ */}
      <div className="space-y-5">
        {/* Section header + filter tabs */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-semibold text-foreground">Bileşenler</h2>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
              }`}
            >
              Tümü
            </button>
            {COMPONENT_CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(activeCategory === cat.label ? null : cat.label)}
                className={`px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-medium transition-colors ${
                  activeCategory === cat.label
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground hover:bg-background-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category cards */}
        <div className="space-y-3">
          {displayed.map((cat) => (
            <div
              key={cat.label}
              className="rounded-[var(--radius-xl)] border border-border bg-surface overflow-hidden"
            >
              {/* Header */}
              <div className={`flex items-center gap-2.5 px-4 py-3 border-b border-border ${cat.bg}`}>
                <span className={`size-2 rounded-full shrink-0 ${cat.color}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${cat.text}`}>
                  {cat.label}
                </span>
                <span className="ml-auto text-[11px] text-foreground-subtle font-medium">
                  {cat.items.length}
                </span>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 p-4">
                {cat.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-2.5 py-1.5 rounded-[var(--radius-md)] text-xs font-medium text-foreground-muted bg-background-muted hover:bg-primary hover:text-primary-foreground border border-transparent hover:border-primary/20 transition-all duration-150"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════ DESIGN SYSTEM ═════════════════════ */}
      <div className="space-y-5">
        <h2 className="text-lg font-semibold text-foreground">Tasarım Sistemi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Color tokens */}
          <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Renk Tokenları</p>
            <div className="grid grid-cols-3 gap-3">
              {TOKENS.map(({ label, cls }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className={`size-8 rounded-[var(--radius-md)] ${cls}`} />
                  <span className="text-[10px] text-foreground-subtle font-mono text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Tipografi Skalası</p>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-foreground leading-none">Heading 1</p>
              <p className="text-xl font-semibold text-foreground leading-none">Heading 2</p>
              <p className="text-base font-medium text-foreground leading-none">Heading 3</p>
              <div className="h-px bg-border my-1" />
              <p className="text-sm text-foreground">Body text — normal paragraf metni.</p>
              <p className="text-xs text-foreground-muted">Small · muted metin buraya gelir.</p>
              <p className="text-xs text-foreground-subtle font-mono">const x = 42; // mono</p>
            </div>
          </div>
        </div>

        {/* Button variants */}
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Buton Varyantları</p>
          <div className="flex flex-wrap gap-2.5 items-center">
            {[
              { label: "Primary",   cls: "bg-primary text-primary-foreground hover:bg-primary-hover" },
              { label: "Secondary", cls: "bg-surface-raised text-foreground border border-border hover:bg-background-muted" },
              { label: "Outline",   cls: "border border-primary text-primary hover:bg-primary/8" },
              { label: "Ghost",     cls: "text-foreground hover:bg-background-muted" },
              { label: "Danger",    cls: "bg-danger text-white hover:opacity-90" },
            ].map((v) => (
              <button key={v.label} className={`px-3.5 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all ${v.cls}`}>
                {v.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
            <p className="w-full text-[10px] text-foreground-subtle font-semibold uppercase tracking-wider mb-1">Style Presets</p>
            {[
              { label: "Brutal",   cls: "bg-yellow-400 text-black border-2 border-black shadow-[3px_3px_0_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_#000]" },
              { label: "Neon",     cls: "bg-transparent border border-fuchsia-500 text-fuchsia-400 shadow-[0_0_8px_#d946ef60] hover:shadow-[0_0_16px_#d946ef80]" },
              { label: "Glass",    cls: "bg-white/10 backdrop-blur border border-white/20 text-foreground hover:bg-white/15" },
              { label: "Gradient", cls: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90" },
              { label: "Soft",     cls: "bg-primary/15 text-primary hover:bg-primary/20" },
            ].map((v) => (
              <button key={v.label} className={`px-3.5 py-1.5 rounded-[var(--radius-md)] text-sm font-medium transition-all ${v.cls}`}>
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Radius & shadow tokens */}
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-5 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Köşe Yarıçapı</p>
          <div className="flex flex-wrap items-end gap-4">
            {[
              { label: "sm",  cls: "rounded-[var(--radius-sm)]",  size: "size-8" },
              { label: "md",  cls: "rounded-[var(--radius-md)]",  size: "size-10" },
              { label: "lg",  cls: "rounded-[var(--radius-lg)]",  size: "size-12" },
              { label: "xl",  cls: "rounded-[var(--radius-xl)]",  size: "size-14" },
              { label: "2xl", cls: "rounded-[var(--radius-2xl)]", size: "size-16" },
              { label: "full", cls: "rounded-full",               size: "size-12" },
            ].map((r) => (
              <div key={r.label} className="flex flex-col items-center gap-1.5">
                <div className={`${r.size} ${r.cls} bg-primary/20 border border-primary/30`} />
                <span className="text-[10px] text-foreground-subtle font-mono">{r.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════ QUICK START ═══════════════════════ */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Hızlı Başlangıç</h2>
          <a
            href="https://github.com/emirhandurmus61/ui-library"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-foreground transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub'da İncele
          </a>
        </div>

        <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-background-muted">
            <div className="size-2.5 rounded-full bg-red-400/70" />
            <div className="size-2.5 rounded-full bg-yellow-400/70" />
            <div className="size-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 text-xs text-foreground-subtle font-mono">app/page.tsx</span>
          </div>
          <CodeBlock code={QUICK_START} lang="tsx" />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { label: "Bileşenlere Gözat →", href: "/showcase/button", primary: true },
            { label: "Chartları Gör →",     href: "/showcase/bar-chart", primary: false },
            { label: "Şablonları Gör →",    href: "/showcase/templates/dashboard", primary: false },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              className={`px-4 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors ${
                btn.primary
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "border border-border text-foreground-muted hover:text-foreground hover:bg-background-muted"
              }`}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
