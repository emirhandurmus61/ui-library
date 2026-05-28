"use client";

import { SettingsTemplate } from "@/components/ui/templates/settings";

export default function SettingsTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Settings Sayfası Şablonu</h1>
        <p className="text-sm text-foreground-muted">
          Profil · Bildirimler · Güvenlik · Görünüm — 4 sekmeli ayarlar sayfası.
        </p>
      </div>

      <section className="rounded-[var(--radius-xl)] border border-border overflow-hidden max-h-[700px] overflow-y-auto">
        <SettingsTemplate />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { SettingsTemplate } from "@/components/ui/templates/settings";

export default function AyarlarPage() {
  return <SettingsTemplate />;
}`}
        </pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Sekmeler</h2>
        <ul className="text-sm text-foreground-muted space-y-1 list-disc list-inside">
          <li><span className="font-medium text-foreground">Profil</span> — avatar, ad-soyad, e-posta, kullanıcı adı, biyografi, zaman dilimi</li>
          <li><span className="font-medium text-foreground">Bildirimler</span> — e-posta + push bildirim toggle'ları, haftalık özet</li>
          <li><span className="font-medium text-foreground">Güvenlik</span> — şifre değiştirme, 2FA, aktif oturumlar, hesap silme</li>
          <li><span className="font-medium text-foreground">Görünüm</span> — tema seçimi, vurgu rengi, yoğunluk</li>
        </ul>
      </section>
    </div>
  );
}
