import type { Metadata } from "next";
import { ShowcaseSidebar } from "@/components/ui/showcase-section/ShowcaseSidebar";

export const metadata: Metadata = {
  title: "Showcase | UI Library",
  description: "Kişisel UI bileşen kütüphanesi showcase'i",
};

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <ShowcaseSidebar />

      {/* Main content — bağımsız scroll */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-md hidden lg:flex items-center justify-between px-6 shrink-0">
          <span className="text-sm text-foreground-muted font-medium">Showcase</span>
          <a
            href="/"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors duration-150"
          >
            ← Ana Sayfa
          </a>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 pt-20 lg:pt-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
