"use client";

import { Tabs, type TabItem } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function TabsShowcase() {
  return (
    <div className="max-w-2xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Tabs</h1>
        <p className="text-foreground-muted">
          line · pill · boxed · ikon · badge · disabled · a11y (role=tab, aria-selected)
        </p>
      </div>

      <Section title="Line (Varsayılan)">
        <Tabs items={basicItems} variant="line" />
      </Section>

      <Section title="Pill">
        <Tabs items={basicItems} variant="pill" />
      </Section>

      <Section title="Boxed">
        <Tabs items={basicItems} variant="boxed" />
      </Section>

      <Section title="İkon + Badge">
        <Tabs items={iconItems} variant="line" />
      </Section>

      <Section title="İkon + Pill">
        <Tabs items={iconItems} variant="pill" />
      </Section>
    </div>
  );
}
