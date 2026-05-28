"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── Icon helpers ───────────────────────────────────────────── */

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <path d="M5 12h14"/><path d="M12 5v14"/>
  </svg>
);
const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 1.41 13.82M4.93 4.93A10 10 0 0 0 3.52 18.75"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const UpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/>
  </svg>
);
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

/* ─── Section title helper ───────────────────────────────────── */

function SectionTitle({
  tag,
  title,
  description,
  tagColor = "bg-primary-subtle text-primary",
}: {
  tag: string;
  title: string;
  description: string;
  tagColor?: string;
}) {
  return (
    <div className="mb-6">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${tagColor}`}>
        {tag}
      </span>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-sm text-foreground-muted mt-0.5">{description}</p>
    </div>
  );
}

/* ─── State matrix row ───────────────────────────────────────── */

function StateRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-xs text-foreground-subtle font-mono w-20 shrink-0">{label}</span>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */

export default function ButtonShowcase() {
  const [likeCount, setLikeCount] = useState(142);
  const [liked, setLiked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fabVisible] = useState(true);
  const [splitOpen, setSplitOpen] = useState(false);
  const [fullWidthLoading, setFullWidthLoading] = useState(false);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((v) => (liked ? v - 1 : v + 1));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1800);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-4xl space-y-16">

      {/* ── Başlık ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Button</h1>
        <p className="text-foreground-muted text-sm">
          7 variant · 8 size · 7 stylePreset — kullanım senaryolarına göre kategorize edilmiş örnekler.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 1 — FORM AKSİYONLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Form Aksiyonları"
          title="Form & Dialog Butonları"
          description="Kaydet / İptal / Sil / Onay çiftleri. Her form ve dialog alt çubuğu için."
          tagColor="bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
        />

        {/* Standart kaydet/iptal çifti */}
        <ShowcaseSection
          title="Kaydet / İptal"
          description="Her formun footer'ında kullanılan temel aksiyon çifti. Loading state ile."
          previewClassName="flex flex-wrap gap-3"
          code={`<Button variant="outline" onClick={onCancel}>İptal</Button>
<Button onClick={handleSave} loading={saving}>
  {saving ? "Kaydediliyor..." : "Kaydet"}
</Button>`}
        >
          <Button variant="outline" onClick={() => {}}>İptal</Button>
          <Button onClick={handleSave} loading={saving}>
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </ShowcaseSection>

        {/* Tehlikeli onay çifti */}
        <ShowcaseSection
          title="Tehlikeli Aksiyon Onayı"
          description="Silme / kalıcı işlem onayları için danger varyantı. İptal her zaman solda, tehlikeli aksiyon sağda."
          previewClassName="flex flex-wrap gap-3"
          code={`<Button variant="outline" onClick={onCancel}>İptal</Button>
<Button variant="danger" leftIcon={<TrashIcon />}>Kalıcı Olarak Sil</Button>`}
        >
          <Button variant="outline">İptal</Button>
          <Button variant="danger" leftIcon={<TrashIcon />}>Kalıcı Olarak Sil</Button>
        </ShowcaseSection>

        {/* Modal footer — sağa hizalı */}
        <ShowcaseSection
          title="Modal / Dialog Footer"
          description="Modal alt çubuğu düzeni: iptal sola, birincil aksiyon sağa. Tam genişlik container içinde."
          previewClassName="w-full"
          code={`<div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
  <Button variant="ghost">Vazgeç</Button>
  <Button variant="outline">Taslak Olarak Kaydet</Button>
  <Button rightIcon={<ArrowIcon />}>Yayınla</Button>
</div>`}
        >
          <div className="w-full rounded-[var(--radius-xl)] border border-border p-5">
            <p className="text-sm text-foreground-muted mb-4">Modal içerik alanı</p>
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="ghost">Vazgeç</Button>
              <Button variant="outline">Taslak Kaydet</Button>
              <Button rightIcon={<ArrowIcon />}>Yayınla</Button>
            </div>
          </div>
        </ShowcaseSection>

        {/* Adım formu navigasyonu */}
        <ShowcaseSection
          title="Adım Formu Navigasyonu"
          description="Çok adımlı formlarda geri/ileri geçişi. Geri outline, ileri primary."
          previewClassName="flex items-center justify-between w-full max-w-sm"
          code={`<Button variant="outline" leftIcon={<ArrowIcon className="rotate-180" />}>
  Geri
</Button>
<Button rightIcon={<ArrowIcon />}>
  İleri
</Button>`}
        >
          <Button variant="outline" leftIcon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em" aria-hidden="true" className="rotate-180">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          }>Geri</Button>
          <Button rightIcon={<ArrowIcon />}>İleri</Button>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 2 — CTA BUTONLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="CTA"
          title="Call-to-Action Butonları"
          description="Landing page hero, fiyatlandırma ve dönüşüm odaklı bölümler için."
          tagColor="bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400"
        />

        <ShowcaseSection
          title="Hero CTA Çifti"
          description="Ana eylem gradient/primary, ikincil eylem outline veya ghost. Boyut xl veya lg kullanın."
          previewClassName="flex flex-wrap items-center gap-3"
          code={`<Button stylePreset="gradient" size="xl" rightIcon={<ArrowIcon />}>
  Ücretsiz Başla
</Button>
<Button variant="outline" size="xl">
  Demo İzle
</Button>`}
        >
          <Button stylePreset="gradient" size="xl" rightIcon={<ArrowIcon />}>Ücretsiz Başla</Button>
          <Button variant="outline" size="xl">Demo İzle</Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Neon / Koyu Arka Plan CTA"
          description="Koyu hero veya tam ekran arka plan üstünde dikkat çekici CTA. neon ve glass preset."
          previewClassName="flex flex-wrap items-center gap-4 p-8 rounded-[var(--radius-xl)] bg-gray-950"
          code={`<Button stylePreset="neon" size="lg" leftIcon={<ZapIcon />}>
  Hemen Dene
</Button>
<Button stylePreset="glass" size="lg">
  Nasıl Çalışır?
</Button>`}
        >
          <Button stylePreset="neon" size="lg" leftIcon={<ZapIcon />}>Hemen Dene</Button>
          <Button stylePreset="glass" size="lg">Nasıl Çalışır?</Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Fiyatlandırma CTA"
          description="Plan kartlarında kullanım. Öne çıkan plan gradient, diğerleri outline."
          previewClassName="flex flex-wrap items-center gap-3"
          code={`<Button variant="outline" className="w-full">Ücretsiz Başla</Button>
<Button stylePreset="gradient" className="w-full">14 Gün Ücretsiz Dene</Button>
<Button variant="outline" className="w-full">Satışla İletişim</Button>`}
        >
          <Button variant="outline">Ücretsiz Başla</Button>
          <Button stylePreset="gradient">14 Gün Ücretsiz Dene</Button>
          <Button variant="outline">Satışla İletişim</Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Bülten / Waitlist CTA"
          description="Email formu yanında veya altında tam genişlikte kullanım."
          previewClassName="w-full max-w-md"
          code={`<div className="flex gap-2">
  <input
    type="email"
    placeholder="eposta@adresiniz.com"
    className="flex-1 h-10 px-3 text-sm rounded-[var(--radius-md)] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
  />
  <Button rightIcon={<ArrowIcon />}>Katıl</Button>
</div>`}
        >
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="eposta@adresiniz.com"
              className="flex-1 h-10 px-3 text-sm rounded-[var(--radius-md)] border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button rightIcon={<ArrowIcon />}>Katıl</Button>
          </div>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 3 — SOSYAL GİRİŞ BUTONLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Auth"
          title="Sosyal Giriş Butonları"
          description="OAuth sağlayıcıları için. Outlined varyant çoğu tasarımda en iyi sonucu verir."
          tagColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
        />

        <ShowcaseSection
          title="OAuth Butonları"
          description="Google, GitHub, Apple sağlayıcıları. Outline variant + marka ikonu."
          previewClassName="flex flex-col gap-3 max-w-xs"
          code={`<Button variant="outline" className="w-full" leftIcon={<GoogleIcon />}>
  Google ile Devam Et
</Button>
<Button variant="outline" className="w-full" leftIcon={<GithubIcon />}>
  GitHub ile Devam Et
</Button>
<Button variant="secondary" className="w-full" leftIcon={<AppleIcon />}>
  Apple ile Devam Et
</Button>`}
        >
          <Button variant="outline" className="w-full" leftIcon={<GoogleIcon />}>
            Google ile Devam Et
          </Button>
          <Button variant="outline" className="w-full" leftIcon={<GithubIcon />}>
            GitHub ile Devam Et
          </Button>
          <Button variant="secondary" className="w-full" leftIcon={<AppleIcon />}>
            Apple ile Devam Et
          </Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Kompakt Sosyal Butonlar"
          description="Login formunda yan yana kullanım için. İkon + kısa etiket."
          previewClassName="flex flex-wrap gap-3"
          code={`<Button variant="outline" size="sm" leftIcon={<GoogleIcon />}>Google</Button>
<Button variant="outline" size="sm" leftIcon={<GithubIcon />}>GitHub</Button>
<Button variant="outline" size="sm" leftIcon={<AppleIcon />}>Apple</Button>`}
        >
          <Button variant="outline" size="sm" leftIcon={<GoogleIcon />}>Google</Button>
          <Button variant="outline" size="sm" leftIcon={<GithubIcon />}>GitHub</Button>
          <Button variant="outline" size="sm" leftIcon={<AppleIcon />}>Apple</Button>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 4 — İKON BUTONLARI & TOOLBAR
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="İkon"
          title="İkon Butonları & Toolbar"
          description="Tablo aksiyon sütunları, metin editörleri ve toolbar bileşenleri için."
          tagColor="bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
        />

        <ShowcaseSection
          title="Boyut Varyantları"
          description="icon-sm (32px) · icon (40px) · icon-lg (48px). Minimum 44px WCAG dokunma hedefi için icon veya icon-lg önerilir."
          previewClassName="flex flex-wrap items-center gap-3"
          code={`<Button size="icon-sm" variant="ghost" aria-label="Düzenle"><EditIcon /></Button>
<Button size="icon" variant="ghost" aria-label="Kopyala"><CopyIcon /></Button>
<Button size="icon-lg" variant="ghost" aria-label="Paylaş"><ShareIcon /></Button>

<Button size="icon-sm" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
<Button size="icon" variant="outline" aria-label="İndir"><DownloadIcon /></Button>
<Button size="icon-lg" variant="outline" aria-label="Ayarlar"><SettingsIcon /></Button>`}
        >
          <Button size="icon-sm" variant="ghost" aria-label="Düzenle"><EditIcon /></Button>
          <Button size="icon" variant="ghost" aria-label="Kopyala"><CopyIcon /></Button>
          <Button size="icon-lg" variant="ghost" aria-label="Paylaş"><ShareIcon /></Button>
          <div className="w-px h-8 bg-border" aria-hidden="true" />
          <Button size="icon-sm" variant="outline" aria-label="Ekle"><PlusIcon /></Button>
          <Button size="icon" variant="outline" aria-label="İndir"><DownloadIcon /></Button>
          <Button size="icon-lg" variant="outline" aria-label="Ayarlar"><SettingsIcon /></Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Tablo Aksiyon Sütunu"
          description="Satır başına: düzenle + kopyala + sil. ghost variant, icon-sm boyutu."
          previewClassName="w-full overflow-x-auto"
          code={`{/* Her satırda */}
<div className="flex items-center gap-1">
  <Button size="icon-sm" variant="ghost" aria-label="Düzenle"><EditIcon /></Button>
  <Button size="icon-sm" variant="ghost" aria-label="Kopyala"><CopyIcon /></Button>
  <Button size="icon-sm" variant="ghost" className="text-danger hover:bg-danger-subtle" aria-label="Sil">
    <TrashIcon />
  </Button>
</div>`}
        >
          <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-background-muted">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-muted">İsim</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground-muted">Durum</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-foreground-muted">Aksiyonlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Proje Alpha", status: "Aktif" },
                  { name: "Proje Beta", status: "Taslak" },
                  { name: "Proje Gamma", status: "Tamamlandı" },
                ].map((row) => (
                  <tr key={row.name} className="hover:bg-background-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-foreground-muted">{row.status}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon-sm" variant="ghost" aria-label="Düzenle"><EditIcon /></Button>
                        <Button size="icon-sm" variant="ghost" aria-label="Kopyala"><CopyIcon /></Button>
                        <Button size="icon-sm" variant="ghost" className="text-danger hover:bg-danger-subtle hover:text-danger" aria-label="Sil"><TrashIcon /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Editör Toolbar"
          description="Yazı düzenleme araç çubuğu. Birbirine bitişik ghost butonlar, aktif durum."
          previewClassName="w-full"
          code={`<div className="flex items-center gap-0.5 p-1.5 rounded-[var(--radius-md)] border border-border bg-surface w-fit">
  <Button size="icon-sm" variant="ghost" className="font-bold text-xs">B</Button>
  <Button size="icon-sm" variant="ghost" className="italic text-xs">I</Button>
  <Button size="icon-sm" variant="ghost" className="underline text-xs">U</Button>
  <div className="w-px h-5 bg-border mx-1" />
  <Button size="icon-sm" variant="ghost" aria-label="Bağlantı ekle">🔗</Button>
  <Button size="icon-sm" variant="ghost" aria-label="Görsel ekle">🖼</Button>
  <div className="w-px h-5 bg-border mx-1" />
  <Button size="icon-sm" variant="ghost" aria-label="İndir"><DownloadIcon /></Button>
  <Button size="icon-sm" variant="ghost" aria-label="Paylaş"><ShareIcon /></Button>
</div>`}
        >
          <div className="flex flex-wrap items-center gap-0.5 p-1.5 rounded-[var(--radius-md)] border border-border bg-surface w-fit">
            <Button size="icon-sm" variant="ghost" aria-label="Kalın" className="font-bold text-xs w-8">B</Button>
            <Button size="icon-sm" variant="ghost" aria-label="İtalik" className="italic text-xs w-8">I</Button>
            <Button size="icon-sm" variant="ghost" aria-label="Altı Çizili" className="underline text-xs w-8">U</Button>
            <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />
            <Button size="icon-sm" variant="ghost" aria-label="Bağlantı ekle">🔗</Button>
            <Button size="icon-sm" variant="ghost" aria-label="Görsel ekle">🖼</Button>
            <div className="w-px h-5 bg-border mx-1" aria-hidden="true" />
            <Button size="icon-sm" variant="ghost" aria-label="İndir"><DownloadIcon /></Button>
            <Button size="icon-sm" variant="ghost" aria-label="Paylaş"><ShareIcon /></Button>
          </div>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 5 — FAB & SPLIT BUTTON
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Özel Desenler"
          title="FAB & Split Button"
          description="Mobil uygulama tarzı yüzer aksiyon butonu ve bölünmüş açılır menü."
          tagColor="bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
        />

        <ShowcaseSection
          title="Floating Action Button (FAB)"
          description="Sağ alta sabit konumlanır. Tek birincil aksiyon için. Büyük boyut, yüksek z-index, shadow-lg."
          previewClassName="relative h-32 bg-background-muted rounded-[var(--radius-xl)] overflow-hidden"
          code={`{/* Sayfanın sağ altına sabit konumlama */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
  <Button
    size="icon-lg"
    stylePreset="gradient"
    className="rounded-full shadow-lg shadow-primary/30 size-14"
    aria-label="Yeni oluştur"
  >
    <PlusIcon />
  </Button>
</div>`}
        >
          <div className="relative h-32 bg-background-muted rounded-[var(--radius-xl)]">
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-foreground-subtle">Sayfa içeriği</p>
            {fabVisible && (
              <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
                <Button
                  size="icon-lg"
                  stylePreset="gradient"
                  className="rounded-full shadow-lg shadow-primary/30 size-14"
                  aria-label="Yeni oluştur"
                >
                  <PlusIcon />
                </Button>
              </div>
            )}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Split Button"
          description="Ana aksiyon + dropdown ok. Yayınla / Taslak Kaydet gibi bağlı seçenekler için."
          previewClassName="flex flex-wrap gap-6 items-start"
          code={`<div className="flex items-stretch">
  <Button className="rounded-r-none border-r-0">Yayınla</Button>
  <button
    onClick={() => setSplitOpen(v => !v)}
    className="h-10 px-2 bg-primary text-primary-foreground rounded-l-none rounded-r-[var(--radius-md)] border-l border-primary-hover hover:bg-primary-hover transition-colors"
    aria-label="Diğer seçenekler"
  >
    <ChevronDownIcon />
  </button>
</div>`}
        >
          <div className="flex flex-col gap-2">
            <div className="relative flex items-stretch">
              <Button className="rounded-r-none border-r border-primary-hover">Yayınla</Button>
              <button
                onClick={() => setSplitOpen((v) => !v)}
                className="h-10 px-2 bg-primary text-primary-foreground rounded-r-[var(--radius-md)] hover:bg-primary-hover transition-colors flex items-center"
                aria-label="Diğer seçenekler"
                aria-expanded={splitOpen}
              >
                <ChevronDownIcon />
              </button>
              {splitOpen && (
                <div className="absolute top-full left-0 mt-1 w-44 bg-surface border border-border rounded-[var(--radius-md)] shadow-md z-10 py-1">
                  {["Taslak Kaydet", "Zamanlanmış Yayınla", "Önizleme"].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSplitOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-background-muted transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-xs text-foreground-subtle">Ok'a tıklayarak diğer seçeneklere erişin →</p>
          </div>

          {/* Danger split */}
          <div className="flex flex-col gap-2">
            <div className="flex items-stretch">
              <Button variant="danger" className="rounded-r-none border-r border-danger-hover">Sil</Button>
              <button
                className="h-10 px-2 bg-danger text-danger-foreground rounded-r-[var(--radius-md)] hover:bg-danger-hover transition-colors flex items-center"
                aria-label="Silme seçenekleri"
              >
                <ChevronDownIcon />
              </button>
            </div>
            <p className="text-xs text-foreground-subtle">Danger split button</p>
          </div>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 6 — BOYUT & RESPONSIVE
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Boyut & Responsive"
          title="Boyut Skalası & Tam Genişlik"
          description="Tüm boyutlar ve mobil-first tam genişlik kullanımı."
          tagColor="bg-cyan-50 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400"
        />

        <ShowcaseSection
          title="Boyut Skalası"
          description="xs (28px) → xl (48px). Dokunma hedefi için mobilde minimum md (40px) kullanın."
          previewClassName="flex flex-wrap items-end gap-3"
          code={`<Button size="xs">xs · 28px</Button>
<Button size="sm">sm · 32px</Button>
<Button size="md">md · 40px</Button>
<Button size="lg">lg · 44px</Button>
<Button size="xl">xl · 48px</Button>`}
        >
          <Button size="xs">xs · 28px</Button>
          <Button size="sm">sm · 32px</Button>
          <Button size="md">md · 40px</Button>
          <Button size="lg">lg · 44px</Button>
          <Button size="xl">xl · 48px</Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Tam Genişlik (Full Width)"
          description={'Mobilde full-width, masaüstünde auto. className="w-full sm:w-auto" ile responsive kırılma.'}
          previewClassName="flex flex-col gap-3 w-full max-w-sm"
          code={`{/* Mobilde tam genişlik, SM+ breakpoint'te otomatik genişlik */}
<Button className="w-full sm:w-auto" stylePreset="gradient" size="lg">
  Ücretsiz Başla
</Button>
<Button className="w-full sm:w-auto" variant="outline" size="lg">
  Daha Fazla Bilgi
</Button>`}
        >
          <Button className="w-full" stylePreset="gradient" size="lg" onClick={() => { setFullWidthLoading(true); setTimeout(() => setFullWidthLoading(false), 1500); }} loading={fullWidthLoading}>
            {fullWidthLoading ? "Yükleniyor..." : "Ücretsiz Başla"}
          </Button>
          <Button className="w-full" variant="outline" size="lg">Daha Fazla Bilgi</Button>
        </ShowcaseSection>

        <ShowcaseSection
          title="Buton Grubu (Button Group)"
          description="Yan yana, iç kenarları düzleştirilmiş butonlar. Görünüm/liste geçiş, filtre seçimi için."
          previewClassName="flex flex-wrap gap-4 items-start"
          code={`{/* Bitişik grup */}
<div className="flex">
  <Button variant="outline" className="rounded-r-none border-r-0">Liste</Button>
  <Button variant="outline" className="rounded-none border-r-0">Grid</Button>
  <Button variant="outline" className="rounded-l-none">Tablo</Button>
</div>

{/* Aktif seçim */}
<div className="flex">
  <Button variant="primary" className="rounded-r-none border-r-0">Aylık</Button>
  <Button variant="outline" className="rounded-l-none">Yıllık</Button>
</div>`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex">
              <Button variant="outline" className="rounded-r-none border-r-0">Liste</Button>
              <Button variant="outline" className="rounded-none border-r-0">Grid</Button>
              <Button variant="outline" className="rounded-l-none">Tablo</Button>
            </div>
            <div className="flex">
              <Button variant="primary" className="rounded-r-none border-r-0">Aylık</Button>
              <Button variant="outline" className="rounded-l-none">Yıllık</Button>
            </div>
            <div className="flex">
              <Button size="sm" variant="ghost" className="rounded-r-none">Son 7 gün</Button>
              <Button size="sm" variant="ghost" className="rounded-none border-x border-border">30 gün</Button>
              <Button size="sm" variant="ghost" className="rounded-l-none">90 gün</Button>
            </div>
          </div>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 7 — DURUM KOMBİNASYONLARI
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Durum Matrisi"
          title="Tüm Durumlar"
          description="Her variant için default · hover · loading · disabled durumları yan yana."
          tagColor="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />

        <ShowcaseSection
          title="Variant × Durum Matrisi"
          description="Satırlar: durum. Sütunlar: variant."
          previewClassName="overflow-x-auto"
          code={`{/* Normal */}
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

{/* Loading */}
<Button variant="primary" loading>Primary</Button>

{/* Disabled */}
<Button variant="primary" disabled>Primary</Button>`}
        >
          <div className="min-w-[520px] space-y-3">
            {[
              { label: "Normal",   loading: false, disabled: false },
              { label: "Loading",  loading: true,  disabled: false },
              { label: "Disabled", loading: false, disabled: true  },
            ].map(({ label, loading, disabled }) => (
              <StateRow key={label} label={label}>
                {(["primary", "secondary", "outline", "ghost", "danger"] as const).map((v) => (
                  <Button key={v} variant={v} size="sm" loading={loading} disabled={disabled}>{v}</Button>
                ))}
              </StateRow>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="İnteraktif Durum Örnekleri"
          description="Gerçek durum geçişleri. Butonlara tıklayarak loading ve toggle davranışını test edin."
          previewClassName="flex flex-wrap items-center gap-4"
          code={`{/* Beğen (toggle) */}
const [liked, setLiked] = useState(false);
const [count, setCount] = useState(142);
<Button
  variant={liked ? "primary" : "outline"}
  size="sm"
  leftIcon={<HeartIcon />}
  onClick={() => { setLiked(v => !v); setCount(v => liked ? v - 1 : v + 1); }}
>
  {count}
</Button>

{/* Kopyala (geçici durum) */}
const [copied, setCopied] = useState(false);
<Button
  variant="outline"
  size="sm"
  leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
  onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }}
>
  {copied ? "Kopyalandı!" : "Kopyala"}
</Button>`}
        >
          <Button
            variant={liked ? "primary" : "outline"}
            size="sm"
            leftIcon={<HeartIcon />}
            onClick={handleLike}
          >
            {likeCount}
          </Button>

          <Button
            variant={copied ? "secondary" : "outline"}
            size="sm"
            leftIcon={copied ? <CheckIcon /> : <CopyIcon />}
            onClick={handleCopy}
          >
            {copied ? "Kopyalandı!" : "Kopyala"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            leftIcon={<DownloadIcon />}
            onClick={handleSave}
            loading={saving}
          >
            {saving ? "İndiriliyor..." : "Dışa Aktar"}
          </Button>
        </ShowcaseSection>
      </section>

      {/* ════════════════════════════════════════════════════════
          BÖLÜM 8 — STİL PRESTLERİ
      ════════════════════════════════════════════════════════ */}
      <section className="space-y-8">
        <SectionTitle
          tag="Stil Presetleri"
          title="Görsel Katman Varyantları"
          description="stylePreset prop'u ile variant üstüne farklı estetik uygulayın. Hover animasyonlarını görmek için üzerine gelin."
          tagColor="bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400"
        />

        <div className="space-y-4">
          <ShowcaseSection
            title="brutal"
            description="Sert köşe, kalın border, sağ-alt offset gölge. Hover'da gölge söner + hafifçe kayar."
            previewClassName="flex flex-wrap gap-4"
            code={`<Button stylePreset="brutal">Default</Button>
<Button stylePreset="brutal" variant="secondary">Secondary</Button>
<Button stylePreset="brutal" variant="outline">Outline</Button>
<Button stylePreset="brutal" variant="danger" leftIcon={<TrashIcon />}>Sil</Button>`}
          >
            <Button stylePreset="brutal">Default</Button>
            <Button stylePreset="brutal" variant="secondary">Secondary</Button>
            <Button stylePreset="brutal" variant="outline">Outline</Button>
            <Button stylePreset="brutal" variant="danger" leftIcon={<TrashIcon />}>Sil</Button>
          </ShowcaseSection>

          <ShowcaseSection
            title="neon"
            description="Primary renkte glow efekti. Koyu arka plan üstünde en iyi görünür."
            previewClassName="flex flex-wrap gap-4 p-6 rounded-[var(--radius-xl)] bg-gray-950"
            code={`<Button stylePreset="neon">Neon</Button>
<Button stylePreset="neon" leftIcon={<ZapIcon />} size="lg">Launch</Button>`}
          >
            <Button stylePreset="neon">Neon</Button>
            <Button stylePreset="neon" leftIcon={<ZapIcon />} size="lg">Launch</Button>
          </ShowcaseSection>

          <ShowcaseSection
            title="glass"
            description="Backdrop blur + yarı-saydam. Fotoğraf / gradient arka planlar üstünde kullanın."
            previewClassName="flex flex-wrap gap-4 p-6 rounded-[var(--radius-xl)] bg-gradient-to-br from-violet-500 to-pink-500"
            code={`<Button stylePreset="glass">Glass</Button>
<Button stylePreset="glass" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>`}
          >
            <Button stylePreset="glass">Glass</Button>
            <Button stylePreset="glass" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>
          </ShowcaseSection>

          <ShowcaseSection
            title="gradient"
            description="Primary → violet yatay gradient. Hover'da glow shadow belirir."
            previewClassName="flex flex-wrap gap-4"
            code={`<Button stylePreset="gradient">Get Started</Button>
<Button stylePreset="gradient" leftIcon={<ZapIcon />} size="lg">Upgrade Now</Button>
<Button stylePreset="gradient" size="sm" rightIcon={<ArrowIcon />}>Learn More</Button>`}
          >
            <Button stylePreset="gradient">Get Started</Button>
            <Button stylePreset="gradient" leftIcon={<ZapIcon />} size="lg">Upgrade Now</Button>
            <Button stylePreset="gradient" size="sm" rightIcon={<ArrowIcon />}>Learn More</Button>
          </ShowcaseSection>

          <ShowcaseSection
            title="soft"
            description="Primary-subtle arka plan, border yok. Ghost'tan belirgin, primary'dan sakin."
            previewClassName="flex flex-wrap gap-4"
            code={`<Button stylePreset="soft">Soft</Button>
<Button stylePreset="soft" leftIcon={<HeartIcon />}>Beğen</Button>
<Button stylePreset="soft" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>`}
          >
            <Button stylePreset="soft">Soft</Button>
            <Button stylePreset="soft" leftIcon={<HeartIcon />}>Beğen</Button>
            <Button stylePreset="soft" size="lg" rightIcon={<ArrowIcon />}>Devam Et</Button>
          </ShowcaseSection>

          <ShowcaseSection
            title="retro"
            description="Pastel amber zemin + mono font + dashed border. Vintage / indie estetiği."
            previewClassName="flex flex-wrap gap-4"
            code={`<Button stylePreset="retro">Retro Button</Button>
<Button stylePreset="retro" leftIcon={<ZapIcon />}>Hızlı Başla</Button>
<Button stylePreset="retro" size="lg">Join the Club</Button>`}
          >
            <Button stylePreset="retro">Retro Button</Button>
            <Button stylePreset="retro" leftIcon={<ZapIcon />}>Hızlı Başla</Button>
            <Button stylePreset="retro" size="lg">Join the Club</Button>
          </ShowcaseSection>
        </div>
      </section>

    </div>
  );
}
