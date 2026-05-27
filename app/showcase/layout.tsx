import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase | UI Library",
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-surface hidden lg:flex flex-col">
        <div className="h-14 flex items-center px-5 border-b border-border">
          <span className="font-semibold text-foreground text-sm tracking-tight">
            UI Library
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Bileşenler
          </p>
          <ul className="space-y-0.5 text-sm text-foreground-muted">
            <li>
              <a
                href="/showcase"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-background-muted hover:text-foreground transition-colors"
              >
                Genel Bakış
              </a>
            </li>
          </ul>

          <p className="px-2 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Faz 1 — Primitive
          </p>
          <ul className="space-y-0.5 text-sm">
            <li>
              <a
                href="/showcase/button"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Button
              </a>
            </li>
            <li>
              <a
                href="/showcase/input"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Input
              </a>
            </li>
            <li>
              <a
                href="/showcase/textarea"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Textarea
              </a>
            </li>
            <li>
              <a
                href="/showcase/badge"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Badge
              </a>
            </li>
            <li>
              <a
                href="/showcase/select"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Select
              </a>
            </li>
            <li>
              <a
                href="/showcase/checkbox"
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-foreground-muted hover:bg-background-muted hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-success" />
                Checkbox
              </a>
            </li>
          </ul>

          <p className="px-2 mt-6 mb-2 text-xs font-semibold uppercase tracking-wider text-foreground-subtle">
            Yakında
          </p>
          {[
            "Radio",
            "Toggle",
            "Avatar",
            "Spinner",
            "Tooltip",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-foreground-subtle cursor-not-allowed list-none"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              {item}
            </li>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-surface flex items-center justify-between px-6 shrink-0">
          <span className="text-sm text-foreground-muted font-medium">
            Showcase
          </span>

          <a
            href="/"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            ← Ana Sayfa
          </a>
        </header>

        <div className="flex-1 overflow-auto p-6 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
