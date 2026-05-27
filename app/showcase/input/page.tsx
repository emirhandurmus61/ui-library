"use client";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/input";

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

const LinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/* ─── Section ────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-4">
        {title}
      </h2>
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
        <p className="text-foreground-muted">
          3 size · error / success state · label · helper text · icon desteği · PasswordInput
        </p>
      </div>

      {/* Temel */}
      <Section title="Temel">
        <Input label="Kullanıcı adı" placeholder="@kullaniciadi" />
        <Input label="E-posta" type="email" placeholder="ornek@email.com" />
        <Input label="Zorunlu alan" placeholder="Doldurun" required />
      </Section>

      {/* Sizes */}
      <Section title="Sizes">
        <Input size="sm" placeholder="Small (sm)" />
        <Input size="md" placeholder="Medium (md) — varsayılan" />
        <Input size="lg" placeholder="Large (lg)" />
      </Section>

      {/* İkon */}
      <Section title="İkon ile">
        <Input leftIcon={<SearchIcon />} placeholder="Ara..." />
        <Input leftIcon={<MailIcon />} type="email" placeholder="E-posta adresi" />
        <Input leftIcon={<UserIcon />} placeholder="Ad Soyad" />
        <Input leftIcon={<LinkIcon />} placeholder="https://" rightIcon={<CheckIcon />} />
      </Section>

      {/* States */}
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
          placeholder="Geçerli değer"
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

      {/* Disabled & ReadOnly */}
      <Section title="Disabled / Read-only">
        <Input label="Disabled" placeholder="Bu alan pasif" disabled />
        <Input
          label="Read-only"
          defaultValue="degistirilemez@email.com"
          readOnly
        />
      </Section>

      {/* Password */}
      <Section title="Password Input">
        <PasswordInput label="Şifre" placeholder="••••••••" />
        <PasswordInput
          label="Şifre (hata)"
          defaultValue="123"
          errorText="Şifre en az 8 karakter olmalı."
        />
      </Section>

      {/* Input types */}
      <Section title="Input Tipleri">
        <Input label="Number" type="number" placeholder="0" />
        <Input label="Date" type="date" />
        <Input label="Tel" type="tel" placeholder="+90 555 000 00 00" />
        <Input label="URL" type="url" placeholder="https://example.com" />
      </Section>

      {/* Kullanım */}
      <section>
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider mb-3">
          Kullanım
        </h2>
        <pre className="bg-surface-raised border border-border rounded-lg p-4 text-sm font-mono text-foreground overflow-x-auto">
{`import { Input, PasswordInput } from "@/components/ui/input";

// Temel
<Input label="E-posta" type="email" placeholder="ornek@email.com" />

// İkon ile
<Input leftIcon={<SearchIcon />} placeholder="Ara..." />

// Hata state (errorText verilince otomatik kırmızı)
<Input
  label="E-posta"
  errorText="Geçerli bir e-posta girin."
/>

// Şifre alanı (göster/gizle butonu dahil)
<PasswordInput label="Şifre" placeholder="••••••••" />`}
        </pre>
      </section>
    </div>
  );
}
