"use client";

import { useState } from "react";
import { CommandPalette, useCommandPalette, type CommandItem } from "@/components/ui/command-palette";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function HomeIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>; }
function UserIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>; }
function SettingsIcon() { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>; }
function FileIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>; }
function ZapIcon()      { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>; }
function MoonIcon()     { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>; }
function SearchIcon()   { return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>; }

const ITEMS: CommandItem[] = [
  { id: "home",         group: "Sayfalar",  label: "Ana Sayfa",         icon: <HomeIcon />,     shortcut: "G H",    keywords: ["anasayfa", "başlangıç"], onSelect: () => alert("→ Ana Sayfa") },
  { id: "users",        group: "Sayfalar",  label: "Kullanıcılar",      icon: <UserIcon />,     shortcut: "G U",    keywords: ["kullanıcı", "üyeler"],   onSelect: () => alert("→ Kullanıcılar") },
  { id: "settings",     group: "Sayfalar",  label: "Ayarlar",           icon: <SettingsIcon />, shortcut: "G S",    keywords: ["settings", "preferences"], onSelect: () => alert("→ Ayarlar") },
  { id: "new-file",     group: "İşlemler", label: "Yeni Dosya Oluştur", icon: <FileIcon />,     shortcut: "⌘N",    onSelect: () => alert("Yeni dosya") },
  { id: "toggle-dark",  group: "İşlemler", label: "Koyu Mod Aç/Kapat", icon: <MoonIcon />,     shortcut: "⌘⇧D",   keywords: ["dark", "theme", "tema"],  onSelect: () => alert("Tema değişti") },
  { id: "deploy",       group: "İşlemler", label: "Deploy Et",          icon: <ZapIcon />,      shortcut: "⌘⇧P",   keywords: ["publish", "yayınla"],    onSelect: () => alert("Deploying...") },
  { id: "search-docs",  group: "Yardım",   label: "Dokümantasyon Ara",  icon: <SearchIcon />,   keywords: ["docs", "help", "yardım"],  onSelect: () => alert("Docs") },
];

export default function CommandPaletteShowcase() {
  const { open, setOpen } = useCommandPalette();
  const [recentIds, setRecentIds] = useState<string[]>(["home", "settings"]);

  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Command Palette</h1>
        <p className="text-sm text-foreground-muted">
          ⌘K shortcut · gruplu komutlar · klavye navigasyonu · recent items · fuzzy search
        </p>
      </div>

      <ShowcaseSection
        title="Komut Paleti"
        description="Butona tıklayın veya ⌘K / Ctrl+K tuşlarını kullanın. Ok tuşlarıyla gezinin, Enter ile seçin."
        code={`import { CommandPalette, useCommandPalette } from "@/components/ui/command-palette";

const { open, setOpen } = useCommandPalette(); // ⌘K otomatik bağlanır

<Button onClick={() => setOpen(true)}>⌘K Komut Paleti</Button>

<CommandPalette
  items={ITEMS}
  open={open}
  onClose={() => setOpen(false)}
  recentIds={recentIds}
  onRecentChange={setRecentIds}
/>`}
      >
        <div className="flex items-center gap-3">
          <Button onClick={() => setOpen(true)} leftIcon={<SearchIcon />}>
            Komut Paleti Aç
          </Button>
          <kbd className="text-xs text-foreground-subtle font-mono bg-background-muted border border-border px-2 py-1 rounded">
            ⌘K
          </kbd>
        </div>

        <CommandPalette
          items={ITEMS}
          open={open}
          onClose={() => setOpen(false)}
          recentIds={recentIds}
          onRecentChange={setRecentIds}
        />
      </ShowcaseSection>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Özellikler</h2>
        <ul className="text-sm text-foreground-muted space-y-1.5 list-disc list-inside">
          <li>⌘K / Ctrl+K ile otomatik açılma (<code className="text-xs font-mono bg-background-muted px-1 rounded">useCommandPalette()</code> hook)</li>
          <li>Grup başlıklarıyla kategorize edilmiş komutlar</li>
          <li>Son kullanılan öğeler listesi (recentIds)</li>
          <li>Klavye navigasyonu: ↑↓ gezin, Enter seç, Esc kapat</li>
          <li>Fuzzy search: label + keywords üzerinde arama</li>
          <li>Shortcut göstergesi her komut için</li>
          <li>Backdrop click ile kapanma</li>
        </ul>
      </section>
    </div>
  );
}
