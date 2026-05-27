"use client";

import { ForgotPasswordCard, ForgotPasswordSplit } from "@/components/ui/auth";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && <p className="text-sm text-foreground-muted mt-0.5">{description}</p>}
    </div>
  );
}

export default function ForgotPasswordShowcase() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Forgot Password</h1>
        <p className="text-sm text-foreground-muted">
          2 tasarım · 2 adım (form → başarı) · 60s tekrar gönder · validation
        </p>
      </div>

      {/* 1 — ForgotPasswordCard */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="1. Forgot Password Card"
          description="E-posta gönder — submit sonrası otomatik başarı ekranına geçer. Tekrar gönder 60s cooldown içerir."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <ForgotPasswordCard
            logoText="MyApp"
            onSubmit={async () => { await new Promise(r => setTimeout(r, 1500)); }}
            onResend={async () => { await new Promise(r => setTimeout(r, 800)); }}
            loginHref="#"
          />
        </div>
      </section>

      {/* 2 — ForgotPasswordSplit */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="2. Forgot Password Split"
          description="Geniş ekranlarda sol panel (güvenlik ipuçları) görünür. Mobilde yalnızca form gösterilir."
        />
        <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden h-[520px]">
          <ForgotPasswordSplit
            logoText="MyApp"
            panelTitle="Hesabınız güvende"
            panelSubtitle="Şifrenizi unuttuysanız endişelenmeyin. Güvenli sıfırlama sürecimiz sizi korur."
            onSubmit={async () => { await new Promise(r => setTimeout(r, 1500)); }}
            onResend={async () => { await new Promise(r => setTimeout(r, 800)); }}
            loginHref="#"
          />
        </div>
      </section>

      {/* Kullanım */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { ForgotPasswordCard, ForgotPasswordSplit } from "@/components/ui/auth";

<ForgotPasswordCard
  logoText="MyApp"
  onSubmit={async ({ email }) => {
    await sendPasswordReset(email);
    // Başarı ekranı otomatik gösterilir
  }}
  onResend={async ({ email }) => {
    await sendPasswordReset(email);
    // 60s cooldown başlar
  }}
  loginHref="/giris"
/>

<ForgotPasswordSplit
  logoText="MyApp"
  panelTitle="Hesabınız güvende"
  onSubmit={async ({ email }) => { await sendPasswordReset(email); }}
  loginHref="/giris"
/>`}
        </pre>
      </section>
    </div>
  );
}
