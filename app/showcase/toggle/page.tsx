"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/toggle";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <Toggle
        label={checked ? "Açık" : "Kapalı"}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <p className="text-xs text-foreground-muted">
        Durum: <span className="font-medium text-foreground">{checked ? "true" : "false"}</span>
      </p>
    </div>
  );
}

/* Ayarlar paneli örneği */
function SettingsDemo() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="border border-border rounded-[var(--radius-lg)] overflow-hidden max-w-sm">
      <div className="px-4 py-3 bg-surface-raised border-b border-border">
        <p className="text-sm font-semibold text-foreground">Bildirim Ayarları</p>
      </div>
      {[
        { key: "notifications" as const, label: "Bildirimleri etkinleştir", description: "Tüm uygulama bildirimleri" },
        { key: "darkMode" as const, label: "Karanlık mod", description: "Arayüz temasını değiştir" },
        { key: "autoSave" as const, label: "Otomatik kaydet", description: "Değişiklikler anında kaydedilir" },
        { key: "analytics" as const, label: "Analitik veriler", description: "Kullanım verilerini paylaş" },
      ].map(({ key, label, description }, i, arr) => (
        <div
          key={key}
          className={cn(
            "flex items-center justify-between px-4 py-3 bg-surface",
            i < arr.length - 1 && "border-b border-border"
          )}
        >
          <div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-foreground-muted">{description}</p>
          </div>
          <Toggle
            checked={settings[key]}
            onChange={() => toggle(key)}
            size="sm"
          />
        </div>
      ))}
    </div>
  );
}

function cn(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export default function ToggleShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Toggle / Switch</h1>
        <p className="text-foreground-muted">
          3 size · 4 renk · label position · description · controlled/uncontrolled
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <Toggle label="Bildirimleri etkinleştir" defaultChecked />
        <Toggle label="Kapalı durum" />
        <Toggle label="Açıklama ile" description="Tüm pazarlama e-postalarını alacaksınız." defaultChecked />
      </Section>

      {/* Controlled */}
      <Section title="Controlled">
        <ControlledDemo />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Toggle size="sm" label="Small (sm)" defaultChecked />
        <Toggle size="md" label="Medium (md) — varsayılan" defaultChecked />
        <Toggle size="lg" label="Large (lg)" defaultChecked />
      </Section>

      {/* Renkler */}
      <Section title="Renkler">
        <Toggle color="primary" label="Primary" defaultChecked />
        <Toggle color="success" label="Success" defaultChecked />
        <Toggle color="danger"  label="Danger"  defaultChecked />
        <Toggle color="warning" label="Warning" defaultChecked />
      </Section>

      {/* Label pozisyonu */}
      <Section title="Label Pozisyonu">
        <Toggle label="Label sağda (varsayılan)" labelPosition="right" defaultChecked />
        <Toggle label="Label solda" labelPosition="left" defaultChecked />
      </Section>

      {/* Disabled */}
      <Section title="Disabled">
        <Toggle label="Disabled kapalı" disabled />
        <Toggle label="Disabled açık" disabled defaultChecked />
      </Section>

      {/* Gerçek kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
          Örnek: Ayarlar Paneli
        </h2>
        <SettingsDemo />
      </section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Toggle } from "@/components/ui/toggle";

// Temel
<Toggle label="Bildirimleri etkinleştir" />

// Controlled
<Toggle
  label="Karanlık mod"
  checked={darkMode}
  onChange={(e) => setDarkMode(e.target.checked)}
/>

// Renk + size
<Toggle color="success" size="sm" defaultChecked />

// Label solda
<Toggle label="Aktif" labelPosition="left" />`}
        </pre>
      </section>
    </div>
  );
}
