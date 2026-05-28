"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Alert } from "@/components/ui/alert";
import { Select } from "@/components/ui/select";

/* ─── Icons ──────────────────────────────────────────────────── */

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

/* ─── Nav ────────────────────────────────────────────────────── */

type SettingsTab = "profile" | "notifications" | "security" | "appearance";

const SETTINGS_NAV: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
  { id: "profile",       label: "Profil",        icon: <UserIcon /> },
  { id: "notifications", label: "Bildirimler",   icon: <BellIcon /> },
  { id: "security",      label: "Güvenlik",      icon: <ShieldIcon /> },
  { id: "appearance",    label: "Görünüm",       icon: <PaletteIcon /> },
];

/* ─── Profile Tab ────────────────────────────────────────────── */

function ProfileTab() {
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6 max-w-xl">
      {saved && (
        <Alert variant="success" title="Kaydedildi" description="Profil bilgileriniz güncellendi." />
      )}

      {/* Avatar */}
      <div className="flex items-center gap-4 p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <Avatar size="xl" name="Emirhan D." />
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Profil Fotoğrafı</p>
          <p className="text-xs text-foreground-muted mb-3">JPG, PNG veya GIF. Maksimum 2MB.</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Fotoğraf Yükle</Button>
            <Button variant="ghost" size="sm">Kaldır</Button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Ad" defaultValue="Emirhan" />
        <Input label="Soyad" defaultValue="Durmuş" />
      </div>
      <Input label="E-posta" type="email" defaultValue="emirhan@myapp.io" />
      <Input label="Kullanıcı Adı" defaultValue="emirhan" leftIcon={<span className="text-foreground-subtle text-sm">@</span>} />
      <Textarea
        label="Biyografi"
        defaultValue="Full-stack geliştirici. React ve TypeScript tutkunu."
        maxLength={200}
        showCount
        rows={3}
      />
      <Select
        label="Zaman Dilimi"
        defaultValue="europe-istanbul"
        options={[
          { value: "europe-istanbul", label: "Europe/Istanbul (UTC+3)" },
          { value: "europe-london",   label: "Europe/London (UTC+0)" },
          { value: "america-ny",      label: "America/New_York (UTC-5)" },
        ]}
      />

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSave}>Değişiklikleri Kaydet</Button>
        <Button variant="outline">İptal</Button>
      </div>
    </div>
  );
}

/* ─── Notifications Tab ──────────────────────────────────────── */

