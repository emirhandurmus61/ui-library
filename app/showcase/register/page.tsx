"use client";

import { RegisterCard, RegisterSplit } from "@/components/ui/auth";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && <p className="text-sm text-foreground-muted mt-0.5">{description}</p>}
    </div>
  );
}

export default function RegisterShowcase() {
  return (
    <div className="max-w-4xl space-y-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Register Form</h1>
        <p className="text-sm text-foreground-muted">
          2 tasarım · sosyal kayıt · şifre gücü göstergesi · validation · loading state
        </p>
      </div>

      {/* 1 — RegisterCard */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="1. Register Card"
          description="Sosyal kayıt ve şifre gücü göstergesi dahil."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <RegisterCard
            logoText="MyApp"
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Kayıt: ${d.email}`); }}
            onGoogleSignup={() => alert("Google ile kayıt")}
            onGithubSignup={() => alert("GitHub ile kayıt")}
            loginHref="#"
            termsHref="#"
            privacyHref="#"
          />
        </div>
      </section>

      {/* 1b — Sosyalsiz */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="1b. Register Card — Sosyal kayıt olmadan"
          description="showSocials={false} ile yalnızca e-posta/şifre formu."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <RegisterCard
            logoText="MyApp"
            showSocials={false}
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Kayıt: ${d.email}`); }}
          />
        </div>
      </section>

      {/* 2 — RegisterSplit */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="2. Register Split"
          description="Geniş ekranlarda sol panel görünür. Mobilde yalnızca form gösterilir."
        />
        <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden h-[700px]">
          <RegisterSplit
            logoText="MyApp"
            panelTitle="Hemen başlayın"
            panelSubtitle="Dakikalar içinde kurulum yapın ve üretken olmaya başlayın."
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Kayıt: ${d.email}`); }}
            onGoogleSignup={() => alert("Google ile kayıt")}
            onGithubSignup={() => alert("GitHub ile kayıt")}
          />
        </div>
      </section>

      {/* Kullanım */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { RegisterCard, RegisterSplit } from "@/components/ui/auth";

<RegisterCard
  logoText="MyApp"
  onSubmit={async ({ name, email, password }) => { await createAccount(name, email, password); }}
  onGoogleSignup={() => signUp("google")}
  loginHref="/giris"
  termsHref="/kullanim-sartlari"
  privacyHref="/gizlilik"
/>

<RegisterSplit
  logoText="MyApp"
  panelTitle="Hemen başlayın"
  onSubmit={async ({ name, email, password }) => { await createAccount(name, email, password); }}
/>`}
        </pre>
      </section>
    </div>
  );
}
