import { Tabs, type TabItem } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

const IMPORT = `import { Tabs, type TabItem } from "@/components/ui/tabs";`;

function UserIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function SettingsIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>;
}
function BellIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>;
}

const basicItems: TabItem[] = [
  { id: "account", label: "Hesap", content: <p className="text-sm text-foreground-muted">Hesap ayarları içeriği burada görünür.</p> },
  { id: "password", label: "Şifre", content: <p className="text-sm text-foreground-muted">Şifre değiştirme formu burada olur.</p> },
  { id: "billing", label: "Faturalama", content: <p className="text-sm text-foreground-muted">Faturalama ve ödeme yöntemleri.</p> },
  { id: "disabled", label: "Devre Dışı", disabled: true, content: null },
];

const iconItems: TabItem[] = [
  { id: "profile", label: "Profil", icon: <UserIcon />, content: <p className="text-sm text-foreground-muted">Profil bilgileri burada.</p> },
  { id: "notif", label: "Bildirimler", icon: <BellIcon />, badge: <Badge variant="danger" size="sm">3</Badge>, content: <p className="text-sm text-foreground-muted">Bildirim ayarları burada.</p> },
  { id: "settings", label: "Ayarlar", icon: <SettingsIcon />, content: <p className="text-sm text-foreground-muted">Genel ayarlar burada.</p> },
];

export default function TabsShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Tabs</h1>
        <p className="text-foreground-muted">
          line · pill · boxed · ikon · badge · disabled · a11y (role=tab, aria-selected)
        </p>
      </div>

      <ShowcaseSection
        title="Line (Varsayılan)"
        description="Alt çizgi ile aktif sekmeyi vurgular; varsayılan stil."
        importLine={IMPORT}
        code={`<Tabs items={basicItems} variant="line" />`}
      >
        <Tabs items={basicItems} variant="line" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Pill"
        description="Aktif sekme hap (pill) şeklinde arka planla vurgulanır."
        importLine={IMPORT}
        code={`<Tabs items={basicItems} variant="pill" />`}
      >
        <Tabs items={basicItems} variant="pill" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Boxed"
        description="Tüm sekmeler kenarlıklı kutu içinde gösterilir."
        importLine={IMPORT}
        code={`<Tabs items={basicItems} variant="boxed" />`}
      >
        <Tabs items={basicItems} variant="boxed" />
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon + Badge"
        description="Sekmelere ikon ve badge eklenebilir; line variant ile."
        importLine={IMPORT}
        code={`<Tabs items={iconItems} variant="line" />`}
      >
        <Tabs items={iconItems} variant="line" />
      </ShowcaseSection>

      <ShowcaseSection
        title="İkon + Pill"
        description="İkon ve badge'li sekmeler pill variant ile."
        importLine={IMPORT}
        code={`<Tabs items={iconItems} variant="pill" />`}
      >
        <Tabs items={iconItems} variant="pill" />
      </ShowcaseSection>
    </div>
  );
}
