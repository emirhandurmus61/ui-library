"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em">
      <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
    </svg>
  );
}

function MailSentIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="2em" height="2em">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="m16 19 2 2 4-4"/>
    </svg>
  );
}

export interface ForgotPasswordCardProps {
  logoText?: string;
  logo?: React.ReactNode;
  title?: string;
  subtitle?: string;
  successTitle?: string;
  successSubtitle?: string;
  onSubmit?: (data: { email: string }) => void | Promise<void>;
  onResend?: (data: { email: string }) => void | Promise<void>;
  loginHref?: string;
  className?: string;
}

function SuccessScreen({
  email,
  successTitle,
  successSubtitle,
  loginHref,
  onResend,
}: {
  email: string;
  successTitle: string;
  successSubtitle: string;
  loginHref: string;
  onResend?: (data: { email: string }) => void | Promise<void>;
}) {
  const [loading, setLoading]     = useState(false);
  const [cooldown, setCooldown]   = useState(0);

  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    try {
      await onResend?.({ email });
      setCooldown(60);
      const id = setInterval(() => {
        setCooldown((c) => { if (c <= 1) { clearInterval(id); return 0; } return c - 1; });
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
        <MailSentIcon />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground">{successTitle}</h1>
        <p className="text-sm text-foreground-muted mt-1.5 leading-relaxed">
          {successSubtitle} <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleResend}
          loading={loading}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Tekrar gönder (${cooldown}s)` : "E-postayı tekrar gönder"}
        </Button>
        <a
          href={loginHref}
          className="inline-flex items-center justify-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeftIcon />
          Giriş sayfasına dön
        </a>
      </div>
      <p className="text-xs text-foreground-subtle">
        E-posta gelmediyse spam klasörünü kontrol edin.
      </p>
    </div>
  );
}

export function ForgotPasswordCard({
  logoText = "Brand",
  logo,
  title = "Şifrenizi sıfırlayın",
  subtitle = "E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.",
  successTitle = "E-posta gönderildi!",
  successSubtitle = "Şifre sıfırlama bağlantısını şu adrese gönderdik:",
  onSubmit,
  onResend,
  loginHref = "#",
  className,
}: ForgotPasswordCardProps) {
  const [email, setEmail]   = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim()) { setError("E-posta zorunludur."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Geçerli bir e-posta girin."); return; }
    setError("");
    setLoading(true);
    try { await onSubmit?.({ email }); setSent(true); }
    finally { setLoading(false); }
  };

  return (
    <div className={cn(
      "w-full max-w-sm flex flex-col gap-6",
      "bg-surface border border-border rounded-[var(--radius-xl)] shadow-lg p-8",
      className
    )}>
      {sent ? (
        <SuccessScreen
          email={email}
          successTitle={successTitle}
          successSubtitle={successSubtitle}
          loginHref={loginHref}
          onResend={onResend}
        />
      ) : (
        <>
          <div className="flex flex-col items-center gap-3 text-center">
            {logo ?? (
              <span className="flex size-10 items-center justify-center rounded-[var(--radius-lg)] bg-primary text-primary-foreground text-base font-bold">
                {logoText[0]}
              </span>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
              <p className="text-sm text-foreground-muted mt-0.5 leading-relaxed">{subtitle}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              label="E-posta"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
              leftIcon={<MailIcon />}
              errorText={error}
              required
              autoComplete="email"
              autoFocus
            />
            <Button type="submit" className="w-full" loading={loading}>
              Sıfırlama Bağlantısı Gönder
            </Button>
          </form>

          <a
            href={loginHref}
            className="inline-flex items-center justify-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon />
            Giriş sayfasına dön
          </a>
        </>
      )}
    </div>
  );
}
