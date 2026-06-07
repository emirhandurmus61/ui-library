"use client";

import {
  SidebarFull,
  SidebarCollapsible,
  SidebarDark,
  SidebarFloating,
  SidebarMini,
  SidebarGradient,
  SidebarCompact,
  SidebarBordered,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import {
  SidebarFull, SidebarCollapsible, SidebarDark,
  SidebarFloating, SidebarMini, SidebarGradient,
  SidebarCompact, SidebarBordered,
} from "@/components/ui/sidebar";`;

/* ─── Icons ─────────────────────────────────────────────────── */

const HomeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LayoutIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>;
const UsersIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const BarChartIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const BellIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>;
const FileIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>;
const InboxIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>;
const CalendarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>;
const ShieldIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
const PackageIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
const StarIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-full"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;

/* ─── Shared data ─────────────────────────────────────────────── */

const SECTIONS = [
  {
    items: [
      { label: "Dashboard", href: "#", icon: <HomeIcon />, active: true },
      { label: "Genel Bakış", href: "#", icon: <LayoutIcon /> },
    ],
  },
  {
    label: "Yönetim",
    items: [
      { label: "Kullanıcılar", href: "#", icon: <UsersIcon />, badge: 12 },
      { label: "Raporlar", href: "#", icon: <BarChartIcon /> },
      { label: "Belgeler", href: "#", icon: <FileIcon /> },
      { label: "Gelen Kutusu", href: "#", icon: <InboxIcon />, badge: 3 },
    ],
  },
  {
    label: "Sistem",
    items: [
      { label: "Bildirimler", href: "#", icon: <BellIcon />, badge: 5 },
      { label: "Ayarlar", href: "#", icon: <SettingsIcon /> },
    ],
  },
];

const SECTIONS_EXTENDED = [
  {
    label: "Ana Menü",
    items: [
      { label: "Dashboard", href: "#", icon: <HomeIcon />, active: true },
      { label: "Takvim", href: "#", icon: <CalendarIcon /> },
      { label: "Projeler", href: "#", icon: <PackageIcon />, badge: "Yeni" },
    ],
  },
  {
    label: "Güvenlik",
    items: [
      { label: "Erişim Kontrolü", href: "#", icon: <ShieldIcon /> },
      { label: "Kullanıcılar", href: "#", icon: <UsersIcon />, badge: 8 },
      { label: "Raporlar", href: "#", icon: <BarChartIcon /> },
    ],
  },
  {
    label: "İçerik",
    items: [
      { label: "Dosyalar", href: "#", icon: <FileIcon /> },
      { label: "Favoriler", href: "#", icon: <StarIcon /> },
      { label: "Bildirimler", href: "#", icon: <BellIcon />, badge: 3 },
    ],
  },
  {
    label: "Tercihler",
    items: [
      { label: "Ayarlar", href: "#", icon: <SettingsIcon /> },
    ],
  },
];

const USER = { name: "Emirhan Durmuş", email: "emirhan@example.com" };

/* ─── Showcase ────────────────────────────────────────────────── */

export default function SidebarShowcase() {
  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Sidebar</h1>
        <p className="text-sm text-foreground-muted">
          8 farklı tasarım · full · collapsible · dark · floating · mini · gradient · compact · bordered
        </p>
      </div>

      {/* 1. Full */}
      <ShowcaseSection
        title="1. Full Sidebar"
        description="Standart tam genişlik sidebar — bölümlü navigasyon, badge, user footer, özelleştirilebilir genişlik."
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
            <p className="text-sm text-foreground-muted">Sayfa içeriği</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 2. Collapsible */}
      <ShowcaseSection
        title="2. Collapsible (Daraltılabilir)"
        description="Ok butonuyla daraltılır — sadece ikonlar kalır. Hover'da tooltip ile etiket gösterilir."
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

      {/* 3. Dark */}
      <ShowcaseSection
        title="3. Dark — Koyu Tema"
        description="Her zaman koyu arka planlı sidebar. Admin panelleri ve geliştirici araçları için. Üstte gradyan aksent şeridi."
        importLine={IMPORT}
        code={`<SidebarDark
  logoText="DevPanel"
  sections={sections}
  user={{ name: "Admin", email: "admin@company.com" }}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[420px]">
          <SidebarDark
            logoText="DevPanel"
            sections={SECTIONS}
            user={USER}
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Koyu tema — gradyan üst şerit</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 4. Floating */}
      <ShowcaseSection
        title="4. Floating — Yüzen Kart"
        description="Kenarlardan boşluklu, yuvarlak köşeli, gölgeli kart görünümü. Active item tamamen dolu (primary bg)."
        importLine={IMPORT}
        code={`<SidebarFloating
  logoText="Studio"
  sections={sections}
  user={{ name: "Tasarımcı", email: "design@studio.io" }}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[440px] bg-background-muted/50">
          <SidebarFloating
            logoText="Studio"
            sections={SECTIONS}
            user={{ name: "Tasarımcı", email: "design@studio.io" }}
          />
          <div className="flex-1 flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Floating kart efekti — köşeler yuvarlak</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 5. Mini */}
      <ShowcaseSection
        title="5. Mini — Sadece İkon"
        description="Ultra dar, her zaman ikon modunda (VS Code / Figma tarzı). Hover'da tooltip gösterilir. Metin yok."
        importLine={IMPORT}
        code={`<SidebarMini
  logoText="App"
  sections={sections}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[380px]">
          <SidebarMini
            logoText="App"
            sections={SECTIONS}
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">← İkonlara hover edin (tooltip)</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 6. Gradient */}
      <ShowcaseSection
        title="6. Gradient — Aksent Şeritli"
        description="Sol kenarda renkli gradyan şerit + aktif item'da gradyan indicator bar. Canlı ve dinamik görünüm."
        importLine={IMPORT}
        code={`<SidebarGradient
  logoText="Creative"
  sections={sections}
  user={{ name: "Sanatçı", email: "art@creative.co" }}
  gradientFrom="#6366f1"
  gradientTo="#ec4899"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[420px]">
          <SidebarGradient
            logoText="Creative"
            sections={SECTIONS}
            user={{ name: "Sanatçı", email: "art@creative.co" }}
            gradientFrom="#6366f1"
            gradientTo="#ec4899"
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Gradyan sol şerit + aktif indicator</p>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="6b. Gradient — Yeşil/Teal Tema"
        description="Gradyan renkleri özelleştirilebilir."
        importLine={IMPORT}
        code={`<SidebarGradient
  logoText="EcoApp"
  sections={sections}
  gradientFrom="#10b981"
  gradientTo="#06b6d4"
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[360px]">
          <SidebarGradient
            logoText="EcoApp"
            sections={SECTIONS.slice(0, 2)}
            user={USER}
            gradientFrom="#10b981"
            gradientTo="#06b6d4"
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Farklı gradyan renkleri</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 7. Compact */}
      <ShowcaseSection
        title="7. Compact — Çift Sütun"
        description="Sol dar ikon rayı + sağ detay paneli. Bölüm seçimine göre içerik değişir. Çok bölümlü büyük uygulamalar için."
        importLine={IMPORT}
        code={`<SidebarCompact
  logoText="Hub"
  sections={sections}
  user={{ name: "Kullanıcı" }}
  defaultSection={0}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[440px]">
          <SidebarCompact
            logoText="Hub"
            sections={SECTIONS_EXTENDED}
            user={USER}
            defaultSection={0}
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">← Sol rayda bölüm ikonlarına tıklayın</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* 8. Bordered */}
      <ShowcaseSection
        title="8. Bordered — Kartlı Bölümler"
        description="Her bölüm ayrı bir çerçeveli kart içinde. Temiz ve organize — ayarlar paneli hissi."
        importLine={IMPORT}
        code={`<SidebarBordered
  logoText="Settings"
  sections={sections}
  user={{ name: "Admin", email: "admin@app.com" }}
/>`}
        previewClassName="p-0"
      >
        <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden flex h-[440px]">
          <SidebarBordered
            logoText="Settings"
            sections={SECTIONS}
            user={{ name: "Admin", email: "admin@app.com" }}
          />
          <div className="flex-1 bg-background-subtle flex items-center justify-center">
            <p className="text-sm text-foreground-muted">Her bölüm kart içinde</p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Props Overview */}
      <ShowcaseSection
        title="Props — Genel Bakış"
        description="Tüm sidebar bileşenlerinin props karşılaştırması."
        importLine={IMPORT}
        code={`// Ortak props
sections: SidebarSection[]  // { label?, items: SidebarItem[] }
logoText?: string
logo?: ReactNode
user?: { name, email?, avatarSrc? }
className?: string

// SidebarItem tipi
interface SidebarItem {
  label: string
  href?: string
  icon?: ReactNode
  active?: boolean
  badge?: string | number
  onClick?: () => void
}

// Özel props
// SidebarCollapsible: defaultCollapsed, collapseOnMobile
// SidebarFull: footer, width, mobileDrawer
// SidebarGradient: gradientFrom, gradientTo
// SidebarCompact: defaultSection`}
        previewClassName="p-0"
      >
        <div className="overflow-x-auto border border-border rounded-[var(--radius-lg)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-background-muted border-b border-border">
                <th className="text-left px-4 py-3 text-foreground font-semibold">Bileşen</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Stil</th>
                <th className="text-left px-4 py-3 text-foreground font-semibold">Öne Çıkan</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SidebarFull", "Standart tam genişlik", "Bölümler + badge + footer"],
                ["SidebarCollapsible", "Daraltılabilir", "İkon modu + tooltip"],
                ["SidebarDark", "Her zaman koyu", "Gradyan üst şerit"],
                ["SidebarFloating", "Yüzen kart", "Gölge + yuvarlak köşe"],
                ["SidebarMini", "Ultra dar ikon", "VS Code tarzı"],
                ["SidebarGradient", "Gradyan aksent", "Sol şerit + aktif bar"],
                ["SidebarCompact", "Çift sütun", "İkon rayı + detay paneli"],
                ["SidebarBordered", "Kartlı bölümler", "Her bölüm çerçeveli"],
              ].map(([name, style, feature]) => (
                <tr key={name} className="border-b border-border last:border-0 hover:bg-background-muted/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-primary">{name}</td>
                  <td className="px-4 py-3 text-foreground-muted">{style}</td>
                  <td className="px-4 py-3 text-foreground-muted">{feature}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowcaseSection>
    </div>
  );
}