function NotificationsTab() {
  const [settings, setSettings] = useState({
    emailMarketing:  true,
    emailProduct:    true,
    emailSecurity:   true,
    pushOrders:      false,
    pushMentions:    true,
    pushTeam:        true,
    weeklyDigest:    false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">E-posta Bildirimleri</h3>
        <p className="text-xs text-foreground-muted mb-4">Hangi e-postaları almak istediğinizi seçin.</p>
        <div className="space-y-3 p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
          {[
            { key: "emailMarketing" as const,  label: "Pazarlama",     desc: "Yeni özellikler ve kampanyalar" },
            { key: "emailProduct"   as const,  label: "Ürün Güncellemeleri", desc: "Yeni sürümler ve değişiklikler" },
            { key: "emailSecurity"  as const,  label: "Güvenlik",      desc: "Hesabınızdaki kritik değişiklikler" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-foreground-muted">{item.desc}</p>
              </div>
              <Toggle
                checked={settings[item.key]}
                onChange={() => toggle(item.key)}
                color="primary"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Push Bildirimleri</h3>
        <p className="text-xs text-foreground-muted mb-4">Tarayıcı bildirimleri için tercihleriniz.</p>
        <div className="space-y-3 p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
          {[
            { key: "pushOrders"    as const, label: "Siparişler",  desc: "Yeni sipariş geldiğinde" },
            { key: "pushMentions"  as const, label: "Bahsedenler", desc: "Sizi mention ettiklerinde" },
            { key: "pushTeam"      as const, label: "Ekip",        desc: "Takım üyesi aktivitesi" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-foreground-muted">{item.desc}</p>
              </div>
              <Toggle
                checked={settings[item.key]}
                onChange={() => toggle(item.key)}
                color="primary"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Haftalık Özet</p>
          <p className="text-xs text-foreground-muted">Her Pazartesi özet e-posta al</p>
        </div>
        <Toggle
          checked={settings.weeklyDigest}
          onChange={() => toggle("weeklyDigest")}
          color="success"
        />
      </div>

      <Button>Kaydet</Button>
    </div>
  );
}

/* ─── Security Tab ───────────────────────────────────────────── */

function SecurityTab() {
  const [show2FA, setShow2FA] = useState(false);

  return (
    <div className="space-y-6 max-w-xl">
      {/* Password change */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Şifre Değiştir</h3>
          <p className="text-xs text-foreground-muted mt-0.5">Son şifre değişikliği: 3 ay önce</p>
        </div>
        <Input label="Mevcut Şifre" type="password" />
        <Input label="Yeni Şifre" type="password" />
        <Input label="Yeni Şifre (Tekrar)" type="password" />
        <Button>Şifreyi Güncelle</Button>
      </div>

      {/* 2FA */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-foreground">İki Faktörlü Doğrulama</h3>
              <Badge variant="danger" size="sm">Kapalı</Badge>
            </div>
            <p className="text-xs text-foreground-muted mt-0.5">Hesabınıza ekstra güvenlik katmanı ekleyin.</p>
          </div>
          <Toggle checked={show2FA} onChange={() => setShow2FA(!show2FA)} color="success" />
        </div>
        {show2FA && (
          <Alert variant="info" description="QR kod tarayıcınızla okutun veya kodu manuel girin." />
        )}
      </div>

      {/* Sessions */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Aktif Oturumlar</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome / macOS",  location: "İstanbul, TR", current: true,  ago: "Şu an" },
            { device: "Safari / iPhone", location: "İstanbul, TR", current: false, ago: "2 saat önce" },
            { device: "Firefox / Linux", location: "Ankara, TR",   current: false, ago: "3 gün önce" },
          ].map((s) => (
            <div key={s.device} className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{s.device}</span>
                  {s.current && <Badge variant="success" size="sm">Bu cihaz</Badge>}
                </div>
                <p className="text-xs text-foreground-subtle">{s.location} · {s.ago}</p>
              </div>
              {!s.current && (
                <Button variant="ghost" size="sm" className="text-danger hover:text-danger hover:bg-danger-subtle">
                  Çıkış Yap
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="p-4 bg-danger-subtle rounded-[var(--radius-xl)] border border-danger/20">
        <h3 className="text-sm font-semibold text-danger mb-1">Tehlikeli Bölge</h3>
        <p className="text-xs text-foreground-muted mb-3">Bu işlem geri alınamaz. Hesabınız ve tüm veriniz silinir.</p>
        <Button variant="danger" size="sm" leftIcon={<TrashIcon />}>Hesabı Sil</Button>
      </div>
    </div>
  );
}

/* ─── Appearance Tab ─────────────────────────────────────────── */

function AppearanceTab() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [accent, setAccent] = useState("blue");

  const ACCENTS = [
    { id: "blue",   bg: "bg-blue-500" },
    { id: "violet", bg: "bg-violet-500" },
    { id: "green",  bg: "bg-green-500" },
    { id: "orange", bg: "bg-orange-500" },
    { id: "rose",   bg: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6 max-w-xl">
      {/* Theme */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-1">Tema</h3>
        <p className="text-xs text-foreground-muted mb-4">Arayüz renk temasını seçin.</p>
        <div className="grid grid-cols-3 gap-3">
          {(["light", "dark", "system"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "p-3 rounded-[var(--radius-lg)] border-2 text-center transition-all",
                theme === t ? "border-primary bg-primary-subtle" : "border-border bg-background-muted hover:border-border-strong"
              )}
            >
              <div className={cn(
                "w-full h-8 rounded-[var(--radius-md)] mb-2 mx-auto",
                t === "light" ? "bg-white border border-border" : t === "dark" ? "bg-gray-900" : "bg-gradient-to-r from-white to-gray-900"
              )} />
              <span className="text-xs font-medium text-foreground capitalize">
                {t === "light" ? "Açık" : t === "dark" ? "Koyu" : "Sistem"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-1">Vurgu Rengi</h3>
        <p className="text-xs text-foreground-muted mb-4">Birincil eylem rengini özelleştirin.</p>
        <div className="flex items-center gap-3">
          {ACCENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAccent(a.id)}
              className={cn(
                "w-8 h-8 rounded-full transition-all",
                a.bg,
                accent === a.id ? "ring-2 ring-offset-2 ring-foreground scale-110" : "hover:scale-105"
              )}
              aria-label={a.id}
            />
          ))}
        </div>
      </div>

      {/* Density */}
      <div className="p-4 bg-surface rounded-[var(--radius-xl)] border border-border">
        <h3 className="text-sm font-semibold text-foreground mb-1">Yoğunluk</h3>
        <p className="text-xs text-foreground-muted mb-4">Arayüz elemanlarının sıkışıklığını ayarlayın.</p>
        <div className="flex gap-3">
          {(["comfortable", "compact"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={cn(
                "flex-1 py-2.5 rounded-[var(--radius-md)] border-2 text-sm font-medium transition-all",
                density === d ? "border-primary bg-primary-subtle text-primary" : "border-border text-foreground-muted hover:border-border-strong"
              )}
            >
              {d === "comfortable" ? "Rahat" : "Kompakt"}
            </button>
          ))}
        </div>
      </div>

      <Button>Kaydet</Button>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────── */

export function SettingsTemplate() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  const content: Record<SettingsTab, React.ReactNode> = {
    profile:       <ProfileTab />,
    notifications: <NotificationsTab />,
    security:      <SecurityTab />,
    appearance:    <AppearanceTab />,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Ayarlar</h1>
          <p className="text-sm text-foreground-muted mt-1">Hesap ve uygulama tercihlerinizi yönetin.</p>
        </div>
        {/* Nav */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex gap-0 -mb-px overflow-x-auto">
            {SETTINGS_NAV.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground-muted hover:text-foreground hover:border-border"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {content[activeTab]}
      </div>
    </div>
  );
}
