"use client";

import { useState } from "react";
import { BottomNav } from "@/components/ui/bottom-nav";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Icons ──────────────────────────────────────────────────── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

export default function BottomNavPage() {
  const [active4, setActive4] = useState(0);
  const [active5, setActive5] = useState(0);

  const items4 = [
    { label: "Ana Sayfa", icon: <HomeIcon />, active: active4 === 0, onClick: () => setActive4(0) },
    { label: "Keşfet", icon: <SearchIcon />, active: active4 === 1, onClick: () => setActive4(1) },
    { label: "Bildirimler", icon: <BellIcon />, active: active4 === 2, onClick: () => setActive4(2) },
    { label: "Profil", icon: <UserIcon />, active: active4 === 3, onClick: () => setActive4(3) },
  ];

  const items5 = [
    { label: "Ana Sayfa", icon: <HomeIcon />, active: active5 === 0, onClick: () => setActive5(0) },
    { label: "Keşfet", icon: <SearchIcon />, active: active5 === 1, onClick: () => setActive5(1), badge: 3 },
    { label: "Favoriler", icon: <HeartIcon />, active: active5 === 2, onClick: () => setActive5(2) },
    { label: "Bildirim", icon: <BellIcon />, active: active5 === 3, onClick: () => setActive5(3), badge: 12 },
    { label: "Profil", icon: <UserIcon />, active: active5 === 4, onClick: () => setActive5(4) },
  ];

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Bottom Navigation</h1>
        <p className="text-sm text-foreground-muted">
          Mobil uygulama tarzı alt navigasyon çubuğu. 3-5 öğe · badge · aktif durum
        </p>
      </div>

      <ShowcaseSection
        title="Standart 4 Öğe"
        description="Telefon çerçevesi içinde önizleme"
      >
        <div className="max-w-xs mx-auto border-2 border-border rounded-2xl h-96 bg-background-subtle relative overflow-hidden flex flex-col">
          {/* Phone screen content */}
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-sm text-foreground-muted text-center">
              Aktif sekme: <span className="font-semibold text-foreground">{items4[active4].label}</span>
            </p>
          </div>
          {/* BottomNav inside phone — override fixed positioning */}
          <BottomNav
            items={items4}
            className="static inset-auto pb-0"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Badge ile"
        description="5 öğe, bildirim sayaçlı"
      >
        <div className="max-w-xs mx-auto border-2 border-border rounded-2xl h-96 bg-background-subtle relative overflow-hidden flex flex-col">
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-sm text-foreground-muted text-center">
              Aktif sekme: <span className="font-semibold text-foreground">{items5[active5].label}</span>
            </p>
          </div>
          <BottomNav
            items={items5}
            className="static inset-auto pb-0"
          />
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Statik Render"
        description="Tam genişlikte, fixed olmadan"
      >
        <BottomNav
          items={[
            { label: "Ana Sayfa", icon: <HomeIcon />, active: true },
            { label: "Keşfet", icon: <GridIcon /> },
            { label: "Bildirimler", icon: <BellIcon />, badge: 5 },
            { label: "Profil", icon: <UserIcon /> },
          ]}
          className="static inset-auto relative rounded-[var(--radius-md)] pb-0"
        />
      </ShowcaseSection>
    </div>
  );
}
