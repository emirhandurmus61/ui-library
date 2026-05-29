"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";
import { ShowcaseSection } from "@/components/ui/showcase-section";

function cn(...c: (string | undefined | false | null)[]) {
  return c.filter(Boolean).join(" ");
}

/* ─── Icons for "icon" variant demo ─────────────────────────── */

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/>
    </svg>
  );
}
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" className="size-full" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
function BluetoothIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-full" aria-hidden="true">
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"/>
    </svg>
  );
}
function FlashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="size-full" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

/* ─── Interactive demos (need state) ─────────────────────────── */

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Toggle label={checked ? "Açık" : "Kapalı"} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      <p className="text-xs text-foreground-muted">Durum: <span className="font-medium text-foreground">{checked ? "true" : "false"}</span></p>
    </div>
  );
}

function DayNightDemo() {
  const [sm, setSm]   = useState(false);
  const [md, setMd]   = useState(false);
  const [lg, setLg]   = useState(true);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-8">
        <Toggle variant="daynight" size="sm" label={sm ? "Gece" : "Gündüz"} checked={sm} onChange={(e) => setSm(e.target.checked)} />
        <Toggle variant="daynight" size="md" label={md ? "Gece" : "Gündüz"} description="Tema değiştirici" checked={md} onChange={(e) => setMd(e.target.checked)} />
        <Toggle variant="daynight" size="lg" label={lg ? "Gece Modu" : "Gündüz Modu"} description="Büyük boyut" checked={lg} onChange={(e) => setLg(e.target.checked)} />
      </div>
      <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden max-w-xs">
        <div className="px-4 py-3 bg-surface-raised border-b border-border">
          <p className="text-sm font-semibold text-foreground">Görünüm Ayarları</p>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: "Karanlık mod",      desc: "Gece temasına geç",  s: lg, fn: setLg },
            { label: "Otomatik aydınlık", desc: "Güneşe göre ayarla", s: sm, fn: setSm },
          ].map(({ label, desc, s, fn }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3 bg-surface">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-foreground-muted">{desc}</p>
              </div>
              <Toggle variant="daynight" size="sm" checked={s} onChange={(e) => fn(e.target.checked)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingDemo() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setTimeout(() => { setChecked(e.target.checked); setLoading(false); }, 1400);
  };
  return (
    <div className="flex flex-col gap-4">
      <Toggle label={loading ? "Kaydediliyor…" : checked ? "Etkin" : "Devre dışı"} description="Tıklayınca 1.4 sn async simüle edilir." checked={checked} loading={loading} onChange={handle} />
      <Toggle variant="daynight" label={loading ? "Değiştiriliyor…" : checked ? "Gece" : "Gündüz"} checked={checked} loading={loading} onChange={handle} />
      <Toggle variant="icon" thumbIcon={<WifiIcon />} label={loading ? "Bağlanıyor…" : checked ? "Bağlı" : "Bağlantı kesik"} color="success" checked={checked} loading={loading} onChange={handle} />
      <p className="text-xs text-foreground-muted">Durum: <span className="font-medium text-foreground">{loading ? "yükleniyor" : checked ? "true" : "false"}</span></p>
    </div>
  );
}

function SettingsDemo() {
  const [s, setS] = useState({ notifications: true, darkMode: false, autoSave: true, analytics: false });
  const toggle = (k: keyof typeof s) => setS((p) => ({ ...p, [k]: !p[k] }));
  return (
    <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden max-w-sm">
      <div className="px-4 py-3 bg-surface-raised border-b border-border">
        <p className="text-sm font-semibold text-foreground">Bildirim Ayarları</p>
      </div>
      {([
        { key: "notifications" as const, label: "Bildirimleri etkinleştir", description: "Tüm uygulama bildirimleri" },
        { key: "darkMode" as const,      label: "Karanlık mod",             description: "Arayüz temasını değiştir" },
        { key: "autoSave" as const,      label: "Otomatik kaydet",          description: "Değişiklikler anında kaydedilir" },
        { key: "analytics" as const,     label: "Analitik veriler",         description: "Kullanım verilerini paylaş" },
      ]).map(({ key, label, description }, i, arr) => (
        <div key={key} className={cn("flex items-center justify-between px-4 py-3 bg-surface", i < arr.length - 1 && "border-b border-border")}>
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-foreground-muted">{description}</p>
          </div>
          <Toggle checked={s[key]} onChange={() => toggle(key)} size="sm" />
        </div>
      ))}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */

const IMPORT = `import { Toggle } from "@/components/ui/toggle";`;

export default function ToggleShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Toggle / Switch</h1>
        <p className="text-foreground-muted text-sm">
          4 varyant · 3 boyut · 4 renk · icon thumb · loading state · badge · label pozisyonu
        </p>
      </div>

      {/* Temel */}
      <ShowcaseSection
        title="Temel"
        description="Label, açıklama ve varsayılan durum."
        importLine={IMPORT}
        code={`<Toggle label="Bildirimleri etkinleştir" defaultChecked />
<Toggle label="Kapalı durum" />
<Toggle label="Açıklama ile" description="Tüm pazarlama e-postalarını alacaksınız." defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Toggle label="Bildirimleri etkinleştir" defaultChecked />
          <Toggle label="Kapalı durum" />
          <Toggle label="Açıklama ile" description="Tüm pazarlama e-postalarını alacaksınız." defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Controlled */}
      <ShowcaseSection
        title="Controlled"
        description="checked + onChange ile dışarıdan yönetilen durum."
        importLine={IMPORT}
        code={`const [checked, setChecked] = useState(false);

<Toggle
  label={checked ? "Açık" : "Kapalı"}
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
<p>Durum: {checked ? "true" : "false"}</p>`}
      >
        <ControlledDemo />
      </ShowcaseSection>

      {/* Sizes */}
      <ShowcaseSection
        title="Sizes"
        description="sm · md (varsayılan) · lg"
        importLine={IMPORT}
        code={`<Toggle size="sm" label="Small (sm)" defaultChecked />
<Toggle size="md" label="Medium (md) — varsayılan" defaultChecked />
<Toggle size="lg" label="Large (lg)" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Toggle size="sm" label="Small (sm)" defaultChecked />
          <Toggle size="md" label="Medium (md) — varsayılan" defaultChecked />
          <Toggle size="lg" label="Large (lg)" defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Renkler */}
      <ShowcaseSection
        title="Renkler"
        description="primary · success · danger · warning"
        importLine={IMPORT}
        code={`<Toggle color="primary" label="Primary" defaultChecked />
<Toggle color="success" label="Success" defaultChecked />
<Toggle color="danger"  label="Danger"  defaultChecked />
<Toggle color="warning" label="Warning" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Toggle color="primary" label="Primary" defaultChecked />
          <Toggle color="success" label="Success" defaultChecked />
          <Toggle color="danger"  label="Danger"  defaultChecked />
          <Toggle color="warning" label="Warning" defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Label pozisyonu */}
      <ShowcaseSection
        title="Label Pozisyonu"
        description="Label toggle'ın sağında (default) veya solunda gösterilebilir."
        importLine={IMPORT}
        code={`<Toggle label="Label sağda (varsayılan)" labelPosition="right" defaultChecked />
<Toggle label="Label solda" labelPosition="left" defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Toggle label="Label sağda (varsayılan)" labelPosition="right" defaultChecked />
          <Toggle label="Label solda" labelPosition="left" defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Disabled */}
      <ShowcaseSection
        title="Disabled"
        description="Etkileşimi devre dışı bırakılmış haller."
        importLine={IMPORT}
        code={`<Toggle label="Disabled kapalı" disabled />
<Toggle label="Disabled açık" disabled defaultChecked />`}
      >
        <div className="flex flex-col gap-3">
          <Toggle label="Disabled kapalı" disabled />
          <Toggle label="Disabled açık" disabled defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Day / Night */}
      <ShowcaseSection
        title="Day / Night"
        description="Güneş ↔ Ay animasyonu, gökyüzü gradyanı, bulut & yıldız süslemeleri. Tema değiştirici için idealdir."
        importLine={IMPORT}
        code={`// Tüm boyutlar
<Toggle variant="daynight" size="sm" checked={sm} onChange={(e) => setSm(e.target.checked)} />
<Toggle variant="daynight" size="md" label="Gündüz / Gece" checked={md} onChange={(e) => setMd(e.target.checked)} />
<Toggle variant="daynight" size="lg" label="Gece Modu" description="Büyük boyut" checked={lg} onChange={(e) => setLg(e.target.checked)} />`}
      >
        <DayNightDemo />
      </ShowcaseSection>

      {/* Icon Toggle */}
      <ShowcaseSection
        title="Icon Toggle"
        description="thumbIcon prop'u ile thumb içine özel ikon — bildirim, Wi-Fi, kilit, favori vb."
        importLine={IMPORT}
        code={`<Toggle variant="icon" thumbIcon={<BellIcon />}      label="Bildirimler" defaultChecked />
<Toggle variant="icon" thumbIcon={<WifiIcon />}      label="Wi-Fi"       defaultChecked color="success" />
<Toggle variant="icon" thumbIcon={<LockIcon />}      label="Kilitle"     defaultChecked color="danger" />
<Toggle variant="icon" thumbIcon={<StarIcon />}      label="Favori"      defaultChecked color="warning" />
<Toggle variant="icon" thumbIcon={<BluetoothIcon />} label="Bluetooth"   size="sm" />
<Toggle variant="icon" thumbIcon={<FlashIcon />}     label="Performans"  size="lg" defaultChecked color="warning" />`}
      >
        <div className="flex flex-wrap items-center gap-6">
          <Toggle variant="icon" thumbIcon={<BellIcon />}      label="Bildirimler" defaultChecked />
          <Toggle variant="icon" thumbIcon={<WifiIcon />}      label="Wi-Fi"       defaultChecked color="success" />
          <Toggle variant="icon" thumbIcon={<LockIcon />}      label="Kilitle"     defaultChecked color="danger" />
          <Toggle variant="icon" thumbIcon={<StarIcon />}      label="Favori"      defaultChecked color="warning" />
          <Toggle variant="icon" thumbIcon={<BluetoothIcon />} label="Bluetooth"   size="sm" />
          <Toggle variant="icon" thumbIcon={<FlashIcon />}     label="Performans"  size="lg" defaultChecked color="warning" />
        </div>
      </ShowcaseSection>

      {/* Loading State */}
      <ShowcaseSection
        title="Loading State"
        description="loading prop'u ile async işlem sırasında spinner gösterilir, tıklama dondurulur."
        importLine={IMPORT}
        code={`const [checked, setChecked] = useState(false);
const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setLoading(true);
  await saveToAPI(e.target.checked); // async işlem
  setChecked(e.target.checked);
  setLoading(false);
};

<Toggle
  label={loading ? "Kaydediliyor…" : "Etkin"}
  checked={checked}
  loading={loading}
  onChange={handleChange}
/>`}
      >
        <LoadingDemo />
      </ShowcaseSection>

      {/* Badge */}
      <ShowcaseSection
        title="Badge / Sayaç"
        description="badge prop'u ile track köşesine bildirim rozeti eklenir. 0 veya boş string gizler."
        importLine={IMPORT}
        code={`<Toggle label="Bildirimler"  badge={3}    defaultChecked />
<Toggle label="Mesajlar"     badge={99}   color="success" defaultChecked />
<Toggle label="Uyarı"        badge="!"    color="warning" />
<Toggle label="Yeni özellik" badge="NEW"  color="primary" defaultChecked size="lg" />
<Toggle label="Devre dışı"   badge={5}    disabled defaultChecked />`}
      >
        <div className="flex flex-wrap items-start gap-8">
          <Toggle label="Bildirimler"  badge={3}    defaultChecked />
          <Toggle label="Mesajlar"     badge={99}   color="success" defaultChecked />
          <Toggle label="Uyarı"        badge="!"    color="warning" />
          <Toggle label="Yeni özellik" badge="NEW"  color="primary" defaultChecked size="lg" />
          <Toggle label="Devre dışı"   badge={5}    disabled defaultChecked />
        </div>
      </ShowcaseSection>

      {/* Pill Variant */}
      <ShowcaseSection
        title="Pill Varyant"
        description='variant="pill" ile köşeler daha kare, şerit biçimi elde edilir.'
        importLine={IMPORT}
        code={`// Default (tam yuvarlak)
<Toggle size="sm" label="Small"  defaultChecked />
<Toggle size="md" label="Medium" defaultChecked />
<Toggle size="lg" label="Large"  defaultChecked />

// Pill (kısa kenar)
<Toggle variant="pill" size="sm" label="Small"  defaultChecked />
<Toggle variant="pill" size="md" label="Medium" defaultChecked />
<Toggle variant="pill" size="lg" label="Large"  defaultChecked />

// Pill — renkler
<Toggle variant="pill" color="primary" label="Primary" defaultChecked />
<Toggle variant="pill" color="success" label="Success" defaultChecked />
<Toggle variant="pill" color="danger"  label="Danger"  defaultChecked />
<Toggle variant="pill" color="warning" label="Warning" defaultChecked />`}
      >
        <div className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider font-semibold">Default (tam yuvarlak)</p>
            <div className="flex flex-wrap items-center gap-5">
              <Toggle size="sm" label="Small"  defaultChecked />
              <Toggle size="md" label="Medium" defaultChecked />
              <Toggle size="lg" label="Large"  defaultChecked />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider font-semibold">Pill (kısa kenar)</p>
            <div className="flex flex-wrap items-center gap-5">
              <Toggle variant="pill" size="sm" label="Small"  defaultChecked />
              <Toggle variant="pill" size="md" label="Medium" defaultChecked />
              <Toggle variant="pill" size="lg" label="Large"  defaultChecked />
            </div>
          </div>
          <div className="space-y-1.5">
            <p className="text-xs text-foreground-subtle uppercase tracking-wider font-semibold">Pill — renkler</p>
            <div className="flex flex-wrap items-center gap-5">
              <Toggle variant="pill" color="primary" label="Primary" defaultChecked />
              <Toggle variant="pill" color="success" label="Success" defaultChecked />
              <Toggle variant="pill" color="danger"  label="Danger"  defaultChecked />
              <Toggle variant="pill" color="warning" label="Warning" defaultChecked />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Ayarlar paneli */}
      <ShowcaseSection
        title="Örnek: Ayarlar Paneli"
        description="Toggle'ların gerçek bir settings UI içindeki kullanımı."
        importLine={IMPORT}
        code={`const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoSave: true,
  analytics: false,
});

const toggle = (key) => setSettings((p) => ({ ...p, [key]: !p[key] }));

<div className="border border-border rounded-lg overflow-hidden">
  {items.map(({ key, label, description }) => (
    <div key={key} className="flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-foreground-muted">{description}</p>
      </div>
      <Toggle
        checked={settings[key]}
        onChange={() => toggle(key)}
        size="sm"
      />
    </div>
  ))}
</div>`}
      >
        <SettingsDemo />
      </ShowcaseSection>
    </div>
  );
}
