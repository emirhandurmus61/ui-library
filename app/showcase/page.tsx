import { CodeBlock } from "@/components/ui/code-block";

const phases = [
  { id: 0, label: "Altyapı",          status: "done",  count: null },
  { id: 1, label: "Primitive",         status: "done",  count: 11 },
  { id: 2, label: "Layout",            status: "done",  count: 6 },
  { id: 3, label: "Auth",              status: "done",  count: 4 },
  { id: 4, label: "Feedback & Overlay",status: "done",  count: 6 },
  { id: 5, label: "Data Display",      status: "done",  count: 9 },
  { id: 6, label: "Showcase Sistemi",  status: "done",  count: null },
  { id: 7, label: "Sayfa Şablonları",  status: "done",  count: 5 },
] as const;

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
  color: string;    // dot bg class
  border: string;   // card border class
  items: ComponentItem[];
};

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    label: "Primitives",
    color: "bg-violet-500",
    border: "border-violet-500/20",
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
    label: "Layout",
    color: "bg-blue-500",
    border: "border-blue-500/20",
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
    border: "border-emerald-500/20",
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
    border: "border-amber-500/20",
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
    label: "Data Display",
    color: "bg-cyan-500",
    border: "border-cyan-500/20",
    items: [
      { href: "/showcase/card",               label: "Card" },
      { href: "/showcase/table",              label: "Table" },
      { href: "/showcase/stat-card",          label: "Stat Card" },
      { href: "/showcase/list",               label: "List" },
      { href: "/showcase/accordion",          label: "Accordion" },
      { href: "/showcase/tabs",               label: "Tabs" },
      { href: "/showcase/breadcrumb",         label: "Breadcrumb" },
      { href: "/showcase/pagination",         label: "Pagination" },
      { href: "/showcase/progress",           label: "Progress Bar" },
      { href: "/showcase/timeline",           label: "Timeline" },
      { href: "/showcase/pricing-table",      label: "Pricing Table" },
      { href: "/showcase/faq-list",           label: "FAQ List" },
      { href: "/showcase/feature-grid",       label: "Feature Grid" },
      { href: "/showcase/logo-wall",          label: "Logo Wall" },
      { href: "/showcase/testimonial",        label: "Testimonial" },
      { href: "/showcase/banner",             label: "Banner" },
      { href: "/showcase/countdown",          label: "Countdown" },
      { href: "/showcase/comparison-table",   label: "Comparison Table" },
      { href: "/showcase/tour",               label: "Tour / Onboarding" },
      { href: "/showcase/notification-center",label: "Notification Center" },
      { href: "/showcase/cookie-consent",     label: "Cookie Consent" },
      { href: "/showcase/kbd",                label: "Keyboard Shortcut" },
      { href: "/showcase/kanban-board",       label: "Kanban Board" },
      { href: "/showcase/tree-view",          label: "Tree View" },
      { href: "/showcase/diff-viewer",        label: "Diff Viewer" },
      { href: "/showcase/log-viewer",         label: "Log Viewer" },
    ],
  },
  {
    label: "Interactive",
    color: "bg-pink-500",
    border: "border-pink-500/20",
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
    border: "border-orange-500/20",
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
    border: "border-teal-500/20",
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
    label: "Data Table",
    color: "bg-indigo-500",
    border: "border-indigo-500/20",
    items: [
      { href: "/showcase/data-table", label: "Data Table" },
    ],
  },
  {
    label: "Utility",
    color: "bg-lime-500",
    border: "border-lime-500/20",
    items: [
      { href: "/showcase/scroll-progress", label: "Scroll Progress" },
      { href: "/showcase/reading-time",    label: "Reading Time" },
      { href: "/showcase/share-button",    label: "Share Button" },
      { href: "/showcase/print-button",    label: "Print Button" },
    ],
  },
  {
    label: "Sistem",
    color: "bg-slate-500",
    border: "border-slate-500/20",
    items: [
      { href: "/showcase/theme-switcher", label: "Theme Switcher" },
      { href: "/showcase/accessibility",  label: "A11Y Audit" },
    ],
  },
  {
    label: "Templates",
    color: "bg-rose-500",
    border: "border-rose-500/20",
    items: [
      { href: "/showcase/templates/dashboard",          label: "Dashboard" },
      { href: "/showcase/templates/analytics",          label: "Analytics" },
      { href: "/showcase/templates/inbox",              label: "Inbox" },
      { href: "/showcase/templates/settings",           label: "Settings" },
      { href: "/showcase/templates/profile",            label: "Profil" },
      { href: "/showcase/templates/kanban",             label: "Kanban Board" },
      { href: "/showcase/templates/pricing",            label: "Pricing" },
      { href: "/showcase/templates/blog",               label: "Blog" },
      { href: "/showcase/templates/auth",               label: "Auth Sayfaları" },
      { href: "/showcase/templates/error",              label: "404 / Error" },
      { href: "/showcase/templates/landing",            label: "Landing — Genel" },
      { href: "/showcase/templates/landing-saas",       label: "Landing — SaaS" },
      { href: "/showcase/templates/landing-startup",    label: "Landing — Startup" },
      { href: "/showcase/templates/landing-portfolio",  label: "Landing — Portfolyo" },
      { href: "/showcase/templates/landing-ecommerce",  label: "Landing — E-Ticaret" },
      { href: "/showcase/templates/landing-agency",     label: "Landing — Ajans" },
      { href: "/showcase/templates/landing-blog",       label: "Landing — Blog/Medya" },
      { href: "/showcase/templates/landing-app",        label: "Landing — Mobil App" },
      { href: "/showcase/templates/landing-event",      label: "Landing — Etkinlik" },
    ],
  },
];

