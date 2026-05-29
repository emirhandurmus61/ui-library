"use client";

import { ShowcaseSection } from "@/components/ui/showcase-section";
import { ShareButton } from "@/components/ui/share-button";

const URL  = "https://ui-library.example.com/showcase";
const TITLE = "UI Library — Modern React Bileşenleri";
const TEXT  = "Tailwind CSS v4 ve TypeScript ile hazırlanmış kapsamlı bir UI kütüphanesi.";

export default function ShareButtonShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Share Button</h1>
        <p className="text-foreground-muted">
          Native Share API + fallback link kopyalama. Twitter, LinkedIn, WhatsApp, Telegram, e-posta desteği.
        </p>
      </div>

      <ShowcaseSection
        title="Default — Platform Butonları"
        description="Tüm platformların ikonlu butonları yan yana."
        importLine={`import { ShareButton } from "@/components/ui/share-button";`}
        code={`<ShareButton
  url="https://example.com"
  title="Paylaşılacak başlık"
  text="Açıklama metni"
  variant="default"
/>`}
      >
        <ShareButton url={URL} title={TITLE} text={TEXT} variant="default" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Dropdown Varyant"
        description="Tek buton, tıklayınca platform listesi açılır."
        importLine={`import { ShareButton } from "@/components/ui/share-button";`}
        code={`<ShareButton url={url} title={title} variant="dropdown" />`}
      >
        <ShareButton url={URL} title={TITLE} text={TEXT} variant="dropdown" />
      </ShowcaseSection>

      <ShowcaseSection
        title="Diğer Varyantlar"
        description="minimal, icon-only, pill."
        importLine={`import { ShareButton } from "@/components/ui/share-button";`}
        code={`<ShareButton variant="minimal" label="Paylaş" />
<ShareButton variant="icon" />
<ShareButton variant="pill" label="Paylaş" />`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col items-center gap-1.5">
            <ShareButton url={URL} title={TITLE} variant="minimal" />
            <span className="text-[11px] text-foreground-subtle">minimal</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShareButton url={URL} title={TITLE} variant="icon" />
            <span className="text-[11px] text-foreground-subtle">icon</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <ShareButton url={URL} title={TITLE} variant="pill" />
            <span className="text-[11px] text-foreground-subtle">pill</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Özel Platform Seçimi"
        description="platforms prop ile yalnızca istenen platformları göster."
        importLine={`import { ShareButton } from "@/components/ui/share-button";`}
        code={`<ShareButton
  url={url}
  variant="default"
  platforms={["copy", "twitter", "linkedin"]}
/>`}
      >
        <div className="space-y-3">
          <div>
            <p className="text-xs text-foreground-muted mb-2">Sosyal medya odaklı</p>
            <ShareButton url={URL} title={TITLE} platforms={["twitter", "linkedin"]} />
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-2">Mesajlaşma odaklı</p>
            <ShareButton url={URL} title={TITLE} platforms={["copy", "whatsapp", "telegram"]} />
          </div>
          <div>
            <p className="text-xs text-foreground-muted mb-2">Dropdown ile seçimli</p>
            <ShareButton url={URL} title={TITLE} variant="dropdown" platforms={["copy", "twitter", "email"]} />
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Blog Post Entegrasyonu"
        description="Gerçek kullanım: yazı başlığı altında paylaş butonu."
        importLine={`import { ShareButton } from "@/components/ui/share-button";`}
        code={`<article>
  <h1>Next.js 15 ile Server Actions</h1>
  <div className="flex items-center gap-3">
    <span>28 May 2026</span>
    <ShareButton url={url} title={title} variant="dropdown" size="sm" label="Paylaş" />
  </div>
</article>`}
      >
        <div className="rounded-[var(--radius-xl)] border border-border bg-surface p-6 max-w-xl space-y-3">
          <span className="text-xs font-semibold text-primary bg-primary-subtle px-2 py-0.5 rounded-full">Next.js</span>
          <h2 className="text-lg font-bold text-foreground">Next.js 15 ile Server Actions Kılavuzu</h2>
          <p className="text-sm text-foreground-muted leading-relaxed">
            Server Actions ile form gönderimi ve veri mutasyonunu nasıl yönetirsiniz? Kapsamlı rehber.
          </p>
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-2 text-xs text-foreground-subtle">
              <span>28 May 2026</span>
              <span>·</span>
              <span>5 dk okuma</span>
            </div>
            <ShareButton url={URL} title={TITLE} variant="dropdown" size="sm" label="Paylaş" />
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
}
