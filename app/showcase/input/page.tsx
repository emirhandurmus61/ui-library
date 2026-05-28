"use client";

import { Input, PasswordInput } from "@/components/ui/input";
import { ShowcaseSection } from "@/components/ui/showcase-section";

/* ─── İkonlar ────────────────────────────────────────────────── */

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <circle cx="12" cy="8" r="4" /><path d="M20 21a8 8 0 1 0-16 0" />
  </svg>
);

/* ─── Section helper ─────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">{title}</h2>
      <div className="flex flex-col gap-4 max-w-sm">{children}</div>
    </section>
  );
}

/* ─── Showcase ───────────────────────────────────────────────── */

export default function InputShowcase() {
  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Input</h1>
        <p className="text-foreground-muted text-sm">
          3 size · 5 stylePreset · error / success state · label · icon · PasswordInput
        </p>
      </div>

      {/* ── Temel ──────────────────────────────────────────────── */}
      <Section title="Temel">
        <Input label="Kullanıcı adı" placeholder="@kullaniciadi" />
        <Input label="E-posta" type="email" placeholder="ornek@email.com" />
        <Input label="Zorunlu alan" placeholder="Doldurun" required />
      </Section>

      {/* ── Sizes ──────────────────────────────────────────────── */}
      <Section title="Boyutlar">
        <Input size="sm" placeholder="Small (sm)" />
        <Input size="md" placeholder="Medium (md) — varsayılan" />
        <Input size="lg" placeholder="Large (lg)" />
      </Section>

      {/* ── States ─────────────────────────────────────────────── */}
      <Section title="States">
        <Input
          label="Hata durumu"
          placeholder="Geçersiz değer"
          defaultValue="yanlis@"
          errorText="Geçerli bir e-posta adresi girin."
          leftIcon={<MailIcon />}
        />
        <Input
          label="Başarı durumu"
          defaultValue="ornek@email.com"
          successText="E-posta adresi kullanılabilir."
          leftIcon={<MailIcon />}
        />
        <Input
          label="Helper text"
          placeholder="Kullanıcı adı"
          helperText="Sadece harf, rakam ve alt çizgi kullanabilirsiniz."
          leftIcon={<UserIcon />}
        />
      </Section>

      {/* ── Stil Presetleri ────────────────────────────────────── */}
      <div>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-5">
          Stil Presetleri
        </h2>
        <p className="text-sm text-foreground-muted mb-6 -mt-2">
          <code className="text-xs bg-background-muted px-1.5 py-0.5 rounded font-mono">stylePreset</code> prop'u
          ile input görünümü değiştirilir. State (error/success) tüm presetlerde çalışır.
        </p>

        <div className="space-y-8">

          <ShowcaseSection
            title="default"
            description="Standart border + focus ring. Tüm bağlamlarda güvenli seçim."
            previewClassName="flex flex-col gap-3 max-w-sm"
            code={`<Input stylePreset="default" placeholder="Default input" />`}
          >
            <Input stylePreset="default" label="Default" placeholder="Standart görünüm" leftIcon={<MailIcon />} />
            <Input stylePreset="default" label="Error state" errorText="Hata mesajı." placeholder="Hata durumu" />
          </ShowcaseSection>

          <ShowcaseSection
            title="underline"
            description="Sadece alt çizgi, arka plan transparan. Material Design / Ant Design tarzı."
            previewClassName="flex flex-col gap-4 max-w-sm"
            code={`<Input stylePreset="underline" placeholder="Underline input" />`}
          >
            <Input stylePreset="underline" label="Ad" placeholder="Adınızı yazın" />
            <Input stylePreset="underline" label="E-posta" type="email" placeholder="E-posta adresiniz" />
            <Input stylePreset="underline" label="Hatalı" errorText="Zorunlu alan." placeholder="Hata örneği" />
          </ShowcaseSection>

          <ShowcaseSection
            title="filled"
            description="Dolu arka plan, alt border vurgusu. Google Material 3 tarzı."
            previewClassName="flex flex-col gap-3 max-w-sm"
            code={`<Input stylePreset="filled" placeholder="Filled input" />`}
          >
            <Input stylePreset="filled" label="Ad Soyad" placeholder="Adınızı yazın" leftIcon={<UserIcon />} />
            <Input stylePreset="filled" label="Arama" placeholder="Ara..." leftIcon={<SearchIcon />} />
            <Input stylePreset="filled" label="Başarılı" successText="Kullanılabilir." defaultValue="emirhan" />
          </ShowcaseSection>

          <ShowcaseSection
            title="brutal"
            description="Kalın siyah border + offset shadow. Focus'ta shadow söner, input kayar."
            previewClassName="flex flex-col gap-4 max-w-sm"
            code={`<Input stylePreset="brutal" placeholder="Brutal input" />`}
          >
            <Input stylePreset="brutal" label="Ad" placeholder="Adınızı yazın" />
            <Input stylePreset="brutal" label="E-posta" type="email" placeholder="E-posta adresi" />
            <Input stylePreset="brutal" label="Hata" errorText="Geçersiz." defaultValue="x" />
          </ShowcaseSection>

          <ShowcaseSection
            title="pill"
            description="Tam yuvarlak köşeler. Arama kutuları, header filter'ları için ideal."
            previewClassName="flex flex-col gap-3 max-w-sm"
            code={`<Input stylePreset="pill" placeholder="Ara..." leftIcon={<SearchIcon />} />`}
          >
            <Input stylePreset="pill" placeholder="Ara..." leftIcon={<SearchIcon />} />
            <Input stylePreset="pill" label="E-posta" type="email" placeholder="ornek@email.com" leftIcon={<MailIcon />} />
            <Input stylePreset="pill" placeholder="Büyük" size="lg" leftIcon={<SearchIcon />} />
          </ShowcaseSection>

        </div>
      </div>

      {/* ── Password ───────────────────────────────────────────── */}
      <Section title="Password Input">
        <PasswordInput label="Şifre" placeholder="••••••••" />
        <PasswordInput label="Şifre (hata)" defaultValue="123" errorText="Şifre en az 8 karakter olmalı." />
        <PasswordInput stylePreset="filled" label="Filled şifre" placeholder="••••••••" />
        <PasswordInput stylePreset="underline" label="Underline şifre" placeholder="••••••••" />
      </Section>

      {/* ── Disabled ───────────────────────────────────────────── */}
      <Section title="Disabled / Read-only">
        <Input label="Disabled" placeholder="Bu alan pasif" disabled />
        <Input label="Read-only" defaultValue="degistirilemez@email.com" readOnly />
      </Section>
    </div>
  );
}
