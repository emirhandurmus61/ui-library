"use client";

import { AuthPagesTemplate } from "@/components/ui/templates/auth-pages";

export default function AuthTemplatePage() {
  return (
    <div className="max-w-5xl space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Auth Sayfaları Şablonu</h1>
        <p className="text-sm text-foreground-muted">
          Login · Register · Forgot Password · OTP Verify — 4 tam ekran auth akışı.
        </p>
      </div>

      <AuthPagesTemplate />

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground-muted uppercase tracking-wider">Kullanım</h2>
        <pre className="bg-surface-raised border border-border rounded-[var(--radius-lg)] p-4 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
{`import { LoginCard, LoginSplit, RegisterCard, ForgotPasswordCard } from "@/components/ui/auth";
import { OTPCard } from "@/components/ui/otp";

// app/giris/page.tsx
export default function GirisPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-background-muted">
      <LoginCard
        logoText="MyApp"
        onSubmit={async ({ email, password }) => { await signIn(email, password); }}
        onGoogleLogin={() => signIn("google")}
        forgotPasswordHref="/sifremi-unuttum"
        registerHref="/kayit"
      />
    </div>
  );
}`}
        </pre>
      </section>
    </div>
  );
}