const totalComponents = COMPONENT_CATEGORIES.reduce((s, c) => s + c.items.length, 0);

export default function ShowcasePage() {
  const done  = phases.filter((p) => p.status === "done").length;
  const total = phases.length;

  return (
    <div className="max-w-3xl space-y-12">
      {/* Hero */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-[var(--radius-lg)] bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">U</span>
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">UI Library</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2 leading-tight">
          Kişisel UI Bileşen Kütüphanesi
        </h1>
        <p className="text-foreground-muted text-base leading-relaxed">
          Next.js 16 · React 19 · Tailwind CSS v4 · TypeScript · CVA
        </p>

        {/* Stats row */}
        <div className="mt-5 flex flex-wrap gap-4">
          {[
            { value: String(totalComponents), label: "bileşen" },
            { value: "19", label: "template" },
            { value: String(COMPONENT_CATEGORIES.length), label: "kategori" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">{value}</span>
              <span className="text-sm text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-foreground-muted">
            <span>{done} / {total} faz tamamlandı</span>
            <span className="font-semibold text-foreground">{Math.round((done / total) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-background-muted overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Component categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Bileşenler</h2>
        <div className="space-y-4">
          {COMPONENT_CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className={`rounded-[var(--radius-xl)] border ${cat.border} bg-surface p-4`}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${cat.color}`} />
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {cat.label}
                </span>
                <span className="text-xs text-foreground-subtle ml-auto">
                  {cat.items.length} bileşen
                </span>
              </div>

              {/* Item chips */}
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center px-2.5 py-1 rounded-[var(--radius-md)] text-xs font-medium text-foreground-muted bg-background-muted hover:bg-background-subtle hover:text-foreground border border-transparent hover:border-border transition-colors duration-100"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Fazlar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`rounded-[var(--radius-xl)] border p-4 flex items-start gap-3 transition-colors ${
                phase.status === "done"
                  ? "border-success/20 bg-success-subtle/50"
                  : "border-border bg-surface"
              }`}
            >
              <span
                className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                  phase.status === "done" ? "bg-success" : "bg-border"
                }`}
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Faz {phase.id} — {phase.label}
                </p>
                <p className="text-xs text-foreground-subtle mt-0.5">
                  {phase.status === "done"
                    ? phase.count
                      ? `${phase.count} bileşen · Tamamlandı ✓`
                      : "Tamamlandı ✓"
                    : phase.count
                    ? `${phase.count} bileşen planlandı`
                    : "Planlandı"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick start */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Hızlı Başlangıç</h2>
        <CodeBlock code={QUICK_START} lang="tsx" filename="app/page.tsx" />
      </div>

      {/* Token preview */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Renk Tokenları</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "primary",          bg: "bg-primary" },
            { label: "danger",           bg: "bg-danger" },
            { label: "success",          bg: "bg-success" },
            { label: "warning",          bg: "bg-warning" },
            { label: "info",             bg: "bg-info" },
            { label: "foreground",       bg: "bg-foreground" },
            { label: "surface",          bg: "bg-surface border border-border" },
            { label: "background-muted", bg: "bg-background-muted" },
            { label: "border",           bg: "bg-border" },
          ].map(({ label, bg }) => (
            <div key={label} className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-[var(--radius-md)] shrink-0 ${bg}`} />
              <span className="text-xs text-foreground-muted font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Tipografi</h2>
        <div className="space-y-3 border border-border rounded-[var(--radius-xl)] p-5 bg-surface">
          <p className="text-3xl font-bold text-foreground">Heading 1</p>
          <p className="text-2xl font-semibold text-foreground">Heading 2</p>
          <p className="text-xl font-semibold text-foreground">Heading 3</p>
          <p className="text-base text-foreground">Body text — normal paragraf metni burada görünür.</p>
          <p className="text-sm text-foreground-muted">Small / muted metin buraya gelir.</p>
          <p className="text-xs text-foreground-subtle font-mono">Mono / kod metni: const x = 42;</p>
        </div>
      </div>
    </div>
  );
}
