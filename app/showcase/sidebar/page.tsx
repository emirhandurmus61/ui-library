"use client";

import { SidebarFull, SidebarCollapsible } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { SidebarFull, SidebarCollapsible } from "@/components/ui/sidebar";`;

const HomeIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LayoutIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
const UsersIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BarChartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const BellIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const FileIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>;
const InboxIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;

const SECTIONS = [
  {
    items: [
      { label: "Dashboard",   href: "#", icon: <HomeIcon />,     active: true },
      { label: "Genel Bakış", href: "#", icon: <LayoutIcon /> },
    ],
  },
  {
    label: "Yönetim",
    items: [
      { label: "Kullanıcılar", href: "#", icon: <UsersIcon />,    badge: 12 },
      { label: "Raporlar",     href: "#", icon: <BarChartIcon /> },
      { label: "Belgeler",     href: "#", icon: <FileIcon /> },
      { label: "Gelen Kutusu", href: "#", icon: <InboxIcon />,    badge: 3 },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "Bildirimler", href: "#", icon: <BellIcon />,     badge: 5 },
      { label: "Ayarlar",     href: "#", icon: <SettingsIcon /> },
    ],
  },
];

const USER = { name: "Emirhan Durmuş", email: "emirhan@example.com" };

export default function SidebarShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Sidebar</h1>
        <p className="text-foreground-muted">
          2 tasarım · bölümlü navigasyon · badge · collapsible (icon modu) · tooltip · user footer
        </p>
      </div>

      <ShowcaseSection
        title="1. Full Sidebar"
        description="Bölümlü nav, badge, user footer, özelleştirilebilir genişlik."
        importLine={IMPORT}
        code={`<SidebarFull
  logoText="MyApp"
  sections={sections}
  user={{ name: "Ali Veli", email: "ali@example.com" }}
  footer={<Badge variant="success" dot>Sistem aktif</Badge>}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[420px]">
          <SidebarFull
            logoText="MyApp"
            sections={SECTIONS}
            user={USER}
            footer={
              <div className="flex items-center gap-2 px-1">
                <Badge variant="success" dot dotColor="success" size="sm">Sistem aktif</Badge>
              </div>
            }
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Sayfa içeriği buraya gelir</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="2. Collapsible (Icon) Sidebar"
        description="Ok butonuyla daraltılır — sadece ikonlar kalır. Hover'da Tooltip ile etiket gösterilir."
        importLine={IMPORT}
        code={`<SidebarCollapsible
  logoText="MyApp"
  sections={sections}
  user={{ name: "Ali Veli" }}
  defaultCollapsed={false}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[420px]">
          <SidebarCollapsible
            logoText="MyApp"
            sections={SECTIONS}
            user={USER}
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">← Ok butonuna tıklayın</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="2b. Başlangıçta Daraltılmış"
        description="defaultCollapsed prop'u ile sidebar icon modunda başlar."
        importLine={IMPORT}
        code={`<SidebarCollapsible
  logoText="MyApp"
  sections={sections}
  user={{ name: "Ali Veli" }}
  defaultCollapsed
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[420px]">
          <SidebarCollapsible
            logoText="MyApp"
            sections={SECTIONS}
            user={USER}
            defaultCollapsed
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Icon modda başladı — genişletmek için oka tıklayın</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="3. Mobil Responsive — Drawer"
        description="mobileDrawer prop'u ile masaüstünde sidebar, mobilde hamburger butonu ile açılan slide-over."
        importLine={IMPORT}
        code={`<SidebarFull
  logoText="MyApp"
  sections={sections}
  user={{ name: "Ali Veli" }}
  mobileDrawer
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden relative h-[360px]">
          <div className="flex h-full">
            <SidebarFull
              logoText="MyApp"
              sections={SECTIONS.slice(0, 2)}
              user={USER}
              mobileDrawer
            />
            <div className="flex-1 bg-background-subtle flex flex-col items-center justify-center gap-2 p-6 text-center">
              <p className="text-sm font-medium text-foreground">Sayfa içeriği</p>
              <p className="text-xs text-foreground-muted">
                Masaüstünde: sidebar her zaman görünür.<br />
                Mobilde: sol alt köşedeki ☰ butonu ile drawer açılır.
              </p>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
