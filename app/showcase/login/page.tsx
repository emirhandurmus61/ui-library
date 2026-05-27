"use client";

import { LoginCard, LoginSplit } from "@/components/ui/auth";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description && <p className="text-sm text-foreground-muted mt-0.5">{description}</p>}
    </div>
  );
}

export default function LoginShowcase() {
  return (
    <div className="max-w-4xl space-y-16">
      {/* Başlık */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Login Form</h1>
        <p className="text-sm text-foreground-muted">
          2 tasarım · sosyal giriş · şifremi unuttum · validation · loading state
        </p>
      </div>

      {/* 1 — LoginCard */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="1. Login Card"
          description="Sayfa ortasına konulan bağımsız kart. Sosyal giriş butonları dahil."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <LoginCard
            logoText="MyApp"
            title="Tekrar hoş geldiniz"
            subtitle="Hesabınıza giriş yapın"
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Giriş: ${d.email}`); }}
            onGoogleLogin={() => alert("Google ile giriş")}
            onGithubLogin={() => alert("GitHub ile giriş")}
            forgotPasswordHref="#"
            registerHref="#"
          />
        </div>
      </section>

      {/* 1b — Sosyalsiz */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="1b. Login Card — Sosyal giriş olmadan"
          description="showSocials={false} ile yalnızca e-posta/şifre formu."
        />
        <div className="flex justify-center py-10 bg-background-muted rounded-[var(--radius-xl)] border border-border">
          <LoginCard
            logoText="MyApp"
            showSocials={false}
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Giriş: ${d.email}`); }}
          />
        </div>
      </section>

      {/* 2 — LoginSplit */}
      <section className="flex flex-col gap-4">
        <SectionHeader
          title="2. Login Split"
          description="Geniş ekranlarda sol panel görünür. Mobilde yalnızca form gösterilir."
        />
        <div className="rounded-[var(--radius-xl)] border border-border overflow-hidden h-[580px]">
          <LoginSplit
            logoText="MyApp"
            panelTitle="Projelerinizi güçlendirin"
            panelSubtitle="Binlerce ekip bu kütüphane ile daha hızlı ürün geliştiriyor."
            panelTestimonial={{ text: "Geliştirme süremizi %40 kısalttık.", author: "Emirhan Durmuş", role: "Kurucu, MyApp" }}
            onSubmit={async (d) => { await new Promise(r => setTimeout(r, 1500)); alert(`Giriş: ${d.email}`); }}
            onGoogleLogin={() => alert("Google ile giriş")}
            onGithubLogin={() => alert("GitHub ile giriş")}
          />
        </div>
      </section>

      {/* Kullanım */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { LoginCard, LoginSplit } from "@/components/ui/auth";

<LoginCard
  logoText="MyApp"
  onSubmit={async ({ email, password }) => { await signIn(email, password); }}
  onGoogleLogin={() => signIn("google")}
  forgotPasswordHref="/sifremi-unuttum"
  registerHref="/kayit"
/>

<LoginSplit
  logoText="MyApp"
  panelTitle="Projelerinizi güçlendirin"
  panelTestimonial={{ text: "Harika deneyim.", author: "Ali Veli", role: "CTO" }}
  onSubmit={async ({ email, password }) => { await signIn(email, password); }}
/>`}
        </pre>
      </section>
    </div>
  );
}
